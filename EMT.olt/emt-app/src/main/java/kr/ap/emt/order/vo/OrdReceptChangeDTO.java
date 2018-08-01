package kr.ap.emt.order.vo;

import java.math.BigDecimal;

public class OrdReceptChangeDTO {

	/**
	 * 배송정보 세팅
	 */

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

	/*수취인 이름*/
	private String recipientName;
	/*수취인 휴대폰번호*/
	private String recipientPhoneNo;
	/*수취인 이메일*/
	private String recipientEmailAddress;

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

	/*주소*/
	private String recipientZipCode;
	/*기본주소*/
	private String recipientAddress1;
	/*상세주소*/
	private String recipientAddress2;

	/*배송지일련번호*/
	private Long shipAddressSn;

	/*배송메세지*/
	private String shipMsg;
	/*배송메세지(직접입력)*/
	private String shipMsg2;

	/*편의점택배 수취인 이름*/
	private String storeRecipientName;
	/*편의점택배 휴대폰번호*/
	private String storeRecipientPhoneNo;

	/* 선물포장금액기준통화*/
	private BigDecimal giftPackingAmtBcur;

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

	public String getStoreRecipientName() {
		return storeRecipientName;
	}

	public void setStoreRecipientName(String storeRecipientName) {
		this.storeRecipientName = storeRecipientName;
	}

	public String getStoreRecipientPhoneNo() {
		return storeRecipientPhoneNo;
	}

	public void setStoreRecipientPhoneNo(String storeRecipientPhoneNo) { this.storeRecipientPhoneNo = storeRecipientPhoneNo; }

	public BigDecimal getGiftPackingAmtBcur() {
		return giftPackingAmtBcur;
	}

	public void setGiftPackingAmtBcur(BigDecimal giftPackingAmtBcur) { this.giftPackingAmtBcur = giftPackingAmtBcur; }

}