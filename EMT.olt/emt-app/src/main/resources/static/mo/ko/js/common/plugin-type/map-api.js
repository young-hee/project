/**
 * Map API (Google Map API)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: map-api-marker-click
         * Methods: ex) $( '.map' ).mapApi( 'clear' );
         *      "clear"             적용해제
         *      "addMarker"         marker 추가
         *      "removeMarker"      marker 삭제
         *      "openInfoWindow"    infoWindow 열기
         *      "closeInfoWindow"   infoWindow 닫기
         *      "setCenter"         위도, 경도로 map 중앙설정
         *      "getCenter"         현재 중앙좌표 반환
         *      "setZoom"           zoom level 설정
         *      "getZoom"           zoom level 반환
         *      "resize"            대상 노드의 사이즈가 변경시 호출해준다. (map 영역이 제대로 사이즈를 잡지 못할때도 실행해 준다.)
         * @param   {String}  options       ex) $( '.map' ).mapApi({ratio: [580, 400]});
         *      - {Array}   ratio        map api 비율 자동 조절, ex) [580, 400]
         *      - {Number}  zoom         기본 zoom level 설정, default:15
         * @returns {jQuery}
         */
        mapApi: function ( method, val1, val2, val3, val4, val5 ) {
            var pluginName = 'map-api';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, val1, val2, val3, val4, val5 );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new MapApi($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var MapApi = function ( $target, pluginName, options ) {
        var MARKER_IMG_PATH = AP.common.absolutePath( '/images/common/ico_location.png' );

        var _$target = $target;

        var _this = this,
            _pluginName = pluginName,
            _options = parseOptions( options ),
            _id = _$target.attr( 'id' ) || $B.string.unique(),
            _map = null,
            _markers = [];


        /* ==================== Public Methods ==================== */

        /**
         * plugin 적용 해제
         */
        this.clear = function () {
            this.removeMarker();
            _map = null;
            _$target.css({
                background: '',
                height: ''
            }).empty();
            $( window ).off( 'resize', resizeHandler );
            plugin.remove( _$target, _pluginName );
        };

        /**
         * 해당 좌표로 마커생성
         * @param {Number}  lat         위도
         * @param {Number}  lng         경도
         * @param {String}  markerId    이벤트로 전달 받을 marker의 고유값
         * @param {Object}  option
         *  - {String}  content         infoWindow의 표시할 html string
         *  - {String}  markerImgPath   별도의 마커 이미지를 등록할때 설정, default:MARKER_IMG_PATH
         */
        this.addMarker = function ( lat, lng, markerId, option ) {
            if ( _map ) {
                var info = _.isObject( option )? $B.object.clone( option ) : {},
                    marker = new google.maps.Marker({
                        position: {lat: parseFloat(lat), lng: parseFloat(lng)},
                        icon: info.markerImgPath || MARKER_IMG_PATH
                    }),
                    infoWindow;

                if ( info.content ) {
                    infoWindow = new google.maps.InfoWindow({
                        content: '<div class="map_info_window google">' + info.content + '</div>',
                        maxWidth: 250
                    });
                }

                marker.addListener( 'click', function () {
                    if ( infoWindow ) {
                        this.closeInfoWindow();
                        infoWindow.open( _map, marker );
                    }

                    dispatch( 'marker-click', markerId );
                }.bind(this));

                _markers.push({
                    markerId: markerId,
                    marker: marker,
                    infoWindow: infoWindow
                });

                marker.setMap( _map );
            }
        };

        /**
         * 지도의 마커 삭제
         * @param {String}  markerId    대상의 markerId (설정하지 않으면 모두 삭제)
         */
        this.removeMarker = function ( markerId ) {
            if ( _map ) {
                if ( $B.isEmpty(markerId) ) {
                    _.each( _markers, function ( markerObj ) {
                        if ( markerObj.infoWindow ) markerObj.infoWindow.close();
                        markerObj.marker.setMap( null );
                    });

                    _markers = [];
                } else {
                    for ( var key in _markers ) {
                        var markerObj = _markers[key];

                        if ( markerId === markerObj.markerId ) {
                            if ( markerObj.infoWindow ) markerObj.infoWindow.close();
                            markerObj.marker.setMap( null );
                            _markers.splice( key, 1 );
                        }
                    }
                }
            }
        };

        /**
         * 지도의 Infowindow 열기
         * @param {String}  markerId    대상의 markerId (설정하지 않으면 모두 열린다)
         */
        this.openInfoWindow = function ( markerId ) {
            if ( _map ) {
                if ( $B.isEmpty(markerId) ) {
                    _.each( _markers, function ( markerObj ) {
                        if ( markerObj.infoWindow ) markerObj.infoWindow.open( _map, markerObj.marker );
                    });
                } else {
                    _.some( _markers, function ( markerObj ) {
                        if ( markerId === markerObj.markerId ) {
                            if ( markerObj.infoWindow ) markerObj.infoWindow.open( _map, markerObj.marker );
                            return true;
                        }
                    });
                }
            }
        };

        /**
         * 지도의 Infowindow 닫기
         * @param {String}  markerId    대상의 markerId (설정하지 않으면 모두 닫힌다)
         */
        this.closeInfoWindow = function ( markerId ) {
            if ( _map ) {
                if ( $B.isEmpty(markerId) ) {
                    _.each( _markers, function ( markerObj ) {
                        if ( markerObj.infoWindow ) markerObj.infoWindow.close();
                    });
                } else {
                    _.some( _markers, function ( markerObj ) {
                        if ( markerId === markerObj.markerId ) {
                            if ( markerObj.infoWindow ) markerObj.infoWindow.close();
                            return true;
                        }
                    });
                }
            }
        };

        /**
         * 해당 좌표로 중심 이동
         * @param {Number}  lat     위도
         * @param {Number}  lng     경도
         */
        this.setCenter = function ( lat, lng ) {
            if ( _map ) {
                _map.setCenter( new google.maps.LatLng(parseFloat(lat), parseFloat(lng)) );
            }
        };

        /**
         * 현재 좌표 반환
         * @returns {Object}    {lat, lng}
         */
        this.getCenter = function () {
            if ( _map ) {
                var center = _map.getCenter();
                return {
                    lat: center.lat(),
                    lng: center.lng()
                }
            } else {
                return {
                    lat: 0,
                    lng: 0
                };
            }
        };

        /**
         * zoom 설정
         * @param {Number}  level     zoom level
         */
        this.setZoom = function ( level ) {
            if ( _map ) {
                _map.setZoom( level );
            }
        };

        /**
         * 현재 zoom level 반환
         * @returns {Number}
         */
        this.getZoom = function () {
            if ( _map ) {
                return _map.getZoom();
            } else {
                return 0;
            }
        };

        /**
         * 대상 노드의 사이즈가 변경시 호출해준다. (map 영역이 제대로 사이즈를 잡지 못할때도 실행해 준다.)
         */
        this.resize = function () {
            setSize();
        };


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
			if ( window.google && google.maps && typeof google.maps.Map === 'function' ) {
				setMap();
			} else {
				AP.common.mapApiReady.done(function () {
					setMap();
				});
			}

            setEvents();
            setSize();
        }

        function setEvents () {
            if ( _.isArray(_options.ratio) && _options.ratio.length === 2 ) {
                $( window ).on( 'resize', resizeHandler );
            }
        }

        function resizeHandler (e) {
            setSize();
        }

        function setSize () {
            if ( _.isArray(_options.ratio) && _options.ratio.length === 2 ) {
                var width = _$target.width(),
                    height = width * ( options.ratio[1] / options.ratio[0] );

                _$target.css( 'height', height + 'px' );
            }

            if ( _map ) google.maps.event.trigger( _map, 'resize' );
        }

        function parseOptions ( options ) {
            var result = _.isObject( options )? $B.object.clone( options ) : {};

            //default setting
            if ( $B.isEmpty(result.zoom) ) result.zoom = 15;

            return result;
        }

        function setMap () {
            _$target.attr( 'id', _id );

			_map = new google.maps.Map( _$target.get(0), {
				zoom: _options.zoom,
				center: {
					lat: 37.52876373236224,//AP 본사
					lng: 126.96846416770506
				}
			});
        }

        function dispatch ( type, markerId ) {
            _$target.triggerHandler({
                type: _pluginName + '-' + type,
                markerId: markerId
            });
        }

    };

})( jQuery, AP.plugin );