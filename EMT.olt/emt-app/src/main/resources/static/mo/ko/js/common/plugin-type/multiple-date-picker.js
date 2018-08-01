/**
 * multiple date picker (시작일, 종료일 설정할 수 있는 두개의 date picker 제어)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Option :
         *    - {String}      minDate           default:today - 12년
         *    - {String}      maxDate           default:today, ex)'2017-11-10'
         *    - {String}      defaultRangeDate         기본 기간 설정 시작+종료 기간, ex) '1weeks', '1months', '1years'
         * @param   {String}  method    ex) $( '.ui_multiple_date_picker' ).multipleDatePicker({defaultRangeDate:'1months'});
         *              "clear"         적용해제
         *              "getDate"       선택된 데이타 반환
         * @returns {jQuery}
         */
        multipleDatePicker: function ( method, value ) {
            var pluginName = 'multiple-date-picker';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new MultipleDatePicker($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var MultipleDatePicker = function ( $target, pluginName, options ) {
        var DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

        var _this = this,
            _$target = $target,
            _$startDate = _$target.find( 'input.start_date' ),
            _$endDate = _$target.find( 'input.end_date' ),
            _$startSpan = _$target.find( 'span.start_date' ),
            _$endSpan = _$target.find( 'span.end_date' ),
            _$infoArea = _$target.find( '.date_info_area' ),
            _$rangeRadio = _$target.find( 'input.select_range_date:radio' );

        var _pluginName = pluginName,
            _options = ( options )? $B.object.clone( options ) : {};


        /* ==================== Public Methods ==================== */
        /**
         * plugin적용 해제
         */
        this.clear = function () {
            _$rangeRadio.off( 'change', radioChangeHandler );
            _$startDate.off( 'change', startChangeHandler );
            _$endDate.off( 'change', endChangeHandler );
            plugin.remove( _$target, _pluginName );
        };

        /**
         * 선택된 날짜 반환
         * @param   {String}    format  리턴받을 date format설정, 설정하지 않으면 기본값
         * @returns {Object}    {startDate:'', endDate:''}
         */
        this.getDate = function ( format ) {
            return {
                startDate: _$startDate.datePicker( 'getDate', format ),
                endDate: _$endDate.datePicker( 'getDate', format )
            };
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            setEvents();
            setPlugins();

            if ( _options.defaultRangeDate ) {
                var $radio = _$rangeRadio.filter( '[value=' + _options.defaultRangeDate + ']' );

                if ( $radio.length ) {
                    $radio.prop( 'checked', true );
                    setDate( _options.defaultRangeDate );
                }
            }
        }

        function setPlugins () {
            var minDate = ( _options.minDate )? moment( _options.minDate ) : moment().subtract( 12, 'years' ),
                maxDate = ( _options.maxDate )? moment( _options.maxDate ) : moment().add( 12, 'years' );

            _$startDate.datePicker( 'clear' ).datePicker({
                minDate: minDate.format( DEFAULT_DATE_FORMAT ),
                maxDate: maxDate.format( DEFAULT_DATE_FORMAT )
            });

            _$endDate.datePicker( 'clear' ).datePicker({
                minDate: minDate.format( DEFAULT_DATE_FORMAT ),
                maxDate: maxDate.format( DEFAULT_DATE_FORMAT )
            });
        }

        function setEvents () {
            _$rangeRadio.on( 'change', radioChangeHandler );
            _$startDate.on( 'date-picker-change', startChangeHandler );
            _$endDate.on( 'date-picker-change', endChangeHandler );
        }

        function startChangeHandler (e) {
            _$rangeRadio.prop( 'checked', false );
            setValidate( e.date );
            dispatch( 'change' );
        }

        function endChangeHandler (e) {
            _$rangeRadio.prop( 'checked', false );
            setValidate( e.date );
            dispatch( 'change' );
        }

        function radioChangeHandler (e) {
            var value = _$rangeRadio.filter( ':checked' ).val();
            setDate( value );
            dispatch( 'change' );
        }

        function setValidate ( date ) {
            //validate 관련
            if ( date ) {
                _$startDate.attr( 'biggest-date', date );
                _$endDate.attr( 'least-date', date );
            } else {
                _$startDate.removeAttr( 'biggest-date' );
                _$endDate.removeAttr( 'least-date' );
            }

            valid( _$startDate );
            valid( _$endDate );
        }

        //validate update
        function valid ( $input ) {
            if ( $input.hasClass('error') || $input.hasClass('valid') ) {
                if ( typeof $input.valid === 'function' ) $input.valid();
            }
        }

        function setDate ( val ) {
            var date = parseDate( val );

            if ( date ) {
                //오늘을 기준으로 기간 설정
                var endDate = moment(),
                    startDate = endDate.clone().subtract( date.value, date.key ),
                    startDateStr = startDate.format( DEFAULT_DATE_FORMAT ),
                    endDateStr = endDate.format( DEFAULT_DATE_FORMAT );

                _$startDate.datePicker( 'setDate', startDateStr );
                _$endDate.datePicker( 'setDate', endDateStr );
                _$startSpan.text( _$startDate.datePicker('getDate', AP.DATE_FORMAT) );
                _$endSpan.text( _$endDate.datePicker('getDate', AP.DATE_FORMAT) );

                if ( val === 'all' ) {
                    _$infoArea.hide();
                } else {
                    _$infoArea.show();
                }

                setValidate();
            }
        }

        //@return {value, key}
        function parseDate ( rangeStr ) {
            var result = null;

            if ( rangeStr && typeof rangeStr === 'string' ) {
                //all = 50년
                if ( rangeStr === 'all' ) {
                    result = {
                        value: '50',
                        key: 'years'
                    };
                } else {
                    var matchAry = rangeStr.match( /(^[0-9]+)([a-z]+)/ );

                    if ( matchAry ) {
                        result = {
                            value: matchAry[1],
                            key: matchAry[2]
                        };
                    }
                }
            }

            return result;
        }

        function dispatch ( type, silent ) {
            if ( !silent ) {
                _$target.triggerHandler( {type: _pluginName + '-change', date: _this.getDate()} );
            }
        }
    };

})( jQuery, AP.plugin );