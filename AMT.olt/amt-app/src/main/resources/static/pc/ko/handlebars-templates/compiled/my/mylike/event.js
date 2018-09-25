this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["mylike"] = this["AP"]["handlebars"]["my"]["mylike"] || {};

this["AP"]["handlebars"]["my"]["mylike"]["event"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "	<li data-index=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n		<div class=\"brand_box\">\n			<span class=\"check_wrap check_only\"><input type=\"checkbox\" id=\"check_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-plan-display-sn=\""
    + alias4(alias5((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\"><label for=\"check_"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\"><span class=\"sr_only\">선택</span></label></span>\n			<div class=\"brand_visual\">\n				<a href=\"/display/event_detail?planDisplaySn="
    + alias4(alias5((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\">\n					<img src=\""
    + alias4((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,(depth0 != null ? depth0.bannerImgP1 : depth0),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\""
    + alias4(alias5((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "\">\n				</a>\n			</div>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});