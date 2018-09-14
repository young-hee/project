this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};

this["AP"]["handlebars"]["display"]["category-menu"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodCount : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<li>\n			<a href=\"javascript:;\" data-display-menu-id=\""
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "\">\n				<img src=\""
    + alias2(alias1((depth0 != null ? depth0.menuTitleImgUrl : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + "\">\n				<span class=\"b_name\">"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + "</span>\n			</a>\n		</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.menus : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});