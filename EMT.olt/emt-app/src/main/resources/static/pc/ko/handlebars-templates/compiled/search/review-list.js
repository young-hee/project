this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["review-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "		<dl class=\"review\">\n			<dt>\n				<span class=\"ui_rating\">\n"
    + ((stack1 = (helpers["for"] || (depth0 && depth0["for"]) || alias2).call(alias1,5,{"name":"for","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<span class=\"sr_only\"> "
    + alias4(alias3((depth0 != null ? depth0.scope : depth0), depth0))
    + "점</span>\n				</span>\n\n				<span class=\"user_id\">"
    + alias4(alias3((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span>\n				<small>"
    + alias4((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.prodReviewRegistDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n			</dt>\n			<dd>\n				<dl>\n					<dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prodName : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodReviewTypeCode : depth0),"==","Pur",{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						<span class=\"title\">"
    + alias4(alias3((depth0 != null ? depth0.prodReviewTitle : depth0), depth0))
    + "</span>\n					</dt>\n					<dd>\n						<p class=\"text\">"
    + alias4((helpers.ellipsis || (depth0 && depth0.ellipsis) || alias2).call(alias1,140,(depth0 != null ? depth0.prodReviewBodyText : depth0),{"name":"ellipsis","hash":{},"data":data}))
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						<a href=\"javascript:;\" class=\"review_detail\" data-prod-review-sn=\""
    + alias4(alias3((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">+ 더보기</a>\n					</dd>\n				</dl>\n			</dd>\n		</dl>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "						<span class=\""
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].scope : depths[1]),">",(depth0 != null ? depth0["for-index"] : depth0),{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "on";
},"6":function(container,depth0,helpers,partials,data) {
    return "							<small class=\"opt\">옵션: "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</small>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"flag\">구매자 후기</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<div class=\"attach_photo\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"<",7,{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    return "										<span class=\"thumb\">\n											<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\"\">\n										</span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text font_lg\">리뷰 내역이 존재하지 않습니다.</p>\n	</div>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"pagination\">\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.totalCount : depth0),">",(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0.limit : depth0),{"name":"calc","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});