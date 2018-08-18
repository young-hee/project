this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["product-list"] = this["AP"]["handlebars"]["display"]["product-list"] || {};

this["AP"]["handlebars"]["display"]["product-list"]["best-review-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	<li class=\"ix-list-item\">\n		<div class=\"review_img\">\n			<img src=\"/pc/ko/images/dummy/img_bast_review.jpg\" alt=\"구매리뷰 베스트\">\n		</div>\n		<div class=\"review_area\">\n			<p class=\"rv_txt ellipsis line3\">요즘 피곤하고 기운이 없어서 정관장 먹다가 명작수 주문해 봤는데 효과가 있었으면 좋겠어요. 기대하고있습니다. 요즘 피곤하고 기운이 없어서 정관장 먹다가 명작수 주문해 봤는데 효과가 있었으면 좋겠어요. 기대하고있습니다.</p>\n			<div class=\"user_atc\">\n				<span class=\"mark_star_sm star3\"><span class=\"sr_only\">구매 평점 별 5개 중 3개</span></span>\n				<span class=\"txt_review\">리뷰 2,454</span>\n			</div>\n			<p class=\"date\">2016.09.02 01:16</p>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});