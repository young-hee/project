package kr.ap.emt.common.vo;

public class SearchVO {
	private String toSearchFor;			// 검색어
	private String toBeExcluded;		// 제외 검색어
	private boolean excludeSoldOut;		// 품절된 상품을 상품 목록 또는 콘텐츠에서 제외할지 여부 (default=false)
	private String prodSort;			// 상품리스트 정렬 옵션. null일 경우에는 BO에서 기본 지정한 랜딩용 소팅 옵션이 적용된다. 오직 이 때만 prod_list_top_fixed_prod가 맨 먼저 온다.
	private Integer offset;				// 상품 리스트의 오프셋
	private Integer limit;				// 아이템(상품/기획전시/콘텐츠) 리스트의 사이즈

	private Integer limitProd;			// 상품 리스트의 사이즈
	private Integer limitReview;		// 상품리뷰 리스트의 사이즈
	private Integer limitArticle;		// 아티클 리스트의 사이즈
	private Integer limitPlan;			// 기획전시 리스트의 사이즈

	private boolean includeFilters;		// 필터용 정보들도 포함해서 내려보내야 하는지
	private Integer displayCateDepth;	//클라이언트가 필터를 요청하는 경우, 내려받을 전시카테고리 depth의 최대값
	private Long displayCate;			// display_cate_sn. 예) “1,50”
	private Long brand;					// brand_sn. 예) “2,995”
	private String flag;				// 예) “icon_reco_new,icon_reco_md”
	private String attr;				// 예) “color=red,color=blue,size=L,size=XL”
	private String priceRange;			// 예1) “10000,”- 10000~ 예2) “2000,8000”- 2000~8000 예3) “,50000”- ~50000
	private String prefix;				// 자동완성할 스트링

	private String prodReviewTypeCodes;	//리뷰Type
	private String prodReviewSort;		//sort
	private Integer scopes;				//별점
	
	public String getToSearchFor() {
		return toSearchFor;
	}
	public void setToSearchFor(String toSearchFor) {
		this.toSearchFor = toSearchFor;
	}
	public String getToBeExcluded() {
		return toBeExcluded;
	}
	public void setToBeExcluded(String toBeExcluded) {
		this.toBeExcluded = toBeExcluded;
	}
	public boolean getExcludeSoldOut() {
		return excludeSoldOut;
	}
	public void setExcludeSoldOut(boolean excludeSoldOut) {
		this.excludeSoldOut = excludeSoldOut;
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
	public Integer getLimitProd() {
		return limitProd;
	}

	public void setLimitProd(Integer limitProd) {
		this.limitProd = limitProd;
	}

	public Integer getLimitReview() {
		return limitReview;
	}

	public void setLimitReview(Integer limitReview) {
		this.limitReview = limitReview;
	}

	public Integer getLimitArticle() {
		return limitArticle;
	}

	public void setLimitArticle(Integer limitArticle) {
		this.limitArticle = limitArticle;
	}

	public Integer getLimitPlan() {
		return limitPlan;
	}

	public void setLimitPlan(Integer limitPlan) {
		this.limitPlan = limitPlan;
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
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getAttr() {
		return attr;
	}
	public void setAttr(String attr) {
		this.attr = attr;
	}
	public String getPriceRange() {
		return priceRange;
	}
	public void setPriceRange(String priceRange) {
		this.priceRange = priceRange;
	}
	public String getPrefix() {
		return prefix;
	}
	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public boolean isExcludeSoldOut() {
		return excludeSoldOut;
	}

	public boolean isIncludeFilters() {
		return includeFilters;
	}

	public String getProdReviewTypeCodes() {
		return prodReviewTypeCodes;
	}

	public void setProdReviewTypeCodes(String prodReviewTypeCodes) {
		this.prodReviewTypeCodes = prodReviewTypeCodes;
	}

	public String getProdReviewSort() {
		return prodReviewSort;
	}

	public void setProdReviewSort(String prodReviewSort) {
		this.prodReviewSort = prodReviewSort;
	}

	public Integer getScopes() {
		return scopes;
	}

	public void setScopes(Integer scopes) {
		this.scopes = scopes;
	}
}
