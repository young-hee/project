package kr.ap.amt.my.vo;

import net.g1project.ecp.api.model.order.order.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class MyOrdTemplateDTO {

	private String purchaserName;

	// 금액
	private MyOrdAmt ordAmt;

	// 결제금액
	private MyOrdPayResult ordPayResult;

	private String state;

	private List<OrdHistProdEx> onlineProd;

	private List<OrdHistProdEx> takeProd;

	public Date ordDate;

	// 주문 배송지
	private OrdChangeShipAddress ordChangeShipAddress;


	MyOrdTemplateDTO() {

	}

	public MyOrdTemplateDTO(OrdEx ordEx, String state) {

		init(ordEx, state);
	}

	public MyOrdTemplateDTO(ClaimOrdHistInfo c, String state) {

		init(c, state);
	}

	public void init(Object obj, String state) {
		this.state = state;

		onlineProd = new ArrayList<>();
		takeProd = new ArrayList<>();

		if (obj instanceof ClaimOrdHistInfo) {
			ClaimOrdHistInfo c = (ClaimOrdHistInfo) obj;

			ordDate = c.getClaimReceivedDt();
			purchaserName = c.getOrdHistEx().getPurchaserName().getName1();
			makeOrdPayResult(c.getOrdHistEx().getOrdPayExList());
			makeOrdAmt(c.getOrdHistAmtCompareList(), c.getOrdHistEx());
			makeGoods(c.getOrdShipAddressExList());
		}
		else if (obj instanceof OrdEx) {
			OrdEx ordEx = (OrdEx) obj;

			ordDate = ordEx.getOrdReceivedDt();
			purchaserName = ordEx.getOrdHistEx().getPurchaserName().getName1();
			makeOrdPayResult(ordEx.getOrdHistEx().getOrdPayExList());
			if (state != null && (ordEx.getOrdHistAmtCompareList() != null && ordEx.getOrdHistAmtCompareList().size() > 0))
				makeOrdAmt(ordEx.getOrdHistAmtCompareList(), ordEx.getOrdHistEx());
			else
				makeOrdAmt(ordEx.getOrdHistEx().getOrdHistAmtExList(), ordEx.getOrdHistEx());
			makeGoods(ordEx.getOrdShipAddressExList());
		}
	}

	private void makeOrdPayResult(List<OrdPayEx> ordPay) {
		ordPayResult = new MyOrdPayResult(ordPay);
	}

	private void makeOrdAmt(List payment, OrdHistEx ex) {
		ordAmt = new MyOrdAmt(payment, ex.getOrdHistMembershipExList());
	}

	private void makeGoods(List<OrdShipAddressEx> ordShipAddressList) {
		for (OrdShipAddressEx ordShipAddressEx : ordShipAddressList) { // 주문배송지목록(확장)
			if (ordChangeShipAddress == null) {
				setShipAddress(ordShipAddressEx);
			}

			List otfList = null;
			StoreEx storeEx = ordShipAddressEx.getStoreEx();

			if ("return".equals(state) || "exchange".equals(state)) {
				otfList = ordShipAddressEx.getClaimRtnOrderExList();
			} else {
				otfList = ordShipAddressEx.getOrdOtfExList();
			}


			for (Object ordOtfEx : otfList) { // 주문배송지시목록


				List<OrdHistProdEx> ohpe = null;
				OrdOtfEx ooe = null;

				if (ordOtfEx instanceof OrdOtfEx) {
					ooe = (OrdOtfEx) ordOtfEx;

					if (ooe.getOrdHistProdExList() != null && ooe.getOrdHistProdExList().size() > 0)
						ohpe = ("cancel".equals(state)) ? ooe.getCancelOrdHistProdExList() : ooe.getOrdHistProdExList();
				} else if (ordOtfEx instanceof ClaimRtnOrderEx) {
					ClaimRtnOrderEx croe = (ClaimRtnOrderEx) ordOtfEx;
					if (croe.getOrdHistProdExList() != null && croe.getOrdHistProdExList().size() > 0)
						ohpe = croe.getOrdHistProdExList();
				}

				if (ohpe != null) {
					for (OrdHistProdEx o : ohpe) { //주문이력상품 목록
						boolean storePickup = ordShipAddressEx.getStoreSn() != null;
						if (storePickup) {
							takeProd.add(o);
						}
						else {
							onlineProd.add(o);
						}
					}
				}
			}
		}
	}

	private void setShipAddress(OrdShipAddressEx ord) {
		ordChangeShipAddress = new OrdChangeShipAddress();
		ordChangeShipAddress.setShipAddressTypeCode(ord.getShipAddressTypeCode());
		ordChangeShipAddress.setRecipientName(ord.getRecipientName());
		ordChangeShipAddress.setRecipientPhoneNo1(ord.getRecipientPhoneNo1());
		ordChangeShipAddress.setRecipientPhoneNo2(ord.getRecipientPhoneNo2());
		ordChangeShipAddress.setRecipientEmailAddress(ord.getRecipientEmailAddress());
		ordChangeShipAddress.setRecipientAddress(ord.getRecipientAddress());
		ordChangeShipAddress.setcStoreCenterCode(ord.getcStoreCenterCode());
		ordChangeShipAddress.setcStoreStoreCode(ord.getcStoreStoreCode());
		ordChangeShipAddress.setcStoreCompany(ord.getcStoreCompany());
		ordChangeShipAddress.setcStoreName(ord.getcStoreName());
		ordChangeShipAddress.setcStorePhoneNo(ord.getcStorePhoneNo());
		ordChangeShipAddress.setcStoreDockNo(ord.getcStoreDockNo());
		ordChangeShipAddress.setcStoreCenterName(ord.getcStoreCenterName());
		ordChangeShipAddress.setcStoreAddress(ord.getcStoreAddress());
		ordChangeShipAddress.setcStoreArrivalAreaCode(ord.getcStoreArrivalAreaCode());
		ordChangeShipAddress.setcStoreArrivalAreaBarcode(ord.getcStoreArrivalAreaBarcode());
		ordChangeShipAddress.setcStoreDongNmCode(ord.getcStoreDongNmCode());
		ordChangeShipAddress.setcStoreArrivalDongNm(ord.getcStoreArrivalDongNm());
	}

	public String getPurchaserName() {
		return purchaserName;
	}

	public void setPurchaserName(String purchaserName) {
		this.purchaserName = purchaserName;
	}

	public OrdChangeShipAddress getOrdChangeShipAddress() {
		return ordChangeShipAddress;
	}

	public void setOrdChangeShipAddress(OrdChangeShipAddress ordChangeShipAddress) {
		this.ordChangeShipAddress = ordChangeShipAddress;
	}

	public MyOrdAmt getOrdAmt() {
		return ordAmt;
	}

	public void setOrdAmt(MyOrdAmt ordAmt) {
		this.ordAmt = ordAmt;
	}

	public MyOrdPayResult getOrdPayResult() {
		return ordPayResult;
	}

	public void setOrdPayResult(MyOrdPayResult ordPayResult) {
		this.ordPayResult = ordPayResult;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public List<OrdHistProdEx> getOnlineProd() {
		return onlineProd;
	}

	public void setOnlineProd(List<OrdHistProdEx> onlineProd) {
		this.onlineProd = onlineProd;
	}

	public List<OrdHistProdEx> getTakeProd() {
		return takeProd;
	}

	public void setTakeProd(List<OrdHistProdEx> takeProd) {
		this.takeProd = takeProd;
	}
}
