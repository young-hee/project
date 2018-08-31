this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-use-avail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "	<div class=\"ui_accordion coupon_list availCoupon\">\n		<!--/* 쿠폰 한개 */-->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<!--/* 쿠폰 : 사은품 타입 */-->\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<dl>\n			<dt>\n			<span class=\"check_wrap\">\n				<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\" name=\"couponSn\" data-code=\""
    + alias2(alias1((depth0 != null ? depth0.duplicationUseConditionCode : depth0), depth0))
    + "\">\n				<label for=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\">\n					<span>\n						<em class=\"d_day\">D-"
    + alias2(alias1((depth0 != null ? depth0.expDDays : depth0), depth0))
    + "</em>\n						<small>"
    + ((stack1 = (helpers.dcMethodCodeSwitch || (depth0 && depth0.dcMethodCodeSwitch) || alias4).call(alias3,depth0,{"name":"dcMethodCodeSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "</small>\n					</span>\n					<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</span>\n				</label>\n			</span>\n"
    + ((stack1 = helpers["if"].call(alias3,(helpers.and || (depth0 && depth0.and) || alias4).call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depth0 != null ? depth0.couponBenefitTypeCode : depth0),"CartAward",{"name":"eq","hash":{},"data":data}),(helpers.gt || (depth0 && depth0.gt) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.couponAwardExList : depth0)) != null ? stack1.size : stack1),0,{"name":"gt","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<button type=\"button\"><span class=\"sr_only\">내용 보기</span></button>\n			</dt>\n			<dd>\n				<div class=\"panel gray\">\n					<div class=\"panel_cont pd_sm\">\n						<p class=\"text\">쿠폰명 : "
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</p>\n						<p class=\"text\">만료예정일 : "
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.expExpectedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</p>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.foGuide : depth0),"!=",null,{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\n				</div>\n			</dd>\n		</dl>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "				<span class=\"freebies\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.couponAwardExList : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</span>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.or || (depth0 && depth0.or) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depths[1] != null ? depths[1].awardTgtCode : depths[1]),"Prod",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depths[1] != null ? depths[1].awardTgtCode : depths[1]),"SpPrice",{"name":"eq","hash":{},"data":data}),{"name":"or","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.eq : depth0),(depths[1] != null ? depths[1].awardTgtCode : depths[1]),"Point",{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.eq : depth0),(depths[1] != null ? depths[1].awardTgtCode : depths[1]),"Giftcard",{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<span class=\"table_layout\">\n								<span class=\"thumb\">\n									<img ap:src=\"@{/images/dummy/650010812_IM_01.png}\" alt=\"\">\n								</span>\n								<span>\n									<b>[사은품 증정]</b>"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + " - "
    + alias2(alias1((depth0 != null ? depth0.prodSalePrice : depth0), depth0))
    + "\n								</span>\n							</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<span class=\"table_layout\">\n								<span>\n									<b>[포인트 증정]</b>"
    + alias2(alias1((depth0 != null ? depth0.pointTypeCode : depth0), depth0))
    + " - "
    + alias2(alias1((depth0 != null ? depth0.pointSavingMethodCode : depth0), depth0))
    + " - "
    + alias2(alias1((depth0 != null ? depth0.savingPoint : depth0), depth0))
    + " -"
    + alias2(alias1((depth0 != null ? depth0.applySavingPoint : depth0), depth0))
    + "\n								</span>\n							</span>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"table_layout\">\n								<span>\n									<b>[기프트카드 증정]</b>\n								</span>\n							</span>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "						<dl class=\"dl_cont mgt30\">\n							<dt><b>사용제한</b></dt>\n							<dd>\n								<ul class=\"list_bullet_dot\">\n									<li><pre>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.foGuide : depth0), depth0))
    + "</pre></li>\n								</ul>\n							</dd>\n						</dl>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text font_lg\"><b>보유중인 쿠폰이 없습니다.</b></p>\n		<br>\n		<p class=\"text\">적용 가능 쿠폰보기에서 다운로드 가능한<br>\n			쿠폰을 확인하시고 다양한 혜택이 담긴 쿠폰을<br>\n			다운로드 받으실 수 있습니다.\n		</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponCnt : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});