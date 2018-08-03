this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};

this["AP"]["handlebars"]["display"]["pearl-store-detail-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "		<!-- ==================================== 단위상품일때 ==================================== -->\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].selectedProdSn : depths[1]),"==",(depth0 != null ? depth0.prodSn : depth0),{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "\n					<li class=\"prod\" data-online-prod-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdSn : depths[1]), depth0))
    + "\">\n						<div class=\"item\">\n							<div class=\"item_images\">\n								<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n								"
    + ((stack1 = (helpers.stockImg || (depth0 && depth0.stockImg) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockImg","hash":{},"data":data})) != null ? stack1 : "")
    + "\n							</div>\n\n							<div class=\"info_box\">\n								<div class=\"title_area\">\n									<p class=\"s_title\">\n										<em class=\"tag\">"
    + alias2((helpers.stockTxt || (depth0 && depth0.stockTxt) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockTxt","hash":{},"data":data}))
    + "</em>\n										<span> "
    + ((stack1 = alias1((depth0 != null ? depth0.linePromoDesc : depth0), depth0)) != null ? stack1 : "")
    + " </span>\n									</p>\n									<h3 class=\"h_title\">"
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdName : depths[1]), depth0))
    + "</h3>\n								</div>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].singleUnitProdYn : depths[1]),"==","N",{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n								<div class=\"price_area\">\n									<div>\n										<div class=\"price\">\n											<strong>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.exchActivityPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "<em> 알</em></strong>\n										</div>\n									</div>\n								</div>\n							</div>\n\n							<div class=\"option_select\">\n								<button type=\"button\" class=\"btn_order\" data-online-prod-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].onlineProdSn : depths[1]), depth0))
    + "\" data-prod-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].prodSn : depths[1]), depth0))
    + "\"  "
    + ((stack1 = (helpers.stockBtn || (depth0 && depth0.stockBtn) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),(depth0 != null ? depth0.prodTypeCode : depth0),{"name":"stockBtn","hash":{},"data":data})) != null ? stack1 : "")
    + " >담기</button>\n							</div>\n						</div>\n					</li>\n\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "									<div class=\"item_option type2\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","Img",{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										<span class=\"name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n									</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "											<span class=\"img\" style=\"background-color:#"
    + alias1(container.lambda((depth0 != null ? depth0.rgbVal : depth0), depth0))
    + "\">\n												<img alt=\"컬러명\" src=\""
    + alias1((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"/images/common/transparent_40x40.png",{"name":"absolutePath","hash":{},"data":data}))
    + "\">\n											</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "											<span class=\"img\">\n												<img alt=\"컬러명\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.colorchipImg : depth0), depth0))
    + "\">\n											</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodListUnitCode : depth0),"==","Prod",{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true,"useDepths":true});