package kr.ap.amt.customer.controller;

import kr.ap.amt.customer.vo.MemberDTO;
import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.api.vo.CicuedCuChCsTcVo;
import kr.ap.comm.api.vo.CicuedCuChIdVo;
import kr.ap.comm.api.vo.CicuemCuInfCoOutVo;
import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.SessionKey;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.ApFindMemberIdResult;
import net.g1project.ecp.api.model.ap.ap.ApIssueTemporaryPassword;
import net.g1project.ecp.api.model.ap.ap.ApRequestMemberIdGuide;
import net.g1project.ecp.api.model.ap.ap.CheckResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;
import org.thymeleaf.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/customer")
public class MemberRestController extends AbstractController {

	@Autowired
	CaptchaAPI captchaAPI;

	@PostMapping("/find/findPwd/changePwd")
	@ResponseBody
	public ResponseEntity<?> changePwdPost() {

		Map<String, Object> result = new HashMap<String, Object>();
		try {
			
			ApIssueTemporaryPassword issueTemporaryPassword = (ApIssueTemporaryPassword) WebUtils.getSessionAttribute(getRequest(), "TEMP_PW_CHANGE");
	
			CheckResult result2 = apApi.requestIssueTemporaryPassword(issueTemporaryPassword);
			if(result2.isResult()) {
				WebUtils.setSessionAttribute(getRequest(), "TEMP_PW_CHANGE", issueTemporaryPassword);
			} else {
				throw error(result, HttpStatus.INTERNAL_SERVER_ERROR ,"ERROR", "비밀번호 전송에 실패했습니다. 아래 재발급 버튼을 눌러 다시 시도해주세요.");
			}
		} catch (Exception e2) {
			throw error(result, HttpStatus.INTERNAL_SERVER_ERROR ,"ERROR", "비밀번호 전송에 실패했습니다. 아래 재발급 버튼을 눌러 다시 시도해주세요.");
		}
		return null;
		
	}

	/**
	 * 회원 아이디를 SMS로 전송.
	 */
	@PostMapping("/find/findId/sendId")
	@ResponseBody
	public ResponseEntity<?> sendId() {
		ApRequestMemberIdGuide paramApRequestMemberIdGuide = new ApRequestMemberIdGuide();

		String incsNo = getMemberSession().getUser_incsNo();
		paramApRequestMemberIdGuide.setIncsNo(Long.parseLong(incsNo));
		CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
		cicuemCuInfTotTcVo.setIncsNo(incsNo);
		cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
		
		EmbeddableTel phoneNo = new EmbeddableTel();
		phoneNo.setPhoneNo(cicuemCuInfTotTcVo.getCellTidn() + cicuemCuInfTotTcVo.getCellTexn() + cicuemCuInfTotTcVo.getCellTlsn());
		paramApRequestMemberIdGuide.setPhoneNo(phoneNo);
		
		CheckResult rsltVo = apApi.requestMemberIdGuide(paramApRequestMemberIdGuide);
		if(rsltVo.isResult()) {
			return ResponseEntity.ok("{}");
		}
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("{}");
	}

	/**
	 * 패스워드 찾기.
	 * 아이디 있나 없나 선행적으로 확인.
	 */
	@PostMapping("/checkId")
	@ResponseBody
	public ResponseEntity<?> checkId(String memberId, HttpServletRequest request) {
		return checkIdM(memberId);
	}


	/**
	 * 간편ID 확인.
	 * 이름, 생년월일 폰번호로 아이디 찾기.
	 */
	@PostMapping("/find/findId/simple")
	@ResponseBody
	public ResponseEntity<?> findIdSimple(HttpServletRequest req, HttpServletResponse resp, MemberDTO user) {
		return findIdSimpleM(resp, user);
	}

	/**
	 * 아이디 찾기
	 * 외국인 번호로 아이디를 검색.
	 */
	@PostMapping("/find/findId/foreigner")
	@ResponseBody
	public ResponseEntity<?> findIdForeigner(HttpServletRequest req, HttpServletResponse resp, String memberName, String frgrRegNum) {
		return findIdForeignerM(resp, memberName, frgrRegNum);
	}

	/**
	 * 통합API '휴대폰 번호'로 고객 본인인증 받기
	 * SMS전송.
	 *
	 * @param request
	 * @return
	 */
	@PostMapping("/custSelfOnline")
	@ResponseBody
	public ResponseEntity<?> custSelfOnline(HttpServletRequest request){
		return custSelfOnlineM(request);
	}

	/**
	 * 헨드폰 번호로 본인 인증.
	 * 통합API를 사용하여 본인인증.
	 *
	 * @param request
	 * @return
	 */
	@PostMapping("/authorizationPhoneNumber")
	@ResponseBody
	public ResponseEntity<?> authorizationPhoneNumber(HttpServletRequest request){
		return authorizationPhoneNumberM(request);
	}

	
	@PostMapping("changePassword")
	public String changePassword(HttpServletRequest request) {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return changePasswordM(request);
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {//TODO
			return null;
		}
		
		return null;

	}

	
	//=======================모바일 기능 구현 Method

	private ResponseEntity<?> checkIdM(String memberId) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		respMap.put("state", "success");

		try {
			CicuedCuChIdVo cicuedCuChIdVo = new CicuedCuChIdVo();
			cicuedCuChIdVo.setCustWebId(memberId);
			cicuedCuChIdVo = amoreAPIService.getcustwebidinq(cicuedCuChIdVo);

			if(cicuedCuChIdVo == null) {
				respMap.put("state", "success");
				return ResponseEntity.ok(respMap);
			}
			if(cicuedCuChIdVo.getCustWebIdCount().equals("0")) {
				respMap.put("state", "success");
				return ResponseEntity.ok(respMap);
			} else if(!cicuedCuChIdVo.getCustWebIdCount().equals("0")){
				respMap.put("state", "failure");
				return ResponseEntity.ok(respMap);
			}
		} catch(Exception e) {
			
		}
		
		return ResponseEntity.ok(respMap);
	}

	private ResponseEntity<?> findIdSimpleM(HttpServletResponse resp,
			MemberDTO user) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		if(StringUtils.isEmpty(user.getMemberName()) || StringUtils.isEmpty(user.getAthtDtbr()) || StringUtils.isEmpty(user.getPhoneNumber())) {
			throw error(respMap, HttpStatus.INTERNAL_SERVER_ERROR, "INFOERR", "누락된 정보가 있습니다.");
		}
		String athtDt = user.getAthtDtbr().subSequence(0, 4) + "," +
		user.getAthtDtbr().subSequence(4, 6) + "," +
		user.getAthtDtbr().subSequence(6, 8);
		ApFindMemberIdResult findMember = null;
		findMember = apApi.findMemberId(user.getMemberName(), athtDt, "," + user.getPhoneNumber());
		
		if(findMember == null || findMember.getMemberId() == null) {
			throw error(respMap, HttpStatus.INTERNAL_SERVER_ERROR, "EAPI001", getMessage("customer.find.notFindId"));
		}
		
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy.MM.dd");

		respMap.put("state", "success");
		respMap.put("message", getMessage("customer.find.findIdComplete", findMember.getMemberId().substring(0, 3) + "***", dateFormat.format(findMember.getMemberSignupDt())));
		respMap.put("memberId", findMember.getMemberId());
		respMap.put("registeredDt", findMember.getMemberSignupDt());
		
		return ResponseEntity.ok(respMap);
	}


	private ResponseEntity<?> findIdForeignerM(HttpServletResponse resp,
			String memberName, String frgrRegNum) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		if(StringUtils.isEmpty(memberName) || StringUtils.isEmpty(frgrRegNum)) {
			throw error(respMap, HttpStatus.INTERNAL_SERVER_ERROR, "INFOERR", "누락된 정보가 있습니다.");
		}
		
		//FIXME 외국인 등록번호로 아이디 찾기.
		/*MemberDTO member = loginService.findUserForeigner(memberName, frgrRegNum);
		if(member == null) {
			respMap.put("state", "regist");
			return ResponseEntity.ok(respMap);
		}*/
		
		throw error(respMap, HttpStatus.INTERNAL_SERVER_ERROR, "INFOERR", "인증 불가");
	}
	private ResponseEntity<?> custSelfOnlineM(HttpServletRequest request) {
		String custNm = request.getParameter("custNm") == null?"":request.getParameter("custNm");
		String frclCd = request.getParameter("frclCd") == null?"":request.getParameter("frclCd");
		String sxclCd = request.getParameter("sxclCd") == null?"":request.getParameter("sxclCd");
		String athtDtbr = request.getParameter("athtDtbr") == null?"":request.getParameter("athtDtbr");
		String cellNum = request.getParameter("cellNum") == null?"":request.getParameter("cellNum");
		String phoneCorp = request.getParameter("phoneCorp") == null?"":request.getParameter("phoneCorp");

		HashMap<String, Object> result = new HashMap<String, Object>();

		if (!phoneCorp.isEmpty() && !custNm.isEmpty() && !frclCd.isEmpty() && !sxclCd.isEmpty() && !athtDtbr.isEmpty() && !cellNum.isEmpty()) {

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setCustNm(custNm);
			cicuemCuInfTotTcVo.setFrclCd(frclCd);
			cicuemCuInfTotTcVo.setAthtDtbr(athtDtbr.substring(2));
			cicuemCuInfTotTcVo.setSxclCd(sxclCd);
			cicuemCuInfTotTcVo.setCellTidn(cellNum.substring(0, 3));
			cicuemCuInfTotTcVo.setCellTexn(cellNum.substring(3, 7));
			cicuemCuInfTotTcVo.setCellTlsn(cellNum.substring(7));
			cicuemCuInfTotTcVo.setPhoneCorp(phoneCorp);
			cicuemCuInfTotTcVo.setJoinChCd(APConstant.AP_CH_CD);
			cicuemCuInfTotTcVo.setJoinPrtnId(APConstant.AP_PRTN_ID);

			try {
				CicuemCuInfTotTcVo cicuemCuInfTotTcVo2 = amoreAPIService.certifycustselfonline(cicuemCuInfTotTcVo);

				if("Y".equals(cicuemCuInfTotTcVo2.getR_result())) {
					CicuemCuInfTotTcVo cicuemCuInfTotTcVo3 = new CicuemCuInfTotTcVo();
					cicuemCuInfTotTcVo3.setR_certNum(cicuemCuInfTotTcVo2.getR_certNum());
					cicuemCuInfTotTcVo3.setSmsNum(cicuemCuInfTotTcVo2.getSmsNum());
					cicuemCuInfTotTcVo3.setR_check_1(cicuemCuInfTotTcVo2.getR_check_1());
					cicuemCuInfTotTcVo3.setR_check_2(cicuemCuInfTotTcVo2.getR_check_2());
					cicuemCuInfTotTcVo3.setR_check_3(cicuemCuInfTotTcVo2.getR_check_3());
					cicuemCuInfTotTcVo3.setCustNm(custNm);
					cicuemCuInfTotTcVo3.setFrclCd(frclCd);
					cicuemCuInfTotTcVo3.setAthtDtbr(athtDtbr.substring(2));
					cicuemCuInfTotTcVo3.setSxclCd(sxclCd);
					cicuemCuInfTotTcVo3.setCellTidn(cellNum.substring(0, 3));
					cicuemCuInfTotTcVo3.setCellTexn(cellNum.substring(3, 7));
					cicuemCuInfTotTcVo3.setCellTlsn(cellNum.substring(7));
					cicuemCuInfTotTcVo3.setJoinChCd(APConstant.AP_CH_CD);
					cicuemCuInfTotTcVo3.setJoinPrtnId(APConstant.AP_PRTN_ID);
					
					WebUtils.setSessionAttribute(request, SessionKey.KMS_CHECK_VO, cicuemCuInfTotTcVo3);
				} else {
					throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "EAPI001", "인증요청에 실패하였습니다. 입력 정보를 다시 한 번 확인해주세요.");
				}
			
			
			} catch (ApiException e) {
				throw e;
			} catch (Exception e) {
				throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "unknown", "알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
			}
		} else {
			throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "INFOERR", "누락된 정보가 있습니다.");
		}

		return ResponseEntity.ok(result);
	}

	private ResponseEntity<?> authorizationPhoneNumberM (//FIXME asdfs
			HttpServletRequest request) {
		String certNum = request.getParameter("smsNum") == null?"":request.getParameter("smsNum");
		String chptchaKey = request.getParameter("captchaKey") == null?"":request.getParameter("captchaKey");
		String chptcha = request.getParameter("captcha") == null?"":request.getParameter("captcha");

		HashMap<String, Object> result = new HashMap<String, Object>();

		if (!certNum.isEmpty() && !chptchaKey.isEmpty() && !chptcha.isEmpty()) {
			boolean check = captchaAPI.checkKeyValueSimple(chptchaKey, chptcha);
			
			if(!check) {
				throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "chptcha", "입력한 숫자가 이미지 숫자와 일치하지 않습니다.");
			}
			
			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = (CicuemCuInfTotTcVo) WebUtils.getSessionAttribute(request, SessionKey.KMS_CHECK_VO);
			cicuemCuInfTotTcVo.setSmsNum(certNum);
				
			CicuemCuInfTotTcVo cicuemCuInfTotTcVo2 = amoreAPIService.certifyconfirm(cicuemCuInfTotTcVo);
			if(APConstant.KIST9201.equals(cicuemCuInfTotTcVo2.getR_rsltCd())) {
				throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "expire", "만료된 인증번호입니다. 재인증 버튼을 눌러주세요.");
			}
			if(!APConstant.KIST0000.equals(cicuemCuInfTotTcVo2.getR_rsltCd())) {
				throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "certNum", "인증번호를 잘못 입력하셨습니다.");
			}
			if(APConstant.RESULT_OK.equals(cicuemCuInfTotTcVo2.getRsltCd())) {
				ApFindMemberIdResult memberResult = apApi.findMemberIdByCI(cicuemCuInfTotTcVo2.getCiNo());
				result.put("id", memberResult.getMemberId());
				result.put("message", getMessage("customer.find.findIdComplete", memberResult.getMemberId(), memberResult.getMemberSignupDt()));
			} else if(APConstant.EXIST_CH_JOIN_USER.equals(cicuemCuInfTotTcVo2.getRsltCd())) {
				
				ApFindMemberIdResult memberResult = apApi.findMemberIdByCI(cicuemCuInfTotTcVo2.getCiNo());
				result.put("id", memberResult.getMemberId());
				result.put("message", getMessage("customer.find.findIdComplete", memberResult.getMemberId(), memberResult.getMemberSignupDt()));
			} else {
				throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "nonRegist", "미가입");
			}
			
		} else {
			throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "INFOERR", "누락된 정보가 있습니다.");
		}

		return ResponseEntity.ok(result);
	}
	private String changePasswordM(HttpServletRequest request) {
		String userId = (String) WebUtils.getSessionAttribute(request, SessionKey.TEMP_PW_CNG);

		//FIXME 아모레 API로 패스워드 변경..

		return "redirect:/main";
	}

}