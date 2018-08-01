package kr.ap.comm.api;

import java.util.Map;

import feign.RequestLine;
import kr.ap.comm.api.vo.WebDBSignupVo;

public interface WebDBApiService {

	@RequestLine(value = "api/member/join.do")
	Map<String, String> createWebDBUser(WebDBSignupVo webDBSignupVo);
	
	@RequestLine(value = "api/member/edit.do")
	Map<String, String> editWebDBUser(WebDBSignupVo webDBSignupVo);
}
