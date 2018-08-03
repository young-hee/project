this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};
this["AP"]["handlebars"]["cart"]["takeout"] = this["AP"]["handlebars"]["cart"]["takeout"] || {};

this["AP"]["handlebars"]["cart"]["takeout"]["activity-point-prod"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.cartProdExList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing, alias5="function";

  return "		<div class=\"item_wrap\">\n			<div class=\"item_info\">\n				<input type=\"hidden\" name=\"takeoutActivityPrdSn\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + "\"/>\n				<input type=\"hidden\" name=\"cartProdSn\" value=\""
    + alias2(((helper = (helper = helpers.cartProdSn || (depth0 != null ? depth0.cartProdSn : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"cartProdSn","hash":{},"data":data}) : helper)))
    + "\"/>\n				<input type=\"hidden\" name=\"takeoutPrdInfo_"
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdSn : depths[1]), depth0))
    + "\" value=\""
    + alias2(((helper = (helper = helpers.cartProdSn || (depth0 != null ? depth0.cartProdSn : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"cartProdSn","hash":{},"data":data}) : helper)))
    + "\"/>\n				<input type=\"hidden\" name=\"saleDisplayStatus_"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + "\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.saleDisplayStatus : stack1), depth0))
    + "\"/>\n\n				<!--/* 상품 선택 */-->\n				<div class=\"item_thumb\">\n					<div class=\"check_wrap\">\n						<input type=\"checkbox\" name=\"takeoutChkBox\" id=\"takeoutChkBox"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + "\" pointExch=\"membership\" point=\""
    + alias2(((helper = (helper = helpers.exchPoint || (depth0 != null ? depth0.exchPoint : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"exchPoint","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdSn : depths[1]), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,(depths[1] != null ? depths[1].saleDisplayStatus : depths[1]),"OnSale",{"name":"ne","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  "
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.and || (depth0 && depth0.and) || alias4).call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depths[1] != null ? depths[1].saleDisplayStatus : depths[1]),"OnSale",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depths[1] != null ? depths[1].selectYn : depths[1]),"Y",{"name":"eq","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),"checked","",{"name":"condition","hash":{},"data":data}))
    + ">\n						<label for=\"takeoutChkBox"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + "\">\n							"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.repProdImgEx : stack1),"!=",null,{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.repProdImgEx : stack1),"==",null,{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							<span class=\"sr_only\">"
    + ((stack1 = helpers["if"].call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,(depths[1] != null ? depths[1].onlineProdName : depths[1]),null,{"name":"ne","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</span>\n						</label>\n					</div>\n				</div>\n				<div class=\"item_name\">\n					<a href=\"#none\" class=\"title\" onclick=\"fnProdDetail("
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + ")\">"
    + ((stack1 = helpers["if"].call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,(depths[1] != null ? depths[1].onlineProdName : depths[1]),null,{"name":"ne","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.program(14, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</a>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdFlagExList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n				<!--/* 상품 수량 */-->\n				<div class=\"count\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.maxPurLimitYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(29, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.maxPurLimitYn : stack1),"==","N",{"name":"xif","hash":{},"fn":container.program(31, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n				<!--/* 포인트 및 가격 */-->\n				<div class=\"price\">\n					<span class=\"strong\"><b>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.exchPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</b>알</span>\n				</div>\n				<!--/* 구매/삭제 버튼 */-->\n				<div class=\"btns\">\n					<button type=\"button\" class=\"btn_sm_bordered\" onclick=\"removeCartProd('"
    + alias2(alias1((depths[2] != null ? depths[2].cartSn : depths[2]), depth0))
    + "', '"
    + alias2(((helper = (helper = helpers.cartProdSn || (depth0 != null ? depth0.cartProdSn : depth0)) != null ? helper : alias4),(typeof helper === alias5 ? helper.call(alias3,{"name":"cartProdSn","hash":{},"data":data}) : helper)))
    + "')\">삭제</button>\n				</div>\n			</div>\n		</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.cartProdAwardList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(33, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.repProdImgEx : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\"> ";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].repOnlineProdImgEx : depths[1]),"!=",null,{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].repOnlineProdImgEx : depths[1]),"==",null,{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "									<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? depths[1].repOnlineProdImgEx : depths[1])) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "									<img src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"/images/cart/no_img.png.gif",{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return " "
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].onlineProdName : depths[1]), depth0))
    + " ";
},"14":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodName : stack1), depth0))
    + " ";
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdFlagExList : depth0),{"name":"each","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers["switch"] || (depth0 && depth0["switch"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodFlagCode : depth0),{"name":"switch","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "								"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"icon_reco_new",{"name":"case","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n								"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"icon_reco_best_w",{"name":"case","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n								"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"icon_pr_prod",{"name":"case","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n								"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"icon_reco_md",{"name":"case","hash":{},"fn":container.program(25, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n								"
    + ((stack1 = (helpers["case"] || (depth0 && depth0["case"]) || alias2).call(alias1,"icon_reco_online",{"name":"case","hash":{},"fn":container.program(27, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"19":function(container,depth0,helpers,partials,data) {
    return " <span class=\"flag\">신상품</span> ";
},"21":function(container,depth0,helpers,partials,data) {
    return " <span class=\"flag\">베스트</span> ";
},"23":function(container,depth0,helpers,partials,data) {
    return " <span class=\"flag\">이벤트</span> ";
},"25":function(container,depth0,helpers,partials,data) {
    return " <span class=\"flag\">MD추천</span> ";
},"27":function(container,depth0,helpers,partials,data) {
    return " <span class=\"flag\">온라인전용</span> ";
},"29":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "						<span data-min=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.minPurLimitQty : stack1), depth0))
    + "\" data-max=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.maxPurLimitQty : stack1), depth0))
    + "\" class=\"ui_spinner\" data-step=\"1\" data-disabled=\"false\">\n							<button class=\"spinner_decrease\" type=\"button\" title=\"제품 수량 감소\" onclick=\"prodQtyOperate(this, "
    + alias2(alias1((depths[2] != null ? depths[2].cartSn : depths[2]), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.cartProdSn : depth0), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + ", '"
    + alias2(alias1((depth0 != null ? depth0.integrationMembershipExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.activityPointExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storePickupYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "', '-')\"><img alt=\"제품 수량 감소\" src=\""
    + alias2((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias4).call(alias3,"/images/common/ico_minus1.gif",{"name":"absolutePath","hash":{},"data":data}))
    + "\"></button>\n							<input class=\"spinner_input\" type=\"text\" name=\"cartProdQty\" value=\""
    + alias2(((helper = (helper = helpers.cartProdQty || (depth0 != null ? depth0.cartProdQty : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"cartProdQty","hash":{},"data":data}) : helper)))
    + "\">\n							<button class=\"spinner_increase\" type=\"button\" title=\"제품 수량 증가\" onclick=\"prodQtyOperate(this, "
    + alias2(alias1((depths[2] != null ? depths[2].cartSn : depths[2]), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.cartProdSn : depth0), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + ", '"
    + alias2(alias1((depth0 != null ? depth0.integrationMembershipExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.activityPointExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storePickupYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "', '+')\"><img alt=\"제품 수량 증가\" src=\""
    + alias2((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias4).call(alias3,"/images/common/icon_plus1.gif",{"name":"absolutePath","hash":{},"data":data}))
    + "\"></button>\n						</span>\n";
},"31":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "						<span data-min=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.minPurLimitQty : stack1), depth0))
    + "\" class=\"ui_spinner\" data-step=\"1\" data-disabled=\"false\">\n							<button class=\"spinner_decrease\" type=\"button\" title=\"제품 수량 감소\" onclick=\"prodQtyOperate(this, "
    + alias2(alias1((depths[2] != null ? depths[2].cartSn : depths[2]), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.cartProdSn : depth0), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + ", '"
    + alias2(alias1((depth0 != null ? depth0.integrationMembershipExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.activityPointExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storePickupYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "', '-')\"><img alt=\"제품 수량 감소\" src=\""
    + alias2((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias4).call(alias3,"/images/common/ico_minus1.gif",{"name":"absolutePath","hash":{},"data":data}))
    + "\"></button>\n							<input class=\"spinner_input\" type=\"text\" name=\"cartProdQty\" value=\""
    + alias2(((helper = (helper = helpers.cartProdQty || (depth0 != null ? depth0.cartProdQty : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"cartProdQty","hash":{},"data":data}) : helper)))
    + "\">\n							<button class=\"spinner_increase\" type=\"button\" title=\"제품 수량 증가\" onclick=\"prodQtyOperate(this, "
    + alias2(alias1((depths[2] != null ? depths[2].cartSn : depths[2]), depth0))
    + ", "
    + alias2(alias1((depth0 != null ? depth0.cartProdSn : depth0), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodEx : depth0)) != null ? stack1.prodSn : stack1), depth0))
    + ", '"
    + alias2(alias1((depth0 != null ? depth0.integrationMembershipExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.activityPointExchYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storePickupYn : depth0), depth0))
    + "', '"
    + alias2(alias1((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "', '+')\"><img alt=\"제품 수량 증가\" src=\""
    + alias2((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias4).call(alias3,"/images/common/icon_plus1.gif",{"name":"absolutePath","hash":{},"data":data}))
    + "\"></button>\n						</span>\n";
},"33":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<ul class=\"freebies\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.cartProdAwardList : depth0),{"name":"each","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n";
},"34":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "					<li>\n						<span class=\"option_name\">\n							"
    + ((stack1 = helpers["if"].call(alias1,(helpers.ne || (depth0 && depth0.ne) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.awardProdEx : depth0)) != null ? stack1.repProdImgEx : stack1),null,{"name":"ne","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(35, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							사은품 : "
    + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.awardProdEx : depth0)) != null ? stack1.prodName : stack1), depth0))
    + "\n						</span>\n						<span class=\"term\">\n							기간 : "
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.awardStartDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + " ~ "
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.awardEndDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "\n						</span>\n					</li>\n";
},"35":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " <img src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.awardProdEx : depth0)) != null ? stack1.repProdImgEx : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\"/> ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"promotion\">\n	<div class=\"promotion_header\">\n		<a href=\"#none\"><strong>진주알 교환 상품</strong></a>\n		<div class=\"price\">\n			<span class=\"strong\"><b>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(depth0 != null ? depth0.pointSum : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</b>알</span> /\n			<span>보유 <b>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(depth0 != null ? depth0.activityPoints : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</b>알</span>\n		</div>\n	</div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true,"useDepths":true});