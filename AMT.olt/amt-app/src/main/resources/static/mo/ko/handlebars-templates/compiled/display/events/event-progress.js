this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["event-progress"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<li>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.planDisplayTypeCode : depth0),"==","Link",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "		<div class=\"lazy_load_wrap\">\n		<img alt=\"\" data-src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,(depth0 != null ? depth0.bannerImgM1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" class=\"lazy_load\">\n		</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.closedRestDays : depth0),">","0",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</a>\n	<button type=\"button\" class=\"btn_toggle\"><i class=\"ico_heart_s on\"></i><span class=\"sr_only\">좋아요</span><span class=\"count\">10</span></button>\n</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<a href=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.linkNoticeUrl : depth0), depth0))
    + "\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.newWindowYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "target=\"_blank\"";
},"5":function(container,depth0,helpers,partials,data) {
    return "	<a href=\"/display/event_detail?planDisplaySn="
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "			<dl class=\"event_info\">\n				<dt class=\"event_title ellipsis\">"
    + alias1(container.lambda((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "</dt>\n				<dd><span class=\"date\"><p>"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,(depth0 != null ? depth0.startDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "~"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,(depth0 != null ? depth0.endDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</p></span></dd>\n			</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.planDisplayList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});