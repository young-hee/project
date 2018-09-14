this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["report"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda;

  return "<div class=\"ly_report\">\n	<fieldset class=\"form report_form\">\n		<legend class=\"sr_only\">신고하기 입력</legend>\n		<div class=\"report_title\">\n			<dl>\n				<dt>작성자 :</dt>\n				<dd>"
    + container.escapeExpression(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</dd>\n			</dl>\n			<dl class=\"ellipsis\">\n				<dt>글내용 :</dt>\n				<dd>"
    + ((stack1 = alias1((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0)) != null ? stack1 : "")
    + "</dd>\n			</dl>\n		</div>\n		<ul class=\"check_list\">\n			<li class=\"check_wrap small\"><input type=\"radio\" name=\"report\" id=\"report1\" value=\"Inappropriate\" checked=\"\"><label for=\"report1\">부적절한 내용</label></li>\n			<li class=\"check_wrap small\"><input type=\"radio\" name=\"report\" id=\"report2\" value=\"Copyright\"><label for=\"report2\">저작권 문제</label></li>\n			<li class=\"check_wrap small\"><input type=\"radio\" name=\"report\" id=\"report3\" value=\"Ad\"><label for=\"report3\">광고글</label></li>\n			<li class=\"check_wrap small\"><input type=\"radio\" name=\"report\" id=\"report4\" value=\"Etc\"><label for=\"report4\">기타</label></li>\n		</ul>\n		<p class=\"txt_summary\"><b>추가 설명이 필요한 경우 아래 입력해주세요.</b></p>\n		<div class=\"textarea\">\n			<textarea name=\"reportBodyText\" id=\"reportBodyText\" cols=\"\" rows=\"\" placeholder=\"내용을 입력하세요\"></textarea>\n		</div>\n	</fieldset>\n	<div class=\"layer_btns\">\n		<button type=\"button\" class=\"btn_fix_bordered\">취소</button>\n		<button type=\"button\" class=\"btn_fix_neutral\">신고하기</button>\n	</div>\n</div>\n";
},"useData":true});