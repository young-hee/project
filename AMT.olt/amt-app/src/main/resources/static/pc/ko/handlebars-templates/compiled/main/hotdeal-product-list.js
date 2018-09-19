this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["hotdeal-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "				<li class=\"ix-list-item\">\n					<div class=\"product_box\">\n						<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n							<div class=\"visual_section\">\n								<img src=\""
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" data-src=\"/mo/ko/images/dummy/img_item_01.jpg\" alt=\"\">\n								<div class=\"benefit\">\n									<span class=\"special\">스페셜기프트</span>\n									<span class=\"gift\">기프트카드</span>\n								</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "							</div>\n							<!-- 상품 정보 -->\n							<div class=\"info_section\">\n								<p class=\"txt_name\">"
    + alias3(alias4((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n								<div class=\"price_atc\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "									<span class=\"txt_price\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data,"blockParams":blockParams}))
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</em></span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "								</div>\n		\n								<!-- 평점 리뷰 -->\n								<div class=\"user_atc\">\n									<span class=\"mark_star_sm star"
    + alias3(alias4((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias3(((helper = (helper = helpers.reviewScopeAvg || (depth0 != null ? depth0.reviewScopeAvg : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"reviewScopeAvg","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "개</span></span>\n									<span class=\"txt_review\">리뷰 "
    + alias3(alias4((depth0 != null ? depth0.reviewCount : depth0), depth0))
    + "</span>\n								</div>\n							</div>\n						</a>\n						<div class=\"work_box\">\n							<ul class=\"item_user\">\n								<li>\n									<a href=\"#none\" role=\"button\">\n										<i class=\"ico_favorite\"></i><!-- active : on -->\n										<span class=\"sr_only\">좋아요</span>\n									</a>\n								</li>\n								<li>\n									<a href=\"#none\" role=\"button\">\n										<i class=\"ico_basket\"></i>\n										<span class=\"sr_only\">장바구니</span>\n									</a>\n								</li>\n							</ul>\n						</div>\n						<div class=\"item_section\">\n							<div class=\"rside\">\n								<a href=\"#none\" class=\"link_brand\">"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</a>\n							</div>\n						</div>\n					</div>\n				</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "									<div class=\"soldout\"><span>일시품절</span></div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "										<span class=\"txt_sale\">\n"
    + ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minMemberLevelDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(5, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "										</span>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(6, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "													"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[1][0],"!=",blockParams[0][0],{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "<span class=\"to\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "<em>%</em></span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<span class=\"from\">~</span>";
},"9":function(container,depth0,helpers,partials,data) {
    return " ~";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "										<del class=\"txt_del\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minBeforeOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data}))
    + "</em></del>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<h2 class=\"title\"><b>투데이 핫딜</b>\n	<span class=\"ui_remain_timer\">\n		<b class=\"hour\">00</b>:<b class=\"minute\">00</b>:<b class=\"second\">00</b>\n	</span>\n</h2>\n<div class=\"recommended_item slide\" data-ix-options=\"view-length:4; move-length:4;loop:false;datum-point:-20px\">\n	<div class=\"ix-list-viewport unit_1\">\n		<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<div class=\"ix-controller\">\n		<div class=\"slide_direction\">\n			<!-- \"ix-btn-prev\", \"ix-btn-next\" 는 \"ix-controller\" 안에 존재해야 한다.-->\n			<a class=\"ix-btn-prev\" href=\"#\"><span class=\"sr_only\">Prev</span></a>\n			<a class=\"ix-btn-next\" href=\"#\"><span class=\"sr_only\">Next</span></a>\n		</div>\n	</div>\n</div>\n<a href=\"#none\" class=\"more\">더보기</a>";
},"useData":true,"useDepths":true,"useBlockParams":true});