package kr.ap.amt.etc.vo;

public class SavingBeautyPointRequest {

	private String bizptnr;  // 협력사코드
	private String reqDt;    // 기준일
	private String cstmSiteKey;    // 외부몰 사이트키
	private String siteCode;  // 외부몰 사이트코드

	public String getBizptnr() {
		return bizptnr;
	}
	public void setBizptnr(String bizptnr) {
		this.bizptnr = bizptnr;
	}
	public String getReqDt() {
		return reqDt;
	}
	public void setReqDt(String reqDt) {
		this.reqDt = reqDt;
	}
	public String getCstmSiteKey() {
		return cstmSiteKey;
	}
	public void setCstmSiteKey(String cstmSiteKey) {
		this.cstmSiteKey = cstmSiteKey;
	}
	public String getSiteCode() {
		return siteCode;
	}
	public void setSiteCode(String siteCode) {
		this.siteCode = siteCode;
	}
}
