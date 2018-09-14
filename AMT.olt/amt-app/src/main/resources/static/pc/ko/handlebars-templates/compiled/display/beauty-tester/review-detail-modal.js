this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-tester"] = this["AP"]["handlebars"]["display"]["beauty-tester"] || {};

this["AP"]["handlebars"]["display"]["beauty-tester"]["review-detail-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.foTemplateNo : depth0),"==",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.foTemplateNo : depth0),"!=",0,{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "											<div class=\"inbox_cont\">\n												기존 뷰티테스트 리뷰 영역\n											</div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "											<div class=\"inbox type_0"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.foTemplateNo : depth0), depth0))
    + "\">\n												"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.foTemplateNo : depth0),"==",4,{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.imageInfoList : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "												"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.foTemplateNo : depth0),"==",4,{"name":"xif","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n												\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.imageInfoList : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "											</div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "<ul class=\"img_fl\">";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "													"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].foTemplateNo : depths[1]),"==",4,{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0["0"] : depth0), depth0))
    + "\" alt=\"이미지 내용 입력\" />"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].foTemplateNo : depths[1]),"==",4,{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "<li>";
},"10":function(container,depth0,helpers,partials,data) {
    return "</li>";
},"12":function(container,depth0,helpers,partials,data) {
    return "</ul>";
},"14":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].foTemplateNo : depths[1]),"!=",1,{"name":"xif","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data) {
    return "													<p>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0["1"] : depth0), depth0))
    + "</p>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return " on";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<dl class=\"layer\">\n				<dt class=\"layer_title\"><span class=\"sr_only\">리뷰</span></dt>\n				<dd class=\"layer_cont\">\n					<!--/* 리뷰 : 동영상 슬라이드 case */-->\n					<div class=\"review_title\">\n						<h2 class=\"h_title\">뷰티테스터 리뷰</h2>\n					</div>\n					<dl class=\"review\">\n						<dt class=\"review_header\">\n							<span class=\"name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.memberId : stack1), depth0))
    + "</span><span class=\"grade\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.memberLevelName : stack1), depth0))
    + "</span>\n							<div class=\"product_rating\">\n								<span class=\"mark_star_sm star"
    + alias2((helpers.calc || (depth0 && depth0.calc) || alias4).call(alias3,5,"-",((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.scope : stack1),{"name":"calc","hash":{},"data":data}))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.scope : stack1), depth0))
    + "개</span></span>\n								<span class=\"count\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.scope : stack1), depth0))
    + "</span>\n							</div>\n							</span>\n						</dt>\n						<!--/* 첨부 동영상 & 이미지 영역 */-->\n						<dd class=\"attached\">\n							<div class=\"review_cont\">\n								<div class=\"title_box\">\n									<p class=\"title\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.prodReviewTitle : stack1), depth0))
    + "</p>\n									<a href=\"#1\" class=\"product_name\"><em class=\"ellipsis\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.onlineProdName : stack1), depth0))
    + "-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.prodName : stack1), depth0))
    + "</em><i class=\"ico_arr\"></i></a>\n								</div>\n								<div class=\"inbox_cont\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.displayReviewImgList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</div>\n							</div>\n						</dd>\n					</dl>\n				</dd>\n			</dl>\n			<button type=\"button\" class=\"layer_close\"><span class=\"sr_only\">레이어 닫기</span></button>\n			<div class=\"fix_bottom_wrap\">\n				<div class=\"fix_bottom\">\n					<div class=\"inbox\">\n						<span class=\"share_area\"><a href=\"#1\" class=\"btn_share\"><img src=\"/pc/ko/images/event/ico_share.png\" class=\"\" alt=\"공유하기\" /></a></span> <!-- 이미지경로 수정_2018-08-24 -->\n						<span class=\"recommend_area\"><a href=\"#none\" class=\"btn_help"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.recommendYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(17, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" onclick=\"$(this).toggleClass('on');\">도움이 되요</a><span class=\"num recommendCnt\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.prodReviewInfo : depth0)) != null ? stack1.recommendCnt : stack1), depth0))
    + "</span></span> <!-- 좋아요_toggle_2018-08-24 -->\n					</div>\n				</div>\n			</div>";
},"useData":true,"useDepths":true});