package kr.ap.amt.my.vo;

import net.g1project.ecp.api.model.order.order.OrdChangeShipAddress;
import net.g1project.ecp.api.model.order.order.OrdHistProdEx;

import java.util.List;

public class MyReqDTO {

	// 상품
	private List<OrdHistProdEx> ordHistProdList;

	// 주문 배송지
	private OrdChangeShipAddress ordChangeShipAddress;

	public void setOrdChangeShipAddress(OrdChangeShipAddress ordChangeShipAddress) {
		this.ordChangeShipAddress = ordChangeShipAddress;
	}

	public OrdChangeShipAddress getOrdChangeShipAddress() {
		return ordChangeShipAddress;
	}

	public List<OrdHistProdEx> getOrdHistProdList() {
		return ordHistProdList;
	}

	public void setOrdHistProdList(List<OrdHistProdEx> ordHistProdList) {
		this.ordHistProdList = ordHistProdList;
	}
}
