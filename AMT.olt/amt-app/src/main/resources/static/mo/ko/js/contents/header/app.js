/**
 * Header
 * @events  'event-type'
 *  ex) AP.header.addListener( 'event-type', function (e) {});
 */
;(function ( $ ) {
    'use strict';

    var Header = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#header' );
            this._$titleArea = this._$target.find( '.page_title_new' );

            this._setEvent();
			this._setFixed();
            this._setTitleArea();
        },

        /** =============== Public Methods =============== */

		//header의 높이 반환
		getHeight: function () {
			return this._$target.find( '.header_top' ).height();
		},

        /** =============== Private Methods =============== */

        _setEvent: function () {
			this._$target.find( '.btn_menu' ).on( 'click', function () {
				AP.menuCategory.open();
			}.bind( this ));
		},

		_setFixed: function () {
			$( window ).on( 'scroll', function () {
				var st = $( window ).scrollTop();
				if ( st > 0 ) {
					this._$target.find( '.header_top' ).addClass( 'fixed' );
				} else {
					this._$target.find( '.header_top' ).removeClass( 'fixed' );
				}
			}.bind( this ));
		},

		_setTitleArea: function () {
			var isOpen = false;
			if ( this._$titleArea.length == 0 ) return;
			this._$titleArea.find( '.btn_toggle' ).on( 'click', function (e) {
				if ( !isOpen ) {
					isOpen = true;
					$( e.currentTarget ).addClass( 'on' );
					this._$target.find( '.cate_dimmed' ).show();
					this._$target.find( '.menu_layer' ).show();
				} else {
					isOpen = false;
					$( e.currentTarget ).removeClass( 'on' );
					this._$target.find( '.cate_dimmed' ).hide();
					this._$target.find( '.menu_layer' ).hide();
				}
			}.bind( this ));

			if ( this._$target.find( '.menu_layer' ).length == 0 ) return;
			this._$target.find( '.menu_layer ul a' ).on( 'click', function (e) {
				$( this ).closest( 'ul' ).find( 'a' ).removeClass( 'on' );
				$( this ).addClass( 'on' );
			});
		}
    });

    AP.header = new Header();
})( jQuery );