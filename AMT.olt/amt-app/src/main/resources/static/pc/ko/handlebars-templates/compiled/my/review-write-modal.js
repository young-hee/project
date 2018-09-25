this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["review-write-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<dl>\n				<dt class=\"h_title font_lg\"><strong>"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.questionHeader : stack1), depth0))
    + "은 어떤가요?</strong></dt>\n				<dd class=\"check_set\">\n					<input type=\"hidden\" name=\"surveys["
    + alias2(alias1(blockParams[0][1], depth0))
    + "].prodReviewEvalQuestionSn\" value=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.prodReviewEvalQuestionSn : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[0][0]) != null ? stack1.responses : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "				</dd>\n			</dl>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "					<span>\n						<input type=\"radio\" name=\"surveys["
    + alias2(alias1(blockParams[1][1], depth0))
    + "].prodReviewEvalResponseSn\" value=\""
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.prodReviewEvalResponseSn : stack1), depth0))
    + "\" id=\"rate_check1_"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.prodReviewEvalResponseSn : stack1), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(alias3,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias3,blockParams[0][1],0,{"name":"eq","hash":{},"data":data,"blockParams":blockParams}),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ">\n						<label for=\"rate_check1_"
    + alias2(alias1((depth0 != null ? depth0.prodReviewEvalResponseSn : depth0), depth0))
    + "\">"
    + alias2(alias1(((stack1 = blockParams[0][0]) != null ? stack1.responseBodyText : stack1), depth0))
    + "</label>\n					</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "checked=\"\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<form class=\"validate\" action=\"\">\n	<fieldset class=\"form review_write_layer\">\n		<legend class=\"sr_only\">구매리뷰 작성 항목</legend>\n		\n		<div class=\"ui_rating\">\n			<p class=\"font_lg color_light_gray\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</p>\n			<span class=\"heart\">\n				<span><input type=\"radio\" name=\"scope\" id=\"rate_point_1\" value=\"1\" required data-msg=\"평점을 선택해 주세요.\" checked=\"\"><label for=\"rate_point_1\"><span class=\"sr_only\"> 1점</span></label></span>\n				<span><input type=\"radio\" name=\"scope\" id=\"rate_point_2\" value=\"2\"><label for=\"rate_point_2\"><span class=\"sr_only\"> 2점</span></label></span>\n				<span><input type=\"radio\" name=\"scope\" id=\"rate_point_3\" value=\"3\"><label for=\"rate_point_3\"><span class=\"sr_only\"> 3점</span></label></span>\n				<span><input type=\"radio\" name=\"scope\" id=\"rate_point_4\" value=\"4\"><label for=\"rate_point_4\"><span class=\"sr_only\"> 4점</span></label></span>\n				<span><input type=\"radio\" name=\"scope\" id=\"rate_point_5\" value=\"5\"><label for=\"rate_point_5\"><span class=\"sr_only\"> 5점</span></label></span>\n			</span>\n			<span class=\"font_lg\">별점을 선택해주세요.</span>\n		</div>\n	\n		<div class=\"review_rating\">\n			<h3 class=\"h_title font_lg\">상품을 자세히 평가해주세요.</h3>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.productReviewSurveys : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "		</div>\n	\n		<div class=\"review_photo\">\n			<h3 class=\"h_title font_lg\">사진 또는 동영상을 올려주세요.</h3>\n			<p>사진 또는 동영상을 3장 이상 올리시면 <strong>뷰티포인트 1,000P</strong>가 추가로 지급됩니다.</p>\n	\n			<!--/* 사진 업로드 */-->\n			<div class=\"attach_wrap ui_input_images\" data-pur-review=\"true\">\n				<!--[if gt ie 9]><!-->\n				<ul class=\"attach\">\n					<li class=\"input_file_btn_area\">\n						<div class=\"attach_file etc\">\n							<input type=\"file\" id=\"attach1\" multiple=\"multiple\">\n							<label for=\"attach1\"></label>\n						</div>\n					</li>\n					<li class=\"imageTypeWrap\">\n						<div class=\"attach_file etc\">\n							<label class=\"noLabal\">개봉전</label>\n						</div>\n					</li>\n					<li class=\"imageTypeWrap\">\n						<div class=\"attach_file etc\">\n							<label class=\"noLabal\">개봉후</label>\n						</div>\n					</li>\n					<li class=\"imageTypeWrap\">\n						<div class=\"attach_file etc\">\n							<label class=\"noLabal\">사용감</label>\n						</div>\n					</li>\n				</ul>\n				<!--<![endif]-->\n			</div>\n		</div>\n	\n		<div class=\"review_comment\">\n			<h3 class=\"h_title font_lg\">구매리뷰를 입력해주세요</h3>\n			<p>상품에 대한 솔직한 리뷰를 작성해주세요.<br>\n				20자 이상 작성시 150포인트, 120자 이상 작성시 500포인트가 지급됩니다.<br>\n				근거 없는 비방, 관련없는 내용의 리뷰는 삭제될 수 있습니다.</p>\n	\n			<div>\n				<div class=\"textarea\">\n					<textarea name=\"prodReviewBodyText\" id=\"prodReviewBodyText\" cols=\"30\" rows=\"5\" placeholder=\"리뷰는 최소 20자 이상 작성해주세요\" maxlength=\"800\"></textarea>\n				</div>\n				<p class=\"text_right\"><small><em class=\"current\">0</em>/<span class=\"limits\">800</span></small></p>\n			</div>\n		</div>\n	</fieldset>\n	<div class=\"layer_btns\">\n			<p class=\"terms_msg\">등록된 사진 및 리뷰는 Ap몰의 국내/외 마케팅에 활용될 수 있습니다. </p>\n			<!-- 약관보기 -->\n			<div class=\"tgArea\">\n				<dl>\n					<dt>\n						<a href=\"javascript:;\">자세한 약관보기</a>\n					</dt>\n					<dd>\n						<p>아모레퍼시픽몰 구매리뷰 이용약관</p>\n						<ul class=\"depth2\">\n							<li>\n								1. 게시물 등록은 정회원(로그인한 회원)만 등록 가능하며\n								그 외 로그인하지 않은 회원은 게시물 확인만 가능합니다.\n							</li>\n							<li>\n								2. 게시물 작성시 타인의 글 도용 및 타인에 대한 비방, 욕설 등\n								타인의 권리를 침해하는 내용, 게시판 취지에 맞지 않는 내용은\n								사전 통보 없이 삭제될 수 있습니다.\n							</li>\n							<li>\n								3. 게시물이 저작권법 등 법령에 위배될 경우, 이와 관련된 법적\n								책임은 게시물을 작성한 회원님이 부담합니다.\n							</li>\n							<li>\n								4. 회원님이 등록한 게시물은 향후 해당 사이트 및 회사가 직접\n								운영하는 다른 쇼핑몰의 구매리뷰, 회사의 국내·외적인 홍보\n								활동 등을 위하여 사용될 수 있음에 동의합니다.\n							</li>\n							<li>\n								5. 회원님이 구매리뷰에 제공한 회원님의 초상은 향후 해당\n								사이트 및 회사가 직접 운영하는 다른 쇼핑몰의 구매리뷰,\n								회사의 국내/외적인 홍보활동을 위하여 사용될 수 있음에\n								동의합니다.\n							</li>\n						</ul>\n					</dd>\n				</dl>\n			</div>\n			<!-- //약관보기-->\n		<button class=\"btn_xlg_primary w100p btn_default_modal_confirm\" type=\"button\" disabled><span class=\"ie_press\">등록하기</span></button>\n	</div>\n	<input type=\"hidden\" name=\"ordNo\" value=\""
    + alias2(alias1((depth0 != null ? depth0.ordNo : depth0), depth0))
    + "\">\n	<input type=\"hidden\" name=\"ordProdSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.ordProdSn : depth0), depth0))
    + "\">\n	<input type=\"hidden\" name=\"onlineProdSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\">\n	<input type=\"hidden\" name=\"prodSn\" value=\""
    + alias2(((helper = (helper = helpers.prodSn || (depth0 != null ? depth0.prodSn : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias3,{"name":"prodSn","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\n	<input type=\"hidden\" name=\"prodReviewTypeCode\" value=\"Pur\">\n</form>\n";
},"useData":true,"useBlockParams":true});