this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["favorite-store-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "    \n    		<div class=\"panel store\">\n			<div class=\"store_wrap\">\n				<h3 class=\"store_title\">"
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "</h3>\n				    <span class=\"check_wrap star\">\n                        <input type=\"radio\"  name=\"rep\" id=\""
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "\" value=\""
    + alias4(((helper = (helper = helpers.storeSn || (depth0 != null ? depth0.storeSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeSn","hash":{},"data":data}) : helper)))
    + "\" "
    + alias4((helpers.checkedIf || (depth0 && depth0.checkedIf) || alias2).call(alias1,(depth0 != null ? depth0.defaultStoreYn : depth0),{"name":"checkedIf","hash":{},"data":data}))
    + ">\n                        <label for=\""
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "\">기본매장</label>\n                    </span>\n			</div>\n			<div class=\"store_info\">\n				<p class=\"store_addr\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address1 : stack1), depth0))
    + "	\n					<a href=\"tel:"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "\" class=\"store_phone\">"
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1), depth0))
    + "</a><!--/*20180622 : 전화연결 수정*/-->\n\n				</p>\n			<!-- open시 해당 영역에 class=\"on\" 이 들어간다. -->\n				<div class=\"store_btn_wrap\">\n					<button class=\"btn_md w50p map_call\" latitude=\""
    + alias4(((helper = (helper = helpers.latitude || (depth0 != null ? depth0.latitude : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"latitude","hash":{},"data":data}) : helper)))
    + "\" longitude=\""
    + alias4(((helper = (helper = helpers.longitude || (depth0 != null ? depth0.longitude : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"longitude","hash":{},"data":data}) : helper)))
    + "\">지도보기</button>\n					<button class=\"btn_md w50p del\" value=\""
    + alias4(((helper = (helper = helpers.storeSn || (depth0 != null ? depth0.storeSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeSn","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + alias4(((helper = (helper = helpers.storeName || (depth0 != null ? depth0.storeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"storeName","hash":{},"data":data}) : helper)))
    + "\">단골해제</button>\n				</div>\n\n				<div class=\"store_map_wrap\">\n					<div class=\"map_area\"></div>\n				</div>\n			</div>\n		</div>\n    \n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel store\">\n    		<div class=\"page_btns store\">\n        		<a href=\"/cs/takeOut\" class=\"btn_md_bordered\">테이크 아웃 서비스 알아보기 </a>\n        	</div>\n        	<div class=\"service_wrap\">\n        		<h4 class=\"h_title cont\"><b>서비스 운영시간</b><b class=\"time\">오전 11시 ~ 오후 9시</b></h4>\n        		<ul class=\"list_bullet_dot\">\n            		<li>매장에서 상품 준비가 완료되면 고객님께 SMS가 발송됩니다.(운영시간 내 수령 가능)</li>\n                	<li>매장의 재고 보유 현황에 따라 선택한 상품의 판매 상태가 달라질 수 있습니다.</li>\n             	<li>SMS발송 전 매장을 방문하시면, 상품 준비에 시간이 소요될 수 있습니다.</li>\n               	<li>매장 별로 휴무일이 다를 수 있습니다.</li>\n              	</ul>    \n       	</div>                                                                                          		               			                                 		\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});