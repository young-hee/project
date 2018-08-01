this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["inquiry-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "	<dl class="
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.inquiryHandlingStatusCode : depth0),"Complete",{"name":"eq","hash":{},"data":data}),"completion","",{"name":"condition","hash":{},"data":data}))
    + " completion>\n		<dt>\n			<span class=\"state\">\n				<span class=\""
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.inquiryHandlingStatusCode : depth0),"Complete",{"name":"eq","hash":{},"data":data}),"s1 on","s1",{"name":"condition","hash":{},"data":data}))
    + "\">"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.inquiryHandlingStatusCode : depth0),"Complete",{"name":"eq","hash":{},"data":data}),"답변완료","답변대기",{"name":"condition","hash":{},"data":data}))
    + "</span>\n				<span class=\""
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.smsResponseNotifyYn : depth0),"Y",{"name":"eq","hash":{},"data":data}),"s2 on","s2",{"name":"condition","hash":{},"data":data}))
    + "\">SMS 수신동의</span>\n			</span>\n			<span class=\"title\">"
    + alias3(alias4((depth0 != null ? depth0.inquiryTitle : depth0), depth0))
    + "</span>\n			<span class=\"clear\">\n				<span>"
    + alias3(alias4((depth0 != null ? depth0.inquiryTypeName : depth0), depth0))
    + "</span>\n				<span>"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.receivedDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n			</span>\n			<button type=\"button\" data-inquirySn=\""
    + alias3(alias4((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "\"></button>\n		</dt>\n		<dd>\n			<div id=\"cont_"
    + alias3(alias4((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "\" class=\"cont\"></div>\n		</dd>\n	</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.inquiryList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});