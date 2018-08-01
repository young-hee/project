this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["color-factory-confirmation"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "		<p class=\"font_md month_notice\">최근 1개월 간 예약된 서비스 목록입니다.</p>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<h4 class=\"h_title mgt20\"><b>"
    + alias2(alias1((depth0 != null ? depth0.storeEventServiceName : depth0), depth0))
    + "</b></h4>\n	<ul class=\"reservation_list mgt10\">\n		<li>\n			<span>예약 일시<br>(Reservation Date/Time)</span>\n			<span>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.eventStartDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "("
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.eventStartDt : depth0),"ddd",{"name":"dateFormat","hash":{},"data":data}))
    + ")<br>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.eventStartDt : depth0),"HH",{"name":"dateFormat","hash":{},"data":data}))
    + ":"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.eventStartDt : depth0),"mm",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n		</li>\n		<li>\n			<span>예약 매장<br>(Reservation Store)</span>\n			<span>"
    + alias2(alias1((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</span>\n		</li>\n		<li>\n			<span>신청자명<br>(Name)</span>\n			<span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.name : depth0)) != null ? stack1.name1 : stack1), depth0))
    + "</span>\n		</li>\n		<li>\n			<span>휴대전화/이메일<br>(cell Phone/e-mail)</span>\n			<span>"
    + alias2((helpers.phoneNumberFormat || (depth0 && depth0.phoneNumberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1),{"name":"phoneNumberFormat","hash":{},"data":data}))
    + "<br>"
    + alias2(alias1((depth0 != null ? depth0.emailAddress : depth0), depth0))
    + "</span>\n		</li>\n		<li>\n			<span>예약번호<br>(Reservation Number)</span>\n			<span>"
    + alias2(alias1((depth0 != null ? depth0.reserveNo : depth0), depth0))
    + "</span>\n		</li>\n		<li>\n			<span>예약취소<br>(Reservation cancel)</span>\n			<span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.reserveCancelYn : depth0),"==","N",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.reserveCancelYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</span>\n		</li>\n	</ul>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<button type=\"button\" class=\"btn_sm_neutral\" data-reserve-no=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.reserveNo : depth0), depth0))
    + "\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.cancelAvailYn : depth0),"==","N",{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">예약취소</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"7":function(container,depth0,helpers,partials,data) {
    return "				취소완료\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"panel color_factory\">\n	<h2 class=\"h_title page\">예약 확인</h2>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isLogin : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<hr class=\"div m30\">\n	<h3 class=\"h_title cont\"><b>예약정보</b></h3>\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.storeEventRequesterExList : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n	<div class=\"panel gray mgt25\">\n		<dl class=\"dl_cont\">\n			<dt class=\"h_title font_md\"><b>유의사항</b></dt>\n			<dd>\n				<ul class=\"list_bullet_dot\">\n					<li><b>서비스 이용 시 <em>예약번호</em>를 확인하고 있습니다. 매장 방문 시 제시해 주세요.</b></li>\n					<li>예약번호는 예약확인 페이지, 전송 받은 문자 및 이메일을 통해 확인 가능합니다. (Tip. 해외 거주 외국인의 경우 예약확인 페이지를\n						사진 찍어 보내주세요~)\n					</li>\n					<li>예약 취소는 온라인에서 서비스 하루 전까지 가능하며, 예약 시간에서 15분 이상이 초과된 경우 다른 고객님의 서비스를 위하여 예약은 자동\n						취소됩니다.\n					</li>\n					<li>앞 타임 고객님의 응대로 서비스 시작 시간이 약 10분 정도는 지연될 수 있음을 양해 부탁드립니다.</li>\n					<li>당사 사정으로 인한 서비스 이용 불가 시 유선 안내 드리겠습니다.</li>\n					<li><b>더욱 정확한 퍼스널 컬러 측정을 원하신다면 컬러 메이크업은 최소한으로 하고 오시는 것이 좋습니다.</b></li>\n					<li>문의전화 : 명동FSS점(플래그십스토어/3F) 02-3789-5463, 가로수길점(B1) 02-549-7202</li>\n					<li><b>Before providing our services, we will check<em>your reservation\n						number</em>. Please present the number when visiting our shop.</b></li>\n					<li>Your reservation number can be checked via the reservation confirmation page\n						and the e-mail we sent. (Tip. In case of International customers rediding\n						overseas, please present a screenshot of your reservation confirmation\n						page!)\n					</li>\n					<li>You can cancel your reservation online at least one day before your\n						scheduled date. If you are late in availing of the service for more than 15\n						minutes, your reservation will be canceled automatically in order to provide\n						our service for other customers.\n					</li>\n					<li>Please understand that the start time of the service may be delayed by about\n						10 minutes when there are prior concerns to be attended\n					</li>\n					<li>If we cannot provide service due to the circum- stances of our company, we\n						will Inform you via telephone\n					</li>\n					<li>For more accurate personal color measurement, please wear light color\n						makeup, If possible\n					</li>\n					<li>Reservation Inquiry : Myeongdong FSS store (flagship store) (3F)\n						02-3789-5463; Sinsa Caro- sugil store (B1) 02-549-7202\n					</li>\n				</ul>\n			</dd>\n		</dl>\n	</div>\n</div>";
},"useData":true});