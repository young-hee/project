/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.cart.controller;

import kr.ap.comm.cart.CartSession;
import kr.ap.comm.config.interceptor.PageTitle;
import net.g1project.ecp.api.model.sales.cart.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/cart")
public class CartViewController extends CartBaseController{

	CartEx cartEx; // 카트정보

	/**
	 * 장바구니 목록
	 * @param model
	 * @return
	 */
	@PageTitle(title = "장바구니")
	@GetMapping("/cartList")
	public String cartList(Model model) {

		/* 세션 세팅 */
		CartSession cartSession = getCartSession();

		/* 카트정보 세팅*/
		if(isLoggedIn()){
			// 회원
			CartSnResult cartSnResult = cartApi.getMemberCartSn(getMemberSn());

			/* 장바구니 옮겨닮기 */
			if(cartSession.getCartEx() != null){
				cartApi.transferMemberCart(getMemberSn(), cartSession.getCartEx().getCartSn());
			}

			cartEx = getCartInfo(cartSnResult.getCartSn());

			/* 뷰티포인트 정보 */
			CartMemberMembershipEx bpCartMemberMembershipEx = null;
			if(cartEx.getCartMemberEx().getMemberMembershipExList() != null){
				for(CartMemberMembershipEx cartMemberMembershipEx: cartEx.getCartMemberEx().getMemberMembershipExList()){
					if(CartConst.BP_SERVICE_CODE.equals(cartMemberMembershipEx.getMembershipServiceCode())){
						bpCartMemberMembershipEx = cartMemberMembershipEx;
						break;
					}
				}
			}
			model.addAttribute("bpCartMemberMembershipEx", bpCartMemberMembershipEx);
		}
		else{
			// 비회원
			if (cartSession.getCartSn() == 0L) {
				CartSnResult cartSnResult = cartApi.createNonmemberCart();
				cartEx = getCartInfo(cartSnResult.getCartSn());
			}
			else{
				cartEx = getCartInfo(cartSession.getCartSn());
			}
		}

		model.addAttribute("memberSn", getMemberSn());
		model.addAttribute("cartEx", cartEx);

		/* 재 계산을 위해 세션정보 세팅 */
		cartSession.setCartSn(cartEx.getCartSn());
		cartSession.setCartEx(cartEx);
		setCartSession(cartSession);

		// Mobile
		if (isMobileDevice()) {
			model.addAttribute("randomeBrand", showRandomBrand());
			return "cart/cart_01";
		}
		// PC
		if (isPcDevice()) {

			model.addAttribute("bestProdList", showBestProdList());
			return "cart/cart";
		}

		return null;
	}

	/**
	 * 장바구니 정보
	 * @param cartSn
	 * @return
	 */
	private CartEx getCartInfo(Long cartSn) {
		cartEx = cartApi.getCart(cartSn);
		cartEx = calculationCartEx(cartEx);
		return cartEx;
	}
}