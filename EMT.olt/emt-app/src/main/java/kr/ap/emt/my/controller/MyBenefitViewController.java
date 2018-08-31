package kr.ap.emt.my.controller;

import kr.ap.comm.api.vo.PageVo;
import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.api.pos.POSApiService;
import kr.ap.emt.api.pos.vo.CustCstmAmt;
import kr.ap.emt.api.pos.vo.CustGradeDetail;
import net.g1project.ecp.api.model.sales.coupon.MemberKeepingCouponCount;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;

/**
 * 나의 혜택 관리
 *
 * 1. 나의 쿠폰
 * 2. 나의 회원등급
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyBenefitViewController extends AbstractController {

	private SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	private static final int M_PAGE_SIZE = 5;
	private static final int P_PAGE_SIZE = 10;
	
	@Autowired
	private POSApiService posService;

	/**********************************************************************************************
	 *  1. 나의 쿠폰
	 **********************************************************************************************/
	/**
	 * 사용 가능한 쿠폰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myCouponList")
	@PageTitle(title = "나의 쿠폰" , menuId = "myBenefit", subMenuId = "myCoupon")
	public String myCouponList(Model model) {

		//종료된쿠폰최대조회기간 90일
		MemberKeepingCouponCount memberKeepingCouponsCount = couponApi.getMemberKeepingCouponsCount(getMemberSn(), 90L);
		model.addAttribute("availCnt", memberKeepingCouponsCount.getAvailCnt());
		model.addAttribute("expCnt", memberKeepingCouponsCount.getExpCnt());

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-coupon-01";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-benefit-coupon-01";
		}

		return null;
	}

	/**
	 * 사용/만료 쿠폰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myUsedCouponList")
	@PageTitle(title = "나의 쿠폰" , menuId = "myBenefit", subMenuId = "myCoupon")
	public String myUsedCouponList(Model model) {

		//종료된쿠폰최대조회기간 90일
		MemberKeepingCouponCount memberKeepingCouponsCount = couponApi.getMemberKeepingCouponsCount(getMemberSn(), 90L);
		model.addAttribute("availCnt", memberKeepingCouponsCount.getAvailCnt());
		model.addAttribute("expCnt", memberKeepingCouponsCount.getExpCnt());

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-coupon-02";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-benefit-coupon-02";
		}

		return null;
	}


	/**********************************************************************************************
	 *  2. 나의 회원등급
	 **********************************************************************************************/
	/**
	 * 회원등급 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myLevelList")
	@PageTitle(title = "나의 회원 등급" , menuId = "myBenefit", subMenuId = "myLevel")
	public String myReviewList(Model model) {

		String onOffNum = getMemberSession().getMember().getPosMemberIdentifier();
		//회원등급정보
		CustCstmAmt custCstmAmt = null;
		try {
			custCstmAmt = posService.getCustCstmAmt(onOffNum); //posService.getCustCstmAmt(onOffNum);
		} catch(Exception e) {
			custCstmAmt = new CustCstmAmt();
			custCstmAmt.setCstmlvlNm(getMemberSession().getMember().getMemberLevelName());
		}
		model.addAttribute("custCstmAmt", custCstmAmt);

		Calendar c = Calendar.getInstance();
		c.add(Calendar.YEAR, -20);
		CustGradeDetail custGradeDetail = null;
		if(isMobileDevice()) {

			try {
				custGradeDetail = posService.getCustGradeDetailList(onOffNum, c.getTime(), new Date(), "ALL", 0, M_PAGE_SIZE);
				model.addAttribute("custGradeDetail", custGradeDetail);
				
				PageVo p = new PageVo();
				p.setPageNumber("1");
				p.setPageSize(M_PAGE_SIZE + "");
				p.setTotalRowCount(custGradeDetail.getCustGradeCnt() + "");
				
				model.addAttribute("pageNo", p);
				
			} catch(Exception e) {
				
			}
		}
		
		if(isPcDevice()) {

			try {
				custGradeDetail = posService.getCustGradeDetailList(onOffNum, c.getTime(), new Date(), "ALL", 0, P_PAGE_SIZE);
				model.addAttribute("custGradeDetail", custGradeDetail);
				
			} catch(Exception e) {
			}
		}
		if(custGradeDetail == null) {
			custGradeDetail = new CustGradeDetail();
			custGradeDetail.setCustGradeList(Collections.EMPTY_LIST);
			custGradeDetail.setCustGradeCnt(0);
			model.addAttribute("custGradeDetail", custGradeDetail);
		}

		PageVo p = new PageVo();
		p.setPageNumber("1");
		if(isMobileDevice())
			p.setPageSize(M_PAGE_SIZE + "");
		if(isPcDevice())
			p.setPageSize(P_PAGE_SIZE + "");
		
		p.setTotalRowCount(custGradeDetail.getCustGradeCnt() + "");
		
		model.addAttribute("pageVo", p);
		
		String cstmlvlNst = null;
		switch (custCstmAmt.getCstmlvlNm().toUpperCase()) {
			case "GUEST" :
				cstmlvlNst = "Hello";
				break;
			case "HELLO" :
				custCstmAmt.setCstmlvlNm("Hello");
				cstmlvlNst = "Friends";
				break;
			case "FRIENDS" :
				custCstmAmt.setCstmlvlNm("Friends");
				cstmlvlNst = "Pink Love";
				break;
			case "PINK LOVE" :
				custCstmAmt.setCstmlvlNm("Pink Love");
				cstmlvlNst = null;
				break;
			default:
				break;
		}
		model.addAttribute("cstmlvlNst", cstmlvlNst);

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-grade";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-member-class-01";
		}

		return null;
	}

	/**
	 * 회원등급 목록
	 *
	 * @param model
	 * @return
	 * @throws ParseException 
	 */
	@GetMapping("/myLevelListFragment")
	@FragmentPage
	public String myReviewList(Model model, Integer pageNumber, String startDt, String endDt, String searchGbn) throws ParseException {
		String onOffNum = getMemberSession().getMember().getPosMemberIdentifier();
		if(pageNumber == null) pageNumber = 1;
		
		if(searchGbn == null) searchGbn = "ALL";
		
		CustGradeDetail custGradeDetail = null;
		
		try {
			
			if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
				SimpleDateFormat format = (SimpleDateFormat) DATE_FORMAT.clone();
				if(isMobileDevice()) {
	
					custGradeDetail = posService.getCustGradeDetailList(onOffNum, format.parse(startDt), format.parse(endDt), searchGbn, (pageNumber - 1) * M_PAGE_SIZE + 1, pageNumber * M_PAGE_SIZE);
					model.addAttribute("custGradeDetail", custGradeDetail);
					
				}
				if(isPcDevice()) {
	
					custGradeDetail = posService.getCustGradeDetailList(onOffNum, format.parse(startDt), format.parse(endDt), searchGbn, (pageNumber - 1) * P_PAGE_SIZE + 1, pageNumber * P_PAGE_SIZE);
					model.addAttribute("custGradeDetail", custGradeDetail);
					
				}
			} else {
	
				Calendar c = Calendar.getInstance();
				c.add(Calendar.YEAR, -20);
				
				if(isMobileDevice()) {
	
					try {
						custGradeDetail = posService.getCustGradeDetailList(onOffNum, c.getTime(), new Date(), searchGbn, (pageNumber - 1) * M_PAGE_SIZE + 1, pageNumber * M_PAGE_SIZE);
						model.addAttribute("custGradeDetail", custGradeDetail);
						
					} catch(Exception e) {
						
					}
				}
				
				if(isPcDevice()) {
	
					try {
						custGradeDetail = posService.getCustGradeDetailList(onOffNum, c.getTime(), new Date(), searchGbn, (pageNumber - 1) * P_PAGE_SIZE + 1, pageNumber * P_PAGE_SIZE);
						model.addAttribute("custGradeDetail", custGradeDetail);
						
					} catch(Exception e) {
					}
				}
			}
		} catch(Exception e) {
			
		}
		

		if(custGradeDetail == null) {
			custGradeDetail = new CustGradeDetail();
			custGradeDetail.setCustGradeList(Collections.EMPTY_LIST);
			custGradeDetail.setCustGradeCnt(0);
			model.addAttribute("custGradeDetail", custGradeDetail);
		}

		PageVo p = new PageVo();
		p.setPageNumber(pageNumber + "");
		if(isMobileDevice())
			p.setPageSize(M_PAGE_SIZE + "");
		if(isPcDevice())
			p.setPageSize(P_PAGE_SIZE + "");
		
		p.setTotalRowCount(custGradeDetail.getCustGradeCnt() + "");
		
		model.addAttribute("pageVo", p);
		
		return "my/fragment/grade-fragment";
	}
}
