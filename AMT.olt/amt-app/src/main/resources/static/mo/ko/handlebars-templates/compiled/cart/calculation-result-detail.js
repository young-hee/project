this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["calculation-result-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return " 0 ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return " "
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.paidAmountInfo : stack1)) != null ? stack1.standardCurrency : stack1)) != null ? stack1.amount : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + " ";
},"5":function(container,depth0,helpers,partials,data) {
    return "<div class=\"point\"><i class=\"ico_p\"></i> <span class=\"num\">코딩 필요</span> 적립예정</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "<div class=\"price_box\"><span class=\"price\">\n	<b>"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.paidAmountInfo : stack1)) != null ? stack1.standardCurrency : stack1)) != null ? stack1.amount : stack1),null,{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "</b>원</span> <span name=\"totalPrdCnt\">0</span>개 상품\n</div>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.gt || (depth0 && depth0.gt) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.resultMembershipMap : stack1)) != null ? stack1.length : stack1),0,{"name":"gt","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});