this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["product-list"] = this["AP"]["handlebars"]["display"]["product-list"] || {};

this["AP"]["handlebars"]["display"]["product-list"]["item-slide"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "				<li class=\"ix-list-item\">\n					<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depths[1] != null ? depths[1].onlineProdSn : depths[1]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n						<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias3((helpers.replaceImagePath || (depth0 && depth0.replaceImagePath) || alias2).call(alias1,(depth0 != null ? depth0.imgUrl : depth0),270,270,{"name":"replaceImagePath","hash":{},"data":data}))
    + "\" alt=\""
    + alias3(container.lambda((depths[1] != null ? depths[1].onlineProdName : depths[1]), depth0))
    + "\">\n						"
    + ((stack1 = (helpers.stockImg || (depth0 && depth0.stockImg) || alias2).call(alias1,(depths[1] != null ? depths[1].saleDisplayStatus : depths[1]),(depths[1] != null ? depths[1].prodTypeCode : depths[1]),{"name":"stockImg","hash":{},"data":data})) != null ? stack1 : "")
    + "\n					</a>\n				</li>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "				<li class=\"ix-list-item\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.membershipExchOnly : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.program(8, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "						<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias3((helpers.replaceImagePath || (depth0 && depth0.replaceImagePath) || alias2).call(alias1,(depth0 != null ? depth0.imgUrl : depth0),270,270,{"name":"replaceImagePath","hash":{},"data":data}))
    + "\" alt=\""
    + alias3(container.lambda((depths[1] != null ? depths[1].prodName : depths[1]), depth0))
    + "\">\n					</a>\n				</li>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "					<a href=\""
    + container.escapeExpression((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].onlineProdSn : depths[1]),(depths[1] != null ? depths[1].prodSn : depths[1]),true,{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "					<a href=\""
    + container.escapeExpression((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].onlineProdSn : depths[1]),(depths[1] != null ? depths[1].prodSn : depths[1]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n<div class=\"ix-controller\">\n	<ul class=\"ix-thumbs\">\n		<li class=\"ix-thumb\"><button type=\"button\" class=\"ix-btn\"><!--ix-index-->번째 배너</button></li>\n	</ul>\n</div>";
},"useData":true,"useDepths":true});