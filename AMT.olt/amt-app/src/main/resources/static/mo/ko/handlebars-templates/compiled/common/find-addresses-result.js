this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["find-addresses-result"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <li>\n                <a class=\"result\" href=\"javascript:;\" data-post-code=\""
    + alias2(alias1((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "\" data-detail-address=\""
    + alias2(alias1((depth0 != null ? depth0.roadAddrPart2 : depth0), depth0))
    + "\" data-address=\""
    + alias2(alias1((depth0 != null ? depth0.roadAddrPart1 : depth0), depth0))
    + "\">\n                    <p>"
    + alias2(alias1((depth0 != null ? depth0.roadAddr : depth0), depth0))
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.jibunAddr : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "</p>\n                </a>\n            </li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<br>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.jibunAddr : depth0), depth0));
},"5":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"panel notice\">\n        <i class=\"ico\"></i>\n        <p class=\"text\">검색결과가 없습니다.</p>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});