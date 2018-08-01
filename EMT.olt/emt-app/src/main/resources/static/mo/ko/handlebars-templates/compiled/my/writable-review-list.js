this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};

this["AP"]["handlebars"]["my"]["writable-review-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "	<div class=\"order_box\" name=\"ordNo_"
    + alias2(alias1((depth0 != null ? depth0.ordNo : depth0), depth0))
    + "\">\n		<div class=\"top_review_wrap\">\n			<dl>\n				<dt>주문번호</dt>\n				<dd><a href=\"/my/page/order/detail/"
    + alias2(alias1((depth0 != null ? depth0.ordNo : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0.ordNo : depth0), depth0))
    + "</a></dd>\n			</dl>\n			<dl>\n				<dt>작성가능일</dt>\n				<dd><strong>"
    + alias2(alias1((depth0 != null ? depth0.writableDays : depth0), depth0))
    + "</strong>일 남음</dd>\n			</dl>\n			<button type=\"button\" class=\"btn_write_review\" data-order-no=\""
    + alias2(alias1((depth0 != null ? depth0.ordNo : depth0), depth0))
    + "\">리뷰 쓰기</button>\n		</div>\n		<ul class=\"list_bullet_dot\"><!--펼침시에 클래스 on 추가-->\n			<!--작성완료 보임시에는 상위 li 에 클래스 on 추가-->\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.orderProds : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\n		<button type=\"button\" class=\"btn_order_more\"><span class=\"sr_only\">더보기</span></button>\n	</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.reviewWriteYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "						<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span><span class=\"review_purcahse_item_complete\">작성완료</span>\n					</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "					<li class=\"on\">\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "					<li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.list : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});