/**
 * 매장 칭찬 작성하기
 *
 */

;(function ( $ ) {
	'use strict';

	var StoreComplimentWrite = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.store_compliment_write' );

			this.memberInfo = {};

			if ( this._$target.length > 0 ) {
				this._setPlugin();
				this._setEvent();
			}
		},

		/** =============== Public Methods =============== */
		getMemberInfo: function ( id, name ) {
			this.memberInfo.id = id;
			this.memberInfo.name = name;

			this._$target.find( '.member_id' ).text( this.memberInfo.id );
		},

		setStore: function ( storeNm, storeSn ) {
			this._$target.find( '.storeNm' ).val( storeNm );
			this._$target.find( '.storeSn' ).val( storeSn );
			if ( storeSn ) {
				this._$target.find( '.storeSn' ).siblings( 'span' ).show();
			}
		},

		/** =============== Private Methods =============== */
		_setPlugin: function () {
			this._$target.find( 'input[maxlength], textarea[maxlength]' ).inputLimits();
			this._$target.find( '.ui_input_images' ).inputImages();
		},

		_setEvent: function () {
			// 매장찾기
			this._$target.find( 'button.find_store_button' ).on( 'click', function (e) {
				AP.storeComplimentFindStore.open();
			}.bind( this ));

			// 이유
			this._$target.find( '.reason input:checkbox' ).on( 'change', function (e) {
				var text = '';
				this._$target.find( '.reason input:checkbox' ).each(function () {
					if ( $( this ).prop( 'checked' ) == true ) {
						text += $( this ).val() + ',';
					}
				});
				this._$target.find( 'input[name="storeEvalReason"]' ).val( text.slice(0, -1) );
				console.log( text.slice( 0, -1 ));
			}.bind( this ));

			// 수정 - 사진삭제
			this._$target.find( '.btn_del:not( .user_attach_img )' ).on( 'click', function (e) {
				var imgSn = $( e.target ).closest( 'li' ).data( 'imgSn' ),
					input = '<input type="hidden" name="deleteStoreEvalImgSnList" value="' + imgSn + '">';

				this._$target.find( 'form.validate' ).append( input );
				$( e.target ).closest( 'li' ).remove();
			}.bind( this ));

			// 등록
			this._$target.find( 'form.validate' ).validate({
				submitHandler: function ( form ) {
					AP.modal.alert( '등록하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType == 'confirm' ) {
							var formData = new FormData( form );
							this._$target.find( '.ui_input_images' ).inputImages( 'extendFormData', formData );
							this._submit( formData );

						}
					}.bind( this ));
				}.bind( this )
			});
		},

		_submit: function ( formData ) {
			AP.login().done( function () {
				this._api = AP.api.registStoreEval( {}, formData ).done(function () {
					this.dispatch( 'submit-complete' );
				}.bind( this )).fail(function ( xhr ) {
					console.log( 'error' );
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