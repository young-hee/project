this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};
this["AP"]["handlebars"]["my"]["order"]["detail"] = this["AP"]["handlebars"]["my"]["order"]["detail"] || {};

this["AP"]["handlebars"]["my"]["order"]["detail"]["claim-reason"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "<div class=\"reason gray\">\n	<dl>\n		<dt>"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + " 사유</dt>\n		<dd>"
    + alias2(alias1((depth0 != null ? depth0.receivedClaimReasonName : depth0), depth0))
    + "</dd>\n	</dl>\n	<dl>\n		<dt>"
    + alias2(alias1((depth0 != null ? depth0.title : depth0), depth0))
    + " 내용</dt>\n		<dd>"
    + alias2(alias1((depth0 != null ? depth0.foReceivedClaimReason : depth0), depth0))
    + "</dd>\n	</dl>\n</div>";
},"useData":true});