package kr.ap.emt.api.pos.vo;

import java.util.Date;

public class CustCstmAmt extends POSResultVo {

	private String cstmlvlNm;	//현재회원등급.
	private int totalAmt;		//등급산정총액.
	private Date startDt;		//산정기간 시작일.
	private Date endDt;			//산정기간 종료일.
	private int blanceAmt;		//등급잔여금액.
	
	public String getCstmlvlNm() {
		return cstmlvlNm;
	}
	public void setCstmlvlNm(String cstmlvlNm) {
		this.cstmlvlNm = cstmlvlNm;
	}
	public int getTotalAmt() {
		return totalAmt;
	}
	public void setTotalAmt(int totalAmt) {
		this.totalAmt = totalAmt;
	}
	public Date getStartDt() {
		return startDt;
	}
	public void setStartDt(Date startDt) {
		this.startDt = startDt;
	}
	public Date getEndDt() {
		return endDt;
	}
	public void setEndDt(Date endDt) {
		this.endDt = endDt;
	}
	public int getBlanceAmt() {
		return blanceAmt;
	}
	public void setBlanceAmt(int blanceAmt) {
		this.blanceAmt = blanceAmt;
	}
	
	
}
