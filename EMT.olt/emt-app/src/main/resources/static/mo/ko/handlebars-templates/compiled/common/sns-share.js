this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["sns-share"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"sns_share\">\n    <button type=\"button\" class=\"share_btn kakao_talk\" data-sns-type=\"kakao_talk\"><span class=\"sr_only\">카카오톡</span></button>\n    <button type=\"button\" class=\"share_btn twitter\" data-sns-type=\"twitter\"><span class=\"sr_only\">트위터</span></button>\n    <button type=\"button\" class=\"share_btn facebook\" data-sns-type=\"facebook\"><span class=\"sr_only\">페이스북</span></button>\n    <button type=\"button\" class=\"share_btn url\" data-sns-type=\"url\"><span class=\"sr_only\">URL</span></button>\n</div>\n<div class=\"text_center\">\n    URL을 선택하시면 주소를 복사할 수 있습니다.\n</div>";
},"useData":true});