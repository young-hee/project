this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["my-inquiry-cont"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<dl>\n	<dt>상담내용</dt>\n	<dd>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.inquiryBodyText : stack1), depth0))
    + "</dd>\n</dl>\n<dl>\n	<dt>상담원 답변</dt>\n	<dd>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.responseBodyText : stack1), depth0))
    + "</dd>\n</dl>";
},"useData":true});