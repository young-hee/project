this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};
this["AP"]["handlebars"]["my"]["order"]["detail"] = this["AP"]["handlebars"]["my"]["order"]["detail"] || {};

this["AP"]["handlebars"]["my"]["order"]["detail"]["claim-reason"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "			<dt class=\"w30p\"><b>취소사유</b></dt>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<dt class=\"w30p\"><b>"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),"반품사유","교환사유",{"name":"condition","hash":{},"data":data}))
    + "</b></dt>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"panel gray reason\">\n	<dl class=\"table_layout\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"===","cancel",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n		<dd>"
    + alias4(((helper = (helper = helpers.receivedClaimReasonName || (depth0 != null ? depth0.receivedClaimReasonName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"receivedClaimReasonName","hash":{},"data":data}) : helper)))
    + "</dd>\n	</dl>\n	<dl class=\"table_layout\">\n		<dt class=\"w30p vat\"><b>내용</b></dt>\n		<dd class=\"lh2\">"
    + alias4(((helper = (helper = helpers.foReceivedClaimReason || (depth0 != null ? depth0.foReceivedClaimReason : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"foReceivedClaimReason","hash":{},"data":data}) : helper)))
    + "</dd>\n	</dl>\n</div>";
},"useData":true});