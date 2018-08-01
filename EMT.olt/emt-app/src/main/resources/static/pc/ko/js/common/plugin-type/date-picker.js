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
            _$btn = _$target.siblings( '.ui_date_picker_btn' ),
            _$layer, _$pop, _$content, _$selectDate, _$dateListLayer, _$prevBtn, _$nextBtn, _$activeElement;

        var _this = this,
            _uid = $B.string.unique(),
            _defaultInputValue = _$input.val(),
            _pluginName = pluginName,
            _options = options || {},
            _isOpen = false,
            _currentDate, _selectedDate, _defaultDate, _calendar;


        /* ==================== Public Methods ==================== */
        /**
         * plugin적용 해제
         */
        this.clear = function () {
            plugin.remove( _$target, _pluginName );
            _$input.val( _defaultInputValue );
            _$input.off( 'click', clickHandler );
            _$btn.off( 'click', clickHandler );
            _$input.removeProp( pluginName + '-uid' );
            _$btn.removeProp( pluginName + '-uid' );

            removeEvents();
            remove();
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

        /**
         * date picker layer 가 열려있는지 여부 반환
         * @returns {Boolean}
         */
        this.isOpen = function () {
            return _isOpen;
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$input.on( 'click', clickHandler );
            _$btn.on( 'click', clickHandler );
            _this.setOption( _options );
        }

        function documentClickHandler (e) {
            if ( !_this.isOpen() ) return;

            var $parent = $( e.target ).closest( '.ui_date_picker, .ui_date_picker_btn, .date_picker_layer' ),
                uid = $parent.prop( pluginName + '-uid' );

            if ( $parent.length ) {
                if ( uid !== _uid ) close( true );
            } else {
                close( true );
            }
        }

        function clickHandler (e) {
            if ( _this.isOpen() ) {
                close();
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

        function draw () {
            var html = common.getTemplate( 'common.date-picker' );

            _$layer = $( html );
            _$pop = _$layer.siblings( '.date_picker_layer' );
            _$input.parent().append( _$layer );
            _$content = _$pop.find( '.calendar_content' );
            _$selectDate = _$pop.find( '.date_select' );
            _$dateListLayer = _$pop.find( '.date_list_layer' );
            _$prevBtn = _$pop.find( '.navi_prev' );
            _$nextBtn = _$pop.find( '.navi_next' );

            _$pop.prop( pluginName + '-uid', _uid );
            _$input.prop( pluginName + '-uid', _uid );
            _$btn.prop( pluginName + '-uid', _uid );
        }

        function remove () {
            if ( !_$layer ) return;

            removeCalendars();
            _$layer.remove();
            _$layer = null;
        }

        function addEvents () {
            if ( !_$layer ) return;

            _$pop.find( '.date_picker_close' ).on( 'click', function (e) {
                close();
            });

            _$prevBtn.on( 'click', function (e) {
                _$dateListLayer.hide();
                setCalendar( _currentDate.subtract(1, 'months') );
            });

            _$nextBtn.on( 'click', function (e) {
                _$dateListLayer.hide();
                setCalendar( _currentDate.add(1, 'months') );
            });

            _$selectDate.on( 'click', function (e) {
                if ( _$dateListLayer.is(':visible') ) {
                    _$dateListLayer.hide();
                } else {
                    setDateListState();
                    _$dateListLayer.show();
                    setScrollState();
                }
            });

            $( document ).on( 'click', documentClickHandler );
            AP.responsiveWidth.addListener( 'resize', responsiveHandler );
        }

        function responsiveHandler (e) {
            setPosition();
        }

        function removeEvents () {
            if ( !_$layer ) return;

            _$pop.find( '.date_picker_close' ).off( 'click' );
            _$prevBtn.off( 'click' );
            _$nextBtn.off( 'click' );
            _$selectDate.off( 'click' );
            _$dateListLayer.off( 'click' );
            $( document ).off( 'click', documentClickHandler );
            AP.responsiveWidth.removeListener( 'responsive', responsiveHandler );
        }

        function removeCalendars () {
            if ( !_calendar ) return;

            _calendar.clear();
            _calendar = null;
        }

        function setCalendar ( baseDate ) {
            removeCalendars();

            var date = moment( baseDate ).date( 1 ),
                options = $B.object.extend( $B.object.clone(_options), {
                	container: _$content,
                	targetDate: date,
                	selectedDate: _selectedDate
            }, false);

            _calendar = new AP.CalendarCore( options )
                .addListener( 'select-date', function (e) {
                    _selectedDate = e.date;
                    close();
                    dispatch( e.type );
                });

            //setBtnState( baseDate );
            _$selectDate.text( baseDate.format('YYYY.MM') );
            _currentDate = baseDate;
        }

        //min, max의 따라 좌우버튼처리
        function setBtnState ( date ) {
            var min = moment( _options.minDate ).format( 'YYYY-MM' ),
                max = moment( _options.maxDate ).format( 'YYYY-MM' ),
                next = date.clone().add( 1, 'months' ).format( 'YYYY-MM' ),
                prev = date.clone().subtract( 1, 'months' ).format( 'YYYY-MM' );

            //min보다 작을때
            if ( moment(min).isAfter(prev) ) {
                _$prevBtn.prop( 'disabled', true );
            } else {
                _$prevBtn.prop( 'disabled', false );
            }

            //max보다 클때
            if ( moment(max).isBefore(next) ) {
                _$nextBtn.prop( 'disabled', true );
            } else {
                _$nextBtn.prop( 'disabled', false );
            }
        }

        function setDateList () {
            var templateData = getDateListData(),
                html = common.getTemplate( 'common.date-picker-date-list', templateData );

            _$dateListLayer.html( html );

            _$dateListLayer.off( 'click' ).on( 'click', '.ui_close', function (e) {
                _$selectDate.trigger( 'click' );
            });

            //년 선택
            _$dateListLayer.on( 'click', '.year_area button', function (e) {
                var year = $( e.currentTarget ).data( 'year' ),
                    month = _$dateListLayer.find( '.month_area button.selected' ).data( 'month' ),
                    choiceDate = moment( year + '-' + month + '-' + _currentDate.format('DD') );

                _$selectDate.trigger( 'click' );
                setCalendar( choiceDate );
            });

            //월 선택
            _$dateListLayer.on( 'click', '.month_area button', function (e) {
                var year = _$dateListLayer.find( '.year_area button.selected' ).data( 'year' ),
                    month = $( e.currentTarget ).data( 'month' ),
                    choiceDate = moment( year + '-' + month + '-' + _currentDate.format('DD') );

                _$selectDate.trigger( 'click' );
                setCalendar( choiceDate );
            });
        }

        //date layer scroll 위치 보정
        function setScrollState () {
            if ( _$dateListLayer ) {
                _$dateListLayer.find( 'ul.year_area, ul.month_area' ).each( function (idx, el) {
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
        }

        function setDateListState ( year, month ) {
            var currentYear = year || _currentDate.format( 'YYYY' ),
                currentMonth = month || _currentDate.format( 'MM' ),
                minDate = moment( _options.minDate, 'YYYY-MM' ),
                maxDate = moment( _options.maxDate, 'YYYY-MM' ),
                maxYear = moment( _options.maxDate ).format( 'YYYY' );

            _$dateListLayer.find( '.year_area button' ).each( function ( idx, el ) {
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

            _$dateListLayer.find( '.month_area button' ).each( function ( idx, el ) {
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
            if ( _this.isOpen() ) return;
            //_$activeElement = $( document.activeElement );
            _$activeElement = _$btn;

            draw();
            addEvents();
            setCalendar( _currentDate );
            setDateList();
            setPosition();
            _isOpen = true;
            dispatch( 'open' );
        }

        function close ( isDocClick ) {
            removeEvents();
            remove();
            _isOpen = false;

            if ( !isDocClick ) _$activeElement.focus();

            dispatch( 'close' );
        }

        function setPosition () {
            if ( !_$layer ) return;

            var inputRect = $B( _$input ).rect( true ),
                winH = $( window ).height(),
                popH = _$pop.height();

            if ( inputRect.top + inputRect.height + popH > winH ) {
                _$pop.addClass( 'top' );
                //_$pop.css( 'top', -(popH - 2) + 'px' );
            } else {
                _$pop.removeClass( 'top' );
            }

            _$pop.css( 'visibility', '' );
        }

        function dispatch ( type, silent ) {
            if ( type === 'select-date' ) {
                var old = _currentDate.format( AP.DATE_FORMAT || DEFAULT_DATE_FORMAT );

                _currentDate = moment( _selectedDate );
                _$input.val( _currentDate.format(AP.DATE_FORMAT || DEFAULT_DATE_FORMAT) );
                _$input.placeholder( 'updated' );

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