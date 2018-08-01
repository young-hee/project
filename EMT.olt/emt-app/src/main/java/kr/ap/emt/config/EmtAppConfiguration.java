package kr.ap.emt.config;

import com.github.mxab.thymeleaf.extras.dataattribute.dialect.DataAttributeDialect;

import kr.ap.comm.api.HttpsTrustManager;
import kr.ap.comm.config.interceptor.*;
import kr.ap.comm.config.thymeleaf.APCustomDialect;
import kr.ap.comm.support.breadcrumb.BreadCrumbPostProcessor;
import kr.ap.emt.api.pos.POSAPIServiceUtils;
import kr.ap.emt.api.pos.POSApiService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import javax.annotation.PostConstruct;

/**
 * Etude App Configuration
 */
@Configuration
public class EmtAppConfiguration extends WebMvcConfigurerAdapter {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Value("${pos.api.base-url}")
    private String baseUrl;
    
    @Autowired
    ApplicationContext context;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 등록한 순서대로 interceptor 적용
		registry.addInterceptor(accessTokenHandlerInterceptor());
        registry.addInterceptor(new DisplayChannelResolver());
        registry.addInterceptor(new IncompatableBrowserChecker())
                .excludePathPatterns(IncompatableBrowserChecker.INCOMPATIBLE_BROWSER_URI);
        registry.addInterceptor(loginInterceptor());
        registry.addInterceptor(new BreadCrumbInterceptor());
    }

    @Bean
    public APCustomDialect apCustomDialect() {
        return new APCustomDialect();
    }

    @Bean
    public DataAttributeDialect dataAttributeDialect() {
        return new DataAttributeDialect();
    }

    @Bean
    public BreadCrumbPostProcessor breadCrumbPostProcessor() {
        return new BreadCrumbPostProcessor();
    }

    @Bean
    public POSApiService posApiService() {
        return POSAPIServiceUtils.createClientProxy(EmtAppConfiguration.class.getClassLoader(), POSApiService.class, baseUrl, false);
    }

    @Bean
	public LoginInterceptor loginInterceptor() {
    	return new LoginInterceptor();
	}

    @Bean
	public AccessTokenHandlerInterceptor accessTokenHandlerInterceptor() {
    	return new AccessTokenHandlerInterceptor();
	}

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/browserIncompatible").setViewName("error/browser-incompatible");
    }

    @PostConstruct
	public void init() {
		HttpsTrustManager.allowAllSSL();
	}
}
