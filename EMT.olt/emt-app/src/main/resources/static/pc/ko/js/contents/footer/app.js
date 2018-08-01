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
			this._setAsideMenu();
        },

        /** =============== Public Methods =============== */

		//footer의 높이 반환
		getHeight: function () {
			return this._$target.height();
		},

		//ArtistTalk
		setArtistTalk: function ( param ) {
			var $aside = this._$target.siblings( 'aside' ),
				$talkArea = $aside.find( '.layer_popup_artist_talk' );

			$aside.find( '.btn_artist_talk' ).on( 'click', function (e) {
				$talkArea.toggle();
			});

			$aside.find( '.layer_close_artist_talk' ).on( 'click', function (e) {
				$talkArea.hide();
			});

			$aside.find( '.btn_consultation' ).on( 'click', function (e) {
				AP.login().done( function () {
					webChat( param );
				});
			});
		},

		//artistalk 열기
		openArtistTalk: function () {
			this._$target.siblings( 'aside' ).find( '.btn_artist_talk' ).trigger( 'click' );
		},

        /** =============== Private Methods =============== */

        _setEvents: function () {
        	//family site
			this._$target.find( '.family_site button' ).on( 'click', function (e) {
				$( e.currentTarget ).parent().toggleClass( 'open' );

				if ( $(e.currentTarget).parent().hasClass('open') ) {
					this._$target.find( '.family_site .select_options' ).show();
				} else {
					this._$target.find( '.family_site .select_options' ).hide();
				}
			}.bind(this));

			//찾아오시는길
			this._$target.find( '.btn_find_map' ).on( 'click', function (e) {
				var modal = AP.modal.info({
						title: '에뛰드 찾아오시는 길',
						contents: '<div class="map_area"></div>',
						sizeType: 'L'
					});

				modal.addListener( 'modal-before-close', function () {
					modal.getElement().find( '.map_area' ).mapApi( 'clear' );
				});

				modal.getElement().find( '.map_area' ).mapApi().mapApi( 'addMarker', 37.52876373236224, 126.96846416770506 );
			}.bind(this));
        },

		// right aside menu
		_setAsideMenu: function () {
			var $aside = this._$target.siblings( 'aside' ),
				$top = $aside.find( '.btn_totop' );

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