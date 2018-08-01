this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["all-ingredients-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "			<dt>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.disclosureItemName : depth0), depth0))
    + "</dt>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",7,{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(9, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "				<dd class=\"all_ingredients\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].productCount : depths[1]),">",1,{"name":"xif","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(7, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "				</dd>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "						<div class=\"select_wrap\">\n							<select name=\"ingredients\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].products : depths[1]),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "							</select>\n						</div>\n						<div class=\"result\">\n							"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depths[1] != null ? depths[1].selectedData : depths[1])) != null ? stack1.disclosures : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.prodDisclosureInfo : stack1), depth0))
    + "\n						</div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "									<option value=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodSn : depth0),"==",((stack1 = (depths[2] != null ? depths[2].selectedData : depths[2])) != null ? stack1.prodSn : stack1),{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</option>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "selected";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "						"
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = ((stack1 = (depths[1] != null ? depths[1].selectedData : depths[1])) != null ? stack1.disclosures : stack1)) != null ? stack1["7"] : stack1)) != null ? stack1.prodDisclosureInfo : stack1), depth0))
    + "\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "				<dd>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodDisclosureInfo : depth0), depth0))
    + "</dd>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"panel\">\n	<dl class=\"goods_detail_cont\">\n		<dt>상품명</dt>\n		<dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.selectedData : depth0)) != null ? stack1.prodName : stack1), depth0))
    + "</dd>\n\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.selectedData : depth0)) != null ? stack1.disclosures : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</dl>\n</div>";
},"useData":true,"useDepths":true});