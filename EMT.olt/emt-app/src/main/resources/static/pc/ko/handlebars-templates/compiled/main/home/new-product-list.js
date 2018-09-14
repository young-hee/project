this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["new-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "			<li class=\"ix-list-item\">\n				<div class=\"item\">\n					<div class=\"item_images\">\n						<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap first_img\">\n							<span class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias3((helpers.replaceImagePath || (depth0 && depth0.replaceImagePath) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1),270,270,{"name":"replaceImagePath","hash":{},"data":data}))
    + "\" alt=\"\">\n							</span>\n						</a>\n					</div>\n					<div class=\"info_box list\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.flags : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						<div class=\"title_area\">\n							<h3 class=\"h_title\">"
    + alias3(container.lambda((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</h3>\n						</div>\n						\n						<div class=\"item_option\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.productCount : depth0),">",1,{"name":"xif","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>\n						<div class=\"price_area\">\n							<div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),"!=",0,{"name":"xif","hash":{},"fn":container.program(18, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								<div class=\"price\">\n									<strong>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>원</em></strong>\n								</div>\n							</div>\n						 </div>\n				    </div>\n				</div>\n			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "									<div class=\"item_state out_of_stock\">일시품절</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<div class=\"flag_set\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.flags : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_new",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_best_w",{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_pr_prod",{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_md",{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodFlagCode : depth0),"==","icon_reco_online",{"name":"xif","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"new\">신상품</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "									<span class=\"best\">베스트</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "									<span class=\"event\">이벤트</span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "									<span>MD추천</span>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "									<span>온라인전용</span>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "								<p class=\"color_name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.productCount : depth0), depth0))
    + " colors</p>\n";
},"18":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "								<div class=\"discount\">\n									<strong class=\"to\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.minOnlineSalePriceDiscountRate : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>%</em></strong>\n								</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"recommend_items ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});