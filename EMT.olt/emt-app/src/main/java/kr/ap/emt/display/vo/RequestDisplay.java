package kr.ap.emt.display.vo;

/**
 * @author Administrator
 *
 */
public class RequestDisplay {

	private String flag; //행사상품여부
	private String flags; //플래그 데이터(인기, 추천, 주간베스트)
	private String prodListUnit; //리스트 단위가 온라인상품인지 또는 단위상품인지(OnlineProd, Prod)
	private String attr; //검색필터, 컬러, 피부톤 등
	private String prodSort; //판매순, 신상품순, 높은 가격순 등
	private Integer offset;
	private Integer limit;
	private String cornerIds; //코너 IDs 구분자(comma)
	private boolean excludeSoldOut = false; // 품절상품 제외 여부 (제외안함 : false)
	private String rankFlag; //플래그명
	
	private Long promoSn; //프로모션일련번호
	private String pointType; //활동포인트 (진주알) / 통합포인트 (뷰티포인트)
	private String pointExch; //가능/전용
	private Long sameTimePurProdGrpSn; //동시구매기획전그룹일련번호
	private Long planDisplayProdGrpSn ; //기획전시상품그룹일련번호
	private Long articleSn ; //아티클일련번호
	private String prodSnList ; //상품일련번호
	private Long couponSn; //쿠폰일련번호
	private Integer totalListSize ; //전체리스트사이즈
	private boolean includeFilters;	//필터정보 포함해서 받을지 여부
	private Integer displayCateDepth;	//클라이언트가 필터를 요청하는 경우, 내려받을 전시카테고리 depth의 최대값
	private Long displayCate; //ex)1, 50
	private Long brand; //2, 995
	private String priceRange; //예1) “10000,”- 10000~ 예2) “2000,8000”- 2000~8000 예3) “,50000”- ~50000
	
	public Integer getTotalListSize() {
		return totalListSize;
	}
	public void setTotalListSize(Integer totalListSize) {
		this.totalListSize = totalListSize;
	}
	public String getProdSnList() {
		return prodSnList;
	}
	public void setProdSnList(String prodSnList) {
		this.prodSnList = prodSnList;
	}
	public Long getCouponSn() {
		return couponSn;
	}
	public void setCouponSn(Long couponSn) {
		this.couponSn = couponSn;
	}
	public Long getArticleSn() {
		return articleSn;
	}
	public void setArticleSn(Long articleSn) {
		this.articleSn = articleSn;
	}
	public Long getPlanDisplayProdGrpSn() {
		return planDisplayProdGrpSn;
	}
	public void setPlanDisplayProdGrpSn(Long planDisplayProdGrpSn) {
		this.planDisplayProdGrpSn = planDisplayProdGrpSn;
	}
	public Long getSameTimePurProdGrpSn() {
		return sameTimePurProdGrpSn;
	}
	public void setSameTimePurProdGrpSn(Long sameTimePurProdGrpSn) {
		this.sameTimePurProdGrpSn = sameTimePurProdGrpSn;
	}
	public String getPointExch() {
		return pointExch;
	}
	public void setPointExch(String pointExch) {
		this.pointExch = pointExch;
	}
	public String getPointType() {
		return pointType;
	}
	public void setPointType(String pointType) {
		this.pointType = pointType;
	}
	public Long getPromoSn() {
		return promoSn;
	}
	public void setPromoSn(Long promoSn) {
		this.promoSn = promoSn;
	}
	public String getCornerIds() {
		return cornerIds;
	}
	public void setCornerIds(String cornerIds) {
		this.cornerIds = cornerIds;
	}
	public boolean isExcludeSoldOut() {
		return excludeSoldOut;
	}
	public void setExcludeSoldOut(boolean excludeSoldOut) {
		this.excludeSoldOut = excludeSoldOut;
	}
	public String getRankFlag() {
		return rankFlag;
	}
	public void setRankFlag(String rankFlag) {
		this.rankFlag = rankFlag;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getFlags() {
		return flags;
	}
	public void setFlags(String flags) {
		this.flags = flags;
	}
	public String getProdListUnit() {
		return prodListUnit;
	}
	public void setProdListUnit(String prodListUnit) {
		this.prodListUnit = prodListUnit;
	}
	public String getAttr() {
		return attr;
	}
	public void setAttr(String attr) {
		this.attr = attr;
	}
	public String getProdSort() {
		return prodSort;
	}
	public void setProdSort(String prodSort) {
		this.prodSort = prodSort;
	}
	public Integer getOffset() {
		return offset;
	}
	public void setOffset(Integer offset) {
		this.offset = offset;
	}
	public Integer getLimit() {
		return limit;
	}
	public void setLimit(Integer limit) {
		this.limit = limit;
	}
	public boolean getIncludeFilters() {
		return includeFilters;
	}
	public void setIncludeFilters(boolean includeFilters) {
		this.includeFilters = includeFilters;
	}
	public Integer getDisplayCateDepth() {
		return displayCateDepth;
	}
	public void setDisplayCateDepth(Integer displayCateDepth) {
		this.displayCateDepth = displayCateDepth;
	}
	public Long getDisplayCate() {
		return displayCate;
	}
	public void setDisplayCate(Long displayCate) {
		this.displayCate = displayCate;
	}
	public Long getBrand() {
		return brand;
	}
	public void setBrand(Long brand) {
		this.brand = brand;
	}
	public String getPriceRange() {
		return priceRange;
	}
	public void setPriceRange(String priceRange) {
		this.priceRange = priceRange;
	}

	
}
