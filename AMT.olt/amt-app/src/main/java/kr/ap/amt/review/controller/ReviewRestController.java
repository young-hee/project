package kr.ap.amt.review.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import feign.Param;
import kr.ap.amt.product.vo.RequestReview;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.product.ProdReviewImg;
import net.g1project.ecp.api.model.sales.product.ProdReviewInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewRecommendPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewReport;
import net.g1project.ecp.api.model.sales.product.ProdReviewSurveyInfo;

@Controller
@RequestMapping("/review")
public class ReviewRestController  extends AbstractController {
	
    /**
     * 리뷰상세
     * @param requestReview
     * @return
     */
    @GetMapping("/detail")
    @ResponseBody
    public ResponseEntity<?> getReviewDetail(RequestReview requestReview) {
    	HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			//리뷰 상세 API
    		ProdReviewInfo review = productApi.getProductReviewDetail(requestReview.getProdReviewSn(), getMemberSn());
    		
    		//더미데이터
    		if( review.getImgList().size() == 0 ) {
    			List<ProdReviewImg> imgList = new ArrayList<>();
    			for (int i = 0; i < 10; i++) {
    				ProdReviewImg img = new ProdReviewImg();
    				img.setDetailSortOrder(i);
    				img.setImageFileUrl("/mo/ko/images/common/test2.png");
    				if( i == 0 ) {
    					img.setImageFileUrl("/mo/ko/images/common/img_shopping_tip.jpg");
    				} else if( i == 1 ) {
    					img.setImageFileUrl("/mo/ko/images/common/test2.png");
    				} else if( i == 2 ) {
    					img.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_04.jpg");
    				} else if( i == 3 ) {
    					img.setImageFileUrl("/mo/ko/images/dummy/img_best_photo.jpg");
    				} 
    				img.setImgDesc("img test");
    				imgList.add(img);
    			}
    			review.setImgList(imgList);
    		}
    		if( review.getSurveys().size() == 0 ) {
    			List<ProdReviewSurveyInfo> surveyList = new ArrayList<>();
    			for (int i = 0; i < 3; i++) {
    				ProdReviewSurveyInfo survey = new ProdReviewSurveyInfo();
    				switch (i) {
    				case 0:
    					survey.setQuestionHeader("지속력");
    					survey.setResponseBodyText("오래 지속되요");
    					break;
    				case 1:
    					survey.setQuestionHeader("커버력");
    					survey.setResponseBodyText("감쪽같아요");
    					break;
    				case 2:
    					survey.setQuestionHeader("수분감");
    					survey.setResponseBodyText("적당해요");
    					break;
    				default:
    					break;
    				}
    				surveyList.add(survey);
    			}
    			review.setSurveys(surveyList);
    		}
    		
    		result.put("review", review);
    		return ResponseEntity.ok(result);
    	} catch (Exception e) {
    		result.put("errorData", e);
    		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
    	}
    }
	
	/**
	 * 리뷰 추천
	 * @param prodReviewSn
	 * @param body
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/recommend")
	@ResponseBody
	public ResponseEntity<?> addRecommend(Long prodReviewSn, ProdReviewRecommendPost body) throws Exception {
		HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	body.setMemberSn(getMemberSn());
        	productApi.postProductReviewRecommend(prodReviewSn, body);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
	}
	
	/**
	 * 리뷰 추천 삭제
	 * @param prodReviewSn
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/removeRecommend")
	@ResponseBody
	public ResponseEntity<?> removeRecommend(Long prodReviewSn) throws Exception {
		HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	productApi.deleteProductReviewRecommend(prodReviewSn, getMemberSn());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
	}
	
	/**
	 * 상품평 신고
	 * @param prodReviewSn
	 * @param body
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/report")
	@ResponseBody
	public ResponseEntity<?> report(Long prodReviewSn, ProdReviewReport body) throws Exception {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			body.setMemberSn(getMemberSn());
			productApi.postProductReviewReport(prodReviewSn, body);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
	}
}
