this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-life"] = this["AP"]["handlebars"]["display"]["beauty-life"] || {};

this["AP"]["handlebars"]["display"]["beauty-life"]["pixlee-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<li>\n	<a href=\"#none\">\n		<span class=\"round\">\n			<img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.pixlee_cdn_photos : depth0)) != null ? stack1.square_medium_url : stack1), depth0))
    + "\" alt=\""
    + alias2((helpers.decodeURIComponent || (depth0 && depth0.decodeURIComponent) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.alt_text : depth0),{"name":"decodeURIComponent","hash":{},"data":data}))
    + "\" />\n		</span>\n		<span>"
    + alias2(alias1((depth0 != null ? depth0.user_name : depth0), depth0))
    + "</span>\n	</a>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});