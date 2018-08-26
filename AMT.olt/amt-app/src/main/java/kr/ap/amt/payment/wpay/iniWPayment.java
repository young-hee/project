/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.payment.wpay;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.Security;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Base64;
import org.bouncycastle.jce.provider.BouncyCastleProvider;

import com.fasterxml.jackson.databind.ObjectMapper;

import kr.ap.amt.payment.vo.PayDTO;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class iniWPayment {
	
	/**********************
	 * wpay - seed암호화 규칙
	 * 이니시스에서 제공받은 seedKey, seedIv로  SEED/CBC/PKCS5Padding 방식으로 암호화
	 * 제공받은 seedKey는 base64 디코딩 후 16byte 키로 사용
	 * charSet = utf-8
	 * SEED/CBC/PKCS5Padding 방식으로 암호화 처리한 결과값을 인코딩
	 ********************** */
	
	private static final String algorithm = "SEED/CBC/PKCS5Padding";	//SEED/CBC/PKCS5Padding
	private static final String charset = "UTF-8";	
	
	
    public static HashMap<String, String> makeWPayRegistParam(String seedKey, String seedIv, String hashKey, PayDTO payDTO) throws Exception{ 
    	
    	HashMap<String, String> map = new HashMap<String, String>();
    	LinkedHashMap<String, String> linkedHashMap = new LinkedHashMap<String, String>();
    	
    	Security.addProvider (new BouncyCastleProvider()) ;
    	
    	//제공받은 seedKey를 decoding 하여 사용
    	byte[] dSeedkey = Base64.decodeBase64(seedKey.getBytes());
    	
    	//secretKey (암호화 키 생성)
    	SecretKeySpec key = new SecretKeySpec(dSeedkey, "SEED"); 
    	IvParameterSpec ivSpec = new IvParameterSpec(seedIv.getBytes()); 
    	Cipher cipher = Cipher.getInstance(algorithm, "BC"); 

    	// 암호화 키 주입, iv 생성 주입, 초기화 - iv의 경우 keyEncodr를 이용 
    	cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
    	
    	//parameter 셋팅 - signature(hash value) 생성을 위해 순서 유지 linkedHashMap으로 담음.
    	//TODO : 필요한 정보 셋팅 NULL일경우 ""으로 셋팅해야함.
    	linkedHashMap.put("mid", payDTO.getpMid()); //이니시스 가맹점 ID
    	linkedHashMap.put("userId", new String(Base64.encodeBase64(cipher.doFinal(payDTO.getUserId().getBytes(charset)))));	  //가맹점 유저 id or 유저No unique 값
    	linkedHashMap.put("ci", "");	  //인증절차 거치는 방향으로 변경됨에 따라 셋팅 안함.
    	linkedHashMap.put("userNm",  URLEncoder.encode(payDTO.getBuyerName(), charset));	  //고객명
    	linkedHashMap.put("hNum", new String(Base64.encodeBase64(cipher.doFinal(payDTO.getMobile().replace("-", "").getBytes(charset))))); //고객 휴대폰번호
    	linkedHashMap.put("hCorp","");
    	linkedHashMap.put("birthDay", new String(Base64.encodeBase64(cipher.doFinal(payDTO.getBirth().getBytes(charset)))));//생년월일 (YYYYMMDD)
    	linkedHashMap.put("socialNo2", "");//인증절차 거치는 방향으로 변경됨에 따라 셋팅 안함.
    	linkedHashMap.put("frnrYn", "");
    	linkedHashMap.put("returnUrl", URLEncoder.encode(payDTO.getSiteDomain()+"/payment/wPayRegistReturn", charset));//회원가입 결과전달 url (임시 URL 추후 수정필요)
    	
    	//signature text 만들기
    	String signatureText = makeSignatureValue(hashKey, linkedHashMap);
    	
    	linkedHashMap.put("signature", SHA256(signatureText));	//hash value
    	
    	linkedHashMap.put("closeBtnUrl", URLEncoder.encode(payDTO.getSiteDomain()+"/payment/wPayRegistReturn", charset));
    	
    	//TODO : 추후 디자인 관련 설정정보 추가필요
    	//linkedHashMap.put("clauseDetailUrl", "https://mark.inicis.com/mark/escrow_popup.php?no=68169&st=1413531842");
    	//linkedHashMap.put("clausePersonInfoUrl", "http://www.etudehouse.com/kr/ko/jsp/front/footer/emailNo.jsp");
    	//System.out.println("set paramMapVal=" + linkedHashMap.toString());
    	
    	    	
    	
       return linkedHashMap;
   }
    
    public static HashMap<String, String> makeWPayRequestCertificationParam(String seedKey, String seedIv, String hashKey, PayDTO payDTO) throws Exception{ 
    	
    	HashMap<String, String> map = new HashMap<String, String>();
    	LinkedHashMap<String, String> linkedHashMap = new LinkedHashMap<String, String>();
    	
    	Security.addProvider (new BouncyCastleProvider()) ;
    	
    	//제공받은 seedKey를 decoding 하여 사용
    	byte[] dSeedkey = Base64.decodeBase64(seedKey.getBytes());
    	
    	//secretKey (암호화 키 생성)
    	SecretKeySpec key = new SecretKeySpec(dSeedkey, "SEED"); 
    	IvParameterSpec ivSpec = new IvParameterSpec(seedIv.getBytes()); 
    	Cipher cipher = Cipher.getInstance(algorithm, "BC"); 

    	// 암호화 키 주입, iv 생성 주입, 초기화 - iv의 경우 keyEncodr를 이용 
    	cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
    	
    	System.out.println("test userKey=" + payDTO.getWpayUserKey());
    	System.out.println("TEST ENCRYPTO=" +  new String(Base64.encodeBase64(cipher.doFinal(payDTO.getWpayUserKey().getBytes(charset)))));
    	
    	//parameter 셋팅 - signature(hash value) 생성을 위해 순서 유지 linkedHashMap으로 담음.
    	linkedHashMap.put("mid", payDTO.getpMid()); //이니시스 가맹점 ID
     	linkedHashMap.put("wpayUserKey", new String(Base64.encodeBase64(cipher.doFinal(payDTO.getWpayUserKey().getBytes(charset)))));	  //이니시스에서 발행한 wpayUserKey    	
     	linkedHashMap.put("ci", "");	  //고객의 Ci
    	linkedHashMap.put("oid", payDTO.getOid());	  // 주문번호
    	linkedHashMap.put("goodsName", URLEncoder.encode(payDTO.getRepProdName(), charset));	  // 상품명  TODO : 문자열 MAX SIZE 100BYTE 미만 으로 셋팅해야함. 체크필요 
    	linkedHashMap.put("goodsPrice", payDTO.getPrice().replace(",",""));	  // 결제금액
    	linkedHashMap.put("buyerName", URLEncoder.encode(payDTO.getBuyerName(), charset));	  // 구매자명
    	linkedHashMap.put("buyerTel", payDTO.getMobile());	  // 구매자 연락처
    	linkedHashMap.put("buyerEmail", "");	  // 구매자 이메일
    	linkedHashMap.put("flagPin", "Y");	  // 핀인증 여부 Y/null = 핀인증 필수 , N = 이니시스  판단
    	linkedHashMap.put("returnUrl", URLEncoder.encode(payDTO.getSiteDomain()+"/payment/wpayRequestCertReturn", charset));	  //인증응답 결과 전달 url
    	
    	//signature text 만들기
    	String signatureText = makeSignatureValue(hashKey, linkedHashMap);
    	
    	linkedHashMap.put("signature", SHA256(signatureText));	//hash value
    	
       return linkedHashMap;
   }
    
    public static HashMap<String, String> makeWPayMgmtParam(String wpaySeedKey, String wpaySeedIv, String wpayHashKey,
			PayDTO payDTO) throws Exception {
    	LinkedHashMap<String, String> linkedHashMap = new LinkedHashMap<String, String>();
    	
    	Security.addProvider (new BouncyCastleProvider()) ;
    	
    	//제공받은 seedKey를 decoding 하여 사용
    	byte[] dSeedkey = Base64.decodeBase64(wpaySeedKey.getBytes());
    	
    	//secretKey (암호화 키 생성)
    	SecretKeySpec key = new SecretKeySpec(dSeedkey, "SEED"); 
    	IvParameterSpec ivSpec = new IvParameterSpec(wpaySeedIv.getBytes()); 
    	Cipher cipher = Cipher.getInstance(algorithm, "BC"); 

    	// 암호화 키 주입, iv 생성 주입, 초기화 - iv의 경우 keyEncodr를 이용 
    	cipher.init(Cipher.ENCRYPT_MODE, key, ivSpec);
    	
    	//parameter 셋팅 - signature(hash value) 생성을 위해 순서 유지 linkedHashMap으로 담음.
    	linkedHashMap.put("mid", payDTO.getpMid()); //이니시스 가맹점 ID
    	linkedHashMap.put("wpayUserKey", new String(Base64.encodeBase64(cipher.doFinal(payDTO.getWpayUserKey().getBytes(charset)))));	  //이니시스에서 발행한 wpayUserKey
    	linkedHashMap.put("cancelReturnUrl", URLEncoder.encode(payDTO.getSiteDomain()+"/my/page/wPayMgmtReturn", charset));	  //서비스 해지 처리후 전달 Url
    	//signature text 만들기
    	String signatureText = makeSignatureValue(wpayHashKey, linkedHashMap);
    	linkedHashMap.put("signature", SHA256(signatureText));
  
		return linkedHashMap;
	}
    
    public static HashMap<String, String> iniWpayRequestAutorization(String wpayMid, String hashKey, HttpServletRequest request) throws Exception {
    	
    	HashMap<String, String> map = new HashMap<String, String>();
    	
    	request.setCharacterEncoding("UTF-8");
        Map<String,String> paramMap = new Hashtable<String,String>();
        Enumeration elems = request.getParameterNames();
        String temp = "";

        while(elems.hasMoreElements()){
            temp = (String) elems.nextElement();
            paramMap.put(temp, request.getParameter(temp));
        }
        System.out.println(">>> paramMap : " + paramMap.toString());
        
        //성공시
        if("0000".equals(paramMap.get("resultCode"))) {
        	
        	LinkedHashMap<String, String> linkedHashMap = new LinkedHashMap<String, String>();
        	
        	linkedHashMap.put("mid" , wpayMid);
        	linkedHashMap.put("wpayUserKey", paramMap.get("wpayUserKey"));
        	linkedHashMap.put("ci", "");
        	linkedHashMap.put("wtid", paramMap.get("wtid"));
        	
        	//signature text 만들기
        	String signatureText = makeSignatureValue(hashKey, linkedHashMap);
        	linkedHashMap.put("signature", SHA256(signatureText));
        	
        	String authUrl = "https://wpay.inicis.com/stdwpay/apis/payreqappl";	//요청 url
        	
        	//URLEncode
        	linkedHashMap.replace("wpayUserKey", URLEncoder.encode(paramMap.get("wpayUserKey"), charset));
        	
            String data = makeMobileConfirmParam(linkedHashMap);
           
            //#####################
            // 승인 요청
            //#####################
                          
    		HashMap<String,String> resultMap = new HashMap<String,String>();
        	
        	System.out.println(">>> 승인요청  <<<");
            
            HttpURLConnection conn = null;
    		InputStream inStream = null;
            DataOutputStream outStream = null;
           
            try {
            	
            	 byte[] postData = data.getBytes(StandardCharsets.UTF_8);
                 int postDataLength = postData.length;
                 
                 URL url = new URL(authUrl);

                conn = (HttpURLConnection) url.openConnection();

                conn.setDoInput(true); 
                conn.setDoOutput(true); 
                conn.setUseCaches(false); 

                conn.setConnectTimeout(5000);
                conn.setReadTimeout(3000);

                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                conn.setRequestProperty("charset", "utf-8");
                conn.setRequestProperty("Content-Length", Integer.toString(postDataLength));
                
                // 접속
                conn.connect();

                outStream = new DataOutputStream(conn.getOutputStream());                
                outStream.write(postData);
                outStream.flush();
                outStream.close();

                // 승인결과 Response Status Code
                int resStatCode = conn.getResponseCode();
                if (200 == resStatCode) { // HTTP Status-Code 200: OK.
                    
                    inStream = conn.getInputStream();
                    BufferedReader bReader = new BufferedReader(new InputStreamReader(inStream, "UTF-8"));
                    
                    //Json to hashMap
                    resultMap = new ObjectMapper().readValue(bReader.readLine(), HashMap.class);

                    bReader.close();
                    inStream.close();
                  
                    
                    System.out.println(">> 승인 결과 데이터 확인 : " + resultMap);
                    
                    map.putAll(resultMap);
                    
                    if(!"0000".equals(resultMap.get("resultCode"))){	//승인실패시 망취소	
    					iniWpayCancelRequest(wpayMid, hashKey, paramMap.get("wpayUserKey"), paramMap.get("wtid"));
                    }
                   
                } else {
                	map.put("resultCode", "99");
                	iniWpayCancelRequest(wpayMid, hashKey, paramMap.get("wpayUserKey"), paramMap.get("wtid"));
                	
                }
            } catch (SocketTimeoutException ste) {
            	 if (outStream != null) {
                     outStream.close();
                 }
                 if (inStream != null) {
                     inStream.close();
                 }
                 if (conn != null) {
                     conn.disconnect();
                 }
            	map.put("resultCode", "99");
            	iniWpayCancelRequest(wpayMid, hashKey, paramMap.get("wpayUserKey"), paramMap.get("wtid"));
            	
            } catch (IOException ie) {
            	 if (outStream != null) {
                     outStream.close();
                 }
                 if (inStream != null) {
                     inStream.close();
                 }
                 if (conn != null) {
                     conn.disconnect();
                 }
            	map.put("resultCode", "99");
            	iniWpayCancelRequest(wpayMid, hashKey, paramMap.get("wpayUserKey"), paramMap.get("wtid"));
            	
            } catch (Exception e) {
            	 if (outStream != null) {
                     outStream.close();
                 }
                 if (inStream != null) {
                     inStream.close();
                 }
                 if (conn != null) {
                     conn.disconnect();
                 }
            	map.put("resultCode", "99");
            	iniWpayCancelRequest(wpayMid, hashKey, paramMap.get("wpayUserKey"), paramMap.get("wtid"));
            	
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
        }
        
		return map;
	}   
    
    public static HashMap<String, String> iniWpayCancelRequest(String wpayMid, String hashKey, String wpayUserKey, String wtid) throws Exception {
    	
    	HashMap<String, String> map = new HashMap<String, String>();
    	
    	System.out.println("WPay 망취소 Start");
    	 	
        	LinkedHashMap<String, String> linkedHashMap = new LinkedHashMap<String, String>();
        	
        	linkedHashMap.put("mid" , wpayMid);
        	linkedHashMap.put("wpayUserKey", wpayUserKey);        	
        	linkedHashMap.put("wtid", wtid);
        	linkedHashMap.put("cancelMsg", URLEncoder.encode("결제실패", charset));
        	
        	//signature text 만들기
        	String signatureText = makeSignatureValue(hashKey, linkedHashMap);        	        	
        	linkedHashMap.put("signature", SHA256(signatureText));
        	
        	String authUrl = "https://wpay.inicis.com/stdwpay/apis/payreqapplcancel";	//취소 url
        	
        	linkedHashMap.replace("wpayUserKey", URLEncoder.encode(wpayUserKey, charset));
        	linkedHashMap.replace("cancelMsg", URLEncoder.encode(linkedHashMap.get("cancelMsg"), charset));
        	
            String data = makeMobileConfirmParam(linkedHashMap);
            
            //#####################
            // 결제망 취소 
            //#####################
                          
    		HashMap<String,String> resultMap = new HashMap<String,String>();
        	
            HttpURLConnection conn = null;
    		InputStream inStream = null;
            DataOutputStream outStream = null;
            
            try {
    			
    			 byte[] postData = data.getBytes(StandardCharsets.UTF_8);
                 int postDataLength = postData.length;
                 
                 URL url = new URL(authUrl);

                conn = (HttpURLConnection)  url.openConnection();

                conn.setDoInput(true); 
                conn.setDoOutput(true); 
                conn.setUseCaches(false); 

                conn.setConnectTimeout(5000);
                conn.setReadTimeout(1000);

                conn.setRequestMethod("POST");
                conn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
                conn.setRequestProperty("charset", "utf-8");
                conn.setRequestProperty("Content-Length", Integer.toString(postDataLength));
                
                // 접속
                conn.connect();

                outStream = new DataOutputStream(conn.getOutputStream());
                outStream.write(postData);
                outStream.flush();
                outStream.close();

                // 승인결과 Response Status Code
                int resStatCode = conn.getResponseCode();
                if (200 == resStatCode) { // HTTP Status-Code 200: OK.
                    
                    inStream = conn.getInputStream();
                    BufferedReader bReader = new BufferedReader(new InputStreamReader(inStream, "UTF-8"));
                    
                    //Json to hashMap
                    resultMap = new ObjectMapper().readValue(bReader.readLine(), HashMap.class);

                    bReader.close();
                    inStream.close();
                    
                    map.putAll(resultMap);
                    
                    System.out.println(">>> 취소성공 결과 데이터 확인 : " + resultMap);
                    
                    
                    //test
                    
                    Security.addProvider (new BouncyCastleProvider()) ;	    	
        	    	//제공받은 seedKey를 decoding 하여 사용
        	    	byte[] dSeedkey = Base64.decodeBase64("YXfk5YpaAlFPjFpczsB/yA==".getBytes());
        			
        			//secretKey (암호화 키 생성)
        	    	SecretKeySpec key = new SecretKeySpec(dSeedkey, "SEED"); 
        	    	IvParameterSpec ivSpec = new IvParameterSpec("WPAYINIWPAYTSTST".getBytes()); 
        	    	Cipher cipher = Cipher.getInstance(algorithm, "BC"); 

        	    	// 암호화 키 주입, iv 생성 주입, 초기화 - iv의 경우 keyEncodr를 이용 
        	    	cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);	//decode 모드
        	    	
        	    	resultMap.put("resultCode", resultMap.get("resultCode"));
        	    	resultMap.put("resultMsg", URLDecoder.decode(resultMap.get("resultMsg"), charset));
        	    	
        	    	System.out.println("result = " + resultMap.toString());
                    
                    
                    //////////////////////////////////////////////////////////////////
                    
                    if("0000".equals(resultMap.get("resultCode"))){	//취소 성공
                    	
                    	System.out.println(">>> 취소성공 결과 데이터 확인 : " + resultMap);
    				}
                   
                } else {
                	map.put("resultCode", "99");
                	
                }
            } catch (SocketTimeoutException ste) {
            	ste.printStackTrace();
            	System.out.println("test socketTimeOut");
            	map.put("resultCode", "99");
            	
            	
            } catch (IOException ie) {
            	ie.printStackTrace();
            	System.out.println("test ioException");
            	map.put("resultCode", "99");
            	
            	
            } catch (Exception e) {
            	e.printStackTrace();
            	System.out.println("test Exception");
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
	}   
    
    public static Map<String, String> decodeWpayRegistResultParam(String seedkey, String seedIv, Map<String, String> paramMap) throws Exception {
		
		Map<String, String> resultMap = new HashMap<String, String>();
		
		if(!paramMap.isEmpty()) {
			
			Security.addProvider (new BouncyCastleProvider()) ;	    	
	    	//제공받은 seedKey를 decoding 하여 사용
	    	byte[] dSeedkey = Base64.decodeBase64(seedkey.getBytes());
			
			//secretKey (암호화 키 생성)
	    	SecretKeySpec key = new SecretKeySpec(dSeedkey, "SEED"); 
	    	IvParameterSpec ivSpec = new IvParameterSpec(seedIv.getBytes()); 
	    	Cipher cipher = Cipher.getInstance(algorithm, "BC"); 

	    	// 암호화 키 주입, iv 생성 주입, 초기화 - iv의 경우 keyEncodr를 이용 
	    	cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);	//decode 모드
	    	
	    	resultMap.put("resultCode", paramMap.get("resultCode"));
	    	resultMap.put("resultMsg", URLDecoder.decode(paramMap.get("resultMsg"), charset));
	    	resultMap.put("wtid", paramMap.get("wtid"));
	    	
	    	resultMap.put("userId", new String(cipher.doFinal(Base64.decodeBase64(paramMap.get("userId").getBytes(charset)))));
	    	resultMap.put("wpayUserKey", new String(cipher.doFinal(Base64.decodeBase64(paramMap.get("wpayUserKey").getBytes(charset)))));
	    	/*resultMap.put("ci", new String(cipher.doFinal(Base64.decodeBase64(paramMap.get("ci").getBytes(charset)))));*/
	    	resultMap.put("signature", URLDecoder.decode(paramMap.get("signature"),charset));
			
		}
		return resultMap;
	}
    
public static Map<String, String> decodeWpayCertResultParam(String seedkey, String seedIv, Map<String, String> paramMap) throws Exception {
		
		Map<String, String> resultMap = new HashMap<String, String>();
		
		if(!paramMap.isEmpty()) {
			
			Security.addProvider (new BouncyCastleProvider()) ;	    	
	    	//제공받은 seedKey를 decoding 하여 사용
	    	byte[] dSeedkey = Base64.decodeBase64(seedkey.getBytes());
			
			//secretKey (암호화 키 생성)
	    	SecretKeySpec key = new SecretKeySpec(dSeedkey, "SEED"); 
	    	IvParameterSpec ivSpec = new IvParameterSpec(seedIv.getBytes()); 
	    	Cipher cipher = Cipher.getInstance(algorithm, "BC"); 

	    	// 암호화 키 주입, iv 생성 주입, 초기화 - iv의 경우 keyEncodr를 이용 
	    	cipher.init(Cipher.DECRYPT_MODE, key, ivSpec);	//decode 모드
	    	
	    	resultMap.putAll(paramMap);
	    	
	    	resultMap.put("resultMsg",  URLDecoder.decode(paramMap.get("resultMsg"), charset));
	    	
	    	//성공시
	    	if("0000".equals(resultMap.get("resultCode"))) {
	    		
	    		resultMap.put("wpayUserKey", new String(cipher.doFinal(Base64.decodeBase64(paramMap.get("wpayUserKey").getBytes(charset)))));
	    		resultMap.put("wpayToken", new String(cipher.doFinal(Base64.decodeBase64(paramMap.get("wpayToken").getBytes(charset)))));	    		
	    		resultMap.put("goodsName", URLDecoder.decode(paramMap.get("goodsName"), charset));
	    		resultMap.put("buyerName", URLDecoder.decode(paramMap.get("buyerName"), charset));
	    		
	    	}
			
		}
		return resultMap;
	}
    
    private static String makeMobileConfirmParam(LinkedHashMap<String, String> linkedHashMap) {
		
    	String data = "";
    	String and = "";
    	
    	for(Entry<String, String> elem : linkedHashMap.entrySet()){           
            if(data != "") {
            	and = "&";
            } 
            data = data.concat(and).concat(elem.getKey()).concat("=").concat(elem.getValue().toString());
        }
    	
    	return data;
	}

	// signature 필드값 생성
    public static final String makeSignatureValue(String hashKey, LinkedHashMap<String, String> map) {
    	String plaintext = "";
    	String and = "";
    	
    	//signature 생성 - *wpay 연동 규약서에 정의된 request 항목을 순차적으로 연결한다.
    	
    	for(Entry<String, String> elem : map.entrySet()){           
            if(plaintext != "") {
            	and = "&";
            } 
            plaintext = plaintext.concat(and).concat(elem.getKey()).concat("=").concat(elem.getValue().toString());
        }
    	
    	return plaintext = plaintext.concat("&hashKey="+hashKey);
    			
    }
    
    public static final String SHA256(String str){

    	String SHA = ""; 

    	try{

    		MessageDigest sh = MessageDigest.getInstance("SHA-256"); 

    		sh.update(str.getBytes()); 

    		byte byteData[] = sh.digest();

    		StringBuffer sb = new StringBuffer(); 

    		for(int i = 0 ; i < byteData.length ; i++){

    			sb.append(Integer.toString((byteData[i]&0xff) + 0x100, 16).substring(1));

    		}

    		SHA = sb.toString();

    		

    	}catch(NoSuchAlgorithmException e){

    		e.printStackTrace(); 

    		SHA = null; 

    	}

    	return SHA;

    }

	

	

	

}