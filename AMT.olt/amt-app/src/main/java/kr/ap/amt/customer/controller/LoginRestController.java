package kr.ap.amt.customer.controller;

import kr.ap.amt.api.pshop.PShopService;
import kr.ap.amt.api.pshop.vo.PShopResult;
import kr.ap.comm.api.vo.CicuemCuAdtInfTcVo;
import kr.ap.comm.api.vo.CicuemCuInfCoOutVo;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.cart.CartSession;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.SessionUtils;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.EmbeddableName;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.*;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginRestController extends AbstractController {

	@Autowired
	private Environment env;
	@Autowired
	private PShopService pShopService;
	@Autowired
	private SSOLoginHandler ssoLoginHandler;
	@Autowired
	private LoginHandler loginHandler;
	
	/**
	 * 로그인.
	 */
	@PostMapping("/doLogin")
	public ResponseEntity<?> doLogin(HttpServletRequest req, HttpServletResponse resp) {
		
		String memberId = req.getParameter("chcsNo");
		String password = req.getParameter("userPwdEc");
		String autoLogin = req.getParameter("autoLogin");
		Map<String, Object> respMap;
		try {
			respMap = loginHandler.login(req, resp, memberId, password, autoLogin);

			// TODO SSO Login??
			if (env.acceptsProfiles("sso") && APRequestContext.isPC()) {
				// id, pwd, sso_session_key 정보 넘겨야 함
				ssoLoginHandler.login(req);
			}

			return ResponseEntity.ok(respMap);

		} catch (ApiException e) {
			respMap = new HashMap<>();
			
			Map<String, Object> map = e.getAdditional();
			Boolean isLock = (Boolean) map.get("lockThisTime");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
			Date lockReleaseDate;
			try {
				if(map.get("lockReleaseDate") != null) {
					lockReleaseDate = (Date) format.parse((String) map.get("lockReleaseDate"));
	
					if(lockReleaseDate != null) {
						long time = lockReleaseDate.getTime() - System.currentTimeMillis();
						respMap.put("lockReleaseDate", time/1000/60.0);
					}
				}
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			if(isLock != null && isLock) {
				respMap.put("isLock", true);
			} else {
				respMap.put("isLock", false);
			}
			
			e.setAdditional(respMap);
			throw e;
		}
	}
	
	/**
	 * SNS연결 로그인.
	 */
	@SuppressWarnings("unchecked")
	@PostMapping("/doLoginLink")
	public ResponseEntity<?> doLoginLink(HttpServletRequest req, HttpServletResponse resp) {
		ResponseEntity<?> result = doLogin(req, resp);
		if(getMemberSn() == 0) {
			return result;
		}
		String snsCode = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_CODE);
		String snsId = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_ID);
		String accessToken = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_TOKEN);
		PostSnsIf snsIdIf = new PostSnsIf();
		snsIdIf.setSnsId(snsId);
		snsIdIf.setAccessToken(accessToken);
		try {
			SnsIfResult snsResult = apApi.postMemberSns(getMemberSn(), snsCode, snsIdIf);
			if(!snsResult.isResult()) {
				throw error((Map<String, Object>) result.getBody(), HttpStatus.UNAUTHORIZED, "SNSERR", "SNS연계에 실패했습니다. 잠시 후 다시 시도해주세요.");
			}
		} catch(ApiException e) {
			throw e;
		} finally {

			WebUtils.setSessionAttribute(req, SessionKey.SNS_CODE, null);
			WebUtils.setSessionAttribute(req, SessionKey.SNS_ID, null);
			WebUtils.setSessionAttribute(req, SessionKey.SNS_TOKEN, null);
		}
		return result;
	}

    /**
     * sns login process
     *
     * @param snsName
     * @param request 
     * @return
     */
    @RequestMapping("/login/snsloginProcess")
    public ResponseEntity<?> snsLoginProcessM(String snsName, String id, String accessToken, HttpServletRequest request) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		//FIXME accessToken으로 연동여부 확인.
		WebUtils.setSessionAttribute(request, SessionKey.SNS_CODE, snsName);
		WebUtils.setSessionAttribute(request, SessionKey.SNS_ID, id);
		WebUtils.setSessionAttribute(request, SessionKey.SNS_TOKEN, accessToken);
		
		ApSnsLoginInfo snsLoginInfo = new ApSnsLoginInfo();
		snsLoginInfo.setSnsType(snsName);
		snsLoginInfo.setSnsId(id);
		snsLoginInfo.setSnsAccessToken(accessToken);
		try {
			ApMemberLoginReturnInfo resultInfo = apApi.memberSnsLogin(snsLoginInfo);
			APRequestContext.setAccessToken(resultInfo.getAccessToken());
			//보안조치
			SessionUtils.applyFixationProtection(request);
			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
			MemberSession memberSession = getMemberSession();
			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo(apMember.getIncsNo());
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());
			
			try {
				CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
				cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
				cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
				memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}

			try {
				CartSession cartSession = getCartSession();
				if(cartSession.getCartSn() != null && cartSession.getCartSn() != 0)
					cartApi.transferMemberCart(resultInfo.getMemberSn(), cartSession.getCartSn());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}
			
			result.put("sleep", resultInfo.getDormantAcConvertYn());
			if("Y".equals(resultInfo.getDormantAcConvertYn())) {
				result.put("userId", apMember.getMemberId().substring(0, apMember.getMemberId().length() - 2) + "**");
				memberSession.setMember(null);
			} else {
				setMemberSession(memberSession);
			}
			result.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
			if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
				result.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
			}
			setMemberSession(memberSession);
			result.put("isLinked", true);

			// TODO SSO Login ??
			// id(sns_id), sso_session_key 정보 넘겨야 함
			//ssoLoginHandler.login(req);

		} catch(ApiException e) {
			result.put("isLinked", false);
			
		}
		

		return ResponseEntity.ok(result);
    }

	/**
	 * 임직원 인증.
	 */
	@PostMapping("/customer/authEmployee")
	public ResponseEntity<?> authEmployee(String v_userid, String v_pass_word) {

		//PShopResult result = pShopService.userInfoPass(v_userid, ApPasswordEncoder.encryptPassword(v_pass_word));
		PShopResult result = pShopService.userInfoPass(v_userid, "8d2e1db0de88c6785cb1bcf93dbe6a34276440ee24031ec780e91391076bd2558a6a5aaef715d5231404a3c9de02985c4ee36530524e3c14507f47d38c2e9392");
		
		if("SUCC".equals(result.getRsltCd()) && "Y".equals(result.getData().get("v_flag_yn"))) {
			
			MemberSession memberSession = getMemberSession();

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
			cicuemCuInfTotTcVo.setChCd(APConstant.OS_CH_CD);
			cicuemCuInfTotTcVo.setChgChCd(APConstant.OS_CH_CD);
			cicuemCuInfTotTcVo.setLschId(v_userid);
			
			CicuemCuAdtInfTcVo cicuemCuOptiCsTcVo = new CicuemCuAdtInfTcVo();
			cicuemCuOptiCsTcVo.setHqEmpId(v_userid);
			cicuemCuInfTotTcVo.setCicuemCuAdtInfTcVo(cicuemCuOptiCsTcVo);
			
			CicuemCuInfCoOutVo resultVo = amoreAPIService.updatecicuemcuinfrfull(cicuemCuInfTotTcVo);
			
			if(APConstant.RESULT_OK.equals(resultVo.getRsltCd())) {
				memberSession.getMember().setEmployeeYn("Y");
				setMemberSession(memberSession);
				apApi.updateMemberEmployee(getMemberSn(), v_userid);

				// TODO SSO Login??
				// id, pwd, sso_session_key 정보 넘겨야 함
				//ssoLoginHandler.login(req);
			} else {
				throw error(HttpStatus.UNAUTHORIZED, "ERROR32", "임직원 인증 실패");
			}
			
			return ResponseEntity.ok("{}");
		}
		
		throw error(HttpStatus.UNAUTHORIZED, "ERROR32", "임직원 인증 실패");
	}

    @PostMapping("/login/mobileLoginRequest")
    public ResponseEntity<?> mobileLoginRequest(HttpServletRequest request, String custNm, String phoneNumber1, String phoneNumber2, String phoneNumber3) {
    	Map<String, Object> resp = new HashMap<String, Object>();
    	ApMobileAuthRequestInfo requestMobileAuthInfo = new ApMobileAuthRequestInfo();
    	EmbeddableName name = new EmbeddableName();
    	name.setName1(custNm);
		requestMobileAuthInfo.setName(name);
		EmbeddableTel cellPhoneNo = new EmbeddableTel();
		if(phoneNumber3 == null)
			phoneNumber3 = "";
		cellPhoneNo.setPhoneNo(phoneNumber1 + phoneNumber2 + phoneNumber3);
		requestMobileAuthInfo.setCellPhoneNo(cellPhoneNo);
		ApMobileAuthRequestResultInfo result = apApi.requestMobileAuthLogin(requestMobileAuthInfo);
		resp.put("incsNo", result.getMemberSn());
    	return ResponseEntity.ok(resp);
    }

    @PostMapping("/login/mobileLogin")
    public ResponseEntity<?> mobileLogin(HttpServletRequest request, long incsNo, String smsNum) {

    	Map<String, Object> respMap = new HashMap<String, Object>();
    	ApMobileAuthLoginInfo loginInfo = new ApMobileAuthLoginInfo();
    	loginInfo.setMemberSn(incsNo);
    	loginInfo.setAuthKey(smsNum);
    	ApMemberLoginReturnInfo resultInfo =  apApi.mobileAuthLogin(loginInfo);

		APRequestContext.setAccessToken(resultInfo.getAccessToken());

		//보안조치
		SessionUtils.applyFixationProtection(request);

		ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
		CartSession cartSessionn = getCartSession();
		MemberSession memberSession = getMemberSession();
		memberSession.setMember(apMember);
		memberSession.setMember_sn(resultInfo.getMemberSn());
		memberSession.setUser_incsNo(apMember.getIncsNo());
		memberSession.setAccessToken(resultInfo.getAccessToken());
		memberSession.setRefreshToken(resultInfo.getRefreshToken());

		CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
		cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
		try {
			cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
			memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
		}

		try {
			if(cartSessionn.getCartSn() != null && cartSessionn.getCartSn() != 0)
				cartApi.transferMemberCart(resultInfo.getMemberSn(), cartSessionn.getCartSn());
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
		}

		respMap.put("sleep", resultInfo.getDormantAcConvertYn());
		if("Y".equals(resultInfo.getDormantAcConvertYn())) {
			respMap.put("userId", apMember.getMemberId().substring(0, apMember.getMemberId().length() - 2) + "**");
			memberSession.setMember(null);
		} else {
			setMemberSession(memberSession);
		}
		respMap.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
		if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
			respMap.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
		}
    	return ResponseEntity.ok(respMap);

    }

}
