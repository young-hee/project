package kr.ap.emt.my.controller;

import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.util.FromEndDateUtils;
import net.g1project.ecp.api.model.sales.deposits.BankAccount;
import net.g1project.ecp.api.model.sales.deposits.DepositHistoriesResult;
import net.g1project.ecp.api.model.sales.deposits.DepositRefundAccount;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;

/**
 * 나의 지갑 관리
 *
 * 1. 기프트카드 관리
 * 2. 예치금 관리
 *
 */
@RestController
@RequestMapping("/my/api")
public class MyWalletRestController extends AbstractController {


	/**********************************************************************************************
	 *  1. 기프트카드 관리
	 **********************************************************************************************/



	/**********************************************************************************************
	 *  2. 예치금 관리
	 **********************************************************************************************/

	/**
	 * 예치금 목록 조회
	 *
	 * @param offset
	 * @param limit
	 * @param startDate
	 * @param endDate
	 * @param depositHistTypeCode
	 * @return
	 */
	@GetMapping("/getDepositList")
	public ResponseEntity<?> getDepositList(int offset, int limit, String startDate, String endDate, String depositHistTypeCode) throws ParseException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		DepositHistoriesResult depositHistories = depositsApi.getDepositHistories(getMemberSn(), sf.parse(startDate), endDate != null ? FromEndDateUtils.initEndDate(sf.parse(endDate)) : null, depositHistTypeCode, offset, limit);
		result.put("DepositHistories", depositHistories);

		return ResponseEntity.ok(result);
	}

	/**
	 * 예치금 출금
	 *
	 * @param amountOfTransfer
	 * @return
	 */
	@PostMapping("/transferDeposit")
	public ResponseEntity<?> transferDeposit(int amountOfTransfer) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		DepositHistoriesResult depositHistoriesResult = depositsApi.requestWithdrawalDeposit(getMemberSn(), BigDecimal.valueOf(amountOfTransfer));
		result.put("DepositHistories", depositHistoriesResult);


		return ResponseEntity.ok(result);
	}

	/**
	 * 계좌정보 저장
	 *
	 * @param bankAccount
	 * @return
	 */
	@PutMapping("/saveRefundAccounts")
	public ResponseEntity<?> saveRefundAccounts(BankAccount bankAccount) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		DepositRefundAccount depositRefundAccount = depositsApi.saveDepositRefundAccount(getMemberSn(), bankAccount);
		result.put("DepositRefundAccount", depositRefundAccount);

		return ResponseEntity.ok(result);
	}
}
