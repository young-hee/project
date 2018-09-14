package kr.ap.amt.product.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.amt.product.vo.RequestReview;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.common.SeoEntity;
import kr.ap.comm.support.common.SnsEntity;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.ProductSaleDisplayStatus;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.sales.product.AttributeInfo;
import net.g1project.ecp.api.model.sales.product.AttributeValueInfo;
import net.g1project.ecp.api.model.sales.product.OnlineProdInfo;
import net.g1project.ecp.api.model.sales.product.PriceInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewCountPerResItem;
import net.g1project.ecp.api.model.sales.product.ProdReviewCountPerScope;
import net.g1project.ecp.api.model.sales.product.ProdReviewImg;
import net.g1project.ecp.api.model.sales.product.ProdReviewInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewSummaryInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewSurveySummary;
import net.g1project.ecp.api.model.sales.product.ProductInfo;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;

@Controller
@RequestMapping("/product")
public class ProductViewController extends AbstractController{

	/**
	 * 상품상세
	 *
	 * @param model
	 * @param requestReview
	 * @param previewKey
	 * @return
	 */
	@GetMapping({"/detail", "/detail/preview"})
    @PageTitle(title = "상품상세")
	public String productDetail(Model model, RequestReview requestReview, String previewKey, String onlyProd) {
		OnlineProdInfo onlineProdInfo = productApi.getOnlineProduct( requestReview.getOnlineProdSn(), requestReview.getProdSn(), getMemberSn(), onlyProd);
		List<AttributeValueInfo> awards = new ArrayList<>(); //어워드 정보
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		ProductInfo maxProd = null;
		boolean isMaxRate = false;
		
		//단위상품 판매표시상태코드 체크 방어로직추가, 정의되지 않은 상태라면 main로 return한다.
		for (ProductInfo p : onlineProdInfo.getProducts()) {
			boolean validEnum = EnumUtils.isValidEnum(ProductSaleDisplayStatus.class, p.getSaleDisplayStatus());
			
			// 상품상태에 따른 return  온라인상품 판매표시상태코드 - OnSale(판매중) - OutOfStock(품절) - Exhaustion(조기소진) - WaitingSale(판매대기) - SuspendSale(판매일시중지) - EndSale(판매종료)
			if(!validEnum) {
				return "redirect:/main"; 
			}
			
			if( maxProd == null ) {
				maxProd = p;
			} else {
				PriceInfo maxPInfo = maxProd.getAvailablePrices().get(0);
				PriceInfo curInfo = p.getAvailablePrices().get(0);
				Integer maxRate = maxPInfo.getOnlineSalePriceDiscountRate() + maxPInfo.getMemberLevelDiscountRate() + maxPInfo.getOnlineMemberDiscountRate() + maxPInfo.getImmedDiscountRate();
				Integer curRate = curInfo.getOnlineSalePriceDiscountRate() + curInfo.getMemberLevelDiscountRate() + curInfo.getOnlineMemberDiscountRate() + curInfo.getImmedDiscountRate();
				if( curRate > maxRate ) {
					maxProd = p;
					isMaxRate = true;
				}
			}
			
			//product > attribute의 어워드 정보를 FO 에서 렌더링 하기 편하도록 수정
			for (AttributeInfo attr : p.getAttributes()) {
				if( "award".equalsIgnoreCase(attr.getAddAttrCode()) ) {
					for (AttributeValueInfo valueInfo : attr.getAttrVals()) {
						if( !"".equals(valueInfo.getAddAttrImg()) ) {
							awards.add(valueInfo);
						}
					}
				}
			}
			
		}
		
    	ProdReviewSummaryInfo summary;	// 상품평 요약 정보
    	ProdReviewListInfo bestPhotoReview;	// 베스트 포토 리뷰
    	ProdReviewListInfo bestReview;	// 베스트 리뷰
    	ProdReviewCountPerScope maxCountPerScope = null; // 상품평 중 최대 값
    	
    	//sns
    	String snsImage = null;
    	String snsTitle = null;
    	String snsDesc = null;
    	
    	//sns 이미지(default)
    	if(!StringUtils.isEmpty(onlineProdInfo.getOnlineProdImages())) {
    		snsImage = onlineProdInfo.getOnlineProdImages().get(0).getImgUrl();
        }else {
        	if(!StringUtils.isEmpty(onlineProdInfo.getProducts().get(0).getProdImages())) {
        		snsImage = onlineProdInfo.getProducts().get(0).getProdImages().get(0).getImgUrl();
        	}
        }
    	//sns title(default)
    	if(!StringUtils.isEmpty(onlineProdInfo.getOnlineProdName())) {
    		snsTitle = onlineProdInfo.getOnlineProdName();
    	}else {
    		snsTitle = onlineProdInfo.getProducts().get(0).getProdName();
    	}
    	//sns description(default)
    	if(!StringUtils.isEmpty(onlineProdInfo.getLineDesc())) {
    		snsDesc = onlineProdInfo.getLineDesc();
    	}else {
    		snsDesc = onlineProdInfo.getProducts().get(0).getLineDesc();
    	}
    	
    	try {
    		requestReview.setProdReviewType("All"); //All(전체), Pur(구매후기), Prod(상품리뷰), ExperienceGrp(체험단)
    		requestReview.setProdReviewUnit("OnlineProd"); //OnlineProd(온라인상품단위) - UnitProd(단위상품단위, 단위상품일련번호 필수) - StyleCode(스타일코드단위, 스타일코드 필수)
    		
    		// 상품평 요약 정보 조회
    		summary = productApi.getProductReviewSummary(requestReview.getProdReviewUnit(), requestReview.getProdReviewType(), requestReview.getOnlineProdSn(), requestReview.getProdSn(), requestReview.getStyleCode());
    		
    		//베스트 포토 리뷰
    		requestReview.setProdReviewType("Pur"); 
    		requestReview.setProdReviewSort("Recommend");
    		requestReview.setLimit(10);
    		requestReview.setTopReviewOnlyYn("Y");
    		requestReview.setTopReviewFirstYn("Y");
    		requestReview.setImageOnlyYn("Y");
    		requestReview.setScope("All");
    		bestPhotoReview = productApi.getProductReviews(
    				requestReview.getProdReviewUnit()
    				, requestReview.getProdReviewType()
    				, requestReview.getOffset()
    				, requestReview.getLimit()
    				, getMemberSn()
    				, requestReview.getOnlineProdSn()
    				, requestReview.getProdSn()
    				, requestReview.getStyleCode()
    				, requestReview.getProdReviewSort()
    				, requestReview.getScope()
    				, requestReview.getTopReviewOnlyYn()
    				, requestReview.getTopReviewFirstYn()
    				, null
    	    		, null
    	    	    , "N"
					, null	// displayMenuSetId
					, null	// displayMenuId
			);
    	
    		//베스트 리뷰
    		requestReview.setLimit(1);
    		requestReview.setImageOnlyYn("N");
    		bestReview  = productApi.getProductReviews(
    				requestReview.getProdReviewUnit()
    				, requestReview.getProdReviewType()
    				, requestReview.getOffset()
    				, requestReview.getLimit()
    				, getMemberSn()
    				, requestReview.getOnlineProdSn()
    				, requestReview.getProdSn()
    				, requestReview.getStyleCode()
    				, requestReview.getProdReviewSort()
    				, requestReview.getScope()
    				, requestReview.getTopReviewOnlyYn()
    				, requestReview.getTopReviewFirstYn()
    				, null
    	    		, null
    	    	    , "N"
					, null
					, null
			);
    		
    	}catch(ApiException apiEx) {
    		summary = new ProdReviewSummaryInfo();
    		bestPhotoReview = new ProdReviewListInfo();
    		bestReview = new ProdReviewListInfo();
    	}
    	
    	model.addAttribute("prd", onlineProdInfo);
    	model.addAttribute("summary", summary);
    	if( summary != null ) {
    		for (ProdReviewCountPerScope tempScope : summary.getCountPerScopes()) {
    			if(maxCountPerScope == null) {
    				maxCountPerScope = tempScope;
    			} else if( tempScope.getPercent() >  maxCountPerScope.getPercent() ){
    				maxCountPerScope = tempScope;
    			}
			}
    	}
    	model.addAttribute("awards", awards);
    	model.addAttribute("isMaxRate", isMaxRate);
    	model.addAttribute("maxProd", maxProd);
    	model.addAttribute("maxCountPerScope", maxCountPerScope);
    	
    	// bestPhotoReview dummy data
    	if( bestPhotoReview.getTotalCount() == 0 ) {
    		bestPhotoReview.setTotalCount(10);
    		bestPhotoReview.setOffset(0);
    		bestPhotoReview.setLimit(10);
    		List<ProdReviewInfo> list = new ArrayList<>();
    		ProdReviewInfo info = null;
    		for (int i = 0; i < bestPhotoReview.getTotalCount(); i++) {
    			info = new ProdReviewInfo();
    			List<ProdReviewImg> imgList = new ArrayList<>();
    			ProdReviewImg img = null;
    			for (int j = 0; j < 3; j++) {
					img = new ProdReviewImg();
					img.setImageFileUrl("/mo/ko/images/dummy/img_mark_01.png");
					imgList.add(img);
				}
    			info.setProdReviewSn(164L);
    			info.setImgList(imgList);
    			list.add(info);
			}
    		bestPhotoReview.setProdReviewList(list);
    	}
    	model.addAttribute("bestPhotoReview", bestPhotoReview);		//베스트 포토 리뷰
    	
    	// bestPhotoReview dummy data
    	if( bestReview.getTotalCount() == 0 ) {
    		bestReview.setTotalCount(1);
    		bestReview.setOffset(0);
    		bestReview.setLimit(1);
    		List<ProdReviewInfo> list = new ArrayList<>();
    		ProdReviewInfo info = null;
    		for (int i = 0; i < bestReview.getTotalCount(); i++) {
    			info = new ProdReviewInfo();
    			List<ProdReviewImg> imgList = new ArrayList<>();
    			ProdReviewImg img = null;
    			for (int j = 0; j < 3; j++) {
					img = new ProdReviewImg();
					img.setImageFileUrl("/mo/ko/images/dummy/img_mark_01.png");
					imgList.add(img);
				}
    			
    			Calendar c = Calendar.getInstance();
    			info.setMemberId("amorep***");
    			info.setMemberLevelName("WELCOME");
    			info.setProdName("라이트 퍼플 40호");
    			info.setProdReviewRegistDt( c.getTime() );
    			info.setProdReviewBodyText("친구 선물 사려고 구매했는데 너무 좋아서 제껏도 샀어요 특히 피부색 칙칙한 날에 쓰면 화사해 보이고 화장한듯 안한듯 친구 선물 사려고 구매했는데 너무 좋아서 제껏도 샀어요 특히 피부색 칙칙한 날에 쓰면 화사해 ...");
    			info.setImgList(imgList);
    			list.add(info);
			}
    		bestReview.setProdReviewList(list);
    	}
    	model.addAttribute("bestReview", bestReview);				//베스트 리뷰

        SnsEntity snsEntity = new SnsEntity();
        snsEntity.setUrl(getFullUri());
        if(StringUtils.isEmpty(onlineProdInfo.getSnsImg())) {
        	snsEntity.setImage(snsImage);
        }else {
        	snsEntity.setImage(onlineProdInfo.getSnsImg());
        }
        if(StringUtils.isEmpty(onlineProdInfo.getSnsInterfaceTitle())) {
        	snsEntity.setTitle(snsTitle);
        }else {
        	snsEntity.setTitle(onlineProdInfo.getSnsInterfaceTitle());
        }
        if(StringUtils.isEmpty(onlineProdInfo.getSnsInterfaceDesc())) {
        	snsEntity.setDescription(snsDesc);
        }else {
        	snsEntity.setDescription(onlineProdInfo.getSnsInterfaceDesc());
        }
        snsEntity.setHashtag(onlineProdInfo.getHashTag());
		model.addAttribute("sns", snsEntity);

		SeoEntity seoEntity = new SeoEntity();
		seoEntity.setTitle(onlineProdInfo.getSeoTitle());
		seoEntity.setDescription(onlineProdInfo.getSeoDesc());
		seoEntity.setKeyword(onlineProdInfo.getSeoSearchKeyword());
		model.addAttribute("seo", seoEntity);

      	//상품히스토리 저장
		if(getMemberSn() != null && 0L != getMemberSn()) {
			ShoppingMarkPost shoppingMarkPost = new ShoppingMarkPost();
			shoppingMarkPost.setShoppingMarkTgtCode("Prod");

			if(requestReview.getProdSn() != null){
				shoppingMarkPost.setProdSn(requestReview.getProdSn());
			} else {
				//옵션선택하지 않은 경우, 첫번째 옵션의 prodSn로 세팅
				shoppingMarkPost.setProdSn(onlineProdInfo.getProducts().get(0).getProdSn());
			}

			shoppingMarkPost.setDisplayMenuSetId(APConstant.AP_DISPLAY_MENU_SET_ID);

			try{
				shoppingmarkApi.addShoppingHistories(getMemberSn(), shoppingMarkPost);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}

		return "product/product-detail";
	}
	
	/**
     * 상품평 목록 화면 
     * @param requestReview
     * @return
     */
    @GetMapping("/reviewList")
    public String reviewList(Model model, RequestReview requestReview) throws ParseException {
    	List<Map<String, Object>> maxSurvey = new ArrayList<>();
    	if( requestReview.getProdReviewUnit() == null ) {
    		requestReview.setProdReviewUnit("OnlineProd");
    	}
    	
    	if( requestReview.getProdReviewType() == null ) {
    		requestReview.setProdReviewType("All");
    	}
    	
    	//상품평요약정보조회 = 뷰티테스터 + 구매 후기
		ProdReviewSummaryInfo reviewStats 
			= productApi.getProductReviewSummary(
					  requestReview.getProdReviewUnit()	//상품평단위코드. - OnlineProd(온라인상품단위) - UnitProd(단위상품단위, 단위상품일련번호 필수) - StyleCode(스타일코드단위, 스타일코드 필수)
					, requestReview.getProdReviewType()	//상품평유형코드. All(전체), Pur(구매후기), Prod(상품리뷰), ExperienceGrp(체험단)
					, requestReview.getOnlineProdSn()	//온라인상품일련번호
					, null								//단위상품일련번호
					, null);							//스타일코드
		
		
		
		//후기 총합
		ProdReviewCountPerScope maxCountPerScope = null;
		
    	if( reviewStats != null ) {
    		for (ProdReviewCountPerScope tempScope : reviewStats.getCountPerScopes()) {
    			if(maxCountPerScope == null) {
    				maxCountPerScope = tempScope;
    			} else if( tempScope.getPercent() >  maxCountPerScope.getPercent() ){
    				maxCountPerScope = tempScope;
    			}
			}
    		
    		//설문요약 
    		for (ProdReviewSurveySummary tempSurvey : reviewStats.getProdReviewSurveys()) {
    			Map<String, Object> map = new HashMap<>();
    			ProdReviewCountPerResItem resItem  = null;
    			for (ProdReviewCountPerResItem tempItem : tempSurvey.getCountPerResItems() ) {
    				if( resItem == null ) {
    					resItem = tempItem;
    				}
    				if( resItem.getCount() < tempItem.getCount() ) {
    					resItem = tempItem;
    				}
    			}
    			if( resItem != null ) {
    				map.put("questionHeader", tempSurvey.getQuestionHeader());
    				map.put("responseBodyText", resItem.getResponseBodyText());
    				map.put("count", resItem.getCount());
    				map.put("rate", resItem.getRate());
    				maxSurvey.add(map);
    			}
    		}
    	}
    	
    	//구매후기
    	requestReview.setProdReviewType("Pur");
    	ProdReviewSummaryInfo purchaseReviewStats 
		= productApi.getProductReviewSummary(
				  requestReview.getProdReviewUnit()	//상품평단위코드. - OnlineProd(온라인상품단위) - UnitProd(단위상품단위, 단위상품일련번호 필수) - StyleCode(스타일코드단위, 스타일코드 필수)
				, requestReview.getProdReviewType()	//상품평유형코드. All(전체), Pur(구매후기), Prod(상품리뷰), ExperienceGrp(체험단)
				, requestReview.getOnlineProdSn()	//온라인상품일련번호
				, null								//단위상품일련번호
				, null);							//스타일코드
    	
    	model.addAttribute("maxCountPerScope", maxCountPerScope);
    	model.addAttribute("reviewStats", reviewStats);
    	model.addAttribute("maxSurvey", maxSurvey);
    	model.addAttribute("purchaseReviewStats", purchaseReviewStats);
    	
		return "product/review-list";
    }
    
    /**
     * 리뷰 필터링
     * @param requestReview
     * @return
     */
    @GetMapping("/filterReviewList/{filterType}")
    public String filterReviewList(@PathVariable String filterType, String keyword, Model model) throws ParseException {
    	model.addAttribute("filterType", filterType);
    	model.addAttribute("keyword", keyword);
    	
    	return "product/filter-review-list";
    }
}
