this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["coupon-use-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "			<span>\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponAwardExList : stack1),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			</span>\n";
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.or || (depth0 && depth0.or) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.awardTgtCode : depth0),"Prod",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.awardTgtCode : depth0),"SpPrice",{"name":"eq","hash":{},"data":data}),{"name":"or","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.awardTgtCode : depth0),"Point",{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(data && data.first),{"name":"if","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.and || (depth0 && depth0.and) || alias2).call(alias1,(helpers.gt || (depth0 && depth0.gt) || alias2).call(alias1,((stack1 = ((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponAwardExList : stack1)) != null ? stack1.length : stack1),1,{"name":"gt","hash":{},"data":data}),(helpers.ne || (depth0 && depth0.ne) || alias2).call(alias1,(data && data.last),{"name":"ne","hash":{},"data":data}),{"name":"and","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"price\">[사은품 증정]"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.prodName : depth0), depth0))
    + "</span>\n";
},"5":function(container,depth0,helpers,partials,data) {
    return "						<span class=\"price\">[뷰티포인트 증정]"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.applySavingPoint : depth0), depth0))
    + "P</span>\n";
},"7":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "						<a href=\"javascript:;\" name=\"removeCoupon\" data-sn=\""
    + container.escapeExpression(container.lambda(((stack1 = (depths[1] != null ? depths[1].coupon : depths[1])) != null ? stack1.memberKeepingCouponSn : stack1), depth0))
    + "\"><em>[취소]</em></a>\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "						<br/>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression;

  return "			<span class=\"price\">-"
    + alias1((helpers.currencyFormatDefault || (depth0 && depth0.currencyFormatDefault) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.applyDcAmt : stack1),"원",{"name":"currencyFormatDefault","hash":{},"data":data}))
    + "</span>\n			<a href=\"javascript:;\" name=\"removeCoupon\" data-sn=\""
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.memberKeepingCouponSn : stack1), depth0))
    + "\"><em>[취소]</em></a>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<li>\n	<span>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.couponName : stack1), depth0))
    + "</span>\n	<span>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.eq || (depth0 && depth0.eq) || helpers.helperMissing).call(alias1,((stack1 = (depth0 != null ? depth0.coupon : depth0)) != null ? stack1.applyDcAmt : stack1),0,{"name":"eq","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "	</span>\n</li>";
},"useData":true,"useDepths":true});