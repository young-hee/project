package kr.ap.emt.order.controller;

import kr.ap.comm.cart.CartSession;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.cart.OrdCartInfo;
import kr.ap.comm.order.OrderSession;
import kr.ap.emt.order.vo.OrdStoreDTO;
import kr.ap.emt.payment.config.InicisPgProperties;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.order.order.*;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
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
	
	@Autowired
    private InicisPgProperties inicisPgProperties;	//이니시스 property

	/** logger  */
	final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 주문서생성
	 *
	 * @param request
	 * @param model
	 * @param redirectAttributes
	 * @return
	 */
	//@PageTitle(title = "주문/결제|에뛰드")
	@PostMapping("/reception")
	public String receiveOrder(HttpServletRequest request, Model model, RedirectAttributes redirectAttributes) {

		OrderSession orderSession = getOrderSession();

		/* 주문 변경 정보 저장*/
		orderSession.setOrdReceptChange(new OrdReceptChange());

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
				orderSession.addOrdCartInfo(ordEx.getOrdSn(), new OrdCartInfo(Long.valueOf(cartSn), cartProdSnList));

				/* 주문 상품목록 생성 */
				makeOrdProdSet(ordEx, model, "Reception");

				model.addAttribute("result", true);
				model.addAttribute("pageTitle", "주문/결제|에뛰드");
			} catch (ApiException e) {
				return redirectOrdErr(request, redirectAttributes, e);
			}

		}else{

			//바로구매
			try {
				CartSession cartSession = getCartSession();
				ordEx = createOrder(cartSession.getCartSn(), null);/* 주문한 장바구니 상품 목록 세션에 저장 */
				orderSession.addOrdCartInfo(ordEx.getOrdSn(), new OrdCartInfo(cartSession.getCartSn(), null));

				/* 주문 상품목록 생성 */
				makeOrdProdSet(ordEx, model, "Reception");

				model.addAttribute("result", true);
				model.addAttribute("pageTitle", "주문/결제|에뛰드");
			} catch (ApiException e) {
				return redirectOrdErr(request, redirectAttributes, e);
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

	private String redirectOrdErr(HttpServletRequest request, RedirectAttributes redirectAttributes, ApiException e) {
		Map<String, Object> map = new HashMap<String,Object>();
		map.put("result", false);
		map.put("errorCode", e.getErrorCode());
		map.put("errorMessage", e.getMessage());
		map.put("errorAdditional", e.getAdditional());
		redirectAttributes.addFlashAttribute("ordErr", map);
		request.removeAttribute("pageTitle");
		request.removeAttribute("menuId");
		request.removeAttribute("subMenuId");
		return "redirect:"+request.getHeader("referer");
	}

	/**
	 * 주문서접수완료(모바일 실시간 계좌이체)
	 *
	 * @param request
	 * @param model
	 * @return
	 */
	@PageTitle(title = "결제완료|에뛰드")
    @PostMapping("/ordBankComplete")
    public String ordBankComplete(HttpServletRequest request, Model model) {
        //TODO aki : 리턴되는 결과값 없음, 세션에서 주문번호 꺼내서 완료 페이지로 이동
		OrderSession orderSession = getOrderSession();

		OrdReceptComplete body = new OrdReceptComplete();
		List<PayResult> payResultList = new ArrayList<PayResult>();

		/* PG PayResult 만들기 */
		PayResult pgPayResult = makePgPayBankResult(request, orderSession);
		if(pgPayResult != null) {
			payResultList.add(pgPayResult);
		}

		/* Deposit PayResult 만들기 */
		if(orderSession.getDepositPrice().compareTo(BigDecimal.ZERO) > 0) {
			PayResult depositPayResult = new PayResult();
			depositPayResult.setDepositYn(CODE_Y);
			depositPayResult.setPayAmt(orderSession.getDepositPrice());

			payResultList.add(depositPayResult);
		}

		body.setPayResultList(payResultList);

		/* 1.주문완료 데이터 */
		OrdEx ordEx = null;
		try {
			ordEx = orderApi.ordReceptComplete(orderSession.getOrdSn(), body);
		} catch (ApiException e) {
			Map<String, Object> map = new HashMap<String,Object>();
			map.put("errorCode", e.getErrorCode());
			map.put("errorMessage", e.getMessage());
			map.put("errorAdditional", e.getAdditional());
			model.addAttribute("ordCompleteError", map);
		}
		if(ordEx != null) {
			/* 2.주문완료 상품목록 추출*/
			makeOrdProdSet(ordEx, model, "Complete");

			/* 주문완료했을 때 장바구니상품삭제 */
			//removeOrdCartInfo(ordEx.getOrdSn());
			return "order/order-complete";
		} else {
			//주문오류 발생시.
			//return redirectOrderReception(request, model, redirectAttributes);
			return "redirect:/order/reception";
		}
    }

	/**
	 * 주문서접수완료(POST)
	 */
	@PageTitle(title = "결제완료|에뛰드")
	@PostMapping("/ordComplete")
	public String ordComplete(HttpServletRequest request, Model model, RedirectAttributes redirectAttributes) {

		OrderSession orderSession = getOrderSession();

        OrdReceptComplete body = new OrdReceptComplete();
        List<PayResult> payResultList = new ArrayList<PayResult>();

        /* PG PayResult 만들기 */
        PayResult pgPayResult = makePgPayResult(request, orderSession);
        if(pgPayResult != null) {
            payResultList.add(pgPayResult);
        }

        /* Deposit PayResult 만들기 */
        if(orderSession.getDepositPrice().compareTo(BigDecimal.ZERO) > 0) {
            PayResult depositPayResult = new PayResult();
            depositPayResult.setDepositYn(CODE_Y);
            depositPayResult.setPayAmt(orderSession.getDepositPrice());

            payResultList.add(depositPayResult);
        }

        body.setPayResultList(payResultList);

        /* 1.주문완료 데이터 */
		OrdEx ordEx = null;
		try {
			ordEx = orderApi.ordReceptComplete(orderSession.getOrdSn(), body);
		} catch (ApiException e) {
			Map<String, Object> map = new HashMap<String,Object>();
			map.put("errorCode", e.getErrorCode());
			map.put("errorMessage", e.getMessage());
			map.put("errorAdditional", e.getAdditional());
			model.addAttribute("ordCompleteError", map);
		}
        if(ordEx != null) {
            /* 2.주문완료 상품목록 추출*/
            makeOrdProdSet(ordEx, model, "Complete");

            /* 주문완료했을 때 장바구니상품삭제 */
            //removeOrdCartInfo(ordEx.getOrdSn());
            return "order/order-complete";
        } else {
			//주문오류 발생시.
			//return redirectOrderReception(request, model, redirectAttributes);
			return "redirect:/order/reception";
        }
	}

	/**
	 * 주문서 조회
	 *
	 * @param request
	 * @param model
	 * @param redirectAttributes
	 * @return
	 */
	@GetMapping("/reception")
	public String redirectOrderReception(HttpServletRequest request, Model model, RedirectAttributes redirectAttributes) {

		try {
			OrdEx ordEx = orderApi.getOrd(getOrderSession().getOrdSn());

			/* 주문 상품목록 생성 */
			makeOrdProdSet(ordEx, model, "Reception");

			model.addAttribute("result", true);
			model.addAttribute("pageTitle", "주문/결제|에뛰드");
		} catch (ApiException e) {
			return redirectOrdErr(request, redirectAttributes, e);
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
	 * 이니시스 결제 - 입금결과 통보 (PC)
	 * 대상 : 무통장입금
	 */
	@PostMapping("/iniPayNotiPC")
	public String iniPayNotiPC(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		/* 입금결과 통보 결과정보 */
		BooleanResult result = new BooleanResult();
		result.setResult(false);
		PrintWriter out = response.getWriter();
		
		//PC 입금결과 통보 로그 남기기
		String file_path = inicisPgProperties.getIniPayhome() + "/log";
		writePcNotiLog(file_path, request);
		
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
					nad.setPayMethodCode(PAY_METHOD_CODE_VIRTUAL_ACCOUNT);  // virtual-account
					//nad.setPgTradeNo(noTid);								// 거래번호
					nad.setVirtualDepositBankAcNo(noVacct); 				// 가상계좌번호
					nad.setVirtualBankAcDepositDt(date);
					result = orderApi.notifyAccountDeposit(noOid, nad);
				}
			}
		}
		
		if(result != null && result.isResult()) {			
			return "payment/vacctSuccess";		
		} else {
			return "payment/vacctFail";
		}
	}

	/**
	 * 이니시스 결제 - 입금결과 통보 (모바일)
	 * 대상 : 무통장입금, 실시간 계좌이체
	 * 입금결과 통보 url Async
	 */
	@PostMapping("/iniPayNoti")
	public String iniPayNoti(Model model, HttpServletRequest request, HttpServletResponse response) throws Exception {

		BooleanResult result = new BooleanResult();
		result.setResult(false);
		
		PrintWriter out = response.getWriter();
		
		/* 입금결과 통보 결과정보 */
		// 이니시스 NOTI 서버에서 받은 Value
		//  P_TID	거래번호
		//  P_MID	상점아이디
		//  P_AUTH_DT	승인일자
		//  P_STATUS	거래상태 (00:성공, 01:실패), *가상계좌 입금통보시 02
		//  P_TYPE	지불수단
		//  P_OID	상점주문번호
		//  P_FN_CD1	금융사코드1
		//  P_FN_CD2	금융사코드2
		//  P_FN_NM	금융사명 (은행명, 카드사명, 이통사명)
		//  P_AMT	거래금액
		//  P_UNAME	결제고객성명
		//  P_RMESG1	결과코드
		//  P_RMESG2	결과메시지
		//  P_NOTI	노티메시지(상점에서 올린 메시지)
		//  P_AUTH_NO	승인번호
		try {
			String pgTradeNo = request.getParameter("P_STATUS");     // 거래상태
			String pType = request.getParameter("P_TYPE");       // 지불수단
			String pTid = request.getParameter("P_TID");         // 거래번호
			String ordNo = request.getParameter("P_OID");       // 상점 주문번호

			//가상계좌입금일시
			SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
			String pAuthDt = request.getParameter("P_AUTH_DT"); // 승인일자
			Date date = formatOutput.parse(pAuthDt + "+0900");
			
			//로그파일에 로그 남기기
			String file_path = inicisPgProperties.getIniPayhome() + "/log";
			writeMobileNotiLog(file_path, request);

			if("02".equals(pgTradeNo)) {	// 가상계좌 입금 통보 시
	
				// 가상계좌
				if ("VBANK".equals(pType)) {
					NotifyAccountDeposit nad = new NotifyAccountDeposit();
					nad.setPayMethodCode(PAY_METHOD_CODE_VIRTUAL_ACCOUNT);  // virtual-account
					//nad.setPgTradeNo(pTid);
					nad.setVirtualBankAcDepositDt(date);
					result = orderApi.notifyAccountDeposit(ordNo, nad);
				}
				
			} else {
				
				if("00".equals(pgTradeNo)) { //성공
					// 실시간 계좌이체
					if ("BANK".equals(pType)) {
						NotifyAccountDeposit nad = new NotifyAccountDeposit();
						nad.setPayMethodCode(PAY_METHOD_CODE_BANK_AC_TRANSFER);  // bank-ac-transfer
						nad.setNewPgTradeNo(pTid);
						//nad.setVirtualBankAcDepositDt(date);
						nad.setNewApprovalDt(date);
						result = orderApi.notifyAccountDeposit(ordNo, nad);
					}
				}
			}

			if(result != null && result.isResult()) {			
				return "payment/vacctSuccess";			
			} else {
				return "payment/vacctFail";
			}
			
		}catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "payment/vacctFail";
			
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

    private void writeMobileNotiLog(String file_path, HttpServletRequest request) throws Exception {

        File file = new File(file_path);
        file.createNewFile();

        FileWriter file2 = new FileWriter(file_path+"/noti_input_"+getDate()+".log", true);


        file2.write("\n************************************************\n");
        file2.write("PageCall time : " 	+ getTime());
        file2.write("\n P_TID : " 	+ request.getParameter("P_TID"));
		file2.write("\n P_MID : " 	+ request.getParameter("P_MID"));
		file2.write("\n P_AUTH_DT : " 	+ request.getParameter("P_AUTH_DT"));
		file2.write("\n P_STATUS : " 	+ request.getParameter("P_STATUS"));
		file2.write("\n P_TYPE : " 	+ request.getParameter("P_TYPE"));
		file2.write("\n P_OID : " 	+ request.getParameter("P_OID"));
		file2.write("\n P_FN_CD1 : " 	+ request.getParameter("P_FN_CD1"));
		file2.write("\n P_FN_CD2 : " 	+ request.getParameter("P_FN_CD2"));
		file2.write("\n P_FN_NM : " 	+ request.getParameter("P_FN_NM"));
		file2.write("\n P_AMT : " 	+ request.getParameter("P_AMT"));
		file2.write("\n P_UNAME : " 	+ request.getParameter("P_UNAME"));
		file2.write("\n P_RMESG1 : " 	+ request.getParameter("P_RMESG1"));
		file2.write("\n P_RMESG2 : " 	+ request.getParameter("P_RMESG2"));
		file2.write("\n P_NOTI : " 	+ request.getParameter("P_NOTI"));	
		file2.write("\n P_AUTH_NO : " +	 request.getParameter("P_AUTH_NO"));	        
        file2.write("\n************************************************\n");

        file2.close();

    }
    
    private void writePcNotiLog(String file_path,HttpServletRequest request) throws Exception {

        File file = new File(file_path);
        file.createNewFile();

        FileWriter file2 = new FileWriter(file_path+"/vacctinput_"+getDate()+".log", true);


        file2.write("\n************************************************\n");
        file2.write("PageCall time : " + getTime());
        file2.write("\nID_MERCHANT : " + request.getParameter("id_merchant"));
        file2.write("\nNO_TID : " + request.getParameter("no_tid"));
        file2.write("\nNO_OID : " + request.getParameter("no_oid"));
        file2.write("\nNO_VACCT : " + request.getParameter("no_vacct"));
        file2.write("\nAMT_INPUT : " + request.getParameter("amt_input"));
        file2.write("\nNM_INPUTBANK : " + request.getParameter("nm_inputbank"));
        file2.write("\nNM_INPUT : " + request.getParameter("nm_input"));
        file2.write("\n************************************************\n");

        file2.close();

    }
    
    private String getDate() {
    	Calendar calendar = Calendar.getInstance();
    	
    	StringBuffer times = new StringBuffer();
        times.append(Integer.toString(calendar.get(Calendar.YEAR)));
		if((calendar.get(Calendar.MONTH)+1)<10)
        { 
            times.append("0"); 
        }
		times.append(Integer.toString(calendar.get(Calendar.MONTH)+1));
		if((calendar.get(Calendar.DATE))<10) 
        {
            times.append("0");	
        } 
		times.append(Integer.toString(calendar.get(Calendar.DATE)));
    	
    	return times.toString();
    }
    
    private String getTime() {
    	Calendar calendar = Calendar.getInstance();
    	
    	StringBuffer times = new StringBuffer();

    	times.append("[");
    	if((calendar.get(Calendar.HOUR_OF_DAY))<10) 
        { 
            times.append("0"); 
        } 
 		times.append(Integer.toString(calendar.get(Calendar.HOUR_OF_DAY)));
 		times.append(":");
 		if((calendar.get(Calendar.MINUTE))<10) 
        { 
            times.append("0"); 
        }
 		times.append(Integer.toString(calendar.get(Calendar.MINUTE)));
 		times.append(":");
 		if((calendar.get(Calendar.SECOND))<10) 
        { 
            times.append("0"); 
        }
 		times.append(Integer.toString(calendar.get(Calendar.SECOND)));
 		times.append("]");
 		
 		return times.toString();
    }

}