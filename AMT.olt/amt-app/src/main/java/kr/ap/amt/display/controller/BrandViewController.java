/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.display.controller;

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

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.amt.display.vo.RequestBrand;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.ap.bbs.SupportersRequesterInfo;
import net.g1project.ecp.api.model.offlinestore.store.StoreEvalEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventDetailScheduleEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventRequesterEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventRequestersResult;
import net.g1project.ecp.api.model.offlinestore.store.StoreEventScheduleInfo;
import net.g1project.ecp.api.model.offlinestore.store.StoreResult;
import net.g1project.ecp.api.model.sales.display.Corner;
import net.g1project.ecp.api.model.sales.display.CornerContentsSet;
import net.g1project.ecp.api.model.sales.display.PageInfo;
import net.g1project.ecp.api.model.sales.terms.Terms;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@Controller
@RequestMapping("/display")
public class BrandViewController extends AbstractController {

	/**
	 * 브랜드 메인 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @return
	 */
	@RequestMapping("/brand")
    @PageTitle(title = "브랜드")
    public String brand(Model model, String displayMenuId) {
		
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);

        model.addAttribute("displayMenuId", displayMenuId);
        
		return "display/" + pageInfo.getMenuPageFileId();

    }
	
	
	/**
	 * 매장안내 메인 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping({"/l_store_location", "/store_location"})
    @PageTitle(title = "매장찾기")
    public String store_location(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		displayMenuId = "store_location";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/brand-store-find";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/brand-store-find-01";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_store_location";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 매장칭찬하기 탭 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/store_review")
    @PageTitle(title = "매장칭찬")
    public String store_review(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/brand-store-find-03";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/brand-store-find-04";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_store_location";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 매장칭찬 작성하기 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @param storeEvalSn
	 * @return
	 */
	@RequestMapping("/store_review_write")
    @PageTitle(title = "매장칭찬")
    public String store_review_write(Model model, String displayMenuId, String categoryType, String groupId, Long storeEvalSn) {

		if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_store_location";
        
        if(storeEvalSn != null && storeEvalSn > 0) {
        	StoreEvalEx storeEvalEx = storeApi.getStoreEval( storeEvalSn, getMemberSn());
        	model.addAttribute("storeEvalEx", storeEvalEx);
        }
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        model.addAttribute("storeEvalSn", storeEvalSn);
        
        return "display/brand-store-find-07";
    }
	
	/**
	 * 매장개설문의 탭 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/store_opening")
    @PageTitle(title = "매장개설문의")
    public String store_opening(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/brand-store-find-02";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/brand-store-find-03";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_store_location";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 스윗샷캠페인 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/sweet_shot")
    @PageTitle(title = "스윗샷캠페인")
    public String sweet_shot(Model model, String displayMenuId, String categoryType, String groupId) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "sweet_shot";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return "display/" + pageInfo.getMenuPageFileId();
    }
	
	/**
	 * 브랜드 소개 메인 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping({"/brand_etudehouse", "/l_brand_etudehouse"})
    @PageTitle(title = "에뛰드 하우스")
    public String brand_etudehouse(Model model, String displayMenuId, String categoryType, String groupId) {
        
		displayMenuId = "brand_etudehouse";
		
        PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_etude_story";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_brand_etudehouse";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return "display/" + pageInfo.getMenuPageFileId();
    }
	
	/**
	 * 브랜드 히스토리 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/brand_history")
    @PageTitle(title = "브랜드 히스토리")
    public String brand_history(Model model, String displayMenuId, String categoryType, String groupId) {
        
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/brand-history";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/brand-history";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_etude_story";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_brand_etudehouse";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 에뛰드 모델 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/brand_etudemodel")
    @PageTitle(title = "에뛰드 모델")
    public String brand_etudemodel(Model model, String displayMenuId, String categoryType, String groupId) {
        
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/etude-model";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/etude-model";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_etude_story";
        
        if(groupId == null || "".equals(groupId)) groupId = "brand_etudemodel";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 뷰티즌 메인 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping({"/beautizen", "/l_beautizen"})
    @PageTitle(title = "뷰티즌이란?")
    public String beautizen(Model model, String displayMenuId, String categoryType, String groupId) {
		
		displayMenuId = "beautizen";

		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_beautizen";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        
        return "display/" + pageInfo.getMenuPageFileId();
    }
	
	/**
	 * 뷰티즌 모집 페이지 이동
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return 
	 */
	@RequestMapping("/beautizen_recruit")
    @PageTitle(title = "뷰티즌 모집")
    public String beautizen_recruit(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/beautizen.2";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/beautizen-02";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_beautizen";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        
        return pageFileName;
    }
	
	/**
	 * 뷰티즌 신청 작성 페이지
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/beautizen_regist")
    @PageTitle(title = "뷰티즌 신청작성")
    public String beautizen_regist(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		if(isLoggedIn()) { // 
		
			//Mobile
	        if (isMobileDevice()) {
	        	pageFileName = "display/beautizen.2.1";
	        }
	
	        //PC
	        if (isPcDevice()) {
	        	pageFileName = "display/beautizen-03";
	        }
	         
	        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
	        
	        if(groupId == null || "".equals(groupId)) groupId = "l_beautizen";
	
	        model.addAttribute("displayMenuId", displayMenuId);
	        model.addAttribute("categoryType", categoryType);
	        model.addAttribute("groupId", groupId);

	        return pageFileName;
	        
		}else {
			
			return "redirect:/login";
		}
		
    }
	
	/**
	 * 뷰티즌 자기소개서 작성 페이지
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/beautizen_introduce")
    @PageTitle(title = "뷰티즌 자기소개작성")
    public String beautizen_introduce(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		if(isLoggedIn()) {
			
	        if (isMobileDevice()) {
	        	
	        	pageFileName = "display/beautizen.2.2";
	        }
	
	        SupportersRequesterInfo suppoters = bbsApi.getSupportersRequester(getMemberSn());
	        
	        List<Terms> beautizenTerm1= termsApi.getTerms(APConstant.EH_BEAUTIZEN_TERM_1);
	        List<Terms> beautizenTerm2 = termsApi.getTerms(APConstant.EH_BEAUTIZEN_TERM_2);
	        List<Terms> beautizenTerm3 = termsApi.getTerms(APConstant.EH_BEAUTIZEN_TERM_3);
	        
	        model.addAttribute("beautizenTerm1", beautizenTerm1.get(0));
	        model.addAttribute("beautizenTerm2", beautizenTerm2.get(0));
	        model.addAttribute("beautizenTerm3", beautizenTerm3.get(0));
	        
	        model.addAttribute("suppoters", suppoters);
            
	        return pageFileName;
	        
        }else {
		    return "redirect:/login";
        }
         
    }
	
	/**
	 * 뷰티즌 수정페이지 
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/beautizen_update")
    @PageTitle(title = "뷰티즌 수정")
    public String beautizen_update(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		if(isLoggedIn()) {		
			//Mobile
	        if (isMobileDevice()) {
	        	pageFileName = "display/beautizen.2.1";
	        }
	
	        //PC
	        if (isPcDevice()) {
	        	pageFileName = "display/beautizen-03";
	        }
	        
	        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
	        
	        if(groupId == null || "".equals(groupId)) groupId = "l_beautizen";
	        
	        SupportersRequesterInfo sriInfo = bbsApi.getSupportersRequester(getMemberSn()); //
	        
	        model.addAttribute("displayMenuId", displayMenuId);
	        model.addAttribute("categoryType", categoryType);
	        model.addAttribute("groupId", groupId);
	        model.addAttribute("suppoters" , sriInfo); 
	                
	        return pageFileName;
		}else {
			return "redirect:/login";
		}
		
    }
	
	/**
	 * 뷰티즌 프로필 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/beautizen_list")
    @PageTitle(title = "뷰티즌 프로필")
    public String beautizen_list(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/beautizen.3";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/beautizen-profile-18";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_beautizen";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        
        return pageFileName;
    }
	
	/**
	 * 컬러팩토리 메인 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping({"/l_color_factory_info", "/color_factory_info"})
    @PageTitle(title = "컬러 팩토리")
    public String color_factory_info(Model model, String displayMenuId, String categoryType, String groupId) {
		
		displayMenuId = "color_factory_info";
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
		
        //Mobile
        if (isMobileDevice()) {
        }

        //PC
        if (isPcDevice()) {
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_color_factory_info";
       
        StoreResult storeResult = storeApi.getStores(0L, "N", APConstant.EH_FO_EVENT_CD_COLOR_FACTORY, null, null, null, null, null, null, 0, 0, null);
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        model.addAttribute("storeResult", storeResult);

        return "display/" + pageInfo.getMenuPageFileId();
    }
	
	/**
	 * 컬러팩토리 예약 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/color_factory_reserve")
    @PageTitle(title = "컬러 팩토리 예약")
    public String color_factory_reserve(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/color-factory-02";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/color-factory-02";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_color_factory_info";
        
        StoreResult storeResult = storeApi.getStores(0L, "N", APConstant.EH_FO_EVENT_CD_COLOR_FACTORY, null, null, null, null, null,null, 0, 0, null);
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        model.addAttribute("storeResult", storeResult);

        return pageFileName;
    }
	
	/**
	 * 컬러펙토리 예약하기 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/color_factory_reserve_regist")
    @PageTitle(title = "컬러 팩토리 예약")
    public String color_factory_reserve_regist(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		if(displayMenuId== null) displayMenuId= "color_factory_reserve"; 
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/color-factory-03";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/color-factory-03";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_color_factory_info";
        
        getStoreEventScheduleInfo(model);
        
        List<Terms> terms1 = termsApi.getTerms(APConstant.EH_COLOR_FACTORY_TERM_1); // ET007: 개인정보 수집 이용 동의 (필수)
        List<Terms> terms2 = termsApi.getTerms(APConstant.EH_COLOR_FACTORY_TERM_2); // ET008: 개인정보 취급 위탁에 대한 동의 (필수)

		model.addAttribute("terms1", terms1.get(0));
		model.addAttribute("terms2", terms2.get(0));
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 컬러팩토리 예약 확인
	 * 
	 * @param model
	 * @param requestBrand
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/color_factory_reserve_complete")
    @PageTitle(title = "컬러 팩토리 예약")
    public String color_factory_reserve_complete(Model model, RequestBrand requestBrand, String displayMenuId, String categoryType, String groupId) {
		
		if(displayMenuId== null) displayMenuId= "color_factory_reserve"; 
		//Mobile
        if (isMobileDevice()) {
        }

        //PC
        if (isPcDevice()) {
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_color_factory_info";

        //예약한 시간 하루 전까지 취소 가능할 경우 add에 1로 세팅 (cancelAvailDt.add(Calendar.DATE, 1))
		Calendar cancelAvailDt = Calendar.getInstance();
		cancelAvailDt.add(Calendar.DATE, 1);

        StoreEventRequesterEx storeEventRequesterEx = storeApi.getStoreEventRequester(requestBrand.getReserveNo(), cancelAvailDt.getTime());
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        model.addAttribute("storeEventRequesterEx", storeEventRequesterEx);

        return "display/color-factory-04";
    }
	
	/**
	 *  컬러팩토리 예약 확인 목록
	 * 
	 * @param model
	 * @param requestBrand
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/color_factory_reserve_confirm")
    @PageTitle(title = "컬러 팩토리 예약")
    public String color_factory_reserve_confirm(Model model, RequestBrand requestBrand, String displayMenuId, String categoryType, String groupId) {
		
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_color_factory_info";
        
        StoreEventRequestersResult storeEventRequestersResult = new StoreEventRequestersResult();

      //예약한 시간 하루 전까지 취소 가능할 경우 add에 1로 세팅 (cancelAvailDt.add(Calendar.DATE, 1))
		Calendar cancelAvailDt = Calendar.getInstance();
		cancelAvailDt.add(Calendar.DATE, 1);
        
        //비회원일 경우
		if( requestBrand.getReserveNo() != null) {
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
			
			storeEventRequestersResult = storeApi.getStoreEventRequesters(getMemberSn(), cal.getTime(), requestBrand.getReserveCancelYn(), cancelAvailDt.getTime(), requestBrand.getOffset(), requestBrand.getLimit(), requestBrand.getSortBy());
		}
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);
        model.addAttribute("storeEventRequestersResult", storeEventRequestersResult);

        return "display/color-factory-05";
    }
	
	/**
	 * 컬러팩토리 서비스매장보기 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/color_factory_store")
    @PageTitle(title = "서비스 매장보기")
    public String color_factory_store(Model model, String displayMenuId, String categoryType, String groupId) {
		
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/color-factory-04";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/color-factory-06";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_color_factory_info";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 컬러팩토리 예약하기 매장 일정정보 조회
	 * 
	 * @param model
	 */
	public void getStoreEventScheduleInfo(Model model) {
		DateFormat dateFormat = new SimpleDateFormat("Z");
		String timeZone = dateFormat.format(new Date());
		
		StoreEventScheduleInfo storeEventScheduleInfo = storeApi.getStoreEventScheduleInfoByfoStoreEventCode( APConstant.EH_FO_EVENT_CD_COLOR_FACTORY, timeZone);
		
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
		
		model.addAttribute("storeEventScheduleInfo", storeEventScheduleInfo);
		model.addAttribute("storeSnMap", scheduleListbyStoreSnMap);
	}
	/**
	 * 청춘강연 메인 페이지 이동_메이크업유어드림
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping({"/l_makeup_your_dream", "/makeup_your_dream"})
    @PageTitle(title = "MAKEUP YOUR DREAM")
    public String makeupYourDream(Model model, String displayMenuId, String categoryType, String groupId) {
		
		displayMenuId = "makeup_your_dream";
		
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.EH_DISPLAY_MENU_SET_ID, displayMenuId);
		
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_makeup_your_dream";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return "display/" + pageInfo.getMenuPageFileId();

    }
	
	/**
	 * 청춘강연 페이지 이동_청춘강연
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/makeup_your_dream_lecture")
    @PageTitle(title = "청춘강연")
    public String makeupYourDreamLecture(Model model, String displayMenuId, String categoryType, String groupId) {
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/makeup-dream-02";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/makeup-your-dream-02";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_makeup_your_dream";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	/**
	 * 청춘강연 페이지 이동_청춘강연
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/makeup_your_dream_apply")
    @PageTitle(title = "청춘강연")
	
    public String makeupYourDreamApply(Model model, String displayMenuId, String categoryType, String groupId) {
		String pageFileName = "";
				
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/makeup-dream-03";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/makeup-your-dream-03";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_makeup_your_dream";
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
		
	/**
	 * 청춘강연 신청하기 페이지 이동
	 * 
	 * @param model
	 * @param displayMenuId
	 * @param categoryType
	 * @param groupId
	 * @return
	 */
	@RequestMapping("/makeup_your_dream_reserve_regist")
    @PageTitle(title = "청춘강연 신청")
    public String makeup_your_dream_reserve_regist(Model model, String displayMenuId, String categoryType, String groupId) {
		
		displayMenuId = "makeup_your_dream_apply";
		
		String pageFileName = "";
		
		//Mobile
        if (isMobileDevice()) {
        	pageFileName = "display/makeup-dream-04";
        }

        //PC
        if (isPcDevice()) {
        	pageFileName = "display/makeup-your-dream-04";
        }
        
        if(categoryType == null || "".equals(categoryType)) categoryType = "l_community";
        
        if(groupId == null || "".equals(groupId)) groupId = "l_makeup_your_dream";
        
        List<Terms> terms1 = termsApi.getTerms(APConstant.EH_MAKEUP_YOUR_DREAM_TERM_1); //  [필수] 개인정보 수집 및 이용동의
        List<Terms> terms2 = termsApi.getTerms(APConstant.EH_MAKEUP_YOUR_DREAM_TERM_2); //  [필수] 개인정보 처리 위탁에 대한 동의
        List<Terms> terms3 = termsApi.getTerms(APConstant.EH_MAKEUP_YOUR_DREAM_TERM_3); //  [필수] 사진 및 동영상 촬영 및 활용 동의

		model.addAttribute("terms1", terms1.get(0));
		model.addAttribute("terms2", terms2.get(0));
		model.addAttribute("terms3", terms3.get(0));
        
        model.addAttribute("displayMenuId", displayMenuId);
        model.addAttribute("categoryType", categoryType);
        model.addAttribute("groupId", groupId);

        return pageFileName;
    }
	
	@RequestMapping({"/brandMain"})
	@PageTitle(title = "브랜드 메인")
	public String brandMain(Model model, String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);

		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		cornerIds = "M01_brandMain_m.1,M01_brandMain_m.2";

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
				APConstant.AP_DISPLAY_MENU_SET_ID,
				displayMenuId,
				previewKey,
				previewDate != null ? sf.parse(previewDate) : null,
				cornerIds,
				false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		return "display/" + pageInfo.getMenuPageFileId();
	}

	@RequestMapping({"/brand/{displayMenuId}"})
	@PageTitle(title = "브랜드")
	public String brand1(Model model, @PathVariable String displayMenuId, String previewKey, String previewDate) {
		PageInfo pageInfo = displayApi.getMenuPageInfo(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
		model.addAttribute("displayMenuId", displayMenuId);

		// 메뉴페이지 코너정보 조회
		String cornerIds = "";
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		cornerIds = "M01_brand1_m.1";

		try {
			List<Corner> corners = displayApi.getMenuPageCorners(
				APConstant.AP_DISPLAY_MENU_SET_ID,
				displayMenuId,
				previewKey,
				previewDate != null ? sf.parse(previewDate) : null,
				cornerIds,
				false);

			Map<String, List<CornerContentsSet>> cornersMap = new HashMap<String, List<CornerContentsSet>>();

			for (Corner c : corners) {
				cornersMap.put(c.getMenuPageCornerId(), c.getContentsSets());
			}

			model.addAttribute("cornersMap", cornersMap);
		} catch (ParseException e) {
			e.printStackTrace();
			model.addAttribute("cornersMap", null);
		}

		return "display/" + pageInfo.getMenuPageFileId();
	}
	
	@RequestMapping({"/brand/detail"})
	@PageTitle(title = "브랜드")
	public String brand1(Model model, String brandSn) {
		
		model.addAttribute("brandSn", brandSn);
		
		return "display/brand/detail";
	}

}
