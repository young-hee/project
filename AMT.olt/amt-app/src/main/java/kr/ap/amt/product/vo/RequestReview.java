/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.product.vo;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
public class RequestReview {
    
	private String prodReviewUnit;
	private String prodReviewType;
	private Long onlineProdSn;
	private Long prodSn;
	private String styleCode;
	private String prodReviewSort;
	private String topReviewOnlyYn;
	private String topReviewFirstYn;
	private String scope ;
	private Long prodReviewSn;
	private String startDate;
	private String endDate;
	private String status;
	private String imageOnlyYn;

	/*공통*/
	private Integer offset;
	private Integer limit;
	
	
	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public Long getProdReviewSn() {
		return prodReviewSn;
	}
	public void setProdReviewSn(Long prodReviewSn) {
		this.prodReviewSn = prodReviewSn;
	}
	public String getTopReviewFirstYn() {
		return topReviewFirstYn;
	}
	public void setTopReviewFirstYn(String topReviewFirstYn) {
		this.topReviewFirstYn = topReviewFirstYn;
	}
	public String getProdReviewUnit() {
		return prodReviewUnit;
	}
	public void setProdReviewUnit(String prodReviewUnit) {
		this.prodReviewUnit = prodReviewUnit;
	}
	public String getProdReviewType() {
		return prodReviewType;
	}
	public void setProdReviewType(String prodReviewType) {
		this.prodReviewType = prodReviewType;
	}
	public Long getOnlineProdSn() {
		return onlineProdSn;
	}
	public void setOnlineProdSn(Long onlineProdSn) {
		this.onlineProdSn = onlineProdSn;
	}
	public Long getProdSn() {
		return prodSn;
	}
	public void setProdSn(Long prodSn) {
		this.prodSn = prodSn;
	}
	public String getStyleCode() {
		return styleCode;
	}
	public void setStyleCode(String styleCode) {
		this.styleCode = styleCode;
	}
	public String getProdReviewSort() {
		return prodReviewSort;
	}
	public void setProdReviewSort(String prodReviewSort) {
		this.prodReviewSort = prodReviewSort;
	}
	public Integer getOffset() {
		return offset;
	}
	public void setOffset(Integer offset) {
		this.offset = offset;
	}
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	public String getTopReviewOnlyYn() {
		return topReviewOnlyYn;
	}
	public void setTopReviewOnlyYn(String topReviewOnlyYn) {
		this.topReviewOnlyYn = topReviewOnlyYn;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getImageOnlyYn() {
		return imageOnlyYn;
	}
	public void setImageOnlyYn(String imageOnlyYn) {
		this.imageOnlyYn = imageOnlyYn;
	}
}
