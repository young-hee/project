this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["inquiry-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.inquiryHandlingStatusCode : depth0),"==","Complete",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "	  <dt>\n		<span class=\"state\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.inquiryHandlingStatusCode : depth0),"==","Complete",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.smsResponseNotifyYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.program(12, data, 0),"data":data})) != null ? stack1 : "")
    + "		</span>\n		<span class=\"title\">"
    + alias4(alias3((depth0 != null ? depth0.inquiryTitle : depth0), depth0))
    + "</span>\n		<span class=\"clear\">\n			<span>"
    + alias4(alias3((depth0 != null ? depth0.inquiryTypeName : depth0), depth0))
    + "</span>\n			<span>"
    + alias4((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.receivedDt : depth0),"YYYY.MM.DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span> \n		</span>\n		<button type=\"button\" data-inquirySn=\""
    + alias4(alias3((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "\"></button>\n	  </dt>\n	  <dd>\n	    <div id=\"cont_"
    + alias4(alias3((depth0 != null ? depth0.customerInquirySn : depth0), depth0))
    + "\" class=\"cont\"></div>\n	  </dd>\n	</dl>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "		<dl class=completion>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "		<dl>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"s1 on\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.inquiryHandlingStateName : depth0), depth0))
    + "</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"s1\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.inquiryHandlingStateName : depth0), depth0))
    + "</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"s2 on\">SMS 수신동의</span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "				<span class=\"s2\">SMS 수신거부</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.inquiryList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});