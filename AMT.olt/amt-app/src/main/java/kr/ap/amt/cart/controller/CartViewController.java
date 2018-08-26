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
		if(getMemberSn() > 0L){
			// 회원
			CartSnResult cartSnResult = cartApi.getMemberCartSn(getMemberSn());
			cartEx = getCart(cartSnResult.getCartSn());

			/* 테이크아웃 매장정보 */
			makeSelectStore(cartEx, model, getMemberSn());
			
			model.addAttribute("memberSn", getMemberSn());
		}
		else{
			// 비회원
			if (cartSession.getCartSn() == 0L) {
				CartSnResult cartSnResult = cartApi.createNonmemberCart();
				//cartEx = getCart(cartSnResult.getCartSn());
				// 테스트 카트
				cartEx = getCart((long)1476);	// test
//				cartEx = getCart((long)1420);	//일반상품
//				cartEx = getCart((long)1424);	//묶음판매
//				cartEx = getCart((long)1425);	//뷰티포인트 전용상품
//				cartEx = getCart((long)1426);	//M+N 프로모션
//				cartEx = getCart((long)1427);	//온라인상품에 사은품
//				cartEx = getCart((long)1428);	//단위상품에 사은품
			}
			else{
				cartEx = getCart(cartSession.getCartSn());
			}
			model.addAttribute("memberSn", (long)0);
		}
		
		

		model.addAttribute("cartEx", cartEx);
		model.addAttribute("emptyCartViewBrand", showBrandSelect());

		/* 재계산을 위하여 최종 cartEx를 넣어 놓음 */
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
	 *  장바구니 정보
	 * @param cartSn
	 * @return
	 */
	private CartEx getCart(Long cartSn) {
		if(cartSn != null){
			cartEx = cartApi.getCart(cartSn);
			cartEx = calculationBySelect(cartEx);
			return cartEx;
		}
		return null;
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
				var1.setRegularStoreSearchYn("Y"); // 단골매장검색여부
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
				var1.setRegularStoreSearchYn("Y"); // 단골매장검색여부
				var1.setOffset(0);
				var1.setLimit(10);
				var1.setSortBy("StoreName");
				//var1.setProdInvtExList(prodInvtExList); // 재고 제외하고 목록보여주기
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
					//var2.setProdInvtExList(prodInvtExList); // 재고 제외하고 목록보여주기
					StoreResult storeResult2 = storeApi.getStoresInvt(var2);
					if(storeResult2 != null && !CollectionUtils.isEmpty(storeResult2.getStoreExList())){
						model.addAttribute("storeSelect", storeResult2.getStoreExList().get(0)); // 선택매장
					}
				}
			}
		}
		//model.addAttribute("selectStoreSn", storePickupCartProdEx.getStoreSn());			// 매장번호
		model.addAttribute("addressDivInfoList", storeApi.getStoreAddressDivs(null));	// 지역시구군 목록
	}

	/**
	 * 일반상품
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
	 * M+N, 동시구매 프로모션 상품
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