package kr.ap.amt.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mxab.thymeleaf.extras.dataattribute.dialect.DataAttributeDialect;

import kr.ap.amt.api.pshop.PShopService;
import kr.ap.amt.api.pshop.PShopServiceImpl;
import kr.ap.comm.config.interceptor.*;
import kr.ap.comm.config.thymeleaf.APCustomDialect;
import kr.ap.comm.support.breadcrumb.BreadCrumbPostProcessor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * App Configuration
 */
@Configuration
public class AmtAppConfiguration extends WebMvcConfigurerAdapter {

    private Logger logger = LoggerFactory.getLogger(getClass());

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 등록한 순서대로 interceptor 적용
        registry.addInterceptor(new AccessTokenHandlerInterceptor());
        registry.addInterceptor(new DisplayChannelResolver());
        registry.addInterceptor(new IncompatableBrowserChecker())
                .excludePathPatterns(IncompatableBrowserChecker.INCOMPATIBLE_BROWSER_URI);
        registry.addInterceptor(new LoginInterceptor());
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
    public PShopService pShopService() {
    	return new PShopServiceImpl();
    }

    @Bean
	public ObjectMapper objectMapper() {
    	return new ObjectMapper();
	}

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/browserIncompatible").setViewName("error/browser-incompatible");
    }
}
