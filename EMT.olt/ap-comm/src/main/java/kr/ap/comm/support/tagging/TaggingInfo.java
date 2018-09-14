package kr.ap.comm.support.tagging;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * GA/AA 태깅을 위한 정보
 */
public class TaggingInfo implements Serializable {

	private Customer customer;

	private String site;
	private String siteName;
	private ChannelType channel;

	private Page page;

	private Search search;

	private String cid; // GA 에서 각 사용자에게 할당하는 CID 값

	public static class Customer implements Serializable {
		private String userId = "undefined";
		private String incsNo = "undefined";
		private String incsYn = "undefined"; // O, 비로그인시 undefined
		private String loginYn = "N";
		private LoginType loginType = LoginType.undefined;
		private String age = "undefined";
		private String birthYear = "undefined";
		private Gender gender = Gender.undefined;
		private MemberLevel memberLevel = MemberLevel.undefined;

		public String getUserId() {
			return userId;
		}

		public void setUserId(String userId) {
			this.userId = userId;
		}

		public String getIncsNo() {
			return incsNo;
		}

		public void setIncsNo(String incsNo) {
			this.incsNo = incsNo;
		}

		public String getIncsYn() {
			return incsYn;
		}

		public void setIncsYn(String incsYn) {
			this.incsYn = incsYn;
		}

		public String getLoginYn() {
			return loginYn;
		}

		public void setLoginYn(String loginYn) {
			this.loginYn = loginYn;
		}

		public LoginType getLoginType() {
			return loginType;
		}

		public void setLoginType(LoginType loginType) {
			this.loginType = loginType;
		}

		public String getAge() {
			return age;
		}

		public void setAge(String age) {
			this.age = age;
		}

		public String getBirthYear() {
			return birthYear;
		}

		public void setBirthYear(String birthYear) {
			this.birthYear = birthYear;
		}

		public Gender getGender() {
			return gender;
		}

		public void setGender(Gender gender) {
			this.gender = gender;
		}

		public MemberLevel getMemberLevel() {
			return memberLevel;
		}

		public void setMemberLevel(MemberLevel memberLevel) {
			this.memberLevel = memberLevel;
		}
	}

	public enum LoginType {
		NORMAL, MOBILE, FINGERPRINT, AUTO, undefined
	}

	public enum Gender {
		M, F, undefined
	}

	public enum MemberLevel {
		WELCOME, VIP, VIP_PLUS, VVIP, VVIP_PLUS, undefined
	}

	public enum ChannelType {
		PC, MOBILE, APP
	}

	public static class Page implements Serializable {
		private String countryCode = "KOR";
		private String langCode = "KO";
		private String name;
		private String url;

		public String getCountryCode() {
			return countryCode;
		}

		public void setCountryCode(String countryCode) {
			this.countryCode = countryCode;
		}

		public String getLangCode() {
			return langCode;
		}

		public void setLangCode(String langCode) {
			this.langCode = langCode;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getUrl() {
			return url;
		}

		public void setUrl(String url) {
			this.url = url;
		}
	}

	public class Search implements Serializable {
		private String keyword;
		private String result; // O,X
		private String type; // 직접입력(KEY_IN), 추천검색어(RECOMMEND), 최근검색어(RECENT), 인기검색어(POPULAR)
		private int resultCount;

		public String getKeyword() {
			return keyword;
		}

		public void setKeyword(String keyword) {
			this.keyword = keyword;
		}

		public String getResult() {
			return result;
		}

		public void setResult(String result) {
			this.result = result;
		}

		public String getType() {
			return type;
		}

		public void setType(String type) {
			this.type = type;
		}

		public int getResultCount() {
			return resultCount;
		}

		public void setResultCount(int resultCount) {
			this.resultCount = resultCount;
		}
	}

	public static class Product implements Serializable {
		private String sku;
		private String name;
		private String brand;
		private BigDecimal price;
		private int quantity;
		private String variant; // 제품 옵션, 단일옵션인경우 '옵션없음'
		private String coupon; // 쿠폰코드_쿠폰명, 특정 상품/카테고리/브랜드에 적용되는 쿠폰
		private String shippingType = "Normal";
		private String sapCode;
		private String beautyPoint;

		public String getSku() {
			return sku;
		}

		public void setSku(String sku) {
			this.sku = sku;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getBrand() {
			return brand;
		}

		public void setBrand(String brand) {
			this.brand = brand;
		}

		public BigDecimal getPrice() {
			return price;
		}

		public void setPrice(BigDecimal price) {
			this.price = price;
		}

		public int getQuantity() {
			return quantity;
		}

		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}

		public String getVariant() {
			return variant;
		}

		public void setVariant(String variant) {
			this.variant = variant;
		}

		public String getCoupon() {
			return coupon;
		}

		public void setCoupon(String coupon) {
			this.coupon = coupon;
		}

		public String getShippingType() {
			return shippingType;
		}

		public void setShippingType(String shippingType) {
			this.shippingType = shippingType;
		}

		public String getSapCode() {
			return sapCode;
		}

		public void setSapCode(String sapCode) {
			this.sapCode = sapCode;
		}

		public String getBeautyPoint() {
			return beautyPoint;
		}

		public void setBeautyPoint(String beautyPoint) {
			this.beautyPoint = beautyPoint;
		}
	}

	public static class Payment implements Serializable {
		private String checkoutOption; // 결제수단
		private String orderNo; // 주문번호
		private BigDecimal amount; // 최종결제 금액
		private BigDecimal tax = BigDecimal.ZERO;
		private BigDecimal shippingFee;
		private String coupon; // 쿠폰코드_쿠폰명, 장바구니 쿠폰
		private String detailPaymentMethod; // 은행명 or 카드명, 결제수단_카드명

		public String getCheckoutOption() {
			return checkoutOption;
		}

		public void setCheckoutOption(String checkoutOption) {
			this.checkoutOption = checkoutOption;
		}

		public String getOrderNo() {
			return orderNo;
		}

		public void setOrderNo(String orderNo) {
			this.orderNo = orderNo;
		}

		public BigDecimal getAmount() {
			return amount;
		}

		public void setAmount(BigDecimal amount) {
			this.amount = amount;
		}

		public BigDecimal getTax() {
			return tax;
		}

		public void setTax(BigDecimal tax) {
			this.tax = tax;
		}

		public BigDecimal getShippingFee() {
			return shippingFee;
		}

		public void setShippingFee(BigDecimal shippingFee) {
			this.shippingFee = shippingFee;
		}

		public String getCoupon() {
			return coupon;
		}

		public void setCoupon(String coupon) {
			this.coupon = coupon;
		}

		public String getDetailPaymentMethod() {
			return detailPaymentMethod;
		}

		public void setDetailPaymentMethod(String detailPaymentMethod) {
			this.detailPaymentMethod = detailPaymentMethod;
		}
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public ChannelType getChannel() {
		return channel;
	}

	public void setChannel(ChannelType channel) {
		this.channel = channel;
	}

	public Page getPage() {
		return page;
	}

	public void setPage(Page page) {
		this.page = page;
	}

	public Search getSearch() {
		return search;
	}

	public void setSearch(Search search) {
		this.search = search;
	}

	public String getCid() {
		return cid;
	}

	public void setCid(String cid) {
		this.cid = cid;
	}
}
