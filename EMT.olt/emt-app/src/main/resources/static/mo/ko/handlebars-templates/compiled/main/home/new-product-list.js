this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["new-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "			<li class=\"ix-list-item\">\n				<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n					<span class=\"lazy_load_wrap\">\n						"
    + ((stack1 = (helpers.stockImg || (depth0 && depth0.stockImg) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockImg","hash":{},"data":data})) != null ? stack1 : "")
    + "\n						<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias3((helpers.replaceImagePath || (depth0 && depth0.replaceImagePath) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1),380,380,{"name":"replaceImagePath","hash":{},"data":data}))
    + "\" alt=\"\">\n					</span>\n					<div class=\"item_info\">\n						<span class=\"item_title\">\n							<em>"
    + alias3((helpers.stockTxt || (depth0 && depth0.stockTxt) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockTxt","hash":{},"data":data}))
    + "</em>\n								"
    + alias3(container.lambda((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "\n						</span>\n						<span class=\"color_name\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.productCount : depth0),"==",1,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "						</span>\n						<div class=\"price_area\">\n							<span class=\"discount\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</span>\n							<span class=\"price\"><b>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</b> 원</span>\n						</div>\n					</div>\n				</a>\n			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdName : depth0),"!=",((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1),{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "									"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.prodName : stack1), depth0))
    + "\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorCnt : depth0),">",1,{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.optionCnt : depth0),">",1,{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "									"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.colorCnt : depth0), depth0))
    + " colors\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "									"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.optionCnt : depth0), depth0))
    + " options\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "									"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1), depth0))
    + "<em>%</em>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});