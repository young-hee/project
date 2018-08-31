this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["hot-deal-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression, alias4=helpers.helperMissing;

  return "		<li class=\"ix-list-item\">\n			<div class=\"item\">\n				<div class=\"item_images\">\n					<!--/* 대표 이미지 */-->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "					<div class=\"item_state\">\n						<span>\n							<span><i class=\"ico_hot\"></i><span class=\"sr_only\">핫딜</span></span>\n							<span class=\"ui_remain_timer\" data-sale-end-dt=\""
    + alias3(alias2((depth0 != null ? depth0.saleEndDt : depth0), depth0))
    + "\">\n								<span class=\"hour\">00</span>:<span class=\"minute\">00</span>:<span class=\"second\">00</span>\n							</span>\n						</span>\n					</div>\n				</div>\n				<div class=\"info_box\">\n					<!--/* 상품명 */-->\n					<div class=\"title_area\">\n						<h3 class=\"h_title\">"
    + alias3(alias2((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</h3>\n					</div>\n					\n					<!--/* 가격,장바구니 */-->\n					<div class=\"price_area clear\">\n						<div>\n							<div class=\"price\">\n								\n"
    + ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minMemberLevelDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(13, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "					\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "								<strong>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data,"blockParams":blockParams}))
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</em></strong>\n							</div>\n						</div>\n						<div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.orderedQty : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "						</div>\n					</div>\n				</div>\n			</div>\n		</li>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "										<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depths[2] != null ? depths[2].onlineProdSn : depths[2]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "											<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias3(alias4((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\""
    + alias3(alias4((depths[1] != null ? depths[1].onlineProdName : depths[1]), depth0))
    + "\">\n											</a>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "												<div class=\"item_state out_of_stock\">일시품절</div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "										<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depths[2] != null ? depths[2].onlineProdSn : depths[2]),(depths[1] != null ? depths[1].prodSn : depths[1]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias3(alias4((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\""
    + alias3(alias4((depths[1] != null ? depths[1].prodName : depths[1]), depth0))
    + "\"></a>\n";
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(14, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "										"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,blockParams[1][0],"!=",blockParams[0][0],{"name":"xif","hash":{},"fn":container.program(15, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,blockParams[0][0],"!=",0,{"name":"xif","hash":{},"fn":container.program(17, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "<span class=\"from\">~</span>";
},"17":function(container,depth0,helpers,partials,data,blockParams) {
    return "<span class=\"to\">"
    + container.escapeExpression(container.lambda(blockParams[1][0], depth0))
    + "<em>%</em></span>";
},"19":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "									<del>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minBeforeOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data}))
    + "</em></del>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return " ~";
},"23":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"sale_count\">"
    + container.escapeExpression((helpers.numberForamt || (depth0 && depth0.numberForamt) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.orderedQty : depth0),{"name":"numberForamt","hash":{},"data":data}))
    + "구매</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</ul>";
},"useData":true,"useDepths":true,"useBlockParams":true});