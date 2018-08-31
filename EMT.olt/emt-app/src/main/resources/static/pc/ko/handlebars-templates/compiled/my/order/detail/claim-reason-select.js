this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};
this["AP"]["handlebars"]["my"]["order"]["detail"] = this["AP"]["handlebars"]["my"]["order"]["detail"] || {};

this["AP"]["handlebars"]["my"]["order"]["detail"]["claim-reason-select"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li class=\"select_option\">\n						<code class=\"label_markup\" style=\"display:none\">\n							<span class=\"slt_color_name\">"
    + alias2(alias1((depth0 != null ? depth0.reasonName : depth0), depth0))
    + "</span>\n						</code>\n						<a data-value=\""
    + alias2(alias1((depth0 != null ? depth0.claimReasonSn : depth0), depth0))
    + "\">\n							<span class=\"color_name\">"
    + alias2(alias1((depth0 != null ? depth0.reasonName : depth0), depth0))
    + "</span>\n						</a>\n					</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"reason\" id=\"reason_"
    + alias1(container.lambda((depth0 != null ? depth0.ordProdCode : depth0), depth0))
    + "\">\n	<div class=\"input_group\">\n		<div class=\"ui_select w20p\" data-not-label-change=\"false\">\n			<input type=\"hidden\">\n			<button type=\"button\">"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "사유 선택</button>\n			<ul class=\"select_options\">\n"
    + ((stack1 = helpers.each.call(alias2,((stack1 = (depth0 != null ? depth0.reason : depth0)) != null ? stack1.claimReasonExList : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n		<span class=\"gap\">&nbsp;</span>\n		<div class=\"input_wrap\">\n			<input type=\"text\" placeholder=\"사유를 입력해주세요\" maxlength=\"100\">\n		</div>\n	</div>\n</div>";
},"useData":true});