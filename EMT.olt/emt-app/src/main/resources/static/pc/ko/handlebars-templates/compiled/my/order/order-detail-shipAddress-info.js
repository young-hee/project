this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-shipAddress-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	<h3 class=\"h_title sub mgt80 mgb20\">상품 "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + " 회수 방법</h3>\n	<div class=\"panel gray bordered\">\n		<div class=\"panel_cont\">\n			<p class=\"font_lg\">에뛰드하우스 전용 택배사 이용</p>\n		</div>\n	</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "			"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.title : depth0), depth0))
    + " 회수지 정보\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "			배송지 정보\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.or || (depth0 && depth0.or) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.statusCode : depth0),"OrdReceivedWaiting",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.statusCode : depth0),"OrdReceivedComplete",{"name":"eq","hash":{},"data":data}),{"name":"or","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<button class=\"btn_sm_bordered\" type=\"button\" onclick=\"editShipAddress('"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipAddressTypeCode : stack1), depth0))
    + "')\">배송 정보 수정</button>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<button class=\"btn_sm_bordered\" type=\"button\" onclick=\"editShipAddress('"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipAddressTypeCode : stack1), depth0))
    + "')\">배송 정보 수정</button>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				<li><b>주소</b><span>("
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.zipCode : stack1), depth0))
    + ") "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address1 : stack1), depth0))
    + " "
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address2 : stack1), depth0))
    + "</span></li>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "				<li><b>주소</b><span>편의점명 : "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreName : stack1), depth0))
    + " / 연락처 : "
    + alias1((helpers.phoneNumberFormat || (depth0 && depth0.phoneNumberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStorePhoneNo : stack1)) != null ? stack1.phoneNo : stack1),{"name":"phoneNumberFormat","hash":{},"data":data}))
    + "</span></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return ((stack1 = helpers["if"].call(alias1,(helpers.and || (depth0 && depth0.and) || alias2).call(alias1,(helpers.isExist || (depth0 && depth0.isExist) || alias2).call(alias1,(depth0 != null ? depth0.claimDate : depth0),{"name":"isExist","hash":{},"data":data}),(helpers.ne || (depth0 && depth0.ne) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"cancel",{"name":"ne","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<div class=\"clear mgt80 mgb20\">\n	<h3 class=\"h_title sub\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),"||",(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"exchange",{"name":"eq","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "	</h3>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"==","detail",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "</div>\n<div class=\"panel gray bordered\">\n	<div class=\"panel_cont\">\n		<ul class=\"my_delivery_info\">\n			<li><b>이름</b><span>"
    + alias4(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientName : stack1)) != null ? stack1.name1 : stack1), depth0))
    + "</span></li>\n			<li><b>휴대폰번호</b><span>"
    + alias4((helpers.phoneNumberFormat || (depth0 && depth0.phoneNumberFormat) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientPhoneNo1 : stack1)) != null ? stack1.phoneNo : stack1),{"name":"phoneNumberFormat","hash":{},"data":data}))
    + "</span></li>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipAddressTypeCode : stack1),"ShipAddressInput",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipAddressTypeCode : stack1),"CStoreSelect",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<li><b>배송 시 요청사항</b><span>"
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipMsg : stack1), depth0))
    + "</span></li>\n		</ul>\n	</div>\n</div>";
},"useData":true});