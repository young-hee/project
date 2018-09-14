/**
 * OnePlusOne
 *
 */

;(function ( $ ) {
	'use strict';

	var OnePlusOne = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents' );
			this._$productList = this._$target.find( '.inner_wrap' );
			this._$category = this._$target.find( '.sale_slide' );

			this._isSetDisplayCate = false;
			this._cateIndex = 0;
			this._param = {
				limit: 20,
				includeFilters: true,
				displayCate: ''
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		init: function ( options ) {
			this._productList = new AP.ProductList({
				$target: this._$productList,
				displayMenuId: options.displayMenuId,
				template: 'display.product-item',
				api: 'itemList',
				key: options.displayMenuId
			}).load( this._param ).addListener( 'set-display-cate', function (e) {
				this._setCategory( e.data );
			}.bind( this ));
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {},

		_setCategory: function ( data ) {
			if ( this._isSetDisplayCate ) return;
			this._isSetDisplayCate = true;

			var html = AP.common.getTemplate( 'display.category-menu', data );
			this._$category.find( 'ul' ).append( html );

			if ( this._$category.find( 'li' ).length >= 9 ) {
				this._$target.find( '.sale_slide' ).addClass( 'slide' );
				this._$target.find( '.sale_slide.slide' ).ixSlideMax();
			}

			this._$category.on( 'click', 'li a', function (e) {
				var $cate = $( e.currentTarget ),
					index = $cate.parent().index(),
					displayMenuId = $cate.data( 'displayMenuId' );

				if ( index == this._cateIndex ) return;
				this._cateIndex = index;

				if ( !displayMenuId ) {
					this._param.displayMenuId = '';
				} else {
					this._param.displayMenuId = displayMenuId;
				}
				this._productList.loadingStart();
				this._productList.load( this._param );
			}.bind( this ));
		}
	});

	AP.onePlusOne = new OnePlusOne();
})( jQuery );