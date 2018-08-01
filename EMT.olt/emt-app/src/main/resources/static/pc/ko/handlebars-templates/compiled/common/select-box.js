this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["select-box"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "    <li class=\"select_option "
    + alias2(alias1((depth0 != null ? depth0.uId : depth0), depth0))
    + "\"><a data-option-id=\""
    + alias2(alias1((depth0 != null ? depth0.optionId : depth0), depth0))
    + "\" data-value=\""
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "\" data-label=\""
    + alias2(alias1((depth0 != null ? depth0.label : depth0), depth0))
    + "\" class=\""
    + alias2(alias1((depth0 != null ? depth0.uId : depth0), depth0))
    + " "
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.disabled : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" role=\"option\" "
    + ((stack1 = helpers["if"].call(alias3,(depth0 != null ? depth0.disabled : depth0),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + ((stack1 = alias1((depth0 != null ? depth0.html : depth0), depth0)) != null ? stack1 : "")
    + "</a></li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "selected";
},"4":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"6":function(container,depth0,helpers,partials,data) {
    return "aria-disabled=\"true\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.options : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});