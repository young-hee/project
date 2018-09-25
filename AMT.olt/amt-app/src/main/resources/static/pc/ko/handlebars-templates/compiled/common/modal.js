this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"modal_popup layer_popup js_openstyle=\"display:block\">\n    <div class=\"layer_dimmed\"></div>\n    "
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.templateKey : depth0),(depth0 != null ? depth0.templateModel : depth0),{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<div class=\"modal_popup layer_popup js_open "
    + alias2(alias1((depth0 != null ? depth0.containerClass : depth0), depth0))
    + " "
    + alias2(alias1((depth0 != null ? depth0.uId : depth0), depth0))
    + "\" style=\"display:block\">\n    <div class=\"layer_wrap "
    + alias2(alias1((depth0 != null ? depth0.wrapperClass : depth0), depth0))
    + " "
    + alias2((helpers.getModalSizeClassName || (depth0 && depth0.getModalSizeClassName) || alias4).call(alias3,(depth0 != null ? depth0.sizeType : depth0),{"name":"getModalSizeClassName","hash":{},"data":data}))
    + "\" tabindex=\"0\" style=\"display:block\">\n        <dl class=\"layer\" >\n            "
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || alias4).call(alias3,(depth0 != null ? depth0.templateKey : depth0),(depth0 != null ? depth0.templateModel : depth0),{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n        </dl>\n        <button class=\"layer_close\" type=\"button\">레이어 닫기</button>\n    </div>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.loading : depth0),{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});