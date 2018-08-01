this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["brand"] = this["AP"]["handlebars"]["display"]["brand"] || {};

this["AP"]["handlebars"]["display"]["brand"]["color-factory-store"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<dl data-store-sn=\""
    + alias2(alias1((depth0 != null ? depth0.storeSn : depth0), depth0))
    + "\" data-lat=\""
    + alias2(alias1((depth0 != null ? depth0.latitude : depth0), depth0))
    + "\" data-lng=\""
    + alias2(alias1((depth0 != null ? depth0.longitude : depth0), depth0))
    + "\">\n	<dt><button type=\"button\">"
    + alias2(alias1((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</button></dt>\n	<dd style=\"display: block\">\n		<div class=\"clear\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.storeImgUrlList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<div class=\"map_area\"></div>\n		</div>\n		<div class=\"info\">\n			<dl>\n				<dt>"
    + alias2(alias1((depth0 != null ? depth0.storeName : depth0), depth0))
    + "</dt>\n				<dd>\n					<span class=\"color_gray\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address1 : stack1), depth0))
    + ", "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.address : depth0)) != null ? stack1.address2 : stack1), depth0))
    + "</span>\n					<br>"
    + alias2((helpers.phoneNumberFormat || (depth0 && depth0.phoneNumberFormat) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.phoneNo1 : depth0)) != null ? stack1.phoneNo : stack1),{"name":"phoneNumberFormat","hash":{},"data":data}))
    + "\n				</dd>\n			</dl>\n			<button class=\"btn_md_bordered print\"><span class=\"ico_print\"></span>지도인쇄</button>\n		</div>\n	</dd>\n</dl>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<div class=\"slide\" data-ix-options=\"view-length:1;\">\n					<div class=\"ix-list-viewport\">\n						<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storeImgUrlList : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</ul>\n					</div>\n					<div class=\"ix-controller round_box\">\n						<div class=\"paging\"><b class=\"current\">1</b> / <span class=\"total\"></span></div>\n						<div class=\"slide_direction\">\n							<a class=\"ix-btn-prev\" href=\"#none\"><span class=\"sr_only\">Prev</span></a>\n							<a class=\"ix-btn-next\" href=\"#none\"><span class=\"sr_only\">Next</span></a>\n						</div>\n					</div>\n				</div>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "							<li class=\"ix-list-item\">\n								<a href=\"#none\">\n									<img alt=\"\" src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"absolutePath","hash":{},"data":data}))
    + "\">\n								</a>\n							</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.storeExList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});