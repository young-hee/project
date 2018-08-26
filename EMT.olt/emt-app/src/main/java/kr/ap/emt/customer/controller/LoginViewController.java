package kr.ap.emt.customer.controller;

import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.breadcrumb.BreadCrumb;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.CookieKey;
import kr.ap.comm.support.constants.SessionKey;
import kr.ap.comm.util.CookieUtils;
import kr.ap.comm.util.G1SecureRandom;
import kr.ap.emt.customer.vo.ParamValue;
import kr.ap.emt.my.vo.MyOrdDTO;
import net.g1project.ecp.api.model.ap.ap.ApLogoutInfo;
import net.g1project.ecp.api.model.order.order.OrdEx;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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
	@RequestMapping("/login")
	@BreadCrumb("EH.LO.01")
	public String login(Model model, HttpServletRequest request, String returl) {
		commonLogin(model, request, returl);
		
		if(isPcDevice())
			return "customer/login";
		if(isMobileDevice())
			return "customer/fullpage-login-01";
		return null;
	}
	
	@PageTitle(title = "로그인")
	@GetMapping("/loginSimple")
	@BreadCrumb("EH.LO.01")
	public String loginSimple(Model model, HttpServletRequest request, String returl) {
		commonLogin(model, request, returl);
        
		String state = G1SecureRandom.getRandomText(10);
    	WebUtils.setSessionAttribute(request, SessionKey.SNS_STATE, state);
		model.addAttribute("state", state);
		
        if(isMobileDevice())
        	return "customer/fullpage-login-02";

		return "redirect:/login";
	}
	
	@GetMapping("/navercallback")
	public String navercallback(Model model, HttpServletRequest request) {

    	String state = (String) WebUtils.getSessionAttribute(request, SessionKey.SNS_STATE);
		model.addAttribute("state", state);
		return "customer/navercallback";
	}
	@PostMapping("/sleepUser")
	public String sleepUser(Model model, String userId) {
		model.addAttribute("userId", userId);
		return "customer/customernew/member-join.4.4";
	}
	
	@GetMapping("/kakaocallback")
	public String kakaocallback(Model model, HttpServletRequest request, String code) {
		logger.info("KAKAOSTART");
		String returl = (String) WebUtils.getSessionAttribute(request, SessionKey.RETURL);
		WebUtils.setSessionAttribute(request, SessionKey.RETURL, null);
		Map<String, String> result = captchaAPI.getKakaoToken(code, returl, appId, secret);
		model.addAttribute("id", result.get("id"));
		model.addAttribute("token", result.get("token"));
    	return "/customer/kakaoLogin";
	}
	
	@GetMapping("/snsLinkLoginForm")
	public String snsLinkLoginForm() {
		return "/customer/layer-login-03";
	}
	
	@GetMapping("/login/snsLinkPage")
	@PageTitle(title = "계정연동")
	public String snsLinkPage(Model model, HttpServletRequest request, String returl) {
		commonLogin(model, request, returl);
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "customer/fullpage-login-03";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "redirect:/main";
		}
		
		return null;
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
	 * Mobile에서만 사용, PC에서는 login화면과 같이 사용함.
	 * @param model 
	 * @param request 
	 *
	 * @return
	 */
	@GetMapping("/guestOrder")
	@PageTitle(title = "비회원조회")
	public String guestOrder(Model model, HttpServletRequest request, String returl) {
        commonLogin(model, request, returl);
		
		if(isMobileDevice())
			return "customer/fullpage-login-04";

		return "redirect:/login";
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

	/**********************************************************************************************
	 *  7. 비회원 상세 조회
	 **********************************************************************************************/

	@PostMapping("/non/order/detail/{ordNo}")
	@PageTitle(title = "주문상세")
	public String nonOrdDetail(Model model, @PathVariable String ordNo, String phoneNo, String custNm) {

		OrdEx ordEx = orderApi.getNonmemberOrd(ordNo, null, phoneNo, custNm, null, null, null);
		//		orderApi.getNonmemberOrd(, , , , , , )
		if (ordEx != null) {
			String type = "online";
			if ("POS".equalsIgnoreCase(ordEx.getOrdTypeCode())) {
				type = "store";
			}

			model.addAttribute("ord", new MyOrdDTO(ordEx));
			model.addAttribute("type", type);
			model.addAttribute("claimYn", "N");
			model.addAttribute("status", "detail");
 
			return "my/my-order-detail";
		}

		return null;
	}
}