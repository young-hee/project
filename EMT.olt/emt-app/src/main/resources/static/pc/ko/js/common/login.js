/**
 * Page 내부 에서 Login 체크
 * 로그아웃상태이면 내부적으로 안내 메세지 띄움
 * ex) AP.login().done( function () { //login 상태 });
 */
;(function( $ ){
	'use strict';

	var IS_LOGIN = AP.LOGIN_USER;

	/**
	 * @param {Object}	options		옵션을 추가할때 넣어준다.
	 * 	- {String}	returnUrl	로그인후 리턴시킬 url, (default: 현재주소)
	 * 	- {Boolean}	trigger		무조건 창을 띄울때 true를 설정
	 * @returns {Promise}
	 */
	AP.login = function ( options ) {
		var defer = new $.Deferred(),
			opt = _.isObject( options )? options : {};

		if ( IS_LOGIN && !opt.trigger ) {
			defer.resolve();
		} else {
			AP.modal.info({
				title: '로그인',
				contents: '로그인이 필요한 기능입니다.<br>로그인 페이지로 이동하시겠습니까?',
				confirmLabel: '확인',
				cancelLabel: '취소'
			}).addListener( 'modal-close', function (e) {
				if ( e.closeType === 'confirm' ) {
					AP.login.go();
				} else {
					defer.reject();
				}
			});
		}

		return defer.promise( options );
	};

	/**
	 * 로그인 페이지로 바로 보내기
	 * @param {Object}	options		옵션을 추가할때 넣어준다.
	 * 	- {String}	returnUrl	로그인후 리턴시킬 url, (default: 현재주소)
	 */
	AP.login.go = function ( options ) {
		var opt = _.isObject( options )? options : {},
			returnUrl = encodeURIComponent( opt.returnUrl || location.pathname + location.search + location.hash );
		location.href = '/login?returnUrl=' + returnUrl;
	};

})( jQuery );