this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["notice-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "		<tr>\n			<td>"
    + alias3((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depths[1] != null ? depths[1].cnt : depths[1]),"-",(data && data.index),{"name":"calc","hash":{},"data":data}))
    + "</td>\n			<td class=\"align_left\">\n				<a href=\"/cs/noticeView/"
    + alias3(((helper = (helper = helpers.foNoticeSn || (depth0 != null ? depth0.foNoticeSn : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"foNoticeSn","hash":{},"data":data}) : helper)))
    + "\">\n					<span class=\"type\">["
    + alias3(((helper = (helper = helpers.noticeTypeName || (depth0 != null ? depth0.noticeTypeName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"noticeTypeName","hash":{},"data":data}) : helper)))
    + "]</span>\n					"
    + alias3(((helper = (helper = helpers.foNoticeTitle || (depth0 != null ? depth0.foNoticeTitle : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"foNoticeTitle","hash":{},"data":data}) : helper)))
    + "\n				</a>\n			</td>\n			<td>245</td>\n			<td>"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.noticeStartDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</td>\n		</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});