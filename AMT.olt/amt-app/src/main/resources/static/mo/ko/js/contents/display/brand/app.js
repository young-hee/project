/**
 * Brand
 *
 */

;(function ( $ ) {
	'use strict';

	var Brand = $B.Class.extend({
		
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.brand_overview' );
			this._$brandMenu = this._$target.find( '.brand_menu' );
		},

		/** =============== Public Methods =============== */
		init: function () {
			this._setBrandMenu();
		},

		/** =============== Private Methods ============== */
		_setEvents: function () {
		},

		_setBrandMenu: function () {
			AP.api.getBrandMenu({}, {}).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.brand.brand-menu', result );
				this._$brandMenu.find( '.c_brand_list' ).html( html ).show();
				this._$brandMenu.find( '.loading' ).hide();
				if ( result.length <= 8 ) {
					this._$brandMenu.find( '.view, close' ).remove();
				}
			}.bind( this )).fail(function ( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		}
	});
	AP.brand = new Brand();
})( jQuery );