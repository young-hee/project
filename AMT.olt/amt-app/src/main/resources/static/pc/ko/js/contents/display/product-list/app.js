/**
 * Display
 *
 */

;(function ( $ ) {
	'use strict';

	var Display = $B.Class.extend({
		initialize: function () {
			this.SLIDE_VIEW_LENGTH = 3;

			this._$target = $( '#ap_container .ap_contents.goods_list' );
			this._$productList = this._$target.find( '.list_product' ).closest( '.category_area' );

			this._productList = null;

			this._displayMenuId = '';

			this._setEvent();
			this._setRecommendProduct();
			this._setBestProduct();
			this._setPopularBrand();
			this._setReviewBest();
		},

		/** =============== Public Methods =============== */
		searchFilterData: null,

		init: function ( options ) {
			this._displayMenuId = options.displayMenuId;
			this._productList = new AP.productList({
				$target: this._$productList
			});
			this._productList.load();
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {},

		_initProductSlide: function ( options ) {
			options.api({}, options.param).done(function ( result ) {
				result = {
					list: [1,2,3,4,5,6,7,8,9,10,11,12]
				};

				var html = AP.common.getTemplate( options.template, result );
				options.$slide.find( 'ul.ix-list-items' ).html( html );
				options.$slide.ixSlideMax();
				options.$slide.find( '.paging .total' ).text( Math.ceil( options.$slide.ixSlideMax( 'getTotalLength' ) / this.SLIDE_VIEW_LENGTH ));
				options.$slide.on( 'ixSlideMax:change', function (e) {
					options.$slide.find( '.paging .current' ).text( Math.ceil( e.currentIndex / this.SLIDE_VIEW_LENGTH ) + 1 );
				}.bind( this ));
			}.bind( this )).fail(function () {}.bind( this ));

			options.$slide.on( 'click', '.like, .cart', function (e) {
				if ( $( e.currentTarget ).hasClass( 'like' )) {
					$( e.currentTarget ).find( 'i' ).toggleClass( 'on' );
				} else {
					$( e.currentTarget ).find( 'i' ).addClass( 'on' );
				}
			}.bind( this ));
		},

		_setRecommendProduct: function () {
			if ( this._$target.find( '.recommended_item.slide.recommend' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.test,
				param: {},
				template: 'display.product-list.recommend-item',
				$slide: this._$target.find( '.recommended_item.slide.recommend' )
			});
		},

		_setBestProduct: function () {
			if ( this._$target.find( '.recommended_item.slide.popular' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.test,
				param: {},
				template: 'display.product-list.recommend-item',
				$slide: this._$target.find( '.recommended_item.slide.popular' )
			});
		},

		_setPopularBrand: function () {
			if ( this._$target.find( '.brandWrap01.slide.popular_brand' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.test,
				param: {},
				template: 'display.product-list.popular-brand-item',
				$slide: this._$target.find( '.brandWrap01.slide.popular_brand' )
			});
		},

		_setReviewBest: function () {
			if ( this._$target.find( '.bast_review.slide' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.test,
				param: {},
				template: 'display.product-list.best-review-item',
				$slide: this._$target.find( '.bast_review.slide' )
			});

		}
	});

	AP.display = new Display();
})( jQuery );