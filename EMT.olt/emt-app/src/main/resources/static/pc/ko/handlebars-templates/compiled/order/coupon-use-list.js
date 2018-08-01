this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["coupon-use-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<span class=\"price\">-"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.applyDcAmt : stack1), depth0))
    + " 원</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<li>\n	<span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponName : stack1), depth0))
    + "</span>\n	<span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.applyDcAmt : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<a href=\"javascript:;\" name=\"removeCoupon\" data-sn=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.memberKeepingCouponSn : stack1), depth0))
    + "\"><em>[취소]</em></a>\n	</span>\n</li>";
},"useData":true});