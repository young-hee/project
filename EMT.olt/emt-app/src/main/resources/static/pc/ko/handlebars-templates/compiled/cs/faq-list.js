this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["faq-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div  class=\"ui_accordion\" data-open-type=\"single\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div> \n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<dl>\n	        <dt>\n	            <span class=\"accordion_head\"><span>"
    + alias2(alias1((depth0 != null ? depth0.inquiryTypeName : depth0), depth0))
    + "</span></span>\n	            <button type=\"button\">"
    + alias2(alias1((depth0 != null ? depth0.inquiryText : depth0), depth0))
    + "</button>\n	        </dt>\n	        <dd>\n	        	<div class=\"cont\">\n	            	<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.answerText : depth0), depth0))
    + "</p>\n	            </div>\n	        </dd>\n	    </dl>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"none_data on\">\n	    <div class=\"panel notice\">\n	        <i class=\"ico\"></i>\n	        <p class=\"text font_lg\">검색결과가 없습니다.</p>\n	    </div>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.list : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});