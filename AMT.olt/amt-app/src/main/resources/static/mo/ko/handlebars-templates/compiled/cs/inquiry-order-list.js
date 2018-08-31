this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["inquiry-order-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<tr class=\"selected\">\n			<td class=\"align_left\">\n				<span class=\"check_wrap label_only\">\n					<input type=\"radio\" class=\"table_striped\" name=\"order\" id=\"o_"
    + alias2(alias1((depth0 != null ? depth0.ordSn : depth0), depth0))
    + "\">\n					<label for=\"o_"
    + alias2(alias1((depth0 != null ? depth0.ordSn : depth0), depth0))
    + "\">주문번호 : "
    + alias2(alias1((depth0 != null ? depth0.ordHistNo : depth0), depth0))
    + "<br> "
    + alias2(alias1((depth0 != null ? depth0.ordName : depth0), depth0))
    + " </label>\n				</span>\n			</td>\n			<td>"
    + alias2(alias1((depth0 != null ? depth0.ordStatusCode : depth0), depth0))
    + "</td>\n		</tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<tr>\n		<td colspan=\"2\">\n			<div class=\"section notice\">\n				<p class=\"text\">주문내역이 없습니다.</p>\n			</div>\n		</td>\n	</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});