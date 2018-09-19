this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-tester"] = this["AP"]["handlebars"]["display"]["beauty-tester"] || {};

this["AP"]["handlebars"]["display"]["beauty-tester"]["product-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "		<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n			<div class=\"product_visual\">\n				<img src=\""
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodImages : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n			</div>\n			<div class=\"product_info\">\n				<p class=\"product_name\">"
    + alias3(alias4((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n				<p class=\"price\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.availablePrices : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.maxFinalDiscountRate : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<b>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.availablePrices : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.maxFinalDiscountOnlinePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</b>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.availablePrices : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</p>\n				<div class=\"btns\">\n					<button type=\"button\" class=\"like\"><span class=\"sr_only\">좋아요</span></button> <!-- 버튼 비활성화 button > disabled=\"disabled\" 추가 -->\n					<button type=\"button\" class=\"cart\"><span class=\"sr_only\">장바구니</span></button>\n				</div>\n			</div>\n		</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<em class=\"discount\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.availablePrices : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.maxFinalDiscountRate : stack1), depth0))
    + "%</em>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<del>"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.availablePrices : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.maxFinalDiscountBeforeSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdInfos : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});