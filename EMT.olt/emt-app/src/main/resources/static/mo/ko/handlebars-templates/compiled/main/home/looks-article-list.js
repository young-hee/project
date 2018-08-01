this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["looks-article-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "			<li class=\"ix-list-item\">\n				<a href=\""
    + alias3((helpers.articleDetailPath || (depth0 && depth0.articleDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.articleSn : depth0),{"name":"articleDetailPath","hash":{},"data":data}))
    + "\">\n					<span class=\"lazy_load_wrap\"><img src=\"\" data-src=\""
    + alias3(alias4((depth0 != null ? depth0.bannerImgM1 : depth0), depth0))
    + "\" alt=\"\" class=\"lazy_load\"></span>\n					<span class=\"item_title\">"
    + alias3(alias4((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</span>\n					<span class=\"tag\">"
    + alias3((helpers.toTagshape || (depth0 && depth0.toTagshape) || alias2).call(alias1,(depth0 != null ? depth0.snsHashTag : depth0),{"name":"toTagshape","hash":{},"data":data}))
    + "</span>\n				</a>\n			</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n\n\n";
},"useData":true});