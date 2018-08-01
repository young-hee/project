this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["selected-filters-label"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.prodReviewType : depth0)) != null ? stack1.label : stack1), depth0))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.prodReviewType : depth0)) != null ? stack1.value : stack1),"!==","All",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewSort : depth0)) != null ? stack1.label : stack1), depth0))
    + "</span>\n<span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.scope : depth0)) != null ? stack1.label : stack1), depth0))
    + "</span>";
},"useData":true});