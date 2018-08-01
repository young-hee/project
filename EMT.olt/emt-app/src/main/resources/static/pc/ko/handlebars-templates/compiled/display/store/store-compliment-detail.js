this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["store"] = this["AP"]["handlebars"]["display"]["store"] || {};

this["AP"]["handlebars"]["display"]["store"]["store-compliment-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<span class=\"flag\">BEST</span>";
},"3":function(container,depth0,helpers,partials,data) {
    return "				<span>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "				<img alt=\"\" src=\""
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "			<div class=\"praise_button\">\n				<button class=\"btn_lg_bordered modify\" type=\"button\">수정</button>\n				<button class=\"btn_lg_secondary delete\" type=\"button\">삭제</button>\n			</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "<dl class=\"praise_layer\">\n	<dt class=\"praise_header\">\n		"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.topStoreEvalYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		<h3 class=\"h_title lare\">"
    + alias4(alias3((depth0 != null ? depth0.storeEvalTitle : depth0), depth0))
    + "</h3>\n		<div class=\"layer_flag_praise\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.storeEvalReason : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n		<span class=\"posts_info\">\n			<span class=\"store_name\">"
    + alias4(alias3((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</span>\n			<span class=\"posts_id\">"
    + alias4(alias3((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span>\n			<span class=\"posts_date\">"
    + alias4((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.createdDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n		</span>\n	</dt>\n	<dd class=\"praise_cont\">\n		<div class=\"attach_img\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.storeEvalImgUrlList : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n		<p class=\"text\" id=\"storeEvalBodyText\">\n			"
    + alias4(alias3((depth0 != null ? depth0.storeEvalBodyText : depth0), depth0))
    + "\n		</p>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.myStoreEvalYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</dd>\n</dl>";
},"useData":true});