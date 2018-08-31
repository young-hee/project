this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["option-slide-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<li class=\"ix-list-item\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.videoYn : depth0),"==","N",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<span class=\"award\">\n					<img class=\"lazy_load\" data-src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,"/images/product/img_award.png",{"name":"absolutePath","hash":{},"data":data}))
    + "\" src=\"\" alt=\"어워드명\">\n				</span>\n			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				<img class=\"lazy_load\" data-src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" src=\"\" alt=\"\" data-width=\"540\" data-height=\"540\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<li class=\"ix-list-item preview_thumbs "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n				<a href=\"#none\">\n					<img class=\"lazy_load\" data-src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\"  src=\"\" alt=\"\">\n				</a>\n			</li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "active";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"slide\" data-ix-options=\"view-length:1; loop:false;\">\n	<div class=\"ix-list-viewport\">\n		<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n</div>\n<div class=\"slide thumb\" data-ix-options=\"view-length:3; move-length:1; loop:false;\">\n	<div class=\"ix-list-viewport\">\n		<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<div class=\"ix-controller\">\n		<div class=\"slide_direction\">\n			<a class=\"ix-btn-prev\" href=\"#\"><span class=\"sr_only\">이전</span></a>\n			<a class=\"ix-btn-next\" href=\"#\"><span class=\"sr_only\">다음</span></a>\n		</div>\n	</div>\n</div>";
},"useData":true});