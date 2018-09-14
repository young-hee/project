this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["comment-write-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "modify";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.participantComment : stack1), depth0));
},"5":function(container,depth0,helpers,partials,data) {
    return "on";
},"7":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<li><img src=\""
    + alias2(alias1((depth0 != null ? depth0.commentImgUrl : depth0), depth0))
    + "\" style=\"height:100%\"><button type=\"button\" class=\"btn_del modify_img\" data-event-comment-img-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventCommentImgSn : depth0), depth0))
    + "\"><span class=\"sr_only\">첨부파일 삭제</span></button></li>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventCommentImgs : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data) {
    return "					<input type=\"hidden\" name=\"eventCommentImgSn\" value=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.eventCommentImgSn : depth0), depth0))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "\n	<form class=\"validate "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.data : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" action=\"\">\n\n			<div class=\"repl_wrap01\">\n				<div class=\"repl_only_txt\">\n					<div class=\"repl_text_area01\">\n						<div class=\"textarea\">\n							<textarea name=\"participantComment\" id=\"\" cols=\"30\" rows=\"3\" maxlength=\"200\" placeholder=\"200자 이내로 입력해주세요.\" required data-msg=\"내용을 입력해 주세요.\">"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.participantComment : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</textarea>\n						</div>\n						<p class=\"text_right byte\"><small><em class=\"current\">0</em>/<span class=\"limits\">200</span></small></p>\n					</div>\n					\n					<div class=\"txt_upload01 "
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.participantComment : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"><a href=\"javascript:;\" class=\"submit\">올리기</a>\n				</div>\n			</div>\n			<div class=\"pic_area01\">\n				<div class=\"ui_input_images\">\n					<input type=\"file\" id=\"i_picture\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" multiple=\"multiple\" data-single-input =\"true\" style=\"display:none\" />\n					<label for=\"i_picture\" class=\"btn_pic_add btn_md_neutral w100p mgt10\">사진</label>\n					<ul class=\"attach\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.eventCommentImgs : stack1),{"name":"each","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</div>\n			</div>\n\n			<input type=\"hidden\" name=\"termsAgreeYn\" value=\"true\">\n			<input type=\"hidden\" name=\"planDisplaySn\" value=\""
    + alias3(alias2((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\">\n			<input type=\"hidden\" name=\"eventParticipantSn\" value=\""
    + alias3(alias2(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.eventParticipantSn : stack1), depth0))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</form>\n";
},"useData":true});