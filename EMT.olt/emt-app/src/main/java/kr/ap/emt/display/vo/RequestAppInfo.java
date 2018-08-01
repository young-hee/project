package kr.ap.emt.display.vo;

public class RequestAppInfo {

	private String osType; //기기 OS버전  :: Android , IOS 
	private String token; // 앱토큰 
	private String success; // 성공여부
	
	//컬러픽킹 관련
	private int red ; 
	private int green;
	private int blue; 
	private int peal; 
	private int glossy; 
	
	
	public String getOsType() { // parameter가 대소문자 구별하여 체크하도록 
		
		if("android".equals(osType.toLowerCase())){
			osType = "Android"; 
		}else if("ios".equals(osType.toLowerCase())){
			osType = "iOS"; 
		}
		return osType.trim();
	}

	public void setOsType(String osType) {
		
		this.osType = osType;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getSuccess() {
		return success;
	}

	public void setSuccess(String success) {
		this.success = success;
	}

	public int getRed() {
		return red;
	}

	public void setRed(int red) {
		this.red = red;
	}

	public int getGreen() {
		return green;
	}

	public void setGreen(int green) {
		this.green = green;
	}

	public int getBlue() {
		return blue;
	}

	public void setBlue(int blue) {
		this.blue = blue;
	}

	public int getPeal() {
		return peal;
	}

	public void setPeal(int peal) {
		this.peal = peal;
	}

	public int getGlossy() {
		return glossy;
	}

	public void setGlossy(int glossy) {
		this.glossy = glossy;
	}

	
}
