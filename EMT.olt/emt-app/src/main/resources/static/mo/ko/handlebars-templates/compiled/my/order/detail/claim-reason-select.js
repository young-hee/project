this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};
this["AP"]["handlebars"]["my"]["order"]["detail"] = this["AP"]["handlebars"]["my"]["order"]["detail"] || {};

this["AP"]["handlebars"]["my"]["order"]["detail"]["claim-reason-select"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "					<option value=\""
    + alias4(((helper = (helper = helpers.claimReasonSn || (depth0 != null ? depth0.claimReasonSn : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"claimReasonSn","hash":{},"data":data}) : helper)))
    + "\" ordHistProdNo=\""
    + alias4(container.lambda((depths[1] != null ? depths[1].ordHistProdNo : depths[1]), depth0))
    + "\">"
    + alias4(((helper = (helper = helpers.reasonName || (depth0 != null ? depth0.reasonName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"reasonName","hash":{},"data":data}) : helper)))
    + "</option>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<fieldset class=\"form sel\" id=\""
    + alias4(((helper = (helper = helpers.ordHistProdNo || (depth0 != null ? depth0.ordHistProdNo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ordHistProdNo","hash":{},"data":data}) : helper)))
    + "\">\n	<legend class=\"sr_only\">반품사유 선택 및 입력</legend>\n	<div class=\"input_group\">\n		<div>\n			<select name=\"\" id=\"rs_"
    + alias4(((helper = (helper = helpers.ordHistProdNo || (depth0 != null ? depth0.ordHistProdNo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ordHistProdNo","hash":{},"data":data}) : helper)))
    + "\" title=\"반품사유 선택\" ordHistProdNo=\""
    + alias4(((helper = (helper = helpers.ordHistProdNo || (depth0 != null ? depth0.ordHistProdNo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ordHistProdNo","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.reason : depth0)) != null ? stack1.claimReasonExList : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</select>\n		</div>\n	</div>\n	<div class=\"input_group\">\n		<div>\n			<input id=\"rst_"
    + alias4(((helper = (helper = helpers.ordHistProdNo || (depth0 != null ? depth0.ordHistProdNo : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ordHistProdNo","hash":{},"data":data}) : helper)))
    + "\" type=\"text\" placeholder=\"사유를 입력해주세요.\">\n		</div>\n	</div>\n</fieldset>";
},"useData":true,"useDepths":true});