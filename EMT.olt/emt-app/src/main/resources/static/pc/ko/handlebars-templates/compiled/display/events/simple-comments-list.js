this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["display"] = this["AP"]["handlebars"]["display"] || {};
this["AP"]["handlebars"]["display"]["events"] = this["AP"]["handlebars"]["display"]["events"] || {};

this["AP"]["handlebars"]["display"]["events"]["simple-comments-list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.displayYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(2, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"2":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "		<li>\n			<dl>\n				<dt>\n					<b>"
    + alias2(alias1((depth0 != null ? depth0.memberId : depth0), depth0))
    + "</b>\n					<small>"
    + alias2((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias4).call(alias3,(depth0 != null ? depth0.createdDt : depth0),{"name":"dateFormat","hash":{},"data":data}))
    + "</small>\n"
    + ((stack1 = helpers.unless.call(alias3,(depths[1] != null ? depths[1].isLive : depths[1]),{"name":"unless","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias4).call(alias3,(depth0 != null ? depth0.myCommentYn : depth0),"==","Y",{"name":"xif","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</dt>\n				<dd>\n					<p class=\"text\">"
    + alias2(alias1((depth0 != null ? depth0.articleCommentBodyText : depth0), depth0))
    + "</p>\n				</dd>\n			</dl>\n		</li>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return ((stack1 = helpers["if"].call(alias1,(helpers.isNewArticle || (depth0 && depth0.isNewArticle) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.createdDt : depth0),{"name":"isNewArticle","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    return "							<span class=\"ico_new\"><span class=\"sr_only\">새글</span></span>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "						<button class=\"btn_delete\" type=\"button\" data-article-comment-sn=\""
    + container.escapeExpression(container.lambda((depth0 != null ? depth0.articleCommentSn : depth0), depth0))
    + "\"><i class=\"ico_del\"></i><span class=\"sr_only\">댓글 삭제</span></button>\n";
},"8":function(container,depth0,helpers,partials,data) {
    return "	<li class=\"inner_loading\">\n		<div class=\"loading\">\n			<span>\n				<img src=\""
    + container.escapeExpression((helpers.absolutePath || (depth0 && depth0.absolutePath) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),"/images/common/loading.gif",{"name":"absolutePath","hash":{},"data":data}))
    + "\" alt=\"\">\n			</span>\n		</div>\n	</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.articleCommentList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.isScrollType : depth0),"&&",(helpers.lt || (depth0 && depth0.lt) || alias2).call(alias1,(helpers.calc || (depth0 && depth0.calc) || alias2).call(alias1,(depth0 != null ? depth0.offset : depth0),"+",((stack1 = (depth0 != null ? depth0.articleCommentList : depth0)) != null ? stack1.length : stack1),{"name":"calc","hash":{},"data":data}),(depth0 != null ? depth0.totalCount : depth0),{"name":"lt","hash":{},"data":data}),{"name":"xif","hash":{},"fn":container.program(8, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true,"useDepths":true});