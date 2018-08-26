package kr.ap.amt.customer.controller;

import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.api.WebDBApiService;
import kr.ap.comm.api.vo.*;
import kr.ap.comm.member.vo.MemberForm;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.ApPasswordEncoder;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.support.validator.MemberFormValidator;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.EmbeddableName;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.*;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.util.WebUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import java.util.*;
import java.util.stream.Collectors;

@Controller
@RequestMapping("/customer")
public class SignupRestController extends AbstractController {

    @Autowired
    private CaptchaAPI captchaAPI;

    @Autowired
    private MemberFormValidator memberFormValidator;
    
    @Autowired
	private WebDBApiService webDBApiService;
    
    private ObjectMapper mapper = new ObjectMapper();

    /**
     * '휴대폰 번호'로 인증 받기
     *
     * @param memberForm
     * @return
     */
    @PostMapping(value = "/phoneCert")
    @ResponseBody
    public ResponseEntity<?> phoneCert(@Valid MemberForm memberForm, BindingResult bindingResult) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		memberForm.setValidFlag("phoneCert");
		validate(memberForm, bindingResult, memberFormValidator);

		if (bindingResult.hasErrors()) {
			bindErrorResult(bindingResult, result);
			throw error(result, HttpStatus.BAD_REQUEST, "ERROR", "필수값이 누락되었습니다.");
		} else {
			String custNm = memberForm.getCustNm();
			String frclCd = memberForm.getFrclCd();
			String sxclCd = memberForm.getSxclCd();
			String athtDtbr = memberForm.getAthtDtbr();
			String phoneCorp = memberForm.getPhoneCorp();
			String cellNum = memberForm.getCellNum();

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setCustNm(custNm);
			cicuemCuInfTotTcVo.setFrclCd(frclCd);
			cicuemCuInfTotTcVo.setSxclCd(sxclCd);
			cicuemCuInfTotTcVo.setAthtDtbr(athtDtbr.substring(2));

			cicuemCuInfTotTcVo.setPhoneCorp(phoneCorp);
			setCellNum(cellNum, cicuemCuInfTotTcVo);

			cicuemCuInfTotTcVo.setJoinChCd(APConstant.AP_CH_CD);
			cicuemCuInfTotTcVo.setJoinPrtnId(APConstant.AP_PRTN_ID);

			//TODO: ap api - 고객본인인증1(certifycustselfonline)
			//고객명	custNm
			//외국인구분코드	frclCd
			//성별구분코드	sxclCd
			//법정생년월일	athtDtbr
			//통신사		phoneCorp
			//휴대폰식별전화번호	cellTidn
			//휴대폰국전화번호	cellTexn
			//휴대폰끝전화번호	cellTlsn
			//가입채널코드	joinChCd
			//가입매장아이디	joinPrtnId
			////
			////return:
			//인증번호	r_certNum
			//인증결과	r_result
			//인증결과코드	r_rsltCd
			//kmc 체크1	r_check_1
			//kmc 체크2	r_check_2
			//kmc 체크3	r_check_3
			CicuemCuInfTotTcVo cicuemCuInfTotTcVoRslt = amoreAPIService.certifycustselfonline(cicuemCuInfTotTcVo);

			if (!ObjectUtils.isEmpty(cicuemCuInfTotTcVoRslt) && "Y".equals(cicuemCuInfTotTcVoRslt.getR_result())) {
				//성공
				result.put("status", "success");
				result.put("rsltCd", cicuemCuInfTotTcVoRslt.getRsltCd());
				result.put("r_result", cicuemCuInfTotTcVoRslt.getR_result());
				result.put("r_rsltCd", cicuemCuInfTotTcVoRslt.getR_rsltCd());

				MemberSession memberSession = getMemberSession();
				memberSession.setUser_certNum(cicuemCuInfTotTcVoRslt.getR_certNum());
				memberSession.setUser_check1(cicuemCuInfTotTcVoRslt.getR_check_1());
				memberSession.setUser_check2(cicuemCuInfTotTcVoRslt.getR_check_2());
				memberSession.setUser_check3(cicuemCuInfTotTcVoRslt.getR_check_3());
				setMemberSession(memberSession);

			} else {//FIXME 오류 케이스에 대한 처리가 필요.
				if(!ObjectUtils.isEmpty(cicuemCuInfTotTcVoRslt)) {
					if("KISQ9207".equals(cicuemCuInfTotTcVoRslt.getR_rsltCd())) {
						throw error(result, HttpStatus.UNAUTHORIZED, "KISQ9207", "SMS 인증번호 발송 실패하였습니다. : 일 5회 인증 실패.");
					}
					
					if("KISH0003".equals(cicuemCuInfTotTcVoRslt.getR_rsltCd())) {
						throw error(result, HttpStatus.UNAUTHORIZED, "KISH0003", "휴대폰 번호 또는 통신사 불일치입니다. 입력하신 정보를 확인해 주세요.");
					}
					throw error(result, HttpStatus.UNAUTHORIZED, "ICITSVBIZ127", "휴대폰 명의자와 입력하신 정보가 일치 하지 않습니다.\n"
							+ "타인 명의로 회원가입을 원하시면 '확인' 버튼을,"
							+ "다시 입력하시려면 '취소' 버튼을 선택해 주세요.");
				} else {
					//실패
					throw error(result, HttpStatus.UNAUTHORIZED, "EAPI001", "인증실패했습니다. 다시 인증하세요.");
				}
			}


		}

		return ResponseEntity.ok(result);
    }
    

    /**
     * 타인명의 '휴대폰 번호'로 인증 받기
     *
     * @param memberForm
     * @return
     */
    @PostMapping(value = "/guestCert")
    @ResponseBody
    public ResponseEntity<?> guestCert(@Valid MemberForm memberForm, BindingResult bindingResult) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		CicuemCuInfTotTcVo cicuemCuInfCoInVo = new CicuemCuInfTotTcVo();
		setCellNum(memberForm.getCellNum(), cicuemCuInfCoInVo);
		cicuemCuInfCoInVo.setAtclCd("20");
		
		CicuemCuInfCoOutVo resultObj = amoreAPIService.certifycheck90(cicuemCuInfCoInVo);
		
		if(!APConstant.NON_EXIST_INFO.equals(resultObj.getRsltCd())) {
			throw error(result, HttpStatus.UNAUTHORIZED, "CERT90", "인증번호 발송에 실패했습니다.<br>90일 이내 점유인증 이력이 있는 사용자는 가입할 수 없습니다.");
		}

		memberForm.setValidFlag("phoneCert");
		validate(memberForm, bindingResult, memberFormValidator);

		if (bindingResult.hasErrors()) {
			bindErrorResult(bindingResult, result);
			throw error(result, HttpStatus.BAD_REQUEST, "ERROR", "필수값이 누락되었습니다.");

		} else {
			String custNm = memberForm.getCustNm();
			String frclCd = memberForm.getFrclCd();
			String sxclCd = memberForm.getSxclCd();
			String athtDtbr = memberForm.getAthtDtbr();
			String phoneCorp = memberForm.getPhoneCorp();
			String cellNum = memberForm.getCellNum();

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setCustNm(custNm);
			cicuemCuInfTotTcVo.setFrclCd(frclCd);
			cicuemCuInfTotTcVo.setSxclCd(sxclCd);
			cicuemCuInfTotTcVo.setAthtDtbr(athtDtbr.substring(2));

			cicuemCuInfTotTcVo.setPhoneCorp(phoneCorp);
			setCellNum(cellNum, cicuemCuInfTotTcVo);

			cicuemCuInfTotTcVo.setJoinChCd(APConstant.AP_CH_CD);
			cicuemCuInfTotTcVo.setJoinPrtnId(APConstant.AP_PRTN_ID);

			CicuemCuInfTotTcVo cicuemCuInfTotTcVoRslt = amoreAPIService.certifycompanyonline(cicuemCuInfTotTcVo);

			if (!ObjectUtils.isEmpty(cicuemCuInfTotTcVoRslt) && "Y".equals(cicuemCuInfTotTcVoRslt.getR_result())) {
				
				//성공
				result.put("status", "success");
				result.put("rsltCd", cicuemCuInfTotTcVoRslt.getRsltCd());
				result.put("r_result", cicuemCuInfTotTcVoRslt.getR_result());
				result.put("r_rsltCd", cicuemCuInfTotTcVoRslt.getR_rsltCd());

				MemberSession memberSession = getMemberSession();
				memberSession.setUser_ciNo(cicuemCuInfTotTcVoRslt.getCiNo());

		    	WebUtils.setSessionAttribute(getRequest(), SessionKey.SMS_NUM, cicuemCuInfTotTcVoRslt.getR_authNo());
				
				setMemberSession(memberSession);
				return ResponseEntity.ok(result);
				

			} else { //FIXME 오류 케이스에 대한 처리가 필요.
				if(!ObjectUtils.isEmpty(cicuemCuInfTotTcVoRslt)) {
					if("KISQ9207".equals(cicuemCuInfTotTcVoRslt.getR_rsltCd())) {
						throw error(result, HttpStatus.UNAUTHORIZED, "KISQ9207", "SMS 인증번호 발송 실패하였습니다. : 일 5회 인증 실패.");
					} else {
						throw error(result, HttpStatus.UNAUTHORIZED, "EAPI001", "인증번호 발송에 실패했습니다.");
					}
					
				} else {
					//실패
					throw error(result, HttpStatus.UNAUTHORIZED, "EAPI001", "인증실패했습니다. 다시 인증하세요.");
				}
			}

		}

    }

    	
    
    /**
     * 외국인 '휴대폰 번호'로 인증 받기
     *
     * @param memberForm
     * @return
     */
    @PostMapping(value = "/phoneCertForeign")
    @ResponseBody
    public ResponseEntity<?> phoneCertForeign(@Valid MemberForm memberForm, BindingResult bindingResult) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		memberForm.setValidFlag("phoneCert");
		validate(memberForm, bindingResult, memberFormValidator);

		if (bindingResult.hasErrors()) {
			bindErrorResult(bindingResult, result);
			throw error(result, HttpStatus.BAD_REQUEST, "ERROR", "필수값이 누락되었습니다.");

		} else {
			String custNm = memberForm.getCustNm();
			String frclCd = memberForm.getFrclCd();
			String sxclCd = memberForm.getSxclCd();
			String athtDtbr = memberForm.getAthtDtbr();
			String phoneCorp = memberForm.getPhoneCorp();
			String cellNum = memberForm.getCellNum();

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setCustNm(custNm);
			cicuemCuInfTotTcVo.setFrclCd(frclCd);
			cicuemCuInfTotTcVo.setSxclCd(sxclCd);
			cicuemCuInfTotTcVo.setAthtDtbr(athtDtbr.substring(2));

			cicuemCuInfTotTcVo.setPhoneCorp(phoneCorp);
			setCellNum(cellNum, cicuemCuInfTotTcVo);

			cicuemCuInfTotTcVo.setJoinChCd(APConstant.AP_CH_CD);
			cicuemCuInfTotTcVo.setJoinPrtnId(APConstant.AP_PRTN_ID);

			//TODO: ap api - 고객본인인증1(certifycustselfonline)
			//고객명	custNm
			//외국인구분코드	frclCd
			//성별구분코드	sxclCd
			//법정생년월일	athtDtbr
			//통신사		phoneCorp
			//휴대폰식별전화번호	cellTidn
			//휴대폰국전화번호	cellTexn
			//휴대폰끝전화번호	cellTlsn
			//가입채널코드	joinChCd
			//가입매장아이디	joinPrtnId
			////
			////return:
			//인증번호	r_certNum
			//인증결과	r_result
			//인증결과코드	r_rsltCd
			//kmc 체크1	r_check_1
			//kmc 체크2	r_check_2
			//kmc 체크3	r_check_3
			CicuemCuInfTotTcVo cicuemCuInfTotTcVoRslt = amoreAPIService.certifycustforeignselfonline(cicuemCuInfTotTcVo);

			if (!ObjectUtils.isEmpty(cicuemCuInfTotTcVoRslt) && "Y".equals(cicuemCuInfTotTcVoRslt.getR_result())) {
				//성공
				result.put("status", "success");
				result.put("rsltCd", cicuemCuInfTotTcVoRslt.getRsltCd());
				result.put("r_result", cicuemCuInfTotTcVoRslt.getR_result());
				result.put("r_rsltCd", cicuemCuInfTotTcVoRslt.getR_rsltCd());

				MemberSession memberSession = getMemberSession();
				memberSession.setUser_certNum(cicuemCuInfTotTcVoRslt.getR_certNum());
				memberSession.setUser_check1(cicuemCuInfTotTcVoRslt.getR_check_1());
				memberSession.setUser_check2(cicuemCuInfTotTcVoRslt.getR_check_2());
				memberSession.setUser_check3(cicuemCuInfTotTcVoRslt.getR_check_3());
				setMemberSession(memberSession);

			} else {
				//실패
				throw error(result, HttpStatus.UNAUTHORIZED, "EAPI001", "인증실패했습니다. 다시 인증하세요.");
			}


		}

		return ResponseEntity.ok(result);
    }

    /**
     * 타인명의 '휴대폰 번호' 인증 확인
     *
     * @param request
     * @return
     */
    @PostMapping("/guestConfirm")
    @ResponseBody
    public ResponseEntity<?> guestConfirm(HttpServletRequest request) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		String smsNum = request.getParameter("smsNum") == null ? "" : request.getParameter("smsNum");

		String captcha = request.getParameter("captcha") == null ? "" : request.getParameter("captcha");
		String captchaKey = request.getParameter("captchaKey") == null ? "" : request.getParameter("captchaKey");
		//captcha체크
		if (!captchaAPI.checkKeyValueSimple(captchaKey, captcha)) {
			//실패
			throw error(result, HttpStatus.UNAUTHORIZED, "chptcha", "자동입력 방지문자를 정확히 입력하세요.");
		}
		

    	String authNum = (String) WebUtils.getSessionAttribute(getRequest(), SessionKey.SMS_NUM);
    	MemberSession memberSession = getMemberSession();
    	
    	if(smsNum.equals(authNum)) {
    		

			SignupStatusResult signupStatusResult = apApi.getSignupStatus(memberSession.getUser_ciNo());
			result.put("signupStatusResult", signupStatusResult);
			try {
				logger.info("CI : " + memberSession.getUser_ciNo());
				logger.info(mapper.writeValueAsString(signupStatusResult));
			} catch (Exception e) {
				e.printStackTrace();
			}

				String joinType = "";
				if(signupStatusResult.isMember()) {
					//1. 이미 ECP에 가입한 회원.
					////--->이미 가입된 회원, 로그인 화면
					result.put("status", "success");
					joinType = "01";
					result.put("joinType", joinType);
					result.put("chcsNo", signupStatusResult.getIncsMemberId());
					result.put("incsNo", signupStatusResult.getIncsNo());
					
					result.put("mbrJoinDt", DateFormatUtils.format(signupStatusResult.getMemberSignupDt(), "yyyyMMdd"));
					
				} else if(signupStatusResult.isIncsMember()) {

					//2. 통합 가입회원의 전환가입.

					//TODO: ap api - 고객상세조회(getcicuemcuinfrbyincsno)
					////통합고객번호	incsNo
					////
					////return:
					////[고객상세정보]

					result.put("incsMemberSignupDt", signupStatusResult.getIncsMemberSignupDt());

					if(signupStatusResult.isOldMember()) {
						result.put("oldMemberId", signupStatusResult.getOldMemberId());
					}
					result.put("mbrJoinDt", signupStatusResult.getIncsMemberSignupDt());
					

					String chcsNo = null;
					if (signupStatusResult.getIncsMemberId() != null) {
						chcsNo = signupStatusResult.getIncsMemberId();
						result.put("chcsNo", signupStatusResult.getIncsMemberId());

						//1.2.2.1 통합ID회원
						////--->기준ID로, etude가입(etude약관/안내) 및 통합정보수정

						result.put("status", "success");
						joinType = "04";
						result.put("joinType", joinType);

						result.put("chcsNo", chcsNo);

					} else {
						//1.2.2.2 통합비ID회원
						////--->기준ID없어, etude가입(etude약관/안내) 및 통합정보수정

						result.put("status", "success");
						joinType = "05";
						result.put("joinType", joinType);

					}

				} else if(signupStatusResult.isOldMember()) {
					//3. 구회원 존재.
					////--->경로전용 구회원, 전환가입 화면
					//TODO 구회원 ID로 구회원 정보 조회?
					result.put("status", "success");
					joinType = "02";
					result.put("joinType", joinType);
					result.put("oldMemberId", signupStatusResult.getOldMemberId());
					result.put("signupDate", "");
					
				} else {

					//4. 미가입 회원.
					////--->신규가입

					result.put("status", "success");
					joinType = "00";
					result.put("joinType", joinType);
				}

				memberSession.setUser_joinType(joinType);
				setMemberSession(memberSession);
			
    		return ResponseEntity.ok(result);
    	}
    	
    	throw error(result, HttpStatus.BAD_REQUEST, "ERROR", "인증에 실패했습니다.");
    }
    /**
     * 본인인증
     *
     * @param request
     * @return
     */
    @PostMapping("/stepOne")
    @ResponseBody
    public ResponseEntity<?> stepOne(HttpServletRequest request) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		MemberSession memberSession = getMemberSession();
		String r_certNum = memberSession.getUser_certNum();
		String r_check_1 = memberSession.getUser_check1();
		String r_check_2 = memberSession.getUser_check2();
		String r_check_3 = memberSession.getUser_check3();

		String smsNum = request.getParameter("smsNum") == null ? "" : request.getParameter("smsNum");

		String captcha = request.getParameter("captcha") == null ? "" : request.getParameter("captcha");
		String captchaKey = request.getParameter("captchaKey") == null ? "" : request.getParameter("captchaKey");
		//captcha체크
		if (!captchaAPI.checkKeyValueSimple(captchaKey, captcha)) {
			//실패
			throw error(result, HttpStatus.UNAUTHORIZED, "chptcha", "자동입력 방지문자를 정확히 입력하세요.");
		}
		
		if (!StringUtils.isEmpty(r_certNum)
			&& !StringUtils.isEmpty(r_check_1)
			&& !StringUtils.isEmpty(r_check_2)
			&& !StringUtils.isEmpty(r_check_3)
			&& !StringUtils.isEmpty(smsNum)) {

			try {

				//TODO: ap api - 고객본인인증2(가입인증)(certifyconfirm)
				////인증번호	r_certNum
				////입력한 sms인증번호	smsNum
				////kmc 체크1	r_check_1
				////kmc 체크2	r_check_2
				////kmc 체크3	r_check_3
				////
				////return:
				////고객명	custNm
				////통합고객번호	incsNo
				////외국인구분코드	frclCd
				////성별구분코드	sxclCd
				////법정생년월일	athtDtbr
				////휴대폰식별전화번호	cellTidn
				////휴대폰국전화번호	cellTexn
				////휴대폰끝전화번호	cellTlsn
				////가입채널코드	joinChCd
				////가입매장아이디	joinPrtnId
				////CI번호	ciNo
				////인증결과	r_result
				////인증결과코드	r_rsltCd
				////ReturnURL	returnUrl
				////결과코드	rsltCd
				////결과메시지	rsltMsg

				CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
				cicuemCuInfTotTcVo.setR_certNum(r_certNum);
				cicuemCuInfTotTcVo.setSmsNum(smsNum);
				cicuemCuInfTotTcVo.setR_check_1(r_check_1);
				cicuemCuInfTotTcVo.setR_check_2(r_check_2);
				cicuemCuInfTotTcVo.setR_check_3(r_check_3);

				CicuemCuInfTotTcVo certifyconfirmRslt = amoreAPIService.certifyconfirm(cicuemCuInfTotTcVo);

				if (!ObjectUtils.isEmpty(certifyconfirmRslt)) {

					if(APConstant.KIST9201.equals(certifyconfirmRslt.getR_rsltCd())) {
						throw error(result, HttpStatus.UNAUTHORIZED, "expire", "만료된 인증번호입니다. 재인증 버튼을 눌러주세요.");
					}
					if(!APConstant.KIST0000.equals(certifyconfirmRslt.getR_rsltCd())) {
						throw error(result, HttpStatus.UNAUTHORIZED, "certNum", "인증번호를 잘못 입력하셨습니다.");
					}

					//성공
					String ciNo = certifyconfirmRslt.getCiNo();
					String joinType = "";
					/**
					 * joinType
					 * 		00: 통합 O / 회원 O 				---> 로그인
					 * 		01:	통합 X / 회원 X / 구회원 X 	---> 신규가입
					 * 		02: 통합 X / 회원 X / 구회원 O 	---> 경로전용 구회원, 전환가입 화면
					 * 		03: 통합 O / 회원 X / 구화원 O	---> 통합가입 구회원, 전환가입 화면
					 * 		04: 통합 O / 회원 X / 구화원 X / 통합ID O ---> 기준ID로, etude가입(etude약관/안내) 및 통합정보수정
					 * 		05: 통합 O / 회원 X / 구화원 X / 통합ID X ---> etude가입(etude약관/안내) 및 통합정보수정
					 */
					memberSession.setUser_ciNo(ciNo);

					SignupStatusResult signupStatusResult = apApi.getSignupStatus(ciNo);
					memberSession.setUser_incsNo(signupStatusResult.getIncsNo());
					result.put("signupStatusResult", signupStatusResult);

					try {
						logger.info("CI : " + signupStatusResult.getIncsNo());
						logger.info(mapper.writeValueAsString(signupStatusResult));
					} catch (Exception e) {
						e.printStackTrace();
					}
					
					if(signupStatusResult.isMember()) {
						//1. 이미 ECP에 가입한 회원.
						////--->이미 가입된 회원, 로그인 화면
						result.put("status", "success");
						joinType = "01";
						result.put("joinType", joinType);
						result.put("chcsNo", signupStatusResult.getIncsMemberId());
						result.put("incsNo", signupStatusResult.getIncsNo());
						
						result.put("mbrJoinDt", DateFormatUtils.format(signupStatusResult.getMemberSignupDt(), "yyyyMMdd"));
						
					} else if(signupStatusResult.isIncsMember()) {

						//2. 통합 가입회원의 전환가입.

						//TODO: ap api - 고객상세조회(getcicuemcuinfrbyincsno)
						////통합고객번호	incsNo
						////
						////return:
						////[고객상세정보]

						result.put("incsMemberSignupDt", signupStatusResult.getIncsMemberSignupDt());

						if(signupStatusResult.isOldMember()) {
							result.put("oldMemberId", signupStatusResult.getOldMemberId());
						}
						result.put("mbrJoinDt", signupStatusResult.getIncsMemberSignupDt());
						

						String chcsNo = null;
						if (signupStatusResult.getIncsMemberId() != null) {
							chcsNo = signupStatusResult.getIncsMemberId();
							result.put("chcsNo", signupStatusResult.getIncsMemberId());

							//1.2.2.1 통합ID회원
							////--->기준ID로, etude가입(etude약관/안내) 및 통합정보수정

							result.put("status", "success");
							joinType = "04";
							result.put("joinType", joinType);

							result.put("chcsNo", chcsNo);

						} else {
							//1.2.2.2 통합비ID회원
							////--->기준ID없어, etude가입(etude약관/안내) 및 통합정보수정

							result.put("status", "success");
							joinType = "05";
							result.put("joinType", joinType);

						}

					} else if(signupStatusResult.isOldMember()) {
						//3. 구회원 존재.
						////--->경로전용 구회원, 전환가입 화면
						//TODO 구회원 ID로 구회원 정보 조회?
						result.put("status", "success");
						joinType = "02";
						result.put("joinType", joinType);
						result.put("oldMemberId", signupStatusResult.getOldMemberId());
						result.put("signupDate", "");
						
					} else {

						//4. 미가입 회원.
						////--->신규가입

						result.put("status", "success");
						joinType = "00";
						result.put("joinType", joinType);
					}

					memberSession.setUser_joinType(joinType);
					setMemberSession(memberSession);

				} else {
					//실패
					throw error(result, HttpStatus.UNAUTHORIZED, "STEP1ERR", "인증실패했습니다. 다시 인증하세요.");
				}

			} catch (ApiException e) {
				logger.error(e.getMessage(), e);
				throw e;
			} catch (Exception e) {
				logger.error(e.getMessage(), e);
				throw error(result, HttpStatus.INTERNAL_SERVER_ERROR, "APIERR", "예상치 못한 오류가 발생하여 인증에 실패했습니다.");
			}

		} else {
			//실패
			throw error(result, HttpStatus.UNAUTHORIZED, "STEP1ERR", "인증실패했습니다. 다시 인증하세요.");
		}

		return ResponseEntity.ok(result);
    }

    /**
     * 본인인증(외국인)
     *
     * @param request
     * @return
     */
    @PostMapping("/stepOneF")
    @ResponseBody
    public ResponseEntity<?> stepOneF(HttpServletRequest request) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		//성공
		result.put("status", "success");
		String joinType = "01";
		result.put("joinType", joinType);

		return ResponseEntity.ok(result);
    }

    /**
     * 약관동의
     *
     * @param request
     * @return
     */
    @PostMapping("/stepTwo")
    @ResponseBody
    public ResponseEntity<?> stepTwo(HttpServletRequest request) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		if (true) {
			//성공
			return ResponseEntity.ok(result);
		} else {
			//실패
			throw error(result, HttpStatus.UNAUTHORIZED, "ERROR", "오류입니다.");
		}

    }

    /**
     * 정보입력
     *
     * @param memberForm
     * @param bindingResult
     * @return
     */
    @PostMapping("/stepThree")
    @ResponseBody
    public ResponseEntity<?> stepThree(@Valid MemberForm memberForm, BindingResult bindingResult) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		memberForm.setValidFlag("inputInfo");
		validate(memberForm, bindingResult, memberFormValidator);

		if (bindingResult.hasErrors()) {
			bindErrorResult(bindingResult, result);
			throw error(result, HttpStatus.UNAUTHORIZED, "ERROR", "가입실패, 다시 시도 하세요.");

		} else {

			CicuemCuInfTotTcVo cicuemCuInfTotTcVoRslt = new CicuemCuInfTotTcVo();

			String custNm = memberForm.getCustNm();
			String[] termsChk = memberForm.getTermsChk();
			String[] optionYn = memberForm.getOptionYn();

			String chcsNo = memberForm.getChcsNo();
			String userPwdEc = memberForm.getUserPwdEc();
			String athtDtbr = memberForm.getAthtDtbr();
			String frclCd = memberForm.getFrclCd();
			String sxclCd = memberForm.getSxclCd();
			String cellNum = memberForm.getCellNum();
			String custEmid = memberForm.getCustEmid();

			try {

				String today = DateFormatUtils.format(new Date(), "yyyyMMdd");

				//TODO: ap api - 고객가입(createcicuemcuinfrjoin)
				CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
				cicuemCuInfTotTcVo.setFscrId("AC919532");
				cicuemCuInfTotTcVo.setLschId("AC919532");
				cicuemCuInfTotTcVo.setCustNm(custNm);
				cicuemCuInfTotTcVo.setAthtDtbr(athtDtbr);
				cicuemCuInfTotTcVo.setFrclCd(frclCd);
				cicuemCuInfTotTcVo.setSxclCd(sxclCd);
				setCellNum(cellNum, cicuemCuInfTotTcVo);
				cicuemCuInfTotTcVo.setCiNo(getMemberSession().getUser_ciNo());
				cicuemCuInfTotTcVo.setJoinChCd(APConstant.AP_CH_CD);
				cicuemCuInfTotTcVo.setJoinPrtnId(APConstant.EH_PRTN_ID);
				if(isMobileDevice())
					cicuemCuInfTotTcVo.setJndvCd("M");
				if(isPcDevice())
					cicuemCuInfTotTcVo.setJndvCd("W");
				if(isAndroid() || isiOS()) {
					cicuemCuInfTotTcVo.setJndvCd("A");
				}
				if(cicuemCuInfTotTcVo.getCiNo().endsWith("=="))
					cicuemCuInfTotTcVo.setAtclCd("10");
				else
					cicuemCuInfTotTcVo.setAtclCd("20");
				cicuemCuInfTotTcVo.setChCd(APConstant.AP_CH_CD);
				cicuemCuInfTotTcVo.setSmsNum(cicuemCuInfTotTcVoRslt.getR_certNum());
				cicuemCuInfTotTcVo.setRnarCd("1");
				cicuemCuInfTotTcVo.setRnmAthtDt(today);
				
				
				if (!StringUtils.isEmpty(custEmid)){
					cicuemCuInfTotTcVo.setCustEmid(custEmid.split("@")[0]);
					cicuemCuInfTotTcVo.setCustEmdn(custEmid.split("@")[1]);
				}

				CicuemCuAdtInfTcVo cicuemCuAdtInfTcVo = new CicuemCuAdtInfTcVo();
				cicuemCuAdtInfTcVo.setSlccCd("S");//OR S
				cicuemCuAdtInfTcVo.setPsnDtbr(athtDtbr);
//				cicuemCuAdtInfTcVo.setJobCd("000006");
//				cicuemCuAdtInfTcVo.setWdanDt("19991231");
				cicuemCuAdtInfTcVo.setFscrId("AC919532");
				cicuemCuAdtInfTcVo.setLschId("AC919532");
				cicuemCuInfTotTcVo.setCicuemCuAdtInfTcVo(cicuemCuAdtInfTcVo);
				cicuemCuInfTotTcVo.setJoinPrtnId(APConstant.AP_PRTN_ID);

				List<CicuedCuChCsTcVo> list = new ArrayList<CicuedCuChCsTcVo>();

				CicuedCuChCsTcVo cicuedCuChCsTcVo = new CicuedCuChCsTcVo();
				
				cicuedCuChCsTcVo = new CicuedCuChCsTcVo();
				cicuedCuChCsTcVo.setChcsNo(chcsNo);
				cicuedCuChCsTcVo.setChCd(APConstant.OS_CH_CD);
				cicuedCuChCsTcVo.setUserPwdEc(ApPasswordEncoder.encryptPassword(userPwdEc));
				cicuedCuChCsTcVo.setPrtnNm(getPrntNm(cicuedCuChCsTcVo.getChCd()));
				cicuedCuChCsTcVo.setFscrId("AC919532");
				cicuedCuChCsTcVo.setLschId("AC919532");
				list.add(cicuedCuChCsTcVo);
				
				cicuedCuChCsTcVo = new CicuedCuChCsTcVo();
				cicuedCuChCsTcVo.setChcsNo(chcsNo);
				cicuedCuChCsTcVo.setChCd(APConstant.OSULLOC_CH_CD);
				cicuedCuChCsTcVo.setPrtnNm(getPrntNm(cicuedCuChCsTcVo.getChCd()));
				cicuedCuChCsTcVo.setFscrId("AC919532");
				cicuedCuChCsTcVo.setLschId("AC919532");
				list.add(cicuedCuChCsTcVo);
				
				cicuedCuChCsTcVo = new CicuedCuChCsTcVo();
				cicuedCuChCsTcVo.setChcsNo(chcsNo);
				cicuedCuChCsTcVo.setChCd(APConstant.LLCOS_CH_CD);
				cicuedCuChCsTcVo.setPrtnNm(getPrntNm(cicuedCuChCsTcVo.getChCd()));
				cicuedCuChCsTcVo.setFscrId("AC919532");
				cicuedCuChCsTcVo.setLschId("AC919532");
				list.add(cicuedCuChCsTcVo);
				
				cicuedCuChCsTcVo = new CicuedCuChCsTcVo();
				cicuedCuChCsTcVo.setChcsNo(chcsNo);
				cicuedCuChCsTcVo.setChCd(APConstant.AP_CH_CD);
				cicuedCuChCsTcVo.setPrtnNm(getPrntNm(cicuedCuChCsTcVo.getChCd()));
				cicuedCuChCsTcVo.setFscrId("AC919532");
				cicuedCuChCsTcVo.setLschId("AC919532");
				list.add(cicuedCuChCsTcVo);

				cicuemCuInfTotTcVo.setCicuedCuChCsTcVo(list);
				String is030Check = "";
				String is040Check = "";
				String is050Check = "";
				String is060Check = "";
				//회원가입 통합약관동의여부
				List<CicuedCuTncaTcVo> cicuedCuTncaTcVos = new ArrayList<CicuedCuTncaTcVo>();
				Map<String, String> termsMap = arrayToMap(termsChk);
				for (Map.Entry<String, String> entry : termsMap.entrySet()) {
					CicuedCuTncaTcVo cicuedCuTncaTcVo = new CicuedCuTncaTcVo();
					if(entry.getKey().equals("030")) {
						is030Check = entry.getValue();
					}
					if(entry.getKey().equals("040")) {
						is040Check = entry.getValue();
					}
					if(entry.getKey().equals("050")) {
						is050Check = entry.getValue();
					}
					if(entry.getKey().equals("060")) {
						is060Check = entry.getValue();
					}
					cicuedCuTncaTcVo.setTcatCd(entry.getKey());
					cicuedCuTncaTcVo.setTncvNo("1");
					cicuedCuTncaTcVo.setTncAgrYn(entry.getValue());
					cicuedCuTncaTcVo.setFscrId("AC919532");
					cicuedCuTncaTcVo.setLschId("AC919532");
					cicuedCuTncaTcVos.add(cicuedCuTncaTcVo);
				}
				cicuemCuInfTotTcVo.setCicuedCuTncaTcVo(cicuedCuTncaTcVos);

				List<CicuemCuOptiCsTcVo> list2 = new ArrayList<CicuemCuOptiCsTcVo>();
				Map<String, String> olOptiYnMap = arrayToMap(optionYn);

				//유형별 수신동의여부
				String is000Email = "";
				String is000SMS = "";
				CicuemCuOptiCsTcVo cicuemCuOptiTcVo = new CicuemCuOptiCsTcVo();
				for (Map.Entry<String, String> entry : olOptiYnMap.entrySet()) {
					if(entry.getKey().contains("OptionB_")) continue;
					cicuemCuOptiTcVo.setChCd(APConstant.BT_CH_CD);
					if ("OptionA_Email".equals(entry.getKey())) {
						cicuemCuOptiTcVo.setEmlOptiYn(entry.getValue());
						cicuemCuOptiTcVo.setEmlOptiDt(today);
						is000Email = entry.getValue();
					} else if ("OptionA_SMS".equals(entry.getKey())) {
						cicuemCuOptiTcVo.setSmsOptiYn(entry.getValue());
						cicuemCuOptiTcVo.setSmsOptiDt(today);
						is000SMS = entry.getValue();
					} else if ("OptionA_DM".equals(entry.getKey())) {
						cicuemCuOptiTcVo.setDmOptiYn(entry.getValue());
						cicuemCuOptiTcVo.setDmOptiDt(today);
					} else if ("OptionA_TM".equals(entry.getKey())) {
						cicuemCuOptiTcVo.setTmOptiYn(entry.getValue());
						cicuemCuOptiTcVo.setTmOptiDt(today);
					}
				}
				cicuemCuOptiTcVo.setDmOptiDt("N");
				cicuemCuOptiTcVo.setTmOptiDt("N");
				cicuemCuOptiTcVo.setFscrId("AC919532");
				cicuemCuOptiTcVo.setLschId("AC919532");
				
				String is030Email = "";
				String is030SMS = "";
				CicuemCuOptiCsTcVo CicuemCuOptiCsTcVo2 = new CicuemCuOptiCsTcVo();
				for (Map.Entry<String, String> entry : olOptiYnMap.entrySet()) {
					if(entry.getKey().contains("OptionA_")) continue;
					CicuemCuOptiCsTcVo2.setChCd(APConstant.OS_CH_CD);
					CicuemCuOptiCsTcVo2.setChNm(getPrntNm(CicuemCuOptiCsTcVo2.getChCd()));
					if ("OptionB_Email".equals(entry.getKey())) {
						CicuemCuOptiCsTcVo2.setEmlOptiYn(entry.getValue());
						CicuemCuOptiCsTcVo2.setEmlOptiDt(today);
						is030Email = entry.getValue();
					} else if ("OptionB_SMS".equals(entry.getKey())) {
						CicuemCuOptiCsTcVo2.setSmsOptiYn(entry.getValue());
						CicuemCuOptiCsTcVo2.setSmsOptiDt(today);
						is030SMS = entry.getValue();
					} else if ("OptionB_DM".equals(entry.getKey())) {
						CicuemCuOptiCsTcVo2.setDmOptiYn(entry.getValue());
						CicuemCuOptiCsTcVo2.setDmOptiDt(today);
					} else if ("OptionB_TM".equals(entry.getKey())) {
						CicuemCuOptiCsTcVo2.setTmOptiYn(entry.getValue());
						CicuemCuOptiCsTcVo2.setTmOptiDt(today);
					}
				}
				CicuemCuOptiCsTcVo2.setDmOptiDt("N");
				CicuemCuOptiCsTcVo2.setTmOptiDt("N");
				CicuemCuOptiCsTcVo2.setFscrId("AC919532");
				CicuemCuOptiCsTcVo2.setLschId("AC919532");
				list2.add(CicuemCuOptiCsTcVo2);

				CicuemCuOptiCsTcVo2 = CicuemCuOptiCsTcVo2.clone();
				CicuemCuOptiCsTcVo2.setChCd(APConstant.OSULLOC_CH_CD);
				CicuemCuOptiCsTcVo2.setChNm(getPrntNm(CicuemCuOptiCsTcVo2.getChCd()));
				list2.add(CicuemCuOptiCsTcVo2);
				CicuemCuOptiCsTcVo2 = CicuemCuOptiCsTcVo2.clone();
				CicuemCuOptiCsTcVo2.setChCd(APConstant.LLCOS_CH_CD);
				CicuemCuOptiCsTcVo2.setChNm(getPrntNm(CicuemCuOptiCsTcVo2.getChCd()));
				list2.add(CicuemCuOptiCsTcVo2);
				CicuemCuOptiCsTcVo2 = CicuemCuOptiCsTcVo2.clone();
				CicuemCuOptiCsTcVo2.setChCd(APConstant.AP_CH_CD);
				CicuemCuOptiCsTcVo2.setChNm(getPrntNm(CicuemCuOptiCsTcVo2.getChCd()));
				list2.add(CicuemCuOptiCsTcVo2);
				

				cicuemCuInfTotTcVo.setCicuemCuOptiCsTcVo(list2);
				
				//TODO: ap api - ID 및 CI 중복여부 다시 확인
				SignupStatusResult status = apApi.getSignupStatus(cicuemCuInfTotTcVo.getCiNo());
				
				CicuemCuInfCoOutVo cicuemCuInfCoOutVo = null;
				boolean joinChCd = false;
				if (!ObjectUtils.isEmpty(status)) {
					if(status.isMember()) {
						//실패
						throw error(result, HttpStatus.UNAUTHORIZED, "ALREADY", "가입실패, 이미 가입되어있는 회원입니다.");
					} else if(status.isIncsMember()) {
						if(status.getIncsMemberId() != null)
							throw error(result, HttpStatus.UNAUTHORIZED, "ALREADY", "가입실패, 이미 가입되어있는 회원입니다.");

						CicuemCuInfTotTcVo vo = new CicuemCuInfTotTcVo();
						vo.setIncsNo(status.getIncsNo());
						CicuemCuInfTotTcVo detail = amoreAPIService.getcicuemcuinfrbyincsno(vo);
						
						CicuedCuChListTcVo cicuedCuChListTcVo = new CicuedCuChListTcVo();
						List<CicuedCuChTcVo> cicuedCuChTcVo = new ArrayList<CicuedCuChTcVo>();
						cicuedCuChListTcVo.setCicuedCuChTcVo(cicuedCuChTcVo);
						CicuedCuChTcVo chTcVo = null;
						for(CicuemCuOptiCsTcVo optiTcVo : list2) {
							if(getMultiinfoByChCd(detail.getCicuedCuChArrayTcVo(), optiTcVo.getChCd()) != null) {
								continue;
							}
							if(APConstant.BT_CH_CD.equals(optiTcVo.getChCd()) || APConstant.CP_CH_CD.equals(optiTcVo.getChCd())) continue;
							chTcVo = new CicuedCuChTcVo();
							if(APConstant.OS_CH_CD.equals(optiTcVo.getChCd())) {
								chTcVo.setUserPwdEc(ApPasswordEncoder.encryptPassword(userPwdEc));
							}
							chTcVo.setFstCnttPrtnId(detail.getFstCnttPrtnId());
							chTcVo.setCicuemCuOptiTcVo(optiTcVo);
							chTcVo.setChcsNo(chcsNo);
							chTcVo.setChCd(optiTcVo.getChCd());
							chTcVo.setIncsNo(status.getIncsNo());
							if(APConstant.AP_CH_CD.equals(optiTcVo.getChCd()))
								chTcVo.setFstCnttPrtnId(APConstant.AP_PRTN_ID);
							chTcVo.setFscrId(APConstant.EH_PRTN_ID);
							chTcVo.setLschId(APConstant.EH_PRTN_ID);
							chTcVo.setPrtnNm(getPrntNm(chTcVo.getChCd()));
							optiTcVo.setIncsNo(status.getIncsNo());
							cicuedCuChTcVo.add(chTcVo);
						}
						
						//경로가입.
						cicuemCuInfCoOutVo = amoreAPIService.createcustchnjoin(cicuedCuChListTcVo);

						detail = amoreAPIService.getcicuemcuinfrbyincsno(vo);
						

						
						CicuedCuChArrayTcVo info = (CicuedCuChArrayTcVo) getMultiinfoByChCd(detail.getCicuedCuChArrayTcVo(), APConstant.OS_CH_CD);
						joinChCd = info != null;
						try {
							logger.info("경로가입 결과 " + joinChCd + " : " + mapper.writeValueAsString(detail));
						} catch (Exception e) {
							e.printStackTrace();
						}
					} else {
						//회원가입
						cicuemCuInfTotTcVo.setCicuemCuOptiTcVo(null);
						cicuemCuInfCoOutVo = amoreAPIService.createcicuemcuinfrjoin(cicuemCuInfTotTcVo);

						try {
							logger.info("회원가입 결과 : " + mapper.writeValueAsString(cicuemCuInfCoOutVo));
						} catch (Exception e) {
							e.printStackTrace();
						}
						if("ICITSVCOM004".equals(cicuemCuInfCoOutVo.getRsltCd())) {
							throw error(result, HttpStatus.UNAUTHORIZED, "ERROR", "통합회원 동기화가 안되어 있습니다. 고객센터로 문의바랍니다.");
						}
						if("ICITSVBIZ152".equals(cicuemCuInfCoOutVo.getRsltCd())) {
							throw error(result, HttpStatus.UNAUTHORIZED, "ERROR", "고객님은 아모레 퍼시픽 탈퇴고객입니다.<br>탈퇴고객은, 탈퇴 후 30일 내 재 가입이 불가능합니다.");
						}

					}
				} else {
					throw error(result, HttpStatus.UNAUTHORIZED, "ERROR", "일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
				}
				//TODO: ecp api - 회원가입
				if (!ObjectUtils.isEmpty(cicuemCuInfCoOutVo)
					&& APConstant.RESULT_OK.equals(cicuemCuInfCoOutVo.getRsltCd())) {
					CicueaCuPtAccmTcVo cicueaCuPtAccmTcVo = new CicueaCuPtAccmTcVo();
					cicueaCuPtAccmTcVo.setIncsNo(cicuemCuInfCoOutVo.getIncsNo());
					CicueaCuPtAccmTcVo ptVo = amoreAPIService.getptinq(cicueaCuPtAccmTcVo);
					
					ApMemberForPost memberForPost = new ApMemberForPost();

					memberForPost.setMemberId(chcsNo);
					memberForPost.setMembershipCardNo(cicuemCuInfCoOutVo.getIncsCardNoEc());
					memberForPost.setMemberPassword(userPwdEc);
					memberForPost.setIncsNo(cicuemCuInfCoOutVo.getIncsNo());
					memberForPost.setCi(cicuemCuInfTotTcVo.getCiNo());

					EmbeddableName embeddableName = new EmbeddableName();
					embeddableName.setName1(custNm);
					memberForPost.setName(embeddableName);

					EmbeddableTel embeddableTel = new EmbeddableTel();
					embeddableTel.setPhoneNo(cellNum);
					memberForPost.setPhoneNo1(embeddableTel);

					memberForPost.setGenderCode("F".equals(sxclCd)?"Female":"Male");
					memberForPost.setDobYear(athtDtbr.substring(0, 4));
					memberForPost.setDobMonth(athtDtbr.substring(4, 6));
					memberForPost.setDobDay(athtDtbr.substring(6, 8));

					//회원가입 et 및 통합약관동의여부
					List<SignupTermsAgree> signupTermsAgrees = new ArrayList<SignupTermsAgree>();
					Map<String, String> termsChkMap = arrayToMap(termsChk);
					for (Map.Entry<String, String> entry : termsChkMap.entrySet()) {
						SignupTermsAgree s = new SignupTermsAgree();
						s.setTermsDisplayCode(entry.getKey());
						s.setAgreeYn(entry.getValue());
						signupTermsAgrees.add(s);
					}
					memberForPost.setSignupTermsAgree(signupTermsAgrees);

					//유형별 수신동의여부
					List<SignupReceiveAgree> signupReceiveAgrees = new ArrayList<SignupReceiveAgree>();
					for (Map.Entry<String, String> entry : olOptiYnMap.entrySet()) {
						if(entry.getKey().contains("OptionA_")) {
							SignupReceiveAgree s = new SignupReceiveAgree();
							s.setReceiveTypeCode(entry.getKey().replace("OptionA_", ""));
							s.setReceiveAgreeCode("Y".equals(entry.getValue())?"Agree":"NotAgree");
							signupReceiveAgrees.add(s);
						}
					}
					memberForPost.setSignupReceiveAgree(signupReceiveAgrees);
					
					try {
						apApi.signupMember(memberForPost);
					} catch(Exception e) {e.printStackTrace();
						logger.error("Member Signup Fail : " + memberForPost.getCi());
					}

					//성공
					result.put("remainPoint", ptVo.getRmnPt());
					result.put("status", "success");

				} else {
					//실패
					throw error(result, HttpStatus.UNAUTHORIZED, "ERROR", "가입실패, 다시 시도 하세요.");
				}

			} catch (ApiException e) {
				e.printStackTrace();
				//실패
				throw e;
			} catch (Exception e) {
				e.printStackTrace();
				//실패
				throw error(result, HttpStatus.UNAUTHORIZED, "ERROR", "가입실패, 다시 시도 하세요.");
			}
		}

		return ResponseEntity.ok(result);
    }
    private static String getPrntNm(String chCd) {
    	if(APConstant.BT_CH_CD.equals(chCd)) {
			return "뷰티포인트";
    	} else if(APConstant.CP_CH_CD.equals(chCd)) {
			return "적립쿠폰";
    	} else if(APConstant.EH_POS_CH_CD.equals(chCd)) {
			return "에뛰드 POS";
    	} else if(APConstant.OS_CH_CD.equals(chCd)) {
			return "고객통합";
    	} else if(APConstant.EH_CH_CD.equals(chCd)) {
			return "에뛰드 쇼핑몰";
    	} else if(APConstant.OSULLOC_CH_CD.equals(chCd)) {
			return "오설록온라인";
    	} else if(APConstant.LLCOS_CH_CD.equals(chCd)) {
			return "리리코스마린플러스";
    	}
		return null;
	}

    /**
     * [{id:value}]
     *
     * @param optiYn
     * @return
     */
    private Map<String, String> arrayToMap(String[] optiYn) {
        return Arrays.asList(optiYn)
                .stream()
                .map(elem -> elem.split(":"))
                .filter(elem -> elem.length == 2)
                .collect(Collectors.toMap(e -> e[0], e -> e[1]));
    }

    private void setCellNum(String cellNum, CicuemCuInfTotTcVo cicuemCuInfTotTcVo) {
        if (10 == cellNum.length()) {
            cicuemCuInfTotTcVo.setCellTidn(cellNum.substring(0, 3));
            cicuemCuInfTotTcVo.setCellTexn(cellNum.substring(3, 6));
            cicuemCuInfTotTcVo.setCellTlsn(cellNum.substring(6, 10));
        } else if (11 == cellNum.length()) {
            cicuemCuInfTotTcVo.setCellTidn(cellNum.substring(0, 3));
            cicuemCuInfTotTcVo.setCellTexn(cellNum.substring(3, 7));
            cicuemCuInfTotTcVo.setCellTlsn(cellNum.substring(7, 11));
        }
    }
}