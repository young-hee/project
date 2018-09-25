package kr.ap.amt.payment.controller;

import kr.ap.amt.payment.config.InicisPgProperties;
import kr.ap.amt.payment.config.KrpPgProperties;
import kr.ap.amt.payment.config.NaverPgProperties;
import kr.ap.amt.payment.eximbay.EximbayPayment;
import kr.ap.amt.payment.ini.IniPayment;
import kr.ap.amt.payment.naver.NaverPayment;
import kr.ap.amt.payment.vo.EximbayPayDTO;
import kr.ap.amt.payment.vo.PayDTO;
import kr.ap.amt.payment.vo.PayProd;
import kr.ap.amt.payment.vo.ProductItem;
import kr.ap.amt.payment.wpay.iniWPayment;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.ap.ap.ApMemberWPayInfo;
import net.g1project.ecp.api.model.ap.ap.ApMemberWPaySaveInfo;
import net.g1project.ecp.api.model.basis.mall.MallSalesPolicy;
import org.apache.commons.collections.CollectionUtils;
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

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.*;

/**
 * @author aki@g1project.net
 * @since {version}
 *
 */
@Controller
@RequestMapping("/payment")
public class PaymentViewController extends AbstractController {

    private Logger logger = LoggerFactory.getLogger(PaymentViewController.class);
    
    @Autowired
    private InicisPgProperties inicisPgProperties;
    
    @Autowired
    private NaverPgProperties naverPgProperties;

	@Autowired
	private KrpPgProperties krpPgProperties;

    @Value("${platform.frontend.mall-id}")
    private String mallId;
    
    /**INIPAY**/ 
    //paymethod
    private static final String WCARD = "wcard";	//신용카드
    private static final String BANK = "bank";	//계좌이체
    private static final String VBANK = "vbank";	//가상계좌
    private static final String MOBILE = "mobile"; //휴대폰 결제
    private static final String KAKAO = "onlykakaopay"; //카카오 결제
    private static final String PAYCO = "onlypayco"; //페이코 결제

	/**EximbayPay**/
	private static final String PAYPAL = "paypal";	//페이팔 결제
	private static final String GLOBAL_WCARD = "globalCreditCard"; //해외 신용카드


     //결제요청 리턴
     @PostMapping("/iniPayReturnPC")
     public String iniPayReturnPC(Model model, HttpServletRequest request) throws Exception {
         HashMap<String, String> paramMap = IniPayment.commonPaymentBase(request);
         model.addAttribute("resultMap", paramMap);        
         return "payment/iniPayCompletePC";    
     }

     @GetMapping("/close")
     public String close(Model model, HttpServletRequest req) {
         return "payment/close";
     }
     
     @GetMapping("/popup")
     public String popup(Model model, HttpServletRequest req) {
         return "payment/popupClose";
     }
     
     
    
    //#############################
    // inicis 모바일 결제
    //#############################
    
    @PostMapping("/iniPay")//이니시스 결제페이지 호출
    public String iniPay(Model model, PayDTO payDTO) throws Exception {
        
    	
    	if(!StringUtils.isEmpty(payDTO.getGoPayMethod()) && 
    			(KAKAO.equals(payDTO.getGoPayMethod()) || PAYCO.equals(payDTO.getGoPayMethod()))) {    		
    		payDTO.setpMid(inicisPgProperties.getIniDrctMid());
    		payDTO.setSignKey(inicisPgProperties.getIniDrctSignKey());
    	} else {
    		payDTO.setpMid(inicisPgProperties.getIniMid());
    		payDTO.setSignKey(inicisPgProperties.getIniDrctSignKey());
    	}
    	
    	payDTO.setSiteDomain(inicisPgProperties.getMoIniSiteDomain());
    	
    	//가상계좌
    	if(VBANK.equals(payDTO.getPayMethod())) {
    		MallSalesPolicy mallSalePolicy = mallApi.getMallPolicies();
    		payDTO.setDepositWatingHours(mallSalePolicy.getDepositWatingHours());
    		
    	}
    	
    	//모바일 인증요청 param 셋팅
    	HashMap<String, Object> paramMap = IniPayment.makeRequestParamMobile(payDTO);
    	
    	model.addAttribute("payParam", paramMap);
    	 
        return "payment/iniPayment";
    }
    
    @PostMapping("/iniPayReturn")//인증결과 리턴 - 실시간 계좌이체 외.
    public String iniPayReturn(Model model, HttpServletRequest request) throws Exception {
        
    	HashMap<String, String> resultMap = IniPayment.commonPaymentBaseMobile(inicisPgProperties.getIniMid(), request);
    	model.addAttribute("resultMap", resultMap);
    	
    	return "payment/iniComplete";
     
    }
    
    @PostMapping("/iniBankComplete")//주문완료페이지 - 실시간 계좌이체 
    public String iniBankCompletePost(Model model, HttpServletRequest request) throws Exception {
    	
    	HashMap<String, String> resultMap = new HashMap<String, String>();
        resultMap.put("resultCode", "00");
        resultMap.put("P_STATUS", "00");
        
        model.addAttribute("resultMap", resultMap);
    	
    	return "payment/iniBankCompletePost";
     
    }
    
    @GetMapping("/iniBankComplete")//주문완료페이지 - 실시간 계좌이체 
    public String iniBankComplete(Model model, HttpServletRequest request) throws Exception {
    	
    	HashMap<String, String> resultMap = new HashMap<String, String>();
        resultMap.put("resultCode", "00");
        resultMap.put("P_STATUS", "00");
        
        model.addAttribute("resultMap", resultMap);
    	
    	return "payment/iniBankComplete";
     
    }
    
    @PostMapping("/iniPayDrctReturn")//인증결과 리턴 - 카카오페이, 페이코결제
    public String iniPayDrctReturn(Model model, HttpServletRequest request) throws Exception {
        
    	HashMap<String, String> resultMap = IniPayment.commonPaymentBaseMobile(inicisPgProperties.getIniDrctMid(), request);
    	model.addAttribute("resultMap", resultMap);
    	
    	return "payment/iniComplete";
     
    }
    
    @PostMapping("/iniCancel")	//결제취소
    public Map<String, String> iniCancelRequest(Model model, PayDTO payDTO) throws Exception {
    	
    	HashMap<String, String> paramMap = new HashMap<String, String>();
    	//기본 param 셋팅
    	paramMap.put("mid", inicisPgProperties.getIniMid());
    	paramMap.put("admin", inicisPgProperties.getIniKeyPw());
    	paramMap.put("inipayhome", inicisPgProperties.getIniPayhome());    	
    	paramMap.put("cancelreason" , "2");	// [선택] 1.거래취소 2.오류 3:기타사항
    	
    	//넘겨받아야 할 param 셋팅
    	paramMap.put("P_TID", payDTO.getTid());
    	paramMap.put("cancelmsg", payDTO.getCancelMsg());
    	
    	Map<String,String> resultMap = new HashMap<String,String>();
    	resultMap = IniPayment.iniCancel(paramMap);
    	
    	return resultMap;
    	
    }
    
    //#############################
    // NaverPay 결제
    //#############################
    
    @PostMapping("/naverPay")//네이버 결제페이지 호출
    public String naverPay(Model model, PayDTO payDTO) throws Exception {
    	
    	//모바일 인증요청 param 셋팅
    	HashMap<String, Object> paramMap = new HashMap<String, Object>();
    	
    	 paramMap.put("clientId",naverPgProperties.getNaverCid());
    	 paramMap.put("mode", naverPgProperties.getMode());
    	
    	 paramMap.put("merchantPayKey", payDTO.getOid());
    	 paramMap.put("totalPayAmount", payDTO.getPrice().replace(",", ""));	//**컴마 제외 
    	 paramMap.put("taxScopeAmount", payDTO.getPrice().replace(",", ""));	//확인필요
    	 paramMap.put("taxExScopeAmount", 0);	//확인필요
    	 if(isPcDevice()) {
    		 paramMap.put("returnUrl", inicisPgProperties.getIniSiteDomain() + "/payment/naverPayReturn"); 
     		
     	} else {
     		paramMap.put("returnUrl", inicisPgProperties.getMoIniSiteDomain() + "/payment/naverPayReturn"); 
     		
     	}
    	 
    	 
    	     	 
    	 List<PayProd> prods = payDTO.getProds();
    	 List<ProductItem> productItems = new ArrayList<ProductItem>();
    	
    	 if(!CollectionUtils.isEmpty(prods)) {
    		 int i = 0;
    		 int qtyCnt = 0;
    		 for(PayProd prod : prods) {
    			 ProductItem prodItem = new ProductItem();
    			 
    			 prodItem.setUid(prod.getProdSn());		//uid 상품일련번호
        		 prodItem.setName(prod.getProdName());	//상품명
        		 prodItem.setCount(prod.getProdQty());	//상품수
        		 
        		 qtyCnt = qtyCnt + prod.getProdQty();
        		 productItems.add(prodItem);
        		 
        		 if(i == 0) {
        			 paramMap.put("productName", prod.getProdName());	//대표 상품명
        		 }
    			 
    		 }
    		 paramMap.put("productCount", qtyCnt);	//총 상품 수
    	 }
    	 
    	 paramMap.put("productItems", productItems);
    	
    	 model.addAttribute("payParam", paramMap);
        
    	return "payment/naverPay/naverPayment";
    }
    
    @GetMapping("/naverPayReturn")// 네이버 인증 요청 결과 수신
    public String naverPayReturn(Model model, HttpServletRequest request) throws Exception {
    	
    	Map<String,String> resultMap = new Hashtable<String,String>();
        Enumeration elems = request.getParameterNames();
        String temp = "";

        while(elems.hasMoreElements()){
            temp = (String) elems.nextElement();
            resultMap.put(temp, request.getParameter(temp));
        }
        
        if(!resultMap.isEmpty()) {
        	
        	resultMap.put("naverCid", naverPgProperties.getNaverCid());
        	resultMap.put("naverSecret", naverPgProperties.getNaverSecret());
        	resultMap.put("naverPartnerId", naverPgProperties.getNaverPartnerId());
        	resultMap.put("apiDomain", naverPgProperties.getApiDomain());
        	resultMap.put("confirmUrl", naverPgProperties.getConfirmUrl());	//승인 처리 url
        	resultMap.put("cancelUrl", naverPgProperties.getCancelUrl());	//취소 처리 url
        
        	
        	//인증결과확인
            if(resultMap.get("resultCode").equals("Success")) {	//성공
            	
            	//승인요청
            	resultMap = NaverPayment.naverPayment(resultMap);
            	resultMap.put("resultCode", resultMap.get("code"));
            	
            } 
        }
        
        System.out.println(">>> resultMap : " + resultMap.toString());
        model.addAttribute("resultMap", resultMap);
        
        return "payment/naverPay/naverComplete";    //네이버 인증 및 승인 결과 페이지
    }
    
  
    
    
    
   /* @GetMapping("/naverPayCancel")// 네이버 결제취소
    public Map<String, String> naverPayCancel(Model model, PayCancelDTO payCancel) throws Exception {
    	
    	Map<String, String> resultMap = new HashMap<String, String>();
	    	
    	Map<String, String> reqeustMap = new HashMap<String, String>();
    		
    	//test 
    	//payCancel.setPaymentId("20180619NP1000381015");
    	//payCancel.setCancelReason("테스트");
    		
    		reqeustMap.put("paymentId", payCancel.getPaymentId());
    		reqeustMap.put("cancelAmount", payCancel.getCancelAmount().replace(",", ""));
    		reqeustMap.put("cancelReason", payCancel.getCancelReason());
    		
    		if(payCancel.getCancelRequester() == "" || payCancel.getCancelRequester() == null) {
    			reqeustMap.put("cancelRequester", "2");	//취소요청자 1: 구매자 2: 상점관리자
    		} else {
    			reqeustMap.put("cancelRequester", payCancel.getCancelRequester());
    		}
    		
    		reqeustMap.put("naverCid", naverPgProperties.getNaverCid());
	    	reqeustMap.put("naverSecret", naverPgProperties.getNaverSecret());
	    	reqeustMap.put("naverPartnerId", naverPgProperties.getNaverPartnerId());
	    	reqeustMap.put("apiDomain", naverPgProperties.getApiDomain());
	    	reqeustMap.put("confirmUrl", naverPgProperties.getCancelUrl());	//취소 처리 url
	    	
	    	System.out.println(reqeustMap.toString());
         
    	resultMap = NaverPayment.naverPayment(reqeustMap);
        
        return resultMap; 
    }*/

	//#############################
	// KRP 결제
	//#############################

	@PostMapping("/eximbayPay")//eximbay 결제창 호출
	public String eximbayPay(Model model, EximbayPayDTO payDTO) throws Exception {


		payDTO.setpMid(krpPgProperties.getKrpMid());
		payDTO.setKrpSecretKey(krpPgProperties.getKrpSecretKey());
		payDTO.setKrpRequestUrl(krpPgProperties.getKrpRequestUrl());

		if(isPcDevice()) {
			payDTO.setSiteDomain(inicisPgProperties.getIniSiteDomain());
		} else {
			payDTO.setSiteDomain(inicisPgProperties.getMoIniSiteDomain());
		}

		//param 셋팅
		HashMap<String, String> paramMap = EximbayPayment.makeEximbayRegistParam(payDTO, isPcDevice());

		model.addAttribute("payParam", paramMap);
		model.addAttribute("requestUrl", payDTO.getKrpRequestUrl());

		return "payment/eximbayPay/eximbayPayment";
	}

	@PostMapping("/eximbayPayReturn")	//eximbay returnUrl 화면 처리용
	public String eximbayPayReturn(Model model, HttpServletRequest request) throws Exception {

		Map<String,String> resultMap = new Hashtable<String,String>();
		Enumeration elems = request.getParameterNames();
		String temp = "";

		while(elems.hasMoreElements()){
			temp = (String) elems.nextElement();
			resultMap.put(temp, request.getParameter(temp));
		}

		model.addAttribute("resultMap", resultMap);

		System.out.println("eximbayResult=======");
		System.out.println(resultMap.toString());

		//취소 test
	       /* PayDTO payDTO = new PayDTO();
	        payDTO.setpMid(krpPgProperties.getKrpMid());
	    	payDTO.setKrpSecretKey(krpPgProperties.getKrpSecretKey());
	    	payDTO.setKrpRequestUrl(krpPgProperties.getKrpRequestUrl());

	    	payDTO.setOid(resultMap.get("ref"));
	    	payDTO.setPrice(resultMap.get("amt"));
	    	payDTO.setTid(resultMap.get("transid"));


	        EximbayPayment.eximbayCancelRequest(payDTO);*/

		return "payment/eximbayPay/eximbayPayReturn";
	}

	@PostMapping("/eximbayPayStatus")	//실제 데이터를 처리하는 영역
	public void eximbayPayStatus(Model model, HttpServletRequest request) throws Exception {

		Map<String,String> resultMap = new Hashtable<String,String>();
		Enumeration elems = request.getParameterNames();
		String temp = "";

		while(elems.hasMoreElements()){
			temp = (String) elems.nextElement();
			resultMap.put(temp, request.getParameter(temp));
		}

		model.addAttribute("resultMap", resultMap);

		System.out.println("test eximbayPayStatus result===================");
		System.out.println(resultMap.toString());


	}

    //#############################
    // 이니시스-원클릭 간편결제
    //#############################    
    @PostMapping("/wpayRegist")//이니시스-원클릭 간편결제 가입 페이지 호출
    public String wPayRegist(Model model, PayDTO payDTO) throws Exception {
    
    	if(payDTO.getMobile() == null) {
    		payDTO.setMobile("");
    	}
    	
    	if(payDTO.getBirth() == null) {
    		payDTO.setBirth("");
    	}
    	
    	if(payDTO.getBuyerName() == null) {
    		payDTO.setBuyerName("");
    	}
    	
    	if(payDTO.getSocialNo2() == null) {
    		payDTO.setSocialNo2("");
    	}
    	
    	payDTO.setpMid(inicisPgProperties.getWpayMid());
    	
    	if(isPcDevice()) {
    		payDTO.setSiteDomain(inicisPgProperties.getIniSiteDomain());	//PC
    	} else {
    		payDTO.setSiteDomain(inicisPgProperties.getMoIniSiteDomain());	//MO
    	}
    	
    	//원클릭 간편결제 가입 요청 parameter 셋팅
    	HashMap<String, String> paramMap = iniWPayment.makeWPayRegistParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(), inicisPgProperties.getWpayHashKey(), payDTO);
    
    	 model.addAttribute("payParam", paramMap);
        return "payment/wpay/iniWPayRegist";
        
    }
    
    
    
    @GetMapping("/wPayRegistReturn")	// 회원가입 결과 return url  Get방식으로 받아야함.
    public String wPayReturn(Model model, HttpServletRequest request) throws Exception {
    	
    	Map<String,String> paramMap = new Hashtable<String,String>();
    	Map<String, String> resultMap = new HashMap<String, String>();
        Enumeration elems = request.getParameterNames();
        
        String temp = "";
        
        if(!elems.hasMoreElements()) {
        	resultMap.put("resultMsg", "사용자가 가입을 취소하였습니다.");
        } else {
        	
        	while(elems.hasMoreElements()){
                temp = (String) elems.nextElement();
                paramMap.put(temp, request.getParameter(temp));
            }
            
            System.out.println(">>> paramMap : " + paramMap.toString());
            String resutMsg = paramMap.get("resultMsg");
            //System.out.println("resultMsg= " + URLDecoder.decode(resutMsg, "UTF-8"));
            
            resultMap = iniWPayment.decodeWpayRegistResultParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(), paramMap);
            
            //wpay회원 가입성공시 wpay 사용여부 및 wpayUserKey정보 저장
            if("0000".equals(resultMap.get("resultCode")) || "2006".equals(resultMap.get("resultCode"))){
            	
            	//resultCode : 0000 - 가입성공 , 2006 - 기 가입된 고객 (wpayUserKey가 없을시 저장시키기 위함) 
            	System.out.println("result Data=" + resultMap.toString());
            	
            	//wpay에서 제공받은 고객 userKey 정보 저장
            	ApMemberWPaySaveInfo memberWPaySaveInfo = new ApMemberWPaySaveInfo();
            	String wpayUserKey = resultMap.get("wpayUserKey");
            	memberWPaySaveInfo.setWpayUserKey(wpayUserKey);
            	
            	MemberSession memberSession =  getMemberSession();
            	apApi.saveMemberWPayInfo(memberSession.getMember_sn(), memberWPaySaveInfo);
            }
        }
        
        model.addAttribute("resultMap", resultMap);
        
        return "payment/wpay/iniWPayRegistResult";
    }
    
    @PostMapping("/wpay")//이니시스-원클릭 간편결제 인증요청
    public String wpayRequestCertification(Model model, PayDTO payDTO) throws Exception {
        
    	payDTO.setpMid(inicisPgProperties.getWpayMid());
    	
    	if(isPcDevice()) {
    		payDTO.setSiteDomain(inicisPgProperties.getIniSiteDomain());	//PC
    	} else {
    		payDTO.setSiteDomain(inicisPgProperties.getMoIniSiteDomain());	//MO
    	}
    	
    	MemberSession memberSession =  getMemberSession();
    	ApMemberWPayInfo apMemberWpayInfo = apApi.getMemberWPayInfo(memberSession.getMember_sn());
    	
    	if(!apMemberWpayInfo.isUseWpay()) {
    		throw new IllegalArgumentException("원클릭 간편결제 회원이 아닙니다.");
    	}
    	
    	payDTO.setWpayUserKey(apMemberWpayInfo.getWpayUserKey());
    	
    	
    	//원클릭 간편결제 가입 요청 parameter 셋팅
    	HashMap<String, String> paramMap = iniWPayment.makeWPayRequestCertificationParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(), inicisPgProperties.getWpayHashKey(), payDTO);
    
    	 model.addAttribute("payParam", paramMap);
        return "payment/wpay/iniWPayment";
        
    }
    
    @GetMapping("/wpayRequestCertReturn")	// 원클릭 간편결과 승인처리 결과
    public String wpayRequestCertReturn(Model model, HttpServletRequest request) throws Exception {
    	
    	//승인요청
    	HashMap<String, String> paramMap = iniWPayment.iniWpayRequestAutorization(inicisPgProperties.getWpayMid(), inicisPgProperties.getWpayHashKey(), request);
        
    	//데이터 복호화
    	Map<String, String> resultMap = iniWPayment.decodeWpayCertResultParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(), paramMap);    	    	
    	model.addAttribute("resultMap", resultMap);        
        
        return "payment/wpay/wpayRequestCertResult";
    }
    
    @GetMapping("/wpayMgmt")
    public String wPayMgmt(Model model, PayDTO payDTO) throws Exception {
        
    	//payDTO.setSignKey(inicisPgProperties.getwpay);	//확인필요
    	payDTO.setpMid(inicisPgProperties.getWpayMid());
    	payDTO.setSiteDomain(inicisPgProperties.getIniSiteDomain());
    	
    	//원클릭 간편결제 가입 요청 parameter 셋팅
    	HashMap<String, String> paramMap = iniWPayment.makeWPayMgmtParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(),inicisPgProperties.getWpayHashKey() , payDTO);
    
    	 model.addAttribute("payParam", paramMap);
        return "payment/wpay/iniWPayMgmt";
        
    }
    
    @GetMapping("/wPayMgmtReturn")	// 마이페이지 return url  Get방식으로 받아야함.
    public String wPayMgmtReturn(Model model, HttpServletRequest request) throws Exception {
    	
    	Map<String,String> paramMap = new Hashtable<String,String>();
        Enumeration elems = request.getParameterNames();
        
        String temp = "";

        while(elems.hasMoreElements()){
            temp = (String) elems.nextElement();
            paramMap.put(temp, request.getParameter(temp));
        }
        
        System.out.println(">>> paramMap : " + paramMap.toString());
        String resutMsg = paramMap.get("resultMsg");
        System.out.println("resultMsg= " + URLDecoder.decode(resutMsg, "UTF-8"));
        
        Map<String, String> resultMap = iniWPayment.decodeWpayRegistResultParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(), paramMap);
        
        model.addAttribute("resultMap", resultMap);
        
        return "payment/wpay/iniWPayRegistResult";
    }
}