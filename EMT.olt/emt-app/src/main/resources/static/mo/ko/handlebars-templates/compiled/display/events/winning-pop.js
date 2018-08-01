this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["winning-pop"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<img alt=\""
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\" src=\""
    + alias2(alias1((depth0 != null ? depth0.prodImg : depth0), depth0))
    + "\">\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "		<em>["
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "]</em>"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? depths[1].awards : depths[1])) != null ? stack1.length : stack1),">",1,{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "<br>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"img_wrap\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.awards : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>\n<p class=\"text_center\">\n	축하드립니다.<br>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.awards : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	에 당첨되셨습니다.<br>\n	배송지 정보를 입력하셔야 당첨이 완료됩니다.\n</p>\n<div class=\"page_btns\">\n	<button class=\"btn_md_primary\" type=\"button\">배송지 정보 입력하기</button>\n</div>";
},"useData":true,"useDepths":true});