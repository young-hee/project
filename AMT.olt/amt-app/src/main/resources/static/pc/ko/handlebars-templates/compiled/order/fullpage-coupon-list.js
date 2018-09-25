this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "							<li>\n								<span class=\"check_wrap\">\n									<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\" name=\"couponSn\" data-code=\""
    + alias2(alias1((depth0 != null ? depth0.duplicationUseConditionCode : depth0), depth0))
    + "\">\n									<label for=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\">\n										<span class=\"ellipsis\">["
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "] "
    + alias2(alias1((depth0 != null ? depth0.foGuide : depth0), depth0))
    + "</span>\n										<span class=\"txt_small_gray\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.expExpectedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + " 까지</span>\n									</label>\n								</span>\n								<p class=\"txt_price\">"
    + ((stack1 = (helpers.couponTypeBenefitSwitch || (depth0 && depth0.couponTypeBenefitSwitch) || alias4).call(alias3,depth0,{"name":"couponTypeBenefitSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "</p>\n							</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- AP.modal.info() 의 contents 영역 -->\n<div class=\"ly_content\">\n\n	<div class=\"search_wrap\">\n		<div class=\"input_wrap\">\n			<input type=\"text\" name=\"couponIdentifier\" placeholder=\"쿠폰번호 입력\" class=\"input_coupon\">\n		</div>\n		<a href=\"#none\" class=\"btn_fix_neutral\" id=\"registerBtn\">확인</a>\n	</div>		<!-- // search_wrap -->\n\n	<div class=\"con_wrap\"> \n		<div class=\"con_top_box\">\n			<span class=\"title\">쿠폰사용 합계</span><span class=\"total_num_purple\"></span>\n		</div>		<!-- // con_top_box -->\n		<div class=\"con_bottom_box\">\n			<div class=\"coupon_ck_list_line\">\n				<div class=\"scroll\">\n					<ul class=\"coupon_ck_list\">\n						<!-- 쿠폰 리스트 -->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</div>\n			</div>\n			<ul class=\"sub_txt txt_small_gray\">\n				<li>쿠폰 사용시 포인트를 적립 받을  수 없습니다.</li>\n				<li>상품쿠폰/증정 쿠폰/플러스멤버십쿠폰 등이 해당합니다.</li>\n				<li>인증번호 쿠폰은 상단에 입력 후 결제 시 사용 가능합니다.</li>\n			</ul>\n			<div class=\"mg_side\">\n				<a href=\"#1\" class=\"btn_full disabled\" id=\"b_save\">확인</a>\n			</div>\n		</div>		<!-- con_bottom_box -->\n	</div>		<!-- // con_wrap -->\n</div>\n";
},"useData":true});