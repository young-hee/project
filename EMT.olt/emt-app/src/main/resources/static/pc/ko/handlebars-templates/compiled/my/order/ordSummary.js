this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["ordSummary"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "<div class=\"align_right\"><span>취소 ( "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.cancelCnt : stack1), depth0))
    + " )</span> <span>교환 ( "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.exchangeCnt : stack1), depth0))
    + " )</span> <span>반품 ( "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.returnCnt : stack1), depth0))
    + " )</span></div>\n<div class=\"table_layout\">\n	<div>\n		<p class=\""
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.ordReceptCnt : stack1),0,{"name":"ne","hash":{},"data":data}),"num","num zero",{"name":"condition","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.ordReceptCnt : stack1), depth0))
    + "</p>\n		<p>주문접수</p>\n	</div>\n	<div>\n		<p class=\""
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.payCompleteCnt : stack1),0,{"name":"ne","hash":{},"data":data}),"num","num zero",{"name":"condition","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.payCompleteCnt : stack1), depth0))
    + "</p>\n		<p>결제완료</p>\n	</div>\n	<div>\n		<p class=\""
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.preparingCnt : stack1),0,{"name":"ne","hash":{},"data":data}),"num","num zero",{"name":"condition","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.preparingCnt : stack1), depth0))
    + "</p>\n		<p>배송준비중</p>\n	</div>\n	<div>\n		<p class=\""
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.shippingCnt : stack1),0,{"name":"ne","hash":{},"data":data}),"num","num zero",{"name":"condition","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.shippingCnt : stack1), depth0))
    + "</p>\n		<p>배송중</p>\n	</div>\n	<div>\n		<p class=\""
    + alias2((helpers.condition || (depth0 && depth0.condition) || alias4).call(alias3,(helpers.ne || (depth0 && depth0.ne) || alias4).call(alias3,((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.shipCompleteCnt : stack1),0,{"name":"ne","hash":{},"data":data}),"num","num zero",{"name":"condition","hash":{},"data":data}))
    + "\">"
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.summary : depth0)) != null ? stack1.shipCompleteCnt : stack1), depth0))
    + "</p>\n		<p>배송완료</p>\n	</div>\n</div>";
},"useData":true});