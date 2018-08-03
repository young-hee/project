this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["looks-article-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<li class=\"ix-list-item\">\n				<a href=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.linkUrl : stack1), depth0))
    + "\">\n					<span class=\"lazy_load_wrap\"><img src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\" class=\"lazy_load\"></span>\n					<span class=\"item_title\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["1"] : stack1)) != null ? stack1.text : stack1), depth0))
    + "</span>\n					<span class=\"tag\">"
    + alias2(alias1((depth0 != null ? depth0.snsHashTag : depth0), depth0))
    + "</span>\n				</a>\n			</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.contentsSets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});