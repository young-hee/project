this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["review-contents"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<div class=\"review_box\" class=\"reviewDetail\" data-review-type=\"pur\" data-review-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">\n		<div class=\"rating\">\n			<span class=\"mark_star_mm star"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "개</span></span>	\n			<span class=\"date\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewRegistDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n		</div>\n		<div class=\"user_info clear\">\n			<div class=\"inner\">\n				<span class=\"name\">"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span>\n				<span class=\"grade\">"
    + alias2(alias1((depth0 != null ? depth0.memberLevelName : depth0), depth0))
    + "</span>\n			</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].memberSn : depths[1]),"==",(depth0 != null ? depth0.memberSn : depth0),{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n		\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		\n		<div class=\"prd_option\"><span>"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + ", "
    + alias2(((helper = (helper = helpers.prodName || (depth0 != null ? depth0.prodName : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"prodName","hash":{},"data":data}) : helper)))
    + "</span></div>\n		<div class=\"survey\">\n			<ul>\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.surveys : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n		<div class=\"comment\">\n			<div class=\"ellipsis line5\">"
    + alias2(alias1((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0))
    + "</div>\n			<a href=\"#none\" class=\"btn_view_more\">더읽기</a>\n			<a href=\"#none\" class=\"btn_view_close\">닫기</a>\n		</div>\n		<div class=\"box_help\">\n			<span class=\"left\"><a class=\"btn_help\">도움이되요 "
    + alias2(alias1((depth0 != null ? depth0.recommendCnt : depth0), depth0))
    + "</a></span>\n			<span class=\"right\"><a class=\"btn_report\"><span class=\"sr_only\">신고하기</span></a></span>\n		</div>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"modify\">\n				<a href=\"#\">수정</a>		<!--- 내가 쓴 리뷰에만 노출 -->\n			</div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "			<div class=\"photos\">\n				<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n			</div>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li>\n							<a href=\"#none\" class=\"reviewDetail\" data-review-type=\"pur\" data-review-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].prodReviewSn : depths[1]), depth0))
    + "\">\n								<img src=\"\" data-src=\""
    + alias2(alias1((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depths[1] != null ? depths[1].prodReviewTitle : depths[1]), depth0))
    + "\" class=\"lazyLoad\">\n							</a>\n						</li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li>\n						<span>"
    + alias2(alias1((depth0 != null ? depth0.questionHeader : depth0), depth0))
    + "</span>\n						<strong>"
    + alias2(alias1((depth0 != null ? depth0.responseBodyText : depth0), depth0))
    + "</strong>\n					</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});