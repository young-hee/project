this["AP"] = this["AP"] || {};
this["AP"]["handlebars"] = this["AP"]["handlebars"] || {};
this["AP"]["handlebars"]["products"] = this["AP"]["handlebars"]["products"] || {};

this["AP"]["handlebars"]["products"]["layer-card-benefit"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "\n	<div class=\"panel\">\n		<h2 class=\"h_title\">무이자 할부 카드 행사</h2>\n		<table class=\"data_table\">\n			<caption class=\"sr_only\">무이자 할부 카드행사에 대한 행사기간, 카드사, 할부적용 금액, 할부개월, 유의사항 정보 제공</caption>\n			<colgroup>\n				<col width=\"108px\">\n				<col width=\"126px\">\n				<col width=\"132px\">\n				<col width=\"98px\">\n				<col width=\"*\">\n			</colgroup>\n			<thead>\n			<tr>\n				<th>기간</th>\n				<th>카드사</th>\n				<th>할부적용 금액</th>\n				<th>할부개월</th>\n				<th>유의사항</th>\n			</tr>\n			</thead>\n			<tbody>\n			<tr>\n				<td rowspan=\"10\" class=\"bld_none\">6/1 - 6/30</td>\n				<td>현대</td>\n				<td rowspan=\"10\">5만원이상</td>\n				<td rowspan=\"2\">2~5개월</td>\n				<td>- 의약품 및 차량정비업종<br>2~3개월 무이자할부</td>\n			</tr>\n			<tr>\n				<td>전북</td>\n				<td></td>\n			</tr>\n			<tr>\n				<td>삼성</td>\n				<td rowspan=\"8\">2~6개월</td>\n				<td>- 별도 신청없이 적용<br>(삼성카드 의약품 결제 제외)<br>※ 면세점 2-5개월 무이자</td>\n			</tr>\n			<tr><td>하나<br>(하나SK, 외환)</td>\n				<td>- 하나BC카드 포함<br>(의약품 및 일부업종 제외)</td>\n			</tr>\n			<tr>\n				<td>KB국민</td>\n				<td>- NH농협, 국민BC 제외<br>(일부 가맹점 제외)</td>\n			</tr>\n			<tr>\n				<td>신한</td>\n				<td>- 신한BC 제외</td>\n			</tr>\n			<tr>\n				<td>씨티</td>\n				<td>- 씨티 BC 카드 제외</td>\n			</tr>\n			<tr>\n				<td>롯데</td>\n				<td></td>\n			</tr>\n			<tr>\n				<td>비씨</td>\n				<td></td>\n			</tr>\n			<tr>\n				<td>NH</td>\n				<td>- 농협 BC카드 포함</td>\n			</tr>\n			</tbody>\n		</table>\n		<dl class=\"dl_cont\">\n			<dt>카드사별 유의사항</dt>\n			<dd>\n				<ul class=\"list_bullet_dot\">\n					<li><span class=\"color_black\">하나카드 일부업종은 무이자 할부가 적용되지 않습니다. 해당 업종은 아래와 같습니다.</span><br>- LGU+ 통신관련 가맹점 / 공공기관 / 보험업종(여행자 보험은 적용됩니다.) /<br>&nbsp;&nbsp;의약품 결제 / 상품권 결제 / 방문판매</li>\n					<li>공공기관 및 오프라인 제외 (*비즈페이나우 무이자 적용)&nbsp;/&nbsp;카드사 사정에 따라 일부<br>변경될 수 있습니다.</li>\n					<li>직가맹,&nbsp;상점부담 무이자 가맹점,&nbsp;전용가맹점,&nbsp;특별제휴 가맹점 제외</li>\n					<li>은행계열 카드,&nbsp;체크카드,&nbsp;법인카드(개인사업자 기업카드 포함),&nbsp;기프트카드,&nbsp;선불카드<br>제외 (결제창에 ‘무’표시가 있어도, 제외카드 결제시 무이자할부 적용되지 않습니다.)</li>\n					<li><em>전카드사 지방세 납부 무이자 제외</em></li>\n					<li>무이자건은 포인트/마일리지적립/할인서비스 등 다른 혜택과 중복 적용되지 않습니다.</li>\n					<li>농협카드 무이자 제외 상점:&nbsp;관악농협,&nbsp;농협하나로유통,&nbsp;농협경제지주 온라인사업</li>\n				</ul>\n			</dd>\n		</dl>\n	</div>\n	<div class=\"panel\">\n		<h2 class=\"h_title\">부분 무이자 행사</h2>\n		<table class=\"data_table\">\n			<caption class=\"sr_only\">부분 무이자 행사에 대한 행사기간, 최소결제금액, 무이자할부, 대상카드, 할부안내정보 제공</caption>\n			<colgroup>\n				<col width=\"109px\">\n				<col width=\"105px\">\n				<col width=\"99px\">\n				<col width=\"92px\">\n				<col width=\"95px\">\n				<col width=\"*\">\n			</colgroup>\n			<thead>\n			<tr>\n				<th>기간</th>\n				<th>카드사</th>\n				<th>할부개월</th>\n				<th>고객부담</th>\n				<th>면제</th>\n				<th>신청방법</th>\n			</tr>\n			</thead>\n			<tbody>\n			<tr>\n				<td rowspan=\"2\" class=\"bld_none\">6/1 - 6/30</td>\n				<td rowspan=\"2\">삼성카드</td>\n				<td>10개월</td>\n				<td>1-2회차</td>\n				<td>3-10회차</td>\n				<td rowspan=\"2\">- 별도 신청없이 적용<br>(삼성카드 의약품 결제 제외)</td>\n			</tr>\n			<tr>\n				<td>12개월</td>\n				<td>1-3회차</td>\n				<td>4-12회차</td>\n			</tr>\n			<tr>\n				<td class=\"bld_none\">6/1 - 6/30</td>\n				<td>롯데카드</td>\n				<td>10개월</td>\n				<td>1-2회차</td>\n				<td>3-10회차</td>\n				<td></td>\n			</tr>\n			<tr>\n				<td rowspan=\"2\" class=\"bld_none\">6/1 - 6/30</td>\n				<td rowspan=\"2\">하나카드<br>(구 하나SK, 구 외환)</td>\n				<td>10개월</td>\n				<td>1-2회차</td>\n				<td>3-10회차</td>\n				<td rowspan=\"2\">- 별도 신청없이 적용<br>-하나카드 부분무이자는<br>하나BC제외, 일부업종 제외<br><em>★ 10대업종 적용: 가전,<br>백화점, 온라인쇼핑,<br>대형마트, 아울렛, 여행,<br>항공, 면세점, 병원, 손해보험</em><br>(PG업종은 온라인쇼핑에<br>포함됩니다.)</td>\n			</tr>\n			<tr>\n				<td>15개월<br>(공지안함)</td>\n				<td>1-3회차</td>\n				<td>4-15회차</td>\n			</tr>\n			<tr>\n				<td rowspan=\"6\" class=\"bld_none\">6/1 - 6/30</td>\n				<td rowspan=\"6\">비씨카드</td>\n				<td>7개월</td>\n				<td>1-2회차</td>\n				<td>3-7회차</td>\n				<td rowspan=\"6\">홈페이지/ 콜센터/<br>MO서비스/ARS채널<br>사전 등록한 고객에 한함<br>(분기별)<br>- 신청방법: ARS (1899-5772)<br>- 하나BC카드 제외<br><span class=\"col_blue\">- 업무지원시스템 공지안함</span></td>\n			</tr>\n			<tr>\n				<td>8개월</td>\n				<td>1-2회차</td>\n				<td>3-8회차</td>\n			</tr>\n			<tr>\n				<td>9개월</td>\n				<td>1-2회차</td>\n				<td>3-9회차</td>\n			</tr>\n			<tr>\n				<td>10개월</td>\n				<td>1-2회차</td>\n				<td>3-10회차</td>\n			</tr>\n			<tr>\n				<td>11개월</td>\n				<td>1-3회차</td>\n				<td>4-11회차</td>\n			</tr>\n			<tr>\n				<td>12개월</td>\n				<td>1-3회차</td>\n				<td>4-12회차</td>\n			</tr>\n			<tr>\n				<td rowspan=\"6\" class=\"bld_none\">6/1 - 6/30</td>\n				<td rowspan=\"6\">농협카드</td>\n				<td>7개월</td>\n				<td>1-2회차</td>\n				<td>3-7회차</td>\n				<td rowspan=\"6\">ARS 사전 등록한 고객에<br>한함(분기별)<br>- 신청방법: ARS (1644-2009)<br>- NH채움카드 적용,<br>농협BC카드 제외<br>- 제세공과금, 대학등록금,<br>상품권, 기프트카드 가맹점<br>제외<br><span class=\"col_blue\">- 업무지원시스템 공지안함</span></td>\n			</tr>\n			<tr>\n				<td>8개월</td>\n				<td>1-2회차</td>\n				<td>3-8회차</td>\n			</tr>\n			<tr>\n				<td>9개월</td>\n				<td>1-2회차</td>\n				<td>3-9회차</td>\n			</tr>\n			<tr>\n				<td>10개월</td>\n				<td>1-2회차</td>\n				<td>3-10회차</td>\n			</tr>\n			<tr>\n				<td>11개월</td>\n				<td>1-3회차</td>\n				<td>4-11회차</td>\n			</tr>\n			<tr>\n				<td>12개월</td>\n				<td>1-3회차</td>\n				<td>4-12회차</td>\n			</tr>\n			</tbody>\n		</table>\n		<dl class=\"dl_cont\">\n			<dt>※ 카드사별 유의사항</dt>\n			<dd>\n				<ul class=\"list_bullet_dot\">\n					<li>상기 내용은 온라인 전자상거래 일반에 해당되는 내용이며 오프라인 결제,&nbsp;상점과<br>카드사의 제휴로 인한 별도 가맹점운영 상점 등은 제외됩니다. 자세한 내용은 각 상점<br>관리자페이지의 공지사항을 참조할 수 있도록 안내 부탁드리겠습니다.</li>\n					<li>공공기관 및 오프라인 제외 / 카드사 사정에 따라 일부 변경될 수 있습니다.</li>\n					<li>직가맹, 상점부담 무이자 가맹점, 전용가맹점, 특별제휴 가맹점 제외</li>\n					<li>은행계열 카드, 체크카드, 법인카드, 개인사업자 기업카드, 기프트카드, 선불카드,<br>하이브리드카드 제외<br>(결제창에 ‘무’표시가 있어도 제외카드의 경우 무이자할부가 적용되지 않습니다.)</li>\n					<li class=\"color_black\">무이자건은 포인트/마일리지적립/할인서비스 등 다른 혜택과 중복 적용되지 않습니다.</li>\n					<li>하나카드의 경우, 무이자할부 행사가 제외되는 ‘일부가맹점’ 제외<br>- LGU+통신 관련 가맹점(데이콤 웹하드, 아이모리, U+ 통신비, 심파일 등)<br>- 공공기관 (POS 및 백업단말기 사용)<br>- 보험업종 (네이버 보험 등)<br>- 의약품결제<br>- 상품권결제 (카카오, 윈큐브마케팅 등)<br>- 방문판매 (오휘 등 엘지 화장품 방문판매)<br>- 면세점 (신세계면세점 등)</li>\n				</ul>\n			</dd>\n		</dl>\n	</div>\n	<div class=\"panel\">\n		<h2 class=\"h_title\">생애 첫 결제 프로모션</h2>\n		<table class=\"data_table\">\n			<caption class=\"sr_only\">생애 첫 결제 프로모션에 대한 행사기간, 카드사, 혜택안내 정보 제공</caption>\n			<colgroup>\n				<col width=\"100px\">\n				<col width=\"92px\">\n				<col width=\"274px\">\n				<col width=\"*\">\n			</colgroup>\n			<thead>\n			<tr>\n				<th>기간</th>\n				<th>카드사</th>\n				<th>할부적용금액</th>\n				<th>유의사항</th>\n			</tr>\n			</thead>\n			<tbody>\n			<tr>\n				<td rowspan=\"2\" class=\"bld_none\">6/1 - 6/30</td>\n				<td>PAYCO<br>(카드사<br>제한 없음)</td>\n				<td>1만원 이상 PAYCO 결제 시<br>3,000원 할인</td>\n				<td rowspan=\"2\" style=\"padding:20px 0;\">- 비용 소진 시,<br>행사는 자동 종료<br>- LG유플러스 온라인 결제창<br>에서만 적용 가능합니다.<br>(오프라인/KVP/ARS 등<br>적용 불가)</td>\n			</tr>\n			<tr>\n				<td>PAYCO<br>(신한, KB, BC, NH, 하나)</td>\n				<td>3만원 이상 PAYCO 결제 시<br>6,000원 할인</td>\n			</tr>\n			<tr>\n				<td colspan=\"4\" style=\"border:0;\">- 6월 한달 PAYCO로 결제한 구매 금액의 1.2%가 PAYCO 포인트로 적립됩니다.</td>\n			</tr>\n			</tbody>\n		</table>\n		<h2 class=\"h_title\">PAYCO 6월 적립 프로모션<br>(슈퍼세이브)</h2>\n		<table class=\"data_table\">\n			<caption class=\"sr_only\">PAYCO 6월 적립 프로모션 (슈퍼세이브)</caption>\n			<colgroup>\n				<col width=\"250px\">\n				<col width=\"*\">\n			</colgroup>\n			<thead>\n			<tr>\n				<th>조건</th>\n				<th>등급 및 혜택</th>\n			</tr>\n			</thead>\n			<tbody>\n			<tr>\n				<td class=\"bld_none\">10회 80만원 이상 결제 시</td>\n				<td>익월 VIP PLATINUM<br>(신용카드 쿠폰 + 제휴 혜택 쿠폰)</td>\n			</tr>\n			<tr>\n				<td class=\"bld_none\">5회 40만원 이상 결제 시</td>\n				<td>익월 VIP GOLD<br>(신용카드 쿠폰 + 제휴 혜택 쿠폰)</td>\n			</tr>\n			<tr>\n				<td class=\"bld_none\">3회 15만원 이상 결제 시</td>\n				<td>익월 VIP SILVER<br>(제휴 혜택 쿠폰)</td>\n			</tr>\n			<tr>\n				<td colspan=\"4\" class=\"bld_none\">- 슈퍼세이브 안내 URL : <a href=\"http://event.payco.com/event/payco/point/supersave.nhn\" target=\"_blank\">http://event.payco.com/event/payco/point/supersave.nhn</a></td>\n			</tr>\n			</tbody>\n		</table>\n	</div>\n";
},"useData":true});