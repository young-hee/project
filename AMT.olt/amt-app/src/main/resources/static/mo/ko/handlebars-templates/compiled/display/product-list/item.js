this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["product-list"] = this["AP"]["handlebars"]["display"]["product-list"] || {};

this["AP"]["handlebars"]["display"]["product-list"]["item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<li class=\"item\" data-online-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"index","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "\">\n	<div class=\"product_new\">\n		<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias4).call(alias3,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n			<span class=\"product_visual_new\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "				<span class=\"lazy_load_wrap\">\n					<img src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "\" class=\"lazy_load\">\n				</span>\n			</span>\n			<span class=\"product_info_new\">\n				<strong class=\"prd_brand\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</strong>\n				<span class=\"prd_name\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n				<span class=\"price_wrap\">\n"
    + ((stack1 = helpers["with"].call(alias3,(helpers.calc || (depth0 && depth0.calc) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minMemberLevelDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minImmedDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(4, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "					<strong class=\"price\">"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "<em>원</em>"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</strong>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "				</span>\n\n				<span class=\"product_rating\">\n					<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "개</span></span>\n					<span class=\"prd_review\">리뷰 "
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.reviewCount : depth0),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "</span>\n				</span>\n\n				<span class=\"prd_color\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.colorGroups : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.colorGroup : depth0)) != null ? stack1.length : stack1),">",10,{"name":"xif","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "				</span>\n				<span class=\"tags\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftcardTargetYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "				</span>\n			</span>\n			<button type=\"button\" class=\"btn_toggle\"><i class=\"ico_heart_s\"></i><span class=\"sr_only\">좋아요</span></button>\n		</a>\n	</div>\n</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "					<span class=\"out_of_stock\"><span class=\"img_badge\">일시품절</span></span>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineMemberDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxImmedDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(5, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[0][0],">",0,{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams) {
    return "								<strong class=\"discount\">"
    + container.escapeExpression(container.lambda(blockParams[1][0], depth0))
    + "%</strong>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "~";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<del>"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minBeforeOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<span style=\"background:#"
    + alias2(alias1((depth0 != null ? depth0.colorGroupCode : depth0), depth0))
    + "\"><span class=\"sr_only\">"
    + alias2(alias1((depth0 != null ? depth0.colorGroupName : depth0), depth0))
    + "</span></span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"more\"></span>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "						<em class=\"badge special\">스페셜기프트</em>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "						<em class=\"badge gift\">기프트카드</em>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useDepths":true,"useBlockParams":true});