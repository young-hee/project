package kr.ap.emt.my.controller;

import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.sales.coupon.MemberCoupon;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

/**
 * 나의 혜택 관리
 *
 * 1. 나의 쿠폰
 * 2. 나의 회원등급
 *
 */
@Controller
@RequestMapping("/my/api")
public class MyBenefitRestController extends AbstractController {

	/**********************************************************************************************
	 *  1. 나의 쿠폰
	 **********************************************************************************************/
	/**
	 * 쿠폰 등록
	 *
	 * @param couponIdentifier
	 * @return
	 */
	@PostMapping("/registerCoupon")
	@ResponseBody
	public ResponseEntity<?> registerCoupon(String couponIdentifier) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			if (!StringUtils.isEmpty(couponIdentifier)) {
				BooleanResult booleanResult = couponApi.registInputCoupon(couponIdentifier, getMemberSn());
				result.put("BooleanResult", booleanResult);
			}
		} catch(Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);

	}

	@GetMapping("/getCouponList")
	@ResponseBody
	public ResponseEntity<?> getCouponList(String searchType, Long searchExpDayLimit, Long searchEndDayLimit) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			MemberCoupon memberKeepingCoupons = couponApi.getMemberKeepingCoupons(searchType, getMemberSn(), searchExpDayLimit, searchEndDayLimit);
			result.put("MemberKeepingCoupons", memberKeepingCoupons);
		} catch(Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**********************************************************************************************
	 *  2. 나의 회원등급
	 **********************************************************************************************/


}
