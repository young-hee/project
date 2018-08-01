this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["date-picker-date-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                <li><button type=\"button\" data-year=\""
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "\" title=\""
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "</button></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "            <li><button type=\"button\" data-month=\""
    + alias3((helpers.numberCipher || (depth0 && depth0.numberCipher) || alias2).call(alias1,(depth0 != null ? depth0.month : depth0),2,{"name":"numberCipher","hash":{},"data":data}))
    + "\" title=\""
    + alias3(container.lambda((depth0 != null ? depth0.month : depth0), depth0))
    + "\">"
    + alias3((helpers.numberCipher || (depth0 && depth0.numberCipher) || alias2).call(alias1,(depth0 != null ? depth0.month : depth0),2,{"name":"numberCipher","hash":{},"data":data}))
    + "</button></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<dl>\n    <dt>Year</dt>\n    <dd>\n        <ul class=\"year_area\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.years : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </dd>\n</dl>\n<dl>\n    <dt>Month</dt>\n    <dd>\n        <ul class=\"month_area\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.months : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </dd>\n</dl>\n<button type=\"button\" class=\"ui_close date_layer\"><span class=\"sr_only\">close</span></button>";
},"useData":true});