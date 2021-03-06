/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.display.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.WordUtils;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ap.amt.display.vo.RequestArticle;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.common.SeoEntity;
import kr.ap.comm.support.common.SnsEntity;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.util.FromEndDateUtils;
import kr.ap.amt.product.vo.RequestReview;
import net.g1project.ecp.api.model.sales.article.Article;
import net.g1project.ecp.api.model.sales.article.ArticleComment;
import net.g1project.ecp.api.model.sales.article.ArticleCommentPost;
import net.g1project.ecp.api.model.sales.article.ArticleCommentResult;
import net.g1project.ecp.api.model.sales.article.ArticleSearchResult;
import net.g1project.ecp.api.model.sales.article.ExecuteResult;
import net.g1project.ecp.api.model.sales.article.PlanDisplayResult;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.display.CornerContentsSet;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.display.PageInfo;
import net.g1project.ecp.api.model.sales.guide.FoPushResult;
import net.g1project.ecp.api.model.sales.point.ActivityPointHists;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkByDateSearchResult;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;

@Controller
@RequestMapping("/display")
public class DisplayViewController extends AbstractController {

	@RequestMapping({"/category/{displayMenuId}", "/category/{displayMenuId}/preview"})
	public String bigCategory(Model model, @PathVariable String displayMenuId, String upperMenuId,
			String categoryType, String previewKey, String previewDate) {
		
		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		/*
		if ("prod_types".equals(categoryType) || "prod_lines".equals(categoryType)) {
			cornerIds = "";
		} else if ("prod_thema".equals(categoryType)) {
			cornerIds = "M01_" + displayMenuId + "_m.1,M01_" + displayMenuId + "_m.2,M01_" + displayMenuId + "_m.3,M01_"
					+ displayMenuId + "_m.4";
		}
		*/

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId,
					previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);

		model.addAttribute("displayMenuId", displayMenuId);
		model.addAttribute("upperMenuId", upperMenuId);
		model.addAttribute("categoryType", categoryType);
		model.addAttribute("pageType", "category");
		model.addAttribute("displayCateSn", pageInfo.getDisplayCateSns());
		
		// 쇼핑히스토리 추가
		/*
		f(0L != getMemberSn()) {
  			ShoppingMarkPost body = new ShoppingMarkPost();
  			body.setShoppingMarkTgtCode("Menu");
  			body.setDisplayMenuId(displayMenuId);     			
  			body.setDisplayMenuSetId(APConstant.EH_DISPLAY_MENU_SET_ID);
  			try{
  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
  			}catch(Exception e) {
  				e.printStackTrace();
  			}
  		}
  		*/

		return "display/" + pageInfo.getMenuPageFileId();
	}
	
	@RequestMapping("/shopping_history")
	@PageTitle(title = "쇼핑 히스토리")
	public String shopping_history(Model model, String displayMenuId) {

		// Mobile
		if (isMobileDevice()) {

		}

		// PC
		if (isPcDevice()) {

		}

		DateFormat dateFormat = new SimpleDateFormat("Z");
		String timeZone = dateFormat.format(new Date());

		List<ShoppingMarkByDateSearchResult> shoppingHistoryList = shoppingmarkApi
				.getShoppingHistoriesByDate(getMemberSn(), APConstant.AP_DISPLAY_MENU_SET_ID, 3, 100, timeZone);

		model.addAttribute("displayMenuId", displayMenuId);
		model.addAttribute("shoppingHistoryList", shoppingHistoryList);

		return "display/shopping-history";
	}

	@RequestMapping("/notification")
	@PageTitle(title = "알림")
	public String notification(Model model, String displayMenuId) {

		Date endDt = new Date();
		Date fromDt = DateUtils.addMonths(endDt, -1);

		FoPushResult foPushResult = guideApi.getFoPushes(0, null, FromEndDateUtils.initFromDate(fromDt),
				FromEndDateUtils.initEndDate(endDt));

		model.addAttribute("displayMenuId", displayMenuId);
		model.addAttribute("foPushResult", foPushResult);

		return "display/notification";
	}
	
	@RequestMapping({"/issue1", "/issue1/preview", "/issue2", "/issue2/preview"})
	@PageTitle(title = "이슈")
	public String issue1(Model model, String displayMenuId, String previewKey, String previewDate) {

		String cornerIds =  "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		//String endDate = DateFormatUtils.format(DateUtils.addDays(new Date(), -30), "yyyy-MM-dd");
		//DateUtils.addDays(new Date(), -30);
		
		try {
			//Mobile
			if (isMobileDevice()) {
				cornerIds = "M01_" + displayMenuId + "_m.1," + "M01_" + displayMenuId + "_m.2," + "M01_" + displayMenuId + "_m.3," + "M01_" + displayMenuId + "_m.4," + "M01_" + displayMenuId + "_m.5";
				if("issue1".equals(displayMenuId)) {
					cornerIds = cornerIds + "," + "M01_" + displayMenuId + "_m.6," + "M01_" + displayMenuId + "_m.7," + "M01_" + displayMenuId + "_m.8," + "M01_" + displayMenuId + "_m.9," + "M01_" + displayMenuId + "_m.10";					
				}
			}

			//PC
			if (isPcDevice()) {
				cornerIds = "M01_" + displayMenuId + "_m.1," + "M01_" + displayMenuId + "_m.2," + "M01_" + displayMenuId + "_m.3," + "M01_" + displayMenuId + "_m.4," + "M01_" + displayMenuId + "_m.5";
				if("issue1".equals(displayMenuId)) {
					cornerIds = cornerIds + "," + "M01_" + displayMenuId + "_m.6," + "M01_" + displayMenuId + "_m.7," + "M01_" + displayMenuId + "_m.8," + "M01_" + displayMenuId + "_m.9," + "M01_" + displayMenuId + "_m.10";					
				}
			}

	        List<Corner> corners = displayApi.getMenuPageCorners(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId, previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);
			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}
			
			model.addAttribute("cornersMap", cornersMap);
		
		}catch(Exception e) {
			model.addAttribute("cornersMap", null);
	    }
		
		
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);

		model.addAttribute("displayMenuId", displayMenuId);
		// return "display/product-list-12";
		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/sale"})
	@PageTitle(title = "Sale")
	public String sale(Model model, String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);
		
		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		
		cornerIds = "M01_sale_m.1";

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
					APConstant.AP_DISPLAY_MENU_SET_ID, 
					displayMenuId,
					previewKey, 
					previewDate != null ? sf.parse(previewDate) : null, 
					cornerIds, 
					false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/onePlusOnePromo"})
	@PageTitle(title = "1+1행사")
	public String onePlusOnePromo(Model model, String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);
		
		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		cornerIds = "M01_onePlusOnePromo_m.1";

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
					APConstant.AP_DISPLAY_MENU_SET_ID, 
					displayMenuId,
					previewKey, 
					previewDate != null ? sf.parse(previewDate) : null, 
					cornerIds, 
					false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/todayHotdeal"})
	@PageTitle(title = "투데이핫딜")
	public String todayHotdeal(Model model, String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);
		
		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		cornerIds = "M01_todayHotdeal_m.1";

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
					APConstant.AP_DISPLAY_MENU_SET_ID, 
					displayMenuId,
					previewKey, 
					previewDate != null ? sf.parse(previewDate) : null, 
					cornerIds, 
					false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/specialGift"})
	@PageTitle(title = "스페셜기프트")
	public String specialGift(Model model, String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);

		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		cornerIds = "M01_specialGift_m.1";

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
					APConstant.AP_DISPLAY_MENU_SET_ID,
					displayMenuId,
					previewKey,
					previewDate != null ? sf.parse(previewDate) : null,
					cornerIds,
					false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/cusionZone"})
	@PageTitle(title = "쿠션존")
	public String cushionZone(Model model, String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);

		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		cornerIds = "M01_cusionZone_m.1";

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
				APConstant.AP_DISPLAY_MENU_SET_ID,
				displayMenuId,
				previewKey,
				previewDate != null ? sf.parse(previewDate) : null,
				cornerIds,
				false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/trendOnAir"})
    @PageTitle(title = "트렌드온에어")
    public String trendOnAir(Model model, String displayMenuId) {
				
		//displayMenuId = displayMenuId;
		String displayPageId ="a" + WordUtils.capitalize(displayMenuId);
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		
        //Mobile
        if (isMobileDevice()) {
        }

        //PC
        if (isPcDevice()) {
        }
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("displayPageId", displayPageId);
        
        return "display/" + pageInfo.getMenuPageFileId();
       // return "display/etude-pick"; 

    }
	
	@RequestMapping({"/trendOnAir/detail"})
    @PageTitle(title = "트렌드온에어")
    public String trendOnAirDatail(Model model, String displayMenuId, RequestArticle requestArticle, String previewKey) {
		
		displayMenuId = "trendOnAir";
		String displayPageId ="a" + WordUtils.capitalize(displayMenuId);
		//Mobile
        if (isMobileDevice()) {
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        
        Article article = articleApi.getArticle(requestArticle.getArticleSn(), previewKey);

        //sns 공유하기 설정
		SnsEntity snsEntity = new SnsEntity();
        snsEntity.setUrl(getFullUri());
        if(StringUtils.isEmpty(article.getSnsIfImg())) {
        	if (isMobileDevice()) {
        		snsEntity.setImage(article.getBannerImgM1());
        	}else {
        		snsEntity.setImage(article.getBannerImgP1());
        	}
        }else {
        	snsEntity.setImage(article.getSnsIfImg());
        }      
        if(StringUtils.isEmpty(article.getSnsIfTitle())) {
        	snsEntity.setTitle(article.getArticleTitle());
        }else {
        	snsEntity.setTitle(article.getSnsIfTitle());
        }
        if(StringUtils.isEmpty(article.getSnsIfDesc())) {
        	snsEntity.setDescription(article.getArticleTitle());
        }else {
        	snsEntity.setDescription(article.getSnsIfDesc());
        }
        snsEntity.setHashtag(article.getSnsHashTag());
		model.addAttribute("sns", snsEntity);

		SeoEntity seoEntity = new SeoEntity();
		seoEntity.setTitle(article.getSeoTitle());
		seoEntity.setDescription(article.getSeoDesc());
		seoEntity.setKeyword(article.getSeoSearchKeyword());
		model.addAttribute("seo", seoEntity);

        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("displayPageId", displayPageId);
        model.addAttribute("article", article);


        //아티클 히스토리 저장
//  		if(0L != getMemberSn()) {
//  			ShoppingMarkPost body = new ShoppingMarkPost();
//  			body.setShoppingMarkTgtCode("Article");
//  			body.setArticleSn(article.getArticleSn());      			
//  			body.setDisplayMenuSetId(APConstant.AP_DISPLAY_MENU_SET_ID);
//  			body.setDisplayMenuId(displayMenuId);
//  			try{
//  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
//  			}catch(Exception e) {
//  				e.printStackTrace();
//  			}
//  		}
        

        return "display/" + displayMenuId + "-detail"; 

    }
	
	@RequestMapping({"/superBeautyTip"})
    @PageTitle(title = "슈퍼뷰티팁")
    public String superBeautyTip(Model model, String displayMenuId) {
				
		//displayMenuId ="superBeautyTip";
		String displayPageId ="a" + WordUtils.capitalize(displayMenuId);
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		
        //Mobile
        if (isMobileDevice()) {
        }

        //PC
        if (isPcDevice()) {
        }
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("displayPageId", displayPageId);
        
        return "display/" + pageInfo.getMenuPageFileId();
       // return "display/etude-pick"; 

    }
	
	@RequestMapping({"/superBeautyTip/detail"})
    @PageTitle(title = "슈퍼뷰티팁")
    public String superBeautyTipDatail(Model model, String displayMenuId, RequestArticle requestArticle, String previewKey) {
		
		displayMenuId ="superBeautyTip";
		String displayPageId ="a" + WordUtils.capitalize(displayMenuId);
		//Mobile
        if (isMobileDevice()) {
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        
        Article article = articleApi.getArticle(requestArticle.getArticleSn(), previewKey);

        //sns 공유하기 설정
		SnsEntity snsEntity = new SnsEntity();
        snsEntity.setUrl(getFullUri());
        if(StringUtils.isEmpty(article.getSnsIfImg())) {
        	if (isMobileDevice()) {
        		snsEntity.setImage(article.getBannerImgM1());
        	}else {
        		snsEntity.setImage(article.getBannerImgP1());
        	}
        }else {
        	snsEntity.setImage(article.getSnsIfImg());
        }      
        if(StringUtils.isEmpty(article.getSnsIfTitle())) {
        	snsEntity.setTitle(article.getArticleTitle());
        }else {
        	snsEntity.setTitle(article.getSnsIfTitle());
        }
        if(StringUtils.isEmpty(article.getSnsIfDesc())) {
        	snsEntity.setDescription(article.getArticleTitle());
        }else {
        	snsEntity.setDescription(article.getSnsIfDesc());
        }
        snsEntity.setHashtag(article.getSnsHashTag());
		model.addAttribute("sns", snsEntity);

		SeoEntity seoEntity = new SeoEntity();
		seoEntity.setTitle(article.getSeoTitle());
		seoEntity.setDescription(article.getSeoDesc());
		seoEntity.setKeyword(article.getSeoSearchKeyword());
		model.addAttribute("seo", seoEntity);

        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("displayPageId", displayPageId);
        model.addAttribute("article", article);


        //아티클 히스토리 저장
//  		if(0L != getMemberSn()) {
//  			ShoppingMarkPost body = new ShoppingMarkPost();
//  			body.setShoppingMarkTgtCode("Article");
//  			body.setArticleSn(article.getArticleSn());      			
//  			body.setDisplayMenuSetId(APConstant.AP_DISPLAY_MENU_SET_ID);
//  			body.setDisplayMenuId(displayMenuId);
//  			try{
//  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
//  			}catch(Exception e) {
//  				e.printStackTrace();
//  			}
//  		}
        

        return "display/superBeautyTip-detail"; 

    }

	@RequestMapping({"/apShoppingTip"})
    @PageTitle(title = "AP쇼핑팁")
    public String apTip(Model model, String displayMenuId) {
				
		//displayMenuId ="apShoppingTip";
		String displayPageId ="a" + WordUtils.capitalize(displayMenuId);
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		
        //Mobile
        if (isMobileDevice()) {
        }

        //PC
        if (isPcDevice()) {
        }
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("displayPageId", displayPageId);
        
        return "display/" + pageInfo.getMenuPageFileId();
       // return "display/etude-pick"; 

    }
	
	@RequestMapping({"/apShoppingTip/detail"})
    @PageTitle(title = "AP쇼핑팁")
    public String apTipDatail(Model model, String displayMenuId, RequestArticle requestArticle, String previewKey) {
		
		displayMenuId ="apShoppingTip";
		String displayPageId ="a" + WordUtils.capitalize(displayMenuId);		
		//Mobile
        if (isMobileDevice()) {
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        
        Article article = articleApi.getArticle(requestArticle.getArticleSn(), previewKey);

        //sns 공유하기 설정
		SnsEntity snsEntity = new SnsEntity();
        snsEntity.setUrl(getFullUri());
        if(StringUtils.isEmpty(article.getSnsIfImg())) {
        	if (isMobileDevice()) {
        		snsEntity.setImage(article.getBannerImgM1());
        	}else {
        		snsEntity.setImage(article.getBannerImgP1());
        	}
        }else {
        	snsEntity.setImage(article.getSnsIfImg());
        }      
        if(StringUtils.isEmpty(article.getSnsIfTitle())) {
        	snsEntity.setTitle(article.getArticleTitle());
        }else {
        	snsEntity.setTitle(article.getSnsIfTitle());
        }
        if(StringUtils.isEmpty(article.getSnsIfDesc())) {
        	snsEntity.setDescription(article.getArticleTitle());
        }else {
        	snsEntity.setDescription(article.getSnsIfDesc());
        }
        snsEntity.setHashtag(article.getSnsHashTag());
		model.addAttribute("sns", snsEntity);

		SeoEntity seoEntity = new SeoEntity();
		seoEntity.setTitle(article.getSeoTitle());
		seoEntity.setDescription(article.getSeoDesc());
		seoEntity.setKeyword(article.getSeoSearchKeyword());
		model.addAttribute("seo", seoEntity);

        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("displayPageId", displayPageId);
        model.addAttribute("article", article);


        //아티클 히스토리 저장
//  		if(0L != getMemberSn()) {
//  			ShoppingMarkPost body = new ShoppingMarkPost();
//  			body.setShoppingMarkTgtCode("Article");
//  			body.setArticleSn(article.getArticleSn());      			
//  			body.setDisplayMenuSetId(APConstant.AP_DISPLAY_MENU_SET_ID);
//  			body.setDisplayMenuId(displayMenuId);
//  			try{
//  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
//  			}catch(Exception e) {
//  				e.printStackTrace();
//  			}
//  		}
        

        return "display/apShoppingTip-detail"; 

    }
	
	/**
	 * APP 전용 멤버십 메뉴 추가
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping("/l_plusMembership")
	@PageTitle(title = "플러스멤버십")
	public String plusMembership(Model model, String displayMenuId) {

		String fileName = "M01_plusMembership_m";

		//Mobile
        if (isMobileDevice()) {
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }

		model.addAttribute("displayMenuId", displayMenuId);

		return "display/" + fileName;
	}
	
	/**
	 * 퍼시픽샵 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping({ "/pacificShop" })
	@PageTitle(title = "퍼시픽샵")
	public String pacificshop(Model model, String displayMenuId, String previewKey, String previewDate) {

		String cornerIds =  "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
		displayMenuId = "pacificShop";

		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		
		try {
			//Mobile
			if (isMobileDevice()) {
				cornerIds = "M01_" + displayMenuId + "_m.1," + "M01_" + displayMenuId + "_m.2," + "M01_" + displayMenuId + "_m.3";
			}

			//PC
			if (isPcDevice()) {
				cornerIds = "M01_" + displayMenuId + "_p.1," + "M01_" + displayMenuId + "_p.2," + "M01_" + displayMenuId + "_p.3";
			}

	        List<Corner> corners = displayApi.getMenuPageCorners(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId, previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);
			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}
			
			model.addAttribute("cornersMap", cornersMap);
		
		}catch(Exception e) {
			model.addAttribute("popupInfo", null);
	        model.addAttribute("footerNotice", null);
	    }


		model.addAttribute("displayMenuId", displayMenuId);

		return "display/" + pageInfo.getMenuPageFileId();
	}
	
	/**
	 * 리뷰 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping({ "/review" })
	@PageTitle(title = "리뷰")
	public String review(Model model, String displayMenuId, String previewKey, String previewDate) {
		displayMenuId = "review";
		DateUtils.addDays(new Date(), -7).getTime();
		DateUtils.addMonths(new Date(), -1);
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		RequestReview requestReview = new RequestReview();
		requestReview.setProdReviewUnit("OnlineProd");
		requestReview.setProdReviewType("Pur");
		requestReview.setOffset(0);
		requestReview.setLimit(10);
		requestReview.setProdReviewSort("Recommend");
		requestReview.setScope("All");
		requestReview.setTopReviewOnlyYn("N");
		requestReview.setTopReviewFirstYn("N");
		requestReview.setImageOnlyYn("N");
		
		// 이번주 리뷰 랭킹
		ProdReviewListInfo thisWeekReviewRank = productApi.getProductReviews(
				requestReview.getProdReviewUnit(),
				requestReview.getProdReviewType(),
				requestReview.getOffset(),
				requestReview.getLimit(),
				null,
				requestReview.getOnlineProdSn(),
				requestReview.getProdSn(),
				requestReview.getStyleCode(),
				null /* regularEventSn */,
				requestReview.getProdReviewSort(),
				requestReview.getScope(),
				requestReview.getTopReviewOnlyYn(),
				requestReview.getTopReviewFirstYn(),
				DateUtils.addDays(new Date(), -7),
				new Date(),
				requestReview.getImageOnlyYn(),	// imageOnlyYn
				null,	// displayMenuSetId
				null)	// displayMenuId
				;
		
		// 화제의 제품 - API 추가후 개발
		OnlineProdList bestProductReview = displayApi.getApTalkedAboutProdList(requestReview.getOffset(), requestReview.getLimit());
		
		Calendar c = Calendar.getInstance();
		c.setTime(new Date());
		c.add(Calendar.MONTH, -1);
		Date from = new Date();
		c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.getActualMinimum(Calendar.DATE));
		from.setTime(c.getTimeInMillis());
		from = FromEndDateUtils.initFromDate(from);
		
		Date to = new Date();
		c.set(c.get(Calendar.YEAR), c.get(Calendar.MONTH), c.getActualMaximum(Calendar.DATE));
		to.setTime(c.getTimeInMillis());
		to = FromEndDateUtils.initFromDate(to);
		
		//지난달 리뷰랭킹 - 포토리뷰
		requestReview.setImageOnlyYn("Y");
		ProdReviewListInfo lastMonthReviewRank = productApi.getProductReviews(
				requestReview.getProdReviewUnit(),
				requestReview.getProdReviewType(),
				requestReview.getOffset(),
				requestReview.getLimit(),
				null,
				requestReview.getOnlineProdSn(),
				requestReview.getProdSn(),
				requestReview.getStyleCode(),
				null /* regularEventSn */,
				requestReview.getProdReviewSort(),
				requestReview.getScope(),
				requestReview.getTopReviewOnlyYn(),
				requestReview.getTopReviewFirstYn(),
				from,	//임시
				to,		//임시
				requestReview.getImageOnlyYn(),	// imageOnlyYn
				null,	// displayMenuSetId
				null)	// displayMenuId
				;
		
		//실시간구매리뷰 - 등록된 리뷰 카운트
		requestReview.setImageOnlyYn("N");
		requestReview.setProdReviewType("All");
		ProdReviewListInfo onlineBuyReviewCount = productApi.getProductReviews(
				requestReview.getProdReviewUnit(),
				requestReview.getProdReviewType(),
				requestReview.getOffset(),
				1,
				getMemberSn(),
				requestReview.getOnlineProdSn(),
				requestReview.getProdSn(),
				requestReview.getStyleCode(),
				null /* regularEventSn */,
				requestReview.getProdReviewSort(),
				requestReview.getScope(),
				requestReview.getTopReviewOnlyYn(),
				requestReview.getTopReviewFirstYn(),
				DateUtils.addDays(new Date(), -7),
				new Date(),
				requestReview.getImageOnlyYn(),	// imageOnlyYn
				null,	// displayMenuSetId
				null)	// displayMenuId
				;
		//실시간구매리뷰 - 리뷰목록
		ProdReviewListInfo onlineBuyReview = productApi.getProductReviews(
				requestReview.getProdReviewUnit(),
				requestReview.getProdReviewType(),
				requestReview.getOffset(),
				requestReview.getLimit(),
				getMemberSn(),
				requestReview.getOnlineProdSn(),
				requestReview.getProdSn(),
				requestReview.getStyleCode(),
				null /* regularEventSn */,
				requestReview.getProdReviewSort(),
				requestReview.getScope(),
				requestReview.getTopReviewOnlyYn(),
				requestReview.getTopReviewFirstYn(),
//				DateUtils.addDays(new Date(), -7),
//				new Date(),
				null,//임시
				null,//임시
				requestReview.getImageOnlyYn(),	// imageOnlyYn
				null,	// displayMenuSetId
				null)	// displayMenuId
				;
		
		model.addAttribute("thisWeekReviewRank", thisWeekReviewRank);
		model.addAttribute("bestProductReview", bestProductReview);
		model.addAttribute("lastMonthReviewRank", lastMonthReviewRank);
		model.addAttribute("onlineBuyReviewCount", onlineBuyReviewCount);
		model.addAttribute("onlineBuyReview", onlineBuyReview);

		model.addAttribute("displayMenuId", displayMenuId);
		
		return "display/" + pageInfo.getMenuPageFileId();
	}
	
	/**
	 * 핫딜 (투데이핫딜) 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping({ "/l_hotdeal_today", "/hotdeal", "/hotdeal/preview" })
	@PageTitle(title = "핫딜")
	public String l_hotdeal_today(Model model, String displayMenuId, String previewKey, String previewDate) {

		String fileName = "";
		// String cornerIds = "";
		displayMenuId = "hotdeal";

		// Mobile
		if (isMobileDevice()) {
			fileName = "display/product-list-10-03";
			// cornerIds = "M02_hotdeal_m.1";
		}

		// PC
		if (isPcDevice()) {
			fileName = "display/product-list-09-02";
			// cornerIds = "M02_best_p.1";
		}

		/**
		 * 코너 없음 List<Corner> corners =
		 * displayApi.getMenuPageCorners(APConstant.AP_DISPLAY_MENU_SET_ID,
		 * displayMenuId, getMemberSn(), cornerIds, false); Map<String,
		 * List<CornerContentsSet>> cornersMap = new HashMap<String,
		 * List<CornerContentsSet>>();
		 * 
		 * for (Corner c : corners) { cornersMap.put(c.getMenuPageCornerId(),
		 * c.getContentsSets()); }
		 * 
		 * model.addAttribute("cornersMap", cornersMap);
		 **/

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}

	/**
	 * 핫딜 (한정판 특가) 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping("/hotdeal_sp_price")
	@PageTitle(title = "핫딜")
	public String hotdeal_sp_price(Model model, String displayMenuId) {

		String fileName = "";
		// String cornerIds = "";
		displayMenuId = "hotdeal";

		// Mobile
		if (isMobileDevice()) {
			fileName = "display/product-list-10-02";
			// cornerIds = "M02_hotdeal_m.2";
		}

		// PC
		if (isPcDevice()) {
			fileName = "display/product-list-10";
			// cornerIds = "M02_best_p.2";
		}

		/**
		 * 코너 없음 List<Corner> corners =
		 * displayApi.getMenuPageCorners(APConstant.AP_DISPLAY_MENU_SET_ID,
		 * displayMenuId, getMemberSn(), cornerIds, false); Map<String,
		 * List<CornerContentsSet>> cornersMap = new HashMap<String,
		 * List<CornerContentsSet>>();
		 * 
		 * for (Corner c : corners) { cornersMap.put(c.getMenuPageCornerId(),
		 * c.getContentsSets()); }
		 * 
		 * model.addAttribute("cornersMap", cornersMap);
		 **/

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}

	/**
	 * APP 전용 멤버십 메뉴 추가
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping("/membership")
	@PageTitle(title = "멤버십")
	public String membership(Model model, String displayMenuId) {

		String fileName = "";

		if (isMobileDevice() || isAndroid() || isiOS()) {

			if (isLoggedIn()) { // 로그인이 되어있으면

				fileName = "display/app-membership.2"; // 로그인후 // 측정값이 없는 경우

			} else {

				fileName = "display/app-membership.1"; // 로그인전
			}

		}

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}
	
	/**
	 *  아티클 목록 조회
	 *
	 * @param requestArticle
	 * @return
	 */
	@RequestMapping("/articles")
    @ResponseBody
    public ResponseEntity<?> articles( RequestArticle requestArticle) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	ArticleSearchResult articleSearchResult = articleApi.getArticleList(requestArticle.getArticleCateId(), requestArticle.getOrder(), requestArticle.getKeyword(), "Y", requestArticle.getHashTag(), requestArticle.getOffset(), requestArticle.getLimit());
            result.put("articleSearchResult", articleSearchResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 *  아티클 상세 조회
	 *
	 * @param requestArticle
	 * @param previewKey
	 * @return
	 */
	@RequestMapping({"/article", "/article/preview"})
    @ResponseBody
    public ResponseEntity<?> article( RequestArticle requestArticle, String previewKey) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	Article article = articleApi.getArticle(requestArticle.getArticleSn(), previewKey);
            result.put("article", article);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 *  아티클 댓글 목록 조회
	 * @param requestBeautyLife
	 * @return
	 */
	@RequestMapping("/comments")
    @ResponseBody
    public ResponseEntity<?> comments( RequestArticle requestArticle) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ArticleCommentResult articleCommentResult = articleApi.getArticleCommentList(requestArticle.getArticleSn(), "Y", requestArticle.getOrder(), requestArticle.getOffset(), requestArticle.getLimit());
            result.put("articleCommentResult", articleCommentResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }

	/**
	 * 아티클 댓글 등록
	 *
	 * @param requestArticle
	 * @param articleCommentParam
	 * @return
	 */
	@RequestMapping("/createArticleComment")
    @ResponseBody
    public ResponseEntity<?> createArticleComment( RequestArticle requestArticle, ArticleCommentPost articleCommentParam) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	
        	ExecuteResult executeResult = articleApi.createArticleComment(requestArticle.getArticleSn(), articleCommentParam);
        	result.put("executeResult", executeResult);
        	
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
	
	/**
	 * 아티클 댓글 수정
	 *
	 * @param requestArticle
	 * @param articleCommentParam
	 * @return
	 */
	@RequestMapping("/updateArticleComment")
    @ResponseBody
    public ResponseEntity<?> updateArticleComment( RequestArticle requestArticle, ArticleComment articleComment, ArticleCommentPost articleCommentParam) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	
        	ExecuteResult executeResult = articleApi.saveArticleComment(requestArticle.getArticleSn(), articleComment.getArticleCommentSn(), articleCommentParam);
        	result.put("executeResult", executeResult);
        	
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
	
	/**
	 *  아티클 댓글 삭제
	 *
	 * @param requestArticle
	 * @param articleComment
	 * @return
	 */
	@RequestMapping("/deleteArticleComment")
    @ResponseBody
    public ResponseEntity<?> deleteArticleComment( RequestArticle requestArticle, ArticleComment articleComment) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ExecuteResult executeResult = articleApi.deleteArticleComment(requestArticle.getArticleSn(), articleComment.getArticleCommentSn());
        	result.put("executeResult", executeResult);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
	
	/**
	 *  아티클 댓글 추천
	 *
	 * @param requestArticle
	 * @param articleComment
	 * @return
	 */
	@RequestMapping("/recommendArticleComment")
    @ResponseBody
    public ResponseEntity<?> recommendArticleComment( RequestArticle requestArticle, ArticleComment articleComment) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ExecuteResult executeResult = articleApi.recommendArticleComment(requestArticle.getArticleSn(), articleComment.getArticleCommentSn());
        	result.put("executeResult", executeResult);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
	
	
	/**
	 * 랭킹 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping({ "/rank", "/rank/preview" })
	@PageTitle(title = "랭킹")
	public String rank(Model model, String displayMenuId, String previewKey, String previewDate) {
		String fileName = "display/rank";
		
		model.addAttribute("displayMenuId", displayMenuId);
		
		return fileName;
	}
	
	/**
	 * 쇼핑팁 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping({ "/shoppingTip", "/shoppingTip/preview" })
	@PageTitle(title = "쇼핑팁")
	public String shoppingTip(Model model, String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);

		return "display/" + pageInfo.getMenuPageFileId();
	}
	
	
}
