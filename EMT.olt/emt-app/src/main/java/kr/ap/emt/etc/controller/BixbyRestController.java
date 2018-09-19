package kr.ap.emt.etc.controller;

import net.g1project.ecp.api.client.ap.BixbyApi;
import net.g1project.ecp.api.model.ap.bixby.BixbyProductListResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * 삼성 bixby 연동
 */
@RestController
public class BixbyRestController {

	@Autowired
	private BixbyApi bixbyApi;
	
	// AS-IS의 형태와 동일하게 구현한다.
	@PostMapping("/kr/ko/bixByPrdMgt.do")
    public ResponseEntity<?> getProdList(
    		@RequestParam(required=false) String i_sCstmSiteKey, 
    		@RequestParam(required=false) String i_sOptioncd){
		
		BixbyProductListResponse res = bixbyApi.getProdList(i_sCstmSiteKey, i_sOptioncd);
		
		return ResponseEntity.ok(res);
	}
	
}