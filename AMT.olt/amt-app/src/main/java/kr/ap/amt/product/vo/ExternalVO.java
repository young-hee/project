package kr.ap.amt.product.vo;

public class ExternalVO {
	
	private String dp;				//필수 DP 아이디
	private String pcid;			//해당 단말(PC/모바일/브라우저 등) 식별
	private String uid;				//해당 접속자 식별 (일반적으로 회원ID)
	private boolean simulation;		//시뮬레이션 모드 동작 여부
	private boolean pretty;			//응답결과에 대한 indentation 적용 여부
	private String sid;				//A/B 시나리오 선택을 위한 Session ID값
	private boolean skipLogging;	//추천노출로그 생성 유무(예, donottrack처리). 기본값 false
	private String i_sBrand;		//브랜드코드
	private String i_sProductcd;	//상품코드
	private String i_sCategorycd1;	//1레벨 카테고리 코드
	private String i_sCategorycd2;	//2레벨 카테고리 코드
	private String i_sCategorycd3;	//3레벨 카테고리 코드
	private String i_sKwd;			//검색어
	
	public String getDp() {
		return dp;
	}
	public void setDp(String dp) {
		this.dp = dp;
	}
	public String getPcid() {
		return pcid;
	}
	public void setPcid(String pcid) {
		this.pcid = pcid;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public boolean isSimulation() {
		return simulation;
	}
	public void setSimulation(boolean simulation) {
		this.simulation = simulation;
	}
	public boolean isPretty() {
		return pretty;
	}
	public void setPretty(boolean pretty) {
		this.pretty = pretty;
	}
	public String getSid() {
		return sid;
	}
	public void setSid(String sid) {
		this.sid = sid;
	}
	public boolean isSkipLogging() {
		return skipLogging;
	}
	public void setSkipLogging(boolean skipLogging) {
		this.skipLogging = skipLogging;
	}
	public String getI_sBrand() {
		return i_sBrand;
	}
	public void setI_sBrand(String i_sBrand) {
		this.i_sBrand = i_sBrand;
	}
	public String getI_sProductcd() {
		return i_sProductcd;
	}
	public void setI_sProductcd(String i_sProductcd) {
		this.i_sProductcd = i_sProductcd;
	}
	public String getI_sCategorycd1() {
		return i_sCategorycd1;
	}
	public void setI_sCategorycd1(String i_sCategorycd1) {
		this.i_sCategorycd1 = i_sCategorycd1;
	}
	public String getI_sCategorycd2() {
		return i_sCategorycd2;
	}
	public void setI_sCategorycd2(String i_sCategorycd2) {
		this.i_sCategorycd2 = i_sCategorycd2;
	}
	public String getI_sCategorycd3() {
		return i_sCategorycd3;
	}
	public void setI_sCategorycd3(String i_sCategorycd3) {
		this.i_sCategorycd3 = i_sCategorycd3;
	}
	public String getI_sKwd() {
		return i_sKwd;
	}
	public void setI_sKwd(String i_sKwd) {
		this.i_sKwd = i_sKwd;
	}
	/* (non-Javadoc)
	 * @see java.lang.Object#toString()
	 */
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("?dp=");
		builder.append(getDp());
		builder.append("&pcid=");
		builder.append(getPcid());
		builder.append("&uid=");
		builder.append(getUid());
		builder.append("&simulation=");
		builder.append(isSimulation());
		builder.append("&pretty=");
		builder.append(isPretty());
		builder.append("&sid=");
		builder.append(getSid());
		builder.append("&skipLogging=");
		builder.append(isSkipLogging());
		builder.append("&i_sBrand=");
		builder.append(getI_sBrand());
		builder.append("&i_sProductcd=");
		builder.append(getI_sProductcd());
		builder.append("&i_sCategorycd1=");
		builder.append(getI_sCategorycd1());
		builder.append("&i_sCategorycd2=");
		builder.append(getI_sCategorycd2());
		builder.append("&i_sCategorycd3=");
		builder.append(getI_sCategorycd3());
		builder.append("&i_sKwd=");
		builder.append(getI_sKwd());
		return builder.toString();
	}
	
	
}
