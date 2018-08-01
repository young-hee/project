/**
 * 매장 칭찬 수정하기
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreComplimentModify = $B.Class.extend({
		initialize: function () {
			this._modal = null;
			this._api = null;
			this._data = null;
		},

		/** =============== Public Methods =============== */
		open: function ( data ) {

			data.id = AP.storeComplimentList.memberInfo.id;
			data.name = AP.storeComplimentList.memberInfo.name;

			console.log( data );

			this._modal = AP.modal.full({
				title: '칭찬 작성/수정하기',
				contents: {
					templateKey: 'display.store.store-compliment-modify',
					templateModel: data
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

			this._$modal.find( '.reason input' ).each(function ( index, el ) {
				for ( var i = 0; i < data.storeEvalReason.length; ++i ) {
					if ( $( el ).val() == data.storeEvalReason[i] ) {
						$( el ).prop( 'checked', true );
					}
				}
			}.bind( this ));
			this._setEvalReason();
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._$modal.find( 'input[maxlength], textarea[maxlength]' ).inputLimits( 'clear' );
			this._$modal.find( '.ui_input_images' ).inputImages( 'clear' );
			this._$modal.find( '.form_btns .cancel' ).off( 'click' );
			this._deletedImgSn = [];
			this._data = null;
		},

		_setPlugin: function () {
			this._$modal.find( 'input[maxlength], textarea[maxlength]' ).inputLimits();
			this._$modal.find( '.ui_input_images' ).inputImages();
		},

		_setEvent: function () {
			// 이유
			this._$modal.find( '.reason input:checkbox' ).on( 'change', function (e) {
				this._setEvalReason();
			}.bind( this ));

			// 사진 삭제
			this._$modal.find( '.btn_del:not( .user_attach_img )' ).on( 'click', function (e) {
				var imgSn = $( e.target ).closest( 'li' ).data( 'imgSn' ),
					input = '<input type="hidden" name="deleteStoreEvalImgSnList" value="' + imgSn + '">';

				this._$modal.find( 'form.validate' ).append( input );
				$( e.target ).closest( 'li' ).remove();
			}.bind( this ));

			// 취소
			this._$modal.find( '.form_btns .cancel' ).on( 'click', function (e) {
				AP.modal.alert( '취소하시겠습니까?' ).addListener( 'modal-close', function () {
					this._modal.close();
				}.bind( this ));
			}.bind( this ));

			// 등록
			this._$modal.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					AP.modal.alert( '수정하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							this._$modal.find( '.form_btns button' ).prop( 'disabled', true );
							this._$modal.find( '.ui_input_images' ).inputImages( 'extendFormData', formData );
							this._submit( formData );
						}
					}.bind( this ));
				}.bind( this )
			});
		},

		_setEvalReason: function () {
			var text = '';
			this._$modal.find( '.reason input:checkbox' ).each(function () {
				if ( $( this ).prop( 'checked' ) == true ) {
					text += $( this ).val() + ',';
				}
			});
			this._$modal.find( '.reason input:hidden' ).val( text.slice(0, -1) );
		},

		_submit: function ( formData ) {
			AP.login().done( function () {
				this._api = AP.api.updateStoreEval( {}, formData ).done(function () {
					this._$modal.find( '.form_btns button' ).prop( 'disabled', false );
					this._modal.close();
					AP.storeComplimentList.load();
				}.bind( this )).fail(function ( xhr ) {
					console.log( 'error' );
					this._$modal.find( '.form_btns button' ).prop( 'disabled', false );
					this._modal.close();
					if ( xhr.errorCode === 'EAPI004' ) {
						//존재하지 않는 회원
						AP.login({
							trigger: true
						});
					}
				}.bind( this )).always(function () {}.bind( this ));
			}.bind( this ));
		}
	});

	AP.storeComplimentModify = new StoreComplimentModify();
})( jQuery );