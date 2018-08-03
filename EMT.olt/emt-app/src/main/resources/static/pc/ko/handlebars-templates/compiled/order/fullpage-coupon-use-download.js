this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-use-download"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<ul class=\"available_coupon_list downloadCoupon\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.downloadCoupon : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "			<li>\n				<span class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</span>\n				<span><button type=\"button\" id=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\" name=\"downloadCoupon\" class=\"btn_sm_neutral\">쿠폰받기</button></span>\n			</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice downloadCouponEmpty\">\n		<i class=\"ico\"></i>\n		<p class=\"text font_lg\"><b>다운로드 가능한 쿠폰이 없습니다.</b></p>\n		<br>\n		<p class=\"text\">이벤트/행사 정보를 통해 할인 및 다양한 혜택이 담긴<br>\n			쿠폰 이벤트에 해당하는 제품을 주문해보세요.\n		</p>\n		<a href=\"/display/event?displayMenuId=event\" class=\"btn_md_bordered mgt30\">다양한 이벤트/행사 보러가기</a>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.downloadCoupon : depth0)) != null ? stack1.couponCnt : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});