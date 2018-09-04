this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["beauty-tester"] = this["AP"]["handlebars"]["display"]["beauty-tester"] || {};

this["AP"]["handlebars"]["display"]["beauty-tester"]["reviews"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<div class=\"tab_menu\">\n								<ul>\n									<li class=\"on\"><button type=\"button\">추천순</button></li>\n									<li><button type=\"button\">최신순</button></li>\n								</ul>\n							</div>\n							<div class=\"tab_contents\">\n								<div class=\"tab_cont\">\n									<div class=\"detail_review\">\n										<div class=\"tester_review\">\n											<div class=\"reviews\">\n												<ul>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.prodReviewListInfo : depth0)) != null ? stack1.prodReviewList : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "												</ul>\n											</div>\n										</div>\n									</div>\n								</div>\n							</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.lambda, alias4=container.escapeExpression;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),"==",0,{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "														<a href=\"#none\" style=\"width:100%;\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.topReviewYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1.length : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "															<span class=\"info\">\n																<span class=\"grade\"><b>"
    + alias4(alias3((depth0 != null ? depth0.scope : depth0), depth0))
    + "</b></span>\n																<b class=\"text\">"
    + alias4(alias3((depth0 != null ? depth0.prodReviewTitle : depth0), depth0))
    + "</b>\n															</span>\n														</a>\n													</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "													<li class=\"review_item no_photo\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "													<li class=\"review_item\">\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "															<img alt=\"베스트 리뷰\" class=\"best\" src=\"/pc/ko/images/event/ico_best.png\">\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "																<img alt=\"\" src=\""
    + container.escapeExpression(container.lambda(((stack1 = ((stack1 = (depth0 != null ? depth0.imgList : depth0)) != null ? stack1["0"] : stack1)) != null ? stack1.imageFileUrl : stack1), depth0))
    + "\">\n";
},"11":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"no_review\">\n								등록된 리뷰가 없습니다.\n							</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "							<h3 class=\"h_title\">등록된 리뷰</h3>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.prodReviewListInfo : depth0)) != null ? stack1.totalCount : stack1),">",0,{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(11, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});