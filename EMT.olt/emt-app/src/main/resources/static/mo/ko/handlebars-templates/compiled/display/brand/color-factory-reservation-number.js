this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["color-factory-reservation-number"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<p class=\"text\">예약 확인을 위해 예약 시 발급된 예약 번호를 입력하세요.</p>\n<form class=\"validate\">\n	<fieldset class=\"form mgt20\">\n		<legend class=\"sr_only\">예약번호 입력</legend>\n		<dl class=\"dl_cont\">\n			<dt><b><label for=\"reserveNo\">예약번호</label></b></dt>\n			<dd>\n				<div class=\"input_group\">\n					<div>\n						<input type=\"text\" name=\"reserveNo\" id=\"reserveNo\" required=\"required\" number=\"number\" data-msg-required=\"예약번호를 입력해 주세요.\">\n					</div>\n				</div>\n			</dd>\n		</dl>\n	</fieldset>\n	<div class=\"page_btns\">\n		<button class=\"btn_md_neutral submit\" type=\"button\">확인</button>\n	</div>\n</form>";
},"useData":true});