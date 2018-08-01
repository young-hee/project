this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["option-slide-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<li class=\"ix-list-item\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.videoYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "	</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "			<div class=\"video_wrap\">\n				<button type=\"button\" class=\"thumbnail\"><img alt=\"\" src=\""
    + alias1(container.lambda((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\"></button>\n				<iframe class=\"youtube_video\" width=\"100%\" height=\"100%\" src=\""
    + alias1((helpers.youtubePath || (depth0 && depth0.youtubePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.videoUrl : depth0),{"name":"youtubePath","hash":{},"data":data}))
    + "\" frameborder=\"0\" allowfullscreen=\"\" data-vendor=\"youtube\" data-ratio=\"false\" data-mute=\"false\"></iframe>\n			</div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "			<img alt=\"\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});