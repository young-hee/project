package kr.ap.comm.api.vo;

/**
 * 포인트 조회.
 * @author pollak
 *
 */
public class PtTrBrkdInqInCbcVo {
	private	String	incsNo;		//	통합고객번호
	private	String	chCd;		//	채널코드
	private	String	tlmcCd;		//	거래유형코드
	private	String	bgnTrApvlDt;//	조회시작일자
	private	String	endTrApvlDt;//	조회종료일자
	private	String	xtclCd;		//	거래구분코드
	private	String	xttpCd;		//	거래유형코드
	private	String	rsltCl;		//	결과구분
	private PageVo pageVo;
	public String getIncsNo() {
		return incsNo;
	}
	public void setIncsNo(String incsNo) {
		this.incsNo = incsNo;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	public String getTlmcCd() {
		return tlmcCd;
	}
	public void setTlmcCd(String tlmcCd) {
		this.tlmcCd = tlmcCd;
	}
	public String getBgnTrApvlDt() {
		return bgnTrApvlDt;
	}
	public void setBgnTrApvlDt(String bgnTrApvlDt) {
		this.bgnTrApvlDt = bgnTrApvlDt;
	}
	public String getEndTrApvlDt() {
		return endTrApvlDt;
	}
	public void setEndTrApvlDt(String endTrApvlDt) {
		this.endTrApvlDt = endTrApvlDt;
	}
	public String getXtclCd() {
		return xtclCd;
	}
	public void setXtclCd(String xtclCd) {
		this.xtclCd = xtclCd;
	}
	public String getXttpCd() {
		return xttpCd;
	}
	public void setXttpCd(String xttpCd) {
		this.xttpCd = xttpCd;
	}
	public String getRsltCl() {
		return rsltCl;
	}
	public void setRsltCl(String rsltCl) {
		this.rsltCl = rsltCl;
	}
	public PageVo getPageVo() {
		return pageVo;
	}
	public void setPageVo(PageVo pageVo) {
		this.pageVo = pageVo;
	}
	
	
	
}
