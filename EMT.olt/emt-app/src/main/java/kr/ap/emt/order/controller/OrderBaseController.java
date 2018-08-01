package kr.ap.emt.order.controller;

import java.math.BigDecimal;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.member.vo.OrdCartInfo;
import kr.ap.comm.support.common.AbstractViewController;
import kr.ap.emt.order.vo.OrdOnlineProdFoDTO;
import kr.ap.emt.order.vo.OrdOnlinePromoFoDTO;
import net.g1project.ecp.api.model.ap.ap.ShipAddressInfo;
import net.g1project.ecp.api.model.order.order.OrdEx;
import net.g1project.ecp.api.model.order.order.OrdHistProdEx;
import net.g1project.ecp.api.model.order.order.OrdOtfEx;
import net.g1project.ecp.api.model.order.order.OrdProdEx;
import net.g1project.ecp.api.model.order.order.OrdRecept;
import net.g1project.ecp.api.model.order.order.OrdShipAddressEx;
import net.g1project.ecp.api.model.order.order.OrdShipAddressListResult;
import net.g1project.ecp.api.model.order.order.PayMethodListResult;
import net.g1project.ecp.api.model.order.order.PayResult;

@Controller
@RequestMapping("/order")
public class OrderBaseController extends AbstractViewController {

	/** logger  */
	final Logger logger = LoggerFactory.getLogger(getClass());

	/** members */
	protected static final String PARAM_KEY_MEMBER = "Member";			// 회원
	protected static final String PARAM_KEY_NONMEMBER = "NonMember";	// 비회원

	/** payMethodCode **/
	protected static final String PAY_METHOD_CODE_CREDIT_CARD = "credit-card";
	protected static final String PAY_METHOD_CODE_BANK_AC_TRANSFER = "bank-ac-transfer";
	protected static final String PAY_METHOD_CODE_MOBILE_PHONE_PAY = "mobile-phone-pay";
	protected static final String PAY_METHOD_CODE_VIRTUAL_ACCOUNT = "virtual-account";
	protected static final String PAY_METHOD_CODE_PAYPAL = "paypal";
	protected static final String PAY_METHOD_CODE_PAYCO = "payco";
	protected static final String PAY_METHOD_CODE_WPAY = "wpay";
	protected static final String PAY_METHOD_CODE_NAVERPAY = "naverpay";
	protected static final String PAY_METHOD_CODE_KAKAOPAY = "kakaopay";
	
	/** YN Code **/
    protected static final String CODE_Y = "Y";
    protected static final String CODE_N = "N";
	
	
	/**
	 * 상품목록 생성
	 */
	protected void makeOrdProdSet(OrdEx ordEx, Model model){
		/* 주문정보 */
		Integer ordQtySum = 0;
		Integer totalOrdOnlineProdCnt = 0;
		Integer shipOrdOnlineProdCnt = 0;
		Integer storeOrdOnlineProdCnt = 0;
		BigDecimal finalOnlineSaleAmtPcurSum = new BigDecimal(0);

		List<OrdOnlineProdFoDTO> shippingOrdOnlineProdList = new ArrayList<OrdOnlineProdFoDTO>();
		List<OrdOnlineProdFoDTO> storePickupOrdOnlineProdList = new ArrayList<OrdOnlineProdFoDTO>();
		List<OrdOtfEx> ordOtfExList = new ArrayList<OrdOtfEx>();
		Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = new HashMap<String, OrdOnlineProdFoDTO>();

        /* M+N, 동시구매프로모션 그룹 만들기 */
        Map<Long, OrdOnlinePromoFoDTO> shippingMNPromoMap = new HashMap<>();
        Map<String, OrdOnlinePromoFoDTO> shippingSameTimePurPromoMap = new HashMap<>(); // key : 동시구매프로모션일련번호 + 동시구매묶음번호
        Map<Long, OrdOnlinePromoFoDTO> storePickupMNPromoMap = new HashMap<>();
        Map<String, OrdOnlinePromoFoDTO> storePickupSameTimePurPromoMap = new HashMap<>(); // key : 동시구매프로모션일련번호 + 동시구매묶음번호
		
		List<OrdShipAddressEx> ordShipAddressList = ordEx.getOrdShipAddressExList();
		for (OrdShipAddressEx ordShipAddressEx : ordShipAddressList) {
			for (OrdOtfEx ordOtfEx : ordShipAddressEx.getOrdOtfExList()) {
				//온라인상품만 포장
				if ("N".equals(ordShipAddressEx.getStorePickupYn())) {
				    ordOtfExList.add(ordOtfEx);
				}
				
				for (OrdHistProdEx ordHistProdEx : ordOtfEx.getOrdHistProdExList()) {
					boolean storePickup = ordShipAddressEx.getStoreSn() != null;
					String key = String.format("%s_%s", ordHistProdEx.getOrdProdEx().getOnlineProdCode(), storePickup ? "Store" : "Ship");
					
					OrdOnlineProdFoDTO ordOnlineProdFo = null;
					// M+N상품
					if(ordHistProdEx.getMPlusNOrdPromoSn() != null) {
                        if (storePickup) {
                            ordOnlineProdFo = getMPlusNPromoOnlineProd(ordHistProdEx, storePickupMNPromoMap);
                        }
                        else {
                            ordOnlineProdFo = getMPlusNPromoOnlineProd(ordHistProdEx, shippingMNPromoMap);
                        }
					}
                    // 동시구매상품
					else if(ordHistProdEx.getSameTimePurPromoSn() != null) {
                        if (storePickup) {
                            ordOnlineProdFo = getSameTimePurPromoOnlineProd(ordHistProdEx, storePickupSameTimePurPromoMap);
                        }
                        else {
                            ordOnlineProdFo = getSameTimePurPromoOnlineProd(ordHistProdEx, shippingSameTimePurPromoMap);
                        }
                    }
                    else {
                        ordOnlineProdFo = ordOnlineProdFoMap.get(key);
                        if(ordOnlineProdFo == null) {
                            ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx);
                            ordOnlineProdFoMap.put(key, ordOnlineProdFo);
                            if (storePickup) {
                                storePickupOrdOnlineProdList.add(ordOnlineProdFo);
                            } else {
                                shippingOrdOnlineProdList.add(ordOnlineProdFo);
                            }
                        }
                    }

                    if (storePickup) {
                        storeOrdOnlineProdCnt++;
                    } else {
                        shipOrdOnlineProdCnt++;
                    }
					
                    totalOrdOnlineProdCnt++;
                    
					ordQtySum += ordHistProdEx.getOrdQty();
					finalOnlineSaleAmtPcurSum = finalOnlineSaleAmtPcurSum.add(ordHistProdEx.getFinalOnlineSaleAmtPcur());
					
					ordOnlineProdFo.addOrdHistProdEx(ordHistProdEx);
				}
			}
		}
		model.addAttribute("ordEx", ordEx);												                                    // 주문번호 확장
		model.addAttribute("shippingOrdOnlineProdList", shippingOrdOnlineProdList);		                                    // 온라인쇼핑일반상품 목록
        model.addAttribute("shippingMNPromoList", new ArrayList<>(shippingMNPromoMap.values()));                            // 온라인쇼핑M+N프로모션 목록
        model.addAttribute("shippingSameTimePurPromoList", new ArrayList<>(shippingSameTimePurPromoMap.values()));          // 온라인쇼핑동시구매프로모션 목록
		model.addAttribute("storePickupOrdOnlineProdList", storePickupOrdOnlineProdList);	                                // 테이크아웃일반상품 목록
        model.addAttribute("storePickupMNPromoList", new ArrayList<>(storePickupMNPromoMap.values()));                      // 온라인쇼핑M+N프로모션 목록
        model.addAttribute("storePickupSameTimePurPromoList", new ArrayList<>(storePickupSameTimePurPromoMap.values()));    // 온라인쇼핑동시구매프로모션 목록
		model.addAttribute("ordOtfExList", ordOtfExList);									                                // 주문배송지시목록

		model.addAttribute("totalOrdOnlineProdCnt", totalOrdOnlineProdCnt);
		model.addAttribute("shipOrdOnlineProdCnt", shipOrdOnlineProdCnt);
		model.addAttribute("storeOrdOnlineProdCnt", storeOrdOnlineProdCnt);

		if(isMember()){
			List<ShipAddressInfo> shipAddressList = new ArrayList<ShipAddressInfo>();
			for(ShipAddressInfo shipAddressInfo : apApi.getShipAddresses(getMemberSn())){
				if("Y".equals(shipAddressInfo.getRepShipAddressYn())){
					shipAddressList.add(shipAddressInfo);
				}
			}
			OrdShipAddressListResult ordShipAddress = orderApi.getOrdShipAddressList(getMemberSn(), null, null, 0, 1);
			PayMethodListResult payMethodList = orderApi.getPayMethodList(PARAM_KEY_MEMBER);

			model.addAttribute("shipAddressList", shipAddressList);								// 기본배송지목록
			model.addAttribute("ordShipAddressExList", ordShipAddress.getOrdShipAddressExList());	// 주문배송지목록
			model.addAttribute("payMethodResult", payMethodList); // 결제수단목록
			model.addAttribute("apMember", apApi.getMemberInfo(getMemberSn()));		// 회원정보
			model.addAttribute("memberSn", getMemberSn());							// 회원일련번호
		}else{
			List<OrdShipAddressEx> ordShipAddressExList = ordEx.getOrdShipAddressExList();
			PayMethodListResult payMethodList = orderApi.getPayMethodList(PARAM_KEY_NONMEMBER);
			model.addAttribute("ordShipAddressExList", ordShipAddressExList.size() > 0 ? ordShipAddressExList : 0);	// 주문배송지목록
			model.addAttribute("payMethodResult", payMethodList); // 결제수단목록
		}
	}

    private OrdOnlineProdFoDTO getMPlusNPromoOnlineProd(OrdHistProdEx ordHistProdEx, Map<Long, OrdOnlinePromoFoDTO> ordOnlinePromoFoMap) {
        OrdOnlinePromoFoDTO ordOnlinePromoFo = ordOnlinePromoFoMap.get(ordHistProdEx.getMPlusNOrdPromoSn());
        if(ordOnlinePromoFo == null) {
            ordOnlinePromoFo = new OrdOnlinePromoFoDTO();
            ordOnlinePromoFo.setPromoSn(ordHistProdEx.getMPlusNOrdPromoSn());
            ordOnlinePromoFo.setPromoName(ordHistProdEx.getMPlusNOrdPromoNameRlang());
            ordOnlinePromoFo.setOrdOnlineProdFoMap(new HashMap<>());
            ordOnlinePromoFo.setOrdOnlineProdFoList(new ArrayList<>());
            
            ordOnlinePromoFoMap.put(ordHistProdEx.getMPlusNOrdPromoSn(), ordOnlinePromoFo);
        }
        
        return getOrdOnlineProdFo(ordHistProdEx, ordOnlinePromoFo);
    }

    private OrdOnlineProdFoDTO getOrdOnlineProdFo(OrdHistProdEx ordHistProdEx,  OrdOnlinePromoFoDTO ordOnlinePromoFo) {
        Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = ordOnlinePromoFo.getOrdOnlineProdFoMap();
        OrdOnlineProdFoDTO ordOnlineProdFo = ordOnlineProdFoMap.get(ordHistProdEx.getOrdProdEx().getOnlineProdCode());
        if(ordOnlineProdFo == null) {
            ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx);
            ordOnlineProdFoMap.put(ordHistProdEx.getOrdProdEx().getOnlineProdCode(), ordOnlineProdFo);
            ordOnlinePromoFo.getOrdOnlineProdFoList().add(ordOnlineProdFo);
        }
        return ordOnlineProdFo;
    }
    
    private OrdOnlineProdFoDTO getSameTimePurPromoOnlineProd(OrdHistProdEx ordHistProdEx, Map<String, OrdOnlinePromoFoDTO> ordOnlinePromoFoMap) {
        String key = ordHistProdEx.getSameTimePurPromoSn() + "_" + ordHistProdEx.getSameTimePurProdBulkNo();
        OrdOnlinePromoFoDTO ordOnlinePromoFo = ordOnlinePromoFoMap.get(key);
        if(ordOnlinePromoFo == null) {
            ordOnlinePromoFo = new OrdOnlinePromoFoDTO();
            ordOnlinePromoFo.setPromoSn(ordHistProdEx.getSameTimePurPromoSn());
            ordOnlinePromoFo.setPromoName(ordHistProdEx.getSameTimePurOrdPromoNameRlang());
            ordOnlinePromoFo.setOrdOnlineProdFoMap(new HashMap<>());
            ordOnlinePromoFo.setOrdOnlineProdFoList(new ArrayList<>());
            
            ordOnlinePromoFoMap.put(key, ordOnlinePromoFo);
        }
        
        return getOrdOnlineProdFo(ordHistProdEx, ordOnlinePromoFo);
    }
    
	/**
	 * 온라인상품 목록 세팅
	 */
	protected OrdOnlineProdFoDTO makeOrdOnlineProdFo(OrdHistProdEx ordHistProd) {
		OrdOnlineProdFoDTO ordOnlineProdFo = new OrdOnlineProdFoDTO();
		OrdProdEx ordProd = ordHistProd.getOrdProdEx();
		ordOnlineProdFo.setOnlineProdCode(ordProd.getOnlineProdCode());						// 온라인상품코드
		ordOnlineProdFo.setOnlineProdName(ordProd.getOnlineProdNameRlang());				// 온라인상품명
		ordOnlineProdFo.setOnlineProdImgUrl(ordProd.getOnlineProdImgUrl());					// 온라인상품 이미지
		ordOnlineProdFo.setBulkDcOnlineProdCode(ordProd.getBulkDcOnlineProdCode());			// 묶음할인온라인상품코드
		ordOnlineProdFo.setBulkDcOnlineProdName(ordProd.getBulkDcOnlineProdNameRlang());	// 묶음할인온라인상품명
		ordOnlineProdFo.setOrdHistProdTypeCode(ordHistProd.getOrdHistProdTypeCode());		// 주문이력상품유형코드
		ordOnlineProdFo.setFinalOnlineSaleAmtPcurSum(BigDecimal.ZERO);						// 상품판매가(상품판매가 X 주문수량)
		ordOnlineProdFo.setOrdQtySum(0);													// 주문수량(단위상품 X 주문수량)
		ordOnlineProdFo.setOrdHistProdList(new ArrayList<OrdHistProdEx>());					// 주문이력(확장)
		return ordOnlineProdFo;
	}

	/**
	 * 상품번호 할당
	 */
	protected List<Long> getCartProdSnList(String onlineProdSnArr, String takeoutProdSnArr) {
		List<Long> cartProdSnList = new ArrayList<Long>();
		String[] arrayOnlineProdSn;
		String[] arrayTakeoutProdSn;
		if(onlineProdSnArr.length() != 0 || onlineProdSnArr.length() > 0){		// 온라인상품
			arrayOnlineProdSn = onlineProdSnArr.split("\\,");
			for(int i=0; i < arrayOnlineProdSn.length; i++){
				cartProdSnList.add(Long.valueOf(arrayOnlineProdSn[i]));
			}
		}
		if(takeoutProdSnArr.length() != 0 || takeoutProdSnArr.length() > 0){	// 테이크아웃상품
			arrayTakeoutProdSn = takeoutProdSnArr.split("\\,");
			for(int i=0; i < arrayTakeoutProdSn.length; i++){
				cartProdSnList.add(Long.valueOf(arrayTakeoutProdSn[i]));
			}
		}
		return cartProdSnList;
	}

	/**
	 * 주문서 생성
	 */
	protected OrdEx createOrder(Long cartSn, List<Long> cartProdSnList) {
		OrdRecept ordRecept = new OrdRecept();
		ordRecept.setOrdReceivedChCode(getDisplayChannel());
		if(isMember()) {
			ordRecept.setMemberSn(getMemberSn());
			ordRecept.setPurchaserTypeCode(PARAM_KEY_MEMBER);
		}else{
			ordRecept.setNonmemberOrdTermsAgreeYn("Y");
			ordRecept.setPurchaserTypeCode(PARAM_KEY_NONMEMBER);
		}
		if(!ObjectUtils.isEmpty(cartProdSnList) && cartProdSnList.size() > 0) {
			ordRecept.setCartProdSnList(cartProdSnList);
		}
		return orderApi.ordRecept(cartSn, ordRecept);
	}

	/**
	 * PG결제 분기
	 */
    protected PayResult makePgPayResult(HttpServletRequest request, MemberSession memberSession) {
        String payMethodCode = memberSession.getPayMethodCode();
        
        /* 네이버페이 결제(MOBILE/PC 동일) */
        if(PAY_METHOD_CODE_NAVERPAY.equals(payMethodCode)) {
            String resultCode = request.getParameter("resultCode");
            if("Success".equals(resultCode)) { /* 거래상태 : "Success" 이외 실패 */
                return makeNaverPayResult(request, memberSession);
            }
        }
        /* WPAY 결제(MOBILE/PC 동일) */
        else if(PAY_METHOD_CODE_WPAY.equals(payMethodCode)){
			String resultCode = request.getParameter("resultCode");
			if("0000".equals(resultCode)) { /* 거래상태 : "0000" 이외 실패 */
				return makeWPayResult(request, memberSession);
			}
		}
        /* 이니시스 결제 */
        else if(PAY_METHOD_CODE_CREDIT_CARD.equals(payMethodCode)
                || PAY_METHOD_CODE_BANK_AC_TRANSFER.equals(payMethodCode)
                || PAY_METHOD_CODE_MOBILE_PHONE_PAY.equals(payMethodCode)
                || PAY_METHOD_CODE_VIRTUAL_ACCOUNT.equals(payMethodCode)
                || PAY_METHOD_CODE_PAYCO.equals(payMethodCode)
                || PAY_METHOD_CODE_KAKAOPAY.equals(payMethodCode)){
            if (isMobileDevice()) { // MOBILE
                String pStatus = request.getParameter("P_STATUS");
                if(pStatus == "00" || "00".equals(pStatus)){ /* 거래상태 : "00" 이외 실패 */
                    return makeINIMobilePayResult(request, memberSession);
                }
            }
            if (isPcDevice()) { // PC
                String pStatus = request.getParameter("resultCode");
                if(pStatus == "0000" || "0000".equals(pStatus)) { /* 거래상태 : "0000" 이외 실패 */
                    return makeINIPcPayResult(request, memberSession);
                }
            }
        }
        
        return null;
    }
	
    /**
	 * 네이버페이 결제정보
	 */
	protected PayResult makeNaverPayResult(HttpServletRequest request, MemberSession memberSession) {

		Date date;

		PayResult payResult = new PayResult();
		String payMethodCode = memberSession.getPayMethodCode();

		try{
			/**
			 * 네이버페이 결제
			 * paymentId : 네이버페이 결제번호
			 * primaryPayMeans : 주 결제수단(CARD:신용카드, BANK:계좌이체)
			 * admissionYmdt : 결제/취소일시(YYYYMMDDHH24MMSS)
			 * totalPayAmount : 총 결제/취소금액
			 */
			if(PAY_METHOD_CODE_NAVERPAY.equals(payMethodCode)) {
				String pgTradeNo = request.getParameter("paymentId");
				String primaryPayMeans = request.getParameter("primaryPayMeans");

				SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
				String admissionYmdt = request.getParameter("admissionYmdt");
				date = formatOutput.parse(admissionYmdt + "+0900");

				String totalPayAmount = request.getParameter("totalPayAmount");
				BigDecimal parseTotalPayAmount = new BigDecimal(totalPayAmount.replaceAll(",", ""));

				payResult.setPgTradeNo(pgTradeNo);
				payResult.setPayApprovalDt(date);
				payResult.setPayAmt(parseTotalPayAmount);
				payResult.setPartialCancelAvailYn(CODE_Y); //TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!

				payResult.setDepositYn(CODE_N);									// 예치금여부
				payResult.setPayMethodSn(memberSession.getPayMethodSn());       // 결제수단일련번호
				payResult.setPayServiceCode(memberSession.getPayServiceCode()); // 결제서비스코드
				payResult.setPayMethodCode(memberSession.getPayMethodCode());   // 결제수단코드
				payResult.setCreditcardCoSn(memberSession.getCreditcardCoSn()); // 신용카드업체일련번호
				payResult.setNextPayUseYn(memberSession.getNextPayUseYn());     // 다음결제사용여부
				payResult.setPayApprovalNo(null);                               // 결제승인번호
				payResult.setOptAssignData(null);                               // 임의지정데이터
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return payResult;
	}

	/**
	 * W페이 결제정보
	 */
	protected PayResult makeWPayResult(HttpServletRequest request, MemberSession memberSession) {

		Date date;

		PayResult payResult = new PayResult();
		String payMethodCode = memberSession.getPayMethodCode();

		try{

			/**
			 * W페이 결제
			 * tid : 이니시스 결제 트랜잭션 ID(TID)
			 * wtid : 인증요청시 발급된 WPAY 트랜잭션 ID
			 * bankCardCode : 신용카드(카드사 코드)
			 * cardIsscoCode : 카드발급사(은행) 코드
			 * bankCardNo : 카드번호(카드사 기준의 마스 킹 처리) / 계좌번호(마스킹처리) (확인필요)
			 * cardInterest : 무이자여부(Y/N)
			 * cardQuota : 할부개월수(00:일시불)
			 * applNum : 승인번호
			 * applDate : 승인일시 (YYYYMMDDHH24MISS)
			 * applPrice : 승인금액
			 * applCardNum : 승인카드번호 :등록 시 카드번호와 다를 수 있음
			 * cardCheckFlag : 체크카드 여부 (0: 신용카드, 1: 체크카드, 2: GIFT 카드)
			 * partCancelCode : 부분취소 가능 여부 (0: 불가능, 1: 가능)
			 */
			if(PAY_METHOD_CODE_WPAY.equals(payMethodCode)) {

				String pgTradeNo = request.getParameter("tid");
				String wtid = request.getParameter("wtid");
				String cardCoCode = request.getParameter("bankCardCode");
				String cardIssueBankCode = request.getParameter("cardIsscoCode");
				String cardNo = request.getParameter("bankCardNo");
				String cardInterest = request.getParameter("cardInterest");
				String cardQuota = request.getParameter("cardQuota");
				String payApprovalNo = request.getParameter("applNum");

				SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
				String payApprovalDt = request.getParameter("applDate");
				date = formatOutput.parse(payApprovalDt + "+0900");

				String payAmt = request.getParameter("applPrice");
				BigDecimal parseTotalPayAmount = new BigDecimal(payAmt.replaceAll(",", ""));

				String cardCheckFlag = request.getParameter("cardCheckFlag");
				if("0".equals(cardCheckFlag)){ // 신용카드

				}else if("1".equals(cardCheckFlag)) { // 체크카드

				}else if("2".equals(cardCheckFlag)) { // GIFT 카드

				}

				String partCancelCode = request.getParameter("partCancelCode");
				if("0".equals(partCancelCode)){
					payResult.setPartialCancelAvailYn(CODE_N);					// 부분취소 가능여부 : 불가능
				}else if("1".equals(partCancelCode)){
					payResult.setPartialCancelAvailYn(CODE_Y);					// 부분취소 가능여부 : 가능
				}

				payResult.setCardNo(cardNo);									// 카드번호
				payResult.setCardCoCode(cardCoCode);							// 카드사코드
				//payResult.setCardCoName(cardCoName);							// 카드명
				payResult.setCardIssueBankCode(cardIssueBankCode);				// 카드발급은행코드

				if("Y".equals(cardInterest)){									// 무이자여부(Y/N)
					payResult.setInstPeriod(Integer.parseInt(cardQuota));		// 할부기간(할부개월수)
				}else{
					payResult.setIntFreeInstPeriod(Integer.parseInt(cardQuota));// 무이자할부기간(할부개월수)
				}

				payResult.setPgTradeNo(pgTradeNo);								// PG거래번호
				payResult.setPayApprovalNo(payApprovalNo);						// 결제 승인번호
				payResult.setPayApprovalDt(date);								// 결제 승인일시
				payResult.setPayAmt(parseTotalPayAmount);						// 결제금액

				payResult.setDepositYn(CODE_N);									// 예치금여부
				payResult.setPayMethodSn(memberSession.getPayMethodSn());       // 결제수단일련번호
				payResult.setPayServiceCode(memberSession.getPayServiceCode()); // 결제서비스코드
				payResult.setPayMethodCode(memberSession.getPayMethodCode());   // 결제수단코드
				payResult.setCreditcardCoSn(memberSession.getCreditcardCoSn()); // 신용카드업체일련번호
				payResult.setNextPayUseYn(memberSession.getNextPayUseYn());     // 다음결제사용여부
				payResult.setPayApprovalNo(null);                               // 결제승인번호
				payResult.setOptAssignData(null);                               // 임의지정데이터
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return payResult;
	}

    /**
     * 이니시스 결제정보(MOBILE)
     */
    protected PayResult makeINIMobilePayResult(HttpServletRequest request, MemberSession memberSession) {

    	Date date;

        PayResult payResult = new PayResult();
        String payMethodCode = memberSession.getPayMethodCode();

        try {

			/**
			 * 이니시스 결제 공통
			 * P_STATUS : 거래상태(“00” 이외 실패)
			 * P_TID : 거래번호
			 * P_TYPE : 지불수단
			 * P_AUTH_DT : 승인일자(YYYYmmddHHmmss)
			 * P_MID : 상점아이디
			 * P_OID : 상점 주문번호
			 * P_AMT : 거래금액
			 * P_UNAME : 주문자명
			 */
			String pgTradeNo = request.getParameter("P_TID");

			String pAuthDt = request.getParameter("P_AUTH_DT");
			SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
			date = formatOutput.parse(pAuthDt + "+0900");

			String merchantId = request.getParameter("P_MID");
			String payAmt = request.getParameter("P_AMT");
			BigDecimal parsePayAmt = new BigDecimal(payAmt.replaceAll(",", ""));

			payResult.setPgTradeNo(pgTradeNo);
			payResult.setPayApprovalDt(date);
			payResult.setPayAmt(parsePayAmt);
			payResult.setMerchantId(merchantId);

			logger.info("거래번호 : " + pgTradeNo);
			logger.info("승인일자 : " + pAuthDt);
			logger.info("상점아이디 : " + merchantId);
			logger.info("거래금액 : " + parsePayAmt);

			switch (payMethodCode) {
				case PAY_METHOD_CODE_CREDIT_CARD:
					/**
					 * 신용카드 결제
					 * P_FN_CD1 : 카드코드
					 * P_FN_NM : 결제카드한글명
					 * P_CARD_ISSUER_CODE : 발급사 코드
					 * P_CARD_NUM : 카드번호
					 * P_CARD_PRTC_CODE : 부분취소 가능여부(부분취소가능 : 1,부분취소불가능 : 0)
					 * P_CARD_CHECKFLAG : 체크카드 여부(0:신용카드)
					 * P_CARD_INTEREST : 무이자 할부여부(0 : 일반, 1 : 무이자)
					 * P_RMESG2 : 무이자할부기간(0 : 일반,1 : 무이자)
					 */
					String cardCoCode = request.getParameter("P_FN_CD1");
					String cardCoName = request.getParameter("P_FN_NM");
					String cardIssueBankCode = request.getParameter("P_CARD_ISSUER_CODE");
					String cardNo = request.getParameter("P_CARD_NUM");
					String partialCancelAvailYn = request.getParameter("P_CARD_PRTC_CODE");
					String pCardCheckflag = request.getParameter("P_CARD_CHECKFLAG");
					String pCardInterest = request.getParameter("P_CARD_INTEREST");
					String pRmesg2 = request.getParameter("P_RMESG2");

					payResult.setCardCoCode(cardCoCode);
					payResult.setCardCoName(cardCoName);
					payResult.setCardIssueBankCode(cardIssueBankCode);
					payResult.setCardNo(cardNo);

					/* 부분취소 가능여부(부분취소가능 : 1,부분취소불가능 : 0) */
					if ("1".equals(partialCancelAvailYn)) {
						payResult.setPartialCancelAvailYn("Y");
					} else {
						payResult.setPartialCancelAvailYn("N");
					}
					payResult.setCreditcardPayTypeCode(null);

					/* 체크카드 여부(0:신용카드) */
					if ("0".equals(pCardCheckflag)) {
						if ("0".equals(pCardInterest)) {
							payResult.setInstPeriod(Integer.parseInt(pRmesg2));
						} else {
							payResult.setIntFreeInstPeriod(Integer.parseInt(pRmesg2));
						}
					}
					break;

				case PAY_METHOD_CODE_MOBILE_PHONE_PAY:
					/**
					 * 휴대폰결제
					 * P_HPP_CORP : 휴대폰 통신사
					 * P_HPP_NUM : 결제 휴대폰 번호
					 */
					String mobilePhoneNo = request.getParameter("P_HPP_NUM");
					payResult.setMobilePhoneNo(mobilePhoneNo);
					payResult.setPartialCancelAvailYn("Y");     // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_BANK_AC_TRANSFER:
					/**
					 * 실시간계좌이체
					 */

					/**
					 * 현금영수증 발행
					 * P_CSHR_CODE : 처리상태(220000 : 정상, 그 외 : 오류)
					 * P_CSHR_MSG : 처리메시지
					 * P_VACT_TIME : 입금마감시간(hhmmss)
					 * P_VACT_NAME : 계좌주명
					 * P_VACT_BANK_CODE : 은행코드
					 * P_CSHR_AMT : 현금영수증(총금액 = 공급가액+세금+봉사료)
					 * P_CSHR_SUP_AMT : 공급가액
					 * P_CSHR_TAX : 세금
					 * P_CSHR_SRVC_AMT : 봉사료
					 * P_CSHR_TYPE : 용도구분(0:소득공제용, 1:지출증빙용)
					 * P_CSHR_DT : 발행시간
					 * P_CSHR_AUTH_NO : 발행번호(가상계좌의 경우, 입금 완료 시, 생성되어 모바일 내 채번시에는 전달되지 않습니다.)
					 */
					String bankPCshrCode = request.getParameter("P_CSHR_CODE");
					if (bankPCshrCode == "220000" || "220000".equals(bankPCshrCode)) { /* 처리상태 : "220000" 이외 오류 */
						String cashReceiptIssueIdentifier = request.getParameter("P_CSHR_TYPE"); // 용도구분
						String cashReceiptTradeNo = request.getParameter("P_CSHR_AUTH_NO"); // 발행번호(가상계좌의 경우,입금 완료 시, 생성되어 모바일 내 채번시에는 전달되지 않습니다.)
						payResult.setCashReceiptIssuePossibleYn("Y"); //현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("Y"); //현금영수증발급여부
						if (cashReceiptIssueIdentifier == "0" || "0".equals(cashReceiptIssueIdentifier)) {
							payResult.setCashReceiptIssueIdentifier("0"); //현금영수증발급식별자  (0:소득공제용-개인)
						} else {
							payResult.setCashReceiptIssueIdentifier("1"); //현금영수증발급식별자(1:지출증빙용-사업자)
						}
						payResult.setCashReceiptTradeNo(cashReceiptTradeNo); //현금영수증거래번호

					} else { /* 처리상태 : 오류 */
						payResult.setCashReceiptIssuePossibleYn("N"); //현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("N"); //현금영수증발급여부
						payResult.setCashReceiptIssueIdentifier(null); //현금영수증발급식별자(0:소득공제용/1:지출증빙용)
						payResult.setCashReceiptTradeNo(null); //현금영수증거래번호
					}

					payResult.setBankCode(null); //은행코드
					payResult.setBankName(null); //은행명
					payResult.setCashReceiptPurposeCode(null); //현금영수증용도코드
					payResult.setCashReceiptApprovalNo(null); //현금영수증승인번호
					payResult.setCashReceiptUrl(null); //현금영수증URL
					payResult.setPartialCancelAvailYn("Y"); //TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_VIRTUAL_ACCOUNT:
					/**
					 * 무통장(가상계좌)
					 * P_VACT_NUM : 입금할 계좌 번호
					 * P_VACT_DATE : 입금마감일자(yyyymmdd)
					 * P_VACT_TIME : 입금마감시간(hhmmss)
					 * P_VACT_NAME : 계좌주명
					 * P_VACT_BANK_CODE : 은행코드
					 */
					String virtualBankAcBankName = request.getParameter("P_FN_NM");
					String virtualDepositBankAcNo = request.getParameter("P_VACT_NUM");
					String virtualBankAcDeadlineDt = request.getParameter("P_VACT_DATE");
					String virtualBankAcAcHolder = request.getParameter("P_VACT_NAME");
					String virtualBankAcBankCode = request.getParameter("P_VACT_BANK_CODE");

					virtualBankAcDeadlineDt = virtualBankAcDeadlineDt.substring(0, 4) + '-' + virtualBankAcDeadlineDt.substring(4, 6) + '-' + virtualBankAcDeadlineDt.substring(6, 8);
					SimpleDateFormat virtualBankFormatInput = new SimpleDateFormat("yyyy-MM-dd");
					SimpleDateFormat virtualBankFormatOutput = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
					Date vbDate;
					vbDate = virtualBankFormatInput.parse(virtualBankAcDeadlineDt, new ParsePosition(0));
					String virtualBankDateString = virtualBankFormatOutput.format(vbDate);
					vbDate = virtualBankFormatOutput.parse(virtualBankDateString, new ParsePosition(0));

					payResult.setVirtualBankAcBankCode(virtualBankAcBankCode);      // 가상계좌은행코드
					payResult.setVirtualBankAcBankName(virtualBankAcBankName);      // 가상계좌은행명
					payResult.setVirtualDepositBankAcNo(virtualDepositBankAcNo);    // 가상입금계좌번호(입금할 계좌번호)
					payResult.setVirtualBankAcAcHolder(virtualBankAcAcHolder);      // 가상계좌예금주
					payResult.setVirtualBankAcDeadlineDt(vbDate);                   // 가상계좌기한일시(
					payResult.setVirtualBankAcDepositDt(vbDate);                    // 가상계좌입금일시
					payResult.setVirtualBankAcClosedSmsYn(null);                    // 가상계좌마감SMS여부

					/**
					 * 현금영수증 발행
					 * P_CSHR_CODE : 처리상태(220000 : 정상, 그 외 : 오류)
					 * P_CSHR_MSG : 처리메시지
					 * P_VACT_TIME : 입금마감시간(hhmmss)
					 * P_VACT_NAME : 계좌주명
					 * P_VACT_BANK_CODE : 은행코드
					 * P_CSHR_AMT : 현금영수증(총금액 = 공급가액+세금+봉사료)
					 * P_CSHR_SUP_AMT : 공급가액
					 * P_CSHR_TAX : 세금
					 * P_CSHR_SRVC_AMT : 봉사료
					 * P_CSHR_TYPE : 용도구분(0:소득공제용, 1:지출증빙용)
					 * P_CSHR_DT : 발행시간
					 * P_CSHR_AUTH_NO : 발행번호(가상계좌의 경우, 입금 완료 시, 생성되어 모바일 내 채번시에는 전달되지 않습니다.)
					 */
					String virtualPCshrCode = request.getParameter("P_CSHR_CODE");
					if (virtualPCshrCode == "220000" || "220000".equals(virtualPCshrCode)) {              // 처리상태 : "220000" 이외 오류
						String cashReceiptIssueIdentifier = request.getParameter("P_CSHR_TYPE");    // 용도구분
						String cashReceiptTradeNo = request.getParameter("P_CSHR_AUTH_NO");     // 발행번호(가상계좌의 경우,입금 완료 시, 생성되어 모바일 내 채번시에는 전달되지 않습니다.)
						payResult.setCashReceiptIssuePossibleYn("Y");                                   // 현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("Y");                                           // 현금영수증발급여부
						if (cashReceiptIssueIdentifier == "0" || "0".equals(cashReceiptIssueIdentifier)) {
							payResult.setCashReceiptIssueIdentifier("0");                               // 현금영수증발급식별자   (0:소득공제용-개인)
						} else {
							payResult.setCashReceiptIssueIdentifier("1");                               // 현금영수증발급식별자(1:지출증빙용-사업자)
						}
						payResult.setCashReceiptTradeNo(cashReceiptTradeNo);                            // 현금영수증거래번호

					} else { /* 처리상태 : 오류 */
						payResult.setCashReceiptIssuePossibleYn("N");   // 현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("N");           // 현금영수증발급여부
						payResult.setCashReceiptIssueIdentifier(null);  // 현금영수증발급식별자(0:소득공제용/1:지출증빙용)
						payResult.setCashReceiptTradeNo(null);          // 현금영수증거래번호
					}
					payResult.setCashReceiptPurposeCode(null);          // 현금영수증용도코드
					payResult.setCashReceiptApprovalNo(null);           // 현금영수증승인번호
					payResult.setCashReceiptUrl(null);                  // 현금영수증URL
					payResult.setPartialCancelAvailYn("Y");             // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_PAYCO:// 페이코
					payResult.setPartialCancelAvailYn("Y");             // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_KAKAOPAY:// 카카오페이
					payResult.setPartialCancelAvailYn("Y"); //TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;
			}

			/* 공통 파라미터 */
			payResult.setDepositYn(CODE_N);           						// 예치금여부
			payResult.setPayMethodSn(memberSession.getPayMethodSn());       // 결제수단일련번호
			payResult.setPayServiceCode(memberSession.getPayServiceCode()); // 결제서비스코드
			payResult.setPayMethodCode(memberSession.getPayMethodCode());   // 결제수단코드
			payResult.setCreditcardCoSn(memberSession.getCreditcardCoSn()); // 신용카드업체일련번호
			payResult.setNextPayUseYn(memberSession.getNextPayUseYn());     // 다음결제사용여부
			payResult.setPayApprovalNo(null);                               // 결제승인번호
			payResult.setOptAssignData(null);                               // 임의지정데이터
		}
		catch (Exception e) {
			e.printStackTrace();
		}
        return payResult;
    }
    
    /**
     * 이니시스 결제정보(PC)
     */
    protected PayResult makeINIPcPayResult(HttpServletRequest request, MemberSession memberSession) {

    	Date date;

    	PayResult payResult = new PayResult();
        String payMethodCode = memberSession.getPayMethodCode();

		try {
			/**
			 * 이니시스 결제 공통
			 * tid(P_TID) : 거래번호
			 * applDate(P_AUTH_DT) : 승인일자(YYYYmmdd)
			 * applTime : 승인시간 (HHmmss)
			 * mid(P_MID) : 상점아이디
			 * TotPrice(P_AMT) : 거래금액
			 * EventCode : 이벤트코드(카드 할부 및 행사 적용 코드)
			 * MOID : 주문번호(상점주문번호. 결제 요청시 "oid" 필드에 설정된값)
			 * payMethod : 지불수단(결제방법)
			 * applNum : 승인번호(결제수단에 따리 미전송)
			 */
			String pgTradeNo = request.getParameter("tid");

			SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
			String pAuthDt = request.getParameter("applDate");
			String pAuthtime = request.getParameter("applTime");
			date = formatOutput.parse(pAuthDt + pAuthtime + "+0900");

			String merchantId = request.getParameter("mid");
			String payAmt = request.getParameter("TotPrice");
			BigDecimal parsePayAmt = new BigDecimal(payAmt.replaceAll(",", ""));

			String EventCode = request.getParameter("EventCode");
			String MOID = request.getParameter("MOID");
			String INIPayMethod = request.getParameter("payMethod");

			payResult.setPgTradeNo(pgTradeNo);
			payResult.setPayApprovalDt(date);
			payResult.setPayAmt(parsePayAmt);
			payResult.setMerchantId(merchantId);

			/* 결제수단구분 */
			switch(payMethodCode){
				case PAY_METHOD_CODE_CREDIT_CARD:
					/**
					 * 신용카드 결제
					 * CARD_Code(P_FN_CD1) : 카드사코드(카드코드)
					 * P_FN_NM : 결제카드한글명
					 * CARD_BankCode(P_CARD_ISSUER_CODE) : 카드발급사(발급사 코드)
					 * CARD_Num(P_CARD_NUM) : 카드번호
					 * CARD_PRTC_CODE(P_CARD_PRTC_CODE) : 부분취소 가능여부(부분취소가능 : 1,부분취소불가능 : 0)
					 * P_CARD_CHECKFLAG : 체크카드 여부(0:신용카드)
					 * CARD_Interest(P_CARD_INTEREST) : 무이자 할부여부(0 : 일반, 1 : 무이자)
					 * CARD_Quota(P_RMESG2) : 무이자할부기간
					 * CARD_SrcCode : 간편(앱)결제 구분(C : PAYCO, B : 삼성페이, D : 삼성페이(체크), G : SSGPAY, O : KAKAOPAY, L : LPAY, K : 국민앱카드, A : KPAY)
					 */
					String cardCoCode = request.getParameter("CARD_Code");
					String cardIssueBankCode = request.getParameter("CARD_BankCode");
					String cardNo = request.getParameter("CARD_Num");
					String partialCancelAvailYn = request.getParameter("CARD_PRTC_CODE");
					String pCardInterest = request.getParameter("CARD_Interest");
					String pRmesg2 = request.getParameter("CARD_Quota");

					payResult.setCardCoCode(cardCoCode);
					//payResult.setCardCoName(cardCoName);
					payResult.setCardIssueBankCode(cardIssueBankCode);
					payResult.setCardNo(cardNo);
					if("1".equals(partialCancelAvailYn)){
						payResult.setPartialCancelAvailYn("Y");
					}else{
						payResult.setPartialCancelAvailYn("N");
					}
					payResult.setCreditcardPayTypeCode(null);

					//if(pCardCheckflag == "0" || "0".equals(pCardCheckflag)){
					if("0".equals(pCardInterest)){
						payResult.setInstPeriod(Integer.parseInt(pRmesg2));
					}else{
						payResult.setIntFreeInstPeriod(Integer.parseInt(pRmesg2));
					}
					//}
					break;

				case PAY_METHOD_CODE_MOBILE_PHONE_PAY:
					/**
					 * 휴대폰결제
					 * HPP_Num(P_HPP_NUM) : 결제 휴대폰 번호
					 * payDevice : 결제장치(PC)
					 */
					String mobilePhoneNo = request.getParameter("HPP_Num");
					payResult.setMobilePhoneNo(mobilePhoneNo);
					payResult.setPartialCancelAvailYn("Y");     // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_BANK_AC_TRANSFER: // 실시간계좌이체
					/**
					 * 계좌이체
					 * ACCT_BankCode : 은행코드(은행코드, [별첨정보 참조])
					 * CSHR_ResultCode(P_CSHR_CODE) : 현금영수증 발행 정상여부(220000(정상처리))
					 * CSHR_Type(P_CSHR_TYPE) : 현금영수증구분(0 = 소득공제 / 1 = 지출증빙)
					 * ACCT_Name : 계좌주명
					 */
					String bankCode = request.getParameter("ACCT_BankCode");                        // 은행코드
					String bankPCshrCode = request.getParameter("CSHR_ResultCode");             // 현금영수증 발행 정상여부

					/* 현금영수증 발행 정상여부가 정상이면(220000) */
					if(bankPCshrCode == "220000" || "220000".equals(bankPCshrCode)){                    // 처리상태 : "220000" 이외 오류
						String cashReceiptIssueIdentifier = request.getParameter("CSHR_Type");  // 현금영수증구분(0 = 소득공제 / 1 = 지출증빙)
						// TODO : PC버전 발행번호 확인할것!
						String cashReceiptTradeNo = request.getParameter("P_CSHR_AUTH_NO");     // 발행번호(가상계좌의 경우,입금 완료 시, 생성되어 모바일 내 채번시에는 전달되지 않습니다.)

						/* 현금영수증 구분 */
						if(cashReceiptIssueIdentifier == "0" || "0".equals(cashReceiptIssueIdentifier)){
							payResult.setCashReceiptIssueIdentifier("0");       // 현금영수증발급식별자   (0:소득공제용-개인)
						}
						else{
							payResult.setCashReceiptIssueIdentifier("1");       // 현금영수증발급식별자(1:지출증빙용-사업자)
						}
						payResult.setCashReceiptTradeNo(cashReceiptTradeNo);    // 현금영수증거래번호

						payResult.setCashReceiptIssuePossibleYn("Y");                                   // 현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("Y");                                           // 현금영수증발급여부

						/* 현금영수증 발행 실패 */
					}else{
						payResult.setCashReceiptIssueIdentifier(null);  // 현금영수증발급식별자(0:소득공제용/1:지출증빙용)
						payResult.setCashReceiptTradeNo(null);          // 현금영수증거래번호
						payResult.setCashReceiptIssuePossibleYn("N");   // 현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("N");           // 현금영수증발급여부

					}
					payResult.setBankCode(bankCode);            // 은행코드
					payResult.setBankName(null);                // 은행명
					payResult.setCashReceiptPurposeCode(null);  // 현금영수증용도코드
					payResult.setCashReceiptApprovalNo(null);   // 현금영수증승인번호
					payResult.setCashReceiptUrl(null);          // 현금영수증URL
					payResult.setPartialCancelAvailYn("Y");     // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_VIRTUAL_ACCOUNT: // 가상계좌
					/**
					 * 무통장(가상계좌)
					 * VACT_Num(P_VACT_NUM) : 입금계좌번호(무통장입금 가상계좌번호)
					 * VACT_BankCode(P_VACT_BANK_CODE) :입금은행코드(→ 별첨 “A4 은행코드” 참조)
					 * VACT_Name(P_VACT_NAME) : 예금주명
					 * VACT_InputName : 송금자명(입금 시 고객명)
					 * VACT_Date(P_VACT_DATE) : 송금일자
					 * VACT_Time : 송금시각
					 * vactBankName(P_FN_NM) : 입금은행명(무통장 입금 은행명)
					 */
					String virtualBankAcBankCode = request.getParameter("VACT_BankCode");
					String virtualBankAcBankName = request.getParameter("vactBankName");
					String virtualDepositBankAcNo = request.getParameter("VACT_Num");
					String virtualBankAcAcHolder = request.getParameter("VACT_Name");
					String virtualBankAcDeadlineDt = request.getParameter("VACT_Date");

					virtualBankAcDeadlineDt =  virtualBankAcDeadlineDt.substring(0, 4) + '-' + virtualBankAcDeadlineDt.substring(4, 6) + '-' + virtualBankAcDeadlineDt.substring(6, 8);
					SimpleDateFormat virtualBankFormatInput = new SimpleDateFormat("yyyy-MM-dd");
					SimpleDateFormat virtualBankFormatOutput = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
					Date vbDate;
					vbDate = virtualBankFormatInput.parse(virtualBankAcDeadlineDt, new ParsePosition(0));
					String virtualBankDateString = virtualBankFormatOutput.format(vbDate);
					vbDate = virtualBankFormatOutput.parse(virtualBankDateString, new ParsePosition(0));

					payResult.setVirtualBankAcBankCode(virtualBankAcBankCode);      // 가상계좌은행코드
					payResult.setVirtualBankAcBankName(virtualBankAcBankName);      // 가상계좌은행명
					payResult.setVirtualDepositBankAcNo(virtualDepositBankAcNo);    // 가상입금계좌번호(입금할 계좌번호)
					payResult.setVirtualBankAcAcHolder(virtualBankAcAcHolder);      // 가상계좌예금주
					payResult.setVirtualBankAcDeadlineDt(vbDate);                   // 가상계좌기한일시
					payResult.setVirtualBankAcDepositDt(vbDate);                    // 가상계좌입금일시
					payResult.setVirtualBankAcClosedSmsYn(null);                    // 가상계좌마감SMS여부

					/* 현금영수증 구분 */
					String virtualPCshrCode = request.getParameter("P_CSHR_CODE");
					if(virtualPCshrCode == "220000" || "220000".equals(virtualPCshrCode)){              // 처리상태 : "220000" 이외 오류
						String cashReceiptIssueIdentifier = request.getParameter("P_CSHR_TYPE");    // 용도구분
						String cashReceiptTradeNo = request.getParameter("P_CSHR_AUTH_NO");     // 발행번호(가상계좌의 경우,입금 완료 시, 생성되어 모바일 내 채번시에는 전달되지 않습니다.)
						payResult.setCashReceiptIssuePossibleYn("Y");                                   // 현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("Y");                                           // 현금영수증발급여부
						if(cashReceiptIssueIdentifier == "0" || "0".equals(cashReceiptIssueIdentifier)){
							payResult.setCashReceiptIssueIdentifier("0");                               // 현금영수증발급식별자   (0:소득공제용-개인)
						}
						else{
							payResult.setCashReceiptIssueIdentifier("1");                               // 현금영수증발급식별자(1:지출증빙용-사업자)
						}
						payResult.setCashReceiptTradeNo(cashReceiptTradeNo);                            // 현금영수증거래번호

					}
					else{ /* 처리상태 : 오류 */
						payResult.setCashReceiptIssueIdentifier(null);  // 현금영수증발급식별자(0:소득공제용/1:지출증빙용)
						payResult.setCashReceiptTradeNo(null);          // 현금영수증거래번호
						payResult.setCashReceiptIssuePossibleYn("N");   // 현금영수증발급가능여부
						payResult.setCashReceiptIssueYn("N");           // 현금영수증발급여부
					}
					payResult.setCashReceiptPurposeCode(null);          // 현금영수증용도코드
					payResult.setCashReceiptApprovalNo(null);           // 현금영수증승인번호
					payResult.setCashReceiptUrl(null);                  // 현금영수증URL
					payResult.setPartialCancelAvailYn("Y");             // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_PAYCO:// 페이코
					payResult.setPartialCancelAvailYn("Y"); //TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_KAKAOPAY:// 카카오페이
					payResult.setPartialCancelAvailYn("Y"); //TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;
			}

			/* 공통 파라미터(세션정보) */
			payResult.setDepositYn(CODE_N);                                 // 예치금여부
			payResult.setPayMethodSn(memberSession.getPayMethodSn());       // 결제수단일련번호
			payResult.setPayServiceCode(memberSession.getPayServiceCode()); // 결제서비스코드
			payResult.setPayMethodCode(memberSession.getPayMethodCode());   // 결제수단코드
			payResult.setCreditcardCoSn(memberSession.getCreditcardCoSn()); // 신용카드업체일련번호
			payResult.setNextPayUseYn(memberSession.getNextPayUseYn());     // 다음결제사용여부
			payResult.setPayApprovalNo(null);                               // 결제승인번호
			payResult.setOptAssignData(null);                               // 임의지정데이터
		}
		catch (Exception e) {
			e.printStackTrace();
		}
        return payResult;
    }    

    /* 주문완료했을 때 장바구니상품삭제 */
    protected void removeOrdCartInfo(Long ordSn) {
        MemberSession memberSession = getMemberSession();        
        
        OrdCartInfo ordCartInfo = memberSession.getOrdCartInfo(ordSn);
        if(ordCartInfo != null) {
            String cartProdSnListStr = "";
            if(ordCartInfo.getCartProdSnList() != null
                    && ordCartInfo.getCartProdSnList().size() > 0) {
                for(Long cartProdSn : ordCartInfo.getCartProdSnList()) {
                    cartProdSnListStr = cartProdSnListStr + (cartProdSnListStr.length() > 0 ? "," : "") + cartProdSn;
                }
            }
            cartApi.removeCartProds(ordCartInfo.getCartSn(), cartProdSnListStr);
            memberSession.removeOrdCartInfo(ordSn);
        }
        
        setMemberSession(memberSession);
   }
	

}