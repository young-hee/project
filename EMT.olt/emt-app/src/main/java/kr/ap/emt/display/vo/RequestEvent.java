package kr.ap.emt.display.vo;

/**
 * @author Administrator
 *
 */
public class RequestEvent {

	// 상시이벤트
	private String regularEventType; // 행사유형코드
	private String requestTitle; // 행사유형코드
	private String requestReason; // 참가이유
	private String verifNo; // 스윗레터 인증 코드
	private String day; // yyyyMM
	private String name; // 참가자 이름
	private String phoneNo1; // 참가자 전화번호1
	private String phoneNo2; // 참가자 전화번호2
	private String address; // 참가자 주소
	private String termsAgreeYn; // 동의 유무
	private String emailAddress; // 이메일주소
	private Long regularEventSn; // 상시행사일련번호-미입력시 현재진행중인행사

	// 기획전시 이벤트
	private String keyword; // 검색
	private String status; // 기획전시상태코드 (PlanDisplayStatus) , Progress - 진행 , End - 종료,
	private String types; // 기획전시 유형코드 리스트(PlanDisplayType) , Link - URL링크 , General - 일반구성기획전시 ,
							// SameTimePur - 동시구매기획전시,
	private String eventIncludeYn; // 행사포함여부 , Y - 행사 포함 , N - 행사 미포함 , 미입력시 전체 (행사포함여부 조회조건 없음)
	private Long sameTimePurProdGrpSn; // 동시구매기획전그룹일련번호
	private boolean excludeSoldOut; // 품절된 상품을 상품 목록 또는 콘텐츠에서 제외할지 여부 (default=false)
	private String order; // 정렬방식
	private Long brandSns; // 브랜드일련번호리스트
	private Long memberSn; // 회원번호
	private Integer offset;
	private Integer limit;
	private boolean includeFilters; // 필터용 정보들도 포함해서 내려보내야 하는지
	private Integer displayCateDepth;	//클라이언트가 필터를 요청하는 경우, 내려받을 전시카테고리 depth의 최대값
	private Long displayCate; // display_cate_sn. 예) “1,50” => pageInfo 에 같이 내려옴.
	private Long brand; // brand_sn. 예) “2,995”
	private String flag; // 예) “icon_reco_new,icon_reco_md”
	private String attr; // 예) “color=red,color=blue,size=L,size=XL”
	private String priceRange; // 예1) “10000,”- 10000~ 예2) “2000,8000”- 2000~8000 예3) “,50000”- ~50000

	private Long planDisplaySn; // 기획전시일련번호

	private Long eventParticipantSn; // 행사참여자 일련번호

	private Long foNoticeSn; // 공지 일련번호 // 당첨자상세에서 사용

	public String getRegularEventType() {
		return regularEventType;
	}

	public void setRegularEventType(String regularEventType) {
		this.regularEventType = regularEventType;
	}

	public String getRequestTitle() {
		return requestTitle;
	}

	public void setRequestTitle(String requestTitle) {
		this.requestTitle = requestTitle;
	}

	public String getRequestReason() {
		return requestReason;
	}

	public void setRequestReason(String requestReason) {
		this.requestReason = requestReason;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getVerifNo() {
		return verifNo;
	}

	public void setVerifNo(String verifNo) {
		this.verifNo = verifNo;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keword) {
		this.keyword = keword;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getTypes() {
		return types;
	}

	public void setTypes(String types) {
		this.types = types;
	}

	public String getEventIncludeYn() {
		return eventIncludeYn;
	}

	public void setEventIncludeYn(String eventIncludeYn) {
		this.eventIncludeYn = eventIncludeYn;
	}

	public Long getSameTimePurProdGrpSn() {
		return sameTimePurProdGrpSn;
	}

	public void setSameTimePurProdGrpSn(Long sameTimePurProdGrpSn) {
		this.sameTimePurProdGrpSn = sameTimePurProdGrpSn;
	}

	public boolean getExcludeSoldOut() {
		return excludeSoldOut;
	}

	public void setExcludeSoldOut(boolean excludeSoldOut) {
		this.excludeSoldOut = excludeSoldOut;
	}

	public String getOrder() {
		return order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public Long getBrandSns() {
		return brandSns;
	}

	public void setBrandSns(Long brandSns) {
		this.brandSns = brandSns;
	}

	public Long getMemberSn() {
		return memberSn;
	}

	public void setMemberSn(Long memberSn) {
		this.memberSn = memberSn;
	}

	public Long getPlanDisplaySn() {
		return planDisplaySn;
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

	public void setPlanDisplaySn(Long planDisplaySn) {
		this.planDisplaySn = planDisplaySn;
	}

	public Long getEventParticipantSn() {
		return eventParticipantSn;
	}

	public void setEventParticipantSn(Long eventParticipantSn) {
		this.eventParticipantSn = eventParticipantSn;
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

	public String getTermsAgreeYn() {
		return termsAgreeYn;
	}

	public void setTermsAgreeYn(String termsAgreeYn) {
		this.termsAgreeYn = termsAgreeYn;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhoneNo1() {
		return phoneNo1;
	}

	public void setPhoneNo1(String phoneNo1) {
		this.phoneNo1 = phoneNo1;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPhoneNo2() {
		return phoneNo2;
	}

	public void setPhoneNo2(String phoneNo2) {
		this.phoneNo2 = phoneNo2;
	}

	public Long getFoNoticeSn() {
		return foNoticeSn;
	}

	public void setFoNoticeSn(Long foNoticeSn) {
		this.foNoticeSn = foNoticeSn;
	}

	public Long getRegularEventSn() {
		return regularEventSn;
	}

	public void setRegularEventSn(Long regularEventSn) {
		this.regularEventSn = regularEventSn;
	}

}
