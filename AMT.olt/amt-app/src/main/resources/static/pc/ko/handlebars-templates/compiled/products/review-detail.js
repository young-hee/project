this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["review-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<dd class=\"attached\">\n		<div class=\"slide\" data-ix-options=\"view-legnth:1;loop:false\">\n			<div class=\"ix-list-viewport\">\n				<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n			</div>\n			<div class=\"ix-controller\">\n				<div class=\"slide_direction\">\n					<a class=\"ix-btn-prev\" href=\"#\"><span class=\"sr_only\">이전</span></a>\n					<a class=\"ix-btn-next\" href=\"#\"><span class=\"sr_only\">다음</span></a>\n				</div>\n				<ul class=\"ix-thumbs\">\n					<li class=\"ix-thumb\"><button type=\"button\" class=\"ix-btn\"><!--ix-index-->번째 배너</button></li>\n				</ul>\n			</div>\n		</div>\n	</dd>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li class=\"ix-list-item\">\n							<img src=\""
    + alias2(alias1((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.imgDesc : depth0), depth0))
    + "\">\n						</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li>\n							<span>"
    + alias2(alias1((depth0 != null ? depth0.questionHeader : depth0), depth0))
    + "</span>\n							<strong>"
    + alias2(alias1((depth0 != null ? depth0.responseBodyText : depth0), depth0))
    + "</strong>\n						</li>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "on";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<div class=\"review_title\">\n	<h2 class=\"h_title\">구매리뷰 상세</h2>\n</div>\n<dl class=\"review\">\n	<dt class=\"review_header\">\n		<span class=\"name\">"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span><span class=\"grade\">"
    + alias2(alias1((depth0 != null ? depth0.memberLevelName : depth0), depth0))
    + "</span>\n		<div class=\"product_rating\">\n			<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "개</span></span>\n			<span class=\"count\">"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "</span>\n		</div>\n		</span>\n	</dt>\n	<!--/* 첨부 동영상 & 이미지 영역 */-->\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	\n	<dd>\n		<div class=\"review_box\">\n			<div class=\"prd_option\"><span>"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span></div>\n			<!--/* 상품설명 */-->\n			<div class=\"survey\">\n				<ul>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.surveys : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n			</div>\n			<!--/* 코멘트 */-->\n			<div class=\"comment\">\n				<div class=\"ellipsis line5\">"
    + alias2(alias1((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0))
    + "</div>\n				<a href=\"#none\" class=\"btn_view_more\">더읽기</a>\n				<a href=\"#none\" class=\"btn_view_close\">닫기</a>\n			</div>\n			<div class=\"box_help\">\n				<span class=\"left\">\n					<a href=\"javascript:;\" class=\"btn_help "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.recommendYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-review-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">\n						도움이되요 \n						<span class=\"recommendCnt\">"
    + alias2(alias1((depth0 != null ? depth0.recommendCnt : depth0), depth0))
    + "</span>\n					</a>\n				</span>\n				\n				<span class=\"right\">\n					<a href=\"javascript:;\" class=\"btn_report "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.reportYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-review-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">\n						<span class=\"sr_only\">신고하기</span>\n					</a>\n				</span>\n			</div>\n		</div>\n		<div class=\"date\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewRegistDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</div>\n	</dd>\n</dl>\n\n\n";
},"useData":true});