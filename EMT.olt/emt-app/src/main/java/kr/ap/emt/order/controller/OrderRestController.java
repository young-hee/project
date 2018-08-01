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
import net.g1project.ecp.api.model.EmbeddableAddress;
import net.g1project.ecp.api.model.EmbeddableName;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.MemberForUpdate;
import net.g1project.ecp.api.model.ap.ap.PostAndPutShipAddressInfo;
import net.g1project.ecp.api.model.ap.ap.ShipAddressInfo;
import net.g1project.ecp.api.model.order.order.*;
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

@Controller
@RequestMapping("/order")
public class OrderRestController extends AbstractController{
	/** logger setting.. */
	final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * 주문/배송건수 조회
	 *
	 * @return
	 */
	@GetMapping("/getOrderCount")
	@ResponseBody
	public ResponseEntity<?> getOrderCount() {

		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			OrdSummaryInfo ordSummary = orderApi.getOrdSummary(getMemberSn(), null, null);

			//주문/배송건수(FO Header)
			result.put("ordShippngCnt", ordSummary.getOrdReceptCnt() + ordSummary.getPayCompleteCnt() + ordSummary.getPreparingCnt() + ordSummary.getShippingCnt());

		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 사용가능 쿠폰목록
	 *
	 * @return
	 */
	@GetMapping("/getCouponList")
	@ResponseBody
	public ResponseEntity<?> getCouponList(Long ordSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			if(Long.valueOf(ordSn) != null){
				AvailCouponListResult availCoupon = orderApi.getOrdAvailCouponList(ordSn);
				result.put("availCouponCnt", availCoupon.getAvailCouponCnt());		// 사용가능쿠폰수
				result.put("availCouponExList", availCoupon.getAvailCouponExList()); // 사용가능 쿠폰목록
				result.put("result", "success");
			}
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 기본배송지 목록조회
	 *
	 * @return
	 */
	@GetMapping("/orderShipAddress")
	@ResponseBody
	public ResponseEntity<?> orderShipAddress(Long memberSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			if(Long.valueOf(memberSn) != null){
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
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 기본배송지 등록
	 *
	 * @return
	 */
	@PostMapping("/orderAddAddress")
	@ResponseBody
	public ResponseEntity<?> orderAddAddress(@Valid OrdReceptChangeDTO ordRcDTO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
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
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 기본배송지 수정
	 * @return
	 */
	@PutMapping("/orderUpdateAddress")
	@ResponseBody
	public ResponseEntity<?> orderUpdateAddress(@Valid OrdReceptChangeDTO ordRcDTO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
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
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 결제정보 요청
	 * @return
	 */
	@PostMapping("/ordReceptPayAmt")
	@ResponseBody
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
		try {
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
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 주문정보 변경
	 * @return
	 */
	@PostMapping("/ordReceptChange")
	@ResponseBody
	public ResponseEntity<?> ordReceptChange(@Valid OrdReceptChangeDTO ordRcDTO){
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			if(ordRcDTO != null){
				OrdReceptChange body = new OrdReceptChange();

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

				//TODO : 편의점 저장하는 DTO 없다...

				orderApi.ordReceptChange(ordRcDTO.getOrdSn(), body);
				result.put("result", "success");
			}
		} catch (Exception e) {
			e.printStackTrace();
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 쿠폰정보 적용 및 변경
	 * @return
	 */
	@PostMapping("/ordReceptChangeCoupon")
	@ResponseBody
	public ResponseEntity<?> ordReceptChangeCoupon(Long ordSn, String[] memberKeepingCouponSnArr, String searchText){
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			OrdReceptChange body = new OrdReceptChange();
			List<Long> memberCouponSnList = new ArrayList<Long>();;
			List<String> inputCouponIdList = new ArrayList<String>();;
			if(memberKeepingCouponSnArr.length > 0 || StringUtils.isNotBlank(searchText)){
				/* 보유쿠폰 */
				if(memberKeepingCouponSnArr.length > 0){
					for(int i=0; i < memberKeepingCouponSnArr.length; i++){
						if(memberKeepingCouponSnArr[i] != null){
							memberCouponSnList.add(Long.valueOf(memberKeepingCouponSnArr[i]));
						}
					}
					body.setMemberCouponSnList(memberCouponSnList);
				}
				/* 입력쿠폰 */
				if(StringUtils.isNotBlank(searchText)){
					inputCouponIdList.add(searchText);
					body.setInputCouponIdList(inputCouponIdList);
				}
				OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);
				result.put("param", ordRc.getApplyCouponExList());
			}
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
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
	@ResponseBody
	public ResponseEntity<?> ordReceptChangeBag(Long ordSn, Long coSn, Long giftPackingSn, Integer giftPackingQty){
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			OrdReceptChange body = new OrdReceptChange();
			List<OtfGiftPackingSelect> otfGiftPackingList = new ArrayList<OtfGiftPackingSelect>();
			OtfGiftPackingSelect otfGiftPackingSelect = new OtfGiftPackingSelect();
			if(ordSn != null && giftPackingSn != null && giftPackingQty != null){
				otfGiftPackingSelect.setCoSn(coSn);						// 업체일련번호
				otfGiftPackingSelect.setGiftPackingSn(giftPackingSn);	// 선물포장일련번호
				otfGiftPackingSelect.setGiftPackingQty(giftPackingQty);	// 선물포장수량
				otfGiftPackingList.add(otfGiftPackingSelect);
				body.setOtfGiftPackingSelectList(otfGiftPackingList);
				OrdEx ordRc = orderApi.ordReceptChange(ordSn, body);
				result.put("param", ordRc.getOrdHistEx());
			}
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
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
	@ResponseBody
	public ResponseEntity<?> orderPutMember(String memberId, String name1, String phoneNo, String emailAddress){
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
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
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
		return ResponseEntity.ok(result);
	}
}