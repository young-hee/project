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
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
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
@RestController
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
	public ResponseEntity<?> getEventList(int offset, int limit, String startDate, String endDate) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		PlanDisplayEventDTOListResult planDisplayEventDTOListResult = plandisplayApi.planDisplayEventParticipats("All", startDate, endDate, "Deadline", offset, limit);
		result.put("EventSearchResult", planDisplayEventDTOListResult);

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
	public ResponseEntity<?> getReviewList(int offset, int limit) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, offset, limit);
		result.put("ProductReviewWritableOrders", productReviewWritableOrders);

		return ResponseEntity.ok(result);
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
	public ResponseEntity<?> getInquiryList(int offset, int limit, String startDate, String answerYn) throws ParseException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		InquiriesSearchResult inquiriesSearchResult = guideApi.getInquiries(getMemberSn(), offset, limit, sf.parse(startDate), null,answerYn);
		result.put("InquiriesSearchResult", inquiriesSearchResult);

		return ResponseEntity.ok(result);
	}

	/**
	 * 1:1 문의 상세
	 *
	 * @param inquirySn
	 * @return
	 */
	@GetMapping("/getInquiryCont")
	public ResponseEntity<?> getInquiryCont(long inquirySn) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		Inquiry inquiry = guideApi.getCustomerInquiry(inquirySn);
		result.put("Inquiry", inquiry);

		return ResponseEntity.ok(result);
	}

	/*********************************************************************************************
	 * 공동Methods
	 * *******************************************************************************************/

}
