this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["review-write-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<option value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</option>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<option value=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewEvalResponseSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.responseBodyText : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"panel\">\n	<form class=\"validate\" action=\"\">\n		<fieldset class=\"form align_center\">\n			<h2 class=\"h_title page\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</h2>\n			<legend class=\"sr_only\">평점 선택</legend>\n			<div class=\"ui_rating large\">\n				<span class=\"heart\">\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_1\" value=\"1\" required data-msg=\"평점을 선택해 주세요.\"><label for=\"rate3_1\"><span class=\"sr_only\"> 1점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_2\" value=\"2\"><label for=\"rate3_2\"><span class=\"sr_only\"> 2점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_3\" value=\"3\"><label for=\"rate3_3\"><span class=\"sr_only\"> 3점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_4\" value=\"4\"><label for=\"rate3_4\"><span class=\"sr_only\"> 4점</span></label></span>\n					<span><input type=\"radio\" name=\"scope\" id=\"rate3_5\" value=\"5\"><label for=\"rate3_5\"><span class=\"sr_only\"> 5점</span></label></span>\n				</span>\n			</div>\n			<p class=\"text font_lg\">터치로 상품을 평가해 주세요!</p>\n		</fieldset>\n		<hr class=\"div m30\" />\n		<fieldset class=\"form\">\n			<legend class=\"sr_only\">리뷰 작성</legend>\n			<div class=\"input_group\">\n				<div class=\"label\">\n					<label for=\"option\">옵션</label>\n				</div>\n				<div>\n					<select name=\"prodSn\" id=\"option\" required data-msg=\"옵션을 선택해 주세요.\">\n						<option value=\"\">옵션을 선택해 주세요</option>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</select>\n				</div>\n			</div>\n			<div class=\"input_group\">\n				<div class=\"label\">\n					<label for=\"skintype\">피부타입</label>\n				</div>\n				<div>\n					<select name=\"skinTone\" id=\"skintype\" required data-msg=\"피부타입을 선택해 주세요.\">\n						<option value=\"\">피부타입을 선택해 주세요.</option>\n"
    + ((stack1 = helpers.each.call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.skinTone : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.responses : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</select>\n				</div>\n			</div>\n			<div class=\"input_group\">\n				<div class=\"label\">\n					<label for=\"title\">제목</label>\n				</div>\n				<div>\n					<input type=\"text\" name=\"prodReviewTitle\" id=\"title\" minlength=\"1\" maxlength=\"30\" placeholder=\"최대 30자까지 입력 가능합니다.\" required data-msg=\"제목을 입력해 주세요.\" />\n				</div>\n			</div>\n\n			<div>\n				<div class=\"textarea\">\n					<textarea name=\"prodReviewBodyText\" id=\"\" cols=\"\" rows=\"\" minlength=\"1\" maxlength=\"500\" placeholder=\"구매 상품 후기 작성＇은 마이에뛰드>주문조회>구매후기 작성 버튼을  눌러 작성해 주세요. 진주알 100알(사진 없는 리뷰는 50알)이 적립됩니다. (2015.06.01 주문 건 부터 적용됩니다.) 단, 구매하지 않아도 리뷰 작성은 가능합니다.\" required data-msg=\"후기를 입력해 주세요.\"></textarea>\n				</div>\n				<p class=\"text_right\"><small class=\"count\">0/500</small></p>\n			</div>\n\n			<div class=\"ui_input_images\">\n				<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" multiple=\"multiple\" style=\"display:none\" />\n				<label for=\"i_picture\" class=\"btn_md_neutral w100p mgt10\">사진첨부</label>\n				<ul class=\"attach\"></ul>\n				<p class=\"text_notice\">첨부파일은 이미지 파일만 가능하며, 최대 10개까지 등록 하실 수 있습니다. (최대 파일 용량 10MB)</p>\n			</div>\n\n			<div class=\"panel gray\">\n				<ul class=\"list_bullet_dot\">\n					<li>타인의 글 도용 및 올바르지 않은 리뷰 작성의 경우, 게시판 성격과 관련   없는 게시물은 임의로 삭제될 수 있으며 적립된 진주알의 3배만큼 차감 될 수 있습니다. (동일 내용의 반복 등록, 무의미한 내용 입력, 광고 및 욕설, 비방의 글,  성인글, 출처를 안 밝힌 뉴스기사  등)</li>\n					<li>저작권 등 다른 사람의 권리를 침해하거나 게시판 성격과 관련 없는  게시물은 임의로 삭제될 수 있습니다. (반복 등록된 글, 무의미한 내용,  광고 및 욕설, 비방의 글, 성인글 등)</li>\n				</ul>\n			</div>\n\n			<dl class=\"dl_cont\">\n				<dt class=\"h_title cont\"><strong>개인정보 수집 및 이용 동의 (필수)</strong></dt>\n				<dd>\n					<div class=\"panel gray\">\n						<ul class=\"list_bullet_dot\">\n							<li>수집 및 이용 항목 : 피부타입</li>\n							<li>수집 및 이용 목적 : 리뷰의 신뢰성 향상을 위해</li>\n							<li>이용·보유 및 이용 기간 : 회원탈퇴시까지</li>\n						</ul>\n						<ul class=\"list_bullet_dot mgt20\">\n							<li>신청자는 개인정보 수집 및 이용 동의에 거부할 수\n								있습니다. 다만, 거부할 경우 리뷰 작성이 불가능\n								합니다.</li>\n						</ul>\n					</div>\n					<div class=\"check_wrap mgt20\"><input type=\"checkbox\" name=\"reviewAgreePersonal\" id=\"review_agree_personal\" required data-msg=\"개인정보 수집 및 이용 동의가 필요합니다.\"><label for=\"review_agree_personal\">동의합니다.</label></div>\n				</dd>\n			</dl>\n\n			<input type=\"hidden\" name=\"prodReviewTypeCode\" value=\"Prod\">\n			<input type=\"hidden\" name=\"onlineProdSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\">\n			<input type=\"hidden\" name=\"prodReviewEvalQuestionSn\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.skinTone : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodReviewEvalQuestionSn : stack1), depth0))
    + "\">\n			<input type=\"hidden\" name=\"arrSurvey\" value=\"[]\">\n			<input type=\"hidden\" name=\"termsAgreeYn\" value=\"Y\">\n\n			<div class=\"form_btns\">\n				<button type=\"button\" class=\"btn_md_secondary btn_default_modal_cancel\">취소</button>\n				<button type=\"submit\" class=\"btn_md_primary submit\">등록</button>\n			</div>\n		</fieldset>\n	</form>\n</div>";
},"useData":true});