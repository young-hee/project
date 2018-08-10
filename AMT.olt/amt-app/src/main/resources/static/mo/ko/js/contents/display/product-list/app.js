/**
 * Display
 *
 */

;(function ( $ ) {
	'use strict';

	var Display = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.ap_product' );
			this._$productList = this._$target.find( '.cate_prd_wrap01' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );

			this._productList = null;

			this._setSort();
			this._setCategory();
		},

		/** =============== Public Methods =============== */
		init: function () {
			this._productList = new AP.productList({
				$target: this._$productList
			});
			this._productList.load();
		},

		/** =============== Private Methods ============== */
		_setSort: function () {
			// fixed
			var sortY = this._$sort.offset().top;
			$( window ).on( 'scroll', function () {
				if ( AP.header.getHeight() + $( window ).scrollTop() > sortY ) {
					this._$sort.addClass( 'fixed' );
				} else {
					this._$sort.removeClass( 'fixed' );
				}
			}.bind( this ));

			// sort
			this._$sort.find( '.select_type01_new select' ).on( 'change', function (e) {
				this._productList.sort( $( e.target ).val() );
			}.bind( this ));

			// view
			this._$sort.find( '.btn_align' ).on( 'click', function (e) {
				this._productList.changeView() ;
			}.bind( this ));

			// filter
			this._$sort.find( '.btn_filter' ).on( 'click', function (e) {
				this._productList.openFilter() ;
			}.bind( this ));
		},

		_setCategory: function () {
			if ( this._$target.find( '.mid_category_list' ).length == 0 ) return;

			// sub category
			this._$target.find( '.mid_category_list li a' ).on( 'click', function (e) {
				this._$target.find( '.mid_category_list li a' ).removeClass( 'on' );
				$( e.target ).addClass( 'on' );
			}.bind( this ));
		}
	});

	AP.display = new Display();
})( jQuery );