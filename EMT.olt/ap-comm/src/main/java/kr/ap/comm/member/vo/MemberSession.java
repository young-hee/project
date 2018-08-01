package kr.ap.comm.member.vo;

import net.g1project.ecp.api.model.ap.ap.ApMember;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MemberSession implements Serializable {

    /**
     * BO에서 저장된 항목
     */
    private Long member_sn = 0L;

    private ApMember member;
    /**
     * FO화면에서 사용할 항목
     */
    private String user_certNum;
    private String user_check1;
    private String user_check2;
    private String user_check3;

    private String user_ciNo;
    private String user_incsNo;

    private String user_joinType;

    private String accessToken;
    private String refreshToken;
    private String autoLoginToken;

	/**
	 * 장바구니번호
	 */
	private Long cartSn = 0L;

	private String cartProdSnList;

	/**
	 * 주문번호
	 */
	private Long ordSn = 0L;

	/**
	 * 예치금여부
	 */
	private String depositYn;

    /**
     * 예치금
     */
	private BigDecimal depositPrice = BigDecimal.ZERO;
	
	/**
	 * 결제수단일련번호
	 */
	private Long payMethodSn = 0L;

	/**
	 * 신용카드업체일련번호
	 */
	private Long creditcardCoSn = 0L;

	/**
	 * 다음결제사용여부
	 */
	private String nextPayUseYn;

	/**
	 * PG사 결제서비스코드
	 */
	private String payServiceCode;

	/**
	 * PG사 결제수단코드
	 */
	private String payMethodCode;

	private String user_incsCardNoEc;

    /**
     * 주문접수중인 장바구니 상품일련번호목록
     */
    private Map<Long, OrdCartInfo> ordCartInfoMap;
    
    /**
     * @return the ordCartInfoMap
     */
    public Map<Long, OrdCartInfo> getOrdCartInfoMap() {
        return ordCartInfoMap;
    }

    /**
     * @param ordCartInfoMap the ordCartInfoMap to set
     */
    public void setOrdCartInfoMap(Map<Long, OrdCartInfo> ordCartInfoMap) {
        this.ordCartInfoMap = ordCartInfoMap;
    }

    public void addOrdCartInfo(Long ordSn, OrdCartInfo ordCartInfo) {
        if(ordCartInfoMap == null) {
            ordCartInfoMap = new HashMap<>();
        }
        ordCartInfoMap.put(ordSn, ordCartInfo);
    }

    public OrdCartInfo getOrdCartInfo(Long ordSn) {
        if(ordCartInfoMap != null) {
            return ordCartInfoMap.get(ordSn);
        }
        return null;
    }

    public void removeOrdCartInfo(Long ordSn) {
        if(ordCartInfoMap != null) {
            ordCartInfoMap.remove(ordSn);
        }
    }
    
    public Long getMember_sn() {
        return member_sn;
    }

    public void setMember_sn(Long member_sn) {
        this.member_sn = member_sn;
    }

    public ApMember getMember() {
        return member;
    }

    public void setMember(ApMember member) {
        this.member = member;
    }

    public String getUser_certNum() {
        return user_certNum;
    }

    public void setUser_certNum(String user_certNum) {
        this.user_certNum = user_certNum;
    }

    public String getUser_check1() {
        return user_check1;
    }

    public void setUser_check1(String user_check1) {
        this.user_check1 = user_check1;
    }

    public String getUser_check2() {
        return user_check2;
    }

    public void setUser_check2(String user_check2) {
        this.user_check2 = user_check2;
    }

    public String getUser_check3() {
        return user_check3;
    }

    public void setUser_check3(String user_check3) {
        this.user_check3 = user_check3;
    }

    public String getUser_ciNo() {
        return user_ciNo;
    }

    public void setUser_ciNo(String user_ciNo) {
        this.user_ciNo = user_ciNo;
    }

    public String getUser_incsNo() {
        return user_incsNo;
    }

    public void setUser_incsNo(String user_incsNo) {
        this.user_incsNo = user_incsNo;
    }

    public String getUser_joinType() {
        return user_joinType;
    }

    public void setUser_joinType(String user_joinType) {
        this.user_joinType = user_joinType;
    }

	public Long getCartSn() {
		return cartSn;
	}

	public void setCartSn(Long cartSn) {
		this.cartSn = cartSn;
	}

	public String getCartProdSnList() {
		return cartProdSnList;
	}

	public void setCartProdSnList(String cartProdSnList) {
		this.cartProdSnList = cartProdSnList;
	}

	public Long getOrdSn() { return ordSn; }

	public void setOrdSn(Long ordSn) { this.ordSn = ordSn; }

	public String getDepositYn() { return depositYn; }

	public void setDepositYn(String depositYn) { this.depositYn = depositYn; }

    public BigDecimal getDepositPrice() { return depositPrice; }
    
    public void setDepositPrice(BigDecimal depositPrice) { this.depositPrice = depositPrice; }

    public Long getPayMethodSn() { return payMethodSn; }

	public void setPayMethodSn(Long payMethodSn) { this.payMethodSn = payMethodSn; }

	public String getPayServiceCode() { return payServiceCode; }

	public void setPayServiceCode(String payServiceCode) { this.payServiceCode = payServiceCode; }

	public String getPayMethodCode() { return payMethodCode; }

	public void setPayMethodCode(String payMethodCode) { this.payMethodCode = payMethodCode; }

	public Long getCreditcardCoSn() { return creditcardCoSn; }

	public void setCreditcardCoSn(Long creditcardCoSn) { this.creditcardCoSn = creditcardCoSn; }

	public String getNextPayUseYn() { return nextPayUseYn; }

	public void setNextPayUseYn(String nextPayUseYn) { this.nextPayUseYn = nextPayUseYn; }

	public String getAccessToken() {
		return accessToken;
	}

	public void setAccessToken(String accessToken) {
		this.accessToken = accessToken;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public String getUser_incsCardNoEc() {
		return user_incsCardNoEc;
	}

	public void setUser_incsCardNoEc(String user_incsCardNoEc) {
		this.user_incsCardNoEc = user_incsCardNoEc;
	}

	public String getAutoLoginToken() {
		return autoLoginToken;
	}

	public void setAutoLoginToken(String autoLoginToken) {
		this.autoLoginToken = autoLoginToken;
	}

}
