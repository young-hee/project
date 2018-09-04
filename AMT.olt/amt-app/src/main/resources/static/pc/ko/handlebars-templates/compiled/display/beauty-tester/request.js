this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-tester"] = this["AP"]["handlebars"]["display"]["beauty-tester"] || {};

this["AP"]["handlebars"]["display"]["beauty-tester"]["request"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"section\">\n							<h3 class=\"sr_only\">신청하기</h3>\n							<dl class=\"dl_cont\">\n								<dt><b>응모미션</b></dt>\n								<dd>\n									<ul class=\"list\">\n										<li>1  카카오톡에서 ‘아모레퍼시픽몰’ 을 플러스친구에 추가해주세요.</li>\n										<li>2  뷰티테스터 리뷰를 등록할 개인블로그 또는  SNS url과 신청사연을 적어주세요. </li>\n									</ul>\n								</dd>\n								<dt><b>리뷰미션</b></dt>\n								<dd>\n									<ul class=\"list\">\n										<li>3  개인블로그와 뷰티테스터 리뷰탭에 테스터리뷰를 등록해주세요.</li>\n									</ul>\n								</dd>\n							</dl>\n							<div class=\"dl_cont reverse\">\n								<dt><b>알립니다</b></dt>\n								<dd>\n									<ul class=\"list_bullet_dot\">\n										<li>뷰티테스터 신청은 2018년 1월부터 VIP등급 이상의 회원부터 가능합니다</li>\n										<li>선정된 뷰티테스터에게는 해당 상품을 무료로 배송합니다.</li>\n										<li>정해진 기간에 맞춰서 리뷰등록을 해야하며, 미 등록시에는 차후 테스터 선정에 제외될 수 있습니다.</li>\n										<li>베스트 리뷰 선정시에는 특별한 선물을 받으실 수 있습니다.</li>\n									</ul>\n								</dd>\n							</div>\n							<div class=\"app_download\">\n								<p class=\"info_txt\">\n									<span>새롭게 바뀐 아모레퍼시픽 앱을 다운받아 뷰티테스터에 참여해보세요.</span>\n									<span>뷰티테스터는 앱에서만 신청 가능한 서비스입니다.</span>\n								</p>\n								<img ap:src=\"@{/images/event/ico_ap_app.png}\" alt=\"\">\n								<p class=\"txt\"><strong>앱 다운로드 URL 받기(무료전송)</strong>* 입력하신 번호는 저장되지 않습니다.</p>\n								<span class=\"input_wrap\"><input type=\"text\" name=\"\" id=\"\" placeholder=\"휴대폰 번호를  입력해주세요\"></span>\n								<a href=\"#none\" class=\"btn_fix_neutral\">보내기</a>\n							</div>\n						</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "						<h3 class=\"sr_only\">신청하기</h3>\n						<!--/* 당첨시 */-->\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.win : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.win : depth0),"!=","Y",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "						<div class=\"section table_layout\">\n							<div class=\"tester_announce\">\n								<p class=\"text font_xl\"><b>"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.memberInfo : depth0)) != null ? stack1.name : stack1)) != null ? stack1.name1 : stack1), depth0))
    + "</b>님, 당첨을 축하드립니다.</p>\n								<p class=\"text font_md\"><b>"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.reviewRegistEndDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "일</b>까지 뷰티테스터 리뷰를 등록해주세요<br>\n									베스트리뷰로 선정되시면 뷰티포인트 1,000P를 드립니다.</p>\n								<button type=\"button\" class=\"btn_primary w100p\" disabled>"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.reviewRegistStartDt : stack1),"DD",{"name":"dateFormat","hash":{},"data":data}))
    + "일부터 등록이 가능합니다.</button>\n								<a href=\"#none\" class=\"link font_md\"><span>당첨자 명단보기</span></a>\n							</div>\n						</div>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "						<!--/* 미당첨시 */-->\n						<div class=\"section table_layout\">\n							<div class=\"tester_announce\">\n								<p class=\"text font_xl\">아쉽게도 이번엔 당첨이 되지 않았습니다.</p>\n								<p class=\"text font_md\">다음에 꼭 다시 도전하세요.</p>\n								<a href=\"#none\" class=\"btn_lg_primary\">다른 뷰티테스터 이벤트 보러가기</a>\n							</div>\n						</div>\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "						<h3 class=\"sr_only\">신청하기</h3>\n						<div class=\"section tester_announce\">\n							<p class=\"text font_xl\"><b>"
    + alias1(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.memberInfo : depth0)) != null ? stack1.name : stack1)) != null ? stack1.name1 : stack1), depth0))
    + "</b>님, 당첨을 축하드립니다.</p>\n							<p class=\"text font_md\"><b>"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.regularEvent : depth0)) != null ? stack1.reviewRegistEndDt : stack1),"MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "일</b>까지 뷰티테스터 리뷰를 등록해주세요<br>\n								베스트리뷰로 선정되시면 뷰티포인트 1,000P를 드립니다.</p>\n							<button type=\"button\" class=\"btn_primary w100p\">리뷰 등록하기</button>\n							<a href=\"#none\" class=\"link font_md\"><span>당첨자 명단보기</span></a>\n						</div>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "						<h3 class=\"sr_only\">신청하기</h3>\n						<div class=\"section table_layout\">\n							<div class=\"tester_announce\">\n								<p class=\"text font_xl\"><b>홍길동</b>님, 베스트 리뷰로 선정되셨습니다.</p>\n								<p class=\"text font_md\">베스트 리뷰로 선정되어 뷰티포인트 1,000포인트를 지급해드렸습니다</p>\n								<button type=\"button\" class=\"btn_primary w100p\">내포인트 확인하기</button>\n							</div>\n						</div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "						<div class=\"section beauty_tester_review_ilst\">\n							<div class=\"pagination\" style=\"display:none;\"></div>\n						</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"==","RQ",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"==","TN",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"==","RR",{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"==","BR",{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.status : depth0),"!==","RQ",{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});