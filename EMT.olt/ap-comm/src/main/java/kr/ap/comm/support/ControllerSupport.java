package kr.ap.comm.support;

import kr.ap.comm.config.interceptor.DisplayChannelResolver;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.sales.display.DisplayMenu;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ExtendedModelMap;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Priority;
import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

/**
 * ControllerSupport
 * <p>
 * 모든요청에대해 수행해야할 내용을 추가 한다.
 * </p>
 */
@Priority(2)
@ControllerAdvice(
	annotations = {Controller.class}
)
public class ControllerSupport extends AbstractController {

	private List<DisplayMenu> gnb;
	private ConcurrentHashMap<String, DisplayMenu> gnbMap;
	private long lastModified;
	private List<String> popularSearches;

	@Value("${platform.frontend.mall-id}")
	private String mallId;

	public static final String GNB_NOT_REQUIRED = "_GNB_NOT_REQUIRED_";

	private static final Set<String> GNB_NOT_REQUIRED_URI = Collections.unmodifiableSet(new HashSet<>(Arrays.asList("/doLogout")));

	/**
	 * GNB 와 SubGNB Menu 데이터
	 *
	 * @param model
	 */
	@ModelAttribute
	public void gnbAndSubGnb(Model model, HttpServletRequest request) {

		// 에러페이지 요청에서는 GNB 및 SubGNB 를 조회하지 않게 처리
		String uri = request.getRequestURI();
		if (uri.startsWith("/error")) {
			return;
		}
		else if (model.containsAttribute(GNB_NOT_REQUIRED)) {
			return;
		}
		else if (GNB_NOT_REQUIRED_URI.contains(uri)) {
			return;
		}

		/** GNB 정보 세팅 -start- **/
		setGndMap();
		/** GNB 정보 세팅 -end- **/

		/** Session 정보 세팅 -start- **/
		Map<String, Object> memberMap = getMemberMap();
		/** Session 정보 세팅 -end- **/

		/** 인기검색어 세팅 -start- **/
		setPopularSearches();
		/** 인기검색어 세팅 -end- **/

		model.addAttribute("gnb", gnb);
		model.addAttribute("gnbMap", gnbMap);
		model.addAttribute("currentTimeMillis", System.currentTimeMillis());
		model.addAttribute("memberMap", memberMap);
		model.addAttribute("popularSearchWord", popularSearches);
	}

	private synchronized void setPopularSearches() {

		if (ObjectUtils.isEmpty(popularSearches) || isExpired()) {
			popularSearches = displayApi.getPopularSearches(10); //인기검색어 조회
			//gnbMap = getGNBMap(gnb); //GNB 조회
			lastModified = System.currentTimeMillis();
		}
	}

	private synchronized void setGndMap() {

		if (ObjectUtils.isEmpty(gnb) || isExpired()) {

			if ("M01".equals(mallId)) {
				gnb = displayApi.getAllMenus(APConstant.AP_DISPLAY_MENU_SET_ID); //AP GNB메뉴 조회
			} else {
				gnb = displayApi.getAllMenus(APConstant.EH_DISPLAY_MENU_SET_ID); //EH GNB메뉴 조회
			}
			gnbMap = getGNBMap(gnb); //GNB 조회

			lastModified = System.currentTimeMillis();
		}
	}

	private Map<String, Object> getMemberMap() {
		MemberSession ms = getMemberSession();

		String id = "";
		String name = "";
		String cstmid = ""; //통합회원번호
		String residno1 = ""; //생년월일
		String gendDvCd = ""; //남녀구분
		Long memberSn = null;
		String phoneNo1 = "";
		String phoneNo2 = "";

		if (ms != null && ms.getMember() != null) {
			id = StringUtils.defaultString(ms.getMember().getMemberId());
			name = StringUtils.defaultString(ms.getMember().getName().getName1());
			cstmid = StringUtils.defaultString(ms.getMember().getIncsNo());
			String dobYear = StringUtils.defaultString(ms.getMember().getDobYear());
			String dobMonth = StringUtils.defaultString(ms.getMember().getDobMonth());
			String dobDay = StringUtils.defaultString(ms.getMember().getDobDay());
			memberSn = ms.getMember_sn();

			phoneNo1 = ms.getMember().getPhoneNo1() == null ? "" : (ms.getMember().getPhoneNo1()).getPhoneNo();
			phoneNo2 = ms.getMember().getPhoneNo2() == null ? "" : (ms.getMember().getPhoneNo2()).getPhoneNo();

			if (dobYear.length() == 4) {
				dobYear = dobYear.substring(2, 4);
			}

			dobMonth = StringUtils.leftPad(dobMonth, 2, "0");
			dobDay = StringUtils.leftPad(dobDay, 2, "0");

			residno1 = dobYear.concat(dobMonth).concat(dobDay);

			if (residno1.length() != 6) {
				residno1 = "";
			}

			gendDvCd = StringUtils.defaultString(ms.getMember().getGenderCode());
		}

		Map<String, Object> memberMap = new HashMap<String, Object>();
		memberMap.put("id", id);
		memberMap.put("name", name);
		memberMap.put("cstmid", cstmid);
		memberMap.put("residno1", residno1);
		memberMap.put("gendDvCd", gendDvCd);
		memberMap.put("memberSn", memberSn);
		memberMap.put("phoneNo1", phoneNo1);
		memberMap.put("phoneNo2", phoneNo2);
		// memberMap.put("cartSn", ms.getCartSn()); casrtSession 생성 후 사용여부 확인(미사용)
		return memberMap;
	}

	private boolean isExpired() {
		if (lastModified == 0) {
			return true;
		}

		long now = System.currentTimeMillis();
		long expireTime = 5 * 60 * 1000; // 5min
		// lastModified 에서 5분이 경과 했는지 확인
		return lastModified + expireTime <= now;
	}

	public Map<String, Object> getGnbMap() {

		Map<String, Object> map = new HashMap<>();

		/** GNB 정보 세팅 -start- **/
		setGndMap();
		/** GNB 정보 세팅 -end- **/

		/** Session 정보 세팅 -start- **/
		Map<String, Object> memberMap = getMemberMap();
		/** Session 정보 세팅 -end- **/

		map.put("gnb", gnb);
		map.put("gnbMap", gnbMap);
		map.put("currentTimeMillis", System.currentTimeMillis());
		map.put("memberMap", memberMap);

		return map;
	}

	/**
	 * get GNB info
	 *
	 * @param gnb
	 * @return
	 */
	protected ConcurrentHashMap<String, DisplayMenu> getGNBMap(List<DisplayMenu> gnb) {

		ConcurrentHashMap<String, DisplayMenu> gnbMap = new ConcurrentHashMap<>();

		gnbsToMap(gnb, gnbMap);

		return gnbMap;
	}

	/**
	 * set GNB info to Map
	 *
	 * @param gnbList
	 * @param gnbMap
	 */
	protected void gnbsToMap(List<DisplayMenu> gnbList, ConcurrentHashMap<String, DisplayMenu> gnbMap) {

		for (DisplayMenu dm : gnbList) {

			gnbMap.put(dm.getDisplayMenuId(), dm);

			List<DisplayMenu> dmList = dm.getSubmenus();

			if (dmList != null && dmList.size() > 0) {
				gnbsToMap(dmList, gnbMap);
			}
		}
	}

	private CombineJsFileLoader loader = new CombineJsFileLoader();

	@ExceptionHandler(Exception.class)
	public ModelAndView handleError(HttpServletRequest request, Exception e) {

		Model model = new ExtendedModelMap();
		gnbAndSubGnb(model, request);

		ModelAndView mv = new ModelAndView();
		mv.addAllObjects(model.asMap());

		// uncatch exception  은 error-03 으로
		if (APRequestContext.getDisplayChannel() == null) {
			DisplayChannelResolver.setDisplayChannel(request);
		}

		String viewName = "error/error-03";
		DisplayChannelResolver.resolveViewName(mv, viewName, loader);
		return mv;
	}

}
