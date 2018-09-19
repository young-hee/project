package kr.ap.emt.customer.controller;

import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.breadcrumb.BreadCrumb;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.G1SecureRandom;
import net.g1project.ecp.api.model.sales.terms.Terms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.WebUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.servlet.http.HttpServletRequest;

import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@Controller
@RequestMapping("/customer")
public class SignupViewController extends AbstractController {

	@Autowired
	private TemplateEngine engine;
	
	@GetMapping("/signup")
	@PageTitle(title = "회원가입")
	@BreadCrumb("EH.LO.07")
	public String signup(Model model) {
		String oldId = getRequest().getParameter("oldId");
		if(oldId != null && !oldId.isEmpty())
			WebUtils.setSessionAttribute(getRequest(), SessionKey.OLD_ID, oldId);
		
		return agreeTerms(getRequest(), model);
	}
	@PostMapping("/alreadyMember")
	@PageTitle(title = "회원가입")
	public String alreadyMember(Model model, String mbrJoinDt, String userId, String custNm) {
		model.addAttribute("userId", userId);
		model.addAttribute("custNm", custNm);

		if("undefined".equals(mbrJoinDt)) {
			model.addAttribute("mbrJoinDt", "");
			return "customer/customernew/member-join.4.3";
		}
		StringBuffer sb = new StringBuffer(mbrJoinDt);
		
		sb.insert(6, ".");
		sb.insert(4, ".");
		
		model.addAttribute("mbrJoinDt", sb.toString());
		
		return "customer/customernew/member-join.4.3";
	}
	
	@GetMapping("/popup")
	@FragmentPage
    public ResponseEntity<?> getMsg(String pageId, String userId1, String userId2) {

        
        Context ctx = new Context();
        ctx.setVariable("userId1", userId1);
        ctx.setVariable("userId2", userId2);
        
        String prefix = "";
        
        if(isMobileDevice()) {
        	prefix = "mo/ko/";
        }
        if(isPcDevice()) {
        	prefix = "pc/ko/";
        }
        
        String body = engine.process(prefix + "customer/fragment/layer-member", new HashSet<String>(Arrays.asList("member-popup-" + pageId)), ctx);
        
        return ResponseEntity.status(200).body(body);
    }

	/**
	 * 본인인증-휴대폰인증
	 *
	 * @return
	 */
	@GetMapping("/phoneCert")
	@PageTitle(title = "회원가입")
	@BreadCrumb("EH.LO.07")
	public String phoneCert(Model model) {
		model.addAttribute("captchaKey", G1SecureRandom.getRandomText(10));
		return "customer/phoneCert";
	}

	/**
	 * 본인인증-외국인등록번호인증
	 * @param model 
	 *
	 * @return
	 */
	@GetMapping("/foreignCert")
	@PageTitle(title = "회원가입")
	@BreadCrumb("EH.LO.07")
	public String foreignCert(Model model) {
		model.addAttribute("captchaKey", G1SecureRandom.getRandomText(10));
		return "customer/customernew/member-join.3";
	}

	/**
	 * 약관동의
	 *
	 * @return
	 */
	@GetMapping("/agreeTerms")
	@PageTitle(title = "회원가입")
	@BreadCrumb("EH.LO.08")
	public String agreeTerms(HttpServletRequest request, Model model) {

		MemberSession memberSession = getMemberSession();
		String joinType = memberSession.getUser_joinType();
		if (!ObjectUtils.isEmpty(joinType)
			&& ("04".equals(joinType) || "05".equals(joinType))) {
			model.addAttribute("termsType", "etudeTermsOnly");
		} else {
			model.addAttribute("termsType", "allTerms");
		}

		/**
		 * terms : ET001, 010, 020, 030, 040, 050, 060
		 */
		List<Terms> termsList = termsApi.getTerms("ET001, 010, 020, 030, 040, 050, 060");

		HashMap<String, Terms> termsMap = new HashMap<String, Terms>();
		for (Terms t : termsList) {
			termsMap.put(t.getTermsDisplayCode(), t);
		}

		model.addAttribute("termsMap", termsMap);

		return "customer/customernew/member-join.1";
	}

	/**
	 * [Mobile] 약관 상세조회
	 *
	 * @param model
	 * @param displayCode
	 * @return
	 */
	@GetMapping("/agreeTerms/{displayCode}")
	public String agreeTermsDetail(Model model, @PathVariable String displayCode) {
		List<Terms> terms = termsApi.getTerms(displayCode);

		if (!terms.isEmpty()) {
			model.addAttribute("terms", terms.get(0));
		}

		return "customer/agreeTermsDetail";
	}

	/**
	 * 약관 상세조회(api)
	 *
	 * ET001: [필수] 에뛰드하우스 이용약관
	 * 010	: [필수] 뷰티포인트 서비스 이용약관
	 * 020	: [필수] 개인정보 이용 및 수집에 대한 동의
	 * 030	: [선택] 개인정보 이용 및 수집에 대한 동의
	 * 040	: [선택] 개인정보 제3자 제공 동의
	 * 050	: [선택] 개인정보 제3자 제공 동의(외부컨텐츠)
	 * 060	: [선택] 국외이전동의
	 * ET002: 위치정보 이용약관
	 * ET003: 개인정보처리방침
	 * ET004: 서비스 이용약관
	 * ET005: 영상정보처리기기 운영ㆍ관리 방침
	 * ET006: 이메일 무단수집 거부
	 * ET007: 개인정보 수집 이용 동의 (필수)
	 * ET008: 개인정보 취급 위탁에 대한 동의 (필수)
	 *
	 * @param model
	 * @param displayCode
	 * @return
	 */
	@GetMapping("/getAgreeTerms")
	@ResponseBody
	public HashMap<String, Object> getAgreeTermsDetail(Model model, String displayCode) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		List<Terms> terms = termsApi.getTerms(displayCode);

		if (!terms.isEmpty()) {
			result.put("terms", terms.get(0));
		}

		return result;
	}

	/**
	 * 정보입력
	 * @param model 
	 *
	 * @return
	 */
	@GetMapping("/inputInfo")
	@PageTitle(title = "회원가입")
	@BreadCrumb("EH.LO.09")
	public String inputInfo(Model model) {
		model.addAttribute("captchaKey", G1SecureRandom.getRandomText(10));
		model.addAttribute("oldId", WebUtils.getSessionAttribute(getRequest(), SessionKey.OLD_ID));
		WebUtils.setSessionAttribute(getRequest(), SessionKey.OLD_ID, null);
		return "customer/customernew/member-join.2";
	}

	/**
	 * 가입완료
	 *
	 * @return
	 */
	@RequestMapping("/joinComplete")
	@PageTitle(title = "회원가입")
	@BreadCrumb("EH.LO.10")
	public String joinComplete(Model model, Integer remainPoint, String custNm) {
		if(remainPoint == null || remainPoint == 0)
			return "customer/customernew/member-join.4.1.html";
		else {
			model.addAttribute("remainPoint", remainPoint);
			model.addAttribute("custNm", custNm);
			return "customer/customernew/member-join.4.2.html";
		}
	}

	/**
	 * 실패
	 *
	 * @return
	 */
	@PostMapping("/joinFailed")
	@PageTitle(title = "회원가입")
	@BreadCrumb("EH.LO.10")
	public String joinFailed(Model model, String message) {
		if(message != null && !message.isEmpty()) {
			model.addAttribute("errorMessage", message);
		}
		return "customer/customernew/member-join.4.5.html";
	}

	/**
	 * 에뛰드 약관동의
	 *
	 * @return
	 */
	@GetMapping("/stepThree")
	@PageTitle(title = "회원가입")
	public String conversionSignup() {
		return "customer/customernew/member-join.1.new";
	}

	
}