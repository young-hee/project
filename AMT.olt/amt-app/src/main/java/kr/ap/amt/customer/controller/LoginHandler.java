package kr.ap.amt.customer.controller;

import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.cart.CartSession;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.util.CookieUtils;
import kr.ap.comm.util.SessionUtils;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.ap.ap.ApLoginInfo;
import net.g1project.ecp.api.model.ap.ap.ApMember;
import net.g1project.ecp.api.model.ap.ap.ApMemberLoginReturnWithAutoLoginInfo;
import net.g1project.ecp.api.model.ap.ap.ApSsoLoginInfo;
import org.apache.commons.lang3.time.DateFormatUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class LoginHandler extends AbstractController {

	public Map<String, Object> login(HttpServletRequest request, HttpServletResponse response,
					  String memberId, String password, String autoLogin) throws ApiException {

		Map<String, Object> respMap = new HashMap<>();
		ApLoginInfo loginInfo = new ApLoginInfo();
		loginInfo.setMemberId(memberId);
		loginInfo.setMemberPassword(password);

		ApMemberLoginReturnWithAutoLoginInfo resultInfo = apApi.memberLogin(loginInfo);
		makeMemberSession(request, response, autoLogin, respMap, resultInfo);

		return respMap;
	}

	private void makeMemberSession(HttpServletRequest request, HttpServletResponse response, String autoLogin, Map<String, Object> respMap, ApMemberLoginReturnWithAutoLoginInfo resultInfo) {
		APRequestContext.setAccessToken(resultInfo.getAccessToken());
		ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());

		MemberSession memberSession = getMemberSession();
		memberSession.setMember(apMember);
		memberSession.setMember_sn(resultInfo.getMemberSn());
		memberSession.setUser_incsNo(apMember.getIncsNo());
		memberSession.setAccessToken(resultInfo.getAccessToken());
		memberSession.setRefreshToken(resultInfo.getRefreshToken());
		memberSession.setAutoLoginToken(resultInfo.getAutoLoginToken());

		CartSession cartSession = getCartSession();
		cartSession.setCartSn(0L);

		try {
			if(cartSession.getCartSn() != null && cartSession.getCartSn() != 0)
				cartApi.transferMemberCart(resultInfo.getMemberSn(), cartSession.getCartSn());
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
			CookieUtils.addCookie(response, CookieKey.AUTO_LOGIN, resultInfo.getAutoLoginToken(), (int)(time/1000));

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
		//보안조치
		SessionUtils.applyFixationProtection(request);
	}

	public Map<String, Object> ssoLogin(HttpServletRequest request, HttpServletResponse response,String memberId, String ssoSessionKey) {
		Map<String, Object> respMap = new HashMap<>();

		ApSsoLoginInfo loginInfo = new ApSsoLoginInfo();
		loginInfo.setMemberId(memberId);
		loginInfo.setSsoSessionKey(ssoSessionKey);
		ApMemberLoginReturnWithAutoLoginInfo resultInfo = apApi.memberSsoLogin(loginInfo);
		makeMemberSession(request, response, "", respMap, resultInfo);

		return respMap;
	}
}
