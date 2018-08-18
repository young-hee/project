package kr.ap.amt.customer.controller;

import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.CookieUtils;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.ap.ap.*;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginRestController extends AbstractController {

	/**
	 * 로그인.
	 */
	@PostMapping("/doLogin")
	public ResponseEntity<?> doLogin(HttpServletRequest req, HttpServletResponse resp) {
		String memberId = req.getParameter("chcsNo");
		String password = req.getParameter("userPwdEc");
		String autoLogin = req.getParameter("autoLogin");
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			ApLoginInfo loginInfo = new ApLoginInfo();
			loginInfo.setMemberId(memberId);
			loginInfo.setMemberPassword(password);
			
			ApMemberLoginReturnWithAutoLoginInfo resultInfo = apApi.memberLogin(loginInfo);
			APRequestContext.setAccessToken(resultInfo.getAccessToken());
			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
			
			MemberSession memberSession = getMemberSession();
			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo(apMember.getIncsNo());
			memberSession.setCartSn(0L);
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());
			memberSession.setAutoLoginToken(resultInfo.getAutoLoginToken());
			
			try {
				if(memberSession.getCartSn() != null && memberSession.getCartSn() != 0)
					cartApi.transferMemberCart(resultInfo.getMemberSn(), memberSession.getCartSn());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
			try {
				cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
				memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}
			
			memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());

			if("on".equals(autoLogin)) {
				Date date = resultInfo.getAutoLoginTokenExpireDt();
				long time = date.getTime() - System.currentTimeMillis();
				CookieUtils.addCookie(resp, CookieKey.AUTO_LOGIN, resultInfo.getAutoLoginToken(), (int)(time/1000));

			}
			respMap.put("sleep", resultInfo.getDormantAcConvertYn());
			if("Y".equals(resultInfo.getDormantAcConvertYn())) {
				respMap.put("userId", apMember.getMemberId().substring(0, apMember.getMemberId().length() - 2) + "**");
				memberSession.setMember(null);
			}
			respMap.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
			if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
				respMap.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
			}
			
			setMemberSession(memberSession);
			return ResponseEntity.ok(respMap);

		} catch (ApiException e) {
			
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
				throw error((Map<String, Object>) result.getBody(), HttpStatus.SERVICE_UNAVAILABLE, "SNSERR", "SNS연계에 실패했습니다. 잠시 후 다시 시도해주세요.");
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
				if(memberSession.getCartSn() != null && memberSession.getCartSn() != 0)
					cartApi.transferMemberCart(resultInfo.getMemberSn(), memberSession.getCartSn());
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
		} catch(ApiException e) {
			result.put("isLinked", false);
			
		}
		

		return ResponseEntity.ok(result);
    }
}
