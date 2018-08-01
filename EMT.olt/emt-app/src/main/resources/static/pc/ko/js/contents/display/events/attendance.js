/**
 * 이벤트 : 출석체크
 */
;(function ( $ ) {
	'use strict';

	var Attendance = $B.Class.extend({
		DEFAULT_DATE_FORMAT: 'YYYY-MM',

		initialize: function () {
			this._$target = $( '#ap_container' );
			this._$calendar = this._$target.find( '.calendar_area' );
			this._$prevBtn = this._$target.find( '.btn.prev' );
			this._$nextBtn = this._$target.find( '.btn.next' );
			this._$current = this._$target.find( '.current_month' );
			this._$attendanceBtn = this._$target.find( '.btn_attendance_check' );
			this._$loading = this._$target.find( '.loading' );

			this._maxDate = AP.common.date( this.DEFAULT_DATE_FORMAT );
			this._minDate = moment( this._maxDate ).subtract( 1, 'months' ).format( this.DEFAULT_DATE_FORMAT );
			this._checkedDates = null;

			this._setCalendar( AP.common.date() );
			this._setEvents();

			if ( AP.LOGIN_USER ) {
				this._getCheckedData( moment(AP.common.date()).subtract(1, 'months') ).done( function ( result ) {
					this._$loading.hide();
					this._checkedDates = result;
					this._setCheckedData();
					this._setBtnState();
				}.bind(this));
			}
		},

		/** =============== Public Methods =============== */


		/** =============== Private Methods =============== */

		_setEvents: function () {
			this._$prevBtn.on( 'click', function (e) {
				var date = moment( this._currentDate ).subtract( 1, 'months' ).format( this.DEFAULT_DATE_FORMAT );
				this._setCalendar( date );
			}.bind(this));

			this._$nextBtn.on( 'click', function (e) {
				var date = moment( this._currentDate ).add( 1, 'months' ).format( this.DEFAULT_DATE_FORMAT );
				this._setCalendar( date );
			}.bind(this));

			this._$attendanceBtn.on( 'click', function (e) {
				AP.login().done( function () {
					AP.api.participated( null, {
						regularEventType: 'AttendanceCheck'
					}).done( function ( result ) {
						//출석체크
						var modal = AP.modal.info({
							title: '출석체크',
							contents: {
								templateKey: 'display.events.attendance-success',
								templateModel: {
									today: AP.common.date()
								}
							},
							confirmLabel: '확인'
						});

						modal.getElement().find( 'img' ).imagesLoaded( function() {
							modal.resetPosition();
						});

						//오늘 출첵 체크
						this._checkedDates.push( AP.common.date('YYYY-MM-DD') );
						this._setCalendar( AP.common.date() );
					}.bind(this)).fail( function ( xhr ) {
						if ( xhr.errorCode === 'EAPI004' ) {
							AP.login({trigger: true});
						} else if ( xhr.errorCode === 'ESAL037' ) {
							//금일 출석체크 참여횟수 초과
							AP.modal.alert( '이미 출석체크 되었습니다.' );
						}
					}.bind(this));
				}.bind(this));
			}.bind(this));
		},

		_setCurrentDate: function ( date ) {
			this._$current.text( moment(date).format('YYYY년 MM월') );
			this._currentDate = moment( date ).format( this.DEFAULT_DATE_FORMAT );
		},

		_setBtnState: function () {
			if ( this._checkedDates ) {
				//max보다 크거나 같을때
				if ( moment(this._maxDate).isSameOrBefore(this._currentDate) ) {
					this._$nextBtn.prop( 'disabled', true );
				} else {
					this._$nextBtn.prop( 'disabled', false );
				}

				//min보다 작거나 같을때
				if ( moment(this._minDate).isSameOrAfter(this._currentDate) ) {
					this._$prevBtn.prop( 'disabled', true );
				} else {
					this._$prevBtn.prop( 'disabled', false );
				}
			} else {
				this._$nextBtn.prop( 'disabled', true );
				this._$prevBtn.prop( 'disabled', true );
			}
		},

		_setCalendar: function ( date ) {
			var calendar = new AP.CalendarCore({
				template: 'display.events.attendance-calendar',
				targetDate: date,
				container: this._$calendar,
				daysString: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
			});

			this._setCurrentDate( date );
			this._setCheckedData();
			this._setBtnState();
		},

		//두달치 데이타 반환
		_getCheckedData: function ( baseDate, prevDefer, resultDates ) {
			var defer = prevDefer || new $.Deferred();

			AP.api.status( null, {
				regularEventType: 'AttendanceCheck',
				day: baseDate.format( 'YYYYMM' )
			}).done( function ( result ) {
				var dates = [];

				_.each( result.attendanceCheckHists.attendanceCheckHists, function ( data ) {
					dates.push( moment(data.attendanceCheckDt).format('YYYY-MM-DD') );
				});

				if ( prevDefer ) {
					defer.resolve( resultDates.concat(dates) );
				} else {
					this._getCheckedData( baseDate.add(1, 'months'), defer, dates );
				}
			}.bind(this)).fail( function ( xhr ) {
				//출석체크 이력 없음
				if ( xhr.errorCode === 'ESAL039' ) {
					if ( prevDefer ) {
						defer.resolve( resultDates.concat([]) );
					} else {
						this._getCheckedData( baseDate.add(1, 'months'), defer, [] );
					}
				}
			}.bind(this));

			return defer.promise();
		},

		_setCheckedData: function () {
			if ( _.isArray(this._checkedDates) ) {
				var oldDate = 0,
					seriate = 0;

				//TODO: 개근 체크 기준 확인 후 반영

				_.each( this._checkedDates, function ( date ) {
					var $td = this._$calendar.find( 'td.' + date ),
						isSameMonth = moment( oldDate ).isSame( date, 'month' ),
						html = '';

					//연속된 출첵
					if ( isSameMonth && moment(oldDate).add(1, 'days').isSame(date) ) {
						seriate++;

						if ( seriate === 10 ) {
							$td.addClass( 'day10' );
							html = '<span class="mark"><span class="sr_only">10일개근</span></span>';
						} else if ( seriate === 30 ) {
							$td.addClass( 'day30' );
							html = '<span class="mark"><span class="sr_only">30일개근</span></span>';
						}
					} else {
						seriate = 0;
						html = '<span class="mark">출첵</span>';
					}

					$td.addClass( 'check' ).append( html );
					oldDate = date;
				}.bind(this));
			}
		}
	});


	AP.attendance = new Attendance();
})( jQuery );