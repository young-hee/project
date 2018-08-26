/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.cart.controller;

import kr.ap.comm.cart.CartSession;
import net.g1project.ecp.api.exception.ApiException;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.offlinestore.store.*;
import net.g1project.ecp.api.model.sales.cart.*;
import org.apache.commons.lang.ArrayUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.CollectionUtils;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.*;

@RestController
@RequestMapping("/cart")
public class CartRestController extends CartBaseController{

	/**
	 * 베리에이션 목록
	 * @param cartProdSn
	 * @return
	 */
	@GetMapping("/getLayerPage")
	public ResponseEntity<?> getLayerPage(Long cartProdSn, Long prodSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		if(Long.valueOf(cartProdSn) != null){
			List<ProdEx> prodExList = new ArrayList<>();
			List<ProdEx> apiProdExList = cartApi.getOnlineProdUnitVariationProds(cartProdSn);
			if(apiProdExList.size() > 0 ){
				for(ProdEx pe : apiProdExList){
					if(!prodSn.equals(pe.getProdSn()) &&
						"OnSale".equals(pe.getSaleDisplayStatus()) ||
						"Exhaustion".equals(pe.getSaleDisplayStatus()) ||
						"OutOfStock".equals(pe.getSaleDisplayStatus()) ){
						prodExList.add(pe);
					}
				}
			}
			result.put("param", prodExList);
			result.put("result", "success");
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 상품수정(+,-)
	 * @param cartSn
	 * @param cartProdSn
	 * @param prodSn
	 * @param cartProdQty
	 * @param storePickupYn
	 * @return
	 */
	@PutMapping("/modifyCartProd")
	public ResponseEntity<?> modifyCartProd(Long cartSn,
											Long cartProdSn,
											Long prodSn,
											Long cartProdQty,
											String integrationMembershipExchYn,
											String activityPointExchYn,
											String storePickupYn,
											Long StoreSn,
											Long cartBulkIncludedProdSn,
											Long bulkDcIncludedProdGrpSn,
											Long includedProdSn,
											Integer	includedProdQty,
											String modifyType
											){
		HashMap<String, Object> result = new HashMap<String, Object>();
		CartProdExPut cartProdExPut = new CartProdExPut();
		cartProdExPut.setCartProdSn(cartProdSn);
		cartProdExPut.setProdSn(prodSn);
		cartProdExPut.setCartProdQty(cartProdQty);
		cartProdExPut.setIntegrationMembershipExchYn(integrationMembershipExchYn);
		cartProdExPut.setActivityPointExchYn(activityPointExchYn);
		cartProdExPut.setStorePickupYn(storePickupYn);
		cartProdExPut.setStoreSn(StoreSn);

		List<CartBulkIncludedProdExPut> cartBulkIncludedProdExList = new ArrayList<>();
		CartBulkIncludedProdExPut cartBulkIncludedProdExPut = new CartBulkIncludedProdExPut();
		cartBulkIncludedProdExPut.setCartBulkIncludedProdSn(cartBulkIncludedProdSn);
		cartBulkIncludedProdExPut.setBulkDcIncludedProdGrpSn(bulkDcIncludedProdGrpSn);
		cartBulkIncludedProdExPut.setIncludedProdSn(includedProdSn);
		cartBulkIncludedProdExPut.setIncludedProdQty(includedProdQty);
		cartBulkIncludedProdExList.add(cartBulkIncludedProdExPut);
		if(cartBulkIncludedProdExList.size() > 0){
			cartProdExPut.setCartBulkIncludedProdExList(cartBulkIncludedProdExList);
		}

		if(Long.valueOf(cartSn) != null || cartProdExPut != null){
			BooleanResult br = cartApi.modifyCartProd(cartSn, cartProdExPut);
			if (br.isResult()) {
				CartEx ce = null;
				if("Q".equals(modifyType)) {
					ce = calculationByChangeQty(cartSn, cartProdSn, cartProdQty);
				}
				else {
					ce = getCartApi(cartSn);
					//ce = calculationBySelect(ce);
				}
				result.put("data", ce);
			}
		}

		result.put("result", "success");
		return ResponseEntity.ok(result);
	}

	/**
	 * 단일삭제(단품상품)
	 * @param cartSn
	 * @param cartProdSn
	 * @return
	 */
	@PostMapping("/removeCartProd")
	public ResponseEntity<?> removeCartProd(Long cartSn,
											Long cartProdSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		if(Long.valueOf(cartSn) != null || Long.valueOf(cartProdSn) != null){
			BooleanResult br = cartApi.removeCartProd(cartSn, cartProdSn);
			if (br.isResult()) {
				CartEx ce = calculationByRemove(cartSn, Arrays.asList(cartProdSn));
				result.put("data", ce);
			}
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 선택삭제
	 * @param prdCdArr
	 * @return
	 */
	@PostMapping("/removeSelectCartProd")
	public ResponseEntity<?> removeSelectCartProd(Long cartSn,
												  String[] prdCdArr,
											  	  String[] takeoutCdArr) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		List<Long> removeCartProdSnList = new ArrayList<>();
		if(!ArrayUtils.isEmpty(prdCdArr)){
			for(int i=0; i< prdCdArr.length; i++){
				if(prdCdArr[i] != null) {
					BooleanResult br = cartApi.removeCartProd(cartSn, Long.parseLong(prdCdArr[i]));
					if(br.isResult()){
						removeCartProdSnList.add(Long.parseLong(prdCdArr[i]));
					}

				}
			}
		}
		if(!ArrayUtils.isEmpty(takeoutCdArr)){
			for(int i=0; i< takeoutCdArr.length; i++){
				if(takeoutCdArr[i] != null) {
					BooleanResult br = cartApi.removeCartProd(cartSn, Long.parseLong(takeoutCdArr[i]));
					if(br.isResult()){
						removeCartProdSnList.add(Long.parseLong(prdCdArr[i]));
					}
				}
			}
		}
		CartEx ce = calculationByRemove(cartSn, removeCartProdSnList);
		result.put("data", ce);

		return ResponseEntity.ok(result);
	}

	/**
	 * 선택상품재계산
	 * @param prdCdArr
	 * @return
	 */
	@GetMapping("/getCartBySelectCartProds")
	public ResponseEntity<?> getCartBySelectCartProds(Long cartSn,
													  String[] prdCdArr,
													  String[] takeoutCdArr) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		String cartProdSnList = "";  // 3,4,5
		if(!ArrayUtils.isEmpty(prdCdArr)){
			for(int i=0; i< prdCdArr.length; i++){
				if(prdCdArr[i] != null) {
					cartProdSnList = cartProdSnList + (cartProdSnList.length() > 0 ? "," : "") + prdCdArr[i];
				}
			}
		}
		if(!ArrayUtils.isEmpty(takeoutCdArr)){
			for(int i=0; i< takeoutCdArr.length; i++){
				if(takeoutCdArr[i] != null) {
					cartProdSnList = cartProdSnList + (cartProdSnList.length() > 0 ? "," : "") + takeoutCdArr[i];
				}
			}
		}
		CartEx ce = calculationBySelect(cartSn, cartProdSnList);
		result.put("data", ce);
		return ResponseEntity.ok(result);
	}

	/**
	 * 매장정보(재고)찾기
	 * @param regularStoreSearchYn
	 * @param keyword
	 * @param latitude
	 * @param longitude
	 * @param radius
	 * @param offSet
	 * @param limit
	 * @param sortBy
	 * @return
	 */
	@PostMapping("/takeoutStore")
	public ResponseEntity<?> takeoutStore(String regularStoreSearchYn, String keyword,
										  Double latitude, Double longitude,
										  Double radius, Integer offSet,
										  Integer limit, String sortBy) {

		HashMap<String, Object> result = new HashMap<String, Object>();
		CartSession cartSession = getCartSession();

		CartProdEx storePickupCartProdEx = null;
		List<ProdInvtEx> prodInvtExList = new ArrayList<>();

		CartEx cartEx =  getCartApi(cartSession.getCartSn());

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
			StoresInvtSearchInfo var1 = new StoresInvtSearchInfo();
			var1.setMemberSn(getMemberSn());
			var1.setRegularStoreSearchYn(regularStoreSearchYn);
			var1.setKeyword(keyword);
			var1.setLatitude(latitude != null ? BigDecimal.valueOf(latitude) : null);
			var1.setLongitude(longitude != null ? BigDecimal.valueOf(longitude) : null);
			var1.setRadius(radius != null ? BigDecimal.valueOf(radius) : null);
			var1.setLimit(limit);
			var1.setOffset(offSet);
			var1.setSortBy(sortBy);
			//var1.setProdInvtExList(prodInvtExList);
			StoreResult storeResult = storeApi.getStoresInvt(var1);
			result.put("param", storeResult);
			result.put("result", "success");
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 단골 매장 등록
	 * @param storeSn
	 * @return
	 */
	@PostMapping("/addTakeoutStore")
	public ResponseEntity<?> addFavoriteStore(String storeSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		try {
			RegularStoreForPost rs = new RegularStoreForPost();
			rs.setMemberSn(getMemberSn());
			rs.setStoreSn(Long.valueOf(storeSn));
			RegularStorePostResult rsResult = storeApi.postRegularStore(rs);
			if(rsResult.isResult()){
				result.put("data", rsResult);
			}
		} catch (ApiException ae) {
			if ("EOFS001".equals(ae.getErrorCode()))
				throw error(result, HttpStatus.SERVICE_UNAVAILABLE, ae.getErrorCode(), "단골 매장은 최대 10개 까지만 추가가 가능합니다.");
			else {
				throw ae;
			}
		}
		return ResponseEntity.ok(result);
	}

	/**
	 * 단골 매장 취소
	 * @param storeSn
	 * @return
	 */
	@PostMapping("/delTakeoutStore")
	public ResponseEntity<?> delTakeoutStore(String storeSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		storeApi.deleteRegularStores(getMemberSn(), storeSn);
		result.put("data", "success");

		return ResponseEntity.ok(result);
	}

	/**
	 * 매장지역정보 목록
	 * @param addressDiv
	 * @return
	 */
	@GetMapping("/storeAddressDivs")
	public ResponseEntity<?> storeAddressDivs(String addressDiv) { // 서울특별시
		HashMap<String, Object> result = new HashMap<String, Object>();
		if(!StringUtils.isEmpty(addressDiv)){
			List<String> addressDetailList = new ArrayList<String>();
			for(AddressDivInfo adi : storeApi.getStoreAddressDivs(addressDiv)){
				for(String addressData : adi.getAddressDetailDivs()){
					addressDetailList.add(addressData);
				}
			}
			result.put("param", addressDetailList);
			result.put("result", "success");
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 매장선택 변경
	 * @param cartSn
	 * @param storeSn
	 * @return
	 */
	@PutMapping("/changeStore")
	public ResponseEntity<?> changeStore(Long cartSn, Long storeSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		if(Long.valueOf(cartSn) != null && Long.valueOf(storeSn) != null){
			BooleanResult br = cartApi.changeStore(cartSn, storeSn);
			if (br.isResult()) {
				CartProdEx storePickupCartProdEx = null;
				List<ProdInvtEx> prodInvtExList = new ArrayList<>();

				CartEx cartEx =  getCartApi(cartSn);

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
						// 단골매장
						StoresInvtSearchInfo var1 = new StoresInvtSearchInfo();
						var1.setMemberSn(getMemberSn());
						var1.setRegularStoreSearchYn("Y"); // 단골매장검색여부
						var1.setOffset(0);
						var1.setLimit(10);
						var1.setSortBy("StoreName");
						var1.setProdInvtExList(prodInvtExList);
						StoreResult storeResult = storeApi.getStoresInvt(var1);
						result.put("storeRegularList", storeResult.getStoreExList());
					}
					catch (Exception e){
						e.printStackTrace();

						// 단골매장
						StoresInvtSearchInfo var1 = new StoresInvtSearchInfo();
						var1.setMemberSn(getMemberSn());
						var1.setRegularStoreSearchYn("Y"); // 단골매장검색여부
						var1.setOffset(0);
						var1.setLimit(10);
						var1.setSortBy("StoreName");
						//var1.setProdInvtExList(prodInvtExList);
						StoreResult storeResult = storeApi.getStoresInvt(var1);
						result.put("storeRegularList", storeResult.getStoreExList());
					}

					// 선택매장
					if(storePickupCartProdEx.getStoreSn() != null){
						try{
							StoresInvtSearchInfo var2 = new StoresInvtSearchInfo();
							var2.setMemberSn(getMemberSn());
							var2.setStoreSn(storePickupCartProdEx.getStoreSn());
							var2.setProdInvtExList(prodInvtExList);
							StoreResult storeResult2 = storeApi.getStoresInvt(var2);
							if(storeResult2 != null && !CollectionUtils.isEmpty(storeResult2.getStoreExList())){
								result.put("storeSelect", storeResult2.getStoreExList().get(0));
							}

						}
						catch (Exception e){
							e.printStackTrace();

							StoresInvtSearchInfo var2 = new StoresInvtSearchInfo();
							var2.setMemberSn(getMemberSn());
							var2.setStoreSn(storePickupCartProdEx.getStoreSn());
							//var2.setProdInvtExList(prodInvtExList);
							StoreResult storeResult2 = storeApi.getStoresInvt(var2);
							if(storeResult2 != null && !CollectionUtils.isEmpty(storeResult2.getStoreExList())){
								result.put("storeSelect", storeResult2.getStoreExList().get(0));
							}
						}
					}
				}
			}
		}

		return ResponseEntity.ok(result);
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

	/**
	 * 장바구니에 담기
	 * 일반상품/묶음판매상품
	 * (매장픽업 같이 사용함.)
	 *
	 * @param jsonObj
	 * @return
	 */
	@PostMapping("/addCartProd")
	public ResponseEntity<?> addCartProd(@RequestBody Object jsonObj) {

		HashMap<String, Object> jsonMap = (HashMap<String, Object>) jsonObj;
		List<LinkedHashMap> hashMapList = (List<LinkedHashMap>) jsonMap.get("cartProdExPostList");
		List<CartProdExPost> cartProdExPostList = new ArrayList<CartProdExPost>();
		if (!ObjectUtils.isEmpty(hashMapList)) {
			cartProdExPostMapping(hashMapList, cartProdExPostList);
		}

		HashMap<String, Object> result = new HashMap<String, Object>();

		//TODO:주문하기위해 재고체크,

		CartSession cartSession = getCartSession();
		Long cartSn = cartSession.getCartSn();

		if (isLoggedIn()) {

			//회원
			if (cartSn == 0L) {
				//장바구니번호 없으면.
				CartSnResult cartSnResult = cartApi.getMemberCartSn(getMemberSn());
				cartSn = cartSnResult.getCartSn();
			}

			BooleanResult booleanResult = cartApi.addCartProds(cartSn, cartProdExPostList);
			result.put("booleanResult", booleanResult);

		} else {

			//비회원
			if (cartSn == 0L) {
				//장바구니번호 없으면.
				CartSnResult nonmemberCart = cartApi.createNonmemberCart();
				cartSn = nonmemberCart.getCartSn();
				cartSession.setCartSn(cartSn);
				// SpringSession with Redis 로 Session 사용변경. 세션값 변경이 있을 경우 명시적으로 setAttribute
				setCartSession(cartSession);
			}

			BooleanResult booleanResult = cartApi.addCartProds(cartSn, cartProdExPostList);
			result.put("booleanResult", booleanResult);

		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 장바구니에 담기
	 * 동시구매
	 * (매장픽업 같이 사용함.)
	 *
	 * @param jsonObj
	 * @return
	 */
	@PostMapping("/addCartProdSameTime")
	public ResponseEntity<?> addCartProdSameTime(@RequestBody Object jsonObj) {

		HashMap<String, Object> jsonMap = (HashMap<String, Object>) jsonObj;
		List<LinkedHashMap> hashMapList = (List<LinkedHashMap>) jsonMap.get("sameTimeCartProdExPostList");
		List<SameTimePurCartProdSet> sameTimeCartProdExPostList = new ArrayList<SameTimePurCartProdSet>();
		if (!ObjectUtils.isEmpty(hashMapList)) {
			sameTimeCartProdExPostMapping(hashMapList, sameTimeCartProdExPostList);
		}

		HashMap<String, Object> result = new HashMap<String, Object>();

		//TODO:주문하기위해 재고체크,

		CartSession cartSession = getCartSession();
		Long cartSn = cartSession.getCartSn();

		if (isLoggedIn()) {

			//회원

			if (cartSn == 0L) {
				//장바구니번호 없으면.
				CartSnResult cartSnResult = cartApi.getMemberCartSn(getMemberSn());
				cartSn = cartSnResult.getCartSn();
			}

			BooleanResult booleanResult = cartApi.addSameTimePurCartProds(cartSn, sameTimeCartProdExPostList);
			result.put("booleanResult", booleanResult);

		} else {

			//비회원

			if (cartSn == 0L) {
				//장바구니번호 없으면.
				CartSnResult nonmemberCart = cartApi.createNonmemberCart();
				cartSn = nonmemberCart.getCartSn();
				cartSession.setCartSn(cartSn);
				// SpringSession with Redis 로 Session 사용변경. 세션값 변경이 있을 경우 명시적으로 setAttribute
				setCartSession(cartSession);
			}

			BooleanResult booleanResult = cartApi.addSameTimePurCartProds(cartSn, sameTimeCartProdExPostList);
			result.put("booleanResult", booleanResult);

		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 바로구매(상품상세)
	 *
	 * @param jsonObj
	 * @return
	 */
	@PostMapping("/buyNowCartProd")
	public ResponseEntity<?> buyNowCartProd(@RequestBody Object jsonObj) {

		HashMap<String, Object> jsonMap = (HashMap<String, Object>) jsonObj;
		List<LinkedHashMap> hashMapList = (List<LinkedHashMap>) jsonMap.get("cartProdExPostList");
		List<CartProdExPost> cartProdExPostList = new ArrayList<CartProdExPost>();
		cartProdExPostMapping(hashMapList, cartProdExPostList);

		HashMap<String, Object> result = new HashMap<String, Object>();

		//TODO:주문하기위해 재고체크,


		//임시장바구니 만들기
		CartSnResult cartSnResult = cartApi.createBuynowCart();
		Long cartSn = cartSnResult.getCartSn();

		BooleanResult booleanResult = cartApi.addCartProds(cartSn, cartProdExPostList);

		if (booleanResult.isResult()) {
			//성공하면 주문서화면 진입하기 위해 cartSn 전달
			CartSession cartSession = getCartSession();
			cartSession.setCartSn(cartSn);
			// SpringSession with Redis 로 Session 사용변경. 세션값 변경이 있을 경우 명시적으로 setAttribute
			setCartSession(cartSession);
		}

		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);
	}

	/**
	 * 일반/묶음상품 구매
	 *
	 * @param hashMapList
	 * @param cartProdExPostList
	 */
	private void cartProdExPostMapping(List<LinkedHashMap> hashMapList, List<CartProdExPost> cartProdExPostList) {
		for (LinkedHashMap m : hashMapList) {
			CartProdExPost c = new CartProdExPost();
			c.setProdSn(!ObjectUtils.isEmpty(m.get("prodSn")) ? Long.parseLong(m.get("prodSn").toString()) : null);
			c.setCartProdQty(!ObjectUtils.isEmpty(m.get("cartProdQty")) ? Long.parseLong(m.get("cartProdQty").toString()) : null);
			c.setIntegrationMembershipExchYn(!ObjectUtils.isEmpty(m.get("integrationMembershipExchYn")) ? m.get("integrationMembershipExchYn").toString() : "N");
			c.setActivityPointExchYn(!ObjectUtils.isEmpty(m.get("activityPointExchYn")) ? m.get("activityPointExchYn").toString() : "N");
			c.setStorePickupYn(!ObjectUtils.isEmpty(m.get("storePickupYn")) ? m.get("storePickupYn").toString() : "N");
			c.setStoreSn(!ObjectUtils.isEmpty(m.get("storeSn")) ? Long.valueOf(m.get("storeSn").toString()) : null);

			//묶음상품
			List<LinkedHashMap> hashMapList1 = !ObjectUtils.isEmpty(m.get("cartBulkIncludedProdExList")) ? (List<LinkedHashMap>) m.get("cartBulkIncludedProdExList") : null;
			List<CartBulkIncludedProdExPost> cartBulkIncludedProdExList = new ArrayList<CartBulkIncludedProdExPost>();
			if (!ObjectUtils.isEmpty(hashMapList1)) {
				for (LinkedHashMap m1 : hashMapList1) {
					CartBulkIncludedProdExPost cb = new CartBulkIncludedProdExPost();
					cb.setBulkDcIncludedProdGrpSn(!ObjectUtils.isEmpty(m1.get("bulkDcIncludedProdGrpSn")) ? Long.parseLong(m1.get("bulkDcIncludedProdGrpSn").toString()) : null);
					cb.setIncludedProdQty(!ObjectUtils.isEmpty(m1.get("includedProdQty")) ? Integer.parseInt(m1.get("includedProdQty").toString()) : null);
					cb.setIncludedProdSn(!ObjectUtils.isEmpty(m1.get("includedProdSn")) ? Long.parseLong(m1.get("includedProdSn").toString()) : null);
					cartBulkIncludedProdExList.add(cb);
				}
				c.setCartBulkIncludedProdExList(cartBulkIncludedProdExList);
			}

			cartProdExPostList.add(c);
		}
	}

	/**
	 * 동시구매
	 *
	 * @param hashMapList
	 * @param sameTimeCartProdExPostList
	 */
	private void sameTimeCartProdExPostMapping(List<LinkedHashMap> hashMapList, List<SameTimePurCartProdSet> sameTimeCartProdExPostList) {
		for (LinkedHashMap m : hashMapList) {
			SameTimePurCartProdSet s = new SameTimePurCartProdSet();
			s.setStorePickupYn(!ObjectUtils.isEmpty(m.get("storePickupYn")) ? m.get("storePickupYn").toString() : "N");
			s.setStoreSn(!ObjectUtils.isEmpty(m.get("storeSn")) ? Long.valueOf(m.get("storeSn").toString()) : null);
			s.setSameTimePurPromoSn(!ObjectUtils.isEmpty(m.get("sameTimePurPromoSn")) ? Long.parseLong(m.get("sameTimePurPromoSn").toString()) : null);

			List<LinkedHashMap> hashMapList1 = !ObjectUtils.isEmpty(m.get("sameTimePurCartProdList")) ? (List<LinkedHashMap>) m.get("sameTimePurCartProdList") : null;
			List<SameTimePurCartProd> sameTimePurCartProdList = new ArrayList<SameTimePurCartProd>();
			if (!ObjectUtils.isEmpty(hashMapList1)) {
				for (LinkedHashMap m1 : hashMapList1) {
					SameTimePurCartProd sb = new SameTimePurCartProd();
					sb.setProdSn(!ObjectUtils.isEmpty(m1.get("prodSn")) ? Long.parseLong(m1.get("prodSn").toString()) : null);
					sb.setCartProdQty(!ObjectUtils.isEmpty(m1.get("cartProdQty")) ? Long.parseLong(m1.get("cartProdQty").toString()) : null);
					sb.setSameTimePurProdGrpSn(!ObjectUtils.isEmpty(m1.get("sameTimePurProdGrpSn")) ? Long.parseLong(m1.get("sameTimePurProdGrpSn").toString()) : null);
					sb.setSameTimePurProdComposeQty(!ObjectUtils.isEmpty(m1.get("sameTimePurProdComposeQty")) ? Integer.parseInt(m1.get("sameTimePurProdComposeQty").toString()) : null);
					sameTimePurCartProdList.add(sb);
				}
				s.setSameTimePurCartProdList(sameTimePurCartProdList);
			}

			sameTimeCartProdExPostList.add(s);
		}
	}

	/**
	 * 장바구니 담긴 건수
	 *
	 * @return
	 */
	@GetMapping("/getCartCount")
	public ResponseEntity<?> getCartCount() {

		HashMap<String, Object> result = new HashMap<String, Object>();
		Long cartSn = 0L;
		Long memberSn = getMemberSn();

		if (memberSn != 0L) {

			cartSn = cartApi.getMemberCartSn(memberSn).getCartSn();
			if (setCartCount(result, cartSn)) return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);

		} else {

			cartSn = getCartSession().getCartSn();
			if (setCartCount(result, cartSn)) return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
		}

		return ResponseEntity.ok(result);
	}

	/**
	 * 장바구니 상품 갯수
	 * @param result
	 * @param cartSn
	 * @return
	 */
	private boolean setCartCount(HashMap<String, Object> result, Long cartSn) {
		if (cartSn != 0L) {
			CartProdCountInfo cartProdCountInfo = cartApi.getCartProdCount(cartSn);
			result.put("cartProdCount", cartProdCountInfo.getCartProdCount());
			result.put("cartProdQtySum", cartProdCountInfo.getCartProdQtySum());
		} else {
			result.put("cartProdCount", 0);
			result.put("cartProdQtySum", 0);
		}
		return false;
	}
	
	
}