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
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				<td class=\""
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.today : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + alias2(alias1((depth0 != null ? depth0.time : depth0), depth0))
    + "\">\n					<span class=\"date\">"
    + alias2(alias1((depth0 != null ? depth0.date : depth0), depth0))
    + "</span>\n				</td>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "today";
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