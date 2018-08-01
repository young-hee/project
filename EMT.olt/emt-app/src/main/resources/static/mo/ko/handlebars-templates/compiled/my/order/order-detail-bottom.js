this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-bottom"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"===","online",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"===","store",{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.and || (depth0 && depth0.and) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"cashReceipts",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.cashReceiptIssueYn : depth0),"N",{"name":"eq","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		<button class=\"btn_md_neutral w100p\" type=\"button\" onclick=\"onBack()\">목록으로</button>\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordDetailStatusCode : depth0),"===","OrdHandlingComplete",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "				<div class=\"page_btns mgt15\">\n					<button class=\"btn_md_bordered\" type=\"button\" onclick=\"selectClaimType('return', '')\">반품신청</button>\n					<button class=\"btn_md_bordered\" type=\"button\" onclick=\"selectClaimType('exchange', '')\">교환신청</button>\n				</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordDetailStatusCode : depth0),"===","Shipping",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"page_btns mgt15\">\n						<button class=\"btn_md_bordered\" type=\"button\">배송조회</button>\n						<button class=\"btn_md_bordered\" type=\"button\">수령확인</button>\n					</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"page_btns mgt0\">\n						<button class=\"btn_md_bordered\" type=\"button\" onclick=\"selectClaimType('cancel', 'on')\">온라인 쇼핑 취소</button>\n						<button class=\"btn_md_bordered\" type=\"button\" onclick=\"selectClaimType('cancel', 'take')\">테이크 아웃 취소</button>\n					</div>\n					<button class=\"btn_md_bordered w100p mgt10\" type=\"button\" onclick=\"selectClaimType('cancel', 'all')\">전체 취소</button>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "			<button class=\"btn_md_bordered w100p\" onclick=\"receiptIssue()\" type=\"button\">발급신청</button>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"===","return",{"name":"xif","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"===","exchange",{"name":"xif","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"===","cancel",{"name":"xif","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<dl class=\"dl_cont\">\n				<dt><b>반품 안내</b></dt>\n				<dd>\n					<ul class=\"list_bullet_dot\">\n						<li>전체 반품일 경우에는 제공받으신 사은품도 같이 반품하셔야 합니다.</li>\n						<li>반품할 상품에 같이 포함된 사은품이 있을 경우 본 상품과 같이 반품 하셔야 합니다.</li>\n						<li>선불카드 결제 주문건은 전체반품을 하셔야 합니다. (부분반품 처리 불가)</li>\n					</ul>\n				</dd>\n			</dl>\n			<div class=\"page_btns\">\n				<button class=\"btn_md_bordered\" type=\"button\" onclick=\"onBack()\">취소</button>\n				<button class=\"btn_md_neutral\" type=\"button\" onclick=\"actionNext('return')\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),1,{"name":"eq","hash":{},"data":data}),"다음","반품신청",{"name":"condition","hash":{},"data":data}))
    + "</button>\n			</div>\n";
},"17":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "\n			<div class=\"page_btns mgt0\">\n				<button class=\"btn_md_bordered\" type=\"button\" onclick=\"onBack()\">취소</button>\n				<button class=\"btn_md_neutral\" type=\"button\" onclick=\"actionNext('exchange')\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),1,{"name":"eq","hash":{},"data":data}),"다음","교환신청",{"name":"condition","hash":{},"data":data}))
    + "</button>\n			</div>\n";
},"19":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<dl class=\"dl_cont\">\n				<dt><b>주의 사항</b> </dt>\n				<dd>\n					<ul class=\"list_bullet_dot\">\n						<li>전체취소 및 부분취소를 하시게 되면, 주문 시 적용하셨던 쿠폰은 소멸 되며, 재발행 되지 않습니다.</li>\n					</ul>\n				</dd>\n			</dl>\n\n			<div class=\"page_btns\">\n				<button class=\"btn_md_bordered\" type=\"button\" onclick=\"onBack()\">취소</button>\n				<button class=\"btn_md_neutral\" type=\"button\" onclick=\"actionNext('cancel')\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),1,{"name":"eq","hash":{},"data":data}),"다음","취소신청",{"name":"condition","hash":{},"data":data}))
    + "</button>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"panel\">\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.status : depth0),"===","detail",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});