/**
 * spinner
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: spinner-change
         * Methods: ex) $( '.ui_spinner' ).spinner( 'clear' );
         *      "clear"             적용해제
         *      "disable"          비활성화
         *      "enable"           활성화
         *      "setValue"         value 설정
         *      "getValue"         value 반환
         * @param   {String}  method
         * @returns {jQuery}
         */
        spinner: function ( method, value ) {
            var pluginName = 'spinner';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new Spinner($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var Spinner = function ( $target, pluginName ) {
        var _$target = $target,
            _$decrease = _$target.find( '> .spinner_decrease' ),
            _$increase = _$target.find( '> .spinner_increase' ),
            _$input = _$target.find( '> .spinner_input' );

        var _this = this,
            _pluginName = pluginName,
            _options = getOptions(),
            _currentValue;


        /* ==================== Public Methods ==================== */

        /**
         * plugin 해제
         */
        this.clear = function () {
            _$decrease.off( 'click', btnClickHandler );
            _$increase.off( 'click', btnClickHandler );
            _$input.off( 'change keyup', inputChangeHandler );
            _$input.off( 'keydown', permissionKeyHandler );

            if ( !_options.disabled ) {
                _$decrease.prop( 'disabled', false );
                _$increase.prop( 'disabled', false );
                _$input.prop( 'disabled', false );
                _$target.removeClass( 'disabled' );
            }
            plugin.remove( _$target, _pluginName );
        };

        /**
         * 비활성화
         */
        this.disable = function () {
            _$decrease.prop( 'disabled', true );
            _$increase.prop( 'disabled', true );
            _$input.prop( 'disabled', true );
            _$target.addClass( 'disabled' );
        };

        /**
         * 활성화
         */
        this.enable = function () {
            _$decrease.prop( 'disabled', false );
            _$increase.prop( 'disabled', false );
            _$input.prop( 'disabled', false );
            _$target.removeClass( 'disabled' );
            setBtnState();
        };

        /**
         * value 설정 (min, max값의 영향을 받는다)
         */
        this.setValue = function ( value ) {
            if ( !_$target.hasClass('disabled') ) {
                _currentValue = getCorrectValue( Math.floor(value) );
                _$input.val( _currentValue );
                setBtnState();
            }
        };

        /**
         * value 반환
         * @returns {Int}
         */
        this.getValue = function () {
            return Math.floor( _$input.val() );
        };


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            if ( $B.ua.ANDROID || $B.ua.MOBILE_IOS ) {
                _$input.attr( 'type', 'number' );
            }

            _$input.attr( 'aria-live', 'polite' );
			_$input.prop( 'readonly', true );

            setEvents();
            _currentValue = getCorrectValue( _this.getValue() );
            _$input.val( _currentValue );

            if ( _options.disabled ) {
                _this.disable();
            } else {
                setBtnState();
            }
        }

        function setEvents () {
            _$decrease.on( 'click', btnClickHandler );
            _$increase.on( 'click', btnClickHandler );
            _$input.on( 'change keyup', inputChangeHandler );
            _$input.on( 'keydown', permissionKeyHandler );
        }

        function btnClickHandler (e) {
            var value = _this.getValue();

            //증가
            if ( $(e.currentTarget).hasClass('spinner_increase') ) {
                value += _options.step;
            } else {
                value -= _options.step;
            }

            _$input.val( getCorrectValue(value) );
            setBtnState();
            checkChange( _currentValue );
        }

        function inputChangeHandler (e) {
            if ( e.type === 'keyup' ) {
                if ( isEnterKey(e.which) ) {
                    _$input.val( getCorrectValue(_this.getValue()) );
                    setBtnState();
                    checkChange( _currentValue );
                }
            } else {
                _$input.val( getCorrectValue(_this.getValue()) );
                setBtnState();
                checkChange( _currentValue );
            }
        }

        function permissionKeyHandler (e) {
            if ( !isPermissionKeyCode(e.which) ) {
                e.preventDefault();
            }
        }

		function setBtnState () {
			var disabledCount = 0,
				value = _this.getValue();

			if ( value > _options.min ) {
				_$decrease.prop( 'disabled', false );
			} else {
				_$decrease.prop( 'disabled', true );
				disabledCount++;
			}

			if ( value < _options.max ) {
				_$increase.prop( 'disabled', false );
			} else {
				_$increase.prop( 'disabled', true );
				disabledCount++;
			}

			if ( disabledCount > 1 ) {
				_$target.addClass( 'disabled' );
			} else {
				_$target.removeClass( 'disabled' );
			}
		}

        function getCorrectValue ( value ) {
            if ( _options.min > value ) {
                value = _options.min;
            } else if ( _options.max < value ) {
                value = _options.max;
            }

            return value;
        }

        function isPermissionKeyCode ( keyCode ) {
            if ( $B.ua.ANDROID || $B.ua.MOBILE_IOS ) {
                return true;
            } else {
                //숫자키, 백스페이스, Delete, Tab, Shift, enter, 화살표키
                return ( (keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)
                || keyCode == 8 || keyCode == 9 || keyCode == 16 || keyCode == 46 || isEnterKey(keyCode) || isArrowKey(keyCode) );
            }
        }

        function isEnterKey ( keyCode ) {
            return ( keyCode == 13 );
        }

        function isArrowKey ( keyCode ) {
            return _.contains( [37, 40, 38, 39], keyCode );
        }

        function getArrowKeyType ( keyCode ) {
            var result = undefined;
            if ( keyCode == 37 ) {
                result = 'backward';
            } else if ( keyCode == 39 ) {
                result = 'forward';
            }
            return result;
        }

        function getOptions () {
            var disabled = _$target.data( 'disabled' ),
                min = _$target.data( 'min' ),//정수
                max = _$target.data( 'max' ),//정수
                step = _$target.data( 'step' );//정수

            return {
                disabled: disabled,
                min: _.isNumber( min )? min : -1000000000000,
                max: _.isNumber( max )? max : 1000000000000,
                step: step || 1
            };
        }

        function checkChange ( oldValue ) {
            var currentValue = _this.getValue();

            if ( oldValue != currentValue ) {
                _currentValue = currentValue;
                dispatch( 'change', currentValue );
            }
        }

        function dispatch ( type, value ) {
            _$target.triggerHandler({
                type: _pluginName + '-' + type,
                value: value
            });
        }

    };

})( jQuery, AP.plugin );