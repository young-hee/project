/**
 * 스윗레터
 *
 */

;(function ( $ ) {
	'use strict';

	var SweetLetter = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.event.sweet' );
			this._member = {};

			this._setEvent();
		},

		/** =============== Public Methods =============== */
		setMemberInfo: function ( member ) {
			this._member = member;
		},

		/** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.find( '.reset' ).on( 'click', function () {
				this._clear();
			}.bind( this ));

			this._$target.find( '.apply' ).on( 'click', function () {
				AP.login().done( function () {
					this._$target.find( 'form.validate' ).submit();

				}.bind( this ));
			}.bind( this ));

			this._$target.find( 'input' ).on( 'click', function () {
				AP.login().done( function () {


				}.bind( this ));
			}.bind( this ));
			
			this._$target.find( 'input' ).on( 'keypress', function () {
				AP.login().done( function () {

				}.bind( this ));
			}.bind( this ));
			
			this._$target.find( 'form.validate' ).validate({
				submitHandler: function () {

					var verifNo = '';
					this._$target.find( '.sweet_event_input_wrap input' ).each(function () {
						verifNo += $( this ).val();
					});

					AP.api.participated({}, {
						regularEventType: 'PackageLetter',
						verifNo: verifNo
					}).done(function ( result ) {

						result = result['awards'];

						if ( result.eventWinStatus === 'Win' ) {
							result.member = this._member;
							AP.winningPop.open( '스윗레터', result );
							this._clear();
						} else {
							AP.modal.alert( '유효하지 않은 쿠폰입니다.' );
						}

					}.bind( this )).fail(function ( error ) {
						AP.modal.alert( '유효하지 않은 쿠폰입니다.' );
						// AP.modal.alert( '이미 사용한 쿠폰입니다.' );

						// TODO: 중복사용 error code api 미적용

					}.bind( this ));
				}.bind( this )
			});

			AP.shippingInfo.addListener( 'sweet-letter-reset', function () {
				this._clear();
			}.bind( this ));
		},

		_clear: function () {
			this._$target.find( '.sweet_event_input_wrap input' ).val( '' );
		}
	});

	AP.sweetLetter = new SweetLetter();
})( jQuery );