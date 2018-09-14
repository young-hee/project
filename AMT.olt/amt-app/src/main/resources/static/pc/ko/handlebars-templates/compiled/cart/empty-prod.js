this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["empty-prod"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.bestProdList : depth0)) != null ? stack1.list : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,(depths[1] != null ? depths[1].repImgNo : depths[1]),(depth0 != null ? depth0.imgNo : depth0),{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var helper;

  return "										<li style=\"background:url("
    + container.escapeExpression(((helper = (helper = helpers.imgUrl || (depth0 != null ? depth0.imgUrl : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"imgUrl","hash":{},"data":data}) : helper)))
    + ");\"></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<!-- 빈 장바구니 -->\n<div class=\"basket_nodata\" style=\"background:url(http://ecp-dev.amorepacificmall.com/pc/ko/images/cart/bg_nodata.jpg) no-repeat left top;\">\n	<div class=\"item_area\">\n		<p>장바구니에 담긴 상품이 없습니다.</p>\n		<div class=\"inner\">\n			<div class=\"tumb_slide\">\n				<!-- li 갯수는 최대 20개까지 -->\n				<div class=\"tumb_slideBox\">\n					<ul class=\"clearfix\">\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.and || (depth0 && depth0.and) || alias2).call(alias1,(helpers.ne || (depth0 && depth0.ne) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.bestProdList : depth0)) != null ? stack1.list : stack1),null,{"name":"ne","hash":{},"data":data}),(helpers.ne || (depth0 && depth0.ne) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.bestProdList : depth0)) != null ? stack1.list : stack1),undefined,{"name":"ne","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</div>\n				<div class=\"best_go\">\n					<a href=\"/display/rank?displayMenuId=rank\"><span>베스트 상품 보러가기</span></a>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>\n<!-- // 빈 장바구니 -->";
},"useData":true,"useDepths":true});