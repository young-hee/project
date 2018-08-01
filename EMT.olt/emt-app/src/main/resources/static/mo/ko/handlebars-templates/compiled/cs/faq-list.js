this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["faq-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "        <dl>\n            <dt>\n            		<span class=\"title\">"
    + alias4(((helper = (helper = helpers.inquiryText || (depth0 != null ? depth0.inquiryText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inquiryText","hash":{},"data":data}) : helper)))
    + "</span>\n                	<small>"
    + alias4(((helper = (helper = helpers.inquiryTypeName || (depth0 != null ? depth0.inquiryTypeName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"inquiryTypeName","hash":{},"data":data}) : helper)))
    + "</small>\n                	<button type=\"button\"><span class=\"sr_only\">더보기</span></button>\n            </dt>\n            <dd>\n                <div class=\"cont\">\n                    <p class=\"text\">"
    + ((stack1 = ((helper = (helper = helpers.responseBodyText || (depth0 != null ? depth0.responseBodyText : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"responseBodyText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>\n                </div>\n            </dd>\n        </dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});