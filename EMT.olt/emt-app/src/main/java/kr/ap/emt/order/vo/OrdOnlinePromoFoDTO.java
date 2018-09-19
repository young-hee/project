package kr.ap.emt.order.vo;

import net.g1project.ecp.api.model.order.order.OrdHistProdEx;
import net.g1project.ecp.api.model.order.order.OrdProdEx;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public class OrdOnlinePromoFoDTO {

    /* 프로모션 기본정보 */
    private Long promoSn;
    private String promoName;
    private String promoTypeCode;

    /* 프로모션 합계정보 */
    private BigDecimal totalProductSaleAmount = BigDecimal.ZERO;
    private BigDecimal totalFinalOnlineSaleAmount = BigDecimal.ZERO;

    /* 프로모션 주문온라인상품 목록 */
    private List<OrdOnlineProdFoDTO> ordOnlineProdFoList;
    private Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap;

    //M+N프로모션
    private Integer baseQty = 0;
	private Integer awardQty = 0;

	/* 묶음판매상품 기본정보 */
	private String bulkDcOnlineProdName;
	private String bulkDcOnlineProdImgUrl;

	/* 묶음판매상품 합계정보 */
	private BigDecimal totalBulkDcProductSaleAmount = BigDecimal.ZERO;
	private BigDecimal totalBulkDcFinalOnlineSaleAmount = BigDecimal.ZERO;
	private BigDecimal prodCancelAmtSum = BigDecimal.ZERO;


	private String receivedClaimReasonName;
	private String foReceivedClaimReason;

	private Integer ordQtySum = 0;
	private Integer claimQtySum = 0;
	private Integer cancelQtySum = 0;
	private Integer rtnRequestPossibleQtySum = 0;

	private String singleProdYn;

	private String ordHistProdStatusCode;

	public Long getPromoSn() {
		return promoSn;
	}

	public void setPromoSn(Long promoSn) {
		this.promoSn = promoSn;
	}

	public String getPromoName() {
		return promoName;
	}

	public void setPromoName(String promoName) {
		this.promoName = promoName;
	}

	public String getPromoTypeCode() {
		return promoTypeCode;
	}

	public void setPromoTypeCode(String promoTypeCode) {
		this.promoTypeCode = promoTypeCode;
	}

	public BigDecimal getTotalProductSaleAmount() {
		return totalProductSaleAmount;
	}

	public void setTotalProductSaleAmount(BigDecimal totalProductSaleAmount) {
		this.totalProductSaleAmount = totalProductSaleAmount;
	}

	public BigDecimal getTotalFinalOnlineSaleAmount() {
		return totalFinalOnlineSaleAmount;
	}

	public void setTotalFinalOnlineSaleAmount(BigDecimal totalFinalOnlineSaleAmount) {
		this.totalFinalOnlineSaleAmount = totalFinalOnlineSaleAmount;
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

	public Integer getBaseQty() {
		return baseQty;
	}

	public void setBaseQty(Integer baseQty) {
		this.baseQty = baseQty;
	}

	public Integer getAwardQty() {
		return awardQty;
	}

	public void setAwardQty(Integer awardQty) {
		this.awardQty = awardQty;
	}

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

	public String getReceivedClaimReasonName() {
		return receivedClaimReasonName;
	}

	public void setReceivedClaimReasonName(String receivedClaimReasonName) {
		this.receivedClaimReasonName = receivedClaimReasonName;
	}

	public String getFoReceivedClaimReason() {
		return foReceivedClaimReason;
	}

	public void setFoReceivedClaimReason(String foReceivedClaimReason) {
		this.foReceivedClaimReason = foReceivedClaimReason;
	}

	public Integer getOrdQtySum() {
		return ordQtySum;
	}

	public void setOrdQtySum(Integer ordQtySum) {
		this.ordQtySum = ordQtySum;
	}

	public Integer getCancelQtySum() {
		return cancelQtySum;
	}

	public void setCancelQtySum(Integer cancelQtySum) {
		this.cancelQtySum = cancelQtySum;
	}

	public String getSingleProdYn() {
		return singleProdYn;
	}

	public void setSingleProdYn(String singleProdYn) {
		this.singleProdYn = singleProdYn;
	}

	public String getOrdHistProdStatusCode() {
		return ordHistProdStatusCode;
	}

	public void setOrdHistProdStatusCode(String ordHistProdStatusCode) {
		this.ordHistProdStatusCode = ordHistProdStatusCode;
	}

	public void setProdCancelAmtSum(BigDecimal prodCancelAmtSum) {
		this.prodCancelAmtSum = prodCancelAmtSum;
	}

	public BigDecimal getProdCancelAmtSum() {
		return prodCancelAmtSum;
	}

	public void setClaimQtySum(Integer claimQtySum) {
		this.claimQtySum = claimQtySum;
	}

	public Integer getClaimQtySum() {
		return claimQtySum;
	}

	public void setRtnRequestPossibleQtySum(Integer rtnRequestPossibleQtySum) {
		this.rtnRequestPossibleQtySum = rtnRequestPossibleQtySum;
	}

	public Integer getRtnRequestPossibleQtySum() {
		return rtnRequestPossibleQtySum;
	}
}
