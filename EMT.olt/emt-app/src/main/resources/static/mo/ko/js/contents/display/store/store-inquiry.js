/**
 * 매장 개설 문의
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreInquiry = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.store_inquiry' );
			this._$modal = null;
			this._api = null;

			this._$target.find( '.page_btns a' ).on( 'click', function (e) {
				e.preventDefault();
				this._open();
			}.bind( this ));
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_open: function () {
			this._modal = AP.modal.full({
				title: '국내 개설 문의',
				contents: {
					templateKey: 'display.store.store-inquiry',
					templateModel: {
					}
				},
				containerClass: 'review'
			}).addListener( 'modal-before-close', function (e) {
				this._clear();
				if ( this._api ) {
					this._api.abort();
					this._api = null;
				}
			}.bind( this )).addListener( 'modal-close', function (e) {
				this._modal = null;
			}.bind( this ));

			this._$modal = this._modal.getElement();
			this._setPlugin();
			this._setEvent();
		},
		_clear: function () {
			this._$modal.find( 'textarea[maxlength]' ).inputLimits( 'clear' );
		},

		_setPlugin: function () {
			this._$modal.find( 'textarea[maxlength]' ).inputLimits();
		},

		_setEvent: function () {
			// 보내기
			this._$modal.find( '.submit' ).on( 'click', function (e) {
				this._$modal.find( 'form.validate' ).submit();
			}.bind( this ));

			// submit
			this._$modal.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					AP.modal.alert( '문의하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if($('[name=responseEmailNotifyYn]').is(':checked')){
							$('[name=responseEmailNotifyYn]').val('Y');
						}else{
							$('[name=responseEmailNotifyYn]').val('N');
						}
						$('[name=termsAgreeYn]').val('Y');
						if ( e.closeType == 'confirm' ) {
							this._$modal.find( '.form_btns button' ).prop( 'disabled', true );
							var formData = new FormData( form );
							if ( this._$modal.find( 'input[name=investmentPossibleAmt]' ).length > 0 ) {
								formData.set( 'investmentPossibleAmt', formData.get( 'investmentPossibleAmt' ).replace( /,/g, '' ));
							}
							this._submit( formData );
						}
					}.bind( this ));
				}.bind( this )
			});
			
			// 취소
			this._$modal.find( '.cancel' ).on( 'click', function (e) {
				this._modal.close();
			}.bind( this ));

			// 투자 가능 금액
			this._$modal.find( 'input[name="investmentPossibleAmt"]' ).on( 'focusin focusout', function (e) {
				var value = $( e.target ).val();

				switch( e.type ) {
					case 'focusin':
							$( e.target ).val( value.replace( /,/g, '' ));
						break;
					case 'focusout':
						if ( !isNaN( value ) ) {
							$( e.target ).val( $B.string.numberFormat( value ));
						}
						break;
				}

			}.bind( this ));
		},

		_submit: function ( formData ) {
			this._api = AP.api.postStoreOpenInquiry( {}, formData ).done(function () {
				this._$modal.find( '.form_btns button' ).prop( 'disabled', false );
				this._confirm();
			}.bind( this )).fail(function (e) {
				this._$modal.find( '.form_btns button' ).prop( 'disabled', false );
				console.log( 'error', e );
			}.bind( this )).always(function () {}.bind( this ));
		},

		_confirm: function () {
			var confirmModal = AP.modal.full({
				title: '국내 개설 문의',
				contents: {
					templateKey: 'display.store.store-inquiry-complete',
					templateModel: {}
				},
				containerClass: 'review'
			}).addListener( 'modal-bofore-close', function (e) {
				if ( e.closeType == 'confirm' ) {
					confirmModal.getElement().find( 'button.confirm' ).off( 'click' );
				}
			}).addListener( 'modal-close', function (e) {
				if ( e.closeType == 'confirm' ) {
					confirmModal = null;
				}
			}.bind( this ));

			confirmModal.getElement().find( 'button.confirm' ).on( 'click', function (e) {
				confirmModal.close();
				this._modal.close();
			}.bind( this ));
		}
	});

	AP.storeInquiry = new StoreInquiry();
})( jQuery );