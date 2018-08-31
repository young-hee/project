this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["category"] = this["AP"]["handlebars"]["display"]["category"] || {};

this["AP"]["handlebars"]["display"]["category"]["recommend-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "	<li class=\"ix-list-item\">\n		<div class=\"product_box\">\n			<a href=\"#none\">\n				<div class=\"visual_section\"><!--unitw285-->\n					<img src=\"/pc/ko/images/dummy/img_product_thumb_guide_02.jpg\" alt=\"\">\n					<img src=\"/pc/ko/images/dummy/img_product_thumb_03.jpg\" alt=\"\">\n\n					<div class=\"benefit\">\n						<span class=\"special\">스페셜기프트</span>\n						<span class=\"gift\">기프트카드</span>\n					</div>\n					<div class=\"soldout\">\n						<span>일시품절</span>\n					</div>\n				</div>\n				<div class=\"info_section\">\n\n					<p class=\"txt_summary ellipsis line2\">[NEW] 베이비 선쿠션리미티드 SPF32 PA++ 베이비 선쿠션리미티드 SPF32 PA++ 베이비 선쿠션리미티드 SPF32 PA++ 베이비 선쿠션리미티드 SPF32 PA++ 베이비 선쿠션리미티드 SPF32 PA++ 베이비 선쿠션리미티드 SPF32 PA++</p>\n					<div class=\"price_atc\">\n						<span class=\"txt_sale\">30%</span>\n						<span class=\"txt_price\"><em>218,500</em>원</span>\n						<del class=\"txt_del\">230,000원</del>\n					</div>\n					<div class=\"user_atc\">\n						<span class=\"mark_star_sm star0\"><span class=\"sr_only\">구매 평점 별 5개 중 0개</span></span>\n						<span class=\"txt_review\">리뷰 2,454,000</span>\n					</div>\n				</div>\n			</a>\n			<div class=\"work_box\">\n				<ul class=\"item_user\">\n					<li>\n						<a href=\"#none\" role=\"button\" class=\"like\">\n							<i class=\"ico_favorite\"></i><!-- active : on -->\n							<span class=\"sr_only\">좋아요</span>\n						</a>\n					</li>\n					<li>\n						<a href=\"#none\" role=\"button\" class=\"cart\">\n							<i class=\"ico_basket\"></i>\n							<span class=\"sr_only\">장바구니</span>\n						</a>\n					</li>\n				</ul>\n			</div>\n			<div class=\"item_section\">\n				<div class=\"rside\">\n					<a href=\"#none\" class=\"link_brand\">헤라</a>\n				</div>\n			</div>\n		</div>\n	</li>\n	<!--\n	<li class=\"ix-list-item\">\n		<div class=\"product_box\">\n			<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n				<div class=\"visual_section\">\n					<img src=\""
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["1"] : stack1)) != null ? stack1.imgUrl : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n					<div class=\"benefit\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftcardTargetYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "					</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "				</div>\n				<div class=\"info_section\">\n					<p class=\"txt_summary ellipsis line2\">"
    + alias3(alias4((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n					<div class=\"price_atc\">\n"
    + ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minMemberLevelDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minImmedDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(12, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "						<span class=\"txt_price\"><em>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "</em>원"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "					</div>\n					<div class=\"user_atc\">\n						<span class=\"mark_star_sm star"
    + alias3(alias4((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias3(alias4((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "개</span></span>\n						<span class=\"txt_review\">리뷰 "
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(depth0 != null ? depth0.reviewCount : depth0),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "</span>\n					</div>\n				</div>\n			</a>\n			<div class=\"work_box\">\n				<ul class=\"item_user\">\n					<li>\n						<a href=\"#none\" role=\"button\" class=\"like\">\n							<i class=\"ico_favorite\"></i>\n							<span class=\"sr_only\">좋아요</span>\n						</a>\n					</li>\n					<li>\n						<a href=\"#none\" role=\"button\" class=\"cart\">\n							<i class=\"ico_basket\"></i>\n							<span class=\"sr_only\">장바구니</span>\n						</a>\n					</li>\n				</ul>\n			</div>\n			<div class=\"item_section\">\n				<div class=\"rside\">\n					<a href=\"#none\" class=\"link_brand\">헤라</a>\n				</div>\n			</div>\n		</div>\n	</li>\n	-->\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["1"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"special\">스페셜기프트</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"gift\">기프트카드</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"soldout\">\n							<span>일시품절</span>\n						</div>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.maxOnlineMemberDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxImmedDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(13, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[0][0],">",0,{"name":"xif","hash":{},"fn":container.program(14, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    return "									<span class=\"txt_sale\">"
    + container.escapeExpression(container.lambda(blockParams[1][0], depth0))
    + "%</span>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "~";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<del class=\"txt_del\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minBeforeOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n\n";
},"useData":true,"useDepths":true,"useBlockParams":true});