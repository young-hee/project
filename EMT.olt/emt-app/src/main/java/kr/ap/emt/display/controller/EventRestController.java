/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.display.vo.RequestEvent;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableAddress;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.ApMember;
import net.g1project.ecp.api.model.ap.ap.ShipAddressInfo;
import net.g1project.ecp.api.model.ap.bbs.VisitEducationPost;
import net.g1project.ecp.api.model.file.file.PlanDisplayPost;
import net.g1project.ecp.api.model.sales.guide.FoNotice;
import net.g1project.ecp.api.model.sales.guide.FoNoticeResult;
import net.g1project.ecp.api.model.sales.member.Member;
import net.g1project.ecp.api.model.sales.plandisplay.EventCommentImg;
import net.g1project.ecp.api.model.sales.plandisplay.EventParticipantResult;
import net.g1project.ecp.api.model.sales.plandisplay.EventParticipatedPost;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplay;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplayEventListResult;
import net.g1project.ecp.api.model.sales.regularevent.AttendanceCheckHists;
import net.g1project.ecp.api.model.sales.regularevent.Awards;
import net.g1project.ecp.api.model.sales.regularevent.RegularEvent;
import net.g1project.ecp.api.model.sales.regularevent.RegularEventRequesters;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
@Controller
@RequestMapping("/display")
public class EventRestController extends AbstractController {

	/**
	 * 행사 유형별 행사 정보 조회
	 * @param requestEvent 
	 * @return
	 */
	@RequestMapping("/regularEventSummary")
	@ResponseBody
	public ResponseEntity<?> regularEventSummary(RequestEvent requestEvent) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			RegularEvent regularEvent = regulareventApi.regularEventSummary( requestEvent.getRegularEventType());
			result.put("regularEvent", regularEvent);
			
			return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}
	}
    
	
	/**
	 * 행사참여
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/participated")
    @ResponseBody
    public ResponseEntity<?> participated(RequestEvent requestEvent, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			Awards awards = regulareventApi.regularEventParticipated(requestEvent.getRegularEventType(), requestEvent.getRequestTitle(), requestEvent.getRequestReason(), requestEvent.getEmailAddress(), requestEvent.getVerifNo());
            result.put("awards", awards);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
		
	//
	/**
	 * 행사 신청자 목록
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/regularEventRequesters")
    @ResponseBody
    public ResponseEntity<?> regularEventRequesters(RequestEvent requestEvent, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			RegularEventRequesters requesters = regulareventApi.regularEventRequesters(requestEvent.getRegularEventType(), requestEvent.getRegularEventSn(), requestEvent.getOffset(), requestEvent.getLimit(), null);
            result.put("requesters", requesters);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
	
	/**
	 * 	Play 메이크업 클래스 신청
	 * @return
	 */
	@RequestMapping("/visitEducations")
    @ResponseBody
    public ResponseEntity<?> visitEducations(
    		  VisitEducationPost requestInfo
    		, String preStoreAddress1
    		, String preStoreAddress2
    		, String preCountryNo
    		, String preCellPhoneNo
    		, String preZpCode
    		, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			requestInfo.setMemberSn(getMemberSn());
			requestInfo.setMemberId( getMemberSession().getMember().getMemberId() );
			requestInfo.setMemberName( getMemberSession().getMember().getName().getName1() );
			
			EmbeddableTel cellPhoneNo = new EmbeddableTel();
			cellPhoneNo.setPhoneNo(preCellPhoneNo);
			requestInfo.setCellPhoneNo(cellPhoneNo);
			
			EmbeddableAddress storeAddress = new EmbeddableAddress();
			storeAddress.setAddress1(preStoreAddress1);
			storeAddress.setAddress2(preStoreAddress2);
			storeAddress.setAddress3("");
			storeAddress.setAddress4("");
			storeAddress.setZipCode(preZpCode);
			requestInfo.setStoreAddress( storeAddress);
			
			BooleanResult booleanResult = bbsApi.requestVisitEducation(requestInfo);
            result.put("booleanResult", booleanResult);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
	
	/**
	 * 출석체크 이력조회
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/status")
    @ResponseBody
    public ResponseEntity<?> status(RequestEvent requestEvent, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			AttendanceCheckHists attendanceCheckHists = regulareventApi.regularEventStatus(requestEvent.getRegularEventType(), requestEvent.getDay());
            result.put("attendanceCheckHists", attendanceCheckHists);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
		
	/**
	 * 상시이벤트 배송지등록 
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/regularEventTermsAgree")
    @ResponseBody
    public ResponseEntity<?> regularEventTermsAgree(RequestEvent requestEvent, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
		
			//	PAMRAM : Long eventParticipantSn, Long memberSn, String termsAgreeYn, String name, String telNo1, String telNo2, String address, String email
						
			BooleanResult booleanResult = regulareventApi.regularEventTermsAgree(requestEvent.getEventParticipantSn(), requestEvent.getTermsAgreeYn()
					, requestEvent.getName(), requestEvent.getPhoneNo1(), requestEvent.getPhoneNo2(), requestEvent.getAddress(), requestEvent.getEmailAddress());
            
			result.put("booleanResult", booleanResult);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
	
	/**
	 * 상시이벤트 배송지 조회
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/regularEventShipAddress")
    @ResponseBody
    public ResponseEntity<?> regularEventShipAddress(RequestEvent requestEvent, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		ApMember member = new ApMember(); 
		try {
		// 이름 , 휴대폰번호, 주소지, 주소, 상세주소 
			if(0L != getMemberSn()) {
				
				member= apApi.getMemberInfo(getMemberSn());
			}
				
			if(member.getAddress().getZipCode() == null ||member.getAddress().getAddress1() == null || member.getAddress().getAddress2() == null ||
					("").equals(member.getAddress().getZipCode()) ||("").equals(member.getAddress().getAddress1())|| ("").equals(member.getAddress().getAddress2())) {
						
				List<ShipAddressInfo> addressList = apApi.getShipAddresses(getMemberSn());
				if( addressList.size() > 0 ) {
					member.getAddress().setZipCode(addressList.get(0).getAddresseeAddress().getZipCode());
					member.getAddress().setAddress1(addressList.get(0).getAddresseeAddress().getAddress1());
					member.getAddress().setAddress2(addressList.get(0).getAddresseeAddress().getAddress2());
				}
				
			}
			
			result.put("member", member);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }

	/**
	 * 당첨자 결과 조회 
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/winnerNoticeList")
    @ResponseBody
    public ResponseEntity<?> winnerNoticeList(RequestEvent requestEvent) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
	try {
				// parameter : String keyword, Long noticeTypeSn, Integer offset, Integer limit, String importantNoticeYn, String eventYn
			FoNoticeResult eventResultList = guideApi.getFoNotices("", null, requestEvent.getOffset(), requestEvent.getLimit(), null, "Y"); 
			
			result.put("winnerNoticeList", eventResultList); 
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
	
	/**
	 * 당첨자 결과 조회 
	 * @param requestEvent GET
	 * @return
	 */
	@RequestMapping("/winnerNoticeDetail")
    @ResponseBody
    public ResponseEntity<?> winnerNoticeDetail(RequestEvent requestEvent) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
	try {
				// parameter : String keyword, Long noticeTypeSn, Integer offset, Integer limit, String importantNoticeYn, String eventYn
			FoNotice winnerNoticeDetail = guideApi.getFoNotice(requestEvent.getFoNoticeSn());  
			
			result.put("winnerNoticeDetail", winnerNoticeDetail); 
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
	
	
	
	/**
	 * 기획전 이벤트
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/planDisplayList")
    @ResponseBody
    public ResponseEntity<?> planDisplayList(RequestEvent requestEvent, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			PlanDisplayEventListResult planDisplayEventListResult 
				= plandisplayApi.getPlanDisplayEventList(
						  requestEvent.getKeyword() //keyword: 검색, 
						, requestEvent.getStatus() //status: 기획전시상태코드 (PlanDisplayStatus) , Progress - 진행 , End - 종료, 
						, requestEvent.getTypes() //types: 기획전시 유형코드 리스트(PlanDisplayType) , Link - planDisplayParticipatedURL링크 , General - 일반구성기획전시 , SameTimePur - 동시구매기획전시, 
						, requestEvent.getEventIncludeYn() //eventIncludeYn: 행사포함여부 , Y - 행사 포함 , N - 행사 미포함 , 미입력시 전체 (행사포함여부 조회조건 없음)
						, requestEvent.getOrder() //order: 정렬방식 (PlanDisplaySortMethod) , SortOrder , StartDt , Deadline
						, requestEvent.getBrandSns() //brandSns: 브랜드일련번호리스트
						, requestEvent.getOffset()
						, requestEvent.getLimit()
						); 
			
            result.put("planDisplayEventListResult", planDisplayEventListResult);
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
	
	/**
	 * 기획전 이벤트 _ 기획전시 댓글목록(행사참여자) /sales/plandisplays/{planDisplaySn}/comments기획전시 댓글목록(행사참여자)
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/planDisplayComments")
    @ResponseBody
    public ResponseEntity<?> planDisplayComments(RequestEvent requestEvent, HttpServletRequest req) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			
			EventParticipantResult eventParticipantResult = plandisplayApi.getProdPlanDisplayEventComments(requestEvent.getPlanDisplaySn(), requestEvent.getOffset() , requestEvent.getLimit(), "New");
		
			result.put("eventParticipantResult", eventParticipantResult);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
	
	/***
	 * 기획전시 이벤트 _리뷰형 행사참여 - 이미지 포함 //ecp-fileUploads-v1
	 *
	 * @param requestEvent
	 * @param eventParticipatedPost
	 * @param picture
	 * @param req
	 * @return 
	 */
	@RequestMapping("/planDisplayParticipated")
    @ResponseBody
	public ResponseEntity<?> planDisplayParticipated(RequestEvent requestEvent, EventParticipatedPost eventParticipatedPost, MultipartFile[] picture, HttpServletRequest req) {
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
				if (picture != null) {
					eventParticipatedPost.setFiles(imageSettingList(picture));
				}
				
	        	eventParticipatedPost.setMemberSn(getMemberSn());
	        	
	        	if(eventParticipatedPost.getTermsAgreeYn().equals("true")) {
	        		eventParticipatedPost.setTermsAgreeYn("Y");
	        	} else { 
	        		eventParticipatedPost.setTermsAgreeYn("N");
	        	}
	        	
	        	net.g1project.ecp.api.model.sales.plandisplay.Awards planDisplayAwards 
	        		= plandisplayApi.eventParticipatedPost(requestEvent.getPlanDisplaySn(), eventParticipatedPost); 
	        	
				result.put("planDisplayAwards", planDisplayAwards);
	        
	        return ResponseEntity.ok(result);
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
			}

	  }
	
	/***
	 * 기획전시 이벤트 _참여댓글형 행사참여 - 이미지 포함 //ecp-fileUploads-v1
	 *
	 * @param requestEvent
	 * @param eventParticipatedPost
	 * @return
	 */
	@RequestMapping("/planDisplaySimpleParticipated")
    @ResponseBody
	public ResponseEntity<?> planDisplaySimpleParticipated(RequestEvent requestEvent, EventParticipatedPost eventParticipatedPost) {
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
	        	eventParticipatedPost.setMemberSn(getMemberSn());
	        	eventParticipatedPost.setTermsAgreeYn("Y");
	        	
	        	net.g1project.ecp.api.model.sales.plandisplay.Awards planDisplayAwards 
	        		= plandisplayApi.eventParticipatedPost(requestEvent.getPlanDisplaySn(), eventParticipatedPost); 
	        	
				result.put("planDisplayAwards", planDisplayAwards);
	        
	        return ResponseEntity.ok(result);
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
			}

	  }
	
	
	/***
	 * 기획전시 이벤트 _참여댓글형 행사참여수정 - 이미지 포함ecp-fileUploads-v1 // (sales/plandisplays/{planDisplaySn}/updateParticipated/{eventParticipantSn})
	 *
	 * @param requestEvent
	 * @param eventParticipatedPost
	 * @param picture
	 * @return
	 */
	@RequestMapping("/updateParticipated")
    @ResponseBody
	public ResponseEntity<?> updateParticipated(RequestEvent requestEvent,EventParticipatedPost eventParticipatedPost, MultipartFile[] picture) {
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			
				eventParticipatedPost.setFiles(imageSettingList(picture));
				eventParticipatedPost.setMemberSn(getMemberSn());
	        	
	        	if(eventParticipatedPost.getTermsAgreeYn().equals("true")) {
	        		eventParticipatedPost.setTermsAgreeYn("Y");
	        	} else { 
	        		eventParticipatedPost.setTermsAgreeYn("N");
	        	}
	        	
	        	BooleanResult booleanResult = plandisplayApi.eventParticipatedUpdatePost(requestEvent.getPlanDisplaySn(), requestEvent.getEventParticipantSn(), eventParticipatedPost); 
	        	
				result.put("booleanResult", booleanResult);
	        
	        return ResponseEntity.ok(result);
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
			}

	  }
	
	/***
	 * 기획전시 이벤트 _참여댓글형 행사참여삭제 -/v1/{mallId}/sales/plandisplays/{planDisplaySn}/deleteComment/{eventParticipantSn}
	 *
	 * @param requestEvent
	 * @return
	 */
	@RequestMapping("/deleteParticipated")
	@ResponseBody
	public ResponseEntity<?> deleteParticipated(RequestEvent requestEvent) {

		HashMap<String, Object> result = new HashMap<String, Object>();

		try {

				BooleanResult booleanResult = plandisplayApi.planDisplayEventDeleteComment(requestEvent.getPlanDisplaySn(), requestEvent.getEventParticipantSn());

				result.put("booleanResult", booleanResult);

			return ResponseEntity.ok(result);
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
			}

	  }
	
	/**
	 * 기획전시 이벤트 상세
	 *
	 * @param requestEvent
	 * @param previewKey
	 * @return
	 */
	@RequestMapping("/planDisplayEvent")
    @ResponseBody
	public ResponseEntity<?> planDisplayEvent(RequestEvent requestEvent, String previewKey) {
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
				
				if(0L != getMemberSn()) {
					requestEvent.setMemberSn(getMemberSn());
				}
				
	        	PlanDisplay planDisplay = plandisplayApi.getPlanDisplayEvent(requestEvent.getPlanDisplaySn(), previewKey);
	        	
				result.put("planDisplay", planDisplay);
	        
	        return ResponseEntity.ok(result);
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
			}

	  }
	
	//private method
    private File MultiPartToFile(MultipartFile mul, String filePath) {
        File convF = new File(filePath + mul.getOriginalFilename());
        try {
            mul.transferTo(convF);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return convF;
    }
	
}
