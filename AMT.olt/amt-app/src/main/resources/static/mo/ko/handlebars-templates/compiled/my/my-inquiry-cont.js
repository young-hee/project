this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["my-inquiry-cont"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<div class=\"attached\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.inquiryFileList : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "					<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.fileUrl : depth0), depth0))
    + "\" alt=\"\">\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<dl class=\"answer\">\n		<dt>상담원답변</dt>\n		<dd>\n			<pre class=\"text\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.responseBodyText : stack1), depth0))
    + "</pre>\n		</dd>\n	</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<dl class=\"question\">\n	<dt>상담내용</dt>\n	<dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.isExist || (depth0 && depth0.isExist) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.inquiryFileList : stack1),{"name":"isExist","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		<pre class=\"text\">"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.inquiryBodyText : stack1), depth0))
    + "</pre>\n	</dd>\n</dl>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.YN : depth0),"Y",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});