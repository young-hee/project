package kr.ap.emt.order.vo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class OrdOnlineBulkDcFoDTO {

	/* 묶음판매상품 기본정보 */
	private String bulkDcOnlineProdName;
	private String bulkDcOnlineProdImgUrl;

	/* 묶음판매상품 합계정보 */
	private BigDecimal totalBulkDcProductSaleAmount = BigDecimal.ZERO;
	private BigDecimal totalBulkDcFinalOnlineSaleAmount = BigDecimal.ZERO;

	/* 온라인상품 목록 */
	private List<OrdOnlineProdFoDTO> ordOnlineProdFoList;
	private Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap;

	private Integer ordQtySum = 0;

	private String singleProdYn;


	public String getBulkDcOnlineProdName() {
		return bulkDcOnlineProdName;
	}

	public void setBulkDcOnlineProdName(String bulkDcOnlineProdName) {
		this.bulkDcOnlineProdName = bulkDcOnlineProdName;
	}

	public String getBulkDcOnlineProdImgUrl() {
		return bulkDcOnlineProdImgUrl;
	}

	public void setBulkDcOnlineProdImgUrl(String bulkDcOnlineProdImgUrl) {
		this.bulkDcOnlineProdImgUrl = bulkDcOnlineProdImgUrl;
	}

	public BigDecimal getTotalBulkDcProductSaleAmount() {
		return totalBulkDcProductSaleAmount;
	}

	public void setTotalBulkDcProductSaleAmount(BigDecimal totalBulkDcProductSaleAmount) {
		this.totalBulkDcProductSaleAmount = totalBulkDcProductSaleAmount;
	}

	public BigDecimal getTotalBulkDcFinalOnlineSaleAmount() {
		return totalBulkDcFinalOnlineSaleAmount;
	}

	public void setTotalBulkDcFinalOnlineSaleAmount(BigDecimal totalBulkDcFinalOnlineSaleAmount) {
		this.totalBulkDcFinalOnlineSaleAmount = totalBulkDcFinalOnlineSaleAmount;
	}

	public List<OrdOnlineProdFoDTO> getOrdOnlineProdFoList() {
		return ordOnlineProdFoList;
	}

	public void setOrdOnlineProdFoList(List<OrdOnlineProdFoDTO> ordOnlineProdFoList) {
		this.ordOnlineProdFoList = ordOnlineProdFoList;
	}

	public Map<String, OrdOnlineProdFoDTO> getOrdOnlineProdFoMap() {
		return ordOnlineProdFoMap;
	}

	public void setOrdOnlineProdFoMap(Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap) {
		this.ordOnlineProdFoMap = ordOnlineProdFoMap;
	}

	public Integer getOrdQtySum() {
		return ordQtySum;
	}

	public void setOrdQtySum(Integer ordQtySum) {
		this.ordQtySum = ordQtySum;
	}

	public String getSingleProdYn() {
		return singleProdYn;
	}

	public void setSingleProdYn(String singleProdYn) {
		this.singleProdYn = singleProdYn;
	}
}
