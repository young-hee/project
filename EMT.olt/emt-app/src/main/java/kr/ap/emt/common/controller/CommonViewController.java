/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.common.controller;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.ap.bbs.IrList;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;
import net.g1project.ecp.api.model.sales.terms.Terms;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/common")
public class CommonViewController extends AbstractController {

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
	 *
     * @param model
     * @return
     */
    @RequestMapping("/servicePolicy")
    @PageTitle(title = "이용약관")
    public String servicePolicy(Model model) {
    	    	
    	List<Terms> etudeTerms= new ArrayList<Terms>();
    	List<Terms> positionTerms = new ArrayList<Terms>();
    	//Mobile
      
    	if (isMobileDevice()) {

    		etudeTerms = termsApi.getTerms("ET004");
            positionTerms = termsApi.getTerms("ET002");
          
            model.addAttribute("positionTerms", positionTerms.get(0));
        }

        //PC
        if (isPcDevice()) {
        	etudeTerms = termsApi.getTerms("ET004");
        }
    	
        
		model.addAttribute("etudeTerms", etudeTerms.get(0));
		
        
        return "common/policy.1";
    }
    
    @RequestMapping("/personalInfoPolicy")
    @PageTitle(title = "개인정보처리방침")
    public String personalInfoPolicy(Model model) {
    	
        List<Terms> terms = termsApi.getTerms("ET003");

		model.addAttribute("terms", terms.get(0));

        return "common/policy.2";
    }
    
    @RequestMapping("/imageryIntelliPolicy")
    @PageTitle(title = "영상기기관리방침")
    public String imageryIntelliPolicy(Model model, String displayMenuId) {
    	
        List<Terms> terms = termsApi.getTerms("ET005");

		model.addAttribute("terms", terms.get(0));

        return "common/policy.3";
    }
    
    @RequestMapping("/mapPrint")
    @PageTitle(title = "인쇄")
    public String mapPrint(Model model, String displayMenuId) {
    	

        return "common/mapPrint";
    }
    
    @RequestMapping("/emailCollecting")
    @PageTitle(title = "이메일 무단수집 거부")
    public String emailCollecting(Model model, String displayMenuId) {
    	
        List<Terms> terms = termsApi.getTerms("ET006");

		model.addAttribute("terms", terms.get(0));

        return "common/policy.4";
    }

   
    @RequestMapping("/enotice")
    @PageTitle(title = "전자공고")
    public String enotice(Model model, String displayMenuId) {
    	
    	IrList irListResult = bbsApi.getIrs(0, 10);  // default 페이징처리가 없음 
    	
    	model.addAttribute("displayMenuId", displayMenuId);
    	model.addAttribute("irListResult",irListResult);

        return "common/policy.5";
    }
    
    @RequestMapping("/search")
    @PageTitle(title = "검색")
    public String search(Model model, String searchWord) {
    	
    	if(0L != getMemberSn()) {
  			ShoppingMarkPost body = new ShoppingMarkPost();
  			body.setShoppingMarkTgtCode("SearchWord");
  			body.setDisplayMenuSetId(APConstant.EH_DISPLAY_MENU_SET_ID);
  			body.setSearchWord(searchWord);
  			try{
  				shoppingmarkApi.addShoppingHistories(getMemberSn(), body);
  			}catch(Exception e) {
  				e.printStackTrace();
  			}
  		}
    	
        return "common/search";
    }

    @RequestMapping("/searchCategory")
    @PageTitle(title = "카테고리검색")
    public String searchCategory(Model model, String displayMenuId) {
        return "common/search-category";
    }
}
