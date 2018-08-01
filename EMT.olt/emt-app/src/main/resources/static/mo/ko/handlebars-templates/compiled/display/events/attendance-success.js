this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["attendance-success"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div><img src=\""
    + alias3((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,"/images/event/img_attendance_02.jpg",{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\"></div>\n<p class=\"h_title cont text_center\"><strong>"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,(depth0 != null ? depth0.today : depth0),"MM월 DD일",{"name":"dateFormat","hash":{},"data":data}))
    + " 출석체크되었습니다.</strong></p>\n<p class=\"h_title text_center mgt15 lh\">출첵 시 <em>매일 진주알 1알</em>씩 지급되며,<br>10일/ 30일 개근 시 더 많은 진주알을 드립니다.</p>\n";
},"useData":true});