/**
 * 매장 칭찬 작성하기
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreComplimentWrite = $B.Class.extend({
		initialize: function () {
			this._api = null;
		},

		/** =============== Public Methods =============== */
		open: function () {
			this._modal = AP.modal.full({
				title: '칭찬 작성/수정하기',
				contents: {
					templateKey: 'display.store.store-compliment-write',
					templateModel: {
						name: AP.storeComplimentList.memberInfo.name,
						id: AP.storeComplimentList.memberInfo.id
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

		setStore: function ( storeNm, storeSn ) {
			this._$modal.find( '.store_finder_wrap span' ).show();
			this._$modal.find( '.store_finder_wrap .storeNm' ).val( storeNm );
			this._$modal.find( '.store_finder_wrap .storeSn' ).val( storeSn );
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._$modal.find( 'input[maxlength], textarea[maxlength]' ).inputLimits( 'clear' );
			this._$modal.find( '.ui_input_images' ).inputImages( 'clear' );
			this._$modal.find( '.form_btns .cancel' ).off( 'click' );
		},

		_setPlugin: function () {
			this._$modal.find( 'input[maxlength], textarea[maxlength]' ).inputLimits();
			this._$modal.find( '.ui_input_images' ).inputImages();
		},

		_setEvent: function () {
			// 매장찾기
			this._$modal.find( '.store_finder_wrap button' ).on( 'click', function (e) {
				AP.storeComplimentFindStore.open();
			}.bind( this ));

			// 이유
			this._$modal.find( '.reason input:checkbox' ).on( 'change', function (e) {
				var text = '';
				this._$modal.find( '.reason input:checkbox' ).each(function () {
					if ( $( this ).prop( 'checked' ) == true ) {
						text += $( this ).val() + ','
					}
				});
				this._$modal.find( '.reason input:hidden' ).val( text.slice(0, -1) );
			}.bind( this ));

			// 등록 / 취소
			this._$modal.find( '.form_btns button' ).on( 'click', function (e) {
				if ( $( e.target ).hasClass( 'cancel' )) {
					// 취소
					AP.modal.alert( '취소하시겠습니까?' ).addListener( 'modal-close', function () {
						this._modal.close();
					}.bind( this ));
				} else {
					// 등록
					this._$modal.find( 'form.validate' ).submit();
				}
			}.bind( this ));

			// 등록
			this._$modal.find( 'form.validate' ).validate({
				submitHandler: function ( form, e ) {
					AP.modal.alert( '등록하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							this._$modal.find( '.ui_input_images' ).inputImages( 'extendFormData', formData );
							this._submit( formData );
							this._$modal.find( '.form_btns button' ).prop( 'disabled', true );
						}
					}.bind( this ));
				}.bind( this )
			});
		},

		_submit: function ( formData ) {
			AP.login().done( function () {
				this._api = AP.api.registStoreEval( {}, formData ).done(function () {
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

	AP.storeComplimentWrite = new StoreComplimentWrite();
})( jQuery );