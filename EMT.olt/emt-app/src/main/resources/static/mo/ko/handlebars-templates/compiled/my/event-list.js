this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["event-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "	<li>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.displayStatus : depth0),"==","End",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "			<dt>\n				<span class=\"clear\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.displayStatus : depth0),"==","End",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "					"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.winnerFoNoticeSn : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n				</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.displayStatus : depth0),"==","End",{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.program(14, data, 0),"data":data})) != null ? stack1 : "")
    + "			</dt>\n			<dd>\n				<ul class=\"list font_sm\">\n					<li>참여일:"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.participatedDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + " │ 당첨자 발표일:"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.winnerNoticeExpectedDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</li>\n					<li>이벤트 기간:"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.eventStartDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + " ~ "
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.eventEndDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</li>\n				</ul>\n			</dd>\n		</dl>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "			<dl class=\"complete\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "			<dl>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "					<span class=\"flag\">종료</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "					<span class=\"flag\">진행중</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "<a href=\"#none\">당첨자 발표 확인</a>";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "					<b>"
    + alias2(alias1((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + " - "
    + alias2(alias1((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "</b>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "					<a href=\"#none\"><b>"
    + alias2(alias1((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + " - "
    + alias2(alias1((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "</b></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.planDisplayDTOs : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});