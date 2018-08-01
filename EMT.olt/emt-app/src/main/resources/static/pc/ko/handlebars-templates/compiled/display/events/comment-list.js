this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["comment-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.eventParticipants : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.totalCount : depth0),">",(depth0 != null ? depth0.limit : depth0),{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<dl>\n			<dt>\n				<span class=\"user_id\">"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span>\n				<small>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.participatedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n			</dt>\n			<dd>\n				<dl>\n					<dt>\n						<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.participantCommentTitle : depth0), depth0))
    + "</span>\n					</dt>\n					<dd>\n						<p class=\"text\">"
    + alias2((helpers.ellipsis || (depth0 && depth0.ellipsis) || alias4).call(alias3,200,(depth0 != null ? depth0.participantComment : depth0),{"name":"ellipsis","hash":{},"data":data}))
    + "</p>\n\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						<a class=\"btn_detail\" href=\"javascript:;\" data-event-participant-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\">+ 더보기</a>\n					</dd>\n				</dl>\n			</dd>\n		</dl>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<div class=\"attach_photo\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventCommentImgs : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "									<span class=\"thumb\"><img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.commentImgUrl : depth0), depth0))
    + "\" alt=\"\"></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"pagination\"></div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text font_lg\">등록된 댓글이 없습니다.</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});