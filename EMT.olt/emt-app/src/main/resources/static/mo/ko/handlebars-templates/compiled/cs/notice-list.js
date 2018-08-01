this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["notice-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "        		<li class=\""
    + alias3((helpers.important || (depth0 && depth0.important) || alias2).call(alias1,(depth0 != null ? depth0.importantNoticeYn : depth0),{"name":"important","hash":{},"data":data}))
    + "\">\n        			<a href=\"/cs/noticeView/"
    + alias3(((helper = (helper = helpers.foNoticeSn || (depth0 != null ? depth0.foNoticeSn : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"foNoticeSn","hash":{},"data":data}) : helper)))
    + "\"> \n						<span class=\"title\">"
    + alias3(((helper = (helper = helpers.foNoticeTitle || (depth0 != null ? depth0.foNoticeTitle : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"foNoticeTitle","hash":{},"data":data}) : helper)))
    + "</span>\n						<span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.importantNoticeYn : depth0),"===","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "							<small class=\"date\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.noticeStartDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n						</span>\n					</a>\n			</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "								<small>공지</small>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper;

  return "								<small>"
    + container.escapeExpression(((helper = (helper = helpers.noticeTypeName || (depth0 != null ? depth0.noticeTypeName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"noticeTypeName","hash":{},"data":data}) : helper)))
    + "</small>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});