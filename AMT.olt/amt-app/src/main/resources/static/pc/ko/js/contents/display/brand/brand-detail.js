/**
 * BrandDetail
 *
 */

;(function ( $ ) {
	'use strict';

	var BrandDetail = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.brand_detail' );
			this._$brandMenu = this._$target.find( '.brand_menu' );
			this._$productList = this._$target.find( '.list_product' ).closest( '.category_area' );
			this._$category = this._$target.find( '.sale_slide' );
			this._$filter = this._$target.find( '.aside_area.filter.product' );

			this._param = {};
		},

		/** =============== Public Methods =============== */
		searchFilterData: null,

		init: function ( options ) {
			if ( options ) {
				this._displayMenuId = options.displayMenuId;
				$.extend( this._param, options.param );
			}
			this._productList = new AP.ProductList({
				$target: this._$productList,
				displayMenuId: options.displayMenuId,
				template: 'display.product-item',
				api: 'itemList',
				key: options.displayMenuId
			}).load( this._param ).addListener( 'init-search-filter', function (e) {
				this._initSearchFilter( e.data );
			}.bind( this )).addListener( 'set-display-cate', function (e) {
				this._setCategory( e.data );
			}.bind( this ));

			// location bar
			AP.pageTitle.init({
				displayMenuId: options.displayMenuId,
				gnbMap: AP.GNBMAP,
				$target: this._$target.find( '.page_title_area.prd_category' )
			});

			// category menu
			AP.categoryMenu.init({
				displayMenuId: options.displayMenuId,
				gnbMap: AP.GNBMAP,
				$target: this._$target.find( '.aside_area .category_list' )
			});

			this._setEvent();
			this._setBrandMenu();
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {

		},

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
		},

		_initSearchFilter: function ( data ) {
			this.searchFilterData = data;

			this._searchFilter = new AP.searchFilter( this._$filter, 'category', this.searchFilterData );
			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				this._productList.applyFilter( e.filterParam, e.reset );
			}.bind( this ));
		},

		_setBrandMenu: function () {
			AP.api.getBrandMenu({}, {}).done(function ( result ) {
				var html = AP.common.getTemplate( 'display.brand.brand-menu', result );
				this._$brandMenu.find( 'ul' ).html( html );
				this._$brandMenu.find( '.slide' ).ixSlideMax();
			}.bind( this )).fail(function ( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
			}.bind( this ));

			this._$brandMenu.on( 'click', 'li a', function (e) {
				e.preventDefault();
				var brandSn = $( e.currentTarget ).data( 'brandSn' );
				console.log( brandSn );
			}.bind( this ));
		}
	});

	AP.brandDetail = new BrandDetail();
})( jQuery );