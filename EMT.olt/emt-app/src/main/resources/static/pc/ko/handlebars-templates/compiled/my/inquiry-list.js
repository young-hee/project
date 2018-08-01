this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["inquiry-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "	<dl>\n	    <dt>\n	        <span class=\"accordion_head\"></span>\n			<button type=\"button\" data-inquirySn=\""
    + alias2(alias1((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.inquiryTitle : depth0), depth0))
    + "</button>\n			<span class=\"accordion_footer\">\n"
    + ((stack1 = helpers["if"].call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depth0 != null ? depth0.smsResponseNotifyYn : depth0),"Y",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	        	<span class=\"category\">"
    + alias2(alias1((depth0 != null ? depth0.inquiryTypeName : depth0), depth0))
    + "</span>\n	        	<span class=\"date\">"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.receivedDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n				<span class=\""
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depth0 != null ? depth0.inquiryHandlingStatusCode : depth0),"Complete",{"name":"eq","hash":{},"data":data}),"state on","state",{"name":"condition","hash":{},"data":data}))
    + "\">"
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.eq || (depth0 && depth0.eq) || alias4).call(alias3,(depth0 != null ? depth0.inquiryHandlingStatusCode : depth0),"Complete",{"name":"eq","hash":{},"data":data}),"답변완료","답변대기",{"name":"condition","hash":{},"data":data}))
    + "</span>\n        	</span>\n	    </dt>\n	    <dd id=\"cont_"
    + alias2(alias1((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "\"></dd>\n	</dl>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "					<span>SMS 수신</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.inquiryList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});