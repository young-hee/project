this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["my-inquiry-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "		<dd>\n			<div class=\"ui_accordion inquiry_list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n		</dd>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "					<dl>\n						<dt>\n							<button type=\"button\" onclick=\"getCont("
    + alias2(alias1((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + ", '"
    + alias2(alias1((depths[1] != null ? depths[1].YN : depths[1]), depth0))
    + "')\">"
    + alias2(alias1((depth0 != null ? depth0.inquiryTitle : depth0), depth0))
    + "</button>\n							<span class=\"clear\">\n								<span>\n									<small>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.receivedDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n"
    + ((stack1 = helpers["if"].call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depths[1] != null ? depths[1].YN : depths[1]),"N",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depths[1] != null ? depths[1].YN : depths[1]),"Y",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depths[1] != null ? depths[1].YN : depths[1]),"==","N",{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.program(10, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "							</span>\n						</dt>\n						<dd id=\"cont_"
    + alias2(alias1((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "\">\n\n						</dd>\n					</dl>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "										<small>결과알림 : <span class=\"color_black\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.smsResponseNotifyYn : depth0),"Y",{"name":"eq","hash":{},"data":data}),"SMS 수신","SMS 수신거부",{"name":"condition","hash":{},"data":data}))
    + "</span></small>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.responseEvalCode : depth0),null,{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "											<button type=\"button\" class=\"btn_gray_round\" onclick=\"evalResponse('"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "')\">상담평가</button>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "									<span class=\"status unread\"><i class=\"ico_check\"></i> 미확인</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "									<span class=\"status\"><i class=\"ico_check\"></i> "
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.responseEvalCode : depth0),null,{"name":"eq","hash":{},"data":data}),"답변완료",(depth0 != null ? depth0.responseEvalName : depth0),{"name":"condition","hash":{},"data":data}))
    + "</span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "		<dd>\n			<div class=\"no_data\" style=\"height:182px\">\n				<b>문의하신 1:1 상담내역이<br>없습니다.</b>\n			</div>\n		</dd>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<dl>\n	<dt><b class=\"title\">"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.YN : depth0),"N",{"name":"eq","hash":{},"data":data}),"미해결 상담","답변 완료된 상담",{"name":"condition","hash":{},"data":data}))
    + "<em>"
    + alias3(container.lambda((depth0 != null ? depth0.totalCount : depth0), depth0))
    + "</em></b><button type=\"button\"><i class=\"ico_navi\"></i><span class=\"sr_only\">더보기</span></button></dt>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.totalCount : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</dl>";
},"useData":true,"useDepths":true});