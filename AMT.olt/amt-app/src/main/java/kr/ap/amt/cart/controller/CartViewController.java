/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.cart.controller;

import kr.ap.comm.cart.CartSession;
import kr.ap.comm.config.interceptor.PageTitle;
import net.g1project.ecp.api.model.offlinestore.store.ProdInvtEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreResult;
import net.g1project.ecp.api.model.offlinestore.store.StoresInvtSearchInfo;
import net.g1project.ecp.api.model.sales.cart.*;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/cart")
public class CartViewController extends CartBaseController{

	CartEx cartEx; // 카트정보

	/**
	 * 장바구니 목록
	 * @param model
	 * @return
	 */
	@PageTitle(title = "장바구니|AP몰")
	@GetMapping("/cartList")
	public String cartList(Model model) {

		/* 세션 세팅 */
		CartSession cartSession = getCartSession();

		/* 카트정보 세팅*/
		if(isLoggedIn()){
			// 회원
			CartSnResult cartSnResult = cartApi.getMemberCartSn(getMemberSn());
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
				//cartEx = getCartInfo(cartSnResult.getCartSn());
				// 테스트 카트
//				cartEx = getCartInfo((long)1604);	// test
				cartEx = getCartInfo((long)1523);	// test
//				cartEx = getCartInfo((long)1420);	//일반상품
//				cartEx = getCartInfo((long)1424);	//묶음판매
//				cartEx = getCartInfo((long)1425);	//뷰티포인트 전용상품
//				cartEx = getCartInfo((long)1426);	//M+N 프로모션
//				cartEx = getCartInfo((long)1427);	//온라인상품에 사은품
//				cartEx = getCartInfo((long)1428);	//단위상품에 사은품
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
			return "cart/cart_01";
		}
		// PC
		if (isPcDevice()) {
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