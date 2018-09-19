package kr.ap.amt.my.controller;

import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.sales.guide.InquiriesEvalResponse;
import net.g1project.ecp.api.model.sales.guide.InquiriesSearchResult;
import net.g1project.ecp.api.model.sales.guide.Inquiry;
import net.g1project.ecp.api.model.sales.product.ProdReviewPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewSurvey;
import net.g1project.ecp.api.model.sales.product.ProdReviewUpdate;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import feign.Param;

import java.util.HashMap;
import java.util.List;

/**
 *
 * 8. 좋아요
 * 9. 구매리뷰
 * 10. 1:1 상담
 *
 */
@Controller
@RequestMapping("/my/api")
public class MyActivityRestController extends AbstractController {

	/**********************************************************************************************
	 * 8. 좋아요
	 **********************************************************************************************/

	/**********************************************************************************************
	 * 9. 구매리뷰
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
	
	/**
	 * 	상품평설문 목록
	 *
	 * @param odrNo
	 * @return
	 */
	@GetMapping("/getProductReviewSurveys")
	@ResponseBody
	public ResponseEntity<?> getProductReviewSurveys(Long onlineProdSn, String prodReviewType) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			prodReviewType = "Pur";
			onlineProdSn = 343L;
			List<ProdReviewSurvey> productReviewSurveys = productApi.getProductReviewSurveys(onlineProdSn, prodReviewType);
			
			result.put("productReviewSurveys", productReviewSurveys);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
	}
	
	/**
	 * 	상품평 등록
	 *
	 * @param body
	 * @return
	 */
	@PostMapping("/postProdReview")
	@ResponseBody
	public ResponseEntity<?> postProdReview(ProdReviewPost body) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			productApi.postProdReview(body);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
	}
	
	/**
	 * 	상품평 수정
	 *
	 * @param body
	 * @return
	 */
	@PostMapping("/updateProdReview")
	@ResponseBody
	public ResponseEntity<?> updateProdReview(ProdReviewUpdate body) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			productApi.updateProdReview(body);
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
	}


	/**********************************************************************************************
	 * 10. 1:1 상담
	 **********************************************************************************************/
	/**
	 *  1:1 문의 목록
	 *
	 * @param offset
	 * @param limit
	 * @return
	 */
	@GetMapping("/getInquiryList")
	@ResponseBody
	public ResponseEntity<?> getInquiryList(int offset, int limit) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			InquiriesSearchResult responseNList = guideApi.getInquiries(getMemberSn(), offset, limit, null, null, "N");
			InquiriesSearchResult responseYList = guideApi.getInquiries(getMemberSn(), offset, limit, null, null, "Y");
			result.put("responseNList", responseNList);
			result.put("responseYList", responseYList);
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

	/**
	 * 1:1 문의 답변 평가
	 *
	 * @param inquirySn
	 * @return
	 */
	@PostMapping("/evalInquiryResponse")
	@ResponseBody
	public ResponseEntity<?> evalInquiryResponse(long inquirySn, InquiriesEvalResponse evalResponse) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			BooleanResult evalResult = guideApi.postInquiriesEvalResponse(inquirySn, evalResponse);
			result.put("result", evalResult);
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
