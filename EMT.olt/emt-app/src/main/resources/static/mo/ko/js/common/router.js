/**
 * Router (hashchange 이벤트를 이용한 simple router)
 * router listener 등록은 혼선을 방지하기 위하여 최대한 하나만 사용하길 권장
 * Hash type:
 *  - :default      기본, hash가 없을때
 *  - hash          영문, 숫자
 *  - hash/:val     hash뒤에 value를 지정,
 *
 * Event Properties:
 *  - {String}  newHash     현재 hash
 *  - {String}  oldHash     이전 hash
 *  - {Object}  value       'hash/:val' 타입으로 전달 받은 value들, ex) e.value.val
 *
 * ex) AP.router.addListener( 'hash', function (e) { console.log(e.oldHash, e.newHash, e.value) });
 */
;(function( $ ){
	'use strict';

	var Router = $B.Class.extend({
		EMPTY_HASH: location.pathname + location.search,
		//IE8~
		_isSupported: 'onhashchange' in window,
		_isRunning: false,

		initialize: function () {
			this._oldHash = location.hash.replace( '#', '' );

			if ( !this._isSupported ) {
				AP.common.warn( 'Router:해당 브라우저는 router를 지원하지 않습니다.' );
			}
		},

		/** =============== Public Methods =============== */

		/**
		 * router 시작
		 * @returns {Router}
		 */
		start: function () {
			if ( this._isRunning || !this._isSupported ) return this;

			var hash = location.hash.replace( '#', '' );
			if ( hash ) {
				this.dispatch( hash, this._oldHash );
			}

			this._setEvent();
			this._isRunning = true;
			return this;
		},

		/**
		 * 해당 hash 로 이동하거나 대체
		 * @param {String}   hash
		 * @param {Object}   options
		 *  - {Boolean}   trigger   true 설정시 조건에 부합되는 이벤트를 발생시킨다.
		 *  - {Boolean}   replace   현재 hash를 대체한다.
		 * @returns {Router}
		 */
		navigate: function ( hash, options ) {
			if ( !this._isSupported ) return this;
			var opt = options || {};

			hash = hash.replace( /#/, '' );

			if ( this._oldHash === hash ) {
				if ( opt.trigger ) {
					this.dispatch( hash, this._oldHash );
				}
			} else {
				if ( opt.replace ) {
					this._replaceHash( hash );
				} else {
					this._setHash( hash );
				}
			}

			return this;
		},

		/**
		 * listener 등록
		 * @override
		 * @param {String}      hash
		 * @param {Function}    listener
		 * @returns {Router}
		 */
		addListener: function ( hash, listener ) {
			if ( ($B.isString(hash) && hash) && $B.isFunction(listener) && !this.hasListener(hash, listener) ) {
				var type = this._getEventType( hash ),
					events = this.__eventPool__[type],
					valueObj = this._hashToValueKeys( hash ),
					has = this.__eventPool__[type];

				if ( !events ) events = this.__eventPool__[type] = [];

				events.push({
					listener: listener,
					originHash: hash,
					keys: valueObj.keys,
					values: valueObj.values
				});

				if ( has ) {
					AP.common.warn( 'Router:"' + hash + '"는 유사 router가 이미 등록되어 있으니 중복 제어 되지 않도록 주의.' );
				}
			}


			return this;
		},

		/**
		 * listener 삭제
		 * @override
		 * @param {String}      hash
		 * @param {Function}    listener
		 * @returns {Router}
		 */
		removeListener: function ( hash, listener ) {
			var type = this._getEventType( hash ),
				events = this.__eventPool__[type];

			if ( events ) {
				if ( $B.isFunction(listener) ) {
					var evtLength = events.length;

					for ( var i = 0; i < evtLength; ++i ) {
						var event = events[i];

						if ( hash === event.originHash && listener === event.listener ) {
							events.splice( $B.array.indexOf(events, event), 1 );
							break;
						}
					}

					if ( !events.length ) {
						delete this.__eventPool__[type];
					}
				} else {
					delete this.__eventPool__[type];
				}
			} else {
				this.__eventPool__ = {};
			}

			return this;
		},

		/**
		 * listener 등록여부 반환
		 * @override
		 * @param {String}      hash
		 * @param {Function}    listener
		 * @returns {Boolean}
		 */
		hasListener: function ( hash, listener ) {
			var result = false,
				type = this._getEventType( hash ),
				events = this.__eventPool__[type];

			if ( events ) {
				if ( $B.isFunction(listener) ) {
					var evtLength = events.length, i;

					for ( i = 0; i < evtLength; ++i ) {
						var event = events[i];

						if ( hash === event.originHash && listener === event.listener ) {
							result = true;
							break;
						}
					}
				} else {
					result = true;
				}
			}

			return result;
		},

		/**
		 * 등록 listener와 일치하는 대상에게 전달
		 * @override
		 * @param {String}      currentHash
		 * @param {String}      oldHash
		 * @returns {Router}
		 */
		dispatch: function ( currentHash, oldHash ) {
			var type = currentHash.replace( /\/[\w.\-]+/g, '/:*' ) || ':default',
				events = this.__eventPool__[type];

			if ( events ) {
				var evtLength = events.length;
				for ( var i = 0; i < evtLength; ++i ) {
					var event = events[i],
						currentValues = this._hashToValueKeys( currentHash ).values;

					if ( this._isSameValue(currentValues, event.values) ) {
						event.listener.call( this, {type: event.originHash, newHash: currentHash, oldHash: oldHash, value: this._getValueObject(currentValues, event.keys)} );
					}
				}
			}

			this._oldHash = currentHash;
			return this;
		},

		/** =============== Private Methods =============== */

		_setEvent: function () {
			if ( !this._isSupported ) return this;

			$( window ).on( 'hashchange', function (e) {
				var evt = e.originalEvent,
					current = this._urlToHash( evt.newURL || location.hash ),
					old = this._urlToHash( evt.oldURL || this._oldHash );

				this.dispatch( current, old );
			}.bind(this));
		},

		_setHash: ( function () {
			if ( typeof history.pushState === 'function' ) {
				return function ( hash ) {
					history.pushState( {hash: hash}, hash, '#' + (hash || this.EMPTY_HASH) );
				}
			} else {
				return function ( hash ) {
					location.hash = hash;
				}
			}
		})(),

		_replaceHash: ( function () {
			if ( typeof history.replaceState === 'function' ) {
				return function ( hash ) {
					history.replaceState( {hash: hash}, hash, '#' + (hash || this.EMPTY_HASH) );
				}
			} else {
				return function ( hash ) {
					var baseUrl = location.protocol + '//' + location.hostname + ( location.port? ':' + location.port : '' ) + location.pathname + location.search;
					location.replace( baseUrl + '#' + hash );
				}
			}
		})(),

		_urlToHash: function ( url ) {
			var result = '';

			if ( url && /#/.test(url) ) {
				result = url.split( '#' )[1];
			}

			return result;
		},

		_isSameValue: function ( currentValues, originValues ) {
			return _.every( originValues, function (originVal, idx) {
				if ( originVal ) {
					return currentValues[idx] === originVal;
				} else {
					return true;
				}
			});
		},

		_hashToValueKeys: function ( hash ) {
			var result = {keys: [], values: []};

			hash.replace( /\/([\w.\-:]+)/g, function ( full, f1 ) {
				var key = f1.match( /:([\w.\-]+)/ );

				if ( key ) {
					result.keys.push( key[1] );
					result.values.push( '' );
				} else {
					result.keys.push( '' );
					result.values.push( f1 );
				}
			});

			return result;
		},

		_getValueObject: function ( values, keys ) {
			var result = {},
				length = keys.length;

			for ( var i = 0; i < length; ++i ) {
				var key = keys[i],
					value = values[i];

				if ( key ) {
					result[key] = $B.string.convertDataType( value );
				}
			}

			return result;
		},

		_getEventType: function ( hash ) {
			return hash.replace( /\/[:\w.\-]+/g, function () {
				return '/:*';
			});
		}

	}, 'Router');


	AP.router = new Router();

	$( document ).ready( function (e) {
		AP.router.start();
	});

})( jQuery );