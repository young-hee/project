/**
 * toggle contents (버튼을 클릭하면 단순 콘텐츠가 열리고 닫히는 기능)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: toggle-contents-show, toggle-contents-hide
         * Methods: ex) $( '.ui_toggle_contents' ).toggleContents( 'clear' );
         *      "clear"             적용해제
         *      "show"              contents 노출
         *      "hide"              contents 숨김
         * @param   {String}  method
         * @returns {jQuery}
         */
        toggleContents: function ( method, value ) {
            var pluginName = 'toggle-contents';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new ToggleContents($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var ToggleContents = function ( $target, pluginName ) {
        var _$target = $target,
            _$btn = _$target.find( '.toggle_btn' );

        var _this = this,
            _pluginName = pluginName;


        /* ==================== Public Methods ==================== */

        /**
         * plugin 해제
         */
        this.clear = function () {
            _$btn.off( 'click', btnClickHandler );
            plugin.remove( _$target, _pluginName );
        };

        /**
         * tooltip layer 노출
         */
        this.show = function () {
            _$target.addClass( 'on' );
            dispatch( 'show' );
        };

        /**
         * tooltip layer 숨김
         */
        this.hide = function () {
            _$target.removeClass( 'on' );
            dispatch( 'hide' );
        };


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            setEvents();
        }

        function setEvents () {
            _$btn.on( 'click', btnClickHandler );
        }

        function btnClickHandler (e) {
            if ( _$target.hasClass('on') ) {
                _this.hide();
            } else {
                _this.show();
            }
        }

        function dispatch ( type ) {
            _$target.triggerHandler({
                type: _pluginName + '-' + type
            });
        }

    };

})( jQuery, AP.plugin );