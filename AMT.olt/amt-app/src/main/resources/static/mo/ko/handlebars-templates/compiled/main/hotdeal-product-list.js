this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["hotdeal-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "				<li class=\"ix-list-item\">\n					<div class=\"product_one_view\">\n						<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n							<p class=\"today_other\">\n"
    + ((stack1 = helpers["with"].call(alias1,(depth0 != null ? depth0.remainCnt : depth0),{"name":"with","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "							개 남음</p>\n							<span class=\"product_visual_new\">\n								<span class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "									<img src=\"\" data-src=\""
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\" class=\"lazy_load\">\n								</span>\n							</span>\n							<!-- 상품 정보 -->\n							<span class=\"product_info_new\">\n								<strong class=\"prd_brand\">"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</strong>\n								<span class=\"prd_name\">"
    + alias3(alias4((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n								<span class=\"price_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "									<strong class=\"price\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data,"blockParams":blockParams}))
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</em></strong>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "								</span>\n	\n								<button type=\"button\" class=\"btn_toggle like_btn\"><i class=\"ico_heart_s "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.shoppingMarkExistYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\"></i><span class=\"sr_only\">좋아요</span></button>\n							</span>\n						</a>\n					</div>\n				</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression;

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								"
    + alias2(((helper = (helper = helpers.ramainCnt || (depth0 != null ? depth0.ramainCnt : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"ramainCnt","hash":{},"data":data}) : helper)))
    + "\n							"
    + alias2(container.lambda((depth0 != null ? depth0.salePossibleQty : depth0), depth0))
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "									"
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.remainCnt : depth0),"+",(depth0 != null ? depth0.salePossibleQty : depth0),{"name":"calc","hash":{},"data":data}))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "										<div class=\"item_state out_of_stock\">일시품절</div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "										<strong class=\"discount\">\n"
    + ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minMemberLevelDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(8, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "										</strong>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(9, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "													"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[1][0],"!=",blockParams[0][0],{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "<span class=\"to\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "<em>%</em></span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "<span class=\"from\">~</span>";
},"12":function(container,depth0,helpers,partials,data) {
    return " ~";
},"14":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "										<del>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minBeforeOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data}))
    + "</em></del>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "on";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n<dt class=\"slide_title\">\n	<a href=\"#none\" class=\"prd_h_tit\"><strong>투데이핫딜</strong>\n		<div class=\"m_time_wrap\">\n			<span class=\"ui_remain_timer hotdeal_timer\" data-sale-end-dt=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.saleEndDt : depth0), depth0))
    + "\">\n				<span class=\"hour\">23</span>:<span class=\"minute\">23</span>:<span class=\"second\">23</span>\n			</span>\n		</div>\n	</a>\n</dt>\n<dd class=\"slide one_half\" data-ix-options=\"view-length:2; move-length:1; datum-point:10%;\">\n	<div class=\"ix-list-viewport\">\n		<ul class=\"product_list_new prd_swipe_one ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n</dd>";
},"useData":true,"useDepths":true,"useBlockParams":true});