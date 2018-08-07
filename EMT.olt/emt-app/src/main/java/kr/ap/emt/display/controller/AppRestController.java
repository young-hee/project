/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.display.controller;

import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ap.comm.support.common.AbstractController;
import kr.ap.emt.display.vo.RequestAppInfo;
import net.g1project.ecp.api.model.sales.applications.ApplicationVer;
import net.g1project.ecp.api.model.sales.applications.ExecuteResult;
import net.g1project.ecp.api.model.sales.applications.PostAppInstall;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;

@Controller
@RequestMapping("/application")
public class AppRestController extends AbstractController {

	
	
    /** 앱 버전 체크 
     * @param requestAppinfo
     * @param req
     * @return hashMap 
     */
	@RequestMapping("/getAppVersion")
    @ResponseBody
    public ResponseEntity<?> getApplicationVersion(RequestAppInfo requestAppinfo , HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ApplicationVer applicationVer = applicationsApi.getApplicationVersion(requestAppinfo.getOsType());        	
            result.put("appVer", applicationVer);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/***
	 * 앱 설치 등록
	 * @param requestAppinfo
	 * @param postAppInstall
	 * @return hashMap { "result": true}
	 */
	@RequestMapping("/saveAppInstall")
    @ResponseBody
    public ResponseEntity<?> saveAppInstall(RequestAppInfo requestAppinfo ,PostAppInstall postAppInstall, HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	if(isLoggedIn()) {
        		postAppInstall.setMemberYn("Y");
        	}else {
        		postAppInstall.setMemberYn("N");
        	}
        	postAppInstall.setMemberSn(getMemberSn());
        	ExecuteResult executeResult = applicationsApi.saveAppInstall(requestAppinfo.getOsType(), postAppInstall);        	
            result.put("executeResult", executeResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 * 앱 설치 내용 호출
	 * @param requestAppinfo
	 * @param req
	 * @return hashMap { "result": true}
	 */
	@RequestMapping("/getAppInstall")
    @ResponseBody
    public ResponseEntity<?> getAppInstall(RequestAppInfo requestAppinfo, HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ExecuteResult executeResult = applicationsApi.getAppInstall(requestAppinfo.getOsType(), requestAppinfo.getToken());  	
            result.put("executeResult", executeResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 * 앱 푸쉬 동의 수정
	 * @param requestAppinfo
	 * @param req
	 * @return hashMap 
	 */
	@RequestMapping("/updateAppAgree")
    @ResponseBody
    public ResponseEntity<?> updateAppAgree(RequestAppInfo requestAppinfo, HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	//TODO 빌드 오류로 임시 수정합니다 By pollak
        	//ExecuteResult executeResult = applicationsApi.updateAppAgree(requestAppinfo.getToken(), null);  	
            //result.put("executeResult", executeResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 * 앱 로그인 접속 업데이트
	 * @param requestAppinfo
	 * @param req
	 * @return hashMap 
	 */
	@RequestMapping("/updateAppLogin")
    @ResponseBody
    public ResponseEntity<?> updateAppLogin(RequestAppInfo requestAppinfo, HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ExecuteResult executeResult = applicationsApi.updateAppLogin(requestAppinfo.getToken());  	
            result.put("executeResult", executeResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 * 비 회원 앱 접속 업데이트 
	 * @param requestAppinfo
	 * @param req
	 * @return hashMap 
	 */
	@RequestMapping("/updateAppConnect")
    @ResponseBody
    public ResponseEntity<?> updateAppConnect(RequestAppInfo requestAppinfo, HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {

        	ExecuteResult executeResult = applicationsApi.updateAppConnect(requestAppinfo.getToken());  	
            result.put("executeResult", executeResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 * 토큰으로 푸쉬발송성공여부
	 * @param requestAppinfo
	 * @param req
	 * @return hashMap 
	 */
	@RequestMapping("/updateAppSendSuccess")
    @ResponseBody
    public ResponseEntity<?> updateAppSendSuccess(RequestAppInfo requestAppinfo, HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	ExecuteResult executeResult = applicationsApi.updateAppSendSuccess(requestAppinfo.getToken(), requestAppinfo.getSuccess());  	
            result.put("executeResult", executeResult);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
	/**
	 * 컬러픽킹 상품 제안
	 * 
	 * @param requestAppinfo
	 * @param req
	 * @return
	 */
	@RequestMapping("/getColorPickProd")
    @ResponseBody
    public ResponseEntity<?> getColorPickProd(RequestAppInfo requestAppinfo, HttpServletRequest req) {
      
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
        	
        	OnlineProdList onlineProdList = displayApi.getColorPickProd(requestAppinfo.getRed(), requestAppinfo.getBlue(), requestAppinfo.getBlue(), requestAppinfo.getPeal(), requestAppinfo.getGlossy());  	
            result.put("onlineProdList", onlineProdList);
            
            return ResponseEntity.ok(result);
        } catch (Exception e) {
        	result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }

    }
	
}
