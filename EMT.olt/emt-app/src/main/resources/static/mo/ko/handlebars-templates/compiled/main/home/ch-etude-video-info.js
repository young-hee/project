this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["ch-etude-video-info"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<button type=\"button\" class=\"thumbnail\">\n	<img alt=\"\" src=\""
    + alias2(alias1((depth0 != null ? depth0.videoImgDescM : depth0), depth0))
    + "\" data-src=\""
    + alias2(alias1((depth0 != null ? depth0.videoImgDescM : depth0), depth0))
    + "\">\n</button>\n	<iframe class=\"youtube_video\" width=\"800\" height=\"450\" src=\""
    + alias2((helpers.youtubePath || (depth0 && depth0.youtubePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.articleVideoUrl : depth0),{"name":"youtubePath","hash":{},"data":data}))
    + "\" frameborder=\"0\" allowfullscreen=\"\" data-vendor=\"youtube\" data-ratio=\"true\" data-mute=\"false\">\n</iframe>\n\n\n	\n\n\n";
},"useData":true});