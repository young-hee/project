package kr.ap.amt.cs.controller;

import kr.ap.amt.cs.vo.OrderDTO;
import kr.ap.amt.cs.vo.RequestCS;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.UploadingFile;
import net.g1project.ecp.api.model.order.order.OrdEx;
import net.g1project.ecp.api.model.order.order.OrdListResult;
import net.g1project.ecp.api.model.sales.guide.FaqSearchResult;
import net.g1project.ecp.api.model.sales.guide.FoNoticeResult;
import net.g1project.ecp.api.model.sales.guide.InquiryPost;
import net.g1project.ecp.api.model.sales.guide.InquiryPostResult;
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

@Controller
@RequestMapping("/cs")
public class CSRestController extends AbstractController {

	@PostMapping("/doInquiry")
	@ResponseBody
	public ResponseEntity<?> createInquiry(@Valid InquiryPost inquiryPostInfo, BindingResult bindingResult,
										   MultipartFile[] picture) {

		HashMap<String, Object> result = new HashMap<>();
		//csFormValidator.validate(inquiryPostInfo, bindingResult);

		if (bindingResult.hasErrors()) {
			bindErrorResult(bindingResult, result);
		} else {
			inquiryPostInfo.setMemberSn(getMemberSn());
			inquiryPostInfo.setInquiryReceivedCh(getDisplayChannel());
			if (inquiryPostInfo.getSmsResponseNotifyYn() == null
				|| inquiryPostInfo.getSmsResponseNotifyYn().equals("")) {
				inquiryPostInfo.setSmsResponseNotifyYn("N");
			}

			try {
				if (!ObjectUtils.isEmpty(picture)) {
					List<UploadingFile> files = imageSettingList(picture);
					inquiryPostInfo.setFiles(files);
				}
				InquiryPostResult registYn = guideApi.postCustomerInquiry(inquiryPostInfo);
				result.put("registYn", registYn.isResult());
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
			}
		}

		return ResponseEntity.ok(result);
	}

	@GetMapping("/getOrderPage")
	@ResponseBody
	public ResponseEntity<?> getOrderPage(int offset, int limit, Date RS_Date, Date RD_Date) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		try {
			OrdListResult ordListResult = orderApi.getOrdList(getMemberSn(), null, RS_Date, RD_Date, offset, limit);
			List<OrderDTO> ordList = new ArrayList<OrderDTO>();

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
			result.put("totalCount", ordListResult.getTotalCount());
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	@PostMapping("/csList")
	@ResponseBody
	public ResponseEntity<?> csList(RequestCS request) {

		// Mobile
		if (isMobileDevice()) {
			HashMap<String, Object> result = new HashMap<String, Object>();
			try {
				if ("faq".equalsIgnoreCase(request.getType())) {
					FaqSearchResult d = guideApi.getFaqs(request.getKeyword(), request.getInquiryTypeSn(),
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
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
			}

			return ResponseEntity.ok(result);

		}

		// PC
		if (isPcDevice()) {
			HashMap<String, Object> result = new HashMap<String, Object>();
			try {
				if ("faq".equalsIgnoreCase(request.getType())) {
					FaqSearchResult d = guideApi.getFaqs(request.getKeyword(), request.getInquiryTypeSn(),
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
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
			}

			return ResponseEntity.ok(result);
		}

		return null;
	}

	@GetMapping("/noticeContent")
	@ResponseBody
	public ResponseEntity<?> noticeContent(int seq) {

		// Mobile
		if (isMobileDevice()) {

			HashMap<String, Object> result = new HashMap<String, Object>();

			try {
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
			}

			return ResponseEntity.ok(result);
		}

		// PC
		if (isPcDevice()) {

		}

		return null;
	}

	@PostMapping("/faqList")
	@ResponseBody
	public ResponseEntity<?> faqList(RequestCS request) {
		// Mobile
		if (isMobileDevice()) {

		}

		// PC
		if (isPcDevice()) {
			HashMap<String, Object> result = new HashMap<String, Object>();

			try {
				FaqSearchResult d = guideApi.getFaqs(request.getKeyword(), request.getInquiryTypeSn(), request.getOffset(),
					request.getLimit());

				if (d != null) {
					result.put("data", d);
				}
			} catch (Exception e) {
				result.put("errorData", e);
				return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
			}

			return ResponseEntity.ok(result);
		}

		return null;
	}

	@GetMapping("/summary/{type}")
	@ResponseBody
	public ResponseEntity<?> summary(@PathVariable String type) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			if ("faq".equals(type)) {
				result.put("data", guideApi.getFaqSummary());
			} else {
				result.put("data", guideApi.getFoNoticeSummary(CSViewController.EVENT_YN));
			}
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}
}
