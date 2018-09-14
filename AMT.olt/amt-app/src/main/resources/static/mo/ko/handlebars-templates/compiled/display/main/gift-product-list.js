this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["main"] = this["AP"]["handlebars"]["display"]["main"] || {};

this["AP"]["handlebars"]["display"]["main"]["gift-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "				<li class=\"ix-list-item\">\n					<div class=\"product_one_view price_prd01\">\n						<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n							<span class=\"product_visual_new\">\n								<span class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									<img src=\"\" data-src=\""
    + alias3((helpers.replaceImagePath || (depth0 && depth0.replaceImagePath) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1),{"name":"replaceImagePath","hash":{},"data":data}))
    + "\" alt=\"\" class=\"lazy_load\">\n								</span>\n							</span>\n							<!-- 상품 정보 -->\n							<span class=\"product_info_new\">\n								<strong class=\"prd_brand\">"
    + alias3(alias4(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</strong>\n								<span class=\"p_type\">TYPE 01</span>\n								<span class=\"prd_name\">"
    + alias3(alias4((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n							</span>\n						</a>\n					</div>\n				</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "										<div class=\"item_state out_of_stock\">일시품절</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n<dt class=\"slide_title\">\n	<a href=\"#none\" class=\"prd_h_tit\"><strong>구매금액대별 사은품</strong>\n	</a>\n</dt>\n<dd class=\"slide one_half\" data-ix-options=\"view-length:2; move-length:1; datum-point:10%;\">\n	<div class=\"ix-list-viewport\">\n		<ul class=\"product_list_new prd_swipe_one ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n</dd>";
},"useData":true});