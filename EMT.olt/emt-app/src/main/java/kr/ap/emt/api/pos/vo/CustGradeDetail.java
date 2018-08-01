package kr.ap.emt.api.pos.vo;

import java.util.List;

public class CustGradeDetail extends POSResultVo {
	private int custGradeCnt;
	private List<CustGrade> custGradeList;
	

	public int getCustGradeCnt() {
		return custGradeCnt;
	}
	public void setCustGradeCnt(int custGradeCnt) {
		this.custGradeCnt = custGradeCnt;
	}
	public List<CustGrade> getCustGradeList() {
		return custGradeList;
	}
	public void setCustGradeList(List<CustGrade> custGradeList) {
		this.custGradeList = custGradeList;
	}
	

	
}
