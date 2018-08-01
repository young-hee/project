package kr.ap.comm.api.vo;

public class CustGrdVo {

	private String incsNo; //통합고객번호.
	private String stndYear; //기준년도
	private String salColAmt; //판매수금금액.
	private String icsgCd; //전사고객등급코드.
	private String icsgNm; //고객등급명.
	private String rsltCd; //결과코드.
	private String rsltMsg; //결과메시지.
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getStndYear() {
		return stndYear;
	}
	public void setStndYear(String stndYear) {
		this.stndYear = stndYear;
	}
	public String getSalColAmt() {
		return salColAmt;
	}
	public void setSalColAmt(String salColAmt) {
		this.salColAmt = salColAmt;
	}
	public String getIcsgCd() {
		return icsgCd;
	}
	public void setIcsgCd(String icsgCd) {
		this.icsgCd = icsgCd;
	}
	public String getIcsgNm() {
		return icsgNm;
	}
	public void setIcsgNm(String icsgNm) {
		this.icsgNm = icsgNm;
	}
	public String getRsltCd() {
		return rsltCd;
	}
	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}
	public String getRsltMsg() {
		return rsltMsg;
	}
	public void setRsltMsg(String rsltMsg) {
		this.rsltMsg = rsltMsg;
	}
	
	
}
