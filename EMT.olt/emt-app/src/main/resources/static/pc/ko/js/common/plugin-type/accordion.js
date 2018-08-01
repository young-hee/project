/**
 * accordion
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: "accordion-open", "accordion-before-open"
         *  ex) $( '.ui_accordion' ).on('accordion-open', function(e){ e.index });
         * EventProperties: index (전체가 열리거나 닫히면 index에 -1이 리턴된다.)
         * @param   {String}  method    ex) $( '.ui_accordion' ).accordion( 'clear' );
         *              "clear"         적용해제
         *              "open"
         *              "close"
         * @returns {jQuery}
         */
        accordion: function ( method, value ) {
            var pluginName = 'accordion';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new Accordion($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var Accordion = function ( $target, pluginName ) {
        var _$target = $target,
			_$modal = _$target.closest( '.layer_popup' );

        var _this = this,
            _pluginName = pluginName,
            _isSingleOpen = ( _$target.data( 'open-type' ) === 'single' );


        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$target.off( 'click', '>dl >dt >button', eventHandler );
            plugin.remove( _$target, _pluginName );
        };

        /**
         * accordion open
         * @param {Int}    index    open 시킬 대상의 index
         */
        this.open = function ( index, silent, init ) {
            if ( index > -1 && index < _$target.find('> dl').length ) {
                _$target.find( '> dl:eq( ' + index + ' ) >dt' ).addClass( 'on' );

                if ( init ) {
                    _$target.find( '> dl:eq( ' + index + ' ) >dd' ).attr( 'aria-hidden', false ).stop().show();
                } else {
                    if ( _isSingleOpen ) {
                        this.close();
                        _$target.find( '> dl:eq( ' + index + ' ) >dt' ).addClass( 'on' );
                    }
                    _$target.find( '> dl:eq( ' + index + ' ) >dd' ).attr( 'aria-hidden', false ).stop().slideDown({
                        queue: false,
                        duration: 300,
                        complete: function (e) {
							correctScrollPosition( index );
                            if ( !silent ) dispatch( 'open', index );
                        }
                    });
                    if ( !silent ) dispatch( 'before-open', index );
                }
            } else {
                if ( !_isSingleOpen ) {
                    _$target.find( '> dl >dt' ).addClass( 'on' );
                    _$target.find( '> dl:eq( ' + index + ' ) >dd' ).attr( 'aria-hidden', false ).stop().slideDown({
                        queue: false,
                        duration: 300,
                        complete: function (e) {
                            if ( !silent ) dispatch( 'open', -1 );
                        }
                    });

                    if ( !silent ) dispatch( 'before-open', -1 );
                }
            }
        };
        /**
         * accordion open
         * @param {Int}    index    open 시킬 대상의 index
         */
        this.close = function ( index, silent, init ) {
            if ( index > -1 && index < _$target.find('> dl').length ) {
                _$target.find( '> dl:eq( ' + index + ' ) >dt' ).removeClass( 'on' );

                if ( init ) {
                    _$target.find( '> dl:eq( ' + index + ' ) >dd' ).attr( 'aria-hidden', true ).stop().hide();
                } else {
                    _$target.find( '> dl:eq( ' + index + ' ) >dd' ).attr( 'aria-hidden', true ).stop().slideUp({
                        queue: false,
                        duration: 300
                    });
                }
            } else {
                _$target.find( '> dl >dt' ).removeClass( 'on' );
                _$target.find( '> dl >dd' ).attr( 'aria-hidden', true ).stop().slideUp({
                    queue: false,
                    duration: 300
                });
            }
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$target.on( 'click', '>dl >dt >button', eventHandler );
            _$target.find( '>dl >dt' ).each( function ( idx, el ) {
                if ( $(el).hasClass('on') ) {
                    _this.open( idx, true, true );
                } else {
                    _this.close( idx, true, true );
                }
            });
        }

        function eventHandler (e) {
            var idx = $( e.currentTarget ).closest( 'dl' ).index(),
                isOpen = $( e.currentTarget ).parent().hasClass( 'on' );

            if ( isOpen ) {
                _this.close( idx );
            } else {
                _this.open( idx );
            }
        }

		function correctScrollPosition ( index ) {
			if ( _isSingleOpen ) {
				var $dl = _$target.find( '> dl:eq(' + index + ')' ),
					posY, scrollY, topH;

				if ( _$modal.length ) {
					posY = $dl.position().top;
					topH = _$modal.find( '.layer_title' ).outerHeight() || 0;
					scrollY = _$modal.scrollTop() + topH;

					if ( scrollY > posY ) {
						_$modal.scrollTop( posY - topH );
					}
				} else {
					posY = $dl.offset().top;
					topH = $( '#header .fixed_area' ).outerHeight() || 0;
					scrollY = $( window ).scrollTop() + topH;

					if ( scrollY > posY ) {
						$( window ).scrollTop( posY - topH );
					}
				}
			}
		}

        function dispatch ( type, idx ) {
            _$target.triggerHandler({
                type: _pluginName + '-' + type,
                index: idx
            });
        }
    };

})( jQuery, AP.plugin );