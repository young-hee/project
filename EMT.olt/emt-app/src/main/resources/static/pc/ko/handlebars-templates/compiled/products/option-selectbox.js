this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["option-selectbox"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<li class=\"select_option\">\n				<code class=\"label_markup\" style=\"display:none\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</code>\n				<a data-value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\" data-selected=\"false\">\n					<div class=\"option_info\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depths[1] != null ? depths[1].viewThumbnail : depths[1]),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						<div class=\"option_name\">\n							"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].prodTypeCode : depths[1]),"==","BulkFixedProd",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias4).call(alias3,(depth0 != null ? depth0.availablePrices : depth0),"doublePriceDisplayYn",{"name":"availablePrices","hash":{},"data":data}),"==","Y",{"name":"xif","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							<!-- TODO: 사은품 처리 -->\n							<!--<em class=\"additional\">[사은품] 전용 케이스 1개</em>-->\n						</div>\n\n						<div class=\"price\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OnSale",{"name":"xif","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>\n\n					</div>\n				</a>\n			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","Img",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"thumb\" style=\"background-color: #"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.rgbVal : depth0), depth0))
    + "\"></div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"thumb\"><img alt=\"\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.colorchipImg : depth0), depth0))
    + "\"></div>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].bulkIncludedProds : depths[1]),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "									<em class=\"set_option\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + " "
    + ((stack1 = helpers.unless.call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.last),{"name":"unless","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</em>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "+";
},"11":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"sold_out\"> [일시품절] </span>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "								<em class=\"num\">"
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"onlineSalePriceDiscountRate",{"name":"availablePrices","hash":{},"data":data}),"+",(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"memberLevelDiscountRate",{"name":"availablePrices","hash":{},"data":data}),"+",(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"onlineMemberDiscountRate",{"name":"availablePrices","hash":{},"data":data}),{"name":"calc","hash":{},"data":data}))
    + "% Off</em>\n";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"doublePriceDisplayYn",{"name":"availablePrices","hash":{},"data":data}),"==","Y",{"name":"xif","hash":{},"fn":container.program(16, data, 0, blockParams, depths),"inverse":container.program(19, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"16":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"minOnlineSalePriceDiff",{"name":"availablePrices","hash":{},"data":data}),">",0,{"name":"xif","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"17":function(container,depth0,helpers,partials,data) {
    return "										<strong class=\"num\">+"
    + container.escapeExpression((helpers.availablePrices || (depth0 && depth0.availablePrices) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.availablePrices : depth0),"minOnlineSalePriceDiff",{"name":"availablePrices","hash":{},"data":data}))
    + "<span>원</span></strong>\n";
},"19":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.activityPointOnly : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(20, data, 0, blockParams, depths),"inverse":container.program(22, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"20":function(container,depth0,helpers,partials,data) {
    return "										<strong class=\"num\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.exchActivityPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong>알\n";
},"22":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "										<strong class=\"num\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"onlineSalePrice",{"name":"availablePrices","hash":{},"data":data}),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depths[1] != null ? depths[1].productCount : depths[1]),1,{"name":"eq","hash":{},"data":data}),"&&",(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.membershipExchOnly : depth0),"Y",{"name":"eq","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(23, data, 0, blockParams, depths),"inverse":container.program(25, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"23":function(container,depth0,helpers,partials,data) {
    return "											P\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "											원\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"ui_select product_option_select\" data-not-label-change=\"true\">\n	<input type=\"hidden\" name=\"\">\n	<button type=\"button\">옵션선택</button>\n	<ul class=\"select_options\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true,"useDepths":true});