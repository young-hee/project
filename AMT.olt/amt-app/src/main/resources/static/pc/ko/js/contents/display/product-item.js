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
			// 장바구니
			this._$target.on( 'click', '.cart_btn', function () {
				AP.addCart.add( this._data.products );

				return false;
			}.bind( this ));

			// 좋아요
			this._$target.on( 'click', '.like_btn', function () {
				var $like = $( e.currentTarget );

				AP.login().done(function () {
					if ( !$like.hasClass( 'on' )) {
						$like.toggleClass( 'on' ).find( '.ico_favorite' ).toggleClass( 'on' );
						AP.addLike.add( this._data.products );
					} else {
						$like.toggleClass( 'on' ).find( '.ico_favorite' ).toggleClass( 'on' );
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