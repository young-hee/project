package kr.ap.comm.config.thymeleaf;

import kr.ap.comm.api.vo.PageVo;
import kr.ap.comm.api.vo.PtTrBrkdInqVo;
import kr.ap.comm.member.vo.BeautyPointSummary;
import kr.ap.comm.member.vo.CushionPointSummary;
import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.util.SessionUtils;
import net.g1project.ecp.api.client.order.OrderApi;
import net.g1project.ecp.api.client.sales.PointApi;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.order.order.OrdSummaryInfo;
import net.g1project.ecp.api.model.sales.point.ActivityPointHists;

import org.apache.commons.lang3.time.DateFormatUtils;
import org.apache.commons.lang3.time.DateUtils;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.thymeleaf.context.IEngineContext;
import org.thymeleaf.context.IExpressionContext;
import org.thymeleaf.context.IWebContext;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class IntegratedAPIUtils {

	private final SimpleDateFormat sFormat = new SimpleDateFormat("yyyyMMdd");
	private static final ObjectMapper mapper;

	static {
		mapper = new ObjectMapper();
		mapper.setSerializationInclusion(Include.NON_NULL);
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}

	private final IExpressionContext context;
	private final PointApi pointApi;
	private final OrderApi orderApi;

	IntegratedAPIUtils(final IExpressionContext context, final PointApi pointApi, final OrderApi orderApi) {
		this.context = context;
		this.pointApi = pointApi;
		this.orderApi = orderApi;
	}
	
	public int getOrdSummary() {
		MemberSession memberSession = SessionUtils.getMemberSession(IWebContext.class.cast(this.context).getRequest());
		if(memberSession == null || memberSession.getMember_sn() == null || memberSession.getMember_sn() == 0)
			return 0;
		Date endDate = new Date();
		Date startDate = DateUtils.addMonths(endDate, -3);
		OrdSummaryInfo ordSummary = orderApi.getOrdSummary(memberSession.getMember_sn(), startDate, endDate, null);
		if(ordSummary == null) return 0;
		
		return ordSummary.getOrdReceptCnt() + ordSummary.getPayCompleteCnt() + ordSummary.getPreparingCnt() + ordSummary.getShippingCnt();
	}

	public String getGiftCardStatusName(String status) {
		if(status == null) return "";
		switch (status) {
		case "00":
			return "사용가능";
		case "91":
			return "발행취소";
		case "92":
			return "사용불가";

		default:
			break;
		}
		if(status.startsWith("8") && status.length() == 2) {
			return "환불";
		}
		return "";
	}
	
	public int countDate(Date date) {
		return toInt((date.getTime() - System.currentTimeMillis()) / 1000 / 3600 / 24);
	}

	public String toJson(Object object) {
		try {
			return mapper.writeValueAsString(object);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return "";
	}

	public String currencyTypeConverter(String value) {

		if (value != null) {
			switch (value) {
				case "Saving" :
					//적립:Saving
					return "적립";
				case "Transfer" :
					//출금:Transfer
					return "출금";
				case "Pay" :
					//사용:Pay
					return "사용";
				case "ManualSaving" :
					return "수동적립";
				case "ManualDec" :
					return "수동차감";
				case "PayCancel" :
					return "사용취소";
				default :
					return "";
			}
		}
		return "";
	}

	public String currencyConverter(Number price) {
		StringBuffer sb = new StringBuffer();
		if(toInt(price) >= 0) {
			sb.append("(<em>+</em>) ");
		} else {
			sb.append("(-) ");
		}
		sb.append(toCommaNumber(Math.abs(toInt(price))));

		return sb.toString();
	}

	public String btCardNumber(MemberSession member) {
		if(member == null || member.getUser_incsCardNoEc() == null || member.getUser_incsCardNoEc().isEmpty()
				 || member.getUser_incsCardNoEc().length() != 16) {
			return "";
		}
		StringBuffer sb = new StringBuffer(member.getUser_incsCardNoEc());

		sb.insert(12, "-");
		sb.insert(8, "-");
		sb.insert(4, "-");

		return sb.toString();
	}

	public String btCardBcd(MemberSession member, int width, int height) {
		if(member == null || member.getUser_incsCardNoEc() == null || member.getUser_incsCardNoEc().isEmpty()) {
			return "";
		}
		StringBuffer sb = new StringBuffer();
		sb.append("/barcode/createBarcode?content=");
		sb.append(member.getUser_incsCardNoEc());
		sb.append("&width=");
		sb.append(width);
		sb.append("&height=");
		sb.append(height);

		return sb.toString();
	}


	public String getPhoneNumber(EmbeddableTel phone) {
		if(phone == null || phone.getPhoneNo() == null)
			return "";
		return phone.getPhoneNo().substring(3);
	}
	public String getAgencyNum(EmbeddableTel phone) {
		if(phone == null || phone.getPhoneNo() == null)
			return "";
		return phone.getPhoneNo().substring(0, 3);
	}

	public boolean isPearlType(String type) {

		switch (type) {
		case "Saving":
		case "UseCancel":
		case "Exp":
			return true;
		case "SavingCancel":
		case "Use":
		case "Dec":
			return false;
		default:
			break;
		}
		return true;
	}

	/**
	 * 날짜 계산하여 카운트다운.
	 * @param source
	 * @param countDt
	 * @return
	 */
	public String dayCount(Date source, int countDt) {
		Calendar c = Calendar.getInstance();
		c.setTime(source);
		c.add(Calendar.DAY_OF_YEAR, countDt);
		Date to = c.getTime();
		return "D - " + (to.getTime() - source.getTime()) / (1000 * 60 * 60 * 24);
	}

	/**
	 * 날짜 계산하여 카운트다운.
	 * @param source
	 * @param countDt
	 * @return
	 */
	public boolean isDayCount(Date source, int countDt) {
		Calendar c = Calendar.getInstance();
		c.setTime(source);
		c.add(Calendar.DAY_OF_YEAR, countDt);
		Date to = c.getTime();
		return to.getTime() > source.getTime();
	}

	/**
	 * @param code
	 * @return
	 */
	public String pearlOccur(int flag, String name, String code, String type) {

		StringBuffer sb = new StringBuffer();
		if(name != null) {
			sb.append("[");
			sb.append(name);
			sb.append("] ");
		}
		if(type != null) {
			switch (type) {
			case "Award":
				sb.append("증정");
				break;
			case "Gift":
				sb.append("선물하기");
				break;
			case "ProdExch":
				sb.append("상품교환");
				break;
			case "FreeGiftExch":
				sb.append("사은품교환");
				break;
			case "CouponExch":
				sb.append("쿠폰교환");
				break;
			case "Event":
				sb.append("행사참여");
				break;
			}

			sb.append(" ");
		}

		if(code != null) {
			switch (code) {
			case "Saving":
				sb.append("적립");
				break;
			case "SavingCancel":
				sb.append("적립취소");
				break;
			case "Use":
				sb.append("사용");
				break;
			case "UseCancel":
				sb.append("사용취소");
				break;
			case "Dec":
				sb.append("차감");
				break;
			case "Exp":
				sb.append("소멸");
				break;
			default:
				break;
			}
		}
		return sb.toString();
	}

	public List<?> subList(List<?> list, int size) {
		if(list == null) return Collections.EMPTY_LIST;
		if(list.isEmpty() || size > list.size()) return list;
		return list.subList(0, (size < list.size()) ? size : list.size());
	}
	/**
	 *
	 * 통합에서 사용하는 문자열 날짜를 클라이언트에서 사용 가능하도록 포멧팅 변경.
	 * @throws ParseException
	 */
	public String dateformat(String source, String format) throws ParseException {
		if(source == null || source.isEmpty())
			return "";
		SimpleDateFormat sdf = (SimpleDateFormat) sFormat.clone();
		Date date = sdf.parse(source);
		return DateFormatUtils.format(date, "yyyy.MM.dd");
	}
	public String dateformat(Date date, String format) throws ParseException {
		if(date == null)
			return "";
		return DateFormatUtils.format(date, "yyyy.MM.dd");
	}
	/**
	 * 리스트를 전달받아 포인트 총량을 계산
	 * @param ptTrBrkdInqList
	 * @param flag 1일 경우 매출금액, 2일경우 발생포인트, 3일경우 적립적용포인트, 4일경우 사용적용포인트
	 * @return
	 */
	public String sumAmountPt(List<PtTrBrkdInqVo> ptTrBrkdInqList, int flag) {
		int count = 0;
		for (PtTrBrkdInqVo ptTrBrkdInqVo : ptTrBrkdInqList) {
			if(flag == 3 &&ptTrBrkdInqVo.getTlmcCd().equals("10")) {
				count += toInt(ptTrBrkdInqVo.getAplyPt());
			} else if(flag == 4 &&ptTrBrkdInqVo.getTlmcCd().equals("20")) {
				count += toInt(ptTrBrkdInqVo.getAplyPt());
			}

		}

		return String.format("%,d", count);
	}

	public PageVo initPageInfo(ActivityPointHists activityPointHists, int size) {
		PageVo pageVo = new PageVo();
		pageVo.setTotalRowCount(activityPointHists.getTotalCount() + "");
		pageVo.setPageSize(size + "");
		pageVo.setCurPage((activityPointHists.getOffset() + activityPointHists.getLimit()) / size);
		pageVo.setPageNumber(((activityPointHists.getOffset() + activityPointHists.getLimit()) / size) + "");

		if(pageVo.getTotalRowCount().equals("0")) {
			pageVo.setIsFirstPage(true);
			pageVo.setHasNextPage(false);
			pageVo.setIsLastPage(true);
			pageVo.setHasPrePage(false);
			pageVo.setCurPage(1);
			pageVo.setPageList(new Integer[]{1});
			pageVo.setPrePage(0);
			pageVo.setNextPage(0);
			pageVo.setLastPage(0);
			return pageVo;
		}
		pageVo.setIsFirstPage(pageVo.getPageNumber().equals("1"));
		pageVo.setHasPrePage(!pageVo.getIsFirstPage());
		int lastPage = toInt(pageVo.getTotalRowCount()) / toInt(pageVo.getPageSize()) +
				((toInt(pageVo.getTotalRowCount()) % toInt(pageVo.getPageSize()) != 0) ? 1 : 0 );
		pageVo.setLastPage(lastPage);
		pageVo.setIsLastPage(toInt(pageVo.getTotalRowCount()) <= (toInt(pageVo.getPageSize()) * toInt(pageVo.getPageNumber())));
		pageVo.setHasNextPage(!pageVo.getIsLastPage());
		pageVo.setCurPage(toInt(pageVo.getPageNumber()));
		pageVo.setPrePage(pageVo.getCurPage() - 1);
		pageVo.setNextPage(pageVo.getIsLastPage()? 0 : (pageVo.getCurPage() + 1));
		int startPage = pageVo.getCurPage() - (size/2);
		if((startPage + size) > lastPage) {
			startPage = lastPage - size + 1;
		}
		if(startPage < 1) {
			startPage = 1;
		}
		List<Integer> list = new ArrayList<Integer>();
		for(int i=startPage; i<(startPage + size); i++) {
			list.add(i);
			if(i == lastPage)
				break;
		}
		pageVo.setPageList(list.toArray(new Integer[list.size()]));
		return pageVo;
	}

	public PageVo initPageInfo(PageVo pageVo, int size) {
		if(pageVo.getTotalRowCount().equals("0")) {
			pageVo.setIsFirstPage(true);
			pageVo.setHasNextPage(false);
			pageVo.setIsLastPage(true);
			pageVo.setHasPrePage(false);
			pageVo.setCurPage(1);
			pageVo.setPageList(new Integer[]{1});
			pageVo.setPrePage(0);
			pageVo.setNextPage(0);
			pageVo.setLastPage(0);
			return pageVo;
		}
		pageVo.setIsFirstPage(pageVo.getPageNumber().equals("1"));
		pageVo.setHasPrePage(!pageVo.getIsFirstPage());
		int lastPage = toInt(pageVo.getTotalRowCount()) / toInt(pageVo.getPageSize()) +
				((toInt(pageVo.getTotalRowCount()) % toInt(pageVo.getPageSize()) != 0) ? 1 : 0 );
		pageVo.setLastPage(lastPage);
		pageVo.setIsLastPage(toInt(pageVo.getTotalRowCount()) <= (toInt(pageVo.getPageSize()) * toInt(pageVo.getPageNumber())));
		pageVo.setHasNextPage(!pageVo.getIsLastPage());
		pageVo.setCurPage(toInt(pageVo.getPageNumber()));
		pageVo.setPrePage(pageVo.getCurPage() - 1);
		pageVo.setNextPage(pageVo.getIsLastPage()? 0 : (pageVo.getCurPage() + 1));
		int startPage = pageVo.getCurPage() - (size/2);
		if((startPage + size) > lastPage) {
			startPage = lastPage - size + 1;
		}
		if(startPage < 1) {
			startPage = 1;
		}
		List<Integer> list = new ArrayList<Integer>();
		for(int i=startPage; i<(startPage + size); i++) {
			list.add(i);
			if(i == lastPage)
				break;
		}
		pageVo.setPageList(list.toArray(new Integer[list.size()]));
		return pageVo;
	}

	public String toCommaNumber(Object val) {
		return String.format("%,d", toInt(val));
	}
	public String hyphenPhoneNumber(String phone) {
		StringBuffer sb = new StringBuffer();
		if(phone.length() == 10) {
			sb.append(phone.substring(0, 3));
			sb.append("-");
			sb.append(phone.substring(3, 6));
			sb.append("-");
			sb.append(phone.substring(6, 10));
		} else if(phone.length() == 11) {
			sb.append(phone.substring(0, 3));
			sb.append("-");
			sb.append(phone.substring(3, 7));
			sb.append("-");
			sb.append(phone.substring(7, 11));
		}
		return sb.toString();
	}

	public String telPhoneNumber(String phone){
		StringBuffer sb = new StringBuffer();
		if (phone.length() == 0){
			return phone;
		}
		String[] strDDD = {"02" , "031", "032", "033", "041", "042", "043",
			"051", "052", "053", "054", "055", "061", "062",
			"063", "064", "010", "011", "012", "013", "015",
			"016", "017", "018", "019","070"};

		if (phone.length() < 9) {
			return phone;
		} else if (phone.substring(0,2).equals(strDDD[0])) {
			sb.append(phone.substring(0,2) + '-' + phone.substring(2, phone.length()-4)
				+ '-' + phone.substring(phone.length() -4, phone.length()));
		} else {
			for(int i=1; i < strDDD.length; i++) {
				if (phone.substring(0,3).equals(strDDD[i])) {
					sb.append(phone.substring(0,3) + '-' + phone.substring(3, phone.length()-4)
						+ '-' + phone.substring(phone.length() -4, phone.length()));
				}
			}
		}
		return sb.toString();
	}

	public boolean toBoolean(Object val) {
		return toBoolean(val, false);
	}
	public boolean toBoolean(Object val, boolean defaultValue) {
		if (val == null)
			return defaultValue;
		else if (val instanceof Boolean)
			return ((Boolean)val).booleanValue();
		else if (val instanceof String)
			return "true".equalsIgnoreCase((String)val) || "Y".equalsIgnoreCase((String)val);
		else
			return defaultValue;
	}

	public byte toByte(Object val) {
		return toByte(val, (byte)0);
	}
	public byte toByte(Object val, byte defaultValue) {
		if (val == null) return defaultValue;
		else if (val instanceof Number) return ((Number)val).byteValue();
		else if (val instanceof String)
			try { return Byte.parseByte((String)val); }
			catch (Exception e) { return defaultValue; }
		else return defaultValue;
	}

	public char toChar(Object val) {
		return toChar(val, ' ');
	}

	public char toChar(Object val, char defaultValue) {
		if (val == null) return defaultValue;
		else if (val instanceof Character)
			return ((Character)val).charValue();
		else if ((val instanceof String) && ((String)val).length() > 0)
			return ((String)val).charAt(0);
		else return defaultValue;
	}

	public int toInt(Object val) {
		return toInt(val, 0);
	}

	public int toInt(Object val, int defaultValue) {
		if (val == null)
			return defaultValue;
		else if (val instanceof Number)
			return ((Number)val).intValue();
		else if (val instanceof String) {
			try {
				return Integer.parseInt(((String)val).trim());
			}
			catch (Exception e) {
				return defaultValue;
			}
		}
		else return defaultValue;
	}

	public long toLong(Object val) {
		return toLong(val, 0L);
	}

	public long toLong(Object val, long defaultValue) {
		if (val == null)
			return defaultValue;
		else if (val instanceof Number)
			return ((Number)val).longValue();
		else if (val instanceof String) {
			try {
				return Long.parseLong(((String)val).trim());
			}
			catch (Exception e) {
				return defaultValue;
			}
		}
		else return defaultValue;
	}

	public float toFloat(Object val) {
		return toFloat(val, 0F);
	}

	public float toFloat(Object val, float defaultValue) {
		if (val == null)
			return defaultValue;
		else if (val instanceof Number)
			return ((Number)val).floatValue();
		else if (val instanceof String) {
			try {
				return Float.parseFloat(((String)val).trim());
			}
			catch (Exception e) {
				return defaultValue;
			}
		}
		else return defaultValue;
	}

	public double toDouble(Object val) {
		return toDouble(val, 0.0);
	}

	public double toDouble(Object val, double defaultValue) {
		if (val == null)
			return defaultValue;
		else if (val instanceof Number)
			return ((Number)val).doubleValue();
		else if (val instanceof String) {
			try {
				return Double.parseDouble(((String)val).trim());
			}
			catch (Exception e) {
				return defaultValue;
			}
		}
		else return defaultValue;
	}

	public BigDecimal toBigDecimal(Object val) {
		if (val instanceof BigDecimal) return (BigDecimal)val;
		else if (val instanceof Number) return new BigDecimal(((Number)val).toString());
		else if (val instanceof String) {
			try { return new BigDecimal((String)val); }
			catch (Exception e) { return null; }
		}
		else return null;
	}

	public BigInteger toBigInteger(Object val) {
		if (val instanceof BigInteger) return (BigInteger)val;
		else if (val instanceof Number) return new BigInteger(((Number)val).toString());
		else if (val instanceof String) {
			try { return new BigInteger((String)val); }
			catch (Exception e) { return null; }
		}
		else return null;
	}

	public String toString(Object val) {
		if (val == null)
			return null;
		else if (val instanceof String)
			return (String)val;
		else if ((val instanceof Date)) {
			return DateFormatUtils.format((Date)val, "yyyyMMddHHmmss");
		}
		else return val.toString();
	}

	public boolean equals(Object o1, Object o2) {
		if (o1 == null && o2 == null)
			return true;
		else {
			return o1 != null ? o1.equals(o2) : o2.equals(o1);
		}
	}

	public BeautyPointSummary beautyPoint() {
		BeautyPointSummary beautyPoint = (BeautyPointSummary) this.context.getVariable(BeautyPointSummary.class.getName());
		//Context에 뷰티포인트 정보가 없을 경우 Session 조회
		if (beautyPoint == null) {
			beautyPoint = SessionUtils.getBeautyPoint(IWebContext.class.cast(this.context).getRequest(), this.pointApi);
		}

		//뷰티 포인트 정보를 취득하지 못한 경우
		if (beautyPoint == null) {
			beautyPoint = BeautyPointSummary.EMPTY;
		}

		IEngineContext.class.cast(this.context).setVariable(BeautyPointSummary.class.getName(), beautyPoint);
		return beautyPoint;
	}

	public CushionPointSummary cushionPoint() {
		CushionPointSummary cushionPoint = (CushionPointSummary) this.context.getVariable(CushionPointSummary.class.getName());
		//Context에 쿠션포인트 정보가 없을 경우 Session 조회
		if (cushionPoint == null) {
			cushionPoint = SessionUtils.getCushionPoint(IWebContext.class.cast(this.context).getRequest(), this.pointApi);
		}

		//뷰티 포인트 정보를 취득하지 못한 경우
		if (cushionPoint == null) {
			cushionPoint = CushionPointSummary.EMPTY;
		}

		IEngineContext.class.cast(this.context).setVariable(CushionPointSummary.class.getName(), cushionPoint);
		return cushionPoint;
	}
}
