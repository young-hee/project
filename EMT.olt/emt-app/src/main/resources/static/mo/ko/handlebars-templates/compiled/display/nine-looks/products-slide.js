this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["nine-looks"] = this["AP"]["handlebars"]["display"]["nine-looks"] || {};

this["AP"]["handlebars"]["display"]["nine-looks"]["products-slide"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<li class=\"ix-list-item\">\n			<a href=\""
    + alias2(alias1((depth0 != null ? depth0.url : depth0), depth0))
    + "\">\n				<img alt=\"\" src=\""
    + alias2(alias1((depth0 != null ? depth0.img : depth0), depth0))
    + "\">\n			</a>\n		</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n		<li class=\"ix-list-item\">\n			<img alt=\"\" src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(alias1,"images/beautylife/img_buy_now.png",{"name":"absolutePath","hash":{},"data":data}))
    + "\">\n		</li>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>";
},"useData":true});