/**
 * 브랜드 - 에뛰드 하우스
 *
 */

;(function ( $ ) {
	'use strict';

	var EtudeHouse = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.brand .etude_house' );

			var $national = this._$target.find( '.section.global dl' );
			$national.find( 'dt a' ).on( 'click', function (e) {
				e.preventDefault();
				$national.removeClass( 'on' );
				$( e.target ).closest( 'dl' ).addClass( 'on' );

			}.bind( this ));
		}

		/** =============== Public Methods =============== */

		/** =============== Private Methods =============== */

	});

	AP.etudeHouse = new EtudeHouse();
})( jQuery );