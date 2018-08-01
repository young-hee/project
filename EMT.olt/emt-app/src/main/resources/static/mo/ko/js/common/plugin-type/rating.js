/**
 * rating
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * Events: rating-change
         * Methods: ex) $( '.ui_rating' ).rating( 'clear' );
         *      "clear"             적용해제
         * @param   {String}  method
         * @returns {jQuery}
         */
        rating: function ( method, value ) {
            var pluginName = 'rating';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new Tooltip($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var Tooltip = function ( $target, pluginName ) {
        var _$target = $target,
            _$radios = _$target.find( 'input:radio' ),
            _$score = _$target.find( '.score' );

        var _this = this,
            _pluginName = pluginName;


        /* ==================== Public Methods ==================== */

        /**
         * plugin 해제
         */
        this.clear = function () {
            _$radios.off( 'change', changeHandler );
            plugin.remove( _$target, _pluginName );
        };


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$radios.each( function (idx, el) {
                $( el ).attr( 'data-idx', idx );
            });
            setEvents();
            setSelected( _$target.find('input:radio:checked').val(), true );
        }

        function setEvents () {
            _$radios.on( 'change', changeHandler );
        }

        function changeHandler (e) {
            var value = _$target.find( 'input:radio:checked' ).val();
            setSelected( value );
        }

        function setSelected ( value, silent ) {
            var selectedIdx = _$target.find( 'input:radio:checked' ).attr( 'data-idx' ) || -1;

            if ( selectedIdx > -1 ) {
                _$radios.each( function (idx, el) {
                    var $radio = $( el ),
                        $label = $radio.siblings( 'label[for="' + $radio.attr('id') + '"]' );

                    //checked
                    if ( selectedIdx >= idx ) {
                        $label.addClass( 'checked' );
                    } else {
                        $label.removeClass( 'checked' );
                    }
                });

                _$score.text( value );

                if ( !silent ) {
                    dispatch( 'change', value );
                }
            } else {
                _$target.find( 'label' ).removeClass( 'checked' );
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