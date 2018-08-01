/**
 * MobileCertification
 *
 */
;(function( $ ){
	'use strict';

	var MobileCertification = $B.Class.extend({
		initialize: function () {

		},

		/** =============== Public Methods ================ */
		request: function ( phoneCorp, phoneNo ) {
			AP.api.simpleCertifySend({}, {
				countryNo: '',
				phoneNo: phoneNo
			}).done(function ( result ) {

			}.bind( this )).fail(function ( error ) {
				console.log( error );
			});
		},

		/** =============== Private Methods =============== */

	});

	AP.mobileCertification = new MobileCertification();
})( jQuery );

