this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["event-other-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.planDisplaySn : depth0),"!=",(depth0 != null ? depth0.planDisplaySn : depth0),{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "	<li>\n		<a href=\"/display/event_detail?planDisplaySn="
    + alias1(container.lambda((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\">\n			<img src=\""
    + alias1((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.bannerImgM1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n		</a>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.planDisplayList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});