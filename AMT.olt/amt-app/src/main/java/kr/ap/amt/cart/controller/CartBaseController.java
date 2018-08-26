/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.cart.controller;

import kr.ap.comm.cart.CartSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.sales.cart.*;
import net.g1project.ecp.api.model.sales.display.BrandDisplayMainMenu;
import net.g1project.ecp.api.model.sales.display.BrandDisplayMenu;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.*;

@Controller
public class CartBaseController extends AbstractController{

	/**
	 * 카트정보 조회
	 * @param cartSn
	 * @return
	 */
	protected CartEx getCartApi(Long cartSn) {
		if(cartSn != null){
			CartSession cartSession = getCartSession();

			CartEx cartEx = cartApi.getCart(cartSn);
			cartEx = calculationBySelect(cartEx); // 상품 선택정의

			cartSession.setCartEx(cartEx);
			setCartSession(cartSession);
			return cartEx;
		}
		return null;
	}
	
	/**
	 * 빈 장바구니에 보여줄 브랜드 선택
	 *
	 * @return
	 */
	protected BrandDisplayMenu showBrandSelect() {

		String displayMenuId = "brandMain";
		Random random = new Random();
		try {
	        BrandDisplayMainMenu brandDisplayMainMenu = displayApi.getBrandMenu(APConstant.AP_DISPLAY_MENU_SET_ID, displayMenuId);
	        List<BrandDisplayMenu> brandSubMenuList = brandDisplayMainMenu.getSubmenus();
			
			return brandSubMenuList.get(random.nextInt(brandSubMenuList.size()));
		}catch(Exception e) {
			e.printStackTrace();
	    }
		
		return null;
	}

	/**
	 * 판매표시상태에 따른 상품 정의(셀렉트제어)
	 * @param cartEx
	 * @return
	 */
	protected CartEx calculationBySelect(CartEx cartEx) {

		// 장바구니-배송-온라인상품목록
		setSaleDisplayStatusCartOnlineProdExList(cartEx.getCartDeliveryOnlineProdExList());
		// 장바구니-배송-멤버십포인트교환-온라인상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList());
		// 장바구니-배송-활동포인트교환-온라인상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartDeliveryActivityPointExchOnlineProdExList());
		// 장바구니-배송-M+N프로모션목록-온라인상품목록
		setSaleDisplayStatusCartPromoExList(cartEx.getCartDeliveryMNPromoExList());
		// 장바구니-배송-동시구매프로모션목록-온라인상품목록
		setSaleDisplayStatusCartPromoExList(cartEx.getCartDeliverySameTimePurPromoExList());

		// 장바구니-매장픽업-온라인상품목록
		setSaleDisplayStatusCartOnlineProdExList(cartEx.getCartStorePickupOnlineProdExList());
		// 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList());
		// 장바구니-매장픽업-활동포인트교환-온라인상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList());
		// 장바구니-매장픽업-M+N프로모션목록-온라인상품목록
		setSaleDisplayStatusCartPromoExList(cartEx.getCartStorePickupMNPromoExList());
		// 장바구니-매장픽업-동시구매프로모션목록-온라인상품목록
		setSaleDisplayStatusCartPromoExList(cartEx.getCartStorePickupSameTimePurPromoExList());

		return calculationCartEx(cartEx);
	}

	/**
	 * 체크박스 선택 시 재계산
	 * @param cartSn
	 * @param selectedCartProdSnStr
	 * @return
	 */
    protected CartEx calculationBySelect(Long cartSn, String selectedCartProdSnStr) {

    	CartSession cartSession = getCartSession();
        /* 재계산을 위한 최종 cartEx */
        CartEx cartEx = cartSession.getCartEx();
        
        if(cartEx == null
                || !cartSn.equals(cartEx.getCartSn())) {
            cartEx = cartApi.getCartBySelectCartProds(cartSn, selectedCartProdSnStr);
        }
        else {
            
            try {

                List<Long> selectedCartProdSnList = new ArrayList<>();
                
                if(selectedCartProdSnStr != null
                        && selectedCartProdSnStr.length() > 0) {
                    String[] selectedCartProdSnArray = selectedCartProdSnStr.split("[,]");
                    if(selectedCartProdSnArray != null
                            && selectedCartProdSnArray.length > 0) {
                        for(String cartProdSnStr : selectedCartProdSnArray) {
                            selectedCartProdSnList.add(Long.parseLong(cartProdSnStr));
                        }
                    }
                }
                
                // 장바구니-배송-온라인상품목록
				setSelectCartOnlineProdExList(cartEx.getCartDeliveryOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-배송-멤버십포인트교환-온라인상품목록
				setSelectCartOnlineProdExList(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-배송-활동포인트교환-온라인상품목록
                setSelectCartOnlineProdExList(cartEx.getCartDeliveryActivityPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-배송-M+N프로모션목록-온라인상품목록
                setSelectCartPromoOnlineProdExList(cartEx.getCartDeliveryMNPromoExList(), selectedCartProdSnList);
                // 장바구니-배송-동시구매프로모션목록-온라인상품목록
                setSelectCartPromoOnlineProdExList(cartEx.getCartDeliverySameTimePurPromoExList(), selectedCartProdSnList);
    
                // 장바구니-매장픽업-온라인상품목록
                setSelectCartOnlineProdExList(cartEx.getCartStorePickupOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
                setSelectCartOnlineProdExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-활동포인트교환-온라인상품목록
                setSelectCartOnlineProdExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-M+N프로모션목록-온라인상품목록
                setSelectCartPromoOnlineProdExList(cartEx.getCartStorePickupMNPromoExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-동시구매프로모션목록-온라인상품목록
                setSelectCartPromoOnlineProdExList(cartEx.getCartStorePickupSameTimePurPromoExList(), selectedCartProdSnList);

                // 판매표시 상태에 따른 YN여부
				cartEx = calculationBySelect(cartEx);
				// 카트상품 계산
                cartEx = calculationCartEx(cartEx);
            }
            catch(Exception e) {
                e.printStackTrace();

                cartEx = cartApi.getCartBySelectCartProds(cartSn, selectedCartProdSnStr);
            }
        }

		cartSession.setCartEx(cartEx);
        setCartSession(cartSession);
        
        return cartEx;
    }

	/**
	 * 장바구니 체크박스 선택 시 프로모션 상품 정보
	 * @param cartPromoExList
	 * @param selectedCartProdSnList
	 */
	private void setSelectCartPromoOnlineProdExList(List<CartPromoEx> cartPromoExList, List<Long> selectedCartProdSnList) {
        if(cartPromoExList == null) {
            return;
        }
        
        for(CartPromoEx cartPromoEx : cartPromoExList) {
            setSelectCartOnlineProdExList(cartPromoEx.getPromoOnlineProdExList(), selectedCartProdSnList);

            // deafalt set..
			cartPromoEx.setSelectYn("N");

			// 프로모션 정보 select setting..
			if(cartPromoEx.getPromoOnlineProdExList() != null) {
				for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					if("Y".equals(cartOnlineProdEx.getSelectYn())){
						cartPromoEx.setSelectYn("Y");
						break;
					}
				}
				// 동종 M+N
				/*if(CartConst.MPLUSNTYPE_SAME.equals(cartPromoEx.getPromoMPlusNTypeCode())){
					for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
						for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
							if("Y".equals(cartOnlineProdEx.getSelectYn())){
								cartProdEx.setSelectYn("Y");
								break;
							}
						}
					}
				}
				// 이종 M+N
				else if(CartConst.MPLUSNTYPE_DIFF.equals(cartPromoEx.getPromoMPlusNTypeCode())){
					for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
						if("Y".equals(cartOnlineProdEx.getSelectYn())){
							cartPromoEx.setSelectYn("Y");
							break;
						}
					}
				}
				// 동시구매
				else{
					for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
						if("Y".equals(cartOnlineProdEx.getSelectYn())){
							cartPromoEx.setSelectYn("Y");
							break;
						}
					}
				}*/
			}
        }
    }

	/**
	 * 선택 상품정보 셀렉트 상태값 변경(장바구니-배송-온라인상품목록)
	 * @param cartOnlineProdExList
	 * @param selectedCartProdSnList
	 */
	private void setSelectCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList, List<Long> selectedCartProdSnList) {
        boolean deselectAll = CollectionUtils.isEmpty(selectedCartProdSnList);
        // 상품선택정보 변경
        if(cartOnlineProdExList != null) {
            for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
                if(deselectAll) {
                    cartOnlineProdEx.setSelectYn("N");
					if(cartOnlineProdEx.getCartProdExList() != null) {
						for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
							cartProdEx.setSelectYn("N");
						}
					}
                }
                else {
                    cartOnlineProdEx.setSelectYn("N");
                    if(cartOnlineProdEx.getCartProdExList() != null) {
                        for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                            if(selectedCartProdSnList.contains(cartProdEx.getCartProdSn())) {
								cartOnlineProdEx.setSelectYn("Y");
								cartProdEx.setSelectYn("Y");
                            }
                            else {
								cartProdEx.setSelectYn("N");
							}
                        }
                    }
                }
            }
        }
    }

	/**
	 *
	 * @param cartSn
	 * @param removeCartProdSnList
	 * @return
	 */
	protected CartEx calculationByRemove(Long cartSn, List<Long> removeCartProdSnList) {

		CartSession cartSession = getCartSession();

        /* 재계산을 위한 최종 cartEx */
        CartEx cartEx = cartSession.getCartEx();

        if(cartEx == null
                || !cartSn.equals(cartEx.getCartSn())) {
            cartEx = getCartApi(cartSn);
        }
        else {
        	try {
				// 장바구니-배송-온라인상품목록
				setRemoveCartOnlineProdExList(cartEx.getCartDeliveryOnlineProdExList(), removeCartProdSnList);
				// 장바구니-배송-멤버십포인트교환-온라인상품목록
				setRemoveCartOnlineProdExList(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList(), removeCartProdSnList);
				// 장바구니-배송-활동포인트교환-온라인상품목록
				setRemoveCartOnlineProdExList(cartEx.getCartDeliveryActivityPointExchOnlineProdExList(), removeCartProdSnList);
				// 장바구니-배송-M+N프로모션목록-온라인상품목록
				setRemoveCartPromoOnlineProdExList(cartEx.getCartDeliveryMNPromoExList(), removeCartProdSnList);
				// 장바구니-배송-동시구매프로모션목록-온라인상품목록
				setRemoveCartPromoOnlineProdExList(cartEx.getCartDeliverySameTimePurPromoExList(), removeCartProdSnList);

				// 장바구니-매장픽업-온라인상품목록
				setRemoveCartOnlineProdExList(cartEx.getCartStorePickupOnlineProdExList(), removeCartProdSnList);
				// 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
				setRemoveCartOnlineProdExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList(), removeCartProdSnList);
				// 장바구니-매장픽업-활동포인트교환-온라인상품목록
				setRemoveCartOnlineProdExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList(), removeCartProdSnList);
				// 장바구니-매장픽업-M+N프로모션목록-온라인상품목록
				setRemoveCartPromoOnlineProdExList(cartEx.getCartStorePickupMNPromoExList(), removeCartProdSnList);
				// 장바구니-매장픽업-동시구매프로모션목록-온라인상품목록
				setRemoveCartPromoOnlineProdExList(cartEx.getCartStorePickupSameTimePurPromoExList(), removeCartProdSnList);

				cartEx = calculationCartEx(cartEx);
			}
			catch(Exception e) {
				e.printStackTrace();
				cartEx =  getCartApi(cartSn);
			}

        }

		cartSession.setCartEx(cartEx);
        setCartSession(cartSession);
        
        return cartEx;
    }

	/**
	 *
	 * @param cartPromoExList
	 * @param removeCartProdSnList
	 */
	private void setRemoveCartPromoOnlineProdExList(List<CartPromoEx> cartPromoExList, List<Long> removeCartProdSnList) {
        if(CollectionUtils.isEmpty(cartPromoExList)
                || CollectionUtils.isEmpty(removeCartProdSnList)) {
            return;
        }
        
        List<CartPromoEx> newCartPromoExList = new ArrayList<>();
        for(CartPromoEx cartPromoEx : cartPromoExList) {
            setRemoveCartOnlineProdExList(cartPromoEx.getPromoOnlineProdExList(), removeCartProdSnList);
            
            if(!CollectionUtils.isEmpty(cartPromoEx.getPromoOnlineProdExList())) {
                newCartPromoExList.add(cartPromoEx);
            }
        }
        
        cartPromoExList.clear();
        cartPromoExList.addAll(newCartPromoExList);
    }

	/**
	 *
	 * @param cartOnlineProdExList
	 * @param removeCartProdSnList
	 */
	private void setRemoveCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList, List<Long> removeCartProdSnList) {
        if(CollectionUtils.isEmpty(cartOnlineProdExList)
                || CollectionUtils.isEmpty(removeCartProdSnList)) {
            return;
        }
        
        // 상품삭제
        List<CartOnlineProdEx> newCartOnlineProdExList = new ArrayList<>();
        for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
            List<CartProdEx> newCartProdExList = new ArrayList<>();
            if(cartOnlineProdEx.getCartProdExList() != null) {
                for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                    if(!removeCartProdSnList.contains(cartProdEx.getCartProdSn())) {
                    	newCartProdExList.add(cartProdEx);
                    }
                }
            }
            if(newCartProdExList.size() > 0) {
                cartOnlineProdEx.setCartProdExList(newCartProdExList);
                newCartOnlineProdExList.add(cartOnlineProdEx);
            }
        }
		cartOnlineProdExList.clear();
		cartOnlineProdExList.addAll(newCartOnlineProdExList);
    }
    
    protected CartEx calculationByChangeQty(Long cartSn,
                                        Long cartProdSn,
                                        Long cartProdQty) {

		CartSession cartSession = getCartSession();

        /* 재계산을 위한 최종 cartEx */
        CartEx cartEx = cartSession.getCartEx();
        
        if(cartEx == null
                || !cartSn.equals(cartEx.getCartSn())) {
            cartEx =  getCartApi(cartSn);
        }
        else {
            try {
                // 장바구니-배송-온라인상품목록
                setChangeQtyCartOnlineProdExList(cartEx.getCartDeliveryOnlineProdExList(), cartProdSn, cartProdQty);
                // 장바구니-배송-멤버십포인트교환-온라인상품목록
                setChangeQtyCartOnlineProdExList(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList(), cartProdSn, cartProdQty);
                // 장바구니-배송-활동포인트교환-온라인상품목록
                setChangeQtyCartOnlineProdExList(cartEx.getCartDeliveryActivityPointExchOnlineProdExList(), cartProdSn, cartProdQty);
                // 장바구니-배송-M+N프로모션목록-온라인상품목록
                setChangeQtyCartPromoOnlineProdExList(cartEx.getCartDeliveryMNPromoExList(), cartProdSn, cartProdQty);
                // 장바구니-배송-동시구매프로모션목록-온라인상품목록
                setChangeQtyCartPromoOnlineProdExList(cartEx.getCartDeliverySameTimePurPromoExList(), cartProdSn, cartProdQty);
    
                // 장바구니-매장픽업-온라인상품목록
                setChangeQtyCartOnlineProdExList(cartEx.getCartStorePickupOnlineProdExList(), cartProdSn, cartProdQty);
                // 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
                setChangeQtyCartOnlineProdExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList(), cartProdSn, cartProdQty);
                // 장바구니-매장픽업-활동포인트교환-온라인상품목록
                setChangeQtyCartOnlineProdExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList(), cartProdSn, cartProdQty);
                // 장바구니-매장픽업-M+N프로모션목록-온라인상품목록
                setChangeQtyCartPromoOnlineProdExList(cartEx.getCartStorePickupMNPromoExList(), cartProdSn, cartProdQty);
                // 장바구니-매장픽업-동시구매프로모션목록-온라인상품목록
                setChangeQtyCartPromoOnlineProdExList(cartEx.getCartStorePickupSameTimePurPromoExList(), cartProdSn, cartProdQty);
    
                cartEx = calculationCartEx(cartEx);
            }
            catch (Exception e) {
                e.printStackTrace();
                cartEx =  getCartApi(cartSn);
            }
        }


		cartSession.setCartEx(cartEx);
        setCartSession(cartSession);
        
        return cartEx;
    }
    
    private void setChangeQtyCartPromoOnlineProdExList(List<CartPromoEx> cartPromoExList, Long cartProdSn, Long cartProdQty) {
        if(cartPromoExList == null) {
            return;
        }
        
        for(CartPromoEx cartPromoEx : cartPromoExList) {
            setChangeQtyCartOnlineProdExList(cartPromoEx.getPromoOnlineProdExList(), cartProdSn, cartProdQty);
        }
    }
    
    private void setChangeQtyCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList, Long cartProdSn, Long cartProdQty) {
        // 상품수량변경
        if(cartOnlineProdExList != null) {
            for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
                if(cartOnlineProdEx.getCartProdExList() != null) {
                    for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                        if(cartProdSn.equals(cartProdEx.getCartProdSn())) {
                            // 교환상품
                            if(CartConst.Y.equals(cartProdEx.getExchYn())) {
                                Integer unitPoint = getIntValue(cartProdEx.getExchPoint()) / getIntValue(cartProdEx.getCartProdQty());
                                cartProdEx.setExchPoint(unitPoint * cartProdQty);
                            }
                            
                            cartProdEx.setCartProdQty(cartProdQty);
                            break;
                        }
                    }
                }
            }
        }
    }

	// 장바구니-온라인상품-목록
	private void setSaleDisplayStatusCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList) {
		for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList){

			cartOnlineProdEx.setSaleDisplayStatus("OnSale");
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				if(isCartProdSelectable(cartProdEx) == false){	// 수량체크
					cartOnlineProdEx.setSaleDisplayStatus("NotSelect");
					cartOnlineProdEx.setSelectYn(CartConst.N);
					break;
				}
			}
			if("NotSelect".equals(cartOnlineProdEx.getSaleDisplayStatus())){
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					cartProdEx.setSelectYn(CartConst.N);
				}
			}
		}
	}

	/**
	 * 동종 M+N 상품
	 * @param cartOnlineProdExList
	 */
	private void setSaleDisplayStatusCartPromoSameProdExList(List<CartOnlineProdEx> cartOnlineProdExList) {
		for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList){
			cartOnlineProdEx.setSaleDisplayStatus("OnSale");
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				if(isCartProdSelectable(cartProdEx) == false){	// 수량체크
					cartProdEx.setSelectYn(CartConst.N);
					break;
				}
			}
		}
	}

	/**
	 * 이종 M+N 상품
	 * @param cartOnlineProdExList
	 */
	private void setSaleDisplayStatusCartPromoDifferentProdExList(List<CartOnlineProdEx> cartOnlineProdExList) {
		for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList){
			cartOnlineProdEx.setSaleDisplayStatus("OnSale");
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				if(isCartProdSelectable(cartProdEx) == false){	// 수량체크
					cartProdEx.setSelectYn(CartConst.N);
					break;
				}
			}
		}
	}

	/**
	 * 체크 셀렉트 여부
	 * @param cartProdEx
	 * @return
	 */
	private boolean isCartProdSelectable(CartProdEx cartProdEx) {
		/** 재고부족, 판매상태, 계산결과 체크 */
		boolean retValue = true;

		// 최소구매수량 > 주문수량 체크
		if(cartProdEx.getProdEx().getMinPurLimitQty() > cartProdEx.getCartProdQty()){
			retValue = false;
		}
		// 주문수량 > 최대구매수량 체크
		if(cartProdEx.getCartProdQty() > cartProdEx.getProdEx().getMaxPurLimitQty()){
			retValue = false;
		}

		// 계산결과여부 체크
		if (CartConst.N.equals(cartProdEx.getCalculationResultYn())){
			retValue = false;
		}

		// 판매상태 체크(판매중)
		if (!"OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus())
			&& !"NotSelected".equals(cartProdEx.getProdEx().getSaleDisplayStatus())){
			retValue = false;
		}

		if(retValue) {
				cartProdEx.getProdEx().setSaleDisplayStatus("OnSale");
		} else {
			if ("OnSale".equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
				cartProdEx.getProdEx().setSaleDisplayStatus("NotSelected");
			}
		}

		return retValue;
	}

	// 장바구니-포인트상품-목록
	private void setSaleDisplayStatusCartPointExchOnlineProdExList(List<CartOnlineProdEx> cartPointExchOnlineProdExList) {
		for (CartOnlineProdEx cartOnlineProdEx : cartPointExchOnlineProdExList) {
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				if(StringUtils.isEmpty(cartProdEx.getProdEx().getSaleDisplayStatus())){
					cartProdEx.getProdEx().setSaleDisplayStatus("OnSale");
				}
				if(isCartProdSelectable(cartProdEx) == false){	// 수량체크
					cartProdEx.setSelectYn(CartConst.N);
				}
			}
		}
	}

	// 장바구니-프로모션상품-목록
	private void setSaleDisplayStatusCartPromoExList(List<CartPromoEx> cartPromoExList) {
		for (CartPromoEx cartPromoEx : cartPromoExList) {
			// 프로모션 상품
			if("MPlusN".equals(cartPromoEx.getPromoTypeCode())){
				// 동종 M+N
				if(CartConst.MPLUSNTYPE_SAME.equals(cartPromoEx.getPromoMPlusNTypeCode())){
					setSaleDisplayStatusCartPromoSameProdExList(cartPromoEx.getPromoOnlineProdExList());
				}
				// 이종 M+N
				else if(CartConst.MPLUSNTYPE_DIFF.equals(cartPromoEx.getPromoMPlusNTypeCode())){
					setSaleDisplayStatusCartPromoDifferentProdExList(cartPromoEx.getPromoOnlineProdExList());
				}
			}
			// 동시구매 상품
			else{
				for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					cartOnlineProdEx.setSaleDisplayStatus("OnSale");
					for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if(isCartProdSelectable(cartProdEx) == false){ // 수량체크
							cartPromoEx.setSaleDisplayStatus("NotSelect");
							break;
						}
					}
				}
				if("NotSelect".equals(cartPromoEx.getSaleDisplayStatus())){
					for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
						cartOnlineProdEx.setSaleDisplayStatus("NotSelect");
						cartOnlineProdEx.setSelectYn(CartConst.N);
						for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
							cartProdEx.setSelectYn(CartConst.N);
						}
					}
				}
			}
		}
	}

	/**
	 * 장바구니 계산정보
	 * @param cartEx
	 * @return
	 */
    protected CartEx calculationCartEx(CartEx cartEx) {

        /* M+N프로모션 기준수량/증정수량계산 */
        if(cartEx.getCartDeliveryMNPromoExList() != null) {
            for(CartPromoEx cartPromoEx : cartEx.getCartDeliveryMNPromoExList()) {
                // 동종M+N프로모션 기준수량/증정수량계산 
                if(CartConst.MPLUSNTYPE_SAME.equals(cartPromoEx.getPromoMPlusNTypeCode())) {
                    calculationSameMNPromo(cartPromoEx, cartPromoEx.getPromoOnlineProdExList());
                }
                // 이종M+N프로모션 기준수량/증정수량계산 
                else {
                    calculationDiffMNPromo(cartPromoEx, cartPromoEx.getPromoOnlineProdExList());
                }
            }
        }
        
        // 전체장바구니상품맵
        Map<Long, CartProdEx> allCartProdExMap = new HashMap<>();
        Map<Long, CartOnlineProdEx> allCartOnlineProdExMap = new HashMap<>();
        
        /* 
         * 상품증정품증정수량 수정 
         * 상품계산결과수정 : 최종온라인판매가 * (수량 - 증정수량), 적립포인트 
         * 온라인상품금액들의 합  
         * 프로모션상품금액들의 합
         */ 
        {
            // 장바구니-배송-온라인상품목록
            calculationCartOnlineProdExList(cartEx.getCartDeliveryOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-배송-멤버십포인트교환-온라인상품목록
            calculationCartOnlineProdExList(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-배송-활동포인트교환-온라인상품목록
            calculationCartOnlineProdExList(cartEx.getCartDeliveryActivityPointExchOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-배송-M+N프로모션목록-온라인상품목록
            calculationCartPromoOnlineProdExList(cartEx.getCartDeliveryMNPromoExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-배송-동시구매프로모션목록-온라인상품목록
            calculationCartPromoOnlineProdExList(cartEx.getCartDeliverySameTimePurPromoExList(), allCartProdExMap, allCartOnlineProdExMap);
    
            // 장바구니-매장픽업-온라인상품목록
            calculationCartOnlineProdExList(cartEx.getCartStorePickupOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
            calculationCartOnlineProdExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-매장픽업-활동포인트교환-온라인상품목록
            calculationCartOnlineProdExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-매장픽업-M+N프로모션목록-온라인상품목록
            calculationCartPromoOnlineProdExList(cartEx.getCartStorePickupMNPromoExList(), allCartProdExMap, allCartOnlineProdExMap);
            // 장바구니-매장픽업-동시구매프로모션목록-온라인상품목록
            calculationCartPromoOnlineProdExList(cartEx.getCartStorePickupSameTimePurPromoExList(), allCartProdExMap, allCartOnlineProdExMap);
        }

        CalculationResult calculationResult = cartEx.getCalculationResult();
		if (calculationResult == null) {
			return cartEx;
		}

        /* 배송지시계산결과수정 : 금액들의 합, 배송비 */
        BigDecimal totalShipFee = BigDecimal.ZERO;
        BigDecimal totalShipFeeDiscountAmount = BigDecimal.ZERO;
        
        if(calculationResult.getResultOtfList() != null) {
            for(CalculationResultOtf calculationResultOtf : calculationResult.getResultOtfList()) {
                CalculationRequestOtf requestOtf = calculationResultOtf.getRequestOtf();
                if(CartConst.Y.equals(requestOtf.getStorePickupYn())) {
                    continue;
                }
                
                // 온라인판매금액합계 정보
                BigDecimal onlineSalesTotalAmount = BigDecimal.ZERO;
                if(calculationResultOtf.getResultProductKeyList() != null) {
                    for(String productKey : calculationResultOtf.getResultProductKeyList()) {
                        CartProdEx cartProdEx = allCartProdExMap.get(Long.parseLong(productKey));
                        CartOnlineProdEx cartOnlineProdEx = allCartOnlineProdExMap.get(Long.parseLong(productKey));
                        if(cartProdEx != null
                                && cartOnlineProdEx != null
                                && CartConst.Y.equals(cartOnlineProdEx.getSelectYn())
                                && cartProdEx.getCalculationResultProduct() != null) {
                            onlineSalesTotalAmount = onlineSalesTotalAmount.add(getStandardAmount(cartProdEx.getCalculationResultProduct().getFinalOnlineSalesAmountInfo()));
                        }
                    }
                }

				// 배송비
				BigDecimal shipFeeFreeBaseAmt = requestOtf.getShipFeeFreeBaseAmt() != null ? requestOtf.getShipFeeFreeBaseAmt() : BigDecimal.ZERO;

				BigDecimal calcDefaultShipFee = BigDecimal.ZERO;
				BigDecimal shipFeeDiscountAmount = BigDecimal.ZERO;

				if(onlineSalesTotalAmount.compareTo(BigDecimal.ZERO) > 0
					&& onlineSalesTotalAmount.compareTo(shipFeeFreeBaseAmt) < 0) {
					calcDefaultShipFee = requestOtf.getCoDefaultShipFee() != null ? requestOtf.getCoDefaultShipFee() : new BigDecimal("2500");

					// TODO : 배송비할인프로모션 정보
				}

				// 초도배송비 계산금액 정보
				calculationResultOtf.setCalcDefaultShipFeeInfo(setCalculationCurrencyInfo(calculationResultOtf.getCalcDefaultShipFeeInfo(), calcDefaultShipFee));

				// 초도배송비 할인금액 정보
				calculationResultOtf.setShipFeeDcAmountInfo(setCalculationCurrencyInfo(calculationResultOtf.getShipFeeDcAmountInfo(), shipFeeDiscountAmount));

				// 최종초도배송비 정보
				calculationResultOtf.setDefaultShipFeeInfo(setCalculationCurrencyInfo(calculationResultOtf.getDefaultShipFeeInfo(), calcDefaultShipFee.subtract(shipFeeDiscountAmount)));

				totalShipFee = totalShipFee.add(calcDefaultShipFee);
				totalShipFeeDiscountAmount = totalShipFeeDiscountAmount.add(shipFeeDiscountAmount);
			}
        }
        
        
        /* 계산결과수정 : 금액들의 합 */
        // 교환통합포인트(뷰티포인트) 합
        calculationExchPoint(cartEx);

        // 초도배송비합계
        calculationResult.setDefaultShipFeeSumInfo(setCalculationCurrencyInfo(calculationResult.getDefaultShipFeeSumInfo(), totalShipFee));
        calculationResult.setShipFeeDcAmountInfo(setCalculationCurrencyInfo(calculationResult.getShipFeeDcAmountInfo(), totalShipFeeDiscountAmount));
        calculationResult.setShipFeeSumInfo(setCalculationCurrencyInfo(calculationResult.getShipFeeSumInfo(), totalShipFee.subtract(totalShipFeeDiscountAmount)));

        // 합계 금액들 계산
        {
            // 온라인배송상품판매금액합계
            BigDecimal onlineShipProdSaleTotalAmount = BigDecimal.ZERO;
            // 매장픽업상품판매금액합계
            BigDecimal storePickupProdSaleTotalAmount = BigDecimal.ZERO;
            // 상품판매금액합계
            BigDecimal prodSaleTotalAmount = BigDecimal.ZERO;
            // 온라인상품할인
            BigDecimal dsicountAmountByOnlineProdDc = BigDecimal.ZERO;
            // 회원등급할인
            BigDecimal dsicountAmountByMemberLevel = BigDecimal.ZERO;
            // 온라인회원할인
            BigDecimal dsicountAmountByOnlineMemberDc = BigDecimal.ZERO;
            // 즉시할인쿠폰
            BigDecimal dsicountAmountByinstantCouponDc = BigDecimal.ZERO;
            // 동시구매할인
            BigDecimal discountAmountBySameTimePurDc = BigDecimal.ZERO;
            // M+N프로모션할인
            BigDecimal discountAmountByMNPromotion = BigDecimal.ZERO;
            // 상품할인금액총합
            BigDecimal totalProdUnitDiscountAmount = BigDecimal.ZERO;
            // 최종온라인판매금액합계
            BigDecimal finalOnlineSalesTotalAmount = BigDecimal.ZERO;
            
            for(CartProdEx cartProdEx : allCartProdExMap.values()) {
                CartOnlineProdEx cartOnlineProdEx = allCartOnlineProdExMap.get(cartProdEx.getCartProdSn());
                if(cartProdEx != null
                        && cartOnlineProdEx != null
                        && CartConst.Y.equals(cartOnlineProdEx.getSelectYn())
                        && cartProdEx.getCalculationResultProduct() != null
                        && !CartConst.Y.equals(cartProdEx.getExchYn())) {
                    
                    CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
                    if(CartConst.Y.equals(cartProdEx.getStorePickupYn())) {
                        storePickupProdSaleTotalAmount = storePickupProdSaleTotalAmount.add(getStandardAmount(resultProduct.getProductSaleAmountInfo()));
                    }
                    else {
                        onlineShipProdSaleTotalAmount = onlineShipProdSaleTotalAmount.add(getStandardAmount(resultProduct.getProductSaleAmountInfo()));
                    }
                    
                    prodSaleTotalAmount = prodSaleTotalAmount.add(getStandardAmount(resultProduct.getProductSaleAmountInfo()));
                    
                    // 온라인상품할인
                    dsicountAmountByOnlineProdDc = dsicountAmountByOnlineProdDc.add(getStandardAmount(resultProduct.getQtyDiscountAmountInfoByOnlineProductDiscount()));
                    // 회원등급할인
                    dsicountAmountByMemberLevel = dsicountAmountByMemberLevel.add(getStandardAmount(resultProduct.getQtyDiscountAmountInfoByMemberLevel()));
                    // 온라인회원할인
                    dsicountAmountByOnlineMemberDc = dsicountAmountByOnlineMemberDc.add(getStandardAmount(resultProduct.getQtyDiscountAmountInfoByOnlineMemberDiscount()));
                    // 즉시할인쿠폰
                    dsicountAmountByinstantCouponDc = dsicountAmountByinstantCouponDc.add(getStandardAmount(resultProduct.getQtyDiscountAmountInfoByInstantDiscountCoupon()));
                    // 동시구매할인
                    discountAmountBySameTimePurDc = discountAmountBySameTimePurDc.add(getStandardAmount(resultProduct.getQtyDiscountAmountInfoBySameTimePurDiscount()));
                    // M+N프로모션할인
                    discountAmountByMNPromotion = discountAmountByMNPromotion.add(getStandardAmount(resultProduct.getQtyDiscountAmountInfoByMNPromotion()));

                    
                    finalOnlineSalesTotalAmount = finalOnlineSalesTotalAmount.add(getStandardAmount(resultProduct.getFinalOnlineSalesAmountInfo()));
                    
                    totalProdUnitDiscountAmount = totalProdUnitDiscountAmount
                                                    .add(getStandardAmount(resultProduct.getProductSaleAmountInfo()))
                                                    .subtract(getStandardAmount(resultProduct.getFinalOnlineSalesAmountInfo()));
                    
                                                    
                }
            }

            // 온라인배송상품판매금액합계
            calculationResult.setOnlineShipProdSaleTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getOnlineShipProdSaleTotalAmountInfo(), onlineShipProdSaleTotalAmount));
            // 매장픽업상품판매금액합계
            calculationResult.setStorePickupProdSaleTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getStorePickupProdSaleTotalAmountInfo(), storePickupProdSaleTotalAmount));
            // 상품판매금액합계
            calculationResult.setProdSaleTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getProdSaleTotalAmountInfo(), prodSaleTotalAmount));
            // 온라인상품할인
            calculationResult.setDsicountAmountInfoByOnlineProdDc(setCalculationCurrencyInfo(calculationResult.getDsicountAmountInfoByOnlineProdDc(), dsicountAmountByOnlineProdDc));
            // 회원등급할인
            calculationResult.setDsicountAmountInfoByMemberLevel(setCalculationCurrencyInfo(calculationResult.getDsicountAmountInfoByMemberLevel(), dsicountAmountByMemberLevel));
            // 온라인회원할인
            calculationResult.setDsicountAmountInfoByOnlineMemberDc(setCalculationCurrencyInfo(calculationResult.getDsicountAmountInfoByOnlineMemberDc(), dsicountAmountByOnlineMemberDc));
            // 즉시할인쿠폰
            calculationResult.setDsicountAmountInfoByinstantCouponDc(setCalculationCurrencyInfo(calculationResult.getDsicountAmountInfoByinstantCouponDc(), dsicountAmountByinstantCouponDc));
            // 동시구매할인
            calculationResult.setDiscountAmountInfoBySameTimePurDc(setCalculationCurrencyInfo(calculationResult.getDiscountAmountInfoBySameTimePurDc(), discountAmountBySameTimePurDc));
            // M+N프로모션할인
            calculationResult.setDiscountAmountInfoByMNPromotion(setCalculationCurrencyInfo(calculationResult.getDiscountAmountInfoByMNPromotion(), discountAmountByMNPromotion));
            // 상품할인금액총합
            calculationResult.setTotalProdUnitDiscountAmountInfo(setCalculationCurrencyInfo(calculationResult.getTotalProdUnitDiscountAmountInfo(), totalProdUnitDiscountAmount));
            // 최종온라인판매금액합계
            calculationResult.setFinalOnlineSalesTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getFinalOnlineSalesTotalAmountInfo(), finalOnlineSalesTotalAmount));
            // 상품주문금액합계
            calculationResult.setProductOrderTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getProductOrderTotalAmountInfo(), finalOnlineSalesTotalAmount));

            // 결제예정금액
            calculationResult.setPaidAmountInfo(setCalculationCurrencyInfo(calculationResult.getPaidAmountInfo()
                                                , finalOnlineSalesTotalAmount
                                                    .add(calculationResult.getTotalExtraFeeInfo().getStandardCurrency().getAmount())
                                                    .add(calculationResult.getShipFeeSumInfo().getStandardCurrency().getAmount())));
        }
        
        return cartEx;
    }

    protected void calculationExchPoint(CartEx cartEx) {
        CalculationResult calculationResult = cartEx.getCalculationResult();
        
        if(calculationResult != null) {
            calculationResult.setExchIPointSum(0);
            calculationResult.setExchAPointSum(0);
            cartEx.setCartDeliveryExchActivityPointSum(0);
            cartEx.setCartDeliveryExchMembershipPointSum(0);
        
            addExchPointSum(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList(), cartEx, false);
            addExchPointSum(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList(), cartEx, false);
            addExchPointSum(cartEx.getCartDeliveryActivityPointExchOnlineProdExList(), cartEx, true);
            addExchPointSum(cartEx.getCartStorePickupActivityPointExchOnlineProdExList(), cartEx, true);
        }
    }

    private void addExchPointSum(List<CartOnlineProdEx> cartOnlineProdExList, CartEx cartEx, boolean aPoint) {
        CalculationResult calculationResult = cartEx.getCalculationResult();
        
        if(cartEx.getCartMemberEx() == null) {
            return;
        }
        
        Integer keepingPoints = 0;
        
        if(aPoint) {
            keepingPoints = cartEx.getCartMemberEx().getActivityPoints();
        }
        else if(cartEx.getCartMemberEx().getMemberMembershipExList() != null) {
            for(CartMemberMembershipEx memberMembershipEx : cartEx.getCartMemberEx().getMemberMembershipExList()) {
                if(CartConst.BP_SERVICE_CODE.equals(memberMembershipEx.getMembershipServiceCode())) {
                    if(memberMembershipEx.getMembershipPoints() != null) {
                        keepingPoints = memberMembershipEx.getMembershipPoints();
                    }
                }
            }
        }

		int exchPointSum = 0;
        int selectExchPointSum = 0;

		int remainPoints = keepingPoints;
        if(cartOnlineProdExList != null) {
            for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
				for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if(CartConst.Y.equals(cartProdEx.getSelectYn())) {
						if(remainPoints >= cartProdEx.getExchPoint()) {
							selectExchPointSum += cartProdEx.getExchPoint();
							remainPoints -= cartProdEx.getExchPoint();
						}
						else {
							cartProdEx.setSelectYn(CartConst.N);
						}
						exchPointSum += cartProdEx.getExchPoint();
					}
					/*if(CartConst.Y.equals(cartOnlineProdEx.getSelectYn())) {
						if(remainPoints >= cartOnlineProdEx.getExchPoints()) {
							selectExchPointSum += cartOnlineProdEx.getExchPoints();
							remainPoints -= cartOnlineProdEx.getExchPoints();
						}
						else {
							cartOnlineProdEx.setSelectYn(CartConst.N);
						}
					}*/
				}
            }
        }
        
        if(aPoint) {
            cartEx.setCartDeliveryExchActivityPointSum(cartEx.getCartDeliveryExchActivityPointSum() + exchPointSum);
            calculationResult.setExchAPointSum(calculationResult.getExchAPointSum() + selectExchPointSum);
        }
        else {
            cartEx.setCartDeliveryExchMembershipPointSum(cartEx.getCartDeliveryExchMembershipPointSum() + exchPointSum);
            calculationResult.setExchIPointSum(calculationResult.getExchIPointSum() + selectExchPointSum);
        }
    }

	/**
	 * 프로모션, 동시구매 계산
	 * @param cartPromoExList
	 * @param allCartProdExMap
	 * @param allCartOnlineProdExMap
	 */
	private void calculationCartPromoOnlineProdExList(List<CartPromoEx> cartPromoExList, Map<Long, CartProdEx> allCartProdExMap, Map<Long, CartOnlineProdEx> allCartOnlineProdExMap) {
        if(cartPromoExList == null) {
            return;
        }
        
        for(CartPromoEx cartPromoEx : cartPromoExList) {

            calculationCartOnlineProdExList(cartPromoEx.getPromoOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);

            BigDecimal productSaleAmount = BigDecimal.ZERO;
            BigDecimal finalOnlineSaleAmount = BigDecimal.ZERO;

			for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
				if("Y".equals(cartOnlineProdEx.getSelectYn())){
					productSaleAmount = productSaleAmount.add(getStandardAmount(cartOnlineProdEx.getProductSaleAmountInfo()));
					finalOnlineSaleAmount = finalOnlineSaleAmount.add(getStandardAmount(cartOnlineProdEx.getFinalOnlineSalesAmountInfo()));
				}
			}
            cartPromoEx.getProductSaleAmountInfo().getStandardCurrency().setAmount(productSaleAmount);
            cartPromoEx.getFinalOnlineSalesAmountInfo().getStandardCurrency().setAmount(finalOnlineSaleAmount);
        }
    }

	/**
	 * 상품금액 계산
	 * @param cartOnlineProdExList
	 * @param allCartProdExMap
	 * @param allCartOnlineProdExMap
	 */
	private void calculationCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList, Map<Long, CartProdEx> allCartProdExMap, Map<Long, CartOnlineProdEx> allCartOnlineProdExMap) {
        if(cartOnlineProdExList == null) {
            return;
        }
        
        /*
         * 상품증정품증정수량 수정 
         * 상품계산결과수정 : 최종온라인판매가 * (수량 - 증정수량), 적립포인트 
         * 온라인상품금액들의 합  
         */
        for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
            BigDecimal productSaleAmount = BigDecimal.ZERO;
            BigDecimal finalOnlineSaleAmount = BigDecimal.ZERO;
            int exchPoints = 0;
            if(cartOnlineProdEx.getCartProdExList() != null) {
                for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                    allCartProdExMap.put(cartProdEx.getCartProdSn(), cartProdEx);
                    allCartOnlineProdExMap.put(cartProdEx.getCartProdSn(), cartOnlineProdEx);
                    
                    // 상품증정품증정수량 수정
                    if(cartProdEx.getCartProdAwardList() != null) {
                        for(CartProdAward cartProdAward : cartProdEx.getCartProdAwardList()) {
                            // TODO 단위수량 * 장바구니수량
                            cartProdAward.setAwardQty(cartProdAward.getAwardUnitQty() * getIntValue(cartProdEx.getCartProdQty()));
                        }
                    }
                    
                    // 상품계산결과수정 : 최종온라인판매가 * (수량 - 증정수량), 적립포인트
					if(cartProdEx.getCalculationResultProduct() != null) {

                        CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
                        
                        int realQty = cartProdEx.getCartProdQty().intValue() - getIntValue(cartProdEx.getmNPromoAwardQty());
                        // 상품판매금액
                        setCalculationCurrencyInfo(resultProduct.getProductSaleAmountInfo(), resultProduct.getProductSalePriceInfo(), cartProdEx.getCartProdQty().intValue());
                        // 온라인판매금액
                        setCalculationCurrencyInfo(resultProduct.getOnlineSalesAmountInfo(), resultProduct.getOnlineSalesPriceInfo(), realQty);
                        // 최종온라인판매금액
                        setCalculationCurrencyInfo(resultProduct.getFinalOnlineSalesAmountInfo(), resultProduct.getFinalOnlineSalesPriceInfo(), realQty);
                        // 상품주문금액
                        setCalculationCurrencyInfo(resultProduct.getProductOrderAmountInfo(), resultProduct.getFinalOnlineSalesAmountInfo(), 1);
                        
                        // 회원등급상품수량할인금액
                        setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoByMemberLevel(), resultProduct.getUnitDiscountAmountInfoByMemberLevel(), realQty);
                        // 온라인상품수량할인금액
                        setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoByOnlineProductDiscount(), resultProduct.getUnitDiscountAmountInfoByOnlineProductDiscount(), realQty);
                        // 온라인회원상품수량할인금액
                        setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoByOnlineMemberDiscount(), resultProduct.getUnitDiscountAmountInfoByOnlineMemberDiscount(), realQty);
                        // 즉시할인쿠폰수량할인금액
                        setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoByInstantDiscountCoupon(), resultProduct.getUnitDiscountAmountInfoByInstantDiscountCoupon(), realQty);
                        // 동시구매프로모션수량할인금액
                        setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoBySameTimePurDiscount(), resultProduct.getUnitDiscountAmountInfoBySameTimePurDiscount(), realQty);

						productSaleAmount = productSaleAmount.add(getStandardAmount(resultProduct.getProductSaleAmountInfo()));
						finalOnlineSaleAmount = finalOnlineSaleAmount.add(getStandardAmount(resultProduct.getFinalOnlineSalesAmountInfo()));

						/*if("Y".equals(cartProdEx.getSelectYn())) {
							productSaleAmount = productSaleAmount.add(getStandardAmount(resultProduct.getProductSaleAmountInfo()));
							finalOnlineSaleAmount = finalOnlineSaleAmount.add(getStandardAmount(resultProduct.getFinalOnlineSalesAmountInfo()));
						}*/
                    }
                    
                    if(CartConst.Y.equals(cartProdEx.getExchYn())) {
						exchPoints = exchPoints + (cartProdEx.getExchPoint() != null ? cartProdEx.getExchPoint().intValue() : 0);

						/*if("Y".equals(cartProdEx.getSelectYn())) {
							exchPoints = exchPoints + (cartProdEx.getExchPoint() != null ? cartProdEx.getExchPoint().intValue() : 0);
						}*/
                    }
                }
            }
            cartOnlineProdEx.getProductSaleAmountInfo().getStandardCurrency().setAmount(productSaleAmount);
            cartOnlineProdEx.getFinalOnlineSalesAmountInfo().getStandardCurrency().setAmount(finalOnlineSaleAmount);
            cartOnlineProdEx.setExchPoints(exchPoints);
        }
    }

	/**
	 * 프로모션, 동시구매 계산
	 * @param cartPromoEx
	 * @param cartOnlineProdExList
	 */
	private void calculationSameMNPromo(CartPromoEx cartPromoEx, List<CartOnlineProdEx> cartOnlineProdExList) {
        if(cartOnlineProdExList == null) {
            return;
        }
        
        // 동종M+N처리
        for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
            if(cartOnlineProdEx.getCartProdExList() != null) {
                for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                    if(cartProdEx.getCalculationResultProduct() != null) {
                        Integer awardQty = 0;
                        Integer baseOrdQty = 0;
                        Integer cartProdQty = cartProdEx.getCartProdQty().intValue();
                        if(cartProdEx.getCartProdQty().intValue() >= cartPromoEx.getBaseOrdQty() + cartPromoEx.getFreeAwardQty()) {
                            // M+N 으로 혜택 수량을 구한다. 전체 수량 중에 (M+N) 세트만큼이 프로모션혜택상품수량이다.
                            awardQty = Math.floorDiv(cartProdQty, (cartPromoEx.getBaseOrdQty() + cartPromoEx.getFreeAwardQty())) * cartPromoEx.getFreeAwardQty();
                            baseOrdQty = Math.floorDiv(cartProdQty, (cartPromoEx.getBaseOrdQty() + cartPromoEx.getFreeAwardQty())) * cartPromoEx.getBaseOrdQty();
                        }
                        
                        cartProdEx.setmNPromoAwardQty(awardQty.longValue());
                        cartProdEx.setmNPromoBaseQty(baseOrdQty.longValue());
                        
                        setSameMNPromoApplyResultCode(cartProdEx, cartPromoEx);
                        
                        CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
                        setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoByMNPromotion(), resultProduct.getFinalOnlineSalesPriceInfo(), awardQty);
                    }
                }
            }
        }
    }
    
    private CalculationCurrencyInfo setCalculationCurrencyInfo(CalculationCurrencyInfo currencyInfo, BigDecimal amt) {
        if(currencyInfo == null) {
            currencyInfo = new CalculationCurrencyInfo();
            currencyInfo.setStandardCurrency(new CalculationCurrencyValue());   
        }
        
        currencyInfo.getStandardCurrency().setAmount(amt);
        
        return currencyInfo;
    }

    private BigDecimal getStandardAmount(CalculationCurrencyInfo currencyInfo) {
        if(currencyInfo == null
                || currencyInfo.getStandardCurrency() == null
                || currencyInfo.getStandardCurrency().getAmount() == null) {
            return BigDecimal.ZERO;
        }
        
        return currencyInfo.getStandardCurrency().getAmount();
    }
    
    private CalculationCurrencyInfo setCalculationCurrencyInfo(CalculationCurrencyInfo currencyInfo, CalculationCurrencyInfo source, int multiply) {
        if(currencyInfo == null
                || currencyInfo.getStandardCurrency() == null
                || source == null
                || source.getStandardCurrency() == null) {
            return null;
        }
        
        currencyInfo.getStandardCurrency().setAmount(source.getStandardCurrency().getAmount().multiply(new BigDecimal(multiply)));
        
        return currencyInfo;
    }

    private CalculationCurrencyInfo addCalculationCurrencyInfo(CalculationCurrencyInfo currencyInfo, CalculationCurrencyInfo augend) {
        if(currencyInfo == null
                || currencyInfo.getStandardCurrency() == null
                || augend == null
                || augend.getStandardCurrency() == null) {
            return null;
        }

        currencyInfo.getStandardCurrency().setAmount(currencyInfo.getStandardCurrency().getAmount().add(augend.getStandardCurrency().getAmount()));
        
        return currencyInfo;
    }

    private CalculationCurrencyInfo subtractCalculationCurrencyInfo(CalculationCurrencyInfo currencyInfo, CalculationCurrencyInfo subtrahend) {
        if(currencyInfo == null
                || currencyInfo.getStandardCurrency() == null
                || subtrahend == null
                || subtrahend.getStandardCurrency() == null) {
            return null;
        }
        
        currencyInfo.getStandardCurrency().setAmount(currencyInfo.getStandardCurrency().getAmount().subtract(subtrahend.getStandardCurrency().getAmount()));
        return currencyInfo;
    }
    
    private void calculationDiffMNPromo(CartPromoEx cartPromoEx, List<CartOnlineProdEx> cartOnlineProdExList) {
        if(cartOnlineProdExList == null) {
            return;
        }

        Integer totalCartProdQty = 0;
        List<CartProdEx> cartProdExList = new ArrayList<>();
        for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
            if(cartOnlineProdEx.getCartProdExList() != null) {
                for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                    cartProdEx.setmNPromoAwardQty(0L);
                    cartProdEx.setmNPromoBaseQty(0L);
                    if(cartProdEx.getCalculationResultProduct() != null
                            && CartConst.Y.equals(cartProdEx.getSelectYn())) {
                        cartProdExList.add(cartProdEx);
                        totalCartProdQty += cartProdEx.getCartProdQty().intValue();
                    }
                }
            }
        }
        
        // 이종M+N처리
        Collections.sort(cartProdExList, new Comparator<CartProdEx>() {

            @Override
            public int compare(CartProdEx o1, CartProdEx o2) {
                BigDecimal c1 = getStandardAmount(o1.getCalculationResultProduct().getFinalOnlineSalesPriceInfo());
                BigDecimal c2 = getStandardAmount(o2.getCalculationResultProduct().getFinalOnlineSalesPriceInfo());
                return c2.compareTo(c1);
            }

        });

        if(CartConst.MN_AWARD_BASE_LOWEST_PRICE.equals(cartPromoEx.getFreeAwardBaseCode())) {
            Collections.reverse(cartProdExList);
        }
        
        // M+N 으로 혜택 수량을 구한다. 전체 수량 중에 (M+N) 세트만큼이 프로모션혜택상품수량이다.
        Integer freeAwardQty = Math.floorDiv(totalCartProdQty, (cartPromoEx.getBaseOrdQty() + cartPromoEx.getFreeAwardQty())) * cartPromoEx.getFreeAwardQty();
        Integer baseOrdQty = Math.floorDiv(totalCartProdQty, (cartPromoEx.getBaseOrdQty() + cartPromoEx.getFreeAwardQty())) * cartPromoEx.getBaseOrdQty();

        // 증정상품 먼저 정렬순서대로 처리(단가가 높은 것 부터인지, 낮은것 부터인지는 호출하는 곳에서 처리)
        {
            Integer remainFreeAwardQty = freeAwardQty;
            for(CartProdEx cartProdEx : cartProdExList) {
                if(cartProdEx.getCartProdQty() > 0
                        && remainFreeAwardQty > 0) {
                    if(remainFreeAwardQty > cartProdEx.getCartProdQty()) {
                        cartProdEx.setmNPromoAwardQty(cartProdEx.getCartProdQty());
                        remainFreeAwardQty = remainFreeAwardQty - cartProdEx.getCartProdQty().intValue();
                    }
                    else {
                        cartProdEx.setmNPromoAwardQty(remainFreeAwardQty.longValue());
                        remainFreeAwardQty = 0;
                    }
                    
                    CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
                    setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoByMNPromotion(), resultProduct.getFinalOnlineSalesPriceInfo(), getIntValue(cartProdEx.getmNPromoAwardQty()));
                }
                else {
                    cartProdEx.setmNPromoAwardQty(0L);
                    CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
                    setCalculationCurrencyInfo(resultProduct.getQtyDiscountAmountInfoByMNPromotion(), BigDecimal.ZERO);
                }
            }
        }        
        
        // 기준이되는 상품수량 처리
        {
            Integer remainBaseOrdQty = baseOrdQty;
            for(CartProdEx cartProdEx : cartProdExList) {
                Integer targetEnableQty = cartProdEx.getCartProdQty().intValue() - getIntValue(cartProdEx.getmNPromoAwardQty());
                if(targetEnableQty > 0
                        && remainBaseOrdQty > 0) {
                    if(remainBaseOrdQty > targetEnableQty) {
                        cartProdEx.setmNPromoBaseQty(targetEnableQty.longValue());
                        remainBaseOrdQty = remainBaseOrdQty - targetEnableQty;
                    }
                    else {
                        cartProdEx.setmNPromoBaseQty(remainBaseOrdQty.longValue());
                        remainBaseOrdQty = 0;
                    }
                }
                else {
                    cartProdEx.setmNPromoBaseQty(0L);                    
                }
            }
        }        
        
        setPromoApplyResultCode(cartPromoEx);
    }
    
    private void setSameMNPromoApplyResultCode(CartProdEx cartProdEx, CartPromoEx cartPromoEx) {
        // 기준수량M
        long m = cartPromoEx.getBaseOrdQty().longValue();
        // 기준수량N
        long n = cartPromoEx.getFreeAwardQty().longValue();
        // 기준수량합
        long mn = m + n;
        // 주문수량
        long q = cartProdEx.getCartProdQty();
        
        long applyBaseOrdQty = getValidValue(cartProdEx.getmNPromoBaseQty());
        long applyFreeAwardQty = getValidValue(cartProdEx.getmNPromoAwardQty());
        
        // M+N적용수량
        long x = applyBaseOrdQty + applyFreeAwardQty;
        
        if(x == q) {
            cartProdEx.setPromoApplyResultCode(CartConst.MN_PROMO_APPLY_CODE_ALL);
            cartProdEx.setRecommandBaseOrdQty(applyBaseOrdQty);
            cartProdEx.setRecommandFreeAwardQty(applyFreeAwardQty);
        }
        else if(q < mn) {
            cartProdEx.setPromoApplyResultCode(CartConst.MN_PROMO_APPLY_CODE_NONE);
            cartProdEx.setRecommandBaseOrdQty(m);
            cartProdEx.setRecommandFreeAwardQty(n);
        }
        else {
            cartProdEx.setPromoApplyResultCode(CartConst.MN_PROMO_APPLY_CODE_PARTIAL);
            long rq = q + mn - (q % mn);
            cartProdEx.setRecommandBaseOrdQty(rq / mn * m);
            cartProdEx.setRecommandFreeAwardQty(rq / mn * n);
        }
    }
    
    private void setPromoApplyResultCode(CartPromoEx cartPromoEx) {
        List<CartOnlineProdEx> cartOnlineProdExList = cartPromoEx.getPromoOnlineProdExList();
        int totalCartProdQty = 0;
        int totalBaseQty = 0;
        int totalAwardQty = 0;
        for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
            for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                if(CartConst.Y.equals(cartProdEx.getSelectYn())) {
                    totalCartProdQty += cartProdEx.getCartProdQty();
                    totalBaseQty += getIntValue(cartProdEx.getmNPromoBaseQty());
                    totalAwardQty += getIntValue(cartProdEx.getmNPromoAwardQty());
                }
            }
        }
        
        // 기준 M 수량
        int m = cartPromoEx.getBaseOrdQty();
        // 기준 N 수량
        int n = cartPromoEx.getFreeAwardQty();
        // 기준수량합
        int mn = m + n;
        // 주문수량
        int q = totalCartProdQty;
        // M+N적용수량
        int x = totalBaseQty + totalAwardQty;
        
        if(x == q) {
            cartPromoEx.setPromoApplyResultCode(CartConst.MN_PROMO_APPLY_CODE_ALL);
            cartPromoEx.setRecommandBaseOrdQty((long) totalBaseQty);
            cartPromoEx.setRecommandFreeAwardQty((long) totalAwardQty);
        }
        else if(q < mn) {
            cartPromoEx.setPromoApplyResultCode(CartConst.MN_PROMO_APPLY_CODE_NONE);
            cartPromoEx.setRecommandBaseOrdQty((long) m);
            cartPromoEx.setRecommandFreeAwardQty((long) n);
        }
        else {
            cartPromoEx.setPromoApplyResultCode(CartConst.MN_PROMO_APPLY_CODE_PARTIAL);
            Integer rq = q + mn - (q % mn);
            cartPromoEx.setRecommandBaseOrdQty((long) rq / mn * m);
            cartPromoEx.setRecommandFreeAwardQty((long) rq / mn * n);
        }
    }
    
    private Long getValidValue(Long value) {
        return value != null ? value : 0L;
    }

    private int getIntValue(Long value) {
        return value != null ? value.intValue() : 0;
    }
    
}