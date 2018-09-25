/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.order.controller;

import kr.ap.comm.order.OrderSession;
import kr.ap.emt.order.vo.OrdReceptChangeDTO;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableAddress;
import net.g1project.ecp.api.model.EmbeddableName;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.MemberForUpdate;
import net.g1project.ecp.api.model.ap.ap.PostAndPutShipAddressInfo;
import net.g1project.ecp.api.model.ap.ap.ShipAddressInfo;
import net.g1project.ecp.api.model.order.order.*;
import net.g1project.ecp.api.model.sales.coupon.DownloadCoupons;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/order")
public class OrderRestController extends OrderBaseController {
	/** logger setting.. */
	final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 주문/배송건수 조회
	 *
	 * @return
	 */
	@GetMapping("/getOrderCount")
	public ResponseEntity<?> getOrderCount() {

		HashMap<String, Object> result = new HashMap<String, Object>();

        OrdSummaryInfo ordSummary = orderApi.getOrdSummary(getMemberSn(), null, null, null);

        //주문/배송건수(FO Header)
        result.put("ordShippngCnt", ordSummary.getOrdReceptCnt() + ordSummary.getPayCompleteCnt() + ordSummary.getPreparingCnt() + ordSummary.getShippingCnt());

		return ResponseEntity.ok(result);
	}

	/**
	 * 사용가능 쿠폰목록(회원)
	 *
	 * @param ordSn
	 * @return
	 */
	@GetMapping("/getCouponList")
	public ResponseEntity<?> getCouponList(Long ordSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
        if(ordSn != null){
            AvailCouponListResult availCoupon = orderApi.getOrdAvailCouponList(ordSn);
            result.put("availCouponCnt", availCoupon.getAvailCouponCnt());		// 사용가능쿠폰수
            result.put("availCouponExList", availCoupon.getAvailCouponExList()); // 사용가능 쿠폰목록
            result.put("result", "success");
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 다운로드 쿠폰목록(회원)
	 *
	 * @return
	 */
	@GetMapping("/getDownloadCouponList")
	public ResponseEntity<?> getDownloadCouponList() {
		HashMap<String, Object> result = new HashMap<String, Object>();
        List<DownloadCoupons> downloadCoupons = couponApi.getDownloadCoupons("All", "Y", getMemberSn(), null);
        result.put("downloadCouponCnt", downloadCoupons.size());	// 다운로드 쿠폰수
        result.put("downloadCouponList", downloadCoupons); 		// 다운로드 쿠폰목록
        result.put("result", "success");

		return ResponseEntity.ok(result);
	}

	/**
	 * 쿠폰 다운로드(회원)
	 *
	 * @return
	 */
	@PostMapping("/downloadCoupon")
	public ResponseEntity<?> downloadCoupon(Long couponSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		BooleanResult booleanResult = couponApi.registDownloadCoupon(couponSn, getMemberSn());
		result.put("downloadResult", booleanResult.isResult());

		return ResponseEntity.ok(result);
	}

	/**
	 * 쿠폰 등록(비회원)
	 * 회원은 mypage참조
	 *
	 * @param couponIdentifier
	 * @return
	 */
	@PostMapping("/registerCoupon")
	public ResponseEntity<?> registerCoupon(String couponIdentifier) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		if (!StringUtils.isEmpty(couponIdentifier)) {
			DownloadCoupons downloadCoupons = couponApi.nonMemberInputCoupon(couponIdentifier);
			result.put("nonMemberInputCoupon", downloadCoupons);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 결제정보 요청
	 * @return
	 */
	@PostMapping("/ordReceptPayAmt")
	public ResponseEntity<?> ordReceptPayAmt(
		Long ordSn,
		String depositYn,
		String depositPrice,
		Long payMethodSn,
		String pgPrice,
		Long creditcardCoSn,
		String nextPayUseYn,
		String payServiceCode,
		String payMethodCode
	) {
		HashMap<String, Object> result = new HashMap<String, Object>();
        BigDecimal parsePayAmt = new BigDecimal(pgPrice.replaceAll(",", ""));
        OrdReceptPayAmt body = new OrdReceptPayAmt();
        List<PayAmt> PayAmtList = new ArrayList<PayAmt>();

        PayAmt pgPayAmt = new PayAmt();
        pgPayAmt.setDepositYn("N"); // 예치금여부('Y'면 결제수단일련번호 X)
        pgPayAmt.setPayMethodSn(payMethodSn); //결제수단일련번호
        pgPayAmt.setPayAmt(parsePayAmt); //결제금액
        PayAmtList.add(pgPayAmt);

        PayAmt depositPayAmt = new PayAmt();
        depositPayAmt.setDepositYn("Y");
        BigDecimal parseDepositPrice = new BigDecimal(depositPrice.replaceAll(",", ""));
        depositPayAmt.setPayAmt(parseDepositPrice); // 예치금
        PayAmtList.add(depositPayAmt);

        if(PayAmtList.size() > 0){
            body.setPayAmtList(PayAmtList);
            orderApi.ordReceptPayAmt(ordSn, body);

			OrderSession orderSession = getOrderSession();
			orderSession.setOrdSn(ordSn);
			orderSession.setDepositYn(depositYn);
			orderSession.setDepositPrice(parseDepositPrice);
			orderSession.setPayMethodSn(payMethodSn);
			orderSession.setCreditcardCoSn(creditcardCoSn);
			orderSession.setNextPayUseYn(nextPayUseYn);
			orderSession.setPayServiceCode(payServiceCode);
			orderSession.setPayMethodCode(payMethodCode);
			orderSession.setPgPayAmt(parsePayAmt);
			setOrderSession(orderSession);

            result.put("result", "success");
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 예치금 변경
	 * @return
	 */
	@PostMapping("/depositPriceChange")
	public ResponseEntity<?> depositPriceChange(Long ordSn, Integer depositPrice) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrderSession orderSession = getOrderSession();
		OrdReceptChange body = orderSession.getOrdReceptChange();
		if (body == null) {
			body = new OrdReceptChange();
		}
		OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);
		finalPriceAmtPcur(result, ordRc, depositPrice);

		return ResponseEntity.ok(result);
	}

	/**
	 * 주문정보 변경
	 * @return
	 */
	@PostMapping("/ordReceptChange")
	public ResponseEntity<?> ordReceptChange(@Valid OrdReceptChangeDTO ordRcDTO){
		HashMap<String, Object> result = new HashMap<String, Object>();
        if(ordRcDTO != null){
			OrderSession orderSession = getOrderSession();
            OrdReceptChange body = orderSession.getOrdReceptChange();
            if (body == null) {
                body = new OrdReceptChange();
            }

            /** 주문자 정보 */
            EmbeddableName en = new EmbeddableName();
            EmbeddableAddress ea = new EmbeddableAddress();
            EmbeddableTel et = new EmbeddableTel();
            en.setName1(ordRcDTO.getPurchaserName());
            ea.setAddress1(ordRcDTO.getPurchaserAddress());
            et.setPhoneNo(ordRcDTO.getPurchaserPhoneNo());
            body.setPurchaserName(en);												// 주문자명
            body.setPurchaserAddress(ea);											// 주문자주소
            body.setPurchaserPhoneNo1(et);											// 주문자전화번호1
            body.setPurchaserEmailAddress(ordRcDTO.getPurchaserEmailAddress());	// 주문자이메일주소

			/** 일반/편의점 구분 */
			if ("01".equals(ordRcDTO.getDelivery())) {
				/** 일반 택백 */
				body.setShipAddressTypeCode("ShipAddressInput");

				/** 수취인 정보 */
				EmbeddableName en2 = new EmbeddableName();
				EmbeddableAddress ea2 = new EmbeddableAddress();
				EmbeddableTel et2 = new EmbeddableTel();

				if(StringUtils.isNotEmpty(ordRcDTO.getAddress()) && "03".equals(ordRcDTO.getAddress())){
					/** 새로입력 정보*/
					en2.setName1(ordRcDTO.getUserName());
					ea2.setZipCode(ordRcDTO.getUserPostCode());
					ea2.setAddress1(ordRcDTO.getUserAddress1());
					ea2.setAddress2(ordRcDTO.getUserAddress2());
					et2.setPhoneNo(ordRcDTO.getUserPhoneNo());
				}else{
					//최근배송지 및 기본배송지
					en2.setName1(ordRcDTO.getRecipientName());
					ea2.setZipCode(ordRcDTO.getRecipientZipCode());
					ea2.setAddress1(ordRcDTO.getRecipientAddress1());
					ea2.setAddress2(ordRcDTO.getRecipientAddress2());
					et2.setPhoneNo(ordRcDTO.getRecipientPhoneNo());
				}

				body.setRecipientName(en2);												// 수취인명
				body.setRecipientAddress(ea2);											// 수취인주소
				body.setRecipientPhoneNo1(et2);										// 수취인전화번호1
				body.setRecipientEmailAddress(ordRcDTO.getRecipientEmailAddress());	// 수취인이메일주소

				body.setShipMsg(ordRcDTO.getShipMsg());								// 배송메세지

			} else {
				/** 편의점 */
				body.setShipAddressTypeCode("CStoreSelect");

				body.setcStoreName(ordRcDTO.getcStoreName());
				EmbeddableTel cet = new EmbeddableTel();
				cet.setPhoneNo(ordRcDTO.getcStorePhoneNo());
				body.setcStorePhoneNo(cet);
				body.setcStoreHqCode(ordRcDTO.getcStoreHqCode());
				body.setcStoreCenterCode(ordRcDTO.getcStoreCenterCode());
				body.setcStoreCenterName(ordRcDTO.getcStoreCenterName());
				body.setcStoreStoreCode(ordRcDTO.getcStoreStoreCode());
				body.setcStoreCompany(ordRcDTO.getcStoreCompany());
				body.setcStoreDockNo(ordRcDTO.getcStoreDockNo());
				EmbeddableAddress cea = new EmbeddableAddress();
				cea.setAddress1(ordRcDTO.getcStoreAddressAddress1());
				cea.setAddress2(ordRcDTO.getcStoreAddressAddress2());
				cea.setZipCode(ordRcDTO.getcStoreAddressZipCode());
				body.setcStoreAddress(cea);
				body.setcStoreArrivalAreaCode(ordRcDTO.getcStoreArrivalAreaCode());
				body.setcStoreArrivalAreaBarcode(ordRcDTO.getcStoreArrivalAreaBarcode());
				body.setcStoreDongNmCode(ordRcDTO.getcStoreDongNmCode());
				body.setcStoreArrivalDongNm(ordRcDTO.getcStoreArrivalDongNm());

				/** 수취인 정보 */
				EmbeddableName en3 = new EmbeddableName();
				EmbeddableAddress ea3 = new EmbeddableAddress();
				EmbeddableTel et3 = new EmbeddableTel();
				if (StringUtils.isNotEmpty(ordRcDTO.getAddress2()) && "01".equals(ordRcDTO.getAddress2())) {
					//주문자와 동일
					en3.setName1(ordRcDTO.getRecipientName());
					et3.setPhoneNo(ordRcDTO.getRecipientPhoneNo());
				} else {
					//새로입력
					en3.setName1(ordRcDTO.getcStoreRecipientName());
					et3.setPhoneNo(ordRcDTO.getcStoreRecipientPhoneNo());
				}

				body.setRecipientName(en3);											// 수취인명
				ea3.setZipCode(ordRcDTO.getcStoreAddressZipCode());
				ea3.setAddress1(ordRcDTO.getcStoreAddressAddress1());
				ea3.setAddress2(ordRcDTO.getcStoreAddressAddress2());
				body.setRecipientAddress(ea3);										// 수취인주소
				body.setRecipientPhoneNo1(et3);									// 수취인전화번호1

			}

            orderApi.ordReceptChange(ordRcDTO.getOrdSn(), body);

            //기본배송지 설정
			if ((StringUtils.isNotEmpty(ordRcDTO.getLatelyRepShipAddressYn()) 	&& "Y".equals(ordRcDTO.getLatelyRepShipAddressYn()))
				|| (StringUtils.isNotEmpty(ordRcDTO.getNewRepShipAddressYn()) 	&& "Y".equals(ordRcDTO.getNewRepShipAddressYn()))) {

				List<ShipAddressInfo> shipAddressInfoList = apApi.getShipAddresses(getMemberSn());

				String flag = "Insert";
				Long shipAddressSn = 0L;
				if (shipAddressInfoList != null && shipAddressInfoList.size() > 0) {
					//업데이트
					for (ShipAddressInfo si : shipAddressInfoList) {
						if ("Y".equals(si.getRepShipAddressYn())) {
							shipAddressSn = si.getShipAddressSn();
							flag = "Update";
						}
					}
				}

				PostAndPutShipAddressInfo postAndPutShipAddressInfo = new PostAndPutShipAddressInfo();

				postAndPutShipAddressInfo.setShipAddressName(body.getRecipientName().getName1());		// 배송지명
				postAndPutShipAddressInfo.setAddresseeName(body.getRecipientName());					// 수취인명
				postAndPutShipAddressInfo.setAddresseeAddress(body.getRecipientAddress());				// 수취인주소
				postAndPutShipAddressInfo.setPhoneNo1(body.getPurchaserPhoneNo1());					// 수취인전화번호1

				if ("Insert".equals(flag)) {
					apApi.postShipAddress(getMemberSession().getMember_sn(), postAndPutShipAddressInfo);
				} else {
					apApi.putShipAddress(getMemberSession().getMember_sn(), shipAddressSn, postAndPutShipAddressInfo);
				}
			}

			orderSession.setOrdReceptChange(body);
			setOrderSession(orderSession);

            result.put("result", "success");
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 회원 보유쿠폰 적용 및 변경
	 *
	 * @param ordSn
	 * @param memberKeepingCouponSnArr
	 * @param membershipSn
	 * @return
	 */
	@PostMapping("/ordReceptChangeCoupon")
	public ResponseEntity<?> ordReceptChangeCoupon(Long ordSn, String[] memberKeepingCouponSnArr, Long membershipSn){
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrderSession orderSession = getOrderSession();
        OrdReceptChange body = orderSession.getOrdReceptChange();
        if (body == null) {
            body = new OrdReceptChange();
        }

        List<Long> memberCouponSnList = new ArrayList<Long>();

        if (ordSn != null) {
            /* 보유쿠폰 */
            if (memberKeepingCouponSnArr == null) {
                //전부 삭제시 'null'로 처리함
                body.setMemberCouponSnList(null);
            } else if(memberKeepingCouponSnArr.length > 0){
                for(int i=0; i < memberKeepingCouponSnArr.length; i++){
                    if(memberKeepingCouponSnArr[i] != null){
                        memberCouponSnList.add(Long.valueOf(memberKeepingCouponSnArr[i]));
                    }
                }
                body.setMemberCouponSnList(memberCouponSnList);
            }

            initPoint(membershipSn, body);

            OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

			orderSession.setOrdReceptChange(body);
			setOrderSession(orderSession);

            result.put("applyCouponExList", ordRc.getApplyCouponExList());
			finalPriceAmtPcur(result, ordRc, 0);

        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 비회원 입력쿠폰 적용 및 변경
	 *
	 * @param ordSn
	 * @param inputCouponIdArr
	 * @return
	 */
	@PostMapping("/ordReceptChangeInputCoupon")
	public ResponseEntity<?> ordReceptChangeInputCoupon(Long ordSn, String[] inputCouponIdArr){
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrderSession orderSession = getOrderSession();
		OrdReceptChange body = orderSession.getOrdReceptChange();
		if (body == null) {
			body = new OrdReceptChange();
		}

		List<String> inputCouponIdList = new ArrayList<String>();

		if (ordSn != null) {
			/* 보유쿠폰 */
			if (inputCouponIdArr == null) {
				//전부 삭제시 'null'로 처리함
				body.setMemberCouponSnList(null);
			} else if(inputCouponIdArr.length > 0){
				for(int i=0; i < inputCouponIdArr.length; i++){
					if(inputCouponIdArr[i] != null){
						inputCouponIdList.add(inputCouponIdArr[i]);
					}
				}
				body.setInputCouponIdList(inputCouponIdList);
			}

			OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

			orderSession.setOrdReceptChange(body);
			setOrderSession(orderSession);

			result.put("applyCouponExList", ordRc.getApplyCouponExList());
			finalPriceAmtPcur(result, ordRc, 0);

		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 결제수단 선택적용
	 * //(20180912_ben수정사항)
	 * @param ordSn
	 * @param payMethodSn
	 * @return
	 */
	@PostMapping("/ordReceptChangePayMethod")
	public ResponseEntity<?> ordReceptChangePayMethod(Long ordSn, Long payMethodSn, String payAmt){
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrderSession orderSession = getOrderSession();
		OrdReceptChange body = orderSession.getOrdReceptChange();
		if (body == null) {
			body = new OrdReceptChange();
		}

		if (ordSn != null) {
			body.setPayMethodSn(payMethodSn);
			BigDecimal parsePayAmt = new BigDecimal(payAmt.replaceAll(",", ""));
			body.setPayMethodAmt(parsePayAmt);
			OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

			orderSession.setOrdReceptChange(body);
			setOrderSession(orderSession);

			finalPriceAmtPcur(result, ordRc, 0);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 포장박스/쇼핑백
	 *
	 * @param ordSn
	 * @param coSn
	 * @param giftPackingSn
	 * @param giftPackingQty
	 * @return
	 */
	@PostMapping("/ordReceptChangeBag")
	public ResponseEntity<?> ordReceptChangeBag(Long ordSn, Long coSn, Long giftPackingSn, Integer giftPackingQty, Long membershipSn){
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrderSession orderSession = getOrderSession();
        OrdReceptChange body = orderSession.getOrdReceptChange();
        if (body == null) {
            body = new OrdReceptChange();
        }

        List<OtfGiftPackingSelect> otfGiftPackingList = new ArrayList<OtfGiftPackingSelect>();
        OtfGiftPackingSelect otfGiftPackingSelect = new OtfGiftPackingSelect();

        //기준에 선택된 포장박스/쇼핑백정보 유지
		List<OtfGiftPackingSelect> otfGiftPackingSelectList = body.getOtfGiftPackingSelectList();

		if(ordSn != null){
            if (giftPackingSn != null && giftPackingQty != null) {
                otfGiftPackingSelect.setCoSn(coSn);                        // 업체일련번호
                otfGiftPackingSelect.setGiftPackingSn(giftPackingSn);    	// 선물포장일련번호
                otfGiftPackingSelect.setGiftPackingQty(giftPackingQty);    // 선물포장수량
                otfGiftPackingList.add(otfGiftPackingSelect);

				//기준에 선택된 포장박스/쇼핑백정보 유지
				if (otfGiftPackingSelectList != null) {
					for (OtfGiftPackingSelect o : otfGiftPackingSelectList) {
						if (!o.getGiftPackingSn().equals(giftPackingSn)) {
							otfGiftPackingList.add(o);
						}
					}
				}

                body.setOtfGiftPackingSelectList(otfGiftPackingList);
            } else {
                body.setOtfGiftPackingSelectList(null);
            }

            initPoint(membershipSn, body);

            OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

			orderSession.setOrdReceptChange(body);
			setOrderSession(orderSession);

			finalPriceAmtPcur(result, ordRc, 0);
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 뷰티/쿠션포인트사용
	 *
	 * @param ordSn
	 * @param membershipSn
	 * @param useMembershipPoint
	 * @return
	 */
	@PostMapping("/ordReceptChangePoint")
	public ResponseEntity<?> ordReceptChangePoint(Long ordSn, Long membershipSn, int useMembershipPoint){
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrderSession orderSession = getOrderSession();
        OrdReceptChange body = orderSession.getOrdReceptChange();
        if (body == null) {
            body = new OrdReceptChange();
        }

        List<MembershipPointSelect> membershipPointSelectsList = new ArrayList<MembershipPointSelect>();
        MembershipPointSelect membershipPointSelect = new MembershipPointSelect();
        if(ordSn != null){

            if (membershipSn != null) {
                membershipPointSelect.setMembershipSn(membershipSn);
                membershipPointSelect.setUseMembershipPoint(useMembershipPoint);
                membershipPointSelectsList.add(membershipPointSelect);
                body.setMembershipPointSelectList(membershipPointSelectsList);
            } else {
                body.setMembershipPointSelectList(null);
            }

            OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

			orderSession.setOrdReceptChange(body);
			setOrderSession(orderSession);

			finalPriceAmtPcur(result, ordRc, 0);
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 주문단위 사은품
	 *
	 * @param ordSn
	 * @param ordUnitAwardSnArr
	 * @param awardSelectQtyArr
	 * @param membershipSn
	 * @return
	 */
	@PostMapping("/ordReceptChangeOrdUnit")
	public ResponseEntity<?> ordReceptChangeOrdUnit(Long ordSn, Long[] ordUnitAwardSnArr, Integer[] awardSelectQtyArr, Long membershipSn, Integer spPriceCnt){
		HashMap<String, Object> result = new HashMap<String, Object>();
		OrderSession orderSession = getOrderSession();
        OrdReceptChange body = orderSession.getOrdReceptChange();
        if (body == null) {
            body = new OrdReceptChange();
        }

        List<OrdUnitAwardSelect> ordUnitAwardSelectList = new ArrayList<OrdUnitAwardSelect>();
        if(ordSn != null){

            if (ordUnitAwardSnArr != null && ordUnitAwardSnArr.length > 0) {
                int index = 0;
                for (Long ordUnitAwardSn : ordUnitAwardSnArr) {
                    OrdUnitAwardSelect ordUnitAwardSelect = new OrdUnitAwardSelect();
                    ordUnitAwardSelect.setOrdUnitAwardSn(ordUnitAwardSn);
                    ordUnitAwardSelect.setAwardSelectQty(awardSelectQtyArr[index++]);
                    ordUnitAwardSelectList.add(ordUnitAwardSelect);
                }

                body.setOrdUnitAwardSelectList(ordUnitAwardSelectList);
            } else {
                body.setOrdUnitAwardSelectList(null);
            }

            //특가상품 선택시 포인트 초기화
			if (spPriceCnt > 0) {
				initPoint(membershipSn, body);
			}

            OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

			orderSession.setOrdReceptChange(body);
			setOrderSession(orderSession);

			finalPriceAmtPcur(result, ordRc, 0);
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 회원정보변경
	 *
	 * @param memberId
	 * @param name1
	 * @param phoneNo
	 * @param emailAddress
	 * @return
	 */
	@PutMapping("/orderPutMember")
	public ResponseEntity<?> orderPutMember(String memberId, String name1, String phoneNo, String emailAddress){
		HashMap<String, Object> result = new HashMap<String, Object>();
        if(StringUtils.isNotEmpty(memberId) && StringUtils.isNotEmpty(name1) && StringUtils.isNotEmpty(phoneNo) && StringUtils.isNotEmpty(emailAddress)){
            MemberForUpdate var2 = new MemberForUpdate();
            EmbeddableTel et = new EmbeddableTel();
            var2.setMemberId(memberId);
            et.setPhoneNo(phoneNo);
            var2.setPhoneNo1(et);
            var2.setEmailAddress(emailAddress);
            apApi.putMember(getMemberSession().getMember_sn(), var2);
            result.put("result", "success");
        }
		return ResponseEntity.ok(result);
	}

	//포인트도 초기화.(포장/쇼핑백, 쿠폰 및 주문단위 사은품 수정시)
	private void initPoint(Long membershipSn, OrdReceptChange body) {
		if (membershipSn != null) {
			List<MembershipPointSelect> membershipPointSelectsList = new ArrayList<MembershipPointSelect>();
			MembershipPointSelect membershipPointSelect = new MembershipPointSelect();
			membershipPointSelect.setMembershipSn(membershipSn);
			membershipPointSelect.setUseMembershipPoint(0);
			membershipPointSelectsList.add(membershipPointSelect);
			body.setMembershipPointSelectList(membershipPointSelectsList);
		}
	}

	private void finalPriceAmtPcur(HashMap<String, Object> result, OrdEx ordRc, Integer depositPrice) {
		result.put("ordHistEx", ordRc.getOrdHistEx());
		result.put("ordAmtMap", makeOrdAmtList(ordRc, isMember(), depositPrice));
		result.put("ordCntMap", makeOrdCntList(ordRc));

		//가용 예치금
		result.put("depositAvailAmt", ordRc.getDepositAvailAmt());

		//가용 뷰티포인트
		List<OrdMembershipEx> ordMembershipExList = ordRc.getOrdMembershipExList();
		BigDecimal membershipAvailPoint = new BigDecimal(0);
		for (OrdMembershipEx o : ordMembershipExList) {
			if ("BP".equals(o.getMembershipServiceCode())) {
				membershipAvailPoint = ordRc.getDepositAvailAmt();
			}
		}
		result.put("membershipAvailPoint", membershipAvailPoint);

		result.put("isApMember", isMember());
	}
}