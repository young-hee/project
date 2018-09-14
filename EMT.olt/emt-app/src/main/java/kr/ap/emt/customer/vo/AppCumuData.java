package kr.ap.emt.customer.vo;

public class AppCumuData {
	//푸시 수신동의 및 마케팅 수신동의.
	private String push;
	private String marketing;
	
	//위치 정보 수신동의.
	private String location1;
	private String location2;
	private String location3;
	
	//push token 및 device info
	private String tokenData;
	private String appVer;
	private String appUid;
	private String deviceModel;
	private String osVer;
	public String getPush() {
		return push;
	}
	public void setPush(String push) {
		this.push = push;
	}
	public String getMarketing() {
		return marketing;
	}
	public void setMarketing(String marketing) {
		this.marketing = marketing;
	}
	
	public String getLocation1() {
		return location1;
	}
	public void setLocation1(String location1) {
		this.location1 = location1;
	}
	public String getLocation2() {
		return location2;
	}
	public void setLocation2(String location2) {
		this.location2 = location2;
	}
	public String getLocation3() {
		return location3;
	}
	public void setLocation3(String location3) {
		this.location3 = location3;
	}
	public String getTokenData() {
		return tokenData;
	}
	public void setTokenData(String tokenData) {
		this.tokenData = tokenData;
	}
	public String getAppVer() {
		return appVer;
	}
	public void setAppVer(String appVer) {
		this.appVer = appVer;
	}
	public String getAppUid() {
		return appUid;
	}
	public void setAppUid(String appUid) {
		this.appUid = appUid;
	}
	public String getDeviceModel() {
		return deviceModel;
	}
	public void setDeviceModel(String deviceModel) {
		this.deviceModel = deviceModel;
	}
	public String getOsVer() {
		return osVer;
	}
	public void setOsVer(String osVer) {
		this.osVer = osVer;
	}
	
	
}
