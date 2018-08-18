this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-ship-address"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "	<div class=\"title table_layout\">\n\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.or || (depth0 && depth0.or) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"exchange",{"name":"eq","hash":{},"data":data}),{"name":"or","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "\n		<div class=\"align_right\"><button type=\"button\" class=\"btn_sm_bordered\" onclick=\"changeShipAddress()\">배송정보 수정</button></div>\n	</div>\n	<div class=\"panel padding15\">\n		<div class=\"panel gray\">\n			<dl class=\"table_layout\">\n				<dt>이름</dt>\n				<dd>"
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientName : stack1)) != null ? stack1.name1 : stack1), depth0))
    + "</dd>\n			</dl>\n			<dl class=\"table_layout\">\n				<dt>휴대폰 번호</dt>\n				<dd>"
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientPhoneNo1 : stack1)) != null ? stack1.phoneNo : stack1), depth0))
    + "</dd>\n			</dl>\n			<dl class=\"table_layout\">\n				<dt>주소</dt>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipAddressTypeCode : stack1),"===","ShipAddressInput",{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "			</dl>\n			<dl class=\"table_layout\">\n				<dt>배송 시 요청사항</dt>\n				<dd>"
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipMsg : stack1), depth0))
    + "</dd>\n			</dl>\n		</div>\n	</div>\n\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<div><b class=\"font_lg\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),"반품 회수지 정보","교환 회수지 정보",{"name":"condition","hash":{},"data":data}))
    + "</b></div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "			<div><b class=\"font_lg\">배송정보</b></div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<dd>"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address1 : stack1), depth0))
    + "</dd>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<dd>편의점명 : "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreName : stack1), depth0))
    + "<br>\n						연락처 : "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStorePhoneNo : stack1)) != null ? stack1.phoneNo : stack1), depth0))
    + "</dd>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.and || (depth0 && depth0.and) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"request",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.step : depth0),1,{"name":"eq","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});