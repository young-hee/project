this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["main"] = this["AP"]["handlebars"]["main"] || {};

this["AP"]["handlebars"]["main"]["layer-movie"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n<iframe width=\"916\" height=\"515\" src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.vodUrl : depth0), depth0))
    + "\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>";
},"useData":true});