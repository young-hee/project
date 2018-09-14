this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-freebiesList"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "			<div class=\"panel_box\">\n				<div class=\"product\">\n					<!-- "
    + ((stack1 = helpers["if"].call(alias1,(helpers.and || (depth0 && depth0.and) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].viewYn : depths[1])) != null ? stack1.checkBox : stack1),"Y",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depths[1] != null ? depths[1].type : depths[1]),"exchange",{"name":"eq","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " -->\n					<div class=\"thumb\"><img src=\""
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.ordProdEx : stack1)) != null ? stack1.prodImgUrl : stack1), depth0))
    + "\" alt=\"\"></div>\n					<div class=\"info\">\n						<div class=\"align_left\">\n							<p class=\"flag\">"
    + alias4(((helper = (helper = helpers.promoNameBlang || (depth0 != null ? depth0.promoNameBlang : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"promoNameBlang","hash":{},"data":data}) : helper)))
    + "</p>\n							<p class=\"name\">"
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.ordProdEx : stack1)) != null ? stack1.prodNameBlang : stack1), depth0))
    + " "
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.awardUnitQty : stack1), depth0))
    + "개</p>\n						</div>\n					</div>\n				</div>\n			</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "\n						<div class=\"check_wrap\">\n							<input type=\"checkbox\" id=\"ordFree_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.ordUnitAwardSn : stack1), depth0))
    + "\" name=\"prod_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.ordUnitAwardSn : stack1), depth0))
    + "\" value=\""
    + alias2((helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"json","hash":{},"data":data}))
    + "\">\n							<label for=\"ordFree_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ordPromoOrdUnitAwardEx : depth0)) != null ? stack1.ordUnitAwardSn : stack1), depth0))
    + "\">\n								<span class=\"sr_only\">상품명</span>\n							</label>\n						</div>\n					";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "			<div class=\"panel_box\">\n				<div class=\"product\">\n					<!-- <div class=\"thumb\"><img ap:src=\"@{/images/dummy/650000956_IM_01.png}\" alt=\"\"></div> -->\n					<div class=\"info\">\n						<div class=\"align_left\">\n							<p class=\"name\">"
    + alias3(((helper = (helper = helpers.couponNameBlang || (depth0 != null ? depth0.couponNameBlang : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"couponNameBlang","hash":{},"data":data}) : helper)))
    + "</p>\n							<p class=\"flag\">"
    + alias3((helpers.ordFreebiesCode || (depth0 && depth0.ordFreebiesCode) || alias2).call(alias1,"coupon",(depth0 != null ? depth0.couponBenefitTypeCode : depth0),{"name":"ordFreebiesCode","hash":{},"data":data}))
    + "</p>\n						</div>\n					</div>\n				</div>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<dt class=\"on\"><button type=\"button\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),"two",{"name":"eq","hash":{},"data":data}),(depth0 != null ? depth0.title : depth0),"",{"name":"condition","hash":{},"data":data}))
    + " 사은품</button></dt>\n<dd>\n	<div class=\"cont\">\n		<!-- 사은품 목록 -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.fList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<!-- //사은품 목록 -->\n\n		<!-- 쿠폰 목록 -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.cList : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<!-- //쿠폰 목록 -->\n	</div>\n</dd>";
},"useData":true,"useDepths":true});