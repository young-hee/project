package kr.ap.emt.order.vo;

public class OrdStoreDTO {
	
    /**
     * 편의점 택배 리턴 파라미터
     */
    private String type;
    private String storeHeadCd;		// 편의점본부코드
	private String storeShopCd;		// 편의점점포코드
	private String storeNm;			// 편의점회사
	private String storeShopNm;		// 편의점이름
	private String storeTelno;		// 편의점연락처
	private String storeZip;		// 편의점우편번호
	private String storeAddr1;		// 편의점주소1
	private String storeAddr2;		// 편의점주소2

	private String storeCodeF;		// 도착점코드
	private String storeDdZone;		// 도착점바코드
	private String storeDdBag;		// 동명코드
	private String storeEupmyeon;	// 도착동명

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getStoreHeadCd() {
		return storeHeadCd;
	}

	public void setStoreHeadCd(String storeHeadCd) {
		this.storeHeadCd = storeHeadCd;
	}

	public String getStoreShopCd() {
		return storeShopCd;
	}

	public void setStoreShopCd(String storeShopCd) {
		this.storeShopCd = storeShopCd;
	}

	public String getStoreNm() {
		return storeNm;
	}

	public void setStoreNm(String storeNm) {
		this.storeNm = storeNm;
	}

	public String getStoreShopNm() {
		return storeShopNm;
	}

	public void setStoreShopNm(String storeShopNm) {
		this.storeShopNm = storeShopNm;
	}

	public String getStoreTelno() {
		return storeTelno;
	}

	public void setStoreTelno(String storeTelno) {
		this.storeTelno = storeTelno;
	}

	public String getStoreZip() {
		return storeZip;
	}

	public void setStoreZip(String storeZip) {
		this.storeZip = storeZip;
	}

	public String getStoreAddr1() {
		return storeAddr1;
	}

	public void setStoreAddr1(String storeAddr1) {
		this.storeAddr1 = storeAddr1;
	}

	public String getStoreAddr2() {
		return storeAddr2;
	}

	public void setStoreAddr2(String storeAddr2) {
		this.storeAddr2 = storeAddr2;
	}

	public String getStoreCodeF() {
		return storeCodeF;
	}

	public void setStoreCodeF(String storeCodeF) {
		this.storeCodeF = storeCodeF;
	}

	public String getStoreDdZone() {
		return storeDdZone;
	}

	public void setStoreDdZone(String storeDdZone) {
		this.storeDdZone = storeDdZone;
	}

	public String getStoreDdBag() {
		return storeDdBag;
	}

	public void setStoreDdBag(String storeDdBag) {
		this.storeDdBag = storeDdBag;
	}

	public String getStoreEupmyeon() {
		return storeEupmyeon;
	}

	public void setStoreEupmyeon(String storeEupmyeon) {
		this.storeEupmyeon = storeEupmyeon;
	}
}
