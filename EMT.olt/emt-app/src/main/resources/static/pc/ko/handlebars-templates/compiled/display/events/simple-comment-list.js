this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["simple-comment-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<li>\n		<dl>\n			<dt>\n				<b>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</b>\n				<small>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.participatedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n"
    + ((stack1 = helpers["if"].call(alias3,(helpers.isNewArticle || (depth0 && depth0.isNewArticle) || alias4).call(alias3,(depth0 != null ? depth0.participatedDt : depth0),{"name":"isNewArticle","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.myCommentYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</dt>\n			<dd>\n				<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.participantComment : depth0), depth0))
    + "</p>\n			</dd>\n		</dl>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "					<span class=\"ico_new\"><span class=\"sr_only\">새글</span></span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "					<button class=\"btn_delete\" type=\"button\" data-event-participant-sn=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\"><i class=\"ico_del\"></i><span class=\"sr_only\">댓글 삭제</span></button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventParticipants : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});