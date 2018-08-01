this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["sns-share"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"ui_sns_share\">\n	<ul class=\"sns_share\">\n		<li><a href=\"#none\" class=\"share_btn kakao_talk\" data-sns-type=\"kakao_talk\">kakao talk</a></li>\n		<li><a href=\"#none\" class=\"share_btn facebook\" data-sns-type=\"facebook\">facebook</a></li>\n		<li><a href=\"#none\" class=\"share_btn twitter\" data-sns-type=\"twitter\">twitter</a></li>\n	</ul>\n	<div class=\"input_btn_wrap\">\n		<span class=\"input_wrap\">\n			<input class=\"url_input\" type=\"text\" title=\"url\" value=\"\">\n		</span>\n		<button type=\"button\" class=\"btn_md_form share_btn\" data-sns-type=\"url\">URL 복사</button>\n	</div>\n</div>";
},"useData":true});