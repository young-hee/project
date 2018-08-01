/**
 * 매장 칭찬 매장 찾기
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreComplimentFindStore = $B.Class.extend({
		initialize: function () {
			this._modal = null;
			this._api = null;
			this._pagination = null;
			this._param = {
				resularStoreYn: 'N',
				keyword: '',
				offset: 0,
				limit: 5
			};
		},

		/** =============== Public Methods =============== */
		open: function () {
			this._modal = AP.modal.info({
				title: '매장 찾기',
				sizeType: 'L',
				contents: {
					templateKey: 'display.store.store-compliment-find-store',
					templateModel: {}
				}
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
			}.bind( this )).addListener( 'modal-close', function (e) {
				this.modal = null;
			});

			this._$modal = this._modal.getElement();
			this._$modal.find( '.layer_cont' ).addClass( 'store' );

			this._setPlugin();
			this._setEvent();
			this._load();
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._clearPaging();
			this._api.abort();
			this._api = null;
			this._$modal.find( 'input' ).placeholder( 'clear' );
			this._$modal.find( 'input:text' ).inputText( 'clear' );
			this._$modal.find( '.ui_tooltip' ).tooltip( 'clear' );
			this._$modal.find( '.btn_search' ).off( 'click' );
			this._param = {
				resularStoreYn: 'N',
				keyword: '',
				offset: 0,
				limit: 5
			};
		},

		_setPlugin: function () {
			this._$modal.find( 'input' ).placeholder();
			this._$modal.find( 'input:text' ).inputText();
			this._$modal.find( '.ui_tooltip' ).tooltip();
		},

		_setEvent: function () {
			this._$modal.find( '.btn_search' ).on( 'click', function (e) {
				this._$modal.find( 'table .list' ).hide();
				this._$modal.find( '.result_none' ).hide();
				this._$modal.find( '.loading' ).show();

				this._param.keyword = $( e.target ).siblings( 'input' ).val();
				this._clearPaging();
				this._load();
			}.bind( this ));

			this._$modal.on( 'click', 'tbody.list a', function (e) {
				var storeSn = $( e.currentTarget ).data( 'storeSn' ),
					storeNm = $( e.currentTarget ).text();
				AP.storeComplimentWrite.setStore( storeNm, storeSn );
				this._modal.close();
			}.bind( this ));
		},

		_load: function ( param ) {
			param = param || this._param;

			this._api = AP.api.stores( {}, param ).done(function ( result ) {
				result = result['storeResult'];
				console.log( result );

				this._param.limit = result.limit;
				this._param.offset = result.offset;

				var html = AP.common.getTemplate( 'display.store.store-compliment-find-store-list', result );

				if ( !this._pagination ) {
					this._setPaging( result.limit, result.totalCount );
				}

				this._$modal.find( '.loading' ).hide();
				if ( result.totalCount > 0 ) {
					this._$modal.find( '.pagination' ).show();
					this._$modal.find( '.result_none' ).hide();
					this._$modal.find( '.result_num' ).text( result.totalCount );
					this._$modal.find( 'table .list' ).html( html ).show();
				} else {
					this._$modal.find( '.pagination' ).hide();
					this._$modal.find( '.result_none' ).show();
					this._$modal.find( 'tbody.list' ).hide();
					$('.color_dark_gray').text(this._$modal.find( 'input' ).val());
				}

			}.bind( this )).fail(function () {
				console.log( 'error' );
			}.bind( this )).always(function () {});
		},

		_setPaging: function ( limit, totalCount ) {
			var $pagination = this._$modal.find( '.pagination' );
			this._pagination = $pagination.paging({
				limit: limit,
				totalCount: totalCount
			}).show();

			$pagination.on( 'paging-change', function (e) {
				this._param.offset = e.offset;
				this._load( this._param );
			}.bind( this ));
		},

		_clearPaging: function () {
			this._$modal.find( '.pagination' ).paging( 'clear' ).off( 'paging-change' ).hide();
			this._param.offset = 0;
			this._pagination = null;
		}
	});

	AP.storeComplimentFindStore = new StoreComplimentFindStore();
})( jQuery );