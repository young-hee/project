package kr.ap.comm.api.impl;

import java.awt.Color;
import java.io.*;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.ap.comm.api.CaptchaAPI;
import nl.captcha.Captcha;
import nl.captcha.audio.AudioCaptcha;
import nl.captcha.backgrounds.GradiatedBackgroundProducer;
import nl.captcha.servlet.CaptchaServletUtil;
import nl.captcha.text.producer.TextProducer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

public class CaptchaAPIImpl implements CaptchaAPI {


	protected Logger logger = LoggerFactory.getLogger(getClass());
	
    RestTemplate template = new RestTemplate();
    ObjectMapper mapper = new ObjectMapper();

	@Override
	public Map<String, String> getKakaoToken(String code, String returnUrl, String appId, String secret) {

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded");

        try {
	        logger.info("KAKAO-INIT");
	        
	        MultiValueMap<String, String> params = new LinkedMultiValueMap<>(headers);
	
	        params.add("grant_type", "authorization_code");
	        params.add("client_id", appId);
	        params.add("code", code);
	        params.add("redirect_uri", returnUrl);
	        params.add("client_secret", secret);
	        HttpEntity<MultiValueMap<String,String>> request = new HttpEntity<>(params, headers);
	
	        ResponseEntity<String> response = template.postForEntity("https://kauth.kakao.com/oauth/token", request, String.class);
	        String jsonStr = response.getBody();
	
	        logger.info("KAKAO-RESULT{}", jsonStr);
        
        	Map<String, String> result = new HashMap<String, String>();
        	
            JsonNode root = mapper.readTree(jsonStr);
            String token = root.get("access_token").asText();
            result.put("token", token);
            
            headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

            params = new LinkedMultiValueMap<>(headers);
            request = new HttpEntity<>(params, headers);
            
            response = template.postForEntity("https://kapi.kakao.com/v1/user/me", request, String.class);
            

            root = mapper.readTree(response.getBody());
            String id = root.get("id").asText();
            result.put("id", id);
            return result;
            
        } catch (HttpStatusCodeException e) {
        	logger.error("[KAKAO]" + e.getResponseBodyAsString());
        	logger.error("[KAKAO]" + e.getMessage(), e);
            e.printStackTrace();
        } catch(Exception e) {
        	e.printStackTrace();
        }

		return null;
	}

	@Override
	public byte[] createCaptchaImage(String keyword) {
		String convertKey = swapText(keyword);
		MyTextProducer p = new MyTextProducer(convertKey);
	    
	    Captcha captcha = new Captcha.Builder(120, 40)
	    .addText(p)
	    .addBackground()
	    .addNoise()
	    .addNoise()
	    .addNoise()
	    .addBackground(new GradiatedBackgroundProducer( new Color(50, 50, 50), Color.WHITE))
//	    .gimp()
	    .build();

		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		try {
			ImageIO.write(captcha.getImage(), "png", baos);
			baos.flush();
			byte[] imageInByte = baos.toByteArray();
			baos.close();
			
			return imageInByte;
		} catch (IOException e) {
		}
		return null;
	}
	@Override
	public void createCaptchaAudio(String keyword, HttpServletRequest req, HttpServletResponse resp) {
		String convertKey = swapText(keyword);

		MyTextProducer p = new MyTextProducer(convertKey);
		
		AudioCaptcha ac = new AudioCaptcha.Builder()
    	.addAnswer(p)
    	.addNoise()
    	.build();
		
		CaptchaServletUtil.writeAudio(resp, ac.getChallenge());
		
	}

	@Override
	public boolean checkKeyValueSimple(String keyword, String value) {
		String convertKey = swapText(keyword);
		return convertKey.equals(value);
	}

	private String swapText(String keyword) {
		String convertKey = String.format("%05d",(Math.abs(((keyword.hashCode() / 2) %99999))));
		return convertKey;
	}
	public class MyTextProducer implements TextProducer {
		
		private String keyword;
		
		
		public MyTextProducer(String keyword) {
			super();
			this.keyword = keyword;
		}
		
		
		@Override
		public String getText() {
			return keyword;
		}
	}
}
