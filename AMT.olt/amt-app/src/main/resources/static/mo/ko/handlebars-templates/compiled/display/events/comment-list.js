this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["comment-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.eventParticipants : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.totalCount : depth0),">",(depth0 != null ? depth0.limit : depth0),{"name":"xif","hash":{},"fn":container.program(10, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<dl>\n			<dt>\n				<a class=\"btn_detail\" href=\"javascript:;\" data-event-participant-sn=\""
    + alias2(alias1((depth0 != null ? depth0.eventParticipantSn : depth0), depth0))
    + "\">\n					<span class=\"clear\">\n						 <span class=\"summary\">\n							<span>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</span><span>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.participatedDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</span>\n						 </span>\n					</span>\n					<span class=\"title\">\n						<b>"
    + alias2(alias1((depth0 != null ? depth0.participantCommentTitle : depth0), depth0))
    + "</b>\n					</span>\n				</a>\n			</dt>\n			<dd>\n				<p class=\"text\">"
    + alias2((helpers.ellipsis || (depth0 && depth0.ellipsis) || alias4).call(alias3,100,(depth0 != null ? depth0.participantComment : depth0),{"name":"ellipsis","hash":{},"data":data}))
    + "</p>\n			</dd>\n"
    + ((stack1 = helpers["if"].call(alias3,((stack1 = (depth0 != null ? depth0.eventCommentImgs : depth0)) != null ? stack1.length : stack1),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</dl>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "				<dd class=\"thumbnail\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.eventCommentImgs : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</dd>\n";
},"4":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"<",5,{"name":"xif","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "							<span>\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(data && data.index),"==",4,{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.program(8, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "							</span>\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "									<span>+ "
    + container.escapeExpression((helpers.calc || (depth0 && depth0.calc) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depths[1] != null ? depths[1].eventCommentImgs : depths[1])) != null ? stack1.length : stack1),"-",4,{"name":"calc","hash":{},"data":data}))
    + "</span>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "									<img src=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.commentImgUrl : depth0), depth0))
    + "\" alt=\"\">\n";
},"10":function(container,depth0,helpers,partials,data) {
    return "		<div class=\"pagination\"></div>\n";
},"12":function(container,depth0,helpers,partials,data) {
    return "	<div class=\"panel notice\">\n		<i class=\"ico\"></i>\n		<p class=\"text\">등록된 댓글이 없습니다.</p>\n	</div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalCount : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(12, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});