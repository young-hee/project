/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.display.vo.RequestBrand;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableName;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.UploadingFile;
import net.g1project.ecp.api.model.ap.bbs.RequesterHist;
import net.g1project.ecp.api.model.ap.bbs.StoreOpenInquiry;
import net.g1project.ecp.api.model.ap.bbs.SupportersRequester;
import net.g1project.ecp.api.model.ap.bbs.SupportersRequesterInfo;
import net.g1project.ecp.api.model.ap.bbs.YouthLectureRequest;
import net.g1project.ecp.api.model.ap.bbs.YouthLectureReturn;
import net.g1project.ecp.api.model.ap.verif.ApMobileVerificationRequestInfo;
import net.g1project.ecp.api.model.ap.verif.ApMobileVerificationResendRequestInfo;
import net.g1project.ecp.api.model.ap.verif.ApMobileVerificationResult;
import net.g1project.ecp.api.model.ap.verif.ApMobileVerificationVerifyRequestInfo;
import net.g1project.ecp.api.model.ap.verif.ApMobileVerificationVerifyResult;
import net.g1project.ecp.api.model.offlinestore.store.StoreEvalEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreEvalPost;
import net.g1project.ecp.api.model.offlinestore.store.StoreEvalPut;
import net.g1project.ecp.api.model.offlinestore.store.StoreEvalsResult;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventDetailScheduleEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventRequesterEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventRequesterPost;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventRequesterResult;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventRequestersResult;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventScheduleInfo;
import net.g1project.ecp.api.model.offlinestore.store.StoreResult; 

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@RestController
@RequestMapping("/display")
public class BrandRestController extends AbstractController {

	
	/**
	 *  매장찾기 목록 조회
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/stores")
    public ResponseEntity<?> stores( RequestBrand requestBrand) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        Long memberSn = null;
        
        if("Y".equals(requestBrand.getRegularStoreYn())){
        	memberSn = getMemberSn(); 
        }
		StoreResult storeResult = storeApi.getStores(memberSn, requestBrand.getRegularStoreYn(), requestBrand.getFoStoreEventCode(), requestBrand.getKeyword(), requestBrand.getAddressDiv(), requestBrand.getAddressDetailDiv(), requestBrand.getLatitude(), requestBrand.getLogitude(), requestBrand.getRadius(), requestBrand.getOffset(), requestBrand.getLimit(), requestBrand.getSortBy());
		result.put("storeResult", storeResult);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 매장칭찬 목록 조회
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/storeEvals")
    public ResponseEntity<?> storeEvals( RequestBrand requestBrand) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		StoreEvalsResult storeEvalsResult = storeApi.getStoreEvals(requestBrand.getSearchTypeCode(), requestBrand.getKeyword(), requestBrand.getTopStoreEvalYn(), getMemberSn(), requestBrand.getOffset(), requestBrand.getLimit());
		result.put("storeEvalsResult", storeEvalsResult);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 매장칭찬상세
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/storeEval")
    public ResponseEntity<?> storeEval( RequestBrand requestBrand) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		StoreEvalEx storeEvalEx = storeApi.getStoreEval( requestBrand.getStoreEvalSn(), getMemberSn());
		result.put("storeEvalEx", storeEvalEx);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 매장칭찬등록
	 */
	@RequestMapping("/registStoreEval")
    public ResponseEntity<?> registStoreEval(@Valid StoreEvalPost storeEvalPost, MultipartFile[] picture, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
			   
		if (!ObjectUtils.isEmpty(picture)) {
			List<UploadingFile> files = imageSettingList(picture);
			storeEvalPost.setFiles(files);
		}

		storeEvalPost.setMemberSn( getMemberSn());

		BooleanResult booleanResult = storeApi.postStoreEvaluation(storeEvalPost);

		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 매장칭찬수정
	 */
	@RequestMapping("/updateStoreEval")
    public ResponseEntity<?> updateStoreEval(@Valid StoreEvalPut storeEvalUpdateInfo, Long storeEvalSn, MultipartFile[] picture, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		if (!ObjectUtils.isEmpty(picture)) {
			List<UploadingFile> files = imageSettingList(picture);
			storeEvalUpdateInfo.setFiles(files);
		}

		storeEvalUpdateInfo.setMemberSn( getMemberSn());

		BooleanResult booleanResult = storeApi.updateStoreEvaluation(storeEvalSn, storeEvalUpdateInfo);
		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 매장칭찬삭제
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/removeStoreEval")
    public ResponseEntity<?> removeStoreEval( RequestBrand requestBrand) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		BooleanResult booleanResult = storeApi.removeStoreEval(requestBrand.getStoreEvalSn(), getMemberSn());
		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 매장개설문의등록
	 * @param 
	 * @return
	 */
	@RequestMapping("/postStoreOpenInquiry")
    public ResponseEntity<?> postStoreOpenInquiry(StoreOpenInquiry storeOpenInquiry, String preName, String prePhoneNo) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		EmbeddableName embeddableName = new EmbeddableName();
		embeddableName.setName1(preName);

		EmbeddableTel embeddableTel = new EmbeddableTel();
		embeddableTel.setPhoneNo(prePhoneNo);

		storeOpenInquiry.setName(embeddableName);
		storeOpenInquiry.setPhoneNo(embeddableTel);

		BooleanResult booleanResult = bbsApi.postStoreOpenInquiry(storeOpenInquiry);
		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 컬러팩토리 예약 확인 // 비회원경우 
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/storeEventRequester")
    public ResponseEntity<?> storeEventRequester( RequestBrand requestBrand) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		//예약한 시간 하루 전까지 취소 가능할 경우 add에 1로 세팅 (cancelAvailDt.add(Calendar.DATE, 1))
		Calendar cancelAvailDt = Calendar.getInstance();
		cancelAvailDt.add(Calendar.DATE, 1);

		StoreEventRequesterEx storeEventRequesterEx = storeApi.getStoreEventRequester(requestBrand.getReserveNo(), cancelAvailDt.getTime());
		result.put("storeEventRequesterEx", storeEventRequesterEx);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 컬러팩토리 예약 확인 목록 // 회원인경우 
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/storeEventRequesters")
    public ResponseEntity<?> storeEventRequesters( RequestBrand requestBrand) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		StoreEventRequestersResult storeEventRequestersResult = new StoreEventRequestersResult();
		
		//예약한 시간 하루 전까지 취소 가능할 경우 add에 1로 세팅 (cancelAvailDt.add(Calendar.DATE, 1))
		Calendar cancelAvailDt = Calendar.getInstance();
		cancelAvailDt.add(Calendar.DATE, 1);

		//비회원일 경우
		if( requestBrand.getReserveNo() != null && !"".equals(requestBrand.getReserveNo())) {
			StoreEventRequesterEx storeEventRequesterEx = storeApi.getStoreEventRequester(requestBrand.getReserveNo(), cancelAvailDt.getTime());

			Integer totalCount = 0;
			Integer offset = 0;
			Integer limit = 0;

			if(storeEventRequesterEx != null) {
				totalCount = 1;
			}

			storeEventRequestersResult.setTotalCount(totalCount);
			storeEventRequestersResult.setOffset(offset);
			storeEventRequestersResult.setLimit(limit);

			List <StoreEventRequesterEx> storeEventRequesterExList = new ArrayList <StoreEventRequesterEx> ();
			storeEventRequesterExList.add( storeEventRequesterEx);
			storeEventRequestersResult.setStoreEventRequesterExList( storeEventRequesterExList);

		}else { //회원일 경우

			Calendar cal = Calendar.getInstance();
			cal.add(Calendar.MONTH, -1);

			storeEventRequestersResult = storeApi.getStoreEventRequesters(getMemberSn(), cal.getTime(), requestBrand.getReserveCancelYn(),cancelAvailDt.getTime(), requestBrand.getOffset(), requestBrand.getLimit(), requestBrand.getSortBy());
		}

		result.put("storeEventRequestersResult", storeEventRequestersResult);
		return ResponseEntity.ok(result);
    }
	
	/**
	 * 휴대폰 인증  _ 모바일 점유인증
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/requestMobileVerification")
    public ResponseEntity<?> requestMobileVerification(HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		ApMobileVerificationRequestInfo mobileVerificationRequestInfo = new ApMobileVerificationRequestInfo();
		EmbeddableTel embedPhonNo = new EmbeddableTel();

		embedPhonNo.setPhoneNo(req.getParameter("phoneNo"));

		mobileVerificationRequestInfo.setPhoneNo(embedPhonNo);

		ApMobileVerificationResult apMobileVerificationResult = verifApi.requestMobileVerification(mobileVerificationRequestInfo);

		result.put("mobileVerifSn", apMobileVerificationResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 휴대폰 인증  _ 모바일 점유인증 재전송
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/resendMobileVerificationKey")
    public ResponseEntity<?> resendMobileVerificationKey(ApMobileVerificationResendRequestInfo mobileVerificationResendRequestInfo) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		ApMobileVerificationResult apMobileVerificationResult = verifApi.resendMobileVerificationKey(mobileVerificationResendRequestInfo);

		result.put("mobileVerifSn", apMobileVerificationResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 휴대폰 인증  _ 모바일 점유인증키 검증
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/verifyMobileVerificationKey")
    public ResponseEntity<?> verifyMobileVerificationKey(ApMobileVerificationVerifyRequestInfo mobileVerificationResendRequestInfo) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		ApMobileVerificationVerifyResult apMobileVerificationVerifyResult = verifApi.verifyMobileVerificationKey(mobileVerificationResendRequestInfo);

		result.put("result", apMobileVerificationVerifyResult);

		return ResponseEntity.ok(result);

    }
	
	
	/**
	 * 컬러팩토리 예약 등록
	 * @param 
	 * @return
	 */
	@RequestMapping("/postStoreEventRequester")
    public ResponseEntity<?> postStoreEventRequester(StoreEventRequesterPost storeEventRequesterPost, String preName, String cellNum) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		EmbeddableName embeddableName = new EmbeddableName();
		embeddableName.setName1(preName);

		EmbeddableTel embeddableTel = new EmbeddableTel();
		embeddableTel.setPhoneNo(cellNum);

		storeEventRequesterPost.setName(embeddableName);
		storeEventRequesterPost.setPhoneNo1(embeddableTel);

		Long memberSn = getMemberSn();

		if(isLoggedIn()) {
			storeEventRequesterPost.setMemberYn("Y");
			storeEventRequesterPost.setMemberSn(memberSn);
		}

		StoreEventRequesterResult storeEventRequesterResult = storeApi.postStoreEventRequester( storeEventRequesterPost);
		result.put("storeEventRequesterResult", storeEventRequesterResult);

		return ResponseEntity.ok(result);

    }
	
	/**
	 * 컬러팩토리 일정정보
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/storeEventScheduleInfo")
    public ResponseEntity<?> storeEventScheduleInfo( RequestBrand requestBrand) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		DateFormat dateFormat = new SimpleDateFormat("Z");
		String timeZone = dateFormat.format(new Date());

		StoreEventScheduleInfo storeEventScheduleInfo = storeApi.getStoreEventScheduleInfoByfoStoreEventCode(requestBrand.getFoStoreEventCode(), timeZone);

		List <StoreEventDetailScheduleEx> storeEvtDtlSchExList = storeEventScheduleInfo.getStoreEventDetailScheduleExList();

		Map <Long, Object> scheduleListbyStoreSnMap = new HashMap <Long, Object> ();

		for(int i=0; i<storeEvtDtlSchExList.size(); i++) {

			StoreEventDetailScheduleEx storeEventDetailScheduleEx = storeEvtDtlSchExList.get(i);

			if( !scheduleListbyStoreSnMap.containsKey( storeEventDetailScheduleEx.getStoreSn())) {

				Map <String, Object> compStoreScheMap = new HashMap <String, Object> ();

				List <Map <String, Object>> scheduleList = new ArrayList <Map <String, Object>> ();

				for(int j=0; j<storeEvtDtlSchExList.size(); j++) {
					StoreEventDetailScheduleEx storeEventDetailScheduleEx2 = storeEvtDtlSchExList.get(j);

					if(storeEventDetailScheduleEx.getStoreSn().equals(storeEventDetailScheduleEx2.getStoreSn())) {
						Map <String, Object> scheduleMap = new HashMap <String, Object> ();
						scheduleMap.put("storeSn", storeEventDetailScheduleEx2.getStoreSn());
						scheduleMap.put("storeEventSn", storeEventDetailScheduleEx2.getStoreEventSn());
						scheduleMap.put("storeEventDetailScheduleSn", storeEventDetailScheduleEx2.getStoreEventDetailScheduleSn());
						scheduleMap.put("reservePossibleDate8", storeEventDetailScheduleEx2.getReservePossibleDate8());
						scheduleMap.put("fromReservePossibleTime4", storeEventDetailScheduleEx2.getFromReservePossibleTime4());
						scheduleMap.put("toReservePossibleTime4", storeEventDetailScheduleEx2.getToReservePossibleTime4());
						scheduleMap.put("reservePossibleYn", storeEventDetailScheduleEx2.getReservePossibleYn());
						scheduleMap.put("scheFromDate", StringUtils.join(storeEventDetailScheduleEx2.getReservePossibleDate8(), storeEventDetailScheduleEx2.getFromReservePossibleTime4()));

						scheduleList.add(scheduleMap);
					}
				}

				scheduleList.sort(new Comparator<Map<String, Object>>() {
					@Override
					public int compare(Map<String, Object> m1, Map<String, Object> m2) {

						long srcDate =  Long.parseLong( (String) m1.get("scheFromDate"));
						long tgtDate =  Long.parseLong( (String) m2.get("scheFromDate"));

						if(srcDate == tgtDate){
							return 0;
						}
						return srcDate < tgtDate ? -1 : 1;
					 }
				});

				Map <String, String> possDateMap = new HashMap<String, String>();
				for(int j=0; j< scheduleList.size(); j++) {
					Map <String, Object> scheduleMap = scheduleList.get(j);
					String reservePossibleDate8 = (String) scheduleMap.get("reservePossibleDate8");
					String reservePossibleYn = (String) scheduleMap.get("reservePossibleYn");

					if(!possDateMap.containsKey(reservePossibleDate8)) {
						possDateMap.put(reservePossibleDate8, reservePossibleYn);
					}else if("Y".equals(reservePossibleYn)) {
						possDateMap.put(reservePossibleDate8, reservePossibleYn);
					}
				}

				compStoreScheMap.put("possDateMap", possDateMap);
				compStoreScheMap.put("scheduleList", scheduleList);
				scheduleListbyStoreSnMap.put(storeEventDetailScheduleEx.getStoreSn(), compStoreScheMap);
			}
		}

		result.put("storeEventScheduleInfo", storeEventScheduleInfo);
		result.put("storeSnMap", scheduleListbyStoreSnMap);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 컬러팩토리 예약취소
	 * @param requestBrand
	 * @return
	 */
	@RequestMapping("/cancelScheduleInfo")
    public ResponseEntity<?> cancelScheduleInfo( RequestBrand requestBrand) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		BooleanResult booleanResult = storeApi.cancelStoreEventRequester(requestBrand.getReserveNo());

		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);
    }
	
	/**
	 * 청춘강연신청
	 * @param 
	 * @return
	 */
	@RequestMapping("/requestYouthLecture")
   public ResponseEntity<?> requestYouthLecture(YouthLectureRequest requestInfo, String preName, String prePhnNo, String preCpnName, String preCpnPhnNo) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		long youthLectureSn = 0;  // param 형식을 맞춰야해서 0으로 넘겨줌

		EmbeddableName requesterName = new EmbeddableName(); // 예약자
		requesterName.setName1(preName);

		EmbeddableTel requesterPhoneNo = new EmbeddableTel(); // 예약자 전화번호
		requesterPhoneNo.setPhoneNo(prePhnNo);

		EmbeddableName companionName = new EmbeddableName(); // 동반자 이름
		companionName.setName1(preCpnName);

		EmbeddableTel companionPhoneNo = new EmbeddableTel();  // 동반자 전화번호
		companionPhoneNo.setPhoneNo(preCpnPhnNo);

		requestInfo.setRequesterName(requesterName);
		requestInfo.setRequesterPhoneNo(requesterPhoneNo);
		requestInfo.setCompanionName(companionName);
		requestInfo.setCompanionPhoneNo(companionPhoneNo);
		requestInfo.setTermsAgreeYn("Y");
		YouthLectureReturn  youthLectureReturn = bbsApi.requestYouthLecture(youthLectureSn, requestInfo);
		 result.put("youthLectureReturn", youthLectureReturn);

		return ResponseEntity.ok(result);

   }
	
	
	/**
	 * 뷰티즌 신청
	 * @param 
	 * @return
	 */
   @RequestMapping(value ="/requestBeautizen")
   public ResponseEntity<?> requestBeautizen(SupportersRequester supportersRequester, MultipartFile[] picture, HttpServletRequest req) throws ParseException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		long supportersSn = 0;  // param 형식을 맞춰야해서 0으로 넘겨줌

		List<UploadingFile> uploadingFiles = new ArrayList<UploadingFile>();

		for(int i=0; picture != null && i<picture.length; i++) {

			if(!("").equals(picture[i].getOriginalFilename())) {
				uploadingFiles = imageSettingList(picture);
			}
		}
		 // SupportersRequster에 direct로 binding 되지 않는 param들은 수동으로 입력

		supportersRequester.setFiles(uploadingFiles); // 사진

		net.g1project.ecp.api.model.EmbeddableAddress address = new net.g1project.ecp.api.model.EmbeddableAddress();
		address.setAddress1(req.getParameter("preLocal"));
		supportersRequester.setRequesterAddress(address); // 지역 setting

		EmbeddableTel tel = new EmbeddableTel();
		tel.setPhoneNo(req.getParameter("prePhoneNo"));
		supportersRequester.setRequesterPhoneNo(tel); // phone setting

		supportersRequester.setMemberId(getMemberSession().getMember().getMemberId()); // 회원ID
		supportersRequester.setMemberName(getMemberSession().getMember().getName().getName1()); // 회원이름
		supportersRequester.setMemberSn(getMemberSession().getMember_sn()); //회원번호

		// 대외활동은 PC기준 10개
		List<RequesterHist> requstHistList = new ArrayList<RequesterHist>();

		RequesterHist requestHist = new RequesterHist();

		String[] activityType = req.getParameterValues("activityType");
		String[] activityBodyText = req.getParameterValues("activityBodyText");
		String[] activityName = req.getParameterValues("activityName");
		String[] activityStartDate = req.getParameterValues("activityStartDate");
		String[] activityEndDate = req.getParameterValues("activityEndDate");
		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd");

		if(activityType.length > 0) {
			for(int index = 0; index < activityType.length; index++) {

				requestHist.setActivityType(activityType[index]);//activityType);
				requestHist.setActivityBodyText(activityBodyText[index]);//activityBodyText);
				requestHist.setActivityName(activityName[index]);//activityName);
				requestHist.setActivityStartDate(sf.parse(activityStartDate[index]));//activityStartDate);
				requestHist.setActivityEndDate(sf.parse(activityEndDate[index]));//activityEndDate);

				requstHistList.add(index, requestHist);
			}
			supportersRequester.setSupportersRequesterHist(requstHistList);
		}

		if(!("Temp").equals(supportersRequester.getRequestStatus())){
			if(req.getParameter("check_all")!= null ||
					(req.getParameter("check_agree_1").equals("on") && req.getParameter("check_agree_2").equals("on")
							&& req.getParameter("check_agree_3").equals("on"))) { // 전체동의가 체크되어있거나 동의1,2,3 이 모두 체크되어있다면 동의 체크

				supportersRequester.setTermsAgreeYn(req.getParameter("check_all").equals("on") ? "Y" : "N"); // 동의
			}
		}

		BooleanResult booleanResult = bbsApi.requestSupporters(supportersSn, supportersRequester);
		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);
   }
	
	/**
	 * 뷰티즌에 지원한 회원 정보
	 * @param req
	 * @return
	 */
	@RequestMapping("/supportersRequsterinfo")
    public ResponseEntity<?> supportersRequsterinfo(HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		if(isLoggedIn()) {
			
			SupportersRequesterInfo suppoters = bbsApi.getSupportersRequester(getMemberSn());

			result.put("suppoters", suppoters);

			return ResponseEntity.ok(result);

		}else {	
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
		}
    }
	
}
