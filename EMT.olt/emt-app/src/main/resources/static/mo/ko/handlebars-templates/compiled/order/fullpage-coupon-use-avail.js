this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-use-avail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"ui_accordion coupon_list availCoupon\">\n		<!--/* 쿠폰 한개 */-->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<!--/* 쿠폰 : 사은품 타입 */-->\n	</div>\n	<ul class=\"loading\" id=\"couponApplyLoading\" style=\"min-height: 100px; display: none\">\n		<li></li>\n		<li></li>\n		<li></li>\n	</ul>\n	<div class=\"page_btns\">\n		<button class=\"btn_lg_secondary\" type=\"button\" id=\"b_close\">취소</button>\n		<button class=\"btn_lg_neutral\" type=\"button\" id=\"b_save\">적용</button>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<div class=\"coupon_order\">\n				<div class=\"coupon_wrap\">\n					<div class=\"check_wrap\">\n						<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\" name=\"couponSn\" data-code=\""
    + alias2(alias1((depth0 != null ? depth0.duplicationUseConditionCode : depth0), depth0))
    + "\">\n						<label for=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\"></label>\n					</div>\n					<div class=\"info\">\n						<div class=\"flag_wrap\">\n							<span class=\"flag\">"
    + alias2((helpers.marketingOrg || (depth0 && depth0.marketingOrg) || alias4).call(alias3,(depth0 != null ? depth0.mktgOrgCode : depth0),{"name":"marketingOrg","hash":{},"data":data}))
    + "</span>\n							<span class=\"flag\">D-"
    + alias2(alias1((depth0 != null ? depth0.expDDays : depth0), depth0))
    + "</span>\n						</div>\n						<span class=\"coupon_name\">"
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</span>\n						<div class=\"price_wrap\">\n							<span class=\"price\">"
    + ((stack1 = (helpers.couponBenefitTypeCodeSwitch || (depth0 && depth0.couponBenefitTypeCodeSwitch) || alias4).call(alias3,depth0,{"name":"couponBenefitTypeCodeSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>	 <!-- //가격 숫자일때는 클래스 num -->\n							<div class=\"ui_tooltip\"><!-- //툴팁 -->\n								<button type=\"button\" class=\"btn_tooltip\">툴팁보기</button>\n								<span class=\"arr\"></span>\n								<div class=\"layer_tooltip\">\n									<dl>\n										<dt>쿠폰 안내 <small>(만료예정일:"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.expExpectedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + ")</small></dt>\n										<dd>\n											<ul class=\"list_bullet_dot\">\n												<li><pre>"
    + alias2(alias1((depth0 != null ? depth0.foGuide : depth0), depth0))
    + "</pre></li>\n											</ul>\n											<button type=\"button\" class=\"ui_close sm\"><span class=\"sr_only\">툴팁 닫기</span></button>\n										</dd>\n									</dl>\n								</div>\n							</div><!-- //툴팁 -->\n						</div><!-- //price_wrap -->\n					</div><!-- //info -->\n				</div><!-- //coupon_wrap -->\n			</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text font_lg\"><b>보유중인 쿠폰이 없습니다.</b></p>\n		<br>\n		<p class=\"text\">적용 가능 쿠폰보기에서 다운로드 가능한<br>\n			쿠폰을 확인하시고 다양한 혜택이 담긴 쿠폰을<br>\n			다운로드 받으실 수 있습니다.\n		</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponCnt : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});