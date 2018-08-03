this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["looks-article-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<li class=\"ix-list-item\">\n			<a href=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.linkUrl : stack1), depth0))
    + "\" class=\"lazy_load_wrap\">\n				<img src=\"\" data-src=\""
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imgUrl : stack1), depth0))
    + "\" alt=\"\" class=\"lazy_load\">\n				<span class=\"cont\">\n					<b class=\"eng\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["1"] : stack1)) != null ? stack1.text : stack1), depth0))
    + "</b>\n					"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["2"] : stack1),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n					"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["3"] : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n					"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["4"] : stack1),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n					"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["5"] : stack1),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n				</span>\n			</a>\n		</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"tag\">"
    + container.escapeExpression((helpers.toTagshape || (depth0 && depth0.toTagshape) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["2"] : stack1)) != null ? stack1.text : stack1),{"name":"toTagshape","hash":{},"data":data}))
    + "</span>";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"tag\">"
    + container.escapeExpression((helpers.toTagshape || (depth0 && depth0.toTagshape) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["3"] : stack1)) != null ? stack1.text : stack1),{"name":"toTagshape","hash":{},"data":data}))
    + "</span>";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"tag\">"
    + container.escapeExpression((helpers.toTagshape || (depth0 && depth0.toTagshape) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["4"] : stack1)) != null ? stack1.text : stack1),{"name":"toTagshape","hash":{},"data":data}))
    + "</span>";
},"8":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<span class=\"tag\">"
    + container.escapeExpression((helpers.toTagshape || (depth0 && depth0.toTagshape) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.contents : depth0)) != null ? stack1["5"] : stack1)) != null ? stack1.text : stack1),{"name":"toTagshape","hash":{},"data":data}))
    + "</span>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.contentsSets : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</ul>";
},"useData":true});