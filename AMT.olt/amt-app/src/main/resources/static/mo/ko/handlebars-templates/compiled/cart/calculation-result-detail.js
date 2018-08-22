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
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "	총 <strong class=\"num\" id=\"totalPrdCnt\">0</strong>개 <span class=\"vline\"></span>\n	<strong class=\"num\">\n		"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,((stack1 = ((stack1 = ((stack1 = ((stack1 = (depth0 != null ? depth0.cartEx : depth0)) != null ? stack1.calculationResult : stack1)) != null ? stack1.paidAmountInfo : stack1)) != null ? stack1.standardCurrency : stack1)) != null ? stack1.amount : stack1),null,{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n	</strong>원";
},"useData":true});