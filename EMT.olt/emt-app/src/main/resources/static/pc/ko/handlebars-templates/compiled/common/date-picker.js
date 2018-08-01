this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["date-picker"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"date_picker_layer\" style=\"display:block; visibility:hidden;\">\n    <div class=\"layer_wrap\">\n        <div class=\"calendar_wrap\">\n            <div class=\"date\">\n                <button type=\"button\" class=\"navi_prev\"><i class=\"ico_prev\"></i><span class=\"sr_only\">prev month</span></button>\n                <button type=\"button\" class=\"date_select\"></button>\n                <button type=\"button\" class=\"navi_next\"><i class=\"ico_next\"></i><span class=\"sr_only\">next month</span></button>\n                <div class=\"date_list_layer\">\n                </div>\n            </div>\n            <div class=\"calendar_content\">\n            </div>\n        </div>\n    </div>\n</div>";
},"useData":true});