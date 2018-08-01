this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "<div class=\"modal_popup layer_popup js_open "
    + alias1(container.lambda((depth0 != null ? depth0.containerClass : depth0), depth0))
    + "\" style=\"display:block\">\n    <div class=\"layer_dimmed\"></div>\n    <div class=\"layer_wrap "
    + alias1((helpers.getModalSizeClassName || (depth0 && depth0.getModalSizeClassName) || alias3).call(alias2,(depth0 != null ? depth0.sizeType : depth0),{"name":"getModalSizeClassName","hash":{},"data":data}))
    + "\" tabindex=\"0\" style=\"display:block\">\n        <dl class=\"layer\" >\n            "
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || alias3).call(alias2,(depth0 != null ? depth0.templateKey : depth0),(depth0 != null ? depth0.templateModel : depth0),{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n        </dl>\n        <button class=\"layer_close\" type=\"button\">레이어 닫기</button>\n    </div>\n</div>";
},"useData":true});