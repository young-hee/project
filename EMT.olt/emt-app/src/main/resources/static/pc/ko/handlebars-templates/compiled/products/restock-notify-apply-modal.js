this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["restock-notify-apply-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "								<option value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<form action=\"\" class=\"validate\">\n	<p class=\"text font_lg light\">언제들어와? SMS예약 신청을 하시면, <em>일시품절/품절/판매중지 된 상품이 재입고가 되어 판매가 시작될 때</em> 회원님의 휴대폰으로 판매시작 개시알림 메시지를 발송해드립니다.<br>\n		단, 상품구매자가 많을 경우 재고가 빨리 소진될 수 있으니 이점 유의하시기 바랍니다.\n	</p>\n\n	<fieldset class=\"form lined mgt30\">\n		<legend class=\"sr_only\">알림신청 정보입력</legend>\n		<div class=\"ui_table\">\n			<dl>\n				<dt class=\"w25p\">상품명</dt>\n				<dd><p class=\"text font_lg light\">"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</p></dd>\n			</dl>\n			<dl>\n				<dt class=\"w25p\">옵션</dt>\n				<dd>\n					<div class=\"select_wrap w100p\">\n						<select name=\"prodSn\" required data-msg=\"옵션을 선택해 주세요\">\n							<option value=\"\">옵션을 선택해 주세요.</option>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</select>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt class=\"w25p\">신청자</dt>\n				<dd><p class=\"text font_lg light\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.memberMap : depth0)) != null ? stack1.name : stack1), depth0))
    + "</p></dd>\n			</dl>\n			<dl>\n				<dt class=\"w25p\">휴대전화</dt>\n				<dd>\n					<div class=\"input_wrap w100p\"><input type=\"text\" title=\"휴대전화 입력\" placeholder=\"01011112222\" name=\"prePhoneNo\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.memberMap : depth0)) != null ? stack1.phoneNo1 : stack1), depth0))
    + "\" required mobile-number=\"true\"></div>\n				</dd>\n			</dl>\n			<dl>\n				<dt class=\"w25p\">SMS(LMS)수신여부</dt>\n				<dd>\n					<div class=\"check_set\">\n						<span class=\"check_wrap\"><input type=\"radio\" name=\"smsAgreeYn\" id=\"sms_agreement_yes\" value=\"Y\" checked required><label for=\"sms_agreement_yes\">예</label></span>\n						<span class=\"check_wrap\"><input type=\"radio\" name=\"smsAgreeYn\" id=\"sms_agreement_no\" value=\"N\"><label for=\"sms_agreement_no\">아니오</label></span>\n					</div>\n				</dd>\n			</dl>\n		</div>\n		<ul class=\"list_bullet_dot light mgt30\">\n			<li>\n				<b>SMS 서비스는 수신을 허락한 회원님만 이용 가능</b>하므로, 수신여부란에 ‘예’로 체크되어 있어야 합니다. 신청하기 버튼을 클릭하시면 회원정보가 변경됩니다.\n			</li>\n			<li>\n				<b>카카오 알림톡은 에뛰드 카카오톡 플러스 친구를 맺지 않아도 받으실 수 있는 정보성 메시지</b>이며 이는 정통망법관련 한국인터넷진흥원 가이드상 ‘<b>광고성\n				정보의 예외</b>’ 중 이용자 보호 차원에서 서비스에 적합하다고 보는 일부에 한합니다.\n			</li>\n			<li>\n				<b>주문/예약 확인, 결제 내역, 배송 현황 메시지 등이 이에 해당</b>하며 구독자 대상의 뉴스레터나 일방적인  공지문은 포함되지 않으니 안심하시기 바랍니다.\n			</li>\n		</ul>\n\n		<input type=\"hidden\" name=\"onlineProdSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\">\n\n		<div class=\"form_btns\">\n			<button type=\"button\" class=\"btn_lg_secondary btn_default_modal_cancel\">취소</button>\n			<button type=\"submit\" class=\"btn_lg_primary btn_submit\">신청하기</button>\n		</div>\n	</fieldset>\n</form>";
},"useData":true});