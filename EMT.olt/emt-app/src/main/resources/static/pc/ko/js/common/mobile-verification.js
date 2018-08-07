/**
 * MobileVerification
 *
 * 	@method
 * 		request
 * 			@param phoneCorp		통신사
 * 			@param phoneNo			휴대폰번호
 * 		reRequest
 * 			@param verifSn			인증번호
 * 		confirm
 * 			@param verifSn			인증번호
 * 			@param verifKey		모바일 인증 일련번호
 *
 * 	@event
 * 		request-verify-no			인증요청
 * 		re-request-verify-no		재인증요청
 * 		confirm-verify-no			인증확인
 *
 */
;(function( $ ){
	'use strict';

	var MobileVerification = $B.Class.extend({
		initialize: function () {

		},

		/** =============== Public Methods ================ */
		request: function ( phoneCorp, phoneNo ) {
			AP.api.requestMobileVerification({}, {
					countryNo: phoneCorp,
					phoneNo: phoneNo
				
			}).done(function ( result ) {
				this.dispatch( 'request-verify-no', { data: result });
			}.bind( this )).fail(function ( error ) {
				AP.modal.alert( error.errorMessage );
			});
		},

		reRequest: function ( verifSn ) {
			AP.api.resendMobileVerificationKey({}, {
				mobileVerifSn: verifSn
			}).done(function ( result ) {
				this.dispatch( 're-request-verify-no', { data: result });
			}.bind( this )).fail(function ( error ) {
				AP.modal.alert( error.errorMessage );
			});
		},

		confirm: function ( verifSn, verifKey ) {
			AP.api.verifyMobileVerificationKey({}, {
				mobileVerifSn: verifSn,
				mobileVerifKey: verifKey
			}).done(function ( result ) {
				this.dispatch( 'confirm-verify-no', { data: result });
			}.bind( this )).fail(function ( error ) {
				this.dispatch( 'confirm-verify-no', { data: error });
			}.bind( this ));
		}

		/** =============== Private Methods =============== */

	});

	AP.mobileVerification = new MobileVerification();
})( jQuery );

