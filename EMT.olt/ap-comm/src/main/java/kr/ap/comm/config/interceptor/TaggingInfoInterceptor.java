package kr.ap.comm.config.interceptor;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.APRequestContext;
import kr.ap.comm.support.tagging.TaggingInfo;
import kr.ap.comm.util.SessionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.util.Assert;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDate;

public class TaggingInfoInterceptor extends HandlerInterceptorAdapter {

	private Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private Environment env;

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

		// initialize tagging info session
		SessionUtils.getTaggingInfo(request);

		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
		TaggingInfo taggingInfo = SessionUtils.getTaggingInfo(request);
		makeTaggingInfo(request, taggingInfo);
		SessionUtils.setTaggingInfo(request, taggingInfo);
	}

	private TaggingInfo makeTaggingInfo(HttpServletRequest request, TaggingInfo taggingInfo) {

		MemberSession ms = getMemberSession(request);

		try {
			TaggingInfo.Customer customer = new TaggingInfo.Customer();
			if (ms.getMember() != null) {
				customer.setUserId(ms.getMember().getMemberId());
				customer.setIncsNo(encrypt(ms.getUser_incsNo()));
				customer.setIncsYn("O"); // O or undefined
				customer.setLoginYn("Y");
				customer.setLoginType(TaggingInfo.LoginType.AUTO);
				customer.setAge(getAge(ms.getMember().getDobYear()));
				customer.setBirthYear(ms.getMember().getDobYear());
				customer.setGender(getGender(ms.getMember().getGenderCode()));
				customer.setMemberLevel(getMemberLevel(ms.getMember().getMemberLevelName()));
			}

			TaggingInfo.Page page = new TaggingInfo.Page();
			page.setCountryCode("KOR");
			page.setLangCode("KO");
			// TODO page name 정리된 내용으로 생성
			page.setName("apmall-m^쇼핑^제품상세^UV 미스트 쿠션 커버 SPF50+/PA+++");

			taggingInfo.setChannel(getChannelType());
			taggingInfo.setCid("CID");
			taggingInfo.setCustomer(customer);
			taggingInfo.setPage(page);

			taggingInfo.setSite(getSite());
			taggingInfo.setSiteName(getSiteName());
		} catch (RuntimeException e) {
			//TODO 로그 감시 어떻게 할건지
			logger.error(e.getMessage(), e);
		}

		return taggingInfo;
	}

	private MemberSession getMemberSession(HttpServletRequest request) {
		return SessionUtils.getMemberSession(request);
	}

	private TaggingInfo.Gender getGender(String genderCode) {
		// TODO genderCode -> Gender 변환

		return TaggingInfo.Gender.M;
	}

	private String getAge(String birthYear) {
		// 생년으로 나이 계산
		if (StringUtils.hasText(birthYear)) {
			LocalDate now = LocalDate.now();
			int thisYear = now.getYear();
			int _bYear = Integer.parseInt(birthYear);
			return String.valueOf(thisYear - _bYear + 1);
		}
		return null;
	}

	private String encrypt(String plain) {
		try {
			MessageDigest md = MessageDigest.getInstance("SHA-512");
			md.update(plain.getBytes());
			return new String(md.digest());
		} catch (NoSuchAlgorithmException e) {
			logger.error(e.getMessage(), e);
			return "";
		}
	}

	private TaggingInfo.MemberLevel getMemberLevel(String memberLevelName) {
		// TODO memberLevelName -> MemberLevel 변환
		return TaggingInfo.MemberLevel.WELCOME;
	}

	private TaggingInfo.ChannelType getChannelType() {
		if (APRequestContext.isMobileApp()) {
			return TaggingInfo.ChannelType.APP;
		}
		if (APRequestContext.isMobileWeb()) {
			return TaggingInfo.ChannelType.MOBILE;
		}
		return TaggingInfo.ChannelType.PC;
	}

	private String getSite() {
		String mallId = env.getProperty("platform.frontend.mall-id");
		Assert.notNull(mallId, "Please check property value 'platform.frontend.mall-id'");
		switch (mallId) {
		case "M01":
			return "apmall-m";
		case "M02":
			return "etude";
		default:
			throw new IllegalArgumentException("Unknown mallId : " + mallId);
		}
	}

	private String getSiteName() {
		String mallId = env.getProperty("platform.frontend.mall-id");
		Assert.notNull(mallId, "Please check property value 'platform.frontend.mall-id'");
		switch (mallId) {
		case "M01":
			return "APMALL";
		case "M02":
			return "ETUDE";
		default:
			throw new IllegalArgumentException("Unknown mallId : " + mallId);
		}
	}
}
