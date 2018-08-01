this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["header"] = this["AP"]["handlebars"]["header"] || {};

this["AP"]["handlebars"]["header"]["weekly-best-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "			<li class=\"ix-list-item\">\n				<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),(depth0 != null ? depth0.prodSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n					<strong class=\"num\">"
    + alias3((helpers.numberCipher || (depth0 && depth0.numberCipher) || alias2).call(alias1,(depth0 != null ? depth0.rank : depth0),2,{"name":"numberCipher","hash":{},"data":data}))
    + "</strong> <span class=\"title\">"
    + alias3(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.rankChange : depth0),"!=",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</a>\n			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "						<span class=\"ranking "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.rankChange : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.rankChange : depth0),"<",0,{"name":"xif","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.rankChange : depth0), depth0))
    + " <span class=\"sr_only\">"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.rankChange : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.rankChange : depth0),"<",0,{"name":"xif","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</span></span>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "up";
},"5":function(container,depth0,helpers,partials,data) {
    return "down";
},"7":function(container,depth0,helpers,partials,data) {
    return "상승";
},"9":function(container,depth0,helpers,partials,data) {
    return "하락";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.flaggedProdRankChange : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});