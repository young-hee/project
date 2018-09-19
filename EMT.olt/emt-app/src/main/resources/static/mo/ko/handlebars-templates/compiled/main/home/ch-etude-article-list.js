this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["ch-etude-article-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text\">채널에뛰드 관련 상품이 존재하지 않습니다.</p>\n	</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<li>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","OnlineProd",{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","Prod",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<span class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","OnlineProd",{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","Prod",{"name":"xif","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</span>\n				<span class=\"item_title\">"
    + alias3(container.lambda((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n				<span class=\"color_name\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","Prod",{"name":"xif","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].prodListUnitCode : depths[1]),"==","OnlineProd",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</span>\n				\n				<span class=\"price\"><b class=\"num\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</b> 원</span>\n			</a>\n		</li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "				<a href=\""
    + container.escapeExpression((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<a href=\""
    + container.escapeExpression((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdSn : depth0),((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodSn : stack1),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "					<div class=\"item_state out_of_stock\">일시품절</div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<img src=\"\" data-src=\""
    + container.escapeExpression((helpers.replaceImagePath || (depth0 && depth0.replaceImagePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1),140,140,{"name":"replaceImagePath","hash":{},"data":data}))
    + "\" alt=\"\" class=\"lazy_load\">\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<img src=\"\" data-src=\""
    + container.escapeExpression((helpers.replaceImagePath || (depth0 && depth0.replaceImagePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1),140,140,{"name":"replaceImagePath","hash":{},"data":data}))
    + "\" alt=\"\" class=\"lazy_load\">\n";
},"15":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdName : depth0),"!=",((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1),{"name":"xif","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "\n";
},"18":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].colorCnt : depths[1]),">",1,{"name":"xif","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].optionCnt : depths[1]),">",1,{"name":"xif","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "							"
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].colorCnt : depths[1]), depth0))
    + " colors\n";
},"21":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "							"
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].optionCnt : depths[1]), depth0))
    + " options\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),"==",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n	\n\n\n";
},"useData":true,"useDepths":true});