package kr.ap.amt.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mxab.thymeleaf.extras.dataattribute.dialect.DataAttributeDialect;
import kr.ap.amt.api.pshop.PShopService;
import kr.ap.amt.api.pshop.PShopServiceImpl;
import kr.ap.amt.customer.controller.LoginHandler;
import kr.ap.amt.customer.controller.SSOLoginHandler;
import kr.ap.comm.config.filter.MallIdFilter;
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
 * APMall App Configuration
 */
@Configuration
public class AmtAppConfiguration extends WebMvcConfigurerAdapter {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		// 등록한 순서대로 interceptor 적용
		registry.addInterceptor(accessTokenHandlerInterceptor());
		registry.addInterceptor(new DisplayChannelResolver());
		registry.addInterceptor(new IncompatableBrowserChecker())
			.excludePathPatterns(IncompatableBrowserChecker.INCOMPATIBLE_BROWSER_URI);
		registry.addInterceptor(loginCheckInterceptor());
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

	@Bean
	public AmtLoginCheckInterceptor loginCheckInterceptor() {
		return new AmtLoginCheckInterceptor();
	}

	@Bean
	public LoginHandler loginHandler() {
		return new LoginHandler();
	}

	@Bean
	public SSOLoginHandler ssoLoginHandler() {
		return new SSOLoginHandler();
	}

	@Bean
	public MallIdFilter mallIdFilter() {
		return new MallIdFilter();
	}

	@Bean
	public AccessTokenHandlerInterceptor accessTokenHandlerInterceptor() {
		return new AccessTokenHandlerInterceptor();
	}

	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/browserIncompatible").setViewName("error/browser-incompatible");
	}
}
