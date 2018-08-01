/**
 * 매장칭찬 상세
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreComplimentDetail = $B.Class.extend({
		initialize: function () {
			this._data = null;
		},

		/** =============== Public Methods =============== */
		open: function ( storeEvalSn ) {
			this._modal = AP.modal.full({
				title: '리뷰/후기',
				contents: {
					templateKey: 'common.loading-modal'
				},
				containerClass: 'review'
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
			}.bind( this ));

			this._$modal = this._modal.getElement();
			AP.api.storeEval({}, { storeEvalSn: storeEvalSn }).done(function ( data ) {
				this._data = data['storeEvalEx'];

				if ( this._data.storeEvalReason ) {
					this._data.storeEvalReason = this._data.storeEvalReason.split( ',' );
				}

				var html = AP.common.getTemplate( 'display.store.store-compliment-detail', this._data );
				this._$modal.find( '.layer_cont' ).html( html );
				
				//html 태그 삭제
				document.getElementById('storeEvalBodyText').innerHTML = '<pre>' + this._data.storeEvalBodyText + '</pre>';
				
				this._setEvent();

			}.bind( this )).fail(function () {
				console.log( 'error' );
			}).always(function () {});
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._$modal.find( '.btn_float_toggle' ).off( 'click' );
			this._$modal.find( '.page_btns button' ).off( 'click' );
		},

		_setEvent: function () {
			this._$modal.find( '.page_btns button' ).on( 'click', function (e) {
				e.preventDefault();
				if ( $( e.target ).hasClass( 'modify' )) {
					this._modify();
				} else if ( $( e.target ).hasClass( 'delete' )) {
					var storeEvalSn = $( e.target ).closest( '.brand_review' ).data( 'storeEvalSn' );
					this._delete( storeEvalSn );
				}
			}.bind( this ));
		},

		_modify: function () {
			this._modal.close();
			AP.storeComplimentModify.open( this._data );
		},

		_delete: function ( storeEvalSn ) {
			AP.api.removeStoreEval({}, { storeEvalSn: storeEvalSn }).done(function () {
				this._modal.close();
				AP.storeComplimentList.load();

			}.bind( this )).fail(function () {
				console.log( 'error' );
			}).always(function () {});
		}
	});

	AP.storeComplimentDetail = new StoreComplimentDetail();
})( jQuery );