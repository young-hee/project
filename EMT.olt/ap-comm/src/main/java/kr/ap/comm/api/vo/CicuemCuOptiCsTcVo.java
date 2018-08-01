package kr.ap.comm.api.vo;

public class CicuemCuOptiCsTcVo implements MultiInfo, Cloneable {
	/**
	 * 통합고객번호.
	 */
    private String incsNo;
    /**
     * 경로구분코드.
     */
    private String chCd;
    /**
     * 변경요청경로코드
     */
    private String chgChCd;
    /**
     * 최초생성ID
     */
    private String fscrId;
    /**
     * 최초생성시각.
     */
    private String fscrTsp;
    /**
     * 최종변경ID
     */
    private String lschId;
    /**
     * 최종변경시각.
     */
    private String lschTsp;
    /**
     * 표준시간대코드.
     */
    private String sdtpCd;
    /**
     * 경로구분명
     */
    private String chNm;
    /**
     * 이메일수신동의여부.<br>
     * ex:)YN
     */
    private String emlOptiYn;
    /**
     * SMS수신동의여부.<br>
     * ex:)YN
     */
    private String smsOptiYn;
    /**
     * DM수신동의여부.<br>
     * ex:)YN
     */
    private String dmOptiYn;
    /**
     * TM수신동의여부.<br>
     * ex:)YN
     */
    private String tmOptiYn;
    /**
     * 이메일수신동의일<br>
     * ex:)20170121
     */
    private String emlOptiDt;
    /**
     * SMS수신동의일<br>
     * ex:)20170121
     */
    private String smsOptiDt;
    /**
     * DM수신동의일<br>
     * ex:)20170121
     */
    private String dmOptiDt;
    /**
     * TM수신동의일<br>
     * ex:)20170121
     */
    private String tmOptiDt;
    /**
     * 알림톡수신동의여부.<br>
     * ex:)YN
     */
    private String intlOptiYn;
    /**
     * 알림톡수신동의일자<br>
     * ex:)20170121
     */
    private String intlOptiDt;
    private String chk;
    
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	
	public String getChgChCd() {
		return chgChCd;
	}
	public void setChgChCd(String chgChCd) {
		this.chgChCd = chgChCd;
	}
	public String getEmlOptiYn() {
		return emlOptiYn;
	}
	public void setEmlOptiYn(String emlOptiYn) {
		this.emlOptiYn = emlOptiYn;
	}
	public String getSmsOptiYn() {
		return smsOptiYn;
	}
	public void setSmsOptiYn(String smsOptiYn) {
		this.smsOptiYn = smsOptiYn;
	}
	public String getDmOptiYn() {
		return dmOptiYn;
	}
	public void setDmOptiYn(String dmOptiYn) {
		this.dmOptiYn = dmOptiYn;
	}
	public String getTmOptiYn() {
		return tmOptiYn;
	}
	public void setTmOptiYn(String tmOptiYn) {
		this.tmOptiYn = tmOptiYn;
	}
	public String getEmlOptiDt() {
		return emlOptiDt;
	}
	public void setEmlOptiDt(String emlOptiDt) {
		this.emlOptiDt = emlOptiDt;
	}
	public String getSmsOptiDt() {
		return smsOptiDt;
	}
	public void setSmsOptiDt(String smsOptiDt) {
		this.smsOptiDt = smsOptiDt;
	}
	public String getDmOptiDt() {
		return dmOptiDt;
	}
	public void setDmOptiDt(String dmOptiDt) {
		this.dmOptiDt = dmOptiDt;
	}
	public String getTmOptiDt() {
		return tmOptiDt;
	}
	public void setTmOptiDt(String tmOptiDt) {
		this.tmOptiDt = tmOptiDt;
	}
	public String getIntlOptiYn() {
		return intlOptiYn;
	}
	public void setIntlOptiYn(String intlOptiYn) {
		this.intlOptiYn = intlOptiYn;
	}
	public String getIntlOptiDt() {
		return intlOptiDt;
	}
	public void setIntlOptiDt(String intlOptiDt) {
		this.intlOptiDt = intlOptiDt;
	}
	public String getFscrId() {
		return fscrId;
	}
	public void setFscrId(String fscrId) {
		this.fscrId = fscrId;
	}
	public String getFscrTsp() {
		return fscrTsp;
	}
	public void setFscrTsp(String fscrTsp) {
		this.fscrTsp = fscrTsp;
	}
	public String getLschId() {
		return lschId;
	}
	public void setLschId(String lschId) {
		this.lschId = lschId;
	}
	public String getLschTsp() {
		return lschTsp;
	}
	public void setLschTsp(String lschTsp) {
		this.lschTsp = lschTsp;
	}
	public String getSdtpCd() {
		return sdtpCd;
	}
	public void setSdtpCd(String sdtpCd) {
		this.sdtpCd = sdtpCd;
	}
	public String getChk() {
		return chk;
	}
	public void setChk(String chk) {
		this.chk = chk;
	}
	public String getChNm() {
		return chNm;
	}
	public void setChNm(String chNm) {
		this.chNm = chNm;
	}
	public CicuemCuOptiCsTcVo clone() throws CloneNotSupportedException {
		CicuemCuOptiCsTcVo a = (CicuemCuOptiCsTcVo)super.clone();
		return a;
	 }
}
