package kr.ap.emt.api.pos.vo;

import java.util.Date;

public class Cushin {
	private Date useDate;		//사용일자.
	private String storNm;		//사옹처(매장명)
	private String ptrSn;		//주문번호.
	private int purQty;		//구매수량.
	private int purAmt;		//구매금액.
	private int accumptPoint;//적립포인트.
	private int rdmptPoint;	//사용포인트.
	private Date expireDt;
	
	public String getStorNm() {
		return storNm;
	}
	public void setStorNm(String storNm) {
		this.storNm = storNm;
	}
	public String getPtrSn() {
		return ptrSn;
	}
	public void setPtrSn(String ptrSn) {
		this.ptrSn = ptrSn;
	}
	public int getPurQty() {
		return purQty;
	}
	public void setPurQty(int purQty) {
		this.purQty = purQty;
	}
	public int getPurAmt() {
		return purAmt;
	}
	public void setPurAmt(int purAmt) {
		this.purAmt = purAmt;
	}
	public int getAccumptPoint() {
		return accumptPoint;
	}
	public void setAccumptPoint(int accumptPoint) {
		this.accumptPoint = accumptPoint;
	}
	public int getRdmptPoint() {
		return rdmptPoint;
	}
	public void setRdmptPoint(int rdmptPoint) {
		this.rdmptPoint = rdmptPoint;
	}
	public Date getUseDate() {
		return useDate;
	}
	public void setUseDate(Date useDate) {
		this.useDate = useDate;
	}
	public Date getExpireDt() {
		return expireDt;
	}
	public void setExpireDt(Date expireDt) {
		this.expireDt = expireDt;
	}
	
	
	
	
}
