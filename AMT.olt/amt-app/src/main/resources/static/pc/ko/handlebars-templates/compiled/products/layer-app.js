this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["layer-app"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"app_download\">\n	<img src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"/images/product/img_ap_app.jpg",{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n	<p class=\"txt\"><strong>앱 다운로드 URL 받기(무료전송)</strong>* 입력하신 번호는 저장되지 않습니다.</p>\n	<span class=\"input_wrap\">\n		<input type=\"text\" name=\"\" class=\"cellNum\" id=\"\" placeholder=\"휴대폰 번호를  입력해주세요\">\n	</span>\n	<a href=\"javascript:;\" class=\"btn_fix_neutral send\">보내기</a>\n</div>\n";
},"useData":true});