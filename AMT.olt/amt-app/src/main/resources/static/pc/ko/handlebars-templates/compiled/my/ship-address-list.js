this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["ship-address-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "		<tr>\n			<td><span class=\"check_wrap check_only\">\n				<input type=\"checkbox\" name=\"check\" id=\""
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + "\" onclick=\"cbClick(this);\"><label for=\""
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + "\"><span class=\"sr_only\">checkbox만 보일때</span></label></span></td>\n			<td>"
    + alias4(((helper = (helper = helpers.shipAddressName || (depth0 != null ? depth0.shipAddressName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressName","hash":{},"data":data}) : helper)))
    + "<br>\n				<span type=\"rep\" val=\""
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + "\" class=\""
    + alias4((helpers.repClass || (depth0 && depth0.repClass) || alias2).call(alias1,(depth0 != null ? depth0.repShipAddressYn : depth0),{"name":"repClass","hash":{},"data":data}))
    + "\">"
    + alias4((helpers.repText || (depth0 && depth0.repText) || alias2).call(alias1,(depth0 != null ? depth0.repShipAddressYn : depth0),{"name":"repText","hash":{},"data":data}))
    + "</span>\n			<td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeName : depth0)) != null ? stack1.name1 : stack1), depth0))
    + "</td>\n			<td class=\"align_left\"><p>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeAddress : depth0)) != null ? stack1.address1 : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeAddress : depth0)) != null ? stack1.address2 : stack1), depth0))
    + "</p></td>\n			<td>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "<br>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo2 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "</td>\n			<td>\n				<button type=\"button\" class=\"btn_modify\" onclick=\"showUpdateLayer("
    + alias4((helpers.json || (depth0 && depth0.json) || alias2).call(alias1,depth0,{"name":"json","hash":{},"data":data}))
    + ", "
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + ")\"><span class=\"sr_only\">수정</span></button>\n				<button type=\"button\" class=\"btn_del\" onclick=\"deleteAddress("
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + ")\"><span class=\"sr_only\">삭제</span></button>\n			</td>\n		</tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<tr>\n		<td colspan=\"6\">\n			<div class=\"no_data\">\n				<p>내역이 없습니다.</p>\n			</div>\n		</td>\n	</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});