package kr.ap.emt.my.vo;

import kr.ap.emt.order.controller.OrderBaseController;
import kr.ap.emt.order.vo.OrdOnlineProdFoDTO;
import net.g1project.ecp.api.model.order.order.*;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MyOrdInfoDTO {

	public MyOrdInfoDTO() {

	}

	private String state;

	// 멤버쉽
	private List<OrdMembershipEx> ordMembershipList;

	// 온라인 상품
	private List<OrdOnlineProdFoDTO> shippingOrdOnlineProdList;

	// 테이크아웃 상품
	private List<OrdOnlineProdFoDTO> storePickupOrdOnlineProdList;

	// 주문 이력 금액
	private List<OrdHistAmtEx> ordHistAmtExList;

	// 주문 배송지
	private OrdChangeShipAddress ordChangeShipAddress;

	// 주문 상세
	private OrdEx ordEx;

	// 클레임 상세
	private ClaimOrdHistInfo claimOrdHistInfo;

	// 대표상품
	private String repGoods;

	// 금액
	private MyOrdAmt ordAmt;

	// 결제금액
	private MyOrdPayResult ordPayResult;

	// 주문적립 포인트
	private Map<String, Integer> ordSavingPoint;

	public Map<String, Integer> getOrdSavingPoint() {
		return ordSavingPoint;
	}

	public void setOrdSavingPoint(Map<String, Integer> ordSavingPoint) {
		this.ordSavingPoint = ordSavingPoint;
	}

	public MyOrdPayResult getOrdPayResult() {
		return ordPayResult;
	}

	public void setOrdPayResult(MyOrdPayResult ordPayResult) {
		this.ordPayResult = ordPayResult;
	}

	public void setOrdAmt(MyOrdAmt ordAmt) {
		this.ordAmt = ordAmt;
	}

	public MyOrdAmt getOrdAmt() {
		return ordAmt;
	}

	public String getRepGoods() {
		return repGoods;
	}

	public void setRepGoods(String repGoods) {
		this.repGoods = repGoods;
	}

	public ClaimOrdHistInfo getClaimOrdHistInfo() {
		return claimOrdHistInfo;
	}

	public void setClaimOrdHistInfo(ClaimOrdHistInfo claimOrdHistInfo) {
		this.claimOrdHistInfo = claimOrdHistInfo;
	}

	public OrdChangeShipAddress getOrdChangeShipAddress() {
		return ordChangeShipAddress;
	}

	private Object goods;

	public Object getGoods() {
		return goods;
	}

	public void setGoods(Object goods) {
		this.goods = goods;
	}

	public void setOrdChangeShipAddress(OrdChangeShipAddress ordChangeShipAddress) {
		this.ordChangeShipAddress = ordChangeShipAddress;
	}

	public OrdEx getOrdEx() {
		return ordEx;
	}

	public void setOrdEx(OrdEx ordEx) {
		this.ordEx = ordEx;
	}

	public List<OrdMembershipEx> getOrdMembershipList() {
		return ordMembershipList;
	}

	public void setOrdMembershipList(List<OrdMembershipEx> ordMembershipList) {
		this.ordMembershipList = ordMembershipList;
	}

	public List<OrdOnlineProdFoDTO> getShippingOrdOnlineProdList() {
		return shippingOrdOnlineProdList;
	}

	public void setShippingOrdOnlineProdList(List<OrdOnlineProdFoDTO> shippingOrdOnlineProdList) {
		this.shippingOrdOnlineProdList = shippingOrdOnlineProdList;
	}

	public List<OrdOnlineProdFoDTO> getStorePickupOrdOnlineProdList() {
		return storePickupOrdOnlineProdList;
	}

	public void setStorePickupOrdOnlineProdList(List<OrdOnlineProdFoDTO> storePickupOrdOnlineProdList) {
		this.storePickupOrdOnlineProdList = storePickupOrdOnlineProdList;
	}

	public List<OrdHistAmtEx> getOrdHistAmtExList() {
		return ordHistAmtExList;
	}

	public void setOrdHistAmtExList(List<OrdHistAmtEx> ordHistAmtExList) {
		this.ordHistAmtExList = ordHistAmtExList;
	}

	public MyOrdInfoDTO(OrdEx ordEx) {

		state = null;
		this.goods = ordEx;

		makeOrdSavingPoint(ordEx.getOrdHistEx().getOrdSavingPointList());
		makeOrdPayResult(ordEx.getOrdHistEx().getOrdPayExList());
		makeOrdAmt(ordEx.getOrdHistEx().getOrdHistAmtExList());
		setMembership(ordEx.getOrdMembershipExList());
		makeGoods(ordEx.getOrdShipAddressExList());
	}

	public MyOrdInfoDTO(OrdEx ordEx, String state) {

		this.state = state;
		this.goods = ordEx;

		makeOrdSavingPoint(ordEx.getOrdHistEx().getOrdSavingPointList());
		makeOrdPayResult(ordEx.getOrdHistEx().getOrdPayExList());
		makeOrdAmt(ordEx.getOrdHistAmtCompareList());
		setMembership(ordEx.getOrdMembershipExList());
		makeGoods(ordEx.getOrdShipAddressExList());
	}

	public MyOrdInfoDTO(ClaimOrdHistInfo c, String state) {

		this.state = state;
		this.goods = c;

		OrdOnlineProdFoDTO dto = new OrdOnlineProdFoDTO();
		dto.setOrdHistProdList(c.getOrdHistEx().getOrdHistProdExList());

		makeOrdSavingPoint(c.getOrdHistEx().getOrdSavingPointList());
		makeOrdPayResult(c.getOrdHistEx().getOrdPayExList());
		makeOrdAmt(c.getOrdHistAmtCompareList());
		setMembership(c.getOrdMembershipExList());
		makeGoods(c.getOrdShipAddressExList());
	}

	private void setMembership(List<OrdMembershipEx> ordMembershipEx) {
		ordMembershipList = ordMembershipEx;
	}

	private void makeGoods(List<OrdShipAddressEx> ordShipAddressList) {
		/* 3.상품목록 추출 */
		Integer ordQtySum = 0;
		Integer cancelQtySum = 0;
		BigDecimal finalOnlineSaleAmtPcurSum = new BigDecimal(0);

		// List<OrdMembershipEx> ordMembershipList = ordEx.getOrdMembershipExList();

		Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = new HashMap<String, OrdOnlineProdFoDTO>();
		storePickupOrdOnlineProdList = new ArrayList<OrdOnlineProdFoDTO>();

		for (OrdShipAddressEx ordShipAddressEx : ordShipAddressList) { // 주문배송지목록(확장)
			if (ordChangeShipAddress == null) {
				setShipAddress(ordShipAddressEx);
			}

			List otfList = null;

			if ("return".equals(state) || "exchange".equals(state)) {
				otfList = ordShipAddressEx.getClaimRtnOrderExList();
			}
			else {
				otfList = ordShipAddressEx.getOrdOtfExList();
			}


			for (Object ordOtfEx : otfList) { // 주문배송지시목록
				shippingOrdOnlineProdList = new ArrayList<OrdOnlineProdFoDTO>();

				List<OrdHistProdEx> ohpe = null;
				OrdOtfEx ooe = null;

				if (ordOtfEx instanceof  OrdOtfEx) {
					ooe = (OrdOtfEx) ordOtfEx;
					if (ooe.getOrdHistProdExList() != null && ooe.getOrdHistProdExList().size() > 0)
						ohpe = ("cancel".equals(state)) ? ooe.getCancelOrdHistProdExList() : ooe.getOrdHistProdExList();
				}
				else if (ordOtfEx instanceof ClaimRtnOrderEx) {
					ClaimRtnOrderEx croe = (ClaimRtnOrderEx) ordOtfEx;
					if (croe.getOrdHistProdExList() != null && croe.getOrdHistProdExList().size() > 0)
						ohpe = croe.getOrdHistProdExList();
				}

				if (ohpe != null) {
					for (OrdHistProdEx ordHistProdEx : ohpe) { //주문이력상품 목록
						// 매장번호가 존재하는지..
						boolean storePickup = ordShipAddressEx.getStoreSn() != null;
						String key = String.format("%s_%s", ordHistProdEx.getOrdProdEx().getOnlineProdCode(), storePickup ? "Store" : "Ship"); // 온라인상품코드,매장일련번호
						System.out.println(key);
						OrdOnlineProdFoDTO ordOnlineProdFo = ordOnlineProdFoMap.get(key);
						if (ordOnlineProdFo == null) {
							ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx); // 상품목록 생성
							ordOnlineProdFoMap.put(key, ordOnlineProdFo);
							if (storePickup) {
								storePickupOrdOnlineProdList.add(ordOnlineProdFo); // 테이크아웃 상품(Store)
							} else {
								shippingOrdOnlineProdList.add(ordOnlineProdFo); // 온라인쇼핑 상품(Ship)
							}
						}

						/* 금액합산, 수량합산 start */
						ordQtySum += ordHistProdEx.getOrdQty();
						if ("cancel".equals(state) || "ProdCancel".equals(ordHistProdEx.getOrdHistProdStatusCode())) {
							cancelQtySum += ordHistProdEx.getCancelQty();
						}
						else {
							cancelQtySum += ordHistProdEx.getClaimReceivedQty();
						}

						finalOnlineSaleAmtPcurSum = finalOnlineSaleAmtPcurSum.add(ordHistProdEx.getFinalOnlineSaleAmtPcur());

						ordOnlineProdFo.setFinalOnlineSaleAmtPcurSum(ordOnlineProdFo.getFinalOnlineSaleAmtPcurSum().add(ordHistProdEx.getFinalOnlineSaleAmtPcur()));
						ordOnlineProdFo.setOrdQtySum(ordOnlineProdFo.getOrdQtySum() + ordHistProdEx.getOrdQty());
						if ("cancel".equals(state) || "ProdCancel".equals(ordHistProdEx.getOrdHistProdStatusCode())) {
							ordOnlineProdFo.setCancelQtySum(ordOnlineProdFo.getCancelQtySum() + ordHistProdEx.getCancelQty());
						}
						else {
							ordOnlineProdFo.setCancelQtySum(ordOnlineProdFo.getCancelQtySum() + ordHistProdEx.getClaimReceivedQty());
						}


						List<OrdHistProdEx> ordHistProdList = ordOnlineProdFo.getOrdHistProdList(); // 주문이력상품목록
						ordHistProdList.add(ordHistProdEx);
						/* 금액합산, 수량합산 end */
					}
				}

				if (ordChangeShipAddress != null && ordChangeShipAddress.getShipMsg() == null && ooe != null && ooe.getShipMsg() != null) {
					ordChangeShipAddress.setShipMsg(ooe.getShipMsg());
				}
			}

			/* 클레임 회수 상품목록 추출 */
//			for (ClaimRtnOrderEx rtnOrder : ordShipAddressEx.getClaimRtnOrderExList()) {
//				this.shippingOrdOnlineProdList = new ArrayList<>();
//
//				for (OrdHistProdEx prod : rtnOrder.getOrdHistProdExList()) {
//					OrdOnlineProdFoDTO oProd = makeOrdOnlineProdFo(prod);
//					this.shippingOrdOnlineProdList.add(oProd);
//
//					ordQtySum += prod.getOrdQty();
//					finalOnlineSaleAmtPcurSum = finalOnlineSaleAmtPcurSum.add(prod.getFinalOnlineSaleAmtPcur());
//
//					oProd.setFinalOnlineSaleAmtPcurSum(oProd.getFinalOnlineSaleAmtPcurSum().add(prod.getFinalOnlineSaleAmtPcur()));
//					oProd.setOrdQtySum(oProd.getOrdQtySum() + prod.getOrdQty());
//
//					List<OrdHistProdEx> ordHistProdList = oProd.getOrdHistProdList(); // 주문이력상품목록
//					ordHistProdList.add(prod);
//				}
//			}
		}
		/* 4.주문정보 세팅 */
	}

	private void makeOrdPayResult(List<OrdPayEx> ordPay) {
		ordPayResult = new MyOrdPayResult(ordPay);
	}

	private void makeOrdAmt(List payment) {
		ordAmt = new MyOrdAmt(payment);
	}

	private void makeOrdSavingPoint(List<OrdSavingPoint> point) {

		ordSavingPoint = new HashMap<>();
		if (point != null && point.size() > 0) {
			for (OrdSavingPoint p : point) {
				ordSavingPoint.put(p.getPointTypeCode(), p.getTotalSavingPoint());
			}
		}
	}

	/* 온라인상품 목록 세팅*/
	private OrdOnlineProdFoDTO makeOrdOnlineProdFo(OrdHistProdEx ordHistProd) {
		OrdOnlineProdFoDTO ordOnlineProdFo = new OrdOnlineProdFoDTO();
		OrdProdEx ordProd = ordHistProd.getOrdProdEx();
		ordOnlineProdFo.setOnlineProdSn(ordProd.getOnlineProdSn());
		ordOnlineProdFo.setOnlineProdImgUrl(ordProd.getOnlineProdImgUrl());						// 이미지
		ordOnlineProdFo.setOnlineProdCode(ordProd.getOnlineProdCode());							// 온라인상품코드
		ordOnlineProdFo.setOnlineProdName(ordProd.getOnlineProdNameRlang());					// 온라인상품명
		ordOnlineProdFo.setBulkDcOnlineProdCode(ordProd.getBulkDcOnlineProdCode());				// 묶음할인온라인상품코드
		ordOnlineProdFo.setBulkDcOnlineProdName(ordProd.getBulkDcOnlineProdNameRlang());		// 묶음할인온라인상품명
		ordOnlineProdFo.setOrdHistProdStatusCode(ordHistProd.getOrdHistProdStatusCode());		// 주문이력상품상태코드
		ordOnlineProdFo.setOrdHistProdTypeCode(ordHistProd.getOrdHistProdTypeCode());			// 주문이력상품유형코드
		ordOnlineProdFo.setFinalOnlineSaleAmtPcurSum(BigDecimal.ZERO);							// 상품판매가(상품판매가 X 주문수량)
		ordOnlineProdFo.setClaimReason(ordHistProd.getFoReceivedClaimReason());					// 주문클레임 사유
		ordOnlineProdFo.setClaimReasonSn(ordHistProd.getReceivedClaimReasonSn());				// 주문클레임 사유 일련번호
		ordOnlineProdFo.setClaimReasonName(ordHistProd.getReceivedClaimReasonName());			// 주문클레임 사유명
		ordOnlineProdFo.setOrdQtySum(0);														// 주문수량(단위상품 X 주문수량)
		ordOnlineProdFo.setCancelQtySum(0);														// 취소수량
		ordOnlineProdFo.setOrdHistProdList(new ArrayList<OrdHistProdEx>());						// 주문이력(확장)
		if (repGoods == null) {
			repGoods = ordProd.getOnlineProdNameRlang();
		}
		return ordOnlineProdFo;
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

	public static void setFields(Object from, Object to) {
		Field[] fields = from.getClass().getDeclaredFields();
		for (Field field : fields) {
			try {
				Field fieldFrom = from.getClass().getDeclaredField(field.getName());
				fieldFrom.setAccessible(true);
				Object value = fieldFrom.get(from);
				to.getClass().getDeclaredField(field.getName()).set(to, value);

			} catch (IllegalAccessException e) {
				e.printStackTrace();
			} catch (NoSuchFieldException e) {
				e.printStackTrace();
			}
		}
	}
}
