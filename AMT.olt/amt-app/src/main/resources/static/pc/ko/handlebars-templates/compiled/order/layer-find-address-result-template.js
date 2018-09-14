this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["layer-find-address-result-template"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<div class=\"con_top_box\">\n		<span class=\"title\">검색결과</span><span class=\"total_num_purple\">"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.totalLengthLabel : depth0), depth0))
    + "건</span>\n	</div>		<!-- // con_top_box -->\n	<div class=\"con_bottom_box\">\n		<div class=\"coupon_ck_list_line\">\n			<div class=\"scroll\">\n				<ul class=\"address_ck_list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.result : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n			</div>\n		</div>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "						<li>\n							<span class=\"check_wrap rdo_type2 right\">\n								<input type=\"radio\" id=\"item"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" name=\"select\" id=\"item"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-sel-index=\""
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" data-post-code=\""
    + alias4(alias5((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "\" data-detail-address=\""
    + alias4(alias5((depth0 != null ? depth0.roadAddrPart2 : depth0), depth0))
    + "\" data-address=\""
    + alias4(alias5((depth0 != null ? depth0.roadAddrPart1 : depth0), depth0))
    + "\">\n								<label for=\"item"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n									<span class=\"txt\">\n										<span class=\"name\"><span>도로명</span></span>\n										<em>"
    + alias4(alias5((depth0 != null ? depth0.roadAddr : depth0), depth0))
    + "</em>\n									</span>\n									<span class=\"txt\">\n										<span class=\"name\"><span>지번</span></span>\n										<em>"
    + alias4(alias5((depth0 != null ? depth0.jibunAddr : depth0), depth0))
    + " <strong class=\"zip\">우편번호 "
    + alias4(alias5((depth0 != null ? depth0.zipNo : depth0), depth0))
    + "</strong></em>\n									</span>\n								</label>\n							</span>\n							<div class=\"detail\">\n								<span class=\"input_wrap\" id=\"addInput"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\">\n									<input type=\"text\" class=\"input_detail\" id=\"inputDetail"
    + alias4(((helper = (helper = helpers.index || (data && data.index)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"index","hash":{},"data":data}) : helper)))
    + "\" placeholder=\"상세주소 입력\">\n								</span>\n								<div class=\"mg_side\">\n									<a href=\"#1\" class=\"btn_full disabled\">확인</a>\n								</div>\n							</div>\n						</li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "	<p class=\"count\">검색결과가 없습니다.</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalLength : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "<script >\n	$('.address_ck_list li .check_wrap.rdo_type2.right').click(function(){\n		$('.input_detail').each(function(){\n			$(this).val(\"\"); \n		})\n		$('.btn_full').each(function(){\n			$(this).addClass(\"disabled\");\n		})\n\n		$(this).closest(\"li\").addClass('on').siblings().removeClass('on');\n	});\n\n	$('.input_detail').on('keyup', function(){\n		if($(this).val() == \"\"){\n			console.log($(this).val());\n			$('.btn_full').addClass(\"disabled\");\n		}else{\n			console.log($(this).val());\n			$('.btn_full').removeClass(\"disabled\");\n		}\n	})\n</script>\n";
},"useData":true});