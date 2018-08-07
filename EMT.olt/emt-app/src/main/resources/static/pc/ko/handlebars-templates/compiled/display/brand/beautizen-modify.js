this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["beautizen-modify"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " checked=\"checked\" ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "\n<div class=\"attach_photo ui_input_images\" data-single-input=\"true\">\n	<div class=\"img attach\">\n		<img src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.fileUrl : stack1), depth0))
    + "\" >\n	</div>\n	<label for=\"attach_photo\" class=\"btn_sm_tm_bordered\">사진 등록</label>\n	<input type=\"file\" id=\"attach_photo\" name=\"picture\" multiple=\"multiple\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" required=\"required\" data-msg-required=\"사진을 등록하세요.\">\n	<br>\n	<p class=\"text_center\">120X160 최적화</p>\n</div>\n<div>\n	<h3 class=\"h_title lare\">뷰티즌 지원서 작성</h3>\n	<p class=\"text\">아래 정보를 입력해주세요.</p>\n	<div class=\"panel gray bdr_top\">\n		<h4 class=\"h_title sub\">지원자 기본정보(필수)</h4>\n		<div class=\"ui_table\">\n			<dl>\n				<dt>아이디</dt>\n				<dd>\n					<p class=\"text font_lg\" th:text=\"${'memberMap.id'}\"></p>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"phone\">휴대폰 번호</label></dt>\n				<dd>\n					<span class=\"input_group input_phone \">\n						<span class=\"select_wrap\">\n							<select title=\"통신사 선택\" id=\"phoneCorp\" name=\"phoneCorp\" required=\"required\"  data-msg-required=\"통신사를 선택해 주세요.<br>Please select a your carrier.\">\n								<option value=\"\" >통신사 선택</option>\n							</select>\n						</span>\n						<span class=\"gap\"></span>\n						<span class=\"input_wrap\">\n							<input type=\"text\" name=\"prePhoneNo\" title=\"휴대폰 번호 입력\" maxlength=\"11\" placeholder=\"‘-’제외 숫자 입력\" required=\"required\" mobile-number=\"mobile-number\" data-msg-required=\"휴대폰번호를 입력해 주세요.<br>Please enter your phone number.\" data-msg=\"유효하지 않은 휴대폰 번호 입니다.\"></span>\n\n						</span>\n					<div class=\"btn\">\n						<button class=\"btn_md_form\" id =\"certBtn\" name=\"certBtn\" type=\"button\">인증요청</button>\n                       	<button class=\"btn_md_form\" id=\"reCertBtn\" style=\"display: none;\" type=\"button\">재인증요청</button>\n                    </div>\n				</dd>\n			</dl>\n			<dl>\n				<dt class=\"vtop pdt10\"><label for=\"number2\">인증번호</label></dt>\n				<dd>\n					<div>\n						<div class=\"input_wrap\">\n							<input type=\"text\" id=\"number2\" name=\"smsNum\" placeholder=\"6자리 입력\" title=\"인증번호 6자리 입력\" number=\"number\" length=\"6\" maxlength=\"6\" required=\"required\" data-msg-required=\"인증번호를 입력해 주세요.<br>Please enter your verification code.\" data-msg=\"유효하지 않은 인증번호 입니다.\">\n							<em class=\"count\" name=\"timer\">3:00</em>\n						</div> \n						<div class=\"btn\">\n						<!--<button type=\"button\" id=\"extTimeBtn\">시간 연장</button>-->\n						<br>\n						<button type=\"button\" class=\"btn_md_form w100p certification_btn\" disabled>인증 확인</button>\n						\n						<br>\n						<ul class=\"list_bullet_dot\">\n							<li>3분 이내에 인증번호를 입력하셔야 합니다.</li>\n							<li>입력 시간 초과 시 재전송 버튼을 눌러주세요.</li>\n						</ul>\n					</div>\n					\n				</dd>\n				<input type=\"text\" name=\"verifyCertification\" required=\"required\" data-msg-required=\"휴대폰 인증을 해주세요.\" style=\"visibility: hidden; height:0px\">\n			</dl>\n			<dl>\n				<dt>성별</dt>\n				<dd>\n					<span class=\"check_wrap\">\n						<input type=\"radio\" name=\"genderCode\" id=\"female\" value=\"FeMale\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.genderCode : depth0),"==","FeMale",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n							<label for=\"female\">여자</label>\n					</span>\n					<span class=\"check_wrap\">\n						<input type=\"radio\" name=\"genderCode\" id=\"male\" value=\"Male\"  "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.genderCode : depth0),"==","Male",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n							<label for=\"male\">남자</label>\n					</span>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"number\">생년월일</label></dt>\n				<dd>\n					<span class=\"input_wrap\"><input type=\"text\" value=\""
    + alias2(alias1((depth0 != null ? depth0.dob : depth0), depth0))
    + "\" name=\"dob\" id=\"number\" psnDtbr=\"psnDtbr\" fourteenOver=\"fourteenOver\" placeholder=\"생년월일 8자리 입력(ex: 20000101)\" required=\"required\" data-msg-required=\"생년월일을 입력해주세요.\"></span>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"blog_url\">홈페이지(블로그)</label></dt>\n				<dd>\n					<span class=\"input_wrap\"><input type=\"text\" value=\""
    + alias2(alias1((depth0 != null ? depth0.personalHomepageUrl : depth0), depth0))
    + "\" name=\"personalHomepageUrl\" id=\"blog_url\" placeholder=\"http://\"></span>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"sns_url\">SNS 주소</label></dt>\n				<dd>\n					<span class=\"input_wrap\">\n						<input type=\"text\" name=\"snsUrl\" id=\"sns_url\" value=\""
    + alias2(alias1((depth0 != null ? depth0.snsUrl : depth0), depth0))
    + "\" placeholder=\"http://\" required=\"required\" data-msg-required=\"페이스북을 입력해주세요.\">\n					</span>\n					<button class=\"btn_md_form snsUrl\" type=\"button\">등록</button>\n				</dd>\n			</dl>\n			<dl>\n				<dt class=\"vtop pdt10\"><label for=\"location\">거주지역</label></dt>\n				<dd>\n					<div class=\"select_wrap\">\n						<select name=\"preLocal\" id=\"preLocal\" tabindex=\"-1\">\n							<option value=\"\">지역 선택</option>\n						</select>\n					</div>\n				</dd>\n			</dl>\n		</div>\n	</div>\n\n	<div class=\"panel gray\">\n		<h4 class=\"h_title sub\">학력사항(필수)</h4>\n		<div class=\"ui_table\">\n			<dl>\n				<dt><label for=\"academic01\">학교</label></dt>\n				<dd>\n					<span class=\"input_wrap\"><input type=\"text\" value=\""
    + alias2(alias1((depth0 != null ? depth0.school : depth0), depth0))
    + "\" name=\"school\"id=\"academic01\" placeholder=\"학교를 입력해 주세요.\" required=\"required\" data-msg-required=\"학교를 입력하세요.\"></span>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"academic02\">학부/학과</label></dt>\n				<dd>\n					<span class=\"input_wrap\"><input type=\"text\" value=\""
    + alias2(alias1((depth0 != null ? depth0.faculty : depth0), depth0))
    + "\" name=\"faculty\" id=\"academic02\" placeholder=\"학부/학과를 입력해 주세요.\" required=\"required\" data-msg-required=\"학부/전공을 입력하세요.\"></span>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"academic03\">전공</label></dt>\n				<dd>\n					<span class=\"input_wrap\"><input type=\"text\" name=\"major\" value=\""
    + alias2(alias1((depth0 != null ? depth0.major : depth0), depth0))
    + "\" id=\"academic03\" placeholder=\"전공을 입력해 주세요.\" required=\"required\" data-msg-required=\"전공을 입력하세요.\"></span>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"academic04\">학년</label></dt>\n				<dd>\n					<div class=\"select_wrap\">\n						<select name=\"grade\" id=\"academic04\" tabindex=\"-1\" required=\"required\" data-msg-required=\"학년을 선택하세요.\">\n							<option value=\"\">학년 선택</option>\n						</select>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"academic05\">이수학기</label></dt>\n				<dd>\n					<div class=\"select_wrap\">\n						<select name=\"completeTerm\" id=\"academic05\" tabindex=\"-1\" required=\"required\" data-msg-required=\"이수학기를 선택하세요.\">\n							<option value=\"\">이수학기 선택</option>\n						</select>\n					</div>\n				</dd>\n			</dl>\n		</div>\n	</div>\n\n	<div class=\"panel gray\">\n		<h4 class=\"h_title sub\">자기소개(필수)</h4>\n		<div class=\"ui_table\">\n			<dl>\n				<dt class=\"vtop pdt10\"><label for=\"profile01\">자기소개 (필수)</label></dt>\n				<dd>\n					<div class=\"textarea\">\n						<textarea name=\"addQuestion1\" id=\"profile01\" cols=\"30\" rows=\"5\" maxlength=\"500\" placeholder=\" 500자 이내로 입력해주세요.\" required=\"required\" data-msg-required=\"자기소개를 입력해주세요.\">"
    + alias2(alias1((depth0 != null ? depth0.addQuestion1 : depth0), depth0))
    + "</textarea>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt class=\"vtop pdt10\"><label for=\"profile02\">뷰티즌 클럽 지원동기 (필수)</label></dt>\n				<dd>\n					<div class=\"textarea\">\n						<textarea name=\"addQuestion2\" id=\"profile02\" cols=\"30\" rows=\"5\" maxlength=\"500\" placeholder=\" 500자 이내로 입력해주세요.\" required=\"required\" data-msg-required=\"뷰티즌 클럽 지원동기를 입력해주세요.\">"
    + alias2(alias1((depth0 != null ? depth0.addQuestion2 : depth0), depth0))
    + "</textarea>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt class=\"vtop pdt10\"><label for=\"profile03\">본인이 하고싶은<br>뷰티 컨텐츠<br>컨셉을 자유롭게<br>적어주세요.(필수)</label></dt>\n				<dd>\n					<div class=\"textarea\">\n						<textarea name=\"addQuestion3\" id=\"profile03\" cols=\"30\" rows=\"5\" maxlength=\"500\" placeholder=\" 500자 이내로 입력해주세요.\" required=\"required\" data-msg-required=\"본인이 하고 싶은 뷰티 컨텐츠를 입력해주세요.\">"
    + alias2(alias1((depth0 != null ? depth0.addQuestion3 : depth0), depth0))
    + "</textarea>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"profile04\">유투브 영상 url 지원<br>가산점 적용(선택)</label></dt>\n				<dd>\n					<span class=\"input_wrap\"><input type=\"text\" name=\"addQuestion4\" id=\"profile04\" placeholder=\"http://\" value=\""
    + alias2(alias1((depth0 != null ? depth0.addQuestion4 : depth0), depth0))
    + "\"></span>\n				</dd>\n			</dl>\n		</div>\n	</div>\n\n	<div class=\"panel gray activities_history\">\n		<h4 class=\"h_title sub\">대외 활동(선택)</h4>\n		<div class=\"ui_table\" id=\"activity_0\">\n			<dl>\n				<dt class=\"vtop pdt10\">\n					<label for=\"activity01\"></label>\n				</dt>\n				<dd>\n					<span class=\"input_group\">\n						<span class=\"select_wrap\">\n							<select name=\"activityType\" id=\"activity01\" title=\"활동유형\">\n								<option value=\"\">유형 선택</option>\n							</select>\n						</span>\n					</span>\n					<button class=\"btn_md_form btn_add\" type=\"button\">추가</button>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"activity02\">활동명</label></dt>\n				<dd>\n					<span class=\"input_wrap\">\n						<input type=\"text\" name=\"activityName\" maxlength=\"50\" id=\"activity02\" placeholder=\"50자 이내로 입력해주세요.\">\n					</span>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"activity03\">활동기간</label></dt>\n				<dd>\n					<div class=\"input_group\">\n						<div class=\"input_wrap\">\n							<input type=\"text\" name=\"activityStartDate\" id=\"activity03\" placeholder=\"8자리 입력\" title=\"날짜 입력\" >\n						</div>\n						<span class=\"gap bul\">~</span>\n						<div class=\"input_wrap\">\n							<input type=\"text\" name=\"activityEndDate\" placeholder=\"8자리 입력\" title=\"날짜 입력\" >\n						</div>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt class=\"vtop pdt10\"><label for=\"activity04\">활동내용</label></dt>\n				<dd>\n					<div class=\"textarea\">\n						<textarea name=\"activityBodyText\" id=\"activity04\" cols=\"30\" maxlength=\"500\" rows=\"5\" placeholder=\" 500자 이내로 입력해주세요.\"></textarea>\n					</div>\n				</dd>\n				\n			</dl>\n		</div>\n	</div>\n\n	<div class=\"panel gray relative beautizen_agree_panel\">\n		<h4 class=\"h_title sub\">전체 동의합니다.</h4>\n		<span class=\"check_wrap beautizen_chk_wrap\">\n			<input type=\"checkbox\" name=\"check_all\" id=\"check_all\">\n				<label for=\"check_all\">전체 동의</label></span>\n\n		<dl class=\"mgt20\">\n			<dt class=\"vtop pdt10 relative\">\n				<label for=\"check_agree_1\">개인정보 수집/이용 동의(필수)</label>\n				<span class=\"check_wrap\"><input type=\"checkbox\" id=\"check_agree_1\" name=\"check_agree_1\" required=\"required\" data-msg-required=\"개인정보 수집/이용 동의에 동의해주세요.\"><label for=\"check_agree_1\">동의(필수)</label></span>\n			</dt>\n			<dd>\n				<div class=\"agree_list_wrap\" name=\"termsAgreeYn1\" >\n					<ul>\n						<li>- 수집 개인정보 항목 : 에뛰드 ID, 사진, 이름, 성별, 연락처(휴대전화번호), 생년월일, 홈페이지(블로그), SNS주소,)</li>\n						<li>- 수집 및 이용목적 : 뷰티즌 모집 지원자 확인 및 선정, 공지사항 전달</li>\n						<li>- 보유 및 이용기간 : 합격자 발표 후 1개월 (단, 합격자의 경우 활동 종료 시 까지)</li>\n					</ul>\n				</div>\n				<p class=\"mgt20\"><i class=\"ico_notice\"></i> 지원자는 개인정보 수집 및 이용동의에 거부할 수 있습니다. 다만, 거부할 경우 뷰티즌 지원이 불가능 합니다.</p>\n			</dd>\n		</dl>\n\n		<dl class=\"mgt20\">\n			<dt class=\"vtop pdt10 relative\">\n				<label for=\"check_agree_2\">민감정보 수집 및 이용동의(필수)</label>\n				<span class=\"check_wrap\"><input type=\"checkbox\" id=\"check_agree_2\" name=\"check_agree_2\" required=\"required\" data-msg-required=\"민감정보 수집 및 이용동의에 동의해주세요.\"><label for=\"check_agree_2\">동의(필수)</label></span>\n			</dt>\n			<dd>\n				<div class=\"agree_list_wrap\" name=\"termsAgreeYn2\" >\n					<ul >\n						<li>- 수집 및 이용항목 : 학력사항</li>\n						<li>- 수집 및 이용목적 : 뷰티즌 선발 지원자 확인</li>\n						<li>- 보유 및 이용기간 : 합격자 발표 후 1개월 (단, 합격자의 경우 활동 종료 시 까지)</li>\n					</ul>\n				</div>\n				<p class=\"mgt20\"><i class=\"ico_notice\"></i> 지원자는 개인정보 수집 및 이용동의에 거부할 수 있습니다. 다만, 거부할 경우 뷰티즌 지원이 불가능 합니다.</p>\n			</dd>\n		</dl>\n\n		<dl class=\"mgt20\">\n			<dt class=\"vtop pdt10 relative\">\n				<label for=\"check_agree_3\">개인정보 취급위탁에 대한 동의(필수)</label>\n				<span class=\"check_wrap\"><input type=\"checkbox\" id=\"check_agree_3\" name=\"check_agree_3\" required=\"required\" data-msg-required=\"개인정보 취급위탁에 대한 동의에 동의해주세요.\"><label for=\"check_agree_3\">동의(필수)</label></span>\n			</dt>\n			<dd>\n				<div class=\"agree_list_wrap\" name=\"termsAgreeYn3\">\n					<ul >\n						<li>- 수집 및 이용항목 : 학력사항</li>\n						<li>- 수집 및 이용목적 : 뷰티즌 선발 지원자 확인</li>\n						<li>- 보유 및 이용기간 : 합격자 발표 후 1개월 (단, 합격자의 경우 활동 종료 시 까지)</li>\n					</ul>\n				</div>\n			</dd>\n		</dl>\n	</div>\n\n	<div class=\"etc clear\">\n		<ul class=\"list_bullet_dot_gray\">\n			<li>상기 내용이 사실임을 증명합니다.</li>\n		</ul>\n		<button class=\"type\"><span class=\"ico_refresh\"></span>초기화</button>\n	</div>\n</div>\n\n";
},"useData":true});