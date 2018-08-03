this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["thumbnail-video-info"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "\n<div class=\"video_wrap\">\n	<button type=\"button\" class=\"thumbnail\">\n		<img src=\""
    + alias2(alias1((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\" alt=\"\" data-src=\""
    + alias2(alias1((depth0 != null ? depth0.imgUrl : depth0), depth0))
    + "\">\n	</button>\n	<iframe class=\"youtube_video\" width=\"540\" height=\"540\" src=\""
    + alias2((helpers.youtubePath || (depth0 && depth0.youtubePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.videoUrl : depth0),{"name":"youtubePath","hash":{},"data":data}))
    + "\" frameborder=\"0\" allowfullscreen=\"\" data-vendor=\"youtube\" data-ratio=\"true\" data-mute=\"false\"></iframe>\n</div>";
},"useData":true});