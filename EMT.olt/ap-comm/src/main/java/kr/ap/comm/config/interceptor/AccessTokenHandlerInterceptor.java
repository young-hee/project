package kr.ap.comm.config.interceptor;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.JwtUtils;
import net.g1project.ecp.api.client.ap.ApApi;
import net.g1project.ecp.api.model.ap.ap.RefreshTokenInfo;
import net.g1project.ecp.api.model.ap.ap.RefreshTokenResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Access Token 값을 APRequestContext 에 설정
 *
 * @author ryan
 */
public class AccessTokenHandlerInterceptor extends HandlerInterceptorAdapter {

	public static final String G1ECP_MALL_ID = "X-G1ECP-MallId";

	@Autowired
	private Environment env;
	@Autowired
	private ApApi apApi;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		// Login session 에서 access token 값을 가져와서 설정
		MemberSession memberSession = (MemberSession) WebUtils.getSessionAttribute(request, SessionKey.LOGIN_USER);
		if (memberSession != null && StringUtils.hasText(memberSession.getAccessToken())) {
			String accessToken = memberSession.getAccessToken();
			if (JwtUtils.isValidToken(accessToken)) {
				APRequestContext.setAccessToken(accessToken);
			} else {
				// refresh_token 을 이용해서 access_token 재발급
				refreshAccessToken(request, memberSession);
			}
		} else {
			if (StringUtils.hasText(APRequestContext.getAccessToken())) {
				APRequestContext.clearAccessToken();
			}
		}

		return true;
	}

	private void refreshAccessToken(HttpServletRequest request, MemberSession memberSession) {
		// call refresh access token
		String refreshToken = memberSession.getRefreshToken();
		RefreshTokenInfo refreshTokenInfo = new RefreshTokenInfo();
		refreshTokenInfo.setRefreshToken(refreshToken);
		APRequestContext.clearAccessToken();
		RefreshTokenResult result = apApi.refreshToken(refreshTokenInfo);

		// 갱신된 access token 으로 교체
		memberSession.setAccessToken(result.getAccessToken());
		// redis 에 저장하기 위해 setSessionAttribute 호출
		WebUtils.setSessionAttribute(request, SessionKey.LOGIN_USER, memberSession);

		APRequestContext.setAccessToken(result.getAccessToken());
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
		//APRequestContext.clearAccessToken();
	}
}
