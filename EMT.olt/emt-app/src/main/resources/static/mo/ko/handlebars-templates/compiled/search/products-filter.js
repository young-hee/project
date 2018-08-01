this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["search"] = this["AP"]["handlebars"]["search"] || {};

this["AP"]["handlebars"]["search"]["products-filter"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "			<dl>\n				<dt class=\""
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.addAttrCode : depth0),"==","colorgroup",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n					<span class=\"title\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.addAttrName : depth0), depth0))
    + "</span>\n					<button type=\"button\"><span class=\"sr_only\">더보기</span></button>\n				</dt>\n				<dd>\n					<div class=\"cont\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.addAttrCode : depth0),"==","colorgroup",{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "					</div>\n				</dd>\n			</dl>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "on";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",5,{"name":"calc","hash":{},"data":data}),"==",0,{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									<span>\n										<input type=\"checkbox\" id=\""
    + alias4(alias3((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " value=\""
    + alias4(alias3((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" data-group=\""
    + alias4(alias3((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "\" data-label=\""
    + alias4(alias3((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "\"><label for=\""
    + alias4(alias3((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" style=\"background-color:#"
    + alias4(alias3((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\"><span class=\"sr_only\">"
    + alias4(alias3((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "</span></label>\n									</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",5,{"name":"calc","hash":{},"data":data}),"==",4,{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data) {
    return "								<div class=\"color_chip circle\">\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "checked";
},"10":function(container,depth0,helpers,partials,data) {
    return "								</div>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "							<div class=\"filter_set\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</div>\n";
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "									<span><input type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.selected : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " value=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\" data-group=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "\" data-label=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "\"><label for=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "</label></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"panel\">\n	<div class=\"ui_accordion\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.model : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\n	<div class=\"page_btns\">\n		<button type=\"button\" class=\"btn_md_secondary btn_reset\">초기화</button>\n		<button type=\"button\" class=\"btn_md_primary btn_confirm\">필터 적용</button>\n	</div>\n</div>";
},"useData":true,"useDepths":true});