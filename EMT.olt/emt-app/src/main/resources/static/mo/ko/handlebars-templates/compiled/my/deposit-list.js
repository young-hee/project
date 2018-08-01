this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["deposit-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "	<li>\n		<div class=\"table_layout\">\n			<div class=\"info\">\n				<p class=\"date\"><span>일자</span><span class=\"num\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.depositHistOccurDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span></p>\n				<p class=\"order_num\"><span>주문번호</span><a href=\"/my/page/order/detail/"
    + alias3(alias4((depth0 != null ? depth0.ordNo : depth0), depth0))
    + "\">"
    + alias3(alias4((depth0 != null ? depth0.ordNo : depth0), depth0))
    + "</a></p>\n			</div>\n			<div class=\"price\">\n				<p>"
    + ((stack1 = (helpers.depositTypeName || (depth0 && depth0.depositTypeName) || alias2).call(alias1,(depth0 != null ? depth0.depositHistTypeCode : depth0),{"name":"depositTypeName","hash":{},"data":data})) != null ? stack1 : "")
    + "</p>\n				<p><span class=\"num\">"
    + ((stack1 = (helpers.depositSwitch || (depth0 && depth0.depositSwitch) || alias2).call(alias1,(depth0 != null ? depth0.deposit : depth0),"원",{"name":"depositSwitch","hash":{},"data":data})) != null ? stack1 : "")
    + "</span></p>\n			</div>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.depositHistories : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});