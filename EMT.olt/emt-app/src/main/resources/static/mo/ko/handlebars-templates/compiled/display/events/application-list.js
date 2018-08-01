this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["application-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<dl>\n	<dt>\n		<b>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</b>\n		<small>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.requestDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n		"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.recentRequestYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		<!--<a href=\"#none\" class=\"btn_delete\"><i class=\"ico_del\"></i><span class=\"sr_only\">신청글 삭제</span></a>-->\n		<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.requestTitle : depth0), depth0))
    + "</span>\n		<button type=\"button\"><span class=\"sr_only\">내용보기</span></button>\n	</dt>\n	<dd>\n		<div class=\"panel gray\">\n			<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.requestReason : depth0), depth0))
    + "</p>\n		</div>\n	</dd>\n</dl>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "<span class=\"ico_new\"><span class=\"sr_only\">새글</span></span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.regularEventRequesters : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});