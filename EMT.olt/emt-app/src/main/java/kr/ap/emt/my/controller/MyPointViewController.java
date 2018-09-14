package kr.ap.emt.my.controller;

import kr.ap.comm.api.vo.*;
import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.BeautyPointSummary;
import kr.ap.comm.member.vo.CushionPointSummary;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import kr.ap.comm.util.SessionUtils;
import kr.ap.emt.api.pos.POSApiService;
import kr.ap.emt.api.pos.vo.Cushin;
import kr.ap.emt.api.pos.vo.CustCushinPoint;
import kr.ap.emt.api.pos.vo.CustCushinUseList;
import net.g1project.ecp.api.model.sales.coupon.DownloadCoupons;
import net.g1project.ecp.api.model.sales.point.ActivityPointGift;
import net.g1project.ecp.api.model.sales.point.ActivityPointHists;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.websocket.Session;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
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

	@Autowired
	private POSApiService posService;
	
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
	public String beautyPoint(final HttpServletRequest request, Model model) {
		//뷰티포인트 정보 갱신을 위해 기존 데이터 클리어
		SessionUtils.clearBeautyPoint(request);

		String userIncsNo = getMemberSession().getUser_incsNo();
		
		{//포인트 조회
			model.addAttribute("point", SessionUtils.getBeautyPoint(request, this.pointApi));
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
			prfrInqInCbcVo.setChCd(APConstant.EH_CH_CD);
			PrfrInqOutCbcVo prfrinq = amoreAPIService.getprfrinq(prfrInqInCbcVo);
			model.addAttribute("prfrinq", prfrinq);
			
		}

		
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			{//포인트거래내역조회.
				Calendar c = Calendar.getInstance();
				Date endDt = c.getTime();
				c.add(Calendar.MONTH, -1);
				Date startDt = c.getTime();
				PtTrBrkdInqOutCbcVo ptBrkd = getBtPintList("1", DateFormatUtils.format(startDt, "yyyyMMdd"), DateFormatUtils.format(endDt, "yyyyMMdd"), false);
				model.addAttribute("ptBrkd", ptBrkd);
				model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > M_PAGE_SIZE)? M_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
			}
			
			return "my/beauty-point-list";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			{//포인트거래내역조회.
				PtTrBrkdInqOutCbcVo ptBrkd = getBtPintList("1", null, null, false);
				
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
			return "my/beauty-point";
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
	public String beautyPointListFragment(Model model, String startDt, String endDt) {
		PtTrBrkdInqOutCbcVo ptBrkd = getBtPintList("1", startDt.replace("-", ""), endDt.replace("-", ""), false);

		if(isMobileDevice()) {
			ptBrkd.getPageVo().setPageSize(M_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > M_PAGE_SIZE)? M_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		if(isPcDevice()) {
			ptBrkd.getPageVo().setPageSize(P_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > P_PAGE_SIZE)? P_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		
		model.addAttribute("ptBrkd", ptBrkd);
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
	public String beautyPointListBodyFragment(Model model, String pageNumber, String startDt, String endDt) {
		
		if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
			endDt = endDt.replace("-", "");
			startDt = startDt.replace("-", "");
		} else if(isMobileDevice()) {
			Calendar c = Calendar.getInstance();
			Date end = c.getTime();
			endDt = DateFormatUtils.format(end, "yyyyMMdd");
			c.add(Calendar.MONTH, -1);
			Date start = c.getTime();
			startDt = DateFormatUtils.format(start, "yyyyMMdd");
		}
		
		PtTrBrkdInqOutCbcVo ptBrkd = getBtPintList(pageNumber, startDt, endDt, true);

		if(isMobileDevice()) {
			ptBrkd.getPageVo().setPageSize(M_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > M_PAGE_SIZE)? M_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		if(isPcDevice()) {
			ptBrkd.getPageVo().setPageSize(P_PAGE_SIZE + "");
			model.addAttribute("curSize", (Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount()) > P_PAGE_SIZE)? P_PAGE_SIZE : ptBrkd.getPageVo().getTotalRowCount());
		}
		
		model.addAttribute("ptBrkd", ptBrkd);
		return "my/fragment/beauty-point-body";
	}
	
	private PtTrBrkdInqOutCbcVo getBtPintList(String pageNumber, String fromDt, String toDt, boolean pageSizeEmabled) {
		PtTrBrkdInqInCbcVo ptTrBrkdInqInCbcVo = new PtTrBrkdInqInCbcVo();
		ptTrBrkdInqInCbcVo.setIncsNo(getMemberSession().getUser_incsNo());
		ptTrBrkdInqInCbcVo.setBgnTrApvlDt(fromDt);
		ptTrBrkdInqInCbcVo.setEndTrApvlDt(toDt);
		boolean b = false;
		if(b && (fromDt != null || toDt != null)) {//TODO 날짜가 들어갈 때 날짜가 역순으로 와서 임시처리로직 추가.
			if(pageSizeEmabled) { 
				int t = getTotalSize();
				int s = isMobileDevice()? M_PAGE_SIZE:P_PAGE_SIZE;
				int n = Integer.parseInt(pageNumber);
				int r = t%s;
				int x = (t/s) + (r != 0? 1: 0) - (n - 1);

			
				if(x <= 0) {
					PtTrBrkdInqOutCbcVo ptBrkd = getBtPintListReal(fromDt, toDt, n, s);
					return ptBrkd;
				}
				
				if(r == 0) {
					PtTrBrkdInqOutCbcVo ptBrkd = getBtPintListReal(fromDt, toDt, x, s);
					ptBrkd.getPageVo().setPageNumber(pageNumber);
					ptBrkd = reverse(ptBrkd);
					return ptBrkd;
				}
	
				PtTrBrkdInqOutCbcVo ptBrkd = getBtPintListReal(fromDt, toDt, x, s);
				if(x != 1) {
					PtTrBrkdInqOutCbcVo ptBrkd2 = getBtPintListReal(fromDt, toDt, x - 1, s);
					ptBrkd2.getPtTrBrkdInqVo().addAll(ptBrkd.getPtTrBrkdInqVo());
					ptBrkd = ptBrkd2;
					ptBrkd.setPtTrBrkdInqVo(ptBrkd.getPtTrBrkdInqVo().subList(r, (r + s)));
				} else {
					ptBrkd.setPtTrBrkdInqVo(ptBrkd.getPtTrBrkdInqVo().subList(0, r));
				}
	
				ptBrkd.getPageVo().setPageNumber(pageNumber);
				ptBrkd = reverse(ptBrkd);
				return ptBrkd;
			

			} else {
				PtTrBrkdInqOutCbcVo ptBrkd = getBtPintListReal(fromDt, toDt, 1, 10000);
				ptBrkd = reverse(ptBrkd);
				return ptBrkd;
				
			}
		}
		
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
	//TODO 날짜가 들어갈 때 날짜가 역순으로 와서 임시처리로직 추가.
	private PtTrBrkdInqOutCbcVo reverse(PtTrBrkdInqOutCbcVo ptBrkd) {
		List<PtTrBrkdInqVo> list = ptBrkd.getPtTrBrkdInqVo();
		Collections.reverse(list);
		return ptBrkd;
	}
	//TODO 날짜가 들어갈 때 날짜가 역순으로 와서 임시처리로직 추가.
	private PtTrBrkdInqOutCbcVo getBtPintListReal(String fromDt, String toDt,
			int x, int s) {
		PtTrBrkdInqInCbcVo ptTrBrkdInqInCbcVo = new PtTrBrkdInqInCbcVo();
		ptTrBrkdInqInCbcVo.setIncsNo(getMemberSession().getUser_incsNo());
		ptTrBrkdInqInCbcVo.setBgnTrApvlDt(fromDt);
		ptTrBrkdInqInCbcVo.setEndTrApvlDt(toDt);

		try {
			PageVo pageVo = new PageVo();
			pageVo.setPageNumber(x + "");
			pageVo.setPageSize(s + "");
			
			ptTrBrkdInqInCbcVo.setPageVo(pageVo);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		PtTrBrkdInqOutCbcVo ptBrkd = amoreAPIService.getpttrbrkdinq(ptTrBrkdInqInCbcVo);
		return ptBrkd;
	}
	//TODO 날짜가 들어갈 때 날짜가 역순으로 와서 임시처리로직 추가.
	private int getTotalSize() {
		PtTrBrkdInqInCbcVo ptTrBrkdInqInCbcVo = new PtTrBrkdInqInCbcVo();
		ptTrBrkdInqInCbcVo.setIncsNo(getMemberSession().getUser_incsNo());

		try {
			PageVo pageVo = new PageVo();
			pageVo.setPageNumber("1");
			pageVo.setPageSize("1");
			
			ptTrBrkdInqInCbcVo.setPageVo(pageVo);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
		PtTrBrkdInqOutCbcVo ptBrkd = amoreAPIService.getpttrbrkdinq(ptTrBrkdInqInCbcVo);
		return Integer.parseInt(ptBrkd.getPageVo().getTotalRowCount());
	}
	/**
	 * 뷰티포인트 유의사항 팝업.
	 */
	@GetMapping("/info/beutyPointGuide1")
	@FragmentPage
	public String beutyPointGuide() {
		return "my/layer-beauty-point-02";
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
	public String noMemberPopup(final HttpServletRequest request, Model model) {

		{//포인트 조회
			model.addAttribute("point", SessionUtils.getBeautyPoint(request, this.pointApi));
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
	public String noMemberAuthorize(final HttpServletRequest request, Model model) {

		{//포인트 조회
			model.addAttribute("point", SessionUtils.getBeautyPoint(request, this.pointApi));
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
	public String noMemberPresent(final HttpServletRequest request, Model model) {

		{//포인트 조회
			model.addAttribute("point", SessionUtils.getBeautyPoint(request, this.pointApi));
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
	public String giftPointCheck(final HttpServletRequest request, Model model) {

		{//포인트 조회
			model.addAttribute("point", SessionUtils.getBeautyPoint(request, this.pointApi));
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
	public String presentComplete(final HttpServletRequest request, Model model) {
		//뷰티포인트 선물완료 후 뷰티포인트 갱신
		SessionUtils.clearBeautyPoint(request);

		{//포인트 조회
			model.addAttribute("point", SessionUtils.getBeautyPoint(request, this.pointApi));
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
	public String pointPresent(final HttpServletRequest request, Model model) {
		//뷰티포인트 선물하기 진입 시점에 뷰티포인트 갱신
		SessionUtils.clearBeautyPoint(request);

		{//포인트 조회
			model.addAttribute("point", SessionUtils.getBeautyPoint(request, this.pointApi));
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
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(), 0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			getPearlList(model, null, null, 0, P_PAGE_SIZE);
			return "my/my-pearl-gift-01";
		}
		return null;
	}
	/**
	 * 진주알 리스트 전체갱신.
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
			ActivityPointHists activityPoint = null;
			if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
				Calendar c = Calendar.getInstance();
				Date d = dateformat.parse(endDt);
				c.setTime(d);
				c.set(Calendar.HOUR_OF_DAY, c.getMaximum(Calendar.HOUR_OF_DAY));
				c.set(Calendar.MINUTE,      c.getMaximum(Calendar.MINUTE));
				c.set(Calendar.SECOND,      c.getMaximum(Calendar.SECOND));
				c.set(Calendar.MILLISECOND, c.getMaximum(Calendar.MILLISECOND));
				activityPoint = pointApi.getActivityPointHists(getMemberSn(), dateformat.parse(startDt), c.getTime(), (M_PAGE_SIZE * (pageNumber - 1)), M_PAGE_SIZE);
				
			} else {
				Calendar c = Calendar.getInstance();
				Date toDt = c.getTime();
				c.add(Calendar.MONTH, -1);
				Date fromDt = c.getTime();
				activityPoint = pointApi.getActivityPointHists(getMemberSn(), fromDt, toDt, (M_PAGE_SIZE * (pageNumber - 1)), M_PAGE_SIZE);
			}
			model.addAttribute("activityPointInfo", activityPoint);
			return "my/fragment/pearl-fragment";
		}
		if(isPcDevice()) {
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(), 0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
				Calendar c = Calendar.getInstance();
				Date d = dateformat.parse(endDt);
				c.setTime(d);
				c.set(Calendar.HOUR_OF_DAY, c.getMaximum(Calendar.HOUR_OF_DAY));
				c.set(Calendar.MINUTE,      c.getMaximum(Calendar.MINUTE));
				c.set(Calendar.SECOND,      c.getMaximum(Calendar.SECOND));
				c.set(Calendar.MILLISECOND, c.getMaximum(Calendar.MILLISECOND));
				getPearlList(model, dateformat.parse(startDt), c.getTime(), (P_PAGE_SIZE * (pageNumber - 1)), P_PAGE_SIZE);
				
			} else
				getPearlList(model, null, null, (P_PAGE_SIZE * (pageNumber - 1)), P_PAGE_SIZE);
				
			return "my/fragment/pearl-fragment";
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
	@GetMapping("/info/pearlAppendListTable")
	@FragmentPage
	public String pearlAppendListTable(Model model, int pageNumber, String startDt, String endDt) throws ParseException {
		
		SimpleDateFormat dateformat = (SimpleDateFormat) DATE_FORMAT.clone();
		if(isMobileDevice()) {

			ActivityPointHists activityPoint = null;
			if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
				Calendar c = Calendar.getInstance();
				Date d = dateformat.parse(endDt);
				c.setTime(d);
				c.set(Calendar.HOUR_OF_DAY, c.getMaximum(Calendar.HOUR_OF_DAY));
				c.set(Calendar.MINUTE,      c.getMaximum(Calendar.MINUTE));
				c.set(Calendar.SECOND,      c.getMaximum(Calendar.SECOND));
				c.set(Calendar.MILLISECOND, c.getMaximum(Calendar.MILLISECOND));
				activityPoint = pointApi.getActivityPointHists(getMemberSn(), dateformat.parse(startDt), c.getTime(), (M_PAGE_SIZE * (pageNumber - 1)), M_PAGE_SIZE);
				
			} else {
				Calendar c = Calendar.getInstance();
				Date toDt = c.getTime();
				c.add(Calendar.MONTH, -1);
				Date fromDt = c.getTime();
				activityPoint = pointApi.getActivityPointHists(getMemberSn(), fromDt, toDt, (M_PAGE_SIZE * (pageNumber - 1)), M_PAGE_SIZE);
			}
			model.addAttribute("activityPointInfo", activityPoint);
			return "my/fragment/pearl-fragment-body";
		}
		if(isPcDevice()) {
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(), 0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
				Calendar c = Calendar.getInstance();
				Date d = dateformat.parse(endDt);
				c.setTime(d);
				c.set(Calendar.HOUR_OF_DAY, c.getMaximum(Calendar.HOUR_OF_DAY));
				c.set(Calendar.MINUTE,      c.getMaximum(Calendar.MINUTE));
				c.set(Calendar.SECOND,      c.getMaximum(Calendar.SECOND));
				c.set(Calendar.MILLISECOND, c.getMaximum(Calendar.MILLISECOND));
				getPearlList(model, dateformat.parse(startDt), c.getTime(), (P_PAGE_SIZE * (pageNumber - 1)), P_PAGE_SIZE);
				
			} else
				getPearlList(model, null, null, (P_PAGE_SIZE * (pageNumber - 1)), P_PAGE_SIZE);
				
			return "my/fragment/pearl-fragment";
		}
		return null;
	}
	
	@GetMapping("/pearl/receive")
	@PageTitle(title = "진주알", menuId = "myPoint", subMenuId = "pearl")
	public String pearlReceive(Model model, Long orderSn) {

		if(isMobileDevice()) {
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(),0, 100);
			model.addAttribute("pointGiftList", pointGiftList);
			getPearlListM(model);
			return "my/pearl-02";
		}
		if(isPcDevice()) {
			List<ActivityPointGift> pointGiftList = pointApi.getActivityPointGift(getMemberSn(),0, 100);
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
		
		List<DownloadCoupons> list = couponApi.getActivityPointExchOnlyCoupons(getMemberSn());
		ActivityPointHists activityPoint = pointApi.getActivityPointHists(getMemberSn(), null, null, 0, 1);
		model.addAttribute("list", list);
		model.addAttribute("activityPointInfo", activityPoint);
		
		if(isMobileDevice()) {
			return "my/pearl-03";
		}
		if(isPcDevice()) {
			return "my/my-pearl-coupon";
		}
		return null;
	}
	
	@GetMapping("/pearl/deliveryCushion")
	@PageTitle(title = "진주알", menuId = "myPoint", subMenuId = "pearl")
	public String pearlDeliveryCushion(Model model) {
		List<DownloadCoupons> list = couponApi.getActivityPointExchOnlyCoupons(getMemberSn());
		ActivityPointHists activityPoint = pointApi.getActivityPointHists(getMemberSn(), null, null, 0, 1);
		model.addAttribute("list", list);
		model.addAttribute("activityPointInfo", activityPoint);
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
	public String cushion(final HttpServletRequest request, Model model) {
		Calendar c = Calendar.getInstance();
		String onOffNum = getMemberSession().getUser_incsNo();
		MemberSession memberSession = getMemberSession();

		final CushionPointSummary cushionPoint = SessionUtils.refreshCushionPoint(request, this.pointApi);
		model.addAttribute("cushin", cushionPoint);
		if(isMobileDevice()) {
			c.add(Calendar.MONTH, -1);
			CustCushinUseList listVo = posService.getCustCushinUseDetailList(onOffNum, c.getTime(), new Date(), 1, 10000);
			if(!"FAIL".equals(listVo.getRsltCd()))
				calculSum(model, listVo, 1);
			else {
				model.addAttribute("listVo", listVo.getCushinList());
				createPageInfo(model, listVo, 1);
				model.addAttribute("savePoint", 0);
				model.addAttribute("usingPoint", 0);
			}
			return "my/cushion-01";
		}
		if(isPcDevice()) {
			c.add(Calendar.YEAR, -20);
			CustCushinUseList listVo = posService.getCustCushinUseDetailList(onOffNum, c.getTime(), new Date(), 1, 10000);
			if(!"FAIL".equals(listVo.getRsltCd()))
				calculSum(model, listVo, 1);
			else {
				model.addAttribute("listVo", listVo.getCushinList());
				createPageInfo(model, listVo, 1);
				model.addAttribute("savePoint", 0);
				model.addAttribute("usingPoint", 0);
			}
			return "my/my-cushion-point-01";
		}
		return null;
	}
	@GetMapping("/cushion/cushionPointFragment")
	@FragmentPage
	public String cushionPointFragment(Model model, String startDt, String endDt) {
		Calendar c = Calendar.getInstance();
		SimpleDateFormat format = (SimpleDateFormat) DATE_FORMAT.clone();
		String onOffNum = getMemberSession().getUser_incsNo();
		
		if(isMobileDevice()) {
			if(startDt == null || endDt == null || startDt.isEmpty() || endDt.isEmpty()) {
				c.add(Calendar.MONTH, -1);
				CustCushinUseList listVo = posService.getCustCushinUseDetailList(onOffNum, c.getTime(), new Date(), 1, 10000);
				if(!"FAIL".equals(listVo.getRsltCd()))
					calculSum(model, listVo, 1);
				else {
					model.addAttribute("listVo", listVo.getCushinList());
					createPageInfo(model, listVo, 1);
					model.addAttribute("savePoint", 0);
					model.addAttribute("usingPoint", 0);
				}
			} else {
				CustCushinUseList listVo;
				try {
					listVo = posService.getCustCushinUseDetailList(onOffNum, format.parse(startDt), format.parse(endDt), 1, 10000);
					if(!"FAIL".equals(listVo.getRsltCd()))
						calculSum(model, listVo, 1);
					else {
						model.addAttribute("listVo", listVo.getCushinList());
						createPageInfo(model, listVo, 1);
						model.addAttribute("savePoint", 0);
						model.addAttribute("usingPoint", 0);
					}
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			return "my/fragment/cushion-point-fragment";
		}
		if(isPcDevice()) {
			if(startDt == null || endDt == null || startDt.isEmpty() || endDt.isEmpty()) {
				c.add(Calendar.YEAR, -20);
				CustCushinUseList listVo = posService.getCustCushinUseDetailList(onOffNum, c.getTime(), new Date(), 1, 10000);
				if(!"FAIL".equals(listVo.getRsltCd()))
					calculSum(model, listVo, 1);
				else {
					model.addAttribute("listVo", listVo.getCushinList());
					createPageInfo(model, listVo, 1);
					model.addAttribute("savePoint", 0);
					model.addAttribute("usingPoint", 0);
				}
			} else {
				CustCushinUseList listVo;
				try {
					listVo = posService.getCustCushinUseDetailList(onOffNum, format.parse(startDt), format.parse(endDt), 1, 10000);
					if(!"FAIL".equals(listVo.getRsltCd()))
						calculSum(model, listVo, 1);
					else {
						model.addAttribute("listVo", listVo.getCushinList());
						createPageInfo(model, listVo, 1);
						model.addAttribute("savePoint", 0);
						model.addAttribute("usingPoint", 0);
					}
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			return "my/fragment/cushion-point-fragment";
		}
		return null;
	}

	@GetMapping("/cushion/cushionPointBodyFragment")
	@FragmentPage
	public String cushionPointBodyFragment(Model model, int pageNumber, String startDt, String endDt) {
		Calendar c = Calendar.getInstance();
		SimpleDateFormat format = (SimpleDateFormat) DATE_FORMAT.clone();
		String onOffNum = getMemberSession().getUser_incsNo();
		
		if(isMobileDevice()) {
			if(startDt == null || endDt == null || startDt.isEmpty() || endDt.isEmpty()) {
				c.add(Calendar.MONTH, -1);
				CustCushinUseList listVo = posService.getCustCushinUseDetailList(onOffNum, c.getTime(), new Date(), (pageNumber - 1) * M_PAGE_SIZE + 1, pageNumber * M_PAGE_SIZE);
				calculSum(model, listVo, 1);
			} else {
				CustCushinUseList listVo;
				try {
					listVo = posService.getCustCushinUseDetailList(onOffNum, format.parse(startDt), format.parse(endDt), (pageNumber - 1) * M_PAGE_SIZE + 1, pageNumber * M_PAGE_SIZE);
					model.addAttribute("listVo", listVo.getCushinList());
					createPageInfo(model, listVo, pageNumber);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			return "my/fragment/cushion-point-body";
		}
		if(isPcDevice()) {
			if(startDt == null || endDt == null || startDt.isEmpty() || endDt.isEmpty()) {
				c.add(Calendar.YEAR, -20);
				CustCushinUseList listVo = posService.getCustCushinUseDetailList(onOffNum, c.getTime(), new Date(), (pageNumber - 1) * P_PAGE_SIZE + 1, pageNumber * P_PAGE_SIZE);
				model.addAttribute("listVo", listVo.getCushinList());
				createPageInfo(model, listVo, pageNumber);
			} else {
				CustCushinUseList listVo;
				try {
					listVo = posService.getCustCushinUseDetailList(onOffNum, format.parse(startDt), format.parse(endDt), (pageNumber - 1) * P_PAGE_SIZE + 1, pageNumber * P_PAGE_SIZE);
					model.addAttribute("listVo", listVo.getCushinList());
					createPageInfo(model, listVo, pageNumber);
				} catch (ParseException e) {
					e.printStackTrace();
				}
			}
			return "my/fragment/cushion-point-body";
		}
		return null;
	}
	
	private void calculSum(Model model, CustCushinUseList listVo, int pageNum) {
		int savePoint = 0;
		int usingPoint = 0;
		for (Cushin cushin : listVo.getCushinList()) {
			if(cushin.getAccumptPoint() > 0) {
				savePoint += cushin.getAccumptPoint();
			} else {
				usingPoint += cushin.getAccumptPoint();
			}
			if(cushin.getRdmptPoint() > 0) {
				savePoint += cushin.getRdmptPoint();
			} else {
				usingPoint += cushin.getRdmptPoint();
			}
		}
		model.addAttribute("listVo", listVo.getCushinList());
		model.addAttribute("savePoint", savePoint);
		model.addAttribute("usingPoint", usingPoint);
		

		createPageInfo(model, listVo, pageNum);
	}
	
	private void createPageInfo(Model model, CustCushinUseList listVo,
			int pageNum) {
		PageVo pageVo = new PageVo();
		pageVo.setTotalRowCount(listVo.getCushinCnt() + "");
		if(isMobileDevice())
			pageVo.setPageSize(M_PAGE_SIZE + "");
		if(isPcDevice())
			pageVo.setPageSize(P_PAGE_SIZE + "");
		pageVo.setPageNumber(pageNum + "");
		model.addAttribute("pageVo", pageVo);
	}
	
}
