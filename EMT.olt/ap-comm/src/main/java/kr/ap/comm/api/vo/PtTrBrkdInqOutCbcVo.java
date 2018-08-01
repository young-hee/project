package kr.ap.comm.api.vo;

import java.util.List;

/**
 * 사용자 포인트 거래내역
 * @author pollak
 *
 */
public class PtTrBrkdInqOutCbcVo {
    private String rsltCd;
    private String rsltMsg;
    private List<PtTrBrkdInqVo> ptTrBrkdInqVo;
    private PageVo pageVo;
    
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

	public List<PtTrBrkdInqVo> getPtTrBrkdInqVo() {
		return ptTrBrkdInqVo;
	}

	public void setPtTrBrkdInqVo(List<PtTrBrkdInqVo> ptTrBrkdInqVo) {
		this.ptTrBrkdInqVo = ptTrBrkdInqVo;
	}

	public PageVo getPageVo() {
		return pageVo;
	}

	public void setPageVo(PageVo pageVo) {
		this.pageVo = pageVo;
	}

    
}
