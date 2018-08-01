package kr.ap.emt.display.vo;

import java.math.BigDecimal;

/**
 * @author Administrator
 *
 */
public class RequestBrand {

	/*매장찾기*/
	
	private BigDecimal latitude; //위도
	private BigDecimal logitude; //경도
	private BigDecimal radius; //반경
	private String regularStoreYn; //단골매장검색여부 (Y/N)
	private String foStoreEventCode; //FO매장행사코드 (Color Finder, Color Factory, Artist Service)
	private String addressDiv; //시도(주소)
	private String addressDetailDiv; //시군구(주소)
	
	/*매장칭찬목록*/
	private String searchTypeCode; //검색구분 (StoreName, StoreEvalTitle, StoreEvalBodyText)
	private String topStoreEvalYn; //우수매장평여부 (Y/N)
	private Long storeEvalSn; //매장평일련번호
	
	/*컬러팩토리*/
	private String reserveNo; //예약번호
	private String reserveCancelYn; //예약취소여부
	
	/*청춘강연신청 */
	private String preName;
	private String prePhnNo;
	private String requesterAgeGrp; 
	private String requesterGender;
	private String preCpnName; 
	private String preCpnNo; 
	private String companionAgeGrp; 
	private String companionGender; 
	private String requestReason; 
	
	/*공통*/
	private String keyword; //검색어
	private Integer offset;
	private Integer limit;
	private String sortBy; //정렬대상코드 (StoreName, Distance)

	public BigDecimal getLatitude() {
		return latitude;
	}

	public void setLatitude(BigDecimal latitude) {
		this.latitude = latitude;
	}

	public BigDecimal getLogitude() {
		return logitude;
	}

	public void setLogitude(BigDecimal logitude) {
		this.logitude = logitude;
	}

	public BigDecimal getRadius() {
		return radius;
	}

	public void setRadius(BigDecimal radius) {
		this.radius = radius;
	}

	public String getRegularStoreYn() {
		return regularStoreYn;
	}

	public void setRegularStoreYn(String regularStoreYn) {
		this.regularStoreYn = regularStoreYn;
	}

	public String getFoStoreEventCode() {
		return foStoreEventCode;
	}

	public void setFoStoreEventCode(String foStoreEventCode) {
		this.foStoreEventCode = foStoreEventCode;
	}

	public String getAddressDiv() {
		return addressDiv;
	}

	public void setAddressDiv(String addressDiv) {
		this.addressDiv = addressDiv;
	}

	public String getAddressDetailDiv() {
		return addressDetailDiv;
	}

	public void setAddressDetailDiv(String addressDetailDiv) {
		this.addressDetailDiv = addressDetailDiv;
	}

	public String getSearchTypeCode() {
		return searchTypeCode;
	}

	public void setSearchTypeCode(String searchTypeCode) {
		this.searchTypeCode = searchTypeCode;
	}

	public String getTopStoreEvalYn() {
		return topStoreEvalYn;
	}

	public void setTopStoreEvalYn(String topStoreEvalYn) {
		this.topStoreEvalYn = topStoreEvalYn;
	}

	public Long getStoreEvalSn() {
		return storeEvalSn;
	}

	public void setStoreEvalSn(Long storeEvalSn) {
		this.storeEvalSn = storeEvalSn;
	}

	public String getReserveNo() {
		return reserveNo;
	}

	public void setReserveNo(String reserveNo) {
		this.reserveNo = reserveNo;
	}

	public String getReserveCancelYn() {
		return reserveCancelYn;
	}

	public void setReserveCancelYn(String reserveCancelYn) {
		this.reserveCancelYn = reserveCancelYn;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
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

	public String getSortBy() {
		return sortBy;
	}

	public void setSortBy(String sortBy) {
		this.sortBy = sortBy;
	}

	public String getRequesterAgeGrp() {
		return requesterAgeGrp;
	}

	public void setRequesterAgeGrp(String requesterAgeGrp) {
		this.requesterAgeGrp = requesterAgeGrp;
	}

	public String getRequesterGender() {
		return requesterGender;
	}

	public void setRequesterGender(String requesterGender) {
		this.requesterGender = requesterGender;
	}

	public String getCompanionGender() {
		return companionGender;
	}

	public void setCompanionGender(String companionGender) {
		this.companionGender = companionGender;
	}

	public String getRequestReason() {
		return requestReason;
	}

	public void setRequestReason(String requestReason) {
		this.requestReason = requestReason;
	}

	public String getPreName() {
		return preName;
	}

	public void setPreName(String preName) {
		this.preName = preName;
	}

	public String getPrePhnNo() {
		return prePhnNo;
	}

	public void setPrePhnNo(String prePhnNo) {
		this.prePhnNo = prePhnNo;
	}

	public String getPreCpnNo() {
		return preCpnNo;
	}

	public void setPreCpnNo(String preCpnNo) {
		this.preCpnNo = preCpnNo;
	}

	public String getPreCpnName() {
		return preCpnName;
	}

	public void setPreCpnName(String preCpnName) {
		this.preCpnName = preCpnName;
	}

	public String getCompanionAgeGrp() {
		return companionAgeGrp;
	}

	public void setCompanionAgeGrp(String companionAgeGrp) {
		this.companionAgeGrp = companionAgeGrp;
	}
}
