this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-tester"] = this["AP"]["handlebars"]["display"]["beauty-tester"] || {};

this["AP"]["handlebars"]["display"]["beauty-tester"]["best-review-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "									<li class=\"grid-item\">\n										<a href=\"/display/beauty_test/review-detail?prodReviewSn="
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\" target=\"_blank\">\n											<!--/* 이미지 없는 경우 */-->\n											<div class=\"flag_box\">\n												<div class=\"review_info\">\n													<span class=\"rating_one\">\n														<span class=\"star_one\"><img src=\"/mo/ko/images/display/bg_rating_one.png\" alt=\"\"></span><span class=\"count\">"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "</span>\n													</span>\n													<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.prodReviewTitle : depth0), depth0))
    + "</p>\n													<p class=\"reviewer\">"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</p>\n												</div>\n												<div class=\"product_info\">\n													<div class=\"img_product\"><img alt=\"\" src=\""
    + alias2(alias1((depth0 != null ? depth0.repProdImage : depth0), depth0))
    + "\"></div>\n													<ul class=\"product_name_wrap\">\n														<li>"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</li>\n														<li>"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</li>\n													</ul>\n												</div>\n												<div class=\"flag_best\"><img src=\"/mo/ko/images/display/ico_best_64.png\" alt=\"베스트\"></div>\n											</div>\n										</a>\n									</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});