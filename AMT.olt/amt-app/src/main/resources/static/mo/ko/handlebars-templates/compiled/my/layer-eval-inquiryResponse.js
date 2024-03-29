this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["layer-eval-inquiryResponse"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<dl class=\"layer\">\n	<dt class=\"layer_title\">상담평가</dt>\n	<dd class=\"layer_cont\">\n		<div class=\"evaluation\">\n			<p class=\"text\">답변 완료된 상담에 만족하시나요?</p>\n			<div class=\"rdo_wrap\">\n				<span class=\"rdo_h30\"><input type=\"radio\" name=\"responseEvalCode\" id=\"satisfaction\" value=\"Satisfaction\" checked=\"checked\"><label for=\"satisfaction\">만족해요</label></span>\n				<span class=\"rdo_h30\"><input type=\"radio\" name=\"responseEvalCode\" id=\"dissatisfaction\" value=\"Dissatisfaction\"><label for=\"dissatisfaction\">불만족해요</label></span>\n			</div>\n		</div>\n	</dd>\n	<dd class=\"layer_btns\">\n		<button class=\"btn_default_modal_confirm\" type=\"button\" id=\"b_evalCancel\">취소</button>\n		<button class=\"btn_default_modal_confirm\" type=\"button\" id=\"b_evalConfirm\">확인</button>\n	</dd>\n</dl>";
},"useData":true});