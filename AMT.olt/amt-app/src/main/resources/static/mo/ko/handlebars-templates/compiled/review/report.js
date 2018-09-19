this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["review"] = this["AP"]["handlebars"]["review"] || {};

this["AP"]["handlebars"]["review"]["report"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "<div class=\"section report_wrap\">\n	<div class=\"tit_area\">\n		<p>작성자 : <strong>러블리("
    + container.escapeExpression(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + ")</strong></p>\n		<p>글내용 : <strong>"
    + ((stack1 = alias1((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0)) != null ? stack1 : "")
    + "</strong></p>\n	</div>\n\n	<div class=\"radio_area01\">\n		<span class=\"rdo_h30\"><input type=\"radio\" name=\"radio_1\" id=\"radio1\" value=\"Inappropriate\"><label for=\"radio1\">부적절한 내용</label></span>\n		<span class=\"rdo_h30\"><input type=\"radio\" name=\"radio_1\" id=\"radio2\" value=\"Copyright\"><label for=\"radio2\">저작권 문제</label></span>\n		<span class=\"rdo_h30\"><input type=\"radio\" name=\"radio_1\" id=\"radio3\" value=\"Ad\"><label for=\"radio3\">광고성글</label></span>\n		<span class=\"rdo_h30\"><input type=\"radio\" name=\"radio_1\" id=\"radio4\" value=\"Etc\"><label for=\"radio4\">기타</label></span>\n	</div>\n\n	<div class=\"text_input_wrap\">\n		<p class=\"txt_in\">추가 설명이 필요한 경우 아래 입력해주세요.</p>\n		<div class=\"textarea\">\n			<textarea name=\"reportBodyText\" id=\"reportBodyText\" placeholder=\"내용을 입력하세요\"></textarea>\n		</div>\n	</div>\n</div>\n";
},"useData":true});