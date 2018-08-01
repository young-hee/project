package kr.ap.comm.config;

import kr.ap.comm.api.APIServiceUtils;
import kr.ap.comm.api.AmoreAPIService;
import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.api.WebDBAPIServiceUtils;
import kr.ap.comm.api.WebDBApiService;
import kr.ap.comm.api.impl.CaptchaAPIImpl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmoreAPIConfiguration {

    @Value("${amore.api.base-url}")
    private String baseUrl;
    @Value("${webdb.api.base-url}")
    private String webDBbaseUrl;
	
	@Bean
	public AmoreAPIService amoreAPIService() {
	 	AmoreAPIService service = APIServiceUtils.createClientProxy(APIServiceUtils.class.getClassLoader()
			, AmoreAPIService.class, baseUrl, false);
	 	return service;
	}

	@Bean
	public CaptchaAPI captchaAPIService() {
		return new CaptchaAPIImpl();
	}
	@Bean
	public WebDBApiService webDBApiService() {
		WebDBApiService service = WebDBAPIServiceUtils.createClientProxy(WebDBApiService.class.getClassLoader()
			, WebDBApiService.class, webDBbaseUrl, false);
	 	return service;
	}
}
