this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["faq-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4="function";

  return "		<tr>\n			<td>"
    + alias3((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depths[1] != null ? depths[1].cnt : depths[1]),"-",(data && data.index),{"name":"calc","hash":{},"data":data}))
    + "</td>\n			<td class=\"cont\">\n				<div class=\"qna_box\">\n					<div class=\"question\">\n						<span class=\"txt_question\">Q<span class=\"sr_only\">질문</span></span>\n						<button type=\"button\" title=\"답변 보기\">\n							<span>\n								<span class=\"type\">["
    + alias3(((helper = (helper = helpers.inquiryTypeName || (depth0 != null ? depth0.inquiryTypeName : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"inquiryTypeName","hash":{},"data":data}) : helper)))
    + "]</span>"
    + alias3(((helper = (helper = helpers.inquiryText || (depth0 != null ? depth0.inquiryText : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"inquiryText","hash":{},"data":data}) : helper)))
    + "\n							</span>\n						</button>\n					</div>\n					<div class=\"answer\">\n						<span class=\"txt_answer\">\n							A <span class=\"sr_only\">답변</span>\n						</span>\n						"
    + ((stack1 = ((helper = (helper = helpers.responseBodyText || (depth0 != null ? depth0.responseBodyText : depth0)) != null ? helper : alias2),(typeof helper === alias4 ? helper.call(alias1,{"name":"responseBodyText","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "\n					</div>\n				</div>\n			</td>\n		</tr>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});