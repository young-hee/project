this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["hotdeal-coming-soon-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<li class=\"item\" data-online-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\" data-index=\""
    + alias2(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias4),(typeof helper === "function" ? helper.call(alias3,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n		<div class=\"product_new\">\n			<a href=\""
    + alias2((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias4).call(alias3,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n				<!-- // TODO -->\n				<span class=\"d_day_com\">D-1</span>\n				<!-- // TODO -->\n				<span class=\"product_visual_new\">\n					<span class=\"lazy_load_wrap\">\n						<img src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "\" class=\"lazy_load\">\n					</span>\n				</span>\n				<span class=\"product_info_new\">\n					<strong class=\"prd_brand\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.products : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.brandName : stack1), depth0))
    + "</strong>\n					<span class=\"prd_name\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n					<span class=\"product_rating\">\n						<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "개</span></span>\n						<span class=\"prd_review\">리뷰 "
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,(depth0 != null ? depth0.reviewCount : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</span>\n					</span>\n					<span class=\"tags\">\n						<!-- // TODO -->\n						<em class=\"badge_comming\">2018.05.11 (금) 예정</em>\n						<!-- // TODO -->\n					</span>\n				</span>\n				<button type=\"button\" class=\"btn_toggle like_btn\"><i class=\"ico_heart_s "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.shoppingMarkExistYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></i><span class=\"sr_only\">좋아요</span></button>\n			</a>\n		</div>\n	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "on";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});