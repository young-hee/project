this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["latest-product"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",3,{"name":"calc","hash":{},"data":data}),"==",0,{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<div class=\"product\">\n						<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.prodSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n							<span class=\"info\">\n								<span class=\"title\">"
    + alias3(alias4((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n								<span class=\"option\">"
    + alias3(alias4((depth0 != null ? depth0.prodOption : depth0), depth0))
    + "</span>\n								<span class=\"price\"><del>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(depth0 != null ? depth0.delPrice : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "원</del> <em class=\"num\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(depth0 != null ? depth0.realPrice : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "</em>원</span>\n							</span>\n							<img src=\""
    + alias3(alias4((depth0 != null ? depth0.prodImgUrl : depth0), depth0))
    + "\" alt=\"\" data-index=\""
    + alias3(alias4(((stack1 = (depths[1] != null ? depths[1].list : depths[1])) != null ? stack1.length : stack1), depth0))
    + "\">\n						</a>\n						<button class=\"btn_del\" data-product-sn="
    + alias3(alias4((depth0 != null ? depth0.prodSn : depth0), depth0))
    + "><i class=\"ico_close_b_s\"></i><span class=\"sr_only\">최근 본 상품 삭제</span></button>\n					</div>    \n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"%",3,{"name":"calc","hash":{},"data":data}),"==",2,{"name":"xif","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(data && data.index),"==",(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].list : depths[1])) != null ? stack1.length : stack1),"-",1,{"name":"calc","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data) {
    return "					<li class=\"ix-list-item\">\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(data && data.index),"!=",(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,((stack1 = (depths[1] != null ? depths[1].list : depths[1])) != null ? stack1.length : stack1),"-",1,{"name":"calc","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data) {
    return "						</li>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "					</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "<dt>최근본상품<em id=\"totalCnt\">20</em></dt>\n<div class=\"slide\">\n	<div class=\"ix-list-viewport\">\n		<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<div class=\"ix-controller\">\n		<div class=\"slide_direction\">\n			<button type=\"button\" class=\"ix-btn-prev\"><i class=\"ico_navi_s prev\"></i><span class=\"sr_only\">Prev</span></button>\n			<button type=\"button\" class=\"ix-btn-next\"><i class=\"ico_navi_s next\"></i><span class=\"sr_only\">Next</span></button>\n		</div>\n	</div>\n</div>";
},"useData":true,"useDepths":true});