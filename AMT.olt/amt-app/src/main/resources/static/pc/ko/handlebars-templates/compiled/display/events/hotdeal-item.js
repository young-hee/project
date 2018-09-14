this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["hotdeal-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<div class=\"deal_box\" data-online-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n		<div>\n			<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias4).call(alias3,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n				<img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n			</a>\n		</div>\n		<div class=\"info\">\n			<p class=\"brand_name\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</p>\n			<p class=\"name\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n			<p class=\"discount\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountRate : stack1), depth0))
    + "%</p>\n			<p class=\"price\"><strong>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountOnlinePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</strong> <del>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountBeforeSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del></p>\n			<div class=\"btns\">\n				<p class=\"amount\">남은수량 : "
    + alias2(alias1((depth0 != null ? depth0.salePossibleQty : depth0), depth0))
    + "개</p>\n				<!--/* 좋아요 클릭시 active : on */-->\n				<button type=\"button\" class=\"like like_btn\"><span class=\"sr_only\">좋아요</span></button>\n				<button type=\"button\" class=\"cart cart_btn\"><span class=\"sr_only\">장바구니</span></button>\n			</div>\n		</div>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});