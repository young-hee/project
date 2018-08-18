this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["trend-on-air"] = this["AP"]["handlebars"]["display"]["trend-on-air"] || {};

this["AP"]["handlebars"]["display"]["trend-on-air"]["super_beauty_tip"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "	<li>\n		<a href=\""
    + alias3((helpers.articleDetailPath || (depth0 && depth0.articleDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.articleSn : depth0),{"name":"articleDetailPath","hash":{},"data":data}))
    + "\">\n			<span class=\"thumb video\">\n				<img src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,(depth0 != null ? depth0.bannerImgM1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n			</span>\n			<span class=\"info\">\n				<b class=\"title ellipsis\">"
    + alias3(alias4((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</b>\n				<span class=\"exp ellipsis\">"
    + alias3(alias4((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</span>\n				<small>"
    + alias3(alias4((depth0 != null ? depth0.writer : depth0), depth0))
    + "</small>\n				<span class=\"comment\"><i class=\"ico_review\"></i> <b class=\"num\">"
    + alias3(alias4((depth0 != null ? depth0.articleRecommendCnt : depth0), depth0))
    + "</b></span>\n			</span>\n		</a>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.articleList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n	\n\n\n";
},"useData":true});