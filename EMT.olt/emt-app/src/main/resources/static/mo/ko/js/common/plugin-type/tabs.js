/**
 * Tabs
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: "tabs-change"    ex) $( '.ui_tab' ).on('tabs-change', function(e){ e.index });
         * EventProperties: index
         * @param   {String}  method    ex) $( '.ui_tab' ).tabs( 'change', 3 );
         *              "clear"         적용해제
         *              "change"        tab 변경
         *              "disable"       tab 비활성화
         *              "enable"        tab 활성화
         * @returns {jQuery}
         */
        tabs: function ( method, value ) {
            var pluginName = 'tabs';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new Tabs($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var Tabs = function ( $target, pluginName ) {
        var _$target = $target,
            _$tabMenuArea = $target.find( '> .tab_menu' ),
            _$tabsUl = _$tabMenuArea.find( '> ul' ),
            _$tabs = _$tabsUl.find( '> li' ),
            _$contents = $target.find( '> .tab_contents > .tab_cont' );

        var _pluginName = pluginName,
            _tabLength = _$tabs.length,
            _listRect = [],
            _activeIndex = 0;


        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$tabs.find( 'button, a' ).off( 'click', clickHandler );
            $( window ).off( 'load', loadHandler );
            $( window ).off( 'resize', resizeHandler );
            plugin.remove( _$target, _pluginName );
        };

        /**
         * tab 변경
         * @param {Int}    index    변경할 탭의 index
         */
        this.change = function ( index ) {
            if ( index > -1 && index < _tabLength ) {
                changeTab( index );
                setActivePos();
                dispatch( index );
            }
        };

        /**
         * tab 비활성화
         * @param {Int}    index    탭의 index, 설정하지 않으면 모든 탭에 적용
         */
        this.disable = function ( index ) {
            if ( index > -1 && index < _tabLength ) {
                _$tabs.eq( index ).find( 'button, a' ).prop( 'disabled', true ).addClass( 'disabled' );
            } else {
                _$tabs.find( 'button, a' ).prop( 'disabled', true ).addClass( 'disabled' );
            }
        };

        /**
         * tab 활성화
         * @param {Int}    index    탭의 index, 설정하지 않으면 모든 탭에 적용
         */
        this.enable = function ( index ) {
            if ( index > -1 && index < _tabLength ) {
                _$tabs.eq( index ).find( 'button, a' ).prop( 'disabled', false ).removeClass( 'disabled' );
            } else {
                _$tabs.find( 'button, a' ).prop( 'disabled', false ).removeClass( 'disabled' );
            }
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            setEvents();
            setScroller();

            var activeIdx = _$tabs.filter( '.on' ).index();
            changeTab( activeIdx );
            setActivePos();
        }

        function setEvents () {
            _$tabs.find( 'button, a' ).on( 'click', clickHandler );

            $( window ).on( 'load', loadHandler );
            $( window ).on( 'resize', resizeHandler );
        }

        function loadHandler (e) {
            setScroller();
            setActivePos();
        }

        function resizeHandler (e) {
            setActivePos();
        }

        function clickHandler (e) {
            var idx = $( e.currentTarget ).parent().index();

            //a태그는 페이지 이동이므로 클릭시 탭을 변화 시키지 않는다.
            if ( $(e.currentTarget).prop('nodeName') !== 'A' ) {
                changeTab( idx );
                dispatch( idx );
            }
        }

        function setActivePos () {
            //적용 예외 대상
            if ( _$tabMenuArea.hasClass('equally') ) return;

            var containerW = _$tabMenuArea.width(),
                scrollX = _$tabMenuArea.scrollLeft(),
                point = _listRect[_activeIndex];

            if ( scrollX > point.x || (point.x + point.width - scrollX) > containerW ) {
                _$tabMenuArea.scrollLeft( point.x - (containerW / 2) + (point.width / 2) );
            }
        }

        function setScroller () {
            //적용 예외 대상
            if ( _$tabMenuArea.hasClass('equally') ) return;

            var totalW = 0;

            _$tabs.each( function (idx) {
                var width = $( this ).outerWidth( true );

                _listRect[idx] = {
                    x: totalW,
                    width: width
                };

                totalW += width;
            });

            _$tabsUl.css( 'width', totalW + 5 + 'px' );
        }

        function isDisabled ( idx ) {
            var $tab = _$tabs.eq( idx ),
                result = false;

            if ( $tab.find('>button').length ) {
                result = $tab.find( '>button' ).is( ':disabled' );
            } else if ( $tab.find('>a').length ) {
                result = $tab.find( '>a' ).is( '.disabled' );
            }

            return result;
        }

        function changeTab ( idx ) {
            if ( idx > -1 && idx < _tabLength ) {
                if ( !isDisabled(idx) ) {
                    _$tabs.removeClass( 'on' ).eq( idx ).addClass( 'on' );
                    _$contents.hide().attr( 'aria-hidden', true ).eq( idx ).show().attr( 'aria-hidden', false );

                    //접근성 관련태그 삽입
                    _$tabs.find( '.sr_only' ).remove();
                    _$tabs.eq( idx ).append( '<span class="sr_only">selected tab</span>' );
                    _activeIndex = idx;

                    //plugins resize
					_$contents.eq( idx ).find( '.ix-slide-max-apply' ).ixSlideMax( 'resize' );
					_$contents.eq( idx ).find( '.＠video-apply' ).video( 'resize' );
					_$contents.eq( idx ).find( '.＠bonding-rect-apply' ).bondingRect( 'updated' );

                    if ( _$contents.eq(idx).find('img.lazy_load:not(.loaded)').length ) {
                        AP.lazyLoad.updated();
                    }
                }
            }
        }

        function dispatch ( idx ) {
            if ( idx > -1 && idx < _tabLength ) {
                if ( !isDisabled(idx) ) {
                    _$target.triggerHandler({
                        type: _pluginName + '-change',
                        index: idx
                    });
                }
            }
        }
    };

})( jQuery, AP.plugin );