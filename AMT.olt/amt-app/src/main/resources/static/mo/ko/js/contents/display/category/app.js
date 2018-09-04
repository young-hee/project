/**
 * Category
 *
 */

;(function ( $ ) {
	'use strict';

	var Category = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.ap_product' );
			this._$productList = this._$target.find( '.cate_prd_wrap01' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		searchFilterData: null,

		init: function ( options ) {
			this._displayMenuId = options.displayMenuId;
			this._productList = new AP.productList({
				$target: this._$productList,
				displayMenuId: options.displayMenuId,
				template: 'display.category.category-item',
				api: 'itemList',
				key: options.displayMenuId
			}).load({
				includeFilters: true
			});

			this._initCategoryMenu();
			this._initLibCuration();
		},

		toggleLibCuration: function ( open ) {
			if ( open ) {
				this._$target.find( '.color_curation' ).css({ bottom: '115px' });
			} else {
				this._$target.find( '.color_curation' ).css({ bottom: '16px' });
			}
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			// scroll fixed
			var sortY = this._$sort.offset().top;
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

		_initCategoryMenu: function () {
			var $header = $( '#header' );
			AP.categoryMenu.init({
				displayMenuId: this._displayMenuId,
				gnbMap: AP.GNBMAP,
				$pageTitle: $header.find( '.page_title_new' ),
				$menuLayer: $header.find( '.menu_layer' ),
				$dimmed: $header.find( 'cate_dimmed' ),
				$categoryMenu: this._$target.find( '.mid_category_list' )
			});
		},

		_initLibCuration: function () {
			if ( this._displayMenuId.indexOf( 'CTG002002' ) > -1 ) {
				this._$target.append(AP.common.getTemplate( 'display.category.lib-curation' ));
				this._$target.find( '.color_curation .bubble' ).delay( 2000 ).fadeOut( 1000 );
			}
		}
	});

	AP.category = new Category();
})( jQuery );