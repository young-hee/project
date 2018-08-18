/**
 * Footer
 * @events  'event-type'
 *  ex) AP.footer.addListener( 'event-type', function (e) {});
 */
;(function ( $ ) {
    'use strict';

    var Footer = $B.Class.extend({
        initialize: function () {
        	this._$target = $( '.ap_footer' );
        	this._setAsideMenu();
        },

        /** =============== Public Methods =============== */
        setBanner: function () {

        },

        /** =============== Private Methods =============== */
        _setEvents: function () {

        },
        
     // right aside menu
		_setAsideMenu: function () {
			var $aside = this._$target.siblings( 'aside' ),
				$top = $aside.find( '.btn_top' );
			
			//top btn
			$top.on( 'click', function (e) {
				$( 'body, html' ).animate({
					scrollTop: 0
				});
			}.bind(this));
		}
    });


    AP.footer = new Footer();
})( jQuery );