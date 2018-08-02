package kr.ap.emt.my.vo;

import net.g1project.ecp.api.model.order.order.OrdPayEx;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MyOrdPayResult {

	public class PGData {

		private String pgName;
		private BigDecimal pgPayAmt;

		public  PGData(String name, BigDecimal payAmt) {
			this.pgName = name;
			this.pgPayAmt = payAmt;
		}

		public String getPgName() {
			return pgName;
		}

		public BigDecimal getPgPayAmt() {
			return pgPayAmt;
		}

		public void setPgName(String pgName) {
			this.pgName = pgName;
		}

		public void setPgPayAmt(BigDecimal pgPayAmt) {
			this.pgPayAmt = pgPayAmt;
		}
	}

	private List<PGData> pgList;

	private BigDecimal deposit = BigDecimal.ZERO;

	public MyOrdPayResult(List<OrdPayEx> ordPay) {

		pgList = new ArrayList<>();

		if (ordPay != null && ordPay.size() > 0) {

			for (OrdPayEx o : ordPay) {
				if ("OrdPay".equals(o.getOrdPayTypeCode())) {
					if ("deposit".equalsIgnoreCase(o.getPayMethodTypeCode())) {
						deposit = o.getPayAmt().subtract(o.getRefundAmtSum());
					}
					else if ("PG".equals(o.getPayMethodTypeCode())) {
						pgList.add(new PGData(o.getPayMethodNameBlang(), o.getPayAmt().subtract(o.getRefundAmtSum())));

					}
				}
			}
		}
	}

	public List<PGData> getPgList() {
		return pgList;
	}

	public void setPgList(List<PGData> pgList) {
		this.pgList = pgList;
	}

	public BigDecimal getDeposit() {
		return deposit;
	}

	public void setDeposit(BigDecimal deposit) {
		this.deposit = deposit;
	}
}
