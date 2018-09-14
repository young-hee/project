/**
 * CushionZone
 *
 */

;(function ( $ ) {
	'use strict';

	var CushionZone = $B.Class.extend({
		initialize: function () {
			this.SLIDE_VIEW_LENGTH = 3;

			this._$target = $( '#ap_container .ap_contents.goods_list' );
			this._$productList = this._$target.find( '.list_product' ).closest( '.category_area' );
			this._$filter = this._$target.find( '.aside_area.filter.product' );

			this._param = {};
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
			}).load( this._param ).addListener( 'init-search-filter', function (e) {
				this._initSearchFilter( e.data );
			}.bind( this ));

			this._setEvent();
			this._setRecommendProduct();
			this._setPopularCushion();
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			this._productList.addListener( 'clear-search-filter', function (e) {
				this._$filter.find( '.loading img' ).hide();
			}.bind( this ));

			this._$target.on( 'click', '.cushion_movie a', function () {
				this._openVideo( this._$target.find( '.cushion_movie' ));
				return false;
			}.bind( this ));
		},

		_openVideo: function ( $video ) {
			AP.modal.info({
				title: $video.find( '.tit' ).text(),
				containerClass: 'yt_pop',
				contents: {
					templateKey: 'display.events.cushion-zone-video',
					templateModel: {
						title: $video.find( '.tit' ).text(),
						videoSrc: $video.data( 'videoSrc' ),
						videoImgThumbnailUrl: $video.data( 'videoImgThumbnailUrl' )
					}
				}
			});
		},

		_initSearchFilter: function ( data ) {
			this.searchFilterData = data;

			this._searchFilter = new AP.searchFilter( this._$filter, 'cushionZone', this.searchFilterData );
			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				this._productList.applyFilter( e.filterParam, e.reset );
			}.bind( this ));
		},

		_initProductSlide: function ( options ) {
			var listData = [];

			options.api( {}, options.param ).done(function ( result ) {
				if ( options.test == 'test' ) {
					// TODO: category slide product
					result = {
						list: [1,2,3,4,5,6,7,8,9,10,11,12]
					};
					listData = result.list;
				} else {
					if ( result.onlineProdList ) {
						result = result.onlineProdList;
						listData = result.list;
					} else if ( result.prodReviewListInfo ) {
						result = result.prodReviewListInfo;
						listData = result.prodReviewList;
					}
				}

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
				AP.login().done(function () {
					$( e.currentTarget ).find( 'i' ).toggleClass( 'on' );
					var index = $( e.currentTarget ).closest( '.item' ).data( 'index' );
					AP.addLike.add( listData[index].products );
				}.bind( this ))
			}.bind( this ));

			options.$slide.on( 'click', '.cart', function (e) {
				e.preventDefault();
				var index = $( e.currentTarget ).closest( '.item' ).data( 'index' );
				AP.addCart.add( listData[index].products );
			}.bind( this ));
		},

		// TODO: 제안드리는 상품
		_setRecommendProduct: function () {
			this._initProductSlide({
				test: 'test',
				api: AP.api.test,
				param: {
					offset: 0,
					limit: 12
				},
				template: 'display.category.recommend-item',
				$slide: this._$target.find( '.recommended_item.slide.recommend' )
			});
		},

		// TODO: 실시간 인기 쿠션
		_setPopularCushion: function () {
			this._initProductSlide({
				test: 'test',
				api: AP.api.test,
				param: {
					offset: 0,
					limit: 12,
					flags: '',
					displayCate: '131',
					scope: 'All',
					prodSort: 'Popularity1'
				},
				template: 'display.category.recommend-item',
				$slide: this._$target.find( '.recommended_item.slide.popular' )
			});
		},
	});

	AP.cushionZone = new CushionZone();
})( jQuery );