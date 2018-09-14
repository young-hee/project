this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "								<li>\n									<div class=\"check_wrap large\">\n										<label for=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\">\n											<span class=\"chk_h28 f_mid\">\n												<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.memberKeepingCouponSn : depth0), depth0))
    + "\" name=\"couponSn\" data-code=\""
    + alias2(alias1((depth0 != null ? depth0.duplicationUseConditionCode : depth0), depth0))
    + "\">\n											</span>\n											<span class=\"cont\">\n												<span class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + " &nbsp; "
    + alias2(alias1((depth0 != null ? depth0.foGuide : depth0), depth0))
    + "</span>\n												<span class=\"date\"> "
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.expExpectedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + " 까지</span>\n											</span>\n											<span class=\"price\">\n												<!-- <b>5,000</b>원<br>할인 -->\n												"
    + ((stack1 = (helpers.couponTypeBenefitSwitch || (depth0 && depth0.couponTypeBenefitSwitch) || alias4).call(alias3,depth0,{"name":"couponTypeBenefitSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "\n											</span>\n										</label>\n									</div>\n								</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"layer_popup fullpage btn_y benefit_layer\">\n	<div class=\"layer_wrap\">\n		<dl class=\"layer\">\n			<dt class=\"layer_title\">쿠폰조회</dt>\n			<dd class=\"layer_cont type2\">\n\n				<fieldset class=\"section registration_form\">\n					<legend class=\"sr_only\">쿠폰 등록</legend>\n					<div class=\"input_wrap\"><input type=\"text\" name=\"couponIdentifier\" title=\"쿠폰번호 입력\" placeholder=\"쿠폰번호를 입력해주세요\"></div>\n					<button type=\"button\" class=\"btn_sm_bordered\" id=\"registerBtn\">등록</button>\n				</fieldset>\n\n				<!-- (180906) 쿠폰 케이스추가 -->\n				<dl class=\"section coupon_list\">\n					<dt class=\"clear\"><span>쿠폰사용 합계</span> <em><b>0</b>원</em></dt>\n					<dd>\n						<ul>\n							<div id=\"couponApplyLoading\" style=\"height:100%; background:#ccc; display: none;\">\n								<div class=\"loading_layer\">\n									<img alt=\"로딩중\" src=\"/mo/ko/images/common/loading.gif\">\n								</div>\n							</div>\n							<!-- 쿠폰 리스트 -->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</ul>\n					</dd>\n				</dl>\n				<!--// (180906) 쿠폰 케이스추가 -->\n\n				<div class=\"section transparent\">\n					<p class=\"text color_light_gray\">쿠폰사용시 포인트를 적립받을 수 없습니다<br>상품쿠폰/증정쿠폰/플러스멤버십쿠폰 등이 해당됩니다<br>인증번호 쿠폰은 상단에 입력후 결제시 사용 가능합니다</p>\n				</div>\n\n				<div class=\"section no_coupon\" style=\"display:none;\">\n					<p class=\"txt\">보유중인 쿠폰이 없습니다.</p>\n					<p class=\"color_light_gray\">사용 가능 쿠폰보기에서<br>\n						다운로드 가능한 쿠폰을 확인하세요<br>\n						쿠폰을 다운받으면 다양한 혜택이 제공됩니다</p>\n				</div>\n			</dd>\n		</dl>\n		<div class=\"layer_btns\">\n			<button type=\"button\" class=\"btn_h50_pp\" id=\"b_save\" disabled>확인</button> <!--disabled 빼주시면 됩니다 활성화 버튼스타일 됩니다-->\n		</div>\n		<button type=\"button\" class=\"layer_close\" id=\"b_close\"><i class=\"ico_close\"></i><span class=\"sr_only\">레이어 닫기</span></button>\n	</div>\n</div>\n";
},"useData":true});