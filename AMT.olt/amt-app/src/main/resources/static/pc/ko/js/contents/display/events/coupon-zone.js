/**
 * 이벤트 : 출석체크
 */
;(function ( $ ) {
	'use strict';

	var CouponZone = $B.Class.extend({
		DEFAULT_DATE_FORMAT: 'YYYY-MM',

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$content = this._$target.find( '.couponzone' );
			this._$benefitInfoBtn = this._$target.find( '.view_benefit' );
			this._$newMemberBtn = this._$target.find( '#new_member' );
			this._$comebackMemberBtn = this._$target.find( '#comeback_member' );
			
//			this._$contentVipLounge = this._$target.find('.viplounge');
//			this._$contentAttendance = this._$target.find('.checkzone')
			this._$vipApplyBtn = this._$target.find( '.btn_joins' );
			
			this._$loading = this._$target.find( '.loading' );

			this._setEvents();

			if ( AP.LOGIN_USER ) {
				//this._$loading.hide();
				this._getMyCouponList();
			}else{
				//this._getCouponList();
			}
			
			//this._setCouponDownload();
			
			$( '.ui_tab' ).on( 'tabs-change', function (e) {
				if ( AP.LOGIN_USER ) {
					if(e.index === 1){
						console.log( e.index );
						
					}else if(e.index === 2){
						console.log( e.index );
						
					}
				}
			});
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEvents: function () {
			
			this._$target.find( '.btn_login' ).on( 'click', function (e) {
				AP.login.go();
			}.bind(this));
			
			this._$content.find( '#downloadCoupon' ).on( 'click', function (e) {
				AP.login().done( function () {
					var couponSn = $( e.currentTarget ).data( 'coupon-sn' );
				
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
			
			this._$content.on( 'click', '.benefit_more', function (e) {
				if(AP.LOGIN_USER){
					var title;
					if(this._$target.find('.member_grade').data('member-level') == 'WELCOME'){
						title = '<div class="custom_level_area welcome">';
					}else if(this._$target.find('.member_grade').data('member-level') == 'VIP'){
						title = '<div class="custom_level_area vip">';
					}else if(this._$target.find('.member_grade').data('member-level') == 'VIP+'){
						title = '<div class="custom_level_area vip_plus">';
					}else if(this._$target.find('.member_grade').data('member-level') == 'VVIP'){
						title = '<div class="custom_level_area vvip">';
					}else if(this._$target.find('.member_grade').data('member-level') == 'VVIP+'){
						title = '<div class="custom_level_area vvip_plus">';
					}
					title = title + '<span>' + this._$target.find('.member_grade').data('member-name') + '님은 <strong>' + this._$target.find('.member_grade').data('member-level') + '</strong>고객입니다</span></div>';
				}
				var modal = AP.modal.info({
					title: title,
					contents: {
						templateKey: 'display.events.fullpage-benefit-info',
						templateModel: {
							loginYn: AP.LOGIN_USER,
							memberName: this._$target.find('.custom_level_area').data('member-name'),
							memberLevel: this._$target.find('.custom_level_area').data('member-level')
						}
					},
					containerClass: 'card_installment'
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
			
			this._$vipApplyBtn.on( 'click', function (e) {
				AP.login().done( function () {
					AP.api.participated( null, {
						regularEventType: 'VIPLounge'
					}).done( function ( result ) {
						//vip라운지
						console.log(result.awards);
						var modal = AP.modal.info({
							title: '축하합니다',
							contents: {
								templateKey: 'display.events.vip-lounge-success',
								templateModel: {
									awards: result.awards
								}
							},
							confirmLayerLabel: '확인',
							containerClass : 'vip_pop01',
							btnType: 'full',
							hideCloseBtn: 'true'
						})
//
//						modal.getElement().find('.btn_default_modal_confirm').addClass('link');
//						
//						modal.getElement().find( 'img' ).imagesLoaded( function() {
//							modal.resetPosition();
//						});
						
						//AP.modal.alert("응모되었습니다.");

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
		},

		_getMyCouponList: function () {
			if ( this._loading ) return;

			this._loading = true;
			this._$loading.show();
			AP.api.couponZoneMyList( null, {}).done( function ( result ) {
				console.log(result.myCouponListResult);	
				console.log(result.availCnt.availCnt);				
				var html = AP.common.getTemplate( 'display.events.mycoupon-list', result); 
				
				//this._$target.find('.txt_total_con>p>b').text(this._total);
				this._$content.find('.down_couponzone').html(html);
				
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
			this._$content.find( '#downloadCoupon' ).on( 'click', function (e) {
				AP.login().done( function () {
					var couponSn = $( e.currentTarget ).data( 'coupon-sn' );
				
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