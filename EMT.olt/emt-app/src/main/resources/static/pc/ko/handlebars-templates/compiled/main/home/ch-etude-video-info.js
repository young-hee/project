this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};
this["AP"]["handlebars"]["main"]["home"] = this["AP"]["handlebars"]["main"]["home"] || {};

this["AP"]["handlebars"]["main"]["home"]["ch-etude-video-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "		<img src=\""
    + alias2(alias1((depth0 != null ? depth0.videoImgDescP : depth0), depth0))
    + "\" data-src=\""
    + alias2(alias1((depth0 != null ? depth0.videoImgDescP : depth0), depth0))
    + "\">\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "\n<button type=\"button\" class=\"thumbnail\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.videoImgDescP : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</button>\n<iframe class=\"youtube_video\" width=\"800\" height=\"450\" src=\""
    + container.escapeExpression((helpers.youtubePath || (depth0 && depth0.youtubePath) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.articleVideoUrl : depth0),{"name":"youtubePath","hash":{},"data":data}))
    + "\" frameborder=\"0\" allowfullscreen=\"\" data-vendor=\"youtube\" data-ratio=\"true\" data-mute=\"false\">\n</iframe>\n\n	\n\n\n";
},"useData":true});