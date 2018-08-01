/**
 * Footer
 * @events  'event-type'
 *  ex) AP.footer.addListener( 'event-type', function (e) {});
 */
;(function ( $ ) {
    'use strict';

    var Footer = $B.Class.extend({
        initialize: function () {
            this._$target = $( '#footer' );

            this._setEvents();
            this._setFloatingMenu();
        },

        /** =============== Public Methods =============== */

        //footer의 높이 반환
        getHeight: function () {
			return this._$target.height();
        },

        /** =============== Private Methods =============== */
        _setEvents: function () {
			// 에뛰드 사업자 정보확인
			this._$target.find( '.btn_footer_more' ).on( 'click', function () {
				$( this ).toggleClass( 'on' );
				this._$target.find( '.company_info' ).slideToggle();
			}.bind(this));
        },

        // bottom floating menu
        _setFloatingMenu: function () {
            var $floatingMenu = this._$target.siblings( '.floating_menu' ),
                $top = $floatingMenu.find( '.btn_top' );

            var oldScrollY = $( window ).scrollTop();

            //top btn
            $top.on( 'click', function (e) {
                $( 'body, html' ).animate({
                    scrollTop: 0
                });
                $( e.target ).triggerHandler( 'click-top' );
            }.bind(this));

            //aside menu btn
			$floatingMenu.find( '.aside_menu_btn' ).on( 'click', function (e) {
				e.preventDefault();
				AP.asideMenu.open();
			});

			//scroll
            $( window ).on( 'scroll', function (e) {
                var scrollY = $( window ).scrollTop();

                if ( scrollY <= 0 ) {
					$top.addClass( 'hide' );
				} else {
					$top.removeClass( 'hide' );
				}

				if ( scrollY >= 0 && oldScrollY > scrollY ) {
					$floatingMenu.addClass( 'open' );
				} else {
					$floatingMenu.removeClass( 'open' );
				}


                oldScrollY = scrollY;
            }.bind(this));

            //기본적용
			$floatingMenu.addClass( 'open' );
        }
    });

    AP.footer = new Footer();
})( jQuery );