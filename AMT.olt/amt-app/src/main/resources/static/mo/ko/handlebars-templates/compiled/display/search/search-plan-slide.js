this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["search"] = this["AP"]["handlebars"]["display"]["search"] || {};

this["AP"]["handlebars"]["display"]["search"]["search-plan-slide"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "                  <li class=\"ix-list-item\">\n                  <a href=\"/display/event_detail?planDisplaySn="
    + alias2(alias1((depth0 != null ? depth0.planDisplaySn : depth0), depth0))
    + "\"><img src=\""
    + alias2(alias1((depth0 != null ? depth0.bannerImgP1 : depth0), depth0))
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "\"></a>                    \n                  </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<div class=\"slide page-slide\" data-ix-options=\"auto-play:true; paging:true; view-length:1;\">\n      		<div class=\"ix-list-viewport\">\n      			<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      			</ul>\n      		</div>\n      		<div class=\"ix-controller white_overlay\">\n      			<div class=\"paging\"><strong class=\"current\"></strong> / <span class=\"total\"></span></div>\n      		</div>\n      	</div>";
},"useData":true});