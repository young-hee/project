this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["paging"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.current : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "        <span class=\"current\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.page : depth0), depth0))
    + "</span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <a href=\"javascript:;\" data-page=\""
    + alias2(alias1((depth0 != null ? depth0.page : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.page : depth0), depth0))
    + "</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<a href=\"javascript:;\" class=\"navi first\" data-page=\""
    + alias2(alias1((depth0 != null ? depth0.firstPage : depth0), depth0))
    + "\">first page</a>\n<a href=\"javascript:;\" class=\"navi prev\" data-page=\""
    + alias2(alias1((depth0 != null ? depth0.prevPage : depth0), depth0))
    + "\">prev page</a>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n<a href=\"javascript:;\" class=\"navi next\" data-page=\""
    + alias2(alias1((depth0 != null ? depth0.nextPage : depth0), depth0))
    + "\">next page</a>\n<a href=\"javascript:;\" class=\"navi last\" data-page=\""
    + alias2(alias1((depth0 != null ? depth0.lastPage : depth0), depth0))
    + "\">last page</a>";
},"useData":true});