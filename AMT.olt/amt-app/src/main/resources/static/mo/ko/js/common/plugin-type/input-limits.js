/**
 * input limits (글자 입력제한)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){

    $.fn.extend({
        /**
         * max-byte, maxlength 속성을 기준으로 작동
         * @param   {String}  method    ex) $( 'input:text, textarea' ).inputLimits();
         *              "clear"         적용해제
         * @returns {jQuery}
         */
        inputLimits: function ( method, value ) {
            var pluginName = 'input-limits';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) && ($el.is('[max-byte]') || $el.is('[maxlength]')) ) {
                        plugin.add( $el, pluginName, new InputLimits($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var InputLimits = function ( $target, pluginName ) {
        var _$input = $target,
			_$txt = $target.parent( '.textarea, .input_wrap' ).siblings( '.text_right' ).find( 'small' ),
			_$current = _$txt.find( '> .current' ),
			_$limits = _$txt.find( '> .limits' );

        var _pluginName = pluginName,
            _maxByte = _$input.attr( 'max-byte' ) || 1,
            _maxLength = _$input.attr( 'length' ) || _$input.attr( 'maxlength' ) || 1,
            _isByteCheck = !_.isEmpty( _maxByte );


        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$input.off( 'change keyup', eventHandler );
            plugin.remove( _$input, _pluginName );
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$input.on( 'change keyup', eventHandler );
			setCountTxt( _$input.val() );
        }

        function eventHandler (e) {
            var str = getLimitsString( _$input.val() );
            _$input.val( str );
			setCountTxt( str );
        }

        function getLimitsString ( str ) {
            var result = str;

            if ( _isByteCheck ) {
                if ( AP.common.getByteLength(str) > _maxByte ) {
                    result = AP.common.cutStringByte( str, _maxByte );
                }
            } else {
                if ( str.length > _maxLength ) {
                    result = str.substr( 0, _maxLength );
                }
            }

            return result;
        }

        function setCountTxt ( str ) {
        	var current = '',
				limits = '';

			if ( _isByteCheck ) {
				current = AP.common.getByteLength( str );
				limits = _maxByte;
			} else {
				current = str.length;
				limits = _maxLength;
			}

			_$current.text( current );
			_$limits.text( limits );
		}

    };

})( jQuery, AP.plugin );