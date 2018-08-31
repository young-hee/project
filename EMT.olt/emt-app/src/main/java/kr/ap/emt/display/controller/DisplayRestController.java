/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.emt.display.vo.RequestDisplay;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.display.CornerContentsSet;
import net.g1project.ecp.api.model.sales.display.FlaggedProdRankChange;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.display.OnlineProdListStp;
import net.g1project.ecp.api.model.sales.display.ProductSummaryList;
import net.g1project.ecp.api.model.sales.keywordPopup.KeywordLinkInfo;
import net.g1project.ecp.api.model.sales.keywordPopup.PopupInfo;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkByDateSearchResult;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkDeleteResult;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
@RestController
@RequestMapping("/display")
public class DisplayRestController extends AbstractController {

    /**
     * 메뉴페이지상품 리스트조회
     * 
     * @param requestDisplay
     * @param displayMenuId
     * @return
     */
	@RequestMapping({"/prodList/{displayMenuId}", "/prodList/{displayMenuId}/preview"})
    public ResponseEntity<?> prodList( RequestDisplay requestDisplay, @PathVariable String displayMenuId, String previewKey, String previewDate) throws Exception {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		OnlineProdList filterableOnlineProdList
			= displayApi.getMenuPageProdList(
			APConstant.EH_DISPLAY_MENU_SET_ID
			, displayMenuId
			, previewKey
			, previewDate != null ? sf.parse(previewDate) : null
			, false
			, requestDisplay.getProdSort()
			, requestDisplay.getOffset()
			, requestDisplay.getLimit()
			, requestDisplay.getIncludeFilters()
			, requestDisplay.getDisplayCateDepth()
			, requestDisplay.getDisplayCate()
			, requestDisplay.getBrand()
			, requestDisplay.getFlag()
			, requestDisplay.getAttr()
			, requestDisplay.getPriceRange());
		if (filterableOnlineProdList == null) {
			throw new Exception();
		}

		result.put("filterableOnlineProdList", filterableOnlineProdList);
		return ResponseEntity.ok(result);

    }
	
	/**
	 * 메뉴페이지코너정보조회
	 * 
	 * @param requestDisplay
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping({"/cornerList/{displayMenuId}", "/cornerList/{displayMenuId}/preview"})
    public ResponseEntity<?> cornerList(RequestDisplay requestDisplay, @PathVariable String displayMenuId, String previewKey, String previewDate) throws ParseException {
		HashMap<String, Object> result = new HashMap<String, Object>();

		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		List <Corner> cornerList = displayApi.getMenuPageCorners(
			APConstant.EH_DISPLAY_MENU_SET_ID
			, displayMenuId
			, previewKey
			, previewDate != null ? sf.parse(previewDate) : null
			, requestDisplay.getCornerIds()
			, requestDisplay.isExcludeSoldOut());
		result.put("cornerList", cornerList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 메뉴페이지코너정보조회
	 * 
	 * @param displayMenuId
	 * @param previewKey
	 * @param previewDate
	 * @return
	 */
	@RequestMapping({"/cornerList", "/cornerList/preview"})
    public ResponseEntity<?> cornerList2(String displayMenuId, String previewKey, String previewDate) throws ParseException {
		HashMap<String, Object> result = new HashMap<String, Object>();

		Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		RequestDisplay rd = new RequestDisplay();
		rd.setExcludeSoldOut(false);
		String cornerIds = "";
		// Mobile
		if (isMobileDevice()) {
			cornerIds = "M02_" + displayMenuId + "_m.1," + "M02_" + displayMenuId + "_m.2";
			if(displayMenuId.equals("search")) {
				rd.setCornerIds(cornerIds);
			}
		}

		// PC
		if (isPcDevice()) {
			cornerIds = "M02_" + displayMenuId + "_p.1," + "M02_" + displayMenuId + "_p.2";
			if(displayMenuId.equals("search")) {
				rd.setCornerIds(cornerIds);
			}
		}

		List <Corner> cornerList = displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId, previewKey, previewDate != null ? sf.parse(previewDate) : null, rd.getCornerIds(), rd.isExcludeSoldOut());
		for (Corner c : cornerList) {
			cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
		}

		result.put("cornersMap", cornersMap);
		result.put("cornerList", cornerList);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 플래그 상품목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/flaggedProdList")
    public ResponseEntity<?> flaggedProdList( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();

		OnlineProdList onlineProdList
			= displayApi.getFlaggedProdList(
			requestDisplay.getFlags()
			, requestDisplay.isExcludeSoldOut()
			, requestDisplay.getProdListUnit()
			, requestDisplay.getProdSort()
			, requestDisplay.getOffset()
			, requestDisplay.getLimit()
			, requestDisplay.getIncludeFilters()
			, requestDisplay.getDisplayCateDepth()
			, requestDisplay.getDisplayCate()
			, requestDisplay.getBrand()
			, requestDisplay.getFlag()
			, requestDisplay.getAttr()
			, requestDisplay.getPriceRange()
		);
		result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 플래그상품순위 목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/flaggedProdRankChanges")
	public ResponseEntity<?> flaggedProdRankChanges( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
        
		List<FlaggedProdRankChange> flaggedProdRankChange = displayApi.getFlaggedProdRankChanges(requestDisplay.getRankFlag(), requestDisplay.getLimit());
		result.put("flaggedProdRankChange", flaggedProdRankChange);
		return ResponseEntity.ok(result);

    }
	
	
	/**
	 * 프로모션 상품목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/inPromoProdList")
    public ResponseEntity<?> inPromoProdList( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
        
		//OnlineProdList onlineProdList = displayApi.getInPromoProdList(getMemberSn(), requestDisplay.getPromoSn(), false, "OnlineProd", requestDisplay.getProdSort(), requestDisplay.getOffset(), requestDisplay.getLimit());
		//result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 다운로드쿠폰 목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/downloadCoupons")
    public ResponseEntity<?> downloadCoupons( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();

		//result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 다운로드 쿠폰 등록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/downloadCoupon")
    public ResponseEntity<?> downloadCoupon( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
        
		BooleanResult booleanResult = couponApi.registDownloadCoupon(requestDisplay.getCouponSn(), getMemberSn());

		result.put("result", booleanResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 포인트교환 상품목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/pointExchangeableProdList")
    public ResponseEntity<?> pointExchangeableProdList( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
		/*
		@Param("memberSn") Long memberSn
		, @Param("pointType") String pointType
		, @Param("pointExch") String pointExch
		, @Param("excludeSoldOut") Boolean excludeSoldOut
		, @Param("prodSort") String prodSort
		, @Param("offset") Integer offset
		, @Param("limit") Integer limit
		, @Param("includeFilters") Boolean includeFilters
		, @Param("displayCate") Long displayCate
		, @Param("brand") Long brand
		, @Param("flag") String flag
		, @Param("attr") String attr
		, @Param("priceRange") String priceRange
		*/
		OnlineProdList onlineProdList
			= displayApi.getPointExchangeableProdList(
			requestDisplay.getPointType()
			, requestDisplay.getPointExch()
			, false
			, requestDisplay.getProdSort()
			, requestDisplay.getOffset()
			, requestDisplay.getLimit()
			, requestDisplay.getIncludeFilters()
			, requestDisplay.getDisplayCateDepth()
			, requestDisplay.getDisplayCate()
			, requestDisplay.getBrand()
			, requestDisplay.getFlag()
			, requestDisplay.getAttr()
			, requestDisplay.getPriceRange()
		);
		result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 포인트교환 사은품목록
	 * @param requestDisplay
	 * @return giftList : { ProductSummaryList : data }
	 */
	@RequestMapping("/pointExchangeableGiftList")
    public ResponseEntity<?> pointExchangeableGiftList( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
		ProductSummaryList giftList
			= displayApi.getPointExchangeableGiftList(
					  requestDisplay.getPointType()
					, requestDisplay.isExcludeSoldOut()
					, requestDisplay.getOffset()
					, requestDisplay.getLimit()
					);
		result.put("giftList", giftList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 동시구매기획전그룹별 상품목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/inSameTimePurProdGrp")
    public ResponseEntity<?> inSameTimePurProdGrp( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
		
        /*
		@Param("memberSn") Long memberSn
		, @Param("sameTimePurProdGrpSn") Long sameTimePurProdGrpSn
		, @Param("excludeSoldOut") Boolean excludeSoldOut
		, @Param("offset") Integer offset
		, @Param("limit") Integer limit
		
		, @Param("includeFilters") Boolean includeFilters
		, @Param("displayCate") Long displayCate
		, @Param("brand") Long brand
		, @Param("flag") String flag
		, @Param("attr") String attr
		, @Param("priceRange") String priceRange
		*/


		OnlineProdListStp onlineProdList
			= displayApi.getInSameTimePurProdGrpProdList(
			requestDisplay.getSameTimePurProdGrpSn()
			, false
			, requestDisplay.getOffset()
			, requestDisplay.getLimit()
			, requestDisplay.getIncludeFilters()
			, requestDisplay.getDisplayCateDepth()
			, requestDisplay.getDisplayCate()
			, requestDisplay.getBrand()
			, requestDisplay.getFlag()
			, requestDisplay.getAttr()
			, requestDisplay.getPriceRange()
		);
		result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 상품기획전 그룹별 상품목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/inPlanDisplayProdGrp")
    public ResponseEntity<?> inPlanDisplayProdGrp( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		/*
		@Param("memberSn") Long memberSn
		, @Param("planDisplayProdGrpSn") Long planDisplayProdGrpSn
		, @Param("excludeSoldOut") Boolean excludeSoldOut
		, @Param("offset") Integer offset
		, @Param("limit") Integer limit
		, @Param("includeFilters") Boolean includeFilters
		, @Param("displayCate") Long displayCate
		, @Param("brand") Long brand
		, @Param("flag") String flag
		, @Param("attr") String attr
		, @Param("priceRange") String priceRange
		*/

		OnlineProdList onlineProdList
			= displayApi.getInPlanDisplayProdGrpProdList(
			requestDisplay.getPlanDisplayProdGrpSn()
			, false
			, requestDisplay.getOffset()
			, requestDisplay.getLimit()
			, requestDisplay.getIncludeFilters()
			, requestDisplay.getDisplayCateDepth()
			, requestDisplay.getDisplayCate()
			, requestDisplay.getBrand()
			, requestDisplay.getFlag()
			, requestDisplay.getAttr()
			, requestDisplay.getPriceRange()
		);
		result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 아티클연관 상품목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/articleRelated")
    public ResponseEntity<?> articleRelated( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
        /*
		@Param("memberSn") Long memberSn
		, @Param("articleSn") Long articleSn
		, @Param("excludeSoldOut") Boolean excludeSoldOut
		, @Param("offset") Integer offset
		, @Param("limit") Integer limit
		, @Param("includeFilters") Boolean includeFilters
		, @Param("displayCate") Long displayCate
		, @Param("brand") Long brand
		, @Param("flag") String flag
		, @Param("attr") String attr
		, @Param("priceRange") String priceRange
		*/

		OnlineProdList onlineProdList
			= displayApi.getArticleRelatedProdList(
			requestDisplay.getArticleSn()
			, false
			, requestDisplay.getOffset()
			, requestDisplay.getLimit()
			, requestDisplay.getIncludeFilters()
			, requestDisplay.getDisplayCateDepth()
			, requestDisplay.getDisplayCate()
			, requestDisplay.getBrand()
			, requestDisplay.getFlag()
			, requestDisplay.getAttr()
			, requestDisplay.getPriceRange()
		);
		result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 함께많이구매한 상품목록
	 * @param requestDisplay
	 * @return
	 */
	@RequestMapping("/boughtTogether")
    public ResponseEntity<?> boughtTogether( RequestDisplay requestDisplay) {
        
		HashMap<String, Object> result = new HashMap<String, Object>();
		/*
		@Param("memberSn") Long memberSn
		, @Param("prodSnList") Long prodSnList
		, @Param("totalListSize") Integer totalListSize
		, @Param("excludeSoldOut") Boolean excludeSoldOut
		, @Param("prodListUnit") String prodListUnit
		, @Param("prodSort") String prodSort
		, @Param("offset") Integer offset
		, @Param("limit") Integer limit
		, @Param("includeFilters") Boolean includeFilters
		, @Param("displayCate") Long displayCate
		, @Param("brand") Long brand
		, @Param("flag") String flag
		, @Param("attr") String attr
		, @Param("priceRange") String priceRange
        */
		/**
		 * 화면와 무관하게 검색엔진쪽 조회할 listSize 설정.
		 */
		Integer totalListSize = 20;
		OnlineProdList onlineProdList
			= displayApi.getBoughtTogetherProdList(
			requestDisplay.getProdSnList()
			, totalListSize
			, false
			, "OnlineProd"
			, requestDisplay.getProdSort()
			, requestDisplay.getOffset()
			, requestDisplay.getLimit()
			, requestDisplay.getIncludeFilters()
			, requestDisplay.getDisplayCateDepth()
			, requestDisplay.getDisplayCate()
			, requestDisplay.getBrand()
			, requestDisplay.getFlag()
			, requestDisplay.getAttr()
			, requestDisplay.getPriceRange()
		);
		result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 쇼핑히스토리 전체삭제
	 * 
	 * @return
	 */
	@RequestMapping("/deleteShoppingMarksAll")
    public ResponseEntity<?> deleteShoppingMarksAll() {
		HashMap<String, Object> result = new HashMap<String, Object>();

		ShoppingMarkDeleteResult shoppingMarkDeleteResult = shoppingmarkApi.deleteShoppingHistoriesByMember(getMemberSn());
		result.put("shoppingMarkDeleteResult", shoppingMarkDeleteResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 검색창 키워드 링크
	 * 
	 * @return
	 */
	@RequestMapping("/marketingKeyword")
    public ResponseEntity<?> marketingKeyword() {
		HashMap<String, Object> result = new HashMap<String, Object>();

    	String memberOnlyYn = "N";
    	
    	if(isLoggedIn()) {
    		memberOnlyYn = "Y";
    	}
    	
		// FIXME offset, limit 값 임의지정함.
		List <KeywordLinkInfo> keywordLinkList = keywordPopupApi.getKeywordLink( memberOnlyYn, getMemberSn(), 0, 10);
		result.put("keywordLinkList", keywordLinkList);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 쇼핑 히스토리 목록 조회
	 * 
	 * @return
	 */
	@RequestMapping("/shoppingHistoryList")
	public ResponseEntity<?> shoppingHistoryList() {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		DateFormat dateFormat = new SimpleDateFormat("Z");
		String timeZone = dateFormat.format(new Date());

		List <ShoppingMarkByDateSearchResult> shoppingHistoryList = shoppingmarkApi.getShoppingHistoriesByDate(getMemberSn(), APConstant.EH_DISPLAY_MENU_SET_ID, 3, 100, timeZone);
		result.put("shoppingHistoryList", shoppingHistoryList);

		return ResponseEntity.ok(result);

	}
	
	/**
	 * 카테고리 유형별 코너 이미지 조회
	 * 
	 * @return
	 */
	@RequestMapping({"/categoryTypeImgList", "/categoryTypeImgList/preview"})
	public ResponseEntity<?> categoryTypeImgList(String previewKey, String previewDate) throws ParseException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		String cornerIds = "M02_prod_types_p.1";
		List<Corner> corners = displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID, "prod_types", previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);

		for (Corner c : corners) {
			cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
		}

		cornerIds = "M02_prod_lines_p.1,M02_prod_lines_p.2";
		corners = displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID, "prod_lines", previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);

		for (Corner c : corners) {
			cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
		}

		cornerIds = "M02_prod_thema_p.1,M02_prod_thema_p.2";
		corners = displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID, "prod_thema", previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);

		for (Corner c : corners) {
			cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
		}

		result.put("cornersMap", cornersMap);

		return ResponseEntity.ok(result);

	}
	
	/**
	 * 홈화면 hotdeal, 한정판매 
	 * @return
	 */
	
	@RequestMapping({"/inSpPriceSale","/inSpPriceSale/preview"})
	public ResponseEntity<?> inSpPriceSale(RequestDisplay requestDisplay) {
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		OnlineProdList onlineProdList = displayApi.getInSpPriceSaleProdList(requestDisplay.getSpPriceSaleType(), requestDisplay.isExcludeSoldOut(), requestDisplay.getProdListUnit(), requestDisplay.getProdSort(), requestDisplay.getOffset(), requestDisplay.getLimit(), requestDisplay.getIncludeFilters(),requestDisplay.getDisplayCateDepth(),requestDisplay.getDisplayCate(),requestDisplay.getBrand(),requestDisplay.getFlag(),requestDisplay.getAttr(),requestDisplay.getPriceRange());
		
		result.put("onlineProdList", onlineProdList);

		return ResponseEntity.ok(result);

	
	}

	/**
	 * 홈화면 진입시 등록한 팝업 노출
	 * @return
	 */
	@RequestMapping({"/mainPopups", "/mainPopups/preview"})
	public ResponseEntity<?> mainPopups() {
		HashMap<String, Object> result = new HashMap<String, Object>();
 
		List<PopupInfo> popupList = keywordPopupApi.getPopups();
	
		result.put("popupList", popupList);

		return ResponseEntity.ok(result);

	
	}
	
    
}
