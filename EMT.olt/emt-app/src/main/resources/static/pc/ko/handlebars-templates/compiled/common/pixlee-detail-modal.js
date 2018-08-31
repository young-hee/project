this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["pixlee-detail-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<li class=\"ix-list-item\">\n					<button type=\"button\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.content_type : depth0),"==","video",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "					</button>\n				</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "							<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.thumbnail_url : depth0), depth0))
    + "\" alt=\"\">\n							<div class=\"play_button\"></div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.pixlee_cdn_photos : depth0)) != null ? stack1.square_medium_url : stack1), depth0))
    + "\" alt=\"\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<dt class=\"sr_only\">에뛰드픽 상세보기</dt>\n<dd class=\"layer_cont\">\n	<div class=\"slide view\" data-ix-options=\"view-length:1; loop:false;\">\n		<div class=\"ix-list-viewport\">\n			<ul class=\"ix-list-items\">\n			</ul>\n		</div>\n		<div class=\"ix-controller\">\n			<div class=\"slide_direction\">\n				<a class=\"ix-btn-prev\" href=\"#none\"><span class=\"sr_only\">Prev</span></a>\n				<a class=\"ix-btn-next\" href=\"#none\"><span class=\"sr_only\">Next</span></a>\n			</div>\n		</div>\n	</div>\n	<div class=\"slide thumbnail\" data-ix-options=\"view-length:9; datum-point:-10px;\">\n		<div class=\"ix-list-viewport\">\n			<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.model : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</ul>\n		</div>\n	</div>\n</dd>";
},"useData":true});