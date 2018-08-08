/**
 * ProductList
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductList = $B.Class.extend({
		initialize: function () {
			console.log( 'product-list' );

			this._setScroll();
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods ============== */

		_setScroll: function () {
			this._winScrollend = new $B.event.ScrollEnd( window );
			this._winScrollend.gap({ bottom: AP.footer.getHeight() }).addListener( 'scrollbottom', function (e) {
				// this._winScrollend.clear();
			}.bind( this ));
		}
	});

	AP.productList = new ProductList();
})( jQuery );