this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["event-winner"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<tr>\n	<td class=\"num\">"
    + alias3((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depths[1] != null ? depths[1].totalCount : depths[1]),"-",(data && data.index),{"name":"calc","hash":{},"data":data}))
    + "</td>\n	<td class=\"cate\">"
    + alias3(alias4((depth0 != null ? depth0.noticeTypeName : depth0), depth0))
    + "</td>\n	<td class=\"subj align_left\"><a href=\"/display/eventWinner_detail?foNoticeSn="
    + alias3(alias4((depth0 != null ? depth0.foNoticeSn : depth0), depth0))
    + "\">"
    + alias3(alias4((depth0 != null ? depth0.foNoticeTitle : depth0), depth0))
    + "</a></td>\n	<td class=\"date\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.noticeStartDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</td>\n</tr>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.foNoticeList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});