/**
 * 주소찾기
 * @type    jQuery Plugin
 */
;(function( $, plugin ){

    $.fn.extend({
        /**
         * Events : change-address
         * Event Properties : e.address, e.postCode, e.detailAddress
         *  ex) $( '.ui_find_addresses' ).on( 'change-address', function (e) { console.log(e.postCode, e.address, e.detailAddress) });
         * @param   {String}  method    ex) $( '.ui_find_addresses' ).findAddresses();
         *              "clear"         적용해제
         * @returns {jQuery}
         */
        findAddresses: function ( method, value ) {
            var pluginName = 'find-addresses';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new FindAddresses($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var FindAddresses = function ( $target, pluginName, options ) {
        var _$target = $target,
            _$findInput = _$target.find( '.find_addresses_input' ),
            _$findBtn = _$target.find( '.btn_find_addresses' ),
            _$addressFirstInput = _$target.find( '.address_first' ),
            _$addressFirstHidden = _$target.find( '.address_first:hidden' ),
            _$postCodeHidden = _$target.find( '.post_code:hidden' ),
            _$addressLastInput = _$target.find( '.address_last' ),
            _$resultArea = _$target.find( '.address_list' );

        var _pluginName = pluginName,
            _options = options || {};


        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$findBtn.off( 'click', clickHandler );
            _$findInput.off( 'keydown', clickHandler );
            _$resultArea.off( 'click', 'a.result', selectedResultHandler )
            plugin.remove( _$target, _pluginName );
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$findBtn.on( 'click', clickHandler );
            _$findInput.on( 'keydown', clickHandler );
            _$resultArea.on( 'click', 'a.result', selectedResultHandler )
        }

        function selectedResultHandler (e) {
            var $el = $( e.currentTarget ),
                postCode = $el.data( 'post-code' ),
                address = $el.data( 'address' ),
                detail = getDetailAddress( $el.data('detail-address') );

            _$addressFirstInput.val( postCode + ' ' + address );
            _$postCodeHidden.val( postCode );
            _$addressFirstHidden.val( address );
            _$addressLastInput.val( detail + ' ' );
            _$addressLastInput.focus();

            _$resultArea.hide();

            //선택된값 이벤트 전달
            _$target.triggerHandler({
                type: 'change-address',
                postCode: postCode,
                address: address,
                detailAddress: detail
            });
        }

        function clickHandler (e) {
            if ( e.type === 'keydown' ) {
                if ( e.which === 13 ) {
                    e.preventDefault();
                    search();
                }
            } else {
                search();
            }
        }

        function search ( page ) {
            if ( _$findInput.val() ) {
                AP.api.getAddresses({
                    keyword: _$findInput.val(),
                    currentPage: page
                }).done( function ( data, commonData ) {
                    drawResult( data.juso, commonData );

                    if ( data.common.totalCount > 30 ) {
                        AP.modal.info({
                            title: '검색된 주소가 30개 이상입니다.',
                            contents: '검색어와 일치 순으로 30개만 보입니다.<br>찾으시는 주소가 없다면 주소를 더 상세하게 검색해 주세요.',
                            confirmLabel: '확인'
                        });
                    }
                }).fail( function () {
                    drawResult( [], {totalCount: 0, currentPage: 1} );
                });
            } else {
                AP.modal.alert( '검색할 지역명을 입력해 주세요.' );
            }
        }

        //검색결과
        function drawResult ( data, commonData ) {
            var resultHtml = AP.common.getTemplate( 'common.find-addresses-result', {
                totalLength: commonData.totalCount,
                totalLengthLabel: $B.string.numberFormat( commonData.totalCount ),
                result: data
            });

            _$resultArea.show().html( resultHtml );
        }

        function getDetailAddress ( address ) {
            var result = '';

            if ( address ) {
                var matches = address.replace( /[\(\)]/g, '' ).split( ',' );

                if ( matches.length === 2 ) {
                    result = matches[1];
                    result = $B.string.trim( result );
                }
            }

            return result;
        }
    };

})( jQuery, AP.plugin );