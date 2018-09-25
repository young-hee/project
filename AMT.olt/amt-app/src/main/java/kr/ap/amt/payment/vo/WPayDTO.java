/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.payment.vo;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class WPayDTO extends PayDTO {
	 
    // 원클릭 간편결제 추가 param
    private String userId;	//회원번호 및 비회원 식별자
    private String userNm;	//회원명 (비회원의 경우 주문자명)
    private String birth;	//생년월일(YYYYMMDD)
    private String socialNo2;	//주민번호 뒤 첫자리
    private String wpayUserKey;
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
