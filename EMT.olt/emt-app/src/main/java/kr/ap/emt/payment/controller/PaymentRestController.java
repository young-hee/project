package kr.ap.emt.payment.controller;

import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.payment.config.InicisPgProperties;
import kr.ap.emt.payment.config.NaverPgProperties;
import kr.ap.emt.payment.ini.IniPayment;
import kr.ap.emt.payment.vo.PayDTO;
import net.g1project.ecp.api.model.ap.ap.ApMemberWPayInfo;
import net.g1project.ecp.api.model.basis.mall.MallSalesPolicy;

/**
 * @author aki@g1project.net
 * @since {version}
 *
 */
@Controller
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
 	@ResponseBody
 	public ResponseEntity<?> inipayReq(PayDTO payDTO) {

 		HashMap<String, Object> result = new HashMap<String, Object>();

 		try {
 			
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
 	     	
 	     	//System.out.println(result.toString());
 	     	

 		} catch (Exception e) {
 			result.put("errorData", e);
 			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
 		}

 		return ResponseEntity.ok(result);
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
     * @param meberSn
     * @return
     */
 	@GetMapping("/getMemberWPayInfo")
 	@ResponseBody
 	public ResponseEntity<?> getMemberWPayInfo() {
 		HashMap<String, Object> result = new HashMap<String, Object>();

 		try {
 			MemberSession memberSession = getMemberSession();
 			if(memberSession == null || memberSession.getMember_sn() == null) {
 				result.put("result", "fail");
 			} else {
 				ApMemberWPayInfo apMemberWpayInfo = apApi.getMemberWPayInfo(memberSession.getMember_sn());
 	 			if(apMemberWpayInfo.isUseWpay()) {
 	 				result.put("result", "success");
 	 			}
 			}
 		} catch (Exception e) {
 			result.put("errorData", e);
 			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
 		}

 		return ResponseEntity.ok(result);
 	}
}