package kr.ap.amt.api.pshop;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;

import kr.ap.amt.api.pshop.vo.PShopResult;
import kr.ap.comm.api.RequestData;

public class PShopServiceImpl implements PShopService{

    private static final ObjectMapper mapper;
	private Logger logger = LoggerFactory.getLogger(getClass());


	static {
		mapper = new ObjectMapper();
        mapper.setSerializationInclusion(Include.NON_NULL);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
	}


    @Value("${pshop.api.base-url}")
    private String baseUrl;

	@Override
	public PShopResult userInfoPass(String v_userid, String v_pass_word) {

        RequestData data = new RequestData();
        
        Map<String, String> postData = new HashMap<String, String>();
        
        postData.put("v_userid", v_userid);
        postData.put("v_pass_word", v_pass_word);
        
        try {
			String json = data.doPost(baseUrl + "pss/userinfopass/v1.00", mapper.writeValueAsString(postData));
			PShopResult vo = mapper.readValue(json, PShopResult.class);
			return vo;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			
		}
        return null;
	}

}
