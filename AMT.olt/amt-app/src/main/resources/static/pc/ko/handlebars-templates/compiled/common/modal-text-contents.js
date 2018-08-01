this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["modal-text-contents"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "layer_title";
},"3":function(container,depth0,helpers,partials,data) {
    return "sr_only";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <dd class=\"layer_cont\">\n        <p class=\"text "
    + container.escapeExpression((helpers.getModalTextAlignClassName || (depth0 && depth0.getModalTextAlignClassName) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.textAlign : depth0),{"name":"getModalTextAlignClassName","hash":{},"data":data}))
    + "\">\n            "
    + ((stack1 = container.lambda((depth0 != null ? depth0.contents : depth0), depth0)) != null ? stack1 : "")
    + "\n        </p>\n    </dd>\n";
},"7":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <dd class=\"layer_btns\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.btnCancel : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.btnConfirm : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </dd>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"btn_lg_secondary btn_default_modal_cancel\" type=\"button\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.cancelLabel : depth0), depth0))
    + "</button>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "            <button class=\"btn_lg_neutral btn_default_modal_confirm\" type=\"button\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.confirmLabel : depth0), depth0))
    + "</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<dt class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = container.lambda((depth0 != null ? depth0.title : depth0), depth0)) != null ? stack1 : "")
    + "</dt>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.contents : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.isSome || (depth0 && depth0.isSome) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.btnConfirm : depth0),(depth0 != null ? depth0.btnCancel : depth0),{"name":"isSome","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});