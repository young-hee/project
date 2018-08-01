this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["fullpage-coupon-use"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "									<div class=\"check_set align_right\">\n										<span class=\"check_wrap\"><input type=\"checkbox\" id=\"couponAll\" name=\"couponAll\"><label for=\"couponAll\">전체선택</label></span>\n									</div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									<div class=\"page_btns\">\n										<button type=\"button\" class=\"btn_md_secondary\" id=\"b_close\">취소</button>\n										<button type=\"button\" class=\"btn_md_primary\" id=\"b_save\">적용하기</button>\n									</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "										<div class=\"ui_accordion\" data-open-type=\"single\">\n											<dl>\n												<dt>\n													<span class=\"title\">\n														<span class=\"check_wrap\">\n															<input type=\"checkbox\" id=\"couponSn_"
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\" name=\"couponSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\">\n															<label for=\"couponSn_"
    + alias2(alias1((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\">\n																<span class=\"d_day\">D-60</span><span class=\"price\" id=\"price\">20,000 할인</span>\n																<span class=\"coupon_name\" id=\"couponName\">"
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</span>\n															</label>\n														</span>\n													</span>\n													<button type=\"button\"><span class=\"sr_only\">더보기</span></button>\n												</dt>\n												<dd>\n													<div class=\"cont\">\n														<ul class=\"list\">\n															<li>쿠폰명 : "
    + alias2(alias1((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</li>\n															<li>만료 예정일 : "
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.expExpectedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</li>\n														</ul>\n														<dl class=\"dl_cont mgt10\">\n															<dt><b>사용제한</b></dt>\n															<dd>\n																<ul class=\"list_bullet_dot\">\n																	<li>"
    + alias2(alias1((depth0 != null ? depth0.foGuide : depth0), depth0))
    + "</li>\n																</ul>\n															</dd>\n														</dl>\n													</div>\n												</dd>\n											</dl>\n										</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "									<div class=\"panel notice\">\n										<i class=\"ico\"></i>\n										<p class=\"text\">보유중인 쿠폰이 없습니다.</p>\n										<p class=\"text\">적용 가능 쿠폰보기에서 다운로드 가능한<br>쿠폰을 확인하시고 다양한 혜택이 담긴 쿠폰을<br>다운로드 받으실 수 있습니다.</p>\n									</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "									<div class=\"coupon_down\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									</div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "											<ul>\n												<li>\n													<span class=\"title\">회원등급별 발급쿠폰 No.2018Happy!</span>\n													<button type=\"button\" class=\"btn_coupon_down\">쿠폰받기</button>\n												</li>\n											</ul>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "									<div class=\"panel notice\">\n										<i class=\"ico\"></i>\n										<p class=\"text\">다운로드 가능한 쿠폰이 없습니다.</p>\n										<p class=\"text\">이벤트/행사 정보를 통해 할인 및 다양한 혜택이 담긴<br>쿠폰 이벤트에 해당하는 제품을 주문해보세요.</p>\n										<button class=\"btn_md_bordered\" type=\"button\">다양한 이벤트/행사 보러가기</button>\n									</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"layer_popup fullpage coupon_use\">\n	<div class=\"layer_wrap\">\n		<dl class=\"layer\">\n			<dt class=\"layer_title\">쿠폰조회</dt>\n			<dd class=\"layer_cont\">\n				<div class=\"panel\">\n					<h2 class=\"h_title page\">쿠폰조회</h2>\n					<p class=\"text font_md\">결제시 사용할 쿠폰을 조회합니다.</p>\n					<fieldset class=\"validate\">\n						<legend class=\"sr_only\">쿠폰번호 입력항목</legend>\n						<div class=\"input_btn_wrap\">\n							<div class=\"input_wrap\">\n								<input type=\"text\" id=\"searchText\" name=\"searchText\" placeholder=\"쿠폰번호 입력\">\n							</div>\n							<button type=\"button\" class=\"btn_md_primary\" id=\"search\" name=\"search\">등록</button>\n						</div>\n					</fieldset>\n					<hr class=\"div m30\">\n					<!-- tab menu wrap -->\n					<div class=\"ui_tab box\">\n						<!-- tab menu -->\n						<div class=\"tab_menu equally\">\n							<ul>\n								<li class=\"on\"><button type=\"button\">내가 보유한 쿠폰</button></li>\n								<li><button type=\"button\">다운 가능한 쿠폰</button></li>\n							</ul>\n						</div>\n						<!-- tab contents wrap -->\n						<div class=\"tab_contents\">\n							<!-- tab content -->\n							<div class=\"tab_cont\">\n								<h3 class=\"sr_only\">내가 보유한 쿠폰</h3>\n								<div class=\"coupon_list\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.couponCnt : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "								</div>\n							</div>\n\n							<div class=\"tab_cont\">\n								<h3 class=\"sr_only\">다운 가능한 쿠폰</h3>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.couponCnt : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "							</div>\n						</div>\n					</div>\n					<div class=\"panel gray mgt25\">\n						<dl class=\"dl_cont\">\n							<dt><b>유의사항</b></dt>\n							<dd>\n								<ul class=\"list_bullet_dot\">\n									<li><b>[쿠폰제외]</b> 제품은 쿠폰 사용이 불가합니다.</li>\n									<li>쿠폰의 특이사항은 자세히보기를 클릭해 보세요.</li>\n									<li>쿠폰 사용시 포인트를 적립받을 수 없습니다.</li>\n									<li>온라인쿠폰과 통합쿠폰 중 하나만 사용 가능합니다.</li>\n								</ul>\n							</dd>\n						</dl>\n					</div>\n					<div class=\"panel gray mgt15\">\n						<dl class=\"dl_cont\">\n							<dt><b>온라인전용 쿠폰</b></dt>\n							<dd>\n								<ul class=\"list_bullet_dot\">\n									<li>쇼핑몰에서만 사용 가능한 쿠폰입니다. (매장사용불가)</li>\n									<li>장바구니/상품/증정 쿠폰 등이 해당합니다.</li>\n									<li>온라인전용 인증번호 쿠폰은 상단에 입력 후 결제시 사용가능합니다.</li>\n								</ul>\n							</dd>\n						</dl>\n						<dl class=\"dl_cont mgt15\">\n							<dt><b>통합쿠폰(온-오프 통합쿠폰)</b></dt>\n							<dd>\n								<ul class=\"list_bullet_dot\">\n									<li>온라인쇼핑몰과 일반매장에서 사용 가능한 쿠폰입니다. (중복사용불가)</li>\n									<li>통합쿠폰으로 발행된 인증번호 쿠폰은 결제 단계에서 등록후 사용가능합니다. (선등록불가)</li>\n								</ul>\n							</dd>\n						</dl>\n					</div>\n				</div>\n			</dd>\n		</dl>\n		<button class=\"layer_close\" type=\"button\">레이어 닫기</button>\n	</div>\n</div>";
},"useData":true});