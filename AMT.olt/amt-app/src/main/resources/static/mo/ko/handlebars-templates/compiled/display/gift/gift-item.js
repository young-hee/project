this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["gift"] = this["AP"]["handlebars"]["display"]["gift"] || {};

this["AP"]["handlebars"]["display"]["gift"]["gift-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	<li>\n		<h3 class=\"h_tit03\">3만원이상 5만원미만 구매고객</h3>\n		<div class=\"section\">\n			<div class=\"freebies_product\">\n				<div class=\"product_visual\">\n					<div class=\"lazy_load_wrap thumb\">\n						<img src=\"\" data-src=\"/mo/ko/images/dummy/img_freebies.jpg\" alt=\"\" class=\"lazy_load\">\n					</div>\n				</div>\n\n				<div class=\"freebies_area\">\n					<div class=\"prd_name\">사은품 대표타이틀 타이틀 한줄 두줄넘어가면 쩜쩜쩜</div>\n					<ul class=\"option_name\">\n						<li>함빛 극손상 케어 샴푸 180g</li>\n						<li>마몽드 인리치드 뉴트리 4종\n							<ul>\n								<li>- 오일 세럼 5ml / 에멀젼 25ml / 스킨소프너 25ml / 크림 15ml 사은품 상세설명입니다. 텍스트가 늘어나면 공간이 늘어나요 마지막텍스트와 여백은 24px</li>\n							</ul>\n						</li>\n					</ul>\n				</div>\n			</div>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});