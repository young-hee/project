/**
 * input text (input 의 검색어 삭제 아이콘 처리)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * button.input_del 이 있는 있는 대상에만 적용된다.
         * Events: input-text-empty
         * @param   {String}  method    ex) $( 'input:text' ).inputText();
         *              "clear"         적용해제
		 *              "updated"		변경된 상태 적용
         * @returns {jQuery}
         */
        inputText: function ( method, value ) {
            var pluginName = 'input-text';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el ),
                        $delBtn = $el.siblings( 'button.input_del' );

                    if ( $delBtn.length && !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new InputText($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var InputText = function ( $target, pluginName ) {
        var _$input = $target,
            _$inputDelBtn = _$input.siblings( 'button.input_del' );

        var _pluginName = pluginName;


        /* ==================== Public Methods ==================== */

		/**
		 * 변경된 상태 적용
		 */
		this.updated = function () {
			setDelBtnState();
		};

        /**
         * 플러그인 적용해제
         */
        this.clear = function () {
            _$input.off( 'change keyup', changeHandler );
            _$inputDelBtn.off( 'click', inputDel );
            _$inputDelBtn.css( 'display', '' );
            plugin.remove( _$input, _pluginName );
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$input.on( 'change keyup', changeHandler );
            _$inputDelBtn.on( 'click', inputDel );
            setDelBtnState();
        }

        function setDelBtnState () {
            if ( _$input.val() ) {
                _$inputDelBtn.show();
            } else {
                _$inputDelBtn.hide();
            }
        }

        function inputDel (e) {
            e.preventDefault();
            _$input.val( '' );
            _$input.focus();
            setDelBtnState();
            dispatch( 'empty' );
        }

        function changeHandler (e) {
            setDelBtnState();
        }

        function dispatch ( type ) {
            _$input.triggerHandler({
                type: _pluginName + '-' + type
            });
        }
    };

})( jQuery, AP.plugin );