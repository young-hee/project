package kr.ap.emt.api.pos.vo;

import java.util.List;

public class CustCushinUseList extends POSResultVo {
	private int cushinCnt;
	private List<Cushin> cushinList;
	
	
	public int getCushinCnt() {
		return cushinCnt;
	}
	public void setCushinCnt(int cushinCnt) {
		this.cushinCnt = cushinCnt;
	}
	public List<Cushin> getCushinList() {
		return cushinList;
	}
	public void setCushinList(List<Cushin> cushinList) {
		this.cushinList = cushinList;
	}
	
	
}
