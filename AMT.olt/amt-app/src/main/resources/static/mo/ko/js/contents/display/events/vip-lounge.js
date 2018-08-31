/**
 * 이벤트 : vip 라운지
 */
;(function ( $ ) {
	'use strict';

	var VipLounge = $B.Class.extend({
		DEFAULT_DATE_FORMAT: 'YYYY-MM',

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$content = this._$target.find( '.vip_lounge' );
			this._$vipApplyBtn = this._$target.find( '.btn_vip_apply' );
			
			this._$loading = this._$target.find( '.loading' );

			this._setEvents();

		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._$vipApplyBtn.on( 'click', function (e) {
				AP.login({type:''}).done( function () {
					AP.api.participated( null, {
						regularEventType: 'VIPLounge'
					}).done( function ( result ) {
						//vip라운지
						console.log(result.awards);
//						var modal = AP.modal.attendance({
//							title: '쿠폰',
//							contents: {
//								templateKey: 'display.events.attendance-success',
//								templateModel: {
//									today: AP.common.date()
//								}
//							},
//							confirmLabel: '쿠폰상품 보기',
//							cancelLabel: '닫기'
//						})
//
//						modal.getElement().find('.btn_default_modal_confirm').addClass('link');
//						
//						modal.getElement().find( 'img' ).imagesLoaded( function() {
//							modal.resetPosition();
//						});
						
						AP.modal.alert("응모되었습니다.");

					}.bind(this)).fail( function ( xhr ) {
						//중복참여시
						AP.modal.alert( '이번달에는 더 이상 참여하실 수 없습니다.' );
						//vip 등급이 아닌경우
						AP.modal.alert( 'VIP 등급 이상 고객님만 이용가능한 혜택합니다.' );
						//vip 등급이나 구매조건 미 충족시
						AP.modal.alert( 'VIP라운지는 당월 구매금액 기준 1만원 이상 구매 시 참여 가능합니다.' );
//						if ( xhr.errorCode === 'EAPI004' ) {
//							AP.login({trigger: true});
//						} else if ( xhr.errorCode === 'ESAL037' ) {
//							
//						}
					}.bind(this));
				}.bind(this));

			}.bind(this));
		}
	});


	AP.vipLounge = new VipLounge();
})( jQuery );