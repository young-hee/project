package kr.ap.comm.api.vo;

public class CicuedCuTncaTcVo {
	/**
	 * 통합고객번호
	 */
	private String incsNo;
	/**
	 * 약관유형관리코드.
	 */
    private String tcatCd;
    /**
     * 개정버전번호.
     */
    private String tncvNo;
    /**
     * 약관동의여부.<br>
     * ex:)YN
     */
    private String tncAgrYn;
    /**
     * 약관동의시작일시.<br>
     * ex:)20171207
     */
    private String tncAgrBgnDttm;
    /**
     * 약관동의종료일시.<br>
     * ex:)20171207
     */
    private String tncAgrEndDttm;
    
    private String chCd;
    
    private String lschId;
    
    private String fscrId;
    
    private String chgChCd;
    
	public String getTcatCd() {
		return tcatCd;
	}
	public void setTcatCd(String tcatCd) {
		this.tcatCd = tcatCd;
	}
	public String getTncvNo() {
		return tncvNo;
	}
	public void setTncvNo(String tncvNo) {
		this.tncvNo = tncvNo;
	}
	public String getTncAgrYn() {
		return tncAgrYn;
	}
	public void setTncAgrYn(String tncAgrYn) {
		this.tncAgrYn = tncAgrYn;
	}
	public String getTncAgrBgnDttm() {
		return tncAgrBgnDttm;
	}
	public void setTncAgrBgnDttm(String tncAgrBgnDttm) {
		this.tncAgrBgnDttm = tncAgrBgnDttm;
	}
	public String getTncAgrEndDttm() {
		return tncAgrEndDttm;
	}
	public void setTncAgrEndDttm(String tncAgrEndDttm) {
		this.tncAgrEndDttm = tncAgrEndDttm;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getIncsNo() {
		return incsNo;
	}
	public String getLschId() {
		return lschId;
	}
	public void setLschId(String lschId) {
		this.lschId = lschId;
	}
	public String getChgChCd() {
		return chgChCd;
	}
	public void setChgChCd(String chgChCd) {
		this.chgChCd = chgChCd;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	public String getFscrId() {
		return fscrId;
	}
	public void setFscrId(String fscrId) {
		this.fscrId = fscrId;
	}
    
    
}
