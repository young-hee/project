package kr.ap.emt.api.pos.vo;

import java.util.Date;

public class CustGrade {
	private Date saleDt;
	private String ordNo;
	private String itemNm;
	private String storNm;
	private int grdAmt;
	public Date getSaleDt() {
		return saleDt;
	}
	public void setSaleDt(Date saleDt) {
		this.saleDt = saleDt;
	}
	public String getOrdNo() {
		return ordNo;
	}
	public void setOrdNo(String ordNo) {
		this.ordNo = ordNo;
	}
	public String getItemNm() {
		return itemNm;
	}
	public void setItemNm(String itemNm) {
		this.itemNm = itemNm;
	}
	public String getStorNm() {
		return storNm;
	}
	public void setStorNm(String storNm) {
		this.storNm = storNm;
	}
	public int getGrdAmt() {
		return grdAmt;
	}
	public void setGrdAmt(int grdAmt) {
		this.grdAmt = grdAmt;
	}
	
	
}
