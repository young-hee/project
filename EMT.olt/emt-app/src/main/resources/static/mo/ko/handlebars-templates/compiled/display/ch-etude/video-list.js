this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["ch-etude"] = this["AP"]["handlebars"]["display"]["ch-etude"] || {};

this["AP"]["handlebars"]["display"]["ch-etude"]["video-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "		<li>\n			<a href=\""
    + alias1((helpers.articleDetailPath || (depth0 && depth0.articleDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleSn : depth0),{"name":"articleDetailPath","hash":{},"data":data}))
    + "\" >\n				<span class=\"img lazy_load_wrap\">\n					<img class=\"lazy_load\" src=\""
    + alias1(alias2((depth0 != null ? depth0.bannerImgM1 : depth0), depth0))
    + "\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0.bannerImgM1 : depth0), depth0))
    + "\" alt=\"\" ></span>\n				<span class=\"info\">\n					<span class=\"subj\">"
    + alias1(alias2((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</span>\n				</span>\n			</a>\n		</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text color_gray\">결과가 없습니다.</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.articleList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});