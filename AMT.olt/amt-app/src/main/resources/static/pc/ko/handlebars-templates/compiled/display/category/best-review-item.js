this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["category"] = this["AP"]["handlebars"]["display"]["category"] || {};

this["AP"]["handlebars"]["display"]["category"]["best-review-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<li class=\"ix-list-item\">\n		<div class=\"review_img\">\n			<img src=\""
    + alias2(alias1((depth0 != null ? depth0.repProdImage : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\">\n		</div>\n		<div class=\"review_area\">\n			<p class=\"rv_txt ellipsis line3\">"
    + alias2(alias1((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0))
    + "</p>\n			<div class=\"user_atc\">\n				<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "개</span></span>\n				<span class=\"txt_review\">리뷰 "
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.lookupCnt : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</span>\n			</div>\n			<p class=\"date\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewRegistDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</p>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});