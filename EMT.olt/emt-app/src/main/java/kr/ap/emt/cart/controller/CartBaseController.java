/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.cart.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import kr.ap.comm.cart.CartSession;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.cart.CalculationCurrencyInfo;
import net.g1project.ecp.api.model.sales.cart.CalculationCurrencyValue;
import net.g1project.ecp.api.model.sales.cart.CalculationRequestOtf;
import net.g1project.ecp.api.model.sales.cart.CalculationResult;
import net.g1project.ecp.api.model.sales.cart.CalculationResultOtf;
import net.g1project.ecp.api.model.sales.cart.CalculationResultProduct;
import net.g1project.ecp.api.model.sales.cart.CartEx;
import net.g1project.ecp.api.model.sales.cart.CartMemberMembershipEx;
import net.g1project.ecp.api.model.sales.cart.CartOnlineProdEx;
import net.g1project.ecp.api.model.sales.cart.CartProdAward;
import net.g1project.ecp.api.model.sales.cart.CartProdEx;
import net.g1project.ecp.api.model.sales.cart.CartPromoEx;
import org.springframework.util.StringUtils;

@Controller
public class CartBaseController extends AbstractController{

	/**
	 * 카트정보 조회
	 * @param cartSn
	 * @return
	 */
	protected CartEx getCart(Long cartSn) {
		if(cartSn != null){
			// 카트정보 최초 진입
			CartEx cartEx = cartApi.getCart(cartSn);
			// 처음부터 재 계산을 해준다.
			cartEx = calculationCartEx(cartEx);
			// 세션에 정보를 넣어준다.
			setSession(cartEx);
			return cartEx;
		}
		return null;
	}

	/**
	 * 세션정보 set
	 * @param cartEx
	 */
	private void setSession(CartEx cartEx) {
		CartSession cartSession = getCartSession();
		cartSession.setCartEx(cartEx);
		setCartSession(cartSession);
	}

	/**
	 * 체크 선택 된 상품검증
	 * @param cartEx
	 * @return
	 */
	private CartEx calculationBySelect(CartEx cartEx) {

		// 장바구니-배송-온라인상품목록
		setSaleDisplayStatusCartOnlineProdExList(cartEx.getCartDeliveryOnlineProdExList());
		// 장바구니-배송-뷰티(멤버십)포인트교환상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList());
		// 장바구니-배송-진주알(활동)포인트교환상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartDeliveryActivityPointExchOnlineProdExList());
		// 장바구니-배송-M+N프로모션목록
		setSaleDisplayStatusCartMnPromoExList(cartEx.getCartDeliveryMNPromoExList());
		// 장바구니-배송-동시구매프로모션목록
		setSaleDisplayStatusCartSameTimePromoExList(cartEx.getCartDeliverySameTimePurPromoExList());

		// 장바구니-매장픽업-온라인상품목록
		setSaleDisplayStatusCartOnlineProdExList(cartEx.getCartStorePickupOnlineProdExList());
		// 장바구니-매장픽업-뷰티(멤버십)포인트교환상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList());
		// 장바구니-매장픽업-진주알(활동)포인트교환상품목록
		setSaleDisplayStatusCartPointExchOnlineProdExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList());
		// 장바구니-매장픽업-M+N프로모션목록
		setSaleDisplayStatusCartMnPromoExList(cartEx.getCartStorePickupMNPromoExList());
		// 장바구니-매장픽업-동시구매프로모션목록
		setSaleDisplayStatusCartSameTimePromoExList(cartEx.getCartStorePickupSameTimePurPromoExList());

		return cartEx;
	}

	/**
	 * 체크박스 선택 시 재계산
	 * @param cartSn
	 * @param selectedCartProdSnStr
	 * @return
	 */
    protected CartEx calculationBySelect(Long cartSn,
                                         String selectedCartProdSnStr) {

        /* 재계산을 위한 최종 cartEx */
		CartSession cartSession = getCartSession();
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
				setSelectCartSingleProdExList(cartEx.getCartDeliveryMembershipPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-배송-활동포인트교환-온라인상품목록
				setSelectCartSingleProdExList(cartEx.getCartDeliveryActivityPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-배송-M+N프로모션목록-온라인상품목록
				setSelectCartPromoExList(cartEx.getCartDeliveryMNPromoExList(), selectedCartProdSnList);
                // 장바구니-배송-동시구매프로모션목록-온라인상품목록
				setSelectCartSameTimePromoExList(cartEx.getCartDeliverySameTimePurPromoExList(), selectedCartProdSnList);
    
                // 장바구니-매장픽업-온라인상품목록
                setSelectCartOnlineProdExList(cartEx.getCartStorePickupOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-멤버십포인트교환-온라인상품목록
				setSelectCartSingleProdExList(cartEx.getCartStorePickupMembershipPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-활동포인트교환-온라인상품목록
				setSelectCartSingleProdExList(cartEx.getCartStorePickupActivityPointExchOnlineProdExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-M+N프로모션목록-온라인상품목록
				setSelectCartPromoExList(cartEx.getCartStorePickupMNPromoExList(), selectedCartProdSnList);
                // 장바구니-매장픽업-동시구매프로모션목록-온라인상품목록
				setSelectCartSameTimePromoExList(cartEx.getCartStorePickupSameTimePurPromoExList(), selectedCartProdSnList);

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
	private void setSelectCartPromoExList(List<CartPromoEx> cartPromoExList, List<Long> selectedCartProdSnList) {
        if(cartPromoExList == null) {
            return;
        }
        
        for(CartPromoEx cartPromoEx : cartPromoExList) {
			setSelectCartSingleProdExList(cartPromoEx.getPromoOnlineProdExList(), selectedCartProdSnList);
        }
    }

	/**
	 * 장바구니 체크박스 선택 시 동수구매 프로모션 상품 정보
	 * @param cartPromoExList
	 * @param selectedCartProdSnList
	 */
	private void setSelectCartSameTimePromoExList(List<CartPromoEx> cartPromoExList, List<Long> selectedCartProdSnList) {
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
			}
		}
	}

	/**
	 * 체크박스 선택 시 자기 자신과 자기 부모 Y,N 변경처리
	 * @param cartOnlineProdExList
	 * @param selectedCartProdSnList
	 */
	private void setSelectCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList, List<Long> selectedCartProdSnList) {
        boolean deselectAll = CollectionUtils.isEmpty(selectedCartProdSnList);

        // 상품선택정보 변경
        if(cartOnlineProdExList != null) {
            for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
                if(deselectAll) {
                    cartOnlineProdEx.setSelectYn("N");		// 부모도 같이 변경..
					if(cartOnlineProdEx.getCartProdExList() != null) {
						for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
							cartProdEx.setSelectYn("N");	// 단위쪽 자기 자신만 변경..
						}
					}
                }
                else {
                    cartOnlineProdEx.setSelectYn("N");		// 부모도 같이 변경..
                    if(cartOnlineProdEx.getCartProdExList() != null) {
                        for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                            if(selectedCartProdSnList.contains(cartProdEx.getCartProdSn())) {
								cartOnlineProdEx.setSelectYn("Y");	// 부모도 같이 변경..
								cartProdEx.setSelectYn("Y");		// 단위쪽 자기 자신만 변경..
                            }
                            else {
								cartProdEx.setSelectYn("N");		// 단위쪽 자기 자신만 변경..
							}
                        }
                    }
                }
            }
        }
    }

	/**
	 * 체크박스 선택 시 자기 자신만 Y,N 변경처리
	 * @param cartOnlineProdExList
	 * @param selectedCartProdSnList
	 */
	private void setSelectCartSingleProdExList(List<CartOnlineProdEx> cartOnlineProdExList, List<Long> selectedCartProdSnList) {
		boolean deselectAll = CollectionUtils.isEmpty(selectedCartProdSnList);

		// 상품선택정보 변경
		if(cartOnlineProdExList != null) {
			for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
				// 전체
				if(deselectAll) {
					if(cartOnlineProdEx.getCartProdExList() != null) {
						for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
							cartProdEx.setSelectYn("N");	// 단위쪽 자기 자신만 변경..
						}
					}
				}
				// 선택상품
				else {
					// 자기 자신만 설정한다..
					if(cartOnlineProdEx.getCartProdExList() != null) {
						for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
							if(selectedCartProdSnList.contains(cartProdEx.getCartProdSn())) {
								cartProdEx.setSelectYn("Y");	// 단위쪽 자기 자신만 변경..
							}
							else {
								cartProdEx.setSelectYn("N");	// 단위쪽 자기 자신만 변경..
							}
						}
					}
				}
			}
		}
	}

	/**
	 * 재 계산 상품삭제
	 * @param cartSn
	 * @param removeCartProdSnList
	 * @return
	 */
	protected CartEx calculationByRemove(Long cartSn, List<Long> removeCartProdSnList) {

        /* 재계산을 위한 최종 cartEx */
		CartSession cartSession = getCartSession();
        CartEx cartEx = cartSession.getCartEx();

        if(cartEx == null
                || !cartSn.equals(cartEx.getCartSn())) {
            cartEx = getCart(cartSn);
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
				cartEx =  getCart(cartSn);
			}

        }

        cartSession.setCartEx(cartEx);
        setCartSession(cartSession);
        
        return cartEx;
    }

	/**
	 * 상품삭제 프로모션상품
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
	 * 상품삭제 일반상품
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

	/**
	 * 상품수량 변경 계산식
	 * @param cartSn
	 * @param cartProdSn
	 * @param cartProdQty
	 * @return
	 */
	protected CartEx calculationByChangeQty(Long cartSn,
                                        Long cartProdSn,
                                        Long cartProdQty) {
        /* 회원정보 조회 */
        //MemberSession memberSession = getMemberSession();

        /* 재계산을 위한 최종 cartEx */
		CartSession cartSession = getCartSession();
        CartEx cartEx = cartSession.getCartEx();
        
        if(cartEx == null
                || !cartSn.equals(cartEx.getCartSn())) {
            cartEx =  getCart(cartSn);
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
                cartEx = getCart(cartSn);
            }
        }

        
        cartSession.setCartEx(cartEx);
        setCartSession(cartSession);
        
        return cartEx;
    }

	/**
	 * 상품수량 변경 프로모션상품
	 * @param cartPromoExList
	 * @param cartProdSn
	 * @param cartProdQty
	 */
    private void setChangeQtyCartPromoOnlineProdExList(List<CartPromoEx> cartPromoExList, Long cartProdSn, Long cartProdQty) {
        if(cartPromoExList == null) {
            return;
        }
        
        for(CartPromoEx cartPromoEx : cartPromoExList) {
            setChangeQtyCartOnlineProdExList(cartPromoEx.getPromoOnlineProdExList(), cartProdSn, cartProdQty);
        }
    }

	/**
	 * 상품수량 변경 일반상품
	 * @param cartOnlineProdExList
	 * @param cartProdSn
	 * @param cartProdQty
	 */
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

	/**
	 * 체크박스 선택(셀렉)여부
	 * @param cartProdEx
	 * @return
	 */
	private boolean isCartProdSelectable(CartProdEx cartProdEx) {
		boolean retValue = true;

		// 최소구매수량 > 주문수량 체크
		/*if(cartProdEx.getProdEx().getMinPurLimitQty() > cartProdEx.getCartProdQty()){
			retValue = false;
		}*/
		// 주문수량 > 최대구매수량 체크
		/*if(cartProdEx.getCartProdQty() > cartProdEx.getProdEx().getMaxPurLimitQty()){
			retValue = false;
		}*/

		// 계산결과여부 체크
		if (CartConst.N.equals(cartProdEx.getCalculationResultYn())){
			retValue = false;
		}

		// 판매상태 체크(판매중)
		if (!CartConst.SALE_DISPLAY_STATUS_ONSALE.equals(cartProdEx.getProdEx().getSaleDisplayStatus())
			&& !CartConst.SALE_DISPLAY_STATUS_NOTSELECT.equals(cartProdEx.getProdEx().getSaleDisplayStatus())){
			retValue = false;
		}

		return retValue;
	}

	/**
	 * 선택여부에 따른 판매표시상태와 선택상태 변경
	 * @param cartProdEx
	 * @param selectable
	 */
	private void setCartProdSelectable(CartProdEx cartProdEx, boolean selectable) {
		if (selectable) {
			if (CartConst.SALE_DISPLAY_STATUS_NOTSELECT.equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
				cartProdEx.getProdEx().setSaleDisplayStatus(CartConst.SALE_DISPLAY_STATUS_ONSALE);
			}
			// 최소구매수량 > 주문수량 체크
			if(cartProdEx.getProdEx().getMinPurLimitQty() > cartProdEx.getCartProdQty()){
				cartProdEx.setSelectYn(CartConst.N);
			}
			// 주문수량 > 최대구매수량 체크
			if(cartProdEx.getCartProdQty() > cartProdEx.getProdEx().getMaxPurLimitQty()){
				cartProdEx.setSelectYn(CartConst.N);
			}
		} else {
			if (CartConst.SALE_DISPLAY_STATUS_ONSALE.equals(cartProdEx.getProdEx().getSaleDisplayStatus())) {
				cartProdEx.getProdEx().setSaleDisplayStatus(CartConst.SALE_DISPLAY_STATUS_NOTSELECT);
				cartProdEx.setSelectYn(CartConst.N);
			}
		}
	}

	/**
	 * 장바구니-온라인상품목록
	 * @param cartOnlineProdExList
	 */
	private void setSaleDisplayStatusCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList) {
		for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList){
			cartOnlineProdEx.setSaleDisplayStatus(CartConst.SALE_DISPLAY_STATUS_ONSALE);
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				// 체크박스 선택(셀렉)여부 체크
				if(isCartProdSelectable(cartProdEx) == false){
					cartOnlineProdEx.setSaleDisplayStatus(CartConst.SALE_DISPLAY_STATUS_NOTSELECT);
					break;
				}
				// 최소구매수량 > 주문수량 체크
				if(cartProdEx.getProdEx().getMinPurLimitQty() > cartProdEx.getCartProdQty()){
					cartOnlineProdEx.setSelectYn(CartConst.N);
					cartProdEx.setSelectYn(CartConst.N);
				}
				// 주문수량 > 최대구매수량 체크
				if(cartProdEx.getCartProdQty() > cartProdEx.getProdEx().getMaxPurLimitQty()){
					cartOnlineProdEx.setSelectYn(CartConst.N);
					cartProdEx.setSelectYn(CartConst.N);
				}
			}
			if(CartConst.SALE_DISPLAY_STATUS_NOTSELECT.equals(cartOnlineProdEx.getSaleDisplayStatus())){
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					cartProdEx.setSelectYn(CartConst.N);
				}
			}
		}
	}

	/**
	 * 장바구니-뷰티/진주알포인트교환-온라인상품목록
	 * @param cartPointExchOnlineProdExList
	 */
	private void setSaleDisplayStatusCartPointExchOnlineProdExList(List<CartOnlineProdEx> cartPointExchOnlineProdExList) {
		for (CartOnlineProdEx cartOnlineProdEx : cartPointExchOnlineProdExList) {
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				// 판매표시가 없을때
				if(StringUtils.isEmpty(cartProdEx.getProdEx().getSaleDisplayStatus())){
					cartProdEx.getProdEx().setSaleDisplayStatus(CartConst.SALE_DISPLAY_STATUS_ONSALE);
				}
				// 셀렉여부에 따른 판매표시상태와 셀렉상태 변경
				setCartProdSelectable(cartProdEx, isCartProdSelectable(cartProdEx));
			}
		}
	}

	/**
	 * 장바구니-M+N프로모션목록
	 * @param cartPromoExList
	 */
	private void setSaleDisplayStatusCartMnPromoExList(List<CartPromoEx> cartPromoExList) {
		for (CartPromoEx cartPromoEx : cartPromoExList) {
			// 동종 M+N
			if(CartConst.MPLUSNTYPE_SAME.equals(cartPromoEx.getPromoMPlusNTypeCode())){
				setSaleDisplayStatusCartPromoSameProdExList(cartPromoEx.getPromoOnlineProdExList());
			}
			// 이종 M+N
			else if(CartConst.MPLUSNTYPE_DIFF.equals(cartPromoEx.getPromoMPlusNTypeCode())){
				setSaleDisplayStatusCartPromoDifferentProdExList(cartPromoEx.getPromoOnlineProdExList());
			}
		}
	}

	/**
	 * M+N 프로모션 상품(동종)
	 * @param cartOnlineProdExList
	 */
	private void setSaleDisplayStatusCartPromoSameProdExList(List<CartOnlineProdEx> cartOnlineProdExList) {
		for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList){
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				// 셀렉여부에 따른 판매표시상태와 셀렉상태 변경
				setCartProdSelectable(cartProdEx, isCartProdSelectable(cartProdEx));
			}
		}
	}

	/**
	 * M+N 프로모션 상품(이종)
	 * @param cartOnlineProdExList
	 */
	private void setSaleDisplayStatusCartPromoDifferentProdExList(List<CartOnlineProdEx> cartOnlineProdExList) {
		for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList){
			for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
				// 셀렉여부에 따른 판매표시상태와 셀렉상태 변경
				setCartProdSelectable(cartProdEx, isCartProdSelectable(cartProdEx));
			}
		}
	}

	/**
	 * 장바구니-동시구매프로모션목록
	 * @param cartPromoExList
	 */
	private void setSaleDisplayStatusCartSameTimePromoExList(List<CartPromoEx> cartPromoExList) {
		for (CartPromoEx cartPromoEx : cartPromoExList) {

			// disableed 제어
			cartPromoEx.setSaleDisplayStatus(CartConst.SALE_DISPLAY_STATUS_ONSALE);
			for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if(isCartProdSelectable(cartProdEx) == false){ // 선택여부 체크
						cartPromoEx.setSaleDisplayStatus(CartConst.SALE_DISPLAY_STATUS_NOTSELECT);
						cartPromoEx.setSelectYn(CartConst.N);
						break;
					}
					// TODO : 주문수량 적용 시 주문수량 체크 부분 확인할 것!
					// 최소구매수량 > 주문수량 체크
					if(cartProdEx.getProdEx().getMinPurLimitQty() > cartProdEx.getCartProdQty()){
						cartPromoEx.setSelectYn(CartConst.N);
						cartProdEx.setSelectYn(CartConst.N);
					}
					// 주문수량 > 최대구매수량 체크
					if(cartProdEx.getCartProdQty() > cartProdEx.getProdEx().getMaxPurLimitQty()){
						cartPromoEx.setSelectYn(CartConst.N);
						cartProdEx.setSelectYn(CartConst.N);
					}
				}
			}
			if(CartConst.SALE_DISPLAY_STATUS_NOTSELECT.equals(cartPromoEx.getSaleDisplayStatus())){
				for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						cartProdEx.setSelectYn(CartConst.N);
					}
				}
			}

			// 체크제어
			cartPromoEx.setSelectYn(CartConst.Y);
			for (CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
				for (CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
					if(CartConst.N.equals(cartProdEx.getSelectYn())){
						cartPromoEx.setSelectYn(CartConst.N);
						break;
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

    	/* 체크 선택 된 상품검증 */
		calculationBySelect(cartEx);

        /* M+N 프로모션 기준수량/증정수량계산 */
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
				int cnt = 0;
                BigDecimal onlineSalesTotalAmount = BigDecimal.ZERO;
                if(calculationResultOtf.getResultProductKeyList() != null) {
                    for(String productKey : calculationResultOtf.getResultProductKeyList()) {
                        CartProdEx cartProdEx = allCartProdExMap.get(Long.parseLong(productKey));
                        //CartOnlineProdEx cartOnlineProdEx = allCartOnlineProdExMap.get(Long.parseLong(productKey));
                        if(cartProdEx != null
                                && CartConst.Y.equals(cartProdEx.getSelectYn())
                                && cartProdEx.getCalculationResultProduct() != null) {
                            onlineSalesTotalAmount = onlineSalesTotalAmount.add(getStandardAmount(cartProdEx.getCalculationResultProduct().getFinalOnlineSalesAmountInfo()));
							// 뷰티포인트 배송비 합산 추가
							if(CartConst.Y.equals(cartProdEx.getIntegrationMembershipExchYn())){
								onlineSalesTotalAmount = onlineSalesTotalAmount.add(new BigDecimal(cartProdEx.getExchPoint()));
							}
							cnt++;
                        }
                    }
                }
                
                // 배송비
                BigDecimal shipFeeFreeBaseAmt = requestOtf.getShipFeeFreeBaseAmt() != null ? requestOtf.getShipFeeFreeBaseAmt() : BigDecimal.ZERO;

                BigDecimal calcDefaultShipFee = BigDecimal.ZERO;
                BigDecimal shipFeeDiscountAmount = BigDecimal.ZERO;

                // 활동포인트상품(진주알)은 상품을 1개이상 금액관계없이 무조건 배송비가 부과되도록 처리(ex : cnt 적용으로 인한 처리)
				if(cnt > 0
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

		// 포인트상품 합계
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
                //CartOnlineProdEx cartOnlineProdEx = allCartOnlineProdExMap.get(cartProdEx.getCartProdSn());
                if(cartProdEx != null
                        && CartConst.Y.equals(cartProdEx.getSelectYn())
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

	/**
	 * 포인트 상품 계산
	 * @param cartEx
	 */
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

	/**
	 * 포인트 상품 계산합계
	 * @param cartOnlineProdExList
	 * @param cartEx
	 * @param aPoint
	 */
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
						// 판매표시상태가 "판매중" 상태인 포인트 상품만 합산 (최종결제금액에 표기여부) 2018-08-30
						if(CartConst.SALE_DISPLAY_STATUS_ONSALE.equals(cartProdEx.getProdEx().getSaleDisplayStatus())){
							if(remainPoints >= cartProdEx.getExchPoint()) {
								selectExchPointSum += cartProdEx.getExchPoint();
								remainPoints -= cartProdEx.getExchPoint();
							}
							else {
								cartProdEx.setSelectYn(CartConst.N);
							}
							exchPointSum += cartProdEx.getExchPoint();
						}
					}
				}
            }
        }

        // 진주알 계산값( ex : 100알 /보유 100알 )
        if(aPoint) {
            cartEx.setCartDeliveryExchActivityPointSum(cartEx.getCartDeliveryExchActivityPointSum() + exchPointSum);	// 전체계산합
            calculationResult.setExchAPointSum(calculationResult.getExchAPointSum() + selectExchPointSum);				// 선택된 계산합
        }
        // 뷰티포인트 계산값( ex : 100P /보유 100P )
        else {
            cartEx.setCartDeliveryExchMembershipPointSum(cartEx.getCartDeliveryExchMembershipPointSum() + exchPointSum);// 전체계산합
            calculationResult.setExchIPointSum(calculationResult.getExchIPointSum() + selectExchPointSum);				// 선택된 계산합
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

			if( "MPlusN".equals(cartPromoEx.getPromoTypeCode()) ){
				for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if (CartConst.Y.equals(cartProdEx.getSelectYn())) {
							CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
							productSaleAmount = productSaleAmount.add(getStandardAmount(resultProduct.getProductSaleAmountInfo()));
							finalOnlineSaleAmount = finalOnlineSaleAmount.add(getStandardAmount(resultProduct.getFinalOnlineSalesAmountInfo()));
						}
					}
				}
			}
			// 동시구매
			else{
				for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
						if (CartConst.Y.equals(cartProdEx.getSelectYn())) {
							CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
							productSaleAmount = productSaleAmount.add(getStandardAmount(resultProduct.getProductSaleAmountInfo()));
							finalOnlineSaleAmount = finalOnlineSaleAmount.add(getStandardAmount(resultProduct.getFinalOnlineSalesAmountInfo()));
						}
					}
				}
				/*for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
					if("Y".equals(cartOnlineProdEx.getSelectYn())){
						productSaleAmount = productSaleAmount.add(getStandardAmount(cartOnlineProdEx.getProductSaleAmountInfo()));
						finalOnlineSaleAmount = finalOnlineSaleAmount.add(getStandardAmount(cartOnlineProdEx.getFinalOnlineSalesAmountInfo()));
					}
				}*/
			}
            cartPromoEx.getProductSaleAmountInfo().getStandardCurrency().setAmount(productSaleAmount);
            cartPromoEx.getFinalOnlineSalesAmountInfo().getStandardCurrency().setAmount(finalOnlineSaleAmount);
        }
    }

	/**
	 * 온라인상품 금액 계산정보
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
						/*if(CartConst.Y.equals(cartProdEx.getSelectYn())) {
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

	/**
	 * M+N 이종상품 수량계산
	 * @param cartPromoEx
	 * @param cartOnlineProdExList
	 */
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

	/**
	 * 동종 M+N 수량
	 * @param cartProdEx
	 * @param cartPromoEx
	 */
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