this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["brand-menu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "	<li>\n		<a href=\""
    + alias2(alias1((depth0 != null ? depth0.clickUrl : depth0), depth0))
    + "\" data-brand-sn=\""
    + alias2(alias1((depth0 != null ? depth0.brandSn : depth0), depth0))
    + "\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.brandName : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "		</a>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.brandName : depth0), depth0))
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "				"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.brandMenus : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});