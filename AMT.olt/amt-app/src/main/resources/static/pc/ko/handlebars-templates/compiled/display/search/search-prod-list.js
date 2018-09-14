this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["search"] = this["AP"]["handlebars"]["display"]["search"] || {};

this["AP"]["handlebars"]["display"]["search"]["search-prod-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<li class=\"item\" data-online-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n		<div class=\"product_box\">\n			<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias4).call(alias3,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n				<div class=\"visual_section\">\n					<img src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["1"] : stack1)) != null ? stack1.imgUrl : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "					<div class=\"benefit\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftcardTargetYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n				<div class=\"info_section\">\n					<p class=\"txt_name\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</p>\n					<p class=\"txt_summary ellipsis line2\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n					<div class=\"price_atc\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountRate : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						<span class=\"txt_price\"><em>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountOnlinePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</em>원"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\n					<div class=\"user_atc\">\n						<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "개</span></span>\n						<span class=\"txt_review\">리뷰 "
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.reviewCount : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</span>\n					</div>\n				</div>\n			</a>\n			<div class=\"work_box\">\n				<ul class=\"item_user\">\n					<li>\n						<a href=\"#none\" role=\"button\" class=\"like\">\n							<i class=\"ico_favorite "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.shoppingMarkExistYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></i>\n							<span class=\"sr_only\">좋아요</span>\n						</a>\n					</li>\n					<li>\n						<a href=\"#none\" role=\"button\" class=\"cart\">\n							<i class=\"ico_basket\"></i>\n							<span class=\"sr_only\">장바구니</span>\n						</a>\n					</li>\n				</ul>\n			</div>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].displayMenuId : depths[1]),"==","sale",{"name":"xif","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].displayMenuId : depths[1]),"==","onePlusOnePromo",{"name":"xif","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].displayMenuId : depths[1]),"==","specialGift",{"name":"xif","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].displayMenuId : depths[1]),"==","specialGift",{"name":"xif","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</li>\n";
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
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<span class=\"txt_sale\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountRate : stack1), depth0))
    + "%</span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "~";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<del class=\"txt_del\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountBeforeSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del>\n";
},"18":function(container,depth0,helpers,partials,data) {
    return "on";
},"20":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<div class=\"item_section\">\n					<div class=\"rside\">\n						<a href=\"javascript:;\" class=\"link_brand\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</a>\n					</div>\n				</div>\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"slide\" data-ix-options=\"view-length:3; move-length:3;loop:false;datum-point:-25px\">\n				<div class=\"ix-list-viewport\">\n					<ul class=\"ix-list-items\">\n						<li class=\"ix-list-item\">\n							<a href=\"#\"><img src=\"/pc/ko/images/dummy/img_product_thumb_06.jpg\" alt=\"\"></a>\n						</li>\n						<li class=\"ix-list-item\">\n							<a href=\"#\"><img src=\"/pc/ko/images/dummy/img_product_thumb_06.jpg\" alt=\"\"></a>\n						</li>\n						<li class=\"ix-list-item\">\n							<a href=\"#\"><img src=\"/pc/ko/images/dummy/img_product_thumb_06.jpg\" alt=\"\"></a>\n						</li>\n						<li class=\"ix-list-item\">\n							<a href=\"#\"><img src=\"/pc/ko/images/dummy/img_product_thumb_06.jpg\" alt=\"\"></a>\n						</li>\n					</ul>\n				</div>\n				<div class=\"ix-controller\">\n					<div class=\"slide_direction\">\n						<a class=\"ix-btn-prev\" href=\"#\"><span class=\"sr_only\">Prev</span></a>\n						<a class=\"ix-btn-next\" href=\"#\"><span class=\"sr_only\">Next</span></a>\n					</div>\n				</div>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});