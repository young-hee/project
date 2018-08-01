this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["ch-etude"] = this["AP"]["handlebars"]["display"]["ch-etude"] || {};

this["AP"]["handlebars"]["display"]["ch-etude"]["video-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<li>\n			<a href=\""
    + alias3((helpers.articleDetailPath || (depth0 && depth0.articleDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.articleSn : depth0),{"name":"articleDetailPath","hash":{},"data":data}))
    + "\" class=\"ch_etude_item\">\n				<span class=\"img_ch_etude\">\n					<img src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,(depth0 != null ? depth0.bannerImgP1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n				</span>\n				<span class=\"info_box\">\n					<span class=\"title_area\">\n						<span class=\"ch_etude_item_title\">"
    + alias3(container.lambda((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</span>\n					</span>\n					<span class=\"ch_etude_date\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.startDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n				</span>\n			</a>\n		</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text color_gray\">결과가 없습니다.</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.articleList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});