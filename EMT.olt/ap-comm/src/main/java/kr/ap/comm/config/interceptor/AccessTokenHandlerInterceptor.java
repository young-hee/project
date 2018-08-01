package kr.ap.comm.config.interceptor;

import com.fasterxml.jackson.databind.JsonNode;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;
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
	private RestTemplate template = new RestTemplate();

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
				refreshAccessToken(memberSession);
			}
		} else {
			if (StringUtils.hasText(APRequestContext.getAccessToken())) {
				APRequestContext.setAccessToken(null);
			}
		}

		return true;
	}

	private void refreshAccessToken(MemberSession memberSession) {
		// endpoint 구성
		String refreshToken = memberSession.getRefreshToken();
		String domain = env.getProperty("ecp.api.base-url");
		String endpoint = domain + "/oauth/token";

		// http header 설정
		HttpHeaders headers = new HttpHeaders();
		headers.set(G1ECP_MALL_ID, "M02");
		// Client Basic 인증
		headers.set(HttpHeaders.AUTHORIZATION, "Basic Y2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=");
		headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

		// parameter 설정
		MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
		params.set("grant_type", "refresh_token");
		params.set("refresh_token", refreshToken);

		HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(params, headers);

		// token 재발급 요청
		ResponseEntity<String> responseEntity = template.postForEntity(endpoint, requestEntity, String.class);
		String refreshedAccessToken = getAccessToken(responseEntity.getBody());

		// 갱신된 access token 으로 교체
		memberSession.setAccessToken(refreshedAccessToken);
		APRequestContext.setAccessToken(refreshedAccessToken);
	}

	private String getAccessToken(String json) {
		JsonNode node = JwtUtils.readTree(json);
		return node.get("access_token").asText();
	}

}
