package kr.ap.amt.customer.controller;

import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.breadcrumb.BreadCrumb;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.CookieUtils;
import kr.ap.comm.util.G1SecureRandom;
import kr.ap.amt.customer.vo.ParamValue;
import net.g1project.ecp.api.model.ap.ap.ApLogoutInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class LoginViewController extends AbstractController {

	@Autowired
	CaptchaAPI captchaAPI;
	
    @Value("${kakao.restkey}")
	private String appId;
    
    @Value("${kakao.secret}")
    private String secret;
	
	
	@PageTitle(title = "로그인")
	@GetMapping("/login")
	@BreadCrumb("EH.LO.01")
	public String login(Model model, HttpServletRequest request, String returl) {
		commonLogin(model, request, returl);
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "customer/login.1";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "customer/login";
		}
		
		return null;
	}
	
	private void commonLogin(Model model, HttpServletRequest request, String returl) {
		String returnUrl = (String) WebUtils.getSessionAttribute(request, SessionKey.LOGIN_REDIRECT_URI);
        String reqReturnUrl = request.getParameter("returnUrl");
        Map<String, String[]> postData = (Map<String, String[]>) WebUtils.getSessionAttribute(request, SessionKey.LOGIN_POST_DATA);

		if(postData != null) {
			WebUtils.setSessionAttribute(request, SessionKey.LOGIN_POST_DATA, null);
			List<ParamValue> pVal = new ArrayList<ParamValue>();
			for(String key : postData.keySet()) {
				pVal.add(new ParamValue(key, postData.get(key)[0]));
			}
        	model.addAttribute("method", "POST");
        	model.addAttribute("pVal", pVal);
		} else {
        	model.addAttribute("method", "GET");
		}
        if(StringUtils.hasText(returnUrl)) {
        	WebUtils.setSessionAttribute(request, SessionKey.LOGIN_REDIRECT_URI, null);
        	model.addAttribute("returnUrl", returnUrl);
        } else if(StringUtils.hasText(returl)){
        	if("/login".contains(returl))
            	model.addAttribute("returnUrl", "/main");
        	else
        		model.addAttribute("returnUrl", returl);
        } else if(StringUtils.hasText(reqReturnUrl)){
        	model.addAttribute("returnUrl", reqReturnUrl);
        } else {
        	model.addAttribute("returnUrl", "/main");
        }
        
		String state = G1SecureRandom.getRandomText(10);
    	WebUtils.setSessionAttribute(request, SessionKey.SNS_STATE, state);
		model.addAttribute("state", state);
	}
	
	@GetMapping("/doLogout")
	public String doLogout(HttpServletRequest request, HttpServletResponse response, String returl) {
		Cookie token = CookieUtils.getCookie(request, CookieKey.AUTO_LOGIN);
		CookieUtils.removeCookie(request, response, CookieKey.AUTO_LOGIN);
		MemberSession memberSession = getMemberSession();
		WebUtils.setSessionAttribute(request, SessionKey.LOGIN_USER, null);
		WebUtils.setSessionAttribute(request, SessionKey.CART, null);
		WebUtils.setSessionAttribute(request, SessionKey.ORDER, null);
		if (memberSession.getMember_sn() != 0) {
			try {
				ApLogoutInfo logoutInfo = new ApLogoutInfo();
				if(token != null)
					logoutInfo.setAutoLoginToken(token.getValue());
				apApi.memberLogout(memberSession.getMember_sn(), logoutInfo);
			} catch (Exception e) {
				logger.error(e.getMessage());
			}
		}
		if(returl == null)
			return "redirect:/main";
		else
			return "redirect:/" + returl;
			
	}

	/**
	 * 비회원 로그인.
	 *
	 * @return
	 */
	@GetMapping("/guestOrder")
	@PageTitle(title = "비회원 로그인")
	public String guestOrder() {
		return "customer/login.3";
	}
	
	/**
	 * 휴대전화 인증으로 로그인.
	 *
	 * @return
	 */
	@GetMapping("/loginSimple")
	@PageTitle(title = "휴대폰 간편 인증")
	public String simpleLogin(Model model, HttpServletRequest request, String returl) {
		commonLogin(model, request, returl);
		return "customer/login.2";
	}

	/**
	 * 휴먼계정 로그인
	 * @return
	 */
	@GetMapping("/customer/slipPopup")
	public String slipPopup() {
		return "customer/layer-member-01";
	}
	/**
	 * 비밀번호 변경 안내
	 * @return
	 */
	@GetMapping("/customer/passwordChangePopup")
	public String passwordChangePopup() {
		return "customer/layer-member-02";
	}

}