/**
 * 컬러팩토리 - 예약 확인
 *
 * @Method:
 * open
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
				reserveCancelYn: null,
				sortBy: 'EventStartDate',
				offset: 0,
				limit: 0
			};
		},

		/** =============== Public Methods =============== */
		confirm: function () {
			if ( AP.LOGIN_USER ) {
				this.open();
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
						this.open( formData );

					}.bind( this )
				});
			}
		},

		open: function ( formData ) {
			if ( formData ) {
				this._param.reserveNo = formData.get( 'reserveNo' );
				this._param.isLogin = false;
			} else {
				this._param.isLogin = true;
			}
			this._modal = AP.modal.full({
				title: '예약 확인',
				contents: {
					templateKey: 'common.loading-modal'
				}
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._modal = null;
			}.bind( this ));
			this._$modal = this._modal.getElement();

			this._load();
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			if ( this._api ) {
				this._api.abort();
				this._api = null;
			}
			this._$modal.find( '.reservation_list button' ).off( 'click' );
		},

		_load: function () {
			this._api = AP.api.storeEventRequesters({}, this._param ).done(function ( data ) {
				if ( data['storeEventRequestersResult']['storeEventRequesterExList'].length > 0 ) {
					data['storeEventRequestersResult'].isLogin = this._param.isLogin;
					var html = AP.common.getTemplate( 'display.brand.color-factory-confirmation', data['storeEventRequestersResult'] );
					this._$modal.find( '.layer_cont' ).html( html );
					this._setCancelReservation();
				} else {
					this._modal.close();
					AP.modal.alert( '예약된 내역이 없습니다.<br>There is no reservation history.');
				}
			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
				this._modal.close();
				AP.modal.alert( '예약된 내역이 없습니다.<br>There is no reservation history.');
			}.bind( this )).always(function () {});
		},

		// 에약취소
		_setCancelReservation: function () {
			var cancelText = '예약을 취소 하시겠습니까?<br>Are you sure you want to cancel your reservation?';
			var confirmText = '정상적으로 예약이 취소되었습니다.<br>Reservation canceled successfully.';
			var failText = '예약 취소를 실패했습니다.<br>Reservation canceled failed.';

			this._$modal.find( '.reservation_list button' ).off( 'click' ).on( 'click', function (e) {
				var $btn = $( e.target );
				AP.modal.confirm( cancelText ).addListener( 'modal-close', function (e) {
					if ( e.closeType == 'confirm' ) {

						AP.api.cancelScheduleInfo({}, {
							reserveNo: $btn.data( 'reserveNo' )
						}).done(function ( result ) {
							AP.modal.alert( confirmText ).addListener( 'modal-close', function (e) {
								this._modal.close();
								this._load();
							}.bind( this ));
						}.bind( this )).fail(function (e) {
							console.log( 'error', e );
							AP.modal.alert( failText );
						}.bind( this )).always(function () {});

					}
				}.bind( this ));
			}.bind( this ));
		}
	});

	AP.colorFactoryConfirmation = new ColorFactoryConfirmation();
})( jQuery );