package kr.ap.comm.config.interceptor;

import kr.ap.comm.api.AmoreAPIService;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.support.constants.PathConstants;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.CookieUtils;
import kr.ap.comm.util.SessionUtils;
import net.g1project.ecp.api.client.ap.ApApi;
import net.g1project.ecp.api.model.ap.ap.ApAutoLoginInfo;
import net.g1project.ecp.api.model.ap.ap.ApMember;
import net.g1project.ecp.api.model.ap.ap.ApMemberLoginReturnInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.*;

public class LoginInterceptor extends HandlerInterceptorAdapter {

    private final Logger logger = LoggerFactory.getLogger(getClass());

    @Autowired
    protected ApApi apApi;
    @Autowired
    protected AmoreAPIService amoreAPIService;

    private static final List<String> CHECK_LOGIN_URL = new ArrayList<>();
    static {
        CHECK_LOGIN_URL.add(PathConstants.MYPAGE);
        CHECK_LOGIN_URL.add(PathConstants.CS_INQUIRY);
        CHECK_LOGIN_URL.add(PathConstants.DISPLAY_SHOPPING_HISTORY);
        CHECK_LOGIN_URL.add(PathConstants.DISPLAY_STORE_REVIEW_WRITE);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {

		MemberSession memberSession = SessionUtils.getMemberSession(request);
		if (memberSession.getMember() == null) {

			// 자동로그인 사용
			Optional<String> autoLoginToken = getAutoLoginToken(request);
			if (autoLoginToken.isPresent()) {
				ApAutoLoginInfo autoLoginInfo = new ApAutoLoginInfo();
				autoLoginInfo.setAutoLoginToken(autoLoginToken.get());

				makeAutoLoginMemberSession(request, memberSession, autoLoginInfo);

				return true;
			}

			// 로그인이 필요한 페이지 로그인 페이지로 이동
			try {
				String uri = request.getRequestURI();

				String reqLogin = request.getParameter("isRequiredLogin");
				boolean isRequiredLogin = "true".equals(reqLogin);
				if (isRequiredLogin || checkLoginUri(uri)) {

					boolean isFragment = ((HandlerMethod)handler).getMethod().isAnnotationPresent(FragmentPage.class);
					if (isFragment) {
						// Page Not Found error page
						response.sendRedirect(request.getContextPath() + pageNotFoundError());
						return false;
					}

					// 'returnUrl' parameter 우선.
					String returnUrl = request.getParameter("returnUrl");
					if (StringUtils.hasText(returnUrl)) {
						uri = returnUrl;
					} else if(request.getQueryString() != null) {
						uri += "?" + request.getQueryString();
					}

					if ("POST".equals(request.getMethod().toUpperCase())) {
						Map<String, String[]> paramlist = request.getParameterMap();
						Map<String, String[]> map2 = new HashMap<>();
						map2.putAll(paramlist);
						WebUtils.setSessionAttribute(request, SessionKey.LOGIN_POST_DATA, map2);
					}

					// login 이후 이동할 uri session 에 저장.
					WebUtils.setSessionAttribute(request, SessionKey.LOGIN_REDIRECT_URI, uri);

					// Login 페이지로 redirect
					response.sendRedirect(request.getContextPath() + getLoginUri());
					return false;
				}
			} catch (IOException e) {
				logger.error(e.getMessage(), e);
			}
        }

        return true;
    }

	protected void makeAutoLoginMemberSession(HttpServletRequest request, MemberSession memberSession, ApAutoLoginInfo autoLoginInfo) {
		try {

			ApMemberLoginReturnInfo resultInfo = apApi.memberAutoLogin(autoLoginInfo);
			APRequestContext.setAccessToken(resultInfo.getAccessToken());
			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());

			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo(apMember.getIncsNo());
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
			cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);

			memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());

			WebUtils.setSessionAttribute(request, SessionKey.LOGIN_USER, memberSession);
		} catch(Exception e) {
			logger.error(e.getMessage(), e);
		}
	}

	@Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
            throws Exception {
        super.afterCompletion(request, response, handler, ex);
    }

    protected Optional<String> getAutoLoginToken(HttpServletRequest request) {
    	Cookie autoLoginCookie = CookieUtils.getCookie(request, CookieKey.AUTO_LOGIN);
    	if (autoLoginCookie != null) {
    		return Optional.of(autoLoginCookie.getValue());
		}
		return Optional.empty();
	}

	protected String getLoginUri() {
    	return "/login";
	}

	protected String pageNotFoundError() {
    	return "/error/error-02";
	}

	protected MemberSession getMemberSession(HttpServletRequest request) {
		HttpSession session = request.getSession();
		return (MemberSession) session.getAttribute(SessionKey.LOGIN_USER);
	}

    protected boolean checkLoginUri(String uri) {
        boolean opt = CHECK_LOGIN_URL.stream().anyMatch(uri::startsWith);
        return opt;
    }

}
