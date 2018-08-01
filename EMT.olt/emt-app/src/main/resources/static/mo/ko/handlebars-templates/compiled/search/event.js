this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["event"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<li>\n			<a href=\"#none\">\n				<div class=\"lazy_load_wrap\">\n					<img alt=\""
    + alias2(alias1((depth0 != null ? depth0.planDisplayLineDesc : depth0), depth0))
    + "\" src=\""
    + alias2(alias1((depth0 != null ? depth0.bannerImgM : depth0), depth0))
    + "\" class=\"lazy_load\" data-src=\"/mo/ko/images/dummy/img_dummy_event.jpg\"/>\n				</div>\n				<p class=\"text\">	\n					<b class=\"font_md\">"
    + alias2(alias1((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "</b><small>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.startDt : stack1),{"name":"dateFormat","hash":{},"data":data}))
    + "-"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.event : depth0)) != null ? stack1.EndDt : stack1),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n				</p>\n			</a>\n		</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});