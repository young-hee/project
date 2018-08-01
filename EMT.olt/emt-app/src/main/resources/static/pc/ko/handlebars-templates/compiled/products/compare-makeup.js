this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["compare-makeup"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "			<li data-prod-sn=\""
    + alias2(alias1((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\">\n				<a href=\"javascript:;\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n					<img src=\""
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.program(8, data, 0),"data":data})) != null ? stack1 : "")
    + "\" alt=\""
    + alias2(alias1((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\">\n				</a>\n			</li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "style=\"background-color:#"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.rgbVal : depth0), depth0))
    + "\"";
},"4":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"sold_out\"><span>품절</span></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"/images/common/transparent_40x40.png",{"name":"absolutePath","hash":{},"data":data}));
},"8":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.colorchipImg : depth0),{"name":"absolutePath","hash":{},"data":data}));
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<ul class=\"list_bullet_dot light\">\n	<li>착색 컬러만 비교하는 화면입니다.</li>\n	<li>화면을 닫으시면 비교하신 정보는 없어집니다.</li>\n</ul>\n<div class=\"compare_colors\">\n	<!--/* 컬러칩 목록 */-->\n	<ul class=\"color_chip_list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n	<!--/* 선택된 컬러 */-->\n	<div class=\"selected_colors\">\n		<span>선택</span>\n		<ul>\n		</ul>\n	</div>\n	<!--/* 메이크업 비교 목록 */-->\n	<ul class=\"compare_result\">\n		<li class=\"no_result\">\n			<div>\n				<i class=\"ico\"></i>\n				<p class=\"text_primary\">비교하실 착색 컬러를<br>선택해 주세요.</p>\n			</div>\n		</li>\n	</ul>\n</div>";
},"useData":true});