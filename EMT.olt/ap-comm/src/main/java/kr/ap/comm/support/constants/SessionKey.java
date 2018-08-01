package kr.ap.comm.support.constants;

import org.springframework.stereotype.Component;

@Component
public class SessionKey {

    /**
     * Member
     */
    public static final String LOGIN_USER = "LOGIN_USER";

    public static final String LOGIN_REDIRECT_URI = "LOGIN_REDIRECT_URI";

    public static final String LOGIN_POST_DATA = "LOGIN_POST_DATA";

    public static final String KMS_CHECK_VO = "KMS_CHECK_VO";

    public static final String TEMP_PW_CNG = "TEMP_PW_CNG";

    public static final String SMS_NUM = "SMS_NUM";
    
    public static final String OLD_ID = "OLD_ID";

    /**
     * Sns
     */
    public static final String SNS_TOKEN = "SNS_TOKEN";
    
    public static final String SNS_CODE = "SNS_CODE";

	public static final String SNS_ID = "SNS_ID";

	public static final String SNS_STATE = "SNS_STATE";
	
	/**
	 * MyPoint
	 */
    public static final String PRESENT_INCS_NO = "PRESENT_INCS_NO";

    public static final String PRESENT_PHONE_NO = "PRESENT_PHONE_NO";

    public static final String PRESENT_NAME = "PRESENT_NAME";
    
    public static final String PRESENT_POINT = "PRESENT_POINT";
}
