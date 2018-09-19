this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-freebies"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<div class=\"order_prd_panel\">\n				<div class=\"product\">\n					<div class=\"thumb\">\n						<img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.ordProdEx : stack1)) != null ? stack1.prodImgUrl : stack1), depth0))
    + "\">\n					</div>\n					<div class=\"info\">\n						<div class=\"flag_wrap\">\n							<p class=\"flag\">"
    + alias2(((helper = (helper = helpers.promoNameBlang || (depth0 != null ? depth0.promoNameBlang : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"promoNameBlang","hash":{},"data":data}) : helper)))
    + "</p>\n						</div>\n						<p class=\"name\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.ordProdEx : stack1)) != null ? stack1.prodNameBlang : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.awardUnitQty : stack1), depth0))
    + "개</p>\n					</div>\n				</div>\n			</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "			<div class=\"order_prd_panel\">\n				<div class=\"product\">\n					<div class=\"thumb\"><img src=\"@{/images/dummy/101001217_IM_01.png}\"></div>\n					<div class=\"info\">\n						<p class=\"flag\">"
    + alias3((helpers.ordFreebiesCode || (depth0 && depth0.ordFreebiesCode) || alias2).call(alias1,"coupon",(depth0 != null ? depth0.couponBenefitTypeCode : depth0),{"name":"ordFreebiesCode","hash":{},"data":data}))
    + "</p>\n						<p class=\"name\">"
    + alias3(((helper = (helper = helpers.couponNameBlang || (depth0 != null ? depth0.couponNameBlang : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"couponNameBlang","hash":{},"data":data}) : helper)))
    + "</p>\n					</div>\n				</div>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<dt class=\"on\">\n	<span class=\"title\">사은품</span>\n	<button type=\"button\"><span class=\"sr_only\">더보기</span></button>\n</dt>\n<dd>\n	<div class=\"cont\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.promo : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.coupon : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	</div>\n</dd>";
},"useData":true});