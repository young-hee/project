this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["gift"] = this["AP"]["handlebars"]["display"]["gift"] || {};

this["AP"]["handlebars"]["display"]["gift"]["gift-item"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "	<li class=\"gift\">\n		<div class=\"gift_box\">\n			<p class=\"mark\">5만원이상 10만원미만 구매고객</p>\n			<div class=\"visual_section\">\n				<img src=\"\" data-src=\"/pc/ko/images/dummy/gift.jpg\" alt=\"3만원이상 5만원미만 구매고객 사은품\" class=\"lazy_load\">\n			</div>\n			<div class=\"info_section\">\n				<p class=\"name ellipsis\">제목 1줄입니다. 길이테스트 제목 1줄입니다. 길이테스트 제목 1줄입니다. 길이테스트 제목 1줄입니다. 길이테스트 제목 1줄입니다. 길이테스트</p>\n				<p class=\"summary\">사은품 내용 자동으로 영역이 늘어납니다. 가장 높이가 큰 li 기준으로 아래 스크립트를 통해 높이가 자동으로 변경됨</p>\n			</div>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});