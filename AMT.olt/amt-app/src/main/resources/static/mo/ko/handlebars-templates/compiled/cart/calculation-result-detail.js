this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["calculation-result-detail"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"point\"><i class=\"ico_p\"></i> <span class=\"num\">코딩 필요</span> 적립예정</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"price_box\"><span class=\"price\">\n	<b>"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0.prodSumAmount : depth0),"+",(depth0 != null ? depth0.shipFeeSumAmount : depth0),"-",(depth0 != null ? depth0.discountAmountInfoByOrderDiscountPromotion : depth0),"-",(depth0 != null ? depth0.discountAmountInfoByPayAmountDiscountCoupon : depth0),"-",(depth0 != null ? depth0.discountAmountInfoByProductPriceDiscountCoupon : depth0),{"name":"calc","hash":{},"data":data}),{"name":"numberFormat","hash":{},"data":data}))
    + "</b>원</span> <span>"
    + alias3(((helper = (helper = helpers.totalProdCnt || (depth0 != null ? depth0.totalProdCnt : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"totalProdCnt","hash":{},"data":data}) : helper)))
    + "</span>개 상품\n</div>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.gt || (depth0 && depth0.gt) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.resultMembershipMap : stack1)) != null ? stack1.length : stack1),0,{"name":"gt","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});