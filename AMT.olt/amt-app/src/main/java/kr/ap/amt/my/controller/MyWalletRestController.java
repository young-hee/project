package kr.ap.amt.my.controller;

import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.client.sales.GiftcardApi;
import net.g1project.ecp.api.model.sales.deposits.BankAccount;
import net.g1project.ecp.api.model.sales.deposits.DepositHistoriesResult;
import net.g1project.ecp.api.model.sales.deposits.DepositRefundAccount;
import net.g1project.ecp.api.model.sales.giftcard.GiftcardCouponResult;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.HashMap;

/**
 *
 * 4. 기프트카드 관리
 * 6. One Pay 카드관리
 * 7. 예치금/계좌 관리
 *
 */
@RestController
@RequestMapping("/my/api")
public class MyWalletRestController extends AbstractController {

    @Autowired
    protected GiftcardApi giftcardApi;

	/**********************************************************************************************
	 * 4. 기프트카드 관리
	 **********************************************************************************************/


	/**
	 * 기프트카드 등록
	 *
	 * @param barcode
	 * @return
	 */
    @PutMapping("/regGiftCard")
	@ResponseBody
	public ResponseEntity<?> regGiftCard(String barcode) {
		GiftcardCouponResult rsltVo = giftcardApi.regCoupon(barcode);
		if("0000".equals(rsltVo.getResCode())) {
			return ResponseEntity.ok("{}");
		}
		throw error(HttpStatus.BAD_REQUEST, "ERROR", "기프트카드 등록에 실패했습니다.");
	}
	
	
	/**********************************************************************************************
	 * 6. One Pay 카드관리
	 **********************************************************************************************/



	/**********************************************************************************************
	 * 7. 예치금/계좌 관리
	 **********************************************************************************************/

	/**
	 * 예치금 출금
	 *
	 * @param amountOfTransfer
	 * @return
	 */
	@PostMapping("/transferDeposit")
	@ResponseBody
	public ResponseEntity<?> transferDeposit(int amountOfTransfer) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			DepositHistoriesResult depositHistoriesResult = depositsApi.requestWithdrawalDeposit(getMemberSn(), BigDecimal.valueOf(amountOfTransfer));
			result.put("DepositHistories", depositHistoriesResult);
		} catch(Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 계좌정보 저장
	 *
	 * @param bankAccount
	 * @return
	 */
	@PutMapping("/saveRefundAccounts")
	@ResponseBody
	public ResponseEntity<?> saveRefundAccounts(BankAccount bankAccount) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			DepositRefundAccount depositRefundAccount = depositsApi.saveDepositRefundAccount(getMemberSn(), bankAccount);
			result.put("DepositRefundAccount", depositRefundAccount);
		} catch(Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}


}
