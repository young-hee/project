package kr.ap.amt.etc.vo;

public class SearchBeautyPointCustomerRequest {

	private String cstmCardno;  // 통합고객정보의 뷰티포인트카드번호
	private String cstmNm;    // 통합고객정보에 저장된 고객명
	private String ucstmId;    // 암호화된 뷰티퐁니트 고객번호
	private String siteCode;  // 외부몰 사이트코드
	private String cstmSiteKey;    // 외부몰 사이트키
	private String orderFlag;    // 첫주문인지, 재주문인지 구분하는 플래그

	public String getCstmNm() {
		return cstmNm;
	}

	public void setCstmNm(String cstmNm) {
		this.cstmNm = cstmNm;
	}

	public String getUcstmId() {
		return ucstmId;
	}

	public void setUcstmId(String ucstmId) {
		this.ucstmId = ucstmId;
	}

	public String getSiteCode() {
		return siteCode;
	}

	public void setSiteCode(String siteCode) {
		this.siteCode = siteCode;
	}

	public String getCstmSiteKey() {
		return cstmSiteKey;
	}

	public void setCstmSiteKey(String cstmSiteKey) {
		this.cstmSiteKey = cstmSiteKey;
	}

	public String getOrderFlag() {
		return orderFlag;
	}

	public void setOrderFlag(String orderFlag) {
		this.orderFlag = orderFlag;
	}

	public String getCstmCardno() {
		return cstmCardno;
	}

	public void setCstmCardno(String cstmCardno) {
		this.cstmCardno = cstmCardno;
	}
}
