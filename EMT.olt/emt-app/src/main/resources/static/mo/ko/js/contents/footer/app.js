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

            this._isOpenFloating = false;

            this._setEvents();
            this._setFloatingMenu();
            this._setNotification()
        },

        /** =============== Public Methods =============== */

        //footer의 높이 반환
        getHeight: function () {
			return this._$target.height();
        },

		//ArtistTalk
		setArtistTalk: function ( param, banner ) {
			this._$target.siblings( '.floating_menu' ).find( '.btn_talk' ).on( 'click', function (e) {
				var modal = AP.modal.full({
						title: 'Artist Talk',
						contents: {
							templateKey: 'common.artist-talk-modal',
							templateModel: {
								banner: banner
							}
						},
						containerClass: 'artist_talk'
					}),
					$btn = modal.getElement().find( '.btn_consultation' );

				modal.addListener( 'modal-before-close', function (e) {
					$btn.off( 'click' );
				});

				$btn.on( 'click', function (e) {
					AP.login().done( function () {
						webChat( param );
					});
				});
			});
		},

		//artistalk 열기
		openArtistTalk: function () {
			this._$target.siblings( '.floating_menu' ).find( '.btn_talk' ).trigger( 'click' );
		},

        /** =============== Private Methods =============== */
        _setEvents: function () {
			// 에뛰드 사업자 정보확인
			this._$target.find( '.btn_footer_more' ).on( 'click', function () {
				$( '.btn_footer_more' ).toggleClass( 'on' );
				this._$target.find( '.company_info' ).slideToggle();
			}.bind(this));

			//app 전용
			if ( AP.webview.is() ) {
				//app 에서 맴버쉽 영역 노출
				this._$target.siblings( '.floating_menu' ).find( '.membership' ).on( 'click', function (e) {
					this._showMemberShipLayer( !$(e.currentTarget).hasClass('on') );
				}.bind(this));

				AP.asideMenu.addListener( 'open', function (e) {
					this._showMemberShipLayer( false );
				}.bind(this));

				AP.webview.addListener( 'open-artist-talk', function () {
					this.openArtistTalk();
				}.bind( this ));
			}
        },

		_showMemberShipLayer: function ( state ) {
        	var $floating = this._$target.siblings( '.floating_menu' ),
				$btn = $floating.find( '.membership' );

        	if ( state ) {
				$btn.addClass( 'on' );
				$btn.siblings( '.membership_layer' ).show();
				$( '.app_layer_dimmed' ).show();
			} else {
				$btn.removeClass( 'on' );
				$btn.siblings( '.membership_layer' ).hide();
				$( '.app_layer_dimmed' ).hide();
			}

			this._isOpenFloating = state;
		},

        // bottom floating menu
        _setFloatingMenu: function () {
			if ( this._$target.siblings( '.ap_container' ).find( '.option_layer' ).length > 0 ) return;	// 구매하기 버튼 있을때 예외처리

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

                if ( this._isOpenFloating || scrollY <= 0 ) {
					$top.addClass( 'hide' );
				} else {
					$top.removeClass( 'hide' );
				}

				if ( this._isOpenFloating || scrollY >= 0 && oldScrollY > scrollY ) {
					$floatingMenu.addClass( 'open' );
				} else {
					$floatingMenu.removeClass( 'open' );
				}


                oldScrollY = scrollY;
            }.bind(this));

            //기본적용
			$floatingMenu.addClass( 'open' );
        },

		//알림 체크
		_setNotification: function () {
        	var $noti = this._$target.siblings( '.floating_menu' ).find( '.noti' );
        	if ( !$noti.length ) return;

			$( document ).ready( function () {
				AP.api.notification().done(function (result) {
					var viewDate = AP.common.getLocalStorage( 'notificationDate' ),
						data = result.foPushResult;

					if ( !data ) return;
					if ( data.totalCount ) {
						var isView = false;

						if ( viewDate ) {
							isView = _.every( data.foPushList, function ( list ) {
								return moment( viewDate ).isSameOrAfter( list.pushDt );
							});
						}

						if ( !isView ) {
							$noti.show();
						}
					}
				}.bind(this));
			}.bind(this));
		}
    });

    AP.footer = new Footer();
})( jQuery );