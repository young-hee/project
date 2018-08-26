package kr.ap.amt.cs.controller;

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

@Controller
@RequestMapping("/cs")
public class CSViewController extends AbstractController {

	//Mobile
	private static final int CS_FAQ = 5;
	private static final int CS_NOTICE = 3;
	private static final int CS_IMPORTANT_NOTICE = 5;

	//PC
	private static final int PC_CS_FAQ = 10;
	private static final int PC_CS_IMPORTANT_NOTICE = 2;
	private static final int PC_CS_NORMAL_NOTICE = 8;

	protected static final String EVENT_YN = "N";

	@GetMapping("/customerCenter")
	@PageTitle(title = "고객센터")
	public String cuetomerCenter(Model model) {
		//Mobile
		if (isMobileDevice()) {
			FaqSearchResult f = guideApi.getFaqs(null, null, null, 0, 5);
			FoNoticeResult n = guideApi.getFoNotices(null, null,0, 5, "N", CSViewController.EVENT_YN);

			model.addAttribute("faq", f);
			model.addAttribute("notice", n);
			return "/cs/customer-center";
		}

		if (isPcDevice()) {
			return "/cs/notice-list";
		}
		return null;
	}

	@GetMapping("/inquiry")
	@PageTitle(title = "1:1 문의")
	public String inquiry (Model model) {
		model.addAttribute("type", guideApi.getInquiryTypes());
		return "/cs/inquiry";
	}

	@RequestMapping(value = {"/faq", "/faq/{keyword}"})
	@PageTitle(title = "FAQ")
	@BreadCrumb("EH.CS.01")
	public String faq(Model model, @PathVariable(required = false) String keyword) {
		//Mobile
//		if (isMobileDevice()) {
//
//			//FAQ Summary 조회
//			model.addAttribute("keyword", keyword);
//			model.addAttribute("summary", guideApi.getFaqSummary(null));
//			return "cs/faq";
//		}
//
//		//PC
//		if (isPcDevice()) {
//			Long inquiryTypeSn = StringUtils.isEmpty(getRequest().getParameter("inquiryTypeSn")) ? null : Long.valueOf(getRequest().getParameter("inquiryTypeSn"));
//			Integer offset = StringUtils.isEmpty(getRequest().getParameter("offset")) ? null : Integer.parseInt(getRequest().getParameter("offset"));
//			Integer limit = StringUtils.isEmpty(getRequest().getParameter("limit")) ? null : Integer.parseInt(getRequest().getParameter("limit"));
//			String searchKeyword;
//			if(keyword == null){
//				searchKeyword = StringUtils.isEmpty(getRequest().getParameter("keyword")) ? null : getRequest().getParameter("keyword");
//			} else {
//				searchKeyword = keyword;
//			}
//
//			if( limit == null) limit = PC_CS_FAQ;  //최초 조회시 페이지 당 건수 세팅
//			if( offset == null) offset = 0;
//
//			//FAQ Summary 조회
//			FaqSummary faqSummary = guideApi.getFaqSummary(null);
//
//			//FAQ 목록 조회
//			FaqSearchResult faqSR = guideApi.getFaqs(searchKeyword, inquiryTypeSn, null, offset, limit);
//
//			model.addAttribute("keyword", searchKeyword);
//			model.addAttribute("faqType", faqSummary);
//			model.addAttribute("faqSrchRst", faqSR);
//			model.addAttribute("inquiryTypeSn", inquiryTypeSn);
//			model.addAttribute("cntPerPage", PC_CS_FAQ);
//
//			return "cs/cs_faq";
//		}

		model.addAttribute("keyword", keyword);
		model.addAttribute("summary", guideApi.getFaqSummary(null));
		return "cs/faq";
	}

	@RequestMapping("/notice")
	@PageTitle(title = "공지사항")
	@BreadCrumb("EH.CS.06.001")
	public String notice(Model model) {
		//Mobile
//		if (isMobileDevice()) {
//			FoNoticeSummary foNoticeSummary = guideApi.getFoNoticeSummary(EVENT_YN);
//			model.addAttribute("summary", foNoticeSummary);
//			return "cs/notice-list";
//		}
//
//		//PC
//		if (isPcDevice()) {
//			String keyword = StringUtils.isEmpty(getRequest().getParameter("keyword")) ? null : getRequest().getParameter("keyword");
//			Long noticeTypeSn = StringUtils.isEmpty(getRequest().getParameter("noticeTypeSn")) ? null : Long.parseLong(getRequest().getParameter("noticeTypeSn"));
//			Integer offset = StringUtils.isEmpty(getRequest().getParameter("offset")) ? null : Integer.parseInt(getRequest().getParameter("offset"));
//			Integer limit = StringUtils.isEmpty(getRequest().getParameter("limit")) ? null : Integer.parseInt(getRequest().getParameter("limit"));
//
//			if( limit == null) limit = PC_CS_NORMAL_NOTICE;  //최초 조회시 페이지 당 건수 세팅
//			if( offset == null) offset = 0;
//
//			//Notice Summary 조회
//			FoNoticeSummary foNoticeSummary = guideApi.getFoNoticeSummary(EVENT_YN);
//
//			//Notice 목록 조회(중요공지)
//			FoNoticeResult impotyNotice = guideApi.getFoNotices("", null, 0, PC_CS_IMPORTANT_NOTICE, "Y", EVENT_YN);
//
//			if( impotyNotice != null && impotyNotice.getTotalCount() > 0) {
//				limit = PC_CS_NORMAL_NOTICE - impotyNotice.getTotalCount();
//			}
//
//			//Notice 목록 조회(일반공지)
//			FoNoticeResult nomalNotice = guideApi.getFoNotices(keyword, noticeTypeSn, offset, limit, "N", EVENT_YN);
//
//			model.addAttribute("keyword", keyword);
//			model.addAttribute("noticeType", foNoticeSummary);
//			model.addAttribute("impotyNotice", impotyNotice);
//			model.addAttribute("nomalNotice", nomalNotice);
//			model.addAttribute("noticeTypeSn", noticeTypeSn);
//			model.addAttribute("cntPerPage", PC_CS_FAQ);
//
//			return "cs/board_notice_list";
//		}

		FoNoticeSummary foNoticeSummary = guideApi.getFoNoticeSummary(EVENT_YN);
		model.addAttribute("summary", foNoticeSummary);
		return "cs/notice-list";

//		return null;
	}

	@RequestMapping(value = {"/noticeView", "/noticeView/{sn}"} )
	@PageTitle(title = "공지내용")
	@BreadCrumb("EH.CS.06.001.001")
	public String noticeView(Model model, @PathVariable Long sn) {
		//Mobile
		if (isMobileDevice()) {
			model.addAttribute("notice", guideApi.getFoNotice(sn));
			return "cs/notice-view";
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
