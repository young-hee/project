this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["store"] = this["AP"]["handlebars"]["display"]["store"] || {};

this["AP"]["handlebars"]["display"]["store"]["store-compliment-modify"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li data-img-sn=\""
    + alias2(alias1((depth0 != null ? depth0.storeEvalImgSn : depth0), depth0))
    + "\">\n							<img src=\""
    + alias2(alias1((depth0 != null ? depth0.storeEvalImgUrl : depth0), depth0))
    + "\" style=\"height:100%\">\n							<button type=\"button\" class=\"btn_del\">\n								<span class=\"sr_only\">첨부파일 삭제</span>\n							</button>\n						</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"panel brand_praise\">\n	<h2 class=\"h_title page\">칭찬 작성/수정하기</h2>\n	<p class=\"text font_md\">고객님께 감동을 준 매장을 선택하여 칭찬 후기를 남겨주세요!</p>\n	<hr class=\"div m30\">\n	<form class=\"validate\" method=\"post\" enctype=\"multipart/form-data\">\n\n		<input type=\"hidden\" name=\"storeEvalSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.storeEvalSn : depth0), depth0))
    + "\">\n		<input type=\"hidden\" name=\"displayYn\" value=\"Y\">\n\n		<fieldset class=\"form\">\n			<legend class=\"sr_only\">칭찬 작성/수정</legend>\n			<h4 class=\"h_title cont mgt0\"><strong>"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "님의 기본 정보</strong></h4>\n			<div class=\"view_group\">\n				<span>아이디</span>\n				<span>"
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "</span>\n			</div>\n			<div class=\"store_finder_wrap\">\n				<span style=\"\">선택매장 : </span><input type=\"text\" name=\"storeName\" class=\"storeNm\" readonly=\"\" value=\""
    + alias2(alias1((depth0 != null ? depth0.storeName : depth0), depth0))
    + "\" required=\"required\" data-msg-required=\"친절 매장을 선택해주세요.\">\n				<input type=\"hidden\" name=\"storeSn\" class=\"storeSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "\">\n			</div>\n			<h4 class=\"h_title sub color_gray font_df\">매장을 추천하게 된 이유를 선택해주세요.</h4>\n			<div class=\"reason\">\n				<div class=\"check_wrap\"><input type=\"checkbox\" name=\"reason\" required=\"required\" data-msg-required=\"친절 매장을 추천하게 된 이유를 선택해 주세요.\" value=\"스위티의 친절\" id=\"opt2_1\"><label for=\"opt2_1\">스위티의 친절</label></div>\n				<div class=\"check_wrap\"><input type=\"checkbox\" name=\"reason\" required=\"required\" data-msg-required=\"친절 매장을 추천하게 된 이유를 선택해 주세요.\" value=\"쾌적한 매장\" id=\"opt2_2\"><label for=\"opt2_2\">쾌적한 매장</label></div>\n				<div class=\"check_wrap\"><input type=\"checkbox\" name=\"reason\" required=\"required\" data-msg-required=\"친절 매장을 추천하게 된 이유를 선택해 주세요.\" value=\"다양한 제품\" id=\"opt2_3\"><label for=\"opt2_3\">다양한 제품</label></div>\n				<div class=\"check_wrap\"><input type=\"checkbox\" name=\"reason\" required=\"required\" data-msg-required=\"친절 매장을 추천하게 된 이유를 선택해 주세요.\" value=\"솔직하고 부담 없는 가격\" id=\"opt2_4\"><label for=\"opt2_4\">솔직하고 부담 없는 가격</label></div>\n				<div class=\"check_wrap\"><input type=\"checkbox\" name=\"reason\" required=\"required\" data-msg-required=\"친절 매장을 추천하게 된 이유를 선택해 주세요.\" value=\"기타\" id=\"opt2_5\"><label for=\"opt2_5\">기타</label></div>\n				<input type=\"hidden\" name=\"storeEvalReason\">\n			</div>\n\n			<div class=\"input_group\">\n				<div class=\"label sr_only\">\n					<label for=\"title\">제목</label>\n				</div>\n				<div>\n					<input type=\"text\" id=\"title\" class=\"title\" name=\"storeEvalTitle\" maxlength=\"30\" placeholder=\"제목 (최대 30자까지 입력 가능합니다.)\" value=\""
    + alias2(alias1((depth0 != null ? depth0.storeEvalTitle : depth0), depth0))
    + "\" required=\"required\" data-msg-required=\"제목을 입력해 주세요.\"/>\n				</div>\n			</div>\n			<div class=\"input_group\">\n				<div class=\"textarea textarea_brand\">\n					<textarea id=\"content\" class=\"content\" name=\"storeEvalBodyText\" maxlength=\"1000\" cols=\"\" rows=\"\" placeholder=\"내용 (최대 1000자까지 입력 가능합니다.)\" required=\"required\" data-msg-required=\"내용을 입력해 주세요.\">"
    + alias2(alias1((depth0 != null ? depth0.storeEvalBodyText : depth0), depth0))
    + "</textarea>\n				</div>\n				<p class=\"text_right\"><small class=\"count\">0/1000</small></p>\n			</div>\n\n			<div class=\"ui_input_images\">\n				<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" multiple=\"multiple\" style=\"display:none\" />\n				<label for=\"i_picture\" class=\"btn_md_neutral w100p mgt10\">사진첨부</label>\n				<ul class=\"attach\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storeEvalImgExList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n				<p class=\"text_notice\">첨부파일은 이미지 파일만 가능하며, 최대 10개까지 등록 하실 수 있습니다. (최대 파일 용량 10MB)</p>\n			</div>\n\n			<div class=\"panel gray\">\n				<ul class=\"list_bullet_dot\">\n					<li>타인의 글 도용 및 올바르지 않은 리뷰 작성으로 인하여, 게시판 성격과 관련 없는 게시물은 임의로 삭제될 수 있습니다. (동일 내용의 반복 등록, 무의미한 내용 입력,광고 및 욕설, 비방의 글, 성인글, 출처를 안 밝힌 뉴스기사 등)</li>\n					<li>또한 예치금이 남아 있을 경우 탈퇴할 수 없으니 잔액이 남아 있는 지 확인 바랍니다.</li>\n					<li>저작권 등 다른 사람의 권리를 침해하거나 명예를 훼손 하는 게시물은 이용약관 및 관련 법률에 의해 제재를 받을 수 있습니다.</li>\n					<li>제품에 대한 문의 및 불편사항은 <b class=\"color_gray\">[고객센터 1:1 상담]</b> 으로 문의해 주세요. </li>\n				</ul>\n			</div>\n			<div class=\"form_btns\">\n				<button type=\"button\" class=\"btn_md_secondary cancel\">취소</button>\n				<button type=\"submit\" class=\"btn_md_primary regist\">수정</button>\n			</div>\n		</fieldset>\n	</form>\n</div>\n\n\n\n";
},"useData":true});