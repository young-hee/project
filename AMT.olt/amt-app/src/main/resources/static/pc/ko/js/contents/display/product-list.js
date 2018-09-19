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

			this._$title = this._$target.find( '.title_result' );
			this._$list = ( options.$targetList ) ? options.$targetList: this._$target.find( '.list_product > ul' );
			this._$sort = this._$target.find( '.search_sort' );
			this._$sortView = this._$target.find( '.search_sort select' );
			this._$paging = this._$target.find( '.pagination' );
			this._$loading = this._$target.find( '.loading' );
			this._$resultNone = this._$target.find( '.product_none' );

			this._isLoading = true;
			this._isClearPaging = false;
			this._isSearchFilterData = false;

			this._data = [];
			this._param = {
				offset: 0,
				limit: 20
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		applyFilter: function ( filterParam,isReset ) {
			if ( isReset ) {
				this._param.priceRange = '';
				this._param.attr = '';
			} else {
				$.extend( this._param, filterParam );
			}
			this._isClearPaging = true;
			this.load();
		},

		load: function ( params ) {
			if ( params ) {
				$.extend( this._param, params );
			}
			AP.api[this._api]( this._key, this._param ).done(function ( result ) {
				this._done( result );
			}.bind( this )).fail(function( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
				this.loadingStop();
				this._$resultNone.show();
			}.bind( this ));

			return this;
		},

		loadingStart: function () {
			this._isClearPaging = true;
			this._isLoading = true;
			this._$loading.show();
			this._$list.empty();
			this._$resultNone.hide();
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

			// TODO: test
			// result = {
			// 	list: [0,1,2,3,4,5,6,7,8,9,10,11],
			// 	offset: 0,
			// 	limit: 50,
			// 	totalCount:181,
			// 	filter: {}
			// };

			result.displayMenuId = this._displayMenuId;

			if( this._isLoading ) {
				this.loadingStop();
			}

			if ( !this._isSearchFilterData ) {
				this._isSearchFilterData = true;
				if ( result.filter ) {
					this.dispatch( 'init-search-filter', { data: result.filter });
					this.dispatch( 'set-display-cate', {data: result.filter });
				} else {
					this.dispatch( 'clear-search-filter' );
				}
			}

			if ( result.totalCount == 0 ) {
				this._$resultNone.show();
				this._$title.find( '.total' ).text( '' );
			} else {
				this._data = result.list;

				var html = AP.common.getTemplate( this._template, result );
				this._$list.html( html );
				this._$title.find( '.total' ).text( '(' + result.totalCount + ')' );
				this._$paging.show();
				if ( this._isClearPaging ) {
					this._clearPaging();
				}
				this._setPaging( this._param.limit, result.totalCount );

				this._$list.find( '.item:not(.item-apply)' ).each(function ( index, target ) {
					new AP.ProductItem({
						$target: $( target ),
						data: this._data[index],
						displayMenuId: this._displayMenuId
					});
				}.bind( this ));
			}
		},

		_setEvent: function () {
			// 정렬
			if( this._$sort.length ) {
				this._param.prodSort = this._$sort.find( 'a' ).eq(0).data( 'value' );
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
			}

			// 표시갯수
			if( this._$sortView.length ) {
				this._param.limit = this._$sortView.val();
				this._$sortView.on( 'change', function (e) {
					this._isClearPaging = true;
					this._param.limit = $( e.target ).val();
					this.load();

					e.preventDefault();
				}.bind( this ));
			}
		},

		_setPaging: function ( limit, totalCount ) {
			if ( !this._$paging.length ) return;

			if ( this._$paging.attr( 'class' ).indexOf( 'apply' ) < 0  ) {
				this._$paging.paging({
					limit: limit,
					totalCount: totalCount,
					focusTarget: this._$target.closest( '.category_area' )
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
			if ( !this._$paging.length ) return;

			this._$paging.paging( 'clear' ).off( 'paging-change' );
			this._param.offset = 0;
		}
	});

	AP.ProductList = ProductList;
})( jQuery );