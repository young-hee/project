package kr.ap.emt.order.vo;

import net.g1project.ecp.api.model.order.order.OrdHistAmtCompare;
import net.g1project.ecp.api.model.order.order.OrdHistAmtEx;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OrdPaymentResultDTO {

	// 주문 금액
	private BigDecimal ordPayment = BigDecimal.ZERO;

	// 할인/포인트
	private BigDecimal salePoint = BigDecimal.ZERO;

	// 결제 금액
	private BigDecimal totalPayment = BigDecimal.ZERO;

	// 온라인 주문
	private BigDecimal onlineShipProd;

	// 테이크 아웃
	private BigDecimal storeShipProd;

	// 구매 특가 상품
	private BigDecimal spPriceAwardProd;

	// 포장/쇼핑백 추가
	private BigDecimal spUnitPacking;

	// 배송비
	private BigDecimal shipFee;


	// 쿠폰할인

	// 뷰티포인트
	private BigDecimal membershipPoint;

	// 진주알
	private BigDecimal activityPoint;

	private Map<String, BigDecimal> ordAmt;

	public OrdPaymentResultDTO(List compare) {

		ordAmt = new HashMap();

		if (compare != null && compare.size() > 0) {
			for (Object obj : compare) {
				if (obj instanceof OrdHistAmtCompare) {
					OrdHistAmtCompare o = (OrdHistAmtCompare) obj;
					ordAmt.put(o.getOrdHistAmtTypeCode(), (o.getBeforeAmtPcur().subtract(o.getAfterAmtPcur())));
				}
				else if (obj instanceof OrdHistAmtEx) {
					OrdHistAmtEx o = (OrdHistAmtEx) obj;
					ordAmt.put(o.getOrdHistAmtTypeCode(), o.getAmtPcur());
				}
			}
		}

		setPayment();
	}

	private void setPayment() {

		onlineShipProd = getOrDefault("OnlineShipProd", "payment");
		storeShipProd = getOrDefault("StorePickupProd", "payment");
		spPriceAwardProd = getOrDefault("SpPriceAwardProd", "payment");
		spUnitPacking = getOrDefault("ShipUnitPacking", "payment").add(getOrDefault("ProdUnitPacking", "payment"));
		shipFee = getOrDefault("DefaultShipFee", "payment");

		membershipPoint = getOrDefault("MembershipExch", "point");
		activityPoint = getOrDefault("ActivityPointExch", "point");

		totalPayment = ordPayment.subtract(salePoint);
	}

	private BigDecimal getOrDefault(String key, String addType) {
		BigDecimal bd = ordAmt.getOrDefault(key, BigDecimal.ZERO);
		if ("payment".equals(addType)) {
			ordPayment = ordPayment.add(bd);
		}
		else if("point".equals(addType)) {
			salePoint = salePoint.add(bd);
		}

		return bd;
	}

	public Map<String, BigDecimal> getOrdAmt() {
		return ordAmt;
	}

	public void setOrdAmt(Map<String, BigDecimal> ordAmt) {
		this.ordAmt = ordAmt;
	}

	public BigDecimal getOrdPayment() {
		return ordPayment;
	}

	public void setOrdPayment(BigDecimal ordPayment) {
		this.ordPayment = ordPayment;
	}

	public BigDecimal getSalePoint() {
		return salePoint;
	}

	public void setSalePoint(BigDecimal salePoint) {
		this.salePoint = salePoint;
	}

	public BigDecimal getTotalPayment() {
		return totalPayment;
	}

	public void setTotalPayment(BigDecimal totalPayment) {
		this.totalPayment = totalPayment;
	}

	public BigDecimal getOnlineShipProd() {
		return onlineShipProd;
	}

	public void setOnlineShipProd(BigDecimal onlineShipProd) {
		this.onlineShipProd = onlineShipProd;
	}

	public BigDecimal getStoreShipProd() {
		return storeShipProd;
	}

	public void setStoreShipProd(BigDecimal storeShipProd) {
		this.storeShipProd = storeShipProd;
	}

	public BigDecimal getSpPriceAwardProd() {
		return spPriceAwardProd;
	}

	public void setSpPriceAwardProd(BigDecimal spPriceAwardProd) {
		this.spPriceAwardProd = spPriceAwardProd;
	}

	public BigDecimal getSpUnitPacking() {
		return spUnitPacking;
	}

	public void setSpUnitPacking(BigDecimal spUnitPacking) {
		this.spUnitPacking = spUnitPacking;
	}

	public BigDecimal getShipFee() {
		return shipFee;
	}

	public void setShipFee(BigDecimal shipFee) {
		this.shipFee = shipFee;
	}

	public BigDecimal getMembershipPoint() {
		return membershipPoint;
	}

	public void setMembershipPoint(BigDecimal membershipPoint) {
		this.membershipPoint = membershipPoint;
	}

	public BigDecimal getActivityPoint() {
		return activityPoint;
	}

	public void setActivityPoint(BigDecimal activityPoint) {
		this.activityPoint = activityPoint;
	}

}
