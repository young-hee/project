/**
 * Category
 *
 */

;(function ( $ ) {
	'use strict';

	var CushionZone = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.cushion' );
			this._$productList = this._$target.find( '.cate_prd_wrap01' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );
			this._$popular = this._$target.find( '.wide_swipe' );

			this._param = {};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		searchFilterData: null,

		init: function ( options ) {
			this._displayMenuId = options.displayMenuId;
			$.extend( this._param, options.param );

			this._productList = new AP.ProductList({
				component: 'cushionZone',
				$target: this._$productList,
				displayMenuId: options.displayMenuId,
				template: 'display.product-item',
				api: 'itemList',
				key: options.displayMenuId
			}).load( this._param );

			this._setPopularCushion();
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

		_setPopularCushion: function () {
			var listData = [];
			AP.api.test( {}, {
			// AP.api.inDisplayCate( {}, {
				offset: 0,
				limit: 9,
				flags: '',
				displayCate: '131',
				scope: 'All',
				prodSort: 'Popularity1'
			}).done(function ( result ) {
				if ( result.onlineProdList ) {
					result = result.onlineProdList;
					listData = result.list;
				}

				// TODO: category slide product
				result = {
					list: [1,2,3,4,5,6,7,8,9]
				};
				listData = result.list;

				this._$popular.siblings( '.loading' ).remove();
				this._$popular.show();
				var html = AP.common.getTemplate( 'display.events.popular-cushion-item', result );
				this._$popular.html( html );

				this._$popular.find( '.item:not(.item-apply)' ).each(function ( index, target ) {
					new AP.ProductItem({
						$target: $( target ),
						data: listData[index],
						displayMenuId: this._displayMenuId
					});
				}.bind( this ));
			}.bind( this ));
		}
	});

	AP.cushionZone = new CushionZone();
})( jQuery );