this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["layer-find-address-result-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<p class=\"count\">검색결과 "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.totalLengthLabel : depth0), depth0))
    + "건</p>\n	<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "			<li>\n				<label for=\"item"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n					<p><span class=\"flag\">도로명</span>"
    + alias4(alias5((depth0 != null ? depth0.roadAddr : depth0), depth0))
    + "</p>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.jibunAddr : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<p>우편번호 "
    + alias4(alias5((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "</p>\n				</label>\n				<span class=\"rdo_h30\">\n					<input type=\"radio\" class=\"selRadio\" name=\"select\" id=\"item"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-sel-index=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-post-code=\""
    + alias4(alias5((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "\" data-detail-address=\""
    + alias4(alias5((depth0 != null ? depth0.roadAddrPart2 : depth0), depth0))
    + "\" data-address=\""
    + alias4(alias5((depth0 != null ? depth0.roadAddrPart1 : depth0), depth0))
    + "\">\n				</span>\n				<!-- 체크된 부분에 추가되는 input입니다 -->\n				<div class=\"add_input\" id=\"addInput"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n					<span class=\"input_h48_gray\"><input type=\"text\" id=\"inputDetail"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" class=\"address_last\" placeholder=\"상세주소 입력를 입력해주세요\"></span>\n					<span class=\"input_h48_gray\"><input type=\"text\" id=\"inputDetailName"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"받는고객 이름 입력\"></span>\n					<span class=\"input_h48_gray\"><input type=\"text\" id=\"inputDetailHp"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"휴대폰번호 000-0000-0000\"></span>\n				</div>\n			</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "					<p><span class=\"flag\">지번</span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.jibunAddr : depth0), depth0))
    + "</p>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "	<p class=\"count\">검색결과가 없습니다.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n\n";
},"useData":true});