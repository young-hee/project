this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["simple-comment-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<li>\n		<dl>\n			<dt class=\"comment_title\"><span>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span><small class=\"num\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.participatedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small></dt>\n			<dd class=\"comment_cont\">\n				<!--/* 375 해상도 기준 4줄에 절삭 : 더읽기 클릭시 전체 보임 */-->\n				<div class=\"cont\">\n					<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.participantComment : depth0), depth0))
    + "</p>\n					<a href=\"#none\" class=\"read_more\" style=\"display:none;\">더읽기 <i class=\"ico_down\"></i></a>\n					<a href=\"#none\" class=\"more_view close\" style=\"display:none;\">닫기 <i class=\"ico_up\"></i></a>\n					<div class=\"comment_edit\" style=\"display:none;\">\n						<div class=\"inbox\">\n							<textarea cols=\"\" rows=\"4\" class=\"text_edit\"></textarea>\n						</div>\n					</div>\n				</div>\n				<div class=\"clear btns\">\n					<button type=\"button\" class=\"btn_good\" data-planDisplay-comment-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\">\n						<i class=\"ico_thumb animated500ms rotate\"></i>\n						<span>도움이 되요 \n							<span class=\"num\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.commentRecommendCnt : depth0),"!=","0",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</span>\n						</span>\n					</button>\n					<button type=\"button\" class=\"btn_report\" data-planDisplay-comment-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\"><i class=\"ico_report\"></i><span class=\"sr_only\">신고하기</span></button>\n					<!--<a href=\"#none\" class=\"btn_report\"><i class=\"ico_report\"></i><span class=\"sr_only\">신고하기</span></a>-->\n				</div>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.myCommentYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</dd>\n		</dl>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "									"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.commentRecommendCnt : depth0), depth0))
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "				<div class=\"comment_btns\">\n					<button type=\"button\" data-planDisplay-comment-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\" id=\"btn_modify\">수정</button>\n					<button type=\"button\" data-planDisplay-comment-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\" id=\"btn_delete\">삭제</button>\n				</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "	<li class=\"inner_loading\">\n		<ul class=\"loading\">\n			<li></li>\n			<li></li>\n			<li></li>\n		</ul>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.eventParticipants : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.isScrollType : depth0),"&&",(helpers.lt || (depth0 && depth0.lt) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0.offset : depth0),"+",((stack1 = (depth0 != null ? depth0.eventParticipants : depth0)) != null ? stack1.length : stack1),{"name":"calc","hash":{},"data":data}),(depth0 != null ? depth0.totalCount : depth0),{"name":"lt","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});