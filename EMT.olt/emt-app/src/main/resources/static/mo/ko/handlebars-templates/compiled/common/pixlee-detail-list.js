this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["pixlee-detail-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<li class=\"ix-list-item\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.content_type : depth0),"==","video",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "		<dl class=\"instar_info\">\n			<dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.platform_link : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(9, data, 0),"data":data})) != null ? stack1 : "")
    + "			</dt>\n			<dd>\n				<p class=\"text\"><pre>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.photo_title : depth0), depth0))
    + "</pre></p>\n			</dd>\n		</dl>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "			<div class=\"instar_video\">\n				<video controls muted poster=\""
    + alias2(alias1((depth0 != null ? depth0.thumbnail_url : depth0), depth0))
    + "\" thumbnail=\""
    + alias2(alias1((depth0 != null ? depth0.thumbnail_url : depth0), depth0))
    + "\" preload=\"auto\">\n					<source src =\""
    + alias2(alias1((depth0 != null ? depth0.source_url : depth0), depth0))
    + "\" type=\"video/mp4\">\n				</video>\n			</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "			<div class=\"instar_img\">\n				<img src=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.pixlee_cdn_photos : depth0)) != null ? stack1.square_medium_url : stack1), depth0))
    + "\" alt=\""
    + alias1((helpers.decodeURIComponent || (depth0 && depth0.decodeURIComponent) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.alt_text : depth0),{"name":"decodeURIComponent","hash":{},"data":data}))
    + "\">\n			</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<a href=\""
    + alias2(alias1((depth0 != null ? depth0.platform_link : depth0), depth0))
    + "\" target=\"_blank\">"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.avatar_url : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + alias2(alias1((depth0 != null ? depth0.user_name : depth0), depth0))
    + "</a>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<span class=\"\">@</span>";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.avatar_url : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.user_name : depth0), depth0))
    + "\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});