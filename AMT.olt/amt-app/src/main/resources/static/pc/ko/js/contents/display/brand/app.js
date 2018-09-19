/**
 * brand
 */
;(function ( $ ) {
	'use strict';

	var Brand = $B.Class.extend({

		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.brand_overview' );
			this._$brandList = this._$target.find( '.brand_list' );
			this._$sort = this._$target.find( '.search_sort' );
			this._$loading = this._$target.find( '.loading' );

			this._param = {};
		},

		/** =============== Public Methods =============== */
		init: function () {
			this._setEvent();
			this._load();
		},

		/** =============== Private Methods =============== */
		_load: function () {
			AP.api.getBrandCards({}, this._param ).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.brand.brand-card', result );
				this._$brandList.show().find( '> ul' ).html( html );
				this._$loading.hide();

				this._setBrandCard();
			}.bind( this )).fail(function ( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));
		},

		_setEvent: function () {
			this._param.sort = this._$sort.find( 'a.on' ).data( 'value' );
			this._$sort.find( 'a' ).on( 'click', function (e) {
				this._$sort.find( 'a' ).removeClass( 'on' );
				$( e.currentTarget ).addClass( 'on' );
				this._param.sort = $( e.currentTarget ).data( 'value' );
				this._load();
			}.bind( this ));
		},

		_setBrandCard: function () {

		}
	});

	AP.brand = new Brand();
})( jQuery );