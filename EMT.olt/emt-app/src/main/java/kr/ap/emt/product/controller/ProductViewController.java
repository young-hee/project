package kr.ap.emt.product.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.emt.product.vo.RequestReview;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.common.SeoEntity;
import kr.ap.comm.support.common.SnsEntity;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.ProductSaleDisplayStatus;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.sales.article.ArticleSearchResult;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplayEventListResult;
import net.g1project.ecp.api.model.sales.product.OnlineProdInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewSummaryInfo;
import net.g1project.ecp.api.model.sales.product.ProductInfo;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.EnumUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/product")
public class ProductViewController extends AbstractController {

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
    	
		//단위상품 판매표시상태코드 체크 방어로직추가, 정의되지 않은 상태라면 main로 return한다.
		for (ProductInfo p : onlineProdInfo.getProducts()) {
			boolean validEnum = EnumUtils.isValidEnum(ProductSaleDisplayStatus.class, p.getSaleDisplayStatus());
			if(!validEnum) {
				return "redirect:/main"; // 상품상태에 따른 return  온라인상품 판매표시상태코드 - OnSale(판매중) - OutOfStock(품절) - Exhaustion(조기소진) - WaitingSale(판매대기) - SuspendSale(판매일시중지) - EndSale(판매종료)
			}
		}
    	
    	ArticleSearchResult relateArticle = articleApi.getProdArticleList(requestReview.getOnlineProdSn(), "SortOrder", "Y", 0, 1 );
    	
    	ProdReviewSummaryInfo summary;
    	PlanDisplayEventListResult relateEventList;
    
    	try {
    		requestReview.setProdReviewType("All"); //All(전체), Pur(구매후기), Prod(상품리뷰), ExperienceGrp(체험단)
    		requestReview.setProdReviewUnit("OnlineProd"); //OnlineProd(온라인상품단위) - UnitProd(단위상품단위, 단위상품일련번호 필수) - StyleCode(스타일코드단위, 스타일코드 필수)
    		summary = productApi.getProductReviewSummary(requestReview.getProdReviewUnit(), requestReview.getProdReviewType(), requestReview.getOnlineProdSn(), requestReview.getProdSn(), requestReview.getStyleCode());
    		//relateEventList = plandisplayApi.getOnlineProdPlanDisplayEventList(requestReview.getOnlineProdSn(), "Progress", 0, 2, getMemberSn());
    		relateEventList = plandisplayApi.getOnlineProdPlanDisplayEventList(requestReview.getOnlineProdSn(), requestReview.getStatus(), requestReview.getProdReviewType(), "Y", "SortOrder", 0, 0);
    	}catch(ApiException apiEx) {
    		summary = new ProdReviewSummaryInfo();
    		relateEventList = new PlanDisplayEventListResult();
    	}
    	
    	model.addAttribute("prd", onlineProdInfo);
    	model.addAttribute("summary", summary);
    	model.addAttribute("relateArticle", relateArticle);
    	model.addAttribute("relateEventList", relateEventList);

        SnsEntity snsEntity = new SnsEntity();
        snsEntity.setUrl(getFullUri());
        snsEntity.setImage(onlineProdInfo.getSnsImg());
        snsEntity.setTitle(onlineProdInfo.getSnsInterfaceTitle());
        snsEntity.setDescription(onlineProdInfo.getSnsInterfaceDesc());
		model.addAttribute("sns", snsEntity);

		SeoEntity seoEntity = new SeoEntity();
		seoEntity.setTitle(onlineProdInfo.getSeoTitle());
		seoEntity.setDescription(onlineProdInfo.getSeoDesc());
		seoEntity.setKeyword(onlineProdInfo.getSeoSearchKeyword());
		model.addAttribute("seo", seoEntity);

      	//상품히스토리 저장
		if(0L != getMemberSn()) {
			ShoppingMarkPost shoppingMarkPost = new ShoppingMarkPost();
			shoppingMarkPost.setShoppingMarkTgtCode("Prod");

			if(requestReview.getProdSn() != null){
				shoppingMarkPost.setProdSn(requestReview.getProdSn());
			} else {
				//옵션선택하지 않은 경우, 첫번째 옵션의 prodSn로 세팅
				shoppingMarkPost.setProdSn(onlineProdInfo.getProducts().get(0).getProdSn());
			}

			shoppingMarkPost.setDisplayMenuSetId(APConstant.EH_DISPLAY_MENU_SET_ID);

			try{
				shoppingmarkApi.addShoppingHistories(getMemberSn(), shoppingMarkPost);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}

		 //Mobile
		if (isMobileDevice()) {
			return "product/goods_detail";
		}

		//PC
		if (isPcDevice()) {
			return "product/product-01";
		}
            

        return null;
    }

}