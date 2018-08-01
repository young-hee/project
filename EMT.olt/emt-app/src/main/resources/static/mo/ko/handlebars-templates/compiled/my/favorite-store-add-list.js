this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["favorite-store-add-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    \n		<div class=\"panel store\">\n			<div class=\"store_wrap\">\n				<h3 class=\"store_title\">"
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "</h3>\n				<!-- <span class=\"check_wrap star\">\n					<input type=\"radio\"  name=\"rep\" id=\""
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.storeSn || (depth0 != null ? depth0.storeSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeSn","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.checkedIf || (depth0 && depth0.checkedIf) || alias2).call(alias1,(depth0 != null ? depth0.defaultStoreYn : depth0),{"name":"checkedIf","hash":{},"data":data}))
    + ">\n					<label for=\""
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "\">기본매장</label>\n				</span> -->\n			</div>\n			<div class=\"store_info\">\n				<p class=\"store_addr\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address1 : stack1), depth0))
    + "	\n					<a href=\"tel:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "\" class=\"store_phone\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "</a><!--/*20180622 : 전화연결 수정*/-->\n				</p>\n			<!-- open시 해당 영역에 class=\"on\" 이 들어간다. -->\n				<div class=\"store_btn_wrap\">\n					<button class=\"btn_md w50p map_call\" latitude=\""
    + alias4(((helper = (helper = helpers.latitude || (depth0 != null ? depth0.latitude : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"latitude","hash":{},"data":data}) : helper)))
    + "\" longitude=\""
    + alias4(((helper = (helper = helpers.longitude || (depth0 != null ? depth0.longitude : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"longitude","hash":{},"data":data}) : helper)))
    + "\">지도보기</button>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.regularStoreYn : depth0),"===","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "				</div>\n\n				<div class=\"store_map_wrap\">\n					<div class=\"map_area\"></div>\n				</div>\n			</div>\n		</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <button class=\"btn_md w50p del\" value=\""
    + alias4(((helper = (helper = helpers.storeSn || (depth0 != null ? depth0.storeSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeSn","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "\">단골해제</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                        <button class=\"btn_md w50p del off\" value=\""
    + alias4(((helper = (helper = helpers.storeSn || (depth0 != null ? depth0.storeSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeSn","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "\">단골등록</button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var helper;

  return "	<div class=\"store_list_wrap type2\">\n		<!--/*20180626 : 검색된 단골매장 목록이 없을경우*/-->\n		<div class=\"panel notice\">\n			<i class=\"ico\"></i>\n			<p class=\"font_df color_dark_gray\">"
    + container.escapeExpression(((helper = (helper = helpers.keyword || (depth0 != null ? depth0.keyword : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"keyword","hash":{},"data":data}) : helper)))
    + "</p>\n			<p class=\"font_sm\">매장 검색 결과가 없습니다.</p>\n\n			<div class=\"panel gray\">\n				<ul class=\"list_bullet_dot\">\n					<li>입력하신 매장명 또는 지역명을 다시 확인해 주세요.</li>\n					<li>관련 문의는 고객센터 (1544-5418)로 연락주세요.</li>\n				</ul>\n			</div>\n		</div>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});