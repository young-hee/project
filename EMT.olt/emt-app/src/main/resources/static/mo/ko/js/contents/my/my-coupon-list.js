/**
 * 나의 쿠폰 관리
 */

;(function ( $ ) {
	'use strict';

	var MyCouponList = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.mypage.coupon' );

			if ( this._$target.length > 0 ) this._setEvent();
		},

		/** =============== Public Methods =============== */
		_getList: function ( searchType ) {

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
					this._$target.find( '.result_none' ).hide();

					result = result.MemberKeepingCoupons;

					var html ='';

					//사용가능
					if ( searchType == 'Avail' && result.availCnt > 0 ) {
						$('#availCnt').html(result.availCnt);

						html = AP.common.getTemplate( 'my.coupon-list', {
							searchType: searchType,
							list: result.availCoupons
						});
					}

					//사용/완료
					if ( searchType == 'Exp' && result.expCnt > 0 ) {
						$('#expCnt').html(result.expCnt);

						result.expCoupons.useDt = result.useDt;
						html = AP.common.getTemplate( 'my.coupon-list', {
							searchType: searchType,
							list: result.expCoupons
						});
					}

					this._$target.find( '.coupon_list' ).append( html );
					$( '.ui_tooltip' ).tooltip();
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
						AP.modal.alert('온라인 전용 쿠폰 등록했습니다.'
						).addListener( 'modal-close', function (e) {
							//console.log( e.closeType );//confirm, cancel, close
							location.href = "/my/page/myCouponList";
						});
					}).fail(function(e) {
						//실패
						//AP.modal.alert(e.responseJSON.errorData.message);
						AP.modal.alert("쿠폰등록 실패했습니다. 쿠폰번호 확인하세요.");
					}).always(function() {
						//성공, 실패
					});
				} else {
					AP.modal.alert("쿠폰번호를 입력하세요.")
				}

			}.bind( this ));
		}
	});

	AP.myCouponList = new MyCouponList();
})( jQuery );