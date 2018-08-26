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

			this._$title = this._$target.find( '.title_result' );
			this._$list = this._$target.find( '.list_product > ul' );
			this._$sort = this._$target.find( '.search_sort' );
			this._$sortView = this._$sort.find( 'select' );
			this._$paging = this._$target.find( '.pagination' );
			this._$loading = this._$target.find( '.loading' );
			this._$resultNone = this._$target.find( '.product_none' );

			this._searchFilter = null;
			this._arrProductItem = [];

			this._isLoading = true;
			this._isClearPaging = false;
			this._isSearchFilterData = false;

			this._param = {
				offset: 0,
				limit: this._$sortView.val(),
				prodSort: this._$target.find( '.search_sort a' ).eq(0).data( 'value' ),
				includeFilters: true,
				attr: '',
				priceRange: ''
			};

			this._setEvent();
			this._setSort();
		},

		/** =============== Public Methods =============== */
		load: function () {
			AP.api.itemList( this._key, this._param ).done(function ( result ) {
				this._done( result );
			}.bind( this )).fail(function( error ) {
				console.log( error );
			}.bind( this ));
		},

		/** =============== Private Methods ============== */
		_done: function ( result ) {
			result = result.filterableOnlineProdList;

			if(  this._isLoading ) {
				this._isLoading = false;
				this._$loading.hide();
			}

			if ( !this._isSearchFilterData ) {
				this._setSearchFilter( result.filter );
			}

			if ( result.totalCount == 0 ) {
				this._$resultNone.show();
			} else {
				var html = AP.common.getTemplate( 'display.product-list.item', result );
				this._$title.find( '.total' ).text( '(' + result.totalCount + ')' );

				if ( this._arrProductItem.length > 0 ) {
					for ( var i = 0; i < this._arrProductItem.length; ++i ) {
						this._arrProductItem[i].clear();
					}
				}

				this._$list.html( html );
				this._$list.find( '.item' ).each(function ( index, target ) {
					this._arrProductItem.push( new AP.ProductItem({
						$target: $(target),
						data: result.list[index]
					}));
				}.bind( this ));

				this._$paging.show();
				if ( this._isClearPaging ) {
					this._clearPaging();
				}
				this._setPaging( this._param.limit, result.totalCount );
			}
		},

		_setEvent: function () {},

		_setPaging: function ( limit, totalCount ) {
			this._$paging = this._$target.find( '.pagination' );
			if ( this._$paging.attr( 'class' ).indexOf( 'apply' ) < 0  ) {
				this._$paging.paging({
					limit: limit,
					totalCount: totalCount,
					focusTarget: this._$target.find( '.sorting_group' )
				});
				this._isClearPaging = false;

				// paging
				this._$paging.on( 'paging-change', function (e) {
					this._param.offset = e.offset;
					this.load();
				}.bind( this ));
			}
		},

		_clearPaging: function () {
			if ( this._$paging.length < 1 ) return;

			this._$paging.paging( 'clear' ).off( 'paging-change' );
			this._param.offset = 0;
		},

		_setSort: function () {
			this._$sort.find( '> a' ).on( 'click', function (e) {
				e.preventDefault();

				var $btn = $( e.currentTarget );
				if ( $btn.hasClass( 'on' )) return;
				$btn.siblings().removeClass( 'on' );
				$btn.addClass( 'on' );

				var value = $btn.data( 'value' );
				this._param.prodSort = value;
				this._isClearPaging = true;
				this.load();
			}.bind( this ));

			this._$sortView.on( 'change', function (e) {
				this._isClearPaging = true;
				this._param.limit = $( e.target ).val();
				this.load();

				e.preventDefault();
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

		_setSearchFilter: function ( data ) {
			AP.display.searchFilterData = data;
			this._isSearchFilterData = true;

			this._searchFilter = new AP.searchFilter( this._$target.closest( '.cont_area' ).siblings( '.filter ' ), AP.display.searchFilterData );
			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				this._setFilterData( e.data );
				if ( e.reset ) {
					this._param.priceRange = '';
				}
				this._isClearPaging = true;
				this.load();
			}.bind( this ));
		},

		/**
		 * products 안에 품절상이 있는지 체크하여 에러메세지 처리
		 * @param	{Array}		products
		 * @returns	{Promise}
		 */
		_productsInOutOfStock: function ( products ) {
			var defer = new $.Deferred();

			if ( _.findWhere(products, {saleDisplayStatus: 'OutOfStock'}) ) {
				AP.modal.alert( AP.message.IN_OUT_OF_STOCK_PRODUCT );
				defer.reject();
			} else {
				defer.resolve();
			}

			return defer.promise();
		}
	});

	AP.ProductList = ProductList;
})( jQuery );