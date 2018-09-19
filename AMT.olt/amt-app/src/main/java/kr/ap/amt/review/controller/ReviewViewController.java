package kr.ap.amt.review.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.amt.product.vo.RequestReview;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.product.ProdReviewImg;
import net.g1project.ecp.api.model.sales.product.ProdReviewInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewSurveyInfo;

@Controller
@RequestMapping("/review")
public class ReviewViewController  extends AbstractController{
	
	/**
     * 리뷰 필터링
     * @param requestReview
     * @return
     */
    @GetMapping("/filterReviewList/{filterType}")
    public String filterReviewList(@PathVariable String filterType, String keyword, Model model) throws ParseException {
    	model.addAttribute("filterType", filterType);
    	model.addAttribute("keyword", keyword);
    	
    	return "review/filter-review-list";
    }

	/**
	 * 리뷰상세
	 * @param model
	 * @param requestReview
	 * @param previewKey
	 * @return
	 */
	@GetMapping("/detail/{reviewSn}")
    @PageTitle(title = "구매리뷰 상세")
	public String reviewDetail(@PathVariable long reviewSn, Model model, RequestReview requestReview, String previewKey) {
		
		//리뷰 상세 API
		ProdReviewInfo review = productApi.getProductReviewDetail(reviewSn, getMemberSn());
		
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
		
		model.addAttribute("review", review);
		return "review/review-detail";
	}
}
