this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["beautytester-review-contents"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "	<li>\n		<a href=\"javascript:;\" class=\"reviewDetail\" data-review-type=\"tester\" data-review-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">\n			<img data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imageFileUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgDesc : stack1), depth0))
    + "\" class=\"lazyLoad\">\n			<span class=\"info\">\n				<span class=\"grade\"><b>"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "</b></span>\n				<b class=\"ellipsis\">"
    + alias2(alias1((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0))
    + "</b>\n			</span>\n		</a>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});