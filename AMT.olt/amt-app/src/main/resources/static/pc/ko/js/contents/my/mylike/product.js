/**
 * MyLikeProduct
 *
 */

;(function ( $ ) {
	'use strict';

	var MyLikeProduct = $B.Class.extend({
		initialize: function ( options ) {
			this._$target = options.$target;
			//this._component = options.component;
			this._template = options.template;
			//this._displayMenuId = options.displayMenuId;
			this._api = options.api;
			this._key = ( options.key ) ? { displayMenuId: options.key } : {};

			this._$title = this._$target.find( '.check_set' );
			this._$list = ( options.$targetList ) ? options.$targetList: this._$target.find( '.list_product > ul' );
			this._$paging = this._$target.find( '.pagination' );
			this._$loading = this._$target.find( '.loading' );

			this._isLoading = true;
			this._isClearPaging = false;

			this._data = [];
			this._param = {
				offset: 0,
				limit: 9
			};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		load: function ( params ) {
			if ( params ) {
				$.extend( this._param, params );
			}
			AP.api[this._api]( this._key, this._param ).done(function ( result ) {
				this._done( result );
			}.bind( this )).fail(function( error ) {
				console.log( error.statusText + ' : ' + error.errorCode + error.errorMessage );
				this.loadingStop();
			}.bind( this ));

			return this;
		},

		loadingStart: function () {
			this._isClearPaging = true;
			this._isLoading = true;
			this._$loading.show();
			this._$list.empty();
		},

		loadingStop: function () {
			this._isLoading = false;
			this._$loading.hide();
		},

		/** =============== Private Methods ============== */
		_done: function ( result ) {
			//set data
			if ( result.onlineProdList ) {
				result = result.onlineProdList;
			} else if ( result.prodReviewListInfo ) {
				result = result.prodReviewListInfo;
			}
			
			/* ================================================================== */
			//TODO: API 연결후 제거
			//test - dummy
			result = {
					list: [1,2,3,4,5,6,7,8,9]
				};
			result.totalCount = 20;
			/* ================================================================== */
			
			//set loading
			if( this._isLoading ) {
				this.loadingStop();
			}

			if ( result.totalCount == 0 ) {
				this._$title.find( '#total' ).text( '0' );
			} else {
				this._data = result.list;

				var html = AP.common.getTemplate( this._template, result );
				this._$list.html( html );
				this._$title.find( '#total' ).text( result.list.length );
				this._$paging.show();
				if ( this._isClearPaging ) {
					this._clearPaging();
				}
				this._setPaging( this._param.limit, result.totalCount );

				this._$list.find( '.item' ).each(function ( index, target ) {
					new AP.ProductItem({
						$target: $( target ),
						data: this._data[index],
						displayMenuId: this._displayMenuId
					});
				}.bind( this ));
				
			}
		},

		_setEvent: function () {
			//set checkbox all
			this._$target.on( 'change', '#checkAllProduct', function (e) {
				this._$target.find( '.check_wrap.check_only input' ).prop('checked', $(e.currentTarget).prop('checked'));
				this._setChecked();
			}.bind( this ));
			//set checkbox list
			this._$target.on( 'change', '.check_wrap.check_only input', function (e) {
				this._setChecked();
			}.bind( this ));
			//set button delete
			this._$target.on( 'click', '.ie_press', function (e) {
				this._deleteList();
			}.bind( this ));
		},
		
		_setChecked: function() {
			var checked = 0;
			this._$target.find( '.check_wrap.check_only input' ).each(function() {
				if($(this).prop('checked')) checked++;
			});
			
			this._$title.find( '#checked' ).text(checked);
		},
		
		_deleteList: function() {
			var checked = 0;
			this._$target.find( '.check_wrap.check_only input' ).each(function() {
				if($(this).prop('checked')) checked++;
			});
			
			if( checked > 0 ) {
				if( confirm( '정말 삭제하시겠습니까?' ) ) {
					//TODO: 삭제 API 연결
					alert('삭제...');
				}
			}
			else {
				alert('선택된 대상이 없습니다.');
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

	AP.MyLikeProduct = MyLikeProduct;
})( jQuery );