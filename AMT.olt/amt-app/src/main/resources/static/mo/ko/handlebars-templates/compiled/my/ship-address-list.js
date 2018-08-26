this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["ship-address-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "		<dl class=\"address_info\">\n			<dt class=\"title\">\n				<b>"
    + alias4(((helper = (helper = helpers.shipAddressName || (depth0 != null ? depth0.shipAddressName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressName","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.repShipAddressYn : depth0),"===","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</b>\n			</dt>\n			<dd>\n				<dl class=\"ui_table\">\n					<dt><b>받는사람</b></dt>\n					<dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeName : depth0)) != null ? stack1.name1 : stack1), depth0))
    + "</dd>\n				</dl>\n				<dl class=\"ui_table address\">\n					<dt><b>주소</b></dt>\n					<dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeAddress : depth0)) != null ? stack1.address1 : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeAddress : depth0)) != null ? stack1.address2 : stack1), depth0))
    + "</dd>\n				</dl>\n				<dl class=\"ui_table\">\n					<dt><b>연락처</b></dt>\n					<dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "</dd>\n				</dl>\n				<dl class=\"ui_table\">\n					<dt><b>추가연락처</b></dt>\n					<dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo2 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "</dd>\n				</dl>\n				<div class=\"btns\">\n					<button type=\"button\" onclick=\"addShip("
    + alias4((helpers.json || (depth0 && depth0.json) || alias2).call(alias1,depth0,{"name":"json","hash":{},"data":data}))
    + ")\"><i class=\"ico_edit\"></i><span class=\"sr_only\">수정</span></button>\n					<button type=\"button\" onclick=\"deleteShipAddress("
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + ")\"><i class=\"ico_trash_s\"></i><span class=\"sr_only\">삭제</span></button>\n				</div>\n			</dd>\n		</dl>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "						<em>(기본배송지)</em>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});