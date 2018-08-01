this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["store"] = this["AP"]["handlebars"]["display"]["store"] || {};

this["AP"]["handlebars"]["display"]["store"]["store-compliment-find-store-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "	<a href=\"#none\" class=\"panel store "
    + ((stack1 = helpers["if"].call(alias1,(helpers.findInObject || (depth0 && depth0.findInObject) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.storeEventExList : depth0),"foStoreEventCode","Color Finder",{"name":"findInObject","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n		<span class=\"store_wrap\">\n			<span class=\"store_title\" data-store-sn=\""
    + alias3(alias2((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "\">"
    + alias3(alias2((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</span>\n		</span>\n		<span class=\"store_info\">\n			<span class=\"store_addr none_bdr\">\n				"
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address1 : stack1), depth0))
    + ", "
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address2 : stack1), depth0))
    + "\n			</span>\n		</span>\n	</a>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "color_find_service";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storeExList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});