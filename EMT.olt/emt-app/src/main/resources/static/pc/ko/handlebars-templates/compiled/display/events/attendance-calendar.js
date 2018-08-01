this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["attendance-calendar"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<tr>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</tr>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.lambda, alias3=container.escapeExpression;

  return "				<td class=\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.sunday : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.saturday : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.today : depth0),{"name":"if","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.select : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.disabled : depth0),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.other : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias3(alias2((depth0 != null ? depth0.time : depth0), depth0))
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attendanced10 : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attendanced30 : depth0),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n					<span class=\"date\">"
    + alias3(alias2((depth0 != null ? depth0.date : depth0), depth0))
    + "</span>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.attendanced : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</td>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "sun";
},"5":function(container,depth0,helpers,partials,data) {
    return "sat";
},"7":function(container,depth0,helpers,partials,data) {
    return "today";
},"9":function(container,depth0,helpers,partials,data) {
    return "selected";
},"11":function(container,depth0,helpers,partials,data) {
    return "disabled";
},"13":function(container,depth0,helpers,partials,data) {
    return "other";
},"15":function(container,depth0,helpers,partials,data) {
    return "day10";
},"17":function(container,depth0,helpers,partials,data) {
    return "day30";
},"19":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "						<span class=\"mark\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.attendanced10 : depth0),"||",(depth0 != null ? depth0.attendanced30 : depth0),{"name":"xif","hash":{},"fn":container.program(20, data, 0),"inverse":container.program(22, data, 0),"data":data})) != null ? stack1 : "")
    + "						</span>\n";
},"20":function(container,depth0,helpers,partials,data) {
    return "								<span class=\"sr_only\">30일개근</span>\n";
},"22":function(container,depth0,helpers,partials,data) {
    return "								출첵\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<table data-date=\""
    + alias2(alias1((depth0 != null ? depth0.year : depth0), depth0))
    + "-"
    + alias2(alias1((depth0 != null ? depth0.month : depth0), depth0))
    + "\">\n	<caption class=\"sr_only\">calendar date table</caption>\n	<colgroup>\n		<col style=\"width:15%;\" />\n		<col style=\"width:14%;\" />\n		<col style=\"width:14%;\" />\n		<col style=\"width:14%;\" />\n		<col style=\"width:14%;\" />\n		<col style=\"width:14%;\" />\n		<col style=\"width:15%;\" />\n	</colgroup>\n	<thead>\n	<tr>\n		<th scope=\"col\" class=\"sun\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.days : depth0)) != null ? stack1["0"] : stack1), depth0))
    + "</span></th>\n		<th scope=\"col\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.days : depth0)) != null ? stack1["1"] : stack1), depth0))
    + "</span></th>\n		<th scope=\"col\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.days : depth0)) != null ? stack1["2"] : stack1), depth0))
    + "</span></th>\n		<th scope=\"col\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.days : depth0)) != null ? stack1["3"] : stack1), depth0))
    + "</span></th>\n		<th scope=\"col\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.days : depth0)) != null ? stack1["4"] : stack1), depth0))
    + "</span></th>\n		<th scope=\"col\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.days : depth0)) != null ? stack1["5"] : stack1), depth0))
    + "</span></th>\n		<th scope=\"col\" class=\"sat\"><span>"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.days : depth0)) != null ? stack1["6"] : stack1), depth0))
    + "</span></th>\n	</tr>\n	</thead>\n	<tbody>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.weeks : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</tbody>\n</table>";
},"useData":true});