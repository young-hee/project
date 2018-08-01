/*
 * This software is the confidential and proprietary information of
 * UZEN Co.,Ltd., Inc. You shall not disclose such Confidential
 * Information and shall use it only in accordance with the terms of the
 * license agreement you entered into with UZEN.
 */
package kr.ap.emt.product.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import kr.ap.emt.display.vo.RequestEvent;
import kr.ap.emt.product.vo.RequestReview;
import kr.ap.comm.support.common.AbstractController;
import kr.ap.comm.support.validator.ReviewFormValidator;
import net.g1project.ecp.api.model.BooleanResult;
import net.g1project.ecp.api.model.EmbeddableTel;
import net.g1project.ecp.api.model.UploadingFile;
import net.g1project.ecp.api.model.sales.display.OnlineProdListStp;
import net.g1project.ecp.api.model.sales.product.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Ria@g1project.net
 * @since {version}
 */

@Controller
@RequestMapping("/product")
public class ProductRestController extends AbstractController {

    @Autowired
    ReviewFormValidator reviewFormValidator;
    
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
    
    /**
     * 상품평설문 목록
     * @param requestReview
     * @return
     */
    @GetMapping("/getProductReviewSurveys")
    @ResponseBody
    public ResponseEntity<?> getProductReviewSurveys(RequestReview requestReview) {
    	HashMap<String, Object> result = new HashMap<String, Object>();
    	
    	try {
    		
    		List<ProdReviewSurvey> prodReviewSurvey = productApi.getProductReviewSurveys(requestReview.getOnlineProdSn(), requestReview.getProdReviewType());
    		result.put("prodReviewSurvey", prodReviewSurvey);
    		
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
    @ResponseBody
    public ResponseEntity<?> reviewWithImages(ProdReviewPost prodReviewPost, MultipartFile[] picture, String arrSurvey, String multiWriteYn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		BooleanResult booleanResult = new BooleanResult();

		try {
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

							brList.add( createProdReview(prodReviewPost, picture, arrSurvey) );
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
				booleanResult = createProdReview(prodReviewPost, picture, arrSurvey);

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
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }

	private BooleanResult createProdReview(ProdReviewPost prodReviewPost, MultipartFile[] picture, String arrSurvey) throws IOException {

		List<ProdReviewImgPost> imgList = new ArrayList<ProdReviewImgPost>();
		for (int i = 0; picture != null && i < picture.length; i++) {

			ProdReviewImgPost prodReviewImgPost = new ProdReviewImgPost();
			prodReviewImgPost.setSortOrder(i + 1);
			prodReviewImgPost.setDetailSortOrder(1);
			prodReviewImgPost.setMediaExistYn("Y");
			prodReviewImgPost.setVideoYn("N");
			prodReviewImgPost.setFile(imageSetting(picture[i]));
			imgList.add(prodReviewImgPost);
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
    @ResponseBody
    public ResponseEntity<?> updateReviewWithImages(ProdReviewUpdate prodReviewUpdate, MultipartFile[] picture, HttpServletRequest req, String arrSurvey) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
		        	
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
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }

    
    /**
     * 상품평 삭제
     * @param prodReviewSn
     * @return
     */
    @PostMapping("/deleteProdReview")
    @ResponseBody
    public ResponseEntity<?> deleteProdReview(Long prodReviewSn) {
    	HashMap<String, Object> result = new HashMap<String, Object>();
        
    	try {
    		BooleanResult booleanResult = productApi.deleteProductReview(prodReviewSn, getMemberSn());
			result.put("booleanResult", booleanResult);
	        
	        return ResponseEntity.ok(result);
    	 } catch (Exception e) {
    		 result.put("errorData", e);
             return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
         }
    }

    /**
     * 재입고알림신청
     * @param restockNotify
     * @param prePhoneNo
     * @param prodSn
     * @return
     */
    @RequestMapping("/restockNotify")
    @ResponseBody
    public ResponseEntity<?> restockNotify(RestockNotify restockNotify, String prePhoneNo, Long prodSn) {
		HashMap<String, Object> result = new HashMap<String, Object>();
		
		try {
			restockNotify.setMemberSn(getMemberSn());
			
			EmbeddableTel embeddableTel = new EmbeddableTel();
			embeddableTel.setPhoneNo(prePhoneNo);
			
			restockNotify.setPhoneNo( embeddableTel);
			
			BooleanResult booleanResult = productApi.restockNotify(prodSn, restockNotify);
            result.put("booleanResult", booleanResult);
	        
	        return ResponseEntity.ok(result);
		} catch (Exception e) {
			result.put("errorData", e);
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(result);
		}

    }
    
    /**
     * 동시구매기획전그룹별 상품목록
     * @param requestEvent
     * @return
     */
    @RequestMapping("/getInSameTimePurProdGrp")
    @ResponseBody
    public ResponseEntity<?> getInSameTimePurProdGrp(RequestEvent requestEvent) {
    	HashMap<String, Object> result = new HashMap<String, Object>();
    	try {
    		
    		OnlineProdListStp onlineProdList  
    			= displayApi.getInSameTimePurProdGrpProdList(
    					requestEvent.getSameTimePurProdGrpSn()		//동시구매기획전그룹일련번호
    					, requestEvent.getExcludeSoldOut()			//품절된 상품을 상품 목록 또는 콘텐츠에서 제외할지 여부 (default=false)
    					, requestEvent.getOffset()					//상품 리스트의 오프셋
    					, requestEvent.getLimit()					//아이템(상품/기획전시/콘텐츠) 리스트의 사이즈
    					, requestEvent.getIncludeFilters()			//필터용 정보들도 포함해서 내려보내야 하는지
    					, requestEvent.getDisplayCateDepth()		//클라이언트가 필터를 요청하는 경우, 내려받을 전시카테고리 depth의 최대값
    					, requestEvent.getDisplayCate()				//display_cate_sn. 예) “1,50”
    					, requestEvent.getBrand()					//brand_sn. 예) “2,995”
    					, requestEvent.getFlag()					//예) “icon_reco_new,icon_reco_md”
    					, requestEvent.getAttr()					//예) “color=red,color=blue,size=L,size=XL”
    					, requestEvent.getPriceRange()				//예1) “10000,”- 10000~ 예2) “2000,8000”- 2000~8000 예3) “,50000”- ~50000
    				);
    		result.put("onlineProdList", onlineProdList);
    		
    		return ResponseEntity.ok(result);
    	} catch (Exception e) {
    		result.put("errorData", e);
    		return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(result);
    	}
    }

    // private method
    private File MultiPartToFile(MultipartFile mul, String filePath) {
        File convF = new File(filePath + mul.getOriginalFilename());
        try {
            mul.transferTo(convF);
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }

        return convF;
    }
}
