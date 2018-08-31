this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["review-list-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "				<span class=\""
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].scope : depths[1]),">",(depth0 != null ? depth0["for-index"] : depth0),{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></span>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "on";
},"4":function(container,depth0,helpers,partials,data) {
    return "					<small class=\"opt\">옵션: "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</small>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "					<span class=\"flag\">구매자 후기</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"attach_photo reduce\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"<",7,{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"thumb\">\n									<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\"\" style=\"width:98px; height:98px;\">\n								</span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"attach_photo origin\" style=\"display:none;\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"thumb\">\n								<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\"  alt=\"\">\n							</span>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "					<a href=\"javascript:;\" class=\"review_detail off\" data-prod-review-sn=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">더보기 <i class=\"ico_arr_up\"></i></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "<dl class=\"review\">\n	<dt>\n		<span class=\"ui_rating\">\n"
    + ((stack1 = (helpers["for"] || (depth0 && depth0["for"]) || alias2).call(alias1,5,{"name":"for","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<span class=\"sr_only\"> "
    + alias4(alias3((depth0 != null ? depth0.scope : depth0), depth0))
    + "점</span>\n		</span>\n\n		<span class=\"user_id\">"
    + alias4(alias3((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span>\n		<small>"
    + alias4((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.prodReviewRegistDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n	</dt>\n	<dd>\n		<dl>\n			<dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prodName : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodReviewTypeCode : depth0),"==","Pur",{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n				<span class=\"title\">"
    + alias4(alias3((depth0 != null ? depth0.prodReviewTitle : depth0), depth0))
    + "</span>\n			</dt>\n			<dd>\n				<div class=\"text reduce\" id=\"bodyTextReduce"
    + ((stack1 = alias3((depth0 != null ? depth0.prodReviewSn : depth0), depth0)) != null ? stack1 : "")
    + "\">"
    + ((stack1 = alias3((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0)) != null ? stack1 : "")
    + "</div>\n				<div class=\"text origin\" style=\"display:none;\" id=\"bodyTextOrigin"
    + ((stack1 = alias3((depth0 != null ? depth0.prodReviewSn : depth0), depth0)) != null ? stack1 : "")
    + "\">"
    + ((stack1 = alias3((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0)) != null ? stack1 : "")
    + "</div>\n				\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isMoreView : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</dd>\n		</dl>\n	</dd>\n</dl>";
},"useData":true,"useDepths":true});