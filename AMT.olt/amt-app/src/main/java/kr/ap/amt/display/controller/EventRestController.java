/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.display.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.ap.amt.display.vo.RequestEvent;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableAddress;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.ap.ap.ApMember;
import net.g1project.ecp.api.model.ap.ap.ShipAddressInfo;
import net.g1project.ecp.api.model.ap.bbs.VisitEducationPost;
import net.g1project.ecp.api.model.sales.guide.FoNotice;
import net.g1project.ecp.api.model.sales.guide.FoNoticeResult;
import net.g1project.ecp.api.model.sales.plandisplay.EventCommentImg;
import net.g1project.ecp.api.model.sales.plandisplay.EventParticipantResult;
import net.g1project.ecp.api.model.sales.plandisplay.EventParticipatedPost;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplay;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplayEventListResult;
import net.g1project.ecp.api.model.sales.product.OnlineProdInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewImgPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewRecommendPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewRecommendResult;
import net.g1project.ecp.api.model.sales.regularevent.ApRegularEventRequester;
import net.g1project.ecp.api.model.sales.regularevent.AttendanceCheckHists;
import net.g1project.ecp.api.model.sales.regularevent.Award;
import net.g1project.ecp.api.model.sales.regularevent.Awards;
import net.g1project.ecp.api.model.sales.regularevent.RegularEvent;
import net.g1project.ecp.api.model.sales.regularevent.RegularEventRequesters;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
@RestController
@RequestMapping("/display")
public class EventRestController extends AbstractController {

    /**
     * 행사 유형별 행사 정보 조회
     * @param requestEvent 
     * @return
     */
    
    @RequestMapping("/regularEventSummary")
    public ResponseEntity<?> regularEventSummary(RequestEvent requestEvent) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
    
            RegularEvent regularEvent = regulareventApi.regularEventSummary( requestEvent.getRegularEventType());
            result.put("regularEvent", regularEvent);
        
        return ResponseEntity.ok(result);
    }
    
    
    /**
     * 행사참여
     * @param requestEvent
     * @return
     */
    @RequestMapping("/participated")
    public ResponseEntity<?> participated(RequestEvent requestEvent, HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        Awards awards = regulareventApi.regularEventParticipated(requestEvent.getRegularEventType(), requestEvent.getRequestTitle(), requestEvent.getRequestReason(), requestEvent.getEmailAddress(), requestEvent.getVerifNo());
        //result.put("awards", awards);

        return ResponseEntity.ok(awards);


    }
        
    //
    /**
     * 행사 신청자 목록
     * @param requestEvent
     * @return
     */
    @RequestMapping("/regularEventRequesters")
    public ResponseEntity<?> regularEventRequesters(RequestEvent requestEvent, HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        RegularEventRequesters requesters = regulareventApi.regularEventRequesters(requestEvent.getRegularEventType(), requestEvent.getRegularEventSn(), requestEvent.getOffset(), requestEvent.getLimit(), null);
        result.put("requesters", requesters);

        return ResponseEntity.ok(result);

    }
    
    /**
     *  Play 메이크업 클래스 신청
     * @return
     */
    @RequestMapping("/visitEducations")
    public ResponseEntity<?> visitEducations(
              VisitEducationPost requestInfo
            , String preStoreAddress1
            , String preStoreAddress2
            , String preCountryNo
            , String preCellPhoneNo
            , String preZpCode
            , HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
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

    }
    
    /**
     * 출석체크 이력조회
     * @param requestEvent
     * @return
     */
    @RequestMapping("/status")
    public ResponseEntity<?> status(RequestEvent requestEvent, HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        AttendanceCheckHists attendanceCheckHists = regulareventApi.regularEventStatus(requestEvent.getRegularEventType(), requestEvent.getDay());
        result.put("attendanceCheckHists", attendanceCheckHists);

        return ResponseEntity.ok(result);

    }
        
    /**
     * 상시이벤트 배송지등록 
     * @param requestEvent
     * @return
     */
    @RequestMapping("/regularEventTermsAgree")
    public ResponseEntity<?> regularEventTermsAgree(RequestEvent requestEvent, HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();

        // FIXME 임시수정. 값 확인 필요
        ApRegularEventRequester requester = new ApRegularEventRequester();
        requester.setTermsAgreeYn(requestEvent.getTermsAgreeYn());
        requester.setRequesterName(requestEvent.getName());
        EmbeddableTel telNo1 = new EmbeddableTel();
        telNo1.setCountryNo(requestEvent.getCountryNo());
        telNo1.setPhoneNo(req.getParameter("telNo1"));
        requester.setTel(telNo1);
        EmbeddableAddress addr = new EmbeddableAddress();
        addr.setCountryCode(requestEvent.getCountryNo());
        addr.setAddress1(requestEvent.getAddress());
        requester.setAddress(addr);
        requester.setEmailAddress(requestEvent.getEmailAddress());

        BooleanResult booleanResult = regulareventApi.regularEventTermsAgree(requestEvent.getEventParticipantSn(), requester);

        result.put("booleanResult", booleanResult);

        return ResponseEntity.ok(result);

    }
    
    /**
     * 상시이벤트 배송지 조회
     * @param requestEvent
     * @return
     */
    @RequestMapping("/regularEventShipAddress")
    public ResponseEntity<?> regularEventShipAddress(RequestEvent requestEvent, HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        ApMember member = new ApMember(); 
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


    }

    /**
     * 당첨자 결과 조회 
     * @param requestEvent
     * @return
     */
    @RequestMapping("/winnerNoticeList")
    public ResponseEntity<?> winnerNoticeList(RequestEvent requestEvent) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
            // parameter : String keyword, Long noticeTypeSn, Integer offset, Integer limit, String importantNoticeYn, String eventYn
        FoNoticeResult eventResultList = guideApi.getFoNotices(requestEvent.getKeyword(), null, requestEvent.getOffset(), requestEvent.getLimit(), null, "Y");

        result.put("winnerNoticeList", eventResultList);
        return ResponseEntity.ok(result);

    }
    
    /**
     * 당첨자 결과 조회 
     * @param requestEvent GET
     * @return
     */
    @RequestMapping("/winnerNoticeDetail")
    public ResponseEntity<?> winnerNoticeDetail(RequestEvent requestEvent) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        // parameter : String keyword, Long noticeTypeSn, Integer offset, Integer limit, String importantNoticeYn, String eventYn
        FoNotice winnerNoticeDetail = guideApi.getFoNotice(requestEvent.getFoNoticeSn());

        result.put("winnerNoticeDetail", winnerNoticeDetail);
        return ResponseEntity.ok(result);

    }
    
    
    
    /**
     * 기획전 이벤트
     * @param requestEvent
     * @return
     */
    @RequestMapping("/planDisplayList")
    public ResponseEntity<?> planDisplayList(RequestEvent requestEvent, HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        PlanDisplayEventListResult planDisplayEventListResult
            = plandisplayApi.getPlanDisplayEventList(
                      requestEvent.getStatus() //status: 기획전시상태코드 (PlanDisplayStatus) , Progress - 진행 , End - 종료,
                    , requestEvent.getTypes() //types: 기획전시 유형코드 리스트(PlanDisplayType) , Link - planDisplayParticipatedURL링크 , General - 일반구성기획전시 , SameTimePur - 동시구매기획전시,
                    , requestEvent.getEventIncludeYn() //eventIncludeYn: 행사포함여부 , Y - 행사 포함 , N - 행사 미포함 , 미입력시 전체 (행사포함여부 조회조건 없음)
                    , requestEvent.getOrder() //order: 정렬방식 (PlanDisplaySortMethod) , SortOrder , StartDt , Deadline
                    , requestEvent.getBrandSns() //brandSns: 브랜드일련번호리스트
                    , requestEvent.getOffset()
                    , requestEvent.getLimit()
                    );

        result.put("planDisplayEventListResult", planDisplayEventListResult);
        return ResponseEntity.ok(result);

    }
    
    /**
     * 기획전 이벤트 _ 기획전시 댓글목록(행사참여자) /sales/plandisplays/{planDisplaySn}/comments기획전시 댓글목록(행사참여자)
     * @param requestEvent
     * @return
     */
    @RequestMapping("/planDisplayComments")
    public ResponseEntity<?> planDisplayComments(RequestEvent requestEvent, HttpServletRequest req) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        EventParticipantResult eventParticipantResult = plandisplayApi.getProdPlanDisplayEventComments(requestEvent.getPlanDisplaySn(), requestEvent.getOffset() , requestEvent.getLimit(), "New");

        result.put("eventParticipantResult", eventParticipantResult);

        return ResponseEntity.ok(result);
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
    public ResponseEntity<?> planDisplayParticipated(RequestEvent requestEvent, EventParticipatedPost eventParticipatedPost, MultipartFile[] picture, HttpServletRequest req) {
        System.out.println("========================== " + eventParticipatedPost.getTermsAgreeYn());
        System.out.println("========================== " + requestEvent.getTermsAgreeYn());
        
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        if (picture != null) {
            System.out.println("length : " + picture.length);
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

      }
    
    /***
     * 기획전시 이벤트 _참여댓글형 행사참여 - 이미지 포함 //ecp-fileUploads-v1
     *
     * @param requestEvent
     * @param eventParticipatedPost
     * @return
     */
    @RequestMapping("/planDisplaySimpleParticipated")
    public ResponseEntity<?> planDisplaySimpleParticipated(RequestEvent requestEvent, EventParticipatedPost eventParticipatedPost) {
        
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        eventParticipatedPost.setMemberSn(getMemberSn());
        eventParticipatedPost.setTermsAgreeYn("Y");

        net.g1project.ecp.api.model.sales.plandisplay.Awards planDisplayAwards
            = plandisplayApi.eventParticipatedPost(requestEvent.getPlanDisplaySn(), eventParticipatedPost);

        result.put("planDisplayAwards", planDisplayAwards);
            
        return ResponseEntity.ok(result);
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
    public ResponseEntity<?> updateParticipated(RequestEvent requestEvent,EventParticipatedPost eventParticipatedPost, MultipartFile[] picture, HttpServletRequest req) {
//      if(eventParticipatedPost.getEventCommentImgs() != null && eventParticipatedPost.getEventCommentImgs().size() > 0) {
//          System.out.println("========================== " + eventParticipatedPost.getEventCommentImgs().size());
//          System.out.println("========================== " + eventParticipatedPost.getEventCommentImgs().get(0).getEventCommentImgSn());
//      }
//      System.out.println("========================== " + req.getParameter("deleteEvalImgSnList"));
//      System.out.println("========================== " + req.getParameter("eventCommentImgs"));
//      System.out.println("========================== " + req.getParameter("eventCommentImgSn"));

        if(!StringUtils.isEmpty(req.getParameter("eventCommentImgSn"))) {
            List<EventCommentImg> eventCommentImgs = new ArrayList<EventCommentImg>();
            EventCommentImg eventCommentImg = new EventCommentImg();
            eventCommentImg.setEventCommentImgSn(Long.parseLong(req.getParameter("eventCommentImgSn")));
            eventCommentImgs.add(eventCommentImg);
            eventParticipatedPost.setEventCommentImgs(eventCommentImgs);
        }

        HashMap<String, Object> result = new HashMap<String, Object>();

        if (picture != null) {
            //System.out.println("length : " + picture.length);
            eventParticipatedPost.setFiles(imageSettingList(picture));
        }

        //eventParticipatedPost.setFiles(imageSettingList(picture));
        eventParticipatedPost.setMemberSn(getMemberSn());

        if(eventParticipatedPost.getTermsAgreeYn().equals("true")) {
            eventParticipatedPost.setTermsAgreeYn("Y");
        } else {
            eventParticipatedPost.setTermsAgreeYn("N");
        }

        BooleanResult booleanResult = plandisplayApi.eventParticipatedUpdatePost(requestEvent.getPlanDisplaySn(), requestEvent.getEventParticipantSn(), eventParticipatedPost);

        result.put("booleanResult", booleanResult);

        return ResponseEntity.ok(result);
      }
    
    /***
     * 기획전시 이벤트 _참여댓글형 행사참여삭제 -/v1/{mallId}/sales/plandisplays/{planDisplaySn}/deleteComment/{eventParticipantSn}
     *
     * @param requestEvent
     * @return
     */
    @RequestMapping("/deleteParticipated")
    public ResponseEntity<?> deleteParticipated(RequestEvent requestEvent) {

        HashMap<String, Object> result = new HashMap<String, Object>();

        BooleanResult booleanResult = plandisplayApi.planDisplayEventDeleteComment(requestEvent.getPlanDisplaySn(), requestEvent.getEventParticipantSn());

        result.put("booleanResult", booleanResult);

        return ResponseEntity.ok(result);

      }
    
    /***
     * 기획전시 이벤트 _참여댓글형 추천 -/v1/{mallId}/sales/plandisplays/{planDisplaySn}/recommendComment/{eventParticipantSn}
     *
     * @param requestEvent
     * @return
     */
    @RequestMapping("/recommendParticipated")
    public ResponseEntity<?> recommendParticipated(RequestEvent requestEvent) {

        HashMap<String, Object> result = new HashMap<String, Object>();

        BooleanResult booleanResult = plandisplayApi.planDisplayEventRecommendComment(requestEvent.getPlanDisplaySn(), requestEvent.getEventParticipantSn());

        result.put("booleanResult", booleanResult);

        return ResponseEntity.ok(result);

    }
    
    /**
     * 기획전시 이벤트 상세
     *
     * @param requestEvent
     * @param previewKey
     * @return
     */
    @RequestMapping("/planDisplayEvent")
    public ResponseEntity<?> planDisplayEvent(RequestEvent requestEvent, String previewKey) {
        
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        if(0L != getMemberSn()) {
            requestEvent.setMemberSn(getMemberSn());
        }

        PlanDisplay planDisplay = plandisplayApi.getPlanDisplayEvent(requestEvent.getPlanDisplaySn(), previewKey);

        result.put("planDisplay", planDisplay);

        return ResponseEntity.ok(result);

      }
    
     /**
     *  AP 전용 뷰티테스터 신청내역 삭제
     *
     * @param regularEventSn
     * @param regularEventRequesterSn
     * @return
     */
    @RequestMapping("/beauty_test/deleteParticipated")
    @ResponseBody
    public ResponseEntity<?> regularEventDeleteParticipated(String regularEventSn, String regularEventRequesterSn) {
        
        HashMap<String, Object> result = new HashMap<String, Object>();
        try {
            System.out.println("regularEventDeleteParticipated");
            System.out.println("  - regularEventSn  : " + regularEventSn);
            System.out.println("  - regularEventRequesterSn  : " + regularEventRequesterSn);
            BooleanResult brslt = regulareventApi.apRegularEventDeleteParticipated(Long.parseLong(regularEventSn), Long.parseLong(regularEventRequesterSn));
            result.put("result", brslt.isResult());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    /**
     *  AP 전용 뷰티테스터 행사 상세 조회
     *
     * @param regularEventSn
     * @return
     */
    @RequestMapping({"/beauty_test/regular_event_detail"})
    @ResponseBody
    public ResponseEntity<?> regularEventDetail(String regularEventSn) {
        System.out.println("#### " + regularEventSn);
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
            RegularEvent regularEvent = new RegularEvent();
            try {
                regularEvent = regulareventApi.apRegularEvent(Long.parseLong(regularEventSn));
            }catch(Exception e) {
                e.printStackTrace();
            }
            result.put("regularEvent", regularEvent);
            
            long memberSn = getMemberSn()==null?-1:getMemberSn();
            
            List<OnlineProdInfo> onlineProdInfos = new ArrayList();
            try {
                for(Award award : regularEvent.getAwards()) {
                    OnlineProdInfo op = productApi.getOnlineProduct(award.getOnlineProdSn(), award.getProdSn(), memberSn, "N");
                    onlineProdInfos.add(op);
                }
            }catch(Exception e) {
                
            }
            result.put("onlineProdInfos", onlineProdInfos);
            
            MemberSession membersession = getMemberSession();
            result.put("memberInfo", membersession.getMember());
            
            String status = "";
            Date cDate = new Date();
            try{
                if(cDate.after(regularEvent.getRequestStartDt()) && cDate.before(regularEvent.getRequestEndDt())) {
                    status = "RQ";
                }else if(cDate.after(regularEvent.getWinnerNoticeExpectedDt()) && cDate.before(regularEvent.getReviewRegistStartDt())) {
                    status = "TN";
                }else if(cDate.after(regularEvent.getReviewRegistStartDt()) && cDate.before(regularEvent.getReviewRegistEndDt())) {
                    status = "RR";
                }else if(cDate.after(regularEvent.getBestReviewNoticeDt()) && cDate.before(regularEvent.getEventEndDt())){
                    status = "BR";
                }else if(cDate.after(regularEvent.getEventEndDt())){
                    status = "EE";
                }
            }catch(Exception e){
                
            }
            result.put("status", status);
            
            /****/
            RegularEventRequesters requesters = new RegularEventRequesters();
            RegularEventRequesters winners = new RegularEventRequesters();
            boolean isRequest = false;
            boolean isWin = false;
            requesters = regulareventApi.apRegularEventRequesters(Long.parseLong(regularEventSn), "All", 0, 10000, null);   //신청자 목록 : winStatusCode = All 추가 필요
            winners = regulareventApi.apRegularEventRequesters(Long.parseLong(regularEventSn), "Win", 0, 10000, null);      //당첨자 목록 : winStatusCode = Win 추가 필요
            boolean isReview = regulareventApi.apRegularEventIsReview(Long.parseLong(regularEventSn)).isResult();
            isRequest = requesters.getRegularEventRequesters().stream().anyMatch(o -> o.getMemberSn().equals(/**Long.parseLong("311")/*/memberSn/**/));
            isWin = winners.getRegularEventRequesters().stream().anyMatch(o -> o.getMemberSn().equals(memberSn));
            result.put("requesters", requesters);
            result.put("winners", winners);
            result.put("isRequest", isRequest);
            result.put("win", isWin);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    /**
     *  AP 전용 뷰티테스터 행사 제품 리뷰 목록 조회
     *
     * @param regularEventSn
     * @return
     */
    @RequestMapping({"/beauty_test/regular_event_product_reviews"})
    @ResponseBody
    public ResponseEntity<?> regularEventProductReviews(String regularEventSn, int offset, int limit, String reviewSort) {
        System.out.println("#### regularEventSn : " + regularEventSn);
        System.out.println("#### offset : " + offset);
        System.out.println("#### limit : " + limit);
        System.out.println("#### reviewSort : " + reviewSort);
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
            RegularEvent regularEvent = regulareventApi.apRegularEvent(Long.parseLong(regularEventSn));
            result.put("regularEvent", regularEvent);
            
            long onlineProdSn = /**360;/*/regularEvent.getAwards().get(0).getOnlineProdSn();/**/
            long prodSn = /**261474;/*/regularEvent.getAwards().get(0).getProdSn();/**/
            long memberSn = getMemberSn()==null?-1:getMemberSn();
            String onlyProd = "N";  //단일단위상품여부
            
            /** status 별 추가정보 조회 **/
            //review
            String prodReviewUnit = "OnlineProd";
            String prodReviewType = "ExperienceGrp";
            //int offset = 0;
            //int limit = 15;
            String styleCode = "";
            String prodReviewSort = reviewSort;    //정렬방식 - Last(최근등록순) - HighScope(별점높은순) - LowScope(별점낮은순) - Recommend(추천많은순) - View(조회많은순)
            String scope = "All";   //별점 필터. All(전체), 5, 4, 3, 2, 1
            String topReviewOnlyYn = "N";
            String topReviewFirstYn = "Y";
            Date startDate = null;//new Date();
            Date endDate = null;//new Date();
            String imageOnlyYn = "N";
            ProdReviewListInfo prodReviewListInfo = productApi.getProductReviews(prodReviewUnit, prodReviewType, offset, limit, memberSn<0?null:memberSn, onlineProdSn, prodSn, styleCode, Long.parseLong(regularEventSn), prodReviewSort, scope, topReviewOnlyYn, topReviewFirstYn, startDate, endDate, imageOnlyYn, null, null);
            result.put("prodReviewListInfo", prodReviewListInfo);            
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    
    @RequestMapping("/beauty_test/regularEventProductReviewRecommend")
    public ResponseEntity<?> reviewRecommendToggle(Model model, int prodReviewSn) {
        
        HashMap<String, Object> result = new HashMap<String, Object>();
        try {
    
//            HashMap<String, Object> reviewDetailInfoMap = getRegularEventProductReviewDetailInfo(prodReviewSn);
//            ProdReviewInfo prodReviewInfo =  (ProdReviewInfo) reviewDetailInfoMap.get("prodReviewInfo");
            String toggleDiv = "";
            boolean isSuccess = false;
            
            long memberSn = getMemberSn()==null?-1:getMemberSn();
            
            ProdReviewRecommendResult rslt = new ProdReviewRecommendResult();
            try {
                toggleDiv = "post";
                ProdReviewRecommendPost body = new ProdReviewRecommendPost();
                body.setMemberSn(memberSn);
                rslt = productApi.postProductReviewRecommend(Long.parseLong(String.valueOf(prodReviewSn)), body);
                isSuccess = true;
            }catch(Exception e) {
                if(e.getClass() == net.g1project.ecp.api.exception.ApiException.class && e.getMessage().indexOf("already recommended")>-1) {
                    toggleDiv = "delete";
                    rslt = productApi.deleteProductReviewRecommend(Long.parseLong(String.valueOf(prodReviewSn)), memberSn);
                    isSuccess = true;
                }
            }
            
            ProdReviewInfo prodReviewInfo = productApi.getProductReviewDetail(Long.parseLong(String.valueOf(prodReviewSn)), memberSn);
            
            result.put("toggleDiv", toggleDiv);
            result.put("isSuccess", isSuccess);
            result.put("recommendCnt", prodReviewInfo.getRecommendCnt());
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
    
    /**
     *  AP 전용 뷰티테스터 행사 신청자 조회
     *
     * @param regularEventSn
     * @return
     */
    @RequestMapping({"/beauty_test/regular_event_requesters"})
    @ResponseBody
    public ResponseEntity<?> regularEventRequesters(String regularEventSn, int offset, int limit, String order) {
        System.out.println("#### regularEventSn : " + regularEventSn);
        System.out.println("#### offset : " + offset);
        System.out.println("#### limit : " + limit);
        System.out.println("#### order : " + order);
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
            RegularEventRequesters requesters = new RegularEventRequesters();
            RegularEventRequesters winners = new RegularEventRequesters();
            
            List<Long> ownRequesterSnList = new ArrayList();
            boolean isRequest = false;
            boolean isWin = false;
            
            try {
                requesters = regulareventApi.apRegularEventRequesters(Long.parseLong(regularEventSn), "All", offset, limit, order);   //신청자 목록 : winStatusCode = All 추가 필요
                winners = regulareventApi.apRegularEventRequesters(Long.parseLong(regularEventSn), "Win", offset, limit, order);      //당첨자 목록 : winStatusCode = Win 추가 필요
                
                boolean isReview = regulareventApi.apRegularEventIsReview(Long.parseLong(regularEventSn)).isResult();
                
                long memberSn = getMemberSn()==null?-1:getMemberSn();
/*                
                for(RegularEventRequester rer : requesters.getRegularEventRequesters()) {
                    System.out.println(rer.getMemberSn() + " : " + rer.getMemberId() + " : " + rer.getRequestTitle());
                }
*/                
                isRequest = requesters.getRegularEventRequesters().stream().anyMatch(o -> o.getMemberSn().equals(/**Long.parseLong("311")/*/memberSn/**/));
                isWin = isReview;//winners.getRegularEventRequesters().stream().anyMatch(o -> o.getMemberSn().equals(memberSn));
                
                /*
                if(ownRequesterSnList.size()==0) {
                    try {
                        ApRegularEventRequester body = new ApRegularEventRequester();
                        body.setRequesterName("홍길동");
                        body.setRequestTitle("제목");
                        body.setRequestReason("사연");
                        regulareventApi.apRegularEventParticipated(Long.parseLong(regularEventSn), body);
                    }catch(Exception e) {
                        e.printStackTrace();
                    }
                }
                */
            }catch(Exception e) {
                e.printStackTrace();
            }
            result.put("requesters", requesters);
            result.put("ownRequesterSnList", ownRequesterSnList);
            result.put("winners", winners);
            result.put("isRequest", isRequest);
            result.put("win", isWin);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    /**
     *  AP 전용 뷰티테스터 베스트리뷰 조회
     *
     * @param regularEventSn
     * @return
     */
    @RequestMapping({"/beauty_test/bestProductReviews"})
    @ResponseBody
    public ResponseEntity<?> regularEventRequesters(String order) {
        System.out.println("#### order : " + order);
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
            ProdReviewListInfo bestReviewList = new ProdReviewListInfo();
            
            try {
                bestReviewList = productApi.getProductReviews("OnlineProd", "ExperienceGrp", 0, 10000, null, null, null, null, null, order, "All", "N", "Y", null, null, "N", null, null);
            }catch(Exception e) {
                e.printStackTrace();
            }
            result.put("bestReviewList", bestReviewList);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    /** 뷰티테스터 신청 @임시 **/
    @GetMapping("/beauty_test/registRequest")
    public String requestBeautyTester(String regularEventSn, String address,String zipCode,String emailAddr,String hpUrl,String title,String reason,String snsUrl) {
        
        String result = "";
        
        if(!isLoggedIn()) {
            try {
                result = "로그인 필요";
//                response.sendError(500, "로그인 필요");
            } catch (Exception e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }
        }
        
        try {
            ApRegularEventRequester body = new ApRegularEventRequester();
            EmbeddableAddress addr = new EmbeddableAddress();
            addr.setAddress1(address);
            addr.setZipCode(zipCode);
            body.setAddress(addr);
            body.setEmailAddress(emailAddr);
            body.setPersonalHomepageUrl(hpUrl);
            body.setRegularEventRequesterSn(getMemberSn()==null?-1:getMemberSn());
            body.setRequesterName("");
            body.setRequestTitle(title);
            body.setRequestReason(reason);
            body.setSnsUrl(snsUrl);
            EmbeddableTel tel = new EmbeddableTel();
            tel.setCountryNo("82");
            tel.setPhoneNo("1011112222");
            body.setTel(tel);
            body.setTermsAgreeYn("Y");
            Awards awards = regulareventApi.apRegularEventParticipated(Long.parseLong(regularEventSn), body);
            System.out.println("awards.eventParticipantSn : " + awards.getEventParticipantSn());
            //BooleanResult result = regulareventApi.apRegularEventUpdateParticipated(Long.parseLong(regularEventSn), Long.parseLong(regularEventRequesterSn), body);
//          System.out.println(result.isResult());
            result = "성공";
        }catch(Exception e) {
            e.printStackTrace();
            result = e.getMessage();
        }
        
        return result;
    }
    
    /** 뷰티테스터 리뷰 등록 @임시 **/
    @GetMapping("/beauty_test/postProdReview")
    public String registProdReview(String prodReviewTypeCode, String ordNo, String prodSn, String winnerSn, String regularEventSn, 
            String snsUrl, String scope, String prodReviewTitle, String prodReviewBodyText, String searchTag, String imageFileUrl, String imgDesc) {
        
        String result = "";
        
        if(!isLoggedIn()) {
            try {
                result = "로그인 필요";
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        
        try {
            long memberSn = getMemberSn()==null?-1:getMemberSn();
            ProdReviewPost body = new ProdReviewPost();
            body.setMemberSn(memberSn);
            body.setProdReviewTypeCode(prodReviewTypeCode);    //Pur(구매후기), Prod(상품리뷰), ExperienceGrp(체험단)
            body.setOrdNo(ordNo);
            body.setProdSn(Long.parseLong(prodSn));
            body.setWinnerSn(Long.parseLong(winnerSn));
            body.setRegularEventSn(Long.parseLong(regularEventSn));
            body.setSnsUrl(snsUrl);
            body.setScope(Integer.parseInt(scope));
            body.setProdReviewTitle(prodReviewTitle);
            body.setProdReviewBodyText(prodReviewBodyText);
            body.setSearchTag(searchTag);
            List<ProdReviewImgPost> imgList = new ArrayList();
            ProdReviewImgPost img = new ProdReviewImgPost();
            img.setSortOrder(0);
            img.setDetailSortOrder(0);
            img.setFoTemplateNo(1);
            img.setMediaExistYn("N");
            img.setVideoYn("N");
            img.setImageFileUrl(imageFileUrl);
            img.setImgDesc(imgDesc);
            imgList.add(img);
            body.setImgList(imgList);
            body.setPostNowYn("N");
            body.setTermsAgreeYn("Y");
            
            productApi.postProdReview(body);
            result = "성공";
        }catch(Exception e) {
            e.printStackTrace();
            result = e.getMessage();
        }
        
        return result;
    }

}
