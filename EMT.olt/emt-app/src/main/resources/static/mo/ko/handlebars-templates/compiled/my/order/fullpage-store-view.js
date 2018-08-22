this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["fullpage-store-view"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<div class=\"slide map_store_sld\" data-ix-options=\"view-length:1;\">\n							<div class=\"ix-list-viewport\">\n								<ul class=\"ix-list-items\">\n									<li class=\"ix-list-item\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.storeEx : depth0)) != null ? stack1.storeImgUrlList : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n									</li>\n								</ul>\n							</div>\n							<div class=\"ix-controller\">\n								<ul class=\"ix-thumbs\">\n									<li class=\"ix-thumb\"><button type=\"button\" class=\"ix-btn\"><!--ix-index-->번째 배너</button></li>\n								</ul>\n							</div>\n						</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "											<a href=\"#none\">\n												<img alt=\"\" src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\">\n											</a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<!-- #ap_container -->\n<div ap:fragment=\"layout-contents\">\n\n	<div class=\"layer_popup fullpage order_claim\">\n		<div class=\"layer_wrap\">\n			<dl class=\"layer\">\n				<dt class=\"layer_title\">테이크아웃 매장 정보</dt>\n				<dd class=\"layer_cont\">\n					<div class=\"map_area\" style=\"height:202px;\"></div>\n					<div class=\"panel none_bdr\">\n						<h3 class=\"h_title cont\"><strong>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.storeEx : depth0)) != null ? stack1.storeName : stack1), depth0))
    + "</strong></h3>\n\n						<div class=\"store_addr_wrap\">\n							<span>"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.storeEx : depth0)) != null ? stack1.address : stack1)) != null ? stack1.address1 : stack1), depth0))
    + "</span>\n							<a href=\"tel:"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.storeEx : depth0)) != null ? stack1.phoneNo1 : stack1)) != null ? stack1.phoneNo : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.storeEx : depth0)) != null ? stack1.phoneNo1 : stack1)) != null ? stack1.phoneNo : stack1), depth0))
    + "</a>\n						</div>\n					</div>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.storeEx : depth0)) != null ? stack1.storeImgUrlList : stack1),"!=",null,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n\n				</dd>\n			</dl>\n			<button class=\"layer_close\" type=\"button\">레이어 닫기</button>\n		</div>\n	</div>\n</div>";
},"useData":true});