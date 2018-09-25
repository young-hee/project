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
public class NaverPayDTO extends PayDTO {
	
    private List<PayProd> prods; //상품정보

	public List<PayProd> getProds() {
		return prods;
	}

	public void setProds(List<PayProd> prods) {
		this.prods = prods;
	}
}
