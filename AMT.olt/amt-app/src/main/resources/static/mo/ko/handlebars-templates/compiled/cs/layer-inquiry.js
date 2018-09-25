this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["cs"] = this["AP"]["handlebars"]["cs"] || {};

this["AP"]["handlebars"]["cs"]["layer-inquiry"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"align_center\">\n	<p class=\"text_center\">상담을 원하는 주문 번호를 선택하세요.</p>\n	<table class=\"data_table\">\n		<caption class=\"sr_only\">상담을 위한 주문목록 선택 으로 주문번호/상품명, 주문상태로 구성</caption>\n		<colgroup>\n			<col>\n			<col style=\"width:80px\">\n		</colgroup>\n		<thead>\n		<tr>\n			<th scope=\"col\">주문번호/상품명</th>\n			<th scope=\"col\">주문상태</th>\n		</tr>\n		</thead>\n		<tbody id=\"more\">\n		</tbody>\n	</table>\n	<button type=\"button\" class=\"btn_lg_more w100p\" id=\"b_more\">더보기</button>\n	<div class=\"loading\" style=\"height:100px;\"> <!-- 로딩이 들어가야 하는 영역 높이값 inline으로..-->\n		<img src=\"/mo/ko/images/common/loading_sm.gif\" alt=\"로딩중\">\n	</div>\n	<div class=\"page_btns\">\n		<button class=\"btn_md_neutral w100p\" type=\"button\" id=\"b_apply\" disabled=>적용</button>\n	</div>\n</div>";
},"useData":true});