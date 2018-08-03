/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.cart.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.member.vo.MemberSession;
import net.g1project.ecp.api.model.offlinestore.store.ProdInvtEx;
import net.g1project.ecp.api.model.offlinestore.store.StoreResult;
import net.g1project.ecp.api.model.offlinestore.store.StoresInvtSearchInfo;
import net.g1project.ecp.api.model.sales.cart.CartEx;
import net.g1project.ecp.api.model.sales.cart.CartMemberMembershipEx;
import net.g1project.ecp.api.model.sales.cart.CartOnlineProdEx;
import net.g1project.ecp.api.model.sales.cart.CartProdEx;
import net.g1project.ecp.api.model.sales.cart.CartPromoEx;
import net.g1project.ecp.api.model.sales.cart.CartSnResult;

@Controller
@RequestMapping("/cart")
public class CartViewController extends CartBaseController{

	CartEx cartEx; // 카트정보

	/**
	 * 장바구니 목록
	 */
	@PageTitle(title = "장바구니|에뛰드")
	@GetMapping("/cartList")
	public String cartList(Model model) {

		/* 회원정보 조회 */
		MemberSession memberSession = getMemberSession();

		/* 카트정보 세팅*/
		cartEx = setCart(memberSession, model);
		memberSession.setCartProdSnList(null);
		
		// 재계산을 위하여 최종 cartEx를 넣어 놓음
		memberSession.setCartEx(cartEx);
		
		setMemberSession(memberSession);

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
	 * 회원구분 및 매장정보
	 */
	private CartEx setCart(MemberSession memberSession, Model model) {
		/* 비 회 */
		CartMemberMembershipEx bpCartMemberMembershipEx = null;
		if(memberSession.getMember_sn() == 0L) {
			if (memberSession.getCartSn() == 0L) {
				CartSnResult cartSnResult = cartApi.createNonmemberCart();
				cartEx = checkCart(memberSession, cartSnResult.getCartSn(), model);
				model.addAttribute("cartEx", cartEx);
			}else{
				cartEx = checkCart(memberSession, memberSession.getCartSn(), model);
				model.addAttribute("cartEx", cartEx);
			}
		/* 회원 */
		}else{
			CartSnResult memberCartSn = cartApi.getMemberCartSn(memberSession.getMember_sn());
			cartEx = checkCart(memberSession, memberCartSn.getCartSn(), model);

			if(cartEx.getCartMemberEx().getMemberMembershipExList() != null){
				for(CartMemberMembershipEx cartMemberMembershipEx: cartEx.getCartMemberEx().getMemberMembershipExList()){
					if("BP".equals(cartMemberMembershipEx.getMembershipServiceCode())){
						bpCartMemberMembershipEx = cartMemberMembershipEx;
						break;
					}
				}
			}
			model.addAttribute("cartEx", cartEx);
			model.addAttribute("bpCartMemberMembershipEx", bpCartMemberMembershipEx);

			/* 테이크아웃 매장정보 */
			makeSelectStore(cartEx, model, memberSession.getMember_sn());
		}
		return cartEx;
	}


	/**
	 * 장바구니 정보
	 */
	private CartEx checkCart(MemberSession memberSession, Long cartSn, Model model) {

		if(cartSn != null){
			CartEx cartEx = cartApi.getCart(cartSn);
			makeCartEx2(cartEx);
			memberSession.setCartSn(cartEx.getCartSn());
			if(memberSession.getMember_sn() > 0L){
				model.addAttribute("memberSn", memberSession.getMember_sn());
			}else{
				model.addAttribute("memberSn", (long)0);
			}
			return cartEx;
		}
		return null;
	}

	/**
	 * 쇼핑상품 정의
	 */
	private CartEx makeCartEx2(CartEx cartEx) {

		/* 온라인쇼핑 상품 */
		{
			// 장바구니-배송-온라인상품목록
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartDeliveryOnlineProdExList()) {
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if (!"OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus())
						|| "N".equals(cartProdEx.getCalculationResultYn())) {
						cartOnlineProdEx.setSaleDisplayStatus("NotSelect");
						break;
					}
				}
			}

			// 장바구니-배송-동시구매상품목록
			/*for (CartPromoEx cartPromoEx : cartEx.getCartDeliverySameTimePurPromoExList()) {
				for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if (!"OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus())){
							cartOnlineProdEx.setSaleDisplayStatus("NotSelect");
							break;
						}
					}
				}
			}*/
		}

		/* 테이크 아웃 상품 */
		{
			// 장바구니매장픽업-온라인상품목록
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartStorePickupOnlineProdExList()) {
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if (!"OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus())
						|| "N".equals(cartProdEx.getCalculationResultYn())) {
						cartOnlineProdEx.setSaleDisplayStatus("NotSelect");
						break;
					}
				}
			}
		}
		return cartEx;
	}

	/**
	 * 쇼핑상품 정의
	 */
	private CartEx makeCartEx(CartEx cartEx) {

		/* 온라인쇼핑 상품 */
		{
			// 장바구니-배송-온라인상품목록
			List<CartOnlineProdEx> cartDeliveryOnlineProdExList = new ArrayList<CartOnlineProdEx>();
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartDeliveryOnlineProdExList()) {
				List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
						// 판매중, 품절, 조기소진 데이터만 가져온다.
						CartProdExList.add(cartProdEx);
					}
				}
				if (CartProdExList.size() > 0) {
					cartOnlineProdEx.setCartProdExList(CartProdExList);
					cartDeliveryOnlineProdExList.add(cartOnlineProdEx);
				}
			}
			cartEx.setCartDeliveryOnlineProdExList(cartDeliveryOnlineProdExList);

			// 장바구니-배송-멤버십포인트교환-온라인상품목록
			List<CartOnlineProdEx> cartDeliveryMembershipPointExchOnlineProdExList = new ArrayList<CartOnlineProdEx>();
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartDeliveryMembershipPointExchOnlineProdExList()) {
				List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
						// 판매중, 품절, 조기소진 데이터만 가져온다.
						CartProdExList.add(cartProdEx);
					}
				}
				if (CartProdExList.size() > 0) {
					cartOnlineProdEx.setCartProdExList(CartProdExList);
					cartDeliveryMembershipPointExchOnlineProdExList.add(cartOnlineProdEx);
				}
			}
			cartEx.setCartDeliveryMembershipPointExchOnlineProdExList(cartDeliveryMembershipPointExchOnlineProdExList);

			// 장바구니-배송-활동포인트교환-온라인상품목록
			List<CartOnlineProdEx> cartDeliveryActivityPointExchOnlineProdExList = new ArrayList<CartOnlineProdEx>();
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartDeliveryActivityPointExchOnlineProdExList()) {
				List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if(cartOnlineProdEx.getOnlineProdCode() != null){
						if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
							// 판매중, 품절, 조기소진 데이터만 가져온다.
							CartProdExList.add(cartProdEx);
						}
					}
					else{
						CartProdExList.add(cartProdEx);
					}
				}
				if (CartProdExList.size() > 0) {
					cartOnlineProdEx.setCartProdExList(CartProdExList);
					cartDeliveryActivityPointExchOnlineProdExList.add(cartOnlineProdEx);
				}
			}
			cartEx.setCartDeliveryActivityPointExchOnlineProdExList(cartDeliveryActivityPointExchOnlineProdExList);

			// 장바구니-MN프로모션-온라인상품목록
			List<CartPromoEx> cartDeliveryMNPromoExList = new ArrayList<CartPromoEx>();
			for (CartPromoEx cartPromoEx : cartEx.getCartDeliveryMNPromoExList()) {
				List<CartOnlineProdEx> promoOnlineProdExList = new ArrayList<CartOnlineProdEx>();
				for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
					for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
							// 판매중, 품절, 조기소진 데이터만 가져온다.
							CartProdExList.add(cartProdEx);
						}
					}
					if (CartProdExList.size() > 0) {
						cartOnlineProdEx.setCartProdExList(CartProdExList);
						promoOnlineProdExList.add(cartOnlineProdEx);
					}
				}
				if (promoOnlineProdExList.size() > 0) {
					cartPromoEx.setPromoOnlineProdExList(promoOnlineProdExList);
					cartDeliveryMNPromoExList.add(cartPromoEx);
				}
			}
			cartEx.setCartDeliveryMNPromoExList(cartDeliveryMNPromoExList);

			// 장바구니-동시구매-온라인상품목록
			List<CartPromoEx> cartDeliverySameTimePurPromoExList = new ArrayList<CartPromoEx>();
			for (CartPromoEx cartPromoEx : cartEx.getCartDeliverySameTimePurPromoExList()) {
				List<CartOnlineProdEx> promoOnlineProdExList = new ArrayList<CartOnlineProdEx>();
				for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
					for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
							// 판매중, 품절, 조기소진 데이터만 가져온다.
							CartProdExList.add(cartProdEx);
						}
					}
					if (CartProdExList.size() > 0) {
						cartOnlineProdEx.setCartProdExList(CartProdExList);
						promoOnlineProdExList.add(cartOnlineProdEx);
					}
				}
				if (promoOnlineProdExList.size() > 0) {
					cartPromoEx.setPromoOnlineProdExList(promoOnlineProdExList);
					cartDeliverySameTimePurPromoExList.add(cartPromoEx);
				}
			}
			cartEx.setCartDeliverySameTimePurPromoExList(cartDeliverySameTimePurPromoExList);
		}

		/* 테이크 아웃 상품 */
		{
			// 장바구니매장픽업-온라인상품목록
			List<CartOnlineProdEx> cartStorePickupOnlineProdExList = new ArrayList<CartOnlineProdEx>();
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartStorePickupOnlineProdExList()) {
				List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					// 판매중, 품절, 조기소진 데이터만 가져온다.
					if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
						// 매장픽업여부가 'Y'
						if("Y".equals(cartProdEx.getStorePickupYn())){
							CartProdExList.add(cartProdEx);
						}
					}
				}
				if (CartProdExList.size() > 0) {
					cartOnlineProdEx.setCartProdExList(CartProdExList);
					cartStorePickupOnlineProdExList.add(cartOnlineProdEx);
				}
			}
			cartEx.setCartStorePickupOnlineProdExList(cartStorePickupOnlineProdExList);

			// 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
			List<CartOnlineProdEx> cartStorePickupMembershipPointExchOnlineProdExList = new ArrayList<CartOnlineProdEx>();
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartStorePickupMembershipPointExchOnlineProdExList()) {
				List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					// 판매중, 품절, 조기소진 데이터만 가져온다.
					if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
						"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
						// 매장픽업여부가 'Y'
						if("Y".equals(cartProdEx.getStorePickupYn())){
							CartProdExList.add(cartProdEx);
						}
					}
				}
				if (CartProdExList.size() > 0) {
					cartOnlineProdEx.setCartProdExList(CartProdExList);
					cartStorePickupMembershipPointExchOnlineProdExList.add(cartOnlineProdEx);
				}
			}
			cartEx.setCartStorePickupMembershipPointExchOnlineProdExList(cartStorePickupMembershipPointExchOnlineProdExList);

			// 장바구니-매장픽업-활동포인트교환-온라인상품목록
			List<CartOnlineProdEx> cartStorePickupActivityPointExchOnlineProdExList = new ArrayList<CartOnlineProdEx>();
			for (CartOnlineProdEx cartOnlineProdEx : cartEx.getCartStorePickupActivityPointExchOnlineProdExList()) {
				List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if(cartOnlineProdEx.getOnlineProdCode() != null){
						if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
							// 판매중, 품절, 조기소진 데이터만 가져온다.
							CartProdExList.add(cartProdEx);
						}
					}
					else{
						CartProdExList.add(cartProdEx);
					}
				}
				if (CartProdExList.size() > 0) {
					cartOnlineProdEx.setCartProdExList(CartProdExList);
					cartStorePickupActivityPointExchOnlineProdExList.add(cartOnlineProdEx);
				}
			}
			cartEx.setCartStorePickupActivityPointExchOnlineProdExList(cartStorePickupActivityPointExchOnlineProdExList);

			// 장바구니-매장픽업-MN프로모션-온라인상품목록
			List<CartPromoEx> cartStorePickupMNPromoExList = new ArrayList<CartPromoEx>();
			for (CartPromoEx cartPromoEx : cartEx.getCartStorePickupMNPromoExList()) {
				List<CartOnlineProdEx> promoOnlineProdExList = new ArrayList<CartOnlineProdEx>();
				for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
					for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
							// 판매중, 품절, 조기소진 데이터만 가져온다.
							CartProdExList.add(cartProdEx);
						}
					}
					if (CartProdExList.size() > 0) {
						cartOnlineProdEx.setCartProdExList(CartProdExList);
						promoOnlineProdExList.add(cartOnlineProdEx);
					}
				}
				if (promoOnlineProdExList.size() > 0) {
					cartPromoEx.setPromoOnlineProdExList(promoOnlineProdExList);
					cartStorePickupMNPromoExList.add(cartPromoEx);
				}
			}
			cartEx.setCartStorePickupMNPromoExList(cartStorePickupMNPromoExList);

			// 장바구니-매장픽업-동시구매-온라인상품목록
			List<CartPromoEx> cartStorePickupSameTimePurPromoExList = new ArrayList<CartPromoEx>();
			for (CartPromoEx cartPromoEx : cartEx.getCartStorePickupSameTimePurPromoExList()) {
				List<CartOnlineProdEx> promoOnlineProdExList = new ArrayList<CartOnlineProdEx>();
				for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					List<CartProdEx> CartProdExList = new ArrayList<CartProdEx>();
					for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"Exhaustion".equals(cartProdEx.getProdEx().getSaleDisplayStatus()) ||
							"OutOfStock".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
							// 판매중, 품절, 조기소진 데이터만 가져온다.
							CartProdExList.add(cartProdEx);
						}
					}
					if (CartProdExList.size() > 0) {
						cartOnlineProdEx.setCartProdExList(CartProdExList);
						promoOnlineProdExList.add(cartOnlineProdEx);
					}
				}
				if (promoOnlineProdExList.size() > 0) {
					cartPromoEx.setPromoOnlineProdExList(promoOnlineProdExList);
					cartStorePickupSameTimePurPromoExList.add(cartPromoEx);
				}
			}
			cartEx.setCartStorePickupSameTimePurPromoExList(cartStorePickupSameTimePurPromoExList);

		}
		return cartEx;
	}

	/**
	 * 테이크아웃 매장정보
	 */
	private void makeSelectStore(CartEx cartEx, Model model, Long memberSn) {

		//Long selectStoreSn = null;
		CartProdEx storePickupCartProdEx = null;
		List<ProdInvtEx> prodInvtExList = new ArrayList<>();

		// 장바구니매장픽업-온라인상품목록
		if(!CollectionUtils.isEmpty(cartEx.getCartStorePickupOnlineProdExList())){
			prodInvtExList.addAll(getProdInvtExList(cartEx.getCartStorePickupOnlineProdExList()));
			storePickupCartProdEx = cartEx.getCartStorePickupOnlineProdExList().get(0).getCartProdExList().get(0);
		}
		// 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
		if(!CollectionUtils.isEmpty(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList())){
			prodInvtExList.addAll(getProdInvtExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList()));
			storePickupCartProdEx = cartEx.getCartStorePickupMembershipPointExchOnlineProdExList().get(0).getCartProdExList().get(0);
		}
		// 장바구니-매장픽업-활동포인트교환-온라인상품목록
		if(!CollectionUtils.isEmpty(cartEx.getCartStorePickupActivityPointExchOnlineProdExList())){
			prodInvtExList.addAll(getProdInvtExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList()));
			storePickupCartProdEx = cartEx.getCartStorePickupActivityPointExchOnlineProdExList().get(0).getCartProdExList().get(0);
		}
		// 장바구니-매장픽업-M+N-온라인상품목록
		if(!CollectionUtils.isEmpty(cartEx.getCartStorePickupMNPromoExList())){
			prodInvtExList.addAll(getPromoProdInvtExList(cartEx.getCartStorePickupMNPromoExList()));
			storePickupCartProdEx = cartEx.getCartStorePickupMNPromoExList().get(0).getPromoOnlineProdExList().get(0).getCartProdExList().get(0);
		}
		// 장바구니-매장픽업-동시구매-온라인상품목록
		if(!CollectionUtils.isEmpty(cartEx.getCartStorePickupSameTimePurPromoExList())){
			prodInvtExList.addAll(getPromoProdInvtExList(cartEx.getCartStorePickupSameTimePurPromoExList()));
			storePickupCartProdEx = cartEx.getCartStorePickupSameTimePurPromoExList().get(0).getPromoOnlineProdExList().get(0).getCartProdExList().get(0);
		}

		if(storePickupCartProdEx != null){
			// 단골매장
			StoresInvtSearchInfo var1 = new StoresInvtSearchInfo();
			var1.setMemberSn(memberSn);
			var1.setRegularStoreSearchYn("Y"); // 단골매장검색여부
			var1.setOffset(0);
			var1.setLimit(10);
			var1.setSortBy("StoreName");
			var1.setProdInvtExList(prodInvtExList);
			StoreResult storeResult = storeApi.getStoresInvt(var1);
			model.addAttribute("storeRegularList", storeResult.getStoreExList());				// 단골매장목록

			// 선택매장
			if(storePickupCartProdEx.getStoreSn() != null){
				StoresInvtSearchInfo var2 = new StoresInvtSearchInfo();
				var2.setMemberSn(memberSn);
				var2.setStoreSn(storePickupCartProdEx.getStoreSn());
				var2.setProdInvtExList(prodInvtExList);
				StoreResult storeResult2 = storeApi.getStoresInvt(var2);
				if(storeResult2 != null && !CollectionUtils.isEmpty(storeResult2.getStoreExList())){
					model.addAttribute("storeSelect", storeResult2.getStoreExList().get(0)); // 선택매장
				}
			}
		}
		//model.addAttribute("selectStoreSn", storePickupCartProdEx.getStoreSn());			// 매장번호
		model.addAttribute("addressDivInfoList", storeApi.getStoreAddressDivs(null));	// 지역시구군 목록
	}

	/* 일반상품 */
	private List<ProdInvtEx> getProdInvtExList( List<CartOnlineProdEx> cartStorePickupOnlineProdExList) {
		List<ProdInvtEx> prodInvtExList = new ArrayList<>();
		for(CartOnlineProdEx cartOnlineProdEx : cartStorePickupOnlineProdExList ){
			for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()){
				ProdInvtEx prodInvtEx = new ProdInvtEx();
				prodInvtEx.setProdSn(cartProdEx.getProdEx().getProdSn());
				prodInvtEx.setOrdQty(cartProdEx.getCartProdQty().intValue());
				prodInvtExList.add(prodInvtEx);
			}
		}
		return prodInvtExList;
	}

	/* M+N, 동시구매 프로모션 상품 */
	private List<ProdInvtEx> getPromoProdInvtExList( List<CartPromoEx> cartStorePickupOnlineProdExList) {
		List<ProdInvtEx> prodInvtExList = new ArrayList<>();
		for(CartPromoEx cartPromoEx : cartStorePickupOnlineProdExList ){
			for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()){
				for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()){
					ProdInvtEx prodInvtEx = new ProdInvtEx();
					prodInvtEx.setProdSn(cartProdEx.getProdEx().getProdSn());
					prodInvtEx.setOrdQty(cartProdEx.getCartProdQty().intValue());
					prodInvtExList.add(prodInvtEx);
				}
			}
		}
		return prodInvtExList;
	}
}