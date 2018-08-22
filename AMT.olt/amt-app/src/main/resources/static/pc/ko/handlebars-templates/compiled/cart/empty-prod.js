this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["empty-prod"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel notice\">\n	<i class=\"ico\"></i>\n	<p class=\"text color_gray\">장바구니에 담긴 상품이 없습니다.</p>\n</div>";
},"useData":true});