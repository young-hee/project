this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["layer-order-delivery-store"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "					<li class=\"ix-list-item\">\n						<a href=\"#none\">\n							<img src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\" alt=\"COLOR FACTORY 단 하나뿐인 컬러를 만들어 주는 컬러 팩토리\">\n						</a>\n					</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "<dt class=\"layer_title\">테이크아웃 매장 정보</dt>\n<dd class=\"layer_cont\"><!--/* 20180511 : 지도와 슬라이드 위치변경 */-->\n	<div class=\"store_map\">\n		<div class=\"map_area\"></div>\n		<div class=\"info\">\n			<dl>\n				<dt>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.storeName : stack1), depth0))
    + "</dt>\n				<dd><span class=\"color_gray\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.address : stack1)) != null ? stack1.address1 : stack1), depth0))
    + "</span><br>"
    + alias2((helpers.phoneNumberFormat || (depth0 && depth0.phoneNumberFormat) || helpers.helperMissing).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.phoneNo1 : stack1)) != null ? stack1.phoneNo : stack1),{"name":"phoneNumberFormat","hash":{},"data":data}))
    + "</dd>\n			</dl>\n		</div>\n	</div>\n	<div class=\"slide\" data-ix-options=\"view-length:1;\">\n		<div class=\"ix-list-viewport\">\n			<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(alias3,(depth0 != null ? depth0.storeImgUrlList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n		<div class=\"ix-controller round_box\">\n			<div class=\"paging\"><b class=\"current\"></b> / <span class=\"total\"></span></div>\n			<div class=\"slide_direction\">\n				<a class=\"ix-btn-prev\" href=\"#none\"><span class=\"sr_only\">Prev</span></a>\n				<a class=\"ix-btn-next\" href=\"#none\"><span class=\"sr_only\">Next</span></a>\n			</div>\n		</div>\n	</div>\n</dd>\n<button class=\"layer_close\" type=\"button\">레이어 닫기</button>";
},"useData":true});