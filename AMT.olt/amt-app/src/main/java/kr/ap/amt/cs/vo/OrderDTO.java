/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.cs.vo;

import java.math.BigDecimal;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
public class OrderDTO {
    private Long ordSn;
    private String ordHistNo;
    private String ordName;
    private String ordStatusCode;
    private BigDecimal finalOrdPrice;
    private int ordQty;

	public Long getOrdSn() {
		return ordSn;
	}

	public void setOrdSn(Long ordSn) {
		this.ordSn = ordSn;
	}

	public String getOrdHistNo() {
		return ordHistNo;
	}

	public void setOrdHistNo(String ordHistNo) {
		this.ordHistNo = ordHistNo;
	}

	public String getOrdName() {
        return ordName;
    }

    public void setOrdName(String ordName) {
        this.ordName = ordName;
    }

	public String getOrdStatusCode() {
		return ordStatusCode;
	}

	public void setOrdStatusCode(String ordStatusCode) {
		this.ordStatusCode = ordStatusCode;
	}

	public BigDecimal getFinalOrdPrice() {
		return finalOrdPrice;
	}

	public void setFinalOrdPrice(BigDecimal finalOrdPrice) {
		this.finalOrdPrice = finalOrdPrice;
	}

	public int getOrdQty() {
		return ordQty;
	}

	public void setOrdQty(int ordQty) {
		this.ordQty = ordQty;
	}
}
