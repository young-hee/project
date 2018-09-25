package kr.ap.amt.product.controller;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import feign.Param;
import kr.ap.amt.product.vo.ExternalVO;
import kr.ap.amt.product.vo.RequestReview;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.constants.APConstant;
import net.g1project.ecp.api.client.ISO8601DateTimeExpander;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.UploadingFile;
import net.g1project.ecp.api.model.sales.display.OnlineProdList;
import net.g1project.ecp.api.model.sales.product.ProdRecommendReq;
import net.g1project.ecp.api.model.sales.product.ProdReviewImg;
import net.g1project.ecp.api.model.sales.product.ProdReviewImgPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewImgUpdate;
import net.g1project.ecp.api.model.sales.product.ProdReviewInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewListInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewSurveyPost;
import net.g1project.ecp.api.model.sales.product.ProdReviewUpdate;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderInfo;
import net.g1project.ecp.api.model.sales.product.ProdReviewWritableOrderProd;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPost;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkPostForDelete;
import net.g1project.ecp.api.model.sales.shoppingmark.ShoppingMarkSearchResult;

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
			ProdReviewListInfo prodReviewListInfo = productApi.getProductReviews(
				requestReview.getProdReviewUnit(),
				requestReview.getProdReviewType(),
				requestReview.getOffset(),
				requestReview.getLimit(),
				getMemberSn(),
				requestReview.getOnlineProdSn(),
				requestReview.getProdSn(),
				requestReview.getStyleCode(),
				null, /* regularEventSn */
				requestReview.getProdReviewSort(),
				requestReview.getScope(),
				requestReview.getTopReviewOnlyYn(),
				requestReview.getTopReviewFirstYn(),
				(!requestReview.getStartDate().isEmpty()) ? sf.parse(requestReview.getStartDate()) : null,
				(!requestReview.getEndDate().isEmpty()) ? sf.parse(requestReview.getEndDate()) : null,
				"N",
				APConstant.AP_DISPLAY_MENU_SET_ID,
				requestReview.getDisplayMenuId());
    		
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
					info.setProdReviewSn(173L);
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
    @RequestMapping("/getShoppingBookmarks")
    @ResponseBody
    public ResponseEntity<?> getShoppingBookmarks(ShoppingMarkPost markPost, int offset, int limit) {
        HashMap<String, Object> result = new HashMap<String, Object>();

        try {
        	ShoppingMarkSearchResult shoppingMarkSearchResult = shoppingmarkApi.getShoppingBookmarks(getMemberSn(), APConstant.AP_DISPLAY_MENU_SET_ID, offset, limit);
        	result.put("shoppingMarkSearchResult", shoppingMarkSearchResult);
        } catch (Exception e) {
            result.put("errorData", e);
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
        }
        
        return ResponseEntity.ok(result);
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
    
    /**
	 * 상품평 등록
	 * @param prodReviewPost ProdReviewPost
	 * @param picture MultipartFile[]
	 * @param arrSurvey
	 * @param multiWriteYn
	 */
	@RequestMapping("/reviewWithImages")
    public ResponseEntity<?> reviewWithImages(ProdReviewPost prodReviewPost, MultipartFile[] picture, String arrSurvey, String multiWriteYn) throws IOException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		BooleanResult booleanResult = new BooleanResult();
		List<UploadingFile> fileDataList = new ArrayList<UploadingFile>();

		if (!StringUtils.isEmpty(multiWriteYn) && "Y".equals(multiWriteYn)) {

			//주문후기 작성시 복수개 처리
			////-> 화면에 하나만 작성하고, 주문번호로 조회해서 복수개 등록
			List<BooleanResult> brList = new ArrayList<BooleanResult>();
			ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), prodReviewPost.getOrdNo(), 0, 1);
			if (productReviewWritableOrders.getTotalCount() > 0) {
				List<ProdReviewWritableOrderProd> orderProds = productReviewWritableOrders.getOrders().get(0).getOrderProds();
				for (ProdReviewWritableOrderProd p : orderProds) {
					if ("N".equals(p.getReviewWriteYn())) {
						prodReviewPost.setOrdProdSn(p.getOrdProdSn());
						prodReviewPost.setProdSn(Long.valueOf(p.getProdSn()));

						brList.add( createProdReview(prodReviewPost, picture, arrSurvey, multiWriteYn, fileDataList) );
					}
				}

				booleanResult.setResult(false);
				for (BooleanResult br : brList) {
					if (br.isResult()) {
						//하나라도 성공이면 성공
						booleanResult.setResult(true);
					} else {
						//실패건 있으면
						result.put("failureExist", true);
					}
				}
			} else {
				booleanResult.setResult(false);
			}

		} else {
			booleanResult = createProdReview(prodReviewPost, picture, arrSurvey, multiWriteYn, fileDataList);

			//같은 주문에 리뷰 전부 작성완료 여부 확인
			Boolean writableExist = false;
			ProdReviewWritableOrderInfo productReviewWritableOrders = productApi.getProductReviewWritableOrders(getMemberSn(), prodReviewPost.getOrdNo(), 0, 1);
			if (productReviewWritableOrders.getTotalCount() > 0) {
				List<ProdReviewWritableOrderProd> orderProds = productReviewWritableOrders.getOrders().get(0).getOrderProds();
				for (ProdReviewWritableOrderProd p : orderProds) {
					if ("N".equals(p.getReviewWriteYn())) {
						writableExist = true;
						break;
					}
				}
			}
			result.put("writableExist", writableExist);
		}

		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);
    }

	private BooleanResult createProdReview(ProdReviewPost prodReviewPost, MultipartFile[] picture, String arrSurvey, String multiWriteYn, List<UploadingFile> fileDataList) throws IOException {

		List<ProdReviewImgPost> imgList = new ArrayList<ProdReviewImgPost>();

		if ("Y".equals(multiWriteYn) && fileDataList.size() > 0) {
			//복수 첫번째 리뷰 아닌 경우
			for (int i = 0; i < fileDataList.size(); i++) {
				ProdReviewImgPost prodReviewImgPost = new ProdReviewImgPost();
				prodReviewImgPost.setSortOrder(i + 1);
				prodReviewImgPost.setDetailSortOrder(1);
				prodReviewImgPost.setMediaExistYn("Y");
				prodReviewImgPost.setVideoYn("N");

				prodReviewImgPost.setFile(fileDataList.get(i));
				imgList.add(prodReviewImgPost);
			}
		} else {
			//단수 혹은 복수 첫번째 리뷰
			for (int i = 0; picture != null && i < picture.length; i++) {
				ProdReviewImgPost prodReviewImgPost = new ProdReviewImgPost();
				prodReviewImgPost.setSortOrder(i + 1);
				prodReviewImgPost.setDetailSortOrder(1);
				prodReviewImgPost.setMediaExistYn("Y");
				prodReviewImgPost.setVideoYn("N");

				UploadingFile singleTempFile = imageSetting(picture[i]);
				prodReviewImgPost.setFile(singleTempFile);
				imgList.add(prodReviewImgPost);

				if ("Y".equals(multiWriteYn)) {
					fileDataList.add(singleTempFile);
				}
			}
		}

		prodReviewPost.setMemberSn(getMemberSn());
		prodReviewPost.setImgList(imgList);

		ObjectMapper objectMapper = new ObjectMapper();

		if (arrSurvey != null && !"".equals(arrSurvey)) {
			List<HashMap<String, String>> surveyList = objectMapper.readValue(arrSurvey, new TypeReference<List<HashMap<String, String>>>() {
			});

			List<ProdReviewSurveyPost> surveys = new ArrayList<ProdReviewSurveyPost>();

			for (int i = 0; i < surveyList.size(); i++) {
				Map<String, String> surveyMap = surveyList.get(i);
				Long prodReviewEvalQuestionSn = Long.parseLong(surveyMap.get("prodReviewEvalQuestionSn"));
				Long prodReviewEvalResponseSn = Long.parseLong(surveyMap.get("prodReviewEvalResponseSn"));

				ProdReviewSurveyPost prodReviewSurveyPost = new ProdReviewSurveyPost();

				prodReviewSurveyPost.setProdReviewEvalQuestionSn(prodReviewEvalQuestionSn);
				prodReviewSurveyPost.setProdReviewEvalResponseSn(prodReviewEvalResponseSn);

				surveys.add(prodReviewSurveyPost);
			}

			prodReviewPost.setSurveys(surveys);
		}

		return productApi.postProdReview(prodReviewPost);
	}

	/**
	 * 상품평 수정
	 * @param prodReviewUpdate, MultipartFile[] picture, HttpServletRequest req
	 * @return
	 */
	@RequestMapping("/updateReviewWithImages")
    public ResponseEntity<?> updateReviewWithImages(ProdReviewUpdate prodReviewUpdate, MultipartFile[] picture, HttpServletRequest req, String arrSurvey) throws IOException {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		List<ProdReviewImgUpdate> imgList = new ArrayList<ProdReviewImgUpdate>();
		for(int i=0; picture != null && i<picture.length; i++) {

			ProdReviewImgUpdate prodReviewImgUpdate = new ProdReviewImgUpdate();
			prodReviewImgUpdate.setSortOrder(i+1);
			prodReviewImgUpdate.setDetailSortOrder(1);
			prodReviewImgUpdate.setMediaExistYn("Y");
			prodReviewImgUpdate.setVideoYn("N");
			UploadingFile tempFile = imageSetting(picture[i]);
			if( tempFile != null ) {
				prodReviewImgUpdate.setFile(tempFile);
				imgList.add(prodReviewImgUpdate);
			}
		}

		prodReviewUpdate.setMemberSn( getMemberSn());
		prodReviewUpdate.setImgList(imgList);

		ObjectMapper objectMapper = new ObjectMapper();


		if( arrSurvey != null && !"".equals(arrSurvey)) {
			List<HashMap<String, String>> surveyList = objectMapper.readValue(arrSurvey, new TypeReference<List<HashMap<String, String>>>(){});

			List<ProdReviewSurveyPost> surveys = new ArrayList <ProdReviewSurveyPost> ();

			for(int i=0;i < surveyList.size(); i++) {
				Map <String, String> surveyMap = surveyList.get(i);
				Long prodReviewEvalQuestionSn = Long.parseLong( surveyMap.get("prodReviewEvalQuestionSn"));
				Long prodReviewEvalResponseSn = Long.parseLong( surveyMap.get("prodReviewEvalResponseSn"));

				ProdReviewSurveyPost prodReviewSurveyPost = new ProdReviewSurveyPost();

				prodReviewSurveyPost.setProdReviewEvalQuestionSn(prodReviewEvalQuestionSn);
				prodReviewSurveyPost.setProdReviewEvalResponseSn(prodReviewEvalResponseSn);

				surveys.add(prodReviewSurveyPost);
			}

			prodReviewUpdate.setSurveys(surveys);
		}

		BooleanResult booleanResult = productApi.updateProdReview(prodReviewUpdate);

		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);

    }

    
    /**
     * 상품평 삭제
     * @param prodReviewSn
     * @return
     */
    @PostMapping("/deleteProdReview")
    public ResponseEntity<?> deleteProdReview(Long prodReviewSn) {
    	HashMap<String, Object> result = new HashMap<String, Object>();

		BooleanResult booleanResult = productApi.deleteProductReview(prodReviewSn, getMemberSn());
		result.put("booleanResult", booleanResult);

		return ResponseEntity.ok(result);
    }
}
