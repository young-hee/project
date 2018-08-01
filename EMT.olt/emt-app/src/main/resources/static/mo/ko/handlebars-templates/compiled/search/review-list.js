this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["review-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<dl>\n			<dt>\n				<a href=\"javascript:;\" class=\"review_detail\" data-prod-review-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">\n				<span class=\"clear\">\n					<span class=\"ui_rating small\">\n						<span class=\"heart\">\n"
    + ((stack1 = (helpers["for"] || (depth0 && depth0["for"]) || alias4).call(alias3,5,{"name":"for","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</span>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.topReviewYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</span>\n					<span class=\"summary\">\n						<span>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span><span>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewRegistDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n					</span>\n				</span>\n				<span class=\"title\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.prodName : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<b>"
    + alias2(alias1((depth0 != null ? depth0.prodReviewTitle : depth0), depth0))
    + "</b>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewTypeCode : depth0),"==","Pur",{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</span>\n				</a>\n			</dt>\n			<dd>\n				<p class=\"text\">"
    + alias2((helpers.ellipsis || (depth0 && depth0.ellipsis) || alias4).call(alias3,40,(depth0 != null ? depth0.prodReviewBodyText : depth0),{"name":"ellipsis","hash":{},"data":data}))
    + "</p>\n			</dd>\n\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</dl>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "								<span class=\"heart_wrap "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].scope : depths[1]),">",(depth0 != null ? depth0["for-index"] : depth0),{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"><span class=\"sr_only\"> "
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0["for-index"] : depth0),"+",1,{"name":"calc","hash":{},"data":data}))
    + "점</span></span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "on";
},"6":function(container,depth0,helpers,partials,data) {
    return "							<strong class=\"review_best\">BEST</strong>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "						<small>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</small>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"badge\">구매</span>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=container.lambda;

  return "				<dd class=\"thumbnail\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</dd>\n\n				<dd class=\"item_shortcut\">\n					<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"btn_more\">\n						<span class=\"thumb\"><img src=\""
    + alias2(alias3(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\"></span> <span>"
    + alias2(alias3((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + " </span> <i class=\"ico_arr\"></i>\n					</a>\n				</dd>\n";
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"<",5,{"name":"xif","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "							<span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",4,{"name":"xif","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.program(17, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "							</span>\n";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "									<span>+ "
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? depths[1].imgList : depths[1])) != null ? stack1.length : stack1),"-",4,{"name":"calc","hash":{},"data":data}))
    + "</span>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "									<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\"\">\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text\">리뷰 내역이 존재하지 않습니다.</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(19, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});