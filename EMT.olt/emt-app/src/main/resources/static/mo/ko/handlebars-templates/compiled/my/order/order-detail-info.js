this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["my"] = this["AP"]["handlebars"]["my"] || {};
this["AP"]["handlebars"]["my"]["order"] = this["AP"]["handlebars"]["my"]["order"] || {};

this["AP"]["handlebars"]["my"]["order"]["order-detail-info"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "		<dl class=\"table_layout\">\n			<dt>구매 매장</dt>\n			<dd>"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.ordEx : depth0)) != null ? stack1.storeName : stack1), depth0))
    + "</dd>\n			<dd class=\"align_right\">\n				<button type=\"button\" class=\"btn_sm_neutral type2\">매장보기</button>\n			</dd>\n		</dl>\n		<button class=\"btn_md_primary w100p mgt20\" type=\"button\">구매 리뷰 작성하고 진주알 받기</button>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.onlineCnt : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias2).call(alias1,(depth0 != null ? depth0.storeCnt : depth0),">",0,{"name":"xif","hash":{},"fn":container.program(7, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "    		<dl class=\"table_layout\">\n    			<dt>온라인 주문</dt>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.or || (depth0 && depth0.or) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"exchange",{"name":"eq","hash":{},"data":data}),{"name":"or","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0),"inverse":container.program(5, data, 0),"data":data})) != null ? stack1 : "")
    + "\n    		</dl>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "					<dd><em>"
    + container.escapeExpression((helpers.ordStatusCheck || (depth0 && depth0.ordStatusCheck) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.type : depth0),((stack1 = (depth0 != null ? depth0.ordEx : depth0)) != null ? stack1.ordDetailStatusCode : stack1),{"name":"ordStatusCheck","hash":{},"data":data}))
    + "</em></dd>\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "        	<dl class=\"table_layout\">\n        		<dt>테이크 아웃</dt>\n        		<dd><em>주문접수</em></dd>\n        		<dd class=\"align_right\">\n        			<button type=\"button\" class=\"btn_take_out\"><img src=\"@{/images/my/btn_barcode.gif}\" alt=\"테이크아웃바코드 보기\"></button>\n        		</dd>\n        	</dl>\n";
},"9":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "		<dl class=\"table_layout\">\n			<dt>발급 상태</dt>\n			<dd><span class=\"num color_gray2\">"
    + container.escapeExpression((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.ordEx : depth0)) != null ? stack1.cashReceiptIssueYn : stack1),"Y",{"name":"eq","hash":{},"data":data}),"발급완료","발급가능",{"name":"condition","hash":{},"data":data}))
    + "</span></dd>\n		</dl>\n";
},"11":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "		<dl class=\"table_layout\">\n			<dt>"
    + alias3((helpers.condition || (depth0 && depth0.condition) || alias2).call(alias1,(helpers.eq || (depth0 && depth0.eq) || alias2).call(alias1,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),"반품","교환",{"name":"condition","hash":{},"data":data}))
    + " 처리일</dt>\n\n			<dd><span class=\"num color_gray2\">"
    + alias3((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.ordEx : depth0)) != null ? stack1.claimConfirmDt : stack1),"YYYY-MM-DD",{"name":"dateFormat","hash":{},"data":data}))
    + "</span></dd>\n		</dl>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.escapeExpression, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=helpers.helperMissing;

  return "<div class=\"title table_layout\">\n	<div><b class=\"font_lg\">주문정보</b></div>\n</div>\n<div class=\"cont\">\n	<dl class=\"table_layout\">\n		<dt>주문 번호</dt>\n		<dd><strong class=\"num\">"
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.ordEx : depth0)) != null ? stack1.ordNo : stack1), depth0))
    + "</strong></dd>\n	</dl>\n	<dl class=\"table_layout\">\n		<dt>주문 일시</dt>\n\n		<dd><span class=\"num color_gray2\">"
    + alias1((helpers.dateFormat || (depth0 && depth0.dateFormat) || alias3).call(alias2,((stack1 = (depth0 != null ? depth0.ordEx : depth0)) != null ? stack1.ordReceivedDt : stack1),"YYYY-MM-DD HH:MM:SS",{"name":"dateFormat","hash":{},"data":data}))
    + "</span></dd>\n	</dl>\n\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.type : depth0),"===",(depth0 != null ? depth0.store : depth0),{"name":"xif","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.xif || (depth0 && depth0.xif) || alias3).call(alias2,(depth0 != null ? depth0.type : depth0),"===","cashReceipts",{"name":"xif","hash":{},"fn":container.program(9, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias2,(helpers.or || (depth0 && depth0.or) || alias3).call(alias2,(helpers.eq || (depth0 && depth0.eq) || alias3).call(alias2,(depth0 != null ? depth0.type : depth0),"return",{"name":"eq","hash":{},"data":data}),(helpers.eq || (depth0 && depth0.eq) || alias3).call(alias2,(depth0 != null ? depth0.type : depth0),"exchange",{"name":"eq","hash":{},"data":data}),{"name":"or","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "</div>";
},"useData":true});