this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["calculation-result-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.ne || (depth0 && depth0.ne) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1),null,{"name":"ne","hash":{},"data":data,"blockParams":blockParams}),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.resultMembershipMap : stack1),{"name":"each","hash":{},"fn":container.program(3, data, 2, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,blockParams[0][1],(depths[1] != null ? depths[1].membershipSn : depths[1]),{"name":"eq","hash":{},"data":data,"blockParams":blockParams}),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return "				<div class=\"point\"><i class=\"ico_p\"></i> <span class=\"num\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = blockParams[1][0]) != null ? stack1.totalMembershipSavingPoint : stack1),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "</span> 적립예정</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"price_box\"><span class=\"price\">\n	<b>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0.prodSumAmount : depth0),"+",(depth0 != null ? depth0.shipFeeSumAmount : depth0),"-",(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.totalProdUnitDiscountAmountInfo : stack1)) != null ? stack1.standardCurrency : stack1)) != null ? stack1.amount : stack1),"+",(depth0 != null ? depth0.totalMemAmount : depth0),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"calc","hash":{},"data":data,"blockParams":blockParams}),{"name":"numberFormat","hash":{},"data":data,"blockParams":blockParams}))
    + "</b>원</span> <span>"
    + alias3(((helper = (helper = helpers.totalProdCnt || (depth0 != null ? depth0.totalProdCnt : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"totalProdCnt","hash":{},"data":data,"blockParams":blockParams}) : helper)))
    + "</span>개 상품\n</div>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.ne || (depth0 && depth0.ne) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.cartMemberEx : stack1),null,{"name":"ne","hash":{},"data":data,"blockParams":blockParams}),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"useData":true,"useDepths":true,"useBlockParams":true});