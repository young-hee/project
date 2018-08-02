/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.common.SeoEntity;
import kr.ap.comm.support.common.SnsEntity;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.emt.display.vo.RequestBeautyLife;
import net.g1project.ecp.api.model.sales.article.Article;
import net.g1project.ecp.api.model.sales.article.ArticleSearchResult;
import net.g1project.ecp.api.model.sales.article.PlanDisplayResult;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.display.CornerContentsSet;
import net.g1project.ecp.api.model.sales.display.PageInfo;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@Controller
@RequestMapping("/display")
public class BeautyLifeViewController extends AbstractController {

	@RequestMapping({"/l_etude_pick", "/etude_pick"})
    @PageTitle(title = "#에뛰드픽")
    public String etude_pick(Model model, String displayMenuId) {
				
		displayMenuId ="etude_pick";
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
		
        //Mobile
        if (isMobileDevice()) {
        }

        //PC
        if (isPcDevice()) {
        }
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();
       // return "display/etude-pick"; 

    }
	
	@RequestMapping("/beauty_life")
    @PageTitle(title = "뷰티라이프")
    public String beauty_life(Model model, String displayMenuId) {
		
        //Mobile
        if (isMobileDevice()) {
    		
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/moBeautyLife"; 

    }
	
	@RequestMapping({"/l_etude_ch", "/etude_ch", "/etude_ch/preview"})
    @PageTitle(title = "Ch.에뛰드")
    public String etude_ch(Model model, String displayMenuId, String previewKey, String previewDate) {
		
		displayMenuId="etude_ch";
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
        
        try {
        	
        	//메뉴페이지 코너정보 조회
    		String cornerIds = "";
    		
    		//Mobile
            if (isMobileDevice()) {
        		
            }

            //PC
            if (isPcDevice()) {
            	cornerIds = "M02_etude_ch_p.1";
            	
            	List<Corner> corners = displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId, previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);
         		Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
         		
         		for (Corner c : corners) {
         			cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
         		}
         		
         		model.addAttribute("cornersMap", cornersMap);
            }
            
        	Article article = articleApi.getLiveArticle("chEtude");
        	model.addAttribute("article", article);
     		
        } catch(Exception e) {
        	model.addAttribute("article", null);
        }
        
        model.addAttribute("displayMenuId", "etude_ch");
        
        return "display/" + pageInfo.getMenuPageFileId();
 //       return "display/ch-etude"; 

    }

	/**
	 * 체널에뛰드 상세
	 *
	 * @param model
	 * @param displayMenuId
	 * @param requestBeautyLife
	 * @param previewKey
	 * @return
	 */
	@RequestMapping({"/etude_ch/detail", "/etude_ch/detail/preview"})
    @PageTitle(title = "Ch.에뛰드")
    public String etude_ch_detail(Model model, String displayMenuId, RequestBeautyLife requestBeautyLife, String previewKey) {
		
        //Mobile
        if (isMobileDevice()) {
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        
        Article article = articleApi.getArticle(requestBeautyLife.getArticleSn(), previewKey);
        
        if( "Y".equals(article.getPlanDisplayYn())){
        	PlanDisplayResult planDisplayResult = articleApi.getArticlePlanDisplayEventList(requestBeautyLife.getArticleSn(), "Progress", 0, 0);
        	model.addAttribute("planDisplayResult", planDisplayResult);
        }

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

        model.addAttribute("displayMenuId", "etude_ch");
        model.addAttribute("article", article);


        //아티클 히스토리 저장
  		if(0L != getMemberSn()) {
  			ShoppingMarkPost body = new ShoppingMarkPost();
  			body.setShoppingMarkTgtCode("Article");
  			body.setArticleSn(article.getArticleSn());      			
  			body.setDisplayMenuSetId(APConstant.EH_DISPLAY_MENU_SET_ID);
  			
  			try{
  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
  			}catch(Exception e) {
  				e.printStackTrace();
  			}
  		}
        

        return "display/ch-etude-detail-live"; 

    }
	
	@RequestMapping({"/l_etude_looks", "/etude_looks"})
    @PageTitle(title = "LOOKS")
    public String etude_looks(Model model, String displayMenuId) {
		
		displayMenuId="etude_looks";
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
		
		ArticleSearchResult articleSearchResult = articleApi.getArticleList("Looks", "SortOrder", null, "N", null, 0, 0);
		
		model.addAttribute("articleSearchResult", articleSearchResult);
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

	}

	/**
	 * Looks 상세
	 *
	 * @param model
	 * @param displayMenuId
	 * @param requestBeautyLife
	 * @param previewKey
	 * @return
	 */
	@RequestMapping({"/etude_looks/detail", "/etude_looks/detail/preview"})
    @PageTitle(title = "LOOKS")
    public String etude_looks_detail(Model model, String displayMenuId, RequestBeautyLife requestBeautyLife, String previewKey) {
		
		//Mobile
        if (isMobileDevice()) {
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        
        Article article = articleApi.getArticle(requestBeautyLife.getArticleSn(), previewKey);
        
        ArticleSearchResult articleSearchResult = articleApi.getArticleList("Looks", "SortOrder", null, "N", null, 0, 0);
		
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

        model.addAttribute("displayMenuId", "etude_looks");
        model.addAttribute("article", article);
        model.addAttribute("articleSearchResult", articleSearchResult);
        
        //아티클 히스토리 저장
  		if(0L != getMemberSn()) {
  			ShoppingMarkPost body = new ShoppingMarkPost();
  			body.setShoppingMarkTgtCode("Article");
  			body.setArticleSn(article.getArticleSn());      			
  			body.setDisplayMenuSetId(APConstant.EH_DISPLAY_MENU_SET_ID);
  			
  			try{
  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
  			}catch(Exception e) {
  				e.printStackTrace();
  			}
  		}
        
        return "display/etude_looks_detail"; 

	}
}
