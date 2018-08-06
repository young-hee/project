package kr.ap.emt.order.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.member.vo.OrdCartInfo;
import kr.ap.comm.support.constants.PathConstants;
import kr.ap.emt.order.vo.OrdStoreDTO;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.order.order.NotifyAccountDeposit;
import net.g1project.ecp.api.model.order.order.OrdEx;
import net.g1project.ecp.api.model.order.order.OrdReceptComplete;
import net.g1project.ecp.api.model.order.order.PayResult;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/order")
public class OrderViewController extends OrderBaseController {

	@Value("${store.url.mo.base-url}")
	private String storeMoUrl;

	@Value("${store.url.pc.base-url}")
	private String storePcUrl;

	/** logger  */
	final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 주문서생성
	 */
	@PageTitle(title = "주문/결제|에뛰드")
	@PostMapping("/reception")
	public String receiveOrder(HttpServletRequest request, Model model) {

		/* 회원구분 */
		MemberSession memberSession = getMemberSession();

	    OrdEx ordEx = new OrdEx();
		
		/* 주문진입 경로(cart:장바구니, null:바로구매) */
		String orderFlag = request.getParameter("orderFlag");
		if("cart".equals(orderFlag)){
			String cartSn = request.getParameter("cartSn");
			String onlineProdSnArr = request.getParameter("onlineProdSnArr") == null ? "" : request.getParameter("onlineProdSnArr");
			String takeoutProdSnArr = request.getParameter("takeoutProdSnArr") == null ? "" : request.getParameter("takeoutProdSnArr");
			List<Long> cartProdSnList = getCartProdSnList(onlineProdSnArr, takeoutProdSnArr);

			try {
				ordEx = createOrder(Long.valueOf(cartSn), cartProdSnList);

				/* 주문한 장바구니 상품 목록 세션에 저장 */
				memberSession.addOrdCartInfo(ordEx.getOrdSn(), new OrdCartInfo(Long.valueOf(cartSn), cartProdSnList));

				/* 주문 상품목록 생성 */
				makeOrdProdSet(ordEx, model);
				model.addAttribute("result", true);
			} catch (ApiException e) {
				model.addAttribute("result", false);
				model.addAttribute("errorCode", e.getErrorCode());
				model.addAttribute("errorMessage", e.getMessage());
			}

		}else{

			try {
				ordEx = createOrder(memberSession.getCartSn(), null);/* 주문한 장바구니 상품 목록 세션에 저장 */
				memberSession.addOrdCartInfo(ordEx.getOrdSn(), new OrdCartInfo(memberSession.getCartSn(), null));

				/* 주문 상품목록 생성 */
				makeOrdProdSet(ordEx, model);
				model.addAttribute("result", true);
			} catch (ApiException e) {
				model.addAttribute("result", false);
				model.addAttribute("errorCode", e.getErrorCode());
				model.addAttribute("errorMessage", e.getMessage());
			}
		}

		// MOBILE
		if (isMobileDevice()) {
			model.addAttribute("storeMoUrl", storeMoUrl);	// 모바일편의점 택배
		}
		// PC
		if(isPcDevice()){
			model.addAttribute("storePcUrl", storePcUrl);	// PC편의점 택배
		}

		return "order/order";
	}

	/**
	 * 주문서접수완료(실시간 계좌이체 Get)
	 */
	@PageTitle(title = "결제완료|에뛰드")
    @GetMapping("/ordComplete")
    public String ordBankComplete(HttpServletRequest request, Model model) {
        //TODO aki : 리턴되는 결과값 없음, 세션에서 주문번호 꺼내서 완료 페이지로 이동

		MemberSession memberSession = getMemberSession();
		String memberUser = memberSession.getMember_sn() > 0L ? PARAM_KEY_MEMBER : PARAM_KEY_NONMEMBER;

		OrdReceptComplete body = new OrdReceptComplete();
		List<PayResult> payResultList = new ArrayList<PayResult>();

		/* PG PayResult 만들기 */
		PayResult pgPayResult = makePgPayResult(request, memberSession);
		if(pgPayResult != null) {
			payResultList.add(pgPayResult);
		}

		/* Deposit PayResult 만들기 */
		if(memberSession.getDepositPrice().compareTo(BigDecimal.ZERO) > 0) {
			PayResult depositPayResult = new PayResult();
			depositPayResult.setDepositYn(CODE_Y);
			depositPayResult.setPayAmt(memberSession.getDepositPrice());

			payResultList.add(depositPayResult);
		}

		body.setPayResultList(payResultList);

		/* 1.주문완료 데이터 */
		OrdEx ordEx = orderApi.ordReceptComplete(memberSession.getOrdSn(), body);
		if(ordEx != null) {
			/* 2.주문완료 상품목록 추출*/
			makeOrdProdSet(ordEx, model);

			/* 주문완료했을 때 장바구니상품삭제 */
			removeOrdCartInfo(ordEx.getOrdSn());
			return "order/order-complete";
		} else {
			getRedirectPath(PathConstants.ORDER_RECEPTION.concat("?").concat(PARAM_KEY_NONMEMBER));
		}
		return null;
    }

	/**
	 * 주문서접수완료(POST)
	 */
	@PostMapping("/ordComplete")
	public String ordComplete(HttpServletRequest request, Model model) {

		MemberSession memberSession = getMemberSession();

        OrdReceptComplete body = new OrdReceptComplete();
        List<PayResult> payResultList = new ArrayList<PayResult>();

        /* PG PayResult 만들기 */
        PayResult pgPayResult = makePgPayResult(request, memberSession);
        if(pgPayResult != null) {
            payResultList.add(pgPayResult);
        }
        
        /* Deposit PayResult 만들기 */
        if(memberSession.getDepositPrice().compareTo(BigDecimal.ZERO) > 0) {
            PayResult depositPayResult = new PayResult();
            depositPayResult.setDepositYn(CODE_Y);
            depositPayResult.setPayAmt(memberSession.getDepositPrice());
            
            payResultList.add(depositPayResult);
        }
        
        body.setPayResultList(payResultList);
        
        /* 1.주문완료 데이터 */
        OrdEx ordEx = orderApi.ordReceptComplete(memberSession.getOrdSn(), body);
        if(ordEx != null) {
            /* 2.주문완료 상품목록 추출*/
            makeOrdProdSet(ordEx, model);
            
            /* 주문완료했을 때 장바구니상품삭제 */
            removeOrdCartInfo(ordEx.getOrdSn());
            return "order/order-complete";
        } else {
            getRedirectPath(PathConstants.ORDER_RECEPTION.concat("?").concat(PARAM_KEY_NONMEMBER));
        }
		return null;
	}

	/**
	 * 이니시스 결제 - 입금결과 통보 (PC)
	 * 대상 : 무통장입금
	 */
	@PostMapping("/iniPayNotiPC")
	public void iniPayNotiPC(Model model, HttpServletRequest request) throws Exception {

		Map<String,String> resultMap = new Hashtable<String,String>();
		Enumeration elems = request.getParameterNames();
		String temp = "";

		while(elems.hasMoreElements()){
			temp = (String) elems.nextElement();
			resultMap.put(temp, request.getParameter(temp));
		}
		logger.info(">>> resultMap : " + resultMap.toString());

		/* 입금결과 통보 결과정보 */
		String typeMsg = request.getParameter("type_msg");     	 // 거래구분
		if("0200".equals(typeMsg)) { // 정상
			String noVacct = request.getParameter("no_vacct");    // 가상계좌번호
			String noTid = request.getParameter("no_tid");        // 거래번호
			String noOid = request.getParameter("no_oid");        // 주문번호

			// 가상계좌
			if (StringUtils.isNotBlank(noVacct)) {
				if (StringUtils.isNotBlank(noTid) && StringUtils.isNotBlank(noOid)) {
					//가상계좌입금일시
					SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
					String dtTrans = request.getParameter("dt_trans"); // 금융기관 발생 거래 일자
					String tmTrans = request.getParameter("tm_trans"); // 금융기관 발생 거래 시각
					Date date = formatOutput.parse(dtTrans + tmTrans + "+0900");

					NotifyAccountDeposit nad = new NotifyAccountDeposit();
					nad.setVirtualBankAcDepositDt(date);
					orderApi.notifyAccountDeposit(noOid, noTid, nad);
				}
			}
		}
	}

	/**
	 * 이니시스 결제 - 입금결과 통보 (모바일)
	 * 대상 : 무통장입금, 실시간 계좌이체
	 * 입금결과 통보 url Async
	 */
	@PostMapping("/iniPayNoti")
	public void iniPayNoti(Model model, HttpServletRequest request) throws Exception {

		Map<String,String> resultMap = new Hashtable<String,String>();
		Enumeration elems = request.getParameterNames();
		String temp = "";

		while(elems.hasMoreElements()){
			temp = (String) elems.nextElement();
			resultMap.put(temp, request.getParameter(temp));
		}
		logger.info(">>> resultMap : " + resultMap.toString());

		/* 입금결과 통보 결과정보 */
		String pgTradeNo = request.getParameter("P_STATUS");     // 거래상태
		if("02".equals(pgTradeNo)) {									// 가상계좌 입금 통보 시
			String pType = request.getParameter("P_TYPE");       // 지불수단
			String pTid = request.getParameter("P_TID");         // 거래번호
			String ordNo = request.getParameter("P_NOTI");       // 주문번호

			// 가상계좌
			if ("VBANK".equals(pType)) {
				//가상계좌입금일시
				SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
				String pAuthDt = request.getParameter("P_AUTH_DT"); // 승인일자
				Date date = formatOutput.parse(pAuthDt + "+0900");

				NotifyAccountDeposit nad = new NotifyAccountDeposit();
				nad.setVirtualBankAcDepositDt(date);
				orderApi.notifyAccountDeposit(ordNo, pTid, nad);
			}
			// 실시간 계좌이체
			if ("BANK".equals(pType)) {
				orderApi.notifyAccountDeposit(ordNo, pTid, null);
			}
		}
	}

	/**
	 * 편의점 택배
	 */
	@RequestMapping("/orderStore")
	public String orderStore(HttpServletRequest request, Model model) throws IOException {

		OrdStoreDTO ordStore = new OrdStoreDTO();
		String type  = request.getParameter("type");

		String storeHeadCd = request.getParameter("ho_code");			// 편의점본부코드
		String storeShopCd = request.getParameter("store_code");		// 편의점점포코드
		String storeNm = request.getParameter("codePany");			// 편의점회사
		if("GS".equals(storeNm)) {
			storeNm = "GS25";
		}
		String storeShopNm   = request.getParameter("codeName");		// 편의점이름
		String storeTelno    = request.getParameter("codeTel");		// 편의점연락처
		String storeZip      = request.getParameter("post_no");		// 편의점우편번호
		String storeAddr1    = request.getParameter("store_address1");//편의점주소
		String storeAddr2    = request.getParameter("store_address2");//편의점주소
		String storeCodeF    = request.getParameter("code_f");		// 도착점코드
		String storeDdZone   = request.getParameter("dd_zone");		// 도착점바코드
		String storeDdBag    = request.getParameter("dd_bag");		// 동명코드
		String storeEupmyeon = request.getParameter("eupmyeon");		// 도착동명

		/* 데이터 세팅*/
		ordStore.setType(type);
		ordStore.setStoreHeadCd(storeHeadCd);
		ordStore.setStoreShopCd(storeShopCd);
		ordStore.setStoreNm(storeNm);
		ordStore.setStoreShopNm(getEuckrStr(storeShopNm));
		ordStore.setStoreTelno(storeTelno);
		ordStore.setStoreZip(storeZip);
		ordStore.setStoreAddr1(getEuckrStr(storeAddr1));
		ordStore.setStoreAddr2(getEuckrStr(storeAddr2));
		ordStore.setStoreCodeF(storeCodeF);
		ordStore.setStoreDdZone(storeDdZone);
		ordStore.setStoreDdBag(storeDdBag);
		ordStore.setStoreEupmyeon(getEuckrStr(storeEupmyeon));

		// MOBILE
		if (isMobileDevice()) {
			model.addAttribute("storeMoUrl", storeMoUrl);	// 모바일편의점 택배
			model.addAttribute("ordStore", ordStore);
		}
		// PC
		if(isPcDevice()){
			model.addAttribute("storePcUrl", storePcUrl);	// PC편의점 택배
			model.addAttribute("ordStore", ordStore);
		}

		return "order/order-store";
	}

	private String getEuckrStr(String str) {
		try {
			String euckr = new String(str.getBytes("iso-8859-1"), "euc-kr");
			return euckr;
		} catch (UnsupportedEncodingException e) {
			logger.error(e.getMessage(), e);
			return str;
		}
	}

}