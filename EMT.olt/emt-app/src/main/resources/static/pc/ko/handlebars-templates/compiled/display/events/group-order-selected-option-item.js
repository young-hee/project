this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["group-order-selected-option-item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<li class=\"product_item\" data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n	<div class=\"option_info\">\n		<div class=\"option_name\">\n			"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\n			<em class=\"additional\" style=\"display: none;\"></em>\n			<em class=\"num\" style=\"display: none;\"></em>\n		</div>\n		<div class=\"price\"><span><strong class=\"num\">"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.prodPriceSummaryStp : depth0)) != null ? stack1.finalOnlinePriceStp : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong>원</span></div>\n		<div class=\"btn btn_del\">\n			<button type=\"button\"><span class=\"sr_only\">상품 삭제</span></button>\n		</div>\n	</div>\n</li>";
},"useData":true});