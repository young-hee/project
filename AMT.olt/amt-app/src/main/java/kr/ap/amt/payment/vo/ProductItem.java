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
public class ProductItem {
	
	private String categoryType;	//결제상품 유형
	private String categoryId;		//결제상품 분류
	private String uid;				//식별값
	private String name;			//상품명
	private int count;				//상품수량
	private String payReferer;		//유입경로
	
	
	public String getCategoryType() {
		return categoryType;
	}
	public void setCategoryType(String categoryType) {
		this.categoryType = categoryType;
	}
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getUid() {
		return uid;
	}
	public void setUid(String uid) {
		this.uid = uid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getPayReferer() {
		return payReferer;
	}
	public void setPayReferer(String payReferer) {
		this.payReferer = payReferer;
	}
	
	
	
	
	
	
	
}
