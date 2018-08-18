/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.common.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ap.comm.member.vo.MemberSession;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.util.FromEndDateUtils;
import kr.ap.emt.common.vo.AddressVo;
import kr.ap.emt.common.vo.SearchVO;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.display.SearchResult;
import net.g1project.ecp.api.model.sales.display.Suggestion;
import net.g1project.ecp.api.model.sales.guide.FoPushResult;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Ria@g1project.net
 * @since {version}
 *
 */
@RestController
@RequestMapping("/common")
public class CommonRestController extends AbstractController {

    
	@RequestMapping("/todayNotification")
    public ResponseEntity<?> todayNotification() {
		HashMap<String, Object> result = new HashMap<String, Object>();


		FoPushResult foPushResult = guideApi.getFoPushes(0, null, FromEndDateUtils.initFromDate(new Date()), new Date());

		result.put("foPushResult", foPushResult);
		return ResponseEntity.ok(result);

    }
	
	@RequestMapping("/getLoginMemberInfo")
    public Map<String, Object> getLoginMemberInfo() {
		
		Map <String, Object> memberMap = new HashMap<String, Object>();
		
		MemberSession ms = getMemberSession();

		String id = "";
		String name = "";
		Long memberSn = 0L;

		if( ms != null && ms.getMember() != null) {
			id = StringUtils.defaultString( ms.getMember().getMemberId());
			name = StringUtils.defaultString( ms.getMember().getName().getName1());
			memberSn = ms.getMember_sn();
		}
            
		memberMap.put("id", id);
		memberMap.put("name", name);
		memberMap.put("memberSn", memberSn);
		
		return memberMap;
		

    }
	
	/**
	 * 인기 검색어 조회
	 * @return
	 */
	@RequestMapping("/popularSearches")
	public ResponseEntity<?> popularSearches() {
        HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("popularSearchWord", displayApi.getPopularSearches(10)); //인기검색어 조회
		return ResponseEntity.ok(result);
	}
	
	
	@RequestMapping("/searchEverything")
    public ResponseEntity<?> searchEverything(SearchVO searchVO) {
		HashMap<String, Object> result = new HashMap<String, Object>();


		SearchResult searchEverything
			= displayApi.searchEverything(
					 searchVO.getToSearchFor()
					, searchVO.getToBeExcluded()
					, searchVO.getExcludeSoldOut()
					, searchVO.getProdSort()
					, searchVO.getLimitProd()
					, searchVO.getProdReviewSort()
					, searchVO.getLimitReview()
					, searchVO.getLimitArticle()
					, searchVO.getLimitPlan()
					, searchVO.getIncludeFilters()
					, searchVO.getDisplayCateDepth()
			);

		result.put("everything", searchEverything);
		return ResponseEntity.ok(result);
    }
	
	@RequestMapping("/searchProdList")
    public ResponseEntity<?> searchProdList(SearchVO searchVO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
            

		OnlineProdList searchProdList
			= displayApi.searchProdList(
					  searchVO.getToSearchFor()
					, searchVO.getToBeExcluded()
					, searchVO.getExcludeSoldOut()
					, searchVO.getProdSort()
					, searchVO.getOffset()
					, searchVO.getLimit()
					, searchVO.getIncludeFilters()
					, searchVO.getDisplayCateDepth()
					, searchVO.getDisplayCate()
					, searchVO.getBrand()
					, searchVO.getFlag()
					, searchVO.getAttr()
					, searchVO.getPriceRange()
			);

		result.put("everything", searchProdList);
		return ResponseEntity.ok(result);

    }
	
	@RequestMapping("/searchAutocomplete")
    public ResponseEntity<?> searchAutocomplete(SearchVO searchVO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
            

		List<String> autocomplete
			= displayApi.autocomplete(
					  searchVO.getLimit()
					, searchVO.getPrefix()
			);

		result.put("everything", autocomplete);
		return ResponseEntity.ok(result);
    }
	
	/**
	 * @param searchVO
	 * @return
	 */
	@RequestMapping("/searchSuggest")
    public ResponseEntity<?> searchSuggest(SearchVO searchVO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
            
		List<Suggestion> suggest
			= displayApi.suggest(
					  searchVO.getLimit()
					, searchVO.getPrefix()
			);

		result.put("everything", suggest);
		return ResponseEntity.ok(result);
    }
	
	
	/**
	 * 상품평 검색
	 * @param searchVO
	 * @return
	 */
	@RequestMapping("/searchReviewList")
    public ResponseEntity<?> searchReviewList(SearchVO searchVO) {
		HashMap<String, Object> result = new HashMap<String, Object>();

			return ResponseEntity.ok(
					displayApi.searchProdReviewList(
						 searchVO.getToSearchFor()
						,searchVO.getToBeExcluded()
						,searchVO.getProdReviewTypeCodes() //prodReviewTypeCodes
						,searchVO.getProdReviewSort()		//prodReviewSort
						,searchVO.getScopes()				//scopes
						,searchVO.getOffset()
						,searchVO.getLimit())
			);
    }
	
	/**
	 * 아티클 검색
	 * @param searchVO
	 * @return
	 */
	@RequestMapping("/searchArticleList")
    public ResponseEntity<?> searchArticleList(SearchVO searchVO) {
		HashMap<String, Object> result = new HashMap<String, Object>();

		return ResponseEntity.ok(
				displayApi.searchArticleList(
				 searchVO.getToSearchFor()
				,searchVO.getToBeExcluded()
				,searchVO.getOffset()
				,searchVO.getLimit())
		);
    }
	
	/**
	 * 기획전시 검색
	 * @param searchVO
	 * @return
	 */
	@RequestMapping("/searchPlanDisplayList")
    public ResponseEntity<?> searchPlanDisplayList(SearchVO searchVO) {
		HashMap<String, Object> result = new HashMap<String, Object>();
            
		return ResponseEntity.ok(
				displayApi.searchPlanDisplayList(
					 searchVO.getToSearchFor()
					,searchVO.getToBeExcluded()
					,searchVO.getOffset()
					,searchVO.getLimit())
			);
    }
	
	/***
	 * 컬러팩토리 측정데이터의 정보 받아오는 API 
	 * @param legacyModelCodes  레거시 코드 목록 
	 * @method GET
	 * @return 
	 */
	@RequestMapping("/getWithLegacyModelCodes")
	public ResponseEntity<?> legacyModelCodes(String legacyModelCodes) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
		return ResponseEntity.ok(displayApi.getWithLegacyModelCodesProdList(legacyModelCodes));
	}
	
	/**
	 * ET007: 개인정보 수집 이용 동의 (필수)
	 * ET008: 개인정보 취급 위탁에 대한 동의 (필수)
	 * @param termCode
	 * @return
	 */
	@RequestMapping("/colorPickingPolicy")
	public ResponseEntity<?> colorPickinPolicy(String termCode) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
		result.put("result", termsApi.getTerms(termCode));

		return ResponseEntity.ok(result);

	}
	
	/**
	 * 약관
	 * @param termCode
	 * @return
	 */
	@RequestMapping("/policy")
	public ResponseEntity<?> policy(String termCode) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
		result.put("result", termsApi.getTerms(termCode));

		return ResponseEntity.ok(result);
	}

	
	@RequestMapping("/extendSessionTime")
    public ResponseEntity<?> extendSessionTime(HttpServletRequest request) {
		HashMap<String, Object> result = new HashMap<String, Object>();
        result.put("result", HttpStatus.OK);
        return ResponseEntity.ok(result);
    }
	
	/**
	 * 주소 검색
	 * @param keyword
	 * @return
	 */
	@RequestMapping("/getAddresses")
	public ResponseEntity<?> getAddresses(@RequestBody AddressVo addressVo, HttpServletRequest req) throws IOException {


		String apiUrl = env.getProperty("juso.api.base-url");

		String confmKey = env.getProperty("juso.api.confmKey");

		URL url = new URL(apiUrl+addressVo.getAddressUrl()+"confmKey="+confmKey);

		StringBuffer sb = new StringBuffer();
		try (BufferedReader br = new BufferedReader(new InputStreamReader(url.openStream(),"UTF-8"))) {

			String tempStr = null;
			while (true) {
				tempStr = br.readLine();
				if (tempStr == null) break;
				sb.append(tempStr);

			}

		}
         	
		return ResponseEntity.ok(sb.toString());
	}

}
