this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-footer"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "	<div class=\"page_btns pdt40\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"online",{"name":"eq","hash":{},"data":data}),"||",(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"store",{"name":"eq","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<div class=\"page_btns pdt40\">\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.or || (depth0 && depth0.or) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.statusCode : depth0),"OrdReceivedWaiting",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.statusCode : depth0),"OrdReceivedComplete",{"name":"eq","hash":{},"data":data}),{"name":"or","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.statusCode : depth0),"OrdHandlingComplete",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<button class=\"btn_lg_neutral\" type=\"button\" onclick=\"javascript:location.href='/my/page/onlineOrderShipping'\">목록으로</button>\n			</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shippingOrdOnlineProdList : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.storePickupOrdOnlineProdList : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "						<button class=\"btn_lg_bordered\" type=\"button\" onclick=\"chgStatus('cancel')\">온라인 쇼핑 취소</button>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "						<button class=\"btn_lg_bordered\" type=\"button\" onclick=\"chgStatus('cancel')\">테이크아웃 쇼핑 취소</button>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "					<button class=\"btn_lg_bordered\" type=\"button\" onclick=\"chgStatus('return')\">반품신청</button>\n					<button class=\"btn_lg_bordered\" type=\"button\" onclick=\"chgStatus('exchange')\">교환신청</button>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.type : depth0),"==","cashReceipts",{"name":"xif","hash":{},"fn":container.program(11, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "				<div class=\"page_btns pdt40\">\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.goods : stack1)) != null ? stack1.cashReceiptIssueYn : stack1),"N",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<button class=\"btn_lg_neutral\" type=\"button\" onclick=\"javascript:location.href='/my/page/cashReceipts'\">목록으로</button>\n				</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<button class=\"btn_lg_bordered\" type=\"button\" onclick=\"reqCashReceipts("
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.goods : stack1)) != null ? stack1.ordSn : stack1), depth0))
    + ")\">발급 신청</button>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "				<button class=\"btn_lg_neutral\" type=\"button\" onclick=\"javascript:location.href='/my/page/returnExchange'\">목록으로</button>\n";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"cancel",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"exchange",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),"one",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),"two",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(29, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    return "		<dl class=\"dl_cont\">\n			<dt><b>주의사항</b></dt>\n			<dd>\n				<p class=\"bullet_dot\">전체취소 및 부분취소를 하시게 되면, 주문 시 적용하셨던 쿠폰은 소멸되며, 재발행 되지 않습니다.</p>\n			</dd>\n		</dl>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.step : depth0),"two",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(20, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    return "			<dl class=\"dl_cont\">\n				<dt><b>교환 안내</b></dt>\n				<dd>\n					<ul class=\"list_bullet_dot\">\n						<li>교환 회수지에서는 택배기사님이 동일한 상품을 가지고 가서, 현장에서 바로 교환하여 드립니다.</li>\n						<li>현장에서 바로 교환하여 드리기 때문에 연락처는 정확하게 기입하여야 합니다.</li>\n						<li><b>교환 배송 비용에 대한 지불은 상담사가 직접 고객님께 연결하여 처리 합니다.</b></li>\n					</ul>\n				</dd>\n			</dl>\n";
},"22":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),"one",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),"two",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    return "			<dl class=\"dl_cont\">\n				<dt><b>반품 안내</b></dt>\n				<dd>\n					<ul class=\"list_bullet_dot\">\n						<li>전체 반품일 경우에는 제공받으신 사은품도 같이 반품하셔야 합니다.</li>\n						<li>반품할 상품에 같이 포함된 사은품이 있을 경우 본 상품과 같이 반품하셔야 합니다.</li>\n						<li>선불카드 결제 주문건은 전체반품을 하셔야 합니다. (부분반품 처리 불가)</li>\n					</ul>\n				</dd>\n			</dl>\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "			<dl class=\"dl_cont\">\n				<dt><b>주의사항</b></dt>\n				<dd>\n					<ul class=\"list_bullet_dot\">\n						<li>전체반품 및 부분반품을 하시게 되면, 주문 시 적용하셨던 쿠폰은 소멸되며, 재발행 되지 않습니다.</li>\n					</ul>\n				</dd>\n			</dl>\n";
},"27":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"page_btns pdt40\">\n			<button class=\"btn_lg_bordered\" type=\"button\" onclick=\"javascript:location.href='/my/page/onlineOrderShipping'\">취소</button>\n			<button class=\"btn_lg_neutral\" type=\"button\" onclick=\"claimProdSelect()\">다음</button>\n		</div>\n";
},"29":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "		<div class=\"page_btns pdt40\">\n			<button class=\"btn_lg_bordered\" type=\"button\" onclick=\"javascript:location.href='/my/page/onlineOrderShipping'\">취소</button>\n			<button class=\"btn_lg_neutral\" type=\"button\" onclick=\"reqClaimComplete("
    + alias1((helpers.json || (depth0 && depth0.json) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"json","hash":{},"data":data}))
    + ")\">"
    + alias1(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + " 신청</button>\n		</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.status : depth0),"==","detail",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(16, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});