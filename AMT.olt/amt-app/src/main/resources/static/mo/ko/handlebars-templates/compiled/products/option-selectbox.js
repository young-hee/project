this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["option-selectbox"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "data-not-label-change=\"true\"";
},"3":function(container,depth0,helpers,partials,data) {
    return "컬러선택";
},"5":function(container,depth0,helpers,partials,data) {
    return "옵션선택";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "				<li class=\"select_option\">\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].colorGroupClass : depths[1]),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "				</li>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<code class=\"label_markup\" style=\"display:none\">"
    + alias2(alias1((depth0 != null ? depth0.colorGroupName : depth0), depth0))
    + "</code>\n						<a data-value=\""
    + alias2(alias1((depth0 != null ? depth0.colorGroupCode : depth0), depth0))
    + "\" data-selected=\"false\">\n							<span class=\"color_box\" style=\"background-color:#"
    + alias2(alias1((depth0 != null ? depth0.colorGroupCode : depth0), depth0))
    + "\"></span>\n							<span class=\"option_title\">"
    + alias2(alias1((depth0 != null ? depth0.colorGroupName : depth0), depth0))
    + "</span>\n						</a>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "						<code class=\"label_markup\" style=\"display:none\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</code>\n						<a data-value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\" data-selected=\"false\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","Img",{"name":"xif","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							<span class=\"option_title\">\n								"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</span>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OnSale",{"name":"xif","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</a>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"color_box\" style=\"background-color:#"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.rgbVal : depth0), depth0))
    + "\"></span>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "								<img alt=\"\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.colorchipImg : depth0), depth0))
    + "\">\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "									<span class=\"sold_out\"> [일시품절] </span>\n";
},"17":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"doublePriceDisplayYn",{"name":"availablePrices","hash":{},"data":data}),"==","Y",{"name":"xif","hash":{},"fn":container.program(18, data, 0, blockParams, depths),"inverse":container.program(21, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"18":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"minOnlineSalePriceDiff",{"name":"availablePrices","hash":{},"data":data}),">",0,{"name":"xif","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"19":function(container,depth0,helpers,partials,data) {
    return "										<strong class=\"num\">+"
    + container.escapeExpression((helpers.availablePrices || (depth0 && depth0.availablePrices) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.availablePrices : depth0),"minOnlineSalePriceDiff",{"name":"availablePrices","hash":{},"data":data}))
    + "<span>원</span></strong>\n";
},"21":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.activityPointOnly : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(22, data, 0, blockParams, depths),"inverse":container.program(24, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"22":function(container,depth0,helpers,partials,data) {
    return "										<strong class=\"num\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.exchActivityPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "<span>알</span></strong>\n";
},"24":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "										<strong class=\"num\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(helpers.availablePrices || (depth0 && depth0.availablePrices) || alias2).call(alias1,(depth0 != null ? depth0.availablePrices : depth0),"onlineSalePrice",{"name":"availablePrices","hash":{},"data":data}),{"name":"numberFormat","hash":{},"data":data}))
    + "\n											<span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depths[1] != null ? depths[1].productCount : depths[1]),1,{"name":"eq","hash":{},"data":data}),"&&",(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.membershipExchOnly : depth0),"Y",{"name":"eq","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(25, data, 0, blockParams, depths),"inverse":container.program(27, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "											</span>\n										</strong>\n";
},"25":function(container,depth0,helpers,partials,data) {
    return "													P\n";
},"27":function(container,depth0,helpers,partials,data) {
    return "													원\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"goods_box none_bdr option_selectbox_item "
    + alias2(alias1((depth0 != null ? depth0.childItemClass : depth0), depth0))
    + "\">\n	<div class=\"ui_select static "
    + alias2(alias1((depth0 != null ? depth0.colorGroupClass : depth0), depth0))
    + "\" "
    + ((stack1 = helpers.unless.call(alias3,(depth0 != null ? depth0.colorGroupClass : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n		<input type=\"hidden\" name=\"\">\n		<button type=\"button\">"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.colorGroupClass : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(5, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</button>\n		<ul class=\"select_options\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n</div>";
},"useData":true,"useDepths":true});