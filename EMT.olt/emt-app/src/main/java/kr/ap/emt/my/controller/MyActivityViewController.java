package kr.ap.emt.my.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.product.CountResult;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * 나의 활동 관리
 *
 * 1. 이벤트 참여 현황
 * 2. 나의 구매 후기(상품평 관리)
 * 3. 나의 1:1 문의
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyActivityViewController extends AbstractController {

	/**********************************************************************************************
	 *  1. 이벤트 참여 현황
	 **********************************************************************************************/
	/**
	 * 이벤트 참여 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myEventList")
	@PageTitle(title = "이벤트 참여 현황" , menuId = "myActivity", subMenuId = "myEvent")
	public String myEventList(Model model) {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-event";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-activity-event-list";
		}

		return null;
	}


	/**********************************************************************************************
	 * 2. 나의 구매 후기(상품평 관리)
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

		ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, 0, 10);
		model.addAttribute("reviewCnt", productReviewWritableOrders.getTotalCount());

		CountResult productReviewCount = productApi.getProductReviewCount("Member", null, null, null, getMemberSn(), "All");
		model.addAttribute("writedCnt", productReviewCount.getCount());

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-review-writing-01";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-activity-review-list.1";
		}

		return null;
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
	 *  3. 나의 1:1 문의
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
			return "my/my-activity-1";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-activity.1";
		}

		return null;
	}


	/**********************************************************************************************
	 *  4. 상품평 관리
	 **********************************************************************************************/
}
