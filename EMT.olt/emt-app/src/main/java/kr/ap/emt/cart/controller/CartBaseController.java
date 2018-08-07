/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.cart.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.springframework.stereotype.Controller;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.cart.CalculationCurrencyInfo;
import net.g1project.ecp.api.model.sales.cart.CalculationCurrencyValue;
import net.g1project.ecp.api.model.sales.cart.CalculationRequestOtf;
import net.g1project.ecp.api.model.sales.cart.CalculationRequestProductMembership;
import net.g1project.ecp.api.model.sales.cart.CalculationResult;
import net.g1project.ecp.api.model.sales.cart.CalculationResultOtf;
import net.g1project.ecp.api.model.sales.cart.CalculationResultProduct;
import net.g1project.ecp.api.model.sales.cart.CalculationResultProductMembership;
import net.g1project.ecp.api.model.sales.cart.CartEx;
import net.g1project.ecp.api.model.sales.cart.CartMemberMembershipEx;
import net.g1project.ecp.api.model.sales.cart.CartOnlineProdEx;
import net.g1project.ecp.api.model.sales.cart.CartProdAward;
import net.g1project.ecp.api.model.sales.cart.CartProdEx;
import net.g1project.ecp.api.model.sales.cart.CartPromoEx;

@Controller
public class CartBaseController extends AbstractController{
	
    protected CartEx calculationBySelect(Long cartSn,
                                         String selectedCartProdSnStr) {
        /* 회원정보 조회 */
        MemberSession memberSession = getMemberSession();

        /* 재계산을 위한 최종 cartEx */
        CartEx cartEx = memberSession.getCartEx();
        
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
    
                cartEx = calculationCartEx(cartEx);
            }
            catch(Exception e) {
                e.printStackTrace();

                cartEx = cartApi.getCartBySelectCartProds(cartSn, selectedCartProdSnStr);
            }
        }

        memberSession.setCartEx(cartEx);
        setMemberSession(memberSession);
        
        return cartEx;
    }

    private void setSelectCartPromoOnlineProdExList(List<CartPromoEx> cartPromoExList, List<Long> selectedCartProdSnList) {
        if(cartPromoExList == null) {
            return;
        }
        
        for(CartPromoEx cartPromoEx : cartPromoExList) {
            setSelectCartOnlineProdExList(cartPromoEx.getPromoOnlineProdExList(), selectedCartProdSnList);
        }
    }
    
    private void setSelectCartOnlineProdExList(List<CartOnlineProdEx> cartOnlineProdExList, List<Long> selectedCartProdSnList) {
        boolean deselectAll = CollectionUtils.isEmpty(selectedCartProdSnList);
        // 상품선택정보 변경
        if(cartOnlineProdExList != null) {
            for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
                if(deselectAll) {
                    cartOnlineProdEx.setSelectYn("N");
                }
                else {
                    cartOnlineProdEx.setSelectYn("N");
                    if(cartOnlineProdEx.getCartProdExList() != null) {
                        for(CartProdEx cartProdEx : cartOnlineProdEx.getCartProdExList()) {
                            if(selectedCartProdSnList.contains(cartProdEx.getCartProdSn())) {
                                cartOnlineProdEx.setSelectYn("Y");
                                break;
                            }
                        }
                    }
                }
            }
        }
    }
    
    protected CartEx calculationByRemove(Long cartSn, List<Long> removeCartProdSnList) {
        
        /* 회원정보 조회 */
        MemberSession memberSession = getMemberSession();

        /* 재계산을 위한 최종 cartEx */
        CartEx cartEx = memberSession.getCartEx();


        if(cartEx == null
                || !cartSn.equals(cartEx.getCartSn())) {
            cartEx = cartApi.getCart(cartSn);
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
				cartEx = cartApi.getCart(cartSn);
			}

        }

        memberSession.setCartEx(cartEx);
        setMemberSession(memberSession);
        
        return cartEx;
    }

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
        /* 회원정보 조회 */
        MemberSession memberSession = getMemberSession();

        /* 재계산을 위한 최종 cartEx */
        CartEx cartEx = memberSession.getCartEx();
        
        if(cartEx == null
                || !cartSn.equals(cartEx.getCartSn())) {
            cartEx = cartApi.getCart(cartSn);
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
                cartEx = cartApi.getCart(cartSn);
            }
        }

        
        memberSession.setCartEx(cartEx);
        setMemberSession(memberSession);
        
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

        /* 배송지시계산결과수정 : 금액들의 합, 배송비 */
        BigDecimal totalShipFee = BigDecimal.ZERO;
        BigDecimal totalShipFeeDiscountAmount = BigDecimal.ZERO;
        
        if(calculationResult.getResultOtfList() != null) {
            for(CalculationResultOtf calculationResultOtf : calculationResult.getResultOtfList()) {
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
                            onlineSalesTotalAmount = onlineSalesTotalAmount.add(cartProdEx.getCalculationResultProduct().getFinalOnlineSalesAmountInfo().getStandardCurrency().getAmount());
                        }
                    }
                }
                
                // 배송비
                CalculationRequestOtf requestOtf = calculationResultOtf.getRequestOtf();
                BigDecimal shipFeeFreeBaseAmt = requestOtf.getShipFeeFreeBaseAmt() != null ? requestOtf.getShipFeeFreeBaseAmt() : BigDecimal.ZERO;

                BigDecimal shipFee = BigDecimal.ZERO;
                BigDecimal shipFeeDiscountAmount = BigDecimal.ZERO;
                
                if(onlineSalesTotalAmount.compareTo(BigDecimal.ZERO) > 0
                        && onlineSalesTotalAmount.compareTo(shipFeeFreeBaseAmt) < 0) {
                    // TODO : 배송비할인프로모션 정보
                    
                }
                        
                // 초도배송비 청구금액 정보
                calculationResultOtf.setShipFeeInfo(setCalculationCurrencyInfo(calculationResultOtf.getShipFeeInfo(), shipFee));

                // 초도배송비 할인금액 정보
                calculationResultOtf.setShipFeeDiscountAmountInfo(setCalculationCurrencyInfo(calculationResultOtf.getShipFeeDiscountAmountInfo(), shipFeeDiscountAmount));

                // 최종초도배송비 정보
                calculationResultOtf.setFinalShipFeeInfo(setCalculationCurrencyInfo(calculationResultOtf.getFinalShipFeeInfo(), shipFeeDiscountAmount));
                
                totalShipFee = totalShipFee.add(shipFee);
                totalShipFeeDiscountAmount = totalShipFee.add(shipFeeDiscountAmount);
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
                        storePickupProdSaleTotalAmount = storePickupProdSaleTotalAmount.add(resultProduct.getProductSaleAmountInfo().getStandardCurrency().getAmount());
                    }
                    else {
                        onlineShipProdSaleTotalAmount = onlineShipProdSaleTotalAmount.add(resultProduct.getProductSaleAmountInfo().getStandardCurrency().getAmount());
                    }
                    
                    prodSaleTotalAmount = prodSaleTotalAmount.add(resultProduct.getProductSaleAmountInfo().getStandardCurrency().getAmount());
                    finalOnlineSalesTotalAmount = finalOnlineSalesTotalAmount.add(resultProduct.getFinalOnlineSalesAmountInfo().getStandardCurrency().getAmount());
                    
                    totalProdUnitDiscountAmount = totalProdUnitDiscountAmount
                                                    .add(resultProduct.getProductSaleAmountInfo().getStandardCurrency().getAmount())
                                                    .subtract(resultProduct.getFinalOnlineSalesAmountInfo().getStandardCurrency().getAmount());
                    
                                                    
                }
            }

            // 온라인배송상품판매금액합계
            calculationResult.setOnlineShipProdSaleTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getOnlineShipProdSaleTotalAmountInfo(), onlineShipProdSaleTotalAmount));
            // 매장픽업상품판매금액합계
            calculationResult.setStorePickupProdSaleTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getStorePickupProdSaleTotalAmountInfo(), storePickupProdSaleTotalAmount));
            // 상품판매금액합계
            calculationResult.setProdSaleTotalAmountInfo(setCalculationCurrencyInfo(calculationResult.getProdSaleTotalAmountInfo(), prodSaleTotalAmount));
            // 온라인상품할인
            calculationResult.getDsicountAmountInfoByOnlineProdDc().getStandardCurrency().setAmount(dsicountAmountByOnlineProdDc);
            // 회원등급할인
            calculationResult.getDsicountAmountInfoByMemberLevel().getStandardCurrency().setAmount(dsicountAmountByMemberLevel);
            // 온라인회원할인
            calculationResult.getDsicountAmountInfoByOnlineMemberDc().getStandardCurrency().setAmount(dsicountAmountByOnlineMemberDc);
            // 즉시할인쿠폰
            calculationResult.getDsicountAmountInfoByinstantCouponDc().getStandardCurrency().setAmount(dsicountAmountByinstantCouponDc);
            // 동시구매할인
            calculationResult.getDiscountAmountInfoBySameTimePurDc().getStandardCurrency().setAmount(discountAmountBySameTimePurDc);
            // M+N프로모션할인
            calculationResult.getDiscountAmountInfoByMNPromotion().getStandardCurrency().setAmount(discountAmountByMNPromotion);
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
        
        Integer exchPointSum = 0;
        Integer selectExchPointSum = 0;
        
        Integer remainPoints = keepingPoints;
        if(cartOnlineProdExList != null) {
            for(CartOnlineProdEx cartOnlineProdEx : cartOnlineProdExList) {
                if(CartConst.Y.equals(cartOnlineProdEx.getSelectYn())) {
                    if(remainPoints >= cartOnlineProdEx.getExchPoints()) {
                        selectExchPointSum += cartOnlineProdEx.getExchPoints();
                        remainPoints -= cartOnlineProdEx.getExchPoints();
                    }
                    else {
                        cartOnlineProdEx.setSelectYn(CartConst.N);
                    }
                }
                
                exchPointSum += cartOnlineProdEx.getExchPoints();
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
    
    private void calculationCartPromoOnlineProdExList(List<CartPromoEx> cartPromoExList, Map<Long, CartProdEx> allCartProdExMap, Map<Long, CartOnlineProdEx> allCartOnlineProdExMap) {
        if(cartPromoExList == null) {
            return;
        }
        
        for(CartPromoEx cartPromoEx : cartPromoExList) {
            calculationCartOnlineProdExList(cartPromoEx.getPromoOnlineProdExList(), allCartProdExMap, allCartOnlineProdExMap);
            BigDecimal productSaleAmount = BigDecimal.ZERO;
            BigDecimal finalOnlineSaleAmount = BigDecimal.ZERO;
            for(CartOnlineProdEx cartOnlineProdEx : cartPromoEx.getPromoOnlineProdExList()) {
                productSaleAmount = productSaleAmount.add(cartOnlineProdEx.getProductSaleAmountInfo().getStandardCurrency().getAmount());
                finalOnlineSaleAmount = finalOnlineSaleAmount.add(cartOnlineProdEx.getFinalOnlineSalesAmountInfo().getStandardCurrency().getAmount());
            }
            cartPromoEx.getProductSaleAmountInfo().getStandardCurrency().setAmount(productSaleAmount);
            cartPromoEx.getFinalOnlineSalesAmountInfo().getStandardCurrency().setAmount(finalOnlineSaleAmount);
        }
    }
    
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
                            // TODO 단위수량 * 장자구니수량
                            cartProdAward.setAwardQty(cartProdAward.getAwardUnitQty() * getIntValue(cartProdEx.getCartProdQty()));
                        }
                    }
                    
                    // 상품계산결과수정 : 최종온라인판매가 * (수량 - 증정수량), 적립포인트
                    if(cartProdEx.getCalculationResultProduct() != null) {
                        CalculationResultProduct resultProduct = cartProdEx.getCalculationResultProduct();
                        
                        int realQty = cartProdEx.getCartProdQty().intValue() - getIntValue(cartProdEx.getmNPromoAwardQty());
                        // 상품판매금액
                        setCalculationCurrencyInfo(resultProduct.getProductSaleAmountInfo(), resultProduct.getProductSalePriceInfo(), cartProdEx.getCartProdQty().intValue());
                        // 최종온라인판매금액
                        setCalculationCurrencyInfo(resultProduct.getFinalOnlineSalesAmountInfo(), resultProduct.getFinalOnlineSalesPriceInfo(), realQty);
                        
                        productSaleAmount = productSaleAmount.add(resultProduct.getProductSaleAmountInfo().getStandardCurrency().getAmount());
                        finalOnlineSaleAmount = finalOnlineSaleAmount.add(resultProduct.getFinalOnlineSalesAmountInfo().getStandardCurrency().getAmount());
                    }
                    
                    if(CartConst.Y.equals(cartProdEx.getExchYn())) {
                        exchPoints = exchPoints + (cartProdEx.getExchPoint() != null ? cartProdEx.getExchPoint().intValue() : 0);
                    }
                }
            }
            cartOnlineProdEx.getProductSaleAmountInfo().getStandardCurrency().setAmount(productSaleAmount);
            cartOnlineProdEx.getFinalOnlineSalesAmountInfo().getStandardCurrency().setAmount(finalOnlineSaleAmount);
            cartOnlineProdEx.setExchPoints(exchPoints);
        }
    }
    
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
                    if(cartProdEx.getCalculationResultProduct() != null) {
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
                BigDecimal c1 = o1.getCalculationResultProduct().getFinalOnlineSalesPriceInfo().getStandardCurrency().getAmount();
                BigDecimal c2 = o2.getCalculationResultProduct().getFinalOnlineSalesPriceInfo().getStandardCurrency().getAmount();
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
    
                if(remainFreeAwardQty == 0) {
                    break;
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
    
                if(remainBaseOrdQty == 0) {
                    break;
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
                totalCartProdQty += cartProdEx.getCartProdQty();
                totalBaseQty += getIntValue(cartProdEx.getmNPromoBaseQty());
                totalAwardQty += getIntValue(cartProdEx.getmNPromoAwardQty());
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