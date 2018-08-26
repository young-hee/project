/**
 * ProductItem
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductItem = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._defaultModel = options.data;

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		clear: function () {
			this._$target.find( '.like' ).off( 'click' );
			this._$target.find( '.cart' ).off( 'click' );
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			// 좋아요
			this._$target.find( '.like' ).on( 'click', function (e) {
				e.preventDefault();
				AP.login().done(function () {
					$( e.currentTarget ).find( 'i' ).toggleClass( 'on' );
				}.bind( this ));
			}.bind( this ));

			// 장바구니
			this._$target.find( '.cart' ).on( 'click', function (e) {
				e.preventDefault();
				var products = this._defaultModel.products;
				AP.addCart.put( products );
			}.bind( this ));
		}
	});

	AP.ProductItem = ProductItem;
})( jQuery );