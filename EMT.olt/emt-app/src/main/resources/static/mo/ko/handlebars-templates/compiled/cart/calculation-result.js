this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["calculation-result"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<ul>\n	<li class=\"cart_rst_item\">\n		<span class=\"text_rst_item\">할인</span>\n		<span class=\"cart_rst_num\">\n			<strong class=\"num\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.totalProdUnitDiscountAmountInfo : stack1)) != null ? stack1.standardCurrency : stack1)) != null ? stack1.amount : stack1),"+",((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.exchIPointSum : stack1),"+",((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.exchAPointSum : stack1),{"name":"calc","hash":{},"data":data}),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong><span class=\"text_rst_unit\">원</span>\n		</span>\n	</li>\n	<li class=\"cart_rst_item\">\n		<strong class=\"text_rst_item\">결제 예정 금액</strong>\n		<span class=\"cart_rst_num\">\n			<strong class=\"num\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.productOrderTotalAmountInfo : stack1)) != null ? stack1.standardCurrency : stack1)) != null ? stack1.amount : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong><span class=\"text_rst_unit\">원</span>\n		</span>\n	</li>\n</ul>";
},"useData":true});