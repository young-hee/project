package kr.ap.comm.config.interceptor;

import kr.ap.comm.api.AmoreAPIService;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.support.constants.PathConstants;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.CookieUtils;
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

import javax.servlet.ServletException;
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

    private static final List<String> CHECK_LOGIN_URL = new ArrayList<String>();
    static {
        CHECK_LOGIN_URL.add(PathConstants.MYPAGE);
        CHECK_LOGIN_URL.add(PathConstants.CS_INQUIRY);
        CHECK_LOGIN_URL.add(PathConstants.DISPLAY_SHOPPING_HISTORY);
        CHECK_LOGIN_URL.add(PathConstants.DISPLAY_STORE_REVIEW_WRITE);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws ServletException {

		HttpSession session = request.getSession();
		MemberSession memberSession = (MemberSession) session.getAttribute(SessionKey.LOGIN_USER);
		if (memberSession == null || memberSession.getMember() == null) {
			
			Cookie token = CookieUtils.getCookie(request, CookieKey.AUTO_LOGIN);
			
			if(token != null) {
				String autoLoginToken = token.getValue();
				
				ApAutoLoginInfo autoLoginInfo = new ApAutoLoginInfo();
				autoLoginInfo.setAutoLoginToken(autoLoginToken);
				
				try {
				
					ApMemberLoginReturnInfo resultInfo = apApi.memberAutoLogin(autoLoginInfo);
					APRequestContext.setAccessToken(resultInfo.getAccessToken());
					ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
		
					if(memberSession == null)
						memberSession = new MemberSession();
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
					e.printStackTrace();
				}
			}


			if (memberSession == null || memberSession.getMember() == null) {
				
				try {
					String uri = request.getRequestURI();

					String reqLogin = request.getParameter("isRequiredLogin");
					boolean isRequiredLogin = "true".equals(reqLogin);
					if (isRequiredLogin || checkLoginUri(uri)) {
	
						boolean isFragment = ((HandlerMethod)handler).getMethod().isAnnotationPresent(FragmentPage.class);
			            if(isFragment) {
		                    response.sendRedirect(request.getContextPath() + "/error/error-02");
			            	return false;
			            }
						
						// 'returnUrl' parameter 우선.
						String returnUrl = request.getParameter("returnUrl");
						if (StringUtils.hasText(returnUrl)) {
							uri = returnUrl;
						} else if(request.getQueryString() != null) {
		                	uri += "?" + request.getQueryString();
						}
						if("POST".equals(request.getMethod().toUpperCase())) {
							Map<String, String[]> paramlist = request.getParameterMap();
							Map<String, String[]> map2 = new HashMap<String, String[]>();
							map2.putAll(paramlist);
							WebUtils.setSessionAttribute(request, SessionKey.LOGIN_POST_DATA, map2);
							
						}
						
						WebUtils.setSessionAttribute(request, SessionKey.LOGIN_REDIRECT_URI, uri);
	                    response.sendRedirect(request.getContextPath() + "/login");
	                    return false;
	                }
	            } catch (IOException e) {
	                logger.error(e.getMessage(), e);
	            }
			}
        }

        return true;
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

    private boolean checkLoginUri(String uri) {
        Optional<String> opt = CHECK_LOGIN_URL.stream().filter(l -> uri.startsWith(l)).findAny();
        if (opt.isPresent()) {
            return true;
        }
        return false;
    }

}
