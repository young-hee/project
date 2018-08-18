/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.payment.ini;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import javax.net.ssl.HttpsURLConnection;
import javax.servlet.http.HttpServletRequest;

import org.springframework.util.StringUtils;

import com.inicis.inipay.INIpay;
import com.inicis.std.util.HttpUtil;
import com.inicis.std.util.ParseUtil;
import com.inicis.std.util.SignatureUtil;

import kr.ap.emt.payment.vo.PayDTO;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class IniPayment {
	
    //INIPAY 
    //paymethod
    private static final String WCARD = "wcard";	//신용카드
    private static final String BANK = "bank";	//계좌이체
    private static final String VBANK = "vbank";	//가상계좌
    private static final String MOBILE = "mobile"; //휴대폰 결제
    private static final String KAKAO = "onlykakaopay"; //카카오 결제
    private static final String PAYCO = "onlypayco"; //페이코 결제
    
    public static HashMap<String, Object> makeRequestParamMobile(PayDTO payDTO) throws Exception{ 
   
       HashMap<String, Object> map = new HashMap<String, Object>();
        
       //공통 parameter 셋팅       	
        map.put("paymethod", payDTO.getPayMethod());
	   	map.put("P_MID", payDTO.getpMid());	//P_MID 상점아이디 Char(10)*
	   	map.put("P_OID", payDTO.getOid());	//P_OID 주문번호 CHAR(40)*
	   	map.put("P_AMT", payDTO.getPrice());	//P_AMT 거래금액 (,제거) CHAR(8)*
	   	map.put("P_UNAME", payDTO.getBuyerName());	//고객성명 Char(30)*
	   	map.put("P_MNAME", "에뛰드");//TODO : 몰정보//가맹점이름 Char(30)
	   	/*map.put("pNoti", payDTO.getPrice());*/	//기타주문번호 Char(800)
	   	map.put("P_GOODS", payDTO.getRepProdName());	//상품명 (char(80)*
	   	map.put("P_MOBILE", payDTO.getMobile());	//구매자 휴대폰번호 Char(15) 000-0000-0000
	   	map.put("P_EMAIL", payDTO.getEmail());	//구매자 이메일 Char(30) abc@abc.com
	   	//TODO map.put("pTax", null);//부가세
	   	//TODO map.put("pTaxfree", null);//비과세
	   	//TODO map.put("pOfferPeriod", null);//제공기간
	   	
	    // 신용카드 결제
	   	if(WCARD.equals(payDTO.getPayMethod())) {
	   		
	   		if(!StringUtils.isEmpty(payDTO.getGoPayMethod())) {
	   			
	   			//카카오페이, 페이코 결제인 경우 
	   			if(KAKAO.equals(payDTO.getGoPayMethod())) {
	   				map.put("P_RESERVED", "d_kakaopay=Y");	
	   			} else if(PAYCO.equals(payDTO.getGoPayMethod())) {
	   				map.put("P_RESERVED", "d_payco=Y");
	   			}
	   			
	   			//인증결과 받을 URL
		   		map.put("P_NEXT_URL", payDTO.getSiteDomain() + "/payment/iniPayDrctReturn");
		   		
	   		} else {
	   			
	   			//화면에서 직접 카드선택 후 결제 하기 param 필수
		   		if(!StringUtils.isEmpty(payDTO.getCardCo())) {
		   			map.put("P_CARD_OPTION", "selcode=" + payDTO.getCardCo());	//ex) selcode=13
		   		}
	   			
	   			//인증결과 받을 URL
		   		map.put("P_NEXT_URL", payDTO.getSiteDomain() + "/payment/iniPayReturn");
	   		}
	   	} 
	   	
	   	// 실시간 계좌이체
	   	else if(BANK.equals(payDTO.getPayMethod())) {
	   		
	   		//승인결과 통보 Url
	   		map.put("P_RETURN_URL", payDTO.getSiteDomain() + "/payment/iniComplete");	   		
	   		//결제완료  Url
	   		map.put("P_NOTI_URL", payDTO.getSiteDomain() + "/order/iniPayNoti");
	   		
	   	}
	   	
	   	// 가상계좌
	   	else if(VBANK.equals(payDTO.getPayMethod())) {
	   		//인증결과 받을 URL
	   		map.put("P_NEXT_URL", payDTO.getSiteDomain() + "/payment/iniPayReturn");
	   		//결제완료  Url
	   		map.put("P_NOTI_URL", payDTO.getSiteDomain() + "/order/iniPayNoti");
	   		
	   		// 기획자 확인 필요 (하기 선택사항 필수아님)
	   		// TODO : 가상계좌 입금기한 날짜
	   		int depositWatingHours = 24;
	   		if(payDTO.getDepositWatingHours()!= null && payDTO.getDepositWatingHours() > 0) {
	   			depositWatingHours = payDTO.getDepositWatingHours();
	   		}
	   		map.put("P_VBANK_DT", addHHDateString(depositWatingHours));
	   		map.put("P_VBANK_TM", "2359");
	   	}
	   	
	   	// 휴대폰 결제
	   	else if(MOBILE.equals(payDTO.getPayMethod())) {
	   		
	   		//인증결과 받을 URL
	   		map.put("P_NEXT_URL", payDTO.getSiteDomain() + "/payment/iniPayReturn");
	   		
	   		// 컨텐츠 일 경우 : 1, 실물일 경우 : 2
	   		map.put("P_HPP_METHOD", "2");	//실물
	   	}
	   	
       return map;
   }
    
    public static HashMap<String, Object> makeRequestParam(PayDTO payDTO) throws Exception{ 
    	
        String timestamp = SignatureUtil.getTimestamp();                        
        String currency =  "WON";
        
        //주문번호 (mid + "_" + timestamp)
        //String oid =  payDTO.getpMid() + "_" + SignatureUtil.getTimestamp();
        String oid = payDTO.getOid();
        String price =  payDTO.getPrice().replace(",", "");
        
       /********************************************************************/        
       /*** 2.가맹점 확인을 위한 signKey를 해시값으로 변경 (SHA-256방식 사용) ***/
       String mKey = SignatureUtil.hash(payDTO.getSignKey(), "SHA-256");
       /*************************************************/
       
       /*** 2.signature 생성(필수) ******************************/
       Map<String, String> signParam = new HashMap<String, String>();
       signParam.put("oid",oid);
       signParam.put("price", price);
       signParam.put("timestamp", timestamp);
       // signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
       String signature = SignatureUtil.makeSignature(signParam);
       /*************************************************/
       
       HashMap<String, Object> map = new HashMap<String, Object>();
       map.put("version", "1.0");
       map.put("mid", payDTO.getpMid());
       map.put("oid", oid);
       map.put("goodname", payDTO.getRepProdName());
       map.put("price", price);
       map.put("currency", currency);
       map.put("buyername", payDTO.getBuyerName());
       map.put("buyertel", payDTO.getMobile());
       map.put("buyermail", payDTO.getEmail());
       map.put("timestamp", timestamp);
       map.put("signature", signature);
       map.put("charset", "UTF-8");
       map.put("returnUrl", payDTO.getSiteDomain() + "/payment/iniPayReturnPC");	//TODO : 인증결과 수신 받을 url
       
       //TODO : 요청결제수단 
       //하나의 결제수단만을 제공할 경우 사용함. 생략시 전체 결제 수단 표시
       //에뛰드하우스 필수
       
       //신용카드
       if(WCARD.equals(payDTO.getPayMethod())) {
    	   
    	   if(!StringUtils.isEmpty(payDTO.getGoPayMethod())) {
    		   
    		   map.put("acceptmethod", "cardonly");
	   			
	   			//카카오페이, 페이코 결제인 경우 
	   			if(KAKAO.equals(payDTO.getGoPayMethod())) {	
	   				map.put("gopaymethod", "onlykakaopay");
	   			} else if(PAYCO.equals(payDTO.getGoPayMethod())) {
	   				map.put("gopaymethod", "onlypayco");
	   			}
	   			
	   		} else {
	   		   map.put("gopaymethod", "Card");    	   
	     	   if(!StringUtils.isEmpty(payDTO.getCardCo())) {
	      			map.put("ini_onlycardcode", payDTO.getCardCo());	//카드사 코드 
	      		}
	   		}
    	   
    	   map.put("below1000", "below1000");
       }
       
        // 실시간 계좌이체
	   	else if(BANK.equals(payDTO.getPayMethod())) {
	   		
	   		map.put("gopaymethod", "DirectBank");
	   		map.put("acceptmethod", "no_receipt");	//현금영수증 미발행
	   		
	   	}
       
       // 가상계좌이체
	   	else if(VBANK.equals(payDTO.getPayMethod())) {
	   		
	   		map.put("gopaymethod", "VBank");
	   		//acceptmethod make
	   		int depositWatingHours = 24;
	   		if(payDTO.getDepositWatingHours()!= null && payDTO.getDepositWatingHours() > 0) {
	   			depositWatingHours = payDTO.getDepositWatingHours();
	   		}
	   		String depositDate = addHHDateString(depositWatingHours);
	   		map.put("acceptmethod", "vbank(" + depositDate + "2359" + ")");
	   		//map.put("acceptmethod", "va_receipt");	//현금영수증 신청 ui 출력여부
	   		
	   	}
       
       //모바일 결제
       else if(MOBILE.equals(payDTO.getPayMethod()))  {
    	   map.put("gopaymethod", "HPP");
    	   map.put("acceptmethod", "HPP(2)");	// 컨텐츠 일 경우 : 1, 실물일 경우 : 2
       }
       
       // 결제창 닫기처리 URL
       map.put("closeUrl", payDTO.getSiteDomain() + "/payment/close");
       
       //팝업처리 URL
       map.put("popupUrl", payDTO.getSiteDomain() + "/payment/popup");
       
       map.put("mKey", mKey);
       map.put("signKey", payDTO.getSignKey());
       map.put("siteDomain", payDTO.getSiteDomain());
       	
        return map;
    }
    
    public static HashMap<String, String> commonPaymentBase(HttpServletRequest request) throws Exception{
       HashMap<String, String> map = new HashMap<String, String>();
      
       try{
           //#############################
           // 인증결과 파라미터 일괄 수신
           //#############################
           System.out.println(">>> INIpay Start ...<<<");
           System.out.println(">>> 인증결과 파라미터 일괄 수신 <<<");
           
           request.setCharacterEncoding("UTF-8");
           Map<String,String> paramMap = new Hashtable<String,String>();
           Enumeration elems = request.getParameterNames();
           String temp = "";

           while(elems.hasMoreElements()){
               temp = (String) elems.nextElement();
               paramMap.put(temp, request.getParameter(temp));
           }
           System.out.println(">>> paramMap : " + paramMap.toString());
           System.out.println(">>> 인증코드 : " + paramMap.get("resultCode"));
           
           //#####################
           // 인증이 성공일 경우만
           //#####################
           if("0000".equals(paramMap.get("resultCode"))){
               System.out.println(">>> 인증성공/승인요청 <<<");
               
               //############################################
               // 1.전문 필드 값 설정(***가맹점 개발수정***)
               //############################################
               String mid = paramMap.get("mid");                       // 가맹점 ID 수신 받은 데이터로 설정
               String signKey = paramMap.get("signKey");            // 가맹점에 제공된 키(이니라이트키) (가맹점 수정후 고정) !!!절대!! 전문 데이터로 설정금지
               String timestamp = SignatureUtil.getTimestamp();        // util에 의해서 자동생성
               String charset = "UTF-8";                               // 리턴형식[UTF-8,EUC-KR](가맹점 수정후 고정)
               String format = "JSON";                                 // 리턴형식[XML,JSON,NVP](가맹점 수정후 고정)
               String authToken = paramMap.get("authToken");           // 취소 요청 tid에 따라서 유동적(가맹점 수정후 고정)
               String authUrl = paramMap.get("authUrl");               // 승인요청 API url(수신 받은 값으로 설정, 임의 세팅 금지)
               String netCancel = paramMap.get("netCancelUrl");        // 망취소 API url(수신 받은 값으로 설정, 임의 세팅 금지)
               String ackUrl = paramMap.get("checkAckUrl");            // 가맹점 내부 로직 처리후 최종 확인 API URL(수신 받은 값으로 설정, 임의 세팅 금지)      
               String cardnum = paramMap.get("cardnum");               //갤러리아 카드번호(카드끝자리 '*' 처리) 2016-01-12
                           
               //#####################
               // 2.signature 생성
               //#####################
               Map<String, String> signParam = new HashMap<String, String>();
               signParam.put("authToken",  authToken);     // 필수
               signParam.put("timestamp",  timestamp);     // 필수
               
               // signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
               String signature = SignatureUtil.makeSignature(signParam);
               String price = "";  // 가맹점에서 최종 결제 가격 표기 (필수입력아님)
               
               // 1. 가맹점에서 승인시 주문번호가 변경될 경우 (선택입력) 하위 연결.  
               // String oid = "";             
         
               //#####################
               // 3.API 요청 전문 생성
               //#####################
               Map<String, String> authMap = new Hashtable<String, String>();
               authMap.put("mid"             ,mid);              // 필수
               authMap.put("authToken"   ,authToken);     // 필수
               authMap.put("signature"     ,signature);      // 필수
               authMap.put("timestamp"   ,timestamp);     // 필수
               authMap.put("charset"       ,charset);        // default=UTF-8
               authMap.put("format"        ,format);          // default=XML
               //authMap.put("price"        ,price);            // 가격위변조체크기능 (선택사용)
         
               System.out.println(">>> 승인요청 API 요청 <<<");

               HttpUtil httpUtil = new HttpUtil();
               try{
                   //#####################
                   // 4.API 통신 시작
                   //#####################
                   System.out.println(">>> API 통신 시작 <<<");
                   String authResultString = "";
                   authResultString = httpUtil.processHTTP(authMap, authUrl);
                   
                   //############################################################
                   //5.API 통신결과 처리(***가맹점 개발수정***)
                   //############################################################
                   System.out.println(">>> 승인 API 결과 <<<");
                   String test = authResultString.replace(",", "&").replace(":", "=").replace("\"", "").replace(" ","").replace("\n", "").replace("}", "").replace("{", "");
                   //out.println("<pre>"+authResultString.replaceAll("<", "&lt;").replaceAll(">", "&gt;")+"</pre>");
                   
                   Map<String, String> resultMap = new HashMap<String, String>();
                   resultMap = ParseUtil.parseStringToMap(test); //문자열을 MAP형식으로 파싱
                   System.out.println(">>> 전체데이터 확인 : " + resultMap);
                   
                   /*************************  결제보안 강화 2016-05-18 START ****************************/
                   Map<String , String> secureMap = new HashMap<String, String>();
                   secureMap.put("mid", mid);
                   secureMap.put("tstamp", timestamp);
                   secureMap.put("MOID", resultMap.get("MOID"));
                   secureMap.put("TotPrice", resultMap.get("TotPrice"));
                   
                   // signature 데이터 생성 
                   String secureSignature = SignatureUtil.makeSignatureAuth(secureMap);
                   /*************************  결제보안 강화 2016-05-18 END ****************************/

                   if("0000".equals(resultMap.get("resultCode")) && secureSignature.equals(resultMap.get("authSignature")) ){  //결제보안 강화 2016-05-18
                      /*****************************************************************************
                      * 여기에 가맹점 내부 DB에 결제 결과를 반영하는 관련 프로그램 코드를 구현한다.  
                        [중요!] 승인내용에 이상이 없음을 확인한 뒤 가맹점 DB에 해당건이 정상처리 되었음을 반영함
                                                     처리중 에러 발생시 망취소를 한다.
                      ******************************************************************************/
                       System.out.println("**************** 거래성공(거래내역 정보) ****************");
                       System.out.println(">>> 거래성공 결과코드  : " + resultMap.get("resultCode"));
                       System.out.println(">>> 거래성공 결과내용 : " + resultMap.get("resultMsg"));
                       System.out.println(">>> 거래 번호 : " + resultMap.get("tid"));
                       System.out.println(">>> 결제방법(지불수단) : " + resultMap.get("payMethod"));
                       System.out.println(">>> 결제완료금액 : " + resultMap.get("TotPrice"));
                       System.out.println(">>> 주문 번호 : " + resultMap.get("MOID"));
                       System.out.println(">>> 승인날짜 : " + resultMap.get("applDate"));
                       System.out.println(">>> 승인시간 : " + resultMap.get("applTime"));
                       System.out.println("***********************************************");
                       
                       map.putAll(resultMap);
                       
                   } else {
                       System.out.println("**************** 거래실패(결과정보) ****************");
                       System.out.println(">>> 거래실패 결과코드  : " + resultMap.get("resultCode"));
                       System.out.println(">>> 거래실패 결과내용 : " + resultMap.get("resultMsg"));
                       System.out.println(">>> 거래 번호 : " + resultMap.get("tid"));
                       System.out.println(">>> 결제방법(지불수단) : " + resultMap.get("payMethod"));
                       System.out.println(">>> 결제완료금액 : " + resultMap.get("TotPrice"));
                       System.out.println(">>> 주문 번호 : " + resultMap.get("MOID"));
                       System.out.println(">>> 승인날짜 : " + resultMap.get("applDate"));
                       System.out.println(">>> 승인시간 : " + resultMap.get("applTime"));
                       System.out.println("********************************************");
                       
                       map.put("resultCode", resultMap.get("resultCode"));
                       map.put("resultMsg", resultMap.get("resultMsg"));
                       map.put("tid", resultMap.get("tid"));
                       map.put("payMethod", resultMap.get("payMethod"));
                       map.put("TotPrice", resultMap.get("TotPrice"));
                       map.put("MOID", resultMap.get("MOID"));
                       map.put("applDate", resultMap.get("applDate"));
                       map.put("applTime", resultMap.get("applTime"));
                       
                       //결제보안키가 다른 경우
                       if (!secureSignature.equals(resultMap.get("authSignature"))) {
                           //결과정보
                           System.out.println("****** 결제보안키가 다른경우 ******");
                           System.out.println(">>> 결과내용 : 데이터 위변조 체크 실패");
                           System.out.println("*************************");
                           map.put("authSignatureMsg", "데이터 위변조 체크 실패");
                           //망취소
                           if ("0000".equals(resultMap.get("resultCode"))) {
                               throw new Exception("데이터 위변조 체크 실패");
                           }
                       }
                   }
                   // 수신결과를 파싱후 resultCode가 "0000"이면 승인성공 이외 실패
                   // 가맹점에서 스스로 파싱후 내부 DB 처리 후 화면에 결과 표시
                   // payViewType을 popup으로 해서 결제를 하셨을 경우
                   // 내부처리후 스크립트를 이용해 opener의 화면 전환처리를 하세요
                   //throw new Exception("강제 Exception");
               } catch (Exception ex) {
                   //####################################
                   // 실패시 처리(***가맹점 개발수정***)
                   //####################################
                   //---- db 저장 실패시 등 예외처리----//
                   System.out.println(ex);
                   //#####################
                   // 망취소 API
                   //#####################
                   String netcancelResultString = httpUtil.processHTTP(authMap, netCancel);    // 망취소 요청 API url(고정, 임의 세팅 금지)
                   System.out.println("## 망취소 API 결과 ##");
                   // 취소 결과 확인
                   System.out.println("<p>"+netcancelResultString.replaceAll("<", "&lt;").replaceAll(">", "&gt;")+"</p>");
               }
               
           }else{
               //#############
               // 인증 실패시
               //#############
               System.out.println("<br/>");
               System.out.println("####인증실패####");
               System.out.println("<p>"+paramMap.get("resultCode")+"</p>");
               System.out.println("<p>"+paramMap.toString()+"</p>");
               map.put("resultCode", paramMap.get("resultCode"));
               map.put("resultMsg", paramMap.get("resultMsg"));
               
           }

       }catch(Exception e){
           System.out.println(e);
       }

        return map;
   }
    
    public static HashMap<String, String> commonPaymentBaseMobile(String pMid, HttpServletRequest request) throws Exception{
    	HashMap<String, String> resultMap = new HashMap<String,String>();
    	
        try{
            //#############################
            // 인증결과 파라미터 일괄 수신
            //#############################
            System.out.println(">>> INIpay Start ...<<<");
            System.out.println(">>> 인증결과 파라미터 일괄 수신 <<<");
            
            //request.setCharacterEncoding("UTF-8");
            Map<String,String> paramMap = new Hashtable<String,String>();
            Enumeration elems = request.getParameterNames();
            String temp = "";

            while(elems.hasMoreElements()){
                temp = (String) elems.nextElement();
                paramMap.put(temp, request.getParameter(temp));
            }
            System.out.println(">>> paramMap : " + paramMap.toString());
            System.out.println(">>> 인증상태 : " + paramMap.get("P_STATUS"));	//성공시 00, 그외 실패
            
            //모바일 인증결과 parameter 정의
            //P_STATUS 인증상태 성공시 00, 그외 실패
            //P_TID 인증거래번호 Char(40) 인증성공시에만 반환
            //P_AMT 거래금액
            //P_REQ_URL 승인요청 url
            //P_RMESG1 결과메세지
            //P_NOTI 기타주문정보 (최초 거래시 주문정보에 셋팅시 그값을 그대로 리턴)
            //P_TID=, P_NOTI=, P_AMT=120, P_STATUS=01, P_RMESG1=����ڰ� ������ ����ϼ̽��ϴ�., P_REQ_URL=https://ksmobile.inicis.com/smart/pay_req_url.php
            
            //#####################
            // 인증이 성공일 경우만
            //#####################
            if("00".equals(paramMap.get("P_STATUS")) && !StringUtils.isEmpty(paramMap.get("P_TID"))){
                System.out.println(">>> 인증성공/승인요청 <<<");
                
                String authUrl = paramMap.get("P_REQ_URL");	//요청 url
                String data = makeMobileConfirmParam(paramMap.get("P_TID"), pMid);
                authUrl = authUrl + data;
                
                //#####################
                // 승인 요청
                //#####################
                
                System.out.println(">>> 승인요청  <<<");
                
                HttpURLConnection conn = null;
        		InputStream inStream = null;
                DataOutputStream outStream = null;
                
                try {
        			String url = authUrl;     

                    conn = (HttpsURLConnection)  new URL(url).openConnection();

                    conn.setDoInput(true); 
                    conn.setDoOutput(true); 
                    conn.setUseCaches(false); 

                    conn.setConnectTimeout(5000);
                    conn.setReadTimeout(3000);

                    conn.setRequestMethod("POST");
                    // 접속
                    conn.connect();

                    outStream = new DataOutputStream(conn.getOutputStream());
                    outStream.flush();
                    outStream.close();

                    // 승인결과 Response Status Code
                    int resStatCode = conn.getResponseCode();
                    if (200 == resStatCode) { // HTTP Status-Code 200: OK.
                        
                        inStream = conn.getInputStream();
                        BufferedReader bReader = new BufferedReader(new InputStreamReader(inStream, "utf-8"));
                        String readLine = "";

                        while ((readLine = bReader.readLine()) != null) {
                        	String[] keyValue = readLine.split("&");
                        	for(int i = 0; i < keyValue.length; i++){
                        		String value = keyValue[i];
                            	String[] setVal = value.split("=");
                            	if(setVal.length > 1){
                            		resultMap.put(value.split("=")[0], value.split("=")[1]);
                            	}else{
                            		resultMap.put(value.split("=")[0], "");
                            	}
                        	}
                        }

                        bReader.close();
                        inStream.close();
                        
                        System.out.println(">> 승인 결과 데이터 확인 : " + resultMap);
                        
                        resultMap.put("resultCode", resultMap.get("P_STATUS"));
                        if("00".equals(resultMap.get("P_STATUS"))){	//승인 성공
                        	
                        	System.out.println(">>> 승인성공 결과 데이터 확인 : " + resultMap);
        				}
                       
                    } else {
                    	resultMap.put("resultCode", "99");
                    	
                    }
                } catch (SocketTimeoutException ste) {
                	ste.printStackTrace();
                	System.out.println("test socketTimeOut");
                	resultMap.put("resultCode", "99");
                	resultMap.put("P_RMESG1", "socketTimeOut");
                	
                	
                } catch (IOException ie) {
                	ie.printStackTrace();
                	System.out.println("test ioException");
                	resultMap.put("resultCode", "99");
                	resultMap.put("P_RMESG1", "ioException");
                	
                	
                } catch (Exception e) {
                	e.printStackTrace();
                	System.out.println("test Exception");
                	resultMap.put("resultCode", "99");
                	resultMap.put("P_RMESG1", "Exception");
                	
                	
                } finally {
                	try {
                        if (outStream != null) {
                            outStream.close();
                        }
                        if (inStream != null) {
                            inStream.close();
                        }
                    } catch (IOException ie) {
                        ie.printStackTrace();
                    }
                    if (conn != null) {
                        conn.disconnect();
                    }
                }
                
            
   
            }else{
                //#############
                // 인증 실패시
                //#############
                System.out.println("<br/>");
                System.out.println("####승인실패####");
                resultMap.put("resultCode", paramMap.get("P_STATUS"));
                resultMap.put("P_RMESG1", paramMap.get("P_RMESG1"));
                System.out.println("<p>"+resultMap.get("resultCode")+"</p>");
                System.out.println("<p>"+paramMap.toString()+"</p>");
            }

        }catch(Exception e){
            System.out.println(e);
            resultMap.put("P_RMESG1", "test message 승인 실패");
        }

         return resultMap;
    }
    
    public static Map<String, String> iniCancel(HashMap<String, String> paramMap) throws Exception {
    	
     /***************************************
	  * INIpay 클래스의 인스턴스 생성 *
	  ***************************************/
      INIpay inipay = new INIpay();
    	
      /*********************
	  * 2. 취소 정보 설정 *
	  *********************/
      inipay.SetField("inipayhome", paramMap.get("inipayhome"));	// 이니페이 홈 디렉토리 (절대경로로 설정)
      inipay.SetField("type", "cancel");                            // 고정 (절대 수정 불가)
      inipay.SetField("debug", "false");                            // 로그모드("true"로 설정하면 상세로그가 생성됨.)
      inipay.SetField("mid", paramMap.get("mid"));         			// 상점아이디
      inipay.SetField("admin", paramMap.get("admin"));              // 상점 키패스워드 (비대칭키)
      inipay.SetField("cancelreason", "02" );   					// 오류
      inipay.SetField("tid",  paramMap.get("P_TID"));         		// 취소할 거래의 거래아이디
      inipay.SetField("cancelmsg", paramMap.get("cancelmsg") );   	// 취소사유
      inipay.SetField("crypto", "execure");						    // Extrus 암호화모듈 사용(고정)

      /****************
       * 3. 취소 요청 *
       ****************/
    	inipay.startAction();
    	
       /*****************
    	* 4. 결과확인
    	*****************/
    	
    	// 취소결과 parameter 정의         
        // 결과코드 : inipay.GetResult("ResultCode") ("00"이면 취소 성공)
        // 결과내용 : inipay.GetResult("ResultMsg") (취소결과에 대한 설명)
        // 취소날짜 : inipay.GetResult("CancelDate") (YYYYMMDD)
        // 취소시각 : inipay.GetResult("CancelTime") (HHMMSS)
        // 현금영수증 취소 승인번호 : inipay.GetResult("CSHR_CancelNum")
        // (현금영수증 발급 취소시에만 리턴됨)
    	
    	if(inipay.GetResult("ResultCode").equals("00")) {
    		System.out.println(inipay.GetResult("ResultMsg"));
    	} 
    	
    	Map<String,String> result = new HashMap<String,String>();
    	
    	result.put("ResultCode", inipay.GetResult("ResultCode"));
    	result.put("ResultMsg", inipay.GetResult("ResultMsg"));
    	result.put("CancelDate", inipay.GetResult("CancelDate"));
    	result.put("CancelTime", inipay.GetResult("CancelTime"));
    	
    	return result;
    	
    } 
    
    
    private static String makeMobileConfirmParam(String pTid, String pMid) {
    	return "?P_TID=" + pTid + "&P_MID=" + pMid;
    }
    
    private static String addHHDateString(int addHour) {
    	
    	String FORMAT = "yyyyMMdd";
    	Calendar calendar = Calendar.getInstance();
    	calendar.setTime(new Date());
    	calendar.add(Calendar.HOUR, addHour);
    	
    	Date calculDate = calendar.getTime();
    	
    	return format(calculDate, FORMAT);

    }
    
    private static String format(Date date, String FORMAT){
    	
    	SimpleDateFormat simpleDateFormat = new SimpleDateFormat(FORMAT);
    	return simpleDateFormat.format(date);
    }
    
}