package kr.ap.amt.product.controller;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringJoiner;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.ap.amt.product.vo.ExternalVO;
import kr.ap.amt.product.vo.RequestReview;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.product.ProdRecommendReq;
import net.g1project.ecp.api.model.sales.product.ProdReviewImg;
import net.g1project.ecp.api.model.sales.product.ProdReviewInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPostForDelete;

/**
 * @author Simjaekyu@
 * @since {version}
 */

@Controller
@RequestMapping("/product")
public class ProductRestController extends AbstractController {
	
	@Value("${external.api.base-url}")
	private String externalBaseUrl; // SmartOffer 추천 요청 URL

	@Autowired
	private ObjectMapper mapper;
	
	private final String EXTERNAL_ITEMS_KEY = "items"; // SmartOffer item array
	
	private final String EXTERNAL_ITEM_CODE_KEY = "ITEM_VALUE"; // SmartOffer item code
	
	@GetMapping("/getExternalData")
	@ResponseBody
	public ResponseEntity<?> getExternalData(ExternalVO vo, HttpServletRequest request) throws Exception {
		HashMap<String, Object> result = new HashMap<>();
		OnlineProdList onlineProdList = new OnlineProdList();
		String jsonText = "";

		// 1. call external api
		RestTemplate template = new RestTemplateBuilder()
			.additionalMessageConverters(new StringHttpMessageConverter(StandardCharsets.UTF_8))
			.setConnectTimeout(10000)
			.setReadTimeout(8000)
			.build();

		ResponseEntity<String> stringResponseEntity = template.getForEntity(externalBaseUrl.concat(vo.toString()), String.class);
		if (stringResponseEntity.getStatusCode().equals(HttpStatus.OK)) {
			jsonText = stringResponseEntity.getBody();
		}

		/*
		try {
			URL url = new URL(externalBaseUrl.concat(vo.toString()));
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
				jsonText = sb.toString();
				
				bReader.close();
				inStream.close();
			}
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
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
		*/
		
		// 2. call internal api
		if (!jsonText.isEmpty()) {
			StringJoiner legacyModelCodes = new StringJoiner(",");
			JsonNode root = mapper.readTree(jsonText);
			JsonNode items = root.get(EXTERNAL_ITEMS_KEY);
			if (items.isArray()) {
				for (JsonNode item : items) {
					legacyModelCodes.add(item.get(EXTERNAL_ITEM_CODE_KEY).textValue());
				}
			}

			onlineProdList = displayApi.getWithLegacyModelCodesProdList(legacyModelCodes.toString());

			/*
			StringBuffer legacyModelCodes = new StringBuffer();
			JSONObject json = null;
			JSONArray items = null;

			json = new JSONObject(jsonText);
			items = json.getJSONArray(EXTERNAL_ITEMS_KEY);
			for (int i = 0; i < items.length(); i++) {
				JSONObject item = (JSONObject) items.get(i);
				if (i > 0) {
					legacyModelCodes.append(",");
				}
				legacyModelCodes.append(item.get(EXTERNAL_ITEM_CODE_KEY));
			}

			onlineProdList = displayApi.getWithLegacyModelCodesProdList(legacyModelCodes.toString());
			*/
		}
		
		result.put("onlineProdList", onlineProdList);
		return ResponseEntity.ok(result);
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
    		ProdReviewListInfo prodReviewListInfo = productApi.getProductReviews(requestReview.getProdReviewUnit(), requestReview.getProdReviewType(), requestReview.getOffset(), requestReview.getLimit(), getMemberSn(), requestReview.getOnlineProdSn(), requestReview.getProdSn(), requestReview.getStyleCode(), requestReview.getProdReviewSort(), requestReview.getScope(), requestReview.getTopReviewOnlyYn(), requestReview.getTopReviewFirstYn(), (!requestReview.getStartDate().isEmpty()) ? sf.parse(requestReview.getStartDate()) : null, (!requestReview.getEndDate().isEmpty()) ? sf.parse(requestReview.getEndDate()) : null, "N", APConstant.AP_DISPLAY_MENU_SET_ID, requestReview.getDisplayMenuId());
    		
    		//뷰티테스터 더미데이터
    		if( "ExperienceGrp".equalsIgnoreCase(requestReview.getProdReviewType()) &&  prodReviewListInfo.getTotalCount() == 0) {
    			List<ProdReviewInfo> list = new ArrayList<>();
    			for (int i = 0; i < 6; i++) {
    				List<ProdReviewImg> imgList = new ArrayList<>();
					ProdReviewInfo info = new ProdReviewInfo();
					for (int j = 0; j < 10; j++) {
						ProdReviewImg img = new ProdReviewImg();
						img.setImageFileUrl("/pc/ko/images/dummy/img_beautytester_review.jpg");
						imgList.add(img);
					}
					info.setImgList(imgList);
					list.add(info);
				}
    			prodReviewListInfo.setProdReviewList(list);
    			prodReviewListInfo.setOffset(0);
    			prodReviewListInfo.setTotalCount(6);
    		}
    		
    		result.put("prodReviewListInfo", prodReviewListInfo);
    		
    		return ResponseEntity.ok(result);
    	} catch (Exception e) {
    		result.put("errorData", e);
    		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
    	}
    }
    
    /**
     * 상품평 미작성 목록 조회
     * @param requestReview
     * @return
     */
    @GetMapping("/getWritableReviewList")
    @ResponseBody
    public ResponseEntity<?> getWritableReviewList(RequestReview requestReview) {
    	HashMap<String, Object> result = new HashMap<String, Object>();
		SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd");

		try {
    		//미작성 구매후기.
    		ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), null, requestReview.getOffset(), requestReview.getLimit());
    		result.put("productReviewWritableOrders", productReviewWritableOrders);
    		
    		return ResponseEntity.ok(result);
    	} catch (Exception e) {
    		result.put("errorData", e);
    		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
    	}
    }
    
    /**
     * 상품추천 (좋아요) - on
     */
    @RequestMapping("/postRecommend")
    @ResponseBody
    public ResponseEntity<?> postRecommend(ShoppingMarkPost markPost) {
        HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	shoppingmarkApi.addShoppingBookmark(getMemberSn(), markPost);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    /**
     * 상품추천 (좋아요) - off
     */
    @RequestMapping("/offRecommend")
    @ResponseBody
    public ResponseEntity<?> offRecommend(ShoppingMarkPost markPost) {
        HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	shoppingmarkApi.deleteShoppingBookmarkLike(getMemberSn(), markPost);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    /**
     * 상품추천 (좋아요) - off
     * 단위 상품 선택을 하지 않았을 경우
     */
    @RequestMapping("/offRecommendFromOnline")
    @ResponseBody
    public ResponseEntity<?> offRecommendFromOnline(Long onlineProdSn) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        ShoppingMarkPostForDelete mark = new ShoppingMarkPostForDelete();
        mark.setOnlineProdSn(onlineProdSn);
        try {
        	shoppingmarkApi.deleteAllShoppingBookmarksUnder(getMemberSn(), mark);
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
    
    /**
     * 앱 다운 URL 문자 전송
     */
    @RequestMapping("/sendSms")
    @ResponseBody
    public ResponseEntity<?> sendSms(String cellNum) {
        HashMap<String, Object> result = new HashMap<String, Object>();
        
        try {
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
    }
}
