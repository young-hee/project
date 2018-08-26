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
			this._$attendanceBtn = this._$target.find( '.btn_attendance' );
			this._$brandCouponBtn = this._$target.find( '.brand_coupon_list .btn_brand_coupon' );
			this._$beautyPointBtn = this._$target.find( '#beauty_point' );
			this._$allAttendanceBtn = this._$target.find( '#all_attendance' );
			this._$benefitCouponBtn = this._$target.find( '#benefit_coupon' );
			this._$useCouponBtn = this._$target.find( '#use_coupon' );
			
			this._$loading = this._$target.find( '.loading' );

			this._maxDate = AP.common.date( this.DEFAULT_DATE_FORMAT );
			this._minDate = moment( this._maxDate ).subtract( 1, 'months' ).format( this.DEFAULT_DATE_FORMAT );
			this._checkedDates = null;
			this._resultData = null;
			this._modalLink = null;
			
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
						var modal = AP.modal.attendance({
							title: '출석체크',
							contents: {
								templateKey: 'display.events.attendance-success',
								templateModel: {
									today: AP.common.date()
								}
							},
							confirmLabel: '브랜드 쿠폰 뽑기',
							cancelLabel: '닫기'
						});

						modal.getElement().find('.btn_default_modal_confirm').addClass('anchor');
						
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

			this._$brandCouponBtn.on( 'click', function (e) {
				AP.login().done( function () {
					var brandCouponChk = true;
					$.each(this._$target.find( '.today_brand_coupon .brand_coupon_list' ).find('li'), function(idx, el){
						//console.log($(el).hasClass('on'));
						//console.log($(this).hasClass('on'));
						if($(this).hasClass('on')){
							brandCouponChk = false;
							return false;
						}
						
					});
					//console.log(this._$calendar.find('.today').hasClass('checked'));
					//console.log("brandCouponChk : " + brandCouponChk);
					if(brandCouponChk && this._$calendar.find('.today').hasClass('checked')){
						$(e.currentTarget).parent('li').addClass('on');	
					}else{
						AP.modal.alert('출석체크를 하신 후에 브랜드 카드를 뽑아주세요');
					}
				}.bind(this));
			}.bind(this));
			
			this._$beautyPointBtn.on( 'click', function (e) {
				var modal = AP.modal.full({
					title: '출석체크 혜택',
					contents: {
						templateKey: 'display.events.fullpage-attendance',
						templateModel: {
							today: AP.common.date()
						}
					}
				});
			}.bind(this));
			
			this._$allAttendanceBtn.on( 'click', function (e) {
							
			}.bind(this));
			
			this._$benefitCouponBtn.on( 'click', function (e) {
				
			}.bind(this));
			this._$useCouponBtn.on( 'click', function (e) {
				AP.login().done( function () {

					$.each(this._$target.find( '.today_brand_coupon .brand_coupon_list' ).find('li'), function(idx, el){
						//console.log($(el).hasClass('on'));
						//console.log($(this).hasClass('on'));
						if($(this).hasClass('on')){
							//console.log($(this).data('brand-coupon-sn'));
							location.href="/display/brand?brand=" + $(this).data('brand-coupon-sn');
							//return false;
						}
						
					});
					if(this._$calendar.find('.today').hasClass('checked')){
						AP.modal.alert('브랜드 카드를 뽑아주세요');
					}else{
						AP.modal.alert('출석체크를 하신 후에 브랜드 카드를 뽑아주세요');
					}
				}.bind(this));
			}.bind(this));
		},

		_setCurrentDate: function ( date ) {
			this._$current.text( moment(date).format('MM월') );
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
			console.log(baseDate.format( 'YYYYMM' ));
			AP.api.status( null, {
				regularEventType: 'AttendanceCheck',
				day: baseDate.format( 'YYYYMM' )
			}).done( function ( result ) {
				var dates = [];
				this._resultData = result.attendanceCheckHists.attendanceCheckHists;
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
					seriate = 0,
					attentanceCnt = 0;

				//TODO: 개근 체크 기준 확인 후 반영

				_.each( this._checkedDates, function ( date ) {
					console.log("date : " + this._checkedDates);
					var $td = this._$calendar.find( 'td.' + date ),
						isSameMonth = moment( oldDate ).isSame( date, 'month' ),
						html = '';

					//연속된 출첵
//					if ( isSameMonth && moment(oldDate).add(1, 'days').isSame(date) ) {
//						seriate++;
//
//						if ( seriate === 10 ) {
//							$td.addClass( 'day10' );
//							html = '<span class="mark"><span class="sr_only">10일개근</span></span>';
//						} else if ( seriate === 30 ) {
//							$td.addClass( 'day30' );
//							html = '<span class="mark"><span class="sr_only">30일개근</span></span>';
//						}
//					}
					
					_.each( this._resultData, function ( data ) {
						if(date === moment(data.attendanceCheckDt).format('YYYY-MM-DD')){
							console.log("data.awards : " + data.awards);
							if(data.awards != null && data.awards != ''){
								html = '<span class="btn_brand_coupon"><img th:src="${data.awards.prodImg}" alt="" /></span>';
							}
							//html = '<span class="mark"><span class="sr_only">10일개근</span></span>';
							//$td.append( html );
							//$td.append( data.awards );
						}
					});

					$td.addClass( 'checked' ).append( html );
					attentanceCnt++;
					//$td.addClass( 'checked' );
					oldDate = date;
				}.bind(this));
				console.log("oldDate : " + oldDate);
				console.log("attentanceCnt : " + attentanceCnt);
			}
		}
	});


	AP.attendance = new Attendance();
})( jQuery );