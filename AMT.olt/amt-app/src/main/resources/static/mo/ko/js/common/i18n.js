/**
 * i18n
 * 화면에서 i18n적용여부 테스트는 url?i18nDebug=true 처럼 param을 넣으면 해당부분이 코드로 보여진다.
 */
;(function () {
    'use strict';

    if ( typeof window.i18nDictionary === 'object' && !/i18nDebug/.test(location.search) ) {
        AP.i18n = {
            /**
             * i18n
             * @param   {String}    code
             * @param   {Object}    data
             * @returns {String}
             */
            get: function ( code, data ) {
                var result = '',
                    value = window.i18nDictionary[code] || '';

                if ( value ) {
                    if ( typeof data === 'object' ) {
                        result = String( value ).replace( /{{\s*([\w]+)\s*}}/gm, function ( str, prop ) {
                            if ( prop && data.hasOwnProperty(prop) ) {
                                return data[prop];
                            } else {
                                return str;
                            }
                        });
                    } else {
                        result = value;
                    }
                } else {
                    result = code;
                }

                return result;
            },

            /**
             * handlebars template i18n
             * @param   {String}    code
             * @param   {Array}     args    [code, value, code, value...]
             * @returns {String}
             */
            getTemplateData: function ( code, args ) {
                var argLength = args.length;

                if ( argLength ) {
                    var data = {},
                        key = '';

                    for ( var i = 0; i < argLength; ++i ) {
                        //key
                        if ( i%2 === 0 ) {
                            key = args[i];
                        } else {
                            data[key] = args[i];
                        }
                    }

                    code = this.get( code, data );
                } else {
                    code = this.get( code );
                }

                return code;
            }
        };
    } else {
        AP.i18n = {
            get: function ( code ) {
                return code;
            },
            getTemplateData: function ( code ) {
                return code;
            }
        };
    }

})();