this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["magazine"] = this["AP"]["handlebars"]["display"]["magazine"] || {};

this["AP"]["handlebars"]["display"]["magazine"]["article-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "	<li>\n		<a href=\""
    + alias3((helpers.articleDetailPath || (depth0 && depth0.articleDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.articleSn : depth0),{"name":"articleDetailPath","hash":{},"data":data}))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.articleCateId : depth0),"aTrendOnAir",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.ne || (depth0 && depth0.ne) || alias2).call(alias1,(depth0 != null ? depth0.articleCateId : depth0),"aTrendOnAir",{"name":"ne","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<img src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,(depth0 != null ? depth0.bannerImgM1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n			</span>\n			<span class=\"info\">\n				<b class=\"title ellipsis\">"
    + alias3(alias4((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</b>\n				<span class=\"exp ellipsis\">"
    + alias3(alias4((depth0 != null ? depth0.lineDesc : depth0), depth0))
    + "</span>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.articleCateId : depth0),"aTrendOnAir",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<span class=\"comment\"><i class=\"ico_review\"></i> <b class=\"num\">"
    + alias3(alias4((depth0 != null ? depth0.articleRecommendCnt : depth0), depth0))
    + "</b></span>\n			</span>\n		</a>\n	</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "			<span class=\"thumb video\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "			<span class=\"thumb\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "					<small>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.writer : depth0), depth0))
    + "</small>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.articleList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n	\n\n\n";
},"useData":true});