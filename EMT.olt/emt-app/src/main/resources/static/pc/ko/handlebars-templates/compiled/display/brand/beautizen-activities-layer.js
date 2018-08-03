this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["beautizen-activities-layer"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "\n<h4 class=\"h_title sub h_"
    + alias2(alias1((depth0 != null ? depth0.layerCnt : depth0), depth0))
    + "\"></h4>\n<div class=\"ui_table\" id=\"activity_"
    + alias2(alias1((depth0 != null ? depth0.layerCnt : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depth0 != null ? depth0.layerCnt : depth0), depth0))
    + "\">\n	<dl>\n		<dt class=\"vtop pdt10\">\n			<label for=\"activity01\"></label>\n		</dt>\n		<dd>\n			<span class=\"input_group\">\n				<span class=\"select_wrap\">\n					<select name=\"activityType\" id=\"activity01\" title=\"활동유형\">\n						<option value=\"\">유형 선택</option>\n					</select>\n				</span>\n			</span>\n			<button class=\"btn_md_form btn_delete\" type=\"button\" name=\""
    + alias2(alias1((depth0 != null ? depth0.layerCnt : depth0), depth0))
    + "\">삭제</button>\n		</dd>\n	</dl>\n	<dl>\n		<dt>\n			<label for=\"activity02\">활동명</label>\n		</dt>\n		<dd>\n			<span class=\"input_wrap\">\n				<input type=\"text\" name=\"activityName\" id=\"activity02\" maxlength=\"50\"  placeholder=\"50자 이내로 입력해주세요.\" value=\""
    + alias2(alias1((depth0 != null ? depth0.activityName : depth0), depth0))
    + "\">\n			</span>\n		</dd>\n	</dl>\n	<dl>\n		<dt>\n			<label for=\"activity03\">활동기간</label>\n		</dt>\n		<dd>\n			<div class=\"input_group\">\n				<div class=\"input_wrap\">\n					<input type=\"text\" name=\"activityStartDate\" id=\"activity03\" placeholder=\"8자리 입력\" title=\"날짜 입력\" value=\""
    + alias2(alias1((depth0 != null ? depth0.activityStartDate : depth0), depth0))
    + "\">\n				</div>\n				<span class=\"gap bul\">~</span>\n				<div class=\"input_wrap\">\n					<input type=\"text\" name=\"activityEndDate\" placeholder=\"8자리 입력\" title=\"날짜 입력\" value=\""
    + alias2(alias1((depth0 != null ? depth0.activityEndDate : depth0), depth0))
    + "\">\n				</div>\n			</div>\n		</dd>\n	</dl>\n	<dl>\n		<dt class=\"vtop pdt10\">\n			<label for=\"activity04\">활동내용</label>\n		</dt>\n		<dd>\n			<div class=\"textarea\">\n				<textarea name=\"activityBodyText\" id=\"activity04\" cols=\"30\" maxlength=\"500\" rows=\"5\" placeholder=\" 500자 이내로 입력해주세요.\" text=\""
    + alias2(alias1((depth0 != null ? depth0.activityBodyText : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.activityBodyText : depth0), depth0))
    + "</textarea>\n			</div>\n		</dd>\n	</dl>\n</div>\n";
},"useData":true});