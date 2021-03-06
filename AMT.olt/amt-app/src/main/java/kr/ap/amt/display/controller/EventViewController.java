/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.display.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.common.SeoEntity;
import kr.ap.comm.support.common.SnsEntity;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableAddress;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.display.CornerContentsSet;
import net.g1project.ecp.api.model.sales.display.PageInfo;
import net.g1project.ecp.api.model.sales.giftcard.ProdInfo;
import net.g1project.ecp.api.model.sales.guide.FoNotice;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplay;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplayEventListResult;
import net.g1project.ecp.api.model.sales.product.FlagInfo;
import net.g1project.ecp.api.model.sales.product.OnlineProdImage;
import net.g1project.ecp.api.model.sales.product.OnlineProdInfo;
import net.g1project.ecp.api.model.sales.product.OnlineProdPriceInfo;
import net.g1project.ecp.api.model.sales.product.ProdImage;
import net.g1project.ecp.api.model.sales.product.ProdReviewImg;
import net.g1project.ecp.api.model.sales.product.ProdReviewInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewRecommendPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewRecommendResult;
import net.g1project.ecp.api.model.sales.product.ProductInfo;
import net.g1project.ecp.api.model.sales.regularevent.ApRegularEventRequester;
import net.g1project.ecp.api.model.sales.regularevent.Award;
import net.g1project.ecp.api.model.sales.regularevent.Awards;
import net.g1project.ecp.api.model.sales.regularevent.RegularEvent;
import net.g1project.ecp.api.model.sales.regularevent.RegularEventRequester;
import net.g1project.ecp.api.model.sales.regularevent.RegularEventRequesters;
import net.g1project.ecp.api.model.sales.regularevent.RegularEvents;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@Controller
@RequestMapping("/display")
public class EventViewController extends AbstractController {

	@RequestMapping({"/event", "/nowEvent"})
    @PageTitle(title = "이벤트") // 기획전시
    public String event(Model model, String displayMenuId) {
		
		String pageName = ""; 
		
        //Mobile
        if (isMobileDevice()) {
    		
        	pageName = "M01_event_m"; 
    		
        }

        //PC
        if (isPcDevice()) {
        	
        	pageName = "M01_event_m"; 
        }
           
        //이벤트 목록
        PlanDisplayEventListResult planDisplayEventListResult 
        	= plandisplayApi.getPlanDisplayEventList(
        			  "Progress" //status: 기획전시상태코드 (PlanDisplayStatus) , Progress - 진행 , End - 종료,
        			, "" //types: 기획전시 유형코드 리스트(PlanDisplayType) , Link - URL링크 , General - 일반구성기획전시 , SameTimePur - 동시구매기획전시, 
        			, "" //eventIncludeYn: 행사포함여부 , Y - 행사 포함 , N - 행사 미포함 , 미입력시 전체 (행사포함여부 조회조건 없음)
        			, "StartDt" //order: 정렬방식 (PlanDisplaySortMethod) , SortOrder , StartDt , Deadline
        			, null //brandSns: 브랜드일련번호리스트
        			, 0 //offset
        			, 100 //limit
        			); 
        
        List<PlanDisplay> resultList = planDisplayEventListResult.getPlanDisplayList();
        
//        // 상시 이벤트 (뷰티테스터 , 무료샘플신청 D-Day) 날짜 계산
//
//        Map<String, Long> dDays = new HashMap<String, Long>(); 
//        String regularEventType[] = {APConstant.PROD_EXPERIENCE_GRP,APConstant.SAMPLE_EXPERIENCE_GRP};  // 무료체험단 무료샘플
//        
//    	for(int i = 0; i < regularEventType.length; i++) {
//    		
//    		 try { 
//	    	
//    			RegularEvent regularEvent = regulareventApi.regularEventSummary(regularEventType[i]);
//	    		long dday = dDaycalc(new Date(), regularEvent.getEventEndDt()); 
//	    		dDays.put( regularEventType[i], + dday);
//    		
//    		 }catch(Exception e){
//    			 
//    			 dDays.put( regularEventType[i], + -1L); 
//    		 }
//      
//    	}  
    	   
//		model.addAttribute("dDays", dDays);
		model.addAttribute("resultList", resultList);
		model.addAttribute("displayMenuId", displayMenuId);

       return "display/"+ pageName; 

    }

	@RequestMapping({"/event_detail", "/event_detail/preview"})
	@PageTitle(title = "이벤트 상세") // 기획전시
	public String eventDetail(Model model, Long planDisplaySn, String previewKey ) {

		PlanDisplay planDisplay = plandisplayApi.getPlanDisplayEvent(planDisplaySn, previewKey);

		/*
		 * 일반기획전시: M02_d_generel_1
		 * 동시구매기획전시: M02_d_same_time_1
		 */

		SnsEntity snsEntity = new SnsEntity();
        snsEntity.setUrl(getFullUri());
        if(StringUtils.isEmpty(planDisplay.getSnsIfImg())) {
        	if (isMobileDevice()) {
        		snsEntity.setImage(planDisplay.getBannerImgM1());
        	}else {
        		snsEntity.setImage(planDisplay.getBannerImgP1());
        	}
        }else {
        	snsEntity.setImage(planDisplay.getSnsIfImg());
        }      
        if(StringUtils.isEmpty(planDisplay.getSnsIfTitle())) {
        	snsEntity.setTitle(planDisplay.getPlanDisplayTitle());
        }else {
        	snsEntity.setTitle(planDisplay.getSnsIfTitle());
        }
        if(StringUtils.isEmpty(planDisplay.getSnsIfDesc())) {
        	snsEntity.setDescription(planDisplay.getPlanDisplayTitle());
        }else {
        	snsEntity.setDescription(planDisplay.getSnsIfDesc());
        }
        snsEntity.setHashtag(planDisplay.getSnsHashTag());
		model.addAttribute("sns", snsEntity);

		SeoEntity seoEntity = new SeoEntity();
		seoEntity.setTitle(planDisplay.getSeoTitle());
		seoEntity.setDescription(planDisplay.getSeoDesc());
		seoEntity.setKeyword(planDisplay.getSeoSearchKeyword());
		model.addAttribute("seo", seoEntity);
		
		model.addAttribute("planDisplay", planDisplay);
		
		 //이벤트 목록
        PlanDisplayEventListResult planDisplayEventListResult 
        	= plandisplayApi.getPlanDisplayEventList(
        			  "Progress" //status: 기획전시상태코드 (PlanDisplayStatus) , Progress - 진행 , End - 종료,
        			, "" //types: 기획전시 유형코드 리스트(PlanDisplayType) , Link - URL링크 , General - 일반구성기획전시 , SameTimePur - 동시구매기획전시, 
        			, "" //eventIncludeYn: 행사포함여부 , Y - 행사 포함 , N - 행사 미포함 , 미입력시 전체 (행사포함여부 조회조건 없음)
        			, "StartDt" //order: 정렬방식 (PlanDisplaySortMethod) , SortOrder , StartDt , Deadline
        			, null //brandSns: 브랜드일련번호리스트
        			, 0 //offset
        			, 100 //limit
        			); 
        
        List<PlanDisplay> resultList = planDisplayEventListResult.getPlanDisplayList();
        List<PlanDisplay> otherList = new ArrayList<PlanDisplay>();
		for(PlanDisplay pd :resultList) {
			if(!planDisplaySn.equals(pd.getPlanDisplaySn())) {
				otherList.add(pd);
			}
		}
		model.addAttribute("otherList", otherList);
		//return "display/" + planDisplay.getDetailPageId();
		return "display/event-detail";

	}

	@RequestMapping("/event_over")
	@PageTitle(title = "종료된 이벤트") // 기획전시
	public String eventOver(Model model, String displayMenuId ) {

		String pageName = "";
		//Mobile
		if (isMobileDevice()) {
		}

		//PC
		if (isPcDevice()) {
			pageName = "event-over";
		}

		Map<String, Long> dDays = new HashMap<String, Long>(); 
        String regularEventType[] = {APConstant.PROD_EXPERIENCE_GRP,APConstant.SAMPLE_EXPERIENCE_GRP};  // 무료체험단 무료샘플
        
    	for(int i = 0; i < regularEventType.length; i++) {
    		
    		 try { 
	    	
    			RegularEvent regularEvent = regulareventApi.regularEventSummary(regularEventType[i]);
	    		long dday = dDaycalc(new Date(), regularEvent.getEventEndDt()); 
	    		dDays.put( regularEventType[i], + dday);
    		
    		 }catch(Exception e){
    			 
    			 dDays.put( regularEventType[i], + -1L); 
    		 }
      
    	}  
	    	   
		model.addAttribute("dDays", dDays);
		model.addAttribute("displayMenuId", displayMenuId);

		return "display/"+ pageName;

	}

	@RequestMapping("/event_winner")
	@PageTitle(title = "당첨자 발표")
	public String eventWinner(Model model, String displayMenuId) {
		
		model.addAttribute("displayMenuId", displayMenuId);

		return "display/event-list";
	}
	
	@RequestMapping("/eventWinner_detail")
	@PageTitle(title = "당첨자 발표")
	public String eventWinnerDetail(Model model, String displayMenuId, String foNoticeSn) {
		String pageName = "";
		//Mobile
		if (isMobileDevice()) {
			pageName = "event-detail";

		}

		//PC
		if (isPcDevice()) {
			pageName = "event-view";
		}
		
		FoNotice winnerDetail = guideApi.getFoNotice(Long.parseLong(foNoticeSn));  
		
		model.addAttribute("displayMenuId", displayMenuId);
		model.addAttribute("winnerDetail", winnerDetail);
		
		return "display/" + pageName;
	}
		
	@RequestMapping({"/couponZone", "/couponBenefit"})
    @PageTitle(title = "쿠폰존")
    public String coupon_zone(Model model, String displayMenuId) {
		displayMenuId = "couponZone";
        //Mobile
        if (isMobileDevice()) {
    		
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        System.out.println("displayMenuId : " + displayMenuId);
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/vipLounge")
    @PageTitle(title = "VIP라운지")
    public String VIP라운지(Model model, String displayMenuId) {
		displayMenuId = "vipLounge";
        //Mobile
        if (isMobileDevice()) {
    		
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        try { 
	    	
			RegularEvent regularEvent = regulareventApi.regularEventSummary("VIPLounge ");

			model.addAttribute("regularEvent", regularEvent);
		 }catch(Exception e){
			 model.addAttribute("regularEvent", null);
		 }
        
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/daily_check")
    @PageTitle(title = "출석체크")
    public String daily_check(Model model, String displayMenuId) {
		
		displayMenuId = "attendanceCheck";
        //Mobile
        if (isMobileDevice()) {
    		
    		
        }

        //PC
        if (isPcDevice()) {
        	
        }
        
        //PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        //System.out.println(pageInfo.getMenuPageFileId());
        return "display/M01_attendanceCheck_m";
        //return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/pearl_roulette")
    @PageTitle(title = "진주알 룰렛")
    public String pearl_roulette(Model model, String displayMenuId) {
		
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/AppH010403")
    @PageTitle(title = "뷰티테스터 신청 안내")
    public String beauty_test(Model model, String displayMenuId) {
	    
	    /*if(!isLoggedIn()) {
            return "redirect:/login";
        }*/
		 
//		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        RegularEvents regularEventsP = regulareventApi.apRegularEvents("Progress", 0, 1000, "StartDt");//.regularEventSummary(APConstant.PROD_EXPERIENCE_GRP);
        RegularEvents regularEventsE = regulareventApi.apRegularEvents("End", 0, 1000, "StartDt");//.regularEventSummary(APConstant.PROD_EXPERIENCE_GRP);
        
        List<Map<String, Object>> regularEventsPrgs = new ArrayList();
        List<Map<String, Object>> regularEventsEnd = new ArrayList();
        
        for(RegularEvent regularEvent : regularEventsP.getRegularEventList()) {
            /*
            displayStartDt //전시시작일시
            displayEndDt   //전시종료일시
            requestStartDt //신청시작일시 ~ requestEndDt   //신청종료일시   > 참가모집중
            reviewRegistStartDt    //리뷰등록시작일시 ~ reviewRegistEndDt  //리뷰등록종료일시   > 후기등록중
            bestReviewNoticeDt //베스트리뷰공지일시  > 베스트리뷰발표
            */
            String status = "";
            RegularEventRequesters requesters = new RegularEventRequesters();
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
                //e.printStackTrace();
            }
            
            try {
                requesters = regulareventApi.apRegularEventRequesters(regularEvent.getRegularEventSn(), "All", null, null, "StartDt");
            }catch(Exception e) {
                requesters.setTotalCount(0);
                requesters.setRegularEventRequesters(new ArrayList<RegularEventRequester>());
            }
            
            Map<String, Object> rem = new HashMap();
            rem.put("status", status);
            rem.put("requesters", requesters);
            rem.put("regularEvent", regularEvent);
            
            regularEventsPrgs.add(rem);
        }
        
        for(RegularEvent regularEvent : regularEventsE.getRegularEventList()) {
            String status = "";
            RegularEventRequesters requesters = new RegularEventRequesters();
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
                //e.printStackTrace();
            }

            try {
                requesters = regulareventApi.apRegularEventRequesters(regularEvent.getRegularEventSn(), "All", null, null, "StartDt");
            }catch(Exception e) {
                requesters.setTotalCount(0);
                requesters.setRegularEventRequesters(new ArrayList<RegularEventRequester>());
            }
            
            Map<String, Object> rem = new HashMap();
            rem.put("status", status);
            rem.put("requesters", requesters);
            rem.put("regularEvent", regularEvent);
            
            regularEventsEnd.add(rem);
        }
		
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("regularEventsPrgs", regularEventsPrgs);
        model.addAttribute("regularEventsEnd", regularEventsEnd);
        
        return "display/M01_beautyTester_m";// + pageInfo.getMenuPageFileId();

    }
	
	/**
     * 뷰티테스터 상세 (mo specific)
     *
     * @param model
     * @param requestReview
     * @param previewKey
     * @return
     */
    @GetMapping("/beauty_test/detail")
    @PageTitle(title = "뷰티테스터 상세")
    public String beautytesterDetail(Model model, String regularEventSn) {
        
        /*if(!isLoggedIn()) {
            return "redirect:/login";
        }*/
        
        System.out.println("#### regularEventSn : " + regularEventSn);
        try {
            
            RegularEvent regularEvent = new RegularEvent();
            try {
                regularEvent = regulareventApi.apRegularEvent(Long.parseLong(regularEventSn));
            }catch(Exception e) {
                e.printStackTrace();
            }
            model.addAttribute("regularEvent", regularEvent);
            
            long memberSn = getMemberSn()==null?-1:getMemberSn();
            
            List<OnlineProdInfo> onlineProdInfos = new ArrayList();
            try {
                for(Award award : regularEvent.getAwards()) {
                    OnlineProdInfo op = productApi.getOnlineProduct(award.getOnlineProdSn(), award.getProdSn(), memberSn<0?null:memberSn, "N");
                    onlineProdInfos.add(op);
                }
            }catch(Exception e) {
            }
            model.addAttribute("onlineProdInfos", onlineProdInfos);

            /** 당첨 시 당첨자명 표시목적, 신청자목록에서 본인 신청 항목 수정/삭제 버튼 표시 목적**/
            MemberSession membersession = getMemberSession();
            model.addAttribute("memberInfo", membersession.getMember());
            model.addAttribute("memberSn", membersession.getMember_sn());
            
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
                e.printStackTrace();
            }
            model.addAttribute("status", status);

            RegularEventRequesters requesters = new RegularEventRequesters();
            RegularEventRequesters winners = new RegularEventRequesters();
            boolean isReview = false;
            
            
            requesters = regulareventApi.apRegularEventRequesters(Long.parseLong(regularEventSn), "All", null, null, "StartDt");   //신청자 목록 : winStatusCode = All 추가 필요
            boolean isRequest = requesters.getRegularEventRequesters().stream().anyMatch(o -> o.getMemberSn().equals(/**Long.parseLong("311")/*/memberSn/**/));
            
            if(!status.equals("RQ")) {
                try {
                    winners = regulareventApi.apRegularEventRequesters(Long.parseLong(regularEventSn), "Win", null, null, "StartDt");      //당첨자 목록
                }catch(Exception e) {
                    System.out.println("exception : getWinnersInfo..."+e.getMessage());
                }
                
                try {
                    isReview = regulareventApi.apRegularEventIsReview(Long.parseLong(regularEventSn)).isResult();
                }catch(Exception e) {
                    System.out.println("exception : checkPossibleReview..."+e.getMessage());
                }
            }
            
            model.addAttribute("requesters", requesters);
            model.addAttribute("isRequest", isRequest);
            model.addAttribute("winners", winners);
            model.addAttribute("isReview", isReview);
        }catch(Exception e) {
            e.printStackTrace();
        }

        return "display/beauty-tester-detail";
    }
    
    /**
     * 뷰티테스터 상세 > 리뷰 상세 (mo specific)
     *
     * @param model
     * @param requestReview
     * @param previewKey
     * @return
     */
    @GetMapping("/beauty_test/review-detail")
    @PageTitle(title = "뷰티테스터 상세")
    public String beautytesterDetailReview(Model model, int prodReviewSn) {
        
//        if(!isLoggedIn()) {
//            return "redirect:/login";
//        }
        
        System.out.println("#### prodReviewSn : " + prodReviewSn);
        
        try {
            
            HashMap<String, Object> result = getRegularEventProductReviewDetailInfo(prodReviewSn);
            
            model.addAttribute("prodReviewInfo", result.get("prodReviewInfo"));
            model.addAttribute("displayReviewImgList", result.get("displayReviewImgList"));

        }catch(Exception e) {
            e.printStackTrace();
        }

        return "display/beauty-tester-review-detail";
    }
    
    /**
     *  AP 전용 뷰티테스터 행사 제품 리뷰 상세 조회
     *  REST-Controller 에 작성되어야 하나 getRegularEventProductReviewDetailInfo 공동사용목적으로 예외...
     *
     * @param regularEventSn
     * @return
     */
    @RequestMapping({"/beauty_test/regular_event_product_review_detail"})
    @ResponseBody
    public ResponseEntity<?> regularEventProductReviewDetail(int prodReviewSn) {
        System.out.println("regularEventProductReviewDetail");
        System.out.println("#### prodReviewSn : " + prodReviewSn);

        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
            result = getRegularEventProductReviewDetailInfo(prodReviewSn);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            e.printStackTrace();
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
 // PC, MC share
    private HashMap<String, Object> getRegularEventProductReviewDetailInfo(int prodReviewSn) {
        System.out.println("getRegularEventProductReviewDetailInfo");
        System.out.println("#### prodReviewSn : " + prodReviewSn);

        HashMap<String, Object> result = new HashMap<String, Object>();
        
        long memberSn = getMemberSn()==null?-1:getMemberSn();
        
        try {
            ProdReviewInfo prodReviewInfo = productApi.getProductReviewDetail(Long.parseLong(String.valueOf(prodReviewSn)), memberSn<0?null:memberSn);
            
            /** Dummy **/
            prodReviewInfo.setProdName("뱀파이어 블랙");
            prodReviewInfo.setRepProdImage("https://s3.ap-northeast-2.amazonaws.com/dsp-dev-download-amt/unitproducts/650010832/650010832_01.png");
            prodReviewInfo.setOnlineProdName("미니 투 매치 컬러믹스");
            prodReviewInfo.setMemberLevelName("WELCOME");
            prodReviewInfo.setRecommendYn("N");
            prodReviewInfo.setReportYn("N");
            
            List<ProdReviewImg> ppiList = new ArrayList();
            /* new */
            ProdReviewImg ppi = new ProdReviewImg();
            ppi.setSortOrder(1);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(1); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_01.jpg");
            ppi.setImgDesc("");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(2);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(2); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_02.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(3);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(2); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_03.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(4);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(2); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_04.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(5);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(3); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_05_1.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(5);
            ppi.setDetailSortOrder(2);
            ppi.setFoTemplateNo(3); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_05_2.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(6);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(4); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_06_1.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(6);
            ppi.setDetailSortOrder(2);
            ppi.setFoTemplateNo(4); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_06_2.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);
            ppi = new ProdReviewImg();
            ppi.setSortOrder(7);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(2); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("/mo/ko/images/display/img_beauty_tester_02.jpg");
            ppi.setImgDesc("정말 유명한 블랙쿠션!! 너무 궁금해서 저도 한번 사용해봤어요 블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ");
            ppiList.add(ppi);/**/

            /* old *
            ppi = new ProdReviewImg();
            ppi.setSortOrder(1);
            ppi.setDetailSortOrder(1);
            ppi.setFoTemplateNo(0); //0: old, 1 ~ 6: new
            ppi.setVideoYn("N");
            ppi.setVideoUrl("");
            ppi.setImageFileUrl("");
            ppi.setImgDesc("<img src=\"/mo/ko/images/display/img_beauty_tester_02.jpg\" alt=\"이미지 내용 입력\" /><p>정말 유명한 블랙쿠션!!</p><p>너무 궁금해서 저도 한번 사용해봤어요</p><p>블랙박스에서 케이스를 꺼내면 고급진 블랙 케이스가 뙇!! ㅎㅎ  반들반들 만지기 아까워요 ㅠㅠ</p>");
            ppiList.add(ppi);/**/
            
            prodReviewInfo.setImgList(ppiList);
            /***********/
            
            List<Map> displayReviewImgList = new ArrayList();
            List<ProdReviewImg> oriImgList = prodReviewInfo.getImgList();
            oriImgList.sort((i1, i2)->{return i1.getSortOrder()<i2.getSortOrder()?-1:i1.getSortOrder()==i2.getSortOrder()?0:1;});
            
            for(int i=0;i<oriImgList.size();i++) {
                ProdReviewImg pri = oriImgList.get(i);
                
                int sortOrder = pri.getSortOrder();
                int tmplNo = pri.getFoTemplateNo();
                Map temp = new HashMap();
                temp.put("foTemplateNo", tmplNo);
                
                List<String[]> imageInfoList = new ArrayList();
                imageInfoList.add(new String[]{pri.getImageFileUrl(), pri.getImgDesc()});
                /**
                 * if 마지막 이미지정보가 아니고 FO에 표시할 템플릿 번호가 3, 4 인 경우
                 *   if 다음 이미지 정보가 지금과 동일한 sortOrder 를 가지는 경우 ( '&& 템플릿 번호 체크' 까지는 필요할것 같지 않아 주석 처리)
                 */
                if(i<oriImgList.size()-1 && (tmplNo == 3 || tmplNo == 4)) {
                    if(oriImgList.get(i+1).getSortOrder() == sortOrder) {// && oriImgList.get(i+1).getFoTemplateNo() == tmplNo) {
                        pri = oriImgList.get(++i);
                        imageInfoList.add(new String[]{pri.getImageFileUrl(), pri.getImgDesc()});
                    }
                }
                temp.put("imageInfoList", imageInfoList);
                
                displayReviewImgList.add(temp);
            }
            
            result.put("prodReviewInfo", prodReviewInfo);
            result.put("displayReviewImgList", displayReviewImgList);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
    
	@RequestMapping("/sweet_letter")
    @PageTitle(title = "스윗레터 100% 당첨")
    public String sweet_letter(Model model, String displayMenuId) {
	
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/free_sample")
    @PageTitle(title = "무료샘플신청")
    public String free_sample(Model model, String displayMenuId) {
	
        RegularEvent regularEvent = regulareventApi.regularEventSummary(APConstant.SAMPLE_EXPERIENCE_GRP);
        
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("regularEvent", regularEvent);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
    
	@RequestMapping("/play_makeup_class")
    @PageTitle(title = "PLAY메이크업 클래스")
    public String play_makeup_class(Model model, String displayMenuId) {

		
        if( displayMenuId == null || ("").equals(displayMenuId)) {
        	displayMenuId = "play_makeup_class";
        }
        
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/freeGift")
	@PageTitle(title = "구매금액대 사은품")
	public String freeGift(Model model, String displayMenuId) {
		if (displayMenuId == null || ("").equals(displayMenuId)) {
			displayMenuId = "freeGift";
		}

		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);
		
		String cornerIds = "";
//		cornerIds = "M01_freeGift_m.4.1,M01_freeGift_m.4.2,M01_freeGift_m.4.3,M01_freeGift_m.4.4";
		List<Corner> corners = displayApi.getMenuPageCorners(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId, null,
				null, cornerIds, false);
		Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();
		for (Corner c : corners) {
			cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
		}

		model.addAttribute("cornersMap", cornersMap);

		return "display/" + pageInfo.getMenuPageFileId();
	}
	
	/**
	 * D-Day 계산  ( 일자로만 리턴합니다. ex) 1111 
	 * @param paramFDate
	 * @param paramEDate
	 * @return long 
	 */
	
	public long dDaycalc(Date paramFDate, Date paramEDate) {
		
		Calendar fromCalendar = Calendar.getInstance();
    	Calendar endCalendar = Calendar.getInstance();
    	
    	long fromDate = 0L;  
    	long endDate = 0L; 
    	
    	fromCalendar.setTime(paramFDate);
    	fromDate = fromCalendar.getTimeInMillis()/(24*60*60*1000);   	
    	
    	endCalendar.setTime(paramEDate);
    	endDate = endCalendar.getTimeInMillis()/(24*60*60*1000);
    	
    	long dDay = endDate - fromDate; 
		
    	if(dDay < 0 ) {
    		dDay = 0; 
    	}
		return dDay; 
	}
	
	
}
