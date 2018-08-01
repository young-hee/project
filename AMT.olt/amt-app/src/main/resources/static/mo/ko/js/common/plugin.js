/**
 * jquery Plugin manager
 * 중복적용방지, 삭제등을 지원한다.
 */
;(function($){
    'use strict';

    var Plugin = {
        pluginId: 1,
        pluginPool: {},

        /**
         * Plugin 등록
         * @param {jQueryObject}    $el
         * @param {String}          pluginName
         * @param {Function}        plugin
         */
        add: function ( $el, pluginName, plugin ) {
            var id = pluginName + this.pluginId++;
            $el.prop( 'ap-' + pluginName, id ).addClass( '＠' + pluginName + '-apply' );
            this.pluginPool[id] = plugin;
        },

        has: function ( $el, pluginName ) {
            var id = $el.prop( 'ap-' + pluginName );
            return ( id )? true : false;
        },

        remove: function ( $el, pluginName ) {
            if ( this.has($el, pluginName) ) {
                var id = $el.prop( 'ap-' + pluginName );
                $el.removeClass( '＠' + pluginName + '-apply' ).removeProp( 'ap-' + pluginName );
                delete this.pluginPool[id];
            }
        },

        /**
         * plugin 으로 등록 객체의 Public Methods 실행
         * @param {jQueryObject}    $el
         * @param {String}          pluginName
         * @param {String}          methodName (methodName의 시작이 "get, is"로 시작하면서 다음문자가 대문자이면 값을 리턴한다.)
         */
        callMethod: function ( $els, pluginName, methodName, val1, val2, val3, val4, val5, val6, val7, val8, val9 ) {
            //getter
            if ( /^get[A-Z]|^is[A-Z]/.test(methodName) ) {
                var result;

                var $el = $els.eq(0);

                if ( this.has($el, pluginName) ) {
                    var id = $el.prop( 'ap-' + pluginName ),
                        plugin = this.pluginPool[id];

                    if ( plugin && typeof plugin[methodName] === 'function' ) {
                        result = plugin[methodName]( val1, val2, val3, val4, val5, val6, val7, val8, val9 );
                    }
                }

                return result;
            } else {
                return $els.each( function ( idx, el ) {
                    var $el = $( el );

                    if ( this.has($el, pluginName) ) {
                        var id = $el.prop( 'ap-' + pluginName ),
                            plugin = this.pluginPool[id];

                        if ( plugin && typeof plugin[methodName] === 'function' ) {
                            plugin[methodName]( val1, val2, val3, val4, val5, val6, val7, val8, val9 );
                        }
                    }
                }.bind(this));
            }
        }
    };


    AP.plugin = Plugin;
})(jQuery);