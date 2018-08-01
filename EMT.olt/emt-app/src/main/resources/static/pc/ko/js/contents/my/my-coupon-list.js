/**
 * 나의 쿠폰 관리
 */

;(function ( $ ) {
	'use strict';

	var MyCouponList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.coupon' );

			this.searchType = 'AvailCoupon';

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( searchType ) {
			searchType = searchType || this.searchType;

			if ( this._api ) this._api.abort();

			this._api = AP.api.couponList( {}, {searchType : searchType}).done(function ( result ) {

				if ( result == null
					|| result.MemberKeepingCoupons == null
					|| (searchType == 'Avail') && result.MemberKeepingCoupons.availCnt == 0
					|| (searchType == 'Exp') && result.MemberKeepingCoupons.expCnt == 0
				) {
					this._$target.find( '.coupon_list' ).hide();
					this._$target.find( '.result_none' ).show();
				} else {
					this._$target.find( '.coupon_list' ).show();

					result = result.MemberKeepingCoupons;

					var html ='';

					if ( searchType == 'Avail' && result.availCnt > 0 ) {
						html = AP.common.getTemplate( 'my.coupon-list', {
							searchType: searchType,
							list: result.availCoupons
						});
					}
					if ( searchType == 'Exp' && result.expCnt > 0 ) {
						result.expCoupons.useDt = result.useDt;
						html = AP.common.getTemplate( 'my.coupon-list', {
							searchType: searchType,
							list: result.expCoupons
						});
					}

					this._$target.find( '.coupon_list' ).append( html );
					$( '.ui_tooltip' ).tooltip();


					this._$target.find( '.result_none' ).hide();
				}

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function (e) {});
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {

			// 등록
			this._$target.on( 'click', '#registerBtn', function (e) {

				var coupon = $('[name=couponIdentifier]').val();
				if (coupon) {
					AP.api.registerCoupon({}, {
						couponIdentifier: coupon
					}).done(function (data) {
						//성공
						AP.modal.alert("온라인 전용 쿠폰 등록했습니다.");
						location.href = "/my/page/myCouponList";
					}).fail(function(e) {
						AP.modal.alert(e.responseJSON.errorData.message);
						//실패
					}).always(function() {
						//성공, 실패
					});
				} else {
					AP.modal.alert("쿠폰번호를 입력하세요.")
				}

			}.bind( this ));

			// 진주알교환
			this._$target.on( 'click', '.button_my_coupon_change', function(e) {

				//TODO: my-pearl-gift-01.html 참조
				$.get('/my/page/pearl/salesCushion', function(data) {
					var contents = new Object();
					contents.contents = data;

					var modal = AP.modal.info(contents);
					var $modalEl = modal.getElement(); //jquery object
					$(".layer_close").click(function() {
						modal.close();
					});

					var $tabBtn = $modalEl.find( '.ui_tab .tab_menu button' ),
						$tabLi = $modalEl.find( '.ui_tab .tab_menu li' ),
						$tabs = $modalEl.find( '.tab_cont' );

					var flag = 0;

					$($tabBtn[0]).click(function() {
						$tabs.css('display','none');
						$tabLi.removeClass('on');
						$($tabLi[0]).addClass('on')
						$($tabs[0]).css('display','block');
					});
					$($tabBtn[1]).click(function() {
						$tabs.css('display','none');
						$tabLi.removeClass('on');
						$($tabLi[1]).addClass('on')
						$($tabs[1]).css('display','block');
					});
				});
			}.bind( this ));
		}
	});

	AP.myCouponList = new MyCouponList();
})( jQuery );