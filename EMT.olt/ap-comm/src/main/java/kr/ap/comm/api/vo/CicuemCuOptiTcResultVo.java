package kr.ap.comm.api.vo;

import java.util.List;

public class CicuemCuOptiTcResultVo {

	private String rsltCd;
	private String rsltMsg;
	List<CicuemCuOptiCsTcVo> cicuemCuOptiTcVo;
	
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
	public List<CicuemCuOptiCsTcVo> getCicuemCuOptiTcVo() {
		return cicuemCuOptiTcVo;
	}
	public void setCicuemCuOptiTcVo(List<CicuemCuOptiCsTcVo> cicuemCuOptiTcVo) {
		this.cicuemCuOptiTcVo = cicuemCuOptiTcVo;
	}
	
	
}
