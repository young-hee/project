package kr.ap.comm.cart;

import net.g1project.ecp.api.model.sales.cart.CartEx;

import java.io.Serializable;

public class CartSession implements Serializable {

	/**
	 * 장바구니번호
	 */
	private Long cartSn = 0L;

	/**
	 * 장바구니번호(바로구매)
	 */
	private Long buyNowCartSn = 0L;

	/**
	 * 장바구니 상품번호 리스트
	 */
	private String cartProdSnList;

	/**
	 * 장바구니 상품(확장)
	 */
	private CartEx cartEx;

	public Long getCartSn() {
		return cartSn;
	}

	public void setCartSn(Long cartSn) {
		this.cartSn = cartSn;
	}

	public Long getBuyNowCartSn() {
		return buyNowCartSn;
	}

	public void setBuyNowCartSn(Long buyNowCartSn) {
		this.buyNowCartSn = buyNowCartSn;
	}

	public String getCartProdSnList() {
		return cartProdSnList;
	}

	public void setCartProdSnList(String cartProdSnList) {
		this.cartProdSnList = cartProdSnList;
	}

	public CartEx getCartEx() {
		return cartEx;
	}

	public void setCartEx(CartEx cartEx) {
		this.cartEx = cartEx;
	}
}
