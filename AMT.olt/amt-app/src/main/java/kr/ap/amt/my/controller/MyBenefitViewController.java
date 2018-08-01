package kr.ap.amt.my.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.coupon.MemberKeepingCouponCount;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * 2. 쿠폰
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyBenefitViewController extends AbstractController {

	/**********************************************************************************************
	 *  2. 쿠폰
	 **********************************************************************************************/
	/**
	 * 사용 가능한 쿠폰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myCouponList")
	@PageTitle(title = "나의 쿠폰" , menuId = "myBenefit", subMenuId = "myCoupon")
	public String myCouponList(Model model) {

		//종료된쿠폰최대조회기간 90일
		MemberKeepingCouponCount memberKeepingCouponsCount = couponApi.getMemberKeepingCouponsCount(getMemberSn(), 90L);
		model.addAttribute("availCnt", memberKeepingCouponsCount.getAvailCnt());
		model.addAttribute("expCnt", memberKeepingCouponsCount.getExpCnt());

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-coupon-01";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-benefit-coupon-01";
		}

		return null;
	}

	/**
	 * 사용/만료 쿠폰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myUsedCouponList")
	@PageTitle(title = "나의 쿠폰" , menuId = "myBenefit", subMenuId = "myCoupon")
	public String myUsedCouponList(Model model) {

		//종료된쿠폰최대조회기간 90일
		MemberKeepingCouponCount memberKeepingCouponsCount = couponApi.getMemberKeepingCouponsCount(getMemberSn(), 90L);
		model.addAttribute("availCnt", memberKeepingCouponsCount.getAvailCnt());
		model.addAttribute("expCnt", memberKeepingCouponsCount.getExpCnt());

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-coupon-02";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-benefit-coupon-02";
		}

		return null;
	}

}
