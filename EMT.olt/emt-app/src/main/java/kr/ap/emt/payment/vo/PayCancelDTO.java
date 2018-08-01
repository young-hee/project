/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.payment.vo;

import java.math.BigDecimal;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class PayCancelDTO {
	
	//네이버 결제아이디
	private String paymentId;
	
	//취소 요청 금액
	private String cancelAmount;
	
	//취소 사유
	private String cancelReason;
	
	//취소 요청자 (1: 구매자, 2: 가맹자 관리자)
	private String cancelRequester;

	public String getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(String paymentId) {
		this.paymentId = paymentId;
	}

	

	public String getCancelAmount() {
		return cancelAmount;
	}

	public void setCancelAmount(String cancelAmount) {
		this.cancelAmount = cancelAmount;
	}

	public String getCancelReason() {
		return cancelReason;
	}

	public void setCancelReason(String cancelReason) {
		this.cancelReason = cancelReason;
	}

	public String getCancelRequester() {
		return cancelRequester;
	}

	public void setCancelRequester(String cancelRequester) {
		this.cancelRequester = cancelRequester;
	}
	
	
	

}
