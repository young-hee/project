this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cart"] = this["AP"]["handlebars"]["cart"] || {};

this["AP"]["handlebars"]["cart"]["calculation-result-detail"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "총 <strong class=\"num\" id=\"totalPrdCnt\">0</strong>개 <span class=\"vline\"></span>\n<strong class=\"num\">"
    + container.escapeExpression((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.finalOnlineSalesTotalAmountInfo : stack1)) != null ? stack1.standardCurrency : stack1)) != null ? stack1.amount : stack1),"+",((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.exchIPointSum : stack1),"+",((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.exchAPointSum : stack1),{"name":"calc","hash":{},"data":data}),{"name":"numberFormat","hash":{},"data":data}))
    + "</strong>원\n";
},"useData":true});