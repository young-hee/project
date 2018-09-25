this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["brand-card"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<div class=\"section brand_new01\">\n		<dl class=\"brand_info\">\n			<dt>\n				<a href=\"/display/brand/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?displayMenuId="
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?brandSn="
    + alias2(alias1((depth0 != null ? depth0.brandSn : depth0), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.logos : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</a>\n				<button type=\"button\" class=\"btn_toggle like_btn\"><i class=\"ico_heart_s "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.memberShoppingMarkYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"></i><span class=\"sr_only\">좋아요</span></button>\n			</dt>\n			<dd>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.planDisplayExistYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\n				<div class=\"tags scrollable_x\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.brandKeywordLinks : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</div>\n			</dd>\n		</dl>\n</div>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.logoType : depth0),"==","BrandLogo01",{"name":"xif","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<img class=\"brand\" alt=\""
    + alias2(alias1((depths[1] != null ? depths[1].brandName : depths[1]), depth0))
    + "\" src=\""
    + alias2((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.fileUrl : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\"><span>"
    + alias2(alias1((depths[1] != null ? depths[1].brandName : depths[1]), depth0))
    + "</span><i class=\"ico_arr\"></i>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "on";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"display_brand_list01\">\n						<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.planDisplayInfos : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</ul>\n					</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "								<li><a href=\"javascript:;\"><img alt=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "\" ap:src=\"@{/images/dummy/img_item_01.png}\"></a></li>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<div class=\"slide\" data-ix-options=\"auto-play:true; paging:true; view-length:1;\">\n						<div class=\"ix-list-viewport\">\n							<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.prods : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</ul>\n						</div>\n						<div class=\"ix-controller white_overlay\">\n							<div class=\"paging\"><strong class=\"current\"></strong> / <span class=\"total\"></span></div>\n							<button type=\"button\" class=\"btn_view_all\">전체보기</button>\n						</div>\n					</div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"<",6,{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "										<li class=\"ix-list-item\">\n											<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n												<img alt=\""
    + alias3(container.lambda((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "\" src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.onlineProdImages : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1),{"name":"absolutePath","hash":{},"data":data}))
    + "\">\n											</a>\n										</li>\n";
},"14":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<a href=\""
    + alias2(alias1((depth0 != null ? depth0.keywordLinkUrl : depth0), depth0))
    + "\">#"
    + alias2(alias1((depth0 != null ? depth0.keywordLinkTitle : depth0), depth0))
    + "</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.brandCards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});