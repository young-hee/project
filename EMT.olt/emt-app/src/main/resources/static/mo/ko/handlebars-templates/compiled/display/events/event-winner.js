this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["event-winner"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<li>\n	<a href=\"/display/eventWinner_detail?foNoticeSn="
    + alias2(alias1((depth0 != null ? depth0.foNoticeSn : depth0), depth0))
    + "\">\n		<b class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.foNoticeTitle : depth0), depth0))
    + "</b>\n		<span>\n			<small>"
    + alias2(alias1((depth0 != null ? depth0.noticeTypeName : depth0), depth0))
    + "</small><small class=\"date\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.noticeStartDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n		</span>\n	</a>\n</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.foNoticeList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});