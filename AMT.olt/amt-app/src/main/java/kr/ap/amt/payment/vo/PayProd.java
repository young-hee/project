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
public class PayProd {
	
	private String prodSn;
	private int prodQty;
	private String prodName;
	
	public String getProdSn() {
		return prodSn;
	}
	public void setProdSn(String prodSn) {
		this.prodSn = prodSn;
	}
	
	public int getProdQty() {
		return prodQty;
	}
	public void setProdQty(int prodQty) {
		this.prodQty = prodQty;
	}
	public String getProdName() {
		return prodName;
	}
	public void setProdName(String prodName) {
		this.prodName = prodName;
	}
	
	

}
