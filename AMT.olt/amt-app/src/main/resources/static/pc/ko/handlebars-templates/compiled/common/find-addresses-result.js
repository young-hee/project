this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["find-addresses-result"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <p class=\"text\">검색결과 <strong><em>127</em></strong>개</p>\n    <br>\n    <ul class=\"address_list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n    <div class=\"ui_paging pagination\">\n\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "            <li>\n                <a href=\"javascript:;\" data-post-code=\""
    + alias2(alias1((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "\" data-detail-address=\""
    + alias2(alias1((depth0 != null ? depth0.roadAddrPart2 : depth0), depth0))
    + "\" data-address=\""
    + alias2(alias1((depth0 != null ? depth0.roadAddrPart1 : depth0), depth0))
    + "\">\n                    <dl>\n                        <dt>지번명</dt>\n                        <dd>"
    + alias2(alias1((depth0 != null ? depth0.roadAddr : depth0), depth0))
    + "</dd>\n                    </dl>\n                    <dl>\n                        <dt>도로명</dt>\n                        <dd>"
    + alias2(alias1((depth0 != null ? depth0.jibunAddr : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "</dd>\n                    </dl>\n                </a>\n            </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"panel notice\">\n        <i class=\"ico\"></i>\n        <p class=\"text font_lg\">검색 결과가 없습니다.</p>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});