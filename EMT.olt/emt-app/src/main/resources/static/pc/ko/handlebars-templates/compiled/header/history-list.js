this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["header"] = this["AP"]["handlebars"]["header"] || {};

this["AP"]["handlebars"]["header"]["history-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "("
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.totalCount : depth0), depth0))
    + ")";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "		<div class=\"slide \" data-ix-options=\"view-length:5; loop:false; datum-point:-40px;\">\n			<div class=\"ix-list-viewport\">\n				<ul class=\"ix-list-items\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shoppingHistoryList : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n			</div>\n			<div class=\"ix-controller\">\n				<div class=\"slide_direction\">\n					<a class=\"ix-btn-prev\" href=\"javascript:;\"><span class=\"sr_only\">Prev</span></a>\n					<a class=\"ix-btn-next\" href=\"javascript:;\"><span class=\"sr_only\">Next</span></a>\n				</div>\n			</div>\n		</div>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.shoppingHistoryList : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "							<li class=\"ix-list-item\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.shoppingMarkTgtCode : depth0),"==","Prod",{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.shoppingMarkTgtCode : depth0),"==","Article",{"name":"xif","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.shoppingMarkTgtCode : depth0),"==","Plandisplay",{"name":"xif","hash":{},"fn":container.program(11, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.shoppingMarkTgtCode : depth0),"==","Menu",{"name":"xif","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.shoppingMarkTgtCode : depth0),"==","SearchWord",{"name":"xif","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n							</li>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "									<a href=\""
    + alias3((helpers.productDetailPath || (depth0 && depth0.productDetailPath) || alias2).call(alias1,(depth0 != null ? depth0.onlineProdSn : depth0),(depth0 != null ? depth0.prodSn : depth0),{"name":"productDetailPath","hash":{},"data":data}))
    + "\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(data && data.index),"==",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										<div class=\"item_wrap\">\n											<span class=\"img\"><img src=\""
    + alias3(alias4((depth0 != null ? depth0.prodImg : depth0), depth0))
    + "\" alt=\"\"></span>\n											<span class=\"title\">"
    + alias3(alias4((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n										</div>\n									</a>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    return "											<strong class=\"num\">"
    + container.escapeExpression(container.lambda((depths[1] != null ? depths[1].date : depths[1]), depth0))
    + "</strong>\n";
},"9":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "									<a href=\"/display/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "/detail?articleSn="
    + alias2(alias1((depth0 != null ? depth0.articleSn : depth0), depth0))
    + "\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										<div class=\"item_wrap\">\n											<span class=\"title\">"
    + alias2(alias1((depth0 != null ? depth0.articleTitle : depth0), depth0))
    + "</span>\n										</div>\n									</a>\n";
},"11":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "									<a href=\"#none\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										<dl>\n											<dt>이벤트</dt>\n											<dd>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.planDisplayTitle : depth0), depth0))
    + "</dd>\n										</dl>\n									</a>\n";
},"13":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "									<a href=\"/display/category/"
    + alias2(alias1((depth0 != null ? depth0.displayMenuId : depth0), depth0))
    + "?upperMenuId=eye&categoryType=prod_types\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										<dl>\n											<dt>카테고리</dt>\n											<dd>"
    + alias2(alias1((depth0 != null ? depth0.menuTitle : depth0), depth0))
    + "</dd>\n										</dl>\n									</a>\n";
},"15":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "									<a href=\"/common/search?searchWord="
    + alias2(alias1((depth0 != null ? depth0.searchWord : depth0), depth0))
    + "\">\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "										<dl>\n											<dt>검색</dt>\n											<dd>#"
    + alias2(alias1((depth0 != null ? depth0.searchWord : depth0), depth0))
    + "</dd>\n										</dl>\n									</a>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"panel notice\">\n			<i class=\"ico\"></i>\n			<p class=\"text font_lg\">쇼핑히스토리가 없습니다.<br>에뛰드하우스 이곳 저곳을 둘러보세요~</p>\n		</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<dt>쇼핑 히스토리"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</dt>\n<dd>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.program(17, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "</dd>";
},"useData":true,"useDepths":true});