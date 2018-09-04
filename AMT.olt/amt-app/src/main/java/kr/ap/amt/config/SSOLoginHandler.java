package kr.ap.amt.config;

import com.ap.common.sso.SsoLoginWB;
import com.ap.common.sso.entity.SsoLoginEntity;
import com.pacific.sso.util.SsoUtil;
import com.ufo.common.UFORequest;
import com.ufo.common.UFOResult;
import com.ufo.common.utility.JSPHelper;
import com.ufo.member.UFOMemberMgmtWB;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.util.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;

public class SSOLoginHandler {

	private Logger logger = LoggerFactory.getLogger(getClass());

	public static final String SSO_SITE_CD = "webdb.sso.site-cd";
	public static final String SSO_GATEWAY_URL = "webdb.sso.gateway-url";

	@Autowired
	private Environment env;

	/**
	 * SSO Login 처리
	 * <p>
	 *     SSO WebDB 에 로그인 정보를 생성
	 * </p>
	 * @param request
	 */
	public void login(HttpServletRequest request) {
		try {

			String siteCd = getSsoSiteCd();
			UFORequest ssoReq = JSPHelper.getRequestInfo(request);
			SsoLoginEntity ssoLoginEntity = new SsoLoginEntity();

			ssoLoginEntity.siteCd = siteCd;
			ssoLoginEntity.act = "login";
			ssoLoginEntity.ip = request.getRemoteAddr();
			// TODO sso_session_key, cstmId, pswd 정보 받아오기
			ssoLoginEntity.sessionKey = SsoUtil.getSessionKeyStr(request);
			ssoLoginEntity.mst.cstmId = request.getParameter("chcsNo");
			ssoLoginEntity.mst.pswd = request.getParameter("userPwdEc");

			ssoReq.put("newJoinFl", "Y");
			ssoReq.put("SSO_LOGIN_INFO", ssoLoginEntity);

			SsoLoginWB ssoLoginWB = new SsoLoginWB(siteCd);
			UFOResult result = ssoLoginWB.getLoginSession(ssoReq);

			String flag = (String) result.get("FLAG");
			String message = (String) result.get("MESG");

			// 로그인 실패 flag != 0
			if (StringUtils.hasText(flag)) {
				if (!flag.equals("0")) {
					logger.warn("SSO Login result flag : {}", flag);
					logger.warn("SSO Login result message : {}", message);
				} else {
					logger.debug("SSO Login result flag : {}", flag);
				}
			} else {
				SsoLoginEntity resultEntity = (SsoLoginEntity) result.get("SSO_CSTMINFO");
				logger.debug("SSO Login result flag : {}, isLogin: {}", resultEntity.FLAG, resultEntity.isLogin);
			}

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	/**
	 * SSO Logout 처리
	 * @param request
	 */
	public void logout(HttpServletRequest request, String memberId) {
		try {

			String siteCd = getSsoSiteCd();
			SsoLoginWB ssoLoginWB = new SsoLoginWB(siteCd);
			UFORequest ssoReq = new UFORequest(request);
			SsoLoginEntity ssoLoginEntity = new SsoLoginEntity();

			ssoLoginEntity.siteCd = siteCd;
			ssoLoginEntity.act = "logout";
			ssoLoginEntity.ip = request.getRemoteAddr();
			ssoLoginEntity.sessionKey = SsoUtil.getSessionKeyStr(request);
			ssoLoginEntity.mst.cstmId = memberId;

			ssoReq.put("newJoinFl", "Y");
			ssoReq.put("SSO_LOGIN_INFO", ssoLoginEntity);
			ssoReq.put("siteCd", siteCd);

			UFOResult result = ssoLoginWB.getLoginSession(ssoReq);

			String flag = (String) result.get("FLAG");
			if (StringUtils.hasText(flag)) {
				if (!flag.equals("0")) {
					logger.warn("SSO Login result flag : {}", flag);
					logger.warn("SSO Login result message : {}", result.get("MESG"));
				} else {
					logger.debug("SSO Login result flag : {}", flag);
				}
			}

			UFOMemberMgmtWB ufoMemberMgmtWB = new UFOMemberMgmtWB(ssoReq);
			ufoMemberMgmtWB.logoutSiteMember(ssoReq);

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	public String getSsoSiteCd() {
		return env.getProperty(SSO_SITE_CD, "CMC");
	}

	public String getGatewayUrl() {
		String gatewayUrl = env.getProperty(SSO_GATEWAY_URL);
		Assert.notNull(gatewayUrl, String.format("Please check the property and value: '%s'.", SSO_GATEWAY_URL));
		return gatewayUrl;
	}
}
