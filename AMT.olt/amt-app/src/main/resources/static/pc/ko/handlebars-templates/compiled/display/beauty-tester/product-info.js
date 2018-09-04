this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-tester"] = this["AP"]["handlebars"]["display"]["beauty-tester"] || {};

this["AP"]["handlebars"]["display"]["beauty-tester"]["product-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "					<em class=\"discount\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.discountRate : depth0), depth0))
    + "%</em>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "					<del>"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.bPrice : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<div class=\"product_visual\">\n				<img src=\""
    + alias2(alias1((depth0 != null ? depth0.prodImage : depth0), depth0))
    + "\" alt=\"\">\n			</div>\n			<div class=\"product_info\">\n				<p class=\"product_name\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</p>\n				<p class=\"price\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,"==","Y",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<b>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.cPrice : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "원</b>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</p>\n				<div class=\"btns\">\n					<button type=\"button\" class=\"like\"><span class=\"sr_only\">좋아요</span></button> <!-- 버튼 비활성화 button > disabled=\"disabled\" 추가 -->\n					<button type=\"button\" class=\"cart\"><span class=\"sr_only\">장바구니</span></button>\n				</div>\n			</div>";
},"useData":true});