/**
 * 진주알 룰렛
 *
 */

;(function ( $ ) {
	'use strict';

	var Roulette = $B.Class.extend({
		initialize: function () {
			this._$target = $( '#ap_container .ap_contents.event.pearl_roulette' );
			this._startAngle = 0;
			this._baseRotation = 360 * 6;
			this._arrAngle = [22.5, 67.5];
			this._member = {};
			this._winValue = 0;

			this.DURATION = 5;

			this._$target.find( '.btn_start' ).on( 'click', function (e) {
				AP.login().done( function () {
					this._start();
				}.bind( this ));
			}.bind( this ));
		},

		/** =============== Public Methods =============== */
		setMemberInfo: function ( member ) {
			this._member = member;
		},

		/** =============== Private Methods =============== */
		_start: function () {

			AP.api.participated({}, {
				regularEventType: 'Roulette'
			}).done(function ( result ) {

				result = result['awards'];

				this._alert( 'start' ).addListener( 'modal-close', function () {
					if ( e.closeType === 'confirm' ) {
						this._winValue = ( result.eventWinStatus === 'Win' ) ? 1 : 0;
						this._rotate( this._arrAngle[this._winValue], result );
					}
				}.bind( this ));

			}.bind( this )).fail(function ( fail ) {
				this._$target.find( '.btn_start' ).attr( 'disabled', false );

				if ( fail.errorCode === 'ESAL031' ) {			// ESAL031 : 참여횟수 초과 : 3
					this._alert( 'count' );
				} else if ( fail.errorCode === 'ESAL053' ) {	// ESAL031 : 진주알 포인트 부족
					this._alert( 'point' );
				} else {
					this._alert( 'start' ).addListener( 'modal-close', function (e) {
						if ( e.closeType === 'confirm' ) {
							this._winValue = 0;
							this._rotate( this._arrAngle[this._winValue], {} );
						}
					}.bind( this ));
				}
			}.bind( this ));
		},

		_alert: function ( type ) {
			var msg = '';

			switch ( type ) {
				case 'start': 	msg = '진주알 20알이 차감됩니다.<br>계속 하시겠습니까?'; 		break;
				case 'count': 	msg = '일일 참여 횟수는 3회입니다.<br>내일 이용해 주세요.'; 	break;
				case 'point': 	msg = '참여 진주알 개수가 부족합니다.'; 					break;
				case 'fail': 	msg = '당첨되지 않았습니다.<br>다음 기회에 다시 참여해 주세요.';
			}
			return AP.modal.alert( msg );
		},

		_rotate: function ( angle, result ) {
			this._$target.find( '.btn_start' ).attr( 'disabled', true );

			angle += this._baseRotation;
			var tween = new $B.utils.TweenCore( this.DURATION, this._startAngle % 360, angle, { easing: $B.utils.ease.cubicInOut });
			tween.addListener( 'tween', function (e) {
				var cssValue = 'rotate(' + e.currentValue + 'deg)';
				this._$target.find( '.circle img' ).css({
					'transform': cssValue,
					'-webkit-transform': cssValue,
					'-moz-transform': cssValue,
					'-o-transform': cssValue,
					'-ms-transform': cssValue
				});
			}.bind( this )).addListener( 'complete', function (e) {
				this._startAngle = angle;
				this._$target.find( '.btn_start' ).prop( 'disabled', false );

				if ( this._winValue ) {
					// 당첨
					result.member = this._member;
					AP.winningPop.open( '진주알 룰렛', result );
				} else {
					// 꽝
					this._alert( 'fail' );
				}
			}.bind( this )).start();
		}
	});

	AP.roulette = new Roulette();
})( jQuery );