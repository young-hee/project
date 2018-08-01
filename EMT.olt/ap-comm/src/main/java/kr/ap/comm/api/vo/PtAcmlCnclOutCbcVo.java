package kr.ap.comm.api.vo;

/**
 * 포인트 적립/취소 등 결과.
 * @author pollak
 *
 */
public class PtAcmlCnclOutCbcVo {
	private	String	rsltCd;	//	응답코드
	private	String	apvlDt;	//	승인일자
	private	String	apvlNo;	//	승인번호
	private	String	rqPt;	//	요청포인트
	private	String	procPt;	//	처리포인트
	private	String	rmnPt;	//	잔여포인트
	private	String	rsltMsg;//	결과메시지
	public String getRsltCd() {
		return rsltCd;
	}
	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}
	public String getApvlDt() {
		return apvlDt;
	}
	public void setApvlDt(String apvlDt) {
		this.apvlDt = apvlDt;
	}
	public String getApvlNo() {
		return apvlNo;
	}
	public void setApvlNo(String apvlNo) {
		this.apvlNo = apvlNo;
	}
	public String getRqPt() {
		return rqPt;
	}
	public void setRqPt(String rqPt) {
		this.rqPt = rqPt;
	}
	public String getProcPt() {
		return procPt;
	}
	public void setProcPt(String procPt) {
		this.procPt = procPt;
	}
	public String getRmnPt() {
		return rmnPt;
	}
	public void setRmnPt(String rmnPt) {
		this.rmnPt = rmnPt;
	}
	public String getRsltMsg() {
		return rsltMsg;
	}
	public void setRsltMsg(String rsltMsg) {
		this.rsltMsg = rsltMsg;
	}
	
}
