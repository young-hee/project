package kr.ap.comm.config.interceptor;

import kr.ap.comm.support.breadcrumb.BreadCrumb;
import kr.ap.comm.support.breadcrumb.BreadCrumbs;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * BreadCrumbInterceptor
 * <p>
 * Controller 에서 <code>@BreadCrumb</code> 을 선언한 페이지에 breadcrumb 정보를 생성해서 넘겨준다.
 * </p>
 * @author ryan
 */
public class BreadCrumbInterceptor extends HandlerInterceptorAdapter {

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        if (handler instanceof  HandlerMethod) {

            PageTitle title = ((HandlerMethod)handler).getMethod().getAnnotation(PageTitle.class);
            if(title != null) {
                modelAndView.getModel().put("pageTitle", title.title());
                modelAndView.getModel().put("menuId", title.menuId());
                modelAndView.getModel().put("subMenuId", title.subMenuId());
            }

            BreadCrumb breadCrumb = ((HandlerMethod) handler).getMethod().getAnnotation(BreadCrumb.class);
            if (breadCrumb != null) {
                List<BreadCrumbs.BreadCrumb> breadCrumbs = BreadCrumbs.getBreadCrumbs(breadCrumb.value());
                // breadCrumbs 에 대한 처리는 'contents-page-title.html' 에서
                modelAndView.addObject("breadCrumbs", breadCrumbs);
            }
        }
    }
}
