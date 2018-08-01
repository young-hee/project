this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["orderList-footer"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "			<ul class=\"list_bullet_dot\">\n				<li>주문접수, 결제완료 단계에서는 같은 가격 내의 상품 옵션 변경만 가능하며 주문내역 변경은 주문 취소 후 재 결제 바랍니다.</li>\n				<li>배송준비중, 배송중 단계에서는 주문내역 변경, 취소, 배송지 정보 변경이 진행되지 않습니다.</li>\n				<li>테이크아웃 주문은 매장에서 상품 준비가 완료되면 SMS를 발송하며 수신한 SMS 내 주문번호를 수령매장에 제시하면 상품을 찾을 수 있습니다.</li>\n				<li>수령확인 후 반품 및 교환이 가능합니다.  <a href=\"/cs/faq\"><em> [교환/반품FAQ 바로가기]</em></a></li>\n				<li>취소/반품/교환은 주문 상세 화면에서 가능합니다.</li>\n				<li>구매 상품에 리뷰를 작성하면 진주알이 적립됩니다. (배송완료 후 30일 이내 작성)</li>\n			</ul>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "			<ul class=\"list_bullet_dot\">\n				<li>교환 및 반품 문의는 구입하신 매장으로 연락 주세요.</li>\n				<li>구매 상품에 리뷰를 작성하면 진주알이 적립됩니다. (배송완료 후 30일 이내 작성)</li>\n			</ul>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "			<ul class=\"list_bullet_dot\">\n				<li>수령확인 후 반품 및 교환이 가능합니다.  <a href=\"/cs/faq\"><em> [교환/반품FAQ 바로가기]</em></a></li>\n				<li>취소/반품/교환은 주문 상세 화면에서 가능합니다.</li>\n			</ul>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"panel gray mgt40\">\n	<div class=\"panel_cont\">\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"online",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"store",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"returnExchange",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<div class=\"cs_info\">\n			<b>제품 및 매장 관련 문의</b>\n			<strong class=\"num\"><i class=\"ico_tel\"></i>080-022-2285</strong>\n			<span>평일 09:00~18:00, 점심시간 12:00~13:00 (토/일/공휴일 휴무)</span>\n		</div>\n	</div>\n</div>\n\n";
},"useData":true});