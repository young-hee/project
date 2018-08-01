this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["fullpage-address-edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<h3 class=\"form_title\">주소지 입력 <small>(필수입력)</small></h3>\n\n					<fieldset class=\"form\">\n						<legend class=\"sr_only\">주소 입력</legend>\n						<p class=\"text_notice\">찾으시는 주소지 또는 건물명을 입력해 주세요.<br>(예 : 강남대로, 한강로2가, 한강대로 100)</p>\n						<div class=\"ui_find_addresses\">\n							<div class=\"input_group\">\n								<div>\n									<input type=\"text\" id=\"delivery_area\" class=\"find_addresses_input\" placeholder=\"주소지 또는 건물명\" data-msg=\"주소를 입력해주세요\">\n								</div>\n								<div class=\"btn\">\n									<button type=\"button\" class=\"btn_find_addresses\">찾기</button>\n								</div>\n							</div>\n							<!-- 지역 검색 결과 -->\n							<div class=\"address_list\"></div>\n							<!-- //지역 검색 결과 -->\n\n							<div class=\"input_group\">\n								<div class=\"input_wrap\">\n\n									<input type=\"hidden\" class=\"post_code\" name=\"recipientAddress.zipCode\" id=\"recipientAddress.zipcode\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.zipCode : stack1), depth0))
    + "\">\n									<input type=\"text\" title=\"기본주소 입력\" class=\"address_first\" placeholder=\"주소\" readonly=\"\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address1 : stack1), depth0))
    + "\" required=\"required\" data-msg=\"주소를 입력해주세요\">\n									<input type=\"hidden\" class=\"address_first\" name=\"recipientAddress.address1\" id=\"recipientAddress.address1\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address1 : stack1), depth0))
    + "\">\n\n								</div>\n							</div>\n							<div class=\"input_group\">\n								<div class=\"input_wrap\"><input type=\"text\" class=\"address_last\" name=\"recipientAddress.address2\" title=\"상세주소 입력\" placeholder=\"상세주소를 입력해주세요.\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address2 : stack1), depth0))
    + "\" data-msg=\"상세주소를 입력해 주세요\"></div>\n							</div>\n						</div>\n					</fieldset>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<input type=\"hidden\" name=\"cStoreName\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreName : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStorePhoneNo.phoneNo\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStorePhoneNo : stack1)) != null ? stack1.phoneNo : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreDockNo\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreDockNo : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreCenterName\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreCenterName : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreAddress.zipCode\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreAddress : stack1)) != null ? stack1.zipCode : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreAddress.address1\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreAddress : stack1)) != null ? stack1.address1 : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreAddress.address2\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreAddress : stack1)) != null ? stack1.address2 : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreArrivalAreaCode\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreArrivalAreaCode : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreArrivalAreaBarcode\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreArrivalAreaBarcode : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreDongNmCode\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreDongNmCode : stack1), depth0))
    + "\">\n					<input type=\"hidden\" name=\"cStoreArrivalDongNm\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.cStoreArrivalDongNm : stack1), depth0))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<dl class=\"layer\">\n	<dt class=\"layer_title\">배송정보 수정</dt>\n	<dd class=\"layer_cont\">\n		<div class=\"panel\">\n			<h2 class=\"h_title page\">배송지 정보 수정</h2>\n			<ul class=\"list_bullet_dot type2\">\n				<li>설정된 배송지 정보를 수정해 주시기 바랍니다.</li>\n			</ul>\n			<hr class=\"div m30\" />\n			<h3 class=\"form_title\">기본정보 <small>(필수입력)</small></h3>\n\n			<form class=\"validate\" id=\"shipForm\" name=\"shipForm\">\n\n				<input type=\"hidden\" name=\"shipAddressTypeCode\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipAddressTypeCode : stack1), depth0))
    + "\">\n				<fieldset class=\"form\">\n					<legend class=\"sr_only\">배송지 추가/수정</legend>\n					<div class=\"input_group\">\n						<div class=\"label w30p\">\n							<label for=\"\">받는 사람</label>\n						</div>\n						<div>\n							<input type=\"text\" name=\"recipientName.name1\" placeholder=\"받는 분 성함을 입력해 주세요.\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientName : stack1)) != null ? stack1.name1 : stack1), depth0))
    + "\" required=\"required\" user-fullname=\"user-fullname\" data-msg=\"받는 분 성함을 입력해 주세요.\">\n						</div>\n					</div>\n					<div class=\"input_group\">\n						<div class=\"label w30p\">\n							<label for=\"delivery_phone\">휴대전화</label>\n						</div>\n						<div>\n							<input type=\"tel\" name=\"recipientPhoneNo1.phoneNo\" placeholder=\"- 없이 입력해 주세요.\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.recipientPhoneNo1 : stack1)) != null ? stack1.phoneNo : stack1), depth0))
    + "\" required=\"required\" mobile-number=\"mobile-number\" data-msg=\"휴대폰 번호를 입력해 주세요\">\n						</div>\n					</div>\n				</fieldset>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipAddressTypeCode : stack1),"===","ShipAddressInput",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "				<h3 class=\"form_title\">배송 메세지 <small>(필수입력)</small></h3>\n				<fieldset class=\"form\">\n					<legend class=\"sr_only\">부가정보 입력</legend>\n					<div class=\"input_group default\">\n						<div>\n							<input type=\"text\" name=\"shipMsg\" id=\"delivery_title\" placeholder=\"배송지명을 입력해 주세요.\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.data : depth0)) != null ? stack1.shipMsg : stack1), depth0))
    + "\" required=\"required\" data-msg=\"배송 메세지를 입력해주세요.\">\n						</div>\n					</div>\n\n				</fieldset>\n			</form>\n			<div class=\"form_btns\">\n				<a href=\"#none\" class=\"btn_lg_secondary\" id=\"editShipCancel\">취소</a>\n				<a href=\"javascript:void(0);\" onclick=\"editShipAddress();\" class=\"btn_lg_neutral\">등록</a>\n			</div>\n		</div>\n	</dd>\n</dl>";
},"useData":true});