this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-tester"] = this["AP"]["handlebars"]["display"]["beauty-tester"] || {};

this["AP"]["handlebars"]["display"]["beauty-tester"]["process"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<li class=\"on\">";
},"3":function(container,depth0,helpers,partials,data) {
    return "<li class=\"done\">";
},"5":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"sr_only\">현재단계</span>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "<li>";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "							<span class=\"date\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.reviewRegistStartDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "~"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.reviewRegistEndDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "			<dl class=\"tester_process\">\n				<dt>"
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.regularEventName : stack1), depth0))
    + "</dt>\n				<dd>\n					<p class=\"text\"></p>\n					<ul class=\"step\">\n						\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RQ",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","TN",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RR",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","BR",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							<span>참가신청</span>\n							<i class=\"ico\"></i>\n							<span class=\"date\">"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.requestStartDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "~"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.requestEndDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RQ",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</li>\n						\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RQ",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","TN",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RR",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","BR",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							<span>테스터발표</span>\n							<i class=\"ico\"></i>\n							<span class=\"date\">"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.winnerNoticeExpectedDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","TN",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</li>\n						\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RQ",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","TN",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RR",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","BR",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							<span>리뷰등록</span>\n							<i class=\"ico\"></i>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.reviewRegistStartDt : stack1),"!=",null,{"name":"xif","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RR",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</li>\n						\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RQ",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","TN",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","RR",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n						"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","BR",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							<span>베스트리뷰발표</span>\n							<i class=\"ico\"></i>\n							<span class=\"date\">"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.bestReviewNoticeDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.status : depth0),"==","BR",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</li>\n					</ul>\n				</dd>\n			</dl>";
},"useData":true});