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
    private BigDecimal totalProductSaleAmount;
    private BigDecimal totalFinalOnlineSaleAmount;
    
    /* 프로모션 주문온라인상품 목록 */
    private List<OrdOnlineProdFoDTO> ordOnlineProdFoList;
    private Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap;

    /**
     * @return the promoSn
     */
    public Long getPromoSn() {
        return promoSn;
    }

    /**
     * @param promoSn the promoSn to set
     */
    public void setPromoSn(Long promoSn) {
        this.promoSn = promoSn;
    }

    /**
     * @return the promoName
     */
    public String getPromoName() {
        return promoName;
    }

    /**
     * @param promoName the promoName to set
     */
    public void setPromoName(String promoName) {
        this.promoName = promoName;
    }

    /**
     * @return the promoTypeCode
     */
    public String getPromoTypeCode() {
        return promoTypeCode;
    }

    /**
     * @param promoTypeCode the promoTypeCode to set
     */
    public void setPromoTypeCode(String promoTypeCode) {
        this.promoTypeCode = promoTypeCode;
    }

    /**
     * @return the totalProductSaleAmount
     */
    public BigDecimal getTotalProductSaleAmount() {
        return totalProductSaleAmount;
    }

    /**
     * @param totalProductSaleAmount the totalProductSaleAmount to set
     */
    public void setTotalProductSaleAmount(BigDecimal totalProductSaleAmount) {
        this.totalProductSaleAmount = totalProductSaleAmount;
    }

    /**
     * @return the totalFinalOnlineSaleAmount
     */
    public BigDecimal getTotalFinalOnlineSaleAmount() {
        return totalFinalOnlineSaleAmount;
    }

    /**
     * @param totalFinalOnlineSaleAmount the totalFinalOnlineSaleAmount to set
     */
    public void setTotalFinalOnlineSaleAmount(BigDecimal totalFinalOnlineSaleAmount) {
        this.totalFinalOnlineSaleAmount = totalFinalOnlineSaleAmount;
    }

    /**
     * @return the ordOnlineProdFoList
     */
    public List<OrdOnlineProdFoDTO> getOrdOnlineProdFoList() {
        return ordOnlineProdFoList;
    }

    /**
     * @param ordOnlineProdFoList the ordOnlineProdFoList to set
     */
    public void setOrdOnlineProdFoList(List<OrdOnlineProdFoDTO> ordOnlineProdFoList) {
        this.ordOnlineProdFoList = ordOnlineProdFoList;
    }

    /**
     * @return the ordOnlineProdFoMap
     */
    public Map<String, OrdOnlineProdFoDTO> getOrdOnlineProdFoMap() {
        return ordOnlineProdFoMap;
    }

    /**
     * @param ordOnlineProdFoMap the ordOnlineProdFoMap to set
     */
    public void setOrdOnlineProdFoMap(Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap) {
        this.ordOnlineProdFoMap = ordOnlineProdFoMap;
    }
    
    
}