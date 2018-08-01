package kr.ap.comm.api.vo;

public class CicuemCuInfCoOutVo {
	/**
	 * 통합고객번호<br>
	 * 고객의 유일한 식별 번호
	 */
	private String incsNo;
	/**
	 * 맴버십카드번호<br>
	 * 고객의 가입 경로에서 발생된 뷰티포인트 멤버십카드
	 */
	private String incsCardNoEc;
	private String rsltRow;
	private String cnt;
	private String existYn;
	private String custInfrChgSn;
	private String chCustCnt;
	private String rsltFlag;
	private String cert90Flag;
	private String ptAcmlRt;
	
	/**
	 * 응답결과메시지.
	 */
	private String rsltMsg;
	/**
	 * 응답결과코드
	 */
	private String rsltCd;
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	
	public String getIncsCardNoEc() {
		return incsCardNoEc;
	}
	public void setIncsCardNoEc(String incsCardNoEc) {
		this.incsCardNoEc = incsCardNoEc;
	}
	public String getRsltMsg() {
		return rsltMsg;
	}
	public void setRsltMsg(String rsltMsg) {
		this.rsltMsg = rsltMsg;
	}
	public String getRsltCd() {
		return rsltCd;
	}
	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}
	public String getRsltRow() {
		return rsltRow;
	}
	public void setRsltRow(String rsltRow) {
		this.rsltRow = rsltRow;
	}
	public String getCnt() {
		return cnt;
	}
	public void setCnt(String cnt) {
		this.cnt = cnt;
	}
	public String getExistYn() {
		return existYn;
	}
	public void setExistYn(String existYn) {
		this.existYn = existYn;
	}
	public String getCustInfrChgSn() {
		return custInfrChgSn;
	}
	public void setCustInfrChgSn(String custInfrChgSn) {
		this.custInfrChgSn = custInfrChgSn;
	}
	public String getChCustCnt() {
		return chCustCnt;
	}
	public void setChCustCnt(String chCustCnt) {
		this.chCustCnt = chCustCnt;
	}
	public String getRsltFlag() {
		return rsltFlag;
	}
	public void setRsltFlag(String rsltFlag) {
		this.rsltFlag = rsltFlag;
	}
	public String getCert90Flag() {
		return cert90Flag;
	}
	public void setCert90Flag(String cert90Flag) {
		this.cert90Flag = cert90Flag;
	}
	public String getPtAcmlRt() {
		return ptAcmlRt;
	}
	public void setPtAcmlRt(String ptAcmlRt) {
		this.ptAcmlRt = ptAcmlRt;
	}
	
	
}
