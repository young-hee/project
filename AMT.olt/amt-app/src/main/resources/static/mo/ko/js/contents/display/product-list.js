/**
 * ProductList
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._template = options.template;
			this._displayMenuId = options.displayMenuId;
			this._api = options.api;
			this._key = ( options.key ) ? { displayMenuId: options.key } : {};

			this._$list = this._$target.find( '.product_list_new' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );
			this._$filterArea = this._$sort.find( '.filter_sel_area' );
			this._$resultNone = this._$target.find( '.no_product' );
			this._$loading = this._$target.find( '.loading' );

			this._winScrollend = null;
			this._searchFilter = null;
			this._invokedFilter = null;

			this._data = [];
			this._currentIndex = 0;
			this._lastIndex = 0;

			this._isLoading = false;
			this._isSearchFilterData = false;

			this._param = {
				offset: 0,
				limit: 10
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( params ) {
			if ( params ) {
				$.extend( this._param, params );
			}
			this.loadingStart();
			AP.api[this._api]( this._key, this._param ).done(function ( result ) {
				this._done( result );
			}.bind( this )).fail(function( error ) {
				console.log( error );
			}.bind( this ));

			return this;
		},

		resetIndex: function () {
			this._currentIndex = 0;
		},

		loadingStart: function () {
			this._isLoading = true;
			this._$loading.show();
			if ( this._currentIndex == 0 ) {
				this._$list.empty();
				this._$resultNone.hide();
				this._$loading.css( 'height', this._$loading.data( 'loading-first' ));
			} else {
				this._$loading.css( 'height', this._$loading.data( 'loading-more' ));
			}
		},

		loadingStop: function () {
			this._isLoading = false;
			this._$loading.hide();
		},

		/** =============== Private Methods ============== */
		_done: function ( result ) {
			if ( result['filterableOnlineProdList'] ) {
				result = result['filterableOnlineProdList']
			} else if ( result['onlineProdList'] ) {
				result = result['onlineProdList']
			}

			this._data = result;

			if( this._isLoading ) {
				this.loadingStop();
			}

			if ( !this._isSearchFilterData ) {
				this._isSearchFilterData = true;
				if( result.filter ) {
					this._initSearchFilter( result.filter );
				}
			}

			if( result.totalCount == 0 ) {
				this._$resultNone.show();
				this._winScrollend.clear();
			} else {
				var html = AP.common.getTemplate( this._template, result );
				if ( this._currentIndex == 0 ) {
					this._$list.html( html );
				} else {
					this._$list.append( html );
				}
			}

			this._$sort.find( '.f_prd_num' ).text( $B.string.numberFormat( result.totalCount ));
			AP.lazyLoad.add( this._$list.find( 'img.lazy_load' )).updated();

			this._param.offset = result.offset;
			this._param.limit = result.limit;
			this._lastIndex = Math.ceil( result.totalCount / result.limit ) - 1;

			if ( this._currentIndex == this._lastIndex ) {
				this._winScrollend.clear();
			}

			this._currentIndex++;
		},

		_setEvent: function () {
			// scroll
			this._winScrollend = new $B.event.ScrollEnd( window ).gap({ bottom: AP.footer.getHeight() }).addListener( 'scrollbottom', function (e) {
				if ( this._isLoading ) return;
				if ( this._currentIndex <= this._lastIndex ) {
					this.load();
				}
			}.bind( this ));

			// 좋아요
			this._$list.on( 'click', '.btn_toggle', function (e) {
				var $like = $( e.currentTarget ),
					index = $like.closest( '.item' ).data( 'index' ),
					prodSn = this._data[index].products[0].prodSn;

				AP.login().done(function () {
					// TODO: 좋아요
					// AP.api.postRecommend({}, { prodSn: prodSn }).done(function ( result ) {
					// 	$like.toggleClass( 'on' ).find( '.ico_heart_s' ).toggleClass( 'on' );
					// }.bind( this ));
				}.bind( this ));

				return false;
			}.bind( this ));

			// 정렬
			if( this._$sort.length ) {
				this._param.prodSort = this._$sort.find( 'select' ).val();
				this._$sort.find( '.select_type01_new select' ).on( 'change', function (e) {
					this._param.prodSort = $( e.target ).val();
					this._currentIndex = 0;
					this.load();
				}.bind( this ));
			}

			// 필터
			if( this._$sort.find( '.btn_filter' ).length ) {
				this._$sort.find( '.btn_filter' ).on( 'click', function (e) {
					this._searchFilter.open();
				}.bind( this ));
			}
		},

		_initSearchFilter: function ( data ) {
			AP.category.searchFilterData = data;

			this._isSearchFilterData = true;

			this._searchFilter = new AP.searchFilter( AP.category.searchFilterData );
			this._invokedFilter = new AP.invokedFilter( this._$filterArea );

			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				this._invokedFilter.set();
				this._applyFilter() ;
			}.bind( this ));

			this._invokedFilter.addListener( 'delete-invoked-filter', function (e) {
				if ( e.data.type == 'price' ) {
					// 가격 filter data 삭제하기
					var priceData = AP.category.searchFilterData.addAttrs[AP.category.searchFilterData.addAttrs.length - 1];
					priceData.min = null;
					priceData.max = null;
					for ( var i = 0; i < priceData.addAttrVals.length; ++i ) {
						priceData.addAttrVals[i].selected = false;
					}
				} else {
					_.each( AP.category.searchFilterData.addAttrs, function ( value, index ) {
						if ( e.data.attr == value.addAttrCode ) {
							_.each( value.addAttrVals, function ( value, index ) {
								if ( e.data.value == value.addAttrValCode ) {
									value.selected = false;
								}
							});
						}
					});
				}
				this._invokedFilter.set();
				this._applyFilter();
			}.bind( this ));
		},

		_applyFilter: function () {
			if ( this._searchFilter.isFilter() ) {
				this._$target.find( '.btn_filter' ).addClass( 'on' );
			} else {
				this._$target.find( '.btn_filter' ).removeClass( 'on' );
			}

			var filterParam = this._searchFilter.convertDataToString( AP.category.searchFilterData );
			$.extend( this._param, filterParam );

			this._currentIndex = 0;
			this.load();
		}
	});

	AP.productList = ProductList;
})( jQuery );