/**
 * Display
 *
 */

;(function ( $ ) {
	'use strict';

	var Display = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.ap_product' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );

			this._setEvent();
			this._setCategoryList();
			this._setSort();

		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods ============== */

		_setEvent: function () {

		},

		_setCategoryList: function () {
			if ( this._$target.find( '.mid_category_list' ).length == 0 ) return;

			// sub category
			this._$target.find( '.mid_category_list li a' ).on( 'click', function (e) {
				this._$target.find( '.mid_category_list li a' ).removeClass( 'on' );
				$( e.target ).addClass( 'on' );
			}.bind( this ));
		},

		_setSort: function () {
			// sort
			this._$target.find( '.select_type01_new select' ).on( 'change', function (e) {

			}.bind( this ));

			// view
			this._$target.find( '.btn_align' ).on( 'click', function (e) {
				if ( $( e.currentTarget ).hasClass( 'gallery' )) {
					$( e.currentTarget ).removeClass( 'gallery' );
					this._$target.find( '.product_list_new' ).removeClass( 'gallery' );
				} else {
					$( e.currentTarget ).addClass( 'gallery' );
					this._$target.find( '.product_list_new' ).addClass( 'gallery' );
				}
			}.bind( this ));

			// filter
			this._$target.find( '.btn_filter' ).on( 'click', function (e) {

			}.bind( this ));
		},






	});

	AP.display = new Display();
})( jQuery );