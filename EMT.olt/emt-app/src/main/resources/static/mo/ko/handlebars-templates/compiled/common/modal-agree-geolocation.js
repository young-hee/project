this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["modal-agree-geolocation"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"mypage\">\n	<fieldset class=\"form\">\n		<legend class=\"sr_only\">위치기반 서비스 이용 동의</legend>\n		<p class=\"text text_center location\">에뛰드 하우스 서비스의 위치정보 수집 및 이용에 관한 약관에 동의합니다.</p>\n		<div class=\"page_btns\">\n			<a href=\"#none\" class=\"btn_md_bordered w100p btn_geolocation_terms\">약관 자세히 보기</a>\n		</div>\n		<ul class=\"list_bullet_dot\">\n			<li>위치 기반 서비스 이용약관에 동의하시면 내 위치 주변에 가까운 매장을 찾아 보실 수 있습니다.</li>\n			<li>동의하지 않으실 경우 서비스를 제공 받으실 수없습니다.</li>\n		</ul>\n		<div class=\"form_btns\">\n			<button class=\"btn_md_secondary btn_default_modal_cancel\" type=\"button\">동의하지 않음</button>\n			<button class=\"btn_md_neutral btn_default_modal_confirm\" type=\"button\">동의</button>\n		</div>\n	</fieldset>\n</div>";
},"useData":true});