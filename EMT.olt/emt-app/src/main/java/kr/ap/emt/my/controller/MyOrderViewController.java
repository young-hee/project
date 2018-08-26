package kr.ap.emt.my.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.emt.my.vo.MyOrdDTO;
import kr.ap.emt.my.vo.MyOrdInfoDTO;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.order.order.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * 나의 주문 관리
 *
 * 1. 온라인 주문/배송
 * 2. 매장 주문/배송
 * 3. 반품/교환
 * 4. 현금영수증 발급상태
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyOrderViewController extends AbstractController {


	/**********************************************************************************************
	 *  1. 온라인 주문/배송
	 **********************************************************************************************/

	@GetMapping("/onlineOrderShipping")
	@PageTitle(title = "주문/배송")
	public String onlineOrderShipping(Model model) {

		return myOrderManage(model, "online");
	}

	@GetMapping("/order/online/{ordNo}")
	@PageTitle(title = "온라인 주문상세")
	public String ordOnline(Model model, @PathVariable String ordNo) {

		return orderDetail(model, "detail", "online", ordNo, null);
	}

	@GetMapping("/claim/detail/{ordHistNo}")
	@PageTitle(title = "상세")
	public String claimDetail(Model model, @PathVariable String ordHistNo) {

		return orderDetail(model, "detail", "base", null, ordHistNo);
	}

	/**********************************************************************************************
	 *  2. 매장 주문/배송
	 **********************************************************************************************/

	@GetMapping("/storeOrderShipping")
	@PageTitle(title = "주문/배송")
	public String storeOrderShipping(Model model) {

		return myOrderManage(model, "store");
	}

	@GetMapping("/order/store/{ordNo}")
	@PageTitle(title = "매장 주문상세")
	public String ordStroe(Model model, @PathVariable String ordNo) {

		return orderDetail(model, "detail", "store", ordNo, null);
	}

	/**********************************************************************************************
	 *  3. 반품/교환
	 **********************************************************************************************/

	@GetMapping("/returnExchange")
	@PageTitle(title = "반품/교환")
	public String returnExchange(Model model) {

		return myOrderManage(model, "returnExchange");
	}

	@GetMapping("/claim/return/{ordHistNo}")
	@PageTitle(title = "반품상세")
	public String claimReturn(Model model, @PathVariable String ordHistNo) {

		return orderDetail(model, "detail", "Rtn", null, ordHistNo);
	}

	@GetMapping("/claim/exchange/{ordHistNo}")
	@PageTitle(title = "교환상세")
	public String claimExchange(Model model, @PathVariable String ordHistNo) {

		return orderDetail(model, "detail", "Exch", null, ordHistNo);
	}

	@GetMapping("/order/return/{ordNo}")
	@PageTitle(title = "반품신청")
	public String ordReturn(Model model, @PathVariable String ordNo) {

		return orderDetail(model, "request", "return", ordNo, null);
	}

	@GetMapping("/order/exchange/{ordNo}")
	@PageTitle(title = "교환신청")
	public String ordExchange(Model model, @PathVariable String ordNo) {

		return orderDetail(model, "request", "exchange", ordNo, null);
	}

	/**********************************************************************************************
	 *  4. 취소
	 **********************************************************************************************/

	@GetMapping("/claim/cancel/{ordHistNo}")
	@PageTitle(title = "취소상세")
	public String claimCancel(Model model, @PathVariable String ordHistNo) {

		return orderDetail(model, "detail", "cancel", null, ordHistNo);
	}

	@GetMapping("/order/cancel/{ordNo}")
	@PageTitle(title = "주문취소")
	public String ordCancel(Model model, @PathVariable String ordNo) {
		return orderDetail(model, "request", "cancel", ordNo, null);
	}

	/**********************************************************************************************
	 *  5. 현금영수증 발급상태
	 **********************************************************************************************/

	@GetMapping("/cashReceipts")
	@PageTitle(title = "현금영수증")
	public String cashReceipts(Model model) {

		return myOrderManage(model, "cashReceipts");
	}

	@GetMapping("/order/cashReceipts/{ordNo}")
	@PageTitle(title = "현금영수증상세")
	public String ordCashReceipts(Model model, @PathVariable String ordNo) {

		return orderDetail(model, "detail", "cashReceipts", ordNo, null);
	}

	/**********************************************************************************************
	 *  6. 주문번호 상세 조회
	 **********************************************************************************************/

	@GetMapping("/order/detail/{ordNo}")
	@PageTitle(title = "주문상세")
	public String ordDetail(Model model, @PathVariable String ordNo) {

		OrdEx ordEx = orderApi.getOrdByOrdNo(ordNo);
		if (ordEx != null) {
			String type = "online";
			if ("POS".equalsIgnoreCase(ordEx.getOrdTypeCode())) {
				type = "store";
			}

			model.addAttribute("ord", new MyOrdDTO(ordEx));
			model.addAttribute("type", type);
			model.addAttribute("claimYn", "N");
			model.addAttribute("status", "detail");

			return "my/my-order-detail";
		}

		return null;
	}

	/**********************************************************************************************
	 *  7. 비회원 상세 조회
	 **********************************************************************************************/

	@PostMapping("/non/order/detail/{ordNo}")
	@PageTitle(title = "주문상세")
	public String nonOrdDetail(Model model, String ordNo, String phoneNo) {

		OrdEx ordEx = orderApi.getOrdByOrdNo(ordNo);
		//		orderApi.getNonmemberOrd(, , , , , , )
		if (ordEx != null) {
			String type = "online";
			if ("POS".equalsIgnoreCase(ordEx.getOrdTypeCode())) {
				type = "store";
			}

			model.addAttribute("ord", new MyOrdDTO(ordEx));
			model.addAttribute("type", type);
			model.addAttribute("claimYn", "N");
			model.addAttribute("status", "detail");

			return "my/my-order-detail";
		}

		return null;
	}

	/**********************************************************************************************
	 *  *. 공통
	 **********************************************************************************************/

	public String myOrderManage(Model model, String type) {

		model.addAttribute("type", type);

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-order-list";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-order-01";
		}

		return null;
	}

	private MyOrdDTO getOrdInfoDTO(String ordNo) {

		return new MyOrdDTO(orderApi.getOrdByOrdNo(ordNo));
	}


	public String orderDetail(Model model, String state, String type, String ordNo, String ordHistNo) {
		switch (state) {
			case "detail" :
				if ("cancel".equals(type)) {
					model.addAttribute("ord", new MyOrdDTO(orderApi.getClaimOrdHist(ordHistNo), "cancel"));
					model.addAttribute("type", type);
					model.addAttribute("claimYn", "Y");
					break;
				} else if ("Exch".equals(type)) {
					model.addAttribute("ord", new MyOrdDTO(orderApi.getClaimOrdHist(ordHistNo), "exchange"));
					model.addAttribute("type", "exchange");
					model.addAttribute("claimYn", "Y");
					break;
				} else if ("Rtn".equals(type)) {
					model.addAttribute("ord", new MyOrdDTO(orderApi.getClaimOrdHist(ordHistNo), "return"));
					model.addAttribute("type", "return");
					model.addAttribute("claimYn", "Y");
					break;
				} else {
					model.addAttribute("ord", getOrdInfoDTO(ordNo));
					model.addAttribute("type", type);
					model.addAttribute("claimYn", "N");
					break;
				}


			case "request" :
				if ("cancel".equals(type)) {
					model.addAttribute("reason", orderApi.getClaimReasonList("Cancel"));
				} else if ("exchange".equals(type)) {
					model.addAttribute("reason", orderApi.getClaimReasonList("Exch"));
				} else if ("return".equals(type)) {
					model.addAttribute("reason", orderApi.getClaimReasonList("Rtn"));
				}

				model.addAttribute("ord", getOrdInfoDTO(ordNo));
				model.addAttribute("type", type);
				break;
		}

		// model.addAttribute("claimYn", "Y");
		model.addAttribute("status", state);
		return "my/my-order-detail";
	}
}
