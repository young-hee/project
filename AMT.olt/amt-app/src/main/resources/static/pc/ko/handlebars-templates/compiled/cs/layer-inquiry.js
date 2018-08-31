this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["layer-inquiry"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "										<option value=\""
    + alias2(alias1((depth0 != null ? depth0.inquiryTypeSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.inquiryTypeName : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<dl class=\"layer\">\n	<dt class=\"layer_title\">1:1 상담등록</dt>\n	<dd class=\"layer_cont\">\n		<form class=\"validate\">\n			<fieldset class=\"form\">\n				<legend class=\"sr_only\">질문 입력 항목</legend>\n				<div class=\"ui_table board_write s120\">\n					<dl>\n						<dt><label for=\"\">문의유형</label></dt>\n						<dd>\n							<span class=\"select_wrap w300px\">\n								<select name=\"foReceivedInquiryTypeSn\" tabindex=\"-1\">\n									<option value=\"all\">전체</option>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.types : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</select>\n							</span>\n						</dd>\n					</dl>\n					<dl>\n						<dt>주문상품</dt>\n						<dd>\n							<span class=\"input_wrap w300px\">\n								<input type=\"text\" class=\"\" readonly=\"\">\n								<button type=\"button\" class=\"btn_del\"><span class=\"sr_only\">입력된 주문상품 삭제</span></button>\n							</span>\n							<a href=\"javascript:;\" class=\"btn_fix_gradient\" onclick=\"selectOrd()\">등록</a>\n						</dd>\n					</dl>\n					<dl>\n						<dt>제목</dt>\n						<dd>\n							<div class=\"input_wrap w100p\">\n								<input type=\"text\" name=\"inquiryTitle\" title=\"제목 입력\" placeholder=\"제목을 입력해 주세요.\" required=\"required\" data-msg=\"제목을 입력해 주세요.\" maxlength=\"200\">\n							</div>\n						</dd>\n					</dl>\n					<dl>\n						<dt>문의내용</dt>\n						<dd>\n							<div class=\"textarea w100p\">\n								<textarea name=\"inquiryBodyText\" id=\"inquiryBodyText\" placeholder=\"문의할 내용을 입력해주세요.\" required=\"required\" data-msg=\"내용을 입력해 주세요.\" maxlength=\"2000\"></textarea>\n								<p class=\"chk-bite\"><small><em>0</em> / 2000 자</small></p>\n							</div>\n						</dd>\n					</dl>\n					<dl>\n						<dt>파일첨부</dt>\n						<dd>\n							<div class=\"attach_wrap ui_input_images\">\n								<ul class=\"attach\">\n									<li class=\"input_file_btn_area\">\n										<div class=\"attach_file\">\n											<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" multiple=\"\">\n											<label for=\"i_picture\">파일선택</label>\n										</div>\n									</li>\n								</ul>\n								<p class=\"text_notice\">3MB미만의 jpg, gif, png의 이미지 파일 최대 10개까지 등록가능</p>\n							</div>\n							<!--[if lte ie 9]>\n							<div class=\"input_btn_wrap\">\n								<span class=\"input_wrap\">\n									<input class=\"input_file_name ie9_lte\" type=\"text\" title=\"첨부 파일 선택\" readonly value=\"\">\n									<button class=\"input_del\"><i class=\"ico_close_w\"></i><span class=\"sr_only\">첨부파일 삭제</span></button>\n								</span>\n								<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\">\n								<label for=\"i_picture\" class=\"btn_md_form\">파일 선택</label>\n							</div>\n							<ul class=\"list_bullet_dot mgt5\">\n								<li>3MB미만의 jpg, gif, png의 이미지 파일</li>\n								<li>internet Explorer 9.0버전에서는 첨부파일 1개만 가능합니다.</li>\n							</ul>\n							<![endif]-->\n							<!--[if gt ie 9]><!-->\n							<!--<![endif]-->\n							<!--<ul class=\"attach\">-->\n						</dd>\n					</dl>\n					<dl>\n						<dt>휴대폰 번호</dt>\n						<dd>\n							<div class=\"input_group\">\n								<span class=\"input_wrap w300px\"><input type=\"text\" title=\"휴대폰 번호 입력\" name=\"customerPhoneNo1.phoneNo\"\n									id=\"phoneNo\" mobile-number=\"mobile-number\" value=\""
    + container.escapeExpression(((helper = (helper = helpers.phoneNoInfo || (depth0 != null ? depth0.phoneNoInfo : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"phoneNoInfo","hash":{},"data":data}) : helper)))
    + "\"></span>\n								<span class=\"gap\"></span>\n								<span class=\"check_wrap\"><input type=\"checkbox\" id=\"sms\" name=\"smsResponseNotifyYn\" value=\"Y\"><label for=\"sms\">SMS 답변알림</label></span>\n							</div>\n						</dd>\n					</dl>\n				</div>\n				<div class=\"layer_btns\">\n					<!-- \"btn_default_modal_confirm\" 를 넣으면 기본 modal의 확인 기능이 적용된다. (e.closeType = 'confirm') -->\n					<a href=\"javascript:;\" id=\"b_cancel\" class=\"btn_fix_bordered\">취소</a>\n					<a href=\"javascript:;\" onclick=\"submit()\" class=\"btn_fix_neutral\">확인</a>\n				</div>\n			</fieldset>\n		</form>\n	</dd>\n</dl>";
},"useData":true});