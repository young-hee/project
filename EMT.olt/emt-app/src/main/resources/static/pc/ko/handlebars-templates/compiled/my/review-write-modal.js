this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["review-write-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "											<li>\n												<span>"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n												<input type=\"hidden\" name=\"ps\" value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.reviewWriteYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "											</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "													<b class=\"on\">작성완료</b>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.reviewWriteYn : depth0),"==","N",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "								<li class=\"select_option\">\n								<code class=\"label_markup\" style=\"display:none\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</code>\n								<a data-value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\" data-selected=\"true\">\n									<span>\n										<span><img alt=\"\" src=\""
    + alias2(alias1((depth0 != null ? depth0.repProdImage : depth0), depth0))
    + "\"></span>\n										<span>"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n									</span>\n								</a>\n							</li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "										<option value=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewEvalResponseSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.responseBodyText : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<form class=\"validate\" action=\"\">\n	<!-- tab menu wrap -->\n	<div class=\"ui_tab\">\n		<!-- tab menu -->\n		<div class=\"tab_menu box equally\">\n			<ul>\n				<li class=\"on\"><button type=\"button\">전체 쓰기</button></li>\n				<li><button type=\"button\">상품선택 쓰기</button></li>\n			</ul>\n		</div>\n		<!-- tab contents wrap -->\n		<div class=\"tab_contents\">\n			<!-- tab content -->\n			<div class=\"tab_cont tab_all_writing\">\n				<h3 class=\"sr_only\">전체 쓰기</h3>\n				<div class=\"all_writing_wrap\">\n					<div>주문번호<a href=\"/my/page/order/detail/"
    + alias2(alias1((depth0 != null ? depth0.orderNo : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.orderNo : depth0), depth0))
    + "</a></div>\n					<div>\n						전체주문상품\n						<span class=\"ui_tooltip_wrap\">\n							<span class=\"ui_tooltip\">\n								<button type=\"button\" class=\"btn_tooltip\">툴팁보기</button>\n								<span class=\"arr\"></span>\n								<span class=\"layer_tooltip\">\n									<span class=\"title bdb_none\">전체주문상품 "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1.length : stack1), depth0))
    + "개</span>\n									<ul>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									</ul>\n									<button type=\"button\" class=\"ui_close\"><span class=\"sr_only\">툴팁 닫기</span></button>\n								</span>\n							</span>\n						</span>\n					</div>\n				</div>\n			</div>\n			<div class=\"tab_cont tab_select_product_writing\">\n				<h3 class=\"sr_only\">상품선택 쓰기</h3>\n				<div class=\"ui_select\" data-not-label-change=\"true\">\n					<input type=\"hidden\" name=\"\">\n					<button type=\"button\">상품을 선택해 주세요.</button>\n					<ul class=\"select_options select_product_writing\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</div>\n				<span class=\"item_name typ2 item_name_writing\">\n					<span class=\"img\"><img name=\"selected_prodImage\" src=\"\" alt=\"\"></span>\n					<span class=\"tit\" name=\"selected_prodName\"></span>\n				</span>\n			</div>\n		</div>\n	</div>\n\n	<dl class=\"review_write_layer\">\n		<dt class=\"review_header typ2\">\n			<span class=\"item_name\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n			<span class=\"ui_rating xl typ2\">\n				<span class=\"heart\">\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_1\" value=\"1\" required data-msg=\"평점을 선택해 주세요.\"><label for=\"rate3_1\"><span class=\"sr_only\"> 1점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_2\" value=\"2\"><label for=\"rate3_2\"><span class=\"sr_only\"> 2점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_3\" value=\"3\"><label for=\"rate3_3\"><span class=\"sr_only\"> 3점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_4\" value=\"4\"><label for=\"rate3_4\"><span class=\"sr_only\"> 4점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_5\" value=\"5\"><label for=\"rate3_5\"><span class=\"sr_only\"> 5점</span></label></span>\n				</span>\n			</span>\n			<small class=\"font_sl\">터치로 상품을 평가해 주세요!</small>\n		</dt>\n		<dd>\n			<fieldset class=\"form lined\">\n				<legend class=\"sr_only\">질문 입력 항목</legend>\n				<div class=\"ui_table\">\n					<dl>\n						<dt>피부타입</dt>\n						<dd>\n							<div class=\"select_wrap w100p\">\n								<select name=\"skinTone\" id=\"skintype\" required data-msg=\"피부타입을 선택해 주세요.\" tabindex=\"-1\">\n									<option value=\"\">피부타입을 선택해 주세요.</option>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.skinTone : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.responses : stack1),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</select>\n							</div>\n						</dd>\n					</dl>\n					<dl>\n						<dt>제목</dt>\n						<dd>\n							<div class=\"input_wrap w100p\"><input type=\"text\" title=\"제목 입력\" placeholder=\"최대 30자까지 입력 가능합니다.\" name=\"prodReviewTitle\" id=\"title\" minlength=\"1\" maxlength=\"30\" required data-msg=\"제목을 입력해 주세요.\"></div>\n						</dd>\n					</dl>\n					<dl>\n						<dt>내용</dt>\n						<dd>\n							<div class=\"textarea w100p\">\n								<textarea name=\"prodReviewBodyText\" id=\"\" cols=\"\" rows=\"\" minlength=\"1\" maxlength=\"500\" placeholder=\"구매 상품 후기 작성＇은 마이에뛰드>주문조회>구매후기 작성 버튼을  눌러 작성해 주세요. 진주알 100알(사진 없는 리뷰는 50알)이 적립됩니다. (2015.06.01 주문 건 부터 적용됩니다.) 단, 구매하지 않아도 리뷰 작성은 가능합니다.\" required data-msg=\"후기를 입력해 주세요.\"></textarea>\n							</div>\n							<p class=\"text_right w100p\"><small><em class=\"current\">0</em>/<span class=\"limits\">500</span></small></p>\n						</dd>\n					</dl>\n				</div>\n				<div class=\"attach_wrap ui_input_images\">\n					<!--[if lte ie 9]>\n					<div class=\"input_btn_wrap\">\n						<span class=\"input_wrap\">\n							<input class=\"input_file_name ie9_lte\" type=\"text\" title=\"첨부 파일 선택\" readonly value=\"\">\n							<button class=\"input_del\"><i class=\"ico_close_w\"></i><span class=\"sr_only\">첨부파일 삭제</span></button>\n						</span>\n						<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\">\n						<label for=\"i_picture\" class=\"btn_md_form\">파일 선택</label>\n					</div>\n					<ul class=\"list_bullet_dot mgt5\">\n						<li>10MB미만의 jpg, gif, png의 이미지 파일</li>\n						<li>internet Explorer 9.0버전에서는 첨부파일 1개만 가능합니다.</li>\n					</ul>\n					<![endif]-->\n					<!--[if gt ie 9]><!-->\n					<ul class=\"attach\">\n						<li class=\"input_file_btn_area\">\n							<div class=\"attach_file\">\n								<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" multiple=\"multiple\">\n								<label for=\"i_picture\">사진 첨부</label>\n							</div>\n						</li>\n					</ul>\n					<p class=\"text\">이미지 파일만 가능 / 최대 10개 / 최대 파일 용량 10MB</p>\n					<!--<![endif]-->\n				</div>\n				<ul class=\"list_bullet_dot mgt30 light\">\n					<li>타인의 글 도용 및 올바르지 않은 리뷰 작성의 경우, 게시판 성격과 관련 없는 게시물은 임의로 삭제될 수 있으며 적립된 진주알의 3배만큼 차감될 수 있습니다.<br>\n						(동일 내용의 반복 등록, 무의미한 내용 입력, 광고 및 욕설, 비방의 글, 성인글, 출처를 안 밝힌 뉴스기사 등)\n					</li>\n					<li>\n						저작권 등 다른 사람의 권리를 침해하거나 게시판 성격과 관련 없는 게시물은 임의로 삭제될 수 있습니다. (반복 등록된 글, 무의미한 내용, 광고 및 욕설, 비방의 글, 성인글 등)\n					</li>\n				</ul>\n\n				<dl class=\"dl_cont mgt40\">\n					<dt class=\"h_title font_lg\"><b>개인정보 수집 및 이용 동의 (필수)</b></dt>\n					<dd class=\"light\">\n						<ul class=\"list_bullet_dot\">\n							<li>수집 및 이용 항목 : 피부타입</li>\n							<li>수집 및 이용 목적 : 리뷰의 신뢰성 향상을 위해</li>\n							<li>이용·보유 및 이용 기간 : 회원탈퇴시까지</li>\n						</ul>\n						<ul class=\"list_bullet_dot mgt20\">\n							<li>신청자는 개인정보 수집 및 이용 동의에 거부할 수\n								있습니다. 다만, 거부할 경우 리뷰 작성이 불가능\n								합니다.</li>\n						</ul>\n						<div class=\"check_wrap mgt20\"><input type=\"checkbox\" name=\"reviewAgreePersonal\" id=\"review_agree_personal\" required data-msg=\"개인정보 수집 및 이용 동의가 필요합니다.\"><label for=\"review_agree_personal\">동의합니다.</label></div>\n					</dd>\n				</dl>\n\n				<input type=\"hidden\" name=\"prodReviewTypeCode\" value=\"Pur\">\n				<input type=\"hidden\" name=\"onlineProdSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\">\n				<input type=\"hidden\" name=\"ordNo\" value=\""
    + alias2(alias1((depth0 != null ? depth0.orderNo : depth0), depth0))
    + "\">\n				<input type=\"hidden\" name=\"ordProdSn\" value=\"\">\n				<input type=\"hidden\" name=\"prodSn\" value=\"\">\n				<input type=\"hidden\" name=\"multiWriteYn\" value=\"N\">\n				<input type=\"hidden\" name=\"prodReviewEvalQuestionSn\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.skinTone : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodReviewEvalQuestionSn : stack1), depth0))
    + "\">\n				<input type=\"hidden\" name=\"arrSurvey\" value=\"\">\n				<input type=\"hidden\" name=\"termsAgreeYn\" value=\"Y\">\n\n				<div class=\"form_btns\">\n					<button type=\"button\" class=\"btn_lg_secondary btn_default_modal_cancel\">취소</button>\n					<button type=\"submit\" class=\"btn_lg_primary submit\">리뷰 등록</button>\n				</div>\n			</fieldset>\n		</dd>\n	</dl>\n</form>";
},"useData":true});