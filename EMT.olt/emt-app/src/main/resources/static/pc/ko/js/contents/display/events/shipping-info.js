/**
 * 배송지 정보 입력하기
 *
 */

;(function ( $ ) {
	'use strict';

	var ShippingInfo = $B.Class.extend({
		initialize: function () {
			this._member = null;
		},

		/** =============== Public Methods ================ */
		open: function ( result ) {
			var productName = '';
			for ( var i = 0; i < result.awards.length; ++i ) {
				productName += result.awards[i].prodName;
				if ( i != result.awards.length - 1 ) {
					productName += ', ';
				}
			}
			result.productName = productName;
			result.memberSn = result.member.memberSn;
			this._member = result.member;

			this._modal = AP.modal.info({
				title: '배송지 정보 입력하기',
				sizeType: 'L',
				contents: {
					templateKey: 'display.events.shipping-info',
					templateModel: result
				},
				containerClass: 'roulette_layer'
			}).addListener( 'modal-before-close', function () {
				this._clear();
				this._$modal = null;
				this._modal = null;

			}.bind( this ));

			this._modal.resetPosition();
			this._$modal = this._modal.getElement();
			this._resetHTML = this._$modal.html();
			this._$modal.find( '.layer_close' ).hide();

			this._setPlugin();
			this._setEvent();

			$( window ).on( 'beforeunload', function (e) {
				var confirmationMessage = '이 페이지를 벗어나면 마지막 저장 후 수정된 내용은 저장되지 않습니다.';
				e.returnValue = confirmationMessage;
				return confirmationMessage;
			});
		},

		/** =============== Private Methods =============== */
		_clear: function () {
			this._$modal.find( '.ui_find_addresses' ).findAddresses( 'clear' );
			this._$modal.find( 'input[placeholder]' ).placeholder( 'clear' );

			this._$modal.find( '.form_btns button' ).off( 'click' );
			this._$modal.find( 'input.load_info' ).off( 'change' );
		},

		_setPlugin: function () {
			this._$modal.find( '.ui_find_addresses' ).findAddresses();
			this._$modal.find( 'input[placeholder]' ).placeholder();
		},

		_setEvent: function () {
			// 회원정보 불러오기
			this._$modal.find( 'input.load_info' ).on( 'change', function (e) {
				if ( $( e.target ).prop( 'checked' ) ){
					// this._getMemberInfo( this._member );
					this._getMemberInfo( this._member );
				}
			}.bind( this ));

			// 필수 동의
			this._$modal.find( '#agree_personal' ).on( 'change', function (e) {
				if ( $( e.target ).prop( 'checked' ) ) {
					$( e.target ).val( 'Y' );
				} else {
					$( e.target ).val( '' );
				}
			}.bind( this ));

			// 등록 / 취소
			this._$modal.find( '.form_btns button' ).on( 'click', function (e) {
				var postCode = $.trim( this._$modal.find( '.post_code' ).val() ),
					addressFirst = $.trim( this._$modal.find( '.address_first' ).val() ),
					addressLast = $.trim( this._$modal.find( '.address_last' ).val() );

				var addressValue = '';
				addressValue += ( postCode ) ? postCode + ',' : '';
				addressValue += ( addressFirst ) ? addressFirst + ',' : '';
				addressValue += ( addressLast ) ? addressLast + ',' : '';
				if ( addressValue.substr( addressValue.length - 1, 1 ) === ',' ) {
					addressValue = addressValue.substr( 0, addressValue.length - 1 );
				}
				this._$modal.find( 'input[name=address]' ).val( addressValue );

				if ( $( e.target ).attr( 'class' ).indexOf( 'reset' ) > -1 ) {
					this._reset();
				} else if ( $( e.target ).attr( 'class' ).indexOf( 'regist' ) > -1 ) {
					AP.login().done( function () {
						this._$modal.find( 'form.validate' ).submit();
					}.bind( this ));
				}
			}.bind( this ));

			// form submit
			this._$modal.find( 'form.validate.whole' ).validate({
				submitHandler: function ( form ) {
					AP.modal.alert( '등록하시겠습니까?' ).addListener( 'modal-close', function (e) {
						if ( e.closeType === 'confirm' ) {
							var formData = new FormData( form );
							this._submit( formData );
						}
					}.bind( this ));
				}.bind( this )
			});
		},

		_getMemberInfo: function ( member ) {
			AP.api.regularEventShipAddress({}, { memberSn: member.memberSn }).done(function ( result ) {
				var shipInfo = null;
				for ( var i = 0; i < result.data.length; ++i ) {
					if ( result.data[i]['repShipAddressYn'] === 'Y' ) {
						shipInfo = result.data[i];
					}
				}

				var name = $.trim( shipInfo['addresseeName']['name1'] ),
					phoneNo = $.trim( shipInfo['phoneNo1']['phoneNo'] ),
					zipCode = $.trim( shipInfo['addresseeAddress']['zipCode'] ),
					address1 = $.trim( shipInfo['addresseeAddress']['address1'] ),
					address2 = $.trim( shipInfo['addresseeAddress']['address2'] );

				this._$modal.find( 'input[name="name"]' ).val( name );
				this._$modal.find( 'input[name="telNo1"]' ).val( phoneNo );
				this._$modal.find( 'input[name="post_code"]' ).val( zipCode );
				this._$modal.find( 'input[name="address_first"]' ).val( address1 );
				this._$modal.find( 'input[name="address_last"]' ).val( address2 );

				this._$modal.find( '.ui_table input' ).placeholder( 'updated' );

			}.bind( this )).fail(function ( error ) {
				console.log( error );
			}.bind( this ));
		},

		_submit: function ( formData ) {
			AP.api.regularEventTermsAgree( {}, formData ).done(function ( data ) {
				$( window ).off( 'beforeunload' );
				AP.modal.alert( '등록이 완료 되었습니다.' ).addListener( 'modal-close', function () {
					this._modal.close();
					this.dispatch( 'sweet-letter-reset' );
				}.bind( this ));
			}.bind( this )).fail(function (xhr) {
				if ( xhr.errorCode === 'EAPI004' ) {
					//존재하지 않는 회원
					AP.login({
						trigger: true
					});
				} else if ( xhr.errorCode === 'ESAL032' ) {
					AP.modal.alert( xhr.errorMessage ).addListener( 'modal-close', function (e) {
						this._modal.close();
					}.bind( this ));
				} else {
					this._modal.close();
				}
			}.bind( this )).always(function (e) {});
		},

		_reset: function () {
			this._clear();
			this._$modal.html( this._resetHTML );
			this._$modal.find( '.layer_close' ).hide();
			this._setPlugin();
			this._setEvent();
		}
	});

	AP.shippingInfo = new ShippingInfo();
})( jQuery );