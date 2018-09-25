package kr.ap.amt.my.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.ap.comm.config.interceptor.FragmentPage;
import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.coupon.CntResult;
import net.g1project.ecp.api.model.sales.coupon.MemberCoupon;
import net.g1project.ecp.api.model.sales.coupon.MemberKeepingCoupon;
import net.g1project.ecp.api.model.sales.coupon.MemberKeepingCouponCount;
import net.g1project.ecp.api.model.sales.display.CouponGift;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.display.OnlineProdPriceSummary;
import net.g1project.ecp.api.model.sales.display.OnlineProdSummary;
import net.g1project.ecp.api.model.sales.display.ProdImage;
import net.g1project.ecp.api.model.sales.display.ProductSummary;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 *
 * 2. 쿠폰
 *
 */
@Controller
@RequestMapping("/my/page")
public class MyBenefitViewController extends AbstractController {

	/**********************************************************************************************
	 *  2. 쿠폰
	 **********************************************************************************************/
	/**
	 * 사용 가능한 쿠폰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/myCouponList")
	@PageTitle(title = "나의 쿠폰" , menuId = "myBenefit", subMenuId = "myCoupon")
	public String myCouponList(Model model) {
		
		//종료된쿠폰최대조회기간 90일
		MemberCoupon coupons = couponApi.getMemberKeepingCoupons("All", getMemberSn(), 30l, 100l);
		model.addAttribute("availCnt", coupons.getAvailCnt());
		model.addAttribute("expCnt", coupons.getExpCnt());
		
		model.addAttribute("availCoupons", coupons.getAvailCoupons());
		model.addAttribute("expCoupons", coupons.getExpCoupons());

		List<MemberKeepingCoupon> immCoupons = new ArrayList<MemberKeepingCoupon>(coupons.getAvailCoupons());
		
		immCoupons.removeIf(memberKeepingCoupon -> memberKeepingCoupon.getdDay() > 7);
		
		model.addAttribute("immCnt", immCoupons.size());
		model.addAttribute("immCoupons", immCoupons);

		if(isPcDevice())
			try {
				model.addAttribute("downloadCouponCnt", couponApi.getDownloadCouponsCnt());
			} catch (Exception e) {
				CntResult cnt = new CntResult();
				cnt.setCnt(0);
				model.addAttribute("downloadCouponCnt", cnt);
			}
		
		
		return "my/my-coupon";
	}
	/**
	 * 사용 가능한 쿠폰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/getCouponProdInfo")
	@PageTitle(title = "나의 쿠폰")
	@FragmentPage
	public String getCouponProdInfo(Model model, long couponIdentifier) {
		OnlineProdList prod = displayApi.getCouponedProdList(couponIdentifier, null, "Bestselling", 1, 1000);
		List<CouponProd> pridList = new ArrayList<MyBenefitViewController.CouponProd>();
		CouponProd prodItem;
		for(OnlineProdSummary prodSummary : prod.getList()) {
			ProductSummary prodDetail = prodSummary.getProducts().get(0);
			String brand = prodDetail.getBrandName();
			String prodName = prodDetail.getProdName();
			OnlineProdPriceSummary priceDetail = prodSummary.getOnlineProdPriceSummary();
			
			String imageUrl = null;
			
			for(ProdImage image : prodDetail.getProdImages()) {
				if(image.getImgNo() == prodSummary.getRepImgNo()) {
					imageUrl = image.getImgUrl();
					break;
				}
			}
			prodItem = new CouponProd();
			prodItem.setBrand(brand);
			prodItem.setProdName(prodName);
			prodItem.setImageUrl(imageUrl);
			prodItem.setPrice(priceDetail.getMaxFinalDiscountBeforeSalePrice());
			pridList.add(prodItem);
			
		}
		model.addAttribute("pridList", pridList);
		return "my/layer-my-coupon-03";
		
	}

	/**
	 * 사용 가능한 쿠폰 목록
	 *
	 * @param model
	 * @return
	 */
	@GetMapping("/getCouponGiftProdInfo")
	@PageTitle(title = "나의 쿠폰")
	@FragmentPage
	public String getCouponGiftProdInfo(Model model, long couponIdentifier) {
		List<CouponGift> giftList = displayApi.getCouponGiftList(couponIdentifier);
		model.addAttribute("giftList", giftList);
		return "my/layer-my-coupon-04";
	}
	
	public static class CouponProd {
		private String brand;
		private String prodName;
		private BigDecimal price;
		private String imageUrl;
		public String getBrand() {
			return brand;
		}
		public void setBrand(String brand) {
			this.brand = brand;
		}
		public String getProdName() {
			return prodName;
		}
		public void setProdName(String prodName) {
			this.prodName = prodName;
		}
		
		public BigDecimal getPrice() {
			return price;
		}
		public void setPrice(BigDecimal price) {
			this.price = price;
		}
		public String getImageUrl() {
			return imageUrl;
		}
		public void setImageUrl(String imageUrl) {
			this.imageUrl = imageUrl;
		}
		
	}
}
