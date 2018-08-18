package kr.ap.amt.product.controller;

import kr.ap.amt.product.vo.ExternalVO;
import kr.ap.amt.product.vo.RequestReview;
import kr.ap.comm.support.common.AbstractController;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.json.BasicJsonParser;
import org.springframework.boot.json.JsonParser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.Map;

/**
 * @author Simjaekyu@
 * @since {version}
 */

@Controller
@RequestMapping("/product")
public class ProductRestController extends AbstractController {
	
	@Value("${external.api.base-url}")
    private String baseUrl;	//SmartOffer 추천 요청 URL
	
	@GetMapping("/getExternalData")
    @ResponseBody
    public Map<String, Object> getReviewList(ExternalVO vo, HttpServletRequest request) throws Exception {
		
		HttpURLConnection conn = null;
		InputStream inStream = null;
		DataOutputStream outStream = null;
		
		Map<String, Object> result = new HashMap<>();
		
		try{
			URL url = new URL(baseUrl.concat(vo.toString()));
			conn = (HttpURLConnection) url.openConnection();
			
			
			conn.setRequestMethod("GET");
			conn.setDoInput(true); 
            conn.setDoOutput(true); 
            conn.setUseCaches(false); 

            conn.setConnectTimeout(10000);
            conn.setReadTimeout(8000);
            conn.connect();

            outStream = new DataOutputStream(conn.getOutputStream());
            
            outStream.flush();
            outStream.close();
            
            int resStatCode = conn.getResponseCode();
            if (200 == resStatCode) {
            	inStream = conn.getInputStream();
            	BufferedReader bReader = new BufferedReader(new InputStreamReader(inStream, "utf-8"));
            	StringBuilder sb = new StringBuilder();
            	int cp;
                while ((cp = bReader.read()) != -1) {
                  sb.append((char) cp);
                }
                String jsonText = sb.toString();
                JsonParser jsonParser = new BasicJsonParser();
                result = jsonParser.parseMap( jsonText );
                bReader.close();
                inStream.close();
            }
		}catch(Exception e){
			return result;
		}finally {
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
		
		return result;
	}
	
	/**
     * 상품평 목록 조회
     * @param requestReview
     * @return
     */
    @GetMapping("/getReviewList")
    @ResponseBody
    public ResponseEntity<?> getReviewList(RequestReview requestReview) {
    	HashMap<String, Object> result = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		try {
    		ProdReviewListInfo prodReviewListInfo = productApi.getProductReviews(requestReview.getProdReviewUnit(), requestReview.getProdReviewType(), requestReview.getOffset(), requestReview.getLimit(), getMemberSn(), requestReview.getOnlineProdSn(), requestReview.getProdSn(), requestReview.getStyleCode(), requestReview.getProdReviewSort(), requestReview.getScope(), requestReview.getTopReviewOnlyYn(), requestReview.getTopReviewFirstYn(), (!requestReview.getStartDate().isEmpty()) ? sf.parse(requestReview.getStartDate()) : null, (!requestReview.getEndDate().isEmpty()) ? sf.parse(requestReview.getEndDate()) : null, "N");
    		result.put("prodReviewListInfo", prodReviewListInfo);
    		
    		return ResponseEntity.ok(result);
    	} catch (Exception e) {
    		result.put("errorData", e);
    		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
    	}
    }
}
