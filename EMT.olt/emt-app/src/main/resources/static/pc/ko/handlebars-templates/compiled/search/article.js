this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["article"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",4,{"name":"calc","hash":{},"data":data}),"==",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<li>\n			<a href=\"#none\" style=\"background:#f0adb6;\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.videoOnlyYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "				<p class=\"text\">"
    + alias3(container.lambda((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</p>\n				<span class=\"ch_etude_date\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.startDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n			</a>\n		</li>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",4,{"name":"calc","hash":{},"data":data}),"==",3,{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "<li class=\"ix-list-item\">\n	<ul class=\"prd_in_img\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "				<img alt=\""
    + alias1(((helper = (helper = helpers.lineDesc || (depth0 != null ? depth0.lineDesc : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"lineDesc","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias1(container.lambda((depth0 != null ? depth0.videoImgDescM : depth0), depth0))
    + "\">\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.escapeExpression;

  return "				<img alt=\""
    + alias1(((helper = (helper = helpers.lineDesc || (depth0 != null ? depth0.lineDesc : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"lineDesc","hash":{},"data":data}) : helper)))
    + "\" src=\""
    + alias1(container.lambda((depth0 != null ? depth0.bannerImgM1 : depth0), depth0))
    + "\">\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "	</ul>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});