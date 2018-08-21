package kr.ap.amt.my.controller;

import java.util.ArrayList;
import java.util.List;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.coupon.MemberCoupon;
import net.g1project.ecp.api.model.sales.coupon.MemberKeepingCoupon;
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
		MemberCoupon coupons = couponApi.getMemberKeepingCoupons("All", getMemberSn(), 30l, 100l);
		model.addAttribute("availCnt", coupons.getAvailCnt());
		model.addAttribute("expCnt", coupons.getExpCnt());
		
		model.addAttribute("availCoupons", coupons.getAvailCoupons());
		model.addAttribute("expCoupons", coupons.getExpCoupons());
		
		List<MemberKeepingCoupon> immCoupons = new ArrayList<MemberKeepingCoupon>(coupons.getAvailCoupons());
		
		immCoupons.removeIf(memberKeepingCoupon -> memberKeepingCoupon.getdDay() > 7);
		
		model.addAttribute("immCnt", immCoupons.size());
		model.addAttribute("immCoupons", immCoupons);
		
		return "my/my-coupon";
	}

}
