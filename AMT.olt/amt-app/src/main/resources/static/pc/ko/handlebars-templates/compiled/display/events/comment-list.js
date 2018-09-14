this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["comment-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<li>\n	<div>\n		<div class=\"user_area\">\n			<p class=\"user\">"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "<span>"
    + alias2(alias1((depth0 != null ? depth0.memberLevelName : depth0), depth0))
    + "</span></p>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.myCommentYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n		<div class=\"cont\">\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<p>"
    + alias2(alias1((depth0 != null ? depth0.participantComment : depth0), depth0))
    + "</p>\n		</div>\n		<div class=\"comment_write\" style=\"display:none;\"><!--/* 댓글 수정 */-->\n			<form class=\"validate modify\" id=\"mod_form\" action=\"\">\n			<input type=\"hidden\" name=\"planDisplaySn\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.planDisplay : depth0)) != null ? stack1.planDisplaySn : stack1), depth0))
    + "\">\n			<input type=\"hidden\" name=\"eventParticipantSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<input type=\"hidden\" name=\"termsAgreeYn\" value=\"true\">\n			<div class=\"textarea_box\">\n				<div class=\"textarea\">\n					<p class=\"user_name\">"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</p>\n					<textarea name=\"participantComment\" id=\"\" cols=\"\" rows=\"\" placeholder=\"10자 이상 입력해주세요.\" maxlength=\"200\">"
    + alias2(alias1((depth0 != null ? depth0.participantComment : depth0), depth0))
    + "</textarea>\n				</div>\n				<p class=\"text_right byte\"><small><em class=\"current\">0</em>/<span class=\"limits\">200</span></small></p>\n				<div class=\"add_file_wrap\">\n					<div class=\"add_file ui_input_images\">\n						<input type=\"file\" id=\"i_picture\" class=\"fileInput\" "
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " accept=\"image/gif,image/jpeg,image/png,image/jpg\" multiple=\"multiple\" data-single-input =\"true\">\n						<label for=\"i_picture\">이미지 첨부</label>\n						<p class=\"fileName attach\">\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</p>\n					</div>\n					<button type=\"button\" id=\"btn_update\"><span class=\"ie_press\">등록</span></button>\n				</div>\n			</div>\n			</form>\n		</div>\n		<p class=\"date\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.participatedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</p>\n		<button type=\"button\" class=\"report\" data-planDisplay-comment-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\">\n			<span class=\"ie_press\">\n				<i class=\"ico_report\">\n					<span class=\"sr_only\">신고하기</span>\n				</i>\n			</span>\n		</button>\n	</div>\n</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "				<div class=\"control\">\n					<button type=\"button\" data-planDisplay-comment-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\" id=\"btn_modify\"><span class=\"ie_press\">수정</span></button>\n					<button type=\"button\" data-planDisplay-comment-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\" id=\"btn_delete\"><span class=\"ie_press\">삭제</span></button>\n				</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventCommentImgs : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "					<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.commentImgUrl : depth0), depth0))
    + "\" alt=\"\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventCommentImgs : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"8":function(container,depth0,helpers,partials,data) {
    return "					<input type=\"hidden\" name=\"eventCommentImgSn\" value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.eventCommentImgSn : depth0), depth0))
    + "\">\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "disabled=\"disabled\"";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventCommentImgs : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "								<span>"
    + alias1((helpers.substr || (depth0 && depth0.substr) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.commentImgUrl : depth0),"/",{"name":"substr","hash":{},"data":data}))
    + "<a href=\"javascript:;\" class=\"fileDel btn_del modify_img\" data-event-comment-img-sn=\""
    + alias1(container.lambda((depth0 != null ? depth0.eventCommentImgSn : depth0), depth0))
    + "\">삭제</a></span>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "	<li class=\"inner_loading\">\n		<ul class=\"loading\">\n			<li></li>\n			<li></li>\n			<li></li>\n		</ul>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.eventParticipants : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.isScrollType : depth0),"&&",(helpers.lt || (depth0 && depth0.lt) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0.offset : depth0),"+",((stack1 = (depth0 != null ? depth0.eventParticipants : depth0)) != null ? stack1.length : stack1),{"name":"calc","hash":{},"data":data}),(depth0 != null ? depth0.totalCount : depth0),{"name":"lt","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});