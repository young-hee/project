this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["select-order-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "		<tr class=\"selected\">\n			<td><span class=\"check_wrap check_only\"><input type=\"checkbox\" class=\"table_striped\" id=\"ord_"
    + alias2(alias1((depth0 != null ? depth0.ordSn : depth0), depth0))
    + "\" name=\"order\"><label for=\"ord_"
    + alias2(alias1((depth0 != null ? depth0.ordSn : depth0), depth0))
    + "\"><span class=\"sr_only\">{주문번호}</span></label></span></td>\n			<td>"
    + alias2(((helper = (helper = helpers.ordNo || (depth0 != null ? depth0.ordNo : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"ordNo","hash":{},"data":data}) : helper)))
    + "</td>\n			<td>"
    + alias2(((helper = (helper = helpers.ordName || (depth0 != null ? depth0.ordName : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"ordName","hash":{},"data":data}) : helper)))
    + "</td>\n			<td>"
    + alias2((helpers.currencyFormat || (depth0 && depth0.currencyFormat) || alias4).call(alias3,(depth0 != null ? depth0.finalOrdPrice : depth0),{"name":"currencyFormat","hash":{},"data":data}))
    + "</td>\n			<td>"
    + alias2(((helper = (helper = helpers.ordStatusCode || (depth0 != null ? depth0.ordStatusCode : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"ordStatusCode","hash":{},"data":data}) : helper)))
    + "</td>\n		</tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<tr>\n		<td colspan=\"5\">\n			<div class=\"panel notice\">\n				<p class=\"text\">검색결과가 없습니다.</p>\n			</div>\n		</td>\n	</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});