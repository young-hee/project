this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["display-card-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.displayCardTypeCode : depth0),"==","Basic",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.displayCardTypeCode : depth0),"==","Event",{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.displayCardTypeCode : depth0),"==","BeautyContents",{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.displayCardTypeCode : depth0),"==","BeautyVideo",{"name":"xif","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li class=\"ix-list-item\">\n						<dl>\n							<dt><span class=\"brand\"><img ap:src=\"@{/images/dummy/img_brand_01.png}\" alt=\"\"></span>"
    + alias2(alias1((depth0 != null ? depth0.title1 : depth0), depth0))
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.title2 : depth0), depth0))
    + "</dt>\n							<dd>\n								<div class=\"visual\">\n									<img src=\""
    + alias2(alias1((depth0 != null ? depth0.fileUrl : depth0), depth0))
    + "\" alt=\"\">\n								</div>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodList : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</dd>\n						</dl>\n					</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "									<div class=\"product_box\">\n										<div class=\"info_section\">\n											<p class=\"ellipsis\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p>\n											<div class=\"price_atc\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountRate : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "												<span class=\"txt_price\"><em>"
    + alias2((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountOnlinePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "</em>원</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.doublePriceDisplayYn : stack1),"==","Y",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "											</div>\n											<div class=\"user_atc\">\n												<span class=\"mark_star_sm star"
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "\"><span class=\"sr_only\">구매 평점 별 5개 중 "
    + alias2(alias1((depth0 != null ? depth0.reviewScopeAvg : depth0), depth0))
    + "개</span></span>\n												"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.reviewCount : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n											</div>\n										</div>\n									</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "													<span class=\"txt_sale\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountRate : stack1), depth0))
    + "%</span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "													<del class=\"txt_del\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.onlineProdPriceSummary : depth0)) != null ? stack1.maxFinalDiscountBeforeSalePrice : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "<span class=\"txt_review\">리뷰 "
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.reviewCount : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</span>";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li class=\"ix-list-item\">\n						<dl>\n							<dt><span class=\"brand\"><img src=\"/pc/ko/images/dummy/img_brand_01.png\" alt=\"\"></span>"
    + alias2(alias1((depth0 != null ? depth0.title1 : depth0), depth0))
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.title2 : depth0), depth0))
    + "</dt>\n							<dd>\n								<div class=\"visual\">\n									<img src=\""
    + alias2(alias1((depth0 != null ? depth0.fileUrl : depth0), depth0))
    + "\" alt=\"\">\n								</div>\n								<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.subTitle1 : depth0), depth0))
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.subTitle2 : depth0), depth0))
    + "</p>\n							</dd>\n						</dl>\n					</li>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li class=\"ix-list-item\">\n						<dl>\n							<dt>"
    + alias2(alias1((depth0 != null ? depth0.title1 : depth0), depth0))
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.title2 : depth0), depth0))
    + "</dt>\n							<dd>\n								<div class=\"visual\">\n									<img src=\""
    + alias2(alias1((depth0 != null ? depth0.fileUrl : depth0), depth0))
    + "\" alt=\"\">\n								</div>\n								<div class=\"slide\" data-ix-options=\"view-length:3;\">\n									<div class=\"ix-list-viewport\">\n										<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodList : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										</ul>\n									</div>\n									<div class=\"ix-controller\">\n										<div class=\"slide_direction\">\n											<a class=\"ix-btn-prev\" href=\"#none\"><span class=\"sr_only\">Prev</span></a>\n											<a class=\"ix-btn-next\" href=\"#none\"><span class=\"sr_only\">Next</span></a>\n										</div>\n									</div>\n								</div>\n							</dd>\n						</dl>\n					</li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "												<li class=\"ix-list-item\">\n													<a href=\""
    + alias1((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\"><img src=\""
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\"></a>\n												</li>\n";
},"15":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li class=\"ix-list-item\">\n						<dl class=\"color_white\" style=\"background: #"
    + alias2(alias1((depth0 != null ? depth0.textAreaColorCode : depth0), depth0))
    + "\">\n							<dt></span>"
    + alias2(alias1((depth0 != null ? depth0.title1 : depth0), depth0))
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.title2 : depth0), depth0))
    + "</dt>\n							<dd>\n								<a href=\"#none\" class=\"visual vod\" data-vod-url=\""
    + alias2(alias1((depth0 != null ? depth0.videoUrl : depth0), depth0))
    + "\" data-vod-title=\""
    + alias2(alias1((depth0 != null ? depth0.title1 : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.title2 : depth0), depth0))
    + "\">\n									<img src=\""
    + alias2(alias1((depth0 != null ? depth0.fileUrl : depth0), depth0))
    + "\" alt=\"\">\n								</a>\n								<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.subTitle1 : depth0), depth0))
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.subTitle2 : depth0), depth0))
    + "</p>\n							</dd>\n						</dl>\n					</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"slide event_card\" data-ix-options=\"view-length:4; move-length:1;\">\n	<div class=\"ix-list-viewport\">\n		<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.displayCardList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<div class=\"ix-controller round_box\">\n		<div class=\"slide_direction\">\n			<a class=\"ix-btn-prev\" href=\"#none\"><span class=\"sr_only\">Prev</span></a>\n			<a class=\"ix-btn-next\" href=\"#none\"><span class=\"sr_only\">Next</span></a>\n		</div>\n	</div>\n</div>";
},"useData":true});