this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["coupon-use-list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<li>\n	<span>\n		<span class=\"flag\">온라인 전용</span>\n		<span class=\"title\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponName : stack1), depth0))
    + "</span>\n	</span>\n	<span>\n		"
    + ((stack1 = (helpers.couponBenefitTypeCodeSwitch || (depth0 && depth0.couponBenefitTypeCodeSwitch) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.coupon : depth0),{"name":"couponBenefitTypeCodeSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "\n	</span>\n</li>";
},"useData":true});