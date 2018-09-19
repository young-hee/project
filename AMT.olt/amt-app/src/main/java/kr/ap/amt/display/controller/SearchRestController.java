/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.display.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;

import org.apache.commons.collections.IteratorUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.collect.Iterators;
import com.google.common.collect.Lists;

import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.display.OnlineProdSummary;
import net.g1project.ecp.api.model.sales.display.PlanDisplay;
import net.g1project.ecp.api.model.sales.display.PlanDisplaySearchResult;
import net.g1project.ecp.api.model.sales.display.ProdFilterInfo;
import net.g1project.ecp.api.model.sales.display.SearchResult;
import net.g1project.ecp.api.model.sales.display.SearchWordRankChange; 

/**
 * @author Ria@g1project.net
 * @since {version}
 */
@RestController
@RequestMapping("/display/search")
public class SearchRestController extends AbstractController {

	
	/**
	 *  검색어 자동완성
	 * @param limit, query
	 * @return
	 */
	@RequestMapping("/autoWords")
    public ResponseEntity<?> autoWords(int limit, String prefix) {

	    System.out.print("autoComplete > prefix : " + prefix);
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<String> autoWordList = new ArrayList();
        try{
            autoWordList = displayApi.autocomplete(limit, prefix);
        }catch(Exception e) {
            System.out.print("    e : " + e.getMessage());
        }
        System.out.println("    rsltCnt : " + autoWordList.size());
		result.put("autoWordList", autoWordList);
		return ResponseEntity.ok(result);
    }
	
	/**
     *  인기검색어
     * @param limit
     * @return
     */
    @RequestMapping("/favoriteWords")
    public ResponseEntity<?> favoriteWords(int limit) {

        System.out.print("favoriteWords");
        HashMap<String, Object> result = new HashMap<String, Object>();
        List<SearchWordRankChange> list = new ArrayList();
        try{
            list = displayApi.getPopularSearchesEx(limit);
        }catch(Exception e) {
            System.out.print("    e : " + e.getMessage());
        }
        System.out.println("    rsltCnt : " + list.size());
        
        /** Dummy *
//        if(list == null || list.size()<=0) {
            SearchWordRankChange swrc;
            
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("배고파");
            swrc.setRank(1);
            swrc.setRankChange(4);
            swrc.setNewEntry(false);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("밥줘");
            swrc.setRank(2);
            swrc.setRankChange(-1);
            swrc.setNewEntry(false);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("삼계탕");
            swrc.setRank(3);
            swrc.setRankChange(-1);
            swrc.setNewEntry(false);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("부대찌게");
            swrc.setRank(4);
            swrc.setRankChange(-1);
            swrc.setNewEntry(false);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("삼겹살");
            swrc.setRank(5);
            swrc.setRankChange(-1);
            swrc.setNewEntry(false);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("오리백숙");
            swrc.setRank(6);
            swrc.setRankChange(0);
            swrc.setNewEntry(false);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("오소리감투");
            swrc.setRank(7);
            swrc.setRankChange(500);
            swrc.setNewEntry(true);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("마라샹궈");
            swrc.setRank(8);
            swrc.setRankChange(200);
            swrc.setNewEntry(true);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("리지스");
            swrc.setRank(9);
            swrc.setRankChange(0);
            swrc.setNewEntry(false);
            list.add(swrc);
            swrc = new SearchWordRankChange();
            swrc.setSearchWord("차우더");
            swrc.setRank(10);
            swrc.setRankChange(10);
            swrc.setNewEntry(true);
            list.add(swrc);
//        }
        /**********/
        result.put("favoriteWordList", list);
        result.put("favoriteWordAnalDt", new SimpleDateFormat("yyyy.MM.dd").format(new Date()));
        return ResponseEntity.ok(result);
    }
    
    /**
     *  검색 결과
     * @param limit
     * @return
     */
    @RequestMapping("/result")
    public ResponseEntity<?> result(Model model, String query, String prodSort, int offset, int limit, long displayCate, String priceRange, String flag, String attr) {
        
        System.out.println(this.getClass().getName() + ".result");
        System.out.println("  - query    : " + query);
        System.out.println("  - prodSort : " + prodSort);
        System.out.println("  - offset   : " + offset);
        System.out.println("  - limit    : " + limit);
        System.out.println("  - displayCate : " + displayCate);
        System.out.println("  - priceRange  : " + priceRange);
        System.out.println("  - flag  : " + flag);
        System.out.println("  - attr     : " + attr);
        
        HashMap<String, Object> result = new HashMap<String, Object>();
     
        /** SearchEverything
//      String[] toSearchFor = new String[] {"query1", "query2"};
//      String[] toBeExcluded = new String[] {"excl query 1", "excl query 2"};
        String toSearchFor = "";
        String toBeExcluded = "";
        
        boolean excludeSoldOut = false;
        String prodSort = "";  //상품 정렬옵션
        int limitProd = 10000;
        String prodReviewSort = "";   //상품리뷰 정렬옵션
        int limitReview = 10000;
        int limitArticle = 10000;
        int limitPlan = 10000;
        
        boolean includeFilters = true;
        int displayCateDepth = 1;
        
        SearchResult result = displayApi.searchEverything(toSearchFor, toBeExcluded, excludeSoldOut, prodSort, limitProd, prodReviewSort, limitReview, limitArticle, limitPlan, includeFilters, displayCateDepth);
        OnlineProdList onlineProdList = result.getProds();
        ProdFilterInfo prodFilterInfo = onlineProdList.getFilter();
        */
        
        String toSearchFor = query;//"";
        String toBeExcluded = "";
        boolean excludeSoldOut = false;
        boolean includeFilters = true;
        int displayCateDepth = 1;
        long brand = -1;
        
//        SearchResult allList = displayApi.searchEverything(toSearchFor, toBeExcluded, excludeSoldOut, prodSort, limit, "", limit, limit, limit, includeFilters, displayCateDepth);
        
        OnlineProdList onlineProdList = new OnlineProdList();
        ProdFilterInfo prodFilterInfo = new ProdFilterInfo();
        List<OnlineProdSummary> prodList = new ArrayList();
        try{
            Date sDate = new Date();
            onlineProdList = displayApi.searchProdList(toSearchFor, toBeExcluded, excludeSoldOut, prodSort, offset, limit, includeFilters, displayCateDepth, displayCate<0?null:displayCate, brand<0?null:brand, flag, attr, priceRange);
            System.out.println("## get searchProdList..."+(new Date().getTime() - sDate.getTime())+"s");
            prodFilterInfo = onlineProdList.getFilter();
            prodList = onlineProdList.getList();
        }catch(Exception e) {
            
        }

        PlanDisplaySearchResult planAllList = displayApi.searchPlanDisplayList(toSearchFor, toBeExcluded, offset, limit);
        Date cDate = new Date();
        Iterator<PlanDisplay> filteredPlansIterator = planAllList.getList().stream().iterator();//.filter(o->o.getStartDt().before(cDate) && o.getEndDt().after(cDate)).iterator();
        List<PlanDisplay> planList = IteratorUtils.toList(filteredPlansIterator);//Lists.newArrayList(filteredPlansIterator);
        
        List<?> brandList = new ArrayList();
        
        List<String> flags = new ArrayList();
        flags.add("icon_giftpacking");  //선물포장
        flags.add("icon_reco_online");  //온라인한정
        flags.add("icon_type_package"); //묶음판매
        flags.add("icon_type_ps");      //예약판매
        flags.add("icon_member_dc");    //등급할인
        flags.add("icon_membership1");  //통합멤버십교환
        flags.add("icon_reco_outlet");  //아울렛상품
        prodFilterInfo.setFlags(flags);
        
        result.put("prodFilterInfo", prodFilterInfo);
        result.put("prodList", prodList);
        result.put("planList", planList);
        result.put("brandList", brandList);
        result.put("totalCount", onlineProdList.getTotalCount());
        
        return ResponseEntity.ok(result);
    }
	
}
