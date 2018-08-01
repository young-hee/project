this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["beauty-tester-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<dl>\n	<dt>\n		<b>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</b>\n		<small>2018.01.01</small>\n		<span class=\"ico_new\"><span class=\"sr_only\">새글</span></span>\n		<a href=\"#none\" class=\"btn_delete\">\n			<i class=\"ico_del\"></i><span class=\"sr_only\">신청글 삭제</span>\n		</a>\n		<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.requestTitle : depth0), depth0))
    + "</span>\n		<button type=\"button\"><span class=\"sr_only\">내용보기</span></button>\n	</dt>\n	<dd>\n		<div class=\"panel gray\">\n			<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.requestReason : depth0), depth0))
    + "</p>\n		</div>\n	</dd>\n</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});