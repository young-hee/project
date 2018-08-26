this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["empty-prod"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"section empty_cart\">\n	<p class=\"text\">장바구니에 담긴 상품이 없습니다</p>\n	<span class=\"thumb\"><img src=\""
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"url","hash":{},"data":data}) : helper)))
    + "\" alt=\"\"></span>\n	<p class=\"sub_text\">\n		<span>이니스프리부터 설화수까지</span><br>\n		다양한 브랜드 상품을 담아보세요\n	</p> \n	<a href=\"#none\" class=\"btn_h50_pu btn_go_brand\">브랜드 쇼핑하러 가기</a>\n</div>\n";
},"useData":true});