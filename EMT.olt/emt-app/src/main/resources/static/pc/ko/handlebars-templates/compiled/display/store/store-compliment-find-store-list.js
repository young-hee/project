this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["store"] = this["AP"]["handlebars"]["display"]["store"] || {};

this["AP"]["handlebars"]["display"]["store"]["store-compliment-find-store-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<tr>\n		<td>\n			<a href=\"#none\" data-store-sn=\""
    + alias2(alias1((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</a>\n"
    + ((stack1 = helpers["if"].call(alias3,(helpers.findInObject || (depth0 && depth0.findInObject) || helpers.helperMissing).call(alias3,(depth0 != null ? depth0.storeEventExList : depth0),"foStoreEventCode","Color Finder",{"name":"findInObject","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</td>\n		<td class=\"align_left\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address1 : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address2 : stack1), depth0))
    + "</td>\n	</tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"my_color_finder_flag\">마이 컬러 파인더</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storeExList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});