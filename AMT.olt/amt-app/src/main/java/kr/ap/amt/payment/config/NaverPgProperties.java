package kr.ap.amt.payment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Naver-Pg의 설정을 관리한다.
 * @author aki
 */
@Configuration
@ConfigurationProperties
public class NaverPgProperties {
    
	 /**NaverPay**/
    @Value("${payment.naver.clientId}")
    private String naverCid;	//네이버 클라이언트 아이디
    
    @Value("${payment.naver.partnerId}")
    private String naverPartnerId;	//네이버 파트너 아이디
    
    @Value("${payment.naver.clientSecret}")
    private String naverSecret;	//네이버 클라이언트 비밀키
    
    @Value("${payment.naver.mode}")
    private String mode;	//development : 개발모드 , 
    
    @Value("${payment.naver.apiDomain}")
    private String apiDomain;
    
    @Value("${payment.naver.confirmUrl}")
    private String confirmUrl;
    
    @Value("${payment.naver.cancelUrl}")
    private String cancelUrl;

	public String getNaverCid() {
		return naverCid;
	}

	public void setNaverCid(String naverCid) {
		this.naverCid = naverCid;
	}

	public String getNaverPartnerId() {
		return naverPartnerId;
	}

	public void setNaverPartnerId(String naverPartnerId) {
		this.naverPartnerId = naverPartnerId;
	}

	public String getNaverSecret() {
		return naverSecret;
	}

	public void setNaverSecret(String naverSecret) {
		this.naverSecret = naverSecret;
	}

	public String getApiDomain() {
		return apiDomain;
	}

	public void setApiDomain(String apiDomain) {
		this.apiDomain = apiDomain;
	}

	public String getConfirmUrl() {
		return confirmUrl;
	}

	public void setConfirmUrl(String confirmUrl) {
		this.confirmUrl = confirmUrl;
	}

	public String getCancelUrl() {
		return cancelUrl;
	}

	public void setCancelUrl(String cancelUrl) {
		this.cancelUrl = cancelUrl;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}
    
    
    
    
}