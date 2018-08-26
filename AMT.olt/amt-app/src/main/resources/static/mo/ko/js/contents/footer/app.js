/**
 * Footer
 *
 */
;(function ( $ ) {
    'use strict';

    var Footer = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#footer' );
            this._$floating = $( '.floating_area' );

            this._currentScrollTop = 0;

            this._setScroll();
			this._setBtnTop();
        },

        /** =============== Public Methods =============== */
        // footer의 높이 반환
        getHeight: function () {
			return this._$target.height();
        },

		toggleFloatingMenu: function ( st ) {
			if ( this._currentScrollTop < st ) {
				// down
				this._$floating.addClass( 'in' );
			} else {
				// up
				this._$floating.removeClass( 'in' );
			}
			if ( $( '.color_curation' ).length > 0 ) {
				AP.display.toggleLibCuration( this._currentScrollTop < st );
			}
		},

        /** =============== Private Methods =============== */
        _setScroll: function () {
        	$( window ).on( 'scroll', function (e) {
        		var st = $( e.target ).scrollTop();
				this.toggleFloatingMenu( st );
				this._currentScrollTop = st;
			}.bind( this ));
		},

        _setBtnTop: function () {
			$( '.floating_area' ).find( '.btn_top' ).on( 'click', function (e) {
				$( e.target ).triggerHandler( 'click-top' );
				$( 'body, html' ).animate({ scrollTop: 0 });
			}.bind( this ));
        }
    });

    AP.footer = new Footer();
})( jQuery );