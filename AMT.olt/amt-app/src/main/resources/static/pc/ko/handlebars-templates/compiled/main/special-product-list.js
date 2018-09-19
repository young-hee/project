this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["special-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "				<li class=\"ix-list-item product_box\">\n					<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n						<div class=\"visual_section gradient\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							<img src=\"\" data-src=\""
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n						</div>\n						<ul class=\"special_gift_list\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1.length : stack1),">",3,{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "						</ul>\n						<div class=\"info_section\">\n							<p class=\"txt_summary ellipsis line2\">"
    + alias3(alias4((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n							<div class=\"price_atc\">\n								<span class=\"txt_price\"><em>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</em>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(depths[1] != null ? depths[1].isActivityPoint : depths[1]),"알","원",{"name":"condition","hash":{},"data":data}))
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),"!=",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePrice : stack1),{"name":"xif","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span>\n							</div>\n						</div>\n					</a>\n				</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"item_state out_of_stock\">일시품절</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "								<li><img data-src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.repImgUrl : stack1),{"name":"absolutePath","hash":{},"data":data}))
    + "\" src=\"\" alt=\""
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "\"><span>"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "</span></li>\n								<li><img data-src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.repImgUrl : stack1),{"name":"absolutePath","hash":{},"data":data}))
    + "\" src=\"\" alt=\""
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "\"><span>"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["1"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "</span></li>\n								<li><img data-src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.repImgUrl : stack1),{"name":"absolutePath","hash":{},"data":data}))
    + "\" src=\"\" alt=\""
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "\"><span>"
    + alias3(alias4(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1)) != null ? stack1["2"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "</span></li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.onlineProdGift : depth0)) != null ? stack1.giftProds : stack1),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "									<li><img data-src=\""
    + alias1((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.repImgUrl : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" src=\"\" alt=\""
    + alias1(alias2((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\"><span>"
    + alias1(alias2((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span></li>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return " ~";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<h2 class=\"title\"><b>스페셜기프트</b></h2>\n<div class=\"slide\" data-ix-options=\"view-length:2; move-length:1\">\n	<div class=\"ix-list-viewport list_product\">\n		<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<div class=\"ix-controller round_box\">\n		<div class=\"slide_direction\">\n			<a class=\"ix-btn-prev\" href=\"#none\"><span class=\"sr_only\">Prev</span></a>\n			<a class=\"ix-btn-next\" href=\"#none\"><span class=\"sr_only\">Next</span></a>\n		</div>\n	</div>\n</div>\n<a href=\"#none\" class=\"more\">더보기</a>";
},"useData":true,"useDepths":true});