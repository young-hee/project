this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["ch-etude"] = this["AP"]["handlebars"]["display"]["ch-etude"] || {};

this["AP"]["handlebars"]["display"]["ch-etude"]["coupon-list-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "	<span class=\"layer_etu_coupon_tit_01\">다운로드 가능 쿠폰 총 <em>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.couponList : depth0)) != null ? stack1.length : stack1), depth0))
    + "</em>개</span>\n	<ul class=\"down_load_list\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.couponList : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</ul>\n	<button type=\"button\" class=\"btn_md_primary all_coupon_down btn_coupon_all_download\">전체 쿠폰 받기</button>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "			<li>\n				<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.couponName : depth0), depth0))
    + "</span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.useAbleYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "			</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "					<button class=\"btn_coupon btn_coupon_download\" type=\"button\" data-coupon-sn=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.couponSn : depth0), depth0))
    + "\">쿠폰다운</button>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "					<button class=\"btn_coupon complete btn_coupon_download\" type=\"button\" disabled>다운완료</button>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text\">쿠폰이 존재하지 않습니다.</p>\n	</div>\n	<div class=\"page_btns\">\n		<button class=\"btn_md_neutral btn_default_modal_confirm\" type=\"button\">확인</button>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.couponList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(7, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});