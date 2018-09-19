package kr.ap.amt.main;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.sales.coupon.MemberCoupon;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.display.CornerContentsSet;
import net.g1project.ecp.api.model.sales.display.PageInfo;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class MainController extends AbstractController {

	/**
	 * Main
	 *
	 * @param model
	 * @return
	 */
	@RequestMapping({"/", "/main", "/main/preview"})
	@PageTitle(title = "AP Mall에 오신걸 환영합니다.")
	public String main(Model model, String previewKey, String previewDate) {
		
//		Cookie cookie = CookieUtils.getCookie(request, CookieKey.AUTO_LOGIN);
//		if(cookie != null) {
//			LoginTicket ticket = loginService.getLoginTicket(cookie.getValue());
//			if(ticket != null)
//				WebUtils.setSessionAttribute(response, SessionKey.LOGIN_USER, ticket.getUser());
//		}
	
		//메뉴페이지 파일아이디 조회
		String displayMenuId = "main";
		String cornerIds =  "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		try {

			//Mobile
			if (isMobileDevice()) {
				cornerIds = "M01_main_m.2,M01_main_m.3,M01_main_m.4,M01_main_m.5,M01_main_m.6,M01_main_m.7,M01_main_m.8,M01_main_m.9,M01_main_m.10";
			}

			//PC
			if (isPcDevice()) {
				cornerIds = "M01_main_m.2,M01_main_m.3,M01_main_m.4,M01_main_m.5,M01_main_m.6,M01_main_m.7,M01_main_m.8,M01_main_m.9,M01_main_m.10";
			}

	        List<Corner> corners = displayApi.getMenuPageCorners(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId, previewKey, previewDate != null ? sf.parse(previewDate) : null, cornerIds, false);
			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}
			
			model.addAttribute("cornersMap", cornersMap);
		
		}catch(Exception e) {
			model.addAttribute("popupInfo", null);
	        model.addAttribute("footerNotice", null);
	    }
        
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
		if(isLoggedIn()) {
			MemberCoupon memberKeepingCoupons = couponApi.getMemberKeepingCoupons("Avail", getMemberSn(), 0L, 0L);
			model.addAttribute("memberKeepingCoupons", memberKeepingCoupons.getAvailCoupons()); //floating menu 쿠폰목록 조회
		}
		return "main/" + pageInfo.getMenuPageFileId();
	}

}