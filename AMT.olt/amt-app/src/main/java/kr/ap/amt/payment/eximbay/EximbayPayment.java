/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.amt.payment.eximbay;

import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map.Entry;

import kr.ap.amt.payment.vo.EximbayPayDTO;
import kr.ap.amt.payment.vo.EximbayProd;

/**
 * @author Administrator@g1project.net
 * @since {version}
 *
 */
public class EximbayPayment {
	
	 private static final String PAYPAL = "paypal";	//페이팔 결제
	 private static final String GLOBAL_WCARD = "globalCreditCard"; //해외 신용카드
	
	public static HashMap<String, String> makeEximbayRegistParam(EximbayPayDTO payDTO, boolean isPcDevice) throws Exception{ 
    	
    	LinkedHashMap<String, String> paramMap = new LinkedHashMap<String, String>();
    	
    	paramMap.put("ver", "230");	//version (고정)
    	paramMap.put("mid", payDTO.getpMid()); //mid
    	paramMap.put("txntype", "PAYMENT"); //간편결제 (고정)
    	paramMap.put("ref", payDTO.getOid());//가맹점에서 Transaction을 구분할 유일한 값
    	paramMap.put("cur", "KRW");//(고정) 다국어 지원시 변경필요 
    	paramMap.put("amt", payDTO.getPrice().replace(",", ""));	//결제할 총 금액 (,)제거
    	paramMap.put("paymethod", getEximbayPayMethod(payDTO.getPayMethod()));	//creditCard (고정) P000 : 해외신용카드 , P001 PAYPAL
    	paramMap.put("shop", "apMall");	//TODO 설정정보에서 셋팅
    	paramMap.put("buyer", payDTO.getBuyerName()); 	//결제자 명
    	paramMap.put("tel" , payDTO.getMobile());	//결제자 연락처
    	paramMap.put("email", payDTO.getEmail());  //결제자 이메일
    	paramMap.put("lang", "KR"); 	//(고정) 다국어 지원시 변경필요
    	paramMap.put("returnurl", payDTO.getSiteDomain() + "/payment/eximbayPayReturn"); 	//결제 결과 확인화면에서 결제창을 종료할 경우 호출되는 가맹점 페이지
    	paramMap.put("statusurl", payDTO.getSiteDomain() + "/payment/eximbayPayStatus");	//결제 처리가 끝나면 BACKEND로 호출되는 가맹점 페이지 (브라우저에서 호출불가)
    	
    	// 가맹점 정의 파라미터 필요에 따라 사용
    	paramMap.put("param1", "");
    	paramMap.put("param2", "");
    	paramMap.put("param3", "");
    	
    	paramMap.put("charset", "UTF-8"); // (고정)
    	
    	int i = 0;
    	for(EximbayProd eximbayProd : payDTO.getEximbayProds()) {
    		
    		paramMap.put("item_" + i + "_product", eximbayProd.getProdName()); //상품명
        	paramMap.put("item_" + i + "_quantity", eximbayProd.getProdQty().toString()); //상품수량 (최소 1개 이상)
        	paramMap.put("item_" + i + "_unitPrice", eximbayProd.getProdPrice().replace(",", ""));//주문상품의 상품별 단가 (0보다 커야함)
        	
        	i = i+1;
    	}
    	
    	/*paramMap.put("item_0_product", payDTO.getRepProdName()); //상품명
    	paramMap.put("item_0_quantity", "3"); //TODO 상품수량 (최소 1개 이상)
    	paramMap.put("item_0_unitPrice", payDTO.getPrice().replace(",", ""));//TODO 주문상품의 상품별 단가 (0보다 커야함)
*/    	
    	
    	//배송지 정보 (선택) 셋팅안함
    	paramMap.put("shipTo_city", "");  //(배송지) 도시 (예 : Hanoi, Brisbane, Houston)
    	paramMap.put("shipTo_country", "");//(배송지) 국가. ISO3166 country code ( ex : KR, US..)
    	paramMap.put("shipTo_firstName", ""); // (배송지) 수신자명
    	paramMap.put("shipTo_lastName", ""); // (배송지) 수신자명
    	paramMap.put("shipTo_phoneNumber", "");// (배송지) 수신자 연락처 (**국가번호 포함)
    	paramMap.put("shipTo_postalCode", "");// (배송지) 우편번호
    	paramMap.put("shipTo_state", ""); //셋팅값 없음 (배송지) US or CA 에서만 사용
    	paramMap.put("shipTo_street1", ""); // (배송지) 상세주소
    	
    	
    	 //청구지 파라미터 (선택) 셋팅안함
    	paramMap.put("billTo_city", ""); 
    	paramMap.put("billTo_country","");
    	paramMap.put("billTo_firstName" ,"");
    	paramMap.put("billTo_lastName" ,"");
    	paramMap.put("billTo_phoneNumber" ,"");
    	paramMap.put("billTo_postalCode","");
    	paramMap.put("billTo_state" ,"");
    	paramMap.put("billTo_street1" ,"");
    	
    	//osType
    	paramMap.put("ostype", isPcDevice ? "P" : "M");	//P : PC, M : MOBILE
    	//autoclose
    	paramMap.put("autoclose", "N");	//완료 화면에서 성공/실패와 무관하게 "Y" 이면 returnUrl을 호출 "N": 완료화면 표시(DEFAULT)
    	paramMap.put("displaytype", "P"); // 디스플레이 P : pupup(기본값) , I: iframe(layer) , R : pageRedirect
    	
    	//결제 응답 값 처리 파라미터
    	paramMap.put("rescode", "");
    	paramMap.put("resmsg", "");
    	
    	//fgKey 생성 규칙
    	// 모든 요청/응답 파라미터를 알파벳순서로 sorting 
    	// secretKey와 알파벳 순서로 정렬된 파라미터를 "?" 로 연결
    	// 결과값을 SH256 으로 Hashing하여 생성
    	String sortingParams = makeAllParam(paramMap);
    	paramMap.put("fgkey",encryptSHA256(payDTO.getKrpSecretKey()+"?"+sortingParams)); 	// 규칙에 맞게 셋팅
    	
       return paramMap;
   }
	
	//EXIMBAY 취소 테스트 (API에서 처리)
	/*public static HashMap<String, String> eximbayCancelRequest(PayDTO payDTO) throws Exception{ 
		
		LinkedHashMap<String, String> paramMap = new LinkedHashMap<String, String>();
    	
    	paramMap.put("ver", "230");	//version (고정)
    	paramMap.put("mid", payDTO.getpMid()); //mid
    	paramMap.put("txntype", "REFUND"); // 환불처리 (고정)
    	paramMap.put("refundtype", "F"); //TODO : 전체환불 "F" : fully , 부분환불 "P" : partical
    	paramMap.put("ref", payDTO.getOid());// 원승인 거래 REF (주문번호로 셋팅)
    	paramMap.put("cur", "KRW");// TODO : 사실 아모레에서는 KRW로만 하나 개발시에는 저장정보 읽어서 가져와야 할 것 (검토 필요)
    	paramMap.put("amt", payDTO.getPrice().replace(",", ""));// 원 승인 거래금액
    	paramMap.put("refundamt", payDTO.getPrice().replace(",", ""));// 환불요청금액 (원 승인 거래 금액 초과 불가)
    	paramMap.put("transid", payDTO.getTid());//TODO 승인 거래의 결제사 거래 아이디
    	paramMap.put("refundid", "EB" + payDTO.getOid());//TODO 환불요청에 대한 유일한 값으로 가맹점에서 생성 , 모든 요청데이터의 refundid는 unique 해야함. 결정 필요사항
    	paramMap.put("reason", "테스트");//TODO 환불사유
    	paramMap.put("lang", "KR");//TODO 
    	paramMap.put("charset", "UTF-8");//(고정)
    	
    	//fgKey 생성 규칙
    	// 모든 요청/응답 파라미터를 알파벳순서로 sorting 
    	// secretKey와 알파벳 순서로 정렬된 파라미터를 "?" 로 연결
    	// 결과값을 SH256 으로 Hashing하여 생성
    	String sortingParams = makeAllParam(paramMap);
    	paramMap.put("fgkey",encryptSHA256(payDTO.getKrpSecretKey()+"?"+sortingParams)); 	// 규칙에 맞게 셋팅
    	
    	HashMap<String,String> resultMap = new HashMap<String,String>();
    	
    	HttpURLConnection conn = null;
		InputStream inStream = null;
        DataOutputStream outStream = null;
       
        try {
        	
        	String data = makeCancelRequestParam(paramMap);
        	String authUrl = "https://secureapi.test.eximbay.com/Gateway/DirectProcessor.krp";//TODO : 개발 CONFIG 설정
        	//String authUrl = "https://secureapi.eximbay.com/Gateway/DirectProcessor.krp";//TODO : 운영 
        	
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
                
                System.out.println("eximbay Cancel Result =====");
                System.out.println(resultMap.toString());
              
            } else {
            	
            	
            	
            }
        } catch (SocketTimeoutException ste) {
        
        	
        	
        } catch (IOException ie) {
        	
        } catch (Exception e) {
        
        
        	
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
    	
    	
    			
		return resultMap;
	}*/
	
	public static String getEximbayPayMethod(String payMethod) {
		if(GLOBAL_WCARD.equals(payMethod)) {
			return "P000"; 	//해외신용카드 결제
		} else if(PAYPAL.equals(payMethod)) {
			return "P001";		//페이팔 결제
		}
		
		return null;
	}

	//SHA256 해쉬 함수
	public static String encryptSHA256(String value){
		try{
	        byte[] plainText = value.getBytes("UTF-8");
	        byte[] hashValue = null;
	        
	        MessageDigest md = MessageDigest.getInstance("SHA-256");
	        hashValue = md.digest(plainText);
 
	        return toHexString(hashValue);
      }catch(Exception e){
      	System.out.println("[encryptSHA256]Exception : " + e);	
      }
      
      return "";
	}
		
	//16진수 변환 함수
	public static String toHexString(byte[] letter){
		StringBuffer sbHex = new StringBuffer();
      for (int j = 0; j <letter.length; j++) {             
          String hexValue = Integer.toHexString((int)letter[j] & 0xff); 
          
          if(hexValue.length() == 1) sbHex.append("0");
          sbHex.append(hexValue.toUpperCase());
      } 
      
      return sbHex.toString();
	}

	//파라미터 정렬
	public static String makeAllParam(LinkedHashMap<String, String> reqTemp){

		int listSize = 1;
		StringBuffer reqParam = new StringBuffer();

		List<String> reqList = new ArrayList<String>();


		try{
			reqList = new ArrayList<String>(reqTemp.keySet());
			Collections.sort(reqList);

			for (String str : reqList) {	
				String key = str;
				String value = (String) reqTemp.get(str);  
				
				if ("fgkey".equals(key))  {
					listSize++;
					continue;
				}			
				if(reqList.size() ==  listSize)
					reqParam.append(key).append("=").append(value);
				else 
					reqParam.append(key).append("=").append(value).append("&");   
				listSize++;
			}
			System.out.println("[makeReqAllParam]sorting : "+reqParam.toString());
			return reqParam.toString();



		}catch(Exception e){
			System.out.println("[makeReqAllParam]Exception : " + e);	
		}
		System.out.println("[makeReqAllParam]return : "+reqParam.toString());
		return reqParam.toString();
	}
	
	//null 체크 함수
	public String checkNull(Object obj){
		if(obj == null) return "";
		else return (String)obj;
	}
	
	//eximbay 취소 테스트
 /*private static String makeCancelRequestParam(LinkedHashMap<String, String> linkedHashMap) {
		
    	String data = "";
    	String and = "";
    	
    	for(Entry<String, String> elem : linkedHashMap.entrySet()){           
            if(data != "") {
            	and = "&";
            } 
            data = data.concat(and).concat(elem.getKey()).concat("=").concat(elem.getValue().toString());
        }
    	
    	return data;
	}*/

	
	
}