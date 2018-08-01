package kr.ap.emt.my.controller;

import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.guide.InquiriesSearchResult;
import net.g1project.ecp.api.model.sales.guide.Inquiry;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplayEventDTOListResult;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.text.SimpleDateFormat;
import java.util.HashMap;

/**
 * 나의 활동 관리
 *
 * 1. 이벤트 참여 현황
 * 2. 나의 구매 후기(상품평 관리)
 * 3. 나의 1:1 문의
 *
 */
@Controller
@RequestMapping("/my/api")
public class MyActivityRestController extends AbstractController {

	/**********************************************************************************************
	 *  1. 이벤트 참여 현황
	 **********************************************************************************************/
	/**
	 * 이벤트 참여 현황
	 *
	 * @param offset
	 * @param limit
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	@GetMapping("/getEventList")
	@ResponseBody
	public ResponseEntity<?> getEventList(int offset, int limit, String startDate, String endDate) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		try {
			PlanDisplayEventDTOListResult planDisplayEventDTOListResult = plandisplayApi.planDisplayEventParticipats(null,null,null, "Deadline", offset, limit);
			result.put("EventSearchResult", planDisplayEventDTOListResult);
		} catch(Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}


	/**********************************************************************************************
	 * 2. 나의 구매 후기(상품평 관리)
	 **********************************************************************************************/
	/**
	 * 	작성가능한 상품평 목록 조회
	 *
	 * @param offset
	 * @param limit
	 * @return
	 */
	@GetMapping("/getReviewList")
	@ResponseBody
	public ResponseEntity<?> getReviewList(int offset, int limit) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, offset, limit);
			result.put("ProductReviewWritableOrders", productReviewWritableOrders);

			return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
	}


	/**********************************************************************************************
	 *  3. 나의 1:1 문의
	 **********************************************************************************************/
	/**
	 *  1:1 문의 목록
	 *
	 * @param offset
	 * @param limit
	 * @param startDate
	 * @param answerYn
	 * @return
	 */
	@GetMapping("/getInquiryList")
	@ResponseBody
	public ResponseEntity<?> getInquiryList(int offset, int limit, String startDate, String answerYn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		try {
			InquiriesSearchResult inquiriesSearchResult = guideApi.getInquiries(getMemberSn(), offset, limit, sf.parse(startDate), null,answerYn);
			result.put("InquiriesSearchResult", inquiriesSearchResult);
		} catch(Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 1:1 문의 상세
	 *
	 * @param inquirySn
	 * @return
	 */
	@GetMapping("/getInquiryCont")
	@ResponseBody
	public ResponseEntity<?> getInquiryCont(long inquirySn) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			Inquiry inquiry = guideApi.getCustomerInquiry(inquirySn);
			result.put("Inquiry", inquiry);
		} catch(Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/*********************************************************************************************
	 * 공동Methods
	 * *******************************************************************************************/

}
