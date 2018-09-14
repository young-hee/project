this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["search"] = this["AP"]["handlebars"]["display"]["search"] || {};

this["AP"]["handlebars"]["display"]["search"]["search-prod-filter"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<li><a href=\"#\" "
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==","0",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + " data-cate-sn=\""
    + alias2(alias1((depth0 != null ? depth0.displayCateSn : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.displayCateName : depth0), depth0))
    + "</a></li>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "class=\"on\"";
},"4":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "						<li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"brand_"
    + alias3((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "\" data-brand-sn=\""
    + alias3(alias4((depth0 != null ? depth0.brandSn : depth0), depth0))
    + "\"><label for=\"brand_"
    + alias3((helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "\">"
    + alias3(alias4((depth0 != null ? depth0.brandName : depth0), depth0))
    + "</label></span></li>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrCode : depth0),"!=","colorgroup",{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "			<dl>\n				<dt data-attr-code=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrCode : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.addAttrName : depth0), depth0))
    + "</dt>\n				<dd>\n					<ul class=\"leg_tgArea\">\n                        <!--/*\n                        /*상품특징\n                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"feature_1\"><label for=\"feature_1\">호수 있어요</label></span></li>\n                        /*쇼핑찬스\n                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"chance_1\"><label for=\"chance_1\">뷰티포인트 적용</label></span></li>\n                        /*인기\n                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"popular_1\"><label for=\"popular_1\">최고인기</label></span></li>\n                        /*판매상태\n                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"saleStatus_1\"><label for=\"saleStatus_1\">최고인기</label></span></li>\n                        /*PA\n                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"pa_1\"><label for=\"pa_1\">+</label></span></li>\n                        /*피부타입\n                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"skintype_1\"><label for=\"skintype_1\">민감성</label></span></li>\n                        /*텍스처\n                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"texture_1\"><label for=\"texture_1\">크림</label></span></li>\n                        */-->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						<!-- /*<li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"feature_1\"><label for=\"feature_1\">호수 있어요</label></span></li>\n						<li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"feature_2\"><label for=\"feature_2\">대용량 있어요</label></span></li>\n						<li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"feature_3\"><label for=\"feature_3\">스페셜세트</label></span></li>\n						<li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"feature_4\"><label for=\"feature_4\">옴므</label></span></li>\n						<li><span class=\"check_wrap\"><input type=\"checkbox\" id=\"feature_5\"><label for=\"feature_5\">Night 전용</label></span></li>*/-->\n					</ul>\n					<button type=\"button\" class=\"btn_src_more leg_btn\">더보기</button>\n				</dd>\n			</dl>\n";
},"8":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "                        <li><span class=\"check_wrap\"><input type=\"checkbox\" id=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "_"
    + alias2((helpers.calc || (depth0 && depth0.calc) || alias4).call(alias3,(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "\" data-val-code=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\"><label for=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "_"
    + alias2((helpers.calc || (depth0 && depth0.calc) || alias4).call(alias3,(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "</label></span></li>\n";
},"10":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrCode : depth0),"==","colorgroup",{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "			<dl>\n				<dt>색상</dt>\n				<dd>\n					<ul class=\"colors\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.addAttrVals : depth0),{"name":"each","hash":{},"fn":container.program(12, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n				</dd>\n			</dl>\n";
},"12":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "						<li>\n							<span>\n								<input type=\"checkbox\" id=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "_"
    + alias2((helpers.calc || (depth0 && depth0.calc) || alias4).call(alias3,(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "\" data-val-code=\""
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\">\n								<label for=\""
    + alias2(alias1((depths[1] != null ? depths[1].addAttrCode : depths[1]), depth0))
    + "_"
    + alias2((helpers.calc || (depth0 && depth0.calc) || alias4).call(alias3,(data && data.index),"+",1,{"name":"calc","hash":{},"data":data}))
    + "\" style=\"background-color:"
    + alias2(alias1((depth0 != null ? depth0.addAttrValCode : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.addAttrValName : depth0), depth0))
    + "</label>\n							</span>\n						</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	<div class=\"category\">\n		<ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.displayCates : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n	</div>\n	<fieldset class=\"form\">\n		<legend class=\"sr_only\">선택 옵션 선택</legend>\n		<button type=\"button\" class=\"btn_lg_gradient init\">선택 옵션 초기화</button>\n		<div class=\"filter_option\">\n			<dl>\n				<dt>브랜드</dt>\n				<dd>\n					<ul class=\"leg_tgArea\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.brands : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					</ul>\n					<button type=\"button\" class=\"btn_src_more leg_btn\">더보기</button>\n				</dd>\n			</dl>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.addAttrs : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.addAttrs : depth0),{"name":"each","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</div>\n	</fieldset>\n\n<script language=\"javascript\" type=\"text/javascript\">\n	// 갯수에 따른 더보기 토글 모션 관련 js\n	$('.leg_tgArea').each(function(){\n		var $legArea = $(this),\n			$legIp = $legArea.find('> li'),\n			$totalLeng = $legIp.length,\n			$showLeng = 5, // 노출 할 li 갯수\n			$showH = $legIp.height() * $showLeng,\n			$legMore = $legArea.parent().find('.leg_btn');\n\n		if ($totalLeng > $showLeng){\n			$legMore.show();\n			$legArea.css('height',$showH);\n			$legMore.on('click', function(){\n				var $moreThis = $(this);\n				$moreThis.toggleClass('on');\n				if ($moreThis.hasClass('on')){\n					$legArea.css('height','auto');\n				} else {\n					$legArea.css('height',$showH);\n				}\n			});\n		} else {\n			$legMore.hide();\n		}\n	}); \n</script>";
},"useData":true,"useDepths":true});