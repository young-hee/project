this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["beautizen-reserve-temp-bagic"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " selected=\"selected\" ";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "\n<div class=\"panel\">\n	<h4 class=\"h_title page\">지원서 작성</h4>\n	<p class=\"font_md\">아래 내용을 입력해주세요.</p>\n	<hr class=\"div m30\">\n	<fieldset class=\"form\">\n		<legend class=\"sr_only\">사진 입력</legend>\n		<div class=\"attach_photo ui_input_images\" data-single-input=\"true\">\n			<div class=\"img attach\">\n				<img scr=\"\" data-src=\""
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.images : depth0)) != null ? stack1.fileUrl : stack1), depth0))
    + "\">\n			</div>\n			<label for=\"attach_photo\"><span class=\"sr_only\">사진 선택</span></label>\n			<input type=\"file\" id=\"attach_photo\" name=\"picture\" multiple=\"multiple\" accept=\"image/gif,image/jpeg,image/jpg,image/png\" required=\"required\" data-msg-required=\"사진을 등록하세요.\" >\n			<br>\n			<p class=\"text_center\">사진을 등록하시려면 터치해주세요.<br>120X160 최적화</p>\n		</div>\n	</fieldset>\n</div>\n<div class=\"panel\">\n	<fieldset class=\"form\">\n		<legend class=\"sr_only\">기본정보 입력</legend>\n		<h5 class=\"h_title cont\"><strong>지원자 기본정보</strong>\n			<small>(필수입력)</small></h5>\n		<div class=\"ui_table\">\n			<dl>\n				<dt>아이디</dt>\n				<dd th:text=\""
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "\"></dd> \n			</dl>\n		</div>\n		<div class=\"dl\">\n			<dl>\n				<dt><label for=\"phoneCorp\">휴대폰</label></dt>\n				<dd>\n					<div ap:replace=\"~{customer/fragment/member :: phoneCorp}\"></div>\n			        <div ap:replace=\"~{customer/fragment/member :: cellNumWithBtn}\"></div>\n			        <div ap:replace=\"~{customer/fragment/member :: smsNumWithBtn}\"></div>\n					\n					<br> \n					<button type=\"button\" class=\"btn_md_neutral w100p certification_btn\">인증확인</button>\n				</dd>\n			</dl>\n			<dl>\n				<dt>생년월일</dt>\n				<dd>\n					<div class=\"input_group\">\n						<div>\n							<input type=\"text\" name=\"dob\" id=\"dob\" placeholder=\"yyyymmdd\" psnDtbr=\"psnDtbr\" fourteenOver =\"fourteenOver\" required=\"required\" data-msg-required=\"생년월일을 입력해 주세요.\" value=\""
    + alias2(alias1((depth0 != null ? depth0.dob : depth0), depth0))
    + "\">\n						</div>\n						<div class=\"btn\">\n							<select name=\"genderCode\" id=\"genderCode\" title=\"성별 선택\" required=\"required\">\n								<option value=\"FeMale\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.genderCode : depth0),"==","FeMale",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">여자</option>\n								<option value=\"Male\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.genderCode : depth0),"==","Male",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">남자</option>\n							</select>\n						</div>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt>홈페이지(블로그)</dt>\n				<dd>\n					<div class=\"input_group\">\n						<div>\n							<input type=\"text\" name=\"personalHomepageUrl\" id=\"personalHomepageUrl\" placeholder=\"http://\" value=\""
    + alias2(alias1((depth0 != null ? depth0.personalHomepageUrl : depth0), depth0))
    + "\">\n						</div>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt>SNS 주소</dt>\n				<dd>\n					<div class=\"input_group\">\n						<div>\n							<input type=\"text\" name=\"snsUrl\" id=\"snsUrl\" placeholder=\"http://\" required=\"required\" data-msg-required=\"페이스북을 입력해주세요\" value=\""
    + alias2(alias1((depth0 != null ? depth0.snsUrl : depth0), depth0))
    + "\">\n						</div>\n						<div class=\"btn\">\n							<button type=\"button\" class=\"snsUrl\">등록</button>\n						</div>\n					</div>\n				</dd>\n			</dl>\n			<dl>\n				<dt><label for=\"location\">거주지역</label></dt>\n				<dd class=\"ui_find_addresses\">\n					<div class=\"input_group\">\n						<div>\n							<select name=\"preLocal\" id=\"preLocal\" title=\"지역 선택\" required=\"required\" data-msg-required=\"거주지역을 선택해 주세요.\">\n								<option value=\"강원도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","강원도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">강원도</option>\n								<option value=\"경기도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","경기도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">경기도</option>\n								<option value=\"경상남도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","경상남도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">경상남도</option>\n								<option value=\"경상북도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","경상북도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">경상북도</option>\n								<option value=\"광주광역시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","광주광역시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">광주광역시</option>\n								<option value=\"대구광역시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","대구광역시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">대구광역시</option>\n								<option value=\"대전광역시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","대전광역시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">대전광역시</option>\n								<option value=\"부산광역시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","부산광역시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">부산광역시</option>\n								<option value=\"서울특별시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","서울특별시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">서울특별시</option>\n								<option value=\"세종특별자치시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","세종특별자치시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">세종특별자치시</option>\n								<option value=\"울산광역시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","울산광역시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">울산광역시</option>\n								<option value=\"인천광역시\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","인천광역시",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">인천광역시</option>\n								<option value=\"전라남도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","전라남도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">전라남도</option>\n								<option value=\"전라북도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","전라북도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">전라북도</option>\n								<option value=\"제주특별자치도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","제주특별자치도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">제주특별자치도</option>\n								<option value=\"충청남도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","충청남도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">충청남도</option>\n								<option value=\"충청북도\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.requesterAddress : depth0)) != null ? stack1.address1 : stack1),"==","충청북도",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">충청북도</option>\n							</select>\n						</div>\n					</div>\n				</dd>\n			</dl>\n		</div>\n		<h5 class=\"h_title cont\"><strong>학력사항</strong>\n			<small>(필수입력)</small></h5>\n		<div class=\"input_group\">\n			<div>\n				<input type=\"text\" name=\"school\" id=\"school\" hangul=\"hangul\" placeholder=\"학교를 입력해 주세요.\" required=\"required\" data-msg-required=\"학교를 입력해 주세요.\" value=\""
    + alias2(alias1((depth0 != null ? depth0.school : depth0), depth0))
    + "\">\n			</div>\n			<div class=\"btn\">\n				<select name=\"grade\" id=\"grade\" title=\"학년 선택\" required=\"required\" data-msg-required=\"학년을 선택하세요.\">\n						<option value=\"1\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.grade : depth0),"==","1",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">1 학년</option>\n						<option value=\"2\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.grade : depth0),"==","2",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">2 학년</option>\n						<option value=\"3\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.grade : depth0),"==","3",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">3 학년</option>\n						<option value=\"4\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.grade : depth0),"==","4",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">4 학년</option>\n				</select>\n			</div>\n		</div>\n		<div class=\"input_group\">\n			<div>\n				<input type=\"text\" id=\"faculty\" name=\"faculty\" hangul=\"hangul\" placeholder=\"학과/학부를 입력해 주세요.\" required=\"required\" data-msg-required=\"학과/학부를 입력해 주세요.\" value=\""
    + alias2(alias1((depth0 != null ? depth0.faculty : depth0), depth0))
    + "\">\n			</div>\n			<div class=\"btn\">\n				<select name=\"completeTerm\" title=\"이수학기 선택\" required=\"required\" data-msg-required=\"이수학기를 선택하세요.\" id=\"completeTerm\">\n					<option value= \"1\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","1",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 1 학기 </option>\n					<option value= \"2\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","2",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 2 학기 </option>\n					<option value= \"3\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","3",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 3 학기 </option>\n					<option value= \"4\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","4",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 4 학기 </option>\n					<option value= \"5\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","5",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 5 학기 </option>\n					<option value= \"6\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","6",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 6 학기 </option>\n					<option value= \"7\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","7",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 7 학기 </option>\n					<option value= \"8\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","8",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 8 학기 </option>\n					<option value= \"9\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","9",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 9 학기 </option>\n					<option value= \"10\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.completeTerm : depth0),"==","10",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "> 10 학기 </option>\n					 \n				</select>\n			</div>\n		</div>\n		<div class=\"input_group\">\n			<div>\n				<input type=\"text\" name=\"major\" id=\"major\" hangul=\"hangul\" placeholder=\"전공을 입력해 주세요.\" required=\"required\" data-msg-required=\"전공을 입력해 주세요.\" value=\""
    + alias2(alias1((depth0 != null ? depth0.major : depth0), depth0))
    + "\">\n			</div>\n		</div>\n		<div class=\"form_btns\">\n			<a href=\"#none\" class=\"btn_lg_secondary temp\">임시저장</a>\n			<a href=\"#none\" class=\"btn_lg_neutral nextConfirm\">다음</a>\n		</div>\n	</fieldset>\n	</div>";
},"useData":true});