this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-use"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<!-- tab menu wrap -->\n			<div class=\"ui_tab mgt30\">\n				<!-- tab menu -->\n				<div class=\"tab_menu box equally\">\n					<ul>\n						<li class=\"on\"><button type=\"button\">내가 보유한 쿠폰</button></li>\n						<li><button type=\"button\">다운가능한 쿠폰</button></li>\n					</ul>\n				</div>\n				<!-- tab contents wrap -->\n				<div class=\"tab_contents\">\n					<!-- tab content -->\n					<div class=\"tab_cont\">\n						<h3 class=\"sr_only\">내가 보유한 쿠폰</h3>\n						<div class=\"coupon_list availCoupon\">\n							"
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || alias2).call(alias1,"order.fullpage-coupon-use-avail",(depth0 != null ? depth0.coupon : depth0),{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n						</div>\n					</div>\n					<div class=\"tab_cont\">\n						<h3 class=\"sr_only\">다운가능한 쿠폰</h3>\n						<div class=\"coupon_list downloadCouponArea\">\n							"
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || alias2).call(alias1,"order.fullpage-coupon-use-download",(depth0 != null ? depth0.downloadCoupon : depth0),{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n						</div>\n					</div>\n				</div>\n			</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"ui_tab mgt30\">\n				<!-- tab contents wrap -->\n				<div class=\"tab_contents\">\n					<!-- tab content -->\n					<div class=\"tab_cont\">\n						<h3 class=\"sr_only\">다운가능한 쿠폰</h3>\n						<div class=\"coupon_list inputCouponArea\">\n							"
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"order.fullpage-coupon-use-nonMemberAvail",(depth0 != null ? depth0.inputCoupon : depth0),{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n						</div>\n					</div>\n				</div>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<dl class=\"layer\">\n	<dt class=\"layer_title\">쿠폰조회</dt>\n	<dd class=\"layer_cont\">\n		<div class=\"panel gray\">\n			<fieldset class=\"panel_cont pd_sm form\">\n				<legend class=\"sr_only\">쿠폰 등록</legend>\n				<div class=\"input_btn_wrap\">\n					<span class=\"input_wrap\">\n						<input type=\"text\" title=\"쿠폰번호 입력\" placeholder=\"쿠폰번호 입력\" name=\"couponIdentifier\">\n					</span>\n					<button type=\"button\" class=\"btn_md_form\" id=\"registerBtn\">등록</button>\n				</div>\n			</fieldset>\n		</div>\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isApMember : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "		<div class=\"panel gray mgt30\">\n			<div class=\"panel_cont pd_sm\">\n				<dl class=\"dl_cont\">\n					<dt class=\"h_title cont\">유의사항</dt>\n					<dd>\n						<ul class=\"list_bullet_dot\">\n							<li>[쿠폰제외] 제품은 쿠폰 사용이 불가합니다.</li>\n							<li>쿠폰의 특이사항은 자세히보기를 클릭해 보세요.</li>\n							<li>쿠폰 사용시 포인트를 적립받을 수 없습니다.</li>\n							<li>온라인쿠폰과 통합쿠폰 중 하나만 사용 가능합니다.</li>\n						</ul>\n					</dd>\n				</dl>\n			</div>\n		</div>\n		<div class=\"panel gray\">\n			<div class=\"panel_cont pd_sm\">\n				<dl class=\"dl_cont\">\n					<dt class=\"h_title cont\">온라인 전용 쿠폰</dt>\n					<dd>\n						<ul class=\"list_bullet_dot\">\n							<li>쇼핑몰에서만 사용 가능한 쿠폰입니다. (매장사용불가)</li>\n							<li>장바구니/상품/증정 쿠폰이 해당합니다.</li>\n							<li>온라인 전용 인증번호 쿠폰은 상단에 입력 후 결제시 사용 가능합니다.</li>\n						</ul>\n					</dd>\n				</dl>\n				<dl class=\"dl_cont mgt30\">\n					<dt class=\"h_title cont\">통합쿠폰(온-오프 통합 쿠폰)</dt>\n					<dd>\n						<ul class=\"list_bullet_dot\">\n							<li>온라인쇼핑몰과 일반매장에서 사용 가능한 쿠폰입니다. (중복사용불가)</li>\n							<li>통합쿠폰으로 발행된 인증번호 쿠폰은 결제 단계에서 등록후 사용가능합니다.(선등록불가)</li>\n						</ul>\n					</dd>\n				</dl>\n			</div>\n		</div>\n	</dd>\n</dl>";
},"useData":true});