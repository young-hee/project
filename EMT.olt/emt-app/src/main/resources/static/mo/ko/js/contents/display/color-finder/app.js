/**
 * ColorFinder
 *
 * */

;(function ( $ ) {
    'use strict';

    var ColorFinder = $B.Class.extend({
        initialize: function () {
			this._$target = $( '#ap_container .ap_contents .color_finder_detail' );

        	this._setEvent();
        },

        /** =============== Public Methods =============== */

        /** =============== Private Methods =============== */
		_setEvent: function () {
			this._$target.find( '.ui_tab ' ).on( 'tabs-change', function (e) {
				console.log( e.index );
			});
		},
    });

    AP.colorFinder = new ColorFinder();
})( jQuery );