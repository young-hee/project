package kr.ap.amt.my.controller;

import kr.ap.comm.api.vo.*;
import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.point.ActivityPointGift;
import net.g1project.ecp.api.model.sales.point.ActivityPointHists;
import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * 나의 주문 관리
 *
 * 1. 뷰티포인트
 * 2. 진주알
 * 3. 진주알 쿠폰 교환
 * 4. 쿠션포인트
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyPointViewController extends AbstractController {

	private SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	private static final int M_PAGE_SIZE = 5;
	private static final int P_PAGE_SIZE = 10;
	
	/**********************************************************************************************
	 *  1. 뷰티포인트
	 **********************************************************************************************/
	/**
	 * 개시포인트(뷰티포인트) 내역
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/info/beautyPoint")
	@PageTitle(title = "뷰티 포인트내역", menuId = "myPoint", subMenuId = "beautyPoint")
	public String beautyPoint(Model model) {

		MemberSession memberSession = getMemberSession();
		String userIncsNo = memberSession.getUser_incsNo();
		{//포인트 조회
			CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
			vo.setIncsNo(userIncsNo);
			vo = amoreAPIService.getptinq(vo);
			model.addAttribute("point", vo);
		}
		{//고객등급조회.
			CustGrdVo custGrdVo = new CustGrdVo();
			custGrdVo.setIncsNo(userIncsNo);
			custGrdVo = amoreAPIService.getcustgrd(custGrdVo);
			model.addAttribute("rating", custGrdVo);
		}
		{//실적조회
			String year = DateFormatUtils.format(new Date(), "yyyy");
			PrfrInqInCbcVo prfrInqInCbcVo = new PrfrInqInCbcVo();
			prfrInqInCbcVo.setStndYear(year);
			prfrInqInCbcVo.setIncsNo(userIncsNo);
			PrfrInqOutCbcVo prfrinq = amoreAPIService.getprfrinq(prfrInqInCbcVo);
			model.addAttribute("prfrinq", prfrinq);
			
		}

		model.addAttribute("tlmcCd", "");
		
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			{//포인트거래내역조회.
				Calendar c = Calendar.getInstance();
				Date endDt = c.getTime();
				c.add(Calendar.MONTH, -1);
				Date startDt = c.getTime();
				PtTrBrkdInqOutCbcVo ptBrkd = getBtPintList("1", DateFormatUtils.format(startDt, "yyyyMMdd"), DateFormatUtils.format(endDt, "yyyyMMdd"), true, null);
				model.addAttribute("ptBrkd", ptBrkd);
				model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > M_PAGE_SIZE)? M_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
			}
			
			return "my/my-beautypoint";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			{//포인트거래내역조회.
				PtTrBrkdInqOutCbcVo ptBrkd = getBtPintList("1", null, null, false, null);
				
				if(isMobileDevice()) {
					ptBrkd.getPageVo().setPageSize(M_PAGE_SIZE + "");
					model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > M_PAGE_SIZE)? M_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
				}
				if(isPcDevice()) {
					ptBrkd.getPageVo().setPageSize(P_PAGE_SIZE + "");
					model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > P_PAGE_SIZE)? P_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
				}
				
				model.addAttribute("ptBrkd", ptBrkd);
			}
			return "my/my-beauty-point";
		}

		return null;
	}
	/**
	 * 뷰티포인트 리스트  전체 조회.
	 * @param startDt
	 * @param endDt
	 * @return
	 */
	@GetMapping("/info/beautyPointListFragment")
	@FragmentPage
	public String beautyPointListFragment(Model model, String tlmcCd, String startDt, String endDt, String date) {
		PtTrBrkdInqOutCbcVo ptBrkd = null;
		if(startDt != null && endDt != null)
			ptBrkd = getBtPintList("1", startDt.replace("-", ""), endDt.replace("-", ""), false, tlmcCd);
		else {
			if(isPcDevice())
				ptBrkd = getBtPintList("1", null, null, false, tlmcCd);
			if(isMobileDevice()) {

				Calendar c = Calendar.getInstance();
				if(date == null || "ALL".equals(date)) {
					c.set(Calendar.YEAR, 1968);
				} else if("2WEEK".equals(date)) {
					c.add(Calendar.WEEK_OF_MONTH, -2);
				} else if("1MONTH".equals(date)) {
					c.add(Calendar.MONTH, -1);
				} else if("3MONTH".equals(date)) {
					c.add(Calendar.MONTH, -3);
				} else if("6MONTH".equals(date)) {
					c.add(Calendar.MONTH, -6);
				} else if("1YEAR".equals(date)) {
					c.add(Calendar.YEAR, -1);
				}
				ptBrkd = getBtPintList("1", DateFormatUtils.format(c.getTime(), "yyyyMMdd"), DateFormatUtils.format(new Date(), "yyyyMMdd"), true, tlmcCd);
			}
		}
			
		
		if(isMobileDevice()) {
			ptBrkd.getPageVo().setPageSize(M_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > M_PAGE_SIZE)? M_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		if(isPcDevice()) {
			ptBrkd.getPageVo().setPageSize(P_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > P_PAGE_SIZE)? P_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		
		model.addAttribute("ptBrkd", ptBrkd);
		model.addAttribute("tlmcCd", tlmcCd);
		return "my/fragment/point-fragment";
	}
	/**
	 * 뷰티포인트 리스트  내용 추가.
	 * @param startDt
	 * @param endDt
	 * @return
	 */
	@GetMapping("/info/beautyPointListBodyFragment")
	@FragmentPage
	public String beautyPointListBodyFragment(Model model, String tlmcCd, String pageNumber, String startDt, String endDt, String date) {
		
		if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
			endDt = endDt.replace("-", "");
			startDt = startDt.replace("-", "");
		} else if(isMobileDevice()) {

			Calendar c = Calendar.getInstance();
			if(date == null || "ALL".equals(date)) {
				c.set(Calendar.YEAR, 1968);
			} else if("2WEEK".equals(date)) {
				c.add(Calendar.WEEK_OF_MONTH, -2);
			} else if("1MONTH".equals(date)) {
				c.add(Calendar.MONTH, -1);
			} else if("3MONTH".equals(date)) {
				c.add(Calendar.MONTH, -3);
			} else if("6MONTH".equals(date)) {
				c.add(Calendar.MONTH, -6);
			} else if("1YEAR".equals(date)) {
				c.add(Calendar.YEAR, -1);
			}
			endDt = DateFormatUtils.format(new Date(), "yyyyMMdd");
			startDt = DateFormatUtils.format(c.getTime(), "yyyyMMdd");
		}
		
		PtTrBrkdInqOutCbcVo ptBrkd = getBtPintList(pageNumber, startDt, endDt, true, tlmcCd);

		if(isMobileDevice()) {
			ptBrkd.getPageVo().setPageSize(M_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > M_PAGE_SIZE)? M_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		if(isPcDevice()) {
			ptBrkd.getPageVo().setPageSize(P_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > P_PAGE_SIZE)? P_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		
		model.addAttribute("ptBrkd", ptBrkd);
		model.addAttribute("tlmcCd", tlmcCd);
		return "my/fragment/beauty-point-body";
	}
	
	private PtTrBrkdInqOutCbcVo getBtPintList(String pageNumber, String fromDt, String toDt, boolean pageSizeEmabled, String tlmcCd) {
		PtTrBrkdInqInCbcVo ptTrBrkdInqInCbcVo = new PtTrBrkdInqInCbcVo();
		ptTrBrkdInqInCbcVo.setIncsNo(getMemberSession().getUser_incsNo());
		ptTrBrkdInqInCbcVo.setBgnTrApvlDt(fromDt);
		ptTrBrkdInqInCbcVo.setEndTrApvlDt(toDt);
		ptTrBrkdInqInCbcVo.setTlmcCd(tlmcCd);
		boolean b = false;
		
		try {
			PageVo pageVo = new PageVo();
			pageVo.setPageNumber(pageNumber);
			if(pageSizeEmabled) {
				if(isMobileDevice()) {
					pageVo.setPageSize(M_PAGE_SIZE + "");
				}
				if(isPcDevice()) {
					pageVo.setPageSize(P_PAGE_SIZE + "");
				}
			} else {
				pageVo.setPageSize("10000");
			}
			
			ptTrBrkdInqInCbcVo.setPageVo(pageVo);
		} catch(Exception e) {
			e.printStackTrace();
		}
		PtTrBrkdInqOutCbcVo ptBrkd = amoreAPIService.getpttrbrkdinq(ptTrBrkdInqInCbcVo);
		return ptBrkd;
	}
	/**
	 * 뷰티포인트 유의사항 팝업.
	 */
	@GetMapping("/beautyPoint/termForm")
	@FragmentPage
	public String beutyPointGuide() {
		if(isMobileDevice())
			return "my/fullpage-beautypoint-info";
		if(isPcDevice())
			return "my/layer-my-beauty-point";
		return null;
	}
	
	/**
	 * 뷰티포인트 카드 바코드 팝업.
	 */
	@GetMapping("/info/beutyPointCard")
	@FragmentPage
	public String beutyPointCard() {
		return "my/layer-takeout-order-barcode";
	}

	/**
	 * 포인트 선물하기 비회원 팝업.
	 */
	@GetMapping("/info/noMemberPopuop")
	@FragmentPage
	public String noMemberPopup(Model model) {

		{//포인트 조회
			CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
			vo.setIncsNo(getMemberSession().getUser_incsNo());
			vo = amoreAPIService.getptinq(vo);
			model.addAttribute("point", vo);
		}
		if(isMobileDevice()) {
			return "my/layer-point-present-02";
		}
		if(isPcDevice()) {
			return "my/layer-gift-point-02";
		}
		return null;
	}
	/**
	 * 포인트 선물하기 비회원 인증.
	 */
	@GetMapping("/info/noMemberAuthorized")
	@PageTitle(title = "포인트 선물하기 - 비회원 인증", menuId = "myPoint", subMenuId = "beautyPoint")
	public String noMemberAuthorize(Model model) {
		{//포인트 조회
			CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
			vo.setIncsNo(getMemberSession().getUser_incsNo());
			vo = amoreAPIService.getptinq(vo);
			model.addAttribute("point", vo);
		}
		if(isMobileDevice()) {
			return "my/point-present-03";
		}
		if(isPcDevice()) {
			return "my/layer-gift-point-06";
		}
		return null;
	}
	/**
	 * 포인트 선물하기 비회원 선물 확인.
	 */
	@GetMapping("/info/noMemberPresent")
	@PageTitle(title = "포인트 선물하기 - 비회원 선물하기", menuId = "myPoint", subMenuId = "beautyPoint")
	public String noMemberPresent(Model model) {
		{//포인트 조회
			CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
			vo.setIncsNo(getMemberSession().getUser_incsNo());
			vo = amoreAPIService.getptinq(vo);
			model.addAttribute("point", vo);
		}
		if(isMobileDevice()) {
			return "my/point-present-04";
		}
		if(isPcDevice()) {
			return "my/layer-gift-point-07";
		}
		return null;
	}
	/**
	 * 포인트 선물하기 선물포인트 확인.
	 */
	@GetMapping("/info/giftPointCheck")
	@PageTitle(title = "포인트 선물하기", menuId = "myPoint", subMenuId = "beautyPoint")
	public String giftPointCheck(Model model) {
		{//포인트 조회
			CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
			vo.setIncsNo(getMemberSession().getUser_incsNo());
			vo = amoreAPIService.getptinq(vo);
			model.addAttribute("point", vo);
		}
		if(isMobileDevice()) {
			return "my/point-present-05";
		}
		if(isPcDevice()) {
			return "my/layer-gift-point-04";
		}
		return null;
	}
	/**
	 * 포인트 선물하기 완료.
	 */
	@GetMapping("/info/presentComplete")
	@PageTitle(title = "포인트 선물하기", menuId = "myPoint", subMenuId = "beautyPoint")
	public String presentComplete(Model model) {
		{//포인트 조회
			CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
			vo.setIncsNo(getMemberSession().getUser_incsNo());
			vo = amoreAPIService.getptinq(vo);
			model.addAttribute("point", vo);
		}
		if(isMobileDevice()) {
			return "my/point-present-06";
		}
		if(isPcDevice()) {
			return "my/layer-gift-point-05";
		}
		return null;
	}
	/**
	 * 포인트 선물하기.
	 */
	@GetMapping("/info/pointPresent")
	@PageTitle(title = "포인트 선물하기", menuId = "myPoint", subMenuId = "beautyPoint")
	public String pointPresent(Model model) {


		{//포인트 조회
			CicueaCuPtAccmTcVo vo = new CicueaCuPtAccmTcVo();
			vo.setIncsNo(getMemberSession().getUser_incsNo());
			vo = amoreAPIService.getptinq(vo);
			model.addAttribute("point", vo);
		}

		if(isMobileDevice()) {
			return "my/point-present-01";
		}
		if(isPcDevice()) {
			return "my/layer-gift-point-03";
		}
		return null;
	}
	/**
	 * 포인트 선물하기.
	 */
	@GetMapping("/info/pointPresentPreview")
	@PageTitle(title = "포인트 선물하기")
	public String pointPresentPreview(Model model) {

		if(isMobileDevice()) {
			return "my/fullpage-beauty-point-01";
		}
		if(isPcDevice()) {
			return "my/layer-gift-point";
		}
		return null;
	}
	
	/**********************************************************************************************
	 *  2. 진주알
	 **********************************************************************************************/

	/**
	 * 진주알 선물페이지.
	 * @param model
	 * @param orderSn
	 * @return
	 */
	@GetMapping("/pearl/present")
	@PageTitle(title = "진주알", menuId = "myPoint", subMenuId = "pearl")
	public String pearlPresent(Model model, Long orderSn) {

		if(isMobileDevice()) {

			getPearlListM(model);
			return "my/pearl-01";
		}
		if(isPcDevice()) {
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(), "S", "Y", 0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			getPearlList(model, null, null, 0, P_PAGE_SIZE);
			return "my/my-pearl-gift-01";
		}
		return null;
	}
	/**
	 * 진주알 리스트  내용 추가.
	 * @param startDt
	 * @param endDt
	 * @return
	 * @throws ParseException 
	 */
	@GetMapping("/info/pearlAppendList")
	@FragmentPage
	public String pearlAppendList(Model model, int pageNumber, String startDt, String endDt) throws ParseException {
		
		SimpleDateFormat dateformat = (SimpleDateFormat) DATE_FORMAT.clone();
		if(isMobileDevice()) {

			ActivityPointHists activityPoint = pointApi.getActivityPointHists(getMemberSn(), dateformat.parse(startDt), dateformat.parse(endDt), (M_PAGE_SIZE * (pageNumber - 1)), M_PAGE_SIZE * pageNumber);
//			ActivityPointHists activityPoint = pointApi.getActivityPointHists(getMemberSn(), null, null, (M_PAGE_SIZE * (pageNumber - 1)), M_PAGE_SIZE * pageNumber);
			model.addAttribute("activityPointInfo", activityPoint);
			return "my/fragment/pearl-fragment";
		}
		if(isPcDevice()) {
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(), "S", "Y", 0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			getPearlList(model, dateformat.parse(startDt), dateformat.parse(endDt), (P_PAGE_SIZE * (pageNumber - 1)), P_PAGE_SIZE * pageNumber);
			return "my/fragment/pearl-fragment";
		}
		return null;
	}
	
	@GetMapping("/pearl/receive")
	@PageTitle(title = "진주알", menuId = "myPoint", subMenuId = "pearl")
	public String pearlReceive(Model model, Long orderSn) {
		if(isMobileDevice()) {

			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(), "S", "Y", 0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			getPearlListM(model);
			return "my/pearl-02";
		}
		if(isPcDevice()) {
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(), "S", "Y", 0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			getPearlList(model, null, null, 0, P_PAGE_SIZE);
			return "my/my-pearl-gift-02";
		}
		return null;
	}
	
	private void getPearlList(Model model, Date fromDt, Date toDt, int offset, int limit) {
		ActivityPointHists activityPoint = pointApi.getActivityPointHists(getMemberSn(), fromDt, toDt, offset, limit);
		model.addAttribute("activityPointInfo", activityPoint);
	}
	private void getPearlListM(Model model) {
		Calendar c = Calendar.getInstance();
		Date toDt = c.getTime();
		c.add(Calendar.MONTH, -1);
		Date fromDt = c.getTime();
		getPearlList(model, fromDt, toDt, 0, M_PAGE_SIZE);
	}

	/**********************************************************************************************
	 *  3. 진주알 쿠폰 교환
	 **********************************************************************************************/


	@GetMapping("/pearl/salesCushion")
	@PageTitle(title = "진주알")
	@FragmentPage
	public String pearlSalesCushion(Model model) {
		if(isMobileDevice()) {
			return "my/pearl-03";
		}
		if(isPcDevice()) {
			return "my/layer-pearl-gift-01";
		}
		return null;
	}
	
	@GetMapping("/pearl/deliveryCushion")
	@PageTitle(title = "진주알", menuId = "myPoint", subMenuId = "pearl")
	public String pearlDeliveryCushion(Model model) {
		if(isMobileDevice()) {
			return "my/pearl-04";
		}
		return null;
	}

	/**********************************************************************************************
	 *  4. 쿠션포인트
	 **********************************************************************************************/

	@GetMapping("/cushion")
	@PageTitle(title = "쿠션포인트", menuId = "myPoint", subMenuId = "cushion")
	public String cushion(Model model) {
		if(isMobileDevice()) {
			return "my/cushion-01";
		}
		if(isPcDevice()) {
			return "my/my-cushion-point-01";
		}
		return null;
	}
	
}
