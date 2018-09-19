/**
 * ProductList
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._component = options.component;
			this._template = options.template;
			this._displayMenuId = options.displayMenuId;
			this._api = options.api;
			this._key = ( options.key ) ? { displayMenuId: options.key } : {};

			this._$list = this._$target.find( '.product_list_new:not(.wide_swipe)' );
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
			this.resetIndex();
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
				result = result['filterableOnlineProdList'];
			} else if ( result['onlineProdList'] ) {
				result = result['onlineProdList'];
			}

			// // TODO: test
			// result = {
			// 	list: [0,1,2,3,4,5,6,7,8,9,10,11],
			// 	offset: 0,
			// 	limit: 50,
			// 	totalCount:181,
			// 	filter: null
			// };

			result.displayMenuId = this._displayMenuId;

			if( this._isLoading ) {
				this.loadingStop();
			}

			if ( !this._isSearchFilterData ) {
				this._isSearchFilterData = true;
				if( result.filter ) {
					this._initSearchFilter( result.filter );
					this.dispatch( 'set-display-cate', {data: result.filter });
				}
			}

			if( result.totalCount == 0 ) {
				this._$resultNone.show();
				this._winScrollend.clear();
			} else {
				this._data = result.list;

				var html = AP.common.getTemplate( this._template, result );
				if ( this._currentIndex == 0 ) {
					this._$list.html( html );
				} else {
					this._$list.append( html );
				}

				this._$list.find( '.item:not(.item-apply)' ).each(function ( index, target ) {
					new AP.ProductItem({
						$target: $( target ),
						data: this._data[index],
						displayMenuId: this._displayMenuId
					});
				}.bind( this ));
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

			// 정렬
			if( this._$sort.length ) {
				this._param.prodSort = this._$sort.find( 'select' ).val();
				this._$sort.find( '.select_type01_new select' ).on( 'change', function (e) {
					this._param.prodSort = $( e.target ).val();
					this.resetIndex();
					this.load();
				}.bind( this ));
			}

			// 필터
			if( this._$sort.find( '.btn_filter' ).length ) {
				this._$sort.find( '.btn_filter:not(.disabled)' ).on( 'click', function (e) {
					this._searchFilter.open();
				}.bind( this ));
			}
		},

		_initSearchFilter: function ( data ) {
			if ( this._$sort.find( '.btn_filter.disabled' ).length > 0 ) return;

			AP[this._component].searchFilterData = data;

			this._isSearchFilterData = true;

			this._searchFilter = new AP.searchFilter( this._component, AP[this._component].searchFilterData );
			this._invokedFilter = new AP.invokedFilter( this._$filterArea );

			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				this._invokedFilter.set( AP[this._component].searchFilterData );
				this._applyFilter() ;
			}.bind( this ));

			this._invokedFilter.addListener( 'delete-invoked-filter', function (e) {
				if ( e.data.type == 'price' ) {
					// 가격 filter data 삭제하기
					var priceData = AP[this._component].searchFilterData.addAttrs[AP[this._component].searchFilterData.addAttrs.length - 1];
					priceData.min = null;
					priceData.max = null;
					for ( var i = 0; i < priceData.addAttrVals.length; ++i ) {
						priceData.addAttrVals[i].selected = false;
					}
				} else {
					_.each( AP[this._component].searchFilterData.addAttrs, function ( value, index ) {
						if ( e.data.attr == value.addAttrCode ) {
							_.each( value.addAttrVals, function ( value, index ) {
								if ( e.data.value == value.addAttrValCode ) {
									value.selected = false;
								}
							});
						}
					});
				}
				this._invokedFilter.set( AP[this._component].searchFilterData );
				this._applyFilter();
			}.bind( this ));
		},

		_applyFilter: function () {
			if ( this._searchFilter.isFilter() ) {
				this._$target.find( '.btn_filter' ).addClass( 'on' );
			} else {
				this._$target.find( '.btn_filter' ).removeClass( 'on' );
			}

			var filterParam = this._searchFilter.convertDataToString( AP[this._component].searchFilterData );
			$.extend( this._param, filterParam );

			this.resetIndex();
			this.load();
		}
	});

	AP.ProductList = ProductList;
})( jQuery );