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
public class InicisPayDTO extends PayDTO {
	
	private String goPayMethod;

	public String getGoPayMethod() {
		return goPayMethod;
	}

	public void setGoPayMethod(String goPayMethod) {
		this.goPayMethod = goPayMethod;
	}
	
	
}
