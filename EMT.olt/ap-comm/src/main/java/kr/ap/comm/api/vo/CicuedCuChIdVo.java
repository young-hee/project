package kr.ap.comm.api.vo;

public class CicuedCuChIdVo {
	private String custWebId;
	private String custWebIdCount;
	private String chCd;
	/**
	 * 성공시 ICITSVBIZ114 리턴.<br>
	 * 실패시 모름.
	 */
	private String rsltCd;
	private String reltMsg;
	

	public String getCustWebId() {
		return custWebId;
	}
	public void setCustWebId(String custWebId) {
		this.custWebId = custWebId;
	}
	public String getCustWebIdCount() {
		return custWebIdCount;
	}
	public void setCustWebIdCount(String custWebIdCount) {
		this.custWebIdCount = custWebIdCount;
	}
	public String getRsltCd() {
		return rsltCd;
	}
	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}
	public String getReltMsg() {
		return reltMsg;
	}
	public void setReltMsg(String reltMsg) {
		this.reltMsg = reltMsg;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	
}
