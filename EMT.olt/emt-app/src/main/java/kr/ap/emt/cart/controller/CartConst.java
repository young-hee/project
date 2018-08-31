package kr.ap.emt.cart.controller;

public class CartConst {
    // 뷰티포인트멤버십서비스코드
    public final static String BP_SERVICE_CODE = "BP";
    
    // YN코드
    public final static String Y = "Y";
    public final static String N = "N";

    // M+N유형코드
    public final static String MPLUSNTYPE_SAME = "Same";
    public final static String MPLUSNTYPE_DIFF = "Different";
    
    // M+N적용결과코드
    public final static String MN_PROMO_APPLY_CODE_NONE = "None";
    public final static String MN_PROMO_APPLY_CODE_PARTIAL = "Partial";
    public final static String MN_PROMO_APPLY_CODE_ALL = "All";

    // M+N증정기준코드(이종일 경우)
    public final static String MN_AWARD_BASE_HIGHEST_PRICE = "HighestPrice";
    public final static String MN_AWARD_BASE_LOWEST_PRICE = "LowestPrice";

	// 판매표시상태 설정(체크박스 제어)
	public final static String SALE_DISPLAY_STATUS_ONSALE = "OnSale";
	public final static String SALE_DISPLAY_STATUS_EXHAUSTION = "Exhaustion";
	public final static String SALE_DISPLAY_STATUS_OUTOFSTOCK = "OutOfStock";
	public final static String SALE_DISPLAY_STATUS_NOTSELECT = "NotSelect";

}
