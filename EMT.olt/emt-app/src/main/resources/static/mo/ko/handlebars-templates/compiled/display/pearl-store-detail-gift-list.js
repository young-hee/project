this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};

this["AP"]["handlebars"]["display"]["pearl-store-detail-gift-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "	<li class=\"gift\" data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n		<div class=\"item\">\n			<div class=\"item_images\">\n				<!-- /* 대표 이미지 */ -->\n				<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n			</div>\n			<div class=\"item_info_freebie list\">\n				<div class=\"prd_name\">\n					<div>\n						<p class=\"name\">&lt;사은품&gt; "
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</p>\n					</div>\n				</div>\n			</div>\n			<div class=\"price_area\">\n				<span class=\"price\">\n					<span>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.exchActivityPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "<em> 알</em></span>\n				</span>\n			</div>\n		</div>\n		<button class=\"btn_order\" type=\"button\" data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">담기</button>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});