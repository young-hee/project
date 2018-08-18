package kr.ap.comm.support.constants;


public class APConstant {

	/**
	 * 온라인 사이트 몰 코드.
	 */
	public static final String OS_CH_CD = "030";

	/**
	 * 뷰티포인트
	 */
	public static final String BT_CH_CD = "000";

	/**
	 * 적립쿠폰
	 */
	public static final String CP_CH_CD = "032";


	/**
	 * 에뛰드 몰 코드.
	 */
	public static final String EH_CH_CD = "035";
	/**
	 * 에뛰드 몰 이름.
	 */
	public static final String EH_CH_NAME = "에뛰드하우스";
	/**
	 * 에뛰드 POS
	 */
	public static final String EH_POS_CH_CD = "017";
	/**
	 * 에뛰드 몰 매장코드.
	 */
	public static final String EH_PRTN_ID = "12000515";

	/**
	 * AP몰 채널 코드.
	 */
	public static final String AP_CH_CD = "031";
	/**
	 * AP몰 채널 코드.
	 */
	public static final String AP_NAME = "AP몰";
	
	/**
	 * 오셜록 온라인 채널코드.
	 */
	public static final String OSULLOC_CH_CD = "039";
	
	/**
	 * 리리코스마린플러스 온라인 채널코드.
	 */
	public static final String LLCOS_CH_CD = "043";
	/**
	 * AP 몰 매장코드.
	 */
	public static final String AP_PRTN_ID = "11000494";
	
	//============== regularEventType =============================== 
	
	/**
	 * 룰렛
	 */
	public static final String EVENT_ROULETTE = "Roulette";
	 
	/**
	 * 패키지레터
	 */
	public static final String PACKAGE_LETTER = "PackageLetter";
	
	/**
	 * 출석체크
	 */
	public static final String ATTENDANCE_CHECK = "AttendanceCheck";
	
	/**
	 * 상품체험단신청.
	 */
	public static final String PROD_EXPERIENCE_GRP = "ProdExperienceGrp";
	
	/**
	 * 샘플체험단신청
	*/
	public static final String SAMPLE_EXPERIENCE_GRP = "SampleExperienceGrp";
	 
	//=================== 고객통합
	/**
	 * 정상처리.
	 */
	public static final String RESULT_OK = "ICITSVCOM000";
	/**
	 * 존재하지 않는 통합고객.
	 */
	public static final String NON_EXIST_MEMBER = "ICITSVCOM001";
	/**
	 * 존재하지 않는 정보.
	 */
	public static final String NON_EXIST_INFO = "ICITSVCOM002";
	/**
	 * 시스템 오류.
	 */
	public static final String SYSTEM_ERROR = "ICITSVCOM999";
	/**
	 * 경로고객 존재.
	 */
	public static final String EXIST_CH_JOIN_USER = "ICITSVBIZ157";
	/**
	 * 없음.
	 */
	public static final String NONE = "NONE";
	/**
	 * 본인인증 성공.
	 */
	public static final String KIST0000 = "KIST0000";
	/**
	 * 본인인증 만료.
	 */
	public static final String KIST9201 = "KIST9201";
	
	/**
	 * 에뛰드하우스 전시메뉴세트 아이디 EH01
	 */
	public static final String EH_DISPLAY_MENU_SET_ID = "EH01";
	
	/**
	 * 에뛰드하우스 FO매장행사코드 Color Factory
	 */
	public static final String EH_FO_EVENT_CD_COLOR_FACTORY = "Color Factory";
	
	/**
	 * 에뛰드하우스 FO매장행사코드 Artist Service
	 */
	public static final String EH_FO_EVENT_CD_ARTIST_SERVICE = "Artist Service"; 
	
	/**
	 * 에뛰드하우스 FO매장행사코드 Color Finder
	 */
	public static final String EH_FO_EVENT_CD_COLOR_FINDER = "Color Finder"; 

	/**
	 * 에뛰드하우스 아티클분류전시코드
	 */
	public static final String EH_ARTICLE_CATEID_CH_ETUDE = "chEtude"; 
	/**
	 * 에뛰드하우스 신상품 Flag 코드
	 */
	public static final String EH_NEW_PROD_FLAG = "icon_reco_new";


	/**
	 * AP MALL 전시메뉴세트 아이디 AP01
	 */
	public static final String AP_DISPLAY_MENU_SET_ID = "AP01";
	/**
     * ET001: [필수] 에뛰드하우스 이용약관
	 * 010	: [필수] 뷰티포인트 서비스 이용약관
	 * 020	: [필수] 개인정보 이용 및 수집에 대한 동의
	 * 030	: [선택] 개인정보 이용 및 수집에 대한 동의
	 * 040	: [선택] 개인정보 제3자 제공 동의
	 * 050	: [선택] 개인정보 제3자 제공 동의(외부컨텐츠)
	 * 060	: [선택] 국외이전동의
	 * ET002: 위치정보 이용약관
	 * ET003: 개인정보처리방침
	 * ET004: 서비스 이용약관
	 * ET005: 영상정보처리기기 운영ㆍ관리 방침
	 * ET006: 이메일 무단수집 거부
	 *
	 * 컬러 팩토리 예약
	 * ET007: 개인정보 수집 이용 동의 (필수)
	 * ET008: 개인정보 취급 위탁에 대한 동의 (필수)
	 *
	 * 뷰티즌
	 * ET009: 개인정보 수집/이용 동의(필수)
	 * ET010: 민감정보 수집 및 이용동의(필수)
	 * ET011: 개인정보 취급위탁에 대한 동의(필수)
	 *
	 * 청춘강연
	 * ET012: [필수] 개인정보 수집 및 이용동의
	 * ET013: [필수] 사진 및 동영상 촬영 및 활용 동의
	 * ET014: [필수] 사진 및 동영상 촬영 및 활용 동의
	 */
	
	//공통 footer 이용약관
	public static final String EH_SERVICE_POLICY_TERM_1 = "ET001";
	//공통 fotter [MO] 위치정보 동의 
	public static final String EH_SERVICE_POLICY_TERM_2 = "ET002";
	//개인정보처리방침
	public static final String EH_PERSONAL_INFO_POLICY_TERM_1 = "ET003";
	//영상기기관리방침
	public static final String EH_IMAGERY_INTELLI_POLICY_TERM_1 = "ET005";
	//이메일 무단수집 거부
	public static final String EH_EMAIL_COLLECTING_TERM_1 = "ET006";
	//컬러팩토리 약관 
	public static final String EH_COLOR_FACTORY_TERM_1 = "ET007";
	
	public static final String EH_COLOR_FACTORY_TERM_2 = "ET008";
	//뷰티즌약관 
	public static final String EH_BEAUTIZEN_TERM_1 = "ET009";
	
	public static final String EH_BEAUTIZEN_TERM_2 = "ET010";
	
	public static final String EH_BEAUTIZEN_TERM_3 = "ET011";
	//청춘강연 약관
	public static final String EH_MAKEUP_YOUR_DREAM_TERM_1 = "ET012";
	
	public static final String EH_MAKEUP_YOUR_DREAM_TERM_2 = "ET011";
	
	public static final String EH_MAKEUP_YOUR_DREAM_TERM_3 = "ET013";
	
}
