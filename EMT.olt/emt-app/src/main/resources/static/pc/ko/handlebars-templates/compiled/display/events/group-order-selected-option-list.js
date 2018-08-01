this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["group-order-selected-option-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "<dl class=\"order_cont selectbox_area\" data-promoSn=\""
    + alias1(container.lambda((depth0 != null ? depth0.promoSn : depth0), depth0))
    + "\">\n	<dt><em>[이벤트"
    + alias1((helpers.calc || (depth0 && depth0.calc) || alias3).call(alias2,(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "]</em> "
    + alias1(((helper = (helper = helpers.promoName || (depth0 != null ? depth0.promoName : depth0)) != null ? helper : alias3),(typeof helper === "function" ? helper.call(alias2,{"name":"promoName","hash":{},"data":data}) : helper)))
    + " <span class=\"benefit notApply\">혜택 미적용</span> <span class=\"benefit apply\" style=\"display: none;\"><em>혜택 적용</em></span></dt>\n	<dd>\n		<div class=\"product_option_select\">\n			<ul class=\"plus_one\">\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.promoGrpList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n		<!--/*\n		<div class=\"total\">\n			<p class=\"text_center\">상품을 선택해주세요</p>\n		</div>\n		*/-->\n	</dd>\n	<!--/*\n	<dd>\n		 선택후 합계 \n		<dl class=\"total\">\n			<dt>합계</dt>\n			<dd>\n				<div class=\"price\"><b class=\"num\">0</b>원</div>\n			</dd>\n		</dl>\n	</dd>\n	*/-->\n</dl>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers["for"] || (depth0 && depth0["for"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordQty : depth0),{"name":"for","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "						<li class=\"empty\" data-promo-grop-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].sameTimePurProdGrpSn : depths[1]), depth0))
    + "\"> \n							<span>"
    + alias2(alias1((depths[1] != null ? depths[1].grpTitle : depths[1]), depth0))
    + "</span>\n							<div class=\"option_info\">\n								<div class=\"option_name\">"
    + alias2(alias1((depths[1] != null ? depths[1].grpTitle : depths[1]), depth0))
    + "에서 상품 1개를 선택해주세요.</div>\n							</div>\n						</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});