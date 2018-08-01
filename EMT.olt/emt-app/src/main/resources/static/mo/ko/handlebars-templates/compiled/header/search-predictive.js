this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["header"] = this["AP"]["handlebars"]["header"] || {};

this["AP"]["handlebars"]["header"]["search-predictive"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	<li>\n		<a href=\"#none\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</a>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.everything : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});