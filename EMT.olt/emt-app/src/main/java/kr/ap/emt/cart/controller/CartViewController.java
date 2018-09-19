/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.cart.controller;

import java.util.ArrayList;
import java.util.List;

import kr.ap.comm.cart.CartSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.config.interceptor.PageTitle;
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
	 * @param model
	 * @return
	 */
	@PageTitle(title = "장바구니|에뛰드")
	@GetMapping("/cartList")
	public String cartList(Model model) {

		CartSession cartSession = getCartSession();

		if(isLoggedIn()){
			// 회원
			CartSnResult cartSnResult = cartApi.getMemberCartSn(getMemberSn());
			cartEx = getCartInfo(cartSnResult.getCartSn());

			// 테이크아웃 매장정보
			makeSelectStore(cartEx, model, getMemberSn());

			// 뷰티포인트 정보
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

	/**
	 * 테이크아웃 매장정보
	 * @param cartEx
	 * @param model
	 * @param memberSn
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
			try{
				StoresInvtSearchInfo var1 = new StoresInvtSearchInfo();
				var1.setMemberSn(memberSn);
				var1.setRegularStoreSearchYn("Y");
				var1.setOffset(0);
				var1.setLimit(10);
				var1.setSortBy("StoreName");
				var1.setProdInvtExList(prodInvtExList);
				StoreResult storeResult = storeApi.getStoresInvt(var1);
				model.addAttribute("storeRegularList", storeResult.getStoreExList());				// 단골매장목록
			}
			catch (Exception e){
				e.printStackTrace();

				StoresInvtSearchInfo var1 = new StoresInvtSearchInfo();
				var1.setMemberSn(memberSn);
				var1.setRegularStoreSearchYn("Y");
				var1.setOffset(0);
				var1.setLimit(10);
				var1.setSortBy("StoreName");
				StoreResult storeResult = storeApi.getStoresInvt(var1);
				model.addAttribute("storeRegularList", storeResult.getStoreExList());				// 단골매장목록
			}

			// 선택매장
			if(storePickupCartProdEx.getStoreSn() != null){
				try{
					StoresInvtSearchInfo var2 = new StoresInvtSearchInfo();
					var2.setMemberSn(memberSn);
					var2.setStoreSn(storePickupCartProdEx.getStoreSn());
					var2.setProdInvtExList(prodInvtExList);
					StoreResult storeResult2 = storeApi.getStoresInvt(var2);
					if(storeResult2 != null && !CollectionUtils.isEmpty(storeResult2.getStoreExList())){
						model.addAttribute("storeSelect", storeResult2.getStoreExList().get(0)); // 선택매장
					}
				}
				catch (Exception e){
					e.printStackTrace();

					StoresInvtSearchInfo var2 = new StoresInvtSearchInfo();
					var2.setMemberSn(memberSn);
					var2.setStoreSn(storePickupCartProdEx.getStoreSn());
					StoreResult storeResult2 = storeApi.getStoresInvt(var2);
					if(storeResult2 != null && !CollectionUtils.isEmpty(storeResult2.getStoreExList())){
						model.addAttribute("storeSelect", storeResult2.getStoreExList().get(0)); // 선택매장
					}
				}
			}
		}
		model.addAttribute("addressDivInfoList", storeApi.getStoreAddressDivs(null));	// 지역시구군 목록
	}

	/**
	 * 매장픽업 일반상품
	 * @param cartStorePickupOnlineProdExList
	 * @return
	 */
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

	/**
	 * 매장픽업 M+N, 동시구매 프로모션 상품
	 * @param cartStorePickupOnlineProdExList
	 * @return
	 */
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