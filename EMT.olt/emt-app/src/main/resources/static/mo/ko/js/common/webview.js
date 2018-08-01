/**
 * Mobile Webview 관련 기능 관리
 * App에서 이벤트 전달시 AP.webview.dispatch( methodName, {requestId: '호출시 전달 받은 requestId', myName: '철수'} );
 */
;(function() {
	'use strict';

	var Webview  = $B.Class.extend({

		initialize: function () {
			this._setEvents();
		},

		/** =============== Public Methods =============== */

		/**
		 * Webview의 해당 method 실행 요청
		 * @param {String}		methodName
		 * @param {*}			value
		 * @param {String}		requestId	필요할때만 고유값을 설정한다, 설정하지 않으면 random (addListener 에서 e.requestId 로 전달 받는다.)
		 * @returns {String}  requestId
		 */
		method: function ( methodName, value, requestId ) {
			if ( !requestId ) requestId = $B.string.unique();

			if ( this.is() ) {
				try {
					if ( this.isAndroid() ) {
						if ( $B.isObject(value) ) {
							value = JSON.stringify( value );
						}
						window.webview[methodName]( requestId, value );
					} else {
						if ( $B.isObject(value) ) {
							var _value = value ? $.param( value ) : '';
						} else {
							var _value = value ? 'param=' + value : '';
						}
						window.location = 'webview://' + methodName + '?requestId=' + requestId + ( ( _value ) ? '&' + _value : '' );
					}
				} catch ( error ) {
					AP.common.error( error );
				}
			}

			//return requestId;
		},

		/**
		 * app 에서 web으로 이벤트 dispatch
		 * @param {String} type
		 * @param {String} value
		 */
		dispatch: function ( type, value ) {
			if ( $B.isString(value) && /^\{[\w\W]*\}$/.test(value) ) {
				value = JSON.parse( value );
			}

			$B.Class.prototype.dispatch.call( this, type, value );
		},

		/**
		 * webview 여부 반환
		 * @returns {Boolean}
		 */
		is: function () {
			return this.isAndroid() || this.isIos();
		},

		/**
		 * android webview 여부 반환
		 * @returns {Boolean}
		 */
		isAndroid: function () {
			return $B.isString( AP.WEBVIEW ) && /^android$/.test( AP.WEBVIEW );
		},

		/**
		 * ios webview 여부 반환
		 * @returns {Boolean}
		 */
		isIos: function () {
			return $B.isString( AP.WEBVIEW ) && /^ios$/.test( AP.WEBVIEW );
		},

		/** =============== Private Methods =============== */

		_setEvents: function () {

		}

	}, 'Webview');



	AP.webview = new Webview();
})();