this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["fullpage-benefit-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.memberLevel : depth0),"==","WELCOME",{"name":"xif","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.memberLevel : depth0),"==","VIP",{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.memberLevel : depth0),"==","VIP+",{"name":"xif","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.memberLevel : depth0),"==","VVIP",{"name":"xif","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.memberLevel : depth0),"==","VVIP+",{"name":"xif","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "						</div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"custom_level_area welcome\">\n							<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.memberName : depth0), depth0))
    + "님은 <strong>WELCOM</strong>고객입니다</span>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"custom_level_area vip\">\n							<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.memberName : depth0), depth0))
    + "님은 <strong>VIP</strong>고객입니다</span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"custom_level_area vip_plus\">\n							<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.memberName : depth0), depth0))
    + "님은 <strong>VIP+</strong>고객입니다</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"custom_level_area vvip\">\n							<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.memberName : depth0), depth0))
    + "님은 <strong>VVIP</strong>고객입니다</span>\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "							<div class=\"custom_level_area vvip_plus\">\n							<span>"
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.memberName : depth0), depth0))
    + "님은 <strong>VVIP+</strong>고객입니다</span>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.loginYn : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "					<!-- Apmall 고객 등급별 혜택 -->\n					<div class=\"level_benefit01\">\n						<div class=\"benefit_img_area\">\n							<div><img src=\"/mo/ko/images/dummy/img_level_list.jpg\" alt=\"\" /></div>\n							<div><img src=\"/mo/ko/images/dummy/img_level_table.jpg\" alt=\"\" /></div>\n							<div><a href=\"javascript:;\"><img alt=\"플러스멤버십에 가입하고 최고의 혜택을 누리세요\" src=\"/mo/ko/images/display/img_banner_benefit.jpg\"></a></div>\n							<div><img src=\"/mo/ko/images/dummy/img_level_notice.jpg\" alt=\"\" /></div>\n						</div>\n					</div>\n					<!-- // Apmall 고객 등급별 혜택 -->\n\n\n";
},"useData":true});