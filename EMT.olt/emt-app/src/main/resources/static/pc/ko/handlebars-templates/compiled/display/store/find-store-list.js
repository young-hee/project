this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["store"] = this["AP"]["handlebars"]["display"]["store"] || {};

this["AP"]["handlebars"]["display"]["store"]["find-store-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storeExList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "		<div class=\"store_item\">\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.findInObject || (depth0 && depth0.findInObject) || alias2).call(alias1,(depth0 != null ? depth0.storeEventExList : depth0),"foStoreEventCode","Color Finder",{"name":"findInObject","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<h3 class=\"store_title\">"
    + alias4(alias3((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</h3>\n			<div class=\"store_info\">\n				<p class=\"store_addr\">\n					"
    + alias4(alias3(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address1 : stack1), depth0))
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address2 : stack1),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n					<span class=\"store_phone\">"
    + alias4((helpers.phoneNumberFormat || (depth0 && depth0.phoneNumberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1),{"name":"phoneNumberFormat","hash":{},"data":data}))
    + "</span>\n				</p>\n\n				<div class=\"store_btn_wrap\">\n					<button class=\"btn_md favorite btn_favorite "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.regularStoreYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-store-sn=\""
    + alias4(alias3((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "\" data-store-name=\""
    + alias4(alias3((depth0 != null ? depth0.storeName : depth0), depth0))
    + "\">"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.regularStoreYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "")
    + "</button>\n					<button class=\"btn_md map_print\" data-lat=\""
    + alias4(alias3((depth0 != null ? depth0.latitude : depth0), depth0))
    + "\" data-lng=\""
    + alias4(alias3((depth0 != null ? depth0.longitude : depth0), depth0))
    + "\">지도인쇄</button>\n					<button class=\"btn_md map_call\" data-lat=\""
    + alias4(alias3((depth0 != null ? depth0.latitude : depth0), depth0))
    + "\" data-lng=\""
    + alias4(alias3((depth0 != null ? depth0.longitude : depth0), depth0))
    + "\" data-marker-id=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">지도보기</button>\n				</div>\n			</div>\n		</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "			<span class=\"ico_favolite_flag_store\"></span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ", "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address2 : stack1), depth0));
},"7":function(container,depth0,helpers,partials,data) {
    return "on";
},"9":function(container,depth0,helpers,partials,data) {
    return "단골해제";
},"11":function(container,depth0,helpers,partials,data) {
    return "단골등록";
},"13":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"color_dark_gray font_lg\"></p>\n		<p class=\"text color_gray\">매장 검색 결과가 없습니다.</p>\n		<p class=\"text color_light_gray mgt10\">입력하신 매장명 또는 지역명을 다시 확인해 주세요.<br>관련 문의는 고객센터 (1544-5418)로 연락주세요.</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.storeExList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(13, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});