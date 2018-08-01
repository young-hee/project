package kr.ap.comm.config.interceptor;

import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.CombineJsFileLoader;
import kr.ap.comm.support.constants.DisplayChannel;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 전시채널 구분 PC / Mobile
 */
public class DisplayChannelResolver extends HandlerInterceptorAdapter {

    private Logger logger = LoggerFactory.getLogger(getClass());
    private CombineJsFileLoader loader = new CombineJsFileLoader();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		setDisplayChannel(request);

        return super.preHandle(request, response, handler);
    }

    private static boolean isAndroid(HttpServletRequest request) {
		String userAgent = request.getHeader(HttpHeaders.USER_AGENT);
		return userAgent.contains("device=android");
	}

	private static boolean isiOS(HttpServletRequest request) {
		String userAgent = request.getHeader(HttpHeaders.USER_AGENT);
		return userAgent.contains("device=ios");
	}

    private static boolean isMobileDevice(HttpServletRequest request) {
        boolean mobile = false;
        // 1. domain 으로 확인
        String domain = request.getServerName();
        mobile = domain.startsWith("m.") || domain.startsWith("m-");
        if (mobile) {
            return mobile;
        }

        // 2. user-agent 내용으로 확인
        String userAgent = request.getHeader(HttpHeaders.USER_AGENT);
        mobile = userAgent.contains("Mobi");
        if (mobile) {
            return mobile;
        }

        // 3. parameter 로 확인.
        String viewType = request.getParameter("_viewtype_");
        mobile = StringUtils.hasText(viewType) && viewType.equals("mo");
        return mobile;
    }


    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (modelAndView == null) {
            return;
        }

        String viewName = modelAndView.getViewName();
        // skip 'redirect:~'
        if (viewName.startsWith("redirect:")) {
            return;
        }

        resolveViewName(modelAndView, viewName, loader);
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // clear APRequestContext's display channel data
        //APRequestContext.clearDisplayChannel();
    }

	public static void setDisplayChannel(HttpServletRequest request) {
		if (isAndroid(request)) {
			APRequestContext.setDisplayChannel(DisplayChannel.Android);
		} else if (isiOS(request)) {
			APRequestContext.setDisplayChannel(DisplayChannel.iOS);
		} else if (isMobileDevice(request)) {
			APRequestContext.setDisplayChannel(DisplayChannel.Mobile);
		} else {
			APRequestContext.setDisplayChannel(DisplayChannel.PC);
		}
	}

	public static void resolveViewName(ModelAndView mv, String viewName, CombineJsFileLoader loader) {
		switch (APRequestContext.getDisplayChannel()) {
		case PC:
			mv.setViewName("pc/ko/" + viewName);
			break;
		case Mobile:
		case Android:
		case iOS:
			mv.setViewName("mo/ko/" + viewName);
			break;
		default:
			break;
		}

		// put 'combineJs' variable
		Object combineJs = mv.getModelMap().get("combineJs");
		if (combineJs == null) {
			mv.addObject("combineJs", loader.getJsFiles());
		}
	}
}
