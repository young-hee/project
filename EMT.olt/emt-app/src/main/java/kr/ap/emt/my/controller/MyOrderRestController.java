package kr.ap.emt.my.controller;


import kr.ap.comm.api.APIError;
import kr.ap.comm.api.APIException;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.my.vo.MyOrdDTO;
import kr.ap.emt.my.vo.MyReqDTO;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.order.order.*;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;


@RestController
@RequestMapping("/my/api")
public class MyOrderRestController extends AbstractController {

	/**********************************************************************************************
	 *  1. 온라인 주문/배송
	 **********************************************************************************************/




	/**********************************************************************************************
	 *  2. 매장 주문/배송
	 **********************************************************************************************/





	/**********************************************************************************************
	 *  3. 반품/교환
	 **********************************************************************************************/





	/**********************************************************************************************
	 *  4. 현금영수증 발급상태
	 **********************************************************************************************/




	/**********************************************************************************************
	 *  공동 Methods
	 **********************************************************************************************/

	/**
	 * 	ordNo 상품평 조회
	 *
	 * @param ordNo
	 * @return
	 */
	@GetMapping("/myReview")
	public ResponseEntity<?> getReview(String ordNo) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), ordNo, 0, 1);
		if (productReviewWritableOrders != null
			&& productReviewWritableOrders.getOrders() != null && productReviewWritableOrders.getOrders().size() > 0) {
			result.put("data", productReviewWritableOrders.getOrders().get(0));
		}

		return ResponseEntity.ok(result);
	}

	@PostMapping("/ordChangeShipAddress")
	public ResponseEntity<?> ordChangeShipAddress(Long ordSn, OrdChangeShipAddress address) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		OrdEx ordEx = orderApi.ordChangeShipAddress(ordSn, address);
		result.put("data", address);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/getOrd")
	public ResponseEntity<?> getOrd(Long ordSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrdEx ex = orderApi.getOrd(ordSn);
		result.put("data", ex);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/cashReceiptIssueRequest")
	public ResponseEntity<?> cashReceiptIssueRequest(Long ordSn, CashReceiptIssueRequest ir, String issueNum) {

		//휴대폰 번호, 카드번호, 사업자 등록번호 구분
		String phoneRegex = "(010|011|016|017|018|019)\\d{7,8}";

		if("Deduction".equals(ir.getCashReceiptPurposeCode()) && !issueNum.isEmpty() && Pattern.matches(phoneRegex, issueNum)){
			ir.setPhoneNo(new EmbeddableTel());
			ir.getPhoneNo().setPhoneNo(issueNum);
		} else if("Deduction".equals(ir.getCashReceiptPurposeCode()) && !issueNum.isEmpty()) {
			ir.setCardNo(issueNum);
		} else if("ExpenseEvidence".equals(ir.getCashReceiptPurposeCode()) && !issueNum.isEmpty()) {
			ir.setBrnNo(issueNum);
		}

		// 현금영수증 목록 조회 api
		BooleanResult result = orderApi.cashReceiptIssueRequest(ordSn, ir);
		if(!result.isResult()) {
			throw error(HttpStatus.FORBIDDEN, "EAPI001", "fail");
		}

		return ResponseEntity.ok(null);
	}

	@GetMapping("/getOrderShippingList")
	public ResponseEntity<?> getOrderShippingList(String type, int offset, int limit, Date RS_Date, Date RD_Date, String returnCode) throws APIException {

		RD_Date = null;
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrdSummaryInfo summaryInfo = orderApi.getOrdSummary(getMemberSn(), RS_Date, RD_Date, null);
		result.put("summary", summaryInfo);
		result.put("type", type);
		//TODO : api 추가
		switch (type) {
			case "online":
				// 182 ecp..4
				// 185 ecp..7
				//온라인 배송/주문 목록 조회 api 추가
				OnlineOrdListResult data = orderApi.getOnlineOrdList(getMemberSn(), RS_Date, RD_Date, offset, limit);
				result.put("data", data);
				break;

			case "store" :
				// 매장 주문/배송 목록 조회 api 추가
				StoreOrdListResult storeData = orderApi.getStoreOrdList(getMemberSn(), RS_Date, RD_Date, offset, limit);
				result.put("data", storeData);
				break;

			case "cashReceipts" :
				// 현금영수증 목록 조회 api
				CashReceiptIssueOrdListResult receiptData = orderApi.getCashReceiptIssueOrdList(getMemberSn(), RS_Date, RD_Date, offset, limit);
				result.put("data", receiptData);
				break;

			case "returnExchange":
				// 반품/교환 목록 조회 api 추가
				ClaimListResult cl = orderApi.getClaimList(getMemberSn(), returnCode, RS_Date, RD_Date, offset, limit);
				result.put("data", cl);
				break;

			default:
				throw new APIException(new APIError(), 500);
		}

		return ResponseEntity.ok(result);
	}

	@GetMapping("/getClaimReasonList")
	public ResponseEntity<?> getClaimReasonList(String claimTypeCode) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		String typeCode = null;
		switch (claimTypeCode) {
			case "cancel" :
				typeCode = "Cancel";
				break;
			case "return" :
				typeCode = "Rtn";
				break;
			case "exchange" :
				typeCode = "Exch";
				break;
		}
		ClaimReasonListResult ex = orderApi.getClaimReasonList(typeCode);
		result.put("data", ex);
		return ResponseEntity.ok(result);
	}

	@PostMapping("/{ordSn}/{type}/ordSelect")
//	public ResponseEntity<?> ordSelect(@PathVariable  Long ordSn, @PathVariable  String type, @RequestBody List<OrdOnlineProdFoDTO> dto) {
	public ResponseEntity<?> ordSelect(@PathVariable  Long ordSn, @PathVariable  String type, @RequestBody List<OrdHistProdEx> dto) {


		HashMap<String, Object> result = new HashMap<String, Object>();
		switch (type) {
			case "return" :
				OrdReturnSelectInfo ors = new OrdReturnSelectInfo();
				ors.setClaimRtnOrderYn("N");

				List<OrdReturnProd> returnList = new ArrayList<>();
				OrdReturnProd orp = null;
//					for (OrdOnlineProdFoDTO d : dto) {
					for (OrdHistProdEx ex : dto) {
						orp = new OrdReturnProd();
						orp.setReturnQty(ex.getOrdQty());
						orp.setOrdHistProdNo(ex.getOrdHistProdNo());


						orp.setReturnReason(ex.getFoReceivedClaimReason());
						orp.setReturnReasonSn(ex.getReceivedClaimReasonSn());

						returnList.add(orp);
					}
//					}

				ors.setOrdReturnProdList(returnList);

				ClaimOrdHistInfo returnOrdEx = orderApi.ordReturnSelect(ordSn, ors);
				MyOrdDTO returnOrdInfo = new MyOrdDTO(returnOrdEx, type);

				result.put("data", returnOrdInfo);
				break;

			case "cancel" :
				OrdCancelSelectInfo ocs = new OrdCancelSelectInfo();
				ocs.setOrdCancelAllYn("N");
				ocs.setCancelAllReasonSn(10L);
				ocs.setCancelAllReason("cancel");

				List<OrdCancelProd> cancelList = new ArrayList<>();
				OrdCancelProd ocp = null;
//					for (OrdOnlineProdFoDTO d : dto) {
					for (OrdHistProdEx ex : dto) {
						ocp = new OrdCancelProd();
						ocp.setCancelQty(ex.getOrdQty());
						ocp.setOrdHistProdNo(ex.getOrdHistProdNo());

						ocp.setCancelReasonSn(ex.getReceivedClaimReasonSn());
						ocp.setCancelReason(ex.getFoReceivedClaimReason());


						cancelList.add(ocp);
					}
//					}

				ocs.setOrdCancelProdList(cancelList);
				OrdEx cancelOrdEx = orderApi.ordCancelSelect(ordSn, ocs);
				result.put("data", new MyOrdDTO(cancelOrdEx, type));
				break;

			case "exchange" :

				OrdExchangeSelectInfo oes = new OrdExchangeSelectInfo();
				oes.setClaimRtnOrderYn("N");

				List<OrdExchangeProd> exList = new ArrayList<>();
				OrdExchangeProd oep = null;
//					for (OrdOnlineProdFoDTO d : dto) {
					for (OrdHistProdEx ex : dto) {
						oep = new OrdExchangeProd();
						oep.setExchangeQty(ex.getOrdQty());
						oep.setOrdHistProdNo(ex.getOrdHistProdNo());
						oep.setExchangeProdSn(ex.getOrdProdEx().getProdSn());

						oep.setExchangeReasonSn(ex.getReceivedClaimReasonSn());
						oep.setExchangeReason(ex.getFoReceivedClaimReason());

						exList.add(oep);
					}
//					}

				oes.setOrdExchangeProdList(exList);

				ExchangeShipAddress ex = new ExchangeShipAddress();
				oes.setExchangeShipAddress(ex);

				ClaimOrdHistInfo exOrdEx = orderApi.ordExchangeSelect(ordSn, oes);
				result.put("data", new MyOrdDTO(exOrdEx, type));
				break;

		}

		return ResponseEntity.ok(result);
	}


	@PostMapping("/{ordSn}/{type}/ordRequest")
	public ResponseEntity<?> ordRequest(@PathVariable Long ordSn, @PathVariable  String type, @RequestBody MyReqDTO ordInfo) {

		HashMap<String, Object> result = new HashMap<String, Object>();
//		List<OrdOnlineProdFoDTO> dto = ordInfo.getShippingOrdOnlineProdList();
		switch (type) {
			case "return" :
				OrdReturnRequestInfo orr = new OrdReturnRequestInfo();
				orr.setClaimRtnOrderYn("N");

				//반품상품목록
				List<OrdReturnProd> retrunList = new ArrayList<>();
				OrdReturnProd orp = null;
//					for (OrdOnlineProdFoDTO d : dto) {
					for (OrdHistProdEx ex : ordInfo.getOrdHistProdList()) {
						orp = new OrdReturnProd();
						orp.setReturnQty(ex.getShipCompleteQty());
						orp.setOrdHistProdNo(ex.getOrdHistProdNo());

						orp.setReturnReason(ex.getFoReceivedClaimReason());
						orp.setReturnReasonSn(ex.getReceivedClaimReasonSn());

						retrunList.add(orp);
					}
//					}

				orr.setOrdReturnProdList(retrunList);

				//반품 회수지 정보
				ReturnShipAddress rsa = new ReturnShipAddress();
				rsa.setRecipientName(ordInfo.getOrdChangeShipAddress().getRecipientName());
				rsa.setRecipientPhoneNo1(ordInfo.getOrdChangeShipAddress().getRecipientPhoneNo1());
				rsa.setRecipientPhoneNo2(ordInfo.getOrdChangeShipAddress().getRecipientPhoneNo2());
				rsa.setRecipientAddress(ordInfo.getOrdChangeShipAddress().getRecipientAddress());
				rsa.setRecipientEmailAddress(ordInfo.getOrdChangeShipAddress().getRecipientEmailAddress());

				orr.setReturnShipAddress(rsa);
				ClaimOrdHistInfo returnOrdEx = orderApi.ordReturnRequest(ordSn, orr);
				result.put("data", new MyOrdDTO(returnOrdEx, type));
				break;

			case "cancel" :

				OrdCancelCompleteInfo occ = new OrdCancelCompleteInfo();
				occ.setOrdCancelAllYn("N");
				occ.setCancelAllReasonSn(71L);
				List<OrdCancelProd> cancelList = new ArrayList<>();

//					for (OrdOnlineProdFoDTO d : dto) {
					for (OrdHistProdEx ex : ordInfo.getOrdHistProdList()) {
						OrdCancelProd ocp = new OrdCancelProd();
						ocp.setOrdHistProdNo(ex.getOrdHistProdNo());
						ocp.setCancelQty(ex.getOrdQty());

						ocp.setCancelReasonSn(ex.getReceivedClaimReasonSn());
						ocp.setCancelReason(ex.getFoReceivedClaimReason());

						cancelList.add(ocp);
					}
//					}

				//결제정보
				PayResult payResult = new PayResult();
				payResult.setDepositYn("Y");
				payResult.setPayApprovalNo("20180529093010478");
				payResult.setNextPayUseYn("Y");
				payResult.setPayApprovalDt(new Date(2018, 5, 29));
				payResult.setCreditcardPayTypeCode("IntFreeInst");
				payResult.setPayAmt(new BigDecimal(85000));

				occ.setOrdCancelProdList(cancelList);
				occ.setAddPayResult(new PayResult());
				OrdEx cancelOrdEx = orderApi.ordCancelComplete(ordSn, occ);
				result.put("data", new MyOrdDTO(cancelOrdEx));
				break;

			case "exchange" :

				OrdExchangeRequestInfo oer = new OrdExchangeRequestInfo();

				oer.setClaimRtnOrderYn("N");

				List<OrdExchangeProd> exList = new ArrayList<>();
				OrdExchangeProd oep = null;
//					for (OrdOnlineProdFoDTO d : dto) {
					for (OrdHistProdEx ex : ordInfo.getOrdHistProdList()) {
						oep = new OrdExchangeProd();
						oep.setExchangeQty(ex.getOrdQty());
						oep.setExchangeProdSn(ex.getOrdProdEx().getProdSn());
						oep.setOrdHistProdNo(ex.getOrdHistProdNo());
						// oep.setExchangeQty(ex.getClaimReceivedQty());
						// System.out.println(ex.getClaimReceivedQty());

						oep.setExchangeReasonSn(ex.getReceivedClaimReasonSn());
						oep.setExchangeReason(ex.getFoReceivedClaimReason());

						exList.add(oep);
					}
//					}

				oer.setOrdExchangeProdList(exList);

				//교환 회수지 정보
				ExchangeShipAddress exAddr = new ExchangeShipAddress();
				exAddr.setRecipientName(ordInfo.getOrdChangeShipAddress().getRecipientName());
				exAddr.setRecipientPhoneNo1(ordInfo.getOrdChangeShipAddress().getRecipientPhoneNo1());
				exAddr.setRecipientPhoneNo2(ordInfo.getOrdChangeShipAddress().getRecipientPhoneNo2());
				exAddr.setRecipientAddress(ordInfo.getOrdChangeShipAddress().getRecipientAddress());
				exAddr.setRecipientEmailAddress(ordInfo.getOrdChangeShipAddress().getRecipientEmailAddress());

				oer.setExchangeShipAddress(exAddr);

				ClaimOrdHistInfo exOrdEx = orderApi.ordExchangeRequest(ordSn, oer);
				result.put("data", new MyOrdDTO(exOrdEx, type));
//					orderApi.ordExchangeSelect(ordSn, )
				break;

		}

		return ResponseEntity.ok(result);
	}

	@PostMapping("/{ordSn}/ordChangeShipAddress")
	public ResponseEntity<?> ordChangeShipAddress_mo(@PathVariable Long ordSn, @Valid OrdChangeShipAddress address) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrdEx ord = orderApi.ordChangeShipAddress(ordSn, address);
		result.put("data", address);
		return ResponseEntity.ok(result);
	}

	@GetMapping("/{ordHistProdSn}/onlineProdUnitVariationProds")
	public ResponseEntity<?> onlineProdUnitVariationProds(@PathVariable Long ordHistProdSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<VariationProd> list = orderApi.getOnlineProdUnitVariationProds(ordHistProdSn);
		result.put("data", list);
		return ResponseEntity.ok(result);
	}

//	@GetMapping("/{ordSn}/{prodSn}/{ordHistProdNo}/ordChangProds")
//	public ResponseEntity<?> ordChangProds(@PathVariable Long ordSn, @PathVariable Long prodSn, @PathVariable String ordHistProdNo) {
	@PostMapping("/{ordSn}/ordChangProds")
	public ResponseEntity<?> ordChangProds(@PathVariable Long ordSn, @Valid OrdChangeProd ocp) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<OrdChangeProd> body = new ArrayList<>();
//			OrdChangeProd ocp = new OrdChangeProd();
//			ocp.setOrdHistProdNo(ordHistProdNo);
//			ocp.setChangeProdSn(prodSn);
		body.add(ocp);
		OrdEx ord = orderApi.ordChangeProds(ordSn, body);
		result.put("data", new MyOrdDTO(ord));
		return ResponseEntity.ok(result);

	}
}
