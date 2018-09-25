package kr.ap.amt.payment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * KRP-Pg의 설정을 관리한다.
 * @author aki
 */
@Configuration
@ConfigurationProperties
public class KrpPgProperties {
    
	@Value("${payment.krp.mid}")
    private String krpMid;	//KRP Mid
    
    @Value("${payment.krp.secretKey}")
    private String krpSecretKey;	//KRP SecretKey
    
    @Value("${payment.krp.requestUrl}")
    private String krpRequestUrl;	//Krp 요청 url

	public String getKrpMid() {
		return krpMid;
	}

	public void setKrpMid(String krpMid) {
		this.krpMid = krpMid;
	}

	public String getKrpSecretKey() {
		return krpSecretKey;
	}

	public void setKrpSecretKey(String krpSecretKey) {
		this.krpSecretKey = krpSecretKey;
	}

	public String getKrpRequestUrl() {
		return krpRequestUrl;
	}

	public void setKrpRequestUrl(String krpRequestUrl) {
		this.krpRequestUrl = krpRequestUrl;
	}
    
    
    
}