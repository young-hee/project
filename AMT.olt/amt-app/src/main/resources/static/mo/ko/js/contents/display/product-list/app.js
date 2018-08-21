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
			this._$filterArea = this._$sort.find( '.filter_sel_area' );

			this._productList = null;

			this._setSort();
			this._setCategory();
			this._libCuration();
		},

		/** =============== Public Methods =============== */
		searchFilterData: null,

		init: function ( options ) {
			this._productList = new AP.productList({
				$target: this._$productList,
				displayMenuId: options.displayMenuId
			});
			this._productList.load();
		},

		/** =============== Private Methods ============== */
		_setSort: function () {
			// fixed
			var sortY = this._$sort.offset().top;
			$( window ).on( 'scroll', function () {
				if ( AP.header.getHeight() + $( window ).scrollTop() > sortY ) {
					var isDisplay = this._$filterArea.css( 'display' ) == 'block',
						 filterAreaH = ( isDisplay ) ? this._$filterArea.outerHeight() : 0,
						 paddingBottom = this._$sort.find( '.sort_filter_top' ).height() + filterAreaH + 9;
					this._$sort.addClass( 'fixed' ).css( 'padding-bottom', paddingBottom );
				} else {
					this._$sort.removeClass( 'fixed' ).css( 'padding-bottom', 0 );
				}
			}.bind( this ));

			// view
			this._$sort.find( '.btn_align' ).on( 'click', function (e) {
				if ( this._$sort.find( '.btn_align' ).hasClass( 'gallery' )) {
					this._$sort.find( '.btn_align' ).removeClass( 'gallery' );
					this._$productList.find( '.product_list_new' ).removeClass( 'gallery' );
				} else {
					this._$sort.find( '.btn_align' ).addClass( 'gallery' );
					this._$productList.find( '.product_list_new' ).addClass( 'gallery' );
				}
			}.bind( this ));
		},

		_setCategory: function () {
			if ( this._$target.find( '.mid_category_list' ).length == 0 ) return;

			// sub category
			this._$target.find( '.mid_category_list li a' ).on( 'click', function (e) {
				this._$target.find( '.mid_category_list li a' ).removeClass( 'on' );
				$( e.target ).addClass( 'on' );
			}.bind( this ));
		},

		_libCuration: function () {
			if ( this._$target.find( '.color_curation' ).length == 0 ) return;
			this._$target.find( '.color_curation .bubble' ).delay( 2000 ).fadeOut( 1000 );
		}
	});

	AP.display = new Display();
})( jQuery );