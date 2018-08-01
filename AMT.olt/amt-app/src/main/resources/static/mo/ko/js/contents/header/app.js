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
            this._$commonArea = this._$target.find( '.header_common' );
            this._$titleArea = this._$target.find( '.page_title_area' );

            this._setTitleArea();
            this._setToggleMenuFixed();
        },

        /** =============== Public Methods =============== */

		//header의 높이 반환
		getHeight: function () {
			return this._$target.height();
		},

        /** =============== Private Methods =============== */

		//depth1, depth2 카테고리
        _setTitleArea: function () {
            var $menuToggleBtn = this._$titleArea.find( '.page_title > .btn_menu' ),
                $menuLayer = this._$titleArea.find( '.menu_layer' ),
				$currentDepth1 = $menuLayer.find( '.depth1 .current' ),
				isDepth1Open = $currentDepth1.hasClass( 'on' );

            //layer toggle
            $menuToggleBtn.on( 'click', function (e) {
                $menuToggleBtn.toggleClass( 'on' );
                $menuLayer.toggle();

                if ( $menuToggleBtn.hasClass('on') ) {
                	if ( isDepth1Open ) {
						$currentDepth1.parent().css( 'padding-bottom', $currentDepth1.siblings('.depth2').innerHeight() + 'px' );
					}
				} else {
					$menuLayer.find( '.depth1 > li' ).css( 'padding-bottom', '' ).find( 'a.ico.on' ).removeClass( 'on' );
				}
            });

            //depth1
			$menuLayer.find( '.depth1 > li > a.ico' ).on( 'click', function (e) {
				e.preventDefault();
				var $btn = $( e.currentTarget ),
					$li = $btn.parent( 'li' );

				if ( $btn.hasClass('on') ) {
					$btn.removeClass( 'on' );
					$li.css( 'padding-bottom', '' );
				} else {
					$li.siblings().css( 'padding-bottom', '' ).find( 'a.ico.on' ).removeClass( 'on' );
					$btn.addClass( 'on' );
					$li.css( 'padding-bottom', $btn.siblings('.depth2').innerHeight() + 'px' );
				}
			});

            //back btn
            this._$titleArea.find( '.btn_previous' ).on( 'click', function (e) {
                history.back();
            });
        },

		//main swipe menu
        _setToggleMenuFixed: function () {
        	var $scrollArea = this._$target.find( '.swipe_menu .fixed_area > div' );

        	if ( $scrollArea.length ) {
				var containerW = $scrollArea.width(),
					scrollX = $scrollArea.scrollLeft(),
					$menus = $scrollArea.find( 'li' ),
					menuLength = $menus.length,
					point = {x: 0, width: 0};

				for ( var i = 0; i < menuLength; ++i ) {
					var $menu = $menus.eq( i );

					if ( i > 0 ) point.x = point.x + point.width;
					point.width = $menu.width();
					if ( $menu.find('.selected').length ) break;
				}

				if ( scrollX > point.x || (point.x + point.width - scrollX) > containerW ) {
					//선택된 메뉴 위치로 scroll
					$scrollArea.scrollLeft( point.x - (containerW / 2) + (point.width / 2) );
				}
			}

            $( window ).on( 'scroll', function (e) {
                if ( $(e.currentTarget).scrollTop() > this._$commonArea.outerHeight() ) {
                    this._$target.find( '.fixed_area' ).addClass( 'fixed' );
                } else {
                    this._$target.find( '.fixed_area' ).removeClass( 'fixed' );
                }
            }.bind(this));
        }
    });

    AP.header = new Header();
})( jQuery );