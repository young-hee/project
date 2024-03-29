package kr.ap.emt.my.vo;

import kr.ap.emt.order.vo.OrdOnlineProdFoDTO;
import kr.ap.emt.order.vo.OrdOnlinePromoFoDTO;
import net.g1project.ecp.api.model.order.order.*;
import org.springframework.util.StringUtils;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MyOrdDTO {

	public MyOrdDTO() {}

	private String state;

	// 멤버쉽
	private List<OrdMembershipEx> ordMembershipList;

	// 온라인 상품
	private List<OrdOnlineProdFoDTO> shippingOrdOnlineProdList;

	// M+N 온라인
	private List<OrdOnlinePromoFoDTO> shippingMNPromoProdList;

	// 동시구매 온라인
	private List<OrdOnlinePromoFoDTO> shippingSameTimePurPromoList;

	// 테이크아웃 상품
	private List<OrdOnlineProdFoDTO> storePickupOrdOnlineProdList;

	// M+N 테이크 아웃
	private List<OrdOnlinePromoFoDTO> storePickupMNPromoProdList;

	// 동시구매 테이크 아웃
	private List<OrdOnlinePromoFoDTO> storePickupSameTimePurPromoList;

	// 뷰티포인트 상품
	private List<OrdOnlineProdFoDTO> shippingOrdOnlineBeautyPointProdList;

	// 진주알 상품
	private List<OrdOnlineProdFoDTO> shippingOrdOnlineActivityPointProdList;

	// 주문단위증정프로모션목록
	private List<OrdUnitAwardOrdPromoEx> ordUnitAwardOrdPromo;

	// 주문이력-쿠폰(확장)목록
	private List<OrdHistCouponEx> ordHistCouponExList;

	// 주문이력-프로모션(확장)목록
	private List<OrdHistPromoEx> ordHistPromoExList;

	// 정체 불명
	private List<OrdOtfEx> ordOtfExList;

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

	// 전체 카운트
	private Integer totalOrdOnlineProdCnt;

	// 온라인 카운트
	private Integer shipOrdOnlineProdCnt;

	// 테이크 아웃 카운트
	private Integer storeOrdOnlineProdCnt;

	// 온라인 취소 카운트
	private Integer onlineCancelCnt;

	// 테이크 아웃 카운트
	private Integer storeCancelCnt;

	// 매장 정보
	private StoreEx storeEx;



	public MyOrdDTO(OrdEx ordEx) {

//		state = null;
//		this.goods = ordEx;
//
//		ordUnitAwardOrdPromo = ordEx.getOrdHistEx().getOrdUnitAwardOrdPromoExList();
//		makeOrdSavingPoint(ordEx.getOrdHistEx().getOrdSavingPointList());
//		makeOrdPayResult(ordEx.getOrdHistEx().getOrdPayExList());
//		makeOrdAmt(ordEx.getOrdHistEx().getOrdHistAmtExList());
//		setMembership(ordEx.getOrdMembershipExList());
//		makeGoods(ordEx.getOrdShipAddressExList());

		init(ordEx, null);
	}

	public MyOrdDTO(OrdEx ordEx, String state) {

//		this.state = state;
//		this.goods = ordEx;
//
//		ordUnitAwardOrdPromo = ordEx.getOrdHistEx().getOrdUnitAwardOrdPromoExList();
//		makeOrdSavingPoint(ordEx.getOrdHistEx().getOrdSavingPointList());
//		makeOrdPayResult(ordEx.getOrdHistEx().getOrdPayExList());
//		makeOrdAmt(ordEx.getOrdHistAmtCompareList());
//		setMembership(ordEx.getOrdMembershipExList());
//		makeGoods(ordEx.getOrdShipAddressExList());

		init(ordEx, state);
	}

	public MyOrdDTO(ClaimOrdHistInfo c, String state) {

//		this.state = state;
//		this.goods = c;
//
//		ordUnitAwardOrdPromo = c.getOrdHistEx().getOrdUnitAwardOrdPromoExList();
//		makeOrdSavingPoint(c.getOrdHistEx().getOrdSavingPointList());
//		makeOrdPayResult(c.getOrdHistEx().getOrdPayExList());
//		makeOrdAmt(c.getOrdHistAmtCompareList());
//		setMembership(c.getOrdMembershipExList());
//		makeGoods(c.getOrdShipAddressExList());

		init(c, state);
	}

	public void init(Object obj, String state) {
		this.state = state;
		this.goods = obj;

		if (obj instanceof ClaimOrdHistInfo) {
			ClaimOrdHistInfo c = (ClaimOrdHistInfo) obj;

			makeOrdHistEx(c.getOrdHistEx());
			makeOrdSavingPoint(c.getOrdHistEx().getOrdSavingPointList());
			makeOrdPayResult(c.getOrdHistEx().getOrdPayExList());
			makeOrdAmt(c.getOrdHistAmtCompareList(), c.getOrdHistEx());
			setMembership(c.getOrdMembershipExList());
			makeGoods(c.getOrdShipAddressExList());
		}
		else if (obj instanceof OrdEx) {
			OrdEx ordEx = (OrdEx) obj;


			makeOrdHistEx(ordEx.getOrdHistEx());
			makeOrdSavingPoint(ordEx.getOrdHistEx().getOrdSavingPointList());
			makeOrdPayResult(ordEx.getOrdHistEx().getOrdPayExList());
			if (state != null && (ordEx.getOrdHistAmtCompareList() != null && ordEx.getOrdHistAmtCompareList().size() > 0))
				makeOrdAmt(ordEx.getOrdHistAmtCompareList(), ordEx.getOrdHistEx());
			else
				makeOrdAmt(ordEx.getOrdHistEx().getOrdHistAmtExList(), ordEx.getOrdHistEx());
			setMembership(ordEx.getOrdMembershipExList());
			makeGoods(ordEx.getOrdShipAddressExList());
		}
	}

	private void makeOrdHistEx(OrdHistEx ex) {
		ordUnitAwardOrdPromo = ex.getOrdUnitAwardOrdPromoExList();
		ordHistPromoExList = ex.getOrdHistPromoExList();
		ordHistCouponExList = ex.getOrdHistCouponExList();
	}

	private void makeOrdPayResult(List<OrdPayEx> ordPay) {
		ordPayResult = new MyOrdPayResult(ordPay);
	}

	private void makeOrdAmt(List payment, OrdHistEx ex) {
		ordAmt = new MyOrdAmt(payment, ex.getOrdHistMembershipExList());
	}

	private void makeOrdSavingPoint(List<OrdSavingPoint> point) {

		ordSavingPoint = new HashMap<>();
		if (point != null && point.size() > 0) {
			for (OrdSavingPoint p : point) {
				ordSavingPoint.put(p.getPointTypeCode(), p.getTotalSavingPoint());
			}
		}
	}

	private void makeGoods(List<OrdShipAddressEx> ordShipAddressList) {

		/* 3.상품목록 추출 */
		Integer ordQtySum = 0;
		Integer cancelQtySum = 0;
		Integer claimQtySum = 0;
		totalOrdOnlineProdCnt = 0;
		shipOrdOnlineProdCnt = 0;
		storeOrdOnlineProdCnt = 0;
		onlineCancelCnt = 0;
		storeCancelCnt = 0;
		BigDecimal finalOnlineSaleAmtPcurSum = new BigDecimal(0);

		// List<OrdMembershipEx> ordMembershipList = ordEx.getOrdMembershipExList();


		shippingOrdOnlineProdList = new ArrayList<>();
		storePickupOrdOnlineProdList = new ArrayList<>();
		shippingOrdOnlineBeautyPointProdList = new ArrayList<>();
		shippingOrdOnlineActivityPointProdList = new ArrayList<>();
		shippingMNPromoProdList = new ArrayList<>();
		shippingSameTimePurPromoList = new ArrayList<>();
		storePickupMNPromoProdList = new ArrayList<>();
		storePickupSameTimePurPromoList = new ArrayList<>();
		ordOtfExList = new ArrayList<>();

		Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = new HashMap<String, OrdOnlineProdFoDTO>();

		/* M+N, 동시구매프로모션 그룹 만들기 */
		Map<Long, OrdOnlinePromoFoDTO> shippingMNPromoMap = new HashMap<>();
		Map<String, OrdOnlinePromoFoDTO> shippingSameTimePurPromoMap = new HashMap<>(); // key : 동시구매프로모션일련번호 + 동시구매묶음번호
		Map<Long, OrdOnlinePromoFoDTO> storePickupMNPromoMap = new HashMap<>();
		Map<String, OrdOnlinePromoFoDTO> storePickupSameTimePurPromoMap = new HashMap<>(); // key : 동시구매프로모션일련번호 + 동시구매묶음번호


		for (OrdShipAddressEx ordShipAddressEx : ordShipAddressList) { // 주문배송지목록(확장)
			if (ordChangeShipAddress == null) {
				if ("N".equals(ordShipAddressEx.getStorePickupYn()))
					setShipAddress(ordShipAddressEx);
			}

			List otfList = null;
			if ("Y".equals(ordShipAddressEx.getStorePickupYn()) && storeEx == null) {
				storeEx = ordShipAddressEx.getStoreEx();
			}


			if ("return".equals(state) || "exchange".equals(state)) {
				otfList = ordShipAddressEx.getClaimRtnOrderExList();
			}
			else {
				otfList = ordShipAddressEx.getOrdOtfExList();
			}


			for (Object ordOtfEx : otfList) { // 주문배송지시목록


				List<OrdHistProdEx> ohpe = null;
				OrdOtfEx ooe = null;

				if (ordOtfEx instanceof OrdOtfEx) {
					ooe = (OrdOtfEx) ordOtfEx;

					// 온라인상품만 포
					if ("N".equals(ordShipAddressEx.getStorePickupYn())) {
						ordOtfExList.add(ooe);
					}
					if (ooe.getOrdHistProdExList() != null && ooe.getOrdHistProdExList().size() > 0)
						ohpe = ("cancel".equals(state)) ? ooe.getCancelOrdHistProdExList() : ooe.getOrdHistProdExList();

					List<OrdHistProdEx> cancelList = ooe.getCancelOrdHistProdExList();
					if (cancelList != null && cancelList.size() > 0) {
						for (OrdHistProdEx p : cancelList) {
							if ("Ord".equals(p.getOrdHistProdTypeCode())
								|| "BulkDc".equals(p.getOrdHistProdTypeCode())
								|| "SameTimePur".equals(p.getOrdHistProdTypeCode())) {
								if ("Y".equals(p.getStorePickupProdYn())) {
									storeCancelCnt++;
								}
								else {
									onlineCancelCnt++;
								}
							}

						}
					}
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

						String prodCode = ordHistProdEx.getOrdProdEx().getOnlineProdCode();
						if (ordHistProdEx.getOrdProdEx().getBulkDcOnlineProdCode() != null) {
							prodCode = ordHistProdEx.getOrdProdEx().getBulkDcOnlineProdCode();
						}
						String key = String.format("%s_%s", prodCode, storePickup ? "Store" : "Ship"); // 온라인상품코드,매장일련번호

						OrdOnlineProdFoDTO ordOnlineProdFo = null;
						// M+N상품
						if(ordHistProdEx.getmPlusNOrdPromoSn()!= null) {
							if (storePickup) {
								ordOnlineProdFo = getMPlusNPromoOnlineProd(ordHistProdEx, storePickupMNPromoMap);
								storeOrdOnlineProdCnt++;
							}
							else {
								ordOnlineProdFo = getMPlusNPromoOnlineProd(ordHistProdEx, shippingMNPromoMap);
								shipOrdOnlineProdCnt++;
							}
						}
						// 동시구매상품
						else if(ordHistProdEx.getSameTimePurPromoSn() != null) {
							if (storePickup) {
								ordOnlineProdFo = getSameTimePurPromoOnlineProd(ordHistProdEx, storePickupSameTimePurPromoMap);
								storeOrdOnlineProdCnt++;
							}
							else {
								ordOnlineProdFo = getSameTimePurPromoOnlineProd(ordHistProdEx, shippingSameTimePurPromoMap);
								shipOrdOnlineProdCnt++;
							}
						}
						//온라인상품
						else {
							ordOnlineProdFo = ordOnlineProdFoMap.get(key);
							if(ordOnlineProdFo == null) {
								ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx);
								ordOnlineProdFoMap.put(key, ordOnlineProdFo);
								if (storePickup) {
									ordOnlineProdFo.setStoreEx(storeEx);
									storePickupOrdOnlineProdList.add(ordOnlineProdFo);
									storeOrdOnlineProdCnt++;

								} else {
									//뷰티포인트상품
									if ("Y".equals(ordHistProdEx.getIntegrationMembershipExchYn())) {
										shippingOrdOnlineBeautyPointProdList.add(ordOnlineProdFo);
										shipOrdOnlineProdCnt++;
									}
									//활동포인트상품
									else if ("Y".equals(ordHistProdEx.getActivityPointExchYn())) {
										shippingOrdOnlineActivityPointProdList.add(ordOnlineProdFo);
										shipOrdOnlineProdCnt++;
									}
									else{
										if (!StringUtils.isEmpty(ordOnlineProdFo.getOrdHistProdTypeCode())
											&& ("Ord".equals(ordOnlineProdFo.getOrdHistProdTypeCode())
											|| "BulkDc".equals(ordOnlineProdFo.getOrdHistProdTypeCode())
											|| "SameTimePur".equals(ordOnlineProdFo.getOrdHistProdTypeCode())
											|| "ProdCancel".equals(ordOnlineProdFo.getOrdHistProdTypeCode()))) {
											shippingOrdOnlineProdList.add(ordOnlineProdFo);
											shipOrdOnlineProdCnt++;
										}
									}
								}
							}
							else {
								if (!"ProdCancel".equals(ordOnlineProdFo.getOrdHistProdStatusCode())
									&& "ProdCancel".equals(ordHistProdEx.getOrdHistProdStatusCode())) {

								}
								else {
									ordOnlineProdFo.setOrdHistProdStatusCode(ordHistProdEx.getOrdHistProdStatusCode());
								}
								if (storePickup) {
									storeOrdOnlineProdCnt++;
								}
								else {
									if ("Y".equals(ordHistProdEx.getIntegrationMembershipExchYn())) {
										shipOrdOnlineProdCnt++;
									}
									//활동포인트상품
									else if ("Y".equals(ordHistProdEx.getActivityPointExchYn())) {
										shipOrdOnlineProdCnt++;
									}
									else{
										if (!StringUtils.isEmpty(ordOnlineProdFo.getOrdHistProdTypeCode())
											&& ("Ord".equals(ordOnlineProdFo.getOrdHistProdTypeCode())
											|| "BulkDc".equals(ordOnlineProdFo.getOrdHistProdTypeCode())
											|| "SameTimePur".equals(ordOnlineProdFo.getOrdHistProdTypeCode())
											|| "ProdCancel".equals(ordOnlineProdFo.getOrdHistProdTypeCode()))) {
											shipOrdOnlineProdCnt++;
										}
									}
								}
							}
						}


						totalOrdOnlineProdCnt++;

//						ordOnlineProdFo.addOrdHistProdEx(ordHistProdEx);

						/* 금액합산, 수량합산 start */
						ordQtySum += ordHistProdEx.getOrdQty();
						cancelQtySum += ordHistProdEx.getCancelQty();
						claimQtySum += ordHistProdEx.getClaimReceivedQty();

						finalOnlineSaleAmtPcurSum = finalOnlineSaleAmtPcurSum.add(ordHistProdEx.getFinalOnlineSaleAmtPcur());
						if ("ProdCancel".equals(ordHistProdEx.getOrdHistProdStatusCode())) {
							ordOnlineProdFo.setProdCancelAmtSum(ordOnlineProdFo.getProdCancelAmtSum().add(ordHistProdEx.getFinalOnlineSalePricePcur().multiply(BigDecimal.valueOf(ordHistProdEx.getCancelQty()))));
						}

						ordOnlineProdFo.setRtnRequestPossibleQtySum(ordOnlineProdFo.getRtnRequestPossibleQtySum() + ordHistProdEx.getRtnRequestPossibleQty());
						ordOnlineProdFo.setFinalOnlineSaleAmtPcurSum(ordOnlineProdFo.getFinalOnlineSaleAmtPcurSum().add(ordHistProdEx.getFinalOnlineSaleAmtPcur()));
						ordOnlineProdFo.setOrdQtySum(ordOnlineProdFo.getOrdQtySum() + ordHistProdEx.getOrdQty());
						ordOnlineProdFo.setCancelQtySum(ordOnlineProdFo.getCancelQtySum() + ordHistProdEx.getCancelQty());
						ordOnlineProdFo.setClaimQtySum(ordOnlineProdFo.getClaimQtySum() + ordHistProdEx.getClaimReceivedQty());

						if (ordHistProdEx.getOrdProdEx() != null) {
							if ("Prod".equals(ordHistProdEx.getOrdProdEx().getProdTypeCode())) {
								List<OrdHistProdEx> ordHistProdList = ordOnlineProdFo.getProdList(); // 주문이력상품목록
								ordHistProdList.add(ordHistProdEx);
							}
							else if ("FreeGift".equals(ordHistProdEx.getOrdProdEx().getProdTypeCode())) {
								List<OrdHistProdEx> ordHistProdList = ordOnlineProdFo.getFreeGiftList(); // 주문이력상품목록
								ordHistProdList.add(ordHistProdEx);
							}
							else if ("Presale".equals(ordHistProdEx.getOrdProdEx().getProdTypeCode())) {
								List<OrdHistProdEx> ordHistProdList = ordOnlineProdFo.getPreSale(); // 주문이력상품목록
								ordHistProdList.add(ordHistProdEx);
							}
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
		}

		if (shippingMNPromoMap.size() > 0) {
			shippingMNPromoProdList = new ArrayList<>(shippingMNPromoMap.values());
		}
		if (shippingSameTimePurPromoMap.size() > 0) {
			shippingSameTimePurPromoList = new ArrayList<>(shippingSameTimePurPromoMap.values());
		}
		if (storePickupMNPromoMap.size() > 0) {
			storePickupMNPromoProdList = new ArrayList<>(storePickupMNPromoMap.values());
		}
		if (storePickupSameTimePurPromoMap.size() > 0) {
			storePickupSameTimePurPromoList = new ArrayList<>(storePickupSameTimePurPromoMap.values());
		}


//		shipOrdOnlineProdCnt = shippingOrdOnlineProdList.size() + shippingMNPromoProdList.size()
//			+ shippingSameTimePurPromoList.size() + shippingOrdOnlineBeautyPointProdList.size() + shippingOrdOnlineActivityPointProdList.size();
//
//		storeOrdOnlineProdCnt = storePickupOrdOnlineProdList.size() + storePickupMNPromoProdList.size() + storePickupSameTimePurPromoList.size();
	}

	private OrdOnlineProdFoDTO getMPlusNPromoOnlineProd(OrdHistProdEx ordHistProdEx, Map<Long, OrdOnlinePromoFoDTO> ordOnlinePromoFoMap) {
		OrdOnlinePromoFoDTO ordOnlinePromoFo = ordOnlinePromoFoMap.get(ordHistProdEx.getmPlusNOrdPromoSn());
		if(ordOnlinePromoFo == null) {
			ordOnlinePromoFo = new OrdOnlinePromoFoDTO();
			ordOnlinePromoFo.setPromoSn(ordHistProdEx.getmPlusNOrdPromoSn());
			ordOnlinePromoFo.setPromoName(ordHistProdEx.getmPlusNOrdPromoNameRlang());
			ordOnlinePromoFo.setOrdOnlineProdFoMap(new HashMap<>());
			ordOnlinePromoFo.setOrdOnlineProdFoList(new ArrayList<>());
			ordOnlinePromoFo.setOrdHistProdStatusCode(ordHistProdEx.getOrdHistProdStatusCode());

			ordOnlinePromoFo.setPromoTypeCode(ordHistProdEx.getmPlusNTypeCode());

			ordOnlinePromoFo.setReceivedClaimReasonName(ordHistProdEx.getReceivedClaimReasonName());
			ordOnlinePromoFo.setFoReceivedClaimReason(ordHistProdEx.getFoReceivedClaimReason());

			ordOnlinePromoFoMap.put(ordHistProdEx.getmPlusNOrdPromoSn(), ordOnlinePromoFo);
		}

		BigDecimal base = ordHistProdEx.getFinalOnlineSalePricePcur().multiply(new BigDecimal(ordHistProdEx.getmPlusNBaseQty()));
		BigDecimal award = ordHistProdEx.getFinalOnlineSalePricePcur().multiply(new BigDecimal(ordHistProdEx.getmPlusNAwardQty()));

		ordOnlinePromoFo.setTotalProductSaleAmount(ordOnlinePromoFo.getTotalProductSaleAmount().add(base));
		ordOnlinePromoFo.setTotalFinalOnlineSaleAmount(ordOnlinePromoFo.getTotalFinalOnlineSaleAmount().add(base.add(award)));

		ordOnlinePromoFo.setBaseQty(ordOnlinePromoFo.getBaseQty() + ordHistProdEx.getmPlusNBaseQty());
		ordOnlinePromoFo.setAwardQty(ordOnlinePromoFo.getAwardQty() + ordHistProdEx.getmPlusNAwardQty());

		ordOnlinePromoFo.setOrdQtySum(ordOnlinePromoFo.getOrdQtySum() + ordHistProdEx.getOrdQty());
		ordOnlinePromoFo.setCancelQtySum(ordOnlinePromoFo.getCancelQtySum() + ordHistProdEx.getCancelQty());
		ordOnlinePromoFo.setClaimQtySum(ordOnlinePromoFo.getClaimQtySum() + ordHistProdEx.getClaimReceivedQty());
		ordOnlinePromoFo.setRtnRequestPossibleQtySum(ordOnlinePromoFo.getRtnRequestPossibleQtySum() + ordHistProdEx.getRtnRequestPossibleQty());


		return getOrdOnlineProdFo(ordHistProdEx, ordOnlinePromoFo);
	}

	private OrdOnlineProdFoDTO getSameTimePurPromoOnlineProd(OrdHistProdEx ordHistProdEx, Map<String, OrdOnlinePromoFoDTO> ordOnlinePromoFoMap) {
		String key = ordHistProdEx.getSameTimePurPromoSn() + "_" + ordHistProdEx.getSameTimePurProdBulkNo();
		OrdOnlinePromoFoDTO ordOnlinePromoFo = ordOnlinePromoFoMap.get(key);
		if(ordOnlinePromoFo == null) {
			ordOnlinePromoFo = new OrdOnlinePromoFoDTO();
			ordOnlinePromoFo.setPromoSn(ordHistProdEx.getSameTimePurPromoSn());
			ordOnlinePromoFo.setPromoName(ordHistProdEx.getSameTimePurOrdPromoNameRlang());
			ordOnlinePromoFo.setOrdOnlineProdFoMap(new HashMap<>());
			ordOnlinePromoFo.setOrdOnlineProdFoList(new ArrayList<>());
			ordOnlinePromoFo.setPromoTypeCode(key);
			ordOnlinePromoFo.setOrdHistProdStatusCode(ordHistProdEx.getOrdHistProdStatusCode());

			ordOnlinePromoFo.setReceivedClaimReasonName(ordHistProdEx.getReceivedClaimReasonName());
			ordOnlinePromoFo.setFoReceivedClaimReason(ordHistProdEx.getFoReceivedClaimReason());

			ordOnlinePromoFoMap.put(key, ordOnlinePromoFo);
		}

		if ("ProdCancel".equals(ordHistProdEx.getOrdHistProdStatusCode())) {
			ordOnlinePromoFo.setProdCancelAmtSum(ordOnlinePromoFo.getProdCancelAmtSum().add(ordHistProdEx.getFinalOnlineSalePricePcur().multiply(BigDecimal.valueOf(ordHistProdEx.getCancelQty()))));
		}

		ordOnlinePromoFo.setOrdQtySum(ordOnlinePromoFo.getOrdQtySum() + ordHistProdEx.getOrdQty());
		ordOnlinePromoFo.setCancelQtySum(ordOnlinePromoFo.getCancelQtySum() + ordHistProdEx.getCancelQty());
		ordOnlinePromoFo.setClaimQtySum(ordOnlinePromoFo.getClaimQtySum() + ordHistProdEx.getClaimReceivedQty());
		ordOnlinePromoFo.setRtnRequestPossibleQtySum(ordOnlinePromoFo.getRtnRequestPossibleQtySum() + ordHistProdEx.getRtnRequestPossibleQty());

		ordOnlinePromoFo.setTotalProductSaleAmount(ordOnlinePromoFo.getTotalProductSaleAmount().add(ordHistProdEx.getFinalOnlineSaleAmtPcur()));
		ordOnlinePromoFo.setTotalFinalOnlineSaleAmount(ordOnlinePromoFo.getTotalFinalOnlineSaleAmount().add(ordHistProdEx.getProdSalePricePcur()));

		return getOrdOnlineProdFo(ordHistProdEx, ordOnlinePromoFo);
	}

	private OrdOnlineProdFoDTO getOrdOnlineProdFo(OrdHistProdEx ordHistProdEx,  OrdOnlinePromoFoDTO ordOnlinePromoFo) {
		Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = ordOnlinePromoFo.getOrdOnlineProdFoMap();
		OrdOnlineProdFoDTO ordOnlineProdFo = ordOnlineProdFoMap.get(ordHistProdEx.getOrdProdEx().getOnlineProdCode());
		if(ordOnlineProdFo == null) {
			ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx);
			ordOnlineProdFoMap.put(ordHistProdEx.getOrdProdEx().getOnlineProdCode(), ordOnlineProdFo);
			ordOnlinePromoFo.getOrdOnlineProdFoList().add(ordOnlineProdFo);
		}
		return ordOnlineProdFo;
	}

	/* 온라인상품 목록 세팅*/
	private OrdOnlineProdFoDTO makeOrdOnlineProdFo(OrdHistProdEx ordHistProd) {
		OrdOnlineProdFoDTO ordOnlineProdFo = new OrdOnlineProdFoDTO();
		OrdProdEx ordProd = ordHistProd.getOrdProdEx();
		ordOnlineProdFo.setOnlineProdSn(ordProd.getOnlineProdSn());
		if ("BulkDc".equals(ordHistProd.getOrdHistProdTypeCode())) {
			ordOnlineProdFo.setOnlineProdImgUrl(ordProd.getBulkDcOnlineProdImgUrl()); // 이미지
		}
		else {
			ordOnlineProdFo.setOnlineProdImgUrl(ordProd.getOnlineProdImgUrl()); // 이미지
		}
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
		ordOnlineProdFo.setClaimQtySum(0);
		ordOnlineProdFo.setRtnRequestPossibleQtySum(0);
		ordOnlineProdFo.setOrdHistProdList(new ArrayList<OrdHistProdEx>());						// 주문이력(확장)
		ordOnlineProdFo.setPreSale(new ArrayList<OrdHistProdEx>());						// 주문이력(확장)
		ordOnlineProdFo.setProdList(new ArrayList<OrdHistProdEx>());						// 주문이력(확장)
		ordOnlineProdFo.setFreeGiftList(new ArrayList<OrdHistProdEx>());						// 주문이력(확장)
		ordOnlineProdFo.setSingleProdYn(ordProd.getSingleProdYn());
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

	private void setMembership(List<OrdMembershipEx> ordMembershipEx) {
		ordMembershipList = ordMembershipEx;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public List<OrdOnlineProdFoDTO> getShippingOrdOnlineBeautyPointProdList() {
		return shippingOrdOnlineBeautyPointProdList;
	}

	public void setShippingOrdOnlineBeautyPointProdList(List<OrdOnlineProdFoDTO> shippingOrdOnlineBeautyPointProdList) {
		this.shippingOrdOnlineBeautyPointProdList = shippingOrdOnlineBeautyPointProdList;
	}

	public List<OrdOnlineProdFoDTO> getShippingOrdOnlineActivityPointProdList() {
		return shippingOrdOnlineActivityPointProdList;
	}

	public void setShippingOrdOnlineActivityPointProdList(List<OrdOnlineProdFoDTO> shippingOrdOnlineActivityPointProdList) {
		this.shippingOrdOnlineActivityPointProdList = shippingOrdOnlineActivityPointProdList;
	}

	public List<OrdOtfEx> getOrdOtfExList() {
		return ordOtfExList;
	}

	public void setOrdOtfExList(List<OrdOtfEx> ordOtfExList) {
		this.ordOtfExList = ordOtfExList;
	}

	public Integer getTotalOrdOnlineProdCnt() {
		return totalOrdOnlineProdCnt;
	}

	public void setTotalOrdOnlineProdCnt(Integer totalOrdOnlineProdCnt) {
		this.totalOrdOnlineProdCnt = totalOrdOnlineProdCnt;
	}

	public Integer getShipOrdOnlineProdCnt() {
		return shipOrdOnlineProdCnt;
	}

	public void setShipOrdOnlineProdCnt(Integer shipOrdOnlineProdCnt) {
		this.shipOrdOnlineProdCnt = shipOrdOnlineProdCnt;
	}

	public Integer getStoreOrdOnlineProdCnt() {
		return storeOrdOnlineProdCnt;
	}

	public void setStoreOrdOnlineProdCnt(Integer storeOrdOnlineProdCnt) {
		this.storeOrdOnlineProdCnt = storeOrdOnlineProdCnt;
	}

	public List<OrdUnitAwardOrdPromoEx> getOrdUnitAwardOrdPromo() {
		return ordUnitAwardOrdPromo;
	}

	public void setOrdUnitAwardOrdPromo(List<OrdUnitAwardOrdPromoEx> ordUnitAwardOrdPromo) {
		this.ordUnitAwardOrdPromo = ordUnitAwardOrdPromo;
	}

	public List<OrdOnlinePromoFoDTO> getShippingMNPromoProdList() {
		return shippingMNPromoProdList;
	}

	public void setShippingMNPromoProdList(List<OrdOnlinePromoFoDTO> shippingMNPromoProdList) {
		this.shippingMNPromoProdList = shippingMNPromoProdList;
	}

	public List<OrdOnlinePromoFoDTO> getShippingSameTimePurPromoList() {
		return shippingSameTimePurPromoList;
	}

	public void setShippingSameTimePurPromoList(List<OrdOnlinePromoFoDTO> shippingSameTimePurPromoList) {
		this.shippingSameTimePurPromoList = shippingSameTimePurPromoList;
	}

	public List<OrdOnlinePromoFoDTO> getStorePickupMNPromoProdList() {
		return storePickupMNPromoProdList;
	}

	public void setStorePickupMNPromoProdList(List<OrdOnlinePromoFoDTO> storePickupMNPromoProdList) {
		this.storePickupMNPromoProdList = storePickupMNPromoProdList;
	}

	public List<OrdOnlinePromoFoDTO> getStorePickupSameTimePurPromoList() {
		return storePickupSameTimePurPromoList;
	}

	public void setStorePickupSameTimePurPromoList(List<OrdOnlinePromoFoDTO> storePickupSameTimePurPromoList) {
		this.storePickupSameTimePurPromoList = storePickupSameTimePurPromoList;
	}

	public List<OrdHistCouponEx> getOrdHistCouponExList() {
		return ordHistCouponExList;
	}

	public void setOrdHistCouponExList(List<OrdHistCouponEx> ordHistCouponExList) {
		this.ordHistCouponExList = ordHistCouponExList;
	}

	public List<OrdHistPromoEx> getOrdHistPromoExList() {
		return ordHistPromoExList;
	}

	public void setOrdHistPromoExList(List<OrdHistPromoEx> ordHistPromoExList) {
		this.ordHistPromoExList = ordHistPromoExList;
	}

	public void setStoreEx(StoreEx storeEx) {
		this.storeEx = storeEx;
	}

	public StoreEx getStoreEx() {
		return storeEx;
	}

	public Integer getOnlineCancelCnt() {
		return onlineCancelCnt;
	}

	public void setOnlineCancelCnt(Integer onlineCancelCnt) {
		this.onlineCancelCnt = onlineCancelCnt;
	}

	public Integer getStoreCancelCnt() {
		return storeCancelCnt;
	}

	public void setStoreCancelCnt(Integer storeCancelCnt) {
		this.storeCancelCnt = storeCancelCnt;
	}
}
