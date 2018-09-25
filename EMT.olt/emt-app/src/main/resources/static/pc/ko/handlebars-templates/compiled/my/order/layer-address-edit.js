this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["layer-address-edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<dl>\n						<dt><label for=\"addr_phone\">주소</label></dt>\n						<dd class=\"ui_find_addresses\">\n							<div class=\"w100p input_btn_wrap\">\n								<div class=\"input_wrap\">\n									<input type=\"text\" class=\"address_keyword\" title=\"지역명 입력\" placeholder=\"지역명\">\n								</div>\n								<button type=\"button\" class=\"btn_md_form btn_address_find\">찾기</button>\n							</div>\n							<div class=\"input_group w100p\">\n								<span class=\"input_wrap w25p\"><input type=\"text\" class=\"post_code\" name=\"recipientAddress.zipCode\" title=\"우편번호 입력\" placeholder=\"우편번호\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.zipCode : stack1), depth0))
    + "\" readonly></span>\n								<span class=\"gap\">&nbsp;</span>\n								<span class=\"input_wrap\"><input type=\"text\" class=\"address_first\" name=\"recipientAddress.address1\" title=\"기본주소 입력\" placeholder=\"기본주소\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address1 : stack1), depth0))
    + "\" readonly></span>\n							</div>\n							<div class=\"input_wrap w100p\"><input type=\"text\" id=\"address2\" class=\"address_last\" name=\"recipientAddress.address2\" title=\"상세주소 입력\" placeholder=\"상세주소\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.recipientAddress : stack1)) != null ? stack1.address2 : stack1), depth0))
    + "\" required=\"required\" data-msg-required=\"상세주소를 입력해 주세요.\"/></div>\n							<p class=\"text_notice\">찾으시는 주소지 또는 건물명을 입력해 주세요.<br>(예 : 강남대로, 한강로2가, 한강대로 100)</p>\n						</dd>\n					</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<dt class=\"layer_title\">배송지 추가/수정</dt>\n<dd class=\"layer_cont address_management\">\n	<div class=\"clear\">\n		<ul class=\"list_bullet_dot\">\n			<li>설정된 배송지 정보를 수정해 주시기 바랍니다.</li>\n		</ul>\n	</div>\n	<form id=\"f_shipAddressInfo\" class=\"validate\">\n		<fieldset class=\"form mgt20\">\n			<div class=\"ui_table\">\n				<input type=\"hidden\" name=\"shipAddressTypeCode\" value=\""
    + alias2(alias1((depth0 != null ? depth0.code : depth0), depth0))
    + "\">\n				<dl>\n					<dt><label for=\"name\">이름</label></dt>\n					<dd>\n						<div class=\"input_wrap w100p\"><input type=\"text\" name=\"recipientName.name1\" value=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.recipientName : stack1)) != null ? stack1.name1 : stack1), depth0))
    + "\" user-name=\"user-name\" required=\"required\" data-msg-required=\"이름을 입력해 주세요.\"/></div>\n					</dd>\n				</dl>\n				<dl>\n					<dt><label for=\"addr_phone\">휴대전화</label></dt>\n					<dd>\n						<div class=\"input_wrap w100p\"><input type=\"text\" name=\"recipientPhoneNo1.phoneNo\"  value=\""
    + alias2((helpers.removeSC || (depth0 && depth0.removeSC) || alias4).call(alias3,((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.recipientPhoneNo1 : stack1)) != null ? stack1.phoneNo : stack1),{"name":"removeSC","hash":{},"data":data}))
    + "\" digits=\"digits\" mobile-number=\"mobile-number\" required=\"required\" data-msg-required=\"휴대폰번호를 입력해 주세요.\"/></div>\n					</dd>\n				</dl>\n"
    + ((stack1 = helpers["if"].call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depth0 != null ? depth0.code : depth0),"ShipAddressInput",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<dl>\n					<dt><label for=\"addr_phone\">배송시<br>요청사항선택</label></dt>\n					<dd><!--/* 20180511 : 셀렉트에서 인풋으로 변경 */-->\n						<div class=\"input_wrap w100p\"><input type=\"text\" name=\"shipMsg\"  placeholder=\"\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.shipMsg : stack1), depth0))
    + "\"/></div>\n					</dd>\n				</dl>\n			</div>\n		</fieldset>\n	</form>\n\n	<div class=\"page_btns\">\n		<button type=\"button\" class=\"btn_lg_secondary\" id=\"b_adrCancel\">취소</button>\n		<button type=\"button\" class=\"btn_lg_neutral\" id=\"b_chgAddress\">등록</button>\n	</div>\n</dd>";
},"useData":true});