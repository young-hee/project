/**
 * Design SelectBox
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
	'use strict';

	$.fn.extend({
		/**
		 * 디자인 selectbox 적용
		 * Events: design-selectbox-change, design-selectbox-options-show, design-selectbox-options-hide, design-selectbox-selected
		 * Methods: ex) $( 'select' ).designSelectBox( 'clear' );
		 *      "clear"         적용해제
		 *      "updated"       option 갱신후 적용하기
		 *      "setValue"      value 설정
		 *      "getValue"      value 반환
		 *      "show"
		 *      "hide"
		 * @param   {String}  method
		 * @returns {jQuery}
		 */
		designSelectBox: function ( method, value ) {
			var pluginName = 'design-selectbox';

			if ( typeof method === 'string' ) {
				return plugin.callMethod( this, pluginName, method, value );
			} else {
				this.each( _.bind(function ( idx, el ) {
					var $el = $( el );
					if ( !plugin.has($el, pluginName) ) {
						plugin.add( $el, pluginName, new DesignSelectBox($el, pluginName, method) );
					}
				}, this));
			}

			return this;
		}
	});



	var DesignSelectBox = function ( $target, pluginName ) {
		var _$target = $target,
			_$options = _$target.find( '.select_options' ),
			_$input = _$target.find( 'input:hidden:eq(0)' ),
			_$btn = _$target.find( '>button' );

		var _this = this,
			_pluginName = pluginName,
			_uId = $B.string.unique(),
			_isNotLabelChange = _$target.data( 'not-label-change' ),
			_defaultLabel = _$btn.html(),
			_hideTimer;


		/* ==================== Public Methods ==================== */

		/**
		 * plugin 해제
		 */
		this.clear = function () {
			if ( _hideTimer ) _hideTimer.stop();
			$( 'body' ).off( 'mousedown', bodyClickHandler );
			_$btn.off( 'click', btnClickHandler );
			_$btn.off( 'keydown', buttonKeyDownHandler );
			_$btn.off( 'focusin focusout', focusHandler );
			_$options.off( 'click', '.select_option > a', optionClickHandler );
			_$target.find( '.' + _uId ).removeClass( _uId ).removeClass( 'disabled' ).removeClass( 'selected' ).removeAttr( 'data-option-id' );
			plugin.remove( _$target, _pluginName );
		};

		/**
		 * options 노출
		 */
		this.show = function () {
			if ( !_$target.hasClass('open') ) {
				_hideTimer.reset();
				_$target.addClass( 'open' );

				if ( _isNotLabelChange ) {
					_$options.find( '.select_option > a' ).removeClass( 'selected' );
				} else {
					setOptionScrollState( _$options.find('a[data-value="' + this.getValue() + '"]').parent() );
				}

				dispatch( 'options-show' );
			}
		};

		/**
		 * options 숨김
		 */
		this.hide = function () {
			if ( _$target.hasClass('open') ) {
				_hideTimer.reset();
				_$target.removeClass( 'open' );
				dispatch( 'options-hide' );
			}
		};

		/**
		 * options toggle
		 */
		this.toggle = function () {
			if ( _$target.hasClass('open') ) {
				_this.hide();
			} else {
				_this.show();
			}
		};

		/**
		 * options list update
		 */
		this.updated = function () {
			this.hide();
			setElementClass();

			var $el = getSelectedOption();
			updateLabel( $el.siblings('.label_markup').html() || _defaultLabel );
			selectedOption( $el.attr('data-value') );
		};

		/**
		 * 현재 value 반환
		 */
		this.getValue = function () {
			return _$input.val();
		};

		/**
		 * value 설정
		 * @param {String, Number}  value
		 */
		this.setValue = function ( value ) {
			updateLabel( valueToLabel(value) );
			selectedOption( value );
		};


		/* ==================== Initialize ==================== */
		initialize();

		/* ==================== Protected Methods ==================== */

		function initialize () {
			setElementClass();
			setEvents();

			var $el = getSelectedOption();
			updateLabel( $el.siblings('.label_markup').html() || _defaultLabel );
			selectedOption( $el.attr('data-value') );
		}

		function setElementClass () {
			_$target.find( '*' ).addClass( _uId );
			_$options.find( '.select_option > a' ).each( function ( idx, el ) {
				var $option = $( el );

				$option.attr( 'data-option-id', idx ).data( 'option-id', idx );

				if ( $option.data('disabled') ) {
					$option.addClass( 'disabled' );
				} else {
					$option.removeClass( 'disabled' );
				}

				if ( $option.data('selected') ) {
					$option.addClass( 'selected' );
				} else {
					$option.removeClass( 'selected' );
				}
			});
		}

		function setEvents () {
			_$btn.on( 'click', btnClickHandler );
			_$btn.on( 'keydown', buttonKeyDownHandler );
			_$btn.on( 'focusin focusout', focusHandler );

			//option click
			_$options.on( 'click', '.select_option > a', optionClickHandler );

			//hide delay timer
			_hideTimer = new $B.utils.Timer( 200, 1 ).addListener( 'timer', function (e) {
				_this.hide();
			});

			$( 'body' ).on( 'mousedown', bodyClickHandler );
		}

		function focusHandler (e) {
			if ( e.type === 'focusout' ) {
				if ( _$target.hasClass('open') ) {
					_hideTimer.reset().start();
				}
			} else {
				_hideTimer.reset();
			}
		}

		function buttonKeyDownHandler (e) {
			var keyType = getArrowKeyType( e.which );

			if ( keyType ) {
				e.preventDefault();

				if ( _$target.hasClass('open') ) {
					selectByKey( keyType );
				} else {
					_this.show();
				}
			}
		}

		function optionClickHandler (e) {
			e.preventDefault();
			var $el = $( e.currentTarget ),
				oldValue = _this.getValue(),
				value = $el.attr( 'data-value' );

			if ( !$el.hasClass('disabled') ) {
				_this.hide();
				updateLabel( $el.siblings('.label_markup').html() );
				selectedOption( value );
				checkChange( oldValue, value );
			}

			_$btn.focus();
		}

		function selectByKey ( keyType ) {
			var currentId = _$options.find( 'a.selected' ).data( 'option-id' ) || 0,
				oldValue = _$options.find( 'a.selected' ).data( 'value' ),
				maxIdx = _$options.find( '.select_option' ).length - 1;

			currentId = getSelectableOptionId( keyType, currentId, maxIdx );

			if ( !$B.isEmpty(currentId) ) {
				var $currentOption= _$options.find( 'a[data-option-id="' + currentId + '"]' ),
					currentValue = $currentOption.data( 'value' );

				updateLabel( $currentOption.siblings('.label_markup').html() );
				selectedOption( currentValue );
				setOptionScrollState( $currentOption.parent() );
				checkChange( oldValue, currentValue, true );
			}
		}

		//arrow 키로 선택가능한 optionId 반환
		function getSelectableOptionId ( keyType, currentId, maxIdx ) {
			var result = '';

			if ( !$B.isEmpty(currentId) ) {
				//현재대상이 마지막 옵션이면
				if ( isEndPoint(currentId, maxIdx, keyType) ) {
					result = currentId;
				} else {
					result = currentId;

					if ( keyType === 'up' ) {
						result--;
					} else {
						result++;
					}

					//이전, 다음 대상이 disabled
					if ( _$options.find('a[data-option-id=' + result + ']').hasClass('disabled') ) {
						if ( isEndPoint(result, maxIdx, keyType) ) {
							result = currentId;
						} else {
							var oldId = result;
							result = getSelectableOptionId ( keyType, oldId, maxIdx );

							if ( oldId === result ) {
								result = currentId;
							}
						}
					}
				}
			}

			return result;
		}

		function isEndPoint ( currentId, maxIdx, keyType ) {
			var result = false;

			if ( keyType === 'up' ) {
				result = currentId <= 0;
			} else {
				result = currentId >= maxIdx;
			}

			return result;
		}

		function setOptionScrollState ( $option ) {
			if ( $option && $option.length ) {
				var optionsH = _$options.height(),
					optionH = $option.height(),
					optionY = $option.offset().top - _$options.offset().top,
					scrollY = _$options.scrollTop();

				if ( optionY < 0 ) {
					_$options.scrollTop( 0 );
				} else if ( optionsH < (optionY + optionH) ) {
					_$options.scrollTop( scrollY + optionH );
				}
			}
		}

		function getArrowKeyType ( keyCode ) {
			var result = undefined;
			if ( keyCode == 40 ) {
				result = 'down';
			} else if ( keyCode == 38 ) {
				result = 'up';
			}
			return result;
		}

		function updateLabel ( html ) {
			if ( !_isNotLabelChange ) {
				_$btn.html( html || '' );
			}
		}

		function valueToLabel ( value ) {
			var result = '',
				$el = _$options.find( '.select_option > a[data-value="' + value + '"]' );

			if ( $el.hasClass('disabled') ) {
				result = '';
			} else {
				result = $el.siblings( '.label_markup' ).html();
			}

			return result;
		}

		//마크업에서 선택된 대상 추출
		function getSelectedOption () {
			var $el = _$options.find( '.select_option > a.selected' );

			/*if ( !$el.length ) {
				$el = _$options.find( '.select_option > a:not(.disabled)' );
			}*/

			return $el.eq(0);
		}

		function bodyClickHandler (e) {
			if ( _$target.hasClass('open') ) {
				if ( !$(e.target).is('.' + _uId) ) {
					_this.hide();
				}
			}
		}

		function checkChange ( oldValue, currentValue, isKey ) {
			dispatch( 'selected', currentValue, oldValue != currentValue );

			if ( !isKey && _isNotLabelChange ) {
				dispatch( 'change', currentValue );
			} else {
				if ( oldValue != currentValue ) {
					dispatch( 'change', currentValue );
				}
			}
		}

		function selectedOption ( value ) {
			_$options.find( '.select_option > a' ).removeClass( 'selected' );
			var $el = _$options.find( '.select_option > a[data-value="' + value + '"]' );

			if ( $el.length && !$el.hasClass('disabled') ) {
				$el.addClass( 'selected' );
				_$input.val( value );
			} else {
				_$input.val( '' );
			}
		}

		function btnClickHandler (e) {
			_this.toggle();
		}

		function dispatch ( type, value, changed ) {
			_$target.triggerHandler({
				type: _pluginName + '-' + type,
				changed: changed || false,
				value: $B.string.convertDataType( value )
			});
		}

	};

})( jQuery, AP.plugin );