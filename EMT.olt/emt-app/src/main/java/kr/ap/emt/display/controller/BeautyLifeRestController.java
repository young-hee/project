/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.emt.display.vo.RequestBeautyLife;
import net.g1project.ecp.api.model.sales.article.*;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@Controller
@RequestMapping("/display")
public class BeautyLifeRestController extends AbstractController {

	
	/**
	 *  아티클 목록 조회
	 *
	 * @param requestBeautyLife
	 * @return
	 */
	@RequestMapping("/articles")
    @ResponseBody
    public ResponseEntity<?> articles( RequestBeautyLife requestBeautyLife) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	ArticleSearchResult articleSearchResult = articleApi.getArticleList(requestBeautyLife.getArticleCateId(), requestBeautyLife.getOrder(), requestBeautyLife.getKeyword(), "Y", requestBeautyLife.getHashTag(), requestBeautyLife.getOffset(), requestBeautyLife.getLimit());
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
	 * @param requestBeautyLife
	 * @param previewKey
	 * @return
	 */
	@RequestMapping({"/article", "/article/preview"})
    @ResponseBody
    public ResponseEntity<?> article( RequestBeautyLife requestBeautyLife, String previewKey) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	Article article = articleApi.getArticle(requestBeautyLife.getArticleSn(), previewKey);
            result.put("article", article);
            
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
    public ResponseEntity<?> comments( RequestBeautyLife requestBeautyLife) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ArticleCommentResult articleCommentResult = articleApi.getArticleCommentList(requestBeautyLife.getArticleSn(), "Y", requestBeautyLife.getOrder(), requestBeautyLife.getOffset(), requestBeautyLife.getLimit());
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
	 * @param requestBeautyLife
	 * @param articleCommentParam
	 * @return
	 */
	@RequestMapping("/createArticleComment")
    @ResponseBody
    public ResponseEntity<?> createArticleComment( RequestBeautyLife requestBeautyLife, ArticleCommentPost articleCommentParam) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	
        	ExecuteResult executeResult = articleApi.createArticleComment(requestBeautyLife.getArticleSn(), articleCommentParam);
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
	 * @param requestBeautyLife
	 * @param articleComment
	 * @return
	 */
	@RequestMapping("/deleteArticleComment")
    @ResponseBody
    public ResponseEntity<?> deleteArticleComment( RequestBeautyLife requestBeautyLife, ArticleComment articleComment) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ExecuteResult executeResult = articleApi.deleteArticleComment(requestBeautyLife.getArticleSn(), articleComment.getArticleCommentSn());
        	result.put("executeResult", executeResult);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
	
	/**
	 *  코너 아이디 로 정보 조회 (룩스 main이 article 에서 coner 로 변경됨)
	 *
	 * @param requestBeautyLife
	 * @param articleComment
	 * @return
	 */
	@RequestMapping("/getCornerInfo")
    @ResponseBody
    public ResponseEntity<?> getCornerInfo(HttpServletRequest req) {
      
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String cornerIds = ""; 
		
		if(isMobileWeb()) {
			cornerIds = "M02_main_m.5"; //MO 룩스 코너아이디
		}
		if(isPcDevice()) {
			cornerIds = "M02_main_p.6"; //PC룩스 코너 아이디
		}
        
        try {
 
        	List<Corner> corners = displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID, "main", null, null, cornerIds, false); 
        	
        	result.put("corners", corners);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
        }
    }
	
}