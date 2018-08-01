/**
 * colorChips : 상품상세, 상품리스트 에서 사용
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
    'use strict';

    $.fn.extend({
        /**
		 * Events: "color-chips-change"
		 * 	ex) $( '.color_chips' ).on('color-chips-change', function(e){ e.index, e.prodSn });
		 * EventProperties: index
         * Methods: ex) $( '.color_chips' ).colorChips( 'clear' );
         *      "clear"             적용해제
		 *      "getCurrentIndex"	현재 선택된 index 반환
         * @param   {String}  method
         * @returns {jQuery}
         */
        colorChips: function ( method, value ) {
            var pluginName = 'color-chips';

            if ( typeof method === 'string' ) {
                return plugin.callMethod( this, pluginName, method, value );
            } else {
                this.each( _.bind(function ( idx, el ) {
                    var $el = $( el );
                    if ( !plugin.has($el, pluginName) ) {
                        plugin.add( $el, pluginName, new ColorChips($el, pluginName, method) );
                    }
                }, this));
            }

            return this;
        }
    });



    var ColorChips = function ( $target, pluginName ) {
		//more 버튼 표시 기준 갯수, 5개 이상
    	var MORE_LENGTH = 5;

        var _$target = $target,
            _$colorChipArea = _$target.find( 'ul' ),
            _$colorGroupArea = _$target.find( '.color_group' ),
            _$colorGroupScrollArea = _$colorGroupArea.find( '.scroll_area' ),
            _$colorChips = _$colorChipArea.find( '> li:not(.btn_more)' ),
			_$optionBtnArea = _$target.find( '.option_btns' ),
            _$moreBtn = _$target.find( '.btn_color_more' ),
            _$closeBtn = _$target.find( '.option_close > button' ),
            _$colorGroupBtn = _$optionBtnArea.find( '.select_color_group' );

        var _this = this,
            _pluginName = pluginName,
			_currentIdx = -1;


        /* ==================== Public Methods ==================== */

        /**
         * plugin 해제
         */
        this.clear = function () {
			_$colorChips.off( 'click', 'a', colorChipClickHandler );
			_$moreBtn.off( 'click' );
			_$closeBtn.off( 'click' );
			_$colorGroupBtn.off( 'click' );
			_$colorGroupScrollArea.find( 'button' ).off( 'click' );
            plugin.remove( _$target, _pluginName );
        };

		/**
		 * 현재 선택된 index 반환
		 */
		this.getCurrentIndex = function () {
			return _currentIdx;
		};


        /* ==================== Initialize ==================== */
        initialize();

        /* ==================== Protected Methods ==================== */

        function initialize () {
			setColorChips();
			setColorGroup();
            setEvents();
        }

        function setEvents () {
			_$colorChips.on( 'click', 'a', colorChipClickHandler );

			_$moreBtn.on( 'click', function (e) {
				displayColorChips( 'open' );
				_$target.addClass( 'open' );
				_$optionBtnArea.show();

				//color 선택 버튼이 없을때
				if ( !_$colorGroupBtn.length ) {
					showColorGroup();
				}
			});

			_$closeBtn.on( 'click', function (e) {
				_$colorChipArea.scrollLeft( 0 );
				displayColorChips( 'close' );
				displayColorGroup( 'close' );
				_$optionBtnArea.hide();
				_$target.removeClass( 'open' );
			});

			//칼라 선택
			_$colorGroupBtn.on( 'click', function (e) {
				showColorGroup();
			});

			//color group filtering
			_$colorGroupScrollArea.find( 'button' ).on( 'click', function (e) {
				var color = $( this ).data( 'color' );

				if ( color === 'all' ) {
					_$colorChips.addClass( 'filter_view' ).show();
				} else {
					_$colorChips.removeClass( 'filter_view' ).hide();
					_$colorChips.filter( '[data-group~="' + color + '"]' ).addClass( 'filter_view' ).show();
				}

				_$colorGroupArea.hide();
				_$optionBtnArea.show();

				//color 선택 버튼이 없을때
				if ( !_$colorGroupBtn.length ) {
					_$closeBtn.triggerHandler( 'click' );
				}
			});
        }

        function showColorGroup () {
			displayColorGroup( 'open' );
			_$colorGroupArea.show().scrollLeft( 0 );
			_$optionBtnArea.hide();
		}

        function colorChipClickHandler (e) {
        	e.preventDefault();

			_$colorChips.find( 'a' ).removeClass( 'check' );
        	$( e.currentTarget ).addClass( 'check' );

			var idx = $( e.currentTarget ).parent().data( 'index' );

			if ( idx !== _currentIdx ) {
				_currentIdx = idx;
				dispatch( idx, $(e.currentTarget).data('prod-sn') );
			}
		}

		function setColorChips () {
			_$colorChips.each( function ( idx, el ) {
				$( el ).attr( 'data-index', idx ).addClass( 'filter_view' );

				if ( $(el).find('a').hasClass('check') ) {
					_currentIdx = idx;
				}
			});
		}

		function setColorGroup () {
        	/*
			_$colorGroupArea.find( 'button' ).each( function ( idx, el ) {
				var color = '#' + $( el ).data( 'color' );

				//칼라 밝기가 화이트에 가까우면 폰트칼라를 어두운색으로
				if ( $B.isColor(color) && $B.color.brighteness(color) > 200 ) {
					//font color 설정
					$( el ).addClass( 'color_dark' );
				}
			});
			*/
		}

        function displayColorChips ( state ) {
			if ( state === 'open' ) {
				_$colorChips.filter( '.filter_view' ).show();
			} else {
				_$colorChips.filter( '.filter_view' ).slice( 0, MORE_LENGTH - 1 ).show();
				_$colorChips.filter( '.filter_view' ).slice( MORE_LENGTH ).hide();
			}
		}

		function displayColorGroup ( state ) {
			if ( state === 'open' ) {
				var listW = 0;

				_$colorGroupArea.show();
				_$colorGroupScrollArea.find( 'button' ).each( function ( idx, el ) {
					listW += $( el ).outerWidth( true );
				});
				_$colorGroupScrollArea.css( 'width', listW + 2 + 'px' );
			} else {
				_$colorGroupArea.hide();
			}
		}

		function dispatch ( idx, prodSn ) {
			_$target.triggerHandler({
				type: _pluginName + '-change',
				index: idx,
				prodSn: prodSn
			});
		}

    };

})( jQuery, AP.plugin );