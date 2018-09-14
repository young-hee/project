this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["ingredient-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "	<dl>\n		<dt>\n			<!--/* 브랜드명 */-->\n			<span class=\"brand\">"
    + alias2(alias1((depth0 != null ? depth0.brandNm : depth0), depth0))
    + "</span>\n			<!--/* 상품명 */-->\n			<span class=\"product_name\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n		</dt>\n		<dd>\n			<!--/* 옵션명 */-->\n			<em class=\"option_name\">"
    + alias2(alias1((depth0 != null ? depth0.prodNm : depth0), depth0))
    + "</em>\n			<!--/* 전성분 */-->\n			<p class=\"text\">"
    + ((stack1 = alias1((depth0 != null ? depth0.desc : depth0), depth0)) != null ? stack1 : "")
    + "</p>\n		</dd>\n	</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"section product_all_components\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.disclosures : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n";
},"useData":true});