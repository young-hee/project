this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["pixlee-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<li class=\"ix-list-item\">\n		<a href=\"#none\">\n			<span class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.content_type : depth0),"==","video",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "			</span>\n			<span class=\"user_id\">@"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.user_name : depth0), depth0))
    + "</span>\n		</a>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "					<img src=\"\" data-src=\""
    + alias1(container.lambda((depth0 != null ? depth0.medium_url : depth0), depth0))
    + "\" alt=\""
    + alias1((helpers.decodeURIComponent || (depth0 && depth0.decodeURIComponent) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.alt_text : depth0),{"name":"decodeURIComponent","hash":{},"data":data}))
    + "\" class=\"lazy_load\">\n					<div class=\"play_button\"></div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "					<img src=\"\" data-src=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.pixlee_cdn_photos : depth0)) != null ? stack1.square_medium_url : stack1), depth0))
    + "\" alt=\""
    + alias1((helpers.decodeURIComponent || (depth0 && depth0.decodeURIComponent) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.alt_text : depth0),{"name":"decodeURIComponent","hash":{},"data":data}))
    + "\" class=\"lazy_load\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});