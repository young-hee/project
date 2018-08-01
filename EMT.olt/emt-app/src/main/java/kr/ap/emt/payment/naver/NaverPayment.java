/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.payment.naver;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class NaverPayment {
	
    public static HashMap<String, String> naverPayment(Map<String,String> requestMap) throws Exception{
    	
    	HashMap<String, String> map = new HashMap<String,String>();
    	
    	String naverApiUrl = requestMap.get("apiDomain");
    	String partnerId = requestMap.get("naverPartnerId");    	
    	String clientId = requestMap.get("naverCid");
		String secret = requestMap.get("naverSecret");
		
		String paymentId = requestMap.get("paymentId");	// 네이버페이 결제번호, 최대 50바이트
		String addConfirmUrl = requestMap.get("confirmUrl");	//승인url
		
    	HttpURLConnection conn = null;
		InputStream inStream = null;
        DataOutputStream outStream = null;
        
        String urlParameter = "?paymentId=" + paymentId;
        
        try{
            
        	byte[] postData = paymentId.getBytes( StandardCharsets.UTF_8 );
        	int postDataLength = postData.length;
        	String request = naverApiUrl + "/" + partnerId + addConfirmUrl + urlParameter;
        	URL url = new URL(request);
        	
        	
	        	conn= (HttpURLConnection) url.openConnection();           
	        	
	        	conn.setDoInput(true);
	        	conn.setDoOutput(true);
	        	conn.setUseCaches(false);
	        	conn.setInstanceFollowRedirects(false);
	        	
	        	conn.setConnectTimeout(20000);
                conn.setReadTimeout(20000);
	        	
                conn.setRequestMethod("POST");
	        	conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded"); 
	        	conn.setRequestProperty("charset", "utf-8");
	        	conn.setRequestProperty("X-Naver-Client-Id", clientId);
	        	conn.setRequestProperty("X-Naver-Client-Secret", secret);
	        	conn.setRequestProperty("Content-Length", Integer.toString(postDataLength));
	        	
	        	// 접속
                conn.connect();
                
                outStream = new DataOutputStream(conn.getOutputStream());
                outStream.flush();
                outStream.close();
                
                // 승인결과 Response Status Code
                int resStatCode = conn.getResponseCode();
                if (200 == resStatCode) { // HTTP Status-Code 200: OK.
                    
                    inStream = conn.getInputStream();
                    
                    BufferedReader bReader = new BufferedReader(new InputStreamReader(inStream, "UTF-8"));
                    String readLine = "";

                    while ((readLine = bReader.readLine()) != null) {
                    	
                    	String queryString = readLine.replace("body", "").replace("detail", "").replace(":{", "").replace(",", "&").replace(":", "=").replace("\"", "").replace(" ","").replace("\n", "").replace("}", "").replace("{", "");
                    	String[] keyValue = queryString.split("&");
                    	for(int i = 0; i < keyValue.length; i++){
                    		String value = keyValue[i];
                        	String[] setVal = value.split("=");
                        	if(setVal.length > 1){
                        		map.put(value.split("=")[0], value.split("=")[1]);
                        	}else{
                        		map.put(value.split("=")[0], "");
                        	}
                    	}
                    }

                    bReader.close();
                    inStream.close();
                    
                    System.out.println(">>  결과 데이터 확인 : " + map.toString());
                  
                } else {
                	map.put("resultCode", "99");
                	//naverPaymentCancel(requestMap);
                }
            
        } catch (IOException ie) {
        	
        	map.put("resultCode", "99");
        	//naverPaymentCancel(requestMap);
        	
        	
        } catch (Exception e) {
        	
        	map.put("resultCode", "99");
        	//naverPaymentCancel(requestMap);
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
        
        	return map;
    }
    
/*public static HashMap<String, String> naverPaymentCancel(Map<String,String> requestMap) throws Exception{
    	
    	HashMap<String, String> map = new HashMap<String,String>();
    	
    	String naverApiUrl = requestMap.get("apiDomain");
    	String partnerId = requestMap.get("naverPartnerId");    	
    	String clientId = requestMap.get("naverCid");
		String secret = requestMap.get("naverSecret");
		
		String paymentId = requestMap.get("paymentId");	// 네이버페이 결제번호, 최대 50바이트
		String addConfirmUrl = requestMap.get("cancelUrl");	//취소url
		
    	HttpURLConnection conn = null;
		InputStream inStream = null;
        DataOutputStream outStream = null;
        
        String urlParameter = "?paymentId=" + paymentId;
        
        if(!isPayment) {	//취소요청 추가 parameter
        	//TODO
        	String cancelAmount = requestMap.get("totalPayAmount");
        	String cancelReason = "결제오류";
        	String cancelRequester = "SYSTEM";
        	
        	urlParameter = urlParameter  
        			+ "&cancelAmount=" + "7500"
        			+ "&taxScopeAmount=" + "7500"
        			+ "&cancelReason=" + cancelReason
        			+ "&cancelRequester=" + cancelRequester;
        } 
        
        try{
            
        	byte[] postData = paymentId.getBytes( StandardCharsets.UTF_8 );
        	int postDataLength = postData.length;
        	String request = naverApiUrl + "/" + partnerId + addConfirmUrl + urlParameter;
        	URL url = new URL(request);
        	
        	
	        	conn= (HttpURLConnection) url.openConnection();           
	        	
	        	conn.setDoInput(true);
	        	conn.setDoOutput(true);
	        	conn.setUseCaches(false);
	        	conn.setInstanceFollowRedirects(false);
	        	
	        	conn.setConnectTimeout(5000);
                conn.setReadTimeout(3000);
	        	
                conn.setRequestMethod("POST");
	        	conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded"); 
	        	conn.setRequestProperty("charset", "utf-8");
	        	conn.setRequestProperty("X-Naver-Client-Id", clientId);
	        	conn.setRequestProperty("X-Naver-Client-Secret", secret);
	        	conn.setRequestProperty("Content-Length", Integer.toString(postDataLength));
	        	
	        	// 접속
                conn.connect();
                
                outStream = new DataOutputStream(conn.getOutputStream());
                outStream.flush();
                outStream.close();
                
                // 취소승인결과 Response Status Code
                int resStatCode = conn.getResponseCode();
                if (200 == resStatCode) { // HTTP Status-Code 200: OK.
                    
                    inStream = conn.getInputStream();
                    
                    BufferedReader bReader = new BufferedReader(new InputStreamReader(inStream, "UTF-8"));
                    String readLine = "";

                    while ((readLine = bReader.readLine()) != null) {
                    	
                    	String queryString = readLine.replace("body", "").replace("detail", "").replace(":{", "").replace(",", "&").replace(":", "=").replace("\"", "").replace(" ","").replace("\n", "").replace("}", "").replace("{", "");
                    	String[] keyValue = queryString.split("&");
                    	for(int i = 0; i < keyValue.length; i++){
                    		String value = keyValue[i];
                        	String[] setVal = value.split("=");
                        	if(setVal.length > 1){
                        		map.put(value.split("=")[0], value.split("=")[1]);
                        	}else{
                        		map.put(value.split("=")[0], "");
                        	}
                    	}
                    }

                    bReader.close();
                    inStream.close();
                    
                    System.out.println(">>  취소 결과 데이터 확인 : " + map.toString());
                 
                } else {
                	map.put("resultCode", "99");
                }
            
        } catch (IOException ie) {
        	ie.printStackTrace();
        	map.put("resultCode", "99");
        	
        	
        } catch (Exception e) {
        	e.printStackTrace();
        	map.put("resultCode", "99");
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
        
        	return map;
    }*/
    
}