this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["store"] = this["AP"]["handlebars"]["display"]["store"] || {};

this["AP"]["handlebars"]["display"]["store"]["store-compliment-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<dl class=\"review\">\n	<dt>\n		<span class=\"user_id\">"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span>\n		<small>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.createdDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n	</dt>\n	<dd>\n		<dl>\n			<dt>\n				<small class=\"opt\">"
    + alias2(alias1((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</small>\n				"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.topStoreEvalYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n				<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.storeEvalTitle : depth0), depth0))
    + "</span>\n				<span class=\"flag2\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.storeEvalReason : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</span>\n			</dt>\n			<dd>\n				<p class=\"text\" id=\"bodyText"
    + alias2(alias1((depth0 != null ? depth0.storeEvalSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.storeEvalBodyText : depth0), depth0))
    + "</p>\n				<div class=\"attach_photo\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.storeEvalImgUrlList : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n				<a href=\"#none\" data-store-eval-sn=\""
    + alias2(alias1((depth0 != null ? depth0.storeEvalSn : depth0), depth0))
    + "\">+ 더보기</a>\n			</dd>\n		</dl>\n	</dd>\n</dl>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "<span class=\"flag\">BEST</span>";
},"4":function(container,depth0,helpers,partials,data) {
    return "						<span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"<",(depths[1] != null ? depths[1].imageViewLength : depths[1]),{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"thumb\"><img alt=\"\" src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\"></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storeEvalExList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});