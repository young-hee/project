this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["brand-card-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "				<li class=\"ix-list-item\">\n					<div class=\"brand_box\">\n						<strong class=\"sr_only\">"
    + alias2(alias1((depth0 != null ? depth0.brandName : depth0), depth0))
    + "</strong>\n						<div class=\"brand_visual\">\n							<a href=\"/display/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?displayMenuId="
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "\">\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.logos : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								<img alt=\""
    + alias2(alias1((depth0 != null ? depth0.brandName : depth0), depth0))
    + "\" src=\""
    + alias2(alias1((depth0 != null ? depth0.brandMainImgUrl : depth0), depth0))
    + "\">\n							</a>\n						</div>\n						<div class=\"brand_info\">\n"
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.planDisplayInfo : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.prods : depth0)) != null ? stack1.list : stack1)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>brandKeywordLinks\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.brandKeywordLinks : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						<a href=\"#none\" class=\"like\" role=\"button\">\n							<i class=\"ico_like\"><span class=\"sr_only\">좋아요</span></i><!-- active : on -->\n						</a>\n					</div>\n				</li>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.logos : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.logoType : depth0),"==","BrandLogo02",{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "											<span class=\"brand_logo\">\n												<img alt=\""
    + alias2(alias1((depths[1] != null ? depths[1].brandName : depths[1]), depth0))
    + "\" src=\""
    + alias2(alias1((depth0 != null ? depth0.fileUrl : depth0), depth0))
    + "\"><!-- 로고영역: 140 * 74  -->\n											</span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "								<div class=\"info_box\">\n									<a href=\"/display/event_detail?planDisplaySn="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.planDisplayInfo : depth0)) != null ? stack1.planDisplaySn : stack1), depth0))
    + "\">\n										<p class=\"txt_type\">EVENT</p>\n										<p class=\"txt_summary\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.planDisplayInfo : depth0)) != null ? stack1.planDisplayTitle : stack1), depth0))
    + "</p>\n										<p class=\"txt_day\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.planDisplayInfo : depth0)) != null ? stack1.eventStartDt : stack1), depth0))
    + "-"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.planDisplayInfo : depth0)) != null ? stack1.eventEndDt : stack1), depth0))
    + "</p>\n									</a>\n								</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "								<ul class=\"list_brand_relate\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.prods : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</ul>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=container.lambda;

  return "										<li>\n											<a href=\""
    + alias1((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n												<img alt=\""
    + alias1(alias2((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "\" src=\""
    + alias1(alias2(((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\">\n											</a>\n										</li>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<div class=\"tags_box\">\n								<ul class=\"list_tags\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.brandKeywordLinks : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</ul>\n							</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "										<li><a href=\""
    + alias2(alias1((depth0 != null ? depth0.keywordLinkUrl : depth0), depth0))
    + "\" class=\"hash_tags_md\">#"
    + alias2(alias1((depth0 != null ? depth0.keywordLinkTitle : depth0), depth0))
    + "</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<h2 class=\"title\"><b>인기 브랜드</b></h2>\n<div class=\"slide\" data-ix-options=\"view-length:3; move-length:1\">\n	<div class=\"ix-list-viewport brand_list\">\n		<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.brandCardList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<div class=\"ix-controller round_box\">\n		<div class=\"slide_direction\">\n			<a class=\"ix-btn-prev\" href=\"#\"><span class=\"sr_only\">Prev</span></a>\n			<a class=\"ix-btn-next\" href=\"#\"><span class=\"sr_only\">Next</span></a>\n		</div>\n	</div>\n</div>\n<a href=\"#none\" class=\"more\">더보기</a>";
},"useData":true,"useDepths":true});