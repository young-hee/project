package kr.ap.emt.api.pos.vo;

/**
 * POS 에서 리턴으로 사용되는 객체는 해당 클레스를 상속받아야 합니다.
 * @author pollak
 *
 */
public class POSResultVo {
	
	private String rsltCd;
	private String rsltMsg;
	
	public String getRsltCd() {
		return rsltCd;
	}
	public void setRsltCd(String rsltCd) {
		this.rsltCd = rsltCd;
	}
	public String getRsltMsg() {
		return rsltMsg;
	}
	public void setRsltMsg(String rsltMsg) {
		this.rsltMsg = rsltMsg;
	}
	
	

}
