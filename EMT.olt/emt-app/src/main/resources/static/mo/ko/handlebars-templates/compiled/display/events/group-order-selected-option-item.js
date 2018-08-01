this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["group-order-selected-option-item"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"goods_box refill\" data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n	<div class=\"table_layout\">\n		<div class=\"thumb\"><img class=\"sameTime_lazy_load\" src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\" /></div>\n		<div class=\"goods_info\">\n			<p class=\"name\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</p>\n			<div class=\"table_layout\">\n				<span class=\"count\">1개</span>\n				<span class=\"num\">\n				<!-- <del><span>원</span></del> -->\n					<strong>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.prodPriceSummaryStp : depth0)) != null ? stack1.finalOnlinePriceStp : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong><span>원</span>\n				</span>\n			</div>\n		</div>\n	</div>\n	<button type=\"button\" class=\"btn_del\"><span class=\"sr_only\">없애기</span></button>\n</div>";
},"useData":true});