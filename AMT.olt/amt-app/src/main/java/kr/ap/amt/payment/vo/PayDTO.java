/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.payment.vo;

import java.util.List;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class PayDTO {
	
	// 화면에서 필수 넘겨받을 param
	private String payMethod;	//inisys 지불수단
	private String cardCo;	//카드사 번호
	private String oid;	//주문번호
	private String price;	//최종가격
	private String buyerName;	//주문자 성명
	private String repProdName;	//대표상품명
	private String prodName;	//상품명
    private String mobile;//휴대전화번호
    private String email;//이메일
    
    // INICIS 자동셋팅
    private String pMid;//mid
    private String signKey;//signKey
    private String siteDomain;//사이트도메인
    private Integer depositWatingHours;
    
    // INICIS 다이렉트 추가 param 
    private String goPayMethod;
    private String acceptMehthod;
    
    // INICIS 취소시 param
    private String tid;	//거래아이디
    private String cancelMsg;	//취소사유

	//KRP
	private String krpSecretKey;
	private String krpRequestUrl;
	//private String tid;
    
    // NAVER
    //private String prodSn;	//상품일련번호
    private List<PayProd> prods; //상품정보
    
    // 원클릭 간편결제 추가 param
    private String userId;	//회원번호 및 비회원 식별자
    private String userNm;	//회원명 (비회원의 경우 주문자명)
    private String birth;	//생년월일(YYYYMMDD)
    private String socialNo2;	//주민번호 뒤 첫자리
    private String wpayUserKey;
    
    
	public String getGoPayMethod() {
		return goPayMethod;
	}
	public void setGoPayMethod(String goPayMethod) {
		this.goPayMethod = goPayMethod;
	}
	public String getAcceptMehthod() {
		return acceptMehthod;
	}
	public void setAcceptMehthod(String acceptMehthod) {
		this.acceptMehthod = acceptMehthod;
	}
	public String getPayMethod() {
		return payMethod;
	}
	public void setPayMethod(String payMethod) {
		this.payMethod = payMethod;
	}
	public String getCardCo() {
		return cardCo;
	}
	public void setCardCo(String cardCo) {
		this.cardCo = cardCo;
	}
	public String getOid() {
		return oid;
	}
	public void setOid(String oid) {
		this.oid = oid;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getBuyerName() {
		return buyerName;
	}
	public void setBuyerName(String buyerName) {
		this.buyerName = buyerName;
	}
	public String getRepProdName() {
		return repProdName;
	}
	public void setRepProdName(String repProdName) {
		this.repProdName = repProdName;
	}
	public String getProdName() {
		return prodName;
	}
	public void setProdName(String prodName) {
		this.prodName = prodName;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getpMid() {
		return pMid;
	}
	public void setpMid(String pMid) {
		this.pMid = pMid;
	}
	public String getSignKey() {
		return signKey;
	}
	public void setSignKey(String signKey) {
		this.signKey = signKey;
	}
	public String getSiteDomain() {
		return siteDomain;
	}
	public void setSiteDomain(String siteDomain) {
		this.siteDomain = siteDomain;
	}
	public Integer getDepositWatingHours() {
		return depositWatingHours;
	}
	public void setDepositWatingHours(Integer depositWatingHours) {
		this.depositWatingHours = depositWatingHours;
	}
	public String getKrpSecretKey() {
		return krpSecretKey;
	}
	public void setKrpSecretKey(String krpSecretKey) {
		this.krpSecretKey = krpSecretKey;
	}
	public String getKrpRequestUrl() {
		return krpRequestUrl;
	}
	public void setKrpRequestUrl(String krpRequestUrl) {
		this.krpRequestUrl = krpRequestUrl;
	}
	public String getTid() {
		return tid;
	}
	public void setTid(String tid) {
		this.tid = tid;
	}
	public String getCancelMsg() {
		return cancelMsg;
	}
	public void setCancelMsg(String cancelMsg) {
		this.cancelMsg = cancelMsg;
	}
	public List<PayProd> getProds() {
		return prods;
	}
	public void setProds(List<PayProd> prods) {
		this.prods = prods;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserNm() {
		return userNm;
	}
	public void setUserNm(String userNm) {
		this.userNm = userNm;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getSocialNo2() {
		return socialNo2;
	}
	public void setSocialNo2(String socialNo2) {
		this.socialNo2 = socialNo2;
	}
	public String getWpayUserKey() {
		return wpayUserKey;
	}
	public void setWpayUserKey(String wpayUserKey) {
		this.wpayUserKey = wpayUserKey;
	}
	
	
	

}
