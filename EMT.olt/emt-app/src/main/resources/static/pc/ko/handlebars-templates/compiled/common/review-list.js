this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["review-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<li class=\"ix-list-item\">\n				"
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"common.review-list-item",depth0,{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n			</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.totalCount : depth0),">",(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0.limit : depth0),{"name":"calc","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			"
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"common.review-list-item",depth0,{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"panel notice\">\n			<i class=\"ico\"></i>\n			<p class=\"text font_lg\">리뷰 내역이 존재하지 않습니다.</p>\n		</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"pagination\">\n		</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.topReviewOnlyYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});