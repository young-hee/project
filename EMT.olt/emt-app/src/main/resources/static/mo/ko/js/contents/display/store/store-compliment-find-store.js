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
			this._param = {
				resularStoreYn: 'N',
				keyword: '',
				offset: 0,
				limit: 5
			};
		},

		/** =============== Public Methods =============== */
		open: function () {
			this._modal = AP.modal.full({
				title: '매장 찾기',
				contents: {
					templateKey: 'display.store.store-compliment-find-store',
					templateModel: {}
				},
				containerClass: 'review'
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
				if ( this._api ) {
					this._api.abort();
					this._api = null;
				}
			}.bind( this )).addListener( 'modal-close', function (e) {
				this.modal = null;
			});

			this._$modal = this._modal.getElement();
			this._$modal.find( '.layer_cont' ).addClass( 'brand' );
			this._setPlugin();
			this._setEvent();
			this._load();
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._$modal.find( 'input:text' ).inputText( 'clear' );
			this._$modal.find( '.ui_accordion' ).accordion( 'clear' );
			this._$modal.find( '.btn_search' ).off( 'click' );
			this._$modal.find( '.btn_more_store' ).off( 'click' );
			this._param = {
				resularStoreYn: 'N',
				keyword: '',
				offset: 0,
				limit: 5
			};
		},

		_setPlugin: function () {
			this._$modal.find( 'input:text' ).inputText();
			this._$modal.find( '.ui_accordion' ).accordion();
		},

		_setEvent: function () {
			this._$modal.find( '.btn_search' ).on( 'click', function (e) {
				this._$modal.find( '.result_none' ).hide();
				this._$modal.find( '.btn_more_store' ).show();
				this._param.keyword = $( e.target ).siblings( 'input' ).val();
				this._param.offset = 0;
				this._load();
			}.bind( this ));

			this._$modal.find( '.btn_more_store' ).on( 'click', function (e) {
				this._param.offset += this._param.limit;
				this._load();
			}.bind( this ));

			this._$modal.on( 'click', '.store_list_wrap a', function (e) {
				var storeSn = $( e.currentTarget ).find( '.store_title' ).data( 'store-sn' ),
					storeNm = $( e.currentTarget ).find( '.store_title' ).text();
				AP.storeComplimentWrite.setStore( storeNm, storeSn );
				this._modal.close();
			}.bind( this ));
		},

		_load: function ( param ) {
			param = param || this._param;

			var $more = this._$modal.find( '.btn_more_store' ),
				$loading = this._$modal.find( '.loading' );

			$more.hide();
			$loading.show();
			if ( param.offset === 0 ) {
				this._$modal.find( '.store_list_wrap' ).hide();
				$loading.css( 'min-height', '300px' );
			} else {
				$loading.css( 'min-height', '0px' );
			}

			this._api = AP.api.stores( {}, param ).done(function ( result ) {
				result = result['storeResult'];
				console.log( result );
				this._param.limit = result.limit;
				this._param.offset = result.offset;

				var html = AP.common.getTemplate( 'display.store.store-compliment-find-store-list', result );

				if ( result.offset === 0 ) {
					this._$modal.find( '.store_list_wrap' ).html( html ).show();
				} else {
					this._$modal.find( '.store_list_wrap' ).append( html );
				}
				if ( result.totalCount > 0 ) {
					this._$modal.find( '.form_brand .num' ).text( result.totalCount );
					var current = this._$modal.find( '.store_list_wrap > a' ).length,
						total = result.totalCount;
					if ( current === total ) {
						$more.hide();
					} else {
						$more.show().html( '<span>더보기 (<em>' + current + '</em>/' + total + ')</span>' );
					}
				} else {
					this._$modal.find( '.store_list_wrap' ).hide();
					this._$modal.find( '.result_none' ).show();
					$('.color_dark_gray').text(this._$modal.find( 'input' ).val());
				}
				$loading.hide();
			}.bind( this )).fail(function () {
				console.log( 'error' );
			}.bind( this )).always(function () {});
		}
	});

	AP.storeComplimentFindStore = new StoreComplimentFindStore();
})( jQuery );