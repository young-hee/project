package kr.ap.comm.api.vo;

public class CicuemCuInfCoInVo {
	private	String	searchDiv;	//	조회구분	조회조건유형: A, B, C, D
	private	String	custNm;	//	고객명	
	private	String	athtDtbr;	//	고객생일	6자리
	private	String	cellTlsn;	//	휴대전화번호	끝4자리
	private	String	incsCardNoEc;	//	멤버십카드번호	
	private	String	cellTidn;	//	휴대폰식별전화번호	
	private	String	cellTexn;	//	휴대폰국전화번호	
	private	String	ciNo;	//	CI번호	
	private	String	wireTidn;	//	유선식별전화번호	
	private	String	wireTexn;	//	유선국전화번호	
	private	String	wireTlsn;	//	유선끝전화번호	
	private	String	custEmid;	//	고객이메일ID	이메일고객조회시이메일주소도같이입력
	private	String	custEmdn;	//	고객이메일주소	이메일고객조회시이메일ID도같이입력
	private	String	chCd;	//	경로코드	없으면000기본
	private	String	icsgCd;	//	전사고객등급코드	
	public String getSearchDiv() {
		return searchDiv;
	}
	public void setSearchDiv(String searchDiv) {
		this.searchDiv = searchDiv;
	}
	public String getCustNm() {
		return custNm;
	}
	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}
	public String getAthtDtbr() {
		return athtDtbr;
	}
	public void setAthtDtbr(String athtDtbr) {
		this.athtDtbr = athtDtbr;
	}
	public String getCellTlsn() {
		return cellTlsn;
	}
	public void setCellTlsn(String cellTlsn) {
		this.cellTlsn = cellTlsn;
	}
	
	public String getIncsCardNoEc() {
		return incsCardNoEc;
	}
	public void setIncsCardNoEc(String incsCardNoEc) {
		this.incsCardNoEc = incsCardNoEc;
	}
	public String getCellTidn() {
		return cellTidn;
	}
	public void setCellTidn(String cellTidn) {
		this.cellTidn = cellTidn;
	}
	public String getCellTexn() {
		return cellTexn;
	}
	public void setCellTexn(String cellTexn) {
		this.cellTexn = cellTexn;
	}
	public String getCiNo() {
		return ciNo;
	}
	public void setCiNo(String ciNo) {
		this.ciNo = ciNo;
	}
	public String getWireTidn() {
		return wireTidn;
	}
	public void setWireTidn(String wireTidn) {
		this.wireTidn = wireTidn;
	}
	public String getWireTexn() {
		return wireTexn;
	}
	public void setWireTexn(String wireTexn) {
		this.wireTexn = wireTexn;
	}
	public String getWireTlsn() {
		return wireTlsn;
	}
	public void setWireTlsn(String wireTlsn) {
		this.wireTlsn = wireTlsn;
	}
	public String getCustEmid() {
		return custEmid;
	}
	public void setCustEmid(String custEmid) {
		this.custEmid = custEmid;
	}
	public String getCustEmdn() {
		return custEmdn;
	}
	public void setCustEmdn(String custEmdn) {
		this.custEmdn = custEmdn;
	}
	public String getChCd() {
		return chCd;
	}
	public void setChCd(String chCd) {
		this.chCd = chCd;
	}
	public String getIcsgCd() {
		return icsgCd;
	}
	public void setIcsgCd(String icsgCd) {
		this.icsgCd = icsgCd;
	}
	
	
}
