package kr.ap.amt.order.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ap.amt.order.vo.OrdOtfExFoDTO;
import kr.ap.comm.cart.OrdCartInfo;
import kr.ap.comm.order.OrderSession;
import kr.ap.comm.support.common.AbstractViewController;
import kr.ap.amt.order.vo.OrdOnlineBulkDcFoDTO;
import kr.ap.amt.order.vo.OrdOnlineProdFoDTO;
import kr.ap.amt.order.vo.OrdOnlinePromoFoDTO;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.ap.ap.ShipAddressInfo;
import net.g1project.ecp.api.model.order.order.*;
import net.g1project.ecp.api.model.sales.terms.Terms;
import org.apache.commons.lang3.SerializationUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
@RequestMapping("/order")
public class OrderBaseController extends AbstractViewController {

	/** logger  */
	final Logger logger = LoggerFactory.getLogger(getClass());

	/** members */
	public static final String PARAM_KEY_MEMBER = "Member";			// 회원
	public static final String PARAM_KEY_NONMEMBER = "NonMember";	// 비회원

	/** payMethodCode **/
	public static final String PAY_METHOD_CODE_CREDIT_CARD = "credit-card";
	public static final String PAY_METHOD_CODE_BANK_AC_TRANSFER = "bank-ac-transfer";
	public static final String PAY_METHOD_CODE_MOBILE_PHONE_PAY = "mobile-phone-pay";
	public static final String PAY_METHOD_CODE_VIRTUAL_ACCOUNT = "virtual-account";
	public static final String PAY_METHOD_CODE_PAYPAL = "paypal";
	public static final String PAY_METHOD_CODE_PAYCO = "payco";
	public static final String PAY_METHOD_CODE_WPAY = "wpay";
	public static final String PAY_METHOD_CODE_NAVERPAY = "naverpay";
	public static final String PAY_METHOD_CODE_KAKAOPAY = "kakaopay";
	
	/** YN Code **/
	public static final String CODE_Y = "Y";
	public static final String CODE_N = "N";



	/**
	 * 상품목록 생성(AP몰 전용) - 입점업체별 상품목록을 생성한다.
	 * @author 유젠 Tim
	 * @since 2018.08.30
	 */
	protected void makeOrdProdSetApMall(OrdEx ordEx, Model model) {

		//기존 상품목록 생성호출
		makeOrdProdSet(ordEx, model);

		//기존의 OrdOtfEx를 확장한 AP몰 전용 업체별 정보 리스트
		List<OrdOtfExFoDTO> ordOtfExFoList = new ArrayList<OrdOtfExFoDTO>();
		ObjectMapper mapper = new ObjectMapper();

		/** 상품단위 증정프로모션증정품 목록 **/
		List<OrdHistProdPromoAwardEx> ordHistProdPromoAwardExList = new ArrayList<>();
		/** 상품단위 온라인상품증정품 목록 **/
		List<OrdHistProdAwardEx> ordHistProdAwardExList = new ArrayList<>();

		Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = new HashMap<String, OrdOnlineProdFoDTO>();

		for (OrdShipAddressEx ordShipAddressEx : ordEx.getOrdShipAddressExList()) {
			for (OrdOtfEx ordOtfEx : ordShipAddressEx.getOrdOtfExList()) {

				//Object Deep Copy
				OrdOtfExFoDTO ordOtfExFoDTO = null;
				try {
					byte[] ordOtfExJson = mapper.writeValueAsBytes(ordOtfEx);
					ordOtfExFoDTO = mapper.readValue(ordOtfExJson, OrdOtfExFoDTO.class);
				} catch(IOException ioe) {
					ioe.printStackTrace();
					throw new ApiException(0, ioe.getMessage(), ioe.getMessage(), ioe);
				}

				// M+N, 동시구매프로모션 그룹 만들기
				Map<Long, OrdOnlinePromoFoDTO> shippingMNPromoMap = new HashMap<>();
				// key : 동시구매프로모션일련번호 + 동시구매묶음번호
				Map<String, OrdOnlinePromoFoDTO> shippingSameTimePurPromoMap = new HashMap<>();
				// key : 주문구성상품묶음번호
				Map<String, OrdOnlineBulkDcFoDTO> shippingBulkDcMap = new HashMap<>();

				for (OrdHistProdEx ordHistProdEx : ordOtfEx.getOrdHistProdExList()) {
					boolean storePickup = ordShipAddressEx.getStoreSn() != null;
					String key = String.format("%s_%s", ordHistProdEx.getOrdProdEx().getOnlineProdCode(), storePickup ? "Store" : "Ship");

					OrdOnlineProdFoDTO ordOnlineProdFo = null;
					// M+N상품
					if(ordHistProdEx.getmPlusNOrdPromoSn() != null) {
						ordOnlineProdFo = getMPlusNPromoOnlineProd(ordHistProdEx, shippingMNPromoMap);
					}
					// 동시구매상품
					else if(ordHistProdEx.getSameTimePurPromoSn() != null) {
						ordOnlineProdFo = getSameTimePurPromoOnlineProd(ordHistProdEx, shippingSameTimePurPromoMap);
					}
					//묶음상품
					else if (ordHistProdEx.getOrdIncludedProdBulkNo() != null) {
						ordOnlineProdFo = getBulkDcOnlineProd(ordHistProdEx, shippingBulkDcMap);
					}
					//온라인상품
					else {
						ordOnlineProdFo = ordOnlineProdFoMap.get(key);
						if(ordOnlineProdFo == null) {

							ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx);
							ordOnlineProdFoMap.put(key, ordOnlineProdFo);

							//뷰티포인트상품
							if ("Y".equals(ordHistProdEx.getIntegrationMembershipExchYn())) {
								ordOtfExFoDTO.getShippingOrdOnlineBeautyPointProdList().add(ordOnlineProdFo);
							}
							//활동포인트상품
							else if ("Y".equals(ordHistProdEx.getActivityPointExchYn())) {
								ordOtfExFoDTO.getShippingOrdOnlineActivityPointProdList().add(ordOnlineProdFo);
							}
							else{
								//일반상품
								if (!StringUtils.isEmpty(ordOnlineProdFo.getOrdHistProdTypeCode())
									&& ("Ord".equals(ordOnlineProdFo.getOrdHistProdTypeCode()))) {
									ordOtfExFoDTO.getShippingOrdOnlineProdList().add(ordOnlineProdFo);
								}
							}

						}
					}

					//충가격/수량 계산
					ordOnlineProdFo.addOrdHistProdEx(ordHistProdEx);

					//상품단위 증정프로모션증정품 목록 통합
					ordHistProdPromoAwardExList.addAll( ordHistProdEx.getOrdHistProdPromoAwardExList() );
					//상품단위 온라인상품증정품 목록 통합
					ordHistProdAwardExList.addAll( ordHistProdEx.getOrdHistProdAwardExList() );

				}//end for - 업체안의 전체 상품목록

				// 온라인쇼핑묶음판매상품 목록 추가
				ordOtfExFoDTO.setShippingBulkDcList( new ArrayList<>(shippingBulkDcMap.values()) );
				// 온라인쇼핑M+N프로모션 목록 추가
				ordOtfExFoDTO.setShippingMNPromoList( new ArrayList<>(shippingMNPromoMap.values()) );
				// 온라인쇼핑동시구매프로모션 목록 추가
				ordOtfExFoDTO.setShippingSameTimePurPromoList( new ArrayList<>(shippingSameTimePurPromoMap.values()) );

				//업체별 정보 리스트에 저장
				ordOtfExFoList.add(ordOtfExFoDTO);

			}//end for - 업체별 분류
		}

		//업체별 정보 리스트에 저장
		model.addAttribute("ordOtfExFoList", ordOtfExFoList);


		/************** 추가 사은품 처리 Start *******************/
		//***** 상품단위 증정 사은품 통합목록 저장 *****//
		//상품단위 증정프로모션증정품 통합목록 저장
		model.addAttribute("ordHistProdPromoAwardExList", ordHistProdPromoAwardExList);
		//상품단위 온라인상품증정품 통합목록 저장
		model.addAttribute("ordHistProdAwardExList", ordHistProdAwardExList);
		//***** 상품단위 증정 사은품 통합목록 저장 *****//

		//***** 주문단위 증정 사은품 통합목록 저장 *****//
		/** 증정상품목록 */
		List<OrdPromoOrdUnitAwardEx> ordUnitAwardExProdList = new ArrayList<>();
		/** 증정쿠폰목록 */
		List<OrdPromoOrdUnitAwardEx> ordUnitAwardExCouponList = new ArrayList<>();
		/** 증정포인트목록 */
		List<OrdPromoOrdUnitAwardEx> ordUnitAwardExPointList = new ArrayList<>();
		/** 기프트카드목록 */
		List<OrdPromoOrdUnitAwardEx> ordUnitAwardExGiftcardList = new ArrayList<>();

		for(OrdUnitAwardOrdPromoEx ordUnitAwardOrdPromoEx : ordEx.getOrdHistEx().getOrdUnitAwardOrdPromoExList()) {
			ordUnitAwardExProdList.addAll( ordUnitAwardOrdPromoEx.getOrdUnitAwardExProdList() );
			ordUnitAwardExCouponList.addAll( ordUnitAwardOrdPromoEx.getOrdUnitAwardExCouponList() );
			ordUnitAwardExPointList.addAll( ordUnitAwardOrdPromoEx.getOrdUnitAwardExPointList() );
			ordUnitAwardExGiftcardList.addAll( ordUnitAwardOrdPromoEx.getOrdUnitAwardExGiftcardList() );
		}
		//주문단위 증정상품 통합목록 저장
		model.addAttribute("ordUnitAwardExProdList", ordUnitAwardExProdList);
		//주문단위 증정쿠폰 통합목록 저장
		model.addAttribute("ordUnitAwardExCouponList", ordUnitAwardExCouponList);
		//주문단위 증정포인트 통합목록 저장
		model.addAttribute("ordUnitAwardExPointList", ordUnitAwardExPointList);
		//주문단위 기프트카드 통합목록 저장
		model.addAttribute("ordUnitAwardExGiftcardList", ordUnitAwardExGiftcardList);
		//***** 주문단위 증정 사은품 통합목록 저장 *****//

		//***** 증정쿠폰 통합목록 저장 *****//
		//증정쿠폰 목록
		List<CouponAwardEx> couponAwardExList = new ArrayList<>();

		for(CouponEx couponEx : ordEx.getApplyCouponExList()) {
			couponAwardExList.addAll( couponEx.getCouponAwardExList() );
		}
		model.addAttribute("applyCouponExList", couponAwardExList);
		//***** 증정쿠폰 통합목록 저장 *****//

		//화면에서 사용할수 있게 가공한다.
		makeApMallAwardList(model);
		/************** 추가 사은품 처리 End *******************/
	};

	/**
	 * 화면에서 사용할 추가 사은품의 목록을 만든다.(스페셜 기프트, 이벤트 사은품, 쿠폰 사은품, 증정 기프트 카드)
	 */
	private void makeApMallAwardList(Model model) {
		//스페셜 기프트
		Map<String, Object> awardMapSpecialGift = new HashMap<>();
		//이벤트 사은품
		Map<String, Object> awardMapEventGift = new HashMap<>();
		//쿠폰 사은품
		Map<String, Object> awardMapCouponGift = new HashMap<>();
		//증정 기프트 카드
		Map<String, Object> awardMapAwardGift = new HashMap<>();

		Map<String, Object> modelMap = model.asMap();

		//(스페셜 기프트) 상품단위 온라인상품증정품 상품/사은품 목록
		List<OrdHistProdAwardEx> ordHistProdAwardExListForProd = new ArrayList<>();
		//맵에 통합
		awardMapSpecialGift.put("ordHistProdAwardExListForProd", ordHistProdAwardExListForProd);

		//(이벤트 사은품) 상품단위 증정프로모션증정품 목록
		List<OrdHistProdPromoAwardEx> ordHistProdPromoAwardExList = new ArrayList<>();
		//(이벤트 사은품) 주문단위 증정 프로모션 상품/사은품 목록
		List<OrdPromoOrdUnitAwardEx> ordUnitAwardExProdList = new ArrayList<>();
		//(이벤트 사은품) 주문단위 증정 프로모션 포인트 목록
		List<OrdPromoOrdUnitAwardEx> ordUnitAwardExPointist = new ArrayList<>();
		//맵에 통합
		awardMapEventGift.put("ordHistProdPromoAwardExList", ordHistProdPromoAwardExList);
		awardMapEventGift.put("ordUnitAwardExProdList", ordUnitAwardExProdList);
		awardMapEventGift.put("ordUnitAwardExPointList", ordUnitAwardExPointist);

		//(쿠폰 사은품) 장바구니 증정 쿠폰 상품/사은품
		List<CouponAwardEx> couponAwardExListForProd = new ArrayList<>();
		//(쿠폰 사은품) 장바구니 증정 쿠폰 포인트
		List<CouponAwardEx> couponAwardExListForPoint = new ArrayList<>();
		//맵에 통합
		awardMapCouponGift.put("couponAwardExListForProd", couponAwardExListForProd);
		awardMapCouponGift.put("couponAwardExListForPoint", couponAwardExListForPoint);

		//(증정 기프트 카드) 상품단위 온라인상품증정품 기프트카드 목록
		List<OrdHistProdAwardEx> ordHistProdAwardExListForGiftcard = new ArrayList<>();
		//(증정 기프트 카드) 주문단위 증정 프로모션 기프트카드 목록
		List<OrdPromoOrdUnitAwardEx> ordUnitAwardExGiftcardList = new ArrayList<>();
		//맵에 통합
		awardMapAwardGift.put("ordHistProdAwardExListForGiftcard", ordHistProdAwardExListForGiftcard);
		awardMapAwardGift.put("ordUnitAwardExGiftcardList", ordUnitAwardExGiftcardList);


		//상품단위 증정프로모션증정품 목록 분류
		for(OrdHistProdPromoAwardEx ordHistProdPromoAwardEx : (List<OrdHistProdPromoAwardEx>)modelMap.get("ordHistProdPromoAwardExList")) {
			if( "Prod".equals(ordHistProdPromoAwardEx.getAwardTgtCode()) ) {
				ordHistProdPromoAwardExList.add(ordHistProdPromoAwardEx);
			}
		}

		//상품단위 온라인상품증정품 목록 분류
		for(OrdHistProdAwardEx ordHistProdAwardEx : (List<OrdHistProdAwardEx>)modelMap.get("ordHistProdAwardExList")) {
			if( "Prod".equals(ordHistProdAwardEx.getAwardTgtCode()) ) {
				ordHistProdAwardExListForProd.add(ordHistProdAwardEx);
			}
			if( "Giftcard".equals(ordHistProdAwardEx.getAwardTgtCode()) ) {
				ordHistProdAwardExListForGiftcard.add(ordHistProdAwardEx);
			}
		}

		//쿠폰 상품/사은품, 포인트 목록 분류
		for(CouponAwardEx couponAwardEx : (List<CouponAwardEx>)modelMap.get("applyCouponExList")) {
			if( "Prod".equals(couponAwardEx.getAwardTgtCode()) ) {
				couponAwardExListForProd.add(couponAwardEx);
			}
			if( "Point".equals(couponAwardEx.getAwardTgtCode()) ) {
				couponAwardExListForPoint.add(couponAwardEx);
			}
		}

		//주문단위 증정상품목록 분류
		for(OrdPromoOrdUnitAwardEx ordHistProdPromoAwardEx : (List<OrdPromoOrdUnitAwardEx>)modelMap.get("ordUnitAwardExProdList")) {
			ordUnitAwardExProdList.add(ordHistProdPromoAwardEx);
		}

		//주문단위 증정포인트목록 분류
		for(OrdPromoOrdUnitAwardEx ordHistProdPromoAwardEx : (List<OrdPromoOrdUnitAwardEx>)modelMap.get("ordUnitAwardExPointList")) {
			ordUnitAwardExPointist.add(ordHistProdPromoAwardEx);
		}

		//주문단위 기프트카드목록 분류
		for(OrdPromoOrdUnitAwardEx ordHistProdPromoAwardEx : (List<OrdPromoOrdUnitAwardEx>)modelMap.get("ordUnitAwardExGiftcardList")) {
			ordUnitAwardExGiftcardList.add(ordHistProdPromoAwardEx);
		}

		/*** 항목별 총합계산 ***/
		//스페셜 기프트
		awardMapSpecialGift.put("totalCount", ordHistProdAwardExListForProd.size());
		//이벤트 사은품
		awardMapEventGift.put("totalCount", ordHistProdPromoAwardExList.size() + ordUnitAwardExProdList.size() + ordUnitAwardExPointist.size());
		//쿠폰 사은품
		awardMapCouponGift.put("totalCount", couponAwardExListForProd.size() + couponAwardExListForPoint.size());
		//증정 기프트 카드
		awardMapAwardGift.put("totalCount", ordHistProdAwardExListForGiftcard.size() + ordUnitAwardExGiftcardList.size());

		model.addAttribute("awardMapSpecialGift", awardMapSpecialGift);
		model.addAttribute("awardMapEventGift", awardMapEventGift);
		model.addAttribute("awardMapCouponGift", awardMapCouponGift);
		model.addAttribute("awardMapAwardGift", awardMapAwardGift);
	};

	/**
	 * 결제 내역 상세 정보 생성(AP몰 전용) - 입점업체별 주문금액, 배송비 정보를 분류한다.
	 * @author 유젠 Tim
	 * @since 2018.09.07
	 */
	protected Map<String, BigDecimal> makeApMallOrdOtfProdTotal(OrdEx ordEx) {

		Map<String, BigDecimal> sumMap = new HashMap<>();

		for (OrdShipAddressEx ordShipAddressEx : ordEx.getOrdShipAddressExList()) {

			//업체별 전체 배송비의 합
			BigDecimal allOtfTotalShipAmt = new BigDecimal(0);

			for (OrdOtfEx ordOtfEx : ordShipAddressEx.getOrdOtfExList()) {
				//업체별 상품가격의 합
				BigDecimal otfTotalProdAmt = new BigDecimal(0);
				//업체별 배송비의 합
				BigDecimal otfTotalShipAmt = new BigDecimal(0);
				otfTotalShipAmt = otfTotalShipAmt.add(ordOtfEx.getShipFeeSumPcur());
				//업체별 전체 배송비의 합
				allOtfTotalShipAmt = allOtfTotalShipAmt.add(otfTotalShipAmt);

				for (OrdHistProdEx ordHistProdEx : ordOtfEx.getOrdHistProdExList()) {
					otfTotalProdAmt = otfTotalProdAmt.add(ordHistProdEx.getFinalOnlineSaleAmtPcur());
				}

				//업체고유 sn 별 합계저장
				sumMap.put("otfTotalProdAmt" + ordOtfEx.getOrdOtfSn(), otfTotalProdAmt);
				sumMap.put("otfTotalShipAmt" + ordOtfEx.getOrdOtfSn(), otfTotalShipAmt);
			}
			//업체별 전체 배송비의 합
			sumMap.put("allOtfTotalShipAmt", allOtfTotalShipAmt);
		}

		return sumMap;
	};


	/**
	 * 상품목록 생성(에뛰드 전용)
	 */
	protected void makeOrdProdSet(OrdEx ordEx, Model model){
		/* 주문정보 */
		List<OrdOnlineProdFoDTO> shippingOrdOnlineProdList = new ArrayList<OrdOnlineProdFoDTO>();
		List<OrdOnlineProdFoDTO> shippingOrdOnlineBeautyPointProdList = new ArrayList<OrdOnlineProdFoDTO>();
		List<OrdOnlineProdFoDTO> shippingOrdOnlineActivityPointProdList = new ArrayList<OrdOnlineProdFoDTO>();
		List<OrdOnlineProdFoDTO> storePickupOrdOnlineProdList = new ArrayList<OrdOnlineProdFoDTO>();
		List<OrdOtfEx> ordOtfExList = new ArrayList<OrdOtfEx>();
		Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = new HashMap<String, OrdOnlineProdFoDTO>();

        /* M+N, 동시구매프로모션 그룹 만들기 */
        Map<Long, OrdOnlinePromoFoDTO> shippingMNPromoMap = new HashMap<>();
        Map<String, OrdOnlinePromoFoDTO> shippingSameTimePurPromoMap = new HashMap<>(); 	// key : 동시구매프로모션일련번호 + 동시구매묶음번호
        Map<String, OrdOnlineBulkDcFoDTO> shippingBulkDcMap = new HashMap<>(); 				// key : 주문구성상품묶음번호
        Map<Long, OrdOnlinePromoFoDTO> storePickupMNPromoMap = new HashMap<>();
        Map<String, OrdOnlinePromoFoDTO> storePickupSameTimePurPromoMap = new HashMap<>(); 	// key : 동시구매프로모션일련번호 + 동시구매묶음번호
		Map<String, OrdOnlineBulkDcFoDTO> storeBulkDcPromoMap = new HashMap<>(); 				// key : 주문구성상품묶음번호

		List<OrdShipAddressEx> ordShipAddressList = ordEx.getOrdShipAddressExList();
		for (OrdShipAddressEx ordShipAddressEx : ordShipAddressList) {
			for (OrdOtfEx ordOtfEx : ordShipAddressEx.getOrdOtfExList()) {
				//온라인상품만 포장
				if ("N".equals(ordShipAddressEx.getStorePickupYn())) {
				    ordOtfExList.add(ordOtfEx);
				}
				
				for (OrdHistProdEx ordHistProdEx : ordOtfEx.getOrdHistProdExList()) {
					boolean storePickup = ordShipAddressEx.getStoreSn() != null;
					String key = String.format("%s_%s", ordHistProdEx.getOrdProdEx().getOnlineProdCode(), storePickup ? "Store" : "Ship");
					
					OrdOnlineProdFoDTO ordOnlineProdFo = null;
					// M+N상품
					if(ordHistProdEx.getmPlusNOrdPromoSn() != null) {
                        if (storePickup) {
                            ordOnlineProdFo = getMPlusNPromoOnlineProd(ordHistProdEx, storePickupMNPromoMap);
                        } else {
                            ordOnlineProdFo = getMPlusNPromoOnlineProd(ordHistProdEx, shippingMNPromoMap);
                        }
					}
                    // 동시구매상품
					else if(ordHistProdEx.getSameTimePurPromoSn() != null) {
                        if (storePickup) {
                            ordOnlineProdFo = getSameTimePurPromoOnlineProd(ordHistProdEx, storePickupSameTimePurPromoMap);
                        } else {
                            ordOnlineProdFo = getSameTimePurPromoOnlineProd(ordHistProdEx, shippingSameTimePurPromoMap);
                        }
                    }
					//묶음상품
					else if (ordHistProdEx.getOrdIncludedProdBulkNo() != null) {
						if (storePickup) {
							ordOnlineProdFo = getBulkDcOnlineProd(ordHistProdEx, storeBulkDcPromoMap);
						} else {
							ordOnlineProdFo = getBulkDcOnlineProd(ordHistProdEx, shippingBulkDcMap);
						}
					}
					//온라인상품
					else {
                        ordOnlineProdFo = ordOnlineProdFoMap.get(key);
                        if(ordOnlineProdFo == null) {

                            ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx);
                            ordOnlineProdFoMap.put(key, ordOnlineProdFo);

                            if (storePickup) {
                                storePickupOrdOnlineProdList.add(ordOnlineProdFo);
                            } else {
								//뷰티포인트상품
								if ("Y".equals(ordHistProdEx.getIntegrationMembershipExchYn())) {
									shippingOrdOnlineBeautyPointProdList.add(ordOnlineProdFo);
								}
								//활동포인트상품
								else if ("Y".equals(ordHistProdEx.getActivityPointExchYn())) {
									shippingOrdOnlineActivityPointProdList.add(ordOnlineProdFo);
								}
								else{
									//일반상품
									if (!StringUtils.isEmpty(ordOnlineProdFo.getOrdHistProdTypeCode())
										&& ("Ord".equals(ordOnlineProdFo.getOrdHistProdTypeCode()))) {
										shippingOrdOnlineProdList.add(ordOnlineProdFo);
									}
								}
                            }
                        }
					}

                    //충가격/수량 계산
					ordOnlineProdFo.addOrdHistProdEx(ordHistProdEx);
				}
			}
		}
		model.addAttribute("ordEx", ordEx);

		model.addAttribute("shippingOrdOnlineProdList", shippingOrdOnlineProdList);		  										// 온라인쇼핑일반상품 목록
		model.addAttribute("shippingBulkDcList", new ArrayList<>(shippingBulkDcMap.values()));         							// 온라인쇼핑묶음판매상품 목록
		model.addAttribute("shippingMNPromoList", new ArrayList<>(shippingMNPromoMap.values()));                           	// 온라인쇼핑M+N프로모션 목록
		model.addAttribute("shippingSameTimePurPromoList", new ArrayList<>(shippingSameTimePurPromoMap.values()));         	// 온라인쇼핑동시구매프로모션 목록
		model.addAttribute("shippingOrdOnlineBeautyPointProdList", shippingOrdOnlineBeautyPointProdList);		            	// 온라인쇼핑 뷰티포인트 교환상품 목록
		model.addAttribute("shippingOrdOnlineActivityPointProdList", shippingOrdOnlineActivityPointProdList);		        	// 온라인쇼핑 진주알 교환상품 목록

		model.addAttribute("storePickupOrdOnlineProdList", storePickupOrdOnlineProdList);	                                 	// 테이크아웃일반상품 목록
        model.addAttribute("storePickupMNPromoList", new ArrayList<>(storePickupMNPromoMap.values()));                      	// 온라인쇼핑M+N프로모션 목록
        model.addAttribute("storePickupSameTimePurPromoList", new ArrayList<>(storePickupSameTimePurPromoMap.values()));    	// 온라인쇼핑동시구매프로모션 목록

		model.addAttribute("ordOtfExList", ordOtfExList);									                                	// 주문배송지시 목록
		model.addAttribute("ordUnitAwardOrdPromoExList", ordEx.getOrdHistEx().getOrdUnitAwardOrdPromoExList());				// 주문단위사은품 (주문서) 목록
		model.addAttribute("ordHistPromoExList", ordEx.getOrdHistEx().getOrdHistPromoExList());									// 주문단위사은품(주문완료) 목록

		if(isMember()){
			List<ShipAddressInfo> shipAddressList = new ArrayList<ShipAddressInfo>();
			for(ShipAddressInfo shipAddressInfo : apApi.getShipAddresses(getMemberSn())){
				if("Y".equals(shipAddressInfo.getRepShipAddressYn())){
					shipAddressList.add(shipAddressInfo);
				}
			}
			OrdShipAddressListResult ordShipAddress = orderApi.getOrdShipAddressList(getMemberSn(), null, null, 0, 1);
			PayMethodListResult payMethodList = orderApi.getPayMethodList(PARAM_KEY_MEMBER);

			model.addAttribute("shipAddressList", shipAddressList);									// 기본배송지목록
			model.addAttribute("ordShipAddressExList", ordShipAddress.getOrdShipAddressExList());	// 주문배송지목록
			model.addAttribute("payMethodResult", payMethodList); 									// 결제수단목록
			model.addAttribute("apMember", apApi.getMemberInfo(getMemberSn()));						// 회원정보
			model.addAttribute("memberSn", getMemberSn());											// 회원일련번호
		}else {
			PayMethodListResult payMethodList = orderApi.getPayMethodList(PARAM_KEY_NONMEMBER);
			//주문완료
			model.addAttribute("ordShipAddressExList", ordEx.getOrdShipAddressExList());            // 주문배송지목록
			model.addAttribute("payMethodResult", payMethodList); // 결제수단목록

			//이용약관
			List<Terms> personPolicy1 = termsApi.getTerms("020");                //개인정보 처리방침
			List<Terms> personPolicy2 = termsApi.getTerms("040");                //개인정보 제3자 제공 동의
			if (personPolicy1.size() > 0) {
				model.addAttribute("personPolicy1", personPolicy1.get(personPolicy1.size()-1));
			}
			if( personPolicy2.size() > 0) {
				model.addAttribute("personPolicy2", personPolicy2.get(personPolicy2.size()-1));
			}
		}

		model.addAttribute("isApMember", isMember());

		/*****************************************************************
		 * 주문금액 계산
		 *****************************************************************/
		model.addAttribute("ordAmtMap", makeOrdAmtList(ordEx, isMember()));
		//업체별 상품 및 배송비 합계 계산
		model.addAttribute("otfTotalAmtMap", makeApMallOrdOtfProdTotal(ordEx));
		/*****************************************************************
		 * 주문수량 계산
		 *****************************************************************/
		model.addAttribute("ordCntMap", makeOrdCntList(ordEx));
	}

	/* M+N상품 */
	private OrdOnlineProdFoDTO getMPlusNPromoOnlineProd(OrdHistProdEx ordHistProdEx, Map<Long, OrdOnlinePromoFoDTO> ordOnlinePromoFoMap) {
        OrdOnlinePromoFoDTO ordOnlinePromoFo = ordOnlinePromoFoMap.get(ordHistProdEx.getmPlusNOrdPromoSn());
        if(ordOnlinePromoFo == null) {
            ordOnlinePromoFo = new OrdOnlinePromoFoDTO();
            ordOnlinePromoFo.setPromoSn(ordHistProdEx.getmPlusNOrdPromoSn());
            ordOnlinePromoFo.setPromoName(ordHistProdEx.getmPlusNOrdPromoNameRlang());
            ordOnlinePromoFo.setOrdOnlineProdFoMap(new HashMap<>());
            ordOnlinePromoFo.setOrdOnlineProdFoList(new ArrayList<>());
			ordOnlinePromoFo.setPromoTypeCode(ordHistProdEx.getmPlusNTypeCode());

			ordOnlinePromoFoMap.put(ordHistProdEx.getmPlusNOrdPromoSn(), ordOnlinePromoFo);
        }

		BigDecimal base = ordHistProdEx.getFinalOnlineSalePricePcur().multiply(new BigDecimal(ordHistProdEx.getmPlusNBaseQty()));
		BigDecimal award = ordHistProdEx.getFinalOnlineSalePricePcur().multiply(new BigDecimal(ordHistProdEx.getmPlusNAwardQty()));

		ordOnlinePromoFo.setTotalProductSaleAmount(ordOnlinePromoFo.getTotalProductSaleAmount().add(base));
		ordOnlinePromoFo.setTotalFinalOnlineSaleAmount(ordOnlinePromoFo.getTotalFinalOnlineSaleAmount().add(base.add(award)));

		ordOnlinePromoFo.setBaseQty(ordOnlinePromoFo.getBaseQty() + ordHistProdEx.getmPlusNBaseQty());
		ordOnlinePromoFo.setAwardQty(ordOnlinePromoFo.getAwardQty() + ordHistProdEx.getmPlusNAwardQty());

		ordOnlinePromoFo.setOrdQtySum(ordOnlinePromoFo.getOrdQtySum() + ordHistProdEx.getOrdQty());

        return getOrdOnlineProdFo(ordHistProdEx, ordOnlinePromoFo);
    }

    /* 동시구매 */
	private OrdOnlineProdFoDTO getSameTimePurPromoOnlineProd(OrdHistProdEx ordHistProdEx, Map<String, OrdOnlinePromoFoDTO> ordOnlinePromoFoMap) {
		//String key = ordHistProdEx.getSameTimePurPromoSn() + "_" + ordHistProdEx.getSameTimePurProdBulkNo();
		String key = ordHistProdEx.getSameTimePurPromoSn() + "";
		OrdOnlinePromoFoDTO ordOnlinePromoFo = ordOnlinePromoFoMap.get(key);
		if(ordOnlinePromoFo == null) {
			ordOnlinePromoFo = new OrdOnlinePromoFoDTO();
			ordOnlinePromoFo.setPromoSn(ordHistProdEx.getSameTimePurPromoSn());
			ordOnlinePromoFo.setPromoName(ordHistProdEx.getSameTimePurOrdPromoNameRlang());
			ordOnlinePromoFo.setOrdOnlineProdFoMap(new HashMap<>());
			ordOnlinePromoFo.setOrdOnlineProdFoList(new ArrayList<>());
			ordOnlinePromoFo.setPromoTypeCode(key);

			ordOnlinePromoFoMap.put(key, ordOnlinePromoFo);
		}

		ordOnlinePromoFo.setTotalProductSaleAmount(ordOnlinePromoFo.getTotalProductSaleAmount().add(ordHistProdEx.getFinalOnlineSaleAmtPcur()));
		ordOnlinePromoFo.setTotalFinalOnlineSaleAmount(ordOnlinePromoFo.getTotalFinalOnlineSaleAmount().add(ordHistProdEx.getProdSalePricePcur()));

		ordOnlinePromoFo.setOrdQtySum(ordOnlinePromoFo.getOrdQtySum() + ordHistProdEx.getOrdQty());

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

	/* 묶음상품 */
	private OrdOnlineProdFoDTO getBulkDcOnlineProd(OrdHistProdEx ordHistProdEx, Map<String, OrdOnlineBulkDcFoDTO> ordOnlineBulkDcFoMap) {
		//String key = ordHistProdEx.getOrdProdEx().getBulkDcOnlineProdSn() + "_" + ordHistProdEx.getOrdIncludedProdBulkNo();
		String key = ordHistProdEx.getOrdProdEx().getBulkDcOnlineProdSn() + "";
		OrdOnlineBulkDcFoDTO ordOnlineBulkDcFo = ordOnlineBulkDcFoMap.get(key);
		if (ordOnlineBulkDcFo == null) {
			ordOnlineBulkDcFo = new OrdOnlineBulkDcFoDTO();
			ordOnlineBulkDcFo.setOrdOnlineProdFoMap(new HashMap<>());
			ordOnlineBulkDcFo.setOrdOnlineProdFoList(new ArrayList<>());
			ordOnlineBulkDcFo.setBulkDcOnlineProdName(ordHistProdEx.getOrdProdEx().getBulkDcOnlineProdNameRlang());
			ordOnlineBulkDcFo.setBulkDcOnlineProdImgUrl(ordHistProdEx.getOrdProdEx().getOnlineProdImgUrl());

			ordOnlineBulkDcFoMap.put(key, ordOnlineBulkDcFo);
		}

		ordOnlineBulkDcFo.setTotalBulkDcProductSaleAmount(ordOnlineBulkDcFo.getTotalBulkDcProductSaleAmount().add(ordHistProdEx.getFinalOnlineSaleAmtPcur()));
		ordOnlineBulkDcFo.setTotalBulkDcFinalOnlineSaleAmount(ordOnlineBulkDcFo.getTotalBulkDcFinalOnlineSaleAmount().add(ordHistProdEx.getProdSalePricePcur()));

		ordOnlineBulkDcFo.setOrdQtySum(ordOnlineBulkDcFo.getOrdQtySum() + ordHistProdEx.getOrdQty());

		return getOrdOnlineBulkDcProdFo(ordHistProdEx, ordOnlineBulkDcFo);
	}

	private OrdOnlineProdFoDTO getOrdOnlineBulkDcProdFo(OrdHistProdEx ordHistProdEx,  OrdOnlineBulkDcFoDTO ordOnlineBulkDcFo) {
		Map<String, OrdOnlineProdFoDTO> ordOnlineProdFoMap = ordOnlineBulkDcFo.getOrdOnlineProdFoMap();
		OrdOnlineProdFoDTO ordOnlineProdFo = ordOnlineProdFoMap.get(ordHistProdEx.getOrdProdEx().getBulkDcOnlineProdCode());
		if(ordOnlineProdFo == null) {
			ordOnlineProdFo = makeOrdOnlineProdFo(ordHistProdEx);
			ordOnlineProdFoMap.put(ordHistProdEx.getOrdProdEx().getOnlineProdCode(), ordOnlineProdFo);
			ordOnlineBulkDcFo.getOrdOnlineProdFoList().add(ordOnlineProdFo);
		}
		return ordOnlineProdFo;
	}
    
	/**
	 * 온라인상품 목록 세팅
	 */
	protected OrdOnlineProdFoDTO makeOrdOnlineProdFo(OrdHistProdEx ordHistProd) {
		OrdOnlineProdFoDTO ordOnlineProdFo = new OrdOnlineProdFoDTO();
		OrdProdEx ordProd = ordHistProd.getOrdProdEx();
		ordOnlineProdFo.setOnlineProdCode(ordProd.getOnlineProdCode());						// 온라인상품코드
		ordOnlineProdFo.setOnlineProdName(ordProd.getOnlineProdNameRlang());					// 온라인상품명
		ordOnlineProdFo.setOnlineProdImgUrl(ordProd.getOnlineProdImgUrl());					// 온라인상품 이미지
		ordOnlineProdFo.setProdImgUrl(ordProd.getProdImgUrl());								// 단위상품 이미지
		ordOnlineProdFo.setBulkDcOnlineProdCode(ordProd.getBulkDcOnlineProdCode());			// 묶음할인온라인상품코드
		ordOnlineProdFo.setBulkDcOnlineProdName(ordProd.getBulkDcOnlineProdNameRlang());		// 묶음할인온라인상품명
		ordOnlineProdFo.setOrdHistProdTypeCode(ordHistProd.getOrdHistProdTypeCode());		// 주문이력상품유형코드
		ordOnlineProdFo.setFinalOnlineSaleAmtPcurSum(BigDecimal.ZERO);							// 상품판매가(상품판매가 X 주문수량)
		ordOnlineProdFo.setOrdQtySum(0);														// 주문수량(단위상품 X 주문수량)
		ordOnlineProdFo.setOrdHistProdList(new ArrayList<OrdHistProdEx>());					// 주문이력(확장)
		ordOnlineProdFo.setSingleProdYn(ordProd.getSingleProdYn());
		ordOnlineProdFo.setOrdHistProdPromoAwardExList(ordHistProd.getOrdHistProdPromoAwardExList());
		ordOnlineProdFo.setOrdHistProdAwardExList(ordHistProd.getOrdHistProdAwardExList());
		return ordOnlineProdFo;
	}

	/**
	 * 상품번호 할당
	 */
	protected List<Long> getCartProdSnList(String onlineProdSnArr, String takeoutProdSnArr) {
		List<Long> cartProdSnList = new ArrayList<Long>();
		String[] arrayOnlineProdSn;
		String[] arrayTakeoutProdSn;
		if(onlineProdSnArr.length() != 0 || onlineProdSnArr.length() > 0){		// 온라인상품
			arrayOnlineProdSn = onlineProdSnArr.split("\\,");
			for(int i=0; i < arrayOnlineProdSn.length; i++){
				cartProdSnList.add(Long.valueOf(arrayOnlineProdSn[i]));
			}
		}
		if(takeoutProdSnArr.length() != 0 || takeoutProdSnArr.length() > 0){	// 테이크아웃상품
			arrayTakeoutProdSn = takeoutProdSnArr.split("\\,");
			for(int i=0; i < arrayTakeoutProdSn.length; i++){
				cartProdSnList.add(Long.valueOf(arrayTakeoutProdSn[i]));
			}
		}
		return cartProdSnList;
	}

	/**
	 * 주문서 생성
	 */
	protected OrdEx createOrder(Long cartSn, List<Long> cartProdSnList) {
		OrdRecept ordRecept = new OrdRecept();
		ordRecept.setOrdReceivedChCode(getDisplayChannel());
		if(isMember()) {
			ordRecept.setMemberSn(getMemberSn());
			ordRecept.setPurchaserTypeCode(PARAM_KEY_MEMBER);
		}else{
			ordRecept.setNonmemberOrdTermsAgreeYn("Y");
			ordRecept.setPurchaserTypeCode(PARAM_KEY_NONMEMBER);
		}
		if(!ObjectUtils.isEmpty(cartProdSnList) && cartProdSnList.size() > 0) {
			ordRecept.setCartProdSnList(cartProdSnList);
		}

		return orderApi.ordRecept(cartSn, ordRecept);
	}

	/*****************************************************************
	 * 주문금액 계산
	 *****************************************************************/
	protected Map<String, BigDecimal> makeOrdAmtList(OrdEx ordEx, boolean member) {
		Map<String, BigDecimal> ordAmtMap = new HashMap<String, BigDecimal>();

		if (ordEx != null && ordEx.getOrdHistEx() != null && ordEx.getOrdHistEx().getOrdHistAmtExList() != null) {

			BigDecimal totalOrdDcPriceSum = new BigDecimal(0);
			BigDecimal membershipExchAmt = new BigDecimal(0);
			BigDecimal packingAmtSum = new BigDecimal(0);
			BigDecimal onlineShipProdSum = new BigDecimal(0);

			for (OrdHistAmtEx o : ordEx.getOrdHistEx().getOrdHistAmtExList()) {
				//금액 세팅
				ordAmtMap.put(o.getOrdHistAmtTypeCode(), o.getAmtPcur());

				//총주문금액 Prod = StorePickupProd + OnlineShipProd

				//온라인 상품 가격 = OnlineShipProd - MembershipExch - ActivityPointExch
				if ("OnlineShipProd".equals(o.getOrdHistAmtTypeCode())) {
					onlineShipProdSum = onlineShipProdSum.add(o.getAmtPcur());
				}
				if ("MembershipExch".equals(o.getOrdHistAmtTypeCode())
					||"ActivityPointExch".equals(o.getOrdHistAmtTypeCode())) {
					onlineShipProdSum = onlineShipProdSum.subtract(o.getAmtPcur());
				}

				//총할인 = OnlineProdPromoDc + OnlineMemberPromoDc + MemberDcBenefit + ImmedDcCouponPromo
				//		+ MPlusNPromoDc + SameTimePurPromoDc + OrdUnitPromoDc + *BeautyPointExchUse*
				//		+ *CushionPointUse* + ActivityPointExch + ProdUnitCouponDc + MPlusNCouponDc
				//		+ Buy1GetCouponDc + OrdUnitCouponDc + ShipFeePromoDc
				if ("OnlineProdPromoDc".equals(o.getOrdHistAmtTypeCode())
					|| "OnlineMemberPromoDc".equals(o.getOrdHistAmtTypeCode())
					|| "MemberDcBenefit".equals(o.getOrdHistAmtTypeCode())
					|| "ImmedDcCouponPromo".equals(o.getOrdHistAmtTypeCode())
					|| "MPlusNPromoDc".equals(o.getOrdHistAmtTypeCode())
					|| "SameTimePurPromoDc".equals(o.getOrdHistAmtTypeCode())
					|| "OrdUnitPromoDc".equals(o.getOrdHistAmtTypeCode())
					|| "ActivityPointExch".equals(o.getOrdHistAmtTypeCode())
					|| "ProdUnitCouponDc".equals(o.getOrdHistAmtTypeCode())
					|| "MPlusNCouponDc".equals(o.getOrdHistAmtTypeCode())
					|| "Buy1GetCouponDc".equals(o.getOrdHistAmtTypeCode())
					|| "OrdUnitCouponDc".equals(o.getOrdHistAmtTypeCode())
					|| "ShipFeePromoDc".equals(o.getOrdHistAmtTypeCode())) {
					totalOrdDcPriceSum = totalOrdDcPriceSum.add(o.getAmtPcur()) ;
				}

				if ("MembershipExch".equals(o.getOrdHistAmtTypeCode())) {
					membershipExchAmt = o.getAmtPcur();
				}

				if ("ShipUnitPacking".equals(o.getOrdHistAmtTypeCode())) {
					packingAmtSum = packingAmtSum.add(o.getAmtPcur());
				}
			}

			//온라인 상품 가격
			ordAmtMap.put("onlineShipProdSum", onlineShipProdSum);

			//포장재
			ordAmtMap.put("ShipUnitPacking", packingAmtSum);

			//배송비 =  ordEx.getOrdHistEx().getShipFeeSumPcur();
			ordAmtMap.put("ShipFee", ordEx.getOrdHistEx().getShipFeeSumPcur());

			//통합멤버십(뷰티포인트)교환사용
			// BeautyPointExchUse =  MembershipExch + BP -> ordEx.getOrdHistEx().getOrdHistMembershipExList().get(0).getMembershipUseAmtSumPcur();
			//쿠션포인트사용
			// CushionPointUse = CP -> ordEx.getOrdHistEx().getOrdHistMembershipExList().get(0).getMembershipUseAmtSumPcur();
			for (OrdHistMembershipEx m : ordEx.getOrdHistEx().getOrdHistMembershipExList()) {
				if ("BP".equals(m.getMembershipServiceCode())) {
					ordAmtMap.put("BeautyPointExchUse", membershipExchAmt.add(m.getMembershipUseAmtSumPcur()));
					totalOrdDcPriceSum = totalOrdDcPriceSum.add(membershipExchAmt.add(m.getMembershipUseAmtSumPcur()));
				} else {
					ordAmtMap.put("BeautyPointExchUse", new BigDecimal(0));
				}

				if ("CP".equals(m.getMembershipServiceCode())) {
					ordAmtMap.put("CushionPointUse", m.getMembershipUseAmtSumPcur());
					totalOrdDcPriceSum = totalOrdDcPriceSum.add(m.getMembershipUseAmtSumPcur());
				} else {
					ordAmtMap.put("CushionPointUse", new BigDecimal(0));
				}
			}

			ordAmtMap.put("totalOrdDcPriceSum", totalOrdDcPriceSum);

			//정립예정포인트(뷰티포인트)
			if (ordEx.getOrdMembershipExList() != null && ordEx.getOrdMembershipExList().size() > 0) {
				for (OrdMembershipEx o : ordEx.getOrdMembershipExList()) {
					if ("BP".equals(o.getMembershipServiceCode())) {
						ordAmtMap.put("totalBeautyPointSaveSum", new BigDecimal(o.getSavingExpectedPoint()));
					}
				}
			} else {
				ordAmtMap.put("totalBeautyPointSaveSum", new BigDecimal(0));
			}
		}

		return ordAmtMap;
	}

	/*****************************************************************
	 * 주문수량 계산
	 *****************************************************************/
	protected Map<String, Integer> makeOrdCntList(OrdEx ordEx) {
		Map<String, Integer> ordCntMap = new HashMap<String, Integer>();

		if (ordEx != null && ordEx.getOrdHistEx() != null && ordEx.getOrdHistEx().getOrdHistAmtExList() != null) {

			Integer onlineShipProdCnt = 0;
			Integer ordIncludeProdBulkNo = 0;
			Integer membershipExchCnt = 0;
			Integer activityPointExchCnt = 0;
			Integer storePickupProdCnt = 0;

			List<OrdShipAddressEx> ordShipAddressList = ordEx.getOrdShipAddressExList();
			for (OrdShipAddressEx ordShipAddressEx : ordShipAddressList) {
				for (OrdOtfEx ordOtfEx : ordShipAddressEx.getOrdOtfExList()) {
					for (OrdHistProdEx ordHistProdEx : ordOtfEx.getOrdHistProdExList()) {
						boolean storePickup = ordShipAddressEx.getStoreSn() != null;

						if (storePickup) {
							storePickupProdCnt++;
						} else {
							if ("Y".equals(ordHistProdEx.getIntegrationMembershipExchYn())) {
								//BP
								membershipExchCnt++;
							} else if ("Y".equals(ordHistProdEx.getActivityPointExchYn())) {
								//AP
								activityPointExchCnt++;
							} else {
								if ("Ord".equals(ordHistProdEx.getOrdHistProdTypeCode())) {
									onlineShipProdCnt++;
								}
								if ("BulkDc".equals(ordHistProdEx.getOrdHistProdTypeCode())) {
									if (ordIncludeProdBulkNo != ordHistProdEx.getOrdIncludedProdBulkNo()) {
										onlineShipProdCnt++;
										ordIncludeProdBulkNo = ordHistProdEx.getOrdIncludedProdBulkNo();
									}
								}
							}
						}
					}
				}
			}

			ordCntMap.put("shipOrdOnlineProdCnt", onlineShipProdCnt);
			ordCntMap.put("membershipExchCnt", membershipExchCnt);
			ordCntMap.put("activityPointExchCnt", activityPointExchCnt);

			ordCntMap.put("shipOrdOnlineProdSumCnt", onlineShipProdCnt + membershipExchCnt + activityPointExchCnt);
			ordCntMap.put("storeOrdOnlineProdSumCnt", storePickupProdCnt);
			ordCntMap.put("totalOrdOnlineProdCnt", onlineShipProdCnt + membershipExchCnt + activityPointExchCnt + storePickupProdCnt);
		}

		return ordCntMap;
	}

	/**
	 * PG결제 분기
	 */
    protected PayResult makePgPayResult(HttpServletRequest request, OrderSession orderSession) {
		String payMethodCode = orderSession.getPayMethodCode();
        
        /* 네이버페이 결제(MOBILE/PC 동일) */
        if(PAY_METHOD_CODE_NAVERPAY.equals(payMethodCode)) {
            String resultCode = request.getParameter("resultCode");
            if("Success".equals(resultCode)) { /* 거래상태 : "Success" 이외 실패 */
                return makeNaverPayResult(request, orderSession);
            }
        }
        /* WPAY 결제(MOBILE/PC 동일) */
        else if(PAY_METHOD_CODE_WPAY.equals(payMethodCode)){
			String resultCode = request.getParameter("resultCode");
			if("0000".equals(resultCode)) { /* 거래상태 : "0000" 이외 실패 */
				return makeWPayResult(request, orderSession);
			}
		}
        /* 이니시스 결제 */
        else if(PAY_METHOD_CODE_CREDIT_CARD.equals(payMethodCode)
                || PAY_METHOD_CODE_BANK_AC_TRANSFER.equals(payMethodCode)
                || PAY_METHOD_CODE_MOBILE_PHONE_PAY.equals(payMethodCode)
                || PAY_METHOD_CODE_VIRTUAL_ACCOUNT.equals(payMethodCode)
                || PAY_METHOD_CODE_PAYCO.equals(payMethodCode)
                || PAY_METHOD_CODE_KAKAOPAY.equals(payMethodCode)){
            if (isMobileDevice()) { // MOBILE
                String pStatus = request.getParameter("P_STATUS");
                if(pStatus == "00" || "00".equals(pStatus)){ /* 거래상태 : "00" 이외 실패 */
                    return makeINIMobilePayResult(request, orderSession);
                }
            }
            if (isPcDevice()) { // PC
                String pStatus = request.getParameter("resultCode");
                if(pStatus == "0000" || "0000".equals(pStatus)) { /* 거래상태 : "0000" 이외 실패 */
                    return makeINIPcPayResult(request, orderSession);
                }
            }
        }
        
        return null;
    }
	
    /**
	 * 네이버페이 결제정보
	 */
	protected PayResult makeNaverPayResult(HttpServletRequest request, OrderSession orderSession) {

		Date date;

		PayResult payResult = new PayResult();
		String payMethodCode = orderSession.getPayMethodCode();

		try{
			/**
			 * 네이버페이 결제
			 * paymentId : 네이버페이 결제번호
			 * primaryPayMeans : 주 결제수단(CARD:신용카드, BANK:계좌이체)
			 * admissionYmdt : 결제/취소일시(YYYYMMDDHH24MMSS)
			 * totalPayAmount : 총 결제/취소금액
			 */
			if(PAY_METHOD_CODE_NAVERPAY.equals(payMethodCode)) {
				String pgTradeNo = request.getParameter("paymentId");
				String primaryPayMeans = request.getParameter("primaryPayMeans");

				SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
				String admissionYmdt = request.getParameter("admissionYmdt");
				date = formatOutput.parse(admissionYmdt + "+0900");

				String totalPayAmount = request.getParameter("totalPayAmount");
				BigDecimal parseTotalPayAmount = new BigDecimal(totalPayAmount.replaceAll(",", ""));

				payResult.setPgTradeNo(pgTradeNo);
				payResult.setPayApprovalDt(date);
				payResult.setPayAmt(parseTotalPayAmount);
				payResult.setPartialCancelAvailYn(CODE_Y); //TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!

				payResult.setDepositYn(CODE_N);									// 예치금여부
				payResult.setPayMethodSn(orderSession.getPayMethodSn());       // 결제수단일련번호
				payResult.setPayServiceCode(orderSession.getPayServiceCode()); // 결제서비스코드
				payResult.setPayMethodCode(orderSession.getPayMethodCode());   // 결제수단코드
				payResult.setCreditcardCoSn(orderSession.getCreditcardCoSn()); // 신용카드업체일련번호
				payResult.setNextPayUseYn(orderSession.getNextPayUseYn());     // 다음결제사용여부
				payResult.setPayApprovalNo(null);                               // 결제승인번호
				payResult.setOptAssignData(null);                               // 임의지정데이터
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return payResult;
	}

	/**
	 * W페이 결제정보
	 */
	protected PayResult makeWPayResult(HttpServletRequest request, OrderSession orderSession) {

		Date date;

		PayResult payResult = new PayResult();
		String payMethodCode = orderSession.getPayMethodCode();

		try{

			/**
			 * W페이 결제
			 * tid : 이니시스 결제 트랜잭션 ID(TID)
			 * wtid : 인증요청시 발급된 WPAY 트랜잭션 ID
			 * bankCardCode : 신용카드(카드사 코드)
			 * cardIsscoCode : 카드발급사(은행) 코드
			 * bankCardNo : 카드번호(카드사 기준의 마스 킹 처리) / 계좌번호(마스킹처리) (확인필요)
			 * cardInterest : 무이자여부(Y/N)
			 * cardQuota : 할부개월수(00:일시불)
			 * applNum : 승인번호
			 * applDate : 승인일시 (YYYYMMDDHH24MISS)
			 * applPrice : 승인금액
			 * applCardNum : 승인카드번호 :등록 시 카드번호와 다를 수 있음
			 * cardCheckFlag : 체크카드 여부 (0: 신용카드, 1: 체크카드, 2: GIFT 카드)
			 * partCancelCode : 부분취소 가능 여부 (0: 불가능, 1: 가능)
			 */
			if(PAY_METHOD_CODE_WPAY.equals(payMethodCode)) {

				String pgTradeNo = request.getParameter("tid");
				String wtid = request.getParameter("wtid");
				String cardCoCode = request.getParameter("bankCardCode");
				String cardIssueBankCode = request.getParameter("cardIsscoCode");
				String cardNo = request.getParameter("bankCardNo");
				String cardInterest = request.getParameter("cardInterest");
				String cardQuota = request.getParameter("cardQuota");
				String payApprovalNo = request.getParameter("applNum");

				SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
				String payApprovalDt = request.getParameter("applDate");
				date = formatOutput.parse(payApprovalDt + "+0900");

				String payAmt = request.getParameter("applPrice");
				BigDecimal parseTotalPayAmount = new BigDecimal(payAmt.replaceAll(",", ""));

				String cardCheckFlag = request.getParameter("cardCheckFlag");
				if("0".equals(cardCheckFlag)){ // 신용카드

				}else if("1".equals(cardCheckFlag)) { // 체크카드

				}else if("2".equals(cardCheckFlag)) { // GIFT 카드

				}

				String partCancelCode = request.getParameter("partCancelCode");
				if("0".equals(partCancelCode)){
					payResult.setPartialCancelAvailYn(CODE_N);					// 부분취소 가능여부 : 불가능
				}else if("1".equals(partCancelCode)){
					payResult.setPartialCancelAvailYn(CODE_Y);					// 부분취소 가능여부 : 가능
				}

				payResult.setCardNo(cardNo);									// 카드번호
				payResult.setCardCoCode(cardCoCode);							// 카드사코드
				//payResult.setCardCoName(cardCoName);							// 카드명
				payResult.setCardIssueBankCode(cardIssueBankCode);				// 카드발급은행코드

				if("Y".equals(cardInterest)){									// 무이자여부(Y/N)
					payResult.setInstPeriod(Integer.parseInt(cardQuota));		// 할부기간(할부개월수)
				}else{
					payResult.setIntFreeInstPeriod(Integer.parseInt(cardQuota));// 무이자할부기간(할부개월수)
				}

				payResult.setPgTradeNo(pgTradeNo);								// PG거래번호
				payResult.setPayApprovalNo(payApprovalNo);						// 결제 승인번호
				payResult.setPayApprovalDt(date);								// 결제 승인일시
				payResult.setPayAmt(parseTotalPayAmount);						// 결제금액

				payResult.setDepositYn(CODE_N);									// 예치금여부
				payResult.setPayMethodSn(orderSession.getPayMethodSn());       // 결제수단일련번호
				payResult.setPayServiceCode(orderSession.getPayServiceCode()); // 결제서비스코드
				payResult.setPayMethodCode(orderSession.getPayMethodCode());   // 결제수단코드
				payResult.setCreditcardCoSn(orderSession.getCreditcardCoSn()); // 신용카드업체일련번호
				payResult.setNextPayUseYn(orderSession.getNextPayUseYn());     // 다음결제사용여부
				payResult.setPayApprovalNo(null);                               // 결제승인번호
				payResult.setOptAssignData(null);                               // 임의지정데이터
			}
		}
		catch (Exception e) {
			e.printStackTrace();
		}
		return payResult;
	}

    /**
     * 이니시스 결제정보(MOBILE)
     */
    protected PayResult makeINIMobilePayResult(HttpServletRequest request, OrderSession orderSession) {

    	Date date;

        PayResult payResult = new PayResult();
        String payMethodCode = orderSession.getPayMethodCode();

        try {

			/**
			 * 이니시스 결제 공통
			 * P_STATUS : 거래상태(“00” 이외 실패)
			 * P_TID : 거래번호
			 * P_TYPE : 지불수단
			 * P_AUTH_DT : 승인일자(YYYYmmddHHmmss)
			 * P_MID : 상점아이디
			 * P_OID : 상점 주문번호
			 * P_AMT : 거래금액
			 * P_UNAME : 주문자명
			 */
			String pgTradeNo = request.getParameter("P_TID");

			String pAuthDt = request.getParameter("P_AUTH_DT");
			SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
			date = formatOutput.parse(pAuthDt + "+0900");

			String merchantId = request.getParameter("P_MID");
			String payAmt = request.getParameter("P_AMT");
			BigDecimal parsePayAmt = new BigDecimal(payAmt.replaceAll(",", ""));

			payResult.setPgTradeNo(pgTradeNo);
			payResult.setPayApprovalDt(date);
			payResult.setPayAmt(parsePayAmt);
			payResult.setMerchantId(merchantId);

			logger.info("거래번호 : " + pgTradeNo);
			logger.info("승인일자 : " + pAuthDt);
			logger.info("상점아이디 : " + merchantId);
			logger.info("거래금액 : " + parsePayAmt);

			switch (payMethodCode) {
				case PAY_METHOD_CODE_CREDIT_CARD:
				case PAY_METHOD_CODE_PAYCO:// 페이코
				case PAY_METHOD_CODE_KAKAOPAY:// 카카오페이
					/**
					 * 신용카드 결제
					 * P_FN_CD1 : 카드코드
					 * P_FN_NM : 결제카드한글명
					 * P_CARD_ISSUER_CODE : 발급사 코드
					 * P_CARD_NUM : 카드번호
					 * P_CARD_PRTC_CODE : 부분취소 가능여부(부분취소가능 : 1,부분취소불가능 : 0)
					 * P_CARD_CHECKFLAG : 체크카드 여부(0:신용카드)
					 * P_CARD_INTEREST : 무이자 할부여부(0 : 일반, 1 : 무이자)
					 * P_RMESG2 : 무이자할부기간(0 : 일반,1 : 무이자)
					 */
					String cardCoCode = request.getParameter("P_FN_CD1");
					String cardCoName = request.getParameter("P_FN_NM");
					String cardIssueBankCode = request.getParameter("P_CARD_ISSUER_CODE");
					String cardNo = request.getParameter("P_CARD_NUM");
					String partialCancelAvailYn = request.getParameter("P_CARD_PRTC_CODE");
					String pCardCheckflag = request.getParameter("P_CARD_CHECKFLAG");
					String pCardInterest = request.getParameter("P_CARD_INTEREST");
					String pRmesg2 = request.getParameter("P_RMESG2");

					payResult.setCardCoCode(cardCoCode);
					payResult.setCardCoName(cardCoName);
					payResult.setCardIssueBankCode(cardIssueBankCode);
					payResult.setCardNo(cardNo);

					/* 부분취소 가능여부(부분취소가능 : 1,부분취소불가능 : 0) */
					if ("1".equals(partialCancelAvailYn)) {
						payResult.setPartialCancelAvailYn(CODE_Y);
					} else {
						payResult.setPartialCancelAvailYn(CODE_N);
					}
					payResult.setCreditcardPayTypeCode(null);

					/* 체크카드 여부(0:신용카드) */
					if ("0".equals(pCardCheckflag)) {
						if ("0".equals(pCardInterest)) {
							payResult.setInstPeriod(Integer.parseInt(pRmesg2));
						} else {
							payResult.setIntFreeInstPeriod(Integer.parseInt(pRmesg2));
						}
					}
					break;

				case PAY_METHOD_CODE_MOBILE_PHONE_PAY:
					/**
					 * 휴대폰결제
					 * P_HPP_CORP : 휴대폰 통신사
					 * P_HPP_NUM : 결제 휴대폰 번호
					 */
					String mobilePhoneNo = request.getParameter("P_HPP_NUM");
					payResult.setMobilePhoneNo(mobilePhoneNo);
					payResult.setPartialCancelAvailYn(CODE_Y);     // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_BANK_AC_TRANSFER:
					/**
					 * 실시간계좌이체
					 */

					payResult.setPartialCancelAvailYn(CODE_Y);     // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_VIRTUAL_ACCOUNT:
					/**
					 * 무통장(가상계좌)
					 * P_VACT_NUM : 입금할 계좌 번호
					 * P_VACT_DATE : 입금마감일자(yyyymmdd)
					 * P_VACT_TIME : 입금마감시간(hhmmss)
					 * P_VACT_NAME : 계좌주명
					 * P_VACT_BANK_CODE : 은행코드
					 */
					String virtualBankAcBankName = request.getParameter("P_FN_NM");
					String virtualDepositBankAcNo = request.getParameter("P_VACT_NUM");

					String virtualBankAcDeadlineDt = request.getParameter("P_VACT_DATE");
					String virtualBankAcDeadlineTime = request.getParameter("P_VACT_TIME");
					date = formatOutput.parse(virtualBankAcDeadlineDt + virtualBankAcDeadlineTime + "+0900");

					String virtualBankAcAcHolder = request.getParameter("P_VACT_NAME");
					String virtualBankAcBankCode = request.getParameter("P_VACT_BANK_CODE");

					payResult.setVirtualBankAcBankCode(virtualBankAcBankCode);      // 가상계좌은행코드
					payResult.setVirtualBankAcBankName(virtualBankAcBankName);      // 가상계좌은행명
					payResult.setVirtualDepositBankAcNo(virtualDepositBankAcNo);    // 가상입금계좌번호(입금할 계좌번호)
					payResult.setVirtualBankAcAcHolder(virtualBankAcAcHolder);      // 가상계좌예금주
					payResult.setVirtualBankAcDeadlineDt(date);                     // 가상계좌기한일시
					payResult.setVirtualBankAcDepositDt(date);                      // 가상계좌입금일시
					payResult.setVirtualBankAcClosedSmsYn(null);                    // 가상계좌마감SMS여부
					payResult.setPartialCancelAvailYn(CODE_Y);  // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

			}

			/* 공통 파라미터 */
			payResult.setDepositYn(CODE_N);           						// 예치금여부
			payResult.setPayMethodSn(orderSession.getPayMethodSn());       // 결제수단일련번호
			payResult.setPayServiceCode(orderSession.getPayServiceCode()); // 결제서비스코드
			payResult.setPayMethodCode(orderSession.getPayMethodCode());   // 결제수단코드
			payResult.setCreditcardCoSn(orderSession.getCreditcardCoSn()); // 신용카드업체일련번호
			payResult.setNextPayUseYn(orderSession.getNextPayUseYn());     // 다음결제사용여부
			payResult.setPayApprovalNo(null);                               // 결제승인번호
			payResult.setOptAssignData(null);                               // 임의지정데이터
		}
		catch (Exception e) {
			e.printStackTrace();
		}
        return payResult;
    }
    
    /**
     * 이니시스 결제정보(PC)
     */
    protected PayResult makeINIPcPayResult(HttpServletRequest request, OrderSession orderSession) {

    	Date date;

    	PayResult payResult = new PayResult();
        String payMethodCode = orderSession.getPayMethodCode();

		try {
			/**
			 * 이니시스 결제 공통
			 * tid(P_TID) : 거래번호
			 * applDate(P_AUTH_DT) : 승인일자(YYYYmmdd)
			 * applTime : 승인시간 (HHmmss)
			 * mid(P_MID) : 상점아이디
			 * TotPrice(P_AMT) : 거래금액
			 * EventCode : 이벤트코드(카드 할부 및 행사 적용 코드)
			 * MOID : 주문번호(상점주문번호. 결제 요청시 "oid" 필드에 설정된값)
			 * payMethod : 지불수단(결제방법)
			 * applNum : 승인번호(결제수단에 따리 미전송)
			 */
			String pgTradeNo = request.getParameter("tid");

			SimpleDateFormat formatOutput = new SimpleDateFormat("yyyyMMddHHmmssZ");
			String pAuthDt = request.getParameter("applDate");
			String pAuthtime = request.getParameter("applTime");
			date = formatOutput.parse(pAuthDt + pAuthtime + "+0900");

			String merchantId = request.getParameter("mid");
			String payAmt = request.getParameter("TotPrice");
			BigDecimal parsePayAmt = new BigDecimal(payAmt.replaceAll(",", ""));

			String EventCode = request.getParameter("EventCode");
			String MOID = request.getParameter("MOID");
			String INIPayMethod = request.getParameter("payMethod");

			payResult.setPgTradeNo(pgTradeNo);
			payResult.setPayApprovalDt(date);
			payResult.setPayAmt(parsePayAmt);
			payResult.setMerchantId(merchantId);

			/* 결제수단구분 */
			switch(payMethodCode){
				case PAY_METHOD_CODE_CREDIT_CARD:
				case PAY_METHOD_CODE_PAYCO:// 페이코
				case PAY_METHOD_CODE_KAKAOPAY:// 카카오페이
					/**
					 * 신용카드 결제
					 * CARD_Code(P_FN_CD1) : 카드사코드(카드코드)
					 * P_FN_NM : 결제카드한글명
					 * CARD_BankCode(P_CARD_ISSUER_CODE) : 카드발급사(발급사 코드)
					 * CARD_Num(P_CARD_NUM) : 카드번호
					 * CARD_PRTC_CODE(P_CARD_PRTC_CODE) : 부분취소 가능여부(부분취소가능 : 1,부분취소불가능 : 0)
					 * P_CARD_CHECKFLAG : 체크카드 여부(0:신용카드)
					 * CARD_Interest(P_CARD_INTEREST) : 무이자 할부여부(0 : 일반, 1 : 무이자)
					 * CARD_Quota(P_RMESG2) : 무이자할부기간
					 * CARD_SrcCode : 간편(앱)결제 구분(C : PAYCO, B : 삼성페이, D : 삼성페이(체크), G : SSGPAY, O : KAKAOPAY, L : LPAY, K : 국민앱카드, A : KPAY)
					 */
					String cardCoCode = request.getParameter("CARD_Code");
					String cardIssueBankCode = request.getParameter("CARD_BankCode");
					String cardNo = request.getParameter("CARD_Num");
					String partialCancelAvailYn = request.getParameter("CARD_PRTC_CODE");
					String pCardInterest = request.getParameter("CARD_Interest");
					String pRmesg2 = request.getParameter("CARD_Quota");

					payResult.setCardCoCode(cardCoCode);
					//payResult.setCardCoName(cardCoName);
					payResult.setCardIssueBankCode(cardIssueBankCode);
					payResult.setCardNo(cardNo);
					if("1".equals(partialCancelAvailYn)){
						payResult.setPartialCancelAvailYn(CODE_Y);
					}else{
						payResult.setPartialCancelAvailYn(CODE_N);
					}
					payResult.setCreditcardPayTypeCode(null);

					//if(pCardCheckflag == "0" || "0".equals(pCardCheckflag)){
					if("0".equals(pCardInterest)){
						payResult.setInstPeriod(Integer.parseInt(pRmesg2));
					}else{
						payResult.setIntFreeInstPeriod(Integer.parseInt(pRmesg2));
					}
					//}
					break;

				case PAY_METHOD_CODE_MOBILE_PHONE_PAY:
					/**
					 * 휴대폰결제
					 * HPP_Num(P_HPP_NUM) : 결제 휴대폰 번호
					 * payDevice : 결제장치(PC)
					 */
					String mobilePhoneNo = request.getParameter("HPP_Num");
					payResult.setMobilePhoneNo(mobilePhoneNo);
					payResult.setPartialCancelAvailYn(CODE_Y);     // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_BANK_AC_TRANSFER: // 실시간계좌이체
					/**
					 * 계좌이체
					 * ACCT_BankCode : 은행코드(은행코드, [별첨정보 참조])
					 * CSHR_ResultCode(P_CSHR_CODE) : 현금영수증 발행 정상여부(220000(정상처리))
					 * CSHR_Type(P_CSHR_TYPE) : 현금영수증구분(0 = 소득공제 / 1 = 지출증빙)
					 * ACCT_Name : 계좌주명
					 */
					String bankCode = request.getParameter("ACCT_BankCode");                    // 은행코드
					String bankPCshrCode = request.getParameter("CSHR_ResultCode");             // 현금영수증 발행 정상여부
					payResult.setPartialCancelAvailYn(CODE_Y);     // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;

				case PAY_METHOD_CODE_VIRTUAL_ACCOUNT: // 가상계좌
					/**
					 * 무통장(가상계좌)
					 * VACT_Num(P_VACT_NUM) : 입금계좌번호(무통장입금 가상계좌번호)
					 * VACT_BankCode(P_VACT_BANK_CODE) :입금은행코드(→ 별첨 “A4 은행코드” 참조)
					 * VACT_Name(P_VACT_NAME) : 예금주명
					 * VACT_InputName : 송금자명(입금 시 고객명)
					 * VACT_Date(P_VACT_DATE) : 송금일자
					 * VACT_Time : 송금시각
					 * vactBankName(P_FN_NM) : 입금은행명(무통장 입금 은행명)
					 */
					String virtualBankAcBankCode = request.getParameter("VACT_BankCode");
					String virtualBankAcBankName = request.getParameter("vactBankName");
					String virtualDepositBankAcNo = request.getParameter("VACT_Num");
					String virtualBankAcAcHolder = request.getParameter("VACT_Name");

					String virtualBankAcDeadlineDt = request.getParameter("VACT_Date");
					String virtualBankAcDeadlineTime = request.getParameter("VACT_Time");
					date = formatOutput.parse(virtualBankAcDeadlineDt + virtualBankAcDeadlineTime + "+0900");

					payResult.setVirtualBankAcBankCode(virtualBankAcBankCode);      // 가상계좌은행코드
					payResult.setVirtualBankAcBankName(virtualBankAcBankName);      // 가상계좌은행명
					payResult.setVirtualDepositBankAcNo(virtualDepositBankAcNo);    // 가상입금계좌번호(입금할 계좌번호)
					payResult.setVirtualBankAcAcHolder(virtualBankAcAcHolder);      // 가상계좌예금주
					payResult.setVirtualBankAcDeadlineDt(date);                     // 가상계좌기한일시
					payResult.setVirtualBankAcDepositDt(date);                      // 가상계좌입금일시
					payResult.setVirtualBankAcClosedSmsYn(null);                    // 가상계좌마감SMS여부
					payResult.setPartialCancelAvailYn(CODE_Y);             // TODO : 부분결제취소여부에 따른 Y,N값 설정 추후 날라오는값에 따른 파라미터 변경예정!
					break;
			}

			/* 공통 파라미터(세션정보) */
			payResult.setDepositYn(CODE_N);                                 // 예치금여부
			payResult.setPayMethodSn(orderSession.getPayMethodSn());       // 결제수단일련번호
			payResult.setPayServiceCode(orderSession.getPayServiceCode()); // 결제서비스코드
			payResult.setPayMethodCode(orderSession.getPayMethodCode());   // 결제수단코드
			payResult.setCreditcardCoSn(orderSession.getCreditcardCoSn()); // 신용카드업체일련번호
			payResult.setNextPayUseYn(orderSession.getNextPayUseYn());     // 다음결제사용여부
			payResult.setPayApprovalNo(null);                               // 결제승인번호
			payResult.setOptAssignData(null);                               // 임의지정데이터
		}
		catch (Exception e) {
			e.printStackTrace();
		}
        return payResult;
    }    

    /* 주문완료했을 때 장바구니상품삭제 */
    protected void removeOrdCartInfo(Long ordSn) {
		OrderSession orderSession = getOrderSession();
        
        OrdCartInfo ordCartInfo = orderSession.getOrdCartInfo(ordSn);
        if(ordCartInfo != null) {
            String cartProdSnListStr = "";
            if(ordCartInfo.getCartProdSnList() != null
                    && ordCartInfo.getCartProdSnList().size() > 0) {
                for(Long cartProdSn : ordCartInfo.getCartProdSnList()) {
                    cartProdSnListStr = cartProdSnListStr + (cartProdSnListStr.length() > 0 ? "," : "") + cartProdSn;
                }
            }
            cartApi.removeCartProds(ordCartInfo.getCartSn(), cartProdSnListStr);
			orderSession.removeOrdCartInfo(ordSn);
        }

		setOrderSession(orderSession);
   }

    /*protected Map<String, OrdHistAmtCompare> makeOrdAmtMap(OrdHistEx ordHist, OrdHistEx prevOrdHist, List<OrdHistAmtCompare> ordHistAmtCompareList) {
        Map<String, OrdHistAmtCompare> ordAmtMap = new HashMap<>();
        
        if(ordHistAmtCompareList != null) {
            // 환불주문금액
            OrdHistAmtCompare ohacTotalOrdAmt = createOrdHistAmtCompare(OrderConst.OAT_TotalOrdAmt);
            
            // 온라인주문취소
            OrdHistAmtCompare ohacOnlineShipAmt = null;
            // 테이크아웃취소
            OrdHistAmtCompare ohacStorePickupAmt = null;
            // 구매특가취소
            OrdHistAmtCompare ohacSpPriceAmt = null;
            // 포장/쇼핑백취소
            OrdHistAmtCompare ohacGiftPackingAmt = null;
            // 배송비환불
            OrdHistAmtCompare ohacShipFee = createOrdHistAmtCompare(OrderConst.OAT_ShipFee);
    
            // 환불할인/포인트
            OrdHistAmtCompare ohacTotalDcAmt = createOrdHistAmtCompare(OrderConst.OAT_TotalDcAmt);
            // 쿠폰할인취소
            OrdHistAmtCompare ohacCouponDcAmt = createOrdHistAmtCompare(OrderConst.OAT_CouponDc);
            // 뷰티포인트환불
            OrdHistAmtCompare ohacBPointDcAmt = createOrdHistAmtCompare(OrderConst.OAT_BPointDc);
            // 진주알환불
            OrdHistAmtCompare ohacAPointDcAmt = createOrdHistAmtCompare(OrderConst.OAT_APointDc);
            // 두툼포인트M환불
            OrdHistAmtCompare ohacDPointDcAmt = null;
    
            for(OrdHistAmtCompare ordHistAmtCompare : ordHistAmtCompareList) {
                switch(ordHistAmtCompare.getOrdHistAmtTypeCode()) {
                    case OrderConst.OAT_OnlineShipProd:
                        ohacOnlineShipAmt = ordHistAmtCompare;
                        break;
                    case OrderConst.OAT_StorePickupProd:
                        ohacStorePickupAmt = ordHistAmtCompare;
                        break;
                    case OrderConst.OAT_SpPriceAwardProd:
                        ohacSpPriceAmt = ordHistAmtCompare;
                        break;
                    case OrderConst.OAT_ShipUnitPacking:
                        ohacGiftPackingAmt = ordHistAmtCompare;
                        break;
                    case OrderConst.OAT_DefaultShipFeeDc:
                    case OrderConst.OAT_AddShipFee:
                        ohacShipFee = addOrdHistAmtCompare(ohacShipFee, ordHistAmtCompare);
                        break;
                    case OrderConst.OAT_ProdUnitCouponDc:
                    case OrderConst.OAT_MPlusNCouponDc:
                    case OrderConst.OAT_Buy1GetCouponDc:
                    case OrderConst.OAT_OrdUnitCouponDc:
                        ohacCouponDcAmt = addOrdHistAmtCompare(ohacCouponDcAmt, ordHistAmtCompare);
                        break;
                    case OrderConst.OAT_MembershipExch:
                        ohacBPointDcAmt = addOrdHistAmtCompare(ohacBPointDcAmt, ordHistAmtCompare);
                        break;
                    case OrderConst.OAT_ActivityPointExch:
                        ohacAPointDcAmt = addOrdHistAmtCompare(ohacAPointDcAmt, ordHistAmtCompare);
                        break;
                }
            }
            
            // TODO 쿠션포인트 
            
            // 환불주문금액
            ohacTotalOrdAmt = addOrdHistAmtCompare(ohacTotalOrdAmt, ohacOnlineShipAmt);
            ohacTotalOrdAmt = addOrdHistAmtCompare(ohacTotalOrdAmt, ohacStorePickupAmt);
            ohacTotalOrdAmt = addOrdHistAmtCompare(ohacTotalOrdAmt, ohacSpPriceAmt);
            ohacTotalOrdAmt = addOrdHistAmtCompare(ohacTotalOrdAmt, ohacGiftPackingAmt);
            ohacTotalOrdAmt = addOrdHistAmtCompare(ohacTotalOrdAmt, ohacShipFee);
            
            // 환불할인/포인트
            ohacTotalDcAmt = addOrdHistAmtCompare(ohacTotalDcAmt, ohacCouponDcAmt);
            ohacTotalDcAmt = addOrdHistAmtCompare(ohacTotalDcAmt, ohacBPointDcAmt);
            ohacTotalDcAmt = addOrdHistAmtCompare(ohacTotalDcAmt, ohacAPointDcAmt);
            ohacTotalDcAmt = addOrdHistAmtCompare(ohacTotalDcAmt, ohacDPointDcAmt);
            
            ordAmtMap.put(OrderConst.OAT_TotalOrdAmt, ohacTotalOrdAmt);
            ordAmtMap.put(OrderConst.OAT_OnlineShipProd, ohacOnlineShipAmt);
            ordAmtMap.put(OrderConst.OAT_StorePickupProd, ohacStorePickupAmt);
            ordAmtMap.put(OrderConst.OAT_SpPriceAwardProd, ohacSpPriceAmt);
            ordAmtMap.put(OrderConst.OAT_ShipUnitPacking, ohacGiftPackingAmt);
            ordAmtMap.put(OrderConst.OAT_ShipFee, ohacShipFee);
            
            ordAmtMap.put(OrderConst.OAT_TotalDcAmt, ohacTotalDcAmt);
            ordAmtMap.put(OrderConst.OAT_CouponDc, ohacCouponDcAmt);
            ordAmtMap.put(OrderConst.OAT_BPointDc, ohacBPointDcAmt);
            ordAmtMap.put(OrderConst.OAT_APointDc, ohacAPointDcAmt);
            
        }
        
        
        return ordAmtMap;
    }
    
    protected OrdHistAmtCompare addOrdHistAmtCompare(OrdHistAmtCompare ordHistAmtCompare, OrdHistAmtCompare augend) {
        if(augend != null) {
            if(ordHistAmtCompare == null) {
                ordHistAmtCompare = createOrdHistAmtCompare(augend.getOrdHistAmtTypeCode());
            }
    
            ordHistAmtCompare.setRefundAmtPcur(ordHistAmtCompare.getRefundAmtPcur().add(augend.getRefundAmtPcur()));
            ordHistAmtCompare.setRefundItaxPcur(ordHistAmtCompare.getRefundItaxPcur().add(augend.getRefundItaxPcur()));
            ordHistAmtCompare.setRefundEtaxPcur(ordHistAmtCompare.getRefundEtaxPcur().add(augend.getRefundEtaxPcur()));
            ordHistAmtCompare.setAfterAmtPcur(ordHistAmtCompare.getAfterAmtPcur().add(augend.getAfterAmtPcur()));
            ordHistAmtCompare.setAfterItaxPcur(ordHistAmtCompare.getAfterItaxPcur().add(augend.getAfterItaxPcur()));
            ordHistAmtCompare.setAfterEtaxPcur(ordHistAmtCompare.getAfterEtaxPcur().add(augend.getAfterEtaxPcur()));
            ordHistAmtCompare.setRefundAmtPcur(ordHistAmtCompare.getRefundAmtPcur().add(augend.getRefundAmtPcur()));
            ordHistAmtCompare.setRefundItaxPcur(ordHistAmtCompare.getRefundItaxPcur().add(augend.getRefundItaxPcur()));
            ordHistAmtCompare.setRefundEtaxPcur(ordHistAmtCompare.getRefundEtaxPcur().add(augend.getRefundEtaxPcur()));
        }
        
        return ordHistAmtCompare;
    }
    
    protected OrdHistAmtCompare subtractOrdHistAmtCompare(OrdHistAmtCompare ordHistAmtCompare, OrdHistAmtCompare subtrahend) {
        if(subtrahend != null) {
            if(ordHistAmtCompare == null) {
                ordHistAmtCompare = createOrdHistAmtCompare(subtrahend.getOrdHistAmtTypeCode());
            }

            ordHistAmtCompare.setRefundAmtPcur(ordHistAmtCompare.getRefundAmtPcur().subtract(subtrahend.getRefundAmtPcur()));
            ordHistAmtCompare.setRefundItaxPcur(ordHistAmtCompare.getRefundItaxPcur().subtract(subtrahend.getRefundItaxPcur()));
            ordHistAmtCompare.setRefundEtaxPcur(ordHistAmtCompare.getRefundEtaxPcur().subtract(subtrahend.getRefundEtaxPcur()));
            ordHistAmtCompare.setAfterAmtPcur(ordHistAmtCompare.getAfterAmtPcur().subtract(subtrahend.getAfterAmtPcur()));
            ordHistAmtCompare.setAfterItaxPcur(ordHistAmtCompare.getAfterItaxPcur().subtract(subtrahend.getAfterItaxPcur()));
            ordHistAmtCompare.setAfterEtaxPcur(ordHistAmtCompare.getAfterEtaxPcur().subtract(subtrahend.getAfterEtaxPcur()));
            ordHistAmtCompare.setRefundAmtPcur(ordHistAmtCompare.getRefundAmtPcur().subtract(subtrahend.getRefundAmtPcur()));
            ordHistAmtCompare.setRefundItaxPcur(ordHistAmtCompare.getRefundItaxPcur().subtract(subtrahend.getRefundItaxPcur()));
            ordHistAmtCompare.setRefundEtaxPcur(ordHistAmtCompare.getRefundEtaxPcur().subtract(subtrahend.getRefundEtaxPcur()));
        }
        
        return ordHistAmtCompare;
    }
    
    protected OrdHistAmtCompare createOrdHistAmtCompare(String ordHistAmtTypeCode) {
        OrdHistAmtCompare ordHistAmtCompare = new OrdHistAmtCompare();
        
        ordHistAmtCompare.setOrdHistAmtTypeCode(ordHistAmtTypeCode);
        ordHistAmtCompare.setRefundAmtPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setRefundItaxPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setRefundEtaxPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setAfterAmtPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setAfterItaxPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setAfterEtaxPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setRefundAmtPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setRefundItaxPcur(BigDecimal.ZERO);
        ordHistAmtCompare.setRefundEtaxPcur(BigDecimal.ZERO);
        
        return ordHistAmtCompare;
    }*/
    

}