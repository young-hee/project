/**
 * 이벤트 : 출석체크
 */
;(function ( $ ) {
	'use strict';

	var CouponZone = $B.Class.extend({
		DEFAULT_DATE_FORMAT: 'YYYY-MM',

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$content = this._$target.find( '.tab_cont' );
			this._$benefitInfoBtn = this._$target.find( '.view_benefit' );
			this._$newMemberBtn = this._$target.find( '#new_member' );
			this._$comebackMemberBtn = this._$target.find( '#comeback_member' );
			
			this._$loading = this._$target.find( '.loading' );

			this._setEvents();

			if ( AP.LOGIN_USER ) {
				//this._$loading.hide();
				this._getMyCouponList();
			}else{
				this._getCouponList();
			}
			
			this._setCouponDownload();
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._$content.on( 'click', '.view_benefit', function (e) {

				var modal = AP.modal.full({
					title: '고객 등급별 혜택',
					contents: {
						templateKey: 'display.events.fullpage-benefit-info',
						templateModel: {
							loginYn: AP.LOGIN_USER,
							memberName: this._$target.find('.custom_level_area').data('member-name'),
							memberLevel: this._$target.find('.custom_level_area').data('member-level')
						}
					}
				});
			}.bind(this));

			this._$content.on( 'click', '#new_member', function (e) {
				var modal = AP.modal.info({
					title: '신규회원 쿠폰유의사항',
					contents: {
						templateKey: 'display.events.layer-coupon-attention',
						templateModel: {
							today: AP.common.date()
						},
						cancelLabel: '닫기'
				
					}
				});
			}.bind(this));
			
			this._$content.on( 'click', '#comeback_member', function (e) {
				var modal = AP.modal.info({
					title: '컴백회원 쿠폰유의사항',
					contents: {
						templateKey: 'display.events.layer-coupon-attention',
						templateModel: {
							today: AP.common.date()
						},
						cancelLabel: '닫기'
					}
				});
			}.bind(this));
		},

		_getMyCouponList: function () {
			if ( this._loading ) return;

			this._loading = true;
			this._$loading.show();
			AP.api.couponZoneMyList( null, {}).done( function ( result ) {

				result.availCnt;				
				var html = AP.common.getTemplate( 'display.events.mycoupon-list', result); 
				
				//this._$target.find('.txt_total_con>p>b').text(this._total);
				this._$content.html(html);
				
//				this._$benefitInfoBtn.addListener( 'click', function (e) {
//					
//					alert("dfdfdfdf");
//				}.bind( this ));
				
			}.bind(this)).fail(function (e) {
				//this._winScrollend.clear();
				AP.modal.alert( '데이타를 불러오지 못했습니다.' );
			}.bind(this)).always(function () {
				this._loading = false;
				this._$loading.hide();
			}.bind(this)); 
		},
		
		_getCouponList: function () {
			if ( this._loading ) return;

//			this._loading = true;
//			this._$loading.show();
//			AP.api.couponList( null, {
//				searchType: 'Avail'		
//			}).done( function ( result ) {
//
//				this._expCount = result.MemberKeepingCoupons.expCnt;				
//				var html = AP.common.getTemplate( 'display.events.coupon-list', result.MemberKeepingCoupons); 
//				
//				//this._$target.find('.txt_total_con>p>b').text(this._total);
//				this._$content.html(html);
//				
//			}.bind(this)).fail(function (e) {
//				//this._winScrollend.clear();
//				AP.modal.alert( '데이타를 불러오지 못했습니다.' );
//			}.bind(this)).always(function () {
//				this._loading = false;
//				this._$loading.hide();
//			}.bind(this)); 
			var html = AP.common.getTemplate( 'display.events.coupon-list', ''); 
			
			this._$content.html(html);

		},
		
		//쿠폰다운로드 설정
		_setCouponDownload: function () {
			//전달된 쿠폰 다운로드 마크업 가이드에 맞춰 "btn_download_coupon"
			this._$target.find( '#downloadCoupon' ).on( 'click', function (e) {
				var couponSn = $( e.currentTarget ).data( 'coupon-sn' );
				
				AP.login().done( function () {
					AP.api.downloadCoupon( null, {
						couponSn: couponSn
					})
					.done( function ( result ) {
						AP.modal.alert( '쿠폰을 다운로드 했습니다.' );
						this._getMyCouponList();
					}.bind(this))
					.fail( function ( xhr ) {
						if ( xhr.errorCode === 'EAPI004' ) {
							AP.login({trigger: true});
						} else if( AP.message[xhr.errorCode] != undefined ){
							AP.modal.alert( AP.message[xhr.errorCode] );
						} else {
							AP.modal.alert( xhr.errorMessage );
						}
					}.bind(this));
				}.bind(this));
			}.bind(this));
		}
	});


	AP.couponZone = new CouponZone();
})( jQuery );