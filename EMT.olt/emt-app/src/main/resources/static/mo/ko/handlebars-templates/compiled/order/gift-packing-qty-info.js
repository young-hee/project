this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["gift-packing-qty-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.possibleGiftPackingExList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "		<span class=\"ui_spinner small\" data-min=\"0\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.qtySelectPossibleYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " data-step=\"1\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.qtySelectPossibleYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "")
    + ">\n			<button class=\"spinner_decrease\" type=\"button\" title=\"제품 수량 감소\" onclick=\"boxQtyOperate(this,'-')\"><img alt=\"제품 수량 감소\" src=\"/mo/ko/images/common/ico_minus1.gif\"></button>\n			<input class=\"spinner_input\" type=\"text\" title=\"선택품목갯수\" id=\"boxCnt\" name=\"boxCnt\" value=\"0\">\n			<button class=\"spinner_increase\" type=\"button\" title=\"제품 수량 증가\" onclick=\"boxQtyOperate(this,'+')\"><img alt=\"제품 수량 증가\" src=\"/mo/ko/images/common/icon_plus1.gif\"></button>\n		</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return " data-max=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.maxSelectPossibleQty : depth0), depth0))
    + "\" ";
},"5":function(container,depth0,helpers,partials,data) {
    return " data-disabled=\"false\" ";
},"7":function(container,depth0,helpers,partials,data) {
    return " data-disabled=\"true\" ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});