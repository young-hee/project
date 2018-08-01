/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.cs.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.breadcrumb.BreadCrumb;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.guide.FaqSearchResult;
import net.g1project.ecp.api.model.sales.guide.FaqSummary;
import net.g1project.ecp.api.model.sales.guide.FoNoticeResult;
import net.g1project.ecp.api.model.sales.guide.FoNoticeSummary;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@Controller
@RequestMapping("/cs")
public class CSViewController extends AbstractController {

    //Mobile
    private static final int CS_FAQ = 5;
    private static final int CS_NOTICE = 3;
    private static final int CS_IMPORTANT_NOTICE = 5;

    //PC
    private static final int PC_CS_FAQ = 10;
    private static final int PC_CS_IMPORTANT_NOTICE = 5;
    private static final int PC_CS_NORMAL_NOTICE = 8;
    
    protected static final String EVENT_YN = "N";

    @GetMapping("/beautyPoint")
    @PageTitle(title = "멤버십 혜택 안내")
    public String beautyPoint(Model model) {
        //Mobile
        if (isMobileDevice()) {
            return "cs/beauty-point";
        }

        //PC
        if (isPcDevice()) {
            return "cs/membership_beautypoint";
        }

        return null;
    }

    @GetMapping("/pinkMembership")
    @PageTitle(title = "멤버십 혜택 안내")
    public String pinkMembership(Model model) {
        //Mobile
        if (isMobileDevice()) {
            return "cs/pink-membership";
        }

        //PC
        if (isPcDevice()) {
            return "cs/pink-membership";
        }

        return null;
    }

    @GetMapping("/cushionPoint")
    @PageTitle(title = "멤버십 혜택 안내")
    public String cushionPoint(Model model) {
        //Mobile
        if (isMobileDevice()) {
            return "cs/cushion-point";
        }

        //PC
        if (isPcDevice()) {
            return "cs/cushion-point";
        }

        return null;
    }

    @GetMapping("/pearlPoint")
    @PageTitle(title = "멤버십 혜택 안내")
    public String pearlPoint(Model model) {
        //Mobile
        if (isMobileDevice()) {
            return "cs/pearl-point";
        }

        //PC
        if (isPcDevice()) {
            return "cs/pearl-point";
        }

        return null;
    }

    @GetMapping("/emptyBottle")
    @PageTitle(title = "멤버십 혜택 안내")
    public String emptyBottle(Model model) {
        //Mobile
        if (isMobileDevice()) {
            return "cs/empty-bottle";
        }

        //PC
        if (isPcDevice()) {
            return "cs/campaign";
        }

        return null;
    }
    
    @GetMapping("/takeOut")
    @PageTitle(title = "매장특화 서비스")
    public String takeOut(Model model) {
        //Mobile
        if (isMobileDevice()) {
            return "cs/take-out";
        }

        //PC
        if (isPcDevice()) {
            return "cs/takeout";
        }

        return null;
    }

    @GetMapping("/sweetDelivery")
    @PageTitle(title = "매장특화 서비스")
    public String sweetDelivery(Model model) {
        //Mobile
        if (isMobileDevice()) {

        }

        //PC
        if (isPcDevice()) {
            return "cs/sweet-delivery";
        }

        return null;
    }

    @GetMapping("/returnService")
    @PageTitle(title = "매장특화 서비스")
    public String returnService(Model model) {
        //Mobile
        if (isMobileDevice()) {

        }

        //PC
        if (isPcDevice()) {
            return "cs/return";
        }

        return null;
    }
    
    @GetMapping("/inquiry")
    @PageTitle(title = "1:1문의")
    public String inquiry(Model model) {
        //Mobile
        if (isMobileDevice()) {
			
            model.addAttribute("inquiryType", guideApi.getInquiryTypes());
            return "cs/inquiry";
        }

        //PC
        if (isPcDevice()) {
            
        	model.addAttribute("inquiryType", guideApi.getInquiryTypes());
            return "cs/cs-inquiry";
        }

        return null;
    }
    
    @GetMapping("/customerCenter")
    @PageTitle(title = "고객센터")
    @BreadCrumb("EH.CS")
    public String customerCenter(Model model) {

        //Mobile
        if (isMobileDevice()) {
        	try {
	        	//하단 한줄 공지 목록
		        FoNoticeResult notice = guideApi.getFoNotices("", null, 0, 10, null, null);
		        model.addAttribute("footerNotice", notice);
        	}catch(Exception e) {
        		model.addAttribute("footerNotice", null);
        	}
            return "cs/customer-center";
        }

        //PC
        if (isPcDevice()) {
            //Notice 목록 조회(일반공지)
            FoNoticeResult nomalNotice = guideApi.getFoNotices("", null, 0, 5, "N", EVENT_YN);

            //FAQ 목록 조회
            FaqSearchResult faqSR = guideApi.getFaqs("", null, 0, 10);

            model.addAttribute("nomalNotice", nomalNotice);
            model.addAttribute("faqSrchRst", faqSR);

            return "cs/cs_overview";
        }

        return null;
    }
    
    @RequestMapping(value = {"/faq", "/faq/{keyword}"})
    @PageTitle(title = "FAQ")
    @BreadCrumb("EH.CS.01")
    public String faq(Model model, @PathVariable(required = false) String keyword) {
        //Mobile
        if (isMobileDevice()) {
            
            model.addAttribute("keyword", keyword);
            return "cs/fullpage-faq";
        }

        //PC
        if (isPcDevice()) {
            Long inquiryTypeSn = StringUtils.isEmpty(getRequest().getParameter("inquiryTypeSn")) ? null : Long.valueOf(getRequest().getParameter("inquiryTypeSn"));
            Integer offset = StringUtils.isEmpty(getRequest().getParameter("offset")) ? null : Integer.parseInt(getRequest().getParameter("offset"));
            Integer limit = StringUtils.isEmpty(getRequest().getParameter("limit")) ? null : Integer.parseInt(getRequest().getParameter("limit"));
            String searchKeyword;
            if(keyword == null){
                searchKeyword = StringUtils.isEmpty(getRequest().getParameter("keyword")) ? null : getRequest().getParameter("keyword");
            } else {
                searchKeyword = keyword;
            }

            if( limit == null) limit = PC_CS_FAQ;  //최초 조회시 페이지 당 건수 세팅
            if( offset == null) offset = 0;

            //FAQ Summary 조회
            FaqSummary faqSummary = guideApi.getFaqSummary();

            //FAQ 목록 조회
            FaqSearchResult faqSR = guideApi.getFaqs(searchKeyword, inquiryTypeSn, offset, limit);

            model.addAttribute("keyword", searchKeyword);
            model.addAttribute("faqType", faqSummary);
            model.addAttribute("faqSrchRst", faqSR);
            model.addAttribute("inquiryTypeSn", inquiryTypeSn);
            model.addAttribute("cntPerPage", PC_CS_FAQ);

            return "cs/cs_faq";
        }

        return null;
    }
    
    @RequestMapping("/notice")
    @PageTitle(title = "공지사항")
    @BreadCrumb("EH.CS.06.001")
    public String notice(Model model) {
        //Mobile
        if (isMobileDevice()) {
            return "cs/fullpage-notice";
        }

        //PC
        if (isPcDevice()) {
            String keyword = StringUtils.isEmpty(getRequest().getParameter("keyword")) ? null : getRequest().getParameter("keyword");
            Long foNoticeTypeSn = StringUtils.isEmpty(getRequest().getParameter("foNoticeTypeSn")) ? null : Long.parseLong(getRequest().getParameter("foNoticeTypeSn"));
            Integer offset = StringUtils.isEmpty(getRequest().getParameter("offset")) ? null : Integer.parseInt(getRequest().getParameter("offset"));
            Integer limit = StringUtils.isEmpty(getRequest().getParameter("limit")) ? null : Integer.parseInt(getRequest().getParameter("limit"));
            if( limit == null) limit = PC_CS_FAQ;  //최초 조회시 페이지 당 건수 세팅
            if( offset == null) offset = 0;

            //Notice Summary 조회
            FoNoticeSummary foNoticeSummary = guideApi.getFoNoticeSummary(EVENT_YN);

            //Notice 목록 조회(중요공지)
            FoNoticeResult impotyNotice = guideApi.getFoNotices("", null, 0, PC_CS_IMPORTANT_NOTICE, "Y", EVENT_YN);

//            if( impotyNotice != null && impotyNotice.getTotalCount() > 0) {
//                limit = PC_CS_FAQ - impotyNotice.getTotalCount();
//            }


			// limit = impotyNotice.getTotalCount();
            //Notice 목록 조회(일반공지)
			System.out.println("foNoticeTypeSn: " + foNoticeTypeSn);
            FoNoticeResult nomalNotice = guideApi.getFoNotices(keyword, foNoticeTypeSn, offset, limit, "N", EVENT_YN);

            model.addAttribute("keyword", keyword);
            model.addAttribute("noticeType", foNoticeSummary);
            model.addAttribute("impotyNotice", impotyNotice);
            model.addAttribute("nomalNotice", nomalNotice);
            model.addAttribute("foNoticeTypeSn", foNoticeTypeSn);
            model.addAttribute("cntPerPage", PC_CS_FAQ);
            
            return "cs/board_notice_list";
        }

        return null;
    }
    
    @RequestMapping(value = {"/noticeView", "/noticeView/{sn}"} )
    @PageTitle(title = "공지내용")
    @BreadCrumb("EH.CS.06.001.001")
    public String noticeView(Model model, @PathVariable Long sn) {
        //Mobile
        if (isMobileDevice()) {
            model.addAttribute("notice", guideApi.getFoNotice(sn));
            return "cs/fullpage-notice-view";
        }

        //PC
        if (isPcDevice()) {
        	//Long lSn = StringUtils.isEmpty(getRequest().getParameter("sn")) ? null : Long.parseLong( getRequest().getParameter("sn"));
        	
            model.addAttribute("notice", guideApi.getFoNotice(sn));
            return "cs/board_notice_view";
        }

        return null;
    }
    
    // ============================  fragment start =============================== //
    
    @PostMapping("/footNotices")
    public String footNotices(Model model, @RequestBody FoNoticeResult notices) {
        //Mobile
        if (isMobileDevice()) {
            System.out.println("12312");
            model.addAttribute("footNotices", notices);
            return "/fragment/common/footer :: footNotices";
        }

        //PC
        if (isPcDevice()) {

        }

        return null;
    }
    
 // ============================  fragment end =============================== //

}
