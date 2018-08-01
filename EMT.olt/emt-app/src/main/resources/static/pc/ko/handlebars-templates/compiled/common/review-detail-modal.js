this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["review-detail-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "			<span class=\"item_name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "			<small class=\"opt\">옵션: "
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</small>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "			<span class=\"flag\">구매자 후기</span>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "							 <span class=\"heart_wrap "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depths[1] != null ? depths[1].scope : depths[1]),">",(depth0 != null ? depth0["for-index"] : depth0),{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"><span class=\"sr_only\"> "
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0["for-index"] : depth0),"+",1,{"name":"calc","hash":{},"data":data}))
    + "점</span></span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "on";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"attach_img\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.imgList : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "					<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imageFileUrl : depth0), depth0))
    + "\" alt=\"\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return "<dl class=\"review_layer\">\n	<dt class=\"review_header\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.onlineProdName : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prodName : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.prodReviewTypeCode : depth0),"==","Pur",{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		<span class=\"clear\">\n				<span class=\"ui_rating\">\n					 <span class=\"heart\">\n"
    + ((stack1 = (helpers["for"] || (depth0 && depth0["for"]) || alias2).call(alias1,5,{"name":"for","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					 </span>\n				 </span>\n				<span class=\"writer\">\n					<span>"
    + alias4(alias3((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span>\n					<small class=\"date\">"
    + alias4((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.prodReviewRegistDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n				</span>\n			</span>\n	</dt>\n	<dd class=\"review_cont\">\n		<h3 class=\"h_title lare\">"
    + alias4(alias3((depth0 != null ? depth0.prodReviewTitle : depth0), depth0))
    + "</h3>\n\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n		<div class=\"cont\">\n			<pre>"
    + alias4(alias3((depth0 != null ? depth0.prodReviewBodyText : depth0), depth0))
    + "</pre>\n		</div>\n	</dd>\n</dl>";
},"useData":true,"useDepths":true});