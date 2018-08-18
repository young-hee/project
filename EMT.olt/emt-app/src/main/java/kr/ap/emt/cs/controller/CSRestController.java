/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.cs.controller;

import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.validator.CSFormValidator;
import kr.ap.emt.cs.vo.OrderDTO;
import kr.ap.emt.cs.vo.RequestCS;
import net.g1project.ecp.api.model.UploadingFile;
import net.g1project.ecp.api.model.order.order.OrdEx;
import net.g1project.ecp.api.model.order.order.OrdListResult;
import net.g1project.ecp.api.model.sales.guide.FaqSearchResult;
import net.g1project.ecp.api.model.sales.guide.FoNoticeResult;
import net.g1project.ecp.api.model.sales.guide.InquiryPost;
import net.g1project.ecp.api.model.sales.guide.InquiryPostResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.sql.Date;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
@RestController
@RequestMapping("/cs")
public class CSRestController extends AbstractController {

    @Autowired
    CSFormValidator csFormValidator;

    @PostMapping("/doInquiry")
    public ResponseEntity<?> createInquiry(@Valid InquiryPost inquiryPostInfo, BindingResult bindingResult,
										   MultipartFile[] picture) {

		HashMap<String, Object> result = new HashMap<>();
		csFormValidator.validate(inquiryPostInfo, bindingResult);

		if (bindingResult.hasErrors()) {
			bindErrorResult(bindingResult, result);
		} else {
			inquiryPostInfo.setMemberSn(getMemberSn());
			inquiryPostInfo.setInquiryReceivedCh(getDisplayChannel());
			if (inquiryPostInfo.getSmsResponseNotifyYn() == null
				|| inquiryPostInfo.getSmsResponseNotifyYn().equals("")) {
				inquiryPostInfo.setSmsResponseNotifyYn("N");
			}

			if (!ObjectUtils.isEmpty(picture)) {
				List<UploadingFile> files = imageSettingList(picture);
				inquiryPostInfo.setFiles(files);
			}
			InquiryPostResult registYn = guideApi.postCustomerInquiry(inquiryPostInfo);
			result.put("registYn", registYn.isResult());
		}

		return ResponseEntity.ok(result);
    }

    @GetMapping("/getOrderPage")
    public ResponseEntity<?> getOrderPage(int offset, int limit, Date RS_Date, Date RD_Date) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		OrdListResult ordListResult = orderApi.getOrdList(getMemberSn(), null, RS_Date, getEndDate(RD_Date), offset, limit);
		List<OrderDTO> ordList = new ArrayList<OrderDTO>();
		int totalCount = ordListResult.getTotalCount();

		for(OrdEx ordEx : ordListResult.getOrdExList()) {
			OrderDTO orderDTO = new OrderDTO();
			orderDTO.setOrdSn(ordEx.getOrdSn());
			orderDTO.setOrdHistNo(ordEx.getOrdHistEx().getOrdHistNo());
			orderDTO.setOrdName(ordEx.getOrdHistEx().getOrdHistProdExList().get(0).getOrdProdEx().getProdNameBlang());
			orderDTO.setOrdStatusCode(ordEx.getOrdHistEx().getOrdHistProdExList().get(0).getOrdHistProdStatusCode());
			orderDTO.setFinalOrdPrice(ordEx.getOrdHistEx().getFinalOrdAmtPcur());
			orderDTO.setOrdQty(ordEx.getOrdHistEx().getOrdHistProdExList().size());
			ordList.add(orderDTO);
		}

		result.put("data", ordList);
		result.put("totalCount", totalCount);

		return ResponseEntity.ok(result);
    }

    @PostMapping("/csList")
    public ResponseEntity<?> csList(RequestCS request) {

        // Mobile
        if (isMobileDevice()) {
            HashMap<String, Object> result = new HashMap<String, Object>();
			if ("faq".equalsIgnoreCase(request.getType())) {
				FaqSearchResult d = guideApi.getFaqs(request.getKeyword(), request.getInquiryTypeSn(), null,
						request.getOffset(), request.getLimit());
				if (d != null) {
					result.put("data", d);
				}
			} else if ("notice".equalsIgnoreCase(request.getType())) {
				FoNoticeResult d = guideApi.getFoNotices(request.getKeyword(), request.getNoticeTypeCode(),
						request.getOffset(), request.getLimit(), request.getImportantNoticeYn(),
						CSViewController.EVENT_YN);

				if (d != null) {
					result.put("data", d);
				}
			}

            return ResponseEntity.ok(result);

        }

        // PC
        if (isPcDevice()) {
            HashMap<String, Object> result = new HashMap<String, Object>();
			if ("faq".equalsIgnoreCase(request.getType())) {
				FaqSearchResult d = guideApi.getFaqs(request.getKeyword(), request.getInquiryTypeSn(), null,
						request.getOffset(), request.getLimit());
				if (d != null) {
					result.put("data", d);
				}
			} else if ("notice".equalsIgnoreCase(request.getType())) {
				FoNoticeResult d = guideApi.getFoNotices(request.getKeyword(), request.getNoticeTypeCode(),
						request.getOffset(), request.getLimit(), request.getImportantNoticeYn(),
						CSViewController.EVENT_YN);
				if (d != null) {
					result.put("data", d);
				}
			}

            return ResponseEntity.ok(result);
        }

        return null;
    }

    @GetMapping("/noticeContent")
    public ResponseEntity<?> noticeContent(int seq) {

        // Mobile
        if (isMobileDevice()) {

            HashMap<String, Object> result = new HashMap<String, Object>();

            return ResponseEntity.ok(result);
        }

        // PC
        if (isPcDevice()) {

        }

        return null;
    }

    @PostMapping("/faqList")
    public ResponseEntity<?> faqList(RequestCS request) {
        // Mobile
        if (isMobileDevice()) {

        }

        // PC
        if (isPcDevice()) {
            HashMap<String, Object> result = new HashMap<String, Object>();

			FaqSearchResult d = guideApi.getFaqs(request.getKeyword(), request.getInquiryTypeSn(), null, request.getOffset(),
					request.getLimit());

			if (d != null) {
				result.put("data", d);
			}

            return ResponseEntity.ok(result);
        }

        return null;
    }

    @GetMapping("/summary/{type}")
    public ResponseEntity<?> summary(@PathVariable String type) {
        HashMap<String, Object> result = new HashMap<String, Object>();
		if ("faq".equals(type)) {
			result.put("data", guideApi.getFaqSummary(null));
		} else {
			result.put("data", guideApi.getFoNoticeSummary(CSViewController.EVENT_YN));
		}

        return ResponseEntity.ok(result);
    }

	/**
	 * 날짜 시간을 23:59:59 로 세팅
	 *
	 * @param date
	 * @return date - yyyy-MM-ddT23:59:59
	 *
	 */
	private Date getEndDate(Date date) {
		if(date != null) {
			return new Date(date.getTime() + (24*60*60*1000) - 1);
		}
		return null;
	}
}
