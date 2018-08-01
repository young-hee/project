this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["compare-makeup-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<li data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n	<div class=\"comp_item\">\n		<div class=\"thumb\"><img alt=\""
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\" src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["1"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\"></div>\n		<div class=\"prd_name\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</div>\n	</div>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});