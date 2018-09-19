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
			this._$popular = this._$target.find( '.cushion_rank.slide' );
			this._$newProduct = this._$target.find( '.cushion_unit .product_box' );

			this._param = {};
		},

		/** =============== Public Methods =============== */
		searchFilterData: null,

		init: function ( options ) {
			this._displayMenuId = options.displayMenuId;
			$.extend( this._param, options.param );

			this._productList = new AP.ProductList({
				$target: this._$productList,
				displayMenuId: options.displayMenuId,
				template: 'display.product-item',
				api: 'itemList',
				key: options.displayMenuId
			}).load( this._param ).addListener( 'init-search-filter', function (e) {
				this._initSearchFilter( e.data );
			}.bind( this ));

			this._setEvent();
			this._setPopularCushion();
			this._setNewProduct();
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

		_setNewProduct: function () {
			if ( !this._$target.find( '.cushion_movie' ).length ) {
				AP.api.itemList({ displayMenuId: this._displayMenuId }, {
					prodSort: 'NewProd',
					limit: 1,
					offset: 0
				}).done(function ( result ) {
					if ( result['filterableOnlineProdList'] ) {
						result = result['filterableOnlineProdList'];
					} else if ( result['onlineProdList'] ) {
						result = result['onlineProdList'];
					}

					// TODO: 최신쿠션상품
					result.list = [{}];

					var html = AP.common.getTemplate( 'display.events.cushion-zone-new-item', result.list[0] );
					this._$newProduct.html( html );
					this._$newProduct.siblings( '.loading' ).hide();
					this._$newProduct.show();

					this._newProduct = new AP.ProductItem({
						$target: this._$newProduct.find( '.item' ),
						data: result.list[0],
						displayMenuId: this._displayMenuId
					});

				}.bind( this )).fail(function( error ) {
					console.log( error );
				}.bind( this ));
			}
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

				options.$slide.find( '.item' ).each(function ( index, target ) {
					new AP.ProductItem({
						$target: $( target ),
						data: listData[index],
						displayMenuId: this._displayMenuId
					});
				}.bind( this ));
			}.bind( this )).fail(function () {}.bind( this ));
		},

		// TODO: 실시간 인기 쿠션
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
				this._$popular.find( 'ul.ix-list-items' ).html( html );
				this._$popular.find( '.paging .total' ).text( Math.ceil( this._$popular.ixSlideMax( 'getTotalLength' ) / this.SLIDE_VIEW_LENGTH ));
				this._$popular.ixSlideMax().on( 'ixSlideMax:change', function (e) {
					this._$popular.find( '.paging .current' ).text( Math.ceil( e.currentIndex / this.SLIDE_VIEW_LENGTH ) + 1 );
				}.bind( this ));

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