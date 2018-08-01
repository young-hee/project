this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};

this["AP"]["handlebars"]["display"]["pearl-store-detail-gift-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "		<li data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n			<div class=\"item\">\n				<div class=\"item_images\">\n					<!--/* 대표 이미지 */-->\n					<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.prodImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\">\n				</div>\n				<div class=\"info_box_freebie\">\n					<!-- /* 상품명 */ -->\n					<div class=\"title_area\">\n						<h3 class=\"h_title\">&lt;사은품&gt; "
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</h3>\n					</div>\n					<!--/* 가격,장바구니 */-->\n					<div class=\"price_area\">\n						<div>\n							<div class=\"price\">\n								<strong>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.exchActivityPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "<em> 알</em></strong>\n							</div>\n						</div>\n					</div>\n				</div>\n				<!--/* 옵션선택 & 닫기 */-->\n				<div class=\"option_select\">\n					<button type=\"button\" class=\"btn_order\" data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">담기</button>\n				</div>\n			</div>\n		</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n";
},"useData":true});