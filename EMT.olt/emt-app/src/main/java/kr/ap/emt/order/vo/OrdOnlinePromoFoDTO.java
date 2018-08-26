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
	private Integer ordQtySum = 0;

    /* 프로모션 주문온라인상품 목록 */
    private List<OrdOnlineProdFoDTO> ordOnlineProdFoList;
    private Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap;

    //M+N프로모션
    private Integer baseQty = 0;
	private Integer awardQty = 0;

	/* 묶음판매상품 기본정보 */
	private String bulkDcOnlineProdName;
	private String bulkDcOnlineProdImgUrl;

	private String receivedClaimReasonName;
	private String foReceivedClaimReason;

	private String singleProdYn;

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

	public Integer getOrdQtySum() {
		return ordQtySum;
	}

	public void setOrdQtySum(Integer ordQtySum) {
		this.ordQtySum = ordQtySum;
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

	public String getSingleProdYn() {
		return singleProdYn;
	}

	public void setSingleProdYn(String singleProdYn) {
		this.singleProdYn = singleProdYn;
	}
}
