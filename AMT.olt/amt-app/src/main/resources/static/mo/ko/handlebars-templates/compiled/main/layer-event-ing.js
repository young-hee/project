this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["layer-event-ing"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "		<div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.planDisplayTypeCode : depth0),"==","Link",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "				<img src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,(depth0 != null ? depth0.bannerImgM1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\" />\n			</a>\n		</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<a href=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.linkNoticeUrl : depth0), depth0))
    + "\""
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.newWindowYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " >\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "target=\"_blank\"";
},"5":function(container,depth0,helpers,partials,data) {
    return "				<a href=\"/display/event_detail?planDisplaySn="
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<!-- 이벤트 배너 영역 -->\n<div class=\"m_evt_area\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.planDisplayList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<!-- // 이벤트 배너 영역 -->\n\n";
},"useData":true});