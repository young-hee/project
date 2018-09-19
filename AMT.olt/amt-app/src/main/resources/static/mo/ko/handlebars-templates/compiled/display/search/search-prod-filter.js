this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["search"] = this["AP"]["handlebars"]["display"]["search"] || {};

this["AP"]["handlebars"]["display"]["search"]["search-prod-filter"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<li><a href=\"javascript:;\" data-attr-code=\"brand\" data-brand-sn=\""
    + alias2(alias1((depth0 != null ? depth0.brandSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.brandName : depth0), depth0))
    + "</a></li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "							<li><a href=\"javascript:;\" data-attr-code=\"flag\" data-val-code=\""
    + alias2(alias1(depth0, depth0))
    + "\">"
    + alias2(alias1(depth0, depth0))
    + "</a></li>\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrCode : depth0),"!=","colorgroup",{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrCode : depth0),"!=","price",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "					<dl>\n						<dt class=\"on\"><button type=\"button\"><span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.addAttrName : depth0), depth0))
    + "<i class=\"ico_navi\"></i></span></button></dt>\n						<dd>\n							<div class=\"srch_filter_list01\">\n								<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "								</ul>\n							</div>\n						</dd>\n					</dl>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "										<li><a href=\"javascript:;\" data-attr-code=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "\" class=\"btn"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.selected : depth0),"==",true,{"name":"xif","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\" data-val-code=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "</a></li>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return " on";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrCode : depth0),"==","colorgroup",{"name":"xif","hash":{},"fn":container.program(12, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"12":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<dl>\n			<dt class=\"on\"><button type=\"button\"><span>색상<i class=\"ico_navi\"></i></span></button></dt>\n			<dd style=\"display:block\">\n				<div class=\"color_ck_wrap\">\n					<ul class=\"color_ck_list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						<!--<li><span class=\"img\"><img src=\"/mo/ko/images/dummy/img_ck_col01.png\" alt=\"\" /></span></li>-->\n					</ul>\n				</div>\n			</dd>\n		</dl>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "							<li><span style=\"background-color:"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\"></span></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<div class=\"srch_filter_wrap\">\n	<div class=\"ui_accordion\">\n		<!-- 브랜드 -->\n		<dl>\n			<dt class=\"on\"><button type=\"button\"><span>브랜드<i class=\"ico_navi\"></i></span></button></dt>\n			<dd style=\"display:block\">\n				<div class=\"srch_filter_list01\">\n					<ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.brands : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</div>\n			</dd>\n		</dl>\n		<!-- 쇼핑찬스 -->\n		<dl>\n			<dt class=\"on\"><button type=\"button\"><span>쇼핑찬스<i class=\"ico_navi\"></i></span></button></dt>\n			<dd style=\"display:block\">\n				<div class=\"srch_filter_list01\">\n					<ul class=\"chk_other\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.flags : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</div>\n			</dd>\n		</dl>\n			\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.addAttrs : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.addAttrs : depth0),{"name":"each","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		\n		<!-- 가격 -->\n		<dl>\n			<dt class=\"on\"><button type=\"button\"><span>가격<i class=\"ico_navi\"></i></span></button></dt>\n			<dd style=\"display:block\">\n				<div class=\"price_sel01\">\n					<ul>\n						<li><a href=\"javascript:;\" data-attr-code=\"price\" id=\"price0\" data-min=\"0\" data-max=\"29999\">3만원미만</a></li>\n						<li><a href=\"javascript:;\" data-attr-code=\"price\" id=\"price3\" data-min=\"30000\" data-max=\"49999\">3~5만원</a></li>\n						<li><a href=\"javascript:;\" data-attr-code=\"price\" id=\"price5\" data-min=\"50000\" data-max=\"69999\">5~7만원이상</a></li>\n						<li><a href=\"javascript:;\" data-attr-code=\"price\" id=\"price7\" data-min=\"70000\" data-max=\"-1\">7만원이상</a></li>\n					</ul>\n				</div>\n				<div class=\"price_input_area\">\n					<span class=\"input_h48_gray\"><input type=\"text\" name=\"min\" placeholder=\"최소금액\" /></span><span class=\"p_bar\">-</span><span class=\"input_h48_gray\"><input type=\"text\" name=\"max\" placeholder=\"최대금액\" /></span>\n				</div>\n\n			</dd>\n		</dl>\n	</div>\n	<div class=\"btn_wrap\">\n		<ul class=\"btn_col2_area\">\n			<li><a href=\"javascript:;\" class=\"btn_h50_gy reset\">초기화</a></li>\n			<li><a href=\"javascript:;\" class=\"btn_h50_bk apply\">적용</a></li>\n		</ul>\n	</div>\n</div>";
},"useData":true,"useDepths":true});