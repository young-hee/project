/**
 * Date picker
 * @type    jQuery Plugin
 */
;(function ( $, common, plugin ) {
    'use strict';

    $.fn.extend({
        /**
         * Date Picker
         * Events: "date-picker-change", "date-picker-open", "date-picker-close"    ex) $( '.target' ).on('date-picker-change', function(e){ console.log(e.date) });
         * Methods "clear", "setOption", "getDate", "setDate", "isOpen"  ex) $( '.target' ).datePicker('setOption', {minDate:'2017-11-10'});
         * @param   {Object, String}  options
         *    - {String}      dateFormat        default: AP.DATE_FORMAT
         *    - {String}      minDate           default:today, ex)'2017-11-10'
         *    - {String}      maxDate           default:today + 12년
         *    - {Boolean}     disableSunday
         *    - {Boolean}     disableSaturday
         *    - {String}      defaultDate       default:today
		 *    - {Array}		  enabledDates		선택 가능날짜들 설정, ex) ['2018-01-01', '2018-02-01']
         * @returns {jQuery}
         */
        datePicker: function ( options, val1, val2 ) {
            var pluginName = 'date-picker';

            if ( typeof options === 'string' ) {
                return plugin.callMethod( this, pluginName, options, val1, val2 );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new DatePicker($el, pluginName, options) );
                    }
                }, this));
            }

            return this;
        }
    });



    var DatePicker = function ( $target, pluginName, options ) {
        var DEFAULT_DATE_FORMAT = 'YYYY-MM-DD',
            DEFAULT_YEAR_LENGTH = 12;

        var _$target = $target,
            _$input = $target,
            _$btn = _$target.siblings( '.ui_date_picker_btn' );

        var _this = this,
            _defaultInputValue = _$input.val(),
            _pluginName = pluginName,
            _options = options || {},
            _currentDate, _selectedDate, _defaultDate,
            _calendars = [],
            _modal;


        /* ==================== Public Methods ==================== */
        /**
         * plugin적용 해제
         */
        this.clear = function () {
            _$input.val( _defaultInputValue );
            _$input.off( 'click', clickHandler );
            _$btn.off( 'click', clickHandler );
            if ( _modal ) _modal.close();
            plugin.remove( _$target, _pluginName );
        };

        /**
         * 옵션변경
         * @param {Object} options
         */
        this.setOption = function ( options ) {
            if ( $B.isEmpty(_options) ) {
                _options = options? $B.object.clone( options ) : {};
            } else {
                if ( $B.isObject(options) ) _options = $B.object.extend( _options, options, false );
            }

            _options.minDate = _options.minDate? moment( _options.minDate, DEFAULT_DATE_FORMAT ).format( DEFAULT_DATE_FORMAT ) : moment().format( DEFAULT_DATE_FORMAT );
            _options.maxDate = _options.maxDate? moment( _options.maxDate, DEFAULT_DATE_FORMAT ).format( DEFAULT_DATE_FORMAT ) : moment().add( DEFAULT_YEAR_LENGTH, 'year' ).format( DEFAULT_DATE_FORMAT );

            if ( _selectedDate ) {
                if ( $B.isObject(options) ) {
                    if ( $B.isString(options.defaultDate) ) {
                        _defaultDate = moment( options.defaultDate, DEFAULT_DATE_FORMAT );
                    } else {
                        _defaultDate = moment( _selectedDate, DEFAULT_DATE_FORMAT );
                    }
                } else {
                    _defaultDate = moment( _selectedDate, DEFAULT_DATE_FORMAT );
                }
            } else {
                if ( $B.isString(_options.defaultDate) ) {
                    _defaultDate = moment( _options.defaultDate, DEFAULT_DATE_FORMAT );
                    _selectedDate = _defaultDate.format( DEFAULT_DATE_FORMAT );
                } else {
                    if ( _defaultInputValue ) {
                        _defaultDate = moment( _defaultInputValue, DEFAULT_DATE_FORMAT );
                        _selectedDate = _defaultDate.format( DEFAULT_DATE_FORMAT );
                    } else {
                        _defaultDate = moment();
                    }
                }
            }

            _defaultDate = correctDate( _defaultDate );
            _currentDate = _defaultDate.clone();
        };

        /**
         * 현재날짜 반환
         * @param   {String}    format  리턴받을 date format설정, 설정하지 않으면 기본값
         * @returns {String}
         */
        this.getDate = function ( format ) {
            return _selectedDate? moment( _selectedDate ).format( format || DEFAULT_DATE_FORMAT ) : undefined;
        };

        /**
         * input의 날짜 설정
         * @param {String}      date    변경할 날짜, ex) 2017-00-00
         */
        this.setDate = function ( date ) {
            if ( date ) {
                _selectedDate = correctDate( moment(date) );
                dispatch( 'select-date', true );
            }
        };


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$input.on( 'click', clickHandler );
            _$btn.on( 'click', clickHandler );
            _this.setOption( _options );
        }

        function clickHandler (e) {
            if ( _modal ) {
                _modal.close();
            } else {
                open();
            }
        }

        //minDate, maxDate를 벗어나지 않도록 보정
        function correctDate ( date ) {
            var result = date,
                origin = date.format( DEFAULT_DATE_FORMAT );

            //min보다 작을때
            if ( moment(_options.minDate).isAfter(origin) ) {
                result = moment( _options.minDate );
            } else if ( moment(_options.maxDate).isBefore(origin) ) {
                result = moment( _options.maxDate );
            }

            return result;
        }

        function drawModal () {
            var modal = AP.modal.open({
                    templateKey: 'common.date-picker',
                    containerClass: 'date_picker_modal',
                    returnFocusTarget: _$btn
                });

            _modal = modal;
        }

        function addEvents () {
            var $modal = _modal.getElement(),
                $prevBtn = $modal.find( '.navi_prev' ),
                $nextBtn = $modal.find( '.navi_next' ),
                $dateListLayer = $modal.find( '.date_list_layer' ),
                $selectDate = $modal.find( '.date_select' ),
                $slide = $modal.find( '.slide' );

            $prevBtn.on( 'click', function (e) {
                $dateListLayer.hide();
                $slide.ixSlideLite( 'prev' );
            });

            $nextBtn.on( 'click', function (e) {
                $dateListLayer.hide();
                $slide.ixSlideLite( 'next' );
            });

            $selectDate.on( 'click', function (e) {
                if ( $dateListLayer.is(':visible') ) {
                    $dateListLayer.hide();
                } else {
                    setDateListState();
                    $dateListLayer.show();
                    setScrollState( $dateListLayer );
                }
            });

            _modal.addListener( 'modal-before-close', function (e) {
                //remove events
                $prevBtn.off( 'click' );
                $nextBtn.off( 'click' );
                $selectDate.off( 'click' );
                $dateListLayer.off( 'click' );
                removeCalendars();
            });

            _modal.addListener( 'modal-close', function (e) {
                _modal = null;
                dispatch( 'close' );
            });
        }

        function removeCalendars () {
            AP.responsiveWidth.removeListener( 'resize', slideResizeHandler );

            _.each( _calendars, function ( calendar ) {
                calendar.clear();
            });

            _calendars = [];

            _modal.getElement().find( '.slide' ).ixSlideLite( 'clear' ).off( 'ixSlideLite:change ixSlideLite:slideStart' );
            _modal.getElement().find( '.ix-list-items' ).empty();
        }

        function setCalendar ( $content, baseDate ) {
            var date = moment( baseDate ).date( 1 ),
                options = $B.object.extend( $B.object.clone(_options), {
					container: $content,
                    targetDate: date,
                    selectedDate: _selectedDate
                }, false);

            var calendar = new AP.CalendarCore( options )
                .addListener( 'select-date', function (e) {
                    _selectedDate = e.date;
                    _modal.close();
                    dispatch( e.type );
                });

            _calendars.push( calendar );
        }

        function setCalendars ( baseDate ) {
            removeCalendars();

            var $modal = _modal.getElement(),
                $selectDate = $modal.find( '.date_select' ),
                $slide = $modal.find( '.slide' ),
                $slideItems = $slide.find( '.ix-list-items' ),
                date = moment( baseDate ).date( 1 ),
                next = date.clone().add( 1, 'months' ),
                prev = date.clone().subtract( 1, 'months' );

            for ( var i = 0; i < 3; ++i ) {
                var $content = $( '<li class="ix-list-item calendar_content"></li>' );
                $slideItems.append( $content );

                if ( i === 0 ) {
                    setCalendar( $content, date );
                } else if ( i === 1 ) {
                    setCalendar( $content, next );
                } else {
                    setCalendar( $content, prev );
                }
            }

            $slide.ixSlideLite().on( 'ixSlideLite:change', function (e) {
                if ( e.currentIndex === 0 ) {
                    setCalendars( date );
                } else if ( e.currentIndex === 1 ) {
                    setCalendars( next );
                } else {
                    setCalendars( prev );
                }
            }).on( 'ixSlideLite:slideStart', function (e) {
                var currentDate;

                if ( e.direction === 'prev' ) {
                    currentDate = prev;
                } else if ( e.direction === 'next' ) {
                    currentDate = next;
                } else {
                    currentDate = date;
                }

                $selectDate.text( currentDate.format('YYYY.MM') );
            });

            //setBtnState( $modal, baseDate );
            $selectDate.text( baseDate.format('YYYY.MM') );
            _modal.resetPosition();
            AP.responsiveWidth.addListener( 'resize', slideResizeHandler );
            _currentDate = baseDate;
        }

        function slideResizeHandler () {
            if ( _modal ) {
                _modal.getElement().find( '.slide' ).ixSlideLite( 'resize' );
            }
        }

        //min, max의 따라 좌우버튼처리
        function setBtnState ( $modal, date ) {
            var $prevBtn = $modal.find( '.navi_prev' ),
                $nextBtn = $modal.find( '.navi_next' ),
                min = moment( _options.minDate ).format( 'YYYY-MM' ),
                max = moment( _options.maxDate ).format( 'YYYY-MM' ),
                next = date.clone().add( 1, 'months' ).format( 'YYYY-MM' ),
                prev = date.clone().subtract( 1, 'months' ).format( 'YYYY-MM' );

            //min보다 작을때
            if ( moment(min).isAfter(prev) ) {
                $prevBtn.prop( 'disabled', true );
            } else {
                $prevBtn.prop( 'disabled', false );
            }

            //max보다 클때
            if ( moment(max).isBefore(next) ) {
                $nextBtn.prop( 'disabled', true );
            } else {
                $nextBtn.prop( 'disabled', false );
            }
        }

        function setDateList () {
            var $modal = _modal.getElement(),
                $dateListLayer = $modal.find( '.date_list_layer' ),
                $selectDate = $modal.find( '.date_select' ),
                templateData = getDateListData(),
                html = common.getTemplate( 'common.date-picker-date-list', templateData );

            $dateListLayer.html( html );

            $dateListLayer.off( 'click' ).on( 'click', '.ui_close', function (e) {
                $selectDate.trigger( 'click' );
            });

            //년 선택
            $dateListLayer.on( 'click', '.year_area button', function (e) {
                var year = $( e.currentTarget ).data( 'year' ),
                    month = $dateListLayer.find( '.month_area button.selected' ).data( 'month' ),
                    choiceDate = moment( year + '-' + month + '-' + _currentDate.format('DD') );

                $selectDate.trigger( 'click' );
                setCalendars( choiceDate );
            });

            //월 선택
            $dateListLayer.on( 'click', '.month_area button', function (e) {
                var year = $dateListLayer.find( '.year_area button.selected' ).data( 'year' ),
                    month = $( e.currentTarget ).data( 'month' ),
                    choiceDate = moment( year + '-' + month + '-' + _currentDate.format('DD') );

                $selectDate.trigger( 'click' );
                setCalendars( choiceDate );
            });
        }

        //date layer scroll 위치 보정
        function setScrollState ( $dateListLayer ) {
            $dateListLayer.find( 'ul.year_area, ul.month_area' ).each( function (idx, el) {
                var $scrollArea = $( this ).parent(),
                    $select = $scrollArea.find( 'button.selected' ),
                    scrollY = $scrollArea.scrollTop();

                if ( $select.length ) {
                    var scrollH = $scrollArea.innerHeight(),
                        selectY = $select.position().top - $scrollArea.position().top,
                        selectH = $select.height();

                    if ( selectY < scrollY ) {
                        scrollY = selectY;
                    } else if ( (selectY + selectH) > scrollH ) {
                        scrollY = ( selectY + selectH ) - scrollH;
                    }
                }

                $scrollArea.scrollTop( scrollY );
            });
        }

        function setDateListState ( year, month ) {
            var currentYear = year || _currentDate.format( 'YYYY' ),
                currentMonth = month || _currentDate.format( 'MM' ),
                minDate = moment( _options.minDate, 'YYYY-MM' ),
                maxDate = moment( _options.maxDate, 'YYYY-MM' ),
                maxYear = moment( _options.maxDate ).format( 'YYYY' ),
                $dateListLayer = _modal.getElement().find( '.date_list_layer' );

            $dateListLayer.find( '.year_area button' ).each( function ( idx, el ) {
                var $el = $( el ),
                    yearData = $el.data( 'year' );

                if ( currentYear == yearData ) {
                    $el.addClass( 'selected' );
                } else {
                    $el.removeClass( 'selected' );
                }

                if ( maxYear < yearData ) {
                    $el.prop( 'disabled', true );
                } else {
                    $el.prop( 'disabled', false );
                }
            });

            $dateListLayer.find( '.month_area button' ).each( function ( idx, el ) {
                var $el = $( el ),
                    monthData = $el.data( 'month' ),
                    currentDate = currentYear + '-' + monthData;

                if ( currentMonth == monthData ) {
                    $el.addClass( 'selected' );
                } else {
                    $el.removeClass( 'selected' );
                }

                if ( minDate.isAfter(currentDate) || maxDate.isBefore(currentDate) ) {
                    $el.prop( 'disabled', true );
                } else {
                    $el.prop( 'disabled', false );
                }
            });
        }

        function getDateListData () {
            var years = [],
                months = [],
                minYear = moment( _options.minDate ).format( 'YYYY' ),
                maxYear = moment( _options.maxDate ).format( 'YYYY' ),
                yearLength = Math.max( maxYear, moment(_options.minDate).add(DEFAULT_YEAR_LENGTH - 1, 'year').format('YYYY') );

            for ( var year = minYear; year <= yearLength; ++year ) {
                years.push({
                    year: year
                });
            }

            for ( var i = 1; i <= 12; ++i ) {
                months.push({
                    month: i
                });
            }

            return {
                years: years,
                months: months
            };
        }

        function open () {
            if ( _modal ) return;

            drawModal();
            addEvents();
            setCalendars( _currentDate );
            setDateList();
            dispatch( 'open' );
        }

        function dispatch ( type, silent ) {
            if ( type === 'select-date' ) {
                var old = _currentDate.format( AP.DATE_FORMAT || DEFAULT_DATE_FORMAT );

                _currentDate = moment( _selectedDate );
                _$input.val( _currentDate.format(AP.DATE_FORMAT || DEFAULT_DATE_FORMAT) );

                //validate update
                if ( _$input.hasClass('error') || _$input.hasClass('valid') ) {
                    if ( typeof _$input.valid === 'function' ) _$input.valid();
                }

                if ( old !== _selectedDate ) {
                    if ( !silent ) {
                        _$target.triggerHandler( {type: _pluginName + '-change', date: _selectedDate} );
                        _$input.trigger( 'change' );
                    }
                }
            } else {
                if ( _selectedDate ) {
                    _currentDate = moment( _selectedDate );
                } else {
                    _currentDate = _defaultDate.clone();
                }

                if ( !silent ) _$target.triggerHandler( {type: _pluginName + '-' + type, date: _selectedDate} );
            }
        }
    };

})( jQuery, AP.common, AP.plugin );