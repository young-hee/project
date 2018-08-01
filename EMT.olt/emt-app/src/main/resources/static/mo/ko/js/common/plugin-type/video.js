/**
 * video (youtube)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: video-ready, video-play, video-pause, video-stop, video-error, video-playing
         * Methods: ex) $( 'iframe' ).video( 'clear' );
         *      "clear"     		적용해제
         *      "play"      		재생
         *      "pause"     		일시정지
         *      "stop"      		정지
         *      "mute"      		음소거 설정 (Boolean)
		 *      "getCurrentTime"	동영상 재생이 시작된 이후의 경과 시간을 초 단위로 반환
		 *      "getDuration"		동영상의 전채 재생 시간을 초 단위로 반환
         *      "resize"    		사이즈 조절
         *      "isPlaying" 		재생중 인지 반환
         *      "isReady"   		동영상이 준비되었는지 여부 반환
         * @returns {jQuery}
         */
        video: function ( method, value ) {
            var pluginName = 'video';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new Video($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var Video = function ( $target, pluginName, options ) {
        var _$target = $target,
			_$thumb = _$target.siblings( '.thumbnail' );

        var _this = this,
            _pluginName = pluginName,
            _originStyle = _$target.attr( 'style' ),
            _vendor = _$target.data( 'vendor' ),// youtube
            _options = setOptions( options ),
            _video = null,
            _isPlaying = false,
            _isReady = false,
            _isDestroy = false,
            _currentHeight = _$target.height(),
			_timer;


        /* ==================== Public Methods ==================== */

        this.clear = function ( remove ) {
        	if ( _timer ) _timer.stop().removeListener( 'timer' );
            _isDestroy = true;
            $( window ).off( 'load resize', resizeHandler );
			_$thumb.off( 'click', thumbClickHandler );
			if ( remove && _video ) _video.destroy();
            _video = null;
            _isPlaying = false;
            _isReady = false;
            _$target.attr( 'style', _originStyle );
            plugin.remove( _$target, _pluginName );
        };

        this.play = function () {
            if ( _video && typeof _video.playVideo === 'function' ) {
				_$thumb.hide();
            	_video.playVideo();
			}
        };

        this.stop = function () {
            if ( _video && typeof _video.stopVideo === 'function' ) _video.stopVideo();
        };

        this.pause = function () {
            if ( _video && typeof _video.pauseVideo === 'function' ) _video.pauseVideo();
        };

        this.mute = function ( value ) {
            if ( _video ) {
                if ( value ) {
                    if ( typeof _video.mute === 'function' ) _video.mute();
                } else {
                    if ( typeof _video.unMute === 'function' ) _video.unMute();
                }
            }
        };

		/**
		 * 동영상 재생이 시작된 이후의 경과 시간을 초 단위로 반환
		 * @returns {Number}
		 */
		this.getCurrentTime = function () {
			if ( _video ) {
				return _video.getCurrentTime();
			} else {
				return 0;
			}
		};

		/**
		 * 동영상의 전채 재생 시간을 초 단위로 반환
		 * @returns {Number}
		 */
		this.getDuration = function () {
			if ( _video ) {
				return _video.getDuration();
			} else {
				return 0;
			}
		};

        this.isPlaying = function () {
            return _isPlaying;
        };

        this.isReady = function () {
            return _isReady;
        };

        this.resize = function () {
            if ( _options.ratio ) {
                var width = _$target.attr( 'width' ),
                    height = _$target.attr( 'height' ),
                    targetW = _$target.innerWidth(),
                    currentHeight = ( height / width ) * targetW;

                _$target.css( 'height', currentHeight + 'px' );
                _currentHeight = currentHeight;
            }
        };


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            $( window ).on( 'load resize', resizeHandler );

			if ( window.YT && typeof YT.Player === 'function' ) {
				setVideo();
				_this.resize();
			} else {
				AP.common.youtubeApiReady.done(function () {
					if ( !_isDestroy ) {
						setVideo();
						_this.resize();
					}
				});
			}

            _$thumb.on( 'click', thumbClickHandler );
            _this.resize();

            if ( _options.playingEvent ) {
				_timer = new $B.utils.Timer( 1000, 0 ).addListener( 'timer', function (e) {
					dispatch( 'playing' );
				});
			}
        }

        function thumbClickHandler (e) {
			_this.play();
		}

        function setOptions ( options ) {
            var result = _.isObject( options )? $B.object.clone( options ) : {};

            result.ratio = ( typeof _$target.data('ratio') === 'boolean' )? _$target.data( 'ratio' ) : true;
            result.mute = ( typeof _$target.data('mute') === 'boolean' )? _$target.data( 'mute' ) : false;
            result.playingEvent = ( typeof _$target.data('playing-event') === 'boolean' )? _$target.data( 'playing-event' ) : false;

            return result;
        }

        function resizeHandler () {
            _this.resize();
        }

        function setVideo () {
            _video = new YT.Player( _$target.get(0), {
                //width: 1280,
                //height: 720,
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                    onError: onPlayerError
                }
            });
        }

        function onPlayerReady (e) {
            _isReady = true;

            if ( _options.mute ) {
                _this.mute( true );
            }

            dispatch( 'ready' );
        }

        function onPlayerStateChange (e) {
            //재생중=1 버퍼링중=3
            if ( e.data === YT.PlayerState.PLAYING || e.data === YT.PlayerState.BUFFERING ) {
                _isPlaying = true;

                if ( e.data === YT.PlayerState.PLAYING ) {
                    dispatch( 'play' );
					if ( _timer ) {
						_timer.start();
						dispatch( 'playing' );
					}
                } else {
					if ( _timer ) _timer.reset();
				}
            } else {
                _isPlaying = false;
				if ( _timer ) _timer.reset();

                if ( e.data === -1 || e.data === YT.PlayerState.ENDED ) {
                    dispatch( 'stop' );
                } else if ( e.data === YT.PlayerState.PAUSED ) {
                    dispatch( 'pause' );
                }
            }
        }

        function onPlayerError (e) {
			if ( _timer ) _timer.reset();
            dispatch( 'error' );
        }

        function dispatch ( type ) {
        	var current = _this.getCurrentTime(),
				duration = _this.getDuration(),
				progress = current / duration;

            _$target.triggerHandler({
				currentTime: current,
				duration: duration,
				progress: progress,
                type: _pluginName + '-' + type
            });
        }

    };

})( jQuery, AP.plugin );