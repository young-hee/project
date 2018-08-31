this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-freebiesList"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "		<div class=\"panel_box\">\n			<div class=\"product\">\n				<!-- <div class=\"thumb\"><img ap:src=\"@{/images/dummy/650000956_IM_01.png}\" alt=\"\"></div> -->\n				<div class=\"info\">\n					<div class=\"align_left\">\n						<p class=\"name\">"
    + alias1(container.lambda((depth0 != null ? depth0.promoNameBlang : depth0), depth0))
    + "</p>\n						<p class=\"flag\">"
    + alias1((helpers.ordFreebiesCode || (depth0 && depth0.ordFreebiesCode) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"promo",(depth0 != null ? depth0.awardTgtCode : depth0),{"name":"ordFreebiesCode","hash":{},"data":data}))
    + "</p>\n					</div>\n				</div>\n			</div>\n		</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<div class=\"panel_box\">\n			<div class=\"product\">\n				<!-- <div class=\"thumb\"><img ap:src=\"@{/images/dummy/650000956_IM_01.png}\" alt=\"\"></div> -->\n				<div class=\"info\">\n					<div class=\"align_left\">\n						<p class=\"name\">"
    + alias3(((helper = (helper = helpers.couponNameBlang || (depth0 != null ? depth0.couponNameBlang : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"couponNameBlang","hash":{},"data":data}) : helper)))
    + "</p>\n						<p class=\"flag\">"
    + alias3((helpers.ordFreebiesCode || (depth0 && depth0.ordFreebiesCode) || alias2).call(alias1,"coupon",(depth0 != null ? depth0.couponBenefitTypeCode : depth0),{"name":"ordFreebiesCode","hash":{},"data":data}))
    + "</p>\n					</div>\n				</div>\n			</div>\n		</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<dt class=\"on\"><button type=\"button\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),"two",{"name":"eq","hash":{},"data":data}),(depth0 != null ? depth0.title : depth0),"",{"name":"condition","hash":{},"data":data}))
    + " 사은품</button></dt>\n<dd>\n	<!-- 사은품 목록 -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.fList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<!-- //사은품 목록 -->\n\n	<!-- 쿠폰 목록 -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.cList : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<!-- //쿠폰 목록 -->\n</dd>";
},"useData":true});