this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["product-list"] = this["AP"]["handlebars"]["display"]["product-list"] || {};

this["AP"]["handlebars"]["display"]["product-list"]["category-menu-2"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.submenus : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<li><a href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId="
    + alias2(alias1((depths[1] != null ? depths[1].upperMenuId : depths[1]), depth0))
    + "\" class=\"\">"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + "(<span class=\"count\">00</span>)</a></li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "	<li><a href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId="
    + alias2(alias1((depth0 != null ? depth0.upperMenuId : depth0), depth0))
    + "\" class=\"\">"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + "(<span class=\"count\">00</span>)</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<li><a href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId="
    + alias2(alias1((depth0 != null ? depth0.upperMenuId : depth0), depth0))
    + "\" class=\"on\">전체(<span class=\"count\">00</span>)</a></li>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.submenus : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});