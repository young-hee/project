this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["common"] = this["AP"]["handlebars"]["common"] || {};

this["AP"]["handlebars"]["common"]["artist-talk-modal"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "<div class=\"banner\">\n<a href=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.banner : depth0)) != null ? stack1.url : stack1), depth0))
    + "\"><img src=\""
    + alias1((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.banner : depth0)) != null ? stack1.img : stack1),{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\" /></a>\n</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"padding15\">\n	<div class=\"visual\">\n		<img src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || alias2).call(alias1,"/images/cs/img_artist_talk.jpg",{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\" />\n		<p class=\"text font_md\">에뛰드하우스 전문 아티스트가<br>메이크업에 대한 고민을 해결해드립니다.</p>\n	</div>\n	<br>\n	<p class=\"text_center\">\n		상담시간 : 평일 오전 9시 ~ 오후 6시 <br><small>(점심시간 제외 : 오후 12시 ~ 1시)</small>\n	</p>\n	<hr class=\"div dashed m20\" />\n	<div>\n		<button type=\"button\" class=\"btn_lg_primary w100p btn_consultation\">상담하기</button>\n	</div>\n	<br>\n	<p class=\"text_notice\">톡 상담이 많을 경우 Artist와의 연결이 지연될 수 있어요.</p>\n</div>\n<!-- banner -->\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.banner : depth0),"&&",((stack1 = (depth0 != null ? depth0.banner : depth0)) != null ? stack1.img : stack1),{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});