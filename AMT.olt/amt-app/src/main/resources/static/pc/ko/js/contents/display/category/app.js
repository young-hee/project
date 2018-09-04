/**
 * Category
 *
 */

;(function ( $ ) {
	'use strict';

	var Category = $B.Class.extend({
		initialize: function () {
			this.SLIDE_VIEW_LENGTH = 3;

			this._$target = $( '#ap_container .ap_contents.goods_list' );
			this._$productList = this._$target.find( '.list_product' ).closest( '.category_area' );
			this._$filter = this._$target.find( '.aside_area.filter.product' );

			this._setEvent();
			this._setRecommendProduct();
			this._setBestProduct();
			this._setPopularBrand();
			this._setReviewBest();
		},

		/** =============== Public Methods =============== */
		searchFilterData: null,

		init: function ( options ) {
			this._productList = new AP.ProductList({
				$target: this._$productList,
				displayMenuId: options.displayMenuId,
				template: 'display.category.category-item',
				api: 'itemList',
				key: options.displayMenuId
			}).load({ includeFilters: true }).addListener( 'init-search-filter', function (e) {
				this._initSearchFilter( e.data );
			}.bind( this ));

			AP.pageTitle.init({
				displayMenuId: options.displayMenuId,
				gnbMap: AP.GNBMAP,
				$target: this._$target.find( '.page_title_area.prd_category' )
			});

			AP.categoryMenu.init({
				displayMenuId: options.displayMenuId,
				gnbMap: AP.GNBMAP,
				$target: this._$target.find( '.aside_area .category_list' )
			});
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			AP.categoryMenu.addListener( 'set-category-title', function (e) {
				if ( this._$target.find( '.recommended_item.slide.recommend' ).length ) {
					this._$target.find( '.recommended_item.slide.recommend' ).siblings( '.title_result' ).find( 'strong' ).text( e.title + '에서 제안드리는 상품' );
				}
				if ( this._$target.find( '.recommended_item.slide.popular' ).length ) {
					this._$target.find( '.recommended_item.slide.popular' ).siblings( '.title_result' ).find( 'strong' ).text( e.title + '인기상품' );
				}
				if ( this._$target.find( '.brandWrap01.slide.popular_brand' ).length ){
					this._$target.find( '.brandWrap01.slide.popular_brand' ).siblings( '.title_result' ).find( 'strong' ).text( e.title + '인기브랜드' );
				}
			}.bind( this ));
		},


		_initSearchFilter: function ( data ) {
			this.searchFilterData = data;

			this._searchFilter = new AP.searchFilter( this._$filter, this.searchFilterData );
			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				this._productList.applyFilter( e.filterParam, e.reset );
			}.bind( this ));
		},

		_initProductSlide: function ( options ) {
			var listData = [];
			options.api( {}, options.param ).done(function ( result ) {
				result = {
					list: [1,2,3,4,5,6,7,8,9,10,11,12]
				};

				listData = result.list;

				options.$slide.siblings( '.loading' ).remove();
				options.$slide.show();
				var html = AP.common.getTemplate( options.template, result );
				options.$slide.find( 'ul.ix-list-items' ).html( html );
				options.$slide.ixSlideMax();
				options.$slide.find( '.paging .total' ).text( Math.ceil( options.$slide.ixSlideMax( 'getTotalLength' ) / this.SLIDE_VIEW_LENGTH ));
				options.$slide.on( 'ixSlideMax:change', function (e) {
					options.$slide.find( '.paging .current' ).text( Math.ceil( e.currentIndex / this.SLIDE_VIEW_LENGTH ) + 1 );
				}.bind( this ));
			}.bind( this )).fail(function () {}.bind( this ));

			options.$slide.on( 'click', '.like', function (e) {
				$( e.currentTarget ).find( 'i' ).toggleClass( 'on' );
			}.bind( this ));

			options.$slide.on( 'click', '.cart', function (e) {
				e.preventDefault();
				var index = $( e.currentTarget ).closest( '.item' ).data( 'index' );
				AP.addCart.add( this._data[index].products );
			}.bind( this ));
		},

		// 제안드리는 상품
		_setRecommendProduct: function () {
			if ( this._$target.find( '.recommended_item.slide.recommend' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.test,
				param: {
					offset: 0,
					limit: 12
				},
				template: 'display.category.recommend-item',
				$slide: this._$target.find( '.recommended_item.slide.recommend' )
			});
		},

		// 인기상품
		_setBestProduct: function () {
			if ( this._$target.find( '.recommended_item.slide.popular' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.flaggedItemList,
				param: {
					offset: 0,
					limit: 12,
					flags: 'icon_reco_best_24h',
					displayCate: ''
				},
				template: 'display.category.recommend-item',
				$slide: this._$target.find( '.recommended_item.slide.popular' )
			});
		},

		// 인기브랜드
		_setPopularBrand: function () {
			if ( this._$target.find( '.brandWrap01.slide.popular_brand' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.test,
				param: {
					offset: 0,
					limit: 12
				},
				template: 'display.category.popular-brand-item',
				$slide: this._$target.find( '.brandWrap01.slide.popular_brand' )
			});
		},

		// 구매리뷰 베스트
		_setReviewBest: function () {
			if ( this._$target.find( '.bast_review.slide' ).length == 0 ) return;
			this._initProductSlide({
				api: AP.api.test,
				param: {
					offset: 0,
					limit: 12
				},
				template: 'display.category.best-review-item',
				$slide: this._$target.find( '.bast_review.slide' )
			});
		}
	});

	AP.category = new Category();
})( jQuery );