this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-use-download"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.downloadCoupon : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<ul class=\"loading\" id=\"couponApplyLoading\" style=\"min-height: 100px; display: none\">\n		<li></li>\n		<li></li>\n		<li></li>\n	</ul>\n	<div class=\"page_btns download\">\n		<button class=\"btn_lg_secondary\" type=\"button\" id=\"b_close\">취소</button>\n		<button class=\"btn_lg_primary\" type=\"button\" id=\"b_download\">쿠폰다운</button>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<div class=\"coupon_order\" name=\"removeCouponSn\" data-couponSn=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\">\n			<span class=\"check_wrap\">\n				<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\" name=\"couponSn\" data-code=\""
    + alias2(alias1((depth0 != null ? depth0.duplicationUseConditionCode : depth0), depth0))
    + "\">\n				<label for=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\">\n					<span>\n						<span class=\"flag\">"
    + alias2((helpers.marketingOrg || (depth0 && depth0.marketingOrg) || alias4).call(alias3,(depth0 != null ? depth0.mktgOrgCode : depth0),{"name":"marketingOrg","hash":{},"data":data}))
    + "</span> <span class=\"flag\">D-"
    + alias2(alias1((depth0 != null ? depth0.expDDays : depth0), depth0))
    + "</span>\n					</span>\n					<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</span>\n					<em>"
    + ((stack1 = (helpers.downloadCouponBenefitTypeCodeSwitch || (depth0 && depth0.downloadCouponBenefitTypeCodeSwitch) || alias4).call(alias3,depth0,{"name":"downloadCouponBenefitTypeCodeSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "</em>\n				</label>\n			</span>\n			<span class=\"ui_tooltip\">\n				<button type=\"button\" class=\"btn_tooltip\">유의사항 보기 </button>\n				<span class=\"arr\"></span>\n				<span class=\"layer_tooltip\">\n					<dl>\n						<dt class=\"title\">쿠폰 안내  <span class=\"font_lg color_light_gray\">(만료예정일:"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.expExpectedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + ")</span></dt>\n						<dd>\n							<ul class=\"list_bullet_dot\">\n								<li><pre>"
    + alias2(alias1((depth0 != null ? depth0.foGuide : depth0), depth0))
    + "</pre></li>\n							</ul>\n						</dd>\n					</dl>\n					<button type=\"button\" class=\"ui_close\"><span class=\"sr_only\">툴팁 닫기</span></button>\n				</span>\n			</span>\n		</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice downloadCouponEmpty\">\n		<i class=\"ico\"></i>\n		<p class=\"text font_lg\"><b>다운로드 가능한 쿠폰이 없습니다.</b></p>\n		<br>\n		<p class=\"text\">이벤트/행사 정보를 통해 할인 및 다양한 혜택이 담긴<br>\n			쿠폰 이벤트에 해당하는 제품을 주문해보세요.\n		</p>\n		<a href=\"/display/event?displayMenuId=event\" class=\"btn_md_bordered mgt30\">다양한 이벤트/행사 보러가기</a>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.downloadCoupon : depth0)) != null ? stack1.couponCnt : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});