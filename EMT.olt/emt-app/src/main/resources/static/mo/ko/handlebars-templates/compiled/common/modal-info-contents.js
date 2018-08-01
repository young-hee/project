this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["modal-info-contents"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "layer_title";
},"3":function(container,depth0,helpers,partials,data) {
    return "sr_only";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "    <dd class=\"layer_cont\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.type || (depth0 && depth0.type) || alias2).call(alias1,(depth0 != null ? depth0.contents : depth0),"Object",{"name":"type","hash":{},"data":data}),"&&",(helpers.type || (depth0 && depth0.type) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1.templateKey : stack1),"String",{"name":"type","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.isSome || (depth0 && depth0.isSome) || alias2).call(alias1,(depth0 != null ? depth0.btnConfirm : depth0),(depth0 != null ? depth0.btnCancel : depth0),{"name":"isSome","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </dd>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "            "
    + ((stack1 = (helpers.include || (depth0 && depth0.include) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1.templateKey : stack1),((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1.templateModel : stack1),{"name":"include","hash":{},"data":data})) != null ? stack1 : "")
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.type || (depth0 && depth0.type) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.contents : depth0),"String",{"name":"type","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                <p class=\"text_center\">"
    + ((stack1 = container.lambda((depth0 != null ? depth0.contents : depth0), depth0)) != null ? stack1 : "")
    + "</p>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "                "
    + ((stack1 = container.lambda((depth0 != null ? depth0.contents : depth0), depth0)) != null ? stack1 : "")
    + "\n";
},"13":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "            <div class=\"page_btns\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.btnCancel : depth0),{"name":"if","hash":{},"fn":container.program(14, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.btnConfirm : depth0),{"name":"if","hash":{},"fn":container.program(16, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n";
},"14":function(container,depth0,helpers,partials,data) {
    return "                    <button class=\"btn_md_secondary btn_default_modal_cancel\" type=\"button\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.cancelLabel : depth0), depth0))
    + "</button>\n";
},"16":function(container,depth0,helpers,partials,data) {
    return "                    <button class=\"btn_md_neutral btn_default_modal_confirm\" type=\"button\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.confirmLabel : depth0), depth0))
    + "</button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<dt class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.title : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = container.lambda((depth0 != null ? depth0.title : depth0), depth0)) != null ? stack1 : "")
    + "</dt>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.contents : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});