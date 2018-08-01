package kr.ap.comm.api.vo;

public class CicuedCuChCsTcVo implements MultiInfo {
	
	/**
	 * 통합고객번호.
	 */
    private String incsNo;
    /**
     * 경로구분코드.
     */
    private String chCd;
    /**
     * 경로고객번호
     */
    private String chcsNo;
    /**
     * 관리거래처ID
     */
    private String mgntPrtnId;
    /**
     * 거래처명.
     */
    private String prtnNm;
    /**
     * 회원가입일자.<br>
     * ex:)20171207
     */
    private String mbrJoinDt;
    /**
     * 최초거래일자.<br>
     * ex:)20171207
     */
    private String fstTrDt;
    /**
     * 사용자비밀번호암호.
     */
    private String userPwdEc;
    /**
     * 고객상태코드.
     */
    private String csstCd;
    private String joincnt;

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
     * 최초접촉거래처ID
     */
    private String fstCnttPrtnId;
    /**
     * 최초접촉일자
     */
    private String fstCnttDt;
    
    private CicuemCuOptiCsTcVo cicuemCuOptiTcVo;
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
	public String getChcsNo() {
		return chcsNo;
	}
	public void setChcsNo(String chcsNo) {
		this.chcsNo = chcsNo;
	}
	public String getMgntPrtnId() {
		return mgntPrtnId;
	}
	public void setMgntPrtnId(String mgntPrtnId) {
		this.mgntPrtnId = mgntPrtnId;
	}
	public String getPrtnNm() {
		return prtnNm;
	}
	public void setPrtnNm(String prtnNm) {
		this.prtnNm = prtnNm;
	}
	public String getMbrJoinDt() {
		return mbrJoinDt;
	}
	public void setMbrJoinDt(String mbrJoinDt) {
		this.mbrJoinDt = mbrJoinDt;
	}
	public String getFstTrDt() {
		return fstTrDt;
	}
	public void setFstTrDt(String fstTrDt) {
		this.fstTrDt = fstTrDt;
	}
	public String getUserPwdEc() {
		return userPwdEc;
	}
	public void setUserPwdEc(String userPwdEc) {
		this.userPwdEc = userPwdEc;
	}
	public String getCsstCd() {
		return csstCd;
	}
	public void setCsstCd(String csstCd) {
		this.csstCd = csstCd;
	}
	public String getJoincnt() {
		return joincnt;
	}
	public void setJoincnt(String joincnt) {
		this.joincnt = joincnt;
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
	public String getChNm() {
		return chNm;
	}
	public void setChNm(String chNm) {
		this.chNm = chNm;
	}
	public CicuemCuOptiCsTcVo getCicuemCuOptiTcVo() {
		return cicuemCuOptiTcVo;
	}
	public void setCicuemCuOptiTcVo(CicuemCuOptiCsTcVo cicuemCuOptiTcVo) {
		this.cicuemCuOptiTcVo = cicuemCuOptiTcVo;
	}
	public String getFstCnttPrtnId() {
		return fstCnttPrtnId;
	}
	public void setFstCnttPrtnId(String fstCnttPrtnId) {
		this.fstCnttPrtnId = fstCnttPrtnId;
	}
	public String getFstCnttDt() {
		return fstCnttDt;
	}
	public void setFstCnttDt(String fstCnttDt) {
		this.fstCnttDt = fstCnttDt;
	}
    
}
