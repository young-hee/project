/**
 * input file (skin)
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
         * @param   {String}  method    ex) $( 'input:file' ).inputFile();
         *              "clear"         적용해제
         * @returns {jQuery}
         */
        inputFile: function ( method, value ) {
            var pluginName = 'input-file';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new InputFile($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var InputFile = function ( $target, pluginName ) {
        var _$input = $target,
            _$label = _$input.closest( '.input_btn_wrap' ).find( '.input_file_name' );

        var _pluginName = pluginName,
			_accept = _$input.attr( 'accept' );


        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$input.off( 'change', changeHandler );
            _$label.off( 'input-text-empty', fileClearHandler );
            _$label.inputText( 'clear' );
            plugin.remove( _$input, _pluginName );
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$input.on( 'change', changeHandler );
            _$label.inputText( 'clear' ).inputText().on( 'input-text-empty', fileClearHandler );
        }

        function fileClearHandler () {
            //input file value 삭제
			_$input.val( '' );

            if ( $B.ua.DOC_MODE_IE11_LT ) {
				_$input.attr( 'type', 'radio' ).attr( 'type', 'file' );
			}
        }

        function valid ( fileName ) {
        	var result = true;

			if ( _accept ) {
				var extention = getExtention( fileName ),
					reg = new RegExp( extention ),
					isSame = false;

				_accept.replace( /\/([a-z\*]+)/g, function ( str, f1 ) {
					if ( reg.test(f1) || (f1 === '*') ) {
						isSame = true;
					}
				});

				if ( !isSame ) {
					result = false;
					fileClearHandler();
					_$label.val( '' );
					_$label.inputText( 'updated' );

					if ( /image\//.test(_accept) ) {
						AP.modal.alert( '이미지 파일만 첨부가 가능합니다.' );
					} else {
						AP.modal.alert( '"' + _accept + '" 형식의 파일만 첨부가 가능합니다.' );
					}
				}
			}

        	return result;
		}
		
		function getExtention ( fileName ) {
			var result = '',
				ext = fileName.match( /.([a-z]+)\W*$/ );

			if ( ext ) {
				result = ext[1];
			}

			return result;
		}

        function changeHandler (e) {
            var fileName = '';

            if ( window.FileReader ) { //modern browser
                if ( $( this ).get(0).files[0] ) {
                    fileName = $( this ).get(0).files[0].name;
                }
            } else { // old IE
                fileName = $( this ).val().split( '/' ).pop().split( '\\' ).pop();
            }

            if ( fileName ) {
            	if ( valid(fileName) ) {
					_$label.val( fileName ).trigger( 'change' );
				}
            }

            //validate update
            if ( _$input.hasClass('error') || _$input.hasClass('valid') ) {
                if ( typeof _$input.valid === 'function' ) _$input.valid();
            }
        }
    };

})( jQuery, AP.plugin );