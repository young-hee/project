package kr.ap.emt.customer.vo;

public class AppCumuData {
	//푸시 수신동의 및 마케팅 수신동의.
	private String push;
	private String marketing;
	
	//위치 정보 수신동의.
	private String location;
	
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
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
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
