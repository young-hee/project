this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["etude-house-global"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<div class=\"page_btns\">\n		<a href=\""
    + container.escapeExpression(((helper = (helper = helpers.link || (depth0 != null ? depth0.link : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"link","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\" title=\"새창\" class=\"btn_lg_neutral\">Visit Site</a>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "<div>\n	<img alt=\""
    + alias1(container.lambda((depth0 != null ? depth0.national : depth0), depth0))
    + "\" src=\""
    + alias1((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias3).call(alias2,(depth0 != null ? depth0.imgSrc : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\">\n</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.link : depth0),"!=",undefined,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});