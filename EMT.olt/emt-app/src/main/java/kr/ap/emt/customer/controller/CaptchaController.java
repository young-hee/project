package kr.ap.emt.customer.controller;

import kr.ap.comm.api.CaptchaAPI;
import kr.ap.comm.util.G1SecureRandom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/captcha")
public class CaptchaController {

	@Autowired
	CaptchaAPI captchaAPI;

	@GetMapping("/getNewCaptchaKey")
	@ResponseBody
	public Map<String, Object> changePwd() {
		Map<String, Object> respMap = new HashMap<String, Object>();
		respMap.put("state", "success");
		respMap.put("captchaKey", G1SecureRandom.getRandomText(10));
		return respMap;
	}
	
	@PostMapping("/checkKeyAndValue")
	@ResponseBody
	public Map<String, Object> checkKeyAndValue(String key, String value) {
		Map<String, Object> respMap = new HashMap<String, Object>();
		respMap.put("state", "success");
		respMap.put("result", captchaAPI.checkKeyValueSimple(key, value));
		return respMap;
	}
	
	@RequestMapping(value = "/getCaptchaImage", method = RequestMethod.GET, produces = "image/jpg")
	public @ResponseBody byte[] getCaptchaImage(String keyword) {
		return captchaAPI.createCaptchaImage(keyword);
	}

	@RequestMapping(value = "/getCaptchaAudio", method = RequestMethod.GET, produces = "audio/mpeg")
	@ResponseBody
	public void getCaptchaAudio(String keyword, HttpServletRequest req, HttpServletResponse resp) {
		captchaAPI.createCaptchaAudio(keyword, req, resp);

	}
	
	
}
