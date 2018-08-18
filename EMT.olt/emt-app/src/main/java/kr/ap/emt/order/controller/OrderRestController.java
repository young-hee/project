/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.order.controller;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

        OrdSummaryInfo ordSummary = orderApi.getOrdSummary(getMemberSn(), null, null);

        //주문/배송건수(FO Header)
        result.put("ordShippngCnt", ordSummary.getOrdReceptCnt() + ordSummary.getPayCompleteCnt() + ordSummary.getPreparingCnt() + ordSummary.getShippingCnt());

		return ResponseEntity.ok(result);
	}

	/**
	 * 사용가능 쿠폰목록
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
	 * 다운로드 쿠폰목록
	 *
	 * @return
	 */
	@GetMapping("/getDownloadCouponList")
	public ResponseEntity<?> getDownloadCouponList() {
		HashMap<String, Object> result = new HashMap<String, Object>();
        List<DownloadCoupons> downloadCoupons = couponApi.getDownloadCoupons("All", "N", getMemberSn(), null, null);
        result.put("downloadCouponCnt", downloadCoupons.size());	// 다운로드 쿠폰수
        result.put("downloadCouponList", downloadCoupons); 		// 다운로드 쿠폰목록
        result.put("result", "success");

		return ResponseEntity.ok(result);
	}

	/**
	 * 쿠폰 다운로드
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
	 * 기본배송지 목록조회
	 *
	 * @return
	 */
	@GetMapping("/orderShipAddress")
	public ResponseEntity<?> orderShipAddress(Long memberSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
        if(memberSn != null){
            ShipAddressInfo shipAddressInfo = new ShipAddressInfo();
            List<ShipAddressInfo> sa = apApi.getShipAddresses(memberSn);
            if(sa.size() > 0 ){
                for(ShipAddressInfo si : sa){
                    shipAddressInfo.setShipAddressSn(si.getShipAddressSn());
                }
                result.put("shipAddressMethod", "updateShipAddress");
                result.put("param", shipAddressInfo.getShipAddressSn());
            }else{
                result.put("shipAddressMethod", "insertShipAddress");
            }
            result.put("result", "success");

        }

		return ResponseEntity.ok(result);
	}

	/**
	 * 기본배송지 등록
	 *
	 * @return
	 */
	@PostMapping("/orderAddAddress")
	public ResponseEntity<?> orderAddAddress(@Valid OrdReceptChangeDTO ordRcDTO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
        if(ordRcDTO != null){
            PostAndPutShipAddressInfo body = new PostAndPutShipAddressInfo();

            /* 수취인 정보 */
            EmbeddableName en = new EmbeddableName();
            EmbeddableAddress ea = new EmbeddableAddress();
            EmbeddableTel et = new EmbeddableTel();

            en.setName1(ordRcDTO.getRecipientName());
            ea.setZipCode(ordRcDTO.getRecipientZipCode());
            ea.setAddress1(ordRcDTO.getRecipientAddress1());
            ea.setAddress2(ordRcDTO.getRecipientAddress2());
            et.setPhoneNo(ordRcDTO.getRecipientPhoneNo());

            body.setShipAddressName(ordRcDTO.getRecipientName());	// 배송지명
            body.setAddresseeName(en);								// 수취인명
            body.setAddresseeAddress(ea);							// 수취인주소
            body.setPhoneNo1(et);									// 수취인전화번호1

            apApi.postShipAddress(getMemberSession().getMember_sn(), body);
            result.put("result", "success");
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 기본배송지 수정
	 * @return
	 */
	@PutMapping("/orderUpdateAddress")
	public ResponseEntity<?> orderUpdateAddress(@Valid OrdReceptChangeDTO ordRcDTO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
        if(ordRcDTO != null && ordRcDTO.getShipAddressSn() > 0){
            PostAndPutShipAddressInfo body = new PostAndPutShipAddressInfo();

            /* 수취인 정보 */
            EmbeddableName en = new EmbeddableName();
            EmbeddableAddress ea = new EmbeddableAddress();
            EmbeddableTel et = new EmbeddableTel();

            en.setName1(ordRcDTO.getRecipientName());
            et.setPhoneNo(ordRcDTO.getRecipientPhoneNo());
            ea.setZipCode(ordRcDTO.getRecipientZipCode());
            ea.setAddress1(ordRcDTO.getRecipientAddress1());
            ea.setAddress2(ordRcDTO.getRecipientAddress2());

            body.setShipAddressName(ordRcDTO.getRecipientName());	// 배송지명
            body.setAddresseeName(en);								// 수취인명
            body.setAddresseeAddress(ea);							// 수취인주소
            body.setPhoneNo1(et);									// 수취인전화번호1

            apApi.putShipAddress(getMemberSession().getMember_sn(), ordRcDTO.getShipAddressSn(), body);
            result.put("result", "success");
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

            MemberSession memberSession = getMemberSession();
            memberSession.setOrdSn(ordSn);
            memberSession.setDepositYn(depositYn);
            memberSession.setDepositPrice(parseDepositPrice);
            memberSession.setPayMethodSn(payMethodSn);
            memberSession.setCreditcardCoSn(creditcardCoSn);
            memberSession.setNextPayUseYn(nextPayUseYn);
            memberSession.setPayServiceCode(payServiceCode);
            memberSession.setPayMethodCode(payMethodCode);
            setMemberSession(memberSession);

            result.put("result", "success");
        }
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
            MemberSession memberSession = getMemberSession();
            OrdReceptChange body = memberSession.getOrdReceptChange();
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
            body.setPurchaserName(en);											// 주문자명
            body.setPurchaserAddress(ea);										// 주문자주소
            body.setPurchaserPhoneNo1(et);										// 주문자전화번호1
            body.setPurchaserEmailAddress(ordRcDTO.getPurchaserEmailAddress());	// 주문자이메일주소

            /** 수취인 정보 */
            EmbeddableName en2 = new EmbeddableName();
            EmbeddableAddress ea2 = new EmbeddableAddress();
            EmbeddableTel et2 = new EmbeddableTel();

            /** 새로입력 정보*/
            if(StringUtils.isNotBlank(ordRcDTO.getUserName()) && StringUtils.isNotBlank(ordRcDTO.getUserPhoneNo())){
                en2.setName1(ordRcDTO.getUserName());
                ea2.setZipCode(ordRcDTO.getUserPostCode());
                ea2.setAddress1(ordRcDTO.getUserAddress1());
                ea2.setAddress2(ordRcDTO.getUserAddress2());
                et2.setPhoneNo(ordRcDTO.getUserPhoneNo());
            }else{
                en2.setName1(ordRcDTO.getRecipientName());
                ea2.setZipCode(ordRcDTO.getRecipientZipCode());
                ea2.setAddress1(ordRcDTO.getRecipientAddress1());
                ea2.setAddress2(ordRcDTO.getRecipientAddress2());
                et2.setPhoneNo(ordRcDTO.getRecipientPhoneNo());
            }
            body.setRecipientName(en2);											// 수취인명
            body.setRecipientAddress(ea2);										// 수취인주소
            body.setRecipientPhoneNo1(et2);										// 수취인전화번호1
            body.setRecipientEmailAddress(ordRcDTO.getRecipientEmailAddress());	// 수취인이메일주소

            body.setShipMsg(ordRcDTO.getShipMsg());							// 배송메세지

            /** 편의점 택백 */
            if (StringUtils.isNotEmpty(ordRcDTO.getcStoreName()) && StringUtils.isNotEmpty(ordRcDTO.getcStorePhoneNo())) {
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
            }

            orderApi.ordReceptChange(ordRcDTO.getOrdSn(), body);

            memberSession.setOrdReceptChange(body);
            setMemberSession(memberSession);

            result.put("result", "success");
        }
		return ResponseEntity.ok(result);
	}

	/**
	 * 쿠폰정보 적용 및 변경
	 *
	 * @param ordSn
	 * @param memberKeepingCouponSnArr
	 * @param membershipSn
	 * @return
	 */
	@PostMapping("/ordReceptChangeCoupon")
	public ResponseEntity<?> ordReceptChangeCoupon(Long ordSn, String[] memberKeepingCouponSnArr, Long membershipSn){
		HashMap<String, Object> result = new HashMap<String, Object>();
        MemberSession memberSession = getMemberSession();
        OrdReceptChange body = memberSession.getOrdReceptChange();
        if (body == null) {
            body = new OrdReceptChange();
        }

        List<Long> memberCouponSnList = new ArrayList<Long>();
        List<String> inputCouponIdList = new ArrayList<String>();

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

            memberSession.setOrdReceptChange(body);
            setMemberSession(memberSession);

            result.put("applyCouponExList", ordRc.getApplyCouponExList());
            result.put("ordHistEx", ordRc.getOrdHistEx());
            result.put("ordAmtMap", makeOrdAmtList(ordRc, isMember()));
            result.put("ordCntMap", makeOrdCntList(ordRc));
            result.put("apMember", apApi.getMemberInfo(getMemberSn()));

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
        MemberSession memberSession = getMemberSession();
        OrdReceptChange body = memberSession.getOrdReceptChange();
        if (body == null) {
            body = new OrdReceptChange();
        }

        List<OtfGiftPackingSelect> otfGiftPackingList = new ArrayList<OtfGiftPackingSelect>();
        OtfGiftPackingSelect otfGiftPackingSelect = new OtfGiftPackingSelect();

        if(ordSn != null){

            if (giftPackingSn != null && giftPackingQty != null) {
                otfGiftPackingSelect.setCoSn(coSn);                        // 업체일련번호
                otfGiftPackingSelect.setGiftPackingSn(giftPackingSn);    // 선물포장일련번호
                otfGiftPackingSelect.setGiftPackingQty(giftPackingQty);    // 선물포장수량
                otfGiftPackingList.add(otfGiftPackingSelect);
                body.setOtfGiftPackingSelectList(otfGiftPackingList);
            } else {
                body.setOtfGiftPackingSelectList(null);
            }

            initPoint(membershipSn, body);

            OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

            memberSession.setOrdReceptChange(body);
            setMemberSession(memberSession);

            result.put("ordHistEx", ordRc.getOrdHistEx());
            result.put("ordAmtMap", makeOrdAmtList(ordRc, isMember()));
            result.put("ordCntMap", makeOrdCntList(ordRc));
            result.put("apMember", apApi.getMemberInfo(getMemberSn()));
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
        MemberSession memberSession = getMemberSession();
        OrdReceptChange body = memberSession.getOrdReceptChange();
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

            memberSession.setOrdReceptChange(body);
            setMemberSession(memberSession);

            result.put("ordHistEx", ordRc.getOrdHistEx());
            result.put("ordAmtMap", makeOrdAmtList(ordRc, isMember()));
            result.put("ordCntMap", makeOrdCntList(ordRc));
            result.put("apMember", apApi.getMemberInfo(getMemberSn()));
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
	public ResponseEntity<?> ordReceptChangeOrdUnit(Long ordSn, Long[] ordUnitAwardSnArr, Integer[] awardSelectQtyArr, Long membershipSn){
		HashMap<String, Object> result = new HashMap<String, Object>();
        MemberSession memberSession = getMemberSession();
        OrdReceptChange body = memberSession.getOrdReceptChange();
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

            OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);

            memberSession.setOrdReceptChange(body);
            setMemberSession(memberSession);

            result.put("ordHistEx", ordRc.getOrdHistEx());
            result.put("ordAmtMap", makeOrdAmtList(ordRc, isMember()));
            result.put("ordCntMap", makeOrdCntList(ordRc));
            result.put("apMember", apApi.getMemberInfo(getMemberSn()));
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

	private void initPoint(Long membershipSn, OrdReceptChange body) {
		if (membershipSn != null) {
			//쿠폰수정하면 포인트도 초기화.
			List<MembershipPointSelect> membershipPointSelectsList = new ArrayList<MembershipPointSelect>();
			MembershipPointSelect membershipPointSelect = new MembershipPointSelect();
			membershipPointSelect.setMembershipSn(membershipSn);
			membershipPointSelect.setUseMembershipPoint(0);
			membershipPointSelectsList.add(membershipPointSelect);
			body.setMembershipPointSelectList(membershipPointSelectsList);
		}
	}
}