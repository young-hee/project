this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["sweetshot"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"instar\" style=\"opacity: 0;\">\n	<blockquote class=\"instagram-media\" data-instgrm-captioned data-instgrm-version=\"7\">\n		<a href=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.link : depth0), depth0))
    + "\"></a>\n	</blockquote>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});