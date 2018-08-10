/**
 * ProductList
 *
 */

;(function ( $ ) {
	'use strict';

	var ProductList = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			this._$list = this._$target.find( '.product_list_new' );
			this._$sort = this._$target.find( '.sort_filter_wrap' );
			this._$noneResult = this._$target.find( '.no_product' );
			this._$loading = this._$target.find( '.loading' );

			this._winScrollend = null;

			this._searchFilter = null;
			this._isFilterData = false;

			this._currentIndex = 0;
			this._lastIndex = 0;
			this._isLoading = false;
			this._param = {
				offset: 0,
				limit: 10,
				sort: ''
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( param ) {
			param = param || this._param;

			this._isLoading = true;
			this._$loading.show();
			if ( this._currentIndex == 0 ) {
				this._$list.empty();
				this._$loading.css( 'height', this._$loading.data( 'loading-first' ));
			} else {
				this._$loading.css( 'height', this._$loading.data( 'loading-more' ));
			}

			setTimeout(function () {
			/**
			 * ******************************************************************************************
			 */
			AP.api.test({}, param ).done(function ( result ) {
				// TODO: test
				result = {
					"result": [0,1,2,3,4,5,6,7,8,9],
					"offset": 0,
					"limit": 10,
					"totalLength": 21,
					"filter": _filterData
				};

				if ( !this._isFilterData ) {
					this._isFilterData = true;
					this._searchFilter = new AP.searchFilter( result.filter );
				}

				if( result.totalLength == 0 ) {
					this._$noneResult.show();
					this._winScrollend.clear();
				} else {
					var html = AP.common.getTemplate( 'display.product-list.item', result );
					if ( this._currentIndex == 0 ) {
						this._$list.html( html );
					} else {
						this._$list.append( html );
					}
				}

				this._$sort.find( '.f_prd_num' ).text( $B.string.numberFormat( result.totalLength ));
				AP.lazyLoad.add( this._$list.find( 'img.lazy_load' )).updated();
				this._isLoading = false;
				this._$loading.hide();

				this._param.offset = result.offset;
				this._param.limit = result.limit;
				this._lastIndex = Math.ceil( result.totalLength / result.limit ) - 1;

				if ( this._currentIndex == this._lastIndex ) {
					this._winScrollend.clear();
				}

				this._currentIndex++;

			}.bind( this )).fail(function(xhr) {
				console.log( xhr );
			}.bind( this ));
			/**
			 * ******************************************************************************************
			 */
			}.bind( this ), 300);
		},

		sort: function ( sort ) {
			this._param.sort = sort;
			this._currentIndex = 0;
			this.load();
		},

		changeView: function () {
			if ( this._$sort.find( '.btn_align' ).hasClass( 'gallery' )) {
				this._$sort.find( '.btn_align' ).removeClass( 'gallery' );
				this._$list.removeClass( 'gallery' );
			} else {
				this._$sort.find( '.btn_align' ).addClass( 'gallery' );
				this._$list.addClass( 'gallery' );
			}
		},

		openFilter: function () {
			this._searchFilter.open() ;
		},


		/** =============== Private Methods ============== */
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
				$( e.currentTarget ).toggleClass( 'on' ).find( '.ico_heart_s' ).toggleClass( 'on' );
			}.bind( this ));
		}

	});

	AP.productList = ProductList;
})( jQuery );