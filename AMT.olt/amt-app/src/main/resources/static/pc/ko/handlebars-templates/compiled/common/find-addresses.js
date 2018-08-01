this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["find-addresses"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"panel gray\">\n    <div class=\"panel_cont\">\n        <p class=\"text\"><span class=\"color_dark_gray\">찾으시는 주소지 또는 건물명을 입력해 주세요.</span> (예 : 강남대로, 한강로2가, 한강대로 100)</p>\n        <div class=\"input_wrap mgt20\">\n            <input type=\"text\" class=\"keyword\" title=\"검색어 입력\" placeholder=\"예) 서초동/강남대로/에뛰드\">\n            <button type=\"button\" class=\"btn_search\"><span class=\"sr_only\">검색</span></button>\n            <button class=\"input_del\" style=\"display: none;\"><i class=\"ico_close_w\"></i><span class=\"sr_only\">검색어 삭제</span></button>\n        </div>\n    </div>\n</div>\n<div class=\"address_result\">\n\n</div>";
},"useData":true});