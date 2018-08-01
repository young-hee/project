this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["shipping-info"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"panel\">\n	<form class=\"validate\" method=\"post\" enctype=\"multipart/form-data\">\n		<input type=\"hidden\" name=\"eventParticipantSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\">\n		<input type=\"hidden\" name=\"memberSn\" value=\""
    + alias2(alias1((depth0 != null ? depth0.memberSn : depth0), depth0))
    + "\">\n\n		<h3 class=\"h_title cont\"><strong>당첨내역</strong></h3>\n		<br>\n		<div class=\"panel gray\">\n			<div class=\"ui_table\">\n				<dl>\n					<dt class=\"w30p\">당첨자</dt>\n					<dd class=\"name\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.member : depth0)) != null ? stack1.name : stack1), depth0))
    + "</dd>\n				</dl>\n				<dl>\n					<dt class=\"w30p\">사은품</dt>\n					<dd class=\"prd_name\">"
    + alias2(alias1((depth0 != null ? depth0.productName : depth0), depth0))
    + "</dd>\n				</dl>\n			</div>\n		</div>\n		<hr class=\"div m30\">\n\n		<fieldset class=\"form\">\n			<legend class=\"sr_only\">배송정보 입력</legend>\n			<h3 class=\"h_title cont\"><strong>배송 정보</strong></h3>\n			<div class=\"check_wrap mgt15\">\n				<input type=\"checkbox\" id=\"check01\" class=\"load_info\">\n				<label for=\"check01\">회원정보 불러오기</label>\n			</div>\n			<div class=\"input_group mgt15\">\n				<div class=\"label\">\n					<label for=\"name\">이름</label>\n				</div>\n				<div>\n					<input type=\"text\" name=\"name\" id=\"name\" required=\"required\" data-msg-required=\"이름을 입력해 주세요.\" placeholder=\"이름을 입력하세요.\">\n				</div>\n			</div>\n\n			<div class=\"input_group\">\n				<div class=\"label\">\n					<label for=\"telNo1\">휴대폰 번호</label>\n				</div>\n				<div>\n					<input type=\"text\" name=\"telNo1\" id=\"telNo1\" required=\"required\" placeholder=\"'-'없이 숫자만 입력\" data-msg-required=\"휴대폰번호를 입력해 주세요.\" mobile-number=\"mobile-number\" data-msg-mobile-number=\"휴대폰 번호를 정확히 입력하세요.\">\n				</div>\n			</div>\n\n			<dl class=\"dl mgt20\">\n				<dt>주소</dt>\n				<dd>\n					<p class=\"text_notice pdb10\">찾으시는 주소지 또는 건물명을 입력해 주세요.<br>(예 : 강남대로, 한강로2가, 한강대로 100)</p>\n					<div class=\"ui_find_addresses\">\n						<div class=\"input_group\">\n							<div>\n								<input type=\"text\" name=\"address_keyword\" id=\"delivery_area\" class=\"find_addresses_input\" placeholder=\"주소지 또는 건물명\">\n							</div>\n							<div class=\"btn\">\n								<button type=\"button\" class=\"btn_find_addresses\">찾기</button>\n							</div>\n						</div>\n						<div class=\"address_list\"></div>\n						<div class=\"input_group\">\n							<div class=\"input_wrap\">\n								<input type=\"hidden\" class=\"post_code\" name=\"post_code\" title=\"우편번호 입력\" readonly=\"\" required=\"required\" data-msg-required=\"주소를 입력해 주세요.\">\n								<input type=\"hidden\" name=\"address_first\" title=\"기본주소 입력\">\n								<input type=\"text\" name=\"address_first\" class=\"address_first\" title=\"기본주소 입력\" placeholder=\"주소를 입력해주세요.\" readonly=\"\" required=\"required\" data-msg-required=\"주소를 입력해 주세요.\">\n							</div>\n						</div>\n						<div class=\"input_group\">\n							<div class=\"input_wrap\">\n								<input type=\"text\" name=\"address_last\" class=\"address_last\" title=\"상세주소 입력\" placeholder=\"상세주소를 입력해주세요.\">\n							</div>\n						</div>\n					</div>\n				</dd>\n\n				<input type=\"hidden\" name=\"address\">\n			</dl>\n\n			<dl class=\"dl mgt20\">\n				<dt>개인정보 수집 및 이용 동의 (필수)</dt>\n				<dd>\n					<div class=\"panel bordered\">\n						<ul class=\"list_bullet_dot\">\n							<li>수집 및 이용 항목 : 배송 정보</li>\n							<li>수집 및 이용 목적 : 경품 배송</li>\n							<li>이용·보유 및 이용 기간 : 발송후 3개월뒤 삭제</li>\n						</ul>\n					</div>\n					<ul class=\"text_notice mgt10\">\n						<li>신청자는 개인정보 수집 및 이용 동의에 거부할 수 있습니다. 다만, 거부할 경우 경품 발송이 불가능 합니다.</li>\n					</ul>\n					<div class=\"check_wrap mgt10\">\n						<input type=\"checkbox\" id=\"termsAgreeYn\" name=\"termsAgreeYn\" value=\"Y\" required=\"required\" data-msg-required=\"개인정보 수집 및 이용 동의가 필요합니다.\">\n						<label for=\"termsAgreeYn\">동의합니다.</label>\n					</div>\n				</dd>\n			</dl>\n\n			<div class=\"form_btns\">\n				<button class=\"btn_md_secondary reset\" type=\"button\">다시작성</button>\n				<button class=\"btn_md_neutral regist\" type=\"button\">등록</button>\n			</div>\n		</fieldset>\n\n		<div class=\"panel gray mgt20\">\n			<dl class=\"dl_cont\">\n				<dt class=\"h_title cont\">사은품 배송관련</dt>\n				<dd>\n					<ul class=\"list_bullet_dot\">\n						<li>배송이 필요한 시간은 주간 단위로 매주 0요일에 일괄 배송업체로 전달됩니다.</li>\n						<li>회원정보가 잘못되어 반품되거나 연락이 불가능할 경우 재배송이 되지 않으며, 신청 후 탈퇴한 경우 신청이 취소됩니다.</li>\n						<li>사은품 신청 후 주소 변경 긴급 문의 및 사은품 파손 교체 문의는 고객센터로 문의해 주시기 바랍니다.</li>\n					</ul>\n				</dd>\n			</dl>\n		</div>\n	</form>\n</div>";
},"useData":true});