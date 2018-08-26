package kr.ap.amt.api.pshop.vo;

import java.util.Map;

public class PShopResult {
	private String rsltMsg;
	private Map<String, String> data;
	private String rsltCd;
	private int procCnt;
	
	public String getRsltMsg() {
		return rsltMsg;
	}
	public void setRsltMsg(String rsltMsg) {
		this.rsltMsg = rsltMsg;
	}
	public Map<String, String> getData() {
		return data;
	}
	public void setData(Map<String, String> data) {
		this.data = data;
	}
	public String getRsltCd() {
		return rsltCd;
	}
	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}
	public int getProcCnt() {
		return procCnt;
	}
	public void setProcCnt(int procCnt) {
		this.procCnt = procCnt;
	}
	
	
}
