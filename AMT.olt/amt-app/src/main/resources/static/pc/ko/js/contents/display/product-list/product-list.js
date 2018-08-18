/**
 * ProductList
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._$title = this._$target.find( '.title_result' );
			this._$list = this._$target.find( '.list_product > ul' );
			this._$sort = this._$target.find( '.search_sort' );
			this._$sortView = this._$sort.find( 'select' );
			this._$paging = this._$target.find( '.pagination' );

			this._searchFilter = null;

			this._isClearPaging = false;
			this._isSearchFilterData = false;

			this._param = {
				offset: 0,
				limit: 50,
				sort: this._$sortView.val()
			};

			this._setEvent();
			this._setSort();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			param = param || this._param;

			setTimeout(function () {
				/**
				 * ******************************************************************************************
				 */
				AP.api.test({}, param ).done(function ( result ) {
					// TODO: test
					result = {
						list: [0,1,2,3,4,5,6,7,8,9,10,11],
						offset: 0,
						limit: 50,
						totalCount:181,
						filter: _filterData
					};

					if ( !this._isSearchFilterData ) {
						this._setSearchFilter( result.filter );
					}

					var html = AP.common.getTemplate( 'display.product-list.item', result );
					this._$list.html( html );
					this._$title.find( '.total' ).text( result.totalCount );

					this._setPaging( this._param.limit, result.totalCount );

				}.bind( this ));

				/**
				 * ******************************************************************************************
				 */
			}.bind( this ), 300);
		},

		/** =============== Private Methods ============== */
		_setEvent: function () {
			this._$list.on( 'click', '.like, .cart',function (e) {
				if ( $( e.currentTarget ).hasClass( 'like' )) {
					$( e.currentTarget ).find( 'i' ).toggleClass( 'on' );
				} else {
					$( e.currentTarget ).find( 'i' ).addClass( 'on' );
				}
			}.bind( this ));
		},

		_setSort: function () {
			this._$sort.find( '> a' ).on( 'click', function (e) {
				e.preventDefault();

				if ( $( e.target ).hasClass( 'on' )) return;
				$( e.target ).siblings().removeClass( 'on' );
				$( e.target ).addClass( 'on' );

				var value = $( e.target ).data( 'value' );
				this._param.sort = value;
				this._clearPaging();
				this.load();
			}.bind( this ));

			this._$sortView.on( 'change', function (e) {
				this._clearPaging();
				this._param.limit = $( e.target ).val();
				this.load();

				e.preventDefault();
			}.bind( this ));
		},

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
			this._isClearPaging = true;
			this._param.offset = 0;
		},

		_setSearchFilter: function ( data ) {
			if ( this._$target.closest( '.cont_area' ).siblings( '.filter ' ).length == 0 ) return;
			AP.display.searchFilterData = data;
			this._isSearchFilterData = true;

			this._searchFilter = new AP.searchFilter( this._$target.closest( '.cont_area' ).siblings( '.filter ' ), AP.display.searchFilterData );
			this._searchFilter.addListener( 'apply-search-filter', function (e) {
				// TODO: apply search
				console.log( AP.display.searchFilterData );

				this._clearPaging();
				this.load();
			}.bind( this ));
		}
	});

	AP.productList = ProductList;
})( jQuery );