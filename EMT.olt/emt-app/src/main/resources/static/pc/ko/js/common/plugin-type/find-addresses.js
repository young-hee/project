/**
 * 주소찾기
 * @type    jQuery Plugin
 */
;(function( $, plugin ){

    var VIEW_LIST_LENGTH = 10;


    $.fn.extend({
        /**
         * Events : change-address
         * Event Properties : e.address, e.postCode
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
            _$keyword = _$target.find( '.address_keyword' ),
            _$findBtn = _$target.find( '.btn_address_find' ),
            _$postcodeInput = _$target.find( '.post_code' ),
            _$addressFirstInput = _$target.find( '.address_first' ),
            _$addressLastInput = _$target.find( '.address_last' );

        var _pluginName = pluginName,
            _options = options || {},
            _modal, _keyword = '';


        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$findBtn.off( 'click', clickHandler );
            plugin.remove( _$target, _pluginName );
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$findBtn.on( 'click', clickHandler );
        }

        function clickHandler (e) {
            _keyword = _$keyword.val();

            if ( _keyword ) {
                openModal();
            } else {
                AP.modal.alert( '검색어를 입력해 주세요.' ).addListener( 'modal-close', function (e) {
                    _$keyword.focus();
                });
            }
        }

        function openModal () {
            var modal = AP.modal.info({
                    title: '우편번호 찾기',
                    contents: {
                        templateKey: 'common.find-addresses',
                        templateModel: {}
                    },
                    containerClass: 'zip_code',
                    sizeType: 'L'
                }),
                $modal = modal.getElement();

            _modal = modal;

            _modal.addListener( 'modal-before-close', function (e) {
                if ( e.closeType === 'search' ) {
                    _$keyword.val( _keyword ).placeholder( 'updated' );
                    _$postcodeInput.val( e.data.postCode ).placeholder( 'updated' );
                    _$addressFirstInput.val( e.data.address ).placeholder( 'updated' );
                    _$addressLastInput.val( e.data.detailAddress + ' ' ).placeholder( 'updated' );

                    //선택된값 이벤트 전달
                    _$target.triggerHandler({
                        type: 'change-address',
                        postCode: e.data.postCode,
                        address: e.data.address,
                        detailAddress: e.data.detailAddress
                    });
                }

                removeModalEvents( $modal );
            }).addListener( 'modal-close', function (e) {
                _modal = null;
            });

            //search
            $modal.find( '.btn_search' ).on( 'click', function (e) {
                search( $modal );
            });

            $modal.find( '.keyword' ).on( 'keydown', function (e) {
                if ( e.which === 13 ) {
                    e.preventDefault();
                    search( $modal );
                }
            }).val( _keyword );

            //placeholder, keyword del 적용
            $modal.find( '.keyword' ).placeholder().inputText();
            search( $modal );
        }

        function search ( $modal, page ) {
            var $loading = $modal.find( '.loading' ),
                $result = $modal.find( '.address_result' );

            _keyword = ( _keyword && page )? _keyword : $modal.find('.keyword').val();

            if ( _keyword ) {
                setLoading( true, $loading, $result );

                AP.api.getAddresses(JSON.stringify({
                	 keyword: _keyword,
                    currentPage: page
                })).done( function ( data, commonData ) {
                    if ( _modal ) {
                        drawResult( $modal, data.juso, commonData );
                    }
                }).fail( function () {
                    if ( _modal ) {
                        drawResult( $modal, [], {totalCount: 0, currentPage: 1} );
                    }
                }).always( function () {
                    if ( _modal ) {
                        setLoading( false, $loading );
                        //모달의 위치 다시 잡아주기
                        _modal.resetPosition();
                    }
                });

                $modal.find( '.btn_search' ).focus();
            } else {
                AP.modal.alert( '검색어를 입력해 주세요.' ).addListener( 'modal-close', function (e) {
                    $modal.find( '.keyword' ).focus();
                });
            }
        }

        //검색결과
        function drawResult ( $pop, data, commonData ) {
            var resultHtml = AP.common.getTemplate( 'common.find-addresses-result', {
                totalLength: commonData.totalCount,
                totalLengthLabel: $B.string.numberFormat( commonData.totalCount ),
                result: data
            });

            $pop.find( '.address_result' ).html( resultHtml ).find( 'a' ).on( 'click', function (e) {
                var $el = $( e.currentTarget );

                _modal.close({
                    postCode: $el.data( 'post-code' ),
                    address: $el.data( 'address' ),
                    detailAddress: getDetailAddress( $el.data('detail-address') )
                }, 'search');
            });

            $pop.find( '.ui_paging' ).pagingAddress( 'clear' ).pagingAddress({
				pagingLength: VIEW_LIST_LENGTH,
                currentPage: commonData.currentPage,
				totalPage: Math.ceil( commonData.totalCount / VIEW_LIST_LENGTH )
            }).on( 'paging-change', function (e) {
                $( this ).pagingAddress( 'disable' );
                search( $pop, e.page );
            });
        }

        function removeModalEvents ( $modal ) {
            $modal.find( '.result a' ).off();
            $modal.find( '.ui_paging' ).pagingAddress( 'clear' );
            $modal.find( '.keyword' ).placeholder( 'clear' ).inputText( 'clear' );

            _keyword = '';
        }

        function setLoading ( isShow, $loading, $result ) {
            if ( isShow ) {
                $loading.css({
                    'top': '',
                    'position': ''
                }).show();

                if ( !$result.find('.result_list').length ) {
                    $loading.css({
                        'position': 'relative',
                        'top': $result.height() / 2 + 'px'
                    });
                }
            } else {
                $loading.hide();
            }
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