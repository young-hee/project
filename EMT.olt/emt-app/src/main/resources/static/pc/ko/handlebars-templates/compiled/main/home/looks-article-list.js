this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["looks-article-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "			<li class=\"ix-list-item\">\n				<a href=\""
    + alias1((helpers.articleDetailPath || (depth0 && depth0.articleDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleSn : depth0),{"name":"articleDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n					<img src=\"\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0.bannerImgP1 : depth0), depth0))
    + "\" alt=\"\" class=\"lazy_load\">\n					<span class=\"cont\">\n						<b class=\"eng\">"
    + alias1(alias2((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</b>\n						<span class=\"tag\"></span>\n					</span>\n				</a>\n			</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n<div class=\"ix-controller round_box\">\n	<div class=\"paging\"><b class=\"current\"></b> / <span class=\"total\"></span></div>\n	<div class=\"slide_direction\">\n		<a class=\"ix-btn-prev\" href=\"#none\"><span class=\"sr_only\">Prev</span></a>\n		<a class=\"ix-btn-next\" href=\"#none\"><span class=\"sr_only\">Next</span></a>\n	</div>\n</div>\n\n\n\n";
},"useData":true});