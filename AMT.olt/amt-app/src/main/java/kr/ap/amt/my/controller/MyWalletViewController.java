package kr.ap.amt.my.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.deposits.DepositRefundAccount;
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

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/deposit-01";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-deposit-list-01";
		}

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

		DepositRefundAccount depositRefundAccount = depositsApi.getDepositRefundAccount(getMemberSn());
		model.addAttribute("DepositRefundAccount", depositRefundAccount);

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/deposit-02";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-deposit-list-02";
		}

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
