this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["search"] = this["AP"]["handlebars"]["display"]["search"] || {};

this["AP"]["handlebars"]["display"]["search"]["search-brand-box"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "		<dl class=\"brand_info\">\n          <dt>\n            <a href=\"#none\"><img alt=\"\" src=\"/mo/ko/images/dummy/img_brand_01.png\" class=\"brand\"><span>헤라</span> <i class=\"ico_arr\"></i></a>\n            <!--/* 좋아요 */-->\n            <button type=\"button\" class=\"btn_toggle\" onclick=\"$(this).toggleClass('on'); $(this).find('i').toggleClass('on')\"><i class=\"ico_heart_s\"></i><span class=\"sr_only\">좋아요</span></button>\n          </dt>\n          <dd>\n            <div class=\"tags scrollable_x\">\n              <a href=\"javascript:;\">#루즈홀릭</a>\n              <a href=\"javascript:;\">#에이지어웨이</a>\n              <a href=\"javascript:;\">#서울리스타</a>\n              <a href=\"javascript:;\">#루즈홀릭</a>\n              <a href=\"javascript:;\">#에이지어웨이</a>\n              <a href=\"javascript:;\">#서울리스타</a>\n            </div>\n          </dd>\n        </dl>";
},"useData":true});