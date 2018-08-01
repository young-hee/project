this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["order-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<tr>\n		  <td class=\"align_left\">\n			<span class=\"check_wrap label_only\">\n			  <input type=\"radio\" class=\"table_striped\" name=\"order\" id=\"o_"
    + alias2(alias1((depth0 != null ? depth0.ordSn : depth0), depth0))
    + "\" value=\""
    + alias2((helpers.json || (depth0 && depth0.json) || alias4).call(alias3,depth0,{"name":"json","hash":{},"data":data}))
    + "\">\n			  <label for=\"o_"
    + alias2(alias1((depth0 != null ? depth0.ordSn : depth0), depth0))
    + "\"> 주문번호 : <span> "
    + alias2(alias1((depth0 != null ? depth0.ordHistNo : depth0), depth0))
    + " </span><br>\n				<span id=\"ordName_"
    + alias2(alias1((depth0 != null ? depth0.ordSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.ordName : depth0), depth0))
    + " "
    + alias2((helpers.ordCntCheck || (depth0 && depth0.ordCntCheck) || alias4).call(alias3,(depth0 != null ? depth0.ordQty : depth0),{"name":"ordCntCheck","hash":{},"data":data}))
    + "</span>\n			  </label>\n			</span>\n		  </td>\n		  <td>"
    + alias2((helpers.ordStatusCheck || (depth0 && depth0.ordStatusCheck) || alias4).call(alias3,"online",(depth0 != null ? depth0.ordStatusCode : depth0),{"name":"ordStatusCheck","hash":{},"data":data}))
    + "</td>\n		</tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<tr>\n		<td colspan=\"2\" style=\"height:200px;\">\n			<p class=\"text\">주문 내역이 없습니다.</p>\n		</td>\n	</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.list : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});