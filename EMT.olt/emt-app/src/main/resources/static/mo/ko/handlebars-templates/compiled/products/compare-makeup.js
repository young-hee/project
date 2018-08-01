this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["compare-makeup"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",12,{"name":"calc","hash":{},"data":data}),"==",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "									<li>\n										<a href=\"javascript:;\" data-prod-sn=\""
    + alias4(alias3((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.saleDisplayStatus : depth0),"==","OutOfStock",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n											<img alt=\""
    + alias4(alias3((depth0 != null ? depth0.prodName : depth0), depth0))
    + "\" src=\""
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.colorchipTypeCode : depth0),"==","RGB",{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.program(10, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\n										</a>\n									</li>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",12,{"name":"calc","hash":{},"data":data}),"==",11,{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "							<li class=\"ix-list-item\">\n								<ul>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "style=\"background-color:#"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.rgbVal : depth0), depth0))
    + "\"";
},"6":function(container,depth0,helpers,partials,data) {
    return "												<span class=\"sold_out\"><span>품절</span></span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"/images/product/color_chips_img_blank.png",{"name":"absolutePath","hash":{},"data":data}));
},"10":function(container,depth0,helpers,partials,data) {
    return container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.colorchipImg : depth0),{"name":"absolutePath","hash":{},"data":data}));
},"12":function(container,depth0,helpers,partials,data) {
    return "								</ul>\n							</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"makeup_list\">\n	<ul class=\"list_bullet_dot\">\n		<li>컬러만 비교하는 화면입니다.</li>\n		<li>화면을 닫으시면 비교하신 정보는 없어집니다.</li>\n	</ul>\n</div>\n\n<div class=\"panel notice\">\n	<i class=\"ico\"></i>\n	<p class=\"text\">아래에서 비교하실<br>착색 컬러를 선택해주세요.</p>\n</div>\n\n<div class=\"panel no_padding preview_area\" style=\"display:none;\">\n	<div class=\"compare_items\">\n		<ul>\n		</ul>\n	</div>\n</div>\n\n<div class=\"option_floating color_compare open\">\n	<button type=\"button\" class=\"btn_float_close\"><span class=\"sr_only\">닫기</span></button>\n	<div class=\"color_area\">\n\n		<div class=\"select_colors\">\n			<ul>\n			</ul>\n		</div>\n\n		<div class=\"color_chips\">\n			<div class=\"slide\" data-ix-options=\"view-length:1; loop:false;\">\n				<div class=\"ix-list-viewport\">\n					<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.products : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</div>\n				<div class=\"ix-controller\">\n					<ul class=\"ix-thumbs\">\n						<li class=\"ix-thumb\"><button type=\"button\" class=\"ix-btn\"><!--ix-index--> page</button></li>\n					</ul>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>";
},"useData":true});