this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["option-slide-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<li class=\"ix-list-item\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.videoYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "				<div class=\"video_wrap\">\n					<button type=\"button\" class=\"thumbnail\"><img alt=\"\" src=\""
    + alias1(container.lambda((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\"></button>\n					<iframe class=\"youtube_video\" width=\"100%\" height=\"100%\" src=\""
    + alias1((helpers.youtubePath || (depth0 && depth0.youtubePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.videoUrl : depth0),{"name":"youtubePath","hash":{},"data":data}))
    + "\" frameborder=\"0\" allowfullscreen=\"\" data-vendor=\"youtube\" data-ratio=\"false\" data-mute=\"false\"></iframe>\n				</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "				<img alt=\"\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\">\n";
},"6":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<button type=\"button\" class=\"prd_btn_thm "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\"><img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\"\"></button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "on";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"ix-list-viewport\">\n	<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n</div>\n<div class=\"ix-controller\">\n	<div class=\"slide_direction\">\n		<a class=\"ix-btn-prev\" href=\"#\"><span class=\"sr_only\">Prev</span></a>\n		<a class=\"ix-btn-next\" href=\"#\"><span class=\"sr_only\">Next</span></a>\n	</div>\n</div>\n<div class=\"prd_thm_wrap preview_thumbs\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.prodImages : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});