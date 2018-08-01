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
            this._$cartCount = this._$target.find( '.cart .count' );

            this._setTitleArea();
            this._setToggleMenuFixed();
            this._setKeyword();
            this._setSearchEvent();
            this.resetCartCount();
        },

        /** =============== Public Methods =============== */

		//header의 높이 반환
		getHeight: function () {
			return this._$target.height();
		},

		//장바구니 count 설정
		resetCartCount: function () {
			AP.api.getCartCount().done( function ( result ) {
				if ( result.cartProdCount ) {
					this._$cartCount.text( result.cartProdCount );
					this._$cartCount.show();
				} else {
					this._$cartCount.hide();
				}
			}.bind(this));
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
        },

		_setKeyword: function () {
			var $searchText = this._$target.find( '.search_form input[type=text]' );
			$searchText.on('click', function(){
				new AP.SearchLayer().open({});
			});
			
        	if ( this._$target.find( '.search_form' ).length > 0 ) {
				AP.api.marketingKeyword({}, {}).done(function ( data ) {
					if ( data && data.keywordLinkList.length > 0 ) {
						this._$target.find( '.search_form' ).find( 'input' ).val( data.keywordLinkList[0].keywordLinkTitle );
						this._$target.find( '.search_form' ).find( 'input' ).attr( 'data-link', data.keywordLinkList[0].linkUrl );
					}
				}.bind( this )).fail(function (e) {
					console.log( 'error', e)
				}).always(function () {});
			}
		},
        
        _setSearchEvent : function(){
        	
        	this._$target.find( '.search_form .btn_search' ).on('click', function(){
        		location.href = '/common/search';
        	});
        	
        	this._$target.find( '.swipe_menu .btn_search, .util_menu .search' ).on('click', function(){
        		new AP.SearchLayer().open({});
        	});
        }
    });

    AP.header = new Header();
})( jQuery );