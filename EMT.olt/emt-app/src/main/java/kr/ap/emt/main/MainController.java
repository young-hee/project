package kr.ap.emt.main;

import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.emt.my.controller.MyBenefitViewController;
import net.g1project.ecp.api.model.sales.coupon.MemberCoupon;
import net.g1project.ecp.api.model.sales.display.*;
import net.g1project.ecp.api.model.sales.guide.FoNoticeResult;
import net.g1project.ecp.api.model.sales.keywordPopup.PopupInfo;

@Controller
public class MainController extends AbstractController {

	/**
	 * Main
	 *
	 * @param model
	 * @return
	 */
	@GetMapping({"/", "/main", "/main/preview"})
	@PageTitle(title = "에뛰드하우스에 오신걸 환영합니다.")
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
		
		try {
		
			//Mobile
	        if (isMobileDevice()) {
				cornerIds = "M02_main_m.1,M02_main_m.2,M02_main_m.3,M02_main_m.4,M02_main_m.6";
	        }
	
	        //PC
	        if (isPcDevice()) {
	        	cornerIds = "M02_main_p.1,M02_main_p.2,M02_main_p.3,M02_main_p.4,M02_main_p.5";
	        }

	        // 코너정보
	        SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");
	        
	        /*	
	          @Param("displayMenuSetId") String displayMenuSetId
	        , @Param("displayMenuId") String displayMenuId
	        , @Param("memberSn") Long memberSn
	        , @Param("previewKey") String previewKey
	        , @Param(value = "previewDate", expander = ISO8601DateTimeExpander.class) Date previewDate
	        , @Param("cornerIds") String cornerIds
	        , @Param("excludeSoldOut") Boolean excludeSoldOut
	        */
	        
			List<Corner> corners = 
				displayApi.getMenuPageCorners(
						  APConstant.EH_DISPLAY_MENU_SET_ID
				        , displayMenuId
				        , previewKey
				        , previewDate != null ? sf.parse(previewDate) : null
				        , cornerIds
				        , false);
			
			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}
			model.addAttribute("cornersMap", cornersMap); // top_banner, middle_banner, bottom_banner , md_best_color
			
			// 신상품 flaged 
			OnlineProdList newProdList
				= displayApi.getFlaggedProdList(
				APConstant.EH_NEW_PROD_FLAG    	//flags
				, false            	//excludeSoldOut
				, "OnlineProd"        	//prodListUnit
				, "NewProd"               //prodSort
				, 0                          //offset
				, 5                          	//limit
				, false               	//includeFilters
				, null            //displayCateDepth
				, null                 //displayCate
				, null                      //brand
				, APConstant.EH_NEW_PROD_FLAG    	//flag
				, null                        //attr
				, null                 //priceRange
			);
			model.addAttribute("newProdList", newProdList); // new

			//공지팝업목록
	        List <PopupInfo> popupInfo = keywordPopupApi.getPopups();
			model.addAttribute("popupInfo", popupInfo);  // 공지 팝업
	        
	        //하단 한줄 공지 목록
	        FoNoticeResult notice = guideApi.getFoNotices("", null, 0, 10, null, null);
	        model.addAttribute("footerNotice", notice); // 하단 한줄 공지
		
		}catch(Exception e) {
			model.addAttribute("popupInfo", null);
	        model.addAttribute("footerNotice", null);
	    }
        
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
		
		if(0L != getMemberSn()) {
			MemberCoupon memberKeepingCoupons = couponApi.getMemberKeepingCoupons("Avail", getMemberSn(), 0L, 0L);
			model.addAttribute("memberKeepingCoupons", memberKeepingCoupons); 
			
		}
		return "main/" + pageInfo.getMenuPageFileId();
	}

}