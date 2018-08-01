/**
 * SelectBox
 * @type    jQuery Plugin
 */
;(function( $, plugin ){
	'use strict';

	$.fn.extend({
		/**
		 * 디자인 selectbox 적용
		 * Events: selectbox-change, change, selectbox-options-show, selectbox-options-hide
		 * Methods: ex) $( 'select' ).selectBox( 'clear' );
		 *      "clear"         적용해제
		 *      "updated"       option 갱신후 적용하기
		 *      "resetPosition" option list의 위치를 다시 설정해준다.
		 * @param   {String}  method
		 * @returns {jQuery}
		 */
		selectBox: function ( method, value ) {
			var pluginName = 'selectbox';

			if ( typeof method === 'string' ) {
				return plugin.callMethod( this, pluginName, method, value );
			} else {
				this.each( _.bind(function ( idx, el ) {
					var $el = $( el );
					if ( !plugin.has($el, pluginName) ) {
						plugin.add( $el, pluginName, new SelectBox($el, pluginName, method) );
					}
				}, this));
			}

			return this;
		}
	});



	var SelectBox = function ( $target, pluginName ) {
		var _$target = $target,
			_$wrap = _$target.parent( '.select_wrap' ),
			_$modalWrap = _$target.closest( '.layer_wrap' ),
			_$options, _$btn;

		var _this = this,
			_pluginName = pluginName,
			_isStaticType = _$wrap.hasClass( 'static' ),
			_uId = $B.string.unique(),
			_hideTimer;


		/* ==================== Public Methods ==================== */

		/**
		 * plugin 해제
		 */
		this.clear = function () {
			if ( _hideTimer ) _hideTimer.stop();
			$( window ).off( 'load resize', resizeHandler );
			$( 'body' ).off( 'mousedown', bodyClickHandler );
			_$target.off( 'validate-error', validateHandler );
			_$target.off( 'validate-valid', validateHandler );
			_$btn.off().remove();
			_$options.off().remove();
			plugin.remove( _$target, _pluginName );
		};

		/**
		 * options 노출
		 */
		this.show = function () {
			if ( !_$wrap.hasClass('open') ) {
				_hideTimer.reset();
				_$wrap.addClass( 'open' );
				_$options.show().attr( 'aria-expanded', true );
				this.resetPosition();
				setOptionScrollState( _$options.find('a[data-value="' + _$target.val() + '"]').parent() );

				dispatch( 'options-show' );
			}
		};

		/**
		 * options 숨김
		 */
		this.hide = function () {
			if ( _$wrap.hasClass('open') ) {
				_hideTimer.reset();
				_$wrap.removeClass( 'open' );
				_$options.hide().attr( 'aria-expanded', false );
				dispatch( 'options-hide' );
			}
		};

		/**
		 * options toggle
		 */
		this.toggle = function () {
			if ( _$wrap.hasClass('open') ) {
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

			drawOptions();
			var optionId = getCurrentOptionId();
			updateLabel( optionId );
			selectOption( optionId );
			setBtnState();
		};

		/**
		 * options reset position
		 */
		this.resetPosition = function ( isResize ) {
			/*if ( !_isStaticType && _$options.is(':visible') ) {
				var btnW = _$btn.outerWidth(),
					btnH = _$btn.outerHeight(),
					scrollY = $( window ).scrollTop(),
					winH = $( window ).height(),
					optionsH = _$options.outerHeight(),
					btnY = _$btn.offset().top,
					posX = _$btn.offset().left,
					posY = btnY + btnH - 1;

				/!* 상위 요소의 position의 따라 top값이 제대로 적용되지 않아 제거
				if ( (posY + optionsH) > (scrollY + winH) ) {
					//모달 내부에 있을때
					if ( _$modalWrap.length ) {
						posY = btnY - optionsH - _$modalWrap.offset().top + 1 + 'px';
					} else {
						posY = btnY - optionsH + 1 + 'px';
					}

					_$options.addClass( 'top' );
				} else {
					posY = '';
					_$options.removeClass( 'top' );
				}
				*!/

				_$options.css({
					//'top': posY,
					'min-width' : _$wrap.width() + 'px'
				});
			}*/
		};


		/* ==================== Initialize ==================== */
		initialize();

		/* ==================== Protected Methods ==================== */

		function initialize () {
			defaultDraw();
			setEvents();
		}

		function defaultDraw () {
			_$btn = $( '<button type="button" class="' + _uId + '" aria-controls="' + _uId + '" role="combobox" aria-live="polite"></button>' );
			_$options = $( '<ul id="' + _uId + '" class="select_options ' + _uId + '" role="listbox" aria-expanded="false"></ul>' );
			_$wrap.append( _$btn );

			if ( _isStaticType ) {
				_$wrap.append( _$options );
			} else {
				//$( 'body' ).append( _$options );
				_$wrap.append( _$options );
			}

			drawOptions();

			var optionId = getCurrentOptionId();
			updateLabel( optionId );
			selectOption( optionId );
			setBtnState();
		}

		function setBtnState () {
			_$btn.prop( 'disabled', _$target.is(':disabled') );
		}

		function getCurrentOptionId () {
			var currentValue = _$target.val(),
				optionId = 0;

			if ( !_.isEmpty(currentValue) ) {
				optionId = _$target.find( 'option[value=' + currentValue + ']' ).data( 'option-id' );
			}

			return optionId;
		}

		function setEvents () {
			$( window ).on( 'load resize', resizeHandler );
			_$btn.on( 'click', btnClickHandler );
			_$target.on( 'validate-error', validateHandler );
			_$target.on( 'validate-valid', validateHandler );

			//click
			_$options.on( 'click', '.select_option > a', function (e) {
				e.preventDefault();
				var $el = $( e.currentTarget ),
					oldValue = _$target.val(),
					currentValue = $el.data( 'value' );

				if ( !$el.hasClass('disabled') ) {
					_this.hide();

					updateLabel( '', $el.data('label') );
					selectOption( $el.data('option-id') );
					checkChange( oldValue, currentValue );
				}

				_$btn.focus();
			});

			//key
			_$btn.on( 'keydown', function (e) {
				var keyType = getArrowKeyType( e.which );

				if ( keyType ) {
					e.preventDefault();

					if ( _$wrap.hasClass('open') ) {
						selectByKey( keyType );
					} else {
						_this.show();
					}
				}
			});

			$( 'body' ).on( 'mousedown', bodyClickHandler );

			_$btn.on( 'focusin focusout', function (e) {
				if ( e.type === 'focusout' ) {
					if ( _$wrap.hasClass('open') ) {
						_hideTimer.reset().start();
					}
				} else {
					_hideTimer.reset();
				}
			});

			//hide delay timer
			_hideTimer = new $B.utils.Timer( 200, 1 ).addListener( 'timer', function (e) {
				_this.hide();
			});
		}

		function bodyClickHandler (e) {
			if ( _$wrap.hasClass('open') ) {
				if ( !$(e.target).is('.' + _uId) ) {
					_this.hide();
				}
			}
		}

		function selectByKey ( keyType ) {
			var currentId = _$options.find( 'a.selected' ).data( 'option-id' ) || 0,
				oldValue = _$options.find( 'a.selected' ).data( 'value' ),
				maxIdx = _$options.find( 'a' ).length - 1;

			currentId = getSelectableOptionId( keyType, currentId, maxIdx );

			if ( !$B.isEmpty(currentId) ) {
				var $currentOption= _$options.find( 'a[data-option-id="' + currentId + '"]' ),
					currentValue = $currentOption.data( 'value' );

				updateLabel( currentId );
				selectOption( currentId );
				setOptionScrollState( $currentOption.parent() );
				_$options.css( 'min-width', _$btn.outerWidth() + 'px' );
				checkChange( oldValue, currentValue );
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
					optionY = $option.position().top,
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

		function selectOption ( optionId ) {
			var $el = _$options.find( '>li >a[data-option-id=' + optionId + ']' );

			if ( $el.length ) {
				$el.addClass( 'selected' ).parent().siblings().find( '>a' ).removeClass( 'selected' );
			} else {
				_$options.find( '>li >a' ).removeClass( 'selected' );
			}
		}

		function updateLabel ( optionId, label ) {
			if ( !label ) {
				label = _$options.find( '>li >a[data-option-id=' + optionId + ']' ).data( 'label' );
			}

			_$btn.text( label );
		}

		function checkChange ( oldValue, currentValue ) {
			if ( oldValue !== currentValue ) {
				_$target.val( currentValue );

				//validate
				if ( _$options.hasClass('error') || _$options.hasClass('valid') ) {
					if ( typeof _$target.valid === 'function' ) _$target.valid();
				}

				_$target.triggerHandler({
					type: 'change',
					value: currentValue
				});
				dispatch( 'change', currentValue );
			}
		}

		//validate
		function validateHandler (e) {
			if ( e.type === 'validate-error' ) {
				_$options.removeClass( e.validClass ).addClass( e.errorClass );
			} else {
				_$options.removeClass( e.errorClass ).addClass( e.validClass );
			}
		}

		function btnClickHandler (e) {
			_this.toggle();
		}

		function resizeHandler (e) {
			if ( e.type === 'load' ) {
				_this.resetPosition( true );
			} else if ( e.type === 'resize' ) {
				_this.hide();
			}
		}

		function drawOptions () {
			var model = getOptionsModel(),
				html = AP.common.getTemplate( 'common.select-box', model );

			_$options.html( html );
		}

		function getOptionsModel () {
			var options = [];

			_$target.find( 'option' ).each( function (idx, el) {
				var $option = $( el ),
					label = $option.text();

				$option.attr( 'data-option-id', idx );

				options.push({
					disabled: $option.is( ':disabled' ),
					selected: $option.is( ':selected' ),
					value: $option.val(),
					label: label,
					html: label,
					optionId: idx,
					uId: _uId
				});
			});

			return {options: options};
		}

		function dispatch ( type, value ) {
			_$target.triggerHandler({
				type: _pluginName + '-' + type,
				value: $B.string.convertDataType( value )
			});
		}

	};

})( jQuery, AP.plugin );