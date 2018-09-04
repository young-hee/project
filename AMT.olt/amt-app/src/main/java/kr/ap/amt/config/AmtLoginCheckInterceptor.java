package kr.ap.amt.config;

import com.ap.common.sso.entity.SsoLoginEntity;
import com.pacific.sso.util.SsoUtil;
import com.ufo.common.UFORequest;
import com.ufo.common.utility.CmUtil;
import com.ufo.common.utility.JSPHelper;
import kr.ap.amt.customer.controller.LoginHandler;
import kr.ap.comm.config.interceptor.LoginInterceptor;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.util.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.List;

public class AmtLoginCheckInterceptor extends LoginInterceptor {

	private Logger logger = LoggerFactory.getLogger(getClass());
	private List<String> ssoCheckSkips = Arrays.asList("/error");

	@Autowired
	private Environment env;
	@Autowired
	private LoginHandler loginHandler;
	@Autowired
	private SSOLoginHandler ssoLoginHandler;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) { MemberSession memberSession = SessionUtils.getMemberSession(request);
		// 로그인 상태
		if (memberSession != null && memberSession.getMember() != null) {
			return true;
		}

		if (env.acceptsProfiles("sso")) {
			// SSO skip
			if (shouldSsoSkip(request)) {
				// Local login check
				return super.preHandle(request, response, handler);
			}

			// SSO check
			try {
				ssoCommon(request, response);
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
			}
		}

		return super.preHandle(request, response, handler);
	}

	/**
	 * SSO Session Key 확인
	 */
	private void ssoCommon(HttpServletRequest request, HttpServletResponse response) throws Exception {
		UFORequest reqSSO = JSPHelper.getRequestInfo(request);
		String refererSource = reqSSO.getString("source");

		// ---------------------------------------------------------------------------------------------------
		// SSO DB 제외 초기화 sample code
		// SsoUtil.initDBFilterList(SITEProperty.getProperty("SITE_CD"), "/event /about /eventplatform /sns");
		// ---------------------------------------------------------------------------------------------------

		String siteCd = ssoLoginHandler.getSsoSiteCd();
		SsoLoginEntity ssoLoginEntity = new SsoLoginEntity();
		ssoLoginEntity.siteCd = siteCd;
		ssoLoginEntity.act = "".equals(reqSSO.getString("act")) ? "login" : reqSSO.getString("act");
		ssoLoginEntity.mst.cstmId = CmUtil.nullTrim(reqSSO.getString("cstmId"));
		ssoLoginEntity.mst.pswd = CmUtil.nullTrim(reqSSO.getString("pswd"));
		ssoLoginEntity.sessionKey = reqSSO.getString("sessionKey");
		ssoLoginEntity.ip = request.getRemoteAddr();
		ssoLoginEntity.isLogin = false;

		String SSO_sessionKey = SsoUtil.getSessionKeyStr(request);
		String SSO_CHECK_FL = reqSSO.getString("SSO_CHECK_FL");
		String returnUrl = SsoUtil.getCurrentURL(request);    // return URL
		String SSO_referer = SsoUtil.getReferer(request);    // REFERER URL

		//SsoUtil.println("@@@@@@@@@@@@@@@@@@@@ ver 0523.1150 SSO_sessionKey="+SSO_sessionKey+"  SSO_CHECK_FL="+SSO_CHECK_FL);
		if (logger.isDebugEnabled()) {
			logger.debug("@@@@@@@@@@@@@@@@@@@@ ver 0523.1150 SSO_sessionKey={} SSO_CHECK_FL={}", SSO_sessionKey, SSO_CHECK_FL);
		}

		if ("".equals(SSO_sessionKey)) {
			// session key가 없는경우. 최초 접속인 경우임
			if (!"Y".equals(SSO_CHECK_FL)) {

				String gwSiteCd = env.getProperty("webdb.sso.site-cd", "CMC"); //SITEProperty.getProperty("SITE_CD");
				String gatewayUrl = env.getProperty("webdb.sso.gateway-url"); //SITEProperty.getProperty("SSO_GW_URL");
				Assert.notNull(gatewayUrl, "Please check the property value: 'webdb.sso.gateway-url'.");

				boolean validGW = false;
				boolean isRealBrowser = SsoUtil.isRealBrowser(request);
				if (isRealBrowser) {
					validGW = SsoUtil.validSsoGateway(gwSiteCd, gatewayUrl, request);
				}

				//SsoUtil.println("@@@@@@@@@@@@@@@@ SSOCommon ["+gwSiteCd+"] : gatewayUrl="+gatewayUrl+"  validGW="+validGW+"  isRealBrowser="+isRealBrowser);
				if (logger.isDebugEnabled()) {
					logger.debug("@@@@@@@@@@@@@@@@ SSOCommon [{}] : gatewayUrl={} validGW={} isRealBrowser={}", gwSiteCd, gatewayUrl, validGW, isRealBrowser);
				}

				if (validGW) {
					// GW에서 세션생성
					//SsoUtil.println("@@@@@@@@@@@@@@@@ SSOCommon : GW 사용 @@@@@@");
					StringBuffer responseUrl = new StringBuffer();
					responseUrl.append(gatewayUrl + "/sso/sessioncheck.jsp");
					responseUrl.append("?returnUrl=" + URLEncoder.encode(returnUrl, "UTF-8"));

					// SsoUtil.println("@@@@@@@@@@@@@@@@ sendRedirect to ver1 : "+responseUrl.toString());
					if (logger.isDebugEnabled()) {
						logger.debug("@@@@@@@@@@@@@@@@ SSOCommon : GW 사용 @@@@@@");
						logger.debug("@@@@@@@@@@@@@@@@ sendRedirect to ver1 : {}", responseUrl.toString());
					}

					response.sendRedirect(responseUrl.toString());

				} else {
					// GW 사용불가한 경우
					SsoUtil.println("@@@@@@@@@@@@@@@@ SSOCommon : GW 사용불가 !!!!!");

					SSO_sessionKey = SsoUtil.makeSessionKey(request);
					ssoLoginEntity.sessionKey = SSO_sessionKey;

					SsoUtil.setSessionKeyStr(request, SSO_sessionKey);  //sessionObj.setAttribute("SSO_SESSION_KEY", SSO_sessionKey);
				}
			} else {
				SSO_sessionKey = ssoLoginEntity.sessionKey;
				SsoUtil.setSessionKeyStr(request, SSO_sessionKey); //sessionObj.setAttribute("SSO_SESSION_KEY", SSO_sessionKey);
			}
		} else {
			ssoLoginEntity.sessionKey = SSO_sessionKey;
		}

		//SsoUtil.println("@ Page:"+returnUrl+"  REFERER|"+ SSO_referer+"  source|"+refererSource);
		if (logger.isDebugEnabled()) {
			logger.debug("@ Page: {}  REFERER|{}  source|{}", returnUrl, SSO_referer, refererSource);
		}


		if (!StringUtils.hasText(SSO_sessionKey)) {
			return;
		}

		SsoLoginEntity loginCheckEntity = SsoUtil.isLogin(siteCd, reqSSO, ssoLoginEntity);
		if (loginCheckEntity.isLogin) {
			// TODO SSO 정보로 memberSession 정보 만들기.
			String memberId = loginCheckEntity.mst.cstmId;
			// Map<String, Object> respMap = loginHandler.login(req, res, memberId, password, autoLogin);
		}
	}

	/**
	 * SSO Login 확인 skip 여부
	 * @param request
	 * @return true / false
	 */
	private boolean shouldSsoSkip(HttpServletRequest request) {
		return ssoCheckSkips.contains(request.getRequestURI());
	}
}
