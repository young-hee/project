/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.display.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ap.comm.config.interceptor.PageTitle;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.display.OnlineProdSummary;
import net.g1project.ecp.api.model.sales.display.ProdFilterInfo;
import net.g1project.ecp.api.model.sales.display.SearchResult;

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@Controller
@RequestMapping("/display")
public class SearchViewController extends AbstractController {

	/**
	 * 검색 결과 페이지 이동
	 * 
	 * @param model
	 * @param 
	 * @return
	 */
	@RequestMapping("/search")
    @PageTitle(title = "검색결과")
    public String result(Model model, String query) {
	    
	    System.out.println(this.getClass().getName() + ".result");
	    System.out.println("  - query : " + query);
	    
	    model.addAttribute("query", query);
	    
        return "display/search";
    }
}
