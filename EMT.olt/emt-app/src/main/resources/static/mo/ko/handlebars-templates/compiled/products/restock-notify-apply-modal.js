this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["restock-notify-apply-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "										<option value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"panel\">\n	<form action=\"\" class=\"validate\">\n		<p class=\"text\">언제들어와? SMS예약 신청을 하시면,<br><em>일시품절/품절/판매중지 된 상품이 재입고가 되어 판매가 시작될 때</em> 회원님의 휴대폰으로 판매시작 개시알림 메시지를 발송해드립니다. 단, 상품구매자가 많을 경우 재고가 빨리 소진될 수 있으니 이점 유의하시기 바랍니다. </p>\n		<hr class=\"div m20\">\n		<fieldset class=\"form\">\n			<legend class=\"sr_only\">알림신청 정보입력</legend>\n			<div class=\"dl\">\n				<dl>\n					<dt><label for=\"alarm_01\">상품명 &nbsp;&nbsp;<b>"
    + alias2(alias1((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</b></label></dt>\n					<dd>\n						<div class=\"input_group\">\n							<div>\n								<select name=\"prodSn\" required data-msg=\"옵션을 선택해 주세요\">\n									<option value=\"\">옵션을 선택해 주세요.</option>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</select>\n							</div>\n						</div>\n					</dd>\n				</dl>\n				<dl>\n					<dt><label for=\"alarm_02\">신청자 &nbsp;&nbsp;<b>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.memberMap : depth0)) != null ? stack1.name : stack1), depth0))
    + "</b></label></dt>\n					<dd>\n						<div class=\"input_group\">\n							<div>\n								<input type=\"tel\" name=\"prePhoneNo\" placeholder=\"휴대폰 번호\" value=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.memberMap : depth0)) != null ? stack1.phoneNo1 : stack1), depth0))
    + "\" required mobile-number=\"true\">\n							</div>\n						</div>\n						<p class=\"bullet_dot font_sm mgt10\">휴대전화 번호를 확인해 주시고 변경되셨다면 수정해 주세요.</p>\n					</dd>\n				</dl>\n				<dl>\n					<dt>SMS(LMS) 수신여부</dt>\n					<dd>\n						<div class=\"check_set\">\n							<span class=\"check_wrap\"><input type=\"radio\" name=\"smsAgreeYn\" id=\"sms_agreement_yes\" value=\"Y\" checked required><label for=\"sms_agreement_yes\">예</label></span>\n							<span class=\"check_wrap\"><input type=\"radio\" name=\"smsAgreeYn\" id=\"sms_agreement_no\" value=\"N\"><label for=\"sms_agreement_no\">아니오</label></span>\n						</div>\n					</dd>\n				</dl>\n			</div>\n		</fieldset>\n		<div class=\"panel gray mgt30\">\n			<dl class=\"dl_cont\">\n				<dt class=\"h_title font_md\"><b>유의사항</b></dt>\n				<dd>\n					<ul class=\"list_bullet_dot\">\n						<li><b>SMS 서비스는 수신을 허락한 회원님만 이용 가능</b>하므로, 수신여부란에 ＇예’로 체크되어  있어야 합니다. 신청하기 버튼을 클릭하시면 회원정보가 변경됩니다.</li>\n						<li><b>카카오 알림톡은 에뛰드 카카오톡 플러스 친구를 맺지 않아도 받으실 수 있는 정보성  메시지</b>이며 이는 정통망법관련 한국인터넷진흥원 가이드상 <b>‘광고성 정보의 예외’</b> 중  이용자 보호 차원에서 서비스에 적합하다고 보는 일부에 한합니다. <strong>주문/예약 확인,  결제 내역, 배송 현황 메시지 등이 이에 해당</strong>하며 구독자 대상의 뉴스레터나 일방적인  공지문은 포함되지 않으니 안심하시기 바랍니다.</li>\n					</ul>\n				</dd>\n			</dl>\n		</div>\n\n		<input type=\"hidden\" name=\"onlineProdSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.onlineProdSn : depth0), depth0))
    + "\">\n\n		<div class=\"page_btns\">\n			<button type=\"button\" class=\"btn_md_secondary btn_default_modal_cancel\"><span>취소</span></button>\n			<button type=\"submit\" class=\"btn_md_primary btn_submit\"><span>신청하기</span></button>\n		</div>\n	</form>\n</div>";
},"useData":true});