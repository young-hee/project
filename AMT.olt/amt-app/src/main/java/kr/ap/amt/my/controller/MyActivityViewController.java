package kr.ap.amt.my.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.guide.FaqSearchResult;
import net.g1project.ecp.api.model.sales.product.CountResult;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * 8. 좋아요
 * 9. 구매리뷰
 * 10. 1:1 상담
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyActivityViewController extends AbstractController {

	/**********************************************************************************************
	 * 8. 좋아요
	 **********************************************************************************************/


	/**********************************************************************************************
	 * 9. 구매리뷰
	 **********************************************************************************************/
	/**
	 * 작성 가능한 리뷰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myReviewList")
	@PageTitle(title = "나의 리뷰" , menuId = "myActivity", subMenuId = "myReview")
	public String myReviewList(Model model) {

		ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, 0, 999);
		model.addAttribute("reviewCnt", productReviewWritableOrders.getTotalCount());
		model.addAttribute("productReviewWritableOrders", productReviewWritableOrders);

//		CountResult productReviewCount = productApi.getProductReviewCount("Member", null, null, null, getMemberSn(), "All");
//		model.addAttribute("writedCnt", productReviewCount.getCount());
		
		ProdReviewListInfo prodReviewListInfo = productApi.getProductReviews("OnlineProd", "All", 0, 999, getMemberSn(),
				null, null, null, "Last", "All", "N", "N", null, null, null, null, null);
		model.addAttribute("writedCnt", prodReviewListInfo.getTotalCount());
		model.addAttribute("prodReviewListInfo", prodReviewListInfo);

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
		}

		return "my/my-review.1";
	}

	/**
	 * 작성한 리뷰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myWritedReviewList")
	@PageTitle(title = "나의 리뷰" , menuId = "myActivity", subMenuId = "myReview")
	public String myWritedReviewList(Model model) {

		ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, 0, 10);
		model.addAttribute("reviewCnt", productReviewWritableOrders.getTotalCount());

		CountResult productReviewCount = productApi.getProductReviewCount("Member", null, null, null, getMemberSn(), "All");
		model.addAttribute("writedCnt", productReviewCount.getCount());

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-review-writing-02";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-activity-review-list.2";
		}

		return null;
	}


	/**********************************************************************************************
	 * 10. 1:1 상담
	 **********************************************************************************************/
	/**
	 * 1:1 문의 목록
	 *
	 * @param model
	 * @param req
	 * @return
	 */
	@GetMapping("/myInquiryList")
	@PageTitle(title = "나의 1:1 문의" , menuId = "myActivity", subMenuId = "myInquiry")
	public String myInquiryList(Model model, HttpServletRequest req) {
		
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			//FAQ 목록 조회
	        FaqSearchResult faqSR = guideApi.getFaqs("", null, null, 0, 6);
	        model.addAttribute("faqSrchRst", faqSR);
		}
		
		//미해결 상담
		
		//답변완료된 상담

        return "my/my-inquiry_";
	}

}
