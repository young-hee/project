this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["loading-modal"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"loading\" style=\"min-height:250px;\">\n	<span style=\"position:absolute; top:50%; margin:-14px 0 0 -35px;\">\n		<img src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"/images/common/loading.gif",{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n	</span>\n</div>";
},"useData":true});