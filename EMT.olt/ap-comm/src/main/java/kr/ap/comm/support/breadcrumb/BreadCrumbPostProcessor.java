package kr.ap.comm.support.breadcrumb;

import kr.ap.comm.config.interceptor.PageTitle;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.core.annotation.AnnotationUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.ReflectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.lang.reflect.Method;

/**
 * BreadCrumbPostProcessor
 * <p>
 *     <code>@BreadCrumb</code> 이 선언된 메소드들의 bread crumb 정보를 생성
 * </p>
 */
public class BreadCrumbPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        // @Controller 에 대해서만 수행
        Controller controller = AnnotationUtils.findAnnotation(bean.getClass(), Controller.class);
        if (controller == null) {
            return bean;
        }

        ReflectionUtils.doWithMethods(bean.getClass(), new ReflectionUtils.MethodCallback() {
            @Override
            public void doWith(Method method) throws IllegalArgumentException, IllegalAccessException {
                BreadCrumb breadCrumb = AnnotationUtils.findAnnotation(method, BreadCrumb.class);
                if (breadCrumb == null) {
                    return;
                }

                // bread crumb 정보 생성
                String screenId = breadCrumb.value();
                String uri = getUri(method);
                PageTitle pageTitle = AnnotationUtils.findAnnotation(method, PageTitle.class);
                String title = pageTitle.title();

                // map 에 추가
                BreadCrumbs.add(screenId, title, uri);
            }
        });
        return bean;
    }

    private String getUri(Method method) {
        RequestMapping mapping = AnnotationUtils.findAnnotation(method, RequestMapping.class);
        String[] uri  = mapping.value();
        if (uri.length == 0) {
            GetMapping getMapping = AnnotationUtils.findAnnotation(method, GetMapping.class);
            if (getMapping == null) {
				PostMapping postMapping = AnnotationUtils.findAnnotation(method, PostMapping.class);
				uri = postMapping.value();
			} else {
            	uri = getMapping.value();
			}
		}

        return uri[0];
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        return bean;
    }
}
