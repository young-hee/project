package kr.ap.emt.payment.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.payment.config.InicisPgProperties;
import kr.ap.emt.payment.config.NaverPgProperties;
import kr.ap.emt.payment.ini.IniPayment;
import kr.ap.emt.payment.vo.PayDTO;
import kr.ap.emt.payment.vo.PayProd;
import kr.ap.emt.payment.vo.ProductItem;
import kr.ap.emt.payment.wpay.iniWPayment;
import net.g1project.ecp.api.model.ap.ap.ApMemberWPayInfo;
import net.g1project.ecp.api.model.basis.mall.MallSalesPolicy;

/**
 * @author aki@g1project.net
 * @since {version}
 *
 */
@RestController
@RequestMapping("/payment")
public class PaymentRestController extends AbstractController {

    private Logger logger = LoggerFactory.getLogger(PaymentRestController.class);
    
    @Autowired
    private InicisPgProperties inicisPgProperties;
    
    @Autowired
    private NaverPgProperties naverPgProperties;
    
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
  
    /**
     * 이니시스 PC 결제정보 조회 AJAX
     * 
     * @param payDTO
     * @return
     */
 	@PostMapping("/inipayReq")
 	public ResponseEntity<?> inipayReq(PayDTO payDTO) throws Exception {

 		HashMap<String, Object> result = new HashMap<String, Object>();

		if(!StringUtils.isEmpty(payDTO.getGoPayMethod()) &&
				(KAKAO.equals(payDTO.getGoPayMethod()) || PAYCO.equals(payDTO.getGoPayMethod()))) {
			payDTO.setpMid(inicisPgProperties.getIniDrctMid());
			payDTO.setSignKey(inicisPgProperties.getIniDrctSignKey());
		} else {

			if(VBANK.equals(payDTO.getPayMethod())) {
				MallSalesPolicy mallSalePolicy = mallApi.getMallPolicies();
				payDTO.setDepositWatingHours(mallSalePolicy.getDepositWatingHours());

			}
			payDTO.setpMid(inicisPgProperties.getIniMid());
			payDTO.setSignKey(inicisPgProperties.getIniSignKey());
		}

		payDTO.setSiteDomain(inicisPgProperties.getIniSiteDomain());

		result = IniPayment.makeRequestParam(payDTO);


 		return ResponseEntity.ok(result);
 	}
 	
 	 /**
     * 이니시스 MO 결제정보 조회 AJAX
     * 
     * @param payDTO
     * @return
     */
 	@PostMapping("/moInipayReq")
 	public ResponseEntity<?> moInipayReq(PayDTO payDTO) throws Exception {
 		
 		HashMap<String, Object> result = new HashMap<String, Object>();

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
    	result = IniPayment.makeRequestParamMobile(payDTO);
    	 
        return ResponseEntity.ok(result);
 	}
 	
 	 /**
     * 이니시스 MO WPAY 결제정보 조회 AJAX
     * 
     * @param payDTO
     * @return
     */
 	@PostMapping("/moWpay")
 	public  ResponseEntity<?> wpayRequestCertification(Model model, PayDTO payDTO) throws Exception {
        
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
    	HashMap<String, String> result = iniWPayment.makeWPayRequestCertificationParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(), inicisPgProperties.getWpayHashKey(), payDTO);
    
        return ResponseEntity.ok(result);
        
    }
 	
 	 /**
     * 이니시스 MO WPAY 회원가입페이지 호출 조회 AJAX
     * 
     * @param payDTO
     * @return
     */
 	@PostMapping("/moWpayRegist")//이니시스-원클릭 간편결제 가입 페이지 호출
    public ResponseEntity<?> wPayRegist(PayDTO payDTO) throws Exception {
    
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
    	 HashMap<String, String> result = iniWPayment.makeWPayRegistParam(inicisPgProperties.getWpaySeedKey(), inicisPgProperties.getWpaySeedIv(), inicisPgProperties.getWpayHashKey(), payDTO);
    
    	 //model.addAttribute("payParam", paramMap);
    	 return ResponseEntity.ok(result);
        
    }
 	
 	 /**
     * 네이버 MO 결제정보 조회 AJAX
     * 
     * @param payDTO
     * @return
     */
 	@PostMapping("/moNaverPay")//네이버 결제페이지 호출
    public ResponseEntity<?> moNaverPay(Model model, PayDTO payDTO) throws Exception {
    	
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
        
    	 return ResponseEntity.ok(paramMap);
    }
 	
 	
 	
 	 /**
     * 현금영수증 신청
     * 
     * @param 
     * @return
     */
 	
 	 /**
     * 이니시스 - wpay 회원 가입 여부 체크
     * 
     * @return
     */
 	@GetMapping("/getMemberWPayInfo")
 	public ResponseEntity<?> getMemberWPayInfo() {
 		HashMap<String, Object> result = new HashMap<String, Object>();

		MemberSession memberSession = getMemberSession();
		if(memberSession == null || memberSession.getMember_sn() == null) {
			result.put("result", "fail");
		} else {
			ApMemberWPayInfo apMemberWpayInfo = apApi.getMemberWPayInfo(memberSession.getMember_sn());
			if(apMemberWpayInfo.isUseWpay()) {
				result.put("result", "success");
			}
		}

 		return ResponseEntity.ok(result);
 	}
}