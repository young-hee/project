package kr.ap.amt.order.vo;

import java.math.BigDecimal;

public class OrdReceptChangeDTO {

	/**
	 * 배송정보 세팅
	 */

	/**
	 * 01:일반택배
	 * 02:편의점
	 */
	private String delivery;
	/**
	 * 01:최근배송지
	 * 02:기본배송지
	 * 03:새로입력
	 */
	private String address;

	/*주문번호*/
	private Long ordSn;

	/*주문자 이름*/
	private String purchaserName;
	/*주문자 휴대폰번호*/
	private String purchaserPhoneNo;
	/*주문자 주소*/
	private String purchaserAddress;
	/*주문자 이메일*/
	private String purchaserEmailAddress;

	/*최근배송지 기본배송지로 설정*/
	private String latelyRepShipAddressYn;
	/*수취인 이름*/
	private String recipientName;
	/*수취인 휴대폰번호*/
	private String recipientPhoneNo;
	/*수취인 이메일*/
	private String recipientEmailAddress;
	/*주소*/
	private String recipientZipCode;
	/*기본주소*/
	private String recipientAddress1;
	/*상세주소*/
	private String recipientAddress2;

	/*새로입력 기본배송지로 설정*/
	private String newRepShipAddressYn;
	/*새로입력 이름*/
	private String userName;
	/*새로입력 휴대폰번호*/
	private String userPhoneNo;
	/*새로입력 우편번호*/
	private String userPostCode;
	/*새로입력 기본주소*/
	private String userAddress1;
	/*새로입력 상세주소*/
	private String userAddress2;

	/*배송지일련번호*/
	private Long shipAddressSn;

	/*배송메세지*/
	private String shipMsg;
	/*배송메세지(모바일 직접입력)*/
	private String shipMsg2;

	/* 선물포장금액기준통화*/
	private BigDecimal giftPackingAmtBcur;

	/*편의점택배*/
	private String cStoreName;
	private String cStorePhoneNo;
	private String cStoreHqCode;
	private String cStoreCenterCode;
	private String cStoreStoreCode;
	private String cStoreCompany;
	private String cStoreDockNo;
	private String cStoreCenterName;
	private String cStoreAddressZipCode;
	private String cStoreAddressAddress1;
	private String cStoreAddressAddress2;
	private String cStoreArrivalAreaCode;
	private String cStoreArrivalAreaBarcode;
	private String cStoreDongNmCode;
	private String cStoreArrivalDongNm;
	private String cStoreRecipientName;
	private String cStoreRecipientPhoneNo;

	private String nextPayUseYn;

	public String getDelivery() {
		return delivery;
	}

	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Long getOrdSn() {
		return ordSn;
	}

	public void setOrdSn(Long ordSn) {
		this.ordSn = ordSn;
	}

	public String getPurchaserName() {
		return purchaserName;
	}

	public void setPurchaserName(String purchaserName) {
		this.purchaserName = purchaserName;
	}

	public String getPurchaserPhoneNo() {
		return purchaserPhoneNo;
	}

	public void setPurchaserPhoneNo(String purchaserPhoneNo) {
		this.purchaserPhoneNo = purchaserPhoneNo;
	}

	public String getPurchaserAddress() {
		return purchaserAddress;
	}

	public void setPurchaserAddress(String purchaserAddress) {
		this.purchaserAddress = purchaserAddress;
	}

	public String getPurchaserEmailAddress() {
		return purchaserEmailAddress;
	}

	public void setPurchaserEmailAddress(String purchaserEmailAddress) { this.purchaserEmailAddress = purchaserEmailAddress; }

	public String getLatelyRepShipAddressYn() {
		return latelyRepShipAddressYn;
	}

	public void setLatelyRepShipAddressYn(String latelyRepShipAddressYn) {
		this.latelyRepShipAddressYn = latelyRepShipAddressYn;
	}

	public String getRecipientName() {
		return recipientName;
	}

	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}

	public String getRecipientPhoneNo() {
		return recipientPhoneNo;
	}

	public void setRecipientPhoneNo(String recipientPhoneNo) {
		this.recipientPhoneNo = recipientPhoneNo;
	}

	public String getRecipientEmailAddress() {
		return recipientEmailAddress;
	}

	public void setRecipientEmailAddress(String recipientEmailAddress) { this.recipientEmailAddress = recipientEmailAddress; }

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPhoneNo() {
		return userPhoneNo;
	}

	public void setUserPhoneNo(String userPhoneNo) {
		this.userPhoneNo = userPhoneNo;
	}

	public String getUserPostCode() {
		return userPostCode;
	}

	public void setUserPostCode(String userPostCode) {
		this.userPostCode = userPostCode;
	}

	public String getUserAddress1() {
		return userAddress1;
	}

	public void setUserAddress1(String userAddress1) {
		this.userAddress1 = userAddress1;
	}

	public String getUserAddress2() {
		return userAddress2;
	}

	public void setUserAddress2(String userAddress2) {
		this.userAddress2 = userAddress2;
	}

	public String getNewRepShipAddressYn() {
		return newRepShipAddressYn;
	}

	public void setNewRepShipAddressYn(String newRepShipAddressYn) {
		this.newRepShipAddressYn = newRepShipAddressYn;
	}

	public String getRecipientZipCode() { return recipientZipCode; }

	public void setRecipientZipCode(String recipientZipCode) {
		this.recipientZipCode = recipientZipCode;
	}

	public String getRecipientAddress1() {
		return recipientAddress1;
	}

	public void setRecipientAddress1(String recipientAddress1) {
		this.recipientAddress1 = recipientAddress1;
	}

	public String getRecipientAddress2() {
		return recipientAddress2;
	}

	public void setRecipientAddress2(String recipientAddress2) {
		this.recipientAddress2 = recipientAddress2;
	}

	public Long getShipAddressSn() {
		return shipAddressSn;
	}

	public void setShipAddressSn(Long shipAddressSn) {
		this.shipAddressSn = shipAddressSn;
	}

	public String getShipMsg() { return shipMsg; }

	public void setShipMsg(String shipMsg) {
		this.shipMsg = shipMsg;
	}

	public String getShipMsg2() { return shipMsg2; }

	public void setShipMsg2(String shipMsg2) {
		this.shipMsg2 = shipMsg2;
	}

		public BigDecimal getGiftPackingAmtBcur() {
		return giftPackingAmtBcur;
	}

	public void setGiftPackingAmtBcur(BigDecimal giftPackingAmtBcur) { this.giftPackingAmtBcur = giftPackingAmtBcur; }

	public String getcStoreName() {
		return cStoreName;
	}

	public void setcStoreName(String cStoreName) {
		this.cStoreName = cStoreName;
	}

	public String getcStorePhoneNo() {
		return cStorePhoneNo;
	}

	public void setcStorePhoneNo(String cStorePhoneNo) {
		this.cStorePhoneNo = cStorePhoneNo;
	}

	public String getcStoreHqCode() {
		return cStoreHqCode;
	}

	public void setcStoreHqCode(String cStoreHqCode) {
		this.cStoreHqCode = cStoreHqCode;
	}

	public String getcStoreCenterCode() {
		return cStoreCenterCode;
	}

	public void setcStoreCenterCode(String cStoreCenterCode) {
		this.cStoreCenterCode = cStoreCenterCode;
	}

	public String getcStoreStoreCode() {
		return cStoreStoreCode;
	}

	public void setcStoreStoreCode(String cStoreStoreCode) {
		this.cStoreStoreCode = cStoreStoreCode;
	}

	public String getcStoreCompany() {
		return cStoreCompany;
	}

	public void setcStoreCompany(String cStoreCompany) {
		this.cStoreCompany = cStoreCompany;
	}

	public String getcStoreDockNo() {
		return cStoreDockNo;
	}

	public void setcStoreDockNo(String cStoreDockNo) {
		this.cStoreDockNo = cStoreDockNo;
	}

	public String getcStoreCenterName() {
		return cStoreCenterName;
	}

	public void setcStoreCenterName(String cStoreCenterName) {
		this.cStoreCenterName = cStoreCenterName;
	}

	public String getcStoreAddressZipCode() {
		return cStoreAddressZipCode;
	}

	public void setcStoreAddressZipCode(String cStoreAddressZipCode) {
		this.cStoreAddressZipCode = cStoreAddressZipCode;
	}

	public String getcStoreAddressAddress1() {
		return cStoreAddressAddress1;
	}

	public void setcStoreAddressAddress1(String cStoreAddressAddress1) {
		this.cStoreAddressAddress1 = cStoreAddressAddress1;
	}

	public String getcStoreAddressAddress2() {
		return cStoreAddressAddress2;
	}

	public void setcStoreAddressAddress2(String cStoreAddressAddress2) {
		this.cStoreAddressAddress2 = cStoreAddressAddress2;
	}

	public String getcStoreArrivalAreaCode() {
		return cStoreArrivalAreaCode;
	}

	public void setcStoreArrivalAreaCode(String cStoreArrivalAreaCode) {
		this.cStoreArrivalAreaCode = cStoreArrivalAreaCode;
	}

	public String getcStoreArrivalAreaBarcode() {
		return cStoreArrivalAreaBarcode;
	}

	public void setcStoreArrivalAreaBarcode(String cStoreArrivalAreaBarcode) {
		this.cStoreArrivalAreaBarcode = cStoreArrivalAreaBarcode;
	}

	public String getcStoreDongNmCode() {
		return cStoreDongNmCode;
	}

	public void setcStoreDongNmCode(String cStoreDongNmCode) {
		this.cStoreDongNmCode = cStoreDongNmCode;
	}

	public String getcStoreArrivalDongNm() {
		return cStoreArrivalDongNm;
	}

	public void setcStoreArrivalDongNm(String cStoreArrivalDongNm) {
		this.cStoreArrivalDongNm = cStoreArrivalDongNm;
	}

	public String getcStoreRecipientName() {
		return cStoreRecipientName;
	}

	public void setcStoreRecipientName(String cStoreRecipientName) {
		this.cStoreRecipientName = cStoreRecipientName;
	}

	public String getcStoreRecipientPhoneNo() {
		return cStoreRecipientPhoneNo;
	}

	public void setcStoreRecipientPhoneNo(String cStoreRecipientPhoneNo) {
		this.cStoreRecipientPhoneNo = cStoreRecipientPhoneNo;
	}

	public String getNextPayUseYn() {
		return nextPayUseYn;
	}

	public void setNextPayUseYn(String nextPayUseYn) {
		this.nextPayUseYn = nextPayUseYn;
	}
}