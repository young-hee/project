package kr.ap.emt.etc.controller;

import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.etc.vo.SavingBeautyPointRequest;
import net.g1project.ecp.api.model.linker.linker.BeautyPointSavingListEtudeResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;

@Controller
public class AffiliatedMallProvideController extends AbstractController {

	/** logger setting.. */
	final Logger logger = LoggerFactory.getLogger(getClass());

	/**
	 * Etude 뷰티포인트 적립결과 조회 - 뷰티포인트 적립결과를 응답해주는 API
	 *  대상 : 11번가
	 * @return
	 */
	@PostMapping("/kr/ko/btpt11stRst.do")
	@ResponseBody
	public ResponseEntity<?> getEarnPointEtudepmall(
		@RequestBody SavingBeautyPointRequest requestBody
	) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		try {

			String bizptnr = requestBody.getBizptnr() != null ? requestBody.getBizptnr() : "";
			String reqDt = requestBody.getReqDt() != null ? requestBody.getReqDt() : "";
			String cstmSiteKey = requestBody.getCstmSiteKey() != null ? requestBody.getCstmSiteKey() : "";
			String siteCode = requestBody.getSiteCode() != null ? requestBody.getSiteCode() : "";

			BeautyPointSavingListEtudeResult pointSavingListEtudeResult = linkerApi.getEarnPointEtude(bizptnr, reqDt, cstmSiteKey, siteCode);

			result.put("bizptnr", pointSavingListEtudeResult.getBizptnr());
			result.put("errMsg", pointSavingListEtudeResult.getErrMsg());
			result.put("reqDt", pointSavingListEtudeResult.getReqDt());
			result.put("reserveInfo", pointSavingListEtudeResult.getReserveInfo());
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}


}
