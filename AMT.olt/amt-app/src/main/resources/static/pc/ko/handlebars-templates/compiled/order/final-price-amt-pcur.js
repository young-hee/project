this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["order"] = this["AP"]["handlebars"]["order"] || {};

this["AP"]["handlebars"]["order"]["final-price-amt-pcur"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "					<li>\n						<em>"
    + alias2(alias1((depth0 != null ? depth0.coName : depth0), depth0))
    + " 상품 "
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.ordHistProdExList : depth0)) != null ? stack1.length : stack1), depth0))
    + "개</em>\n						<span class=\"price\">"
    + alias2((helpers.getOtfAmtMapPrice || (depth0 && depth0.getOtfAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].otfTotalAmtMap : depths[1]),"otfTotalProdAmt",(depth0 != null ? depth0.ordOtfSn : depth0),"원",{"name":"getOtfAmtMapPrice","hash":{},"data":data}))
    + "</span>\n					</li>\n";
},"3":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var alias1=container.escapeExpression;

  return "					<li>\n						<em>"
    + alias1(container.lambda((depth0 != null ? depth0.coName : depth0), depth0))
    + " 배송비</em>\n						<span class=\"price\">"
    + alias1((helpers.getOtfAmtMapPrice || (depth0 && depth0.getOtfAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depths[1] != null ? depths[1].otfTotalAmtMap : depths[1]),"otfTotalShipAmt",(depth0 != null ? depth0.ordOtfSn : depth0),"원",{"name":"getOtfAmtMapPrice","hash":{},"data":data}))
    + "</span>\n					</li>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return "				<div class=\"tit\"><strong>총 할인</strong><span class=\"price\">"
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"totalOrdDcPriceSum",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"totalOrdDcPriceSum","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span></div>\n				<ul>\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"OnlineProdPromoDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isApMember : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"ImmedDcCouponPromo",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(15, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"MPlusNPromoDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(17, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"SameTimePurPromoDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(19, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"OrdUnitPromoDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(21, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isApMember : depth0),{"name":"if","hash":{},"fn":container.program(23, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"ProdUnitCouponDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(28, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"MPlusNCouponDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(30, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"Buy1GetCouponDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(32, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"OrdUnitCouponDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(34, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"ShipFeePromoDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(36, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "-";
},"8":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>상품프로모션할인</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"OnlineProdPromoDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"OnlineMemberPromoDc",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(11, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"MemberDcBenefit",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(13, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"11":function(container,depth0,helpers,partials,data) {
    return "							<li>\n								<em>온라인회원프로모션할인</em>\n								<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"OnlineMemberPromoDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n							</li>\n";
},"13":function(container,depth0,helpers,partials,data) {
    return "							<li>\n								<em>회원혜택할인</em>\n								<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"MemberDcBenefit","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n							</li>\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>즉시할인쿠폰프로모션</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"ImmedDcCouponPromo","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"17":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>M+N할인프로모션</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"MPlusNPromoDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"19":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>동시구매프로모션</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"SameTimePurPromoDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>주문프로모션할인</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"OrdUnitPromoDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"23":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing;

  return ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"BeautyPointExchUse",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(24, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"CushionPointUse",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(26, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"24":function(container,depth0,helpers,partials,data) {
    return "							<li>\n								<em>뷰티포인트 교환사용</em>\n								<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"BeautyPointExchUse","P",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n							</li>\n";
},"26":function(container,depth0,helpers,partials,data) {
    return "							<li>\n								<em>쿠션포인트 사용</em>\n								<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"CushionPointUse","P",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n							</li>\n";
},"28":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>상품쿠폰할인</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"ProdUnitCouponDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"30":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>M+N쿠폰할인</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"MPlusNCouponDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"32":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>Buy1Get쿠폰할인</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"Buy1GetCouponDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"34":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>주문쿠폰할인</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"OrdUnitCouponDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"36":function(container,depth0,helpers,partials,data) {
    return "						<li>\n							<em>배송비할인</em>\n							<span class=\"price\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.ordAmtMap : depth0),"ShipFeePromoDc","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n						</li>\n";
},"38":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "				<div class=\"beauty\">\n					<strong>\n						적립예정 뷰티포인트\n						<span class=\"ui_tooltip\">\n							<button type=\"button\" class=\"btn_tooltip\"><span class=\"sr_only\">툴팁보기</span></button>\n							<span class=\"arr\"></span>\n							<span class=\"layer_tooltip\">\n								<dl>\n									<dt>뷰티포인트 적립안내</dt>\n									<dd>\n										고객님의 아모레퍼시픽 뷰티포인트 통합회원 등급에 따라 결제금액의 기본 1%+우대 최대 4%가 적립됩니다. (고객별 상이)<br>\n										뷰티포인트 적립 기준금액은 [최종결제금액-뷰티포인트 적립 제외상품 금액-배송비]로 계산된 금액입니다. (확인필요)<br>\n										특가상품(투데이핫딜), 프로모션 상품(상품할인, M+N, 즉시할인, 동시구매 등)은 뷰티포인트 적립대상에서 제외됩니다. <br>\n										플러스멤버십 할인(10%)이 적용된 상품은 뷰티포인트 적립대상에 포함됩니다. <br>\n										적립 예정 뷰티포인트는 주문상품의 구매확정 시점에 자동으로 적립되며, 사용기한은 적립일로부터 1년입니다.<br>\n										주문 제품의 취소/환불/반품시 적립된 뷰티포인트도 자동 회수 처리됩니다. <br>\n										보다 자세한 뷰티포인트 이용 안내는 뷰티포인트 웹사이트(www.beautypoint.co.kr)에서 확인하실 수 있습니다.\n									</dd>\n								</dl>\n								<button type=\"button\" class=\"ui_close\"><span class=\"sr_only\">툴팁 닫기</span></button>\n							</span>\n						</span>\n					</strong>\n					<span class=\"point\">"
    + container.escapeExpression((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"totalBeautyPointSaveSum","P",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span>\n				</div>\n				<!-- 09-05 마크업 추가 : 적립예정 뷰티포인트 부분 UI수정 건 [S] -->\n				<ul class=\"details\">\n"
    + ((stack1 = helpers.each.call(alias1,((stack1 = (depth0 != null ? depth0.ordHistEx : depth0)) != null ? stack1.ordSavingPointList : stack1),{"name":"each","hash":{},"fn":container.program(39, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</ul>\n				<!-- 09-05 마크업 추가 : 적립예정 뷰티포인트 부분 UI수정 건 [E] -->\n";
},"39":function(container,depth0,helpers,partials,data) {
    var alias1=container.escapeExpression;

  return "						<li>\n							<em>"
    + alias1(container.lambda((depth0 != null ? depth0.pointName : depth0), depth0))
    + "</em>\n							<span class=\"price\">"
    + alias1((helpers.numberFormat || (depth0 && depth0.numberFormat) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.totalOnlineShipSavingPoint : depth0),{"name":"numberFormat","hash":{},"data":data}))
    + "P</span>\n						</li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"pay_list\">\n	<dl>\n		<dt>결제 상세 내역</dt>\n		<dd class=\"result\">\n			<div class=\"tit\"><strong>주문금액</strong><span class=\"price\">"
    + alias3((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"Prod","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span></div>\n			<ul>\n				<!-- 주문금액 입점몰별로 구분 (180823) -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.ordOtfExList : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<!--// 주문금액 입점몰별로 구분 (180823) -->\n			</ul>\n			<div class=\"tit\"><strong>뷰티포인트 상품</strong><span class=\"price\">"
    + alias3((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"MembershipExch","P",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span></div>\n			<div class=\"tit\"><strong>배송비</strong><span class=\"price\">"
    + alias3((helpers.getAmtMapPrice || (depth0 && depth0.getAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.otfTotalAmtMap : depth0),"allOtfTotalShipAmt","원",{"name":"getAmtMapPrice","hash":{},"data":data}))
    + "</span></div>\n			<ul>\n				<!-- 배송비 입점몰별로 구분 (180823) -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.ordOtfExList : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				<!--// 배송비 입점몰별로 구분 (180823) -->\n			</ul>\n			<!-- 할인 Start -->\n"
    + ((stack1 = helpers["if"].call(alias1,(helpers.checkAmtMapPrice || (depth0 && depth0.checkAmtMapPrice) || alias2).call(alias1,(depth0 != null ? depth0.ordAmtMap : depth0),"totalOrdDcPriceSum",{"name":"checkAmtMapPrice","hash":{},"data":data}),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "			<!-- 할인 End -->\n		</dd>\n		<dd class=\"total\">\n			<input type=\"hidden\" name=\"finalPamtPcurPrice\" value=\""
    + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.ordHistEx : depth0)) != null ? stack1.finalPamtPcur : stack1), depth0))
    + "\"/>\n			<div class=\"set\"><strong>총 결제 예정 금액</strong><span class=\"price\">"
    + alias3((helpers.numberFormat || (depth0 && depth0.numberFormat) || alias2).call(alias1,((stack1 = (depth0 != null ? depth0.ordHistEx : depth0)) != null ? stack1.finalPamtPcur : stack1),{"name":"numberFormat","hash":{},"data":data}))
    + "<span class=\"small\">원</span></span></div>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isApMember : depth0),{"name":"if","hash":{},"fn":container.program(38, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</dd>\n	</dl>\n\n	<div class=\"buy_agree\">\n		<span class=\"check_wrap\"><input type=\"checkbox\" id=\"orderAgree\"><label for=\"orderAgree\">구매조건 및 결제진행 동의</label></span>\n		<p class=\"txt\">\n			주문할 상품의 상품명과 상품가격, 배송정보를 명확히<br>\n			확인하였으며 구매진행에 동의하시겠습니까?<br>\n			(전자상거래법 제 8조 2항)<br>\n			<em>ONE pay로 결제시 일시불만 가능합니다.</em>\n		</p>\n	</div>\n	<div class=\"btn_area\">\n		<a href=\"#none\" id=\"orderPayment\" class=\"btn_xlg_primary\">결제하기</a>\n	</div>\n</div>";
},"useData":true,"useDepths":true});