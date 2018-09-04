package kr.ap.comm.order;

import kr.ap.comm.cart.OrdCartInfo;
import net.g1project.ecp.api.model.order.order.OrdReceptChange;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

public class OrderSession implements Serializable {

	/**
	 * 주문번호
	 */
	private Long ordSn = 0L;

	/**
	 * 예치금여부
	 */
	private String depositYn;

	/**
	 * 예치금
	 */
	private BigDecimal depositPrice = BigDecimal.ZERO;

	/**
	 * 결제수단일련번호
	 */
	private Long payMethodSn = 0L;

	/**
	 * 신용카드업체일련번호
	 */
	private Long creditcardCoSn = 0L;

	/**
	 * 다음결제사용여부
	 */
	private String nextPayUseYn;

	/**
	 * PG사 결제서비스코드
	 */
	private String payServiceCode;

	/**
	 * PG사 결제수단코드
	 */
	private String payMethodCode;

	/**
	 * PG 결제금액
	 */
	private BigDecimal pgPayAmt;

	private String user_incsCardNoEc;

	/**
	 * 주문접수중인 장바구니 상품일련번호목록
	 */
	private Map<Long, OrdCartInfo> ordCartInfoMap;

	/**
	 * 주문 변경 정보 저장
	 */
	private OrdReceptChange ordReceptChange;

	/**
	 * @return the ordCartInfoMap
	 */
	public Map<Long, OrdCartInfo> getOrdCartInfoMap() {
		return ordCartInfoMap;
	}

	/**
	 * @param ordCartInfoMap the ordCartInfoMap to set
	 */
	public void setOrdCartInfoMap(Map<Long, OrdCartInfo> ordCartInfoMap) {
		this.ordCartInfoMap = ordCartInfoMap;
	}

	public void addOrdCartInfo(Long ordSn, OrdCartInfo ordCartInfo) {
		if(ordCartInfoMap == null) {
			ordCartInfoMap = new HashMap<>();
		}
		ordCartInfoMap.put(ordSn, ordCartInfo);
	}

	public OrdCartInfo getOrdCartInfo(Long ordSn) {
		if(ordCartInfoMap != null) {
			return ordCartInfoMap.get(ordSn);
		}
		return null;
	}

	public void removeOrdCartInfo(Long ordSn) {
		if(ordCartInfoMap != null) {
			ordCartInfoMap.remove(ordSn);
		}
	}

	public Long getOrdSn() {
		return ordSn;
	}

	public void setOrdSn(Long ordSn) {
		this.ordSn = ordSn;
	}

	public String getDepositYn() {
		return depositYn;
	}

	public void setDepositYn(String depositYn) {
		this.depositYn = depositYn;
	}

	public BigDecimal getDepositPrice() {
		return depositPrice;
	}

	public void setDepositPrice(BigDecimal depositPrice) {
		this.depositPrice = depositPrice;
	}

	public Long getPayMethodSn() {
		return payMethodSn;
	}

	public void setPayMethodSn(Long payMethodSn) {
		this.payMethodSn = payMethodSn;
	}

	public Long getCreditcardCoSn() {
		return creditcardCoSn;
	}

	public void setCreditcardCoSn(Long creditcardCoSn) {
		this.creditcardCoSn = creditcardCoSn;
	}

	public String getNextPayUseYn() {
		return nextPayUseYn;
	}

	public void setNextPayUseYn(String nextPayUseYn) {
		this.nextPayUseYn = nextPayUseYn;
	}

	public String getPayServiceCode() {
		return payServiceCode;
	}

	public void setPayServiceCode(String payServiceCode) {
		this.payServiceCode = payServiceCode;
	}

	public String getPayMethodCode() {
		return payMethodCode;
	}

	public void setPayMethodCode(String payMethodCode) {
		this.payMethodCode = payMethodCode;
	}

	public BigDecimal getPgPayAmt() {
		return pgPayAmt;
	}

	public void setPgPayAmt(BigDecimal pgPayAmt) {
		this.pgPayAmt = pgPayAmt;
	}

	public String getUser_incsCardNoEc() {
		return user_incsCardNoEc;
	}

	public void setUser_incsCardNoEc(String user_incsCardNoEc) {
		this.user_incsCardNoEc = user_incsCardNoEc;
	}

	public OrdReceptChange getOrdReceptChange() {
		return ordReceptChange;
	}

	public void setOrdReceptChange(OrdReceptChange ordReceptChange) {
		this.ordReceptChange = ordReceptChange;
	}
}