package kr.ap.amt.my.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;

import kr.ap.comm.api.vo.PageVo;
import kr.ap.comm.api.vo.PtTrBrkdInqOutCbcVo;
import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.client.sales.GiftcardApi;
import net.g1project.ecp.api.client.sales.GuideApi;
import net.g1project.ecp.api.model.sales.deposits.DepositHistoriesResult;
import net.g1project.ecp.api.model.sales.deposits.DepositRefundAccount;
import net.g1project.ecp.api.model.sales.giftcard.Giftcard;
import net.g1project.ecp.api.model.sales.giftcard.GiftcardCouponResult;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * 4. 기프트카드 관리
 * 6. One Pay 카드관리
 * 7. 예치금/계좌 관리
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyWalletViewController extends AbstractController {
	
	private SimpleDateFormat DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
	private static final int M_PAGE_SIZE = 100;
	private static final int P_PAGE_SIZE = 10;
    
    @Autowired
    protected GiftcardApi giftcardApi;
	
	/**********************************************************************************************
	 * 4. 기프트카드 관리
	 **********************************************************************************************/


	/**
	 * 기프트카드 관리
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myGiftCardList")
	@PageTitle(title = "기프트카드")
	public String myGistCard(Model model) {
		int pageSize = 10;
		if(isPcDevice()) pageSize = P_PAGE_SIZE;
		if(isMobileDevice()) pageSize = M_PAGE_SIZE;
		
		GiftcardCouponResult giftcardResult = giftcardApi.getCoupon();
		GiftcardCouponResult result2 = giftcardApi.listCoupon("valid", 1, pageSize);
		model.addAttribute("giftcardSummary", giftcardResult);
		if(result2.getLists() != null)
			model.addAttribute("giftcardList", result2.getLists().getValidList());
		else
			model.addAttribute("giftcardList", Collections.EMPTY_LIST);
			
		
		PageVo pageVo = new PageVo();
		pageVo.setPageSize(pageSize + "");
		pageVo.setPageNumber("1");
		pageVo.setTotalRowCount((giftcardResult.getValidCount() == null? 0 : giftcardResult.getValidCount() == null) + "");

		model.addAttribute("pageVo", pageVo);
		
		if(isPcDevice())
			return "my/my-gift-card";
		if(isMobileDevice())
			return "my/my-giftcard";
		return null;
		
	}
	/**
	 * 예치금 관리
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myGistCardFragment")
	@FragmentPage
	public String myGistCardFragment(Model model, String op, int pageNumber) {

		int pageSize = 10;
		if(isPcDevice()) pageSize = P_PAGE_SIZE;
		if(isMobileDevice()) pageSize = M_PAGE_SIZE;
		
		if("valid".equals(op)) {

			GiftcardCouponResult result2 = giftcardApi.listCoupon(op, pageNumber, pageSize);
			if(result2.getLists() != null)
				model.addAttribute("giftcardList", result2.getLists().getValidList());
			else
				model.addAttribute("giftcardList", Collections.EMPTY_LIST);
			
			PageVo pageVo = new PageVo();
			pageVo.setPageSize(pageSize + "");
			pageVo.setPageNumber(pageNumber + "");
			pageVo.setTotalRowCount((result2.getValidCount() == null? 0 : result2.getValidCount() == null) + "");

			model.addAttribute("pageVo", pageVo);
			return "my/fragment/gift-card-body";
		}
		
		GiftcardCouponResult result2 = giftcardApi.listCoupon(op, 1, 100);
		if(result2.getLists() == null) {
			model.addAttribute("giftcardList", Collections.EMPTY_LIST);
			PageVo pageVo = new PageVo();
			pageVo.setPageSize(pageSize + "");
			pageVo.setPageNumber(pageNumber + "");
			pageVo.setTotalRowCount("0");
			model.addAttribute("pageVo", pageVo);
			return "my/fragment/gift-card-body";
		}
		if(result2.getLists().getValidList() == null) {
			result2.getLists().setValidList(new ArrayList<Giftcard>());
		}
		if(result2.getLists().getUseList() != null)
			result2.getLists().getValidList().addAll(result2.getLists().getUseList());
		if(result2.getLists().getEndList() != null)
			result2.getLists().getValidList().addAll(result2.getLists().getEndList());
		if("all".equals(op)) {
			Collections.sort(result2.getLists().getValidList(), new Comparator<Giftcard>() {
				@Override
				public int compare(Giftcard o1, Giftcard o2) {
					return o1.getIssueDate().compareTo(o2.getIssueDate());
				}
			});
		}
		

		PageVo pageVo = new PageVo();
		pageVo.setPageSize(pageSize + "");
		pageVo.setPageNumber(pageNumber + "");
		pageVo.setTotalRowCount(result2.getLists().getValidList().size() + "");
		model.addAttribute("pageVo", pageVo);

		try {
			int limit = pageNumber * pageSize;
			if(limit > result2.getLists().getValidList().size()) limit = result2.getLists().getValidList().size();
			model.addAttribute("giftcardList", result2.getLists().getValidList().subList(((pageNumber - 1) * pageSize), limit));
		} catch(Exception e) {
			model.addAttribute("giftcardList", Collections.EMPTY_LIST);
		}
		
		return "my/fragment/gift-card-body";
		
	}
	
	/**********************************************************************************************
	 * 6. One Pay 카드관리
	 **********************************************************************************************/


	/**********************************************************************************************
	 * 7. 예치금/계좌 관리
	 **********************************************************************************************/
	/**
	 * 예치금 관리
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myDepositList")
	@PageTitle(title = "예치금 관리" , menuId = "myWallet", subMenuId = "myDeposit")
	public String myDepositList(Model model) {
		int pageSize = M_PAGE_SIZE;
		
		if(isPcDevice())
			pageSize = P_PAGE_SIZE;
		DepositHistoriesResult depositHostory = depositsApi.getDepositHistories(getMemberSn(), null, null, null, 0, pageSize);
		model.addAttribute("depositHostory1", depositHostory);
		
		PageVo pageVo = new PageVo();
		pageVo.setPageNumber(1 + "");
		pageVo.setTotalRowCount(depositHostory.getTotalCount() + "");
		pageVo.setPageSize(pageSize + "");
		model.addAttribute("pageVo1", pageVo);

		
		if(isPcDevice()) {

			DepositRefundAccount depositRefundAccount = depositsApi.getDepositRefundAccount(getMemberSn());
			model.addAttribute("depositRefundAccount", depositRefundAccount);
			
			depositHostory = depositsApi.getDepositHistories(getMemberSn(), null, null, "Transfer", 0, pageSize);
			model.addAttribute("depositHostory2", depositHostory);
			
			pageVo = new PageVo();
			pageVo.setPageNumber(1 + "");
			pageVo.setTotalRowCount(depositHostory.getTotalCount() + "");
			pageVo.setPageSize(pageSize + "");
			model.addAttribute("pageVo2", pageVo);
		}
		if(isMobileDevice())
			return "my/deposit_account.1";
		if(isPcDevice())
			return "my/my-deposit";
		return null;
	}

	/**
	 * 출금신청/계좌관리
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myDepositManagementList")
	@PageTitle(title = "예치금 관리" , menuId = "myWallet", subMenuId = "myDeposit")
	public String myDepositManagementList(Model model) {
		int pageSize = M_PAGE_SIZE;
		
		if(isPcDevice())
			pageSize = P_PAGE_SIZE;
		DepositHistoriesResult depositHostory = depositsApi.getDepositHistories(getMemberSn(), null, null, "Transfer", 0, pageSize);
		model.addAttribute("depositHostory", depositHostory);
		
		PageVo pageVo = new PageVo();
		pageVo.setPageNumber(1 + "");
		pageVo.setTotalRowCount(depositHostory.getTotalCount() + "");
		pageVo.setPageSize(pageSize + "");
		model.addAttribute("pageVo", pageVo);

		DepositRefundAccount depositRefundAccount = depositsApi.getDepositRefundAccount(getMemberSn());
		model.addAttribute("depositRefundAccount", depositRefundAccount);

		if(isMobileDevice())
			return "my/deposit_account.2";
		if(isPcDevice()) {
			return "my/my-deposit";
		}
		return null;
	}
	/**
	 * 예치금 리스트  전체 조회.
	 * @param startDt
	 * @param endDt
	 * @return
	 */
	@GetMapping("/info/depositHitoryListFragment")
	@FragmentPage
	public String beautyPointListFragment(Model model, String depositType, String startDt, String endDt, String date, Integer pageNumber) {
		int pageSize = M_PAGE_SIZE;
		if(pageNumber == null) {
			pageNumber = 1;
		}
		if(isPcDevice())
			pageSize = P_PAGE_SIZE;
		DepositHistoriesResult depositHostory = null;
		if(startDt != null && endDt != null && !startDt.isEmpty() && !endDt.isEmpty()) {
			SimpleDateFormat format = (SimpleDateFormat) DATE_FORMAT.clone();
			try {
				Calendar c = Calendar.getInstance();
				Date d = format.parse(endDt);
				c.setTime(d);
				c.set(Calendar.HOUR_OF_DAY, c.getMaximum(Calendar.HOUR_OF_DAY));
				c.set(Calendar.MINUTE,      c.getMaximum(Calendar.MINUTE));
				c.set(Calendar.SECOND,      c.getMaximum(Calendar.SECOND));
				c.set(Calendar.MILLISECOND, c.getMaximum(Calendar.MILLISECOND));
				depositHostory = depositsApi.getDepositHistories(getMemberSn(), format.parse(startDt), c.getTime(), depositType, (pageNumber - 1) * pageSize, pageNumber * pageSize);
			} catch (ParseException e) {
				e.printStackTrace();
			}
		} else {
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
				depositHostory = depositsApi.getDepositHistories(getMemberSn(), c.getTime(), new Date(), depositType, (pageNumber - 1) * pageSize, pageNumber * pageSize);
			} else {
				depositHostory = depositsApi.getDepositHistories(getMemberSn(), null, null, depositType, (pageNumber - 1) * pageSize, pageNumber * pageSize);
			}
		}
		model.addAttribute("depositHostory", depositHostory);
		
		PageVo pageVo = new PageVo();
		pageVo.setPageNumber(pageNumber + "");
		pageVo.setTotalRowCount(depositHostory.getTotalCount() + "");
		pageVo.setPageSize(pageSize + "");
		model.addAttribute("pageVo", pageVo);

		if(isPcDevice()) {
			model.addAttribute("code", getRequest().getParameter("code"));
		}
		return "my/fragment/deposit-history-fragment";
	}

	@GetMapping("/info/depositRegistFragment")
	@FragmentPage
	public String depositRegistFragment() {
		if(isMobileDevice())
			return "my/fullpage-account";
		if(isPcDevice())
			return "my/layer-my-deposit";
		return null;
	}

	@GetMapping("/refundAccountsRegister")
	@PageTitle(title = "예치금 관리" , menuId = "myWallet", subMenuId = "myDeposit")
	public String refundAccountsRegister(Model model) {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/fullpage-deposit-03";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "";
		}

		return null;
	}

}
