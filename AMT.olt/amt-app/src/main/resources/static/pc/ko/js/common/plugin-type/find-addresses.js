/**
 * 주소찾기
 * @type    jQuery Plugin
 */
;(function( $, plugin ){

    var VIEW_LIST_LENGTH = 5;


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
			_$postCodeHidden = _$target.find( '.post_code:hidden' ),
            _$addressFirstInput = _$target.find( '.address_first' ),
			_$addressFirstHidden = _$target.find( '.address_first:hidden' ),
			_$addressLastInput = _$target.find( '.address_last' ),
			_$findAddressResultTemplate = _$target.find( '#find-address-result-template' ),
			_$resultArea = _$target.find( '.address_list' );

        var _pluginName = pluginName,
            _options = options || {},
            _modal, _keyword = '';


        /* ==================== Public Methods ==================== */
        this.clear = function () {
            _$findBtn.off( 'click', clickHandler );
			_$keyword.off( 'keydown', clickHandler );
			_$resultArea.off( 'click', 'a.result', selectedResultHandler );
			_$resultArea.off( 'click', 'input.selRadio', selectedRadioHandler );
            plugin.remove( _$target, _pluginName );
        };

        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
            _$findBtn.on( 'click', clickHandler );
			_$keyword.on( 'keydown', clickHandler );
			_$resultArea.on( 'click', 'a.result', selectedResultHandler );
			_$resultArea.on( 'click', 'input.selRadio', selectedRadioHandler );
        }

		function selectedRadioHandler (e) {
			var $el = $( e.currentTarget ),
				selIndex = $el.data( 'sel-index' ),
				postCode = $el.data( 'post-code' ),
				address = $el.data( 'address' ),
				detail = getDetailAddress( $el.data('detail-address') );

			_$addressFirstInput.val( postCode + ' ' + address );
			_$postCodeHidden.val( postCode );
			_$addressFirstHidden.val( address );
			_$addressLastInput.val( detail + ' ' );
			_$addressLastInput.focus();

			//선택된값 이벤트 전달
			_$target.triggerHandler({
				type: 'change-address',
				selIndex : selIndex,
				postCode: postCode,
				address: address,
				detailAddress: detail
			});
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
			if(_$findAddressResultTemplate){
				if ( e.type === 'keydown' ) {
					if ( e.which === 13 ) {
						e.preventDefault();
						search();
					}
				} else {
					search();
				}
			}else {
				_keyword = _$keyword.val();

				if (_keyword) {
					openModal();
				} else {
					AP.modal.alert('검색어를 입력해 주세요.').addListener('modal-close', function (e) {
						_$keyword.focus();
					});
				}
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
			if(_$findAddressResultTemplate){
				if ( _$keyword.val() ) {
					AP.api.getAddresses({
						keyword: _$keyword.val(),
						currentPage: page
					}).done( function ( data, commonData ) {
						drawResult(null, data.juso, commonData );
						if ( data.common.totalCount > 10 ) {
							AP.modal.info({
								title: '검색된 주소가 10개 이상입니다.',
								contents: '검색어와 일치 순으로 10개만 보입니다.<br>찾으시는 주소가 없다면 주소를 더 상세하게 검색해 주세요.',
								confirmLabel: '확인'
							});
						}
					}).fail( function () {
						drawResult(null, [], {totalCount: 0, currentPage: 1} );
					});
				} else {
					AP.modal.alert( '검색할 지역명을 입력해 주세요.' );
				}
			}else{
				var $loading = $modal.find( '.loading' ),
					$result = $modal.find( '.address_result' );

				_keyword = ( _keyword && page )? _keyword : $modal.find('.keyword').val();

				if ( _keyword ) {
					setLoading( true, $loading, $result );

					AP.api.getAddresses({
						keyword: _keyword,
						currentPage: page
					}).done( function ( data, commonData ) {
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
        }

        //검색결과
        function drawResult ( $pop, data, commonData ) {
        	if(_$findAddressResultTemplate){
				var resultTemplate = "common.find-addresses-result";

				//사용자가 지정한 템플릿 경로가 있을경우
				if(_$findAddressResultTemplate != undefined && _$findAddressResultTemplate.text() != null &&
					_$findAddressResultTemplate.text() != '') {
					resultTemplate = _$findAddressResultTemplate.text();
				}
				var resultHtml = AP.common.getTemplate( resultTemplate, {
					totalLength: commonData.totalCount,
					totalLengthLabel: $B.string.numberFormat( commonData.totalCount ),
					result: data
				});

				_$resultArea.show().html( resultHtml )
			}else{
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

				$pop.find( '.ui_paging' ).paging( 'clear' ).paging({
					currentPage: commonData.currentPage,
					totalPage: Math.ceil( commonData.totalCount / VIEW_LIST_LENGTH )
				}).on( 'paging-change', function (e) {
					$( this ).paging( 'disable' );
					search( $pop, e.page );
				});
			}
        }

        function removeModalEvents ( $modal ) {
            $modal.find( '.result a' ).off();
            $modal.find( '.ui_paging' ).paging( 'clear' );
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