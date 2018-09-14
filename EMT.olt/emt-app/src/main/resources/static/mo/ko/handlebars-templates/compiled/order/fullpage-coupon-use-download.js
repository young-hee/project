this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-use-download"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"\" data-open-type=\"single\">\n		<!--다운가능한 쿠폰리스트(MyPage참조)-->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.downloadCoupon : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\n	<div class=\"page_btns\">\n		<button class=\"btn_lg_secondary\" type=\"button\" id=\"b_close\">취소</button>\n		<button class=\"btn_lg_neutral\" type=\"button\" id=\"b_download\">쿠폰받기</button>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<div class=\"coupon_order\">\n				<div class=\"coupon_wrap\">\n					<div class=\"check_wrap\">\n						<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\" name=\"couponSn\" data-code=\""
    + alias2(alias1((depth0 != null ? depth0.duplicationUseConditionCode : depth0), depth0))
    + "\">\n						<label for=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\"></label>\n						<!--<span><button type=\"button\" id=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\" name=\"downloadCoupon\" class=\"btn_sm_neutral\">쿠폰받기</button></span>-->\n					</div>\n					<div class=\"info\">\n						<div class=\"flag_wrap\">\n							<span class=\"flag\">"
    + alias2((helpers.marketingOrg || (depth0 && depth0.marketingOrg) || alias4).call(alias3,(depth0 != null ? depth0.mktgOrgCode : depth0),{"name":"marketingOrg","hash":{},"data":data}))
    + "</span>\n							<span class=\"flag\">D-3</span>\n						</div>\n						<span class=\"coupon_name\">"
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</span>\n						<div class=\"price_wrap\">\n							<span class=\"price\">"
    + ((stack1 = (helpers.downloadCouponBenefitTypeCodeSwitch || (depth0 && depth0.downloadCouponBenefitTypeCodeSwitch) || alias4).call(alias3,depth0,{"name":"downloadCouponBenefitTypeCodeSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "</span>	 <!-- //가격 숫자일때는 클래스 num -->\n							<div class=\"ui_tooltip\"><!-- //툴팁 -->\n								<button type=\"button\" class=\"btn_tooltip\">툴팁보기</button>\n								<span class=\"arr\"></span>\n								<div class=\"layer_tooltip\">\n									<dl>\n										<dt>쿠폰 안내 <small>(만료예정일:"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.issueEndDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + ")</small></dt>\n										<dd>\n											<ul class=\"list_bullet_dot\">\n												<li><pre>"
    + alias2(alias1((depth0 != null ? depth0.foGuide : depth0), depth0))
    + "</pre></li>\n											</ul>\n											<button type=\"button\" class=\"ui_close sm\"><span class=\"sr_only\">툴팁 닫기</span></button>\n										</dd>\n									</dl>\n								</div>\n							</div><!-- //툴팁 -->\n						</div><!-- //price_wrap -->\n					</div><!-- //info -->\n				</div><!-- //coupon_wrap -->\n			</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice downloadCouponEmpty\">\n		<i class=\"ico\"></i>\n		<p class=\"text\"><b>다운로드 가능한 쿠폰이 없습니다.</b></p>\n		<br>\n		<p class=\"text\">이벤트/행사 정보를 통해 할인 및 다양한 혜택이 담긴<br>\n			쿠폰 이벤트에 해당하는 제품을 주문해보세요.\n		</p>\n		<a href=\"/display/event?displayMenuId=event\" class=\"btn_md_bordered\">다양한 이벤트/행사 보러가기</a>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.downloadCoupon : depth0)) != null ? stack1.couponCnt : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});