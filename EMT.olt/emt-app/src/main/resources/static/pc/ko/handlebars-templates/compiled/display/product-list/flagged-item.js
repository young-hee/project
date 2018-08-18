this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["product-list"] = this["AP"]["handlebars"]["display"]["product-list"] || {};

this["AP"]["handlebars"]["display"]["product-list"]["flagged-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<li class=\"ix-list-item\">\n	<div class=\"item\">\n		<div class=\"item_images\">\n			<!--/* 대표 이미지 */-->\n				<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data,"blockParams":blockParams}))
    + "\" class=\"lazy_load_wrap first_img\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","OnlineProd",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","Prod",{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "			</a>\n		</div>\n		<div class=\"info_box\">\n			<!--/* flag */-->\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.flags : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "			<!--/* 상품명 */-->\n			<div class=\"title_area\">\n				<h3 class=\"h_title\">"
    + alias3(container.lambda((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</h3>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","Prod",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "			</div>\n			<!--/* color 옵션 */-->\n			<!-- 상품 옵션 영역 7개 이상 -->\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","OnlineProd",{"name":"xif","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "			<!--/* 가격,장바구니 */-->\n			<div class=\"price_area\">\n				<div>\n"
    + ((stack1 = helpers["with"].call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineSalePriceDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxMemberLevelDiscountRate : stack1),"+",((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxOnlineMemberDiscountRate : stack1),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"with","hash":{},"fn":container.program(25, data, 1, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "				</div>\n			</div>\n		</div>\n	</div>\n</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<img class=\"lazy_load\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "\">\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<div class=\"flag_set\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.flags : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_new",{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_best_w",{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_pr_prod",{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_md",{"name":"xif","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_online",{"name":"xif","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "		<span class=\"new\">신상품</span>			";
},"10":function(container,depth0,helpers,partials,data) {
    return "	<span class=\"best\">베스트</span>		";
},"12":function(container,depth0,helpers,partials,data) {
    return "		<span class=\"event\">이벤트</span>		";
},"14":function(container,depth0,helpers,partials,data) {
    return "		<span class=\"md\">MD추천</span>			";
},"16":function(container,depth0,helpers,partials,data) {
    return "	<span class=\"online\">온라인전용</span>	";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.productCount : depth0),">",1,{"name":"xif","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<div class=\"item_option\">\n							<p class=\"color_name\">"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "</p>\n						</div>\n";
},"21":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.productCount : depth0),{"name":"if","hash":{},"fn":container.program(22, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.productCount : depth0),">",1,{"name":"xif","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"item_option\">\n							<p class=\"color_name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.productCount : depth0), depth0))
    + " colors</p>\n						</div>\n";
},"25":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,blockParams[0][0],"!=",0,{"name":"xif","hash":{},"fn":container.program(26, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "					<div class=\"price\">\n						<strong>\n							"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].onlineProdPriceSummary : depths[1])) != null ? stack1.minOnlineMemberDiscountPrice : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "<em>원</em>\n						</strong>\n					</div>\n";
},"26":function(container,depth0,helpers,partials,data,blockParams) {
    return "					<div class=\"discount\">\n						<strong class=\"to\">\n							"
    + container.escapeExpression(container.lambda(blockParams[1][0], depth0))
    + "<em>%</em>\n						</strong>\n					</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useDepths":true,"useBlockParams":true});