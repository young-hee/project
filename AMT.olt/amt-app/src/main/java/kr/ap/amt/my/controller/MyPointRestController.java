package kr.ap.amt.my.controller;

import kr.ap.comm.api.vo.*;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.SessionUtils;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableName;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.sales.point.GiveActivityPointGift;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/my/point/api")
public class MyPointRestController extends AbstractController {

	/**
	 * 유저 존재여부 체크.
	 * @param userNm
	 * @param phone
	 * @param userId
	 * @param giftPoint
	 * @return
	 */
	@PostMapping("/checkPresentMember")
	public ResponseEntity<?> checkPresentMember(String userNm, String phone, String userId, int giftPoint) {

		SessionUtils.setAttribute(getRequest(), SessionKey.PRESENT_NAME, userNm);
		SessionUtils.setAttribute(getRequest(), SessionKey.PRESENT_PHONE_NO, phone);
		SessionUtils.setAttribute(getRequest(), SessionKey.PRESENT_POINT, giftPoint);
		
		Map<String, Object> result = new HashMap<String, Object>();
		giftPoint = giftPoint - (giftPoint%10);
		String incsNo = null;
		if(phone != null && phone.length() > 9) {
			CicuemCuInfCoInVo cicuemCuInfCoInVo = new CicuemCuInfCoInVo();
			cicuemCuInfCoInVo.setSearchDiv("A");
			cicuemCuInfCoInVo.setCustNm(userNm);
	
	        if (10 == phone.length()) {
	        	cicuemCuInfCoInVo.setCellTidn(phone.substring(0, 3));
	        	cicuemCuInfCoInVo.setCellTexn(phone.substring(3, 6));
	        	cicuemCuInfCoInVo.setCellTlsn(phone.substring(6, 10));
	        } else if (11 == phone.length()) {
	        	cicuemCuInfCoInVo.setCellTidn(phone.substring(0, 3));
	        	cicuemCuInfCoInVo.setCellTexn(phone.substring(3, 7));
	            cicuemCuInfCoInVo.setCellTlsn(phone.substring(7, 11));
	        }
			CicuemCuInfTcVoList cicuemCuInfTcVo = amoreAPIService.getcicuemcuinfrlist(cicuemCuInfCoInVo);
			if(!cicuemCuInfTcVo.getCicuemCuInfTcVo().isEmpty()) {
				incsNo = cicuemCuInfTcVo.getCicuemCuInfTcVo().get(0).getIncsNo();
			}
		}
		
		if(incsNo != null && !incsNo.isEmpty()) {
			SessionUtils.setAttribute(getRequest(), SessionKey.PRESENT_INCS_NO, incsNo);
			return ResponseEntity.ok(result);
		}
		
		throw error(result, HttpStatus.FORBIDDEN, "NO_MEMBER", "회원정보없음.");
	}
	
	public void noMemberCheckSms() {
		
	}
	/**
	 * 포인트 선물.
	 * @return
	 */
	@PostMapping("/presentPoint")
	public ResponseEntity<?> presentPoint() {
		Map<String, Object> resp = new HashMap<String, Object>();
		Date now = new Date();
		CicuedTrBrkdTcVo vo = new CicuedTrBrkdTcVo();
		vo.setTlmcCd("20");
		vo.setTlmtCd("01");
		vo.setIncsNo(getMemberSession().getUser_incsNo());
		vo.setCustTrDt(DateFormatUtils.format(now, "yyyyMMdd"));
		vo.setTrTime(DateFormatUtils.format(now, "hhmmss"));
		vo.setChCd(APConstant.AP_CH_CD);
		vo.setRqPrtnId(APConstant.AP_PRTN_ID);
		
		vo.setXttrNo(DateFormatUtils.format(now, "yyyyMMddhhmmss.sss").replace(".", "") + APConstant.AP_PRTN_ID);
		vo.setPrtnNm(APConstant.AP_NAME);
		vo.setUsgAplyPt(SessionUtils.getAttribute(getRequest(), SessionKey.PRESENT_POINT) + "");
		vo.setTtSalAmt("0");
		vo.setXttpCd("121");
		if(SessionUtils.getAttribute(getRequest(), SessionKey.PRESENT_INCS_NO) != null) {
			vo.setPtgfTgtIncsNo((String) SessionUtils.getAttribute(getRequest(), SessionKey.PRESENT_INCS_NO));
		} else {
			vo.setNmbrPtgfCustNm((String) SessionUtils.getAttribute(getRequest(), SessionKey.PRESENT_NAME));
			vo.setNmbrPtgfCellPhnm((String) SessionUtils.getAttribute(getRequest(), SessionKey.PRESENT_PHONE_NO));
		}
		vo.setDrfcCd("1");
		vo.setFscrId("123456789");
		vo.setLschId("123456789");
		PtGiftOutCbcVo result = amoreAPIService.handlegift(vo);
		if(APConstant.RESULT_OK.equals(result.getRsltCd())) {
			return ResponseEntity.ok(resp);
		} else if("ICITSVBIZ212".equals(result.getRsltCd())) {

			throw error(resp, HttpStatus.FORBIDDEN, "ICITSVBIZ212", "포인트 선물횟수를 초과하여 더 이상 선물하실 수 없습니다.<br> 포인트 선물하기 및 선물받기는 각각 한 달 최대 10회까지 가능합니다.");
		} else if("ICITSVBIZ206".equals(result.getRsltCd())) {

			throw error(resp, HttpStatus.FORBIDDEN, "ICITSVBIZ206", "포인트가 부족합니다.");
		} else if("ICITSVBIZ210".equals(result.getRsltCd())) {

			throw error(resp, HttpStatus.FORBIDDEN, "ICITSVBIZ210", "0포인트를 선물할 수 없습니다.");
		}

		throw error(resp, HttpStatus.FORBIDDEN, "ERROR", "선물실패");
		
	}
	@PostMapping("/pearl/receive")
	public ResponseEntity<?> ReseivePearl(Long activityPointHistSn) {
		Map<String, Object> resp = new HashMap<String, Object>();
		BooleanResult result = pointApi.receiveActivityPointGift(getMemberSn(), activityPointHistSn);
		if(!result.isResult()) {
			throw error(resp, HttpStatus.FORBIDDEN, "EAPI001", "fail");
		}
		return ResponseEntity.ok(resp);
	}
	
	@PostMapping("/pearl/gift")
	public ResponseEntity<?> giftPearl(String memberName, String phoneNumber, Integer point) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			GiveActivityPointGift body = new GiveActivityPointGift();
			EmbeddableName name = new EmbeddableName();
			name.setName1(memberName);
			body.setName(name);
			EmbeddableTel phoneNo = new EmbeddableTel();
			phoneNo.setPhoneNo(phoneNumber);
			body.setPhoneNo(phoneNo);
			body.setPoint(point);
			BooleanResult result = pointApi.giveActivityPointGift(getMemberSn(), body);
			if(!result.isResult()) {
				throw error(resp, HttpStatus.FORBIDDEN, "EAPI001", "fail");
			}
		} catch(Exception e) {
			throw error(resp, HttpStatus.FORBIDDEN, "EAPI001", "fail");
		}
		
		return ResponseEntity.ok(resp);
	}
	@PostMapping("/pointCard/issued")
	public ResponseEntity<?> issuingPointCard(String custNm, String cellNum) {
		Map<String, Object> resp = new HashMap<String, Object>();
		try {
			CicuedCuCardTcVo cicuedCuCardTcVo = new CicuedCuCardTcVo();
			cicuedCuCardTcVo.setIncsNo(getMemberSession().getUser_incsNo());
			cicuedCuCardTcVo.setChCd(APConstant.AP_CH_CD);
			cicuedCuCardTcVo.setCdclCd("02");//01AP 02제휴사.
			cicuedCuCardTcVo.setCdstCd("1");//정상:1 ,분실:2,사용중지:3,해지:4	필수
			cicuedCuCardTcVo.setRprsCardNoYn("Y");
			cicuedCuCardTcVo.setFscrId(getMemberSession().getMember().getMemberId());
			cicuedCuCardTcVo.setLschId(getMemberSession().getMember().getMemberId());
			CicuemCuInfCoOutVo result = amoreAPIService.createcicuedcucard(cicuedCuCardTcVo);
			if(APConstant.RESULT_OK.equals(result.getRsltCd())) {
				MemberSession membersession = getMemberSession();
				membersession.setUser_incsCardNoEc(result.getIncsCardNoEc());
				setMemberSession(membersession);
				return ResponseEntity.ok(resp);
			} else {
				throw error(resp, HttpStatus.FORBIDDEN, "ERROR", "카드 발급에 실패했습니다.");
			}
		} catch(ApiException e) {
			throw error(resp, HttpStatus.FORBIDDEN, "ERROR", "카드 발급에 실패했습니다.");
		}
		
	}
}
