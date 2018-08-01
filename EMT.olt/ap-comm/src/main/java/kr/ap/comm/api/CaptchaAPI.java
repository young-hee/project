package kr.ap.comm.api;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import nl.captcha.audio.AudioCaptcha;

public interface CaptchaAPI {

	/**
	 *
	 * Simple Captcha
	 *
	 * @param text
	 * @return
	 */
	byte[] createCaptchaImage(String text);

	/**
	 *
	 * Simple Captcha
	 *
	 * @param text
	 * @param resp
	 * @param req
	 * @return
	 */
	void createCaptchaAudio(String text, HttpServletRequest req, HttpServletResponse resp);
	/**
	 * Simple Captcha
	 *
	 * @param key getCaptchaKey 값.
	 * @param value 사용자 리턴값.
	 * @return
	 */
	boolean checkKeyValueSimple(String key, String value);
	
	/**
	 * 카카오 로그인
	 * @param code
	 * @param returnUrl 
	 * @param appId
	 * @param secret 
	 * @return
	 */
	Map<String, String> getKakaoToken(String code, String returnUrl, String appId, String secret);

}
