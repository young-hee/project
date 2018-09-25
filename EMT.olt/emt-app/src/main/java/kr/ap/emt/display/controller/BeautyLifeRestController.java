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
import org.springframework.web.bind.annotation.RequestMapping;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.emt.display.vo.RequestBeautyLife;

import net.g1project.ecp.api.model.sales.article.*;
import net.g1project.ecp.api.model.sales.display.Corner;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@RestController
@RequestMapping("/display")
public class BeautyLifeRestController extends AbstractController {

	
	/**
	 *  아티클 목록 조회
	 *
	 * @param requestBeautyLife
	 * @return
	 */
	@RequestMapping("/articles")
    public ResponseEntity<?> articles( RequestBeautyLife requestBeautyLife) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
		ArticleSearchResult articleSearchResult = articleApi.getArticleList(requestBeautyLife.getArticleCateId(), requestBeautyLife.getOrder(), requestBeautyLife.getKeyword(), "Y", requestBeautyLife.getHashTag(), requestBeautyLife.getOffset(), requestBeautyLife.getLimit());
		result.put("articleSearchResult", articleSearchResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 *  아티클 상세 조회
	 *
	 * @param requestBeautyLife
	 * @param previewKey
	 * @return
	 */
	@RequestMapping({"/article", "/article/preview"})
    public ResponseEntity<?> article( RequestBeautyLife requestBeautyLife, String previewKey) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
		Article article = articleApi.getArticle(requestBeautyLife.getArticleSn(), previewKey);
		result.put("article", article);

		return ResponseEntity.ok(result);

    }
	
	/**
	 *  아티클 댓글 목록 조회
	 * @param requestBeautyLife
	 * @return
	 */
	@RequestMapping("/comments")
    public ResponseEntity<?> comments( RequestBeautyLife requestBeautyLife) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
		ArticleCommentResult articleCommentResult = articleApi.getArticleCommentList(requestBeautyLife.getArticleSn(), "Y", requestBeautyLife.getOrder(), requestBeautyLife.getOffset(), requestBeautyLife.getLimit());
		result.put("articleCommentResult", articleCommentResult);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 아티클 댓글 등록
	 *
	 * @param requestBeautyLife
	 * @param articleCommentParam
	 * @return
	 */
	@RequestMapping("/createArticleComment")
    public ResponseEntity<?> createArticleComment( RequestBeautyLife requestBeautyLife, ArticleCommentPost articleCommentParam) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        if(isLoggedIn()) {
        	 //TODO 등록할때 html 에 스크립트 삭제 코드 조회필터
			ExecuteResult executeResult = articleApi.createArticleComment(requestBeautyLife.getArticleSn(), articleCommentParam);
			result.put("executeResult", executeResult);
			
        }
        
		return ResponseEntity.ok(result);

    }
	
	/**
	 *  아티클 댓글 삭제
	 *
	 * @param requestBeautyLife
	 * @param articleComment
	 * @return
	 */
	@RequestMapping("/deleteArticleComment")
    public ResponseEntity<?> deleteArticleComment( RequestBeautyLife requestBeautyLife, ArticleComment articleComment) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        ExecuteResult executeResult = new ExecuteResult(); 
       
        if(isLoggedIn()) {
        	
       		ArticleCommentResult articleCommentResult = articleApi.getArticleCommentList(requestBeautyLife.getArticleSn(), "Y", requestBeautyLife.getOrder(), requestBeautyLife.getOffset(), requestBeautyLife.getLimit());
        	
        	List<ArticleComment> commentList = articleCommentResult.getArticleCommentList();
        	
        	for(ArticleComment bo : commentList) {
        		 
        		if(articleComment.getArticleCommentSn() == bo.getArticleCommentSn()) {
        			
        			if(getMemberSn().equals(bo.getMemberSn())) {
        				
        				executeResult = articleApi.deleteArticleComment(requestBeautyLife.getArticleSn(), articleComment.getArticleCommentSn());
        				result.put("executeResult", executeResult);
        				
        			}else {
        				throw error(result, HttpStatus.SERVICE_UNAVAILABLE, "ESAL022", "본인의 글만 삭제할 수 있습니다.");
        			}
        		}
        	}
        	
        }else {
        	throw error(result, HttpStatus.SERVICE_UNAVAILABLE, "EAPI004", "회원 정보가 확인되지 않습니다.");
        }
        
		return ResponseEntity.ok(result);

    }
	
	/**
	 *  코너 아이디 로 정보 조회 (룩스 main이 article 에서 coner 로 변경됨)
	 *
	 * @return
	 */
	@RequestMapping("/getCornerInfo")
    public ResponseEntity<?> getCornerInfo(HttpServletRequest req) {
      
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		String cornerIds = ""; 
		
		if(isMobileWeb()) {
			cornerIds = "M02_main_m.5"; //MO 룩스 코너아이디
		}
		if(isPcDevice()) {
			cornerIds = "M02_main_p.6"; //PC룩스 코너 아이디
		}
        
		List<Corner> corners = displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID, "main", null, null, cornerIds, false);

		result.put("corners", corners);
		return ResponseEntity.ok(result);

    }
	
}
