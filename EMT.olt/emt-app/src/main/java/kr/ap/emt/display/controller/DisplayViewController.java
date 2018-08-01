/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.time.DateUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.util.FromEndDateUtils;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.display.CornerContentsSet;
import net.g1project.ecp.api.model.sales.display.PageInfo;
import net.g1project.ecp.api.model.sales.guide.FoPushResult;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkByDateSearchResult;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;

@Controller
@RequestMapping("/display")
public class DisplayViewController extends AbstractController {

	@RequestMapping({"/category/{displayMenuId}", "/category/{displayMenuId}/preview"})
	public String bigCategory(Model model, @PathVariable String displayMenuId, String upperMenuId,
			String categoryType, String previewKey, String previewDate) {

		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		// Mobile
		if (isMobileDevice()) {
			if ("prod_types".equals(categoryType) || "prod_lines".equals(categoryType)) {
				cornerIds = "M02_category_m.1,M02_category_m.2,M02_category_m.3";
			} else if ("prod_thema".equals(categoryType)) {
				cornerIds = "M02_" + displayMenuId + "_m.1,M02_" + displayMenuId + "_m.2,M02_" + displayMenuId
						+ "_m.3,M02_" + displayMenuId + "_m.4";
			}
		}

		// PC
		if (isPcDevice()) {
			if ("prod_types".equals(categoryType) || "prod_lines".equals(categoryType)) {
				cornerIds = "M02_category_p.1,M02_category_p.2,M02_category_p.3";
			} else if ("prod_thema".equals(categoryType)) {
				cornerIds = "M02_" + displayMenuId + "_p.1,M02_" + displayMenuId + "_p.2,M02_" + displayMenuId
						+ "_p.3,M02_" + displayMenuId + "_p.4";
			}
		}

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
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

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}


		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);

		model.addAttribute("displayMenuId", displayMenuId);
		model.addAttribute("upperMenuId", upperMenuId);
		model.addAttribute("categoryType", categoryType);
		model.addAttribute("pageType", "category");
		model.addAttribute("displayCateSn", pageInfo.getDisplayCateSns());

		// 쇼핑히스토리 추가
		
		if(0L != getMemberSn()) {
  			ShoppingMarkPost body = new ShoppingMarkPost();
  			body.setShoppingMarkTgtCode("Menu");
  			body.setDisplayMenuId(displayMenuId);     			
  			body.setDisplayMenuSetId(APConstant.EH_DISPLAY_MENU_SET_ID);
  			try{
  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
  			}catch(Exception e) {
  				e.printStackTrace();
  			}
  		}

		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping("/shopping_history")
	@PageTitle(title = "쇼핑 히스토리")
	public String shopping_history(Model model, String displayMenuId) {

		// Mobile
		if (isMobileDevice()) {

		}

		// PC
		if (isPcDevice()) {

		}

		DateFormat dateFormat = new SimpleDateFormat("Z");
		String timeZone = dateFormat.format(new Date());

		List<ShoppingMarkByDateSearchResult> shoppingHistoryList = shoppingmarkApi
				.getShoppingHistoriesByDate(getMemberSn(), APConstant.EH_DISPLAY_MENU_SET_ID, 3, 100, timeZone);

		model.addAttribute("displayMenuId", displayMenuId);
		model.addAttribute("shoppingHistoryList", shoppingHistoryList);

		return "display/shopping-history";
	}

	@RequestMapping("/notification")
	@PageTitle(title = "알림")
	public String notification(Model model, String displayMenuId) {

		Date endDt = new Date();
		Date fromDt = DateUtils.addMonths(endDt, -1);

		FoPushResult foPushResult = guideApi.getFoPushes(0, null, FromEndDateUtils.initFromDate(fromDt),
				FromEndDateUtils.initEndDate(endDt));

		model.addAttribute("displayMenuId", displayMenuId);
		model.addAttribute("foPushResult", foPushResult);

		return "display/notification";
	}

	@RequestMapping({"/new", "/new/preview"})
	@PageTitle(title = "신상품")
	public String newProduct(Model model, String displayMenuId, String previewKey, String previewDate) {

		/**
		 * 코너 없어짐 //메뉴페이지 코너정보 조회 String cornerIds = "";
		 * 
		 * //Mobile if (isMobileDevice()) { cornerIds = "M02_new_m.1"; }
		 * 
		 * //PC if (isPcDevice()) { //cornerIds = "M02_new_p.1"; }
		 * 
		 * List<Corner> corners =
		 * displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID,
		 * displayMenuId, getMemberSn(), cornerIds, false); Map<String,
		 * List<CornerContentsSet>> cornersMap = new HashMap<String,
		 * List<CornerContentsSet>>();
		 * 
		 * for (Corner c : corners) { cornersMap.put(c.getMenuPageCornerId(),
		 * c.getContentsSets()); }
		 * 
		 * model.addAttribute("cornersMap", cornersMap);
		 */
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);

		model.addAttribute("displayMenuId", displayMenuId);

		// return "display/product-list-12";
		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/best", "/best/preview"})
	@PageTitle(title = "베스트")
	public String best(Model model, String displayMenuId, String previewKey, String previewDate) {

		/**
		 * 코너 없어짐 //메뉴페이지 코너정보 조회 String cornerIds = "";
		 * 
		 * //Mobile if (isMobileDevice()) { cornerIds = "M02_best_m.1"; }
		 * 
		 * //PC if (isPcDevice()) { //cornerIds = "M02_best_p.1"; }
		 * 
		 * List<Corner> corners =
		 * displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID,
		 * displayMenuId, getMemberSn(), cornerIds, false); Map<String,
		 * List<CornerContentsSet>> cornersMap = new HashMap<String,
		 * List<CornerContentsSet>>();
		 * 
		 * for (Corner c : corners) { cornersMap.put(c.getMenuPageCornerId(),
		 * c.getContentsSets()); }
		 * 
		 * model.addAttribute("cornersMap", cornersMap);
		 */
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);

		model.addAttribute("displayMenuId", displayMenuId);

		return "display/" + pageInfo.getMenuPageFileId();
	}

	/**
	 * 핫딜 (투데이핫딜) 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping({ "/l_hotdeal_today", "/hotdeal", "/hotdeal/preview" })
	@PageTitle(title = "핫딜")
	public String l_hotdeal_today(Model model, String displayMenuId, String previewKey, String previewDate) {

		String fileName = "";
		// String cornerIds = "";
		displayMenuId = "hotdeal";

		// Mobile
		if (isMobileDevice()) {
			fileName = "display/product-list-10-03";
			// cornerIds = "M02_hotdeal_m.1";
		}

		// PC
		if (isPcDevice()) {
			fileName = "display/product-list-09-02";
			// cornerIds = "M02_best_p.1";
		}

		/**
		 * 코너 없음 List<Corner> corners =
		 * displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID,
		 * displayMenuId, getMemberSn(), cornerIds, false); Map<String,
		 * List<CornerContentsSet>> cornersMap = new HashMap<String,
		 * List<CornerContentsSet>>();
		 * 
		 * for (Corner c : corners) { cornersMap.put(c.getMenuPageCornerId(),
		 * c.getContentsSets()); }
		 * 
		 * model.addAttribute("cornersMap", cornersMap);
		 **/

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}

	/**
	 * 핫딜 (한정판 특가) 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping("/hotdeal_sp_price")
	@PageTitle(title = "핫딜")
	public String hotdeal_sp_price(Model model, String displayMenuId) {

		String fileName = "";
		// String cornerIds = "";
		displayMenuId = "hotdeal";

		// Mobile
		if (isMobileDevice()) {
			fileName = "display/product-list-10-02";
			// cornerIds = "M02_hotdeal_m.2";
		}

		// PC
		if (isPcDevice()) {
			fileName = "display/product-list-10";
			// cornerIds = "M02_best_p.2";
		}

		/**
		 * 코너 없음 List<Corner> corners =
		 * displayApi.getMenuPageCorners(APConstant.EH_DISPLAY_MENU_SET_ID,
		 * displayMenuId, getMemberSn(), cornerIds, false); Map<String,
		 * List<CornerContentsSet>> cornersMap = new HashMap<String,
		 * List<CornerContentsSet>>();
		 * 
		 * for (Corner c : corners) { cornersMap.put(c.getMenuPageCornerId(),
		 * c.getContentsSets()); }
		 * 
		 * model.addAttribute("cornersMap", cornersMap);
		 **/

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}

	/**
	 * APP 전용 멤버십 메뉴 추가
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping("/membership")
	@PageTitle(title = "멤버십")
	public String membership(Model model, String displayMenuId) {

		String fileName = "";

		if (isMobileDevice() || isAndroid() || isiOS()) {

			if (isLoggedIn()) { // 로그인이 되어있으면

				fileName = "display/app-membership.2"; // 로그인후 // 측정값이 없는 경우

			} else {

				fileName = "display/app-membership.1"; // 로그인전
			}

		}

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}

	/**
	 * APP 전용 마이 컬러 파인더
	 *
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping("/color_finder_list")
	@PageTitle(title = "컬러파인더")
	public String colorFinderList(Model model, String displayMenuId) {

		String fileName = "";

		if (isMobileDevice() || isAndroid() || isiOS()) {

			if (isLoggedIn()) { // 로그인이 되어있으면

				fileName = "display/color-finder-01"; // 로그인후
				// 로그인이 되어있으나, 피부톤 이 있는지 없는지에 따른 분기가 필요함API 필요함
				// if() {
				//
				// }
			} else {

				fileName = "display/color-finder-01"; // 로그인전
			}

		}

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}
	
	/**
	 * APP 전용 마이 컬러 파인더 상세
	 *
	 * @param model
	 * @param displayMenuId
	 * @param type
	 * @return
	 */
	@RequestMapping("/color_finder_detail")
	@PageTitle(title = "컬러파인더")
	public String colorFinderDetail(Model model, String displayMenuId, String type) {

		String fileName = "";

		if (isMobileDevice() || isAndroid() || isiOS()) {

			if (isLoggedIn()) { // 로그인이 되어있으면

				fileName = "display/color-finder-03"; // 로그인후
				// 로그인이 되어있으나, 피부톤 이 있는지 없는지에 따른 분기가 필요함API 필요함
				// if() {
				//
				// }
			} else {

				fileName = "display/color-finder-" + type; // 로그인전
			}

		}

		model.addAttribute("displayMenuId", displayMenuId);

		return fileName;
	}

}
