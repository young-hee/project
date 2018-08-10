package kr.ap.amt.etc.controller;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ap.amt.etc.vo.ApObjectInfo;
import kr.ap.amt.etc.vo.SavingBeautyPointRequest;
import kr.ap.amt.etc.vo.SearchBeautyPointCustomerRequest;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.linker.linker.APReserveInfo;
import net.g1project.ecp.api.model.linker.linker.BeautyPointCustomerInfoSearchResult;
import net.g1project.ecp.api.model.linker.linker.BeautyPointSavingListApResult;
import net.g1project.ecp.api.model.linker.linker.ReserveInfo;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;

@Controller
public class AffiliatedMallProvideController extends AbstractController{
	/** logger setting.. */
	final Logger logger = LoggerFactory.getLogger(getClass());

	public static final String URI_SEARCH_USER_LOW_VER = "/event/shop_api_beautypoint_check.do";

	/**
	 * AP 뷰티포인트 적립결과 조회 - 뷰티포인트 적립결과를 응답해주는 API
	 *  대상 : 11번가
	 * @return
	 */
	@PostMapping("/event/shop_api_bpoint_check.do")
	@ResponseBody
	public ResponseEntity<?> getEarnPointApmall(
		@RequestBody SavingBeautyPointRequest requestBody
	) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		try {

			String bizptnr = requestBody.getBizptnr() != null ? requestBody.getBizptnr() : "";
			String reqDt = requestBody.getReqDt() != null ? requestBody.getReqDt() : "";
			String cstmSiteKey = requestBody.getCstmSiteKey() != null ? requestBody.getCstmSiteKey() : "";
			String siteCode = requestBody.getSiteCode() != null ? requestBody.getSiteCode() : "";

			BeautyPointSavingListApResult pointApmallApResult = linkerApi.getEarnPointApmall(bizptnr, reqDt, cstmSiteKey, siteCode);

			result.put("status", pointApmallApResult.getStatus());
			result.put("message", pointApmallApResult.getMessage());
			result.put("object", removeNullValue(pointApmallApResult.getObject()));
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * AP 뷰티포인트 적립대상 여부 확인 - 5개 제휴몰 뷰티포인트 적립대상 여부 확인 시 사용
	 *  대상 :  GS, G마켓, CJ, AK, H
	 * @return
	 */
	@PostMapping({"/event/shop_api_beautypoint_user_check.do", "/event/shop_api_beautypoint_check.do", "/event/shop_api_bpoint_user_check.do"})
	@ResponseBody
	public ResponseEntity<?> getBeautyPointMember(
			HttpServletRequest request,
			@RequestBody SearchBeautyPointCustomerRequest requestBody
			) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		try {

			String cstmCardno = requestBody.getCstmCardno() != null ? requestBody.getCstmCardno() : "" ;  // 통합고객정보의 뷰티포인트카드번호
			String cstmNm = requestBody.getCstmNm() != null ? requestBody.getCstmNm() : "";    // 통합고객정보에 저장된 고객명
			String ucstmId = requestBody.getUcstmId() != null ? requestBody.getUcstmId() : "";    // 암호화된 뷰티퐁니트 고객번호
			String siteCode = requestBody.getSiteCode() != null ? requestBody.getSiteCode() : "";  // 외부몰 사이트코드
			String cstmSiteKey = requestBody.getCstmSiteKey() != null ? requestBody.getCstmSiteKey() : "";    // 외부몰 사이트키
			String orderFlag = requestBody.getOrderFlag() != null ? requestBody.getOrderFlag() : "";    // 첫주문인지, 재주문인지 구분하는 플래그
			String useNewVer = "Y";

			String uri = request.getRequestURI();
			// GS의 경우 구버전을 사용처리
			if(URI_SEARCH_USER_LOW_VER.equals(uri)){
				useNewVer ="N";
			}

			BeautyPointCustomerInfoSearchResult pointCustomerInfoSearchResult = linkerApi.getBeautyPointMember(cstmSiteKey, siteCode, cstmCardno, cstmNm, ucstmId, orderFlag, useNewVer);

			result.put("status", pointCustomerInfoSearchResult.getStatus());
			result.put("message", pointCustomerInfoSearchResult.getMessage());
			result.put("object", removeNullValue(pointCustomerInfoSearchResult.getObject()));

		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 *  non_null 처리를 위한 메소드
	 *
	 * */
	private ApObjectInfo removeNullValue(APReserveInfo apReserveInfo){

		ApObjectInfo apObjectInfo = new ApObjectInfo();
		try {
			BeanUtils.copyProperties(apObjectInfo, apReserveInfo);
		} catch (IllegalAccessException e) {
			logger.info(e.getMessage());
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			logger.info(e.getMessage());
			e.printStackTrace();
		}

		return apObjectInfo;
	}

}
 