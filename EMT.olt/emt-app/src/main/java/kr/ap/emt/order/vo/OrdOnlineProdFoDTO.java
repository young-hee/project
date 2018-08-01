package kr.ap.emt.order.vo;

import net.g1project.ecp.api.model.order.order.OrdHistProdEx;
import net.g1project.ecp.api.model.order.order.OrdProdEx;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class OrdOnlineProdFoDTO {
	
    /**
     * 온라인상품(OnlineProd)
     */
    private Long onlineProdSn;					 // 온라인상품일련번호
    private String onlineProdCode;				 // 온라인상품코드
    private String onlineProdName;				 // 온라인상품명
	private String onlineProdImgUrl;			 // 온라인상품 이미지
	private String bulkDcOnlineProdCode;		 // 묶음할인온라인상품코드
	private String bulkDcOnlineProdName;		 // 묶음할인온라인상품명
    private Integer repImgNo; 					 // 대표이미지번호
	private String ordHistProdStatusCode;		 //주문이력상품상태코드
	private String ordHistProdTypeCode;			 // 주문이력상품유형코드
	private BigDecimal finalOnlineSaleAmtPcurSum;// 상품판매가(상품판매가 X 주문수량)
	private Integer ordQtySum;					 // 주문수량(단위상품 X 주문수량)
	private Long claimReasonSn;				 	 // 클레임사유 일련번호
	private String claimReasonName;				 // 클레임 사유명
	private String claimReason;				 	 // 클레임사유
    private List<OrdHistProdEx> ordHistProdList; // 주문이력상품목록(단위)
	private Integer cancelQtySum;                // 취소수량

	public void addOrdHistProdEx(OrdHistProdEx ordHistProdEx) {
        setFinalOnlineSaleAmtPcurSum(getFinalOnlineSaleAmtPcurSum().add(ordHistProdEx.getFinalOnlineSaleAmtPcur()));
        setOrdQtySum(getOrdQtySum() + ordHistProdEx.getOrdQty());
        if(ordHistProdList == null) {
            ordHistProdList = new ArrayList<>();
        }
        ordHistProdList.add(ordHistProdEx);
	}
	
    /**
     * @return the onlineProdSn
     */
    public Long getOnlineProdSn() {
        return onlineProdSn;
    }

    /**
     * @param onlineProdSn the onlineProdSn to set
     */
    public void setOnlineProdSn(Long onlineProdSn) {
        this.onlineProdSn = onlineProdSn;
    }

    /**
     * @return the onlineProdCode
     */
    public String getOnlineProdCode() {
        return onlineProdCode;
    }

    /**
     * @param onlineProdCode the onlineProdCode to set
     */
    public void setOnlineProdCode(String onlineProdCode) {
        this.onlineProdCode = onlineProdCode;
    }

    /**
     * @return the onlineProdName
     */
    public String getOnlineProdName() {
        return onlineProdName;
    }

    /**
     * @param onlineProdName the onlineProdName to set
     */
    public void setOnlineProdName(String onlineProdName) {
        this.onlineProdName = onlineProdName;
    }

	public String getOnlineProdImgUrl() {
		return onlineProdImgUrl;
	}

	public void setOnlineProdImgUrl(String onlineProdImgUrl) {
		this.onlineProdImgUrl = onlineProdImgUrl;
	}

	public String getBulkDcOnlineProdCode() {
		return bulkDcOnlineProdCode;
	}

	public void setBulkDcOnlineProdCode(String bulkDcOnlineProdCode) {
		this.bulkDcOnlineProdCode = bulkDcOnlineProdCode;
	}

	public String getBulkDcOnlineProdName() {
		return bulkDcOnlineProdName;
	}

	public void setBulkDcOnlineProdName(String bulkDcOnlineProdName) {
		this.bulkDcOnlineProdName = bulkDcOnlineProdName;
	}

	/**
     * @return the repImgNo
     */
    public Integer getRepImgNo() {
        return repImgNo;
    }

    /**
     * @param repImgNo the repImgNo to set
     */
    public void setRepImgNo(Integer repImgNo) {
        this.repImgNo = repImgNo;
    }

	public String getOrdHistProdTypeCode() {
		return ordHistProdTypeCode;
	}

	public void setOrdHistProdTypeCode(String ordHistProdTypeCode) {
		this.ordHistProdTypeCode = ordHistProdTypeCode;
	}

	/**
     * @return the ordHistProdList
	 */
    public List<OrdHistProdEx> getOrdHistProdList() {
        return ordHistProdList;
    }

    /**
     * @param ordHistProdList the ordHistProdList to set
	 */
    public void setOrdHistProdList(List<OrdHistProdEx> ordHistProdList) {
        this.ordHistProdList = ordHistProdList;
    }

	public BigDecimal getFinalOnlineSaleAmtPcurSum() {
		return finalOnlineSaleAmtPcurSum;
	}

	public void setFinalOnlineSaleAmtPcurSum(BigDecimal finalOnlineSaleAmtPcurSum) {
		this.finalOnlineSaleAmtPcurSum = finalOnlineSaleAmtPcurSum;
	}

	public Integer getOrdQtySum() {
		return ordQtySum;
	}

	public void setOrdQtySum(Integer ordQtySum) {
		this.ordQtySum = ordQtySum;
	}

	public Long getClaimReasonSn() {
		return claimReasonSn;
	}

	public void setClaimReasonSn(Long claimReasonSn) {
		this.claimReasonSn = claimReasonSn;
	}

	public String getClaimReasonName() {
		return claimReasonName;
	}

	public void setClaimReasonName(String claimReasonName) {
		this.claimReasonName = claimReasonName;
	}

	public String getClaimReason() {
		return claimReason;
	}

	public void setClaimReason(String claimReason) {
		this.claimReason = claimReason;
	}

	public void setCancelQtySum(Integer cancelQtySum) {
		this.cancelQtySum = cancelQtySum;
	}

	public Integer getCancelQtySum() {
		return cancelQtySum;
	}

	public String getOrdHistProdStatusCode() {
		return ordHistProdStatusCode;
	}

	public void setOrdHistProdStatusCode(String ordHistProdStatusCode) {
		this.ordHistProdStatusCode = ordHistProdStatusCode;
	}
}
