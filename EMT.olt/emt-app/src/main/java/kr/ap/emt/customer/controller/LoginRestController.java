package kr.ap.emt.customer.controller;

import kr.ap.comm.api.vo.CicuemCuInfTotTcVo;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.CookieUtils;
import kr.ap.emt.customer.vo.AppCumuData;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.EmbeddableName;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.*;
import net.g1project.ecp.api.model.order.order.OrdEx;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.WebUtils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginRestController extends AbstractController {

    
    private ObjectMapper mapper = new ObjectMapper();
	/**
	 * 로그인.
	 */
	@PostMapping("/doLogin")
	public ResponseEntity<?> doLogin(HttpServletRequest req, HttpServletResponse resp) {
		String memberId = req.getParameter("chcsNo");
		String password = req.getParameter("userPwdEc");
		String autoLogin = req.getParameter("autoLogin");
		Map<String, Object> respMap = new HashMap<String, Object>();
		try {
			ApLoginInfo loginInfo = new ApLoginInfo();
			loginInfo.setMemberId(memberId);
			loginInfo.setMemberPassword(password);
			loginInfo.setUseAutoLogin("on".equals(autoLogin));
			
			ApMemberLoginReturnWithAutoLoginInfo resultInfo = apApi.memberLogin(loginInfo);
			if(resultInfo == null) {
				return error(respMap, HttpStatus.SERVICE_UNAVAILABLE, "EAPI001", "아이디 또는 비밀번호가 일치하지 않습니다. 다시 입력해주세요.");
			}

			try {
				logger.info("로그인 결과 : " + mapper.writeValueAsString(resultInfo));
			} catch (Exception e) {
				e.printStackTrace();
			}
			
			if(!resultInfo.isMember()) {
				if(resultInfo.isIncsMember() && resultInfo.getIncsMemberId() != null && !resultInfo.getIncsMemberId().isEmpty()) {
					if(resultInfo.isIntegrationPasswordMatch()) {

						if(resultInfo.isOldMember()) {
							respMap.put("cs", 0);
							
						} else {
							respMap.put("cs", 1);
							MemberSession memberSession = getMemberSession();
							memberSession.setUser_incsNo(resultInfo.getIncsNo());
							setMemberSession(memberSession);
							return error(respMap, HttpStatus.FORBIDDEN, "EXTRA", "예외처리");
						}
					} else {
						respMap.put("cs", 2);
						respMap.put("userId", resultInfo.getIncsMemberId().substring(0, 2) + "*******");
						return error(respMap, HttpStatus.FORBIDDEN, "EXTRA", "예외처리");
					}
				} else if(resultInfo.isOldMember()) {
					respMap.put("cs", 3);
					respMap.put("userId", memberId);
					return error(respMap, HttpStatus.FORBIDDEN, "EXTRA", "예외처리");
				}
			}
			APRequestContext.setAccessToken(resultInfo.getAccessToken());

			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());

			MemberSession memberSession = getMemberSession();
			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo(apMember.getIncsNo());
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());
			
			try {
				if(memberSession.getCartSn() != null && memberSession.getCartSn() != 0)
					cartApi.transferMemberCart(resultInfo.getMemberSn(), memberSession.getCartSn());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}

			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
			try {
				cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
				memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}

			if("on".equals(autoLogin)) {
				Date date = resultInfo.getAutoLoginTokenExpireDt();
				long time = date.getTime() - System.currentTimeMillis();
				CookieUtils.addCookie(resp, CookieKey.AUTO_LOGIN, resultInfo.getAutoLoginToken(), (int)(time/1000));

			}
			respMap.put("sleep", resultInfo.getDormantAcConvertYn());
			if("Y".equals(resultInfo.getDormantAcConvertYn())) {
				setMemberSession(null);
			} else {
				setMemberSession(memberSession);
			}
			respMap.put("old", false);//FIXME 구회원 여부.
			respMap.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
			if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
				respMap.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
			}
			return ResponseEntity.ok(respMap);

		} catch (ApiException e) {
			
			Map<String, Object> map = e.getAdditional();
			Boolean isLock = (Boolean) map.get("lockThisTime");
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
			Date lockReleaseDate;
			try {
				if(map.get("lockReleaseDate") != null) {
					lockReleaseDate = (Date) format.parse((String) map.get("lockReleaseDate"));
	
					if(lockReleaseDate != null) {
						long time = lockReleaseDate.getTime() - System.currentTimeMillis();
						respMap.put("lockReleaseDate", time/1000/60.0);
					}
				}
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			if(isLock != null && isLock) {
				respMap.put("isLock", true);
			} else {
				respMap.put("isLock", false);
			}
			
			
			return error(respMap, e);
		}
	}
	
	/**
	 * SNS연결 로그인.
	 */
	@SuppressWarnings("unchecked")
	@PostMapping("/doLoginLink")
	public ResponseEntity<?>  doLoginLink(HttpServletRequest req, HttpServletResponse resp) {
		ResponseEntity<?> result = doLogin(req, resp);
		if(getMemberSn() == 0) {
			return result;
		}
		String snsCode = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_CODE);
		String snsId = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_ID);
		String accessToken = (String) WebUtils.getSessionAttribute(req, SessionKey.SNS_TOKEN);
		PostSnsIf snsIdIf = new PostSnsIf();
		snsIdIf.setSnsId(snsId);
		snsIdIf.setAccessToken(accessToken);
		try {
			SnsIfResult snsResult = apApi.postMemberSns(getMemberSn(), snsCode, snsIdIf);
			if(!snsResult.isResult()) {
				return error((Map<String, Object>) result.getBody(), HttpStatus.SERVICE_UNAVAILABLE, "SNSERR", "SNS연계에 실패했습니다. 잠시 후 다시 시도해주세요.");
			}
		} catch(ApiException e) {
			return error((Map<String, Object>) result.getBody(), e);
		} finally {

			WebUtils.setSessionAttribute(req, SessionKey.SNS_CODE, null);
			WebUtils.setSessionAttribute(req, SessionKey.SNS_ID, null);
			WebUtils.setSessionAttribute(req, SessionKey.SNS_TOKEN, null);
		}
		return result;
	}

    /**
     * sns login process
     *
     * @param snsName
     * @param request 
     * @return
     */
    @RequestMapping("/login/snsloginProcess")
    public ResponseEntity<?> snsLoginProcessM(String snsName, String id, String accessToken, HttpServletRequest request) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		//FIXME accessToken으로 연동여부 확인.
		WebUtils.setSessionAttribute(request, SessionKey.SNS_CODE, snsName);
		WebUtils.setSessionAttribute(request, SessionKey.SNS_ID, id);
		WebUtils.setSessionAttribute(request, SessionKey.SNS_TOKEN, accessToken);
		
		ApSnsLoginInfo snsLoginInfo = new ApSnsLoginInfo();
		snsLoginInfo.setSnsType(snsName);
		snsLoginInfo.setSnsId(id);
		snsLoginInfo.setSnsAccessToken(accessToken);
		try {
			ApMemberLoginReturnInfo resultInfo = apApi.memberSnsLogin(snsLoginInfo);
			APRequestContext.setAccessToken(resultInfo.getAccessToken());
			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
			MemberSession memberSession = getMemberSession();
			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo(apMember.getIncsNo());
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());
			
			try {
				CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
				cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
				cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
				memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}

			try {
				if(memberSession.getCartSn() != null && memberSession.getCartSn() != 0)
					cartApi.transferMemberCart(resultInfo.getMemberSn(), memberSession.getCartSn());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}
			
			result.put("sleep", resultInfo.getDormantAcConvertYn());
			if("Y".equals(resultInfo.getDormantAcConvertYn())) {
				result.put("message", getMessage("customer.login.sleepMember", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy년MM월")));
			} else {
				setMemberSession(memberSession);
			}
			result.put("old", false);//FIXME 구회원 여부.
			result.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
			if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
				result.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
			}
			result.put("isLinked", true);
		} catch(ApiException e) {
			result.put("isLinked", false);
			
		}
		

		return ResponseEntity.ok(result);
    }

    @RequestMapping("/api/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
		WebUtils.setSessionAttribute(request, SessionKey.LOGIN_USER, null);
		MemberSession memberSession = getMemberSession();
		if (memberSession.getMember_sn() != null) {
			try {

				Cookie token = CookieUtils.getCookie(request, CookieKey.AUTO_LOGIN);
				ApLogoutInfo tokenBody = new ApLogoutInfo();
				if(token != null) {
					tokenBody.setAutoLoginToken(token.getValue());
				}
				apApi.memberLogout(memberSession.getMember_sn(), tokenBody);
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		return ResponseEntity.ok("{}");
    }
    
    @PostMapping("/login/mobileLoginRequest")
    public ResponseEntity<?> mobileLoginRequest(HttpServletRequest request, String custNm, String phoneNumber1, String phoneNumber2, String phoneNumber3) {
    	Map<String, Object> resp = new HashMap<String, Object>();
    	ApMobileAuthRequestInfo requestMobileAuthInfo = new ApMobileAuthRequestInfo();
    	EmbeddableName name = new EmbeddableName();
    	name.setName1(custNm);
		requestMobileAuthInfo.setName(name);
		EmbeddableTel cellPhoneNo = new EmbeddableTel();
		if(phoneNumber3 == null)
			phoneNumber3 = "";
		cellPhoneNo.setPhoneNo(phoneNumber1 + phoneNumber2 + phoneNumber3);
		requestMobileAuthInfo.setCellPhoneNo(cellPhoneNo);
		try {
			ApMobileAuthRequestResultInfo result = apApi.requestMobileAuthLogin(requestMobileAuthInfo);
			resp.put("incsNo", result.getMemberSn());
		} catch(ApiException e) {
			return error(resp, e);
		}
    	return ResponseEntity.ok(resp);
    }
    
    @PostMapping("/login/mobileLogin")
    public ResponseEntity<?> mobileLogin(HttpServletRequest request, long incsNo, String smsNum) {

    	Map<String, Object> respMap = new HashMap<String, Object>();
    	try {
	    	ApMobileAuthLoginInfo loginInfo = new ApMobileAuthLoginInfo();
	    	loginInfo.setMemberSn(incsNo);
	    	loginInfo.setAuthKey(smsNum);
	    	ApMemberLoginReturnInfo resultInfo =  apApi.mobileAuthLogin(loginInfo);
			if(resultInfo == null) {
				return error(respMap, HttpStatus.SERVICE_UNAVAILABLE, "EAPI001", "로그인에 실패했습니다.");
			}

			if(!resultInfo.isMember()) {
				if(resultInfo.isIncsMember() && resultInfo.getIncsMemberId() != null && !resultInfo.getIncsMemberId().isEmpty()) {
					if(resultInfo.isIntegrationPasswordMatch()) {

						if(resultInfo.isOldMember()) {
							respMap.put("cs", 0);
							
						} else {
							respMap.put("cs", 1);
							MemberSession memberSession = getMemberSession();
							memberSession.setUser_incsNo(resultInfo.getIncsNo());
							setMemberSession(memberSession);
							return error(respMap, HttpStatus.FORBIDDEN, "EXTRA", "예외처리");
						}
					} else {
						respMap.put("cs", 2);
						respMap.put("userId", resultInfo.getIncsMemberId().substring(0, 2) + "*******");
						return error(respMap, HttpStatus.FORBIDDEN, "EXTRA", "예외처리");
					}
				} else if(resultInfo.isOldMember()) {
					respMap.put("cs", 3);
					respMap.put("userId", "");
					return error(respMap, HttpStatus.FORBIDDEN, "EXTRA", "예외처리");
				}
			}
			
			
			APRequestContext.setAccessToken(resultInfo.getAccessToken());
	
			ApMember apMember = apApi.getMemberInfo(resultInfo.getMemberSn());
	
			MemberSession memberSession = getMemberSession();
			memberSession.setMember(apMember);
			memberSession.setMember_sn(resultInfo.getMemberSn());
			memberSession.setUser_incsNo(apMember.getIncsNo());
			memberSession.setAccessToken(resultInfo.getAccessToken());
			memberSession.setRefreshToken(resultInfo.getRefreshToken());
	
			CicuemCuInfTotTcVo cicuemCuInfTotTcVo = new CicuemCuInfTotTcVo();
			cicuemCuInfTotTcVo.setIncsNo(memberSession.getUser_incsNo());
			try {
				cicuemCuInfTotTcVo = amoreAPIService.getcicuemcuinfrbyincsno(cicuemCuInfTotTcVo);
				memberSession.setUser_incsCardNoEc(cicuemCuInfTotTcVo.getIncsCardNoEc());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}

			try {
				if(memberSession.getCartSn() != null && memberSession.getCartSn() != 0)
					cartApi.transferMemberCart(resultInfo.getMemberSn(), memberSession.getCartSn());
			} catch(Exception e) {
				logger.error(e.getMessage(), e);
			}
			
			respMap.put("sleep", resultInfo.getDormantAcConvertYn());
			if("Y".equals(resultInfo.getDormantAcConvertYn())) {
				setMemberSession(null);
			} else {
				setMemberSession(memberSession);
			}
			respMap.put("old", false);//FIXME 구회원 여부.
			respMap.put("changePw", resultInfo.getPasswordLongtimeUnchangedYn());
			if("Y".equals(resultInfo.getPasswordLongtimeUnchangedYn())) {
				respMap.put("message", getMessage("customer.login.changePwdContant", DateFormatUtils.format(resultInfo.getMemberSignupDt(), "yyyy-MM-dd")));
			}
			return ResponseEntity.ok(respMap);
			
    	} catch(ApiException e) {
			return error(e);
    	}
    	
    }


    /**
     * 주문번호 전화번호로 주문조회 가능여부 확인.
     *
     */
    @RequestMapping("/nonMeber/checkOrder")
    public ResponseEntity<?> checkOrder(String ordNo, String phoneNo, String custNm) {
    	Map<String, Object> result = new HashMap<String, Object>();
    	try {
    		OrdEx ordEx = orderApi.getNonmemberOrd(ordNo, null, phoneNo, custNm, null, null, null);
    		if(ordEx != null) {
    			return ResponseEntity.ok(result);
    		}
    	} catch(Exception e) {
    		
    	}
		return error(result, HttpStatus.NOT_FOUND, "NOTFOUND", "해당 정보로 주문을 조회하지 못했습니다.");
    }

    @PostMapping("/saveUrl")
    public ResponseEntity<?> saveUrl(String url, HttpServletRequest request) {
		WebUtils.setSessionAttribute(request, SessionKey.RETURL, url);
		return ResponseEntity.ok("{}");
    }
    
    /**
     * 앱 통신
     *
     */
    @RequestMapping("/app/appToWeb")
    public ResponseEntity<?> appToWeb(String type, AppCumuData data) {
    	Map<String, Object> result = new HashMap<String, Object>();
    	result.put("rsltCd", "SUCCESS");
    	result.put("rsltMsg", "저장되었습니다.");
    	logger.info("[appToWeb]{},{},{},{},{},{},{},{},{}", type, data.getAppUid(),data.getAppVer(),data.getDeviceModel(),data.getLocation(),data.getMarketing(),data.getOsVer(),data.getPush(),data.getTokenData());
    	return ResponseEntity.ok(result);
    }
    /**
     * 앱 버전.
     */
    @RequestMapping("/getAppVersion/{osType}")
    public ResponseEntity<?> appVersion(@PathVariable("osType") String osType) {

    	Map<String, Object> result = new HashMap<String, Object>();
    	result.put("appVersion", "1.1");
    	result.put("minVersion", "1.0");
    	
    	return ResponseEntity.ok(result);
    }
    
}
