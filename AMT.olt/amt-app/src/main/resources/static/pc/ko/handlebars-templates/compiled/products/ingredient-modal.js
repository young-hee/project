this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["ingredient-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<li>\n				<strong class=\"tit\">"
    + alias2(alias1((depth0 != null ? depth0.brandNm : depth0), depth0))
    + "</strong>\n				<p class=\"product\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n				<p class=\"option\">"
    + alias2(alias1((depth0 != null ? depth0.prodNm : depth0), depth0))
    + "</p>\n				<p class=\"txt\">"
    + ((stack1 = alias1((depth0 != null ? depth0.desc : depth0), depth0)) != null ? stack1 : "")
    + "</p>\n			</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"all_component\">\n	<ul class=\"list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.disclosures : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n	<div class=\"layer_btns\">\n		<a href=\"#none\" class=\"btn_fix_neutral closePop\">확인</a>\n	</div>\n</div>\n";
},"useData":true});