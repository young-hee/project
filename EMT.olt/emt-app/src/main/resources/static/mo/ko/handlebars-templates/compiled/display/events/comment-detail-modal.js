this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["comment-detail-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"attached\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventCommentImgs : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "							<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.commentImgUrl : depth0), depth0))
    + "\" alt=\"\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"page_btns\">\n			<button type=\"button\" class=\"btn_lg_bordered btn_modify\" data-event-participant-sn=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\">수정</button>\n		</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<div class=\"panel detail_review_event\">\n	<div class=\"summary\">\n		<span>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span><span>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.participatedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n	</div>\n	<div class=\"review_list\">\n		<dl class=\"review_view\">\n			<dt>"
    + alias2(alias1((depth0 != null ? depth0.participantCommentTitle : depth0), depth0))
    + "</dt>\n			<dd>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<div class=\"text_wrap\">\n					"
    + alias2(alias1((depth0 != null ? depth0.participantComment : depth0), depth0))
    + "\n				</div>\n			</dd>\n		</dl>\n	</div>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.myCommentYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});