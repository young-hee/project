this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["content-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<li class=\"clear\" data-article-sn=\""
    + alias2(alias1((depth0 != null ? depth0.articleSn : depth0), depth0))
    + "\">\n			<div>\n				<p class=\"text font_md\">"
    + alias2((helpers.ellipsis || (depth0 && depth0.ellipsis) || alias4).call(alias3,40,(depth0 != null ? depth0.articleTitle : depth0),{"name":"ellipsis","hash":{},"data":data}))
    + "</p>\n				<br>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.couponYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n			<div>\n				<img src=\""
    + alias2(alias1((depth0 != null ? depth0.bannerImgM : depth0), depth0))
    + "\" alt=\"\">\n			</div>\n		</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"flag\">쿠폰지급</span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});