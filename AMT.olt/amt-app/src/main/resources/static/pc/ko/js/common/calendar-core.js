/**
 * CalendarCore
 * @composition : DatePicker, Attendance
 */
;(function ( $, common ) {
	'use strict';

	/**
	 * dispatch events : select-date {date: 'YYYY-MM-DD'}
	 * @param   {Object}    options
	 *    - {jQuery}      container		      container
	 *    - {Date}        targetDate
	 *    - {Date}        selectedDate
	 *    - {Date}        minDate
	 *    - {Date}        maxDate
	 *    - {Boolean}     disableSunday
	 *    - {Boolean}     disableSaturday
	 *    - {Array}       daysString        default:['sun', 'mon', 'tue'...]
	 *    - {String}      template          default:'common.calendar-core'
	 *    - {Array}		  enabledDates		선택 가능날짜들 설정
	 * @constructor
	 */
	var CalendarCore = $B.Class.extend({
		END_DATES: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		DEFAULT_DATE_FORMAT: 'YYYY-MM-DD',

		initialize: function ( options ) {
			this._setOptions( options );
			this._draw();
			this._addEvents();
		},

		/** =============== Public Methods =============== */

		clear: function () {
			this._removeEvents();
			this._remove();
		},

		getHtml: function () {
			return this._html;
		},

		/** =============== Private Methods =============== */
		_setOptions: function ( options ) {
			this._options = options || {};
			//this._options.disableSunday = ( typeof this._options.disableSunday === 'boolean' )? this._options.disableSunday : true;

			if ( !this._options.daysString ) {
				this._options.daysString = ['일', '월', '화', '수', '목', '금', '토'];
			}

			if ( !this._options.template ) {
				this._options.template = 'common.calendar-core';
			}

			if ( this._options.enabledDates ) {
				for ( var i in this._options.enabledDates ) {
					this._options.enabledDates[i] = moment( this._options.enabledDates[i] ).format( this.DEFAULT_DATE_FORMAT );
				}
			}
		},

		_draw: function () {
			this._html = common.getTemplate( this._options.template, this._getTemplateData() );

			if ( this._options.container && this._options.container.length ) {
				this._$element = $( this._html );
				this._options.container.html( this._$element );
			}
		},

		_getTemplateData: function () {
			var result = {
				days: this._options.daysString
			};

			var todayDate = moment(),
				fullDate = moment( this._options.targetDate ),
				nextDate = fullDate.clone().add( 1, 'months' ),
				prevDate = fullDate.clone().subtract( 1, 'months' ),
				selectDate = this._options.selectedDate? moment( this._options.selectedDate ) : moment().add( 100, 'year' ),
				targetMonth = fullDate.format( 'MM' ),
				targetDate = fullDate.format( 'DD' ),
				targetYear = fullDate.format( 'YYYY' ),
				startDay = moment( targetYear + '-' + targetMonth ).day(),
				endDates = [].concat( this.END_DATES ),
				days = this._options.daysString,
				weeks = [], week = [];

			if ( moment([targetYear]).isLeapYear() ) endDates[1] = 29;

			var i, dayIdx = 0,
				nextMonthIdx = 0,
				prevMonthIdx = this._getPrevMonthIndex( startDay, prevDate ),
				endDate = endDates[targetMonth - 1] + startDay,
				//dayLength = Math.ceil( endDate / 7 ) * 7,
				dayLength = 7 * 6,
				printDate, dateString;

			for ( i = 0; i < dayLength; ++i ) {
				dayIdx++;

				if ( i%7 === 0 ) {
					week = [];
					weeks.push( week );
					dayIdx = 0;
				}

				if ( i >= startDay && i < endDate ) {
					printDate = i - startDay + 1;
					fullDate.date( printDate );
					dateString = fullDate.format( 'YYYY-MM-DD' );

					var data = {
						date: printDate,
						select: fullDate.isSame( selectDate ),
						today: fullDate.isSame( todayDate, 'day' ),
						disabled: this._isDisableDate( fullDate, dayIdx ),
						time: dateString,
						index: printDate - 1,
						day: days[dayIdx],
						sunday: ( dayIdx === 0 ),
						saturday: ( dayIdx === 6 )
					};

					week.push( data );
				} else {
					var etcDate, isToday, isSelect;

					if ( i < startDay ) {
						printDate = prevMonthIdx++;
						prevDate.date( printDate );
						etcDate = prevDate;
						dateString = prevDate.format( 'YYYY-MM-DD' );
						isToday = prevDate.isSame( todayDate, 'day' );
						isSelect = prevDate.isSame( selectDate );
					} else {
						printDate = ++nextMonthIdx;
						nextDate.date( printDate );
						etcDate = nextDate;
						dateString = nextDate.format( 'YYYY-MM-DD' );
						isToday = nextDate.isSame( todayDate, 'day' );
						isSelect = nextDate.isSame( selectDate );
					}

					week.push({
						other: true,
						date: printDate,
						select: isSelect,
						today: isToday,
						disabled: this._isDisableDate( etcDate, dayIdx ),
						time: dateString,
						index: printDate - 1,
						sunday: ( dayIdx === 0 ),
						saturday: ( dayIdx === 6 )
					});
				}
			}

			result.weeks = weeks;
			result.year = targetYear;
			result.month = targetMonth;

			return result;
		},

		_getPrevMonthIndex: function ( startDay, date ) {
			var endDate = this.END_DATES[date.format('MM') - 1];
			if ( moment([date]).isLeapYear() ) endDate = 29;
			return endDate - startDay + 1;
		},

		_isDisableDate: function ( date, day ) {
			var result = false,
				origin = date.format( this.DEFAULT_DATE_FORMAT );

			if ( this._options.disableSunday && 0 === day ) {
				result = true;
			} else if ( this._options.disableSaturday && 6 === day ) {
				result = true;
			} else if ( this._options.enabledDates ) {
				result = !_.some( this._options.enabledDates, function ( enabledDate ) {
					return origin === enabledDate;
				});
			} else {
				//min보다 작을때
				if ( this._options.minDate && moment(this._options.minDate).isAfter(origin) ) {
					result = moment( this._options.minDate ).isAfter( origin );
				}

				//max보다 클때
				if ( !result && this._options.maxDate ) {
					result = moment( this._options.maxDate ).isBefore( origin );
				}
			}

			return result;
		},

		_remove: function () {
			if ( this._$element ) {
				this._$element.remove();
				this._$element = null;
			}
		},

		_addEvents: function () {
			if ( this._$element ) {
				this._$element.find( '.date_button' ).on( 'click', _.bind(function (e) {
					this.dispatch( 'select-date', {
						date: $( e.currentTarget ).data( 'date' )
					});
				}, this));
			}
		},

		_removeEvents: function () {
			if ( this._$element ) {
				this._$element.find( '.date_button' ).off( 'click' );
			}
		}

	}, 'CalendarCore');

	AP.CalendarCore = AP.CalendarCore || CalendarCore;
})( jQuery, AP.common );