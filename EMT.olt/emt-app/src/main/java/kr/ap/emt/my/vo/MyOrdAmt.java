package kr.ap.emt.my.vo;

import net.g1project.ecp.api.model.order.order.OrdHistAmtCompare;
import net.g1project.ecp.api.model.order.order.OrdHistAmtEx;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MyOrdAmt {

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
	private BigDecimal couponPoint = BigDecimal.ZERO;

	// 뷰티포인트
	private BigDecimal membershipPoint;

	// 진주알
	private BigDecimal activityPoint;

	private Map<String, BigDecimal> ordAmt;

	public MyOrdAmt(List compare) {

		ordAmt = new HashMap();

		if (compare != null && compare.size() > 0) {
			for (Object obj : compare) {
				if (obj instanceof OrdHistAmtCompare) {
					OrdHistAmtCompare o = (OrdHistAmtCompare) obj;
					ordAmt.put(o.getOrdHistAmtTypeCode(), (o.getBeforeAmtPcur().subtract(o.getAfterAmtPcur())));
//					ordAmt.put(o.getOrdHistAmtTypeCode(), (o.getRefundAmtPcur()));

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
		shipFee = getOrDefault("DefaultShipFee", "payment").add(getOrDefault("AddShipFee", "payment"));


		couponPoint = addBigDecimal(couponPoint, getOrDefault("ProdUnitCouponDc", "point"));
		couponPoint = addBigDecimal(couponPoint, getOrDefault("MPlusNCouponDc", "point"));
		couponPoint = addBigDecimal(couponPoint, getOrDefault("Buy1GetCouponDc", "point"));
		couponPoint = addBigDecimal(couponPoint, getOrDefault("OrdUnitCouponDc", "point"));
		membershipPoint = getOrDefault("MembershipExch", "point");
		activityPoint = getOrDefault("ActivityPointExch", "point");

		totalPayment = ordPayment.subtract(salePoint);
	}

	private BigDecimal getOrDefault(String key, String addType) {
		BigDecimal bd = ordAmt.getOrDefault(key, BigDecimal.ZERO);
		if ("payment".equals(addType)) {
			ordPayment = addBigDecimal(ordPayment, bd);
		}
		else if("point".equals(addType)) {
			salePoint = addBigDecimal(salePoint, bd);
		}

		return bd;
	}

	private BigDecimal addBigDecimal(BigDecimal sum, BigDecimal bd) {
		return sum.add(bd);
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

	public BigDecimal getCouponPoint() { return couponPoint; }

	public void setCouponPoint(BigDecimal couponPoint) { this.couponPoint = couponPoint; }
}
