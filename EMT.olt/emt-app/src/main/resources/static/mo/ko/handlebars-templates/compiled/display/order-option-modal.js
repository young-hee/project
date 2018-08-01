this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};

this["AP"]["handlebars"]["display"]["order-option-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "				<div class=\"goods_box\">\n					<button class=\"goods_select_name\" data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","Img",{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						<span class=\"name\">\n							"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</span>\n\n						<span class=\"num\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.activityPointOnly : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "						</span>\n					</button>\n				</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"color_box\" style=\"background-color:#"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.rgbVal : depth0), depth0))
    + "\"></span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"color_box\" ><img alt=\"\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.colorchipImg : depth0), depth0))
    + "\"></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"sold_out\"> [일시품절]</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "								<strong>"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.exchActivityPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong><span>알</span>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "								<strong>"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.prodPriceSummary : depth0)) != null ? stack1.onlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong>\n								<span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depths[1] != null ? depths[1].productCount : depths[1]),1,{"name":"eq","hash":{},"data":data}),"&&",(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.membershipExchOnly : depth0),"Y",{"name":"eq","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.program(13, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "								</span>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "										P\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "										원\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "\n<div class=\"evt_goods\">\n	<fieldset class=\"form\">\n		<legend class=\"sr_only\">상품옵션</legend>\n		<div class=\"scroll_area\">\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		</div>\n	</fieldset>\n</div>\n";
},"useData":true,"useDepths":true});