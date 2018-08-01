/**
 * 매장 개설 문의
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreInquiry = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.store_inquiry' );
			this._api = null;


			this._setEvent();
		},

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */
		_setEvent: function () {
			// 보내기
			this._$target.find( '.find_store_btns_wrap button.submit' ).on( 'click', function (e) {
				e.preventDefault();
				this._$target.find( 'form.validate' ).submit();
			}.bind( this ));
			
			// 취소
			this._$target.find( '.find_store_btns_wrap button.cancel' ).on( 'click', function (e) {
				window.location.reload();
				$('html').scrollTop(0);
			}.bind( this ));
			
			// 투자 가능 금액
			this._$target.find( 'input[name="investmentPossibleAmt"]' ).on( 'focusin focusout', function (e) {
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

			// submit
			this._$target.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					AP.modal.alert( '문의하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if($('[name=responseEmailNotifyYn]').is(':checked')){
							$('[name=responseEmailNotifyYn]').val('Y');
						}else{
							$('[name=responseEmailNotifyYn]').val('N');
						}
						$('[name=termsAgreeYn]').val('Y');
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							formData.set( 'investmentPossibleAmt', formData.get( 'investmentPossibleAmt' ).replace( /,/g, '' ));
							this._submit( formData );
						}
					}.bind( this ));
				}.bind( this )
			});
		},

		_submit: function ( formData ) {
			this._api = AP.api.postStoreOpenInquiry( {}, formData ).done(function ( result ) {
				this.dispatch( 'complete-submit', { data: result });

			}.bind( this )).fail(function (e) {
				console.log( 'error', e );
			}.bind( this )).always(function () {}.bind( this ));
		}
	});

	AP.storeInquiry = new StoreInquiry();
})( jQuery );