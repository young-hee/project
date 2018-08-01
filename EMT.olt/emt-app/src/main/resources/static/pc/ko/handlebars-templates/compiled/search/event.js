this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["event"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",4,{"name":"calc","hash":{},"data":data}),"==",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<li>\n			<a href=\"#none\" style=\"background:#f0adb6;\">\n				<img alt=\""
    + alias4(((helper = (helper = helpers.planDisplayLineDesc || (depth0 != null ? depth0.planDisplayLineDesc : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"planDisplayLineDesc","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias4(((helper = (helper = helpers.bannerImgP1 || (depth0 != null ? depth0.bannerImgP1 : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"bannerImgP1","hash":{},"data":data}) : helper)))
    + "\">\n				<p class=\"text\">"
    + alias4(((helper = (helper = helpers.planDisplayTitle || (depth0 != null ? depth0.planDisplayTitle : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"planDisplayTitle","hash":{},"data":data}) : helper)))
    + "</p>\n				<span class=\"ch_etude_date\">"
    + alias4((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.eventStartDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + " - "
    + alias4((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.eventEndDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n			</a>\n		</li>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",4,{"name":"calc","hash":{},"data":data}),"==",3,{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "<li class=\"ix-list-item\">\n	<ul class=\"prd_in_img\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	</ul>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});