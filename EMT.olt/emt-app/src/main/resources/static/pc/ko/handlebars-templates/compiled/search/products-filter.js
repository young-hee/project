this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["products-filter"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "<tr>\n	<th scope=\"row\" data-group=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrCode : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.addAttrName : depth0), depth0))
    + "</th>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrCode : depth0),"==","colorgroup",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(6, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</tr>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "	<td>\n		<div class=\"color_chip circle group\" data-group=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.addAttrCode : depth0), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n	</td>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				<span>\n					<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n					<label for=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" style=\"background-color:#"
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\">\n						<span>"
    + alias2(alias1((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "</span>\n					</label>\n				</span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "checked";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "	<td>\n		<div class=\"filter_set group\" data-group=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.addAttrCode : depth0), depth0))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n	</td>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "				<span>\n					<input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n					<label for=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "</label>\n				</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});