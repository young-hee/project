this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["ranking"] = this["AP"]["handlebars"]["display"]["ranking"] || {};

this["AP"]["handlebars"]["display"]["ranking"]["ranking-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<li>\n	<div class=\"product_new\">\n		<a href=\"javascript:;\">\n			<span class=\"product_visual_new\">\n				<!--<span class=\"out_of_stock\"><span class=\"img_badge\">일시품절</span></span>-->\n				<span class=\"lazy_load_wrap\">\n					<img src=\"\" data-src=\"/mo/ko/images/dummy/img_item_08.jpg\" alt=\"\" class=\"lazy_load\">\n				</span>\n			</span>\n			<span class=\"product_info_new\">\n				<strong class=\"prd_brand\">마몽드</strong>\n				<span class=\"prd_name\">[대용량] 더마 리페어 시카크림[대용량] 더마 리페어 시카크림[대용량] 더마 리페어 시카크림</span>\n				<span class=\"price_wrap\">\n					<strong class=\"discount\">28%</strong>\n					<strong class=\"price\">32,000<em>원</em></strong>\n					<del>45,000원</del>\n				</span>\n\n				<span class=\"product_rating\">\n					<span class=\"mark_star_sm star3\"><span class=\"sr_only\">구매 평점 별 5개 중 3개</span></span>\n					<span class=\"prd_review\">리뷰 1,035</span>\n				</span>\n\n				<span class=\"prd_color\">\n					<span style=\"background:#9c282a\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#d6181c\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#9c2846\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#cb3d3f\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#ef5052\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#9c282a\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#d6181c\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#9c2846\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#cb3d3f\"><span class=\"sr_only\">옵션명</span></span>\n					<span style=\"background:#ef5052\"><span class=\"sr_only\">옵션명</span></span>\n					<span class=\"more\"></span>\n				</span>\n				<span class=\"tags\">\n					<em class=\"badge special\">스페셜기프트</em>\n					<em class=\"badge gift\">기프트카드</em>\n				</span>\n			</span>\n			<button type=\"button\" class=\"btn_toggle\"><i class=\"ico_heart_s\"></i><span class=\"sr_only\">좋아요</span></button>\n		</a>\n	</div>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});