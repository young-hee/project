this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["category"] = this["AP"]["handlebars"]["display"]["category"] || {};

this["AP"]["handlebars"]["display"]["category"]["category-menu-3"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",(depths[1] != null ? depths[1].selectedIndex : depths[1]),{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "			<ul>\n				<li><a href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId="
    + alias2(alias1((depths[1] != null ? depths[1].upperMenuId : depths[1]), depth0))
    + "\" class=\"depth on\">"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.prodCount : depth0), depth0))
    + ")</a></li>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.submenus : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(alias3,((stack1 = (depth0 != null ? depth0.submenus : depth0)) != null ? stack1.length : stack1),">",1,{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",(depths[1] != null ? depths[1].selectedIndex : depths[1]),{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li><a href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId="
    + alias2(alias1((depths[2] != null ? depths[2].upperMenuId : depths[2]), depth0))
    + "\" class=\"on\">"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.prodCount : depth0), depth0))
    + ")</a></li>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li style=\"display: none\"><a href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId="
    + alias2(alias1((depths[2] != null ? depths[2].upperMenuId : depths[2]), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + " ("
    + alias2(alias1((depth0 != null ? depth0.prodCount : depth0), depth0))
    + ")</a></li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "				<a href=\"#\" class=\"cate_more\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + " 전체보기</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<h2 class=\"h_title\"><a class=\"depth\" href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId="
    + alias2(alias1((depth0 != null ? depth0.upperMenuId : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + "</a></h2>\n<div class=\"category\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.submenus : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true,"useDepths":true});