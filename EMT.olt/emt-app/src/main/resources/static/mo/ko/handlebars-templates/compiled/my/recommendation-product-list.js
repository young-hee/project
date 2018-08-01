this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["recommendation-product-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<li class=\"ix-list-item item\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<span class=\"name\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.onlineProdName : depth0), depth0))
    + "</span>\n			</a>\n			\n			<div class=\"colors\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</div>			\n		</li>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "								<a href=\""
    + alias1((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[2] != null ? depths[2].onlineProdSn : depths[2]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\"><span class=\"thumb\"><img src=\"\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\""
    + alias1(alias2((depths[1] != null ? depths[1].onlineProdName : depths[1]), depth0))
    + "\"></span>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.first),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "								<a href=\""
    + alias1((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[2] != null ? depths[2].onlineProdSn : depths[2]),(depths[1] != null ? depths[1].prodSn : depths[1]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\"><span class=\"thumb\"><img src=\"\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\""
    + alias1(alias2((depths[1] != null ? depths[1].prodName : depths[1]), depth0))
    + "\"></span>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","Img",{"name":"xif","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"13":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"chip\" style=\"background-color: #"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.rgbVal : depth0), depth0))
    + "\"></span>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"chip\"><img alt=\"\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.colorchipImg : depth0), depth0))
    + "\"></span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<div class=\"ix-list-viewport\">\n<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>\n</div>";
},"useData":true,"useDepths":true});