this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["group-order-selected-option-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"theme_set ico_set\" data-promoSn=\""
    + alias1(container.lambda((depth0 != null ? depth0.promoSn : depth0), depth0))
    + "\">\n	<p class=\"title\"><!--/* 20180511 : 혜택적용 추가 */-->\n		<b>"
    + alias1(((helper = (helper = helpers.promoName || (depth0 != null ? depth0.promoName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias2,{"name":"promoName","hash":{},"data":data}) : helper)))
    + "</b><br>\n		<small class=\"benefit notApply\">혜택미적용</small>\n		<small class=\"benefit apply\" style=\"display: none;\"><em>혜택적용</em></small>\n	</p>\n	\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.promoGrpList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	\n	<!--/* 묶음 합계 \n	<div class=\"set_total clear\">\n		<p>합계</p>\n		<p class=\"price\">\n			<strong class=\"num\">0</strong><span>원</span>\n		</p>\n	</div>\n	*/-->\n</div>	\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers["for"] || (depth0 && depth0["for"]) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordQty : depth0),{"name":"for","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "			<!--/* 상품 */-->\n			<div class=\"goods_box empty\" data-promo-grop-sn=\""
    + alias2(alias1((depths[1] != null ? depths[1].sameTimePurProdGrpSn : depths[1]), depth0))
    + "\">\n				<div class=\"table_layout empty\"><!--/* 상품 선택전 화면 : class 'empty' 사용 */-->\n					<div class=\"thumb\"><span></span></div>\n					<div class=\"goods_info\">\n						<p class=\"name\">"
    + alias2(alias1((depths[1] != null ? depths[1].grpTitle : depths[1]), depth0))
    + "에서 상품 1개를 선택해 주세요.</p><!--/*20180615: 문구수정*/-->\n						<div class=\"page_btns\">\n							<button class=\"btn_sm_neutral\" type=\"button\">상품선택</button>\n						</div>\n					</div>\n				</div>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});