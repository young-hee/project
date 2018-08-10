package kr.ap.amt.my.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

import kr.ap.comm.api.vo.PageVo;
import kr.ap.comm.api.vo.PtTrBrkdInqOutCbcVo;
import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.deposits.DepositHistoriesResult;
import net.g1project.ecp.api.model.sales.deposits.DepositRefundAccount;

import org.apache.commons.lang3.time.DateFormatUtils;
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
	private static final int M_PAGE_SIZE = 5;
	private static final int P_PAGE_SIZE = 10;

	/**********************************************************************************************
	 * 4. 기프트카드 관리
	 **********************************************************************************************/

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
		model.addAttribute("depositHostory", depositHostory);
		
		PageVo pageVo = new PageVo();
		pageVo.setPageNumber(1 + "");
		pageVo.setTotalRowCount(depositHostory.getTotalCount() + "");
		pageVo.setPageSize(pageSize + "");
		model.addAttribute("pageVo", pageVo);

		DepositRefundAccount depositRefundAccount = depositsApi.getDepositRefundAccount(getMemberSn());
		model.addAttribute("depositRefundAccount", depositRefundAccount);

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
		if(isPcDevice())
			return "my/my-deposit";
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
