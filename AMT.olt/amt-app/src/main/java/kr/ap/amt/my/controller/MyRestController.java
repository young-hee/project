package kr.ap.amt.my.controller;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import kr.ap.amt.my.vo.MyInfoDTO;
import kr.ap.amt.my.vo.TermsAgree;
import kr.ap.comm.api.vo.*;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.ApPasswordEncoder;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.SessionKey;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableAddress;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.*;
import net.g1project.ecp.api.model.ap.ap.CheckResult;
import net.g1project.ecp.api.model.ap.ap.MemberAddAttr;
import net.g1project.ecp.api.model.ap.ap.MemberForUpdate;
import net.g1project.ecp.api.model.ap.ap.SignupReceiveAgree;
import net.g1project.ecp.api.model.ap.ap.SignupTermsAgree;
import net.g1project.ecp.api.model.offlinestore.store.RegularStoreForPost;
import net.g1project.ecp.api.model.offlinestore.store.RegularStorePostResult;
import net.g1project.ecp.api.model.offlinestore.store.StoreResult;
import net.g1project.ecp.api.model.sales.member.*;
import net.g1project.ecp.api.model.sales.terms.MemberTermsAgree;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *
 * 마이 에뛰드
 *
 * 나의 정보 관리
 *
 * 1. 개인정보 수정
 * 2. 배송지 관리
 * 3. 단골매장 관리
 * 4. 회원탈퇴
 * 5. 선택약관 동의 변경
 *
 */
@Controller
@RequestMapping("/my/api")
public class MyRestController extends AbstractController {


	/**********************************************************************************************
	 *  1. 개인정보 수정
	 **********************************************************************************************/

	/**
	 * SNS 연동
	 * 
	 * @param request
	 * @return
	 */
	@PostMapping("/snsConnect")
	@ResponseBody
	public ResponseEntity<?> snsloginProcess(HttpServletRequest request) {
		return snsloginProcessM(request);
	}
	
	/**
	 * SNS 연동해제
	 * 
	 * @param termsCode
	 * @return
	 */
	@PostMapping("/checkTerms")
	@ResponseBody
	public ResponseEntity<?> checkTerms(String termsCode) {
		Map<String, Object> result = new HashMap<String, Object>();
		if(isAgreeTerms(termsCode)) {
			return ResponseEntity.ok(result);
		}
		throw error(null, null, null, null);
	}
	
	private boolean isAgreeTerms(String termsCode) {
		List<MemberTermsAgree> terms = termsApi.getMemberAgreedTerms(getMemberSn());
		for (MemberTermsAgree memberTermsAgree : terms) {
			if(termsCode.equals(memberTermsAgree.getTermsDisplayCode())) {
				if("Y".equals(memberTermsAgree.getAgreeYn()))
					return true;
			}
		}
		return false;
	}
	
	/**
	 * 약관동의 여부 확인.
	 * 
	 * @param request
	 * @param sns
	 * @return
	 */
	@PostMapping("/snsDisconnect")
	@ResponseBody
	public ResponseEntity<?> snsDisconnect(HttpServletRequest request, String sns) {
		return snsDisconnectM(request, sns);
	}
	
	
	/**
	 * 회원정보 수정. - 개인정보.
	 * @param myinfo
	 * @return
	 */
	@PostMapping("/changePriveInfo")
	public ResponseEntity<?> changePriveInfo(MyInfoDTO myinfo) {

		if(!myinfo.getEmail().isEmpty() || !myinfo.getUser().getHomeBscsAddr().isEmpty())
			if(!isAgreeTerms("030")) {
				termsApi.postAgreedTerms(getMemberSn(), "030");
			}
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		MemberSession memberSession = getMemberSession();

		CicuemCuInfTotTcVo vo1 = myinfo.getUser();
		if(vo1 == null) {
			vo1 = new CicuemCuInfTotTcVo();
		}
		vo1.setChCd(APConstant.AP_CH_CD);
		CicuemCuOptiCsTcVo vo = new CicuemCuOptiCsTcVo();
		vo1.setCicuemCuOptiTcVo(vo);
		vo1.setIncsNo(memberSession.getUser_incsNo());
		if(!myinfo.getEmail().isEmpty()) {
			vo1.setCustEmid(myinfo.getEmail().substring(0, myinfo.getEmail().indexOf("@")));
			vo1.setCustEmdn(myinfo.getEmail().substring(myinfo.getEmail().indexOf("@")));
		}
		
		MemberForUpdate body = new MemberForUpdate();
		body.setEmailAddress(myinfo.getEmail());
		EmbeddableTel phoneNo1 = new EmbeddableTel();
		phoneNo1.setPhoneNo(myinfo.getPhoneNumber1() + myinfo.getPhoneNumber2());
		body.setPhoneNo1(phoneNo1);
		if(!myinfo.getUser().getHomeBscsAddr().isEmpty()) {
			EmbeddableAddress address = new EmbeddableAddress();
			
			address.setZipCode(myinfo.getUser().getHomeZip());
			address.setAddress1(myinfo.getUser().getHomeBscsAddr());
			address.setAddress2(myinfo.getUser().getHomeDtlAddr());
			body.setAddress(address);
		}
		
		CicuemCuInfCoOutVo resultVo = amoreAPIService.updatecicuemcuinfrfull(vo1);
		if(APConstant.RESULT_OK.equals(resultVo.getRsltCd())) {
			try {
				apApi.putMember(memberSession.getMember_sn(), body);
				ApMember apMember = apApi.getMemberInfo(memberSession.getMember_sn());
				memberSession.setMember(apMember);
			}  catch(Exception e) {
			
			}
		} else {
			throw error(result, HttpStatus.FORBIDDEN, null, null);
		}
			
		return ResponseEntity.ok(result);
	}
	/**
	 * 회원정보 수정. - 수산동의정보.
	 * @param myinfo
	 * @return
	 */
	@PostMapping("/changeOptionInfo")
	public ResponseEntity<?> changeOptionInfo(MyInfoDTO myinfo) {


		MemberSession memberSession = getMemberSession();
		Map<String, Object> result = new HashMap<String, Object>();

		MemberForUpdate body = new MemberForUpdate();
		List<SignupReceiveAgree> memberReceiveAgrees = new ArrayList<SignupReceiveAgree>();
		for(TermsAgree ta : myinfo.getReceive()) {
			SignupReceiveAgree sa = new SignupReceiveAgree();
			sa.setReceiveTypeCode(ta.getName());
			sa.setReceiveAgreeCode(ta.isValue()? "Agree" : "NotAgree");
			memberReceiveAgrees.add(sa);
		}
		body.setMemberReceiveAgrees(memberReceiveAgrees);

		List<CicuemCuOptiCsTcVo> list = new ArrayList<CicuemCuOptiCsTcVo>();
		String userId = getMemberSession().getMember().getMemberId();
		String today = DateFormatUtils.format(new Date(System.currentTimeMillis()), "yyyyMMdd");
		CicuemCuOptiCsTcVo vo = new CicuemCuOptiCsTcVo();
		vo.setIncsNo(memberSession.getUser_incsNo());
		vo.setChCd(APConstant.BT_CH_CD);
		for(TermsAgree ta : myinfo.getApReceive()) {
			if("Email".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setEmlOptiYn("Y");
					vo.setEmlOptiDt(today);
				} else {
					vo.setEmlOptiYn("N");
				}
			} else if("SMS".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setSmsOptiYn("Y");
					vo.setSmsOptiDt(today);
				} else {
					vo.setSmsOptiYn("N");
				}
			} else if("DM".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setDmOptiYn("Y");
					vo.setDmOptiDt(today);
				} else {
					vo.setDmOptiYn("N");
				}
			} else if("TM".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setTmOptiYn("Y");
					vo.setTmOptiDt(today);
				} else {
					vo.setTmOptiYn("N");
				}
			}
		}
		vo.setLschId(userId);
		list.add(vo);
		
		try {
			vo = vo.clone();
			vo.setChCd(APConstant.CP_CH_CD);
			list.add(vo);
			
		} catch (CloneNotSupportedException e1) {
		}


		vo = new CicuemCuOptiCsTcVo();
		vo.setIncsNo(memberSession.getUser_incsNo());
		vo.setChCd(APConstant.AP_CH_CD);
		for(TermsAgree ta : myinfo.getReceive()) {
			if("Email".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setEmlOptiYn("Y");
					vo.setEmlOptiDt(today);
				} else {
					vo.setEmlOptiYn("N");
				}
			} else if("SMS".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setSmsOptiYn("Y");
					vo.setSmsOptiDt(today);
				} else {
					vo.setSmsOptiYn("N");
				}
			} else if("DM".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setDmOptiYn("Y");
					vo.setDmOptiDt(today);
				} else {
					vo.setDmOptiYn("N");
				}
			} else if("TM".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setTmOptiYn("Y");
					vo.setTmOptiDt(today);
				} else {
					vo.setTmOptiYn("N");
				}
			}
		}
		vo.setLschId(userId);
		list.add(vo);
		
		try {
			vo = vo.clone();
			vo.setChCd(APConstant.OS_CH_CD);
			list.add(vo);
			
		} catch (CloneNotSupportedException e1) {
		}
		
		CicuemCuOptiTcResultVo cicuemCuOptiTcResultVo = new CicuemCuOptiTcResultVo();
		cicuemCuOptiTcResultVo.setCicuemCuOptiTcVo(list);
		SimpleloVo rslt = amoreAPIService.savecicuemcuoptilist(cicuemCuOptiTcResultVo);
		if(APConstant.RESULT_OK.equals(rslt.getRsltCd())) {
			try {
				apApi.putMember(memberSession.getMember_sn(), body);
				ApMember apMember = apApi.getMemberInfo(memberSession.getMember_sn());
				memberSession.setMember(apMember);
				setMemberSession(memberSession);
			} catch(Exception e) {
				
			}
		} else {
			throw error(result, HttpStatus.FORBIDDEN, null, null);
		}

		return ResponseEntity.ok(result);
	}
	/**
	 * 회원정보 수정. - 약관정보.
	 * @param myinfo
	 * @return
	 */
	@PostMapping("/changeTermsInfo")
	public ResponseEntity<?> changeTermsInfo(MyInfoDTO myinfo) {

		MemberSession memberSession = getMemberSession();

		Map<String, Object> resp = new HashMap<String, Object>();
		Map<String, Boolean> agreeMap = new HashMap<String, Boolean>();
		List<MemberTermsAgree> result = termsApi.getMemberAgreedTerms(memberSession.getMember_sn());
		List<CicuedCuTncaTcVo> cicuedCuTncaTcVo = new ArrayList<CicuedCuTncaTcVo>();
		CicuedCuTncaTcVo tncaTc = null;
		for(int i = 3; i < 8; i++) {
			boolean isAree = false;
			for (MemberTermsAgree memberTermsAgree : result) {
				if(("0" + i + "0").equals(memberTermsAgree.getTermsDisplayCode())) {
					isAree = "Y".equals(memberTermsAgree.getAgreeYn());
				}
			}
			agreeMap.put("0" + i + "0", isAree);
		}
		String agreed = "";
		String removeAgreed = "";
		for (TermsAgree ta : myinfo.getPolicy()) {

			tncaTc = new CicuedCuTncaTcVo();
			tncaTc.setTcatCd(ta.getName());
			tncaTc.setTncAgrYn(ta.isValue()? "Y" : "N");

			//FIXME 약관버전 및 통합고객번호 넣어야함.
			tncaTc.setTncvNo("1");//약관버전
			tncaTc.setIncsNo(memberSession.getUser_incsNo());//통합고객번호 세팅.
			tncaTc.setLschId("000");
			tncaTc.setChgChCd(APConstant.AP_CH_CD);
			tncaTc.setChCd(APConstant.AP_CH_CD);
			cicuedCuTncaTcVo.add(tncaTc);
			

			if(ta.isValue()) {
				if(!agreeMap.get(ta.getName()))
					agreed +=  "," + ta.getName();
			} else {
				if(agreeMap.get(ta.getName()))
					removeAgreed +=  "," + ta.getName();
			}
		}
		


		CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
		cicuemCuInfTotTcVo.setCicuedCuTncaTcVo(cicuedCuTncaTcVo);
		SimpleloVo rslt = amoreAPIService.savecicuedcutnca(cicuemCuInfTotTcVo);
		if(APConstant.RESULT_OK.equals(rslt.getRsltCd())) {
			try {

				if(!agreed.isEmpty())
					termsApi.postAgreedTerms(memberSession.getMember_sn(), agreed.substring(1));
				if(!removeAgreed.isEmpty())
					termsApi.deleteAgreeTerms(memberSession.getMember_sn(), removeAgreed.substring(1));
				
				if(removeAgreed.contains("030")) {

					CicuemCuInfTotTcVo vo1 = new CicuemCuInfTotTcVo();
					vo1.setChCd(APConstant.AP_CH_CD);
					CicuemCuOptiCsTcVo vo = new CicuemCuOptiCsTcVo();
					vo1.setCicuemCuOptiTcVo(vo);
					vo1.setIncsNo(memberSession.getUser_incsNo());
					vo1.setHomeZip("");
					vo1.setHomeBscsAddr("");
					vo1.setHomeDtlAddr("");
					vo1.setCustEmid("");
					vo1.setCustEmdn("");
					
					MemberForUpdate body = new MemberForUpdate();
					body.setEmailAddress("");
					body.setPhoneNo1(getMemberSession().getMember().getPhoneNo1());
					EmbeddableAddress address = new EmbeddableAddress();
					
					address.setZipCode("");
					address.setAddress1("");
					address.setAddress2("");
					body.setAddress(address);
					

					try {
						CicuemCuInfCoOutVo resultVo = amoreAPIService.updatecicuemcuinfrfull(vo1);
						if(APConstant.RESULT_OK.equals(resultVo.getRsltCd())) {
							try {
								apApi.putMember(memberSession.getMember_sn(), body);
								ApMember apMember = apApi.getMemberInfo(memberSession.getMember_sn());
								memberSession.setMember(apMember);
							}  catch(Exception e) {
							
							}
						} else {
						}
						
					} catch (ApiException e) {
					}
				}
			} catch(Exception e) {

				throw error(resp, HttpStatus.FORBIDDEN, null, null);
			}
		} else {
			throw error(resp, HttpStatus.FORBIDDEN, null, null);
		}
		
		
		return ResponseEntity.ok(resp);
	}

	/**
	 * 비밀번호 변경.
	 * @param password
	 * @param oriPassword
	 * @return
	 */
	@PostMapping("/changePwd")
    @ResponseBody
	public ResponseEntity<?> changePwd(String password, String oriPassword) {
        return changePwdM(password, oriPassword);
	}



	/**********************************************************************************************
	 *  2. 배송지 관리
	 **********************************************************************************************/
	/**
	 * 기본 배송지, 배송지 삭제
	 *
	 * @param request
	 * @param type
	 * @param shipAddressSn
	 * @return
	 */
	@PostMapping("/repAddress")
	@ResponseBody
	public HashMap<String, Object> repAddress(HttpServletRequest request, String type, String shipAddressSn) {

		System.out.println("shipAddressSn: " + shipAddressSn);

		HashMap<String, Object> respMap = new HashMap<String, Object>();

		MemberSession m = getMemberSession();
		if ("rep".equalsIgnoreCase(type)) {
			SetRepAddressResult result = apApi.setRepShipAddress(102L, Long.parseLong(shipAddressSn));
			// SetRepAddressResult result = memberApi.setRepShipAddress(102L, Long.parseLong(shipAddressSn));
			respMap.put("result", result.isResult() ? "success" : "fail");
		} else if ("delete".equalsIgnoreCase(type)) {
			//
			if (shipAddressSn != null) {
				apApi.deleteShipAddress(102L, shipAddressSn);
				respMap.put("result", "success");
			}


		}

		return respMap;
	}

	// /**
	// * 기본 배송지, 배송지 삭제
	// *
	// * @param request
	// * @param accessToken
	// * @return
	// */
	// @PostMapping("/repAddress")
	// @ResponseBody
	// public HashMap<String, Object> repAddress(HttpServletRequest req, String type, String shipAddressSn) {
	//
	// System.out.println("shipAddressSn: " + shipAddressSn);
	// HashMap<String, Object> respMap = new HashMap<String, Object>();
	//
	// MemberSession m = getMemberSession();
	// if ("rep".equalsIgnoreCase(type)) {
	// // SetRepAddressResult result = memberApi.setRepShipAddress(m.getMember_sn(), shipAddressSn);
	//// SetRepAddressResult result = memberApi.setRepShipAddress(102L, shipAddressSn);
	//// respMap.put("result", result.isResult() ? "success" : "fail");
	// } else if ("delete".equalsIgnoreCase(type)) {
	// // memberApi.deleteShipAddress(m.getMember_sn(), shipAddressSn);
	// // memberApi.deleteShipAddress(102L, shipAddressSn);
	// respMap.put("result", "success");
	// }
	// respMap.put("result", "success");
	// return respMap;
	// }

	@PostMapping("/putAddress")
	@ResponseBody
	public HashMap<String, Object> putAddress(@Valid PostAndPutShipAddressInfo ship) throws JsonParseException, JsonMappingException, IOException {

		HashMap<String, Object> result = new HashMap<String, Object>();

		ShipAddressInfo add = apApi.postShipAddress(102L, ship);
		// ShipAddressInfo add = memberApi.postShipAddress(102L, ship);
		result.put("result", "success");

		return result;
	}

	@PostMapping("/updateAddress")
	@ResponseBody
	public HashMap<String, Object> updateAddress(@Valid PostAndPutShipAddressInfo ship, Long shipAddressSn) throws JsonParseException, JsonMappingException, IOException {

		HashMap<String, Object> result = new HashMap<String, Object>();

		ShipAddressInfo add = apApi.putShipAddress(102L, shipAddressSn, ship);
		// ShipAddressInfo add = memberApi.putShipAddress(102L, shipAddressSn, ship);
		result.put("result", "success");

		return result;
	}

	@GetMapping("/shipAddress")
	@ResponseBody
	public HashMap<String, Object> shipAddress() {

		HashMap<String, Object> result = new HashMap<String, Object>();

		List<ShipAddressInfo> sa = apApi.getShipAddresses(102L);
		// List<ShipAddressInfo> sa = memberApi.getShipAddresses(102L);
		result.put("result", "success");
		result.put("data", sa);

		return result;
	}


	/**********************************************************************************************
	 *  3. 단골매장 관리
	 **********************************************************************************************/

	@GetMapping("/favoriteStore")
	@ResponseBody
	public ResponseEntity<?> favoriteStore(String regularStoreSearchYn, String storeEventCode,
										   String keyword, String addressDiv, String addressDetailDiv, Double latitude, Double longitude, Double radius, Integer offSet, Integer limit, String sortBy) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			StoreResult sr = storeApi.getStores(getMemberSn(), regularStoreSearchYn, storeEventCode, keyword, addressDiv, addressDetailDiv, latitude != null ? BigDecimal.valueOf(latitude) : null,
				longitude != null ? BigDecimal.valueOf(longitude) : null, radius != null ? BigDecimal.valueOf(radius) : null, offSet, limit, sortBy);
			result.put("data", sr);
		} catch (ApiException ae) {
			result.put("errorData", ae);
			return ResponseEntity.status(ae.getStatus()).body(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 기본매장 수정
	 *
	 * @param storeSn
	 * @return
	 */
	@PostMapping("/repFavoriteStore")
	@ResponseBody
	public ResponseEntity<?> repFavoriteStore(Long storeSn) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			BooleanResult brResult = storeApi.putDefaultStore(getMemberSn(), storeSn);
			result.put("data", brResult);
		} catch (ApiException ae) {
			result.put("errorData", ae);
			return ResponseEntity.status(ae.getStatus()).body(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 단골 매장 등록
	 *
	 * @param storeSn
	 * @return
	 */
	@PostMapping("/addFavoriteStore")
	@ResponseBody
	public ResponseEntity<?> addFavoriteStore(String storeSn) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			RegularStoreForPost rs = new RegularStoreForPost();
			rs.setMemberSn(getMemberSn());
			rs.setStoreSn(Long.parseLong(storeSn));

			RegularStorePostResult rsResult = storeApi.postRegularStore(rs);
			result.put("data", rsResult);
		} catch (ApiException ae) {
			result.put("errorData", ae);
			return ResponseEntity.status(ae.getStatus()).body(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 단골 매장 해제
	 *
	 * @param storeSn
	 * @return
	 */
	@PostMapping("/delFavoriteStore")
	@ResponseBody
	public ResponseEntity<?> delFavoriteStore(String storeSn) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			storeApi.deleteRegularStores(getMemberSn(), storeSn);
			result.put("data", "success");
		} catch (ApiException ae) {
			result.put("errorData", ae);
			return ResponseEntity.status(ae.getStatus()).body(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}




	/**********************************************************************************************
	 *  4. 회원탈퇴
	 **********************************************************************************************/




	/**********************************************************************************************
	 *  5. 선택약관 동의 변경
	 **********************************************************************************************/




	//=======================모바일 기능 구현 Method
    
	private ResponseEntity<?> snsloginProcessM(HttpServletRequest req) {
		Map<String, Object> respMap = new HashMap<String, Object>();

		String snsCode = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_CODE);
		String snsId = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_ID);
		String accessToken = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_TOKEN);
		PostSnsIf snsIdIf = new PostSnsIf();
		snsIdIf.setSnsId(snsId);
		snsIdIf.setAccessToken(accessToken);
		SnsIfResult result = apApi.postMemberSns(getMemberSn(), snsCode, snsIdIf);
		respMap.put("isLinked", result.isResult());
		respMap.put("snsName", snsCode);
		return ResponseEntity.ok(respMap);
	}

	private ResponseEntity<?> snsDisconnectM(HttpServletRequest request, String sns) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		apApi.deleteMemberSns(getMemberSn(), sns);
		return ResponseEntity.ok(respMap);
	}

	private ResponseEntity<?> changeMyInfoM(MyInfoDTO myinfo) {
		//FIXME 회원정보 변경 API호출.
		MemberSession memberSession = getMemberSession();
		
		
		CicuemCuInfTotTcVo vo1 = myinfo.getUser();
		vo1.setChCd(APConstant.AP_CH_CD);
		CicuemCuOptiCsTcVo vo = new CicuemCuOptiCsTcVo();
		vo1.setCicuemCuOptiTcVo(vo);
		vo1.setIncsNo(memberSession.getUser_incsNo());
		
		MemberForUpdate body = new MemberForUpdate();
		List<MemberAddAttr> memberAddAttr = myinfo.getAttr();
		List<MemberAddAttr> memberAddAttrSub = new ArrayList<MemberAddAttr>();
		MemberAddAttr attr = null;
		for (int i = memberAddAttr.size() - 1; i>=0; i--) {
			if(APConstant.NONE.equals(memberAddAttr.get(i).getMemberAddAttrValCode())) {
				memberAddAttr.remove(i);
			} else if(memberAddAttr.get(i).getMemberAddAttrValCode().contains(",")) {
				for(String attrVal : memberAddAttr.get(i).getMemberAddAttrValCode().split(",")) {
					attr = new MemberAddAttr();
					attr.setMemberAddAttrCode(memberAddAttr.get(i).getMemberAddAttrCode());
					attr.setMemberAddAttrValCode(attrVal);
					memberAddAttrSub.add(attr);
				}
				memberAddAttr.remove(i);
			}
		}
		memberAddAttr.addAll(memberAddAttrSub);
		body.setMemberAddAttr(memberAddAttr);
		body.setEmailAddress(myinfo.getEmail());
		EmbeddableTel phoneNo1 = new EmbeddableTel();
		phoneNo1.setPhoneNo(myinfo.getPhoneNumber1());
		body.setPhoneNo1(phoneNo1);
		EmbeddableTel phoneNo2 = new EmbeddableTel();
		phoneNo2.setPhoneNo(myinfo.getPhoneNumber2());
		body.setPhoneNo2(phoneNo2);
		List<SignupReceiveAgree> memberReceiveAgrees = new ArrayList<SignupReceiveAgree>();
		for(TermsAgree ta : myinfo.getReceive()) {
			SignupReceiveAgree sa = new SignupReceiveAgree();
			sa.setReceiveTypeCode(ta.getName());
			sa.setReceiveAgreeCode(ta.isValue()? "Agree" : "NotAgree");
			memberReceiveAgrees.add(sa);
		}

		String today = DateFormatUtils.format(new Date(System.currentTimeMillis()), "yyyyMMdd");
		vo.setIncsNo(memberSession.getUser_incsNo());
		vo.setChCd(APConstant.AP_CH_CD);
		for(TermsAgree ta : myinfo.getApReceive()) {
			if("Email".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setEmlOptiYn("Y");
					vo.setEmlOptiDt(today);
				} else {
					vo.setEmlOptiYn("N");
				}
			} else if("SMS".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setSmsOptiYn("Y");
					vo.setSmsOptiDt(today);
				} else {
					vo.setSmsOptiYn("N");
				}
			} else if("DM".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setDmOptiYn("Y");
					vo.setDmOptiDt(today);
				} else {
					vo.setDmOptiYn("N");
				}
			} else if("TM".equals(ta.getName())) {
				if(ta.isValue()) {
					vo.setTmOptiYn("Y");
					vo.setTmOptiDt(today);
				} else {
					vo.setTmOptiYn("N");
				}
			}
			
		}
		
		body.setMemberReceiveAgrees(memberReceiveAgrees);
		
		EmbeddableAddress address = new EmbeddableAddress();
		
		address.setZipCode(myinfo.getUser().getHomeZip());
		address.setAddress1(myinfo.getUser().getHomeBscsAddr());
		address.setAddress2(myinfo.getUser().getHomeDtlAddr());
		body.setAddress(address);
		
		
		Map<String, Boolean> agreeMap = new HashMap<String, Boolean>();
		List<MemberTermsAgree> result = termsApi.getMemberAgreedTerms(memberSession.getMember_sn());
		List<CicuedCuTncaTcVo> cicuedCuTncaTcVo = new ArrayList<CicuedCuTncaTcVo>();
		CicuedCuTncaTcVo tncaTc = null;
		for(int i = 3; i < 8; i++) {
			boolean isAree = false;
			for (MemberTermsAgree memberTermsAgree : result) {
				if(("0" + i + "0").equals(memberTermsAgree.getTermsDisplayCode())) {
					isAree = "Y".equals(memberTermsAgree.getAgreeYn());
				}
			}
			agreeMap.put("0" + i + "0", isAree);
		}
		List<SignupTermsAgree> memberTermsAgrees = new ArrayList<SignupTermsAgree>();
		for (TermsAgree ta : myinfo.getPolicy()) {

			tncaTc = new CicuedCuTncaTcVo();
			tncaTc.setTcatCd(ta.getName());
			tncaTc.setTncAgrYn(ta.isValue()? "Y" : "N");

			//FIXME 약관버전 및 통합고객번호 넣어야함.
			tncaTc.setTncvNo("1");//약관버전
			tncaTc.setIncsNo(memberSession.getUser_incsNo());//통합고객번호 세팅.
			cicuedCuTncaTcVo.add(tncaTc);
			
			if(ta.isValue()) {
				if(!agreeMap.get(ta.getName())) {
					SignupTermsAgree terms = new SignupTermsAgree();
					terms.setTermsDisplayCode(ta.getName());
					terms.setAgreeYn(ta.isValue()? "Y" : "N");
					memberTermsAgrees.add(terms);
				}
			} else {
				if(agreeMap.get(ta.getName())) {

					SignupTermsAgree terms = new SignupTermsAgree();
					terms.setTermsDisplayCode(ta.getName());
					terms.setAgreeYn(ta.isValue()? "Y" : "N");
					memberTermsAgrees.add(terms);
				}
			}
		}
		
		vo1.setCicuedCuTncaTcVo(cicuedCuTncaTcVo);

		body.setMemberTermsAgrees(memberTermsAgrees);
	
		
		try {
			CicuemCuInfCoOutVo resultVo = amoreAPIService.updatecicuemcuinfrfull(vo1);
			if(APConstant.RESULT_OK.equals(resultVo.getRsltCd())) {
				apApi.putMember(memberSession.getMember_sn(), body);
				ApMember apMember = apApi.getMemberInfo(memberSession.getMember_sn());
				memberSession.setMember(apMember);
			}
			
		} catch (ApiException e) {
			e.printStackTrace();
		}
		
		return null;
	}
	private ResponseEntity<?> changePwdM(String password,
			String oriPassword) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		MemberSession memberSession = getMemberSession();
		
		CheckResult pwResult = apApi.checkMemberPassword(getMemberSn(), oriPassword);
		if(!pwResult.isResult()) {
			throw error(result, HttpStatus.UNAUTHORIZED, "EAPI001", "잘못된 패스워드 입니다.");
		}
		
		CicuemCuInfTotTcVo vo = new CicuemCuInfTotTcVo();
		vo.setIncsNo(memberSession.getUser_incsNo());
		List<CicuedCuChCsTcVo> cicuedCuChCsTcVo = new ArrayList<CicuedCuChCsTcVo>();
		CicuedCuChCsTcVo csTcVo = new CicuedCuChCsTcVo();
		csTcVo.setChCd(APConstant.AP_CH_CD);
		csTcVo.setChcsNo(memberSession.getMember().getMemberId());
		csTcVo.setUserPwdEc((ApPasswordEncoder.encryptPassword(password)));
		csTcVo.setPrtnNm("에뛰드");
		cicuedCuChCsTcVo.add(csTcVo);
		vo.setCicuedCuChCsTcVo(cicuedCuChCsTcVo);
		CicuemCuInfCoOutVo resultVo = amoreAPIService.updatecicuemcuinfrfull(vo);
		if(APConstant.RESULT_OK.equals(resultVo.getRsltCd())) {
			return ResponseEntity.ok(result);
		} else {
			throw error(result, HttpStatus.SERVICE_UNAVAILABLE, "EAPI001", "잘못된 패스워드 입니다.");
		}
	}
}
