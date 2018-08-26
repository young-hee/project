/**
 * ProductList
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._key = { displayMenuId: options.displayMenuId };

			this._$list = this._$target.find( '.product_list_new' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );
			this._$filterArea = this._$sort.find( '.filter_sel_area' );
			this._$resultNone = this._$target.find( '.no_product' );
			this._$loading = this._$target.find( '.loading' );

			this._winScrollend = null;
			this._searchFilter = null;
			this._invokedFilter = null;
			this._isSearchFilterData = false;

			this._currentIndex = 0;
			this._lastIndex = 0;
			this._isLoading = false;

			this._param = {
				offset: 0,
				limit: 10,
				prodSort: this._$sort.find( 'select' ).val(),
				includeFilters: true,
				attr: '',
				priceRange: ''
			};

			this._setEvent();
			this._setSort();
		},

		/** =============== Public Methods =============== */
		load: function () {
			this._isLoading = true;
			this._$loading.show();
			if ( this._currentIndex == 0 ) {
				this._$list.empty();
				this._$loading.css( 'height', this._$loading.data( 'loading-first' ));
			} else {
				this._$loading.css( 'height', this._$loading.data( 'loading-more' ));
			}

			AP.api.itemList( this._key, this._param ).done(function ( result ) {
				this._done( result );
			}.bind( this )).fail(function( error ) {
				console.log( error );
			}.bind( this ));
		},

		/** =============== Private Methods ============== */
		_done: function ( result ) {
			result = result.filterableOnlineProdList;

			if ( !this._isSearchFilterData ) {
				this._setSearchFilter( result.filter );
			}

			if( result.totalCount == 0 ) {
				this._$resultNone.show();
				this._winScrollend.clear();
			} else {
				// for ( var i = 0; i < result.list.length; ++i ) {
				// 	var repImgNo = result.list[i].repImgNo - 1;
				// 	result.list[i].repImgSrc = result.list[i].onlineProdImages[repImgNo].imgSrc;
				// }

				var html = AP.common.getTemplate( 'display.product-list.item', result );
				if ( this._currentIndex == 0 ) {
					this._$list.html( html );
				} else {
					this._$list.append( html );
				}
			}

			this._$sort.find( '.f_prd_num' ).text( $B.string.numberFormat( result.totalCount ));
			AP.lazyLoad.add( this._$list.find( 'img.lazy_load' )).updated();
			this._isLoading = false;
			this._$loading.hide();

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
				AP.login().done(function () {
					$( e.currentTarget ).toggleClass( 'on' ).find( '.ico_heart_s' ).toggleClass( 'on' );
				});
				return false;
			}.bind( this ));
		},

		_setSort: function () {
			// sort
			this._$sort.find( '.select_type01_new select' ).on( 'change', function (e) {
				this._param.prodSort = $( e.target ).val();
				this._currentIndex = 0;
				this.load();
			}.bind( this ));

			// filter
			this._$sort.find( '.btn_filter' ).on( 'click', function (e) {
				this._searchFilter.open();
			}.bind( this ));
		},

		_setSearchFilter: function ( data ) {
			AP.display.searchFilterData = data;

			this._isSearchFilterData = true;

			this._searchFilter = new AP.searchFilter( AP.display.searchFilterData );
			this._invokedFilter = new AP.invokedFilter( this._$filterArea );

			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				this._invokedFilter.set( e.data );
				this._applyFilter( e.data );
			}.bind( this ));

			this._invokedFilter.addListener( 'delete-invoked-filter', function (e) {
				if ( e.data.type == 'price' ) {
					// 가격 filter data 삭제하기
					var priceData = AP.display.searchFilterData.addAttrs[AP.display.searchFilterData.addAttrs.length - 1];
					priceData.min = null;
					priceData.max = null;
					for ( var i = 0; i < priceData.addAttrVals.length; ++i ) {
						priceData.addAttrVals[i].selected = false;
					}
				} else {
					_.each( AP.display.searchFilterData.addAttrs, function ( value, index ) {
						if ( e.data.attr == value.addAttrCode ) {
							_.each( value.addAttrVals, function ( value, index ) {
								if ( e.data.value == value.addAttrValCode ) {
									value.selected = false;
								}
							});
						}
					});
				}
				this._invokedFilter.set( AP.display.searchFilterData );
				this._applyFilter( AP.display.searchFilterData );

			}.bind( this ));
		},

		_setFilterData: function ( data ) {
			// price
			var priceData = data.addAttrs[data.addAttrs.length - 1],
				min = priceData.min,
				max = priceData.max;
			if ( min || max ) {
				if ( min && max ) {
					this._param.priceRange = min + '~' + max;
				} else {
					if ( min && !max ) {
						this._param.priceRange = min + '~';
					} else if ( !min && max ) {
						this._param.priceRange = '~' + max;
					}
				}
			} else {
				this._param.priceRange = '';
			}

			// other ( 가격 제외 )
			data = data.addAttrs;

			var addAttrs = '';
			for ( var i = 0; i < data.length - 1; ++i ) {
				var attrStr = data[i].addAttrCode + '=';
				_.each(data[i], function ( value, key ) {
					if ( key == 'addAttrVals' ) {
						for ( var j = 0; j < value.length; j++ ) {
							if ( value[j].selected ) {
								attrStr += value[j].addAttrValCode + ','
							}
						}
					}
				});
				if ( attrStr.substr( -1 ) != '=' ) {
					addAttrs += attrStr;
				}
			}
			this._param.attr = addAttrs.substring( 0, addAttrs.length - 1 );
		},

		_applyFilter: function ( data ) {
			if ( this._invokedFilter.isFilter( data )) {
				this._$target.find( '.btn_filter' ).addClass( 'on' );
			} else {
				this._$target.find( '.btn_filter' ).removeClass( 'on' );
			}

			this._currentIndex = 0;
			this._setFilterData( data );
			this.load();
		}

	});

	AP.productList = ProductList;
})( jQuery );