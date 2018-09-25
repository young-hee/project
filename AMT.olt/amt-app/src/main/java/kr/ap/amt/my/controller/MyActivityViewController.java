package kr.ap.amt.my.controller;

import kr.ap.amt.my.vo.ReviewWritableOrderDTO;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.sales.guide.FaqSearchResult;
import net.g1project.ecp.api.model.sales.product.CountResult;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrder;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderProd;
import net.g1project.ecp.api.model.sales.terms.Terms;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

/**
 *
 * 8. 좋아요
 * 9. 구매리뷰
 * 10. 1:1 상담
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyActivityViewController extends AbstractController {

	/**********************************************************************************************
	 * 8. 좋아요
	 **********************************************************************************************/
	/**
	 * 좋아요
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myLike")
	@PageTitle(title = "좋아요" , menuId = "myLike", subMenuId = "myLike")
	public String myLike(Model model) {
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-like";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-like";
		}

		return null;
	}


	/**********************************************************************************************
	 * 9. 구매리뷰
	 **********************************************************************************************/
	/**
	 * 작성 가능한 리뷰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myReviewList")
	@PageTitle(title = "구매 리뷰" , menuId = "myActivity", subMenuId = "myReview")
	public String myReviewList(Model model) {
		ProdReviewWritableOrderInfo prodReviewWritableOrderInfo = productApi.getProductReviewWritableOrders(getMemberSn(), null, 0, 100);
		model.addAttribute("reviewCnt", prodReviewWritableOrderInfo.getTotalCount());
		if (prodReviewWritableOrderInfo.getTotalCount() > 999) {
			model.addAttribute("reviewCnt", "999+");
		}
		model.addAttribute("prodReviewWritableOrderInfo", prodReviewWritableOrderInfo);
		
		/*
		try {
			prodReviewWritableOrderInfo = productApi.getProductReviewWritableOrders(getMemberSn(), null, 0, 999);
			model.addAttribute("reviewCnt", prodReviewWritableOrderInfo.getTotalCount());
			if (prodReviewWritableOrderInfo.getTotalCount() > 999) {
				model.addAttribute("reviewCnt", "999+");
			}
			model.addAttribute("prodReviewWritableOrderInfo", prodReviewWritableOrderInfo);
			
			for(ProdReviewWritableOrder prodReviewWritableOrder : productReviewWritableOrders.getOrders()) {
				ReviewWritableOrderDTO dto = new ReviewWritableOrderDTO();
				dto.setOrderNo(prodReviewWritableOrder.getOrdNo());
				dto.setOrderDate(prodReviewWritableOrder.getOrderCompleteDate().toGMTString());
				for(ProdReviewWritableOrderProd prodReviewWritableOrderProd : prodReviewWritableOrder.getOrderProds()) {
					dto.setProductSn(prodReviewWritableOrderProd.getOrdProdSn().toString());
					dto.setProductName(prodReviewWritableOrderProd.getProdName());
					dto.setProductImage(prodReviewWritableOrderProd.getRepProdImage());
					break;
				}
				list.add(dto);
			}
			
			model.addAttribute("reviewWritableOrders", list);
		} catch (Exception e) {
			// TODO: handle exception
			model.addAttribute("reviewCnt", "0");
			model.addAttribute("prodReviewWritableOrderInfo", prodReviewWritableOrderInfo);
			model.addAttribute("reviewWritableOrders", list);
		}
		*/
		
		//작성한 리뷰
		ProdReviewListInfo prodReviewListInfo = new ProdReviewListInfo();
		try {
			//Member, OnlineProd
			prodReviewListInfo = productApi.getProductReviews("OnlineProd", "All", 0, 999, getMemberSn(),
				null, null, null,
				null, /* regularEventSn */
				"Last", "All", "N", "N", null, null, null, APConstant.AP_DISPLAY_MENU_SET_ID, null);
			model.addAttribute("writedCnt", prodReviewListInfo.getTotalCount());
			if (prodReviewListInfo.getTotalCount() > 999) {
				model.addAttribute("writedCnt", "999+");
			}
			model.addAttribute("prodReviewListInfo", prodReviewListInfo);
		} catch (Exception e) {
			// TODO: handle exception
			model.addAttribute("writedCnt", "0");
			model.addAttribute("prodReviewListInfo", prodReviewListInfo);
		}

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-review";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-review.1";
		}

		return null;
	}

	/**
	 * 작성한 리뷰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myWritedReviewList")
	@PageTitle(title = "작성한 리뷰 목록" , menuId = "myActivity", subMenuId = "myReview")
	public String myWritedReviewList(Model model) {

		ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, 0, 10);
		model.addAttribute("reviewCnt", productReviewWritableOrders.getTotalCount());

		CountResult productReviewCount = productApi.getProductReviewCount("Member", null, null, null, getMemberSn(), "All");
		model.addAttribute("writedCnt", productReviewCount.getCount());

		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
			return "my/my-review-writing-02";
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			return "my/my-activity-review-list.2";
		}

		return null;
	}
	
	/**
	 * 구매리뷰 약관
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myReviewPolicy")
	@PageTitle(title = "구매리뷰 약관" , menuId = "myActivity", subMenuId = "myReviewPolicy")
	public String myReviewPolicy(Model model) {
		List<Terms> terms= new ArrayList<Terms>();
		terms = termsApi.getTerms("AP999"); //구매리뷰약관 (BO)미정의 향후 수정 : termsApi.getTerms(APConstant.AP_SERVICE_POLICY_TERM_1);
		model.addAttribute("term", terms.get(0));
		
		return "my/my-review-policy";
	}


	/**********************************************************************************************
	 * 10. 1:1 상담
	 **********************************************************************************************/
	/**
	 * 1:1 문의 목록
	 *
	 * @param model
	 * @param req
	 * @return
	 */
	@GetMapping("/myInquiryList")
	@PageTitle(title = "1:1상담" , menuId = "myActivity", subMenuId = "myInquiry")
	public String myInquiryList(Model model, HttpServletRequest req) {
		
		/**
		 * Mobile
		 */
		if(isMobileDevice()) {
		}

		/**
		 * PC
		 */
		if(isPcDevice()) {
			//FAQ 목록 조회
	        FaqSearchResult faqSR = guideApi.getFaqs("", null, null, 0, 6);
	        model.addAttribute("faqSrchRst", faqSR);
		}
		
		//미해결 상담
		
		//답변완료된 상담

        return "my/my-inquiry_";
	}

}
