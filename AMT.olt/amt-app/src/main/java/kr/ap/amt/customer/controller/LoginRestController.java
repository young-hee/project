package kr.ap.amt.customer.controller;

import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.SessionKey;
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
			
			if(resultInfo == null) {
				return error(respMap, HttpStatus.SERVICE_UNAVAILABLE, "EAPI001", "아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
			}
			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
			
			MemberSession memberSession = getMemberSession();
			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo(apMember.getIncsNo());
			memberSession.setCartSn(0L);
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());
			memberSession.setAutoLoginToken(resultInfo.getAutoLoginToken());

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
			cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
			
			memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());
			
			if("on".equals(autoLogin)) {
				/*LoginTicket ticket = loginService.createLoginTicket(member);
				CookieUtils.addCookie(resp, CookieKey.AUTO_LOGIN, ticket.getLoginTicket(), 3600);*/
			}
			respMap.put("sleep", resultInfo.getDormantAcConvertYn());
			if("Y".equals(resultInfo.getDormantAcConvertYn())) {
				respMap.put("message", getMessage("customer.login.sleepMember", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy년MM월")));
			}
			respMap.put("old", false);//FIXME 구회원 여부.
			respMap.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
			if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
				respMap.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
			}
			return ResponseEntity.ok(respMap);

		} catch (ApiException e) {
			return error(respMap, e);
		}
	}
	
	/**
	 * SNS연결 로그인.
	 */
	@SuppressWarnings("unchecked")
	@PostMapping("/doLoginLink")
	public ResponseEntity<?>  doLoginLink(HttpServletRequest req, HttpServletResponse resp) {
		ResponseEntity<?> result = doLogin(req, resp);
		if(getMemberSn() == null) {
			return result;
		}
		String snsCode = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_CODE);
		String snsId = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_ID);
		String accessToken = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_TOKEN);
		PostSnsIf snsIdIf = new PostSnsIf();
		snsIdIf.setSnsId(snsId);
		snsIdIf.setAccessToken(accessToken);
		SnsIfResult snsResult = apApi.postMemberSns(getMemberSn(), snsCode, snsIdIf);
		if(!snsResult.isResult()) {
			return error((Map<String, Object>) result.getBody(), HttpStatus.SERVICE_UNAVAILABLE, "SNSERR", "SNS연계에 실패했습니다. 잠시 후 다시 시도해주세요.");
		}
		WebUtils.setSessionAttribute(req, SessionKey.SNS_CODE, null);
		WebUtils.setSessionAttribute(req, SessionKey.SNS_ID, null);
		WebUtils.setSessionAttribute(req, SessionKey.SNS_TOKEN, null);
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
			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
			MemberSession memberSession = getMemberSession();
			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo("200002192");
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());

			result.put("sleep", resultInfo.getDormantAcConvertYn());
			if("Y".equals(resultInfo.getDormantAcConvertYn())) {
				result.put("message", getMessage("customer.login.sleepMember", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy년MM월")));
			}
			result.put("old", false);//FIXME 구회원 여부.
			result.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
			if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
				result.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
			}
			result.put("isLinked", true);
		} catch(ApiException e) {
			result.put("isLinked", false);
			
		}
		

		return ResponseEntity.ok(result);
    }
}
