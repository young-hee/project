this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["ranking"] = this["AP"]["handlebars"]["display"]["ranking"] || {};

this["AP"]["handlebars"]["display"]["ranking"]["ranking-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<li>\n	<div class=\"product_one_view\">\n		<a href=\"javascript:;\">\n			<span class=\"rank_num\">"
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "</span>\n			<span class=\"rank_down\">234</span>\n			<span class=\"product_visual_new\">\n				<span class=\"lazy_load_wrap loaded\">\n					<img src=\"\" data-src=\"/mo/ko/images/dummy/img_oneView_01.jpg\" alt=\"\" class=\"lazy_load loaded\">\n				</span>\n			</span>\n\n			<span class=\"product_info_new\">\n				<span class=\"prd_name\">Apmall x HERA 블랙쿠션 시크릿박스_17호</span>\n				<span class=\"price_wrap\">\n					<strong class=\"discount\">5%</strong>\n					<strong class=\"price\">129,600<em>원</em></strong>\n				</span>\n				<span class=\"product_rating\">\n					<span class=\"mark_star_sm star3\"><span class=\"sr_only\">구매 평점 별 5개 중 3개</span></span>\n					<span class=\"prd_review\">리뷰 828</span>\n				</span>\n				<span class=\"tags\">\n					<em class=\"badge special\">스페셜기프트</em>\n					<em class=\"badge gift\">기프트카드</em>\n				</span>\n\n				<button type=\"button\" class=\"btn_toggle\"><i class=\"ico_heart_s\"></i><span class=\"sr_only\">좋아요</span></button>\n			</span>\n		</a><a href=\"javascript:;\" class=\"direct_brand\">리리코스 마린에너지</a>\n	</div>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});