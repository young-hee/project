/**
 * remain timer (dday)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: remain-timer-complete
         * Methods: ex) $( '.ui_remain_timer' ).remainTimer( 'clear' );
         *      "clear"             적용해제
         * @param   {String}  options       ex) $( '.ui_remain_timer' ).remainTimer({startTime: 1513731430375, finishTime: 1513731568113});
         *      - {Number} startTime   시작시간, milliseconds since 1970/01/01
         *      - {Number} finishTime  완료시간, milliseconds since 1970/01/01
         * @returns {jQuery}
         */
        remainTimer: function ( method, value ) {
            var pluginName = 'remain-timer';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new RemainTimer($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var RemainTimer = function ( $target, pluginName, options ) {
        var _$target = $target,
            _$day = _$target.find( '.day' ),
            _$hour = _$target.find( '.hour' ),
            _$minute = _$target.find( '.minute' ),
            _$second = _$target.find( '.second' );

        var _this = this,
            _pluginName = pluginName,
            _options = setOptions( options ),
            _isComplete = false,
            _remainTimer;


        /* ==================== Public Methods ==================== */

        /**
         * plugin 해제
         */
        this.clear = function () {
            this.pause();
            _$day.removeClass( 'complete' );
            _$hour.removeClass( 'complete' );
            _$minute.removeClass( 'complete' );
            _$second.removeClass( 'complete' );
            _$target.removeClass( 'complete' );
            plugin.remove( _$target, _pluginName );
        };

        /**
         * 시작 (일시정지 상태 시간에서 부터 시작)
         */
        this.start = function () {
            _remainTimer.start();
        };

        /**
         * 일시정지
         */
        this.pause = function () {
            _remainTimer.stop();
        };

        /**
         * 완료 여부 반환
         * @returns {Boolean}
         */
        this.isComplete = function () {
            return _isComplete;
        };


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _remainTimer = new $B.utils.RemainTimer( _options.startTime, _options.finishTime )
                .addListener( 'timer', function (e) {
                    var day = $B.string.format(e.day, 2),
                        hour = $B.string.format(e.hour, 2),
                        minute = $B.string.format(e.minute, 2),
                        second = $B.string.format(e.second, 2);

                    var i;
                    for ( i = 0; i < _$day.length; ++i ) {
                        _$day.eq(i).text( (_$day.length == 1) ? day : day.substr(i, i + 1) );
                    }
                    for ( i = 0; i < _$hour.length; ++i ) {
                        _$hour.eq(i).text( (_$hour.length == 1) ? hour : hour.substr(i, i + 1) );
                    }
                    for ( i = 0; i < _$minute.length; ++i ) {
                        _$minute.eq(i).text( (_$minute.length == 1) ? minute : minute.substr(i, i + 1) );
                    }
                    for ( i = 0; i < _$second.length; ++i ) {
                        _$second.eq(i).text( (_$second.length == 1) ? second : second.substr(i, i + 1) );
                    }

                    if ( e.day === 0 ) _$day.addClass( 'complete' );
                    if ( e.day === 0 && e.hour === 0 ) _$hour.addClass( 'complete' );
                    if ( e.day === 0 && e.hour === 0 && e.minute === 0 ) _$minute.addClass( 'complete' );
                })
                .addListener( 'complete', function (e) {
                    _isComplete = true;
                    _$second.addClass( 'complete' );
                    _$target.addClass( 'complete' );
                    dispatch( 'complete' );
                }).start();
        }

        function setOptions ( options ) {
            var result = _.isObject( options )? $B.object.clone( options ) : {};

            result.startTime = ( result.startTime )? moment( result.startTime ).valueOf() : moment().valueOf();
            result.finishTime = ( result.finishTime )? moment( result.finishTime ).valueOf() : moment().valueOf();

            return result;
        }

        function dispatch ( type ) {
            _$target.triggerHandler({
                type: _pluginName + '-' + type
            });
        }

    };

})( jQuery, AP.plugin );