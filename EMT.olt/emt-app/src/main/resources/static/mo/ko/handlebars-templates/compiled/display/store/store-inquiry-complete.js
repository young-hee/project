this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["store"] = this["AP"]["handlebars"]["display"]["store"] || {};

this["AP"]["handlebars"]["display"]["store"]["store-inquiry-complete"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel brand_store_opened\">\n	<h2 class=\"h_title page\">작성 완료</h2>\n	<p class=\"text font_md\">가맹 문의가 정상적으로 등록되었습니다.</p>\n	<hr class=\"div m30\">\n	<div class=\"brand_store_opened_result\">\n		<img alt=\"\" src=\"/mo/ko/images/common/img_cat_01.png\">\n		<p>온라인 가맹 문의가 <strong>정상 등록</strong>되었습니다.</p>\n		<p>이메일 혹은 휴대폰으로 답변 드리겠습니다.<br>에뛰드 하우스에 관심을 가져 주셔서 감사합니다.</p>\n	</div>\n	<button type=\"button\" class=\"btn_lg_primary w100p confirm\">확인</button>\n</div>";
},"useData":true});