this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["writed-review-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<div class=\"review_box\" name=\"reviewSn_"
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">\n		<div class=\"review_wrap_02\">\n			<img src=\""
    + alias2(alias1((depth0 != null ? depth0.repProdImage : depth0), depth0))
    + "\" alt=\"\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.prodName : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n		<dl>\n			<dt>\n				<span class=\"clear\">\n					<span class=\"ui_rating small\">\n						<span class=\"heart\">\n"
    + ((stack1 = (helpers["for"] || (depth0 && depth0["for"]) || alias4).call(alias3,5,{"name":"for","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.topReviewYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</span>\n					<span class=\"summary\">\n						<span>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span><span>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewRegistDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n					</span>\n				</span>\n				<span class=\"title\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewTypeCode : depth0),"==","Pur",{"name":"xif","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewTypeCode : depth0),"==","Prod",{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.prodReviewTypeCode : depth0),"==","ExperienceGrp",{"name":"xif","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<b>"
    + alias2(alias1((depth0 != null ? depth0.prodReviewTitle : depth0), depth0))
    + "</b>\n				</span>\n			</dt>\n			<dd>\n				<p class=\"text\">"
    + alias2((helpers.ellipsis || (depth0 && depth0.ellipsis) || alias4).call(alias3,40,(depth0 != null ? depth0.prodReviewBodyText : depth0),{"name":"ellipsis","hash":{},"data":data}))
    + "</p>\n			</dd>\n			<dd class=\"thumbnail\">\n				<button type=\"button\" class=\"button_review_more\" data-prod-review-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">상세보기</button>\n				<button type=\"button\" class=\"button_review_del\" data-prod-review-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodReviewSn : depth0), depth0))
    + "\">삭제</button>\n			</dd>\n		</dl>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "				<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "								<span class=\"heart_wrap "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].scope : depths[1]),">",(depth0 != null ? depth0["for-index"] : depth0),{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"><span class=\"sr_only\"> "
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0["for-index"] : depth0),"+",1,{"name":"calc","hash":{},"data":data}))
    + "점</span></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "on";
},"7":function(container,depth0,helpers,partials,data) {
    return "							<strong class=\"review_best\">BEST</strong>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"badge\">구매리뷰</span>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"badge\">상품리뷰</span>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"badge\">체험단리뷰</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodReviewList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});