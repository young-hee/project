this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["recommend-items"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "\n	<li>\n		<div class=\"item\">\n		\n		<div class=\"item_images\" style=\"background-color:#"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1.rgbVal : stack1), depth0))
    + "\";>\n				<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias4).call(alias3,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1.prodImages : stack1)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n				</a>\n		</div>\n		\n		<div class=\"info_box\">\n			<div class=\"title_area\">\n				<h3 class=\"h_title\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</h3>\n			</div>\n			<div class=\"item_option\">\n				<p class=\"option_name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1.prodName : stack1), depth0))
    + "</p>\n			</div>\n			<div class=\"price_area\">\n				<div class=\"price\">\n					<strong>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1.prodPriceSummary : stack1)) != null ? stack1.onlineSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<em>원</em></strong>\n				</div>\n			</div>\n		</div>\n	</div>\n</li>\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"item_state out_of_stock\">일시품절</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});