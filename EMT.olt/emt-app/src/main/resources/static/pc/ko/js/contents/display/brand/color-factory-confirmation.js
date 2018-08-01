/**
 * 컬러팩토리 - 예약 확인
 *
 * @Method:
 * confirm
 *
 */

;(function ( $ ) {
	'use strict';

	var ColorFactoryConfirmation = $B.Class.extend({
		initialize: function () {
			this._data = null;
			this._modal = null;
			this._param = {
				reserveNo: null,
				reserveCancelYn: null,
				sortBy: 'EventStartDate',
				offset: 0,
				limit: 0
			};
		},

		/** =============== Public Methods =============== */
		confirm: function () {
			if ( AP.LOGIN_USER ) {
				this._submit();
			} else {
				var confirmModal = AP.modal.info({
					title: '예약확인',
					contents: {
						templateKey: 'display.brand.color-factory-reservation-number',
						templateModel: {}
					}
				}).addListener( 'modal-before-close', function () {
					confirmModal.getElement().find( '.submit' ).off( 'click' );
				}).addListener( 'modal-close', function () {
					confirmModal = null;
				});

				confirmModal.getElement().find( '.submit' ).on( 'click', function (e) {
					confirmModal.getElement().find( 'form.validate' ).submit();
				}.bind( this ));

				confirmModal.getElement().find( 'form.validate' ).validate({
					submitHandler: function ( form ) {
						var formData = new FormData( form );
						confirmModal.close();

						this._submit( formData );
					}.bind( this )
				});
			}
		},

		/** =============== Private Methods =============== */
		_submit: function ( formData ) {
			if ( formData ) {
				this._param.reserveNo = formData.get( 'reserveNo' );
			}

			this._api = AP.api.storeEventRequesters({}, this._param ).done(function ( data ) {
				this.dispatch( 'reservation-confirm', { reserveNo: this._param.reserveNo });
			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
				AP.modal.alert( '예약된 내역이 없습니다.<br>There is no reservation history.');
			}.bind( this )).always(function () {});
		},

		_clear: function () {
			if ( this._api ) {
				this._api.abort();
				this._api = null;
			}
			this._$modal.find( '.reservation_list button' ).off( 'click' );
		},

		_load: function ( reserveNo ) {

		}
	});

	AP.colorFactoryConfirmation = new ColorFactoryConfirmation();
})( jQuery );