package kr.ap.emt.my.controller;

import java.net.URLDecoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.payment.config.InicisPgProperties;
import kr.ap.emt.payment.vo.PayDTO;
import kr.ap.emt.payment.wpay.iniWPayment;
import net.g1project.ecp.api.model.ap.ap.ApMemberWPayInfo;
import net.g1project.ecp.api.model.sales.deposits.DepositRefundAccount;

/**
 * 나의 지갑 관리
 *
 * 1. 기프트카드 관리
 * 2. 예치금 관리
 * 3. 원클릭 간편결제 관리
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyWalletViewController extends AbstractController {
	
	@Autowired
    private InicisPgProperties inicisPgProperties;	//원클릭 간편결제 이니시스 property

	/**********************************************************************************************
	 *  1. 기프트카드 관리
	 **********************************************************************************************/
	/**
	 * 기프트카드 관리
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myGiftCardList")
	@PageTitle(title = "기프트카드 관리" , menuId = "myWallet", subMenuId = "myGiftCard")
	public String myGiftCardList(Model model) {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "";
		}

		return null;
	}

	/**********************************************************************************************
	 *  2. 예치금 관리
	 **********************************************************************************************/
	/**
	 * 예치금 관리
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myDepositList")
	@PageTitle(title = "예치금 관리" , menuId = "myWallet", subMenuId = "myDeposit")
	public String myDepositList(Model model) {

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/deposit-01";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-deposit-list-01";
		}

		return null;
	}

	/**
	 * 출금신청/계좌관리
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myDepositManagementList")
	@PageTitle(title = "예치금 관리" , menuId = "myWallet", subMenuId = "myDeposit")
	public String myDepositManagementList(Model model) {

		DepositRefundAccount depositRefundAccount = depositsApi.getDepositRefundAccount(getMemberSn());
		model.addAttribute("DepositRefundAccount", depositRefundAccount);

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/deposit-02";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-deposit-list-02";
		}

		return null;
	}

	@GetMapping("/refundAccountsRegister")
	@PageTitle(title = "예치금 관리" , menuId = "myWallet", subMenuId = "myDeposit")
	public String refundAccountsRegister(Model model) {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/fullpage-deposit-03";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "";
		}

		return null;
	}
	
	/**********************************************************************************************
	 *  3. 원터치 간편결제 카드 관리
	 **********************************************************************************************/
	
	/**
	 * 원터치 간편결제 카드 연동 PG사 페이지 호출
	 * @param model
	 * @return
	 */
	@GetMapping("/wpayMgmt")
    public String wPayMgmt(Model model) throws Exception {
		
		MemberSession memberSession = getMemberSession();
		
		// 원클릭 간편결제 회원 여부 체크
		ApMemberWPayInfo apMemberWpayInfo = apApi.getMemberWPayInfo(memberSession.getMember_sn());
			if(!apMemberWpayInfo.isUseWpay()) {
				//TODO 원터치 간편결제 회원인 아닌 경우 오류처리
				throw new IllegalAccessError("원터치 간편결제 회원이 아닙니다.");
			}
		
		PayDTO payDTO = new PayDTO();
    	
		payDTO.setpMid(inicisPgProperties.getWpayMid());
    	payDTO.setWpayUserKey(apMemberWpayInfo.getWpayUserKey());	
    	payDTO.setSiteDomain(isPcDevice() ? inicisPgProperties.getIniSiteDomain() : inicisPgProperties.getMoIniSiteDomain());
    	
    	//원클릭 간편결제 마이페이지 요청 parameter 셋팅
    	HashMap<String, String> paramMap = iniWPayment.makeWPayMgmtParam(
    														inicisPgProperties.getWpaySeedKey(),
															inicisPgProperties.getWpaySeedIv(),
															inicisPgProperties.getWpayHashKey(),
															payDTO);
    
    	 model.addAttribute("payParam", paramMap);
        return "payment/wpay/iniWPayMgmt";
        
    }
	
	/**
	 * 원터치 간편결제 회원탈퇴시 
	 * 이니시스로부터 전달받을 returnUrl
	 * @param model, request
	 * @return
	 */
	@GetMapping("/wPayMgmtReturn")	// 마이페이지 return url  Get방식으로 받아야함.
    public String wPayMgmtReturn(Model model, HttpServletRequest request) throws Exception {
    	
    	Map<String,String> paramMap = new Hashtable<String,String>();
        Enumeration elems = request.getParameterNames();
        
        String temp = "";

        while(elems.hasMoreElements()){
            temp = (String) elems.nextElement();
            paramMap.put(temp, request.getParameter(temp));
        }
        //System.out.println(paramMap.toString());
        
        MemberSession memberSession = getMemberSession();
        
        //성공시
        if("0000".equals(paramMap.get("resultCode"))) {
        	apApi.removeMemberWPayInfo(memberSession.getMember_sn());        	
        }
        
        Map<String,String> resultMap = new HashMap<String, String>();        
        resultMap.put("resultCode", paramMap.get("resultCode"));
        resultMap.put("resultMsg", URLDecoder.decode(paramMap.get("resultMsg"), "UTF-8"));
        
        model.addAttribute("resultMap", resultMap);
        
        return "payment/wpay/iniWPayMgmtResult";
    }
	
}
