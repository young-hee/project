this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["event-over"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "	<li>\n		<div class=\"event_box\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.planDisplayTypeCode : depth0),"==","Link",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "				<img alt=\"\" src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,(depth0 != null ? depth0.bannerImgP1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\""
    + alias3(alias4((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "\">\n			</a>\n			<div class=\"info_section\">\n				<p class=\"name ellipsis\">"
    + alias3(alias4((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "</p>\n				<p class=\"date\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.eventStartDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "~"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.eventEndDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</p>\n				<div class=\"like_area\">\n					<i class=\"ico_like_xs\"><span class=\"sr_only\">좋아요</span></i><!--/* active : on */-->\n					<em>0</em>\n				</div>\n			</div>\n		</div>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<a href=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.linkNoticeUrl : depth0), depth0))
    + "\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.newWindowYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "target=\"_blank\"";
},"5":function(container,depth0,helpers,partials,data) {
    return "			<a href=\"/display/event_detail?planDisplaySn="
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.planDisplayList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});