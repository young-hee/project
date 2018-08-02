package kr.ap.comm.config;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.StdDateFormat;

import feign.*;
import feign.Logger.Level;
import feign.codec.ErrorDecoder;
import feign.form.FormEncoder;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;
import feign.okhttp.OkHttpClient;
import kr.ap.comm.support.APRequestContext;
import net.g1project.ecp.api.client.EcpApiClientTarget;
import net.g1project.ecp.api.client.ap.ApApi;
import net.g1project.ecp.api.client.ap.BbsApi;
import net.g1project.ecp.api.client.ap.VerifApi;
import net.g1project.ecp.api.client.basis.MallApi;
import net.g1project.ecp.api.client.offlinestore.StoreApi;
import net.g1project.ecp.api.client.sales.DepositsApi;
import net.g1project.ecp.api.client.order.OrderApi;
import net.g1project.ecp.api.client.sales.*;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.exception.ErrorBody;
import net.g1project.ecp.common.code.ErrorCode;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.http.HttpHeaders;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@Configuration
public class EcpApiClientConfiguration {

	public static final String X_G1ECP_CHANNEL = "X-G1ECP-Channel";
	public static final String X_API_KEY = "X-API-KEY";

    @Value("${platform.frontend.mall-id}")
    private String mallId;

    @Value("${ecp.api.base-url}")
    private String apiBaseUrl;

    @Value("${ecp.api.api-key}")
    private String apiKey;

    @Value("${ecp.api.log-level:FULL}")
	private String logLevel;

    private <T> T createApi(Class<T> apiClass) {
        EcpApiClientTarget<T> target = new EcpApiClientTarget<T>(apiClass, apiBaseUrl, mallId);
        return Feign.builder()
                .client(new OkHttpClient())
                .encoder(new JacksonEncoder(objectMapper()))
                .decoder(new JacksonDecoder(objectMapper()))
                .decode404()
                .errorDecoder(new EcpErrorDecoder())
                .logger(new Logger.JavaLogger())
                .logLevel(getLogLevel())
                .requestInterceptor(new EMTPRequestInterceptor(apiKey))
                .target(target);
    }

    private <T> T createMultipartApi(Class<T> apiClass) {
        EcpApiClientTarget<T> target = new EcpApiClientTarget<T>(apiClass, apiBaseUrl, mallId);
        
        return Feign.builder()
        .encoder(new FormEncoder(new JacksonEncoder(objectMapper())))
        .decoder(new JacksonDecoder(objectMapper()))
        .decode404()
        .errorDecoder(new EcpErrorDecoder())
        .logger(new Logger.JavaLogger())
        .logLevel(getLogLevel())
        .requestInterceptor(new EMTPRequestInterceptor(apiKey))
        .target(target);
    }

    private Level getLogLevel() {
    	return Level.valueOf(logLevel.toUpperCase());
	}

    private ObjectMapper objectMapper;

	private ObjectMapper objectMapper() {
		if (objectMapper == null) {
			objectMapper = 	new ObjectMapper()
				.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
				.setDateFormat(new StdDateFormat());
		}
		return objectMapper;
	}

	public static class EMTPRequestInterceptor implements RequestInterceptor {

		private String apiKey;

		public EMTPRequestInterceptor(String apiKey) {
			this.apiKey = apiKey;
		}
        @Override
        public void apply(RequestTemplate template) {
            template.header(HttpHeaders.ACCEPT_LANGUAGE, "ko");
            template.header(X_G1ECP_CHANNEL, APRequestContext.getDisplayDeviceCh());
            if (StringUtils.hasText(APRequestContext.getAccessToken())) {
				template.header(HttpHeaders.AUTHORIZATION, "Bearer " + APRequestContext.getAccessToken());
			}
			template.header(X_API_KEY, apiKey);
        }
    }

    public static class EcpErrorDecoder extends ErrorDecoder.Default {

        private ObjectMapper mapper = new ObjectMapper();

        @Override
        public Exception decode(String methodKey, Response response) {
            int status = response.status();
            try {
                if (response.body() != null) {
                    String body = Util.toString(response.body().asReader());
                    ErrorBody err = mapper.readValue(body, ErrorBody.class);
                    
                    ApiException exception = new ApiException(status, err.getError(), err.getMessage());
                    exception.setAdditional(err.getAdditional());
                    return exception;
                }
            } catch (Exception e) {
                // ignore
            }
            Exception ex = super.decode(methodKey, response);
            return new ApiException(status, ErrorCode.EAPI001, "", ex);
        }
    }

    @Bean
    public MallApi mallApi() {
        return createApi(MallApi.class);
    }

    @Bean
    public GuideApi guideApi() {
        return createApi(GuideApi.class);
    }
    
    @Bean
    public MemberApi memberApi() {
        return createApi(MemberApi.class);
    }
    
    @Bean
    public TermsApi termsApi() {
        return createApi(TermsApi.class);
    }
    
    @Bean
    public ApApi apApi() {
        return createApi(ApApi.class);
    }

    @Bean
    public BbsApi bbsApi() {
        return createApi(BbsApi.class);
    }

    @Bean
    public FileUploadApi fileUploadApi() {
        return createMultipartApi(FileUploadApi.class);
    }
    
    @Bean
    public StoreApi storeApi() {
        return createApi(StoreApi.class);
    }

    @Bean
	public DisplayApi displayApi() {
		return createApi(DisplayApi.class);
	}
    
    @Bean
    public ProductApi productApi() {
        return createApi(ProductApi.class);
    }

    @Bean
	public ShoppingmarkApi shoppingmarkApi() {
		return createApi(ShoppingmarkApi.class);
	}

    @Bean
    public CartApi cartApi() {
        return createApi(CartApi.class);
    }

    @Bean
    public OrderApi orderApi() {
        return createApi(OrderApi.class);
    }
    
    @Bean
    public KeywordPopupApi keywordPopupApi() {
        return createApi(KeywordPopupApi.class);
    }
    
    @Bean
    public ArticleApi articleApi() {
        return createApi(ArticleApi.class);
    }
    
    @Bean
    public RegulareventApi regulareventApi() {
        return createApi(RegulareventApi.class);
    }
    
    @Bean
    public PointApi pointApi() {
        return createApi(PointApi.class);
    }

    @Bean
	public PlandisplayApi plandisplayApi() { return createApi(PlandisplayApi.class); }

    @Bean
	public CouponApi couponApi() {
		return createApi(CouponApi.class);
	}

	@Bean
	public DepositsApi depositsApi() {	return createApi(DepositsApi.class); }

	@Bean
	public ApplicationsApi applicationsApi() {
		return createApi(ApplicationsApi.class); }

	@Bean
	public VerifApi verifApi() {	return createApi(VerifApi.class); }

    @Bean
    public MessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        messageSource.setBasename("messages/message");
        messageSource.setDefaultEncoding("UTF-8");
        messageSource.setAlwaysUseMessageFormat(false);
        messageSource.setCacheSeconds(0);
        return messageSource;
    }

    @Bean
    public LocaleResolver localeResolver() {
        SessionLocaleResolver resolver = new SessionLocaleResolver();
        resolver.setDefaultLocale(getDefaultLocale());
        return resolver;
    }

    private Locale getDefaultLocale() {
        Locale defaultLocale = null;
        try {
            defaultLocale = new Locale(mallApi().getMalls().getLanguage().getLangCode());
        } catch (Exception e) {
            LoggerFactory.getLogger(getClass()).error(e.getMessage(), e);
            defaultLocale = Locale.getDefault();
        }
        return defaultLocale;
    }

}
