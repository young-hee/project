this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["popular-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<li class=\"ix-list-item\" data-online-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\">\n			<!-- 상품 리스트 -->\n			<div class=\"product_box\">\n				<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias4).call(alias3,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n					<div class=\"visual_section\">\n						<img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" data-src=\"/mo/ko/images/dummy/img_item_01.jpg\" alt=\"\">\n						<div class=\"benefit\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftcardTargetYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "						</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "					</div>\n					<!-- 상품 정보 -->\n					<div class=\"info_section\">\n						<p class=\"txt_name\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</p>\n						<p class=\"txt_summary ellipsis line2\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n						<div class=\"price_atc\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "							<span class=\"txt_price\">"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "<em>"
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data,"blockParams":blockParams}))
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</em></span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "						</div>\n\n						<!-- 평점 리뷰 -->\n						<div class=\"user_atc\">\n							<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(((helper = (helper = helpers.reviewScopeAvg || (depth0 != null ? depth0.reviewScopeAvg : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"reviewScopeAvg","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "개</span></span>\n							<span class=\"txt_review\">리뷰 "
    + alias2(alias1((depth0 != null ? depth0.reviewCount : depth0), depth0))
    + "</span>\n						</div>\n					</div>\n				</a>\n				<div class=\"work_box\">\n					<ul class=\"item_user\">\n						<li>\n							<a href=\"#none\" role=\"button\">\n								<i class=\"ico_favorite\"></i><!-- active : on -->\n								<span class=\"sr_only "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.shoppingMarkExistYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\">좋아요</span>\n							</a>\n						</li>\n						<li>\n							<a href=\"#none\" role=\"button\">\n								<i class=\"ico_basket\"></i>\n								<span class=\"sr_only\">장바구니</span>\n							</a>\n						</li>\n					</ul>\n				</div>\n			</div>\n			<!-- // 상품 리스트 -->\n		</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"special\">스페셜기프트</span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"gift\">기프트카드</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"soldout\"><span>일시품절</span></div>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "								<span class=\"txt_sale\">\n"
    + ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minMemberLevelDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(10, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "								</span>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(11, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "											"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[1][0],"!=",blockParams[0][0],{"name":"xif","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "<span class=\"to\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "<em>%</em></span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "<span class=\"from\">~</span>";
},"14":function(container,depth0,helpers,partials,data) {
    return " ~";
},"16":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "								<del class=\"txt_del\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minBeforeOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data}))
    + "</em></del>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "on";
},"20":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"21":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<li class=\"ix-list-item\" data-online-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n				<!-- 상품 리스트 -->\n				<div class=\"product_box\">\n					<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias4).call(alias3,(depths[1] != null ? depths[1].onlineProdSn : depths[1]),(depths[1] != null ? depths[1].prodSn : depths[1]),{"name":"productDetailPath","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n						<!--  상품이미지  -->\n						<div class=\"visual_section\">\n							<span class=\"lazy_load_wrap\">\n								<img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depths[1] != null ? depths[1].onlineProdImages : depths[1])) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" data-src=\"/mo/ko/images/dummy/img_item_01.jpg\" alt=\"\" class=\"lazy_load\">\n							</span>\n							<div class=\"benefit\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depths[1] != null ? depths[1].onlineProdGift : depths[1])) != null ? stack1.giftcardTargetYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(25, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "							</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].saleDisplayStatus : depths[1]),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(27, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "						</div>\n	\n						<!-- 상품 정보 -->\n						<div class=\"info_section\">\n							<p class=\"txt_name\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</p>\n							<p class=\"txt_summary ellipsis line2\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n							<div class=\"price_atc\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(29, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "								<span class=\"txt_price\">"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "<em>"
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data,"blockParams":blockParams}))
    + "</em></span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "							</div>\n\n							<!-- 평점 리뷰 -->\n							<div class=\"user_atc\">\n								<span class=\"mark_star_sm star"
    + alias2(alias1((depths[1] != null ? depths[1].reviewScopeAvg : depths[1]), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(((helper = (helper = helpers.reviewScopeAvg || (depth0 != null ? depth0.reviewScopeAvg : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"reviewScopeAvg","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "개</span></span>\n								<span class=\"txt_review\">리뷰 "
    + alias2(alias1((depths[1] != null ? depths[1].reviewCount : depths[1]), depth0))
    + "</span>\n							</div>\n						</div>\n					</a>\n					<div class=\"work_box\">\n						<ul class=\"item_user\">\n							<li>\n								<a href=\"#none\" role=\"button\">\n									<i class=\"ico_favorite\"></i><!-- active : on -->\n									<span class=\"sr_only "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.shoppingMarkExistYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\">좋아요</span>\n								</a>\n							</li>\n							<li>\n								<a href=\"#none\" role=\"button\">\n									<i class=\"ico_basket\"></i>\n									<span class=\"sr_only\">장바구니</span>\n								</a>\n							</li>\n						</ul>\n					</div>\n				</div>\n				<!-- // 상품 리스트 -->\n			</li>\n";
},"23":function(container,depth0,helpers,partials,data) {
    return "									<span class=\"special\">스페셜기프트</span>\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "									<span class=\"gift\">기프트카드</span>\n";
},"27":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"soldout\"><span>일시품절</span></div>\n";
},"29":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "									<span class=\"txt_sale\">\n"
    + ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.minMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.minOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(30, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "									</span>\n";
},"30":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(31, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"31":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "												"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[1][0],"!=",blockParams[0][0],{"name":"xif","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "<span class=\"to\">"
    + container.escapeExpression(container.lambda(blockParams[0][0], depth0))
    + "<em>%</em></span>\n";
},"33":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "									<del class=\"txt_del\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.minBeforeOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data}))
    + "</em></del>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "\n<h2 class=\"title\"><b>Ap몰 인기상품</b></h2>\n<div class=\"list_product wide155 slide\" data-ix-options=\"view-length:3; move-length:3;loop:false;datum-point:-14px\">\n	<div class=\"ix-list-viewport\">\n		<ul class=\"ix-list-items\">\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodListUnitCode : depth0),"==","OnlineProd",{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n<!-- ==================================== 단위상품일때 ==================================== -->\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodListUnitCode : depth0),"==","Prod",{"name":"xif","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useDepths":true,"useBlockParams":true});