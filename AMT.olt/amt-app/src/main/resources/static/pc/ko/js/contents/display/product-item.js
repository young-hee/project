/**
 * ProductItem
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductItem = $B.Class.extend({
		initialize: function ( options ) {
			this._displayMenuId = options.displayMenuId;
			this._data = options.data;
			this._$target = options.$target;

			this._$target.addClass( 'item-apply' );

			this._setEvent();
			this._setSlide();
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods ============== */
		_setEvent: function () {
			// sold out
			this._$target.on( 'click', '.soldout a', function (e) {
				if ( this._displayMenuId == 'todayHotdeal' ) {
					// 핫딜
					if ( $( e.currentTarget ).hasClass( 'soldout' ) ) {
						AP.modal.alert( '판매가 모두 완료되었어요. 다음 기회를 기다려주세요!' );
						return false;
					}
				}
			}.bind( this ));

			// 장바구니
			this._$target.on( 'click', '.cart_btn', function (e) {
				AP.addCart.add( this._data.products );

				return false;
			}.bind( this ));

			// 좋아요
			this._$target.on( 'click', '.like_btn', function (e) {
				var $like = $( e.currentTarget );

				AP.login().done(function () {
					if ( !$like.hasClass( 'on' )) {
						$like.toggleClass( 'on' ).find( '.ico_favorite' ).addClass( 'on' );
						AP.addLike.add( this._data.products );
					} else {
						$like.toggleClass( 'on' ).find( '.ico_favorite' ).removeClass( 'on' );
						AP.addLike.remove( this._data.onlineProdSn );
					}
				}.bind( this ));

				return false;
			}.bind( this ));
		},

		_setSlide: function () {
			if( this._displayMenuId != 'specialGift' ) return;
			this._$target.find( '.slide' ).ixSlideMax();
		}
	});

	AP.ProductItem = ProductItem;
})( jQuery );