/**
 * Placeholder jquery plugin (support IE8)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * ex) $( '.target input[placeholder], .target textarea[placeholder]' ).placeholder();
         * @param   {String}  method    ex) $( '.target input, .target textarea' ).placeholder( 'updated' );
         *              "updated"   동적으로 value를 변경한 이후에는 반듯이 호출해줘야 한다.
         *              "clear"
         * @returns {jQuery}
         */
        placeholder: function ( method ) {
            var pluginName = 'placeholder';

            if ( typeof method === 'string' ) {
                plugin.callMethod( this, pluginName, method );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );

                    if ( $el.attr('placeholder') && !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new Placeholder($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var Placeholder = function ( $target, pluginName ) {
        var _$target = $target,
            _$input = $target,
            _$label = $target.siblings( '.placeholder' );

        var _pluginName = pluginName,
            _placeholder = '';

        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$input.off( 'focusin focusout change keyup', updateInput );
            plugin.remove( _$target, _pluginName );
            _$input.attr( 'placeholder', _placeholder );
        };

        this.updated = function () {
            updateInput();
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            if ( !_$label.length ) {
                _$label = $( '<span class="placeholder"></span>' );
                _$target.after( _$label );
            }

            _placeholder = _$input.attr( 'placeholder' );
            _$label.text( _placeholder );
            _$input.removeAttr( 'placeholder' );

            updateInput();

            _$input.on( 'focusin focusout change keyup', updateInput );
        }

        function updateInput (e) {
            var value = _$input.val();

            if ( e && e.type === 'focusin' ) {
                if ( !_$input.prop('readonly') ) _$label.hide();
            } else {
                if ( value ) {
                    _$label.hide();
                } else {
                    _$label.show();
                }
            }
        }
    };

})( jQuery, AP.plugin );