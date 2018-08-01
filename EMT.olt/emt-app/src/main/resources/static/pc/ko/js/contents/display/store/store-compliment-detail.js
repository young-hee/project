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
			this._modal = AP.modal.info({
				title: '상세보기',
				sizeType: 'L',
				contents: {
					templateKey: 'common.loading-modal'
				}
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
				
				this._$modal.find( '.attach_img' ).imagesLoaded().always(function () {
					this._modal.resetPosition();
				}.bind( this ));
				this._setEvent();

			}.bind( this )).fail(function (e) {
				console.log( 'error' );
			}).always(function () {});
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._$modal.find( '.praise_button button' ).off( 'click' );
		},

		_setEvent: function () {
			this._$modal.find( '.praise_button button' ).on( 'click', function (e) {
				e.preventDefault();

				this._modal.close();
				if ( $( e.target ).hasClass( 'modify' )) {
					this._modify();
				} else if ( $( e.target ).hasClass( 'delete' )) {
					this._delete();
				}
			}.bind( this ));
		},

		_modify: function () {
			this.dispatch( 'modify_compliment', { storeEvalSn: this._data.storeEvalSn });
		},

		_delete: function () {
			AP.api.removeStoreEval({}, { storeEvalSn: this._data.storeEvalSn }).done(function () {
				this._modal.close();
				AP.storeComplimentList.load();

			}.bind( this )).fail(function () {
				console.log( 'error' );
			}).always(function () {});
		}
	});

	AP.storeComplimentDetail = new StoreComplimentDetail();
})( jQuery );