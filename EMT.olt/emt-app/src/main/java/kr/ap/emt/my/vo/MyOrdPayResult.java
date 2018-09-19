package kr.ap.emt.my.vo;

import net.g1project.ecp.api.model.order.order.OrdPayEx;
import net.g1project.ecp.api.model.order.order.PgPayEx;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MyOrdPayResult {

	private List<OrdPayEx> pgList;
	private List<OrdPayEx> refundPGList;

	private BigDecimal deposit = BigDecimal.ZERO;

	public MyOrdPayResult(List<OrdPayEx> ordPay) {

		pgList = new ArrayList<>();
		refundPGList = new ArrayList<>();

		if (ordPay != null && ordPay.size() > 0) {

			for (OrdPayEx o : ordPay) {
				if ("OrdPay".equals(o.getOrdPayTypeCode())) {
					if ("PG".equals(o.getPayMethodTypeCode()) || "Deposit".equals(o.getPayMethodTypeCode())) {
						pgList.add(o);
					}
				}
				else if ("RefundPay".equals(o.getOrdPayTypeCode())) {
					if ("PG".equals(o.getPayMethodTypeCode()) || "Deposit".equals(o.getPayMethodTypeCode())) {
						refundPGList.add(o);
					}
				}
			}
		}
	}

	public List<OrdPayEx> getPgList() {
		return pgList;
	}

	public void setPgList(List<OrdPayEx> pgList) {
		this.pgList = pgList;
	}

	public BigDecimal getDeposit() {
		return deposit;
	}

	public void setDeposit(BigDecimal deposit) {
		this.deposit = deposit;
	}

	public List<OrdPayEx> getRefundPGList() {
		return refundPGList;
	}

	public void setRefundPGList(List<OrdPayEx> refundPGList) {
		this.refundPGList = refundPGList;
	}
}
