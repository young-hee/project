package kr.ap.comm.config.interceptor;

import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.util.CookieUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 지원하는 브라우저 버전 확인
 * <p>
 * <ul>
 *     <li>Internet Explorer : 버전9 이상</li>
 *     <li>Chrome : 버전18 이상</li>
 *     <li>Safari : 버전9 이상</li>
 *     <li>Firefox : 버전30 이상</li>
 * </ul>
 * </p>
 * @author ryan
 */
public class IncompatableBrowserChecker extends HandlerInterceptorAdapter {

    public static String INCOMPATIBLE_BROWSER_AGREE = "incompatible_browser_agree";
    public static String INCOMPATIBLE_BROWSER_URI = "/browserIncompatible";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // PC 에서만 체크
        if (APRequestContext.isMobileDevice() || APRequestContext.isMobileApp()) {
            return true;
        }

        // cookie 에서 '24 시간 동안 다시보지 않기' 체크 내용 확인
        Cookie cookie = CookieUtils.getCookie(request, INCOMPATIBLE_BROWSER_AGREE);
        if (cookie != null) {
            boolean isSkip = Boolean.valueOf(cookie.getValue());
            if (isSkip) {
                return true;
            }
        }

        // 브라우저 및 버전 확인
        if (isIncompatibleBrowser(request.getHeader(HttpHeaders.USER_AGENT))) {
            // 지원하지 않는 브라우저 일경우 안내페이지로 이동
            response.sendRedirect(INCOMPATIBLE_BROWSER_URI);
            return false;
        }

        return true;
    }

    /**
     * 지원하지 않는 브라우저 확인
     * <p>
     * 참고 : <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent">MDN</a>
     * </p>
     * @param userAgent
     */
    public boolean isIncompatibleBrowser(String userAgent) {

        if (StringUtils.isEmpty(userAgent)) {
            return true;
        }

        // IE must contain '; MSIE xyz;', version 10 이하
        if (userAgent.contains("; MSIE ")) {
            // version
            String[] temp = userAgent.split(";");
            String token = null;
            for (String t : temp) {
                if (t.trim().startsWith("MSIE ")) {
                    token = t.trim();
                    break;
                }
            }
            String version = token.replace("MSIE ", "");
            if (Float.valueOf(version) >= 9.0f) {
                return false;
            }
        }
        // IE 11 이상, 'Trident/7.0; rv:11.0'
        else if (userAgent.contains("Trident/") && userAgent.contains("rv:11")) {
            return false;
        }
        // Chrome must contain 'Chrome/xyz', must not contain 'Chromium/xyz'
        else if (userAgent.contains("Chrome/") && !userAgent.contains("Chromium/") && !userAgent.contains("OPR/")) {
            int version = getVersion(userAgent, "Chrome");
            if (version >= 18) {
                return false;
            }
        }
        // Safari must contain 'Safari/xyz', must not contain 'Chrome/xyz or Chromium/xyz'
        else if (userAgent.contains("Safari/") && !(userAgent.contains("Chrome/") || userAgent.contains("Chromium/"))) {
            int version = getVersion(userAgent, "Version");
            if (version >= 9) {
                return false;
            }
        }
        // Firefox must contain 'Firefox/xyz', must not contain 'Seamonkey/xyz'
        else if (userAgent.contains("Firefox/") && !userAgent.contains("Seamonkey/")) {
            int version = getVersion(userAgent, "Firefox");
            if (version >= 30) {
                return false;
            }
        }
        return true;
    }

    private int getVersion(String userAgent, String browserName) {
        Pattern p = Pattern.compile(browserName + "/[\\d]+");
        Matcher m = p.matcher(userAgent);
        String version = null;
        if (m.find()) {
            String match = m.group();
            version = match.substring(match.indexOf("/") + 1);
        }
        return Integer.valueOf(version);
    }
}
