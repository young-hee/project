this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["comment-write-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "modify";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "value=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.participantCommentTitle : stack1), depth0))
    + "\"";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.participantComment : stack1), depth0));
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li><img src=\""
    + alias2(alias1((depth0 != null ? depth0.commentImgUrl : depth0), depth0))
    + "\" style=\"height:100%\"><button type=\"button\" class=\"btn_del modify_img\" data-event-comment-img-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventCommentImgSn : depth0), depth0))
    + "\"><span class=\"sr_only\">첨부파일 삭제</span></button></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "<div class=\"review_write_layer\">\n	<form class=\"validate "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" action=\"\">\n		<fieldset class=\"form lined\">\n			<legend class=\"sr_only\">질문 입력 항목</legend>\n			<div class=\"ui_table\">\n				<dl>\n					<dt>제목</dt>\n					<dd>\n						<div class=\"input_wrap w100p\"><input type=\"text\" name=\"participantCommentTitle\" title=\"제목 입력\" placeholder=\"최대 30자까지 입력 가능합니다.\" maxlength=\"30\" required data-msg=\"제목을 입력해 주세요.\" "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.participantCommentTitle : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "></div>\n					</dd>\n				</dl>\n				<dl>\n					<dt>내용</dt>\n					<dd>\n						<div class=\"textarea w100p\">\n							<textarea name=\"participantComment\" id=\"\" cols=\"\" rows=\"\" placeholder=\"최대 500자까지 입력 가능합니다.\" maxlength=\"500\" required data-msg=\"내용을 입력해 주세요.\">"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.participantComment : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</textarea>\n						</div>\n						<p class=\"text_right\"><small><em class=\"current\">0</em>/<span class=\"limits\">500</span></small></p>\n					</dd>\n				</dl>\n			</div>\n			<div class=\"attach_wrap ui_input_images\">\n				<!--[if lte ie 9]>\n				<div class=\"input_btn_wrap\">\n					<span class=\"input_wrap\">\n						<input class=\"input_file_name ie9_lte\" type=\"text\" title=\"첨부 파일 선택\" readonly value=\"\">\n						<button class=\"input_del\"><i class=\"ico_close_w\"></i><span class=\"sr_only\">첨부파일 삭제</span></button>\n					</span>\n					<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\">\n					<label for=\"i_picture\" class=\"btn_md_form\">파일 선택</label>\n				</div>\n				<ul class=\"list_bullet_dot mgt5\">\n					<li>10MB미만의 jpg, gif, png의 이미지 파일</li>\n					<li>internet Explorer 9.0버전에서는 첨부파일 1개만 가능합니다.</li>\n				</ul>\n				<![endif]-->\n				<!--[if gt ie 9]><!-->\n				<ul class=\"attach\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.eventCommentImgs : stack1),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<li class=\"input_file_btn_area\">\n						<div class=\"attach_file\">\n							<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" multiple=\"multiple\">\n							<label for=\"i_picture\">사진 첨부</label>\n						</div>\n					</li>\n				</ul>\n				<p class=\"text\">이미지 파일만 가능 / 최대 10개 / 최대 파일 용량 10MB</p>\n				<!--<![endif]-->\n			</div>\n			<ul class=\"list_bullet_dot light mgt40\">\n				<li>타인의 글 도용 및 올바르지 않은 댓글 작성의 경우, 게시판 성격과 관련 없는 게시물은 임의로 삭제될 수 있습니다.  (동일 내용의 반복 등록, 무의미한 내용 입력, 광고 및 욕설, 비방의 글, 성인글, 출처를 안 밝힌 뉴스기사 등)</li>\n				<li>저작권 등 다른 사람의 권리를 침해하거나 게시판 성격과 관련 없는 게시물은 임의로 삭제될 수 있습니다. (반복 등록된 글, 무의미한 내용, 광고 및 욕설, 비방의 글, 성인글 등)</li>\n			</ul>\n\n			<dl class=\"dl_cont mgt40\">\n				<dt class=\"h_title font_lg\">\n					<b>개인정보 수집 및 이용 동의 (필수)</b>\n					<span class=\"check_wrap float_right\"><input type=\"checkbox\" name=\"reviewAgreePersonal\" id=\"review_agree_personal\" required data-msg=\"개인정보 수집 및 이용 동의가 필요합니다.\"><label for=\"review_agree_personal\">동의합니다.</label></span>\n				</dt>\n				<dd class=\"light mgt20\">\n					<div class=\"panel bordered padding15\">\n						<div class=\"panel_cont pd_sm\">\n							<ul class=\"list_bullet_dot\">\n								<li>수집 개인정보 항목 : 사진</li>\n								<li>수집 및 이용목적 : 댓글의 신뢰성 향상을 위해</li>\n								<li>보유 및 이용기간 : 회원탈퇴시까지</li>\n							</ul>\n						</div>\n					</div>\n					<ul class=\"text_notice mgt20\">\n						<li>신청자는 개인정보 수집 및 이용 동의에 거부할 수\n							있습니다. 다만, 거부할 경우 댓글 작성이 불가능\n							합니다.</li>\n					</ul>\n				</dd>\n			</dl>\n\n			<input type=\"hidden\" name=\"termsAgreeYn\" value=\"true\">\n			<input type=\"hidden\" name=\"planDisplaySn\" value=\""
    + alias3(alias2((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\">\n			<input type=\"hidden\" name=\"eventParticipantSn\" value=\""
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.eventParticipantSn : stack1), depth0))
    + "\">\n\n			<div class=\"form_btns\">\n				<button type=\"button\" class=\"btn_lg_secondary btn_default_modal_cancel cancel\">취소</button>\n				<button type=\"submit\" class=\"btn_lg_primary submit\">등록</button>\n			</div>\n		</fieldset>\n	</form>\n</div>";
},"useData":true});