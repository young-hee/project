this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["detail_info_notice"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<dl class=\"dl_cont2\">\n			<dt class=\"disclosure\" >"
    + alias2(alias1((depth0 != null ? depth0.disclosureItemName : depth0), depth0))
    + "</dt>\n			<dd class=\"disclosure\" >"
    + alias2(alias1((depth0 != null ? depth0.prodDisclosureInfo : depth0), depth0))
    + "</dd>\n		</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"section color_light_gray list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.selectedData : depth0)) != null ? stack1.disclosures : stack1),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});