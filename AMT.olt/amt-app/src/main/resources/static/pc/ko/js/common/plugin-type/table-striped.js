/**
 * table striped
 * Table input.table_striped checkbox, radio 를 선택시 tr의 선택 칼라를 넣어주는 기능
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * @param   {String}  method    ex) $( 'table' ).tableStriped( 'clear' );
         *              "clear"         적용해제
         *              "updated"       table 내부의 tr이 추가되거나 삭제시 호출
         * @returns {jQuery}
         */
        tableStriped: function ( method, value ) {
            var pluginName = 'table-striped';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new TableStriped($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var TableStriped = function ( $target, pluginName ) {
        var _$target = $target,
            _$allCheck = _$target.find( 'th input.checked_all:checkbox' );

        var _this = this,
            _pluginName = pluginName;


        /* ==================== Public Methods ==================== */

        this.clear = function () {
            _$target.find( 'input.table_striped' ).off( 'change', changeHandler );
            _$allCheck.off( 'change', allChangeHandler );
            plugin.remove( _$target, _pluginName );
        };

        /**
         * table 내부의 tr이 추가되거나 삭제시 호출.
         */
        this.updated = function () {
            _$target.find( 'input.table_striped' ).off( 'change', changeHandler );

            _$target.find( 'input.table_striped:checkbox' ).each( function () {
                setCheckboxChecked( $(this) );
            });
            setCheckedAllState();

            if (  _$target.find('input.table_striped:radio').length ) {
                setRadioChecked( _$target.find('input.table_striped:radio') );
            }

            _$target.find( 'input.table_striped' ).on( 'change', changeHandler );
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$allCheck.on( 'change', allChangeHandler );
            _this.updated();
        }

        function setCheckedAllState () {
            var isCheckedAll = true;

            _$target.find( 'input.table_striped:checkbox' ).each( function () {
                if ( isCheckedAll ) {
                    isCheckedAll = $( this ).is( ':checked' );
                }
            });

            _$allCheck.prop( 'checked', isCheckedAll );
        }

        function allChangeHandler (e) {
            if ( $(this).is(':checked') ) {
                _$target.find( 'input.table_striped:checkbox' ).each( function () {
                    $( this ).prop( 'checked', true );
                    setCheckboxChecked( $(this) );
                });
            } else {
                _$target.find( 'input.table_striped:checkbox' ).each( function () {
                    $( this ).prop( 'checked', false );
                    setCheckboxChecked( $(this) );
                });
            }
        }

        function changeHandler (e) {
            if ( $(this).is(':checkbox') ) {
                setCheckboxChecked( $(this) );
                setCheckedAllState();
            } else {
                setRadioChecked( $(this) );
            }
        }

        function setRadioChecked ( $input ) {
            $( 'input:radio[name="' + $input.attr('name') + '"]:checked' ).closest( 'tr' ).addClass( 'selected' ).siblings().removeClass( 'selected' );
        }

        function setCheckboxChecked ( $input ) {
            if ( $input.is(':checked') ) {
                $input.closest( 'tr' ).addClass( 'selected' );
            } else {
                $input.closest( 'tr' ).removeClass( 'selected' );
            }
        }

    };

})( jQuery, AP.plugin );