/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.payment.vo;

import java.util.HashMap;
import java.util.List;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class EximbayPayDTO extends PayDTO {
	
	List<EximbayProd> eximbayProds;

	public List<EximbayProd> getEximbayProds() {
		return eximbayProds;
	}

	public void setEximbayProds(List<EximbayProd> eximbayProds) {
		this.eximbayProds = eximbayProds;
	}
	
	
	
}
