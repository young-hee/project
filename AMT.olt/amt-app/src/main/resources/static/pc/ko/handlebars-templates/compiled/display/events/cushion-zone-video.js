this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["cushion-zone-video"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<dd class=\"layer_cont\">\n	<div class=\"video_wrap\">\n		<button type=\"button\" class=\"thumbnail\"><img alt=\"\" src=\""
    + alias2(alias1((depth0 != null ? depth0.videoImgThumbnailUrl : depth0), depth0))
    + "\"></button>\n		<iframe class=\"youtube_video\" width=\"800\" height=\"450\" src=\""
    + alias2(alias1((depth0 != null ? depth0.videoUrl : depth0), depth0))
    + "?enablejsapi=1\" frameborder=\"0\" allowfullscreen=\"\" data-vendor=\"youtube\" data-ratio=\"true\" data-mute=\"false\"></iframe>\n	</div>\n</dd>\n\n\n";
},"useData":true});