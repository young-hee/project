this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["layer-find-address"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"layer_popup fullpage btn_y bg_w\">\n	<div class=\"layer_wrap\">\n		<dl class=\"layer\">\n			<dt class=\"layer_title\">배송지 추가</dt>\n			<dd class=\"layer_cont\">\n\n				<div class=\"section search_address ui_find_addresses\">\n					<div class=\"step1\">\n						<fieldset class=\"search_form\">\n							<legend class=\"sr_only\">우편번호 검색</legend>\n							<div class=\"input_wrap\">\n								<!-- 결과 템플레이트 화면 변경 -->\n								<span id=\"find-address-result-template\" style=\"display: none;\">order.layer-find-address-result-template</span>\n								<input type=\"text\" class=\"find_addresses_input\" title=\"우편번호 검색어 입력\" placeholder=\"도로명, 건물명, 번지로 검색해주세요\">\n								<button type=\"button\" class=\"btn_del\"><i class=\"ico_close_s_w\"></i><span class=\"sr_only\">검색어 삭제</span></button>\n								<button type=\"button\" class=\"btn_search btn_find_addresses\"><i class=\"ico_search_p\"></i><span class=\"sr_only\">검색</span></button>\n							</div>\n						</fieldset>\n						<dl class=\"dl_cont\">\n							<dt>우편번호 통합검색 Tip</dt>\n							<dd>\n								<p class=\"text\">도로명 + <b>건물번호</b> (예 : 송파대로 570)<br>동/읍/면/리 + <b>번지/</b> (예 : 신천동 7-30)<br>건물명, 아파트명 (예 : 반포자이아파트)</p>\n							</dd>\n						</dl>\n					</div>\n\n					<!-- btn_search버튼 누른 후 검색결과 나오는부분 -->\n					<div class=\"step2\" style=\"display: block;\">\n						<div class=\"address_list\"></div>\n					</div>\n				</div>\n			</dd>\n		</dl>\n		<div class=\"layer_btns\">\n			<button type=\"button\" id=\"btnFindAddrReg\" class=\"btn_h50_pp\" disabled>등록하기</button> <!--add_input내용 다 들어가면 disabled 빼주시면 됩니다-->\n		</div>\n		<button class=\"layer_close\" type=\"button\"><i class=\"ico_close\"></i><span class=\"sr_only\">레이어 닫기</span></button>\n		<!-- 로그인 여부 저장 -->\n		<span id=\"isLoginedMember\" style=\"display: none;\"></span>\n	</div>\n</div>\n\n\n<script>\n	var findAddrObj = {};\n\n	$( document ).ready(function() {\n\n		// 주소 찾기 초기화\n		$( '.ui_find_addresses' ).findAddresses();\n		//주소입력창 포커스\n		setTimeout(function() {\n			$( '.find_addresses_input' ).focus();\n		}, 500);\n\n	});\n\n	/** 주소 선택시 결과 이벤트 */\n	$('.ui_find_addresses').on('change-address', function (e) {\n\n		console.log( e.selIndex, e.postCode, e.address, e.detailAddress );\n\n		findAddrObj.selIndex = e.selIndex;\n		findAddrObj.postCode = e.postCode;\n		findAddrObj.address = e.address;\n		findAddrObj.detailAddress = e.detailAddress;\n\n		//등록하기 버튼 활성화\n		$(\"#btnFindAddrReg\").removeProp(\"disabled\");\n\n		//열렸던 모든 상세주소 입력창 숨기기\n		$(\".add_input\").hide();\n		//선택된 상세주소 입력창 보이기\n		$(\"#addInput\" + e.selIndex).show();\n\n	});\n\n	/** 주소 등록하기 버튼 이벤트 */\n	$(\"#btnFindAddrReg\").on(\"click\", function() {\n\n		var inputDetail = $(\"#inputDetail\" + findAddrObj.selIndex);\n		var inputDetailName = $(\"#inputDetailName\" + findAddrObj.selIndex);\n		var inputDetailHp = $(\"#inputDetailHp\" + findAddrObj.selIndex);\n\n		if(inputDetailName.val() == '') {\n			AP.modal.alert(\"받는고객 이름을 입력해 주세요.\").addListener( 'modal-close', function (e) {\n				inputDetailName.focus();\n			});\n			return;\n		}\n		if(inputDetailHp.val() == '') {\n			AP.modal.alert(\"받는고객 휴대폰 번호를 입력해 주세요.\").addListener( 'modal-close', function (e) {\n				inputDetailHp.focus();\n			});\n			return;\n		}\n\n		//배송지 추가 화면으로 선택된 값들을 보낸다.\n		var isLoginedMember = $(\"#isLoginedMember\").text();\n		if(isLoginedMember == \"true\") {\n			//회원 새로운 주소지 수정/추가\n			addMemberAddr(inputDetailName.val(), inputDetailHp.val(), findAddrObj.postCode, findAddrObj.address + findAddrObj.detailAddress, inputDetail.val());\n		} else {\n			//비회원 새로운 주소지 수정/추가\n			addNonMemberAddr(inputDetailName.val(), inputDetailHp.val(), findAddrObj.postCode, findAddrObj.address + findAddrObj.detailAddress, inputDetail.val());\n		}\n\n		//주소찾기 clear\n		$( '.ui_find_addresses' ).findAddresses( 'clear' );\n\n		//모달 close\n		closeLayerFindAddress();\n\n	});\n\n</script>";
},"useData":true});