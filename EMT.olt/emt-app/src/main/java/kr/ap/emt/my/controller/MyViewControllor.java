package kr.ap.emt.my.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import kr.ap.comm.api.vo.CicueaCuPtAccmTcVo;
import kr.ap.comm.api.vo.CicuedCuTncaTcVo;
import kr.ap.comm.api.vo.CicuedleaveVo;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.api.vo.CicuemCuOptiCsTcVo;
import kr.ap.comm.api.vo.CicuemCuOptiTcResultVo;
import kr.ap.comm.api.vo.LeaverResultVo;
import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.CookieUtils;
import kr.ap.comm.util.G1SecureRandom;
import kr.ap.emt.api.pos.POSApiService;
import kr.ap.emt.api.pos.vo.CustCushinPoint;
import kr.ap.emt.my.vo.MyInfoDTO;
import kr.ap.emt.my.vo.TermsAgree;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.ap.ap.ApLogoutInfo;
import net.g1project.ecp.api.model.ap.ap.CheckResult;
import net.g1project.ecp.api.model.ap.ap.CloseAcReasonInfo;
import net.g1project.ecp.api.model.ap.ap.CloseAcStatus;
import net.g1project.ecp.api.model.ap.ap.MemberAddAttr;
import net.g1project.ecp.api.model.ap.ap.MemberMembership;
import net.g1project.ecp.api.model.ap.ap.SNS;
import net.g1project.ecp.api.model.ap.ap.ShipAddressInfo;
import net.g1project.ecp.api.model.ap.ap.SignupReceiveAgree;
import net.g1project.ecp.api.model.ap.ap.SignupTermsAgree;
import net.g1project.ecp.api.model.order.order.OrdSummaryInfo;
import net.g1project.ecp.api.model.sales.member.CloseMember;
import net.g1project.ecp.api.model.sales.member.ClosedAcInfo;
import net.g1project.ecp.api.model.sales.member.ClosedAcReason;
import net.g1project.ecp.api.model.sales.member.MemberAddAttrs;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import net.g1project.ecp.api.model.sales.terms.MemberTermsAgree;
import net.g1project.ecp.api.model.sales.terms.Terms;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.util.WebUtils;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *
 * 마이 에뛰드
 *
 * 나의 정보 관리
 *
 * 1. 개인정보 수정
 * 2. 배송지 관리
 * 3. 단골매장 관리
 * 4. 회원탈퇴
 * 5. 선택약관 동의 변경
 * 6. SNS 계정 연동 관리.
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyViewControllor extends AbstractController {

	@Autowired
	private POSApiService posService;

	/**
	 * 마이 에뛰드
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/info/myEtude")
	@PageTitle(title = "마이 에뛰드")
	public String myEtude(Model model) {

		String onOffNum = getMemberSession().getMember().getPosMemberIdentifier();
		//주문/배송 조회
		Date endDate = new Date();
		Date startDate = DateUtils.addMonths(endDate, -3);
		
		MemberSession memberSession = getMemberSession();
		memberSession.setMember(apApi.getMemberInfo(memberSession.getMember_sn()));
		
		try {
			OrdSummaryInfo ordSummary = orderApi.getOrdSummary(getMemberSn(), startDate, endDate);

			//주문접수건수
			model.addAttribute("ordReceptCnt", ordSummary.getOrdReceptCnt());

			//결제완료건수
			model.addAttribute("payCompleteCnt", ordSummary.getPayCompleteCnt());

			//배송준비중건수
			model.addAttribute("preparingCnt", ordSummary.getPreparingCnt());

			//배송중건수
			model.addAttribute("shippingCnt", ordSummary.getShippingCnt());

			//배송완료건수
			model.addAttribute("shipCompleteCnt", ordSummary.getShipCompleteCnt());

			//취소건수
			model.addAttribute("cancelCnt", ordSummary.getCancelCnt());

			//반품건수
			model.addAttribute("returnCnt", ordSummary.getReturnCnt());

			//교환건수
			model.addAttribute("exchangeCnt", ordSummary.getExchangeCnt());
			
			//미작성 구매후기.
			ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, 0, 10);
			model.addAttribute("reviewCnt", productReviewWritableOrders.getTotalCount());

			{//포인트 조회
				CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
				vo.setIncsNo(getMemberSession().getUser_incsNo());
				vo = amoreAPIService.getptinq(vo);
				model.addAttribute("point", vo);
			}
			{
				try {
					CustCushinPoint cushin = posService.getCustCushinPoint(onOffNum);
					model.addAttribute("cushin", cushin);
				} catch(Exception e) {
					CustCushinPoint cushin = new CustCushinPoint();
					cushin.setTotRemainPt(memberSession.getMember().getRemainCushionPoint());
					model.addAttribute("cushin", cushin);
				}
			}
			
			
		} catch (Exception e) {
			model.addAttribute("errorData", e);
		}

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-etude";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-etude";
		}

		return null;
	}



	/**********************************************************************************************
	 *  1. 개인정보 수정
	 **********************************************************************************************/

	/**
	 * 개인정보 수정 패스워드 입력.
	 *
	 * @param model
	 * @param req
	 * @param response
	 * @param userPwdEc
	 * @return
	 */
	@PostMapping("/info/changeUserInfo")
	@PageTitle(title = "회원정보수정", menuId = "myInfo", subMenuId = "changeUser")
	@FragmentPage
	public String changeUserInfo(Model model, HttpServletRequest req, HttpServletResponse response, String userPwdEc) {
		return changeUserInfoM(model, userPwdEc);
	}

	@GetMapping("/info/changeUserInfo")
	@PageTitle(title = "회원정보수정", menuId = "myInfo", subMenuId = "changeUser")
	public String changeUserInfo(Model model) {
		model.addAttribute("url", "/my/page/info/changeUserInfo");
		model.addAttribute("isPopup", true);
		return "my/member-info";
	}

	@GetMapping("/info/changePwdForm")
	@FragmentPage
	public String changePwdForm() {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/layer-member-info-01";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/layer-mypage-01";
		}
		return null;
	}
	@GetMapping("/info/changePhoneForm")
	@FragmentPage
	public String changePhoneForm() {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/fullpage-member-info-02";
		}
		
		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/layer-member-info-04";
		}
		return null;
	}

	@GetMapping("/info/termForm")
	@FragmentPage
	public String termForm() {
		if(isMobileDevice())
			return "my/fullpage-member-info-04";
		if(isPcDevice())
			return "my/layer-member-info-03";
		return null;
	}
	
	@GetMapping("/info/btpMobileCard")
	@PageTitle(title = "뷰티포인트 모바일 카드 신청")
	public String btpMobileCard(Model model) {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/mobile-card";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/btp-mobile-card";
		}
		return null;
	}
	
	@GetMapping("/info/snsLinkForm")
	@FragmentPage
	public String snsLinkForm() {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/layer-member-info-03";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/layer-mypage-02";
		}
		
		return null;
	}
	
	@GetMapping("/info/navercallback")
	public String naverCallback() {
		return "my/navercallback";
	}
	
	@GetMapping("/info/kakaocallback")
	public String kakaoCallback() {
		return "my/kakaoLogin";
	}

	/**********************************************************************************************
	 *  2. 배송지 관리
	 **********************************************************************************************/

	/**
	 *  배송지 목록
	 *
	 * @param model
	 * @param req
	 * @return
	 */
	@GetMapping("/ship/address")
	@PageTitle(title = "배송지 관리")
	public String address(Model model, HttpServletRequest req) {

		// List<ShipAddressInfo> add = memberApi.getShipAddresses(getMemberSn(req));
		// model.addAttribute("address", add);
		if (isMobileDevice()) {
			return "my/address-management";
		}

		//PC
		if (isPcDevice()) {
			return "my/address-list";
		}

		return null;
	}

	@GetMapping("/ship/updateAddress")
	public String updateAddress(Model model, HttpServletRequest req) {

		if (isMobileDevice()) {
			return "my/address-management.2";
		}

		if (isPcDevice()) {
			return "my/layer-address-management";
		}
		return null;
	}

	@PostMapping("/ship/updateAddress")
	public String updateAddress(Model model, @RequestParam String data, @RequestParam Long sn) {

		try {
			ObjectMapper mapper = new ObjectMapper();
			mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);

			model.addAttribute("address", mapper.readValue(data, ShipAddressInfo.class));
		} catch (Exception e) {
			// TODO Auto-generated catch block
			System.err.println(e);
		}

		if (isMobileDevice()) {
			return "my/address-management.2";
		}

		if (isPcDevice()) {
			return "my/layer-address-management";
		}

		return null;
	}



	/**********************************************************************************************
	 *  3. 단골매장 관리
	 **********************************************************************************************/

	/**
	 * 단골매장 목록
	 *
	 * @param model
	 * @param req
	 * @return
	 */
	@GetMapping("/store/list")
	@PageTitle(title = "단골매장 관리")
	public String list(Model model, HttpServletRequest req) {
		return "my/member-favorite-store-02";
	}

	/**
	 * 단골매장
	 *
	 * @param model
	 * @param req
	 * @return
	 */
	@GetMapping("/store/add")
	public String add(Model model, HttpServletRequest req) {

		if (isMobileDevice()) {
			return "my/member-favorite-store-add-01";
		}

		if (isPcDevice()) {
			return "my/layer-member-favorite-store-add-02";
		}
		return null;
	}

	/**
	 * 가까운 매장
	 *
	 * @param model
	 * @param req
	 * @return
	 */
	@GetMapping("/store/add2")
	public String add2(Model model, HttpServletRequest req) {

		if (isMobileDevice()) {
			return "my/member-favorite-store-add-02";
		}

		if (isPcDevice()) {
			return "my/layer-member-favorite-store-add-02";
		}
		return null;
	}


	/**********************************************************************************************
	 *  4. 회원탈퇴
	 **********************************************************************************************/

	/**
	 * 탈퇴사유 입력화면
	 *
	 * @param model
	 * @return
	 */
	@PostMapping("/leaveId")
	@PageTitle(title = "회원탈퇴", menuId = "myInfo", subMenuId = "leaverId")
	public String leaverId(Model model, String userPwdEc) {
		try {
		
			CheckResult pwResult = apApi.checkMemberPassword(getMemberSn(), userPwdEc);
			if(pwResult.isResult()) {
				CloseAcStatus status = apApi.getMemberCloseAcStstus(getMemberSn());
				model.addAttribute("status", status);
				
				if(status.getOrdRelatedCount() != 0 || status.getClaimRelatedCount() != 0 || status.getRemainDeposit().longValue() != 0) {
					if(isMobileDevice())
						return "my/member-info-2";
					if(isPcDevice())
						return "my/member-info-6";
				}

				{//포인트 조회
					CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
					vo.setIncsNo(getMemberSession().getUser_incsNo());
					vo = amoreAPIService.getptinq(vo);
					model.addAttribute("point", vo);
				}
				
				return leaverIdM(model);
			}
		} catch(Exception e) {
			
		}
		model.addAttribute("error", "비밀번호가 일치하지 않습니다.");
		model.addAttribute("url", "/my/page/leaveId");
		model.addAttribute("isPopup", false);
		
		return "my/member-info";

	}

	/**
	 * 회원탈퇴 정보입력 화면
	 * @param model
	 * @return
	 */
	@GetMapping("/leaveId")
	@PageTitle(title = "회원 탈퇴", menuId = "myInfo", subMenuId = "leaverId")
	public String leaveId(Model model) {
		model.addAttribute("url", "/my/page/leaveId");
		model.addAttribute("isPopup", false);
		return "my/member-info";
	}
	
	/**
	 * 회원탈퇴 시도.
	 * @param req
	 * @param code
	 * @param desc
	 * @param model 
	 * @param resp 
	 * @return
	 */
	@GetMapping("/doLeaveId")
	@PageTitle(title = "회원탈퇴", menuId = "myInfo", subMenuId = "leaverId")
	public String doLeaverId(HttpServletRequest req, String code, String desc, Model model, HttpServletResponse resp) {
		return doLeaverIdM(req, code, desc, req, resp, model);
	}



	/**********************************************************************************************
	 *  5. 선택약관 동의 변경
	 **********************************************************************************************/
	/**
	 * 선택약관 동의 변경
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/info/optionTermsAgrees")
	@PageTitle(title = "선택약관동의 변경", menuId = "myInfo", subMenuId = "optionTerms")
	public String optionTermsAgrees(Model model) {

		MemberSession memberSession = getMemberSession();
		memberSession.setMember(apApi.getMemberInfo(memberSession.getMember_sn()));
		setMemberSession(memberSession);

		Map<String, Terms> termsMap = new HashMap<String, Terms>();
		List<SignupTermsAgree> result = memberSession.getMember().getMemberTermsAgrees();

		Map<String, Boolean> agreeMap = new HashMap<String, Boolean>();
		List<Terms> terms = termsApi.getTerms("040,050,060");
		for(int i = 4; i < 7; i++) {
			boolean isAree = false;
			for (SignupTermsAgree memberTermsAgree : result) {
				if(("0" + i + "0").equals(memberTermsAgree.getTermsDisplayCode())) {
					isAree = "Y".equals(memberTermsAgree.getAgreeYn());
				}
			}
			agreeMap.put("0" + i + "0", isAree);
			termsMap.put("0" + i + "0", findTerm(terms, "0" + i + "0"));
		}

		model.addAttribute("termsMap", termsMap);
		model.addAttribute("agreeMap", agreeMap);
		return "my/member-info.7";
	}

	@PostMapping("/info/optionTermsAgrees")
	public String saveOptionTermsArees(MyInfoDTO myinfo) {

		MemberSession memberSession = getMemberSession();

		List<MemberTermsAgree> result = termsApi.getMemberAgreedTerms(memberSession.getMember_sn());
		CicuedCuTncaTcVo tncaTc = null;
		Map<String, Boolean> agreeMap = new HashMap<String, Boolean>();
		List<CicuedCuTncaTcVo> cicuedCuTncaTcVo = new ArrayList<CicuedCuTncaTcVo>();
		String agreed = "";
		String removeAgreed = "";
		for(int i = 3; i < 7; i++) {
			boolean isAree = false;
			for (MemberTermsAgree memberTermsAgree : result) {
				if(("0" + i + "0").equals(memberTermsAgree.getTermsDisplayCode())) {
					isAree = "Y".equals(memberTermsAgree.getAgreeYn());
					tncaTc = new CicuedCuTncaTcVo();
					tncaTc.setTcatCd(memberTermsAgree.getTermsDisplayCode());
					tncaTc.setTncAgrYn(memberTermsAgree.getAgreeYn());

					tncaTc.setTncvNo("1");//약관버전
					tncaTc.setIncsNo(memberSession.getUser_incsNo());//통합고객번호 세팅.
					cicuedCuTncaTcVo.add(tncaTc);
				}
			}
			agreeMap.put("0" + i + "0", isAree);
		}
		for (TermsAgree ta : myinfo.getPolicy()) {
			if(ta.isValue()) {
				if(!agreeMap.get(ta.getName()))
					agreed +=  "," + ta.getName();
			} else {
				if(agreeMap.get(ta.getName()))
					removeAgreed +=  "," + ta.getName();
			}
		}

		if(!agreed.isEmpty())
			termsApi.postAgreedTerms(memberSession.getMember_sn(), agreed.substring(1));
		if(!removeAgreed.isEmpty())
			termsApi.deleteAgreeTerms(memberSession.getMember_sn(), removeAgreed.substring(1));

		CicuemCuInfTotTcVo vo = new CicuemCuInfTotTcVo();
		vo.setCicuedCuTncaTcVo(cicuedCuTncaTcVo);
		try {
			amoreAPIService.savecicuedcutnca(vo);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return "redirect:/main";
	}

	/**********************************************************************************************
	 *  6. SNS 계정 연동 관리.
	 **********************************************************************************************/

	/**
	 * 선택약관 동의 변경
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/info/snsLink")
	@PageTitle(title = "SNS 계정 연동 관리", menuId = "myInfo", subMenuId = "snsLink")
	public String snsLink(Model model) {
		MemberSession memberSession = getMemberSession();
		memberSession.setMember(apApi.getMemberInfo(memberSession.getMember_sn()));
		setMemberSession(memberSession);

		List<SNS> snsInfo = apApi.getMemberSnsIfInfo(memberSession.getMember_sn());				

		Map<String, Date> snsMap = new HashMap<String, Date>();
		if(snsInfo != null) {
			
			for (SNS sns : snsInfo) {
				snsMap.put(sns.getSnsCode(), sns.getConnDt());
			}
			
		}
		model.addAttribute("snsMap", snsMap);
		
		String state = G1SecureRandom.getRandomText(10);
    	WebUtils.setSessionAttribute(getRequest(), SessionKey.SNS_STATE, state);
		model.addAttribute("state", state);
		
		if(isMobileDevice())
			return "my/sns-interlink";
		if(isPcDevice())
			return "my/member-sns";
		return null;
	}
	
    
	//=======================모바일 기능 구현 Method

	private String doLeaverIdM(HttpServletRequest req, String code, String desc, HttpServletRequest request, HttpServletResponse response, Model model) {
		//FIXME 탈퇴 여부 확인.
		boolean isleaverId = true;
		
		CloseAcStatus status = apApi.getMemberCloseAcStstus(getMemberSn());

		model.addAttribute("status", status);
		
		if(status.getOrdRelatedCount() != 0 || status.getClaimRelatedCount() != 0 || status.getRemainDeposit().longValue() != 0) {
			if(isMobileDevice())
				return "my/member-info-2";
			if(isPcDevice())
				return "my/member-info-6";
		}
		MemberSession memberSession = getMemberSession();
		
		if(isleaverId) {
			CicuedleaveVo vo = new CicuedleaveVo();
			String today = DateFormatUtils.format(new Date(), "yyyyMMdd");
			vo.setIncsNo(memberSession.getUser_incsNo());
			vo.setWtpsCd("10");
			vo.setWtrsCd("01");
			vo.setWtcrTxt(desc);
			vo.setWtrqDttm(today);
			vo.setWtdnDttm(today);
			vo.setWtrqChCd(APConstant.EH_CH_CD);
			if(isMobileDevice())
				vo.setWtrdCd("M");
			if(isPcDevice())
				vo.setWtrdCd("W");
			if(isAndroid() || isiOS())
				vo.setWtrdCd("A");
			vo.setWtrqChCd(APConstant.EH_CH_CD);
			vo.setWtrqPrtnId(APConstant.EH_PRTN_ID);
			vo.setWtrsCd("99");
			vo.setWtrsTxt(desc);
			vo.setFscrId(memberSession.getMember().getMemberId());
			vo.setLschId(memberSession.getMember().getMemberId());
			
			try {
				LeaverResultVo rslt = amoreAPIService.createcicuelcuwt(vo);
				if(!"ICITSVCOM000".equals(rslt.getRsltCd())) {
					if(isMobileDevice())
						return "my/member-info.2";
					if(isPcDevice())
						return "my/member-info-6";
				}
			} catch (ApiException e) {
				e.printStackTrace();
				if(isMobileDevice())
					return "my/member-info.2";
				if(isPcDevice())
					return "my/member-info-6";
			} catch(Exception e) {
				e.printStackTrace();
				if(isMobileDevice())
					return "my/member-info.2";
				if(isPcDevice())
					return "my/member-info-6";
			}
			CloseAcReasonInfo deleteMember = new CloseAcReasonInfo();
			if(code != null && !code.isEmpty())
				deleteMember.setReasonCode(code);
			else
				deleteMember.setClosedAcDetailReason(desc);
			try {

				Cookie token = CookieUtils.getCookie(request, CookieKey.AUTO_LOGIN);
				CookieUtils.removeCookie(request, response, CookieKey.AUTO_LOGIN);
				WebUtils.setSessionAttribute(request, SessionKey.LOGIN_USER, null);
				if (memberSession.getMember_sn() != 0) {
					try {
						ApLogoutInfo logoutInfo = new ApLogoutInfo();
						if(token != null)
							logoutInfo.setAutoLoginToken(token.getValue());
						apApi.memberLogout(memberSession.getMember_sn(), logoutInfo);
					} catch (Exception e) {
						logger.error(e.getMessage());
					}
				}
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}
			try {
				apApi.closeMemberAc(memberSession.getMember_sn(), deleteMember);
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}
			if(isMobileDevice())
				return "my/member-info.4";
			if(isPcDevice())
				return "my/member-info-5";
		}
		else
			return "my/member-info-2";
		return null;
	}

	private String leaverIdM(Model model) {
		//FIXME 탈퇴전 정보를 가져와야 하는가?(잔여포인트 등..)
		List<ClosedAcReason> closedAcReason = memberApi.getClosedAcReasons();
		model.addAttribute("closedAcReason", closedAcReason);

		MemberSession memberSession = getMemberSession();
		memberSession.setMember(apApi.getMemberInfo(memberSession.getMember_sn()));
		
        /**
         * Mobile
         */
        if(isMobileDevice()) {
    		return "my/member-info-3";
        }

        /**
         * PC
         */
        if(isPcDevice()) {//TODO
    		return "my/member-info-4";
        }
        
        return null;
		
	}

	private String changeUserInfoM(Model model, String userPwdEc) {
		
		try {
			MemberSession memberSession = getMemberSession();
			CheckResult pwResult = apApi.checkMemberPassword(getMemberSn(), userPwdEc);

			if(pwResult.isResult()) {
				CicuemCuInfTotTcVo vo = new CicuemCuInfTotTcVo();
				vo.setIncsNo(memberSession.getUser_incsNo());
				try {
					Map<String, Boolean> apReceiveMap = new HashMap<String, Boolean>();
					CicuemCuOptiTcResultVo tcVo = amoreAPIService.getcicuemcuoptilist(vo);
					if(tcVo != null) {
						CicuemCuOptiCsTcVo info = (CicuemCuOptiCsTcVo) getMultiinfoByChCd(tcVo.getCicuemCuOptiTcVo(), "000");
						if(info != null) {
							apReceiveMap.put("Email", "Y".equals(info.getEmlOptiYn()));
							apReceiveMap.put("SMS", "Y".equals(info.getSmsOptiYn()));
							apReceiveMap.put("DM", "Y".equals(info.getDmOptiYn()));
							apReceiveMap.put("TM", "Y".equals(info.getTmOptiYn()));
						}
					}
					model.addAttribute("apReceiveMap", apReceiveMap);

					Map<String, Boolean> receiveMap = new HashMap<String, Boolean>();
					tcVo = amoreAPIService.getcicuemcuoptilist(vo);
					if(tcVo != null) {
						CicuemCuOptiCsTcVo info = (CicuemCuOptiCsTcVo) getMultiinfoByChCd(tcVo.getCicuemCuOptiTcVo(), "030");
						if(info != null) {
							receiveMap.put("Email", "Y".equals(info.getEmlOptiYn()));
							receiveMap.put("SMS", "Y".equals(info.getSmsOptiYn()));
							receiveMap.put("DM", "Y".equals(info.getDmOptiYn()));
							receiveMap.put("TM", "Y".equals(info.getTmOptiYn()));
						}
					}
					model.addAttribute("receiveMap", receiveMap);

					HashMap<String, Boolean> ehPosReceiveMap = new HashMap<String, Boolean>();
					tcVo = amoreAPIService.getcicuemcuoptilist(vo);
					if(tcVo != null) {
						CicuemCuOptiCsTcVo info = (CicuemCuOptiCsTcVo) getMultiinfoByChCd(tcVo.getCicuemCuOptiTcVo(), "017");
						if(info != null) {
							ehPosReceiveMap.put("Email", "Y".equals(info.getEmlOptiYn()));
							ehPosReceiveMap.put("SMS", "Y".equals(info.getSmsOptiYn()));
							ehPosReceiveMap.put("DM", "Y".equals(info.getDmOptiYn()));
							ehPosReceiveMap.put("TM", "Y".equals(info.getTmOptiYn()));
						}
					}
					model.addAttribute("ehPosReceiveMap", ehPosReceiveMap);

					HashMap<String, Boolean> ehReceiveMap = new HashMap<String, Boolean>();
					tcVo = amoreAPIService.getcicuemcuoptilist(vo);
					if(tcVo != null) {
						CicuemCuOptiCsTcVo info = (CicuemCuOptiCsTcVo) getMultiinfoByChCd(tcVo.getCicuemCuOptiTcVo(), "035");
						if(info != null) {
							ehReceiveMap.put("Email", "Y".equals(info.getEmlOptiYn()));
							ehReceiveMap.put("SMS", "Y".equals(info.getSmsOptiYn()));
							ehReceiveMap.put("DM", "Y".equals(info.getDmOptiYn()));
							ehReceiveMap.put("TM", "Y".equals(info.getTmOptiYn()));
						}
					}
					model.addAttribute("ehReceiveMap", ehReceiveMap);
					
				} catch(ApiException e) {
					
				}
				
				
				memberSession.setMember(apApi.getMemberInfo(memberSession.getMember_sn()));
				setMemberSession(memberSession);
				List<Terms> terms = termsApi.getTerms("030, 040, 050, 060");
				
				Map<String, Boolean> agreeMap = new HashMap<String, Boolean>();
				Map<String, Terms> termsMap = new HashMap<String, Terms>();
				List<SignupTermsAgree> result = memberSession.getMember().getMemberTermsAgrees();
				for(int i = 3; i < 8; i++) {
					boolean isAree = false;
					for (SignupTermsAgree memberTermsAgree : result) {
						if(("0" + i + "0").equals(memberTermsAgree.getTermsDisplayCode())) {
							isAree = "Y".equals(memberTermsAgree.getAgreeYn());
						}
					}
					agreeMap.put("0" + i + "0", isAree);
					termsMap.put("0" + i + "0", findTerm(terms, "0" + i + "0"));
				}
				
				List<MemberAddAttr> addAttrList = memberSession.getMember().getMemberAddAttr();
				
				Map<String, String> addAttrMap = new HashMap<String, String>();
				for (MemberAddAttr memberAddAttr : addAttrList) {
					addAttrMap.put(memberAddAttr.getMemberAddAttrValCode(), memberAddAttr.getMemberAddAttrCode());
					addAttrMap.put(memberAddAttr.getMemberAddAttrCode(), memberAddAttr.getMemberAddAttrValCode());
				}
				
				model.addAttribute("agreeMap", agreeMap);
				model.addAttribute("addAttrMap", addAttrMap);
				model.addAttribute("termsMap", termsMap);
				List<MemberMembership> list = memberSession.getMember().getMemberMembership();
				for(MemberMembership membership : list) {
					if("EMT".equals(membership.getMembershipServiceCode())) {
						model.addAttribute("membershipMemberIdentifier", membership.getMembershipMemberIdentifier());
					}
				}
				model.addAttribute("url", getRequest().getRequestURL().toString().replace("/my/page/info/changeUserInfo", ""));
				
				List<MemberAddAttrs> attrInfoList = memberApi.getMemberAddAttrs();
				model.addAttribute("attrInfoList", attrInfoList);
				
				List<SNS> snsInfo = apApi.getMemberSnsIfInfo(memberSession.getMember_sn());				
				
				Map<String, Date> snsMap = new HashMap<String, Date>();
				if(snsInfo != null) {
					
					for (SNS sns : snsInfo) {
						snsMap.put(sns.getSnsCode(), sns.getConnDt());
					}
					
				}
				model.addAttribute("snsMap", snsMap);
				if(isMobileDevice())
					return "my/fullpage-member-info-01";
				
				if(isPcDevice())
					return "my/layer-member-info-01";
			} else {

				if(isPcDevice()) {
					model.addAttribute("error", "비밀번호가 일치하지 않습니다.");
					return "my/member-info";
				}
			}
			
		} catch(Exception e) {
			
			if(isPcDevice()) {
				model.addAttribute("error", "비밀번호가 일치하지 않습니다.");				
				return "my/member-info";
			}
		}
		
		return null;
	}
	/**
	 * 약관코드로 약관내용을 가져옴.
	 * @param terms
	 * @param code
	 * @return
	 */
	private Terms findTerm(List<Terms> terms, String code) {
		for (Terms terms2 : terms) {
			if(code.equals(terms2.getTermsDisplayCode())) {
				return terms2;
			}
		}
		return null;
	}
}
