this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};

this["AP"]["handlebars"]["display"]["pearl-store-detail-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].selectedProdSn : depths[1]),"==",(depth0 != null ? depth0.prodSn : depth0),{"name":"xif","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "\n			<li class=\"prod\" data-online-prod-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdSn : depths[1]), depth0))
    + "\">\n				<div class=\"item\">\n					<div class=\"item_images\">\n						<!-- /* 대표 이미지 */ -->\n						<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n\n						"
    + ((stack1 = (helpers.stockImg || (depth0 && depth0.stockImg) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockImg","hash":{},"data":data})) != null ? stack1 : "")
    + "\n					</div>\n					<div class=\"item_info list\">\n						<div class=\"prd_name\">\n							<div>\n								<p class=\"s_name\">\n									<em class=\"tag\">"
    + alias2((helpers.stockTxt || (depth0 && depth0.stockTxt) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockTxt","hash":{},"data":data}))
    + "</em>\n									<span> "
    + ((stack1 = alias1((depth0 != null ? depth0.linePromoDesc : depth0), depth0)) != null ? stack1 : "")
    + " </span>\n								</p>\n								<p class=\"name\">"
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdName : depths[1]), depth0))
    + "</p>\n							</div>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].singleUnitProdYn : depths[1]),"==","N",{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>\n					</div>\n					<div class=\"price_area\">\n						<div class=\"price\">\n							<span>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.exchActivityPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "<em> 알</em></span>\n						</div>\n					</div>\n				</div>\n				<button class=\"btn_order\" type=\"button\" data-online-prod-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdSn : depths[1]), depth0))
    + "\" data-prod-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].prodSn : depths[1]), depth0))
    + "\" "
    + ((stack1 = (helpers.stockBtn || (depth0 && depth0.stockBtn) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockBtn","hash":{},"data":data})) != null ? stack1 : "")
    + " >담기</button>\n			</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "								<p class=\"color_name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});