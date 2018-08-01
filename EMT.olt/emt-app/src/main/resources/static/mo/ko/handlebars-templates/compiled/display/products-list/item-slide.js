this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["products-list"] = this["AP"]["handlebars"]["display"]["products-list"] || {};

this["AP"]["handlebars"]["display"]["products-list"]["item-slide"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "				<li class=\"ix-list-item\">\n					<a href=\""
    + alias1((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].onlineProdSn : depths[1]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n						<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\""
    + alias1(alias2((depths[1] != null ? depths[1].prodName : depths[1]), depth0))
    + "\">\n					</a>\n				</li>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.escapeExpression, alias2=container.lambda;

  return "				<li class=\"ix-list-item\">\n					<a href=\""
    + alias1((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].onlineProdSn : depths[1]),(depths[1] != null ? depths[1].prodSn : depths[1]),{"name":"productDetailPath","hash":{},"data":data}))
    + "\" class=\"lazy_load_wrap\">\n						<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias1(alias2((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\""
    + alias1(alias2((depths[1] != null ? depths[1].prodName : depths[1]), depth0))
    + "\">\n					</a>\n				</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.onlineProdImages : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n<div class=\"ix-controller\">\n	<ul class=\"ix-thumbs\">\n		<li class=\"ix-thumb\"><button type=\"button\" class=\"ix-btn\"><!--ix-index-->번째 배너</button></li>\n	</ul>\n</div>\n";
},"useData":true,"useDepths":true});