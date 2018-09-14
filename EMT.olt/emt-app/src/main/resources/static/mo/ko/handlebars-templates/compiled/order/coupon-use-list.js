this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["coupon-use-list"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"coupon_order\">\n	<div class=\"coupon_wrap\">\n		<div class=\"info\">\n			<div class=\"flag_wrap\">\n				<span class=\"flag\">온라인 전용</span>\n				<button type=\"button\" class=\"btn_del\" name=\"removeCoupon\" data-sn=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.memberKeepingCouponSn : stack1), depth0))
    + "\"><span class=\"sr_only\">삭제</span></button> <!-- //삭제 -->\n			</div>\n			<span class=\"coupon_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponName : stack1), depth0))
    + "</span>\n			<div class=\"price_wrap\">\n				"
    + ((stack1 = (helpers.couponBenefitTypeCodeSwitchWithRemove || (depth0 && depth0.couponBenefitTypeCodeSwitchWithRemove) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.coupon : depth0),{"name":"couponBenefitTypeCodeSwitchWithRemove","hash":{},"data":data})) != null ? stack1 : "")
    + "\n			</div><!-- //price_wrap -->\n		</div><!-- //info -->\n	</div><!-- //coupon_wrap -->\n</div>";
},"useData":true});