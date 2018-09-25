package kr.ap.emt.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.mxab.thymeleaf.extras.dataattribute.dialect.DataAttributeDialect;

import com.navercorp.lucy.security.xss.servletfilter.XssEscapeServletFilter;
import kr.ap.comm.api.HttpsTrustManager;
import kr.ap.comm.config.filter.MallIdFilter;
import kr.ap.comm.config.interceptor.*;
import kr.ap.comm.config.thymeleaf.APCustomDialect;
import kr.ap.comm.support.breadcrumb.BreadCrumbPostProcessor;
import kr.ap.comm.support.tagging.Pagenames;
import kr.ap.emt.api.pos.POSAPIServiceUtils;
import kr.ap.emt.api.pos.POSApiService;

import kr.ap.emt.config.filter.EmtCharacterEncodingFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.filter.CharacterEncodingFilter;
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
	private Environment env;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 등록한 순서대로 interceptor 적용
		registry.addInterceptor(accessTokenHandlerInterceptor());
        registry.addInterceptor(new DisplayChannelResolver());
        registry.addInterceptor(new IncompatableBrowserChecker())
                .excludePathPatterns(IncompatableBrowserChecker.INCOMPATIBLE_BROWSER_URI);
        registry.addInterceptor(loginInterceptor());
        registry.addInterceptor(new BreadCrumbInterceptor());
        registry.addInterceptor(taggingInfoInterceptor());
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

	@Bean
	public TaggingInfoInterceptor taggingInfoInterceptor() {
    	return new TaggingInfoInterceptor();
	}

	@Bean
	public Pagenames pagenames() {
		Pagenames pagenames = new Pagenames();
		String mallId = env.getProperty("platform.frontend.mall-id");
		try {
			pagenames.initialize(mallId);
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
		}
		return pagenames;
	}

	@Bean
	public CharacterEncodingFilter characterEncodingFilter() {
		CharacterEncodingFilter filter = new EmtCharacterEncodingFilter();
		filter.setEncoding("utf-8");
		filter.setForceEncoding(true);
    	return filter;
	}

	@Bean
	public FilterRegistrationBean lucyXssFilter() {
    	FilterRegistrationBean filter = new FilterRegistrationBean();
    	filter.setFilter(new XssEscapeServletFilter());
    	filter.setOrder(1);
    	filter.addUrlPatterns("/*");
    	return filter;
	}

	@Bean
	public ObjectMapper objectMapper() {
    	ObjectMapper mapper = new ObjectMapper();
    	mapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES, true);
    	return mapper;
	}

	@Bean
	public MallIdFilter mallIdFilter() {
    	return  new MallIdFilter();
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
