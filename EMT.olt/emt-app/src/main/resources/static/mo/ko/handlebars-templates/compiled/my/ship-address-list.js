this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["ship-address-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    		<div class=\"panel delivery\">\n			<div class=\"delivery_wrap\">\n				<h3 class=\"delivery_title\">"
    + alias4(((helper = (helper = helpers.shipAddressName || (depth0 != null ? depth0.shipAddressName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressName","hash":{},"data":data}) : helper)))
    + "</h3>\n				<span class=\"check_wrap star\"> \n					<input name=\"rep\" type=\"radio\" id=\""
    + alias4(((helper = (helper = helpers.shipAddressName || (depth0 != null ? depth0.shipAddressName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressName","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.checkedIf || (depth0 && depth0.checkedIf) || alias2).call(alias1,(depth0 != null ? depth0.repShipAddressYn : depth0),{"name":"checkedIf","hash":{},"data":data}))
    + "> \n					<label for=\""
    + alias4(((helper = (helper = helpers.shipAddressName || (depth0 != null ? depth0.shipAddressName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressName","hash":{},"data":data}) : helper)))
    + "\">기본 배송지</label>\n				</span>\n			</div>\n			<div class=\"delivery_info\">\n				<div class=\"delivery_addr\">\n					<span>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeAddress : depth0)) != null ? stack1.address1 : stack1), depth0))
    + " "
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeAddress : depth0)) != null ? stack1.address2 : stack1), depth0))
    + "</span>\n					<div class=\"ui_table\">\n						<dl>\n							<dt>받는이</dt>\n							<dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.addresseeName : depth0)) != null ? stack1.name1 : stack1), depth0))
    + "</dd>\n						</dl>\n						<dl>\n							<dt>휴대전화</dt>\n							<dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "</dd>\n						</dl>\n						<dl>\n							<dt>일반전화번호</dt>\n							<dd>"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo2 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "</dd>\n						</dl>\n					</div>\n				</div>\n\n				<div class=\"delivery_btn_wrap\">\n					<form action=\"/my/page/ship/updateAddress\" method=\"post\">\n\n						<input type=\"hidden\" value=\""
    + alias4((helpers.json || (depth0 && depth0.json) || alias2).call(alias1,depth0,{"name":"json","hash":{},"data":data}))
    + "\" id=\"data\" name=\"data\">\n										\n						<input type=\"hidden\" value=\""
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + "\" id=\"sn\" name=\"sn\">\n\n						<button class=\"btn_md w50p edit\" type=\"submit\">수정하기</button>\n						<button class=\"btn_md w50p del\" type=\"button\" value=\""
    + alias4(((helper = (helper = helpers.shipAddressSn || (depth0 != null ? depth0.shipAddressSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"shipAddressSn","hash":{},"data":data}) : helper)))
    + "\">삭제하기</button>\n					</form>\n				</div>\n			</div>\n		</div>	\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text color_gray\">등록된 배송지가 없습니다.</p>					\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});