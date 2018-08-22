/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.display.controller;

import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.common.SeoEntity;
import kr.ap.comm.support.common.SnsEntity;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.sales.display.PageInfo;
import net.g1project.ecp.api.model.sales.guide.FoNotice;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplay;
import net.g1project.ecp.api.model.sales.plandisplay.PlanDisplayEventListResult;
import net.g1project.ecp.api.model.sales.regularevent.RegularEvent;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@Controller
@RequestMapping("/display")
public class EventViewController extends AbstractController {

	@RequestMapping("/event")
    @PageTitle(title = "이벤트") // 기획전시
    public String event(Model model, String displayMenuId) {
		
		String pageName = ""; 
		
        //Mobile
        if (isMobileDevice()) {
    		
        	pageName = "M02_event_m"; 
    		
        }

        //PC
        if (isPcDevice()) {
        	
        	pageName = "M02_event_p"; 
        }
           
        //이벤트 목록
        PlanDisplayEventListResult planDisplayEventListResult 
        	= plandisplayApi.getPlanDisplayEventList(
        			  "" //keyword: 검색, 
        			, "" //status: 기획전시상태코드 (PlanDisplayStatus) , Progress - 진행 , End - 종료, 
        			, "" //types: 기획전시 유형코드 리스트(PlanDisplayType) , Link - URL링크 , General - 일반구성기획전시 , SameTimePur - 동시구매기획전시, 
        			, "" //eventIncludeYn: 행사포함여부 , Y - 행사 포함 , N - 행사 미포함 , 미입력시 전체 (행사포함여부 조회조건 없음)
        			, "" //order: 정렬방식 (PlanDisplaySortMethod) , SortOrder , StartDt , Deadline
        			, null //brandSns: 브랜드일련번호리스트
        			, 0 //offset
        			, 100 //limit
        			); 
        
        List<PlanDisplay> resultList = planDisplayEventListResult.getPlanDisplayList();
        
        // 상시 이벤트 (뷰티테스터 , 무료샘플신청 D-Day) 날짜 계산

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
		
		//기획전시 히스토리 저장
		if(0L != getMemberSn()) {
			ShoppingMarkPost body = new ShoppingMarkPost();
			body.setShoppingMarkTgtCode("Plandisplay");
			
				if(planDisplaySn != null) {
					body.setPlanDisplaySn(planDisplaySn);
					body.setDisplayMenuSetId(APConstant.EH_DISPLAY_MENU_SET_ID);
					body.setDisplayMenuId("event");

				try{
					shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
				}catch(Exception e) {
					e.printStackTrace();
				}
			}
		}
				
		return "display/" + planDisplay.getDetailPageId();

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
		
	@RequestMapping("/couponZone")
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
		
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/beauty_test")
    @PageTitle(title = "뷰티테스터 신청 안내")
    public String beauty_test(Model model, String displayMenuId) {
		 
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
        RegularEvent regularEvent = regulareventApi.regularEventSummary(APConstant.PROD_EXPERIENCE_GRP);	
		
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("regularEvent", regularEvent);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/sweet_letter")
    @PageTitle(title = "스윗레터 100% 당첨")
    public String sweet_letter(Model model, String displayMenuId) {
	
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	@RequestMapping("/free_sample")
    @PageTitle(title = "무료샘플신청")
    public String free_sample(Model model, String displayMenuId) {
	
        RegularEvent regularEvent = regulareventApi.regularEventSummary(APConstant.SAMPLE_EXPERIENCE_GRP);
        
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
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
        
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
        model.addAttribute("displayMenuId", displayMenuId);
        
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
