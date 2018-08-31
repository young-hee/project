this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["etude-pick"] = this["AP"]["handlebars"]["display"]["etude-pick"] || {};

this["AP"]["handlebars"]["display"]["etude-pick"]["pixlee-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "	<a href=\"#none\" class=\"lazy_load_wrap\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.content_type : depth0),"==","video",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.program(4, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "	</a>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "			<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias1(container.lambda((depth0 != null ? depth0.medium_url : depth0), depth0))
    + "\" alt=\""
    + alias1((helpers.decodeURIComponent || (depth0 && depth0.decodeURIComponent) || alias3).call(alias2,(depth0 != null ? depth0.alt_text : depth0),{"name":"decodeURIComponent","hash":{},"data":data}))
    + "\" data-idx=\""
    + alias1((helpers.calc || (depth0 && depth0.calc) || alias3).call(alias2,(depths[1] != null ? depths[1].startIdx : depths[1]),"+",(data && data.index),{"name":"calc","hash":{},"data":data}))
    + "\" />\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "			<img class=\"lazy_load\" src=\"\" data-src=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.pixlee_cdn_photos : depth0)) != null ? stack1.square_medium_url : stack1), depth0))
    + "\" alt=\""
    + alias1((helpers.decodeURIComponent || (depth0 && depth0.decodeURIComponent) || alias3).call(alias2,(depth0 != null ? depth0.alt_text : depth0),{"name":"decodeURIComponent","hash":{},"data":data}))
    + "\" data-idx=\""
    + alias1((helpers.calc || (depth0 && depth0.calc) || alias3).call(alias2,(depths[1] != null ? depths[1].startIdx : depths[1]),"+",(data && data.index),{"name":"calc","hash":{},"data":data}))
    + "\" />\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.data : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});