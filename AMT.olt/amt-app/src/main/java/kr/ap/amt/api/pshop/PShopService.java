package kr.ap.amt.api.pshop;

import java.util.Map;

import kr.ap.amt.api.pshop.vo.PShopResult;

public interface PShopService {

	PShopResult userInfoPass(String v_userid, String v_pass_word);
}
