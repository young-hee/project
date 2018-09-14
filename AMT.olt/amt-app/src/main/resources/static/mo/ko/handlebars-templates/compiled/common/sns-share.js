this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["sns-share"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<ul class=\"sns_share\">\n    <li class=\"share_btn kakao_talk\" data-sns-type=\"kakao_talk\"><a href=\"javascript:;\"><i class=\"ico_kakao\"></i><span class=\"sr_only\">카카오톡</span></a></li>\n    <li class=\"share_btn facebook\" data-sns-type=\"facebook\"><a href=\"javascript:;\"><i class=\"ico_facebook\"></i><span class=\"sr_only\">페이스북</span></a></li>\n    <li class=\"share_btn url\" data-sns-type=\"url\"><a href=\"javascript:;\"><i class=\"ico_url\"></i><span class=\"sr_only\">URL</span></a></li>\n</ul>\n";
},"useData":true});