/**
 * 샘플, 테스터 신청하기
 *
 */

;(function ( $ ) {
	'use strict';

	var ApplicationForm = $B.Class.extend({
		initialize: function () {
			this._api = null;
			this._modal = null;
			this._$modal = null;

			this._param = {
				requestTitle : null, 						//신청제목
				requestReason : null 						//신청사유 (내용) 500자
			};
		},

		/** =============== Public Methods =============== */
		open: function ( title ) {
			this._modal = AP.modal.full({
				title: title,
				contents: {
					templateKey: 'display.events.application-form',
					templateModel: {}
				}
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._modal = null;
			}.bind( this ));

			this._$modal = this._modal.getElement();
			this._setPlugin();
			this._setEvent();
		},

		close: function () {
			this._modal.close();
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._$modal.find( 'input, textarea' ).inputLimits( 'clear' );
			if ( this._api ) {
				this._api.abort();
				this._api = null;
			}
		},

		_setPlugin: function () {
			this._$modal.find( 'input, textarea' ).inputLimits();
		},

		_setEvent: function () {
			this._$modal.find( '.form_btns button' ).on(  'click', function (e) {
				if ( $( e.target ).hasClass( 'apply' )) {
					this._$modal.find( 'form.validate' ).submit();
				} else {
					this._modal.close();
				}
			}.bind( this ));

			this._$modal.find( 'form.validate' ).validate({
				submitHandler: function () {
					this._param = {
						requestTitle: this._$modal.find( '#requestTitle' ).val(),
						requestReason: this._$modal.find( '#requestReason' ).val()
					};
					this.dispatch( 'application-submit', { data: this._param });
				}.bind( this )
			});
		},
	});

	AP.applicationForm = new ApplicationForm();
})( jQuery );