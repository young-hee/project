package kr.ap.comm.member.vo;

import java.io.Serializable;
import java.util.List;

public class OrdCartInfo implements Serializable {

    private Long cartSn;
    private List<Long> cartProdSnList;
    
    public OrdCartInfo(Long cartSn, List<Long> cartProdSnList) {
        this.cartSn = cartSn;
        this.cartProdSnList = cartProdSnList;
    }
    
    /**
     * @return the cartSn
     */
    public Long getCartSn() {
        return cartSn;
    }
    /**
     * @param cartSn the cartSn to set
     */
    public void setCartSn(Long cartSn) {
        this.cartSn = cartSn;
    }
    /**
     * @return the cartProdSnList
     */
    public List<Long> getCartProdSnList() {
        return cartProdSnList;
    }
    /**
     * @param cartProdSnList the cartProdSnList to set
     */
    public void setCartProdSnList(List<Long> cartProdSnList) {
        this.cartProdSnList = cartProdSnList;
    }
    
    
	
}
