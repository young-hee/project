package kr.ap.amt.customer.vo;

public class AuthCheckDTO {
	private String id;
	private String custNm;
	private String email;
	private String certNum;
	private String frgrRegNum;
	private String cellNum;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getCustNm() {
		return custNm;
	}
	public void setCustNm(String custNm) {
		this.custNm = custNm;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getCertNum() {
		return certNum;
	}
	public void setCertNum(String certNum) {
		this.certNum = certNum;
	}
	public String getFrgrRegNum() {
		return frgrRegNum;
	}
	public void setFrgrRegNum(String frgrRegNum) {
		this.frgrRegNum = frgrRegNum;
	}
	public String getCellNum() {
		return cellNum;
	}
	public void setCellNum(String cellNum) {
		this.cellNum = cellNum;
	}
	
	
}
