/**
 * OnePlusOne
 *
 */

;(function ( $ ) {
	'use strict';

	var OnePlusOne = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents' );
			this._$productList = this._$target.find( '.cate_prd_wrap01' );
			this._$category = this._$target.find( '.brand_category' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );

			this._isSetDisplayCate = false;
			this._cateIndex = 0;
			this._param = {};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._displayMenuId = options.displayMenuId;
			$.extend( this._param, options.param );

			this._productList = new AP.ProductList({
				component: 'onePlusOne',
				$target: this._$productList,
				displayMenuId: options.displayMenuId,
				key: options.displayMenuId,
				template: 'display.product-item',
				api: 'itemList'
			}).load( this._param ).addListener( 'set-display-cate', function (e) {
				this._setCategory( e.data );
				this._isSetDisplayCate = true;
			}.bind( this ));
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			// scroll fixed
			$( window ).on( 'scroll', function () {
				if ( AP.header.getHeight() +  $( window ).scrollTop() > this._$sort.offset().top ) {
					var isDisplay = this._$sort.find( '.filter_sel_area' ).css( 'display' ) == 'block',
						filterAreaH = ( isDisplay ) ? this._$sort.find( '.filter_sel_area' ).outerHeight() : 0,
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

		_setCategory: function ( data ) {
			if ( this._isSetDisplayCate ) return;
			var html = AP.common.getTemplate( 'display.category-menu', data );
			this._$category.find( 'ul' ).append( html );
			this._$category.on( 'click', 'li a', function (e) {
				var $cate = $( e.currentTarget ),
					index = $cate.parent().index(),
					displayMenuId = $cate.data( 'displayMenuId' );

				if ( index == this._cateIndex ) return;
				this._cateIndex = index;

				if ( !displayCateSn ) {
					this._param.displayMenuId = '';
				} else {
					this._param.displayMenuId = displayMenuId;
				}
				this._productList.resetIndex();
				this._productList.load( this._param );
			}.bind( this ));
		}
	});

	AP.onePlusOne = new OnePlusOne();
})( jQuery );