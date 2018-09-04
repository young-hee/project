this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["review-contents"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<dl class=\"review\">\n		<dt class=\"review_header\">\n			<span>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span><span>"
    + alias2(alias1((depth0 != null ? depth0.memberLevelName : depth0), depth0))
    + "</span>\n			<span class=\"rating\">\n				<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "개</span></span>\n				<span class=\"count\">"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "</span>\n			</span>\n		</dt>\n		<dd class=\"review_cont\">\n			<p class=\"product_name\"><em class=\"ellipsis\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + ", "
    + alias2(((helper = (helper = helpers.prodName || (depth0 != null ? depth0.prodName : depth0)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"prodName","hash":{},"data":data}) : helper)))
    + "</em></p>\n			\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n			<div class=\"ui_table summary\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.surveys : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n			\n			<div class=\"cont\">\n				<!--/* 375 해상도 기준 4줄에 절삭 : 더읽기 클릭시 전체 보임 */-->\n				<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0))
    + "</p>\n				<a href=\"javascript:;\" class=\"read_more\" style=\"display:none;\">더읽기 <i class=\"ico_down\"></i></a>\n				<a href=\"javascript:;\" class=\"more_view close\" style=\"display:none;\">닫기 <i class=\"ico_up\"></i></a>\n			</div>\n			\n			<div class=\"clear btns\">\n				<button type=\"button\" class=\"btn_good on\">\n					<i class=\"ico_thumb animated500ms rotate\"></i>\n					<span>도움이 되요 <span class=\"num\">"
    + alias2(alias1((depth0 != null ? depth0.recommendCnt : depth0), depth0))
    + "</span></span>\n				</button>\n				\n				<button type=\"button\" class=\"btn_report\"><i class=\"ico_report\"></i><span class=\"sr_only\">신고하기</span></button>\n			</div>\n			\n			<div class=\"clear bottom\">\n				<p class=\"date\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewRegistDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</p>\n				<!--/* 내가 작성한 글 수정 버튼 노출 */-->\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].memberSn : depths[1]),"==",(depth0 != null ? depth0.memberSn : depth0),{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n		</dd>\n	</dl>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "			<div class=\"product_slide\">\n				<ul class=\"three_half\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n			</div>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li><a href=\"#none\"><img src=\""
    + alias2(alias1((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depths[1] != null ? depths[1].prodReviewTitle : depths[1]), depth0))
    + "\"></a></li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "				<dl>\n					<dt>"
    + alias2(alias1((depth0 != null ? depth0.questionHeader : depth0), depth0))
    + "</dt>\n					<dd><b>"
    + alias2(alias1((depth0 != null ? depth0.responseBodyText : depth0), depth0))
    + "</b></dd>\n				</dl>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "					<a href=\"#none\" class=\"btn_sm_bordered\">수정</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});