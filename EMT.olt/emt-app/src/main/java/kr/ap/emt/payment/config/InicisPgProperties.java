package kr.ap.emt.payment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Inicis의 설정을 관리한다.
 * @author aki
 */
@Configuration
@ConfigurationProperties
public class InicisPgProperties {
		
	 /**********************************
     * INIPAY
     **********************************/
	 	@Value("${payment.ini.inipayhome}")
	    private String iniPayhome;	//inipayHome directory 경로
	    
	 	@Value("${payment.ini.mid}")
	    private String iniMid;			//mId    
	 	
	 	@Value("${payment.ini.direct.mid}")
	    private String iniDrctMid;		//다이렉트 mid (카카오페이, 페이코 결제의 경우 mid가 다름)
	    
	 	@Value("${payment.ini.keyPw}")
	    private String iniKeyPw;		//키패스워드
	    
	 	@Value("${payment.ini.signKey}")
	    private String iniSignKey;		//iniSignKey
	    
	    @Value("${payment.ini.pc.siteDomain}")
	    private String iniSiteDomain;	//iniSiteDomain
	    
	    @Value("${payment.ini.mo.siteDomain}")
	    private String moIniSiteDomain;	//iniSiteDomain mobile
	    
	    @Value("${payment.ini.direct.signKey}")
	    private String iniDrctSignKey;	//iniSignKey
	    
	    
	    /**********************************
	     * INIPAY- WAYPAY
	     **********************************/
	    @Value("${payment.wpay.mid}")
	    private String wpayMid;
	    
	    @Value("${payment.wpay.hashKey}")
	    private String wpayHashKey;
	    
	    @Value("${payment.wpay.seedKey}")
	    private String wpaySeedKey;
	    
	    @Value("${payment.wpay.seedIv}")
	    private String wpaySeedIv;

		public String getIniPayhome() {
			return iniPayhome;
		}

		public void setIniPayhome(String iniPayhome) {
			this.iniPayhome = iniPayhome;
		}

		public String getIniMid() {
			return iniMid;
		}

		public void setIniMid(String iniMid) {
			this.iniMid = iniMid;
		}

		public String getIniKeyPw() {
			return iniKeyPw;
		}

		public void setIniKeyPw(String iniKeyPw) {
			this.iniKeyPw = iniKeyPw;
		}

		public String getIniSignKey() {
			return iniSignKey;
		}

		public void setIniSignKey(String iniSignKey) {
			this.iniSignKey = iniSignKey;
		}

		public String getIniSiteDomain() {
			return iniSiteDomain;
		}

		public void setIniSiteDomain(String iniSiteDomain) {
			this.iniSiteDomain = iniSiteDomain;
		}

		public String getMoIniSiteDomain() {
			return moIniSiteDomain;
		}

		public void setMoIniSiteDomain(String moIniSiteDomain) {
			this.moIniSiteDomain = moIniSiteDomain;
		}

		public String getIniDrctMid() {
			return iniDrctMid;
		}

		public void setIniDrctMid(String iniDrctMid) {
			this.iniDrctMid = iniDrctMid;
		}

		public String getIniDrctSignKey() {
			return iniDrctSignKey;
		}

		public void setIniDrctSignKey(String iniDrctSignKey) {
			this.iniDrctSignKey = iniDrctSignKey;
		}

		public String getWpayMid() {
			return wpayMid;
		}

		public void setWpayMid(String wpayMid) {
			this.wpayMid = wpayMid;
		}

		public String getWpayHashKey() {
			return wpayHashKey;
		}

		public void setWpayHashKey(String wpayHashKey) {
			this.wpayHashKey = wpayHashKey;
		}

		public String getWpaySeedKey() {
			return wpaySeedKey;
		}

		public void setWpaySeedKey(String wpaySeedKey) {
			this.wpaySeedKey = wpaySeedKey;
		}

		public String getWpaySeedIv() {
			return wpaySeedIv;
		}

		public void setWpaySeedIv(String wpaySeedIv) {
			this.wpaySeedIv = wpaySeedIv;
		}
	    
	    
	
}