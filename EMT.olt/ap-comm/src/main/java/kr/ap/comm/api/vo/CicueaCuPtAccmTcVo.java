package kr.ap.comm.api.vo;

public class CicueaCuPtAccmTcVo {
	private String incsNo;		//통합고객번
	private String reltCd;		//응답코드.
	private String reltMsg;		//결과메시지.
	private String rmnPt;		//잔여포인트.
	private String accmAcmlPt;	//누적적립포인트.
	private String accmUsgPt;	//누적사용포인트.
	private String accmExtcPt;	//누적소멸포인트.
	private String custNm;		//고객명
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getReltCd() {
		return reltCd;
	}
	public void setReltCd(String reltCd) {
		this.reltCd = reltCd;
	}
	public String getReltMsg() {
		return reltMsg;
	}
	public void setReltMsg(String reltMsg) {
		this.reltMsg = reltMsg;
	}
	public String getRmnPt() {
		return rmnPt;
	}
	public void setRmnPt(String rmnPt) {
		this.rmnPt = rmnPt;
	}
	public String getAccmAcmlPt() {
		return accmAcmlPt;
	}
	public void setAccmAcmlPt(String accmAcmlPt) {
		this.accmAcmlPt = accmAcmlPt;
	}
	public String getAccmUsgPt() {
		return accmUsgPt;
	}
	public void setAccmUsgPt(String accmUsgPt) {
		this.accmUsgPt = accmUsgPt;
	}
	public String getAccmExtcPt() {
		return accmExtcPt;
	}
	public void setAccmExtcPt(String accmExtcPt) {
		this.accmExtcPt = accmExtcPt;
	}
	public String getCustNm() {
		return custNm;
	}
	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}
	
	
}
